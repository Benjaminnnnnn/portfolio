"use client";

import { useState, type RefObject } from "react";
import { gsap, useGSAP } from "../../../animation/gsap";

const PURPOSE_TIMELINE_DURATION = 8;

export function usePurposeTimeline(section: RefObject<HTMLElement | null>) {
  const [ringProgress, setRingProgress] = useState(0);

  useGSAP(
    () => {
      const element = section.current;
      const scroller = element?.closest<HTMLElement>("#home-scroll");
      if (!element || !scroller) return;

      const primary = element.querySelector<HTMLElement>(".stage-primary");
      const secondary = element.querySelector<HTMLElement>(".stage-secondary");
      const principles = element.querySelector<HTMLElement>(".stage-principles");
      const final = element.querySelector<HTMLElement>(".stage-final");
      const stages = element.querySelectorAll<HTMLElement>(".hyper-stage");
      if (!primary || !secondary || !principles || !final) return;

      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(stages, { autoAlpha: 0 });
        gsap.set(primary, { autoAlpha: 1 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            scroller,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.35,
            onUpdate: (self) => {
              setRingProgress(Math.min(1, Math.max(0, (self.progress * 8 - 4) / 2)));
            },
          },
        });

        timeline
          .addLabel("primaryExit", 1.6)
          .to(primary, { autoAlpha: 0, duration: 0.35 }, "primaryExit")
          .addLabel("humanEnter", 1.85)
          .to(secondary, { autoAlpha: 1, duration: 0.35 }, "humanEnter")
          .addLabel("humanExit", 3.55)
          .to(secondary, { autoAlpha: 0, duration: 0.35 }, "humanExit")
          .addLabel("principlesEnter", 3.85)
          .to(principles, { autoAlpha: 1, duration: 0.35 }, "principlesEnter")
          .addLabel("principlesExit", 5.55)
          .to(principles, { autoAlpha: 0, duration: 0.35 }, "principlesExit")
          .addLabel("finalEnter", 5.85)
          .to(final, { autoAlpha: 1, duration: 0.35 }, "finalEnter");

        timeline.duration(PURPOSE_TIMELINE_DURATION);
      });
      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(primary, { autoAlpha: 1 });
      });

      return () => media.revert();
    },
    { scope: section },
  );

  return ringProgress;
}
