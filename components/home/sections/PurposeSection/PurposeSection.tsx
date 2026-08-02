"use client";

import { useRef } from "react";
import { SectionFrame } from "../../shared/SectionFrame";
import { CursorMorphCanvas } from "./CursorMorphCanvas";
import { HyperspaceCanvas } from "./HyperspaceCanvas";
import { SourceRings } from "./SourceRings";
import { usePurposeTimeline } from "./usePurposeTimeline";

export function PurposeSection() {
  const section = useRef<HTMLElement>(null);
  const ringProgress = usePurposeTimeline(section);

  return (
    <>
      <CursorMorphCanvas />
      <SectionFrame ref={section} name="purpose" id="hyper" className="hyper-section">
        <div className="hyper-sticky">
          <HyperspaceCanvas />
          <div className="hyper-stage stage-primary hyper-center">
            <span>INNOVATE</span>
            <span>WITH</span>
            <span>PURPOSE</span>
          </div>
          <div className="hyper-stage stage-secondary hyper-center">
            <span>INNOVATE</span>
            <span>WITH A</span>
            <span>HUMAN TOUCH</span>
          </div>
          <div className="hyper-stage stage-principles">
            <SourceRings progress={ringProgress} />
            <p className="principle p1">
              Building tomorrow&apos;s
              <br />
              digital products.
            </p>
            <p className="principle p2">
              Independent by
              <br />
              design &amp; engineering.
            </p>
            <p className="principle p3">
              Clarity first.
              <br />
              Delight second.
            </p>
            <p className="principle p4">
              Ship in small loops.
              <br />
              Aim for long arcs.
            </p>
          </div>
          <div className="hyper-stage stage-final hyper-center">
            <span>FUTURE-FIRST</span>
            <span>ALWAYS</span>
          </div>
        </div>
      </SectionFrame>
    </>
  );
}
