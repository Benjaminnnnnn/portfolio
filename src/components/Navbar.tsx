import { useState } from "react";
import { Link } from "react-router-dom";

// import { logo } from "../assets";
import { logo } from "../assets";
import { navLinks } from "../constants";
import { styles } from "../styles";

// import Logo from "./animations/Logo";
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
  // const menuRef = useRef<HTMLDivElement>(null)

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          {/* <Logo className="w-full h-full"></Logo> */}
          <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
          <p className="text-white text-[18px] font-bold cursor-pointer">
            Benjamin
          </p>
        </Link>

        <ul className="list-none hidden lg:flex flex-row gap-10 items-center">
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
                <a href={`#${link.id}`}>{link.title}</a>
                <div
                  className={`${active == link.title ? "w-full" : "w-0"}
                h-[2px] bg-white transition-all duration-500`}
                ></div>
              </li>
            );
          })}

          <li
            className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none
              font-medium rounded-full text-sm px-5 py-2.5 text-center
              hover:transition-all hover:scale-110 hover:duration-500"
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
