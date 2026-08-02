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
          gsap.to(sticker, {
            y: index % 2 ? 14 : -16,
            rotation: index % 2 ? 5 : -4,
            duration: 2.6 + index * 0.28,
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
