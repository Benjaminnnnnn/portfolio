"use client";

import { useRef } from "react";
import { ScrambleText } from "../../../animation/ScrambleText";
import { useFloatingStickers } from "../../animation/useFloatingStickers";
import { SectionFrame } from "../../shared/SectionFrame";
import { useContactReveal } from "./useContactReveal";

const contactStickers = [
  { className: "contact-nextjs", label: "NEXT.JS", tone: "acid", emphasis: true },
  { className: "contact-typescript", label: "TYPESCRIPT", tone: "violet", emphasis: true },
  { className: "contact-gcp", label: "GCP", tone: "blue", emphasis: false },
  { className: "contact-cloudflare", label: "CLOUDFLARE", tone: "coral", emphasis: false },
  { className: "contact-architecture", label: "SYSTEM ARCH", tone: "ink", emphasis: true },
  { className: "contact-docker", label: "DOCKER", tone: "blue", emphasis: false },
  { className: "contact-kubernetes", label: "K8S", tone: "acid", emphasis: false },
  { className: "contact-graphql", label: "GRAPHQL", tone: "coral", emphasis: false },
  { className: "contact-api", label: "API DESIGN", tone: "violet", emphasis: true },
  { className: "contact-patterns", label: "PATTERNS", tone: "blue", emphasis: false },
] as const;

export function ContactSection() {
  const section = useRef<HTMLElement>(null);
  useContactReveal(section);
  useFloatingStickers(section, 1);

  return (
    <SectionFrame ref={section} name="contact" className="contact-section" id="contact">
      {contactStickers.map((sticker) => (
        <div key={sticker.className} className={`contact-sticker-slot ${sticker.className}`} data-contact-sticker>
          <div
            className={`contact-sticker-art contact-glyph tone-${sticker.tone}${sticker.emphasis ? " is-emphasis" : ""}`}
            data-floating-sticker
            data-emphasis={sticker.emphasis ? "true" : undefined}
            aria-hidden="true"
          >
            {sticker.label}
          </div>
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
