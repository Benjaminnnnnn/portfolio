import { ScrambleText } from "../../../animation/ScrambleText";
import { SectionFrame } from "../../shared/SectionFrame";

export function HeroSection() {
  return (
    <SectionFrame name="hero" className="hero-section" id="top">
      <div className="hero-meta">
        <p className="hero-discipline">
          <ScrambleText text={"Design &\nEngineering"} letterDelay={10} />
        </p>
        <p>
          <ScrambleText text={"Thinking in systems.\nDesigning with care."} letterDelay={10} />
        </p>
        <p>
          <ScrambleText
            text="I'm Benjamin Zhuang, a full-stack developer focused on performance, accessibility, and interfaces that feel effortless to use."
            letterDelay={10}
          />
        </p>
      </div>
      <div className="hero-copy">
        <h1>
          <ScrambleText text="I BRING" delay={300} />
          <br />
          <ScrambleText text="CRAFT & TASTE" delay={500} />
          <br />
          <ScrambleText text="TO DIGITAL WORK" delay={700} />
        </h1>
      </div>
    </SectionFrame>
  );
}
