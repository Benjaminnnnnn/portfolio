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
        const drift = Math.min(scroller.clientWidth * 0.025, 36);
        const stickerTimelines = stickers.map((sticker, index) => {
          const art = sticker.querySelector<HTMLElement>("[data-floating-sticker]");
          const direction = index % 2 ? 1 : -1;
          const arrival = ((index * 3) % stickers.length) * 0.14;
          const fallDuration = 2.2 + (index % 3) * 0.25;
          const motion = gsap.timeline({
            scrollTrigger: {
              trigger: element,
              scroller,
              start: "top 75%",
              end: "bottom top",
              toggleActions: "play pause resume pause",
              onToggle: (trigger) => trigger.animation?.paused(!trigger.isActive || document.hidden),
            },
          });

          // Start above the section, then settle independently of scroll speed.
          motion.fromTo(
            sticker,
            {
              y: () => -sticker.offsetTop - sticker.offsetHeight - 32,
              x: direction * drift,
              rotation: direction * 12,
              autoAlpha: 0,
            },
            {
              y: 0,
              x: 0,
              rotation: 0,
              duration: fallDuration,
              ease: "power2.out",
            },
            arrival,
          );
          motion.to(sticker, { autoAlpha: 1, duration: 0.45, ease: "sine.out" }, arrival);

          // Different periods keep the resting motion soft and asynchronous.
          if (art) {
            const settled = arrival + fallDuration;
            motion.to(art, {
              x: direction * drift,
              duration: 8 + index * 0.6,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            }, settled);
            motion.to(art, {
              y: -drift * (0.65 + (index % 3) * 0.15),
              duration: 6.5 + index * 0.7,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            }, settled);
            motion.to(art, {
              rotation: direction * 3,
              duration: 9 + index * 0.5,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            }, settled);
          }
          return motion;
        });
        const syncVisibility = () => {
          stickerTimelines.forEach((motion) => {
            motion.paused(document.hidden || !motion.scrollTrigger?.isActive);
          });
        };
        document.addEventListener("visibilitychange", syncVisibility);
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
        return () => document.removeEventListener("visibilitychange", syncVisibility);
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
