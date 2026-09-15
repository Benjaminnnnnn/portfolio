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
          I&apos;m a master&apos;s student at Carnegie Mellon. My projects range from multiplayer
          games and learning tools to databases and background job systems.
        </p>
        <p>
          Previously at Microsoft, I worked on people identification for Teams Rooms.
          I&apos;m looking for software engineering roles where I can keep building and learning with a team.
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
