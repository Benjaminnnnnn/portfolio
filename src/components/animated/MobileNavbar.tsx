import { motion } from "framer-motion";
import { useRef } from "react";
import { navLinks } from "../../constants";

const sidebar = {
  show: {
    x: 0,
    height: "100vh",
    width: "100vw",
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
      delayChildren: 0.5,
    },
  },
  hidden: {
    x: "100%",
    width: "100vw",
    height: "100vh",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const menu = {
  show: {
    y: 10,
    transition: {
      staggerChildren: 0.07,
    },
  },
  hidden: {
    y: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const menuItem = {
  show: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  hidden: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

interface IProps {
  toggle: boolean;
  active: string;
  setToggle: (value: boolean | ((prevToggle: boolean) => boolean)) => void;
  setActive: (value: string | ((prevActive: string) => string)) => void;
  resumeHandler: () => void;
}

const MobileNavbar = ({
  toggle,
  active,
  setToggle,
  setActive,
  resumeHandler,
}: IProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-1 items-center justify-end lg:hidden">
      <div
        ref={menuRef}
        className="menu z-10 flex h-[64px] w-[64px] cursor-pointer flex-col items-center justify-center text-center"
        onClick={() => {
          menuRef.current!.classList.toggle("menu-transform");
          setToggle((prevToggle) => !prevToggle);
        }}
      >
        {Array.from(Array(3)).map((_, idx) => (
          <span
            key={idx}
            className="menu-bar mb-2 h-[2px] w-[32px] bg-white"
          ></span>
        ))}
      </div>
      <motion.div
        initial={false}
        animate={toggle ? "show" : "hidden"}
        variants={sidebar}
        className={` fixed top-0 left-0 bg-[#060815]`}
      >
        <motion.ul
          variants={menu}
          className="flex h-full w-full list-none flex-col items-center justify-center gap-4"
        >
          {navLinks.map((link) => {
            return (
              <motion.li
                variants={menuItem}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1.3 }}
                key={link.id}
                className={`
                    ${
                      active === link.title ? "text-white" : "text-secondary"
                    } font-poppins cursor-pointer text-lg font-medium`}
                onClick={() => {
                  menuRef.current!.classList.toggle("menu-transform");
                  setActive(link.title);
                  setToggle((prevToggle) => !prevToggle);
                }}
              >
                <a href={`#${link.id}`}>{link.title}</a>
              </motion.li>
            );
          })}
          <motion.li
            variants={menuItem}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.3 }}
            className="cursor-pointer rounded bg-blue-pink-gradient
            bg-no-repeat px-4 py-2 text-center text-[18px] font-medium text-white transition-all
            duration-500 hover:text-white"
            onClick={resumeHandler}
          >
            Resume
          </motion.li>
        </motion.ul>
      </motion.div>
    </div>
  );
};

export default MobileNavbar;
