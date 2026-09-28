"use client";

import type { RefObject } from "react";
import { gsap, useGSAP } from "../../../animation/gsap";
import { addScrambleAnimations, revealAllScrambleText } from "../../../animation/scrambleTimeline";

export function useContactReveal(section: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const element = section.current;
      const scroller = element?.closest<HTMLElement>("#home-scroll");
      if (!element || !scroller) return;

      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            scroller,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
          },
        });
        timeline.addLabel("contactReveal", 0);
        addScrambleAnimations(element, timeline, ".contact-scramble");
      });
      media.add("(prefers-reduced-motion: reduce)", () => {
        revealAllScrambleText(element, ".contact-scramble");
      });

      return () => media.revert();
    },
    { scope: section },
  );
}
