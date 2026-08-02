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
            <span>SHAPE AI</span>
            <span>WITH</span>
            <span>INTENT</span>
          </div>
          <div className="hyper-stage stage-secondary hyper-center">
            <span>DESIGN</span>
            <span>WITH A</span>
            <span>POINT OF VIEW</span>
          </div>
          <div className="hyper-stage stage-principles">
            <SourceRings progress={ringProgress} />
            <p className="principle p1">
              AI expands
              <br />
              the possibility.
            </p>
            <p className="principle p2">
              Design gives it
              <br />
              human shape.
            </p>
            <p className="principle p3">
              Taste makes
              <br />
              it memorable.
            </p>
            <p className="principle p4">
              Engineering makes
              <br />
              it real.
            </p>
          </div>
          <div className="hyper-stage stage-final hyper-center">
            <span>BUILD FOR</span>
            <span>THE LONG RUN</span>
          </div>
        </div>
      </SectionFrame>
    </>
  );
}
