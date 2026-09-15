"use client";

import { useState } from "react";

// Relative timestamps rounded from the recorded 2026-09-13 Relay experiment.
const frames = [
  { label: "Accepted", time: "0.000 s", state: "Pending", owner: "No worker yet", attempt: "0", note: "The job and its first event are committed together in PostgreSQL." },
  { label: "Claimed", time: "0.016 s", state: "Running", owner: "Worker A", attempt: "1", note: "Worker A receives a lease. The experiment then kills this process while its handler is running." },
  { label: "Expired", time: "0.943 s", state: "Pending", owner: "Lease released", attempt: "1", note: "The recovery loop finds the expired lease and makes the same job available again." },
  { label: "Reclaimed", time: "0.998 s", state: "Running", owner: "Worker B", attempt: "2", note: "The replacement receives a fresh token and renews its lease while the two-second handler runs." },
  { label: "Finished", time: "3.003 s", state: "Succeeded", owner: "Worker B", attempt: "2", note: "The replacement commits the result. An acknowledgement using Worker A's old token is rejected." },
] as const;

export function LeaseReplay() {
  const [index, setIndex] = useState(0);
  const frame = frames[index];
  return (
    <section className="lease-replay" aria-labelledby="lease-replay-title">
      <div className="lease-replay-heading"><div><p className="study-section-label">RECORDED EXPERIMENT / SEPT 2026</p><h2 id="lease-replay-title">Follow one job.</h2></div><span>Worker crash → recovery</span></div>
      <div className="lease-steps" role="group" aria-label="Choose an event from the recorded job history">
        {frames.map((item, i) => <button type="button" key={item.label} aria-pressed={index === i} onClick={() => setIndex(i)}><span>{String(i + 1).padStart(2, "0")}</span>{item.label}<small>{item.time}</small></button>)}
      </div>
      <div className="lease-frame" aria-live="polite" aria-atomic="true">
        <div className="lease-job"><span>THE SAME JOB</span><strong>{frame.state}</strong><span>Attempt {frame.attempt} · {frame.owner}</span></div>
        <p>{frame.note}</p>
      </div>
      <div className="lease-controls"><button type="button" disabled={index === 0} onClick={() => setIndex(index - 1)}>← Previous event</button><span>{index + 1} / {frames.length}</span><button type="button" disabled={index === frames.length - 1} onClick={() => setIndex(index + 1)}>Next event →</button></div>
      <p className="lease-caption">A replay of recorded events, not a live service. Times are relative to enqueue and rounded to milliseconds.</p>
    </section>
  );
}
