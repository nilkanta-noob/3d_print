"use client";

import React, { useMemo, Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Stage, Center, Html, useProgress } from '@react-three/drei';
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

function STLModel({ url }: { url: string }) {
  const geometry = useLoader(STLLoader, url);
  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="#22d3ee" roughness={0.3} metalness={0.1} />
    </mesh>
  );
}

function OBJModel({ url }: { url: string }) {
  const obj = useLoader(OBJLoader, url);
  
  useMemo(() => {
    obj.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({
          color: "#22d3ee",
          roughness: 0.3,
          metalness: 0.1,
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
      <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-background/50 rounded-sm border border-border flex-col text-text-muted">
        <div className="w-16 h-16 mb-4 rounded-full bg-accent-primary/10 flex items-center justify-center">
          <span className="font-bold text-accent-primary uppercase tracking-widest">{extension || 'CAD'}</span>
        </div>
        <p className="text-xs uppercase tracking-widest font-bold">3D Preview Not Available</p>
        <p className="text-xs font-sans mt-2 opacity-70 px-4 text-center">Format .{extension} is accepted, but preview is only available for .stl and .obj</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[300px] bg-background/50 rounded-sm border border-border relative overflow-hidden group">
      <div className="absolute top-4 left-4 z-10 bg-background/80 backdrop-blur px-3 py-1.5 rounded-sm border border-border/50">
        <span className="text-[10px] font-bold text-accent-primary uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Interactive Preview
        </span>
      </div>
      
      <div className="absolute top-4 right-4 z-10 text-[10px] font-bold text-text-muted uppercase tracking-widest bg-background/80 backdrop-blur px-3 py-1.5 rounded-sm border border-border/50">
        Drag to rotate • Scroll to zoom
      </div>

      <Canvas shadows camera={{ position: [0, 0, 150], fov: 45 }}>
        <color attach="background" args={['transparent']} />
        <Suspense fallback={<Loader />}>
          <Stage environment="city" intensity={0.5} adjustCamera={1.2}>
            <Center>
              {isStl && <STLModel url={fileUrl} />}
              {isObj && <OBJModel url={fileUrl} />}
            </Center>
          </Stage>
        </Suspense>
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
}
