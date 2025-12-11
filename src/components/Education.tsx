import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { IEducation, educations } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

const EducationCard = ({
  education,
  index,
}: {
  education: IEducation;
  index: number;
}) => {
  const { t } = useTranslation();
  const school = t(`education.items.${education.id}.school`, {
    defaultValue: education.school,
  });
  const degree = t(`education.items.${education.id}.degree`, {
    defaultValue: education.degree,
  });
  const period = t(`education.items.${education.id}.period`, {
    defaultValue: education.period,
  });
  const gpa = education.gpa
    ? t(`education.items.${education.id}.gpa`, {
        defaultValue: education.gpa,
      })
    : "";
  const coursework = t(`education.items.${education.id}.coursework`, {
    returnObjects: true,
    defaultValue: education.coursework,
  }) as string[];

  return (
    <motion.article
      variants={fadeIn("up", "spring", index * 0.25, 0.8)}
      className="group grid gap-5 rounded-2xl border border-border/70 bg-tertiary/80 p-6 shadow-card backdrop-blur md:grid-cols-[auto,1fr] md:items-center"
    >
      <div className="flex h-full items-center justify-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-xl border border-border/70 bg-elevated/80 p-3 shadow-sm transition-transform duration-300 group-hover:-translate-y-1">
          <img
            src={education.icon}
            alt={school}
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <h3 className="text-[22px] font-semibold text-ink">{school}</h3>
          <p className="text-[15px] font-semibold text-secondary">{degree}</p>
          <p className="text-[14px] text-secondary">{period}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-[14px] font-semibold text-ink">
          {gpa && (
            <span className="rounded-full border border-border/70 bg-elevated px-3 py-1 text-sm">
              {t("education.gpaLabel", {
                gpa,
                defaultValue: `GPA: ${gpa}`,
              })}
            </span>
          )}
          {/* <span className="rounded-full border border-border/60 bg-elevated px-3 py-1 text-sm text-secondary">
            {t("education.courseworkLabel")}
          </span> */}
        </div>

        <ul className="flex flex-wrap gap-2">
          {coursework.map((course) => (
            <li
              key={`${education.id}-${course}`}
              className="rounded-full border border-border/60 bg-elevated px-3 py-1 text-[13px] font-semibold text-ink"
            >
              {course}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
};

const Education = () => {
  const { t } = useTranslation();

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>{t("education.eyebrow")}</p>
        <h2 className={styles.sectionHeadText} id="education-heading">
          {t("education.title")}
        </h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-[17px] leading-[30px] text-secondary"
      >
        {t("education.body")}
      </motion.p>

      <div className="mt-12 flex flex-col gap-6">
        {educations.map((education, index) => (
          <EducationCard
            key={education.id}
            education={education}
            index={index}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Education, "education");
