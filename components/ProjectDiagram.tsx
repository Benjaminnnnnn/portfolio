import type { ReactNode } from "react";
import type { DiagramKind } from "@/data/project-visuals";

function Box({ label, children, tone = "" }: { label: string; children?: ReactNode; tone?: string }) {
  return <div className={`diagram-box ${tone}`}><strong>{label}</strong>{children ? <span>{children}</span> : null}</div>;
}

function Arrow({ children }: { children?: ReactNode }) {
  return <div className="diagram-arrow"><span>{children}</span><b aria-hidden="true">↓</b></div>;
}

export function ProjectDiagram({ kind, slug }: { kind: DiagramKind; slug: string }) {
  let drawing: ReactNode;
  switch (kind) {
    case "leases":
      drawing = <div className="lease-drawing"><div className="diagram-pair"><Box label="Worker A" tone="muted">Old token · expired</Box><Box label="Worker B" tone="accent">Fresh token · current</Box></div><div className="diagram-pair"><Arrow>rejected ×</Arrow><Arrow>accepted ✓</Arrow></div><Box label="The same job row"><code>token = B · lease is valid</code></Box><div className="diagram-footnote">Only the current owner can commit the result.</div></div>;
      break;
    case "throughput":
      drawing = <div className="throughput-chart"><div className="chart-unit">Jobs per second <span>Local burst test</span></div>{[{ slots: "1 slot", processes: "1 process", rate: 62.242 }, { slots: "4 slots", processes: "1 process", rate: 255.428 }, { slots: "12 slots", processes: "3 processes", rate: 862.045 }].map(row => <div className="chart-row" key={row.slots}><div><strong>{row.slots}</strong><small>{row.processes}</small></div><div className="chart-track"><span style={{ width: `${row.rate / 9}%` }} /></div><b>{Math.round(row.rate)}</b></div>)}<div className="chart-axis"><span>0</span><span>450</span><span>900 jobs/s</span></div><p>Each job: 10 ms wait + 1,000 hash iterations</p></div>;
      break;
    case "buffer":
      drawing = <div><div className="diagram-topline"><span>BUFFER POOL</span><span>4 KiB / page</span></div><div className="page-slots">{["P01", "P02", "P03", "Free"].map((p, i) => <div className={i === 3 ? "empty" : ""} key={p}><span>{p}</span>{i < 3 && <div className="page-lines" aria-hidden="true">▰ ▰<br />▰ ▰<br />▰ ▰</div>}</div>)}</div><div className="diagram-pair"><Arrow>cache hit · return</Arrow><Arrow>cache miss · read</Arrow></div><div className="diagram-pair"><Box label="Query operator">Use the cached page</Box><Box label="Heap file" tone="accent">Load a page from disk</Box></div></div>;
      break;
    case "transactions":
      drawing = <div><Box label="Transaction holds page locks">Pages may contain uncommitted changes</Box><div className="diagram-pair"><Arrow>commit</Arrow><Arrow>abort</Arrow></div><div className="diagram-pair"><Box label="Flush dirty pages" tone="accent">Write changes to disk</Box><Box label="Restore pages">Read the disk version</Box></div><Arrow>both paths</Arrow><Box label="Release locks" /></div>;
      break;
    case "operators":
      drawing = slug === "xv6" ? <div className="kernel-resources"><Box label="Process">Execution state</Box><div className="branch-line" /><div className="diagram-trio"><Box label="Memory">Address space</Box><Box label="Files">Open descriptors</Box><Box label="CPU">Saved registers</Box></div><div className="diagram-footnote">The teaching kernel manages these resources.</div></div> : <div className="operator-tree"><Box label="Aggregate" /><Arrow /><Box label="Join" tone="accent" /><div className="branch-line" /><div className="diagram-pair"><div><Box label="Filter" /><Arrow /><Box label="Scan · table A" /></div><div><Box label="Scan · table B" /><Arrow /><Box label="Stored pages" /></div></div></div>;
      break;
    case "environments":
      drawing = <div className="environment-drawing"><div className="environment-boundary"><span>DEVELOPMENT CONTAINER</span><Box label="Spring PetClinic">Upstream application</Box><Arrow /><Box label="Jenkins" tone="accent">Build artifact</Box></div><Arrow>Ansible deployment</Arrow><div className="environment-boundary"><span>HOST MACHINE</span><Box label="Vagrant VM">Application runtime</Box></div></div>;
      break;
    case "checks":
      drawing = <div className="check-matrix"><div className="diagram-topline"><span>CHECK</span><span>LOOKS AT</span></div>{[["Jenkins", "Build and tests", "Source + dependencies"], ["SonarQube", "Code analysis", "Source code"], ["OWASP ZAP", "Security scan", "Running application"]].map(([name, label, target], i) => <div className="check-row" key={name}><b>{String(i + 1).padStart(2, "0")}</b><div><strong>{name}</strong><small>{label}</small></div><span>{target}</span></div>)}<p>Configured tools, not a report of current test results.</p></div>;
      break;
    case "monitoring":
      drawing = <div><div className="monitoring-source"><span className="server-icon" aria-hidden="true">▤</span><strong>Application on the VM</strong></div><Arrow>metrics</Arrow><div className="diagram-pair"><Box label="Prometheus" tone="accent">Collect and query</Box><Box label="Grafana">Read and display</Box></div><div className="monitoring-link">Prometheus <span aria-hidden="true">→</span> Grafana</div><div className="diagram-footnote">No live values shown</div></div>;
      break;
    case "rules":
      drawing = <div><div className="token-row" aria-hidden="true">{["#eadfc7", "#4d78b7", "#57916e", "#be516c", "#535659"].map(c => <i key={c} style={{ background: c }} />)}</div><Box label="Player action">Take tokens · reserve · purchase</Box><Arrow /><div className="rule-gate"><span>Current turn?</span><span>Move allowed?</span><span>Enough resources?</span></div><div className="diagram-pair"><Arrow>invalid</Arrow><Arrow>valid</Arrow></div><div className="diagram-pair"><Box label="Keep current state" /><Box label="Apply and share" tone="accent">Connected players receive the update</Box></div></div>;
      break;
    case "removal":
      drawing = <div><Box label="One photo at a time">Keep · Delete · sort to an album</Box><div className="diagram-pair"><Arrow>keep</Arrow><Arrow>delete</Arrow></div><div className="diagram-pair"><Box label="Kept">Stays in its collection</Box><Box label="Pending removal" tone="accent">Held in Handpick's trash</Box></div><Arrow>review and confirm the batch</Arrow><Box label="Delete through Photos">iOS asks for confirmation</Box><div className="diagram-footnote">Until then, a pending photo can still be restored.</div></div>;
      break;
    case "frames":
      drawing = <div><div className="frame-strip">{[0, 1, 2].map(i => <div className={i === 1 ? "active" : ""} key={i}><div className="mini-grid" aria-hidden="true">{Array.from({ length: 20 }, (_, n) => <i className={n < 4 + i * 3 ? "visited" : ""} key={n} />)}</div><span>Frame {i + 1}</span></div>)}</div><Arrow>active frame + question</Arrow><Box label="Tutor context" tone="accent">Algorithm · current state · learner's question</Box><Arrow /><div className="diagram-pair"><Box label="Gemini" /><Box label="OpenAI" /></div></div>;
      break;
    case "workspace":
      drawing = <div className="workspace-map"><aside><strong>Account</strong><span>Workspace A</span><span>Workspace B</span></aside><div><span className="diagram-topline">WORKSPACE A</span><Box label="Dashboard" tone="accent">Workspace context</Box><div className="skeleton-records" aria-hidden="true"><i /><i /><i /></div><p>Navigation and account setup are implemented. A complete editor is not established.</p></div></div>;
      break;
    case "practice":
      drawing = <div className="practice-map"><div><span>PROBLEM</span><strong>Two Sum</strong><p>Find the two values that add up to the target.</p><code>[2, 7, 11, 15]<br />target = 9</code></div><div><span>SOLUTION</span><div className="code-lines" aria-hidden="true"><i /><i /><i /><i /></div><div className="practice-result"><span>Expected output</span><code>[0, 1]</code></div></div></div>;
      break;
    case "fetch":
      drawing = <div><Box label="Ticker">Select the next feed batch</Box><div className="branch-line" /><div className="diagram-trio">{["Feed A", "Feed B", "Feed C"].map(feed => <Box key={feed} label={feed} tone="accent">Fetch + parse</Box>)}</div><Arrow>wait group</Arrow><Box label="Batch complete">The next iteration can begin</Box><div className="diagram-footnote">HTTP timeout: 10 seconds</div></div>;
      break;
    case "search":
      drawing = <div><div className="search-query"><span aria-hidden="true">⌕</span><code>hello</code><span>HTTP request</span></div><Arrow /><Box label="Listening socket → thread pool" tone="accent">A worker handles the accepted connection</Box><Arrow /><div className="diagram-pair"><Box label="Prepared index">Read matching documents</Box><Box label="HTML response">Format the results</Box></div></div>;
      break;
    case "kernel":
      drawing = <div className="kernel-map"><div><span>USER SPACE</span><Box label="Shell and utilities">User programs</Box></div><div className="syscall-boundary">↓ system call boundary ↑</div><div><span>KERNEL SPACE</span><div className="diagram-trio"><Box label="Processes" /><Box label="Memory" /><Box label="Files" /></div></div><div className="kernel-base">RISC-V · QEMU</div></div>;
      break;
    case "itinerary-check":
      drawing = <div><Box label="One sentence">Place · mood · length · budget</Box><Arrow>fixed JSON shape</Arrow><Box label="Model reply" tone="muted">Untrusted until checked</Box><Arrow /><div className="rule-gate"><span>Valid JSON?</span><span>Matches the schema?</span><span>Same destination?</span></div><div className="diagram-pair"><Arrow>destination drifted</Arrow><Arrow>all pass</Arrow></div><div className="diagram-pair"><Box label="Ask once more">With an explicit correction</Box><Box label="Show the itinerary" tone="accent">Days · map · budget</Box></div><div className="diagram-footnote">Invalid JSON or a schema failure returns an error, not a partial trip.</div></div>;
      break;
    case "refund-gate":
      drawing = <div className="check-matrix"><div className="diagram-topline"><span>CHECK</span><span>STOPS</span></div>{[["Signed in", "Session token, read on the server", "Anonymous requests"], ["Confirmed", "The user said yes in this turn", "Speculative refunds"], ["Valid input", "Order ID and reason", "Malformed arguments"], ["Owner", "Order belongs to the session user", "Refunding someone else's order"], ["Not refunded", "Order is still confirmed or paid", "Double refunds"], ["Event not ended", "Fails closed", "Refunds after the event"], ["Under ceiling", "$10,000 by default", "Large refunds without a person"]].map(([name, label, target], i) => <div className="check-row" key={name}><b>{String(i + 1).padStart(2, "0")}</b><div><strong>{name}</strong><small>{label}</small></div><span>{target}</span></div>)}<p>Order of checks in the refund tool. The model supplies none of the identity.</p></div>;
      break;
    case "refund-recovery":
      drawing = <div><Box label="confirmed / paid">Order before the refund</Box><Arrow>guarded transaction</Arrow><Box label="refund_pending" tone="accent">Written before the payment call</Box><Arrow>payment provider · idempotency key</Arrow><div className="diagram-pair"><Box label="refunded">Tickets cancelled · email sent</Box><Box label="Call failed" tone="muted">Order stays pending</Box></div><div className="diagram-pair"><Arrow /><Arrow>sweep every 5 minutes</Arrow></div><div className="diagram-pair"><Box label="Done" /><Box label="Ask the provider">Complete or roll back</Box></div><div className="diagram-footnote">The sweep picks up orders pending for more than 10 minutes.</div></div>;
      break;
    case "model3d":
      drawing = <div><Box label="Photo of an object">From the iPhone camera or library</Box><Arrow>submit</Arrow><Box label="Image-to-3D model" tone="accent">Meshy 6 through Wavespeed · prediction ID</Box><Arrow>poll status</Arrow><div className="diagram-pair"><Box label="Processing">Keep polling</Box><Box label="Completed">Download the GLB</Box></div><div className="diagram-pair"><div /><Arrow>convert once</Arrow></div><div className="diagram-pair"><div /><Box label="USDZ, cached" tone="accent">Shown and spun on iOS</Box></div></div>;
      break;
    case "capture-flow":
      drawing = <div><div className="diagram-trio"><Box label="Capture">Xsens MVN</Box><Box label="Import">MVNX export</Box><Box label="Context">Subject · gear · protocol</Box></div><Arrow>divide into tasks</Arrow><div className="diagram-pair"><Box label="Kinematic analysis" tone="accent">Joint angles · gait · centre of mass</Box><Box label="OpenSim reconstruction">Kinematics only</Box></div><Arrow /><Box label="Compare PPE A with PPE B">Matched trials</Box><div className="diagram-footnote">Runs on the operator's machine · API bound to 127.0.0.1</div></div>;
      break;
    case "task-detect":
      drawing = <div><div className="diagram-topline"><span>ONE CONTINUOUS CAPTURE</span><span>SCHEMATIC</span></div><div className="rule-gate"><span>walking</span><span>squat</span><span>overhead</span><span>balance</span></div><Arrow>where movement stops or changes</Arrow><Box label="Proposed boundaries" tone="muted">Drafted from joint-angle movement</Box><Arrow>operator review</Arrow><Box label="Confirmed tasks" tone="accent">Only these count as evidence</Box><div className="diagram-footnote">Task names from the tool's catalogue. No recorded data is shown.</div></div>;
      break;
    case "ppe-compare":
      drawing = <div><div className="diagram-pair"><Box label="Trial A">Baseline gear</Box><Box label="Trial B" tone="accent">Gear under test</Box></div><div className="branch-line" /><div className="rule-gate"><span>Same subject?</span><span>Same task?</span><span>Same protocol?</span></div><Arrow>matched</Arrow><Box label="Difference per metric">With the direction each metric favours</Box><div className="diagram-footnote">Descriptive only: no overall score, p-value, or causal claim.</div></div>;
      break;
    case "content": {
      drawing = slug === "rss-aggregator" ? <div className="entity-drawing"><div className="diagram-pair"><Box label="Reader" /><Box label="Feed" /></div><Arrow>linked by</Arrow><Box label="Follow" tone="accent">A reader's subscription to a feed</Box><div className="entity-storage">Each feed has collected posts.</div><div className="diagram-footnote">Go · sqlc · PostgreSQL</div></div>
        : slug === "cypress" ? <div className="entity-drawing"><Box label="Next.js interface">Accounts · workspaces · navigation</Box><Arrow>backend services</Arrow><Box label="Supabase" tone="accent">PostgreSQL data</Box><div className="entity-storage">Drizzle describes the database model in TypeScript.</div></div>
        : <div className="entity-drawing"><Box label="Creator" tone="accent" /><div className="branch-line" /><div className="diagram-pair"><Box label="Profile">Creator information</Box><div><Box label="Videos">Published clips</Box><Arrow /><Box label="Reactions" /></div></div><div className="diagram-footnote">Content stored through Sanity · conceptual view</div></div>;
      break;
    }
  }
  return <div className={`project-diagram diagram-${kind}`} data-diagram={kind}>{drawing}</div>;
}
