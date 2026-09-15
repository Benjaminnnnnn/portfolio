"use client";

import { useRef } from "react";
import Image from "next/image";
import { ScrambleText } from "../../../animation/ScrambleText";
import { SectionFrame } from "../../shared/SectionFrame";
import { useContactReveal } from "./useContactReveal";

const contactStickers = [
  { className: "contact-eyes", image: "01" },
  { className: "contact-nib", image: "02" },
  { className: "contact-star", image: "10" },
  { className: "contact-heart", image: "05" },
  { className: "contact-smile", image: "06" },
  { className: "contact-pixel", image: "07" },
  { className: "contact-bolt", image: "09" },
] as const;

export function ContactSection() {
  const section = useRef<HTMLElement>(null);
  useContactReveal(section);

  return (
    <SectionFrame ref={section} name="contact" className="contact-section" id="contact">
      {contactStickers.map((sticker) => (
        <div key={sticker.className} className={`contact-sticker-slot ${sticker.className}`} data-contact-sticker>
          <div
            className="contact-sticker-art"
            data-floating-sticker
            aria-hidden="true"
          >
            <Image src={`/sticker_img/s_${sticker.image}.png`} alt="" width={480} height={480} draggable={false} />
          </div>
        </div>
      ))}

      <h2 className="contact-title" aria-label="Let's create something extraordinary">
        <span className="contact-title-row contact-title-first">
          <ScrambleText className="contact-scramble contact-lets" text="Let's" />
          <ScrambleText className="contact-scramble contact-create" text="Create" reverse />
        </span>
        <span className="contact-title-row">
          <ScrambleText className="contact-scramble contact-something" text="Something" />
        </span>
        <span className="contact-title-row">
          <ScrambleText className="contact-scramble contact-extraordinary" text="Extraordinary" reverse />
        </span>
      </h2>

      <div className="contact-bottom">
        <a href="mailto:benjaminzhuangjobs@outlook.com">
          <ScrambleText className="contact-scramble" text="benjaminzhuangjobs@outlook.com" />
        </a>
        <div>
          <a href="https://www.linkedin.com/in/benjamin-zhuang/" target="_blank" rel="noreferrer">
            <ScrambleText className="contact-scramble" text="LinkedIn" />
          </a>
          <a href="https://github.com/Benjaminnnnnn" target="_blank" rel="noreferrer">
            <ScrambleText className="contact-scramble" text="GitHub" />
          </a>
        </div>
      </div>
    </SectionFrame>
  );
}
