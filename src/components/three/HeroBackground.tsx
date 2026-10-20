// src/components/three/HeroBackground.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Scene3D from "./Scene3D";

export default function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 opacity-30 lg:left-1/2 lg:opacity-100"
    >
      <Scene3D active={active} />
    </div>
  );
}
