// src/components/three/TechOrbit.tsx
"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Float, RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";

const techs = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind",
  "Node.js",
  "Express",
  "Git",
];

const RADIUS =
  typeof window !== "undefined" && window.innerWidth < 768 ? 2.4 : 3.4;

function TechTag({ label }: { label: string }) {
  return (
    <Float speed={2} floatIntensity={0.6} rotationIntensity={0.2}>
      <Billboard>
        <RoundedBox args={[1.6, 0.55, 0.05]} radius={0.12} smoothness={4}>
          <meshStandardMaterial
            color="#090d16" // Dark glass background
            emissive="#84cc16" // Vibrant lime glow
            emissiveIntensity={0.35} // Glowing border effect
            metalness={0.8}
            roughness={0.2}
          />
        </RoundedBox>

        {/* Text contrast increase kora */}
        <Text
          position={[0, 0, 0.04]}
          fontSize={0.22}
          color="#000000" // Bright white text for readability
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

  // নিজে নিজে ঘুরবে, মাউস নড়লে একটু হেলবে
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
