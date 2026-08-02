"use client";

import { useRef } from "react";
import { useFloatingStickers } from "../../animation/useFloatingStickers";
import { SectionFrame } from "../../shared/SectionFrame";

export function AboutSection() {
  const section = useRef<HTMLElement>(null);
  useFloatingStickers(section);

  return (
    <SectionFrame ref={section} name="about" className="about-section">
      <p className="eyebrow">ABOUT / 01</p>
      <div className="about-copy">
        <p>
          I build at the intersection of AI, design, taste, and engineering—turning complex systems
          into products that feel clear, useful, and distinctly considered.
        </p>
        <p>
          Previously at Microsoft, I helped ship privacy-first people identification for Teams Rooms.
          I&apos;m now pursuing an MSE at Carnegie Mellon University and exploring how thoughtful AI can
          improve the way people learn, create, and collaborate.
        </p>
      </div>
      <div
        className="about-sticker about-orbit"
        data-floating-sticker
        aria-hidden="true"
      >
        <span>BZ</span>
        <i />
      </div>
    </SectionFrame>
  );
}
