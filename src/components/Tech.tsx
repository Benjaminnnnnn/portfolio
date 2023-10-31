import { motion } from "framer-motion";
import { technologies } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { textVariant } from "../utils/motion";
import { BallCanvas } from "./canvas";

export type technology = (typeof technologies)[0];

const Tech = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Some of my skill sets</p>
        <h2 className={styles.sectionHeadText}>Skills.</h2>
      </motion.div>

      <div className="mt-10 flex flex-row flex-wrap justify-center gap-10">
        {technologies.map((tech) => {
          return (
            <div className="h-28 w-28" key={tech.name}>
              <BallCanvas icon={tech.icon}></BallCanvas>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "tech");
