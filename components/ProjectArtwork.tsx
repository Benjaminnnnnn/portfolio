import Image from "next/image";
import type { CSSProperties } from "react";
import { projectArt } from "@/data/project-art";
import { productCovers, coverCrops } from "@/data/product-covers";
import type { PortfolioProjectSlug } from "@/data/portfolio-projects";

type Props = { slug: string; src: string; alt: string; priority?: boolean };

function Capture({ src, alt, priority, crop }: { src: string; alt: string; priority: boolean; crop: { x: number; y: number; width: number; height: number; ratio: number } }) {
  const style = {
    "--capture-ratio": crop.ratio * crop.width / crop.height,
    "--capture-width": `${10000 / crop.width}%`,
    "--capture-height": `${10000 / crop.height}%`,
    "--capture-left": `${-100 * crop.x / crop.width}%`,
    "--capture-top": `${-100 * crop.y / crop.height}%`,
  } as CSSProperties;
  return <div className="product-capture" style={style}>
    <Image src={src} alt={alt} fill priority={priority} sizes="(max-width: 760px) 100vw, 860px" />
  </div>;
}

function RecordedQueue() {
  return <div className="demo-console relay-console">
    <div className="demo-toolbar"><span>Relay / job history</span><span className="demo-status">Succeeded</span></div>
    <div className="demo-job"><strong>Worker crash → recovery</strong><span>Same job · attempt 2</span></div>
    <div className="demo-event demo-event-heading"><span>TIME</span><span>EVENT</span><span>WORKER</span></div>
    {[
      ["0.000 s", "enqueued", "—"],
      ["0.016 s", "claimed", "crash-victim"],
      ["0.943 s", "lease_expired", "crash-victim"],
      ["0.998 s", "claimed", "replacement"],
      ["3.003 s", "succeeded", "replacement"],
    ].map(([time, event, worker]) => <div className={`demo-event event-${event}`} key={time}><span>{time}</span><strong>{event}</strong><span>{worker}</span></div>)}
    <div className="demo-console-note">Recorded experiment / September 2026 · not live</div>
  </div>;
}

function DatabaseSource() {
  return <div className="demo-console db-console">
    <div className="demo-toolbar"><span>simpledb / BufferPool.java</span><span>JAVA</span></div>
    <div className="db-editor"><aside><span>simpledb</span><b>BufferPool.java</b><span>HeapFile.java</span><span>HeapPage.java</span></aside>
      <pre><code><span className="code-comment">// Acquire the lock, then check the cache.</span>{"\n"}lockerManager.acquireLock(tid, pid, perm);{"\n\n"}<span className="code-keyword">if</span> (this.cachedPages.containsKey(pid)) {"{"}{"\n"}  <span className="code-keyword">return</span> cachedPages.get(pid);{"\n"}{"}"}{"\n\n"}<span className="code-comment">// Otherwise, read a page from its file.</span>{"\n"}<span className="code-type">int</span> tableid = pid.getTableId();</code></pre>
    </div>
    <div className="db-status"><span>Page cache</span><span>Transaction locks</span><span>4 KiB pages</span></div>
    <div className="demo-console-note">Source excerpt · comments shortened for this cover</div>
  </div>;
}

function WorkspaceSetup() {
  return <div className="demo-console workspace-console">
    <div className="demo-toolbar"><strong>cypress.</strong><span>Workspace setup</span></div>
    <div className="workspace-setup"><strong>Create A Workspace</strong><p>A private space to get started.</p>
      <div className="workspace-name"><span aria-hidden="true">📈</span><div><small>Workspace Name</small><div className="demo-input">Workspace Name</div></div></div>
      <small>Workspace Logo</small><div className="demo-input demo-file">Choose file <span>No file chosen</span></div>
      <div className="demo-submit">Create Workspace</div>
    </div>
    <div className="demo-console-note">Reconstructed from the implemented setup form</div>
  </div>;
}

export function ProjectArtwork({ slug, src, alt, priority = false }: Props) {
  const key = slug as PortfolioProjectSlug;
  const cover = productCovers[key];
  const palette = projectArt[key];
  return <div className={`project-artwork product-cover product-cover-${slug}`} data-cover-kind={cover.kind} style={{ "--cover-paper": palette.paper, "--cover-ink": palette.ink, "--cover-accent": palette.accent } as CSSProperties}>
    <div className="product-cover-heading"><strong>{cover.title}</strong></div>
    <div className="product-cover-stage">
      {slug === "relay" ? <RecordedQueue /> : slug === "simple-db" ? <DatabaseSource /> : slug === "cypress" ? <WorkspaceSetup /> : slug === "petclinic-devops" ?
        <div className="deployment-captures">
          <div className="deployment-build"><Capture src="/project-media/product-source/petclinic-build.webp" alt="Historical Jenkins build history for spring-petclinic-pipeline from the project repository" priority={priority} crop={{ x: 19.4, y: 7.8, width: 61.5, height: 35.2, ratio: 1920 / 1020 }} /></div>
          <div className="deployment-app"><Capture src="/project-media/product-source/petclinic-app.webp" alt="Historical Spring PetClinic VM deployment screenshot showing the build and commit" priority={priority} crop={{ x: 0, y: 12.3, width: 100, height: 58, ratio: 1996 / 1248 }} /></div>
        </div> :
        <Capture src={src} alt={alt} priority={priority} crop={coverCrops[key] ?? { x: 0, y: 0, width: 100, height: 100, ratio: 1.8 }} />}
    </div>
  </div>;
}
