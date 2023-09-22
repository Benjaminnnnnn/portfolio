import { motion } from "framer-motion";
import Tilt from "react-tilt";
import { github } from "../assets";

import { projects } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { ProjectProp } from "../types";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  demo_link,
}: ProjectProp) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{ max: 20, scale: 1, speed: 500 }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full group"
      >
        <div className="relative w-full h-[230px]">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-scale-down group-hover:scale-110 transition-all duration-200"
          />
          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <img
                src={github}
                alt="github"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mt-5 h-[150px]">
          <h3 className="text-white font-bold text-[24px] flex flex-row  justify-between">
            {name}
            {/* display demo link if needed */}
            {demo_link && (
              <button
                className="bg-sky-600 px-4 outline-none w-fit text-white shadow-md shadow-primary rounded-xl font-normal text-base"
                onClick={() => window.open(demo_link, "_blank")}
              >
                Demo
              </button>
            )}
          </h3>
          <p className="mt-2 text-secondary text-[14px]">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-x-2">
          {tags.map((tag) => {
            return (
              <p key={tag.name} className={`text-[14px] ${tag.color}`}>
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

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
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
