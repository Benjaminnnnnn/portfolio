"use client";

import type { RefObject } from "react";
import { gsap, useGSAP } from "../../animation/gsap";

export function useFloatingStickers(
  scope: RefObject<HTMLElement | null>,
  indexOffset = 0,
) {
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const stickers = scope.current?.querySelectorAll<HTMLElement>("[data-floating-sticker]");
        stickers?.forEach((sticker, localIndex) => {
          const index = localIndex + indexOffset;
          const emphasis = sticker.dataset.emphasis === "true";
          const direction = index % 2 ? 1 : -1;
          gsap.to(sticker, {
            x: direction * (emphasis ? 22 : 11),
            y: direction * (emphasis ? 18 : 12),
            rotation: direction * (emphasis ? 4 : 6),
            duration: (emphasis ? 4.2 : 3.1) + index * 0.19,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
      });
      return () => media.revert();
    },
    { scope },
  );
}
