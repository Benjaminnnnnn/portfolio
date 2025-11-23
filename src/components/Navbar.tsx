import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// import { logo } from "../assets";
import { LinkedIn, navLinks } from "../constants";
import { useTheme } from "../hooks/useTheme";
import { styles } from "../styles";

import { logo_test } from "../assets";
import MobileNavbar from "./animated/MobileNavbar";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const languageOptions = [
    { code: "en", label: t("nav.language.en") },
    { code: "zh-TW", label: t("nav.language.zh-TW") },
  ];

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const id = entry.target.id === "hero" ? "" : entry.target.id;
          setActive(id);
          if (id !== "") {
            history.replaceState(null, "", `#${id}`);
          } else {
            history.replaceState(null, "", location.pathname);
          }
        }
      },
      { rootMargin: "-20% 0px -20% 0px", threshold: 0 },
    );
    sections.forEach((sec) => observer.observe(sec));
    return () => sections.forEach((sec) => observer.unobserve(sec));
  }, []);

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
      alert(t("resume.downloadError"));
    }
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    changeLanguage(event.target.value);
    event.target.blur();
  };

  return (
    <nav
      className={`${styles.paddingX} fixed top-0 z-[9999] flex w-full items-center py-5`}
      aria-label="Primary navigation"
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
            alt="Benjamin Zhuang logo"
            className="h-10 w-10 object-contain transition-all duration-300 ease-in-out group-hover:rotate-[480deg]"
          />
          <p className="cursor-pointer text-[18px] font-semibold text-ink">
            Benjamin
          </p>
        </Link>

        <ul className="hidden list-none flex-row items-center gap-4 lg:flex">
          {navLinks.map((link) => {
            return (
              <li
                key={link.id}
                className={`
                  ${active === link.id ? "text-ink" : "text-secondary"}
                  cursor-pointer text-[16px] font-medium
                  transition-all duration-300 hover:-translate-y-0.5 hover:text-ink
                  `}
                onClick={() => {
                  setActive(link.id);
                }}
              >
                <a href={`#${link.id}`} className="px-3 py-2">
                  {t(`nav.${link.id}`)}
                </a>
                <div
                  className={`${active == link.id ? "w-full" : "w-0"}
                h-[2px] bg-ink transition-all duration-500`}
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
            <a
              href={LinkedIn.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2"
            >
              {t("nav.linkedin")}
            </a>
            <div
              className={`${active == "LinkedIn" ? "w-full" : "w-0"}
                h-[2px] bg-ink transition-all duration-500`}
            ></div>
          </li>

          <li className="text-[16px] font-medium text-secondary">
            <button
              type="button"
              onClick={resumeHandler}
              className="group flex items-center gap-1 transition-all duration-300 hover:-translate-y-0.5 hover:text-ink"
              aria-label="Download resume as PDF"
            >
              {t("nav.resume")}
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
            </button>
          </li>

          <li className="group flex items-center gap-1 rounded-full border border-transparent px-2 py-1 text-[15px] font-medium text-secondary transition-all duration-200 focus-within:border-accent focus-within:shadow-sm hover:border-accent hover:shadow-sm">
            <span
              aria-hidden="true"
              className="text-secondary transition-colors duration-200 group-focus-within:text-ink group-hover:text-ink"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3c2 2.5 3 5.5 3 9s-1 6.5-3 9c-2-2.5-3-5.5-3-9s1-6.5 3-9Z" />
              </svg>
            </span>

            <label className="sr-only" htmlFor="language-select">
              {t("nav.language.label")}
            </label>

            <select
              id="language-select"
              aria-label={t("nav.language.label")}
              className="h-10 flex-1 cursor-pointer bg-transparent text-sm font-semibold outline-none focus:outline-none"
              value={i18n.resolvedLanguage}
              onChange={handleLanguageChange}
            >
              {languageOptions.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.label}
                </option>
              ))}
            </select>
          </li>

          <li>
            <button
              aria-label={
                theme === "dark" ? t("nav.theme.light") : t("nav.theme.dark")
              }
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
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
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
                  <path d="M12 3v2m0 14v2m9-9h-2M5 12H3m14.95 6.95-1.41-1.41M7.46 7.46 6.05 6.05m0 11.9 1.41-1.41m11.9-11.9-1.41 1.41" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              )}
            </button>
          </li>
        </ul>
      </div>
      <MobileNavbar
        toggle={toggle}
        active={active}
        setToggle={setToggle}
        setActive={setActive}
        resumeHandler={resumeHandler}
        theme={theme}
        toggleTheme={toggleTheme}
      ></MobileNavbar>
    </nav>
  );
};

export default Navbar;
