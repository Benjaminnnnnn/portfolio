"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MINIMUM_LOADING_TIME_MS = 1550;
const LOADER_EXIT_TIME_MS = 250;

export function useHomeLoadingSequence() {
  const mountedAt = useRef(0);
  const [sceneProgress, setSceneProgress] = useState(0);
  const [sceneReady, setSceneReady] = useState(false);
  const [loaderLeaving, setLoaderLeaving] = useState(false);
  const [introReady, setIntroReady] = useState(false);

  useEffect(() => {
    mountedAt.current = performance.now();
  }, []);

  useEffect(() => {
    if (!sceneReady) return;
    const elapsed = performance.now() - mountedAt.current;
    const remaining = Math.max(0, MINIMUM_LOADING_TIME_MS - elapsed);
    const leaveTimer = window.setTimeout(() => setLoaderLeaving(true), remaining);
    const introTimer = window.setTimeout(() => setIntroReady(true), remaining + LOADER_EXIT_TIME_MS);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(introTimer);
    };
  }, [sceneReady]);

  const handleSceneProgress = useCallback((progress: number) => setSceneProgress(progress), []);
  const handleSceneReady = useCallback(() => setSceneReady(true), []);

  return {
    handleSceneProgress,
    handleSceneReady,
    introReady,
    loaderLeaving,
    sceneProgress,
  };
}
