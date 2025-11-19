import { motion } from "framer-motion";
import { styles } from "../styles";
import { staggerContainer } from "../utils/motion";

const SectionWrapper = (Component: React.FC, idName: string): React.FC => {
  return function HOC() {
    return (
      <motion.section
        id={idName}
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        role="region"
        aria-labelledby={`${idName}-heading`}
        className={`${styles.padding} relative z-0 mx-auto max-w-7xl scroll-mt-28`}
      >
        <span className="hash-span" aria-hidden="true">
          &nbsp;
        </span>
        <Component />
      </motion.section>
    );
  };
};

export default SectionWrapper;
