import { motion } from "framer-motion";
import { useRef } from "react";
import { navLinks } from "../../constants";
import { IMobileNavbar } from "../../types";

const sidebar = {
  show: {
    x: 0,
    height: "100vh",
    width: "100vw",
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
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

// const sidebar = {
//   show: {
//     height: "100vh",
//     width: "100vw",
//     x: 0,
//     transition: {
//       duration: 1,
//       delayChildren: 1.5,
//     },
//   },
//   hidden: {
//     x: "100%",
//     y: 0,
//     width: "100vw",
//     height: "10vh",
//   },
// };

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

const MobileNavbar = ({
  toggle,
  active,
  setToggle,
  setActive,
}: IMobileNavbar) => {
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <div className="sm:hidden flex flex-1 justify-end items-center">
      <div
        ref={menuRef}
        className="menu text-center cursor-pointer w-[64px] h-[64px] flex flex-col items-center justify-center z-10"
        onClick={() => {
          menuRef.current!.classList.toggle("menu-transform");
          setToggle((prevToggle) => !prevToggle);
        }}
      >
        {Array.from(Array(3)).map((_, idx) => (
          <span
            key={idx}
            className="menu-bar w-[32px] h-[2px] bg-white mb-2"
          ></span>
        ))}
      </div>
      <motion.div
        animate={toggle ? "show" : "hidden"}
        variants={sidebar}
        className={` bg-[#060815] fixed top-0 left-0`}
      >
        <motion.ul
          variants={menu}
          className="list-none flex justify-center items-center flex-col gap-4 w-full h-full"
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
                    } font-poppins font-medium text-lg cursor-pointer`}
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
        </motion.ul>
      </motion.div>
    </div>
  );
};

export default MobileNavbar;
