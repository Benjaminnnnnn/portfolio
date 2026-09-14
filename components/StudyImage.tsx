"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import type { StudyVisual } from "@/data/project-visuals";

export function StudyImage({ src, alt, visual }: { src: string; alt: string; visual: StudyVisual }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const crop = visual.crop!;
  const imageRatios: Record<string, number> = {
    "333gle": 1800 / 988, algo: 1800 / 988, cliphop: 1800 / 948,
    cypress: 1800 / 1038, leetcode: 1800 / 1013, mems: 1800 / 887,
    propertize: 1513 / 867, rssagg: 1800 / 1028, splendor: 1800 / 981, xv6: 1800 / 993,
  };
  const imageName = src.split("/").pop()!.replace(".webp", "");
  const style = {
    "--crop-width": `${10000 / crop.width}%`,
    "--crop-height": `${10000 / crop.height}%`,
    "--crop-left": `${-100 * crop.x / crop.width}%`,
    "--crop-top": `${-100 * crop.y / crop.height}%`,
    "--crop-ratio": (imageRatios[imageName] ?? 1.8) * crop.width / crop.height,
  } as CSSProperties;
  return <>
    <button className="study-image-button" onClick={() => dialog.current?.showModal()} aria-label={`Open full screenshot: ${visual.title}`} style={style}>
      <span className="study-crop"><Image src={src} alt={`${visual.title}. Detail of: ${alt}`} fill sizes="(max-width: 760px) 150vw, 100vw" /></span>
      <span className="study-image-expand" aria-hidden="true">View full image ↗</span>
    </button>
    <dialog ref={dialog} className="study-lightbox" aria-label={`${visual.title}: full project screenshot`} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <form method="dialog"><button autoFocus aria-label="Close full screenshot">Close ×</button></form>
      <div className="lightbox-image"><Image src={src} alt={alt} fill sizes="95vw" /></div>
      <p>{visual.caption}</p>
    </dialog>
  </>;
}
