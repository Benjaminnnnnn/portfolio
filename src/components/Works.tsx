import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Tilt from "react-tilt";
import { github } from "../assets";

import { IProject, projects } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

type ProjectCard = IProject & {
  index: number;
};

const ProjectCard = ({
  index,
  id,
  name,
  description,
  tags,
  image,
  source_code_link,
  demo_link,
}: ProjectCard) => {
  const { t } = useTranslation();
  const translatedName = t(`projects.items.${id}.name`, { defaultValue: name });
  const translatedDescription = t(`projects.items.${id}.description`, {
    defaultValue: description,
  });
  const demoLabel = t("projects.demo");
  const ariaSource = t("projects.viewSource", {
    name: translatedName,
    defaultValue: `View the ${translatedName} source code on GitHub`,
  });
  const titleId = `project-${index}-title`;
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{ max: 20, scale: 1, speed: 500 }}
        className="group h-full w-full rounded-2xl border border-border/70 bg-tertiary/80 p-5 shadow-card backdrop-blur sm:w-[360px]"
      >
        <article
          className="flex h-full min-h-[450px] flex-col gap-4"
          aria-labelledby={titleId}
        >
          <div className="relative h-[230px] w-full overflow-hidden rounded-xl border border-border/70 bg-elevated/80">
            <img
              src={image}
              alt={name}
              className="h-full w-full object-scale-down transition-all duration-300 group-hover:scale-110"
            />
            <div className="card-img_hover absolute inset-0 m-3 flex justify-end">
              <a
                href={source_code_link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={ariaSource}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/70 bg-accent text-white shadow-md shadow-border/60 transition-transform duration-300 hover:-translate-y-1 hover:border-accent"
              >
                <img
                  src={github}
                  alt=""
                  aria-hidden="true"
                  className="h-1/2 w-1/2 object-contain brightness-0 invert filter"
                />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3
              className="flex flex-row justify-between text-[22px] font-semibold text-ink"
              id={titleId}
            >
              {translatedName}
              {/* display demo link if needed */}
              {demo_link && (
                <a
                  href={demo_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit rounded-xl border border-border/70 bg-elevated px-4 py-1 text-sm font-semibold text-ink shadow-sm outline-none transition-transform duration-200 hover:-translate-y-0.5 hover:border-accent"
                >
                  {demoLabel}
                </a>
              )}
            </h3>
            <p className="text-[15px] text-secondary">
              {translatedDescription}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => {
              return (
                <p
                  key={tag.name}
                  className={`rounded-full bg-elevated/70 py-1 text-[13px] font-semibold ${tag.color}`}
                >
                  #{tag.name}
                </p>
              );
            })}
          </div>
        </article>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const { t } = useTranslation();

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>{t("projects.eyebrow")}</p>
        <h2 className={styles.sectionHeadText} id="project-heading">
          {t("projects.title")}
        </h2>
      </motion.div>

      <div className="flex w-full">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-[17px] leading-[30px] text-secondary"
        >
          {t("projects.body")}
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap justify-center gap-7 xl:justify-start">
        {projects.map((project, index) => {
          return (
            <ProjectCard
              key={`project-${index}`}
              index={index}
              {...project}
            ></ProjectCard>
          );
        })}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "project");
