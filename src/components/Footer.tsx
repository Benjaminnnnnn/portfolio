import { LinkedIn, navLinks } from "../constants";

const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="16"
    height="16"
    aria-hidden="true"
  >
    <path
      fill="currentColor"
      d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zm7.5 0H15v1.71h.06c.49-.93 1.7-1.9 3.5-1.9 3.74 0 4.44 2.46 4.44 5.66V21H19v-5.16c0-1.23-.02-2.8-1.7-2.8-1.7 0-1.96 1.33-1.96 2.7V21h-4z"
    />
  </svg>
);

const GithubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="16"
    height="16"
    aria-hidden="true"
  >
    <path
      fill="currentColor"
      d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.11.79-.25.79-.55 0-.27-.01-1.15-.02-2.09-3.2.69-3.87-1.36-3.87-1.36-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.74 1.26 3.41.97.1-.75.41-1.26.75-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.28 1.2-3.08-.12-.29-.52-1.45.11-3.02 0 0 .97-.31 3.2 1.18a11 11 0 0 1 5.82 0c2.22-1.5 3.19-1.18 3.19-1.18.64 1.57.24 2.73.12 3.02.75.8 1.2 1.82 1.2 3.08 0 4.44-2.69 5.41-5.25 5.69.42.36.8 1.07.8 2.16 0 1.56-.02 2.82-.02 3.21 0 .3.21.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
    />
  </svg>
);

const githubProfile = "https://github.com/Benjaminnnnnn";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-primary/95 text-secondary">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-start sm:px-8">
        <div className="max-w-xl space-y-3">
          <p className="text-[15px] font-semibold uppercase tracking-[0.28em] text-secondary/80">
            Benjamin Zhuang
          </p>
          <p className="text-[15px] leading-relaxed text-secondary">
            Full-stack software engineer focused on performant experiences for
            product teams that care about quality, SEO, and accessibility.
          </p>
          <p className="text-sm text-secondary/80">
            © {currentYear} Benjamin Zhuang. All rights reserved.
          </p>
        </div>

        <div className="flex gap-10">
          <nav aria-label="Footer navigation">
            <ul className="flex flex-col flex-wrap items-start gap-x-6 gap-y-3 text-[15px] font-medium text-secondary">
              {navLinks.map((link) => (
                <li key={`footer-${link.id}`}>
                  <a
                    href={`#${link.id}`}
                    className="transition-colors duration-200 hover:text-accent"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-3 text-sm font-semibold text-secondary">
            <a
              href={LinkedIn.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors duration-200 hover:text-accent"
            >
              <LinkedInIcon />
              LinkedIn
            </a>
            <a
              href={githubProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors duration-200 hover:text-accent"
            >
              <GithubIcon />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
