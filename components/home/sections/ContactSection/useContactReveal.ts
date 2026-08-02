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
        const stickers = gsap.utils.toArray<HTMLElement>("[data-contact-sticker]", element);
        stickers.forEach((sticker, index) => {
          gsap.fromTo(
            sticker,
            { y: () => -window.innerHeight * (0.62 + (index % 3) * 0.05), autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              ease: "none",
              scrollTrigger: {
                trigger: element,
                scroller,
                start: "top 98%",
                end: "top top",
                scrub: 0.25,
              },
            },
          );
        });
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
        gsap.set("[data-contact-sticker]", { autoAlpha: 1, y: 0 });
        revealAllScrambleText(element, ".contact-scramble");
      });

      return () => media.revert();
    },
    { scope: section },
  );
}
