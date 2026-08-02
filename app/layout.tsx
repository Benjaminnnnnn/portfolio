import type { Metadata } from "next";
import { ThemeModeProvider } from "../components/site/ThemeModeProvider";
import "./original.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://benjaminnnnnn.github.io/portfolio"),
  title: {
    default: "Benjamin Zhuang — Full-Stack & AI Engineer",
    template: "%s — Benjamin Zhuang",
  },
  description:
    "Benjamin Zhuang shapes AI-era products through design judgment, taste, and full-stack engineering.",
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"&&t!=="system")t="system";var r=t==="system"?(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):t;document.documentElement.classList.add(r);document.documentElement.dataset.theme=r;document.documentElement.dataset.themeMode=t}catch(e){document.documentElement.classList.add("light");document.documentElement.dataset.theme="light";document.documentElement.dataset.themeMode="system"}})()`,
          }}
        />
      </head>
      <body>
        <ThemeModeProvider>{children}</ThemeModeProvider>
      </body>
    </html>
  );
}
