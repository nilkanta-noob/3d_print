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

// The object's starting pose. The fallback PNG (public/hero/model-fallback.png) is rendered at exactly
// these angles, so the still and the live model line up.
const INITIAL_YAW = -0.9;
const INITIAL_PITCH = 0.28;

const MAX_DPR = 2;
const AUTO_SPIN = 0.16; // radians per second — one turn takes ~39s
const PITCH_LIMIT = Math.PI / 3; // ±60°, so the object can never be flipped over
const DRAG_SPEED = 0.0075; // radians per pixel dragged
const FOV = 32;
const CAMERA_Z = 3.4;
// The model's bounding sphere as a fraction of the canvas height. A sphere, not the bounding box,
// because the object turns: sized by its widest silhouette it can never clip its own frame.
const MODEL_SCALE = 0.82;

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

/** Reads the brand accent straight off the page so the object cannot drift from the palette. */
function accentColour(): THREE.Color {
  const value = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
  const colour = new THREE.Color();
  try {
    colour.setStyle(value || '#B87333');
  } catch {
    colour.setStyle('#B87333');
  }
  return colour;
}

/**
 * Horizontal placement of the object inside the canvas, as a 0–1 fraction, read from the host's
 * `--focus-x`. It lives in CSS because it is a layout decision: centred on phones and tablets, pushed
 * right on desktop so the object runs off the edge of the viewport. The same variable positions the
 * static image, so both land in the same place at every breakpoint.
 */
function focusX(host: HTMLElement): number {
  const raw = parseFloat(getComputedStyle(host).getPropertyValue('--focus-x'));
  return Number.isFinite(raw) ? Math.min(Math.max(raw, 0), 1) : 0.5;
}

export async function mountHeroModel(options: HeroSceneOptions): Promise<HeroScene> {
  const { host, url, reducedMotion, onReady, onFirstInteraction } = options;

  const geometry = await new STLLoader().loadAsync(url);

  // Centre on the origin and normalise to a unit bounding sphere, so framing maths below is independent
  // of whatever units and origin the STL happened to be authored in.
  geometry.center();
  geometry.computeBoundingSphere();
  const radius = geometry.boundingSphere?.radius ?? 1;
  geometry.scale(1 / radius, 1 / radius, 1 / radius);
  geometry.computeVertexNormals();

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
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);
  camera.position.set(0, 0, CAMERA_Z);

  // One directional light and one ambient. No shadow maps, no environment map, no post-processing.
  const key = new THREE.DirectionalLight(0xffffff, 2.6);
  key.position.set(-1.4, 3.2, 2.5);
  scene.add(key);
  scene.add(new THREE.AmbientLight(0xffffff, 1.1));

  const material = new THREE.MeshStandardMaterial({
    color: accentColour(),
    roughness: 0.62,
    metalness: 0,
    flatShading: true, // the facets are the point: it should read as a printed part, not a smooth render
  });

  const mesh = new THREE.Mesh(geometry, material);
  // STLs come out of CAD Z-up; three is Y-up.
  mesh.rotation.x = -Math.PI / 2;

  // The mesh sits in a pivot so the STL's own axis fix and the user's rotation never fight each other.
  const pivot = new THREE.Group();
  pivot.add(mesh);
  pivot.rotation.set(INITIAL_PITCH, INITIAL_YAW, 0);

  // …and the pivot in a frame that only ever moves sideways, to place the object in the canvas.
  const frame = new THREE.Group();
  frame.add(pivot);
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

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MAX_DPR));
    renderer.setSize(clientWidth, clientHeight, false);
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();

    // Fit the object to the canvas, then slide it sideways to its focus point. Both are derived from the
    // view's real dimensions at the object's depth, so they hold at any size or aspect ratio.
    const viewHeight = 2 * Math.tan((FOV * Math.PI) / 360) * CAMERA_Z;
    const viewWidth = viewHeight * camera.aspect;
    const scale = (viewHeight * MODEL_SCALE) / 2;
    pivot.scale.setScalar(scale);
    frame.position.x = (focusX(host) - 0.5) * viewWidth;

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
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
