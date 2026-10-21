// src/components/three/TechOrbit.tsx
"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Float, Text } from "@react-three/drei";
import * as THREE from "three";

const techs = ["React", "Next.js", "TypeScript", "Tailwind", "Node.js", "Git"];

const RADIUS = 2.8;

function TechTag({ label }: { label: string }) {
  return (
    <Float speed={2} floatIntensity={0.5} rotationIntensity={0}>
      <Billboard>
        <mesh>
          <planeGeometry args={[1.5, 0.45]} />
          <meshBasicMaterial color="#0a0f05" transparent opacity={0.75} />
        </mesh>
        <Text
          position={[0, 0, 0.02]}
          fontSize={0.2}
          color="#a3e635"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      </Billboard>
    </Float>
  );
}

export default function TechOrbit() {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.25;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      state.pointer.y * 0.3 + 0.25,
      0.05,
    );
  });

  return (
    <group ref={group}>
      {techs.map((label, i) => {
        const angle = (i / techs.length) * Math.PI * 2;
        return (
          <group
            key={label}
            position={[Math.cos(angle) * RADIUS, 0, Math.sin(angle) * RADIUS]}
          >
            <TechTag label={label} />
          </group>
        );
      })}
    </group>
  );
}
