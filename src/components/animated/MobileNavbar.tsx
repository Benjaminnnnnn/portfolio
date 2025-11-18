import { motion } from "framer-motion";
import { useRef } from "react";
import { LinkedIn, navLinks } from "../../constants";

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
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const MobileNavbar = ({
  toggle,
  active,
  setToggle,
  setActive,
  resumeHandler,
  theme,
  toggleTheme,
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
            className="menu-bar mb-2 h-[2px] w-[32px] bg-ink"
          ></span>
        ))}
      </div>
      <motion.div
        initial={false}
        animate={toggle ? "show" : "hidden"}
        variants={sidebar}
        className="fixed left-0 top-0 bg-primary/95 backdrop-blur-xl"
      >
        <motion.ul
          variants={menu}
          className="flex h-full w-full list-none flex-col items-center justify-center gap-6 px-6"
        >
          <motion.li variants={menuItem} className="mb-4">
            <button
              aria-label="Toggle color theme"
              onClick={() => {
                toggleTheme();
              }}
              className="flex items-center gap-3 rounded-full border border-border/80 bg-tertiary px-4 py-3 text-ink shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
            >
              <span className="text-sm font-semibold uppercase tracking-wide text-secondary">
                {theme === "dark" ? "Dark" : "Light"} mode
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-black/5 text-ink">
                {theme === "dark" ? "☀️" : "🌙"}
              </span>
            </button>
          </motion.li>
          {navLinks.map((link) => {
            return (
              <motion.li
                variants={menuItem}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1.3 }}
                key={link.id}
                className={`
                    ${
                      active === link.title ? "text-ink" : "text-secondary"
                    } font-poppins cursor-pointer text-lg font-semibold`}
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
            className={`
                    ${
                      active === LinkedIn.title ? "text-ink" : "text-secondary"
                    } font-poppins cursor-pointer text-lg font-semibold`}
            onClick={() => {
              menuRef.current!.classList.toggle("menu-transform");
              setActive(LinkedIn.title);
              setTimeout(() => {
                setActive("");
              }, 1000);
              setToggle((prevToggle) => !prevToggle);
            }}
          >
            <a href={LinkedIn.link}>{LinkedIn.title}</a>
          </motion.li>
          <motion.li
            variants={menuItem}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.3 }}
            className="cursor-pointer rounded bg-blue-pink-gradient
            bg-no-repeat px-6 py-2 text-center text-[16px] font-semibold text-white transition-all
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
