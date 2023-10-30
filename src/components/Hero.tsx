import { motion } from "framer-motion";
import { ComputersCanvas } from ".";
import { styles } from "../styles";

const Hero = () => {
  return (
    <section className="relative mx-auto h-screen w-full">
      <div
        className={`${styles.paddingX} absolute inset-0 top-[120px] flex flex-row items-start gap-5 `}
      >
        {/* <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915eff]"></div>
          <div className="w-1 sm:h-80 h-40 violet-gradient"></div>
        </div> */}

        <div className="mx-auto max-w-7xl">
          <h1 className={`${styles.heroHeadText} text-center text-white`}>
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Benjamin Zhuang
            </span>
          </h1>

          {/* <Text
            text={"I build responsive and scalable web applications."}
            className={`${styles.heroSubText} z-10 mt-2 text-white-100`}
          ></Text> */}

          <p
            className={`${styles.heroSubText} z-10 mt-2 text-center text-secondary md:mt-4`}
          >
            A full-stack web developer who builds responsive and scalable
            systems with state-of-the-art technology.
            <br className="hidden sm:block" />
          </p>
        </div>
      </div>

      <ComputersCanvas></ComputersCanvas>

      <div className="absolute bottom-16 flex w-full items-center justify-center xs:bottom-10">
        <a href="#about">
          <div className="flex h-[64px] w-[35px] items-start justify-center rounded-3xl border-4 border-secondary p-2">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="mb-1 h-3 w-3 rounded-full bg-secondary"
            ></motion.div>
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
