import Link from "next/link";

import styles from "./legal.module.css";

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  children: React.ReactNode;
};

export function LegalPage({ eyebrow, title, intro, children }: LegalPageProps) {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <Link className={styles.brand} href="/handpick/privacy/">
            <span className={styles.mark} aria-hidden="true">
              H
            </span>
            <span>Handpick</span>
          </Link>

          <nav className={styles.nav} aria-label="Handpick information">
            <Link href="/handpick/privacy/">Privacy</Link>
            <Link href="/handpick/support/">Support</Link>
          </nav>
        </header>

        <article className={styles.article}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1>{title}</h1>
          <p className={styles.intro}>{intro}</p>
          <div className={styles.content}>{children}</div>
        </article>

        <footer className={styles.footer}>
          <span>Handpick by Benjamin Zhuang</span>
          <a href="mailto:benjaminzhuangjobs@outlook.com?subject=Handpick%20Support">
            Contact
          </a>
        </footer>
      </div>
    </main>
  );
}
