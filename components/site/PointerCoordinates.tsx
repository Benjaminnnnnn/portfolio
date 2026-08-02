"use client";

import { useEffect, useState } from "react";

function padCoordinate(value: number) {
  return Math.round(value).toString().padStart(4, "0");
}

export function PointerCoordinates() {
  const [coordinates, setCoordinates] = useState("0720 X 0450 Y");

  useEffect(() => {
    let frame = 0;
    let normalizedX = 0.5;
    let normalizedY = 0.5;

    const commit = () => {
      frame = 0;
      const x = padCoordinate(normalizedX * window.innerWidth);
      const y = padCoordinate(normalizedY * window.innerHeight);
      setCoordinates(`${x} X ${y} Y`);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(commit);
    };
    const handlePointerMove = (event: PointerEvent) => {
      normalizedX = event.clientX / Math.max(1, window.innerWidth);
      normalizedY = event.clientY / Math.max(1, window.innerHeight);
      schedule();
    };

    commit();
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return <div className="site-status site-status-center">{coordinates}</div>;
}
