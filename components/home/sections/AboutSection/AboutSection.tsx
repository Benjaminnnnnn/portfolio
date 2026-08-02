"use client";

import Image from "next/image";
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
          I explore how to shape AI-era workflows with craft and taste, building the next generation of
          digital products.
        </p>
        <p>
          I&apos;m building reunimos™, and previously worked on Alibaba aDrive, Teambition, and 100offer.
        </p>
      </div>
      <Image
        className="about-sticker sticker"
        data-floating-sticker
        src="/sticker_img/s_04.png"
        alt=""
        width={160}
        height={160}
      />
    </SectionFrame>
  );
}
