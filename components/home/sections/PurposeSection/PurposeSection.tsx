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
            <span>BUILD IT</span>
            <span>THEN</span>
            <span>TEST IT</span>
          </div>
          <div className="hyper-stage stage-secondary hyper-center">
            <span>FOLLOW</span>
            <span>THE</span>
            <span>DETAILS</span>
          </div>
          <div className="hyper-stage stage-principles">
            <SourceRings progress={ringProgress} />
            <p className="principle p1">
              Read the
              <br />
              source.
            </p>
            <p className="principle p2">
              Trace the
              <br />
              request.
            </p>
            <p className="principle p3">
              Test what
              <br />
              can fail.
            </p>
            <p className="principle p4">
              Write down
              <br />
              what changed.
            </p>
          </div>
          <div className="hyper-stage stage-final hyper-center">
            <span>KEEP</span>
            <span>LEARNING</span>
          </div>
        </div>
      </SectionFrame>
    </>
  );
}
