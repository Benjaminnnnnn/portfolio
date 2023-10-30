import { useState } from "react";
import { Link } from "react-router-dom";

// import { logo } from "../assets";
import { navLinks } from "../constants";
import { styles } from "../styles";

import { logo_test } from "../assets";
import MobileNavbar from "./animated/MobileNavbar";

const resumeHandler = async () => {
  try {
    const response = await fetch("resume.pdf");
    const blob = await response.blob();
    const fileUrl = window.URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = fileUrl;
    downloadLink.download = "Benjamin Zhuang.pdf";
    downloadLink.click();
  } catch (error) {
    alert("Unable to download resume.");
  }
};

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  return (
    <nav
      className={`${styles.paddingX} fixed top-0 z-20 flex w-full items-center bg-primary py-5`}
    >
      <div className="mx-auto flex w-full items-center justify-between">
        <Link
          to="/"
          className="group flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          {/* <Logo></Logo> */}
          <img
            src={logo_test}
            alt="logo"
            className="h-10 w-10 object-contain transition-all duration-300 ease-in-out group-hover:rotate-[480deg]"
          />
          <p className="cursor-pointer text-[18px] font-bold text-white">
            Benjamin
          </p>
        </Link>

        <ul className="hidden list-none flex-row items-center gap-5 lg:flex">
          {navLinks.map((link) => {
            return (
              <li
                key={link.id}
                className={`
                  ${active === link.title ? "text-white" : "text-secondary"}
                  cursor-pointer text-[18px] font-medium
                  transition-all duration-500 hover:scale-110 hover:text-white
                  `}
                onClick={() => {
                  setActive(link.title);
                }}
              >
                <a href={`#${link.id}`} className="px-4 py-2">
                  {link.title}
                </a>
                <div
                  className={`${active == link.title ? "w-full" : "w-0"}
                h-[2px] bg-white transition-all duration-500`}
                ></div>
              </li>
            );
          })}

          <li
            className="cursor-pointer rounded border border-secondary bg-blue-pink-gradient
              bg-[length:0%_100%] bg-no-repeat px-4 py-2 text-center text-[18px] font-medium text-secondary transition-all
              duration-500 hover:bg-[length:100%_100%] hover:text-white"
            onClick={resumeHandler}
          >
            Resume
          </li>
        </ul>

        <MobileNavbar
          toggle={toggle}
          active={active}
          setToggle={setToggle}
          setActive={setActive}
          resumeHandler={resumeHandler}
        ></MobileNavbar>
      </div>
    </nav>
  );
};

export default Navbar;
