import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { technologies } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import { BallCanvas } from "./canvas";

export type technology = (typeof technologies)[0];

const Tech = () => {
  const { t } = useTranslation();

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>{t("tech.eyebrow")}</p>
        <h2 className={styles.sectionHeadText} id="tech-heading">
          {t("tech.title")}
        </h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-[17px] leading-[30px] text-secondary"
      >
        {t("tech.body")}
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
