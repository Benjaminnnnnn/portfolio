import { withBasePath } from "@/lib/base-path";
import { SectionFrame } from "../../shared/SectionFrame";

export function AboutSection() {
  return (
    <SectionFrame name="about" className="about-section">
      <p className="eyebrow">ABOUT / 01</p>
      <div className="about-copy">
        <p>
          I&apos;m a master&apos;s student at Carnegie Mellon. My projects range from multiplayer
          games and learning tools to databases and background job systems.
        </p>
        <p>
          Previously at Microsoft, I worked on people identification for Teams Rooms.
          I&apos;m looking for software engineering roles where I can keep building and learning with a team.
        </p>
      </div>
      <img
        className="about-photo"
        src={withBasePath("/img/about.jpg")}
        alt="Benjamin Zhuang personal photo"
        width={896}
        height={900}
        loading="lazy"
      />
    </SectionFrame>
  );
}
