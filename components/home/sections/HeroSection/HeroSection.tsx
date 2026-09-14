import { ScrambleText } from "../../../animation/ScrambleText";
import { SectionFrame } from "../../shared/SectionFrame";

export function HeroSection() {
  return (
    <SectionFrame name="hero" className="hero-section" id="top">
      <div className="hero-meta">
        <p className="hero-discipline">
          <ScrambleText text={"Software\nEngineering"} letterDelay={10} />
        </p>
        <p>
          <ScrambleText text={"Carnegie Mellon\nMaster's student"} letterDelay={10} />
        </p>
        <p>
          <ScrambleText
            text="I'm Benjamin Zhuang, a master's student at Carnegie Mellon. I build web applications and study the systems that run underneath them."
            letterDelay={10}
          />
        </p>
      </div>
      <div className="hero-copy">
        <h1>
          <ScrambleText text="HELLO, I'M BENJAMIN." delay={300} letterDelay={35} />
          <br />
          <ScrambleText text="I BUILD THINGS" delay={500} letterDelay={35} />
          <br />
          <ScrambleText text="AND FIGURE THEM OUT." delay={700} letterDelay={35} />
        </h1>
      </div>
    </SectionFrame>
  );
}
