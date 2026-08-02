import { ScrambleText } from "../../../animation/ScrambleText";
import { SectionFrame } from "../../shared/SectionFrame";

export function HeroSection() {
  return (
    <SectionFrame name="hero" className="hero-section" id="top">
      <div className="hero-meta">
        <p className="hero-discipline">
          <ScrambleText text={"AI, Design &\nEngineering"} letterDelay={10} />
        </p>
        <p>
          <ScrambleText text={"Taste in the details.\nSystems underneath."} letterDelay={10} />
        </p>
        <p>
          <ScrambleText
            text="I'm Benjamin Zhuang. I shape AI-era products where design judgment, technical depth, and a strong point of view meet."
            letterDelay={10}
          />
        </p>
      </div>
      <div className="hero-copy">
        <h1>
          <ScrambleText text="I SHAPE AI" delay={300} letterDelay={35} />
          <br />
          <ScrambleText text="WITH DESIGN TASTE" delay={500} letterDelay={35} />
          <br />
          <ScrambleText text="AND ENGINEERING" delay={700} letterDelay={35} />
        </h1>
      </div>
    </SectionFrame>
  );
}
