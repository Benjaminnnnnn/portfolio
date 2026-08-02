"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ScrambleText } from "../animation/ScrambleText";
import { PointerCoordinates } from "./PointerCoordinates";
import { type ThemeMode, useThemeMode } from "./ThemeModeProvider";

const soundFrames = ["|", "/", "-", "\\"];

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) || target.isContentEditable;
}

function getScrollContainer() {
  return document.querySelector<HTMLElement>("#home-scroll, .article-scroll");
}

function detectBrowserName() {
  const browserNavigator = navigator as Navigator & {
    brave?: { isBrave?: () => Promise<boolean> };
  };
  const agent = navigator.userAgent;
  if (browserNavigator.brave?.isBrave) return browserNavigator.brave.isBrave().then((brave) => brave ? "Brave" : "Google Chrome");
  if (/Edg\//.test(agent)) return Promise.resolve("Microsoft Edge");
  if (/Firefox\//.test(agent)) return Promise.resolve("Firefox");
  if (/Chrome\//.test(agent)) return Promise.resolve("Google Chrome");
  if (/Safari\//.test(agent)) return Promise.resolve("Safari");
  return Promise.resolve("Browser");
}

function themeKey(theme: ThemeMode) {
  if (theme === "light") return "L";
  if (theme === "dark") return "D";
  return "A";
}

export function SiteChrome({ scramble = false }: { scramble?: boolean }) {
  const pathname = usePathname();
  const { theme, setTheme, cycleTheme } = useThemeMode();
  const [time, setTime] = useState("--:--");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [soundFrame, setSoundFrame] = useState(0);
  const [nearBottom, setNearBottom] = useState(false);
  const [helpVisible, setHelpVisible] = useState(false);
  const [browserName, setBrowserName] = useState("Browser");
  const [viewport, setViewport] = useState("---- × ----");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const taipei = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Taipei" }));
      setTime(`${pad(taipei.getHours())}:${pad(taipei.getMinutes())}`);
    };
    update();
    const timer = window.setInterval(update, 15_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    let active = true;
    void detectBrowserName().then((name) => {
      if (active) setBrowserName(name);
    });
    const updateViewport = () => setViewport(`${window.innerWidth} × ${window.innerHeight}`);
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => {
      active = false;
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  useEffect(() => {
    const storedSound = window.localStorage.getItem("sound");
    setSoundEnabled(storedSound !== "off");
  }, []);

  useEffect(() => {
    if (!soundEnabled) return;
    const timer = window.setInterval(() => setSoundFrame((current) => (current + 1) % soundFrames.length), 130);
    return () => window.clearInterval(timer);
  }, [soundEnabled]);

  useEffect(() => {
    const scroller = getScrollContainer();
    if (!scroller) return;
    const update = () => {
      const maxScroll = Math.max(0, scroller.scrollHeight - scroller.clientHeight);
      setNearBottom(scroller.scrollTop >= maxScroll - scroller.clientHeight * 0.5);
    };
    update();
    scroller.addEventListener("scroll", update, { passive: true });
    return () => {
      scroller.removeEventListener("scroll", update);
      delete document.documentElement.dataset.inverse;
      setNearBottom(false);
    };
  }, [pathname]);

  const jump = useCallback((id: string) => {
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  }, []);

  const toggleSound = useCallback(async () => {
    setHelpVisible(false);
    if (!audioRef.current) {
      const audio = new Audio("/bgm.mp3");
      audio.loop = true;
      audio.volume = 0.35;
      audioRef.current = audio;
    }
    if (soundEnabled) {
      audioRef.current.pause();
      setSoundEnabled(false);
      window.localStorage.setItem("sound", "off");
      return;
    }
    setSoundEnabled(true);
    window.localStorage.setItem("sound", "on");
    try {
      await audioRef.current.play();
    } catch {
      // Keep the saved preference enabled; browsers may defer playback until a later gesture.
    }
  }, [soundEnabled]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.repeat || event.metaKey || event.ctrlKey || event.altKey || isEditableTarget(event.target)) return;
      const key = event.key.length === 1 ? event.key.toLowerCase() : "";
      if (!["l", "d", "a", "s", "t", "b"].includes(key)) return;
      setHelpVisible(false);
      if (key === "l") setTheme("light");
      if (key === "d") setTheme("dark");
      if (key === "a") setTheme("system");
      if (key === "s") void toggleSound();
      if (key === "t" || key === "b") {
        const scroller = getScrollContainer();
        if (!scroller) return;
        const top = key === "t" ? 0 : Math.max(0, scroller.scrollHeight - scroller.clientHeight);
        scroller.scrollTo({ top, behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setTheme, toggleSound]);

  const preferenceEvents = {
    onPointerEnter: () => setHelpVisible(true),
    onPointerLeave: () => setHelpVisible(false),
    onPointerDown: () => setHelpVisible(false),
    onFocus: () => setHelpVisible(true),
    onBlur: () => setHelpVisible(false),
  };
  const themeLabel = `THEME[${themeKey(theme)}]`;
  const soundLabel = `SOUND[${soundEnabled ? soundFrames[soundFrame] : "·"}]`;

  return (
    <>
      <header className="site-header">
        <Link href="/" className="brand" aria-label="Benjamin Zhuang home">
          {scramble ? <ScrambleText text="BENJAMIN.ZHUANG" /> : "BENJAMIN.ZHUANG"}
        </Link>
        <nav aria-label="Primary navigation">
          {pathname === "/" ? (
            <>
              <button onClick={() => jump("work")} aria-label="Work">{scramble ? <ScrambleText text="WORK" /> : "WORK"}</button>
              <button onClick={() => jump("contact")} aria-label="Contact">{scramble ? <ScrambleText text="CONTACT" /> : "CONTACT"}</button>
            </>
          ) : (
            <>
              <Link href="/#work">WORK</Link>
              <Link href="/#contact">CONTACT</Link>
            </>
          )}
          <button className="site-preference-control" onClick={() => { setHelpVisible(false); cycleTheme(); }} aria-label={`Theme: ${theme}`} {...preferenceEvents}>{themeLabel}</button>
          <button className="site-preference-control" onClick={() => void toggleSound()} aria-pressed={soundEnabled} {...preferenceEvents}>{soundLabel}</button>
        </nav>
      </header>
      <aside className={`shortcut-help${helpVisible ? " is-visible" : ""}`} aria-hidden={!helpVisible}>
        <p>
          Press [L] for light mode, [D] for dark mode, [A] for auto mode, or click THEME. Press [S] to pause or resume background music, or click SOUND; your choice is saved in this browser. [T] scroll to top, [B] scroll to bottom.
        </p>
        <div className="shortcut-help-meta">
          <span>{browserName}</span>
          <span>{viewport}</span>
        </div>
      </aside>
      <div className="site-status site-status-left">
        <span hidden={nearBottom}>{scramble ? <ScrambleText text={`GMT+8 CN ${time}`} letterDelay={40} /> : `GMT+8 CN ${time}`}</span>
        <span hidden={!nearBottom}>BENJAMIN ZHUANG (C) 2026</span>
      </div>
      <PointerCoordinates />
      <button className="site-status site-status-globe" aria-label="Scroll to top" onClick={() => getScrollContainer()?.scrollTo({ top: 0, behavior: "smooth" })}>◎</button>
    </>
  );
}
