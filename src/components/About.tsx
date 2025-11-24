import { motion } from "framer-motion";
import Tilt from "react-tilt";
import { useTranslation } from "react-i18next";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({
  index,
  title,
  icon,
}: {
  index: number;
  title: string;
  icon: string;
}) => {
  return (
    <Tilt className="w-full xs:w-[250px]">
      <motion.div
        variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
        className="w-full rounded-[20px] border border-border/70 bg-elevated/80 p-[1px] shadow-card backdrop-blur"
      >
        <article className="flex min-h-[280px] flex-col items-center justify-evenly rounded-[20px] bg-tertiary/80 px-10 py-8">
          <img src={icon} alt={title} className="h-16 w-16 object-contain" />
          <h3 className="text-center text-[20px] font-semibold text-ink">
            {title}
          </h3>
        </article>
      </motion.div>
    </Tilt>
  );
};

const About = () => {
  const { t } = useTranslation();

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>{t("about.eyebrow")}</p>
        <h2 className={styles.sectionHeadText} id="about-heading">
          {t("about.title")}
        </h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-[17px] leading-[30px] text-secondary"
      >
        {t("about.body")}
      </motion.p>

      <div className="mt-20 flex flex-wrap justify-center gap-10">
        {services.map((service, index) => {
          const title = t(`about.services.${service.id}`, {
            defaultValue: service.title,
          });
          return (
            <ServiceCard
              key={service.title}
              index={index}
              {...service}
              title={title}
            ></ServiceCard>
          );
        })}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
