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
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{ max: 20, scale: 1, speed: 500 }}
        className="group w-full rounded-2xl border border-border/70 bg-tertiary/80 p-5 shadow-card backdrop-blur sm:w-[360px]"
      >
        <div className="relative h-[230px] w-full overflow-hidden rounded-xl border border-border/70 bg-elevated/80">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-scale-down transition-all duration-300 group-hover:scale-110"
          />
          <div className="card-img_hover absolute inset-0 m-3 flex justify-end">
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-accent/70 bg-accent text-white shadow-md shadow-border/60 transition-transform duration-300 hover:-translate-y-1 hover:border-accent"
            >
              <img
                src={github}
                alt="github"
                className="h-1/2 w-1/2 object-contain brightness-0 invert filter"
              />
            </div>
          </div>
        </div>

        <div className="mt-5 h-[150px]">
          <h3 className="flex flex-row justify-between text-[22px] font-semibold text-ink">
            {name}
            {/* display demo link if needed */}
            {demo_link && (
              <button
                className="w-fit rounded-xl border border-border/70 bg-elevated px-4 py-1 text-sm font-semibold text-ink shadow-sm outline-none transition-transform duration-200 hover:-translate-y-0.5 hover:border-accent"
                onClick={() => window.open(demo_link, "_blank")}
              >
                Demo
              </button>
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
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My projects</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      <div className="flex w-full">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-[17px] leading-[30px] text-secondary"
        >
          Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories. It reflects my ability to solve complex
          problems, work with different technologies, and manage projects
          effectively.
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
