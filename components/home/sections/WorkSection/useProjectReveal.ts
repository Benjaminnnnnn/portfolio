"use client";

import type { RefObject } from "react";
import { gsap, useGSAP } from "../../../animation/gsap";

export function useProjectReveal(
  section: RefObject<HTMLElement | null>,
  grid: RefObject<HTMLDivElement | null>,
) {
  useGSAP(
    () => {
      const trigger = grid.current;
      const scroller = section.current?.closest<HTMLElement>("#home-scroll");
      if (!trigger || !scroller) return;

      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-project-card]", {
          y: 42,
          autoAlpha: 0,
          duration: 0.7,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger,
            scroller,
            start: "top 78%",
            once: true,
          },
        });
      });
      return () => media.revert();
    },
    { scope: section },
  );
}
