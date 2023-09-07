import { motion } from "framer-motion";

interface IProps {
  text: string;
  className: string;
}

const transition = {
  delayChildren: 0.6,
  staggerChildren: 0.04,
  duration: 1.4,
  ease: [0.35, 0.17, 0.3, 0.86],
};

const containerAnimation = () => ({
  hidden: {
    opacity: 1,
  },
  show: {
    opacity: 1,
    transition: { ...transition },
  },
});

const textAnimation = () => ({
  hidden: {
    y: 400,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: { ...transition, duration: 1 },
  },
});

const Text = ({ text, className }: IProps) => {
  return (
    <motion.div initial="hidden" animate="show" variants={containerAnimation()}>
      {text.split("").map((c, index) => (
        <motion.span
          key={index}
          variants={textAnimation()}
          className={className}
        >
          {c}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default Text;
