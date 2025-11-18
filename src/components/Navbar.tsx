import { useState } from "react";
import { Link } from "react-router-dom";

// import { logo } from "../assets";
import { LinkedIn, navLinks } from "../constants";
import { useTheme } from "../hooks/useTheme";
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
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      className={`${styles.paddingX} fixed top-0 z-[9999] flex w-full items-center py-5`}
    >
      <div className="glass-panel mx-auto flex w-full items-center justify-between rounded-2xl border border-border/60 bg-primary/90 px-5 py-3 shadow-card backdrop-blur-2xl">
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
          <p className="cursor-pointer text-[18px] font-semibold text-ink">
            Benjamin
          </p>
        </Link>

        <ul className="hidden list-none flex-row items-center gap-6 lg:flex">
          {navLinks.map((link) => {
            return (
              <li
                key={link.id}
                className={`
                  ${active === link.title ? "text-ink" : "text-secondary"}
                  cursor-pointer text-[16px] font-medium
                  transition-all duration-300 hover:-translate-y-0.5 hover:text-ink
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
            className={`
                  ${active === LinkedIn.title ? "text-ink" : "text-secondary"}
                  cursor-pointer text-[16px] font-medium
                  transition-all duration-300 hover:-translate-y-0.5 hover:text-ink
                  `}
          >
            <a href={LinkedIn.link} className="px-4 py-2">
              {LinkedIn.title}
            </a>
            <div
              className={`${active == "LinkedIn" ? "w-full" : "w-0"}
                h-[2px] bg-ink transition-all duration-500`}
            ></div>
          </li>

          <li
            className="group flex cursor-pointer flex-col items-start gap-1 text-[16px] font-medium text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:text-ink"
            onClick={resumeHandler}
          >
            <span className="flex items-center gap-1">
              Resume
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4 w-4 transition-transform duration-300"
              >
                <path d="M12 3v12m0 0 4-4m-4 4-4-4" />
                <path d="M5 19h14" />
              </svg>
            </span>
          </li>

          <li>
            <button
              aria-label="Toggle color theme"
              onClick={toggleTheme}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-tertiary text-ink shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-card"
            >
              {theme === "dark" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                >
                  <path d="M12 3v2m0 14v2m9-9h-2M5 12H3m14.95 6.95-1.41-1.41M7.46 7.46 6.05 6.05m0 11.9 1.41-1.41m11.9-11.9-1.41 1.41" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
                </svg>
              )}
            </button>
          </li>
        </ul>

        <MobileNavbar
          toggle={toggle}
          active={active}
          setToggle={setToggle}
          setActive={setActive}
          resumeHandler={resumeHandler}
          theme={theme}
          toggleTheme={toggleTheme}
        ></MobileNavbar>
      </div>
    </nav>
  );
};

export default Navbar;
