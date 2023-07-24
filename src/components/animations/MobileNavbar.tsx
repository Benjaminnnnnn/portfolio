import { motion } from "framer-motion";
import { useRef } from "react";
import { navLinks } from "../../constants";
import { IMobileNavbar } from "../../types";

const sidebar = {
  open: {
    height: "100vh",
    width: "100vw",
    transition: {
      duration: 2,
    },
  },
  closed: {
    height: 0,
    width: 0,
    transition: {},
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
        <span className="menu-bar w-[32px] h-[2px] bg-white mb-2"></span>
        <span className="menu-bar w-[32px] h-[2px] bg-white mb-2"></span>
        <span className="menu-bar w-[32px] h-[2px] bg-white mb-2"></span>
      </div>
      <motion.div
        initial={closed}
        animate={toggle ? "show" : "hidden"}
        variants={sidebar}
        className={`${
          toggle ? "flex" : "hidden"
        } black-gradient fixed top-0 left-0`}
      >
        <ul
          //   variants={staggerChildren()}
          className="list-none flex justify-center items-center flex-col gap-4 w-full h-full"
        >
          {navLinks.map((link) => {
            return (
              <li
                key={link.id}
                className={`
                    ${
                      active === link.title ? "text-white" : "text-secondary"
                    } font-poppins font-medium cursor-pointer text-[16px]`}
                onClick={() => {
                  menuRef.current!.classList.toggle("menu-transform");
                  setActive(link.title);
                  setToggle((prevToggle) => !prevToggle);
                }}
              >
                <a href={`#${link.id}`}>{link.title}</a>
              </li>
            );
          })}
        </ul>
      </motion.div>
    </div>
  );
};

export default MobileNavbar;
