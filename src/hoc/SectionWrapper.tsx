import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { styles } from "../styles";
import { staggerContainer } from "../utils/motion";

const SectionWrapper = (Component: React.FC, idName: string): React.FC => {
  return function HOC() {
    const triggerRef = useRef<HTMLSpanElement | null>(null);
    const isInView = useInView(triggerRef, {
      once: true,
      margin: "-20% 0px -20% 0px",
    });

    return (
      <section
        id={idName}
        role="region"
        aria-labelledby={`${idName}-heading`}
        className={`${styles.padding} relative z-0 mx-auto max-w-7xl scroll-mt-28`}
      >
        <span ref={triggerRef} className="hash-span" aria-hidden="true">
          &nbsp;
        </span>
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          <Component />
        </motion.div>
      </section>
    );
  };
};

export default SectionWrapper;
