import type { PortfolioProject } from "./portfolio-projects";

const source = "https://github.com/Benjaminnnnnn";

export const systemsProjects = {
  relay: {
    slug: "relay", title: "Relay", category: "Distributed job processing",
    context: "Independent systems study · AI-assisted build",
    headline: "A worker can disappear. Its job shouldn't.",
    summary: "A Go and PostgreSQL job queue with worker leases, retries, and a recorded crash-recovery experiment. Built to study what happens between accepting a job and finishing it.",
    cover: "/project-media/relay.svg", coverAlt: "Relay architecture illustration showing a durable queue, three workers, and a reassigned lease.",
    coverCaption: "Architecture illustration. Measurements below come from the recorded local experiment.",
    accent: "#d54d2c", stack: ["Go", "PostgreSQL", "HTTP", "Docker", "GitHub Actions"], sourceUrl: `${source}/relay`, sourceStatus: "pending",
    metrics: [{ value: "9,000", label: "jobs in the local scaling experiment" }, { value: "3", label: "independent worker processes tested" }, { value: "SIGKILL", label: "worker recovery verified" }],
    chapters: [
      { eyebrow: "01 / Ownership", title: "Which worker is allowed to finish the job?", body: ["Each claim locks a ready row, installs a fresh lease token, and commits before the handler starts. Other workers skip locked rows. A heartbeat renews the lease using database time.", "Completion checks both the token and its expiry. A worker that finishes late cannot overwrite the result after another worker has taken the job."] },
      { eyebrow: "02 / Failure", title: "Kill a worker and follow the job through recovery.", body: ["The experiment kills a process during a two-second job. Its lease expires, a replacement claims the job, and attempt two succeeds. The old acknowledgement is rejected. In the recorded run, completion took about three seconds after the kill.", "Delivery is at least once. Lease tokens protect queue state; a handler that writes to an external service still needs its own way to prevent duplicate effects."] },
      { eyebrow: "03 / Measurement", title: "Measure queueing time as well as throughput.", body: ["A single-machine burst test processed 3,000 jobs at each configuration: one execution slot, four slots, and twelve slots across three processes. Throughput was about 62, 255, and 862 jobs per second. Each job waited 10 ms and ran 1,000 hash iterations.", "These are individual local trials, including submission and queue drain. They are not production capacity figures. The one-slot run had a completion p95 of about 44 seconds. PostgreSQL remains the shared availability dependency."] },
    ],
    evidence: [{ label: "Recorded experiment and raw results", href: `${source}/relay/blob/main/experiments/2026-09-13-local.json` }, { label: "Concurrency and lease tests", href: `${source}/relay/blob/main/internal/queue/queue_test.go` }, { label: "Failure semantics and limits", href: `${source}/relay/blob/main/docs/failure-semantics.md` }],
  },
  "simple-db": {
    slug: "simple-db", title: "SimpleDB", category: "Database internals", context: "Database coursework · teaching framework",
    headline: "Follow a query all the way down to a page.",
    summary: "A Java database course project with query operators, a buffer pool, page locks, and transaction handling. The code makes the storage work behind a query visible.",
    cover: "/project-media/simple-db.svg", coverAlt: "Database diagram showing a query passing through operators and a buffer pool to disk pages.",
    coverCaption: "Conceptual map of the database components, drawn for this case study.",
    accent: "#466044", stack: ["Java", "Page storage", "Query operators", "Transactions", "JUnit"], sourceUrl: `${source}/simple-db`,
    metrics: [{ value: "4 KiB", label: "default page size in BufferPool" }, { value: "Page locks", label: "transaction access control" }, { value: "Java", label: "storage and query implementation" }],
    chapters: [
      { eyebrow: "01 / Pages", title: "The buffer pool sits between queries and disk.", body: ["BufferPool retrieves a page from its cache or reads it from the underlying file. When the configured pool is full, it evicts a page before admitting another. Page IDs and transaction permissions are explicit inputs."] },
      { eyebrow: "02 / Transactions", title: "Commit and abort take different paths.", body: ["The implementation acquires locks before returning pages. A commit flushes the transaction's dirty pages; an abort restores its pages from disk. Both paths then release the transaction's locks."] },
      { eyebrow: "03 / Scope", title: "Coursework with concrete implementation details.", body: ["This repository includes a teaching framework and tests for operators, pages, writes, and deadlocks. It is a course implementation. The test suite has not been rerun for this case study, so no passing-test or throughput figure is attached."] },
    ],
    evidence: [{ label: "Buffer pool implementation", href: `${source}/simple-db/blob/main/src/java/simpledb/BufferPool.java` }, { label: "Repository and course tests", href: `${source}/simple-db` }],
  },
  "petclinic-devops": {
    slug: "petclinic-devops", title: "PetClinic / DevOps", category: "Build and deployment", context: "CMU 17-636 · Spring PetClinic extension",
    headline: "Build the app, check it, and deploy it to a VM.",
    summary: "A DevOps course extension of Spring PetClinic, with Jenkins builds, Ansible deployment, security checks, and Prometheus/Grafana monitoring.",
    cover: "/project-media/petclinic-devops.svg", coverAlt: "Delivery pipeline connecting a build, quality checks, VM deployment, and monitoring.",
    coverCaption: "Diagram of the workflow documented in the repository's setup guide.",
    accent: "#3e64b6", stack: ["Jenkins", "Ansible", "Vagrant", "Prometheus", "Grafana", "OWASP ZAP"], sourceUrl: `${source}/spring-petclinic`,
    metrics: [{ value: "Jenkins", label: "build and delivery pipeline" }, { value: "Ansible", label: "deployment to a Vagrant VM" }, { value: "Grafana", label: "metrics and dashboard configuration" }],
    chapters: [
      { eyebrow: "01 / Starting point", title: "Use an existing application to study delivery.", body: ["The application comes from the open-source Spring PetClinic project. The course work adds deployment and operations configuration. The PetClinic application itself is upstream work."] },
      { eyebrow: "02 / Pipeline", title: "Build in one environment, deploy into another.", body: ["The setup guide separates the development container from the host's Vagrant VM. Jenkins builds the application and uses Ansible to deploy it to the VM. SonarQube and OWASP ZAP are part of the documented quality and security workflow."] },
      { eyebrow: "03 / Operations", title: "Keep the deployment inspectable.", body: ["Prometheus and Grafana configuration, setup scripts, and screenshots are committed alongside the pipeline. The repository also contains Kubernetes manifests. The documented VM workflow is the basis of this case study; no currently running production deployment is claimed."] },
    ],
    evidence: [{ label: "Setup guide and environment boundaries", href: `${source}/spring-petclinic/blob/main/setup.md` }, { label: "Jenkins pipeline", href: `${source}/spring-petclinic/blob/main/Jenkinsfile` }],
  },
} as const satisfies Record<string, PortfolioProject>;
