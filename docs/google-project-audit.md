# Google SWE project assessment

Reviewed September 13, 2026. This assessment uses the public GitHub API, selected source files, and Google Careers postings. It assesses visible evidence, not the limits of Benjamin's skills. Existing repositories were inspected but their test suites were not run.

## Roles to use as targets

| Role | Fit and requirements | Project evidence to emphasize |
| --- | --- | --- |
| [Software Engineer, Early Career, Campus](https://www.google.com/about/careers/applications/jobs/results/78703249065943750-software-engineer-early-career-campus) | Best direct target. U.S. locations include Pittsburgh. The posting accepts algorithms and development experience from school, projects, research, and internships. A related master's degree is preferred. It also asks for experience using AI productivity tools and lists accessibility among preferences. The page says the application window runs until at least September 30, 2026, subject to business needs. | Algorithms, a clearly scoped team contribution, tested systems code, accessible interfaces, and an honest account of AI-assisted development. |
| [Software Engineer III, Infrastructure, Platforms Infrastructure Engineering](https://www.google.com/about/careers/applications/jobs/results/141492603370513094-software-engineer-iii-infrastructure-platforms-infrastructure-engineering?hl=en&page=78) | Stretch target, conditional on experience. The posting asks for two years programming in C++, Python, or Go and two years in infrastructure, distributed systems, networks, compute, storage, or hardware architecture. | Concurrency, storage decisions, performance experiments, diagnostics, and failure recovery. A portfolio project does not substitute for required years of experience. |
| [Software Engineer, GDC AI Applications and Agents](https://www.google.com/about/careers/applications/jobs/results/126988379509138118-software-engineer-gdc-ai-applications-and-agents?hl=en-PK&page=1) | Conditional target. Requires two years of development, or one year with an advanced degree in industry, plus experience building and deploying agents and AI platforms. Kubernetes and distributed AI/ML systems are preferred. | Agent evaluation, deployment, APIs, and operational behavior. An API-backed chat interface alone is insufficient evidence for the whole role. |

These pages displayed job descriptions when reviewed. Several other search results led to “Job not found”; those are excluded. Eligibility still depends on graduation timing, actual work experience, and the role's application questions.

## What the GitHub already demonstrates

The public inventory contained 27 repositories: 23 non-forks and four forks. Repository size is not used as a measure of original engineering work. Vendored code, generated files, binaries, and inherited course scaffolding need separate attribution.

| Area | Evidence inspected | Assessment |
| --- | --- | --- |
| Algorithms and interfaces | [AlgoExplorer](https://github.com/Benjaminnnnnn/algo-explorer): README, algorithm/visualizer/service file inventory | Useful candidate for the lead product case study. The README still lists generator and UI tests as future work. No measured learning outcomes were found in the inspected material. |
| Team engineering and testing | [Splendor](https://github.com/Benjaminnnnnn/splendor): README, architecture/test/workflow inventory | Stronger signal than another CRUD clone. The README explicitly credits AI-generated UI, art, initial infrastructure, and documentation. Preserve that disclosure and distinguish team scope from personal ownership. |
| Backend concurrency | [go-rssagg scraper](https://github.com/Benjaminnnnnn/go-rssagg/blob/main/scraper.go), [RSS client](https://github.com/Benjaminnnnnn/go-rssagg/blob/main/rss.go), SQL and handler inventory | Goroutines, a wait group, a ticker, PostgreSQL, and generated queries are present. No tests appeared in the complete tree. The scraper marks a feed fetched before retrieval; it logs a fetch error and continues. Multiple service instances have no visible lease/claim protocol. The HTTP client has a timeout but reads bodies without a size limit. |
| Database internals | [SimpleDB BufferPool](https://github.com/Benjaminnnnnn/simple-db/blob/main/src/java/simpledb/BufferPool.java), repository inventory | A significant omission from the portfolio. Includes page caching, transaction completion, locking calls, and a substantial course test tree. Compiled classes and IDE files are checked in. Passing tests and original contribution boundaries remain unverified. |
| C++ and networking | [333gle](https://github.com/Benjaminnnnnn/333gle): source/test inventory | HTTP connections, sockets, a thread pool, and tests are visible. Earlier indexing assignments are supplied as static libraries. The existing portfolio's “millions of index files” claim has no benchmark evidence in the inspected material and should be removed until measured. |
| Operating systems | [xv6](https://github.com/Benjaminnnnnn/xv6): kernel and lab inventory | Relevant C/RISC-V coursework. The tree includes upstream teaching-kernel and lwIP code; its existence does not prove that all kernel features were implemented by Benjamin. Describe specific lab changes only after checking the diff. |
| Delivery and operations | [PetClinic fork](https://github.com/Benjaminnnnnn/spring-petclinic): README and complete deployment-file inventory | Another portfolio omission. Includes Jenkins, Ansible, Kubernetes, Prometheus/Grafana, security scan scripts, and deployment screenshots. The README largely describes upstream PetClinic and links to upstream badges. Present this as a DevOps course extension, with Benjamin's deployment work identified separately. No live deployment or passing workflow was verified. |
| AI applications | AlgoExplorer, [Poreia](https://github.com/Benjaminnnnnn/poreia), [Spotlight AI](https://github.com/Benjaminnnnnn/spotlight-ai) | Existing application breadth means another chat wrapper would add little. Poreia and Spotlight need a deeper implementation/evaluation review before claims about agent reliability or model quality. |

## Highest-value addition

Build **Relay**, a Go/PostgreSQL durable job system, as a separate repository. It extends the questions raised by the RSS scraper: who owns a job, what happens when a worker dies, whether an old worker can acknowledge a reassigned job, and how throughput changes as workers increase.

The intended deliverable includes an API, independently scalable worker processes, transactional job claims, expiring leases with fencing tokens, heartbeat renewal, bounded retries and dead letters, tenant-scoped idempotency, operation history, metrics, container deployment, and repeatable load/failure experiments. Use PostgreSQL as the shared coordinator and state the resulting single-database availability limit. Do not describe the system as a consensus implementation or claim exactly-once side effects.

Completion requires real PostgreSQL concurrency tests, worker process termination/recovery, stale acknowledgement rejection, duplicate enqueue conflict tests, and measured throughput/latency with workload and hardware recorded. Documentation must separate implemented behavior, measured results, and future work. Large-scale design needs evidence about bottlenecks and limits; a high line count or unexecuted Kubernetes manifest does not prove scale.

The follow-up review found that [Poreia's provider](https://github.com/Benjaminnnnnn/poreia/blob/main/server/src/itinerary/provider.ts) already performs structured itinerary generation, Zod parsing, destination matching, and corrective regeneration. Its README describes a separate Gemini validator, but that second-model validator is not present in the inspected provider; the configured model is `openai`. The tree contains trip API integration tests, but no dedicated agent evaluation suite was found. Spotlight's inspected tree is mostly authentication, UI components, and generated Prisma code, with a starter README. Neither finding proves missing personal knowledge; it identifies weak public evidence.

For the current general-SWE target, Relay adds a distinct systems example. A second AI application would overlap the existing projects. The more useful next AI step is an evaluation suite around Poreia: fixed trip constraints, schema validity, budget/day consistency, geographic checks, destination preservation, provider timeouts, and recorded regressions. Do not describe the existing provider as a measured two-model agent system without further evidence.

## Portfolio direction

Lead with a small selection that demonstrates different kinds of work: Relay once verified, Splendor, AlgoExplorer, and systems coursework. Put supporting web apps in a compact archive. Add SimpleDB and the PetClinic DevOps extension with clear course/upstream attribution.

Use actual interface captures for product work and readable code-native diagrams for systems work. Each featured project should state what it does, one engineering decision, what was tested, and a direct source link. Remove unsupported scale metrics and vague claims about “taste,” “AI-era products,” and “dependable” behavior. Keep the CMU student context visible.

The current README credits the recovered visual shell to Haoqi Wen. Preserve that provenance while creating an original project presentation. Existing AI-generated conceptual images should remain labelled as illustrations, never as running-system evidence.
