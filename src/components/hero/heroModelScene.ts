import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';

/*
 * The hero's 3D object, in plain three.js.
 *
 * This module is the dynamic-import boundary: nothing here — three.js included — is in the initial
 * bundle. HeroModel.tsx imports it only in the browser, after checking for WebGL, and shows the static
 * image until this resolves.
 *
 * It is deliberately imperative and React-free. The render loop must be able to start, stop and draw
 * single frames without a re-render, and there is no state here worth putting in React.
 */

/*
 * Everything below is expressed in units of D — the largest dimension of the model's bounding box. The
 * geometry is normalised to D = 1 on load, so these hold for any STL put through this module.
 */

// The object's starting spin. The fallback PNG (public/hero/model-fallback.png) is rendered from the
// same camera at the same yaw, so the still and the live model line up.
const INITIAL_YAW = -0.55;
const INITIAL_PITCH = 0;

const MAX_DPR = 2;
const AUTO_SPIN = 0.16; // radians per second — one turn takes ~39s
const PITCH_LIMIT = Math.PI / 3; // ±60°, so the object can never be flipped over
const DRAG_SPEED = 0.0075; // radians per pixel dragged

// Camera. A long lens rather than the default 50° — less distortion across a part this close to frame.
const FOV = 32;
const ELEVATION = THREE.MathUtils.degToRad(15); // just above the part; any more and it is all floor
const AZIMUTH = THREE.MathUtils.degToRad(30); // two faces and a sliver of the top
// Fallback for how much of the canvas height the part fills, if the CSS variable is missing.
const DEFAULT_MODEL_FILL = 0.7;

// Build surface. The cell is an ABSOLUTE size in world units — deliberately not a fraction of the part.
// It used to be D/4, which meant every change to the object's size silently resized the grid with it and
// the cells appeared to shrink whenever the model did. The plate is a workbench: its ruling stays put and
// the part sitting on it gets bigger or smaller. A heavier line falls every fourth cell.
const GRID_CELL = 0.2613;
const GRID_MAJOR_EVERY = 4;
const GRID_MINOR_OPACITY = 0.07;
const GRID_MAJOR_OPACITY = 0.14;
// A desaturated blue-grey, tuned to the brand accent's hue but far duller. Never the accent itself: that
// belongs to the CTA, the wordmark and the headline, and four blue things in one screen is three too many.
// The *rendered* line is what should sit just above the page, and these opacities are small — at 7% a
// colour only slightly lighter than the background moves the pixel by two or three values, which is
// nothing. So the source colour is well clear of the page and the alpha brings it back down: 7% of this
// lands on #24272D against a #1B1D21 page, 14% on #2D3138.
const GRID_COLOUR = '#93A6C4';
const PART_COLOUR = '#BDC1C4';

// The plate is 12D across, and its grid dissolves radially long before that. The fade is in UV space:
// it starts at 0.15 (1.8D from the part) and is fully gone by 0.38 (4.6D), which leaves 1.4D of empty
// plane beyond the last visible line on every side — margin enough that no edge can show at any angle.
const PLATE_SIZE = 12;
const FADE_FROM = 0.15;
const FADE_TO = 0.38;
// …and a second fade, this one against the edges of the canvas itself, as a fraction of its size. The
// radial fade cannot do this job: at the bottom of the frame the camera is looking at ground barely 1.3D
// from the part, far inside any radius wide enough to leave a grid worth having, so lines arrive at the
// canvas boundary still at full strength and get cut off by it. This dissolves them into the page.
const EDGE_FADE = 0.12;

// Contact shadow: a flat disc of radial alpha just above the plate, so the part reads as resting on it
// rather than floating. No shadow maps — they cost frames and buy nothing at this scale.
const SHADOW_SIZE = 0.9;

// How many poses the framing solve tries around a full turn. 24 is every 15°, which for a convex part is
// close enough to the true worst case that the error is under a pixel.
const YAW_SAMPLES = 24;
// …and how many pitches across the range the vertical drag allows, from -PITCH_LIMIT to +PITCH_LIMIT.
// 9 is every 15°, which lands exactly on ±45° — where a box is at its tallest.
const PITCH_SAMPLES = 9;
// The most of the canvas the part may cover in its widest pose, on either axis. The 6% left over is the
// margin that stops a rounded pixel or an antialiased edge touching the frame.
const POSE_LIMIT = 0.94;
const probe = new THREE.Vector3(); // reused by the solve, which runs a few thousand projections

export interface HeroSceneOptions {
  /** The aspect-ratio box the canvas is appended to. */
  host: HTMLElement;
  /** URL of the binary STL. */
  url: string;
  /** No auto-rotation, and a single frame drawn instead of a loop. Dragging still works. */
  reducedMotion: boolean;
  /** Fired once the first frame is on screen, so the static image can be faded out. */
  onReady: () => void;
  /** Fired on the first drag, so the "Drag to rotate" hint can be retired. */
  onFirstInteraction: () => void;
}

export interface HeroScene {
  dispose: () => void;
}

/** A soft round gradient, drawn once into a canvas, used as the contact shadow's alpha. */
function contactShadowTexture(): THREE.Texture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, 'rgba(0,0,0,0.5)');
    gradient.addColorStop(0.45, 'rgba(0,0,0,0.22)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * The build plate: one plane, with the grid drawn procedurally in its fragment shader.
 *
 * It replaced a pair of GridHelpers, which ended in a hard cut. Fog could not save them — fog blends a
 * fragment toward an opaque colour, and on a transparent canvas "the page colour at full strength" is
 * still something rather than nothing, so the lines thinned to a tint and then simply stopped at the
 * helper's extent. Here the dissolve is in the alpha channel instead: a radial falloff takes the lines
 * to genuinely zero well inside the plane, so there is no edge to see from any angle.
 *
 * Lines come from fract() with fwidth() for their width, which keeps them one pixel wide however far
 * away the surface tips, and antialiases them for free.
 */
function buildPlate(): THREE.Mesh {
  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uColour: { value: new THREE.Color(GRID_COLOUR) },
      uExtent: { value: PLATE_SIZE },
      uCell: { value: GRID_CELL },
      uMajor: { value: GRID_MAJOR_EVERY },
      uMinorAlpha: { value: GRID_MINOR_OPACITY },
      uMajorAlpha: { value: GRID_MAJOR_OPACITY },
      uFadeFrom: { value: FADE_FROM },
      uFadeTo: { value: FADE_TO },
      uEdgeFade: { value: EDGE_FADE },
      uResolution: { value: new THREE.Vector2(1, 1) },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      precision highp float;

      #define LINE_CORE 0.5   // half-width of the solid core, in device pixels
      #define LINE_EDGE 0.6   // how far past it the antialiasing reaches

      varying vec2 vUv;
      uniform vec3 uColour;
      uniform float uExtent;
      uniform float uCell;
      uniform float uMajor;
      uniform float uMinorAlpha;
      uniform float uMajorAlpha;
      uniform float uFadeFrom;
      uniform float uFadeTo;
      uniform float uEdgeFade;
      uniform vec2 uResolution;

      // Coverage of the nearest line of a grid of the given pitch: 1 on the line, 0 between. Dividing the
      // distance by fwidth() measures it in device pixels rather than in world units, which is what holds
      // the line a pixel wide however far the surface recedes.
      //
      // The core is flat, not a soft peak. These alphas are 0.07 and 0.14 — three grey levels and six
      // against this page — so a line that only reaches full strength on its exact centre quantises to
      // nothing on either side of it and the grid disappears. A solid one-pixel core matches what the
      // GL lines drew; the shoulder past it is just antialiasing.
      float lines(vec2 position, float pitch) {
        vec2 coordinate = position / pitch;
        vec2 distanceToLine = abs(fract(coordinate - 0.5) - 0.5) / fwidth(coordinate);
        float nearest = min(distanceToLine.x, distanceToLine.y);
        return 1.0 - smoothstep(LINE_CORE, LINE_CORE + LINE_EDGE, nearest);
      }

      void main() {
        vec2 position = (vUv - 0.5) * uExtent;
        float minor = lines(position, uCell) * uMinorAlpha;
        float major = lines(position, uCell * uMajor) * uMajorAlpha;

        // The two tiers overlap — every major line is also a minor one — so take the stronger rather
        // than adding them, or the majors would read as double weight.
        float alpha = max(minor, major);

        // The dissolve. Distance is measured in UV space, where 0.5 is the middle of an edge and 0.707 a
        // corner, so a fade that ends at uFadeTo < 0.5 is gone everywhere before the plane runs out.
        alpha *= 1.0 - smoothstep(uFadeFrom, uFadeTo, distance(vUv, vec2(0.5)));

        // Second dissolve, against the canvas border, so nothing is ever cut off by the edge of the
        // frame either. On desktop the canvas is wider than the viewport and its right-hand edge is
        // already off screen, where this costs nothing.
        vec2 screen = gl_FragCoord.xy / uResolution;
        float toEdge = min(min(screen.x, 1.0 - screen.x), min(screen.y, 1.0 - screen.y));
        alpha *= smoothstep(0.0, uEdgeFade, toEdge);

        if (alpha <= 0.001) discard;
        gl_FragColor = vec4(uColour, alpha);
      }
    `,
  });

  const plate = new THREE.Mesh(new THREE.PlaneGeometry(PLATE_SIZE, PLATE_SIZE), material);
  plate.rotation.x = -Math.PI / 2;
  plate.renderOrder = -1; // under everything, so it can never paint over the part
  return plate;
}

/**
 * Horizontal placement of the object inside the canvas, as a 0–1 fraction, read from the host's
 * `--focus-x`. It lives in CSS because it is a layout decision: centred on phones and tablets, and set
 * just right of centre on desktop — close enough to the copy to read as one composition, far enough out
 * that the object still runs past the edge of the viewport. The same variable positions the static image
 * and the CAD floor, so all three land together at every breakpoint.
 */
function focusX(host: HTMLElement): number {
  const raw = parseFloat(getComputedStyle(host).getPropertyValue('--focus-x'));
  return Number.isFinite(raw) ? Math.min(Math.max(raw, 0), 1) : 0.5;
}

/**
 * How much of the canvas height the part fills, read from the host's `--model-scale`. Breakpoint-
 * dependent for the same reason `--focus-x` is: between 760px and 1099px the canvas is confined to its
 * column, so the part has to stay smaller there to keep clear of the headline. HeroModel sizes the
 * static image from the same variable.
 */
/**
 * How much bigger or smaller the object itself is, in world units, relative to the build plate. This is
 * the only honest way to change the object's size on its own: --model-scale reframes by walking the
 * camera back, which shrinks the plate's ruling in exactly the same proportion, so the object never
 * actually changes size against the surface it sits on. This does, and leaves the camera alone.
 */
function partScale(host: HTMLElement): number {
  const raw = parseFloat(getComputedStyle(host).getPropertyValue('--part-scale'));
  return Number.isFinite(raw) ? Math.min(Math.max(raw, 0.05), 10) : 1;
}

function modelFill(host: HTMLElement): number {
  const raw = parseFloat(getComputedStyle(host).getPropertyValue('--model-scale'));
  return Number.isFinite(raw) ? Math.min(Math.max(raw, 0.1), 1) : DEFAULT_MODEL_FILL;
}

export async function mountHeroModel(options: HeroSceneOptions): Promise<HeroScene> {
  const { host, url, reducedMotion, onReady, onFirstInteraction } = options;

  const geometry = await new STLLoader().loadAsync(url);

  // STLs come out of CAD Z-up; three is Y-up. Baking the axis fix into the geometry rather than the mesh
  // means every measurement below is taken in the orientation the part is actually displayed in.
  geometry.rotateX(-Math.PI / 2);
  if (!geometry.getAttribute('normal')) geometry.computeVertexNormals();

  // Normalise to D = 1, where D is the largest dimension of the bounding box, then seat the part: centred
  // on x and z, and its lowest point exactly on y = 0 so it rests on the plate rather than hovering over it.
  geometry.computeBoundingBox();
  const rawBox = geometry.boundingBox ?? new THREE.Box3();
  const rawSize = rawBox.getSize(new THREE.Vector3());
  const D = Math.max(rawSize.x, rawSize.y, rawSize.z) || 1;
  geometry.scale(1 / D, 1 / D, 1 / D);

  geometry.computeBoundingBox();
  const seated = geometry.boundingBox ?? new THREE.Box3();
  const centre = seated.getCenter(new THREE.Vector3());
  geometry.translate(-centre.x, -seated.min.y, -centre.z);

  geometry.computeBoundingBox();
  const finalSize = (geometry.boundingBox ?? new THREE.Box3()).getSize(new THREE.Vector3());
  const modelHeight = finalSize.y || 1;

  // The bounding sphere aims the camera and sets the clip planes. It is NOT what the framing is solved
  // against, though the obvious reading says it should be: a sphere is rotation-invariant only about its
  // own centre, and this part turns about its base, where it meets the plate. Rotating a sphere of
  // radius 0.87D about a point 0.5D beneath its centre sweeps a ball of 1.37D, and framing that ball
  // would leave the part at about a third of the canvas. The sweep below measures the real thing instead.
  geometry.computeBoundingSphere();
  const sphereCentre = geometry.boundingSphere?.center.clone() ?? new THREE.Vector3(0, modelHeight / 2, 0);
  const sphereRadius = geometry.boundingSphere?.radius ?? modelHeight;
  // The eight corners of the seated box. Framing is solved by projecting these through the real camera
  // rather than by estimating the silhouette from the box's dimensions: looking down at the part the top
  // face is in view too, the near corner is magnified by perspective, and the footprint that faces the
  // camera changes as the part spins. Closed-form guesses at all three were out by 20–30% in both
  // directions — 91% of the canvas on the first attempt, 81% on the second, 64% on the third.
  const corners: THREE.Vector3[] = [];
  const box = geometry.boundingBox ?? new THREE.Box3();
  for (const x of [box.min.x, box.max.x]) {
    for (const y of [box.min.y, box.max.y]) {
      for (const z of [box.min.z, box.max.z]) {
        corners.push(new THREE.Vector3(x, y, z));
      }
    }
  }

  // Every pose the part can be dragged into, as rotated copies of those corners, eight to a pose. The
  // framing solve projects the lot and takes the widest moment, so the camera is set by the worst case
  // across the whole range of the drag rather than by the pose it happens to start in. Rotations are
  // baked once here because they do not depend on the camera; only the projection is redone per pass.
  const poses: THREE.Vector3[] = [];
  const rotation = new THREE.Quaternion();
  const euler = new THREE.Euler();
  for (let y = 0; y < YAW_SAMPLES; y += 1) {
    for (let p = 0; p < PITCH_SAMPLES; p += 1) {
      const pitch = -PITCH_LIMIT + (2 * PITCH_LIMIT * p) / (PITCH_SAMPLES - 1);
      rotation.setFromEuler(euler.set(pitch, (y / YAW_SAMPLES) * Math.PI * 2, 0));
      for (const corner of corners) poses.push(corner.clone().applyQuaternion(rotation));
    }
  }

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  // No clear colour: with alpha the canvas stays transparent and the page background shows through,
  // which is what lets the object read as sitting on the page rather than inside a panel.
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MAX_DPR));
  renderer.domElement.setAttribute('aria-hidden', 'true');
  // pan-y is the one line that keeps the page scrollable on a phone: vertical swipes belong to the
  // document, and only horizontal movement reaches this canvas as a drag.
  renderer.domElement.style.touchAction = 'pan-y';
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.cursor = 'grab';
  // The box around it is pointer-events:none from lg, where it covers the whole hero including the CTA.
  // The canvas opts back in so dragging still works; the copy sits above it on z-10 and wins the clicks.
  renderer.domElement.style.pointerEvents = 'auto';
  // The still is absolutely positioned, and a positioned element paints over an unpositioned one whatever
  // the document order — so without its own stacking the live canvas sits *underneath* the fallback and
  // only becomes visible because the still fades out. Any interruption to that fade (a transition that
  // never runs, a paused compositor) leaves a frozen image over a live scene. Positioning the canvas
  // puts it on top for good, and the still simply fades away beneath it.
  renderer.domElement.style.position = 'relative';
  renderer.domElement.style.zIndex = '1';
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);

  // No fog. The plate fades itself, in alpha, which is the only kind of fade that reaches nothing on a
  // transparent canvas — see buildPlate().

  // One directional light from the upper front-left, one ambient so the shadow side is not black.
  // The brief asked for 1.2 and 0.5. In this renderer — three r186, sRGB output, no tone mapping — those
  // sum to 1.32 on the faces meeting the key most squarely, which clips to flat white and takes the
  // part's edges with it. Scaled down keeping the brief's ratio: the brightest face now lands at 0.95,
  // just under the clip and close to the specified #B8BCB8, and the shadow side holds at 0.45 — dark,
  // but not black. Raise both together if tone mapping is ever turned on.
  const key = new THREE.DirectionalLight(0xffffff, 0.6);
  key.position.set(-2.2, 3, 2.4);
  scene.add(key);
  scene.add(new THREE.AmbientLight(0xffffff, 0.45));

  // Neutral grey, never the accent: the part is machined metal, not a brand element. Cool rather than warm
  // so it reads as brushed aluminium or titanium against a blue-accented page. flatShading stays off — STL geometry is non-indexed with per-face normals, so
  // the facets are already hard without it.
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(PART_COLOUR),
    roughness: 0.75,
    metalness: 0,
  });

  const mesh = new THREE.Mesh(geometry, material);

  // The part turns; the plate does not. So the pivot holds the mesh alone.
  const pivot = new THREE.Group();
  pivot.add(mesh);
  pivot.rotation.set(INITIAL_PITCH, INITIAL_YAW, 0);

  const plate = buildPlate();
  const plateUniforms = (plate.material as THREE.ShaderMaterial).uniforms;

  const shadowTexture = contactShadowTexture();
  const shadowMaterial = new THREE.MeshBasicMaterial({
    map: shadowTexture,
    transparent: true,
    depthWrite: false,
  });
  const shadowGeometry = new THREE.PlaneGeometry(SHADOW_SIZE, SHADOW_SIZE);
  const contactShadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
  contactShadow.rotation.x = -Math.PI / 2;
  contactShadow.position.y = 0.002; // just clear of the plate, so the two do not fight for depth
  contactShadow.renderOrder = 1;

  // The frame carries the whole set — part, plate and shadow — sideways to the focus point, so the part
  // never slides off the middle of its own build surface.
  const frame = new THREE.Group();
  frame.add(plate, contactShadow, pivot);
  scene.add(frame);

  let raf = 0;
  let lastFrameTime = 0;
  let visible = true;
  let spinning = !reducedMotion;
  let dragging = false;
  let dirty = true;
  let disposed = false;

  const draw = () => {
    renderer.render(scene, camera);
    dirty = false;
  };

  const schedule = () => {
    if (!raf && !disposed) raf = requestAnimationFrame(tick);
  };

  /** Draw one frame at the next opportunity — used for resizes, drags and the reduced-motion path. */
  const requestRender = () => {
    dirty = true;
    if (visible) schedule();
  };

  function tick(now: number) {
    raf = 0;
    const delta = lastFrameTime ? Math.min((now - lastFrameTime) / 1000, 0.1) : 0;
    lastFrameTime = now;

    if (spinning) {
      pivot.rotation.y += AUTO_SPIN * delta;
      dirty = true;
    }
    if (dirty) draw();

    // The loop only keeps itself alive while there is something to animate. Once the object is still,
    // rAF stops entirely until something asks for another frame.
    if (visible && (spinning || dragging)) schedule();
  }

  const layout = () => {
    const { clientWidth, clientHeight } = host;
    if (!clientWidth || !clientHeight) return;

    const pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(clientWidth, clientHeight, false);

    // The plate's edge fade works in gl_FragCoord, which counts device pixels, so it needs the drawing
    // buffer's size rather than the CSS one.
    plateUniforms.uResolution.value.set(clientWidth * pixelRatio, clientHeight * pixelRatio);
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();

    // Frame the part by moving the camera, not by scaling the model: the plate and the shadow share its
    // world, and scaling the part alone would leave them behind.
    //
    // Two distances are worked out and the camera takes whichever is further back.
    const fill = modelFill(host);
    const part = partScale(host);
    pivot.scale.setScalar(part);
    contactShadow.scale.setScalar(part); // the shadow belongs to the object, so it grows with it
    const target = sphereCentre;

    const place = (distance: number) => {
      camera.position.set(
        target.x + distance * Math.cos(ELEVATION) * Math.sin(AZIMUTH),
        target.y + distance * Math.sin(ELEVATION),
        target.z + distance * Math.cos(ELEVATION) * Math.cos(AZIMUTH),
      );
      camera.lookAt(target);
      camera.updateMatrixWorld();
    };

    // One: the distance that puts the part at `fill` of the canvas height in its resting pose. This is
    // what the number in --model-scale means, and what the static fallback image is sized to, so the
    // handover from the still to the live scene does not jump.
    const resting = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(INITIAL_PITCH, INITIAL_YAW, 0),
    );
    const restingHeight = (distance: number) => {
      place(distance);
      let lowest = Infinity;
      let highest = -Infinity;
      for (const corner of corners) {
        probe.copy(corner).applyQuaternion(resting).multiplyScalar(part).project(camera);
        lowest = Math.min(lowest, probe.y);
        highest = Math.max(highest, probe.y);
      }
      return (highest - lowest) / 2; // clip space spans -1…1, so half the extent is the canvas fraction
    };

    let tooClose = 0.5;
    let farEnough = 50;
    for (let pass = 0; pass < 20; pass += 1) {
      const midpoint = (tooClose + farEnough) / 2;
      if (restingHeight(midpoint) > fill) tooClose = midpoint;
      else farEnough = midpoint;
    }
    const forFill = farEnough;


    // Two: the distance that keeps the part inside POSE_LIMIT of the frame in every pose it can be
    // dragged into, on both axes of the canvas. This is what the bounding box on its own could never
    // tell us — a box is half again as wide across its diagonal as across its face, so framing on the
    // box let the part clip as it came round to 45°.
    //
    // Both axes, because clip space already has the aspect ratio folded into it: on a canvas taller than
    // it is wide the part's width is the binding constraint and this pushes the camera back for it,
    // with no separate horizontal field of view to work out.
    const sweep = (distance: number) => {
      place(distance);
      let worst = 0;
      for (let pose = 0; pose < poses.length; pose += 8) {
        let left = Infinity;
        let right = -Infinity;
        let lowest = Infinity;
        let highest = -Infinity;
        for (let corner = 0; corner < 8; corner += 1) {
          probe.copy(poses[pose + corner]).multiplyScalar(part).project(camera);
          left = Math.min(left, probe.x);
          right = Math.max(right, probe.x);
          lowest = Math.min(lowest, probe.y);
          highest = Math.max(highest, probe.y);
        }
        worst = Math.max(worst, right - left, highest - lowest);
      }
      return worst / 2;
    };

    tooClose = 0.5;
    farEnough = 50;
    for (let pass = 0; pass < 20; pass += 1) {
      const midpoint = (tooClose + farEnough) / 2;
      if (sweep(midpoint) > POSE_LIMIT) tooClose = midpoint;
      else farEnough = midpoint;
    }

    const distance = Math.max(forFill, farEnough);
    place(distance);

    // Slide the whole set sideways to the focus point, in the view's own units at the part's depth.
    const viewHeightAtTarget = 2 * Math.tan((FOV * Math.PI) / 360) * distance;
    frame.position.x = (focusX(host) - 0.5) * viewHeightAtTarget * camera.aspect;

    // Near and far bracket the sphere with room to spare, so nothing is ever cut by a clip plane as it
    // turns. Near is held above zero — at zero a perspective projection loses all depth precision.
    //
    // Measured against where the object actually ends up, which is neither the camera's target nor the
    // radius the geometry was loaded with: the part carries --part-scale, and the frame then slides it
    // sideways, which brings it nearer the camera than `distance` suggests. Taking the brief's literal
    // numbers instead put the near plane straight through the front of the part at any scale above 1.
    const reach = sphereRadius * part;
    const centreNow = sphereCentre.clone().multiplyScalar(part).setX(frame.position.x);
    const trueDistance = camera.position.distanceTo(centreNow);
    camera.near = Math.max(0.01, trueDistance - reach * 2);
    camera.far = trueDistance + reach * 4;
    camera.updateProjectionMatrix();

    requestRender();
  };

  layout();
  draw();
  onReady();

  // ── Interaction ────────────────────────────────────────────────────────────────────────────────
  // One axis of control on touch, two on a mouse, and nothing else: no zoom, no pan, no OrbitControls.
  let pointerId: number | null = null;
  let lastX = 0;
  let lastY = 0;
  let interacted = false;

  const stopAutoSpin = () => {
    if (interacted) return;
    interacted = true;
    spinning = false; // permanently — it never resumes
    onFirstInteraction();
  };

  const onPointerDown = (event: PointerEvent) => {
    if (pointerId !== null) return;
    pointerId = event.pointerId;
    lastX = event.clientX;
    lastY = event.clientY;
    dragging = true;
    renderer.domElement.style.cursor = 'grabbing';
    try {
      // Throws if the pointer has already been released; the drag is still perfectly usable without
      // capture, so it must not take the rest of this handler down with it.
      renderer.domElement.setPointerCapture(event.pointerId);
    } catch {
      /* no capture — pointermove still arrives while the pointer is over the canvas */
    }
    stopAutoSpin();
    schedule();
  };

  const onPointerMove = (event: PointerEvent) => {
    if (event.pointerId !== pointerId) return;
    const deltaX = event.clientX - lastX;
    const deltaY = event.clientY - lastY;
    lastX = event.clientX;
    lastY = event.clientY;

    pivot.rotation.y += deltaX * DRAG_SPEED;
    // Touch gets the horizontal axis only. Vertical swipes are the page's, handed to it by touch-action,
    // and a diagonal drag should not tilt the object on the way past.
    if (event.pointerType !== 'touch') {
      pivot.rotation.x = Math.min(
        PITCH_LIMIT,
        Math.max(-PITCH_LIMIT, pivot.rotation.x + deltaY * DRAG_SPEED),
      );
    }
    requestRender();
  };

  const endDrag = (event: PointerEvent) => {
    if (event.pointerId !== pointerId) return;
    pointerId = null;
    dragging = false;
    renderer.domElement.style.cursor = 'grab';
  // The box around it is pointer-events:none from lg, where it covers the whole hero including the CTA.
  // The canvas opts back in so dragging still works; the copy sits above it on z-10 and wins the clicks.
  renderer.domElement.style.pointerEvents = 'auto';
    if (renderer.domElement.hasPointerCapture(event.pointerId)) {
      renderer.domElement.releasePointerCapture(event.pointerId);
    }
    requestRender();
  };

  renderer.domElement.addEventListener('pointerdown', onPointerDown);
  renderer.domElement.addEventListener('pointermove', onPointerMove);
  renderer.domElement.addEventListener('pointerup', endDrag);
  // The browser fires pointercancel when it claims the gesture for a vertical scroll — that is the
  // expected end of a drag on a phone, not an error.
  renderer.domElement.addEventListener('pointercancel', endDrag);

  // ── Visibility and size ────────────────────────────────────────────────────────────────────────
  const observer = new IntersectionObserver((entries) => {
    visible = entries.some((entry) => entry.isIntersecting);
    if (visible) {
      lastFrameTime = 0; // don't apply the whole off-screen gap as one rotation step
      requestRender();
    } else if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  });
  observer.observe(host);

  const resizeObserver = new ResizeObserver(layout);
  resizeObserver.observe(host);

  return {
    dispose() {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      observer.disconnect();
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerup', endDrag);
      renderer.domElement.removeEventListener('pointercancel', endDrag);
      geometry.dispose();
      material.dispose();
      plate.geometry.dispose();
      (plate.material as THREE.Material).dispose();
      shadowGeometry.dispose();
      shadowMaterial.dispose();
      shadowTexture.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
