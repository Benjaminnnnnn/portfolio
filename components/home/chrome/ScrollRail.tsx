"use client";

import { useEffect, useRef } from "react";

type ScrollRailProps = {
  enabled: boolean;
};

export function ScrollRail({ enabled }: ScrollRailProps) {
  const rail = useRef<HTMLDivElement>(null);
  const thumb = useRef<SVGPathElement>(null);

  useEffect(() => {
    const scroller = document.getElementById("home-scroll");
    const element = rail.current;
    const thumbElement = thumb.current;
    if (!enabled || !scroller || !element || !thumbElement) return;

    let fadeTimer = 0;
    let dragging = false;

    const show = () => {
      element.classList.add("is-visible");
      window.clearTimeout(fadeTimer);
      fadeTimer = window.setTimeout(() => element.classList.remove("is-visible"), 1500);
    };
    const update = () => {
      const progress = scroller.scrollTop / Math.max(1, scroller.scrollHeight - scroller.clientHeight);
      thumbElement.style.transform = `translateY(${progress * 168}px)`;
      show();
    };
    const seek = (clientY: number) => {
      const bounds = element.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (clientY - bounds.top - 16) / 168));
      scroller.scrollTop = progress * (scroller.scrollHeight - scroller.clientHeight);
    };
    const handlePointerDown = (event: PointerEvent) => {
      dragging = true;
      element.setPointerCapture(event.pointerId);
      seek(event.clientY);
      show();
    };
    const handlePointerMove = (event: PointerEvent) => {
      if (dragging) seek(event.clientY);
    };
    const handlePointerUp = (event: PointerEvent) => {
      dragging = false;
      if (element.hasPointerCapture(event.pointerId)) element.releasePointerCapture(event.pointerId);
    };

    scroller.addEventListener("scroll", update, { passive: true });
    element.addEventListener("pointerdown", handlePointerDown);
    element.addEventListener("pointermove", handlePointerMove);
    element.addEventListener("pointerup", handlePointerUp);
    element.addEventListener("pointercancel", handlePointerUp);
    update();

    return () => {
      window.clearTimeout(fadeTimer);
      scroller.removeEventListener("scroll", update);
      element.removeEventListener("pointerdown", handlePointerDown);
      element.removeEventListener("pointermove", handlePointerMove);
      element.removeEventListener("pointerup", handlePointerUp);
      element.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [enabled]);

  return (
    <div
      ref={rail}
      className="custom-scroll-rail"
      role="scrollbar"
      aria-controls="home-scroll"
      aria-orientation="vertical"
    >
      <svg width="32" height="200" viewBox="0 0 32 200" aria-hidden="true">
        <path
          d="M 16 6 V 194"
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth="6"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          ref={thumb}
          className="custom-scroll-thumb"
          d="M 16 6 V 26"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
