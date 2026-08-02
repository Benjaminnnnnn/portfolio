"use client";

import type { RefObject } from "react";
import { addScrambleAnimations, revealAllScrambleText } from "../../animation/scrambleTimeline";
import { gsap, useGSAP } from "../../animation/gsap";

export function useHomeIntroAnimation(scope: RefObject<HTMLDivElement | null>, ready: boolean) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        if (!ready) return;
        const timeline = gsap.timeline({ defaults: { ease: "none" } });
        timeline.addLabel("intro", 0);
        addScrambleAnimations(root, timeline, ".intro-scramble:not(.contact-scramble)");
        return () => timeline.kill();
      });
      media.add("(prefers-reduced-motion: reduce)", () => {
        revealAllScrambleText(root, ".intro-scramble:not(.contact-scramble)");
      });

      return () => media.revert();
    },
    { scope, dependencies: [ready], revertOnUpdate: true },
  );
}
