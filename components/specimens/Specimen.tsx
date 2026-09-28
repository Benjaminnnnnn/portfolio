import { withBasePath } from "@/lib/base-path";

// One graphic object per project, built from that project's own material:
// its states, its data, its UI vocabulary. Sized in container units so the
// same piece works as a card, a case-study cover and a thumbnail.

const img = (name: string) => withBasePath(`/project-media/specimens/${name}.webp`);

function Relay() {
  const rows = [
    ["0.000", "ENQUEUED", "—"],
    ["0.016", "CLAIMED", "CRASH-VICTIM"],
    ["0.943", "LEASE EXPIRED", "CRASH-VICTIM"],
    ["0.998", "CLAIMED", "REPLACEMENT"],
    ["3.003", "SUCCEEDED", "REPLACEMENT"],
  ];
  return <div className="sp-relay">
    <div className="sp-relay-head"><span>RELAY</span><span>ONE JOB · ATTEMPT 2</span></div>
    {rows.map(([t, state, worker], i) => <div className={`sp-relay-row sp-relay-row-${i}`} key={t}>
      <span>{t}s</span><strong>{state.split("").map((c, k) => <i key={k} style={{ ["--k" as string]: k }}>{c === " " ? " " : c}</i>)}</strong><span>{worker}</span>
    </div>)}
  </div>;
}

function Handpick() {
  return <div className="sp-handpick">
    <div className="sp-handpick-stack">
      <img className="sp-hp-back sp-hp-2" src={img("handpick-latte-art")} alt="" />
      <img className="sp-hp-back sp-hp-1" src={img("handpick-golden-puppy")} alt="" />
      <div className="sp-hp-top"><img src={img("handpick-cinque-terre")} alt="" /><span className="sp-hp-stamp">DELETE</span></div>
    </div>
    <div className="sp-handpick-actions"><span>↓ Keep</span><span>✕ Delete</span></div>
  </div>;
}

function Splendor() {
  const gems = ["#f4f1ea", "#2f5fd0", "#1e9e62", "#d8264f", "#2a2b30", "#f2c21b"];
  return <div className="sp-splendor">
    <div className="sp-splendor-hand">
      {[["splendor-sapphire", 2], ["splendor-noble", 3], ["splendor-ruby", 4], ["splendor-emerald", 1]].map(([name, pts], i) =>
        <div className={`sp-sp-card sp-sp-card-${i}`} key={name}><img src={img(String(name))} alt="" /><b>{pts}</b></div>)}
    </div>
    <div className="sp-splendor-gems">{gems.map((c) => <i key={c} style={{ background: c }} />)}</div>
  </div>;
}

function AlgoExplorer() {
  // A 14×8 grid; the path is the one A* returned in the capture, simplified.
  // Walls never sit on the path; the path is the route A* returned.
  const walls = ["2,0", "5,0", "9,0", "0,2", "4,2", "7,1", "8,1", "10,1", "8,3", "10,3", "12,3", "3,4", "5,4", "6,4", "7,4", "13,4", "2,5", "3,5", "8,5", "12,5", "4,6", "5,6", "6,6", "10,6", "1,7", "9,7"];
  const path = "M1.5,1.5 H3.5 V3.5 H6.5 V2.5 H9.5 V4.5 H11.5 V6.5 H12.5";
  return <div className="sp-algo">
    <svg viewBox="0 0 14 8" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {Array.from({ length: 14 * 8 }, (_, i) => <rect key={i} x={i % 14 + .08} y={Math.floor(i / 14) + .08} width=".84" height=".84" rx=".12" className={walls.includes(`${i % 14},${Math.floor(i / 14)}`) ? "wall" : "cell"} />)}
      <path d={path} className="sp-algo-path" pathLength="1" />
      <rect x="1.08" y="1.08" width=".84" height=".84" rx=".12" className="start" />
      <rect x="12.08" y="6.08" width=".84" height=".84" rx=".12" className="goal" />
    </svg>
    <p className="sp-algo-label"><span>A*</span> frame 23/23 · path found</p>
  </div>;
}

function SimpleDb() {
  return <div className="sp-db">
    <p className="sp-db-title">BufferPool<span>numPages = 4 · 4 KiB</span></p>
    <div className="sp-db-slots">
      {["P01", "P02", "P03", "P04"].map((p, i) => <div key={p} className={`sp-db-slot${i === 0 ? " is-evicting" : ""}`}><span>{p}</span><i /><i /><i /><i /></div>)}
    </div>
    <p className="sp-db-call">getPage(tid, pid, perm)</p>
  </div>;
}

function PetClinic() {
  // Stage names from the repository Jenkinsfile, lightly shortened.
  const stages = ["Checkout", "Build", "Unit Tests", "SonarQube Analysis", "Quality Gate", "Docker Image", "DAST", "Deploy to VM", "Verify Deployment"];
  return <div className="sp-pc">
    <p className="sp-pc-title">spring-petclinic-pipeline <span>#2 · demo change</span></p>
    <ol className="sp-pc-stages">{stages.map((s, i) => <li key={s} style={{ ["--i" as string]: i }}><i>✓</i>{s}</li>)}</ol>
  </div>;
}

function Gle333() {
  return <div className="sp-333">
    <img src={img("333gle-logo")} alt="" />
    <div className="sp-333-search"><span className="sp-333-query">hello</span><b>Search</b></div>
    <p className="sp-333-count">44 results found for <strong>hello</strong></p>
  </div>;
}

function Xv6() {
  // Lines from the existing terminal capture.
  const lines = ["xv6...", "cpu0: starting 0", "init: starting sh", "$ ls", ".            1 1 512", "README       2 2 2327", "cat          2 3 13808", "grep         2 6 15636", "usertests    2 15 57008", "$ "];
  return <pre className="sp-xv6">{lines.map((l, i) => <span key={i} style={{ ["--i" as string]: i }}>{l}{i === lines.length - 1 ? <b className="sp-caret" /> : null}{"\n"}</span>)}</pre>;
}

function Rss() {
  return <div className="sp-rss">
    <p className="sp-rss-cmd"><span>$</span> curl -X POST /v1/feeds</p>
    <p className="sp-rss-body">{`{ "name": "New York Times - U.S.",`}<br />{`  "url": "rss.nytimes.com/…/US.xml" }`}</p>
    <p className="sp-rss-res">201 Created</p>
  </div>;
}

function Cypress() {
  return <div className="sp-cy">
    <div className="sp-cy-card">
      <strong>Create A Workspace</strong>
      <small>Workspace Name</small>
      <div className="sp-cy-input"><span className="sp-cy-emoji">📈</span><span className="sp-cy-typed">Design team</span></div>
      <small>Workspace Logo</small>
      <div className="sp-cy-input sp-cy-file">Choose file</div>
      <b className="sp-cy-button">Create Workspace</b>
    </div>
  </div>;
}

function LeetCode() {
  return <div className="sp-lc">
    <div className="sp-lc-card">
      <p className="sp-lc-title">1. Two Sum <span>Easy</span></p>
      <p className="sp-lc-code">nums = [2,7,11,15], target = 9</p>
      <div className="sp-lc-cases">{["Case 1", "Case 2", "Case 3"].map((c, i) => <span key={c} style={{ ["--i" as string]: i }}>{c}</span>)}</div>
    </div>
  </div>;
}

function ClipHop() {
  const topics = [["🐾", "Animals"], ["💄", "Beauty"], ["😎", "Comedy"], ["🕺", "Dance"], ["</>", "Development"], ["🍜", "Food"], ["🎮", "Gaming"], ["🎵", "Music"], ["📰", "News"], ["🏅", "Sports"]];
  return <div className="sp-hop">{topics.map(([icon, t], i) => <span key={t} style={{ ["--i" as string]: i }}><em>{icon}</em>{t}</span>)}</div>;
}

function Propertize() {
  return <div className="sp-prop">
    <div className="sp-prop-card">
      <div><small>Properties for Sale</small><strong>684</strong><em>demo data</em></div>
      <svg viewBox="0 0 36 36" aria-hidden="true"><circle cx="18" cy="18" r="14" className="track" /><circle cx="18" cy="18" r="14" className="value" pathLength="100" /></svg>
    </div>
  </div>;
}

function Mems() {
  return <div className="sp-mems">
    <div className="sp-mems-p sp-mems-p0"><img src={img("mems-canyon")} alt="" /><span className="sp-mems-cap">Road trip</span></div>
    <div className="sp-mems-p sp-mems-p1"><img src={img("mems-kyoto")} alt="" /><span className="sp-mems-cap">Fushimi Inari, Kyoto</span></div>
    <div className="sp-mems-p sp-mems-p2"><img src={img("mems-banff")} alt="" /><span className="sp-mems-cap">Moraine Lake, Banff</span></div>
  </div>;
}

const pieces: Record<string, () => React.JSX.Element> = {
  relay: Relay, handpick: Handpick, splendor: Splendor, "algo-explorer": AlgoExplorer, "simple-db": SimpleDb,
  "petclinic-devops": PetClinic, "333gle": Gle333, xv6: Xv6, "rss-aggregator": Rss, cypress: Cypress,
  "leetcode-clone": LeetCode, cliphop: ClipHop, propertize: Propertize, mems: Mems,
};

export function Specimen({ slug }: { slug: string }) {
  const Piece = pieces[slug];
  return <div className={`specimen specimen-${slug}`} aria-hidden="true">{Piece ? <Piece /> : null}</div>;
}
