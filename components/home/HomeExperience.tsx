"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { GridOverlay } from "../site/GridOverlay";
import { SiteChrome } from "../site/SiteChrome";
import { useHomeIntroAnimation } from "./animation/useHomeIntroAnimation";
import { LoadingScreen } from "./chrome/LoadingScreen";
import { ScrollRail } from "./chrome/ScrollRail";
import { AboutSection } from "./sections/AboutSection/AboutSection";
import { ContactSection } from "./sections/ContactSection/ContactSection";
import { HeroSection } from "./sections/HeroSection/HeroSection";
import { PurposeSection } from "./sections/PurposeSection/PurposeSection";
import { WorkSection } from "./sections/WorkSection/WorkSection";
import { useHomeLoadingSequence } from "./useHomeLoadingSequence";

const HomeVisualCanvas = dynamic(() => import("./visuals/HomeVisualCanvas"), { ssr: false });

export function HomeExperience() {
  const root = useRef<HTMLDivElement>(null);
  const loading = useHomeLoadingSequence();
  useHomeIntroAnimation(root, loading.introReady);

  return (
    <div ref={root} className={`home-root${loading.introReady ? " intro-ready" : ""}`}>
      <HomeVisualCanvas
        onProgress={loading.handleSceneProgress}
        onReady={loading.handleSceneReady}
      />
      <GridOverlay />
      <SiteChrome scramble />
      {!loading.introReady && (
        <LoadingScreen progress={loading.sceneProgress} leaving={loading.loaderLeaving} />
      )}
      <ScrollRail enabled={loading.introReady} />

      <main id="home-scroll" className="home-scroll no-scrollbar">
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <PurposeSection />
        <ContactSection />
      </main>
    </div>
  );
}
