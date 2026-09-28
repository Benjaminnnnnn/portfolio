"use client";

import { useRef } from "react";
import { ScrambleText } from "../../../animation/ScrambleText";
import { SectionFrame } from "../../shared/SectionFrame";
import { useContactReveal } from "./useContactReveal";

export function ContactSection() {
  const section = useRef<HTMLElement>(null);
  useContactReveal(section);

  return (
    <SectionFrame ref={section} name="contact" className="contact-section" id="contact">
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
