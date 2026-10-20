// src/components/three/Scene3D.tsx
"use client";

import { useRef, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";
import TechOrbit from "./TechOrbit";

function Orb() {
  const ref = useRef<THREE.Mesh>(null);

  // মাউস নড়লে orb ঘুরবে
  useFrame((state) => {
    if (!ref.current) return;
    const { x, y } = state.pointer;
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      x * 0.8,
      0.05,
    );
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      -y * 0.5,
      0.05,
    );
  });

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1.5}>
      <mesh ref={ref} scale={1.7}>
        <icosahedronGeometry args={[1, 8]} />
        <MeshDistortMaterial
          color="#a3e635"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>
    </Float>
  );
}

// স্ক্রল করলে ছোট হবে আর উপরে সরবে
function ScrollRig({ children }: { children: ReactNode }) {
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!ref.current) return;
    const p = Math.min(window.scrollY / window.innerHeight, 1);
    const s = THREE.MathUtils.lerp(ref.current.scale.x, 1 - p * 0.5, 0.1);
    ref.current.scale.setScalar(s);
    ref.current.position.y = THREE.MathUtils.lerp(
      ref.current.position.y,
      p * 2,
      0.1,
    );
  });

  return <group ref={ref}>{children}</group>;
}

export default function Scene3D({ active = true }: { active?: boolean }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 8], fov: 50 }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
      <pointLight position={[-5, -3, -2]} intensity={3} color="#a3e635" />
      <Stars radius={60} depth={40} count={1500} factor={3} fade speed={1} />
      <ScrollRig>
        <Orb />
        <TechOrbit />
      </ScrollRig>
    </Canvas>
  );
}
