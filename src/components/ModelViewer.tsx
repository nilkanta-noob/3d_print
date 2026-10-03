"use client";

import React, { useMemo, Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Bounds, Center, Html } from '@react-three/drei';
import { STLLoader } from 'three-stdlib';
import { OBJLoader } from 'three-stdlib';
import * as THREE from 'three';

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center bg-surface/90 border border-border p-4 rounded-sm backdrop-blur-sm min-w-[150px]">
        <div className="w-8 h-8 border-4 border-accent-primary border-t-transparent rounded-full animate-spin mb-3"></div>
        <span className="text-xs font-bold uppercase tracking-widest text-accent-primary whitespace-nowrap">
          Loading Geometry...
        </span>
      </div>
    </Html>
  );
}

/*
 * A light grey matte, the colour of an unfinished print. It was a copper brown, chosen when the viewer
 * sat on a light panel; against the dark card it now sits in, a warm mid-tone read as murky. Matte
 * because a shiny part hides its own layer lines, which are the thing worth seeing in a preview.
 */
const MODEL_COLOR = '#D5D9E0';

// The card this viewer sits in, so the canvas reads as part of it rather than as a window cut into it.
const VIEWER_BACKGROUND = '#0F1218';

function STLModel({ url }: { url: string }) {
  const geometry = useLoader(STLLoader, url);
  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color={MODEL_COLOR} roughness={0.85} metalness={0} />
    </mesh>
  );
}

function OBJModel({ url }: { url: string }) {
  const obj = useLoader(OBJLoader, url);
  
  useMemo(() => {
    obj.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({
          color: MODEL_COLOR,
          roughness: 0.85,
          metalness: 0,
        });
      }
    });
  }, [obj]);

  return <primitive object={obj} />;
}

export default function ModelViewer({ fileUrl, fileName }: { fileUrl: string; fileName: string }) {
  const extension = fileName.split('.').pop()?.toLowerCase() || '';
  const isStl = extension === 'stl';
  const isObj = extension === 'obj';

  if (!isStl && !isObj) {
    return (
      <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-background/50 rounded-sm border border-border flex-col text-text-secondary">
        <div className="w-16 h-16 mb-4 rounded-full bg-accent-primary/10 flex items-center justify-center">
          <span className="font-bold text-accent-primary uppercase tracking-widest">{extension || 'CAD'}</span>
        </div>
        <p className="text-xs uppercase tracking-widest font-bold">3D Preview Not Available</p>
        <p className="text-xs font-sans mt-2 opacity-70 px-4 text-center">Format .{extension} is accepted, but preview is only available for .stl and .obj</p>
      </div>
    );
  }

  return (
    // No overlay pills: the one line of guidance now sits under the frame, where it does not cover the
    // part it is describing.
    <div className="group relative h-full min-h-[300px] w-full overflow-hidden bg-background">
      <Canvas shadows camera={{ position: [0, 0, 150], fov: 45 }}>
        {/*
          An explicit colour, not 'transparent'. three.js has no such named colour, so the old value
          resolved to white and the preview sat as a bright rectangle in a dark card.
        */}
        <color attach="background" args={[VIEWER_BACKGROUND]} />
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1.5} />
          <directionalLight position={[-10, -10, -10]} intensity={0.5} />
          {/*
            Bounds frames the model from its own bounding box, so a 2mm washer and a 200mm bracket both
            arrive filling the frame — the fixed camera distance suited whichever file was tried first.
            `observe` re-runs the fit when the geometry changes, which is what "Replace file" does, and
            the 1.4 margin leaves the part at roughly 70% of the frame rather than against its edges.
          */}
          <Bounds fit clip observe margin={1.4}>
            <Center>
              {isStl && <STLModel url={fileUrl} />}
              {isObj && <OBJModel url={fileUrl} />}
            </Center>
          </Bounds>
        </Suspense>
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
}
