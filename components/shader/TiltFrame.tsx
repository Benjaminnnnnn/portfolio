"use client";

import type { PointerEvent, ReactNode } from "react";

// A 3D card that leans toward the cursor (Aceternity "3D card" pattern).
export function TiltFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    e.currentTarget.style.setProperty("--ry", `${(x - 0.5) * 8}deg`);
    e.currentTarget.style.setProperty("--rx", `${(0.5 - y) * 6}deg`);
    e.currentTarget.style.setProperty("--mx", `${x * 100}%`);
    e.currentTarget.style.setProperty("--my", `${y * 100}%`);
  };
  const leave = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--ry", "0deg");
    e.currentTarget.style.setProperty("--rx", "0deg");
  };
  return <div className={`tilt-frame ${className}`} onPointerMove={move} onPointerLeave={leave}>
    <div className="tilt-frame-inner">{children}<span className="card-spotlight" aria-hidden="true" /></div>
  </div>;
}
