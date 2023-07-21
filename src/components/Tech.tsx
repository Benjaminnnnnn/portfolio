import { motion } from "framer-motion";
import { technologies } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { textVariant } from "../utils/motion";
import { BallCanvas } from "./canvas";

const Tech = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Some of my skill sets</p>
        <h2 className={styles.sectionHeadText}>Skills.</h2>
      </motion.div>

      <div className="flex flex-row flex-wrap justify-center gap-10 mt-10">
        {technologies.map((tech) => {
          return (
            <div className="w-28 h-28" key={tech.name}>
              <BallCanvas icon={tech.icon}></BallCanvas>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "tech");
