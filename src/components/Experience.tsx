import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { IExperince, experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

const ExperienceCard = ({ experience }: { experience: IExperince }) => {
  const { t } = useTranslation();
  const title = t(`experience.items.${experience.id}.title`, {
    defaultValue: experience.title,
  });
  const company = t(`experience.items.${experience.id}.company`, {
    defaultValue: experience.company_name,
  });
  const date = t(`experience.items.${experience.id}.date`, {
    defaultValue: experience.date,
  });
  const points = t(`experience.items.${experience.id}.points`, {
    returnObjects: true,
    defaultValue: experience.points,
  }) as string[];

  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "rgb(var(--color-surface))",
        color: "rgb(var(--color-text-strong))",
        border: "1px solid rgba(var(--color-border), 0.6)",
        boxShadow: "var(--shadow-1)",
      }}
      contentArrowStyle={{
        borderRight: "7px solid rgba(var(--color-border), 0.8)",
      }}
      date={date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className="flex h-full w-full items-center justify-center">
          <img
            src={experience.icon}
            alt={experience.company_name}
            className="h-[60%] w-[60%] object-contain"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-[22px] font-semibold text-ink">{title}</h3>
        <p
          className="text-[16px] font-semibold text-secondary"
          style={{ margin: 0 }}
        >
          {company}
        </p>
      </div>

      <ul className="mt-5 ml-5 list-disc space-y-2">
        {points.map((point: string, index: number) => {
          return (
            <li
              key={`experience-point-${index}`}
              className="pl-1 text-[14px] leading-relaxed tracking-wider text-secondary"
            >
              {point}
            </li>
          );
        })}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const { t } = useTranslation();

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>{t("experience.eyebrow")}</p>
        <h2 className={styles.sectionHeadText} id="experience-heading">
          {t("experience.title")}
        </h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-[17px] leading-[30px] text-secondary"
      >
        {t("experience.body")}
      </motion.p>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {experiences.map((experience) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
            ></ExperienceCard>
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "experience");
