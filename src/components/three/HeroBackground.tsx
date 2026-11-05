"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/**
 * Reads the current `--accent` token so the 3D scene always matches the
 * active theme (and re-reads when the theme is toggled).
 */
function useAccentColor(fallback: string): string {
  const [color, setColor] = useState(fallback);

  useEffect(() => {
    const read = () => {
      const value = window
        .getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim();

      if (value) setColor(value);
    };

    read();

    // ThemeToggle dispatches "themechange" when the user switches themes.
    window.addEventListener("themechange", read);

    return () => {
      window.removeEventListener("themechange", read);
    };
  }, []);

  return color;
}

/** True while the light theme class is on <html>. */
function useIsLightTheme(): boolean {
  const [isLight, setIsLight] = useState(
    () =>
      typeof window !== "undefined" &&
      document.documentElement.classList.contains("light"),
  );

  useEffect(() => {
    const read = () => {
      setIsLight(document.documentElement.classList.contains("light"));
    };

    read();

    window.addEventListener("themechange", read);

    return () => {
      window.removeEventListener("themechange", read);
    };
  }, []);

  return isLight;
}

/** True below the 768px breakpoint. */
function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767px)").matches,
  );

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");

    const update = () => {
      setIsMobile(query.matches);
    };

    update();

    query.addEventListener("change", update);

    return () => {
      query.removeEventListener("change", update);
    };
  }, []);

  return isMobile;
}

function ParticleField({
  accent,
  count = 500,
  reducedMotion = false,
}: {
  accent: string;
  count?: number;
  reducedMotion?: boolean;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3);

    // Deterministic random values.
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
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current || reducedMotion) return;

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
        color={accent}
        size={0.018}
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function OrbitalStructure({
  accent,
  reducedMotion = false,
}: {
  accent: string;
  reducedMotion?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (reducedMotion) return;

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
        <meshBasicMaterial color={accent} transparent opacity={0.55} />
      </mesh>

      <mesh rotation={[0.6, 1.1, 0.8]}>
        <torusGeometry args={[1.85, 0.006, 12, 120]} />
        <meshBasicMaterial color={accent} transparent opacity={0.3} />
      </mesh>

      <Float
        speed={reducedMotion ? 0 : 1.5}
        rotationIntensity={reducedMotion ? 0 : 0.5}
        floatIntensity={reducedMotion ? 0 : 0.7}
      >
        <mesh ref={innerRef}>
          <icosahedronGeometry args={[0.62, 2]} />
          <meshStandardMaterial
            color={accent}
            metalness={0.8}
            roughness={0.2}
            wireframe
            emissive={accent}
            emissiveIntensity={0.5}
          />
        </mesh>
      </Float>

      <mesh>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshBasicMaterial color={accent} transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

function Scene({
  accent,
  reducedMotion = false,
  mobile = false,
}: {
  accent: string;
  reducedMotion?: boolean;
  mobile?: boolean;
}) {
  const viewport = useThree((state) => state.viewport);

  // Mobile: sphere ke choto kore top-right corner-e rakho,
  // jate heading ar paragraph-er pichone na pore.
  const position: [number, number, number] = mobile
    ? [viewport.width * 0.27, viewport.height * 0.33, 0]
    : [0, 0, 0];

  return (
    <>
      <ambientLight intensity={0.7} />

      <pointLight position={[2, 2, 3]} color={accent} intensity={2} />

      <ParticleField
        accent={accent}
        count={mobile ? 180 : 500}
        reducedMotion={reducedMotion}
      />

      <group position={position} scale={mobile ? 0.5 : 1}>
        <OrbitalStructure accent={accent} reducedMotion={reducedMotion} />
      </group>

      {!reducedMotion && (
        <Sparkles
          count={mobile ? 15 : 45}
          scale={5}
          size={2}
          speed={0.25}
          color={accent}
          opacity={0.6}
        />
      )}
    </>
  );
}

export default function HeroBackground() {
  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;

    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const accent = useAccentColor("#45d6c5");
  const isLight = useIsLightTheme();
  const isMobile = useIsMobile();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  // Hero screen-er baire gele render pause hobe (mobile performance).
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  // Light mode ar mobile-e background halka hobe. Dark desktop age-r moto.
  const opacity = isLight ? (isMobile ? 0.22 : 0.45) : isMobile ? 0.45 : 1;

  return (
    <div
      ref={wrapperRef}
      style={{ opacity }}
      className="pointer-events-none absolute inset-0 -z-0 overflow-hidden transition-opacity duration-300"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,var(--accent-glow),transparent_35%)]" />

      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={isMobile ? 1 : [1, 1.5]}
        frameloop={reducedMotion || !inView ? "demand" : "always"}
        gl={{
          alpha: true,
          antialias: !isMobile,
          powerPreference: "high-performance",
        }}
      >
        <Scene
          accent={accent}
          reducedMotion={reducedMotion}
          mobile={isMobile}
        />
      </Canvas>
    </div>
  );
}
