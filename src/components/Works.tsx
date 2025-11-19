import { motion } from "framer-motion";
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
  name,
  description,
  tags,
  image,
  source_code_link,
  demo_link,
}: ProjectCard) => {
  const titleId = `project-${index}-title`;
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{ max: 20, scale: 1, speed: 500 }}
        className="group w-full rounded-2xl border border-border/70 bg-tertiary/80 p-5 shadow-card backdrop-blur sm:w-[360px]"
      >
        <article className="flex h-full flex-col" aria-labelledby={titleId}>
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
                aria-label={`View the ${name} source code on GitHub`}
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

          <div className="mt-5 h-[150px]">
            <h3
              className="flex flex-row justify-between text-[22px] font-semibold text-ink"
              id={titleId}
            >
              {name}
              {/* display demo link if needed */}
              {demo_link && (
                <a
                  href={demo_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit rounded-xl border border-border/70 bg-elevated px-4 py-1 text-sm font-semibold text-ink shadow-sm outline-none transition-transform duration-200 hover:-translate-y-0.5 hover:border-accent"
                >
                  Demo
                </a>
              )}
            </h3>
            <p className="mt-2 text-[15px] text-secondary">{description}</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-x-2">
            {tags.map((tag) => {
              return (
                <p
                  key={tag.name}
                  className={`rounded-full bg-elevated/70 px-3 py-1 text-[13px] font-semibold ${tag.color}`}
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
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My projects</p>
        <h2 className={styles.sectionHeadText} id="project-heading">
          Projects.
        </h2>
      </motion.div>

      <div className="flex w-full">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-[17px] leading-[30px] text-secondary"
        >
          Real-world products where I led the React, Next.js, and Node.js stack
          demonstrate how I architect scalable APIs, craft polished interfaces,
          and keep performance, accessibility, and SEO aligned with business
          goals.
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
