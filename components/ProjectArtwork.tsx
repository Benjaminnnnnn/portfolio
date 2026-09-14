import Image from "next/image";
import type { CSSProperties } from "react";

type Props = { slug: string; src: string; alt: string; priority?: boolean };

// Code-native cover drawings: no generated raster art or decorative system maps.
export function ProjectArtwork({ slug, src, alt, priority = false }: Props) {
  const drawn = ["relay", "splendor", "simple-db", "petclinic-devops", "xv6"].includes(slug);
  return <div className={`project-artwork artwork-${slug}${drawn ? " artwork-drawn" : ""}`}>
    {drawn ? <div className="cover-drawing" role="img" aria-label={slug === "relay" ? "Queue tickets distributed between three worker lanes" : slug === "splendor" ? "Splendor wordmark with a fan of five colored game tokens" : slug === "simple-db" ? "Stacked database pages with a highlighted page" : slug === "xv6" ? "A shell prompt above a grid of memory blocks" : "Build artifact crossing from development to a virtual machine"}>
      {slug === "splendor" && <><div className="cover-gems" aria-hidden="true">{["#a9bdd7", "#719a78", "#e4b7aa", "#e4d4a4", "#858195"].map((color, i) => <i key={color} style={{ "--i": i, background: color } as CSSProperties} />)}</div><strong className="cover-splendor-name">Splendor</strong><span className="cover-bottom-label">A SHARED BOARD / A TURN AT A TIME</span></>}
      {slug === "relay" && <><div className="cover-lane-labels"><span>QUEUE</span><span>WORKERS</span></div><div className="cover-queue">{[0, 1, 2, 3].map(i => <div key={i} style={{ "--i": i } as CSSProperties}><span>JOB / 0{i + 1}</span><i /><i /><b>↗</b></div>)}</div><div className="cover-workers"><span>01 <i /></span><span>02 <i /></span><span>03 <i /></span></div></>}
      {slug === "simple-db" && <><span className="cover-corner-label">BUFFER POOL / 4 KiB</span><div className="cover-pages">{[0, 1, 2].map(i => <div key={i} style={{ "--i": i } as CSSProperties}><span>PAGE / 0{i + 1}</span><div>{Array.from({ length: 12 }, (_, j) => <i key={j} />)}</div></div>)}</div></>}
      {slug === "petclinic-devops" && <><span className="cover-corner-label">BUILD → DEPLOY</span><div className="cover-deploy"><div><i aria-hidden="true">⌘</i><span>Jenkins</span></div><b aria-hidden="true">↗</b><div><i aria-hidden="true">▤</i><span>Vagrant VM</span></div></div><span className="cover-bottom-label">SPRING PETCLINIC / COURSE EXTENSION</span></>}
      {slug === "xv6" && <><span className="cover-corner-label">XV6 / TEACHING KERNEL</span><div className="cover-terminal"><span>$ <i /></span><div>{Array.from({ length: 32 }, (_, i) => <b key={i} />)}</div></div><span className="cover-bottom-label">C · RISC-V · QEMU</span></>}
    </div> : <><div className="artwork-window"><div className="artwork-window-bar" aria-hidden="true"><i /><i /><i /><span>{slug}</span></div><div className="artwork-screen"><Image src={src} alt={alt} fill priority={priority} sizes="(max-width: 760px) 90vw, 75vw" /></div></div><span className="artwork-caption" aria-hidden="true">{slug === "cypress" ? "LANDING PAGE / PROTOTYPE" : "PROJECT SCREENSHOT"}</span></>}
  </div>;
}
