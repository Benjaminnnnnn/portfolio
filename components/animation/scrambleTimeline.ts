import { gsap } from "./gsap";

const SCRAMBLE_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*+-=?/<>[]{}";

export function addScrambleAnimations(
  scope: HTMLElement,
  timeline: gsap.core.Timeline,
  selector = ".intro-scramble",
) {
  scope.querySelectorAll<HTMLElement>(selector).forEach((element) => {
    const characters = Array.from(element.querySelectorAll<HTMLElement>("[data-scramble-char]"));
    const startDelay = Number(element.dataset.delay ?? 300);
    const letterDelay = Number(element.dataset.letterDelay ?? 80);
    const phaseLength = letterDelay * 2;
    const scrambleLength = phaseLength * 2;
    const reverse = element.dataset.reverse === "true";
    const totalLength = Math.max(1, (characters.length - 1) * letterDelay + scrambleLength);
    const playhead = { elapsed: 0 };
    let lastTick = -1;

    timeline.set(element, { visibility: "visible" }, startDelay / 1000);
    timeline.to(
      playhead,
      {
        elapsed: totalLength,
        duration: totalLength / 1000,
        ease: "none",
        onUpdate: () => {
          const tick = Math.floor(playhead.elapsed / 40);
          if (tick === lastTick) return;
          lastTick = tick;

          characters.forEach((character, index) => {
            const settled = character.dataset.character ?? "";
            const sequenceIndex = reverse ? characters.length - 1 - index : index;
            const localTime = playhead.elapsed - sequenceIndex * letterDelay;

            if (localTime < 0) {
              character.style.opacity = "0";
              return;
            }

            character.style.opacity = "1";
            if (settled === " ") return;

            if (localTime < scrambleLength) {
              character.textContent = SCRAMBLE_ALPHABET[Math.floor(Math.random() * SCRAMBLE_ALPHABET.length)];
              character.style.color = localTime < phaseLength ? "#c0fe04" : "#607f02";
            } else {
              character.textContent = settled;
              character.style.removeProperty("color");
            }
          });
        },
        onComplete: () => revealScrambleText(element),
      },
      startDelay / 1000,
    );
  });
}

export function revealScrambleText(scope: HTMLElement, selector = "[data-scramble-char]") {
  scope.style.visibility = "visible";
  scope.querySelectorAll<HTMLElement>(selector).forEach((character) => {
    character.textContent = character.dataset.character ?? character.textContent;
    character.style.opacity = "1";
    character.style.removeProperty("color");
  });
}

export function revealAllScrambleText(scope: HTMLElement, selector = ".intro-scramble") {
  scope.querySelectorAll<HTMLElement>(selector).forEach((element) => revealScrambleText(element));
}
