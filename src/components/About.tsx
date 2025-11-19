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
        <div
          // options={{ max: 45, scale: 1, speed: 450 }}
          className="flex min-h-[280px] flex-col items-center justify-evenly rounded-[20px] bg-tertiary/80 px-10 py-8"
        >
          <img src={icon} alt={title} className="h-16 w-16 object-contain" />
          <h3 className="text-center text-[20px] font-semibold text-ink">
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
};

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-[17px] leading-[30px] text-secondary"
      >
        I'm a junior full-stack engineer with experience in TypeScript and
        JavaScript, and expertise in frameworks like React, Vue, Next.js, and
        Node.js. I'm a quick learner who is capable to adapt to new technologies
        every day and ready to work under an agile development environment. I'm
        also an excellent team player who collaborate closely with both the
        technical team members and clients to create efficient, scalable, and
        user-friendly solutions that brings positive impacts to the world.
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
