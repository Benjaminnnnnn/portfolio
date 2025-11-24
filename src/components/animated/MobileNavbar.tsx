import { motion } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
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
  const { t, i18n } = useTranslation();
  const menuRef = useRef<HTMLButtonElement>(null);
  const languageOptions = [
    { code: "en", label: t("nav.language.en") },
    { code: "zh-TW", label: t("nav.language.zh-TW") },
  ];

  return (
    <div className="flex flex-1 items-center justify-center lg:hidden">
      <button
        className="menu z-10 flex h-[64px] w-[64px] cursor-pointer flex-col items-center justify-center text-center"
        ref={menuRef}
        aria-label="Toggle menu"
        aria-expanded={toggle}
        type="button"
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
      </button>
      <motion.div
        initial={false}
        animate={toggle ? "show" : "hidden"}
        variants={sidebar}
        className="fixed left-0 top-0 flex min-h-screen w-screen items-center justify-center bg-primary"
      >
        <motion.ul
          variants={menu}
          className="flex w-full max-w-md list-none flex-col items-center justify-center gap-6 px-6 text-center"
        >
          <motion.li variants={menuItem} className="w-full">
            <div className="flex w-full items-center justify-center gap-3 rounded-2xl border border-border/70 px-5 py-3 text-ink shadow-sm">
              {languageOptions.map((option) => {
                const isActive = i18n.resolvedLanguage === option.code;
                return (
                  <button
                    key={option.code}
                    type="button"
                    onClick={() => {
                      i18n.changeLanguage(option.code);
                    }}
                    className={`rounded-full px-3 py-1 text-base font-semibold transition-all duration-200 ${
                      isActive
                        ? "text-ink underline decoration-2 underline-offset-4"
                        : "text-secondary hover:text-ink"
                    }`}
                    aria-pressed={isActive}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </motion.li>
          <motion.li variants={menuItem}>
            <button
              aria-label={
                theme === "dark" ? t("nav.theme.light") : t("nav.theme.dark")
              }
              onClick={() => {
                toggleTheme();
              }}
              className="flex w-full items-center justify-between gap-2 rounded-2xl px-3 py-2 text-ink transition-transform duration-200 hover:-translate-y-0.5"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-elevated/70 text-ink">
                {theme === "dark" ? "🌙" : "☀️"}
              </span>
              <span className="text-base font-semibold text-secondary">
                {theme === "dark" ? t("nav.theme.dark") : t("nav.theme.light")}
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
                      active === link.id ? "text-ink" : "text-secondary"
                    } font-poppins w-full cursor-pointer text-center text-base font-semibold`}
                onClick={() => {
                  menuRef.current!.classList.toggle("menu-transform");
                  setActive(link.id);
                  setToggle((prevToggle) => !prevToggle);
                }}
              >
                <a href={`#${link.id}`}>{t(`nav.${link.id}`)}</a>
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
                    } font-poppins w-full cursor-pointer text-center text-base font-semibold`}
            onClick={() => {
              menuRef.current!.classList.toggle("menu-transform");
              setActive(LinkedIn.title);
              setTimeout(() => {
                setActive("");
              }, 1000);
              setToggle((prevToggle) => !prevToggle);
            }}
          >
            <a href={LinkedIn.link} target="_blank" rel="noopener noreferrer">
              {t("nav.linkedin")}
            </a>
          </motion.li>
          <motion.li
            variants={menuItem}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.3 }}
            className="w-full"
          >
            <button
              type="button"
              onClick={resumeHandler}
              className="group flex w-full items-center justify-center gap-1 rounded-2xl text-center text-base font-semibold text-secondary transition-all duration-300"
              aria-label="Download resume as PDF"
            >
              {t("nav.resume")}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
              >
                <path d="M12 3v12m0 0 4-4m-4 4-4-4" />
                <path d="M5 19h14" />
              </svg>
            </button>
          </motion.li>
        </motion.ul>
      </motion.div>
    </div>
  );
};

export default MobileNavbar;
