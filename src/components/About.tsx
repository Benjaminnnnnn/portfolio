import { motion } from "framer-motion";
import Tilt from "react-tilt";
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
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText} id="about-heading">
          Overview.
        </h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-[17px] leading-[30px] text-secondary"
      >
        I am a full-stack software engineer with a strong TypeScript, React,
        Next.js, and Node.js toolkit. I pair systems thinking with product
        intuition to ship resilient, SEO-friendly user experiences that scale
        securely in the cloud. I thrive in fast-paced, agile teams where close
        collaboration with designers, engineers, and stakeholders turns complex
        requirements into intuitive web applications.
      </motion.p>

      <div className="mt-20 flex flex-wrap justify-center gap-10">
        {services.map((service, index) => {
          return (
            <ServiceCard
              key={service.title}
              index={index}
              {...service}
            ></ServiceCard>
          );
        })}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
