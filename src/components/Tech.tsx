import { motion } from "framer-motion";
import { technologies } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import { BallCanvas } from "./canvas";

export type technology = (typeof technologies)[0];

const Tech = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Some of my skill sets</p>
        <h2 className={styles.sectionHeadText} id="tech-heading">
          Skills.
        </h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-[17px] leading-[30px] text-secondary"
      >
        My toolkit spans modern web stacks including React, Next.js, GraphQL,
        Node.js, PostgreSQL, and cloud-native infrastructure so I can design,
        build, and scale end-to-end product experiences.
      </motion.p>

      <div className="mt-10 flex flex-row flex-wrap justify-center gap-10">
        {technologies.map((tech) => {
          return (
            <div
              className="h-28 w-28"
              key={tech.name}
              role="img"
              aria-label={tech.name}
            >
              <span className="sr-only">{tech.name}</span>
              <BallCanvas icon={tech.icon}></BallCanvas>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "tech");
