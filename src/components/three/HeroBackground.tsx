"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 500;
    const array = new Float32Array(count * 3);

    // Deterministic values: safe during React rendering
    const random = (seed: number) => {
      const value = Math.sin(seed * 127.1) * 43758.5453;
      return value - Math.floor(value);
    };

    for (let i = 0; i < count; i++) {
      const radius = 2 + random(i + 1) * 5;
      const angle = random(i + 501) * Math.PI * 2;

      array[i * 3] = Math.cos(angle) * radius;
      array[i * 3 + 1] = (random(i + 1001) - 0.5) * 6;
      array[i * 3 + 2] = (random(i + 1501) - 0.5) * 5;
    }

    return array;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    pointsRef.current.rotation.y += delta * 0.025;
    pointsRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.1) * 0.08;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>

      <pointsMaterial
        color="#ccff00"
        size={0.018}
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function OrbitalStructure() {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
      groupRef.current.rotation.z += delta * 0.04;
    }

    if (innerRef.current) {
      innerRef.current.rotation.x += delta * 0.18;
      innerRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[1.1, 0.3, 0.2]}>
        <torusGeometry args={[1.55, 0.008, 12, 120]} />
        <meshBasicMaterial color="#ccff00" transparent opacity={0.55} />
      </mesh>

      <mesh rotation={[0.6, 1.1, 0.8]}>
        <torusGeometry args={[1.85, 0.006, 12, 120]} />
        <meshBasicMaterial color="#a6d900" transparent opacity={0.3} />
      </mesh>

      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.7}>
        <mesh ref={innerRef}>
          <icosahedronGeometry args={[0.62, 2]} />
          <meshStandardMaterial
            color="#ccff00"
            metalness={0.8}
            roughness={0.2}
            wireframe
            emissive="#638000"
            emissiveIntensity={0.5}
          />
        </mesh>
      </Float>

      <mesh>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshBasicMaterial color="#ccff00" transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.7} />

      <pointLight position={[2, 2, 3]} color="#ccff00" intensity={2} />

      <ParticleField />
      <OrbitalStructure />

      <Sparkles
        count={45}
        scale={5}
        size={2}
        speed={0.25}
        color="#ccff00"
        opacity={0.6}
      />
    </>
  );
}

export default function HeroBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,rgba(204,255,0,0.09),transparent_35%)]" />

      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
