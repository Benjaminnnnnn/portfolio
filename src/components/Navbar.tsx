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
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary`}
    >
      <div className="w-full flex justify-between items-center mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2 group"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          {/* <Logo></Logo> */}
          <img
            src={logo_test}
            alt="logo"
            className="w-10 h-10 object-contain group-hover:rotate-[480deg] transition-all duration-300 ease-in-out"
          />
          <p className="text-white text-[18px] font-bold cursor-pointer">
            Benjamin
          </p>
        </Link>

        <ul className="list-none hidden lg:flex flex-row gap-5 items-center">
          {navLinks.map((link) => {
            return (
              <li
                key={link.id}
                className={`
                  ${active === link.title ? "text-white" : "text-secondary"}
                  text-[18px] font-medium cursor-pointer
                  hover:text-white hover:scale-110 transition-all duration-500
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
            className="text-white bg-highlight hover:bg-active focus:outline-none
              font-medium rounded-full text-sm px-5 py-2.5 text-center
              hover:transition-all hover:scale-110 hover:duration-500 cursor-pointer"
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
