import { motion } from "framer-motion";
import { ComputersCanvas } from ".";
import { styles } from "../styles";
import Text from "./animated/Text";

const Hero = () => {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative mx-auto flex max-h-[100vh] min-h-[100vh] w-full flex-col items-center overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="subtle-grid absolute inset-0 opacity-60"></div>
        <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-accent/20 via-transparent to-transparent blur-3xl"></div>
        <div className="absolute -left-36 bottom-10 h-72 w-72 rounded-full bg-highlight/10 blur-[120px]"></div>
        <div className="absolute -right-40 top-16 h-80 w-80 rounded-full bg-accent-2/10 blur-[120px]"></div>
      </div>

      <div className={`${styles.paddingX} w-full`}>
        <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-tertiary px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.28em] text-secondary">
            Crafting digital systems with heart
          </span>
          <h1 className={`${styles.heroHeadText} text-ink`} id="hero-heading">
            <span className="bg-gradient-to-r from-accent via-highlight to-accent-2 bg-clip-text text-transparent">
              Benjamin Zhuang
            </span>
          </h1>

          <Text
            text="Product-focused full-stack web developer that balance performance, accessibility, and delightful UX with state-of-the-art technology."
            containerClassName={`${styles.heroSubText} z-10 mt-4 max-w-3xl text-center text-secondary md:mt-6`}
          ></Text>

          <ul className="mt-8 flex list-none flex-wrap items-center justify-center gap-3">
            {[
              "Full-stack development",
              "Systems thinking",
              "Human-centered UX",
            ].map((pill) => (
              <li
                key={pill}
                className="rounded-full border border-border/60 bg-elevated/80 px-4 py-2 text-sm font-semibold text-secondary shadow-sm backdrop-blur"
              >
                {pill}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative h-[320px] w-full max-w-6xl sm:h-[400px] md:h-[480px]">
        <div className="via-accent/8 pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-transparent blur-3xl"></div>
        <ComputersCanvas></ComputersCanvas>
      </div>

      <div className="absolute bottom-16 flex w-full items-center justify-center xs:bottom-10">
        <a href="#about" aria-label="Scroll to about section">
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
