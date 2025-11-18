import { motion } from "framer-motion";
import { ComputersCanvas } from ".";
import { styles } from "../styles";
import Text from "./animated/Text";

const Hero = () => {
  return (
    <section className="relative mx-auto min-h-[92vh] w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="subtle-grid absolute inset-0 opacity-60"></div>
        <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-accent/20 via-transparent to-transparent blur-3xl"></div>
        <div className="absolute -left-36 bottom-10 h-72 w-72 rounded-full bg-highlight/10 blur-[120px]"></div>
        <div className="absolute -right-40 top-16 h-80 w-80 rounded-full bg-accent-2/10 blur-[120px]"></div>
      </div>
      <div
        className={`${styles.paddingX} absolute inset-0 top-[110px] flex flex-row items-start justify-center`}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-tertiary px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.28em] text-secondary">
            Crafting digital systems with heart
          </span>
          <h1 className={`${styles.heroHeadText} text-ink`}>
            <span className="bg-gradient-to-r from-accent via-highlight to-accent-2 bg-clip-text text-transparent">
              Benjamin Zhuang
            </span>
          </h1>

          <Text
            text="A full-stack web developer who builds responsive and scalable
            systems with state-of-the-art technology."
            containerClassName={`${styles.heroSubText} z-10 mt-4 max-w-3xl text-center text-secondary md:mt-6`}
          ></Text>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {["Full-stack development", "Systems thinking", "Human-centered UX"].map(
              (pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-border/60 bg-elevated/80 px-4 py-2 text-sm font-semibold text-secondary shadow-sm backdrop-blur"
                >
                  {pill}
                </span>
              ),
            )}
          </div>
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
