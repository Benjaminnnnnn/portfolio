"use client";

import Image from "next/image";
import { useRef } from "react";
import { ScrambleText } from "../../../animation/ScrambleText";
import { useFloatingStickers } from "../../animation/useFloatingStickers";
import { SectionFrame } from "../../shared/SectionFrame";
import { useContactReveal } from "./useContactReveal";

const contactStickers = [
  { className: "contact-star", src: "/sticker_img/s_10.png", size: 112 },
  { className: "contact-heart", src: "/sticker_img/s_05.png", size: 132 },
  { className: "contact-year", src: "/sticker_img/s_03.png", size: 104 },
  { className: "contact-coin", src: "/sticker_img/s_07.png", size: 110 },
  { className: "contact-reunimos", src: "/sticker_img/s_04.png", size: 164 },
  { className: "contact-smile", src: "/sticker_img/s_06.png", size: 104 },
  { className: "contact-eyes", src: "/sticker_img/s_01.png", size: 108 },
  { className: "contact-pen", src: "/sticker_img/s_02.png", size: 106 },
  { className: "contact-hand", src: "/sticker_img/s_08.png", size: 100 },
] as const;

export function ContactSection() {
  const section = useRef<HTMLElement>(null);
  useContactReveal(section);
  useFloatingStickers(section, 1);

  return (
    <SectionFrame ref={section} name="contact" className="contact-section" id="contact">
      {contactStickers.map((sticker) => (
        <div key={sticker.className} className={`contact-sticker-slot ${sticker.className}`} data-contact-sticker>
          <Image
            className="contact-sticker-art"
            data-floating-sticker
            src={sticker.src}
            alt=""
            width={sticker.size}
            height={sticker.size}
          />
        </div>
      ))}

      <div className="contact-title" aria-label="Let’s create something extraordinary">
        <div className="contact-title-row contact-title-first">
          <ScrambleText className="contact-scramble contact-lets" text="Let's" />
          <ScrambleText className="contact-scramble contact-create" text="Create" reverse />
        </div>
        <div className="contact-title-row">
          <ScrambleText className="contact-scramble contact-something" text="Something" />
        </div>
        <div className="contact-title-row">
          <ScrambleText className="contact-scramble contact-extraordinary" text="Extraordinary" reverse />
        </div>
      </div>

      <div className="contact-bottom">
        <a href="mailto:curiosity.wen@gmail.com">
          <ScrambleText className="contact-scramble" text="curiosity.wen@gmail.com" />
        </a>
        <div>
          <a href="https://twitter.com/wenhaoqi" target="_blank" rel="noreferrer">
            <ScrambleText className="contact-scramble" text="Twitter/X" />
          </a>
          <a href="https://www.figma.com/@wenhaoqi" target="_blank" rel="noreferrer">
            <ScrambleText className="contact-scramble" text="Figma" />
          </a>
          <a href="https://github.com/wenhaoqiasd" target="_blank" rel="noreferrer">
            <ScrambleText className="contact-scramble" text="GitHub" />
          </a>
        </div>
      </div>
    </SectionFrame>
  );
}
