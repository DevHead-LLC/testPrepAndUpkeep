# Tracker — Test Prep & Upkeep

> Single source of truth for **where we are, what's next, and what went wrong**.
> The agent maintains this file. Read it first at the start of any session.

---

## How this tracker is managed (rules for the agent)

These rules keep the file useful and small. The agent follows them every time it touches this file.

1. **Prune the done.** Completed granular steps are deleted, not accumulated. Only a short, rolled-up summary of each finished phase survives under "Completed (summary)".
2. **Keep what matters.** Never delete: project rules, locked decisions, open problems, and the current/next focus.
3. **One active focus.** "Now" holds the single thing in progress. "Next" is a short ordered list. Don't let either sprawl.
4. **Log problems when they happen** under "Problems & risks", with status (OPEN / RESOLVED). Resolved items get a one-line resolution and are deleted once no longer instructive.
5. **Log decisions** that change direction (e.g. React, localStorage) under "Decisions" as one-liners. Detailed rationale lives in `plan/`, not here.
6. **Capture user notes** verbatim-ish under "User notes / feedback" and convert them into Next items or Decisions, then trim.
7. **Stay terse.** Bullets over paragraphs. If a section grows past ~15 lines, summarize it.
8. **Plan docs are stable; this file is live.** Architecture/how-it's-built goes in `plan/`. Status/progress/problems go here.

---

## Project rules (do not drop)

- **Do NOT run or stop the user's server/client.** The user runs `npm run dev` (and starts/stops anything) manually. The agent may `npm install`, `npm run build`, and `npm run lint`, but never starts the dev server.
- **Keep it SUPER simple first**, then improve piece by piece.
- **JavaScript/React first**; Dart/Flutter added later (DSA track).
- **Finish AWS track before starting DSA.**
- **No database**; persistence via browser `localStorage`. A `server/` is added only if truly needed.
- Agent should act as the professional: make sensible default decisions, correct the user when warranted, implement feedback where it makes sense.
- **`user-suggestions.md` workflow:** when the user drops images referencing that file with no other context, transcribe each question + options into it verbatim (no answers/commentary). It holds future-facing items only; remove items once implemented. Full rules live in that file.

---

## Decisions (locked)

- **DSA Patterns:** fourth header tab; 47 single-answer questions in `patterns.data.js`, four choices each; attempts stored under `tpu:dsa-patterns:attempts`.

- **UI = React (Vite)**, JS/JSX, in `client/`.
- **Persistence = localStorage** (`tpu:aws-saa:attempts`). Summary stats derived on read, not stored.
- **Backend deferred** to a future `server/` dir; not built yet.
- **Two tracks:** `aws-saa` and `dsa`, switchable via header tabs. AWS sections = 4 SAA-C03 domains.
- **AWS grading:** by option id (sets); multi-select all-or-nothing; Overall Test pass threshold 72%; Section Review mastery target 75%.
- **AWS Section Review is topic-based + nested** (Stephane Maarek course taxonomy in `content/aws-saa/topics.js`): review a whole domain, a course section, or a single sub-topic. Each review target has its own Latest/Best/#taken. Overall Test still uses the 4 exam domains for weighting. Attempts carry a `reviewId` (domain key, `sec:<id>`, or `sub:<id>`).
- **Study workflow:** drill each sub-topic to ≥75% → take the full course section to ≥75% → Overall Test to ≥75% → real exam.
- **DSA grading:** user writes JS in an in-app editor; code runs in a **Web Worker** (sandboxed, killable on infinite loops via timeout) against `tests`; any implementation returning expected outputs passes. The combined bank exports from `content/dsa/problems.js`; additions live in `expansion.data.js`, with guides in `expansion-tips.data.js`. Two `kind`s: `"function"` (define `fnName`; tests `{input,expected}`) and `"design"` (define a class `className`; tests `{ops,args,expected}`, LeetCode-style) for data-structure implementation problems.
- **Three tabs:** AWS SAA · DSA · Real World. DSA and Real World share one generic engine (`tracks/CodeTrack.jsx` + `components/code/CodeHome.jsx` + `CodeSolve.jsx`), parameterized by `trackKey`, content, and intro. Each code track stores attempts under its own `tpu:<track>:attempts` key.
- **AI Red Team** lives under Real World (`topic: "AI Red Team"`, `mode: "redteam"`). Starter = a model's shipped attempt; hidden tests catch the production miss. Content in `content/realworld/redteam.data.js`, analysis tips in `content/realworld/tips.js`. IDs `rw-rt-*` are permanent.
- **Storage keys** namespaced per track: `tpu:<track>:attempts`.
- **Question/problem IDs are permanent** once created.

---

## Stages

| Phase | Scope | State |
|-------|-------|-------|
| 0 — Scaffold | Vite React app | ✅ done |
| 1 — AWS MVP | 1 section, quiz, score, localStorage | ✅ done |
| 2 — AWS full quiz | Domains 2–4, multi-select content, full mock | ✅ done |
| 3 — AWS polish | validator, history view, count/full-length mock | ✅ done (timer deferred) |
| 4 — DSA MVP | JS problem + test-based grading | ✅ done |
| 5 — DSA expansion | more problems, hidden tests, timing | ✅ done |
| 6 — Dart/Flutter | Dart runner; (optional) widget exercises | ⏸ deferred (no SDK; browser can't run Dart) |
| 7 — Backend | optional `server/` for file persistence | ◻ maybe |

---

- **Course-section build progress: Sections 4–30 done** (…DR & Migrations, More Solution Architectures, Other Services). Bank **453**, domains d1 136 / d2 139 / d3 122 / d4 56.
- **Balance note:** d1/d2 even (~137); d3 122; d4 56 smallest but climbing via cost-angled questions. Overall test samples by exam weight so size gap is fine.

## Now

- **Code list UX:** difficulty filter persists per track in localStorage; Cmd/Ctrl-click or middle-click opens a challenge in a new window via hash routes (`#dsa/id`); list window refreshes solved stats on focus/storage. User should click through.

## Next (ordered)

1. **User tests AI Red Team** on Real World (run model starter first, then fix; check banners, hidden tests, tips).
1. **User tests new DSA coding exercises**, especially list/tree inputs, examples, hints, and Run tests.
2. **User tests DSA Patterns → Trigger Practice** and sends any wording/choice refinements.
2. **User tests** Section 30 sub-topics + the renamed/renumbered modules.
2. **Continue course sections one at a time** (user sends video headings). Remaining: exam-prep / white-paper / well-architected sections if any.

- **Module rename (done):** "By course section" → "By study module"; the 27 modules are renumbered **Module 1–27** with our own wording (no course attribution), matching review content. Internal IDs/subtopics unchanged (data + stats intact). Updated `topics.js` (names + header comment), `SectionReview.jsx` (label + intro), `AwsTrack.jsx` comment, and README. Validate + build + lint clean.
3. **Note:** d2-resilient now has 71 questions — consider re-homing some networking/DNS items to other domains later for overall-test balance (functionally fine as-is; overall test samples by domain weight).
3. Optional polish: DSA/Real World reference-solution validators · syntax-highlighting editor.
4. **Dart/Flutter when the Dart SDK is installed** — needs a CLI companion runner or a server; can't run in-browser.

## Backlog / queued

- **`user-suggestions.md`** is empty (the 35 queued questions were implemented 2026-06-22). It stays as the intake queue for future image drops.
- **Phase 6 (Dart/Flutter)** deferred until the Dart SDK is installed; will need a CLI companion runner or a local server (browser can't execute Dart).

---

## Completed (summary)

- **AI Red Team (Real World):** 10 review-and-fix drills under a new topic; model starters pass the samples they optimized for and fail hidden production cases; reference fixes + tips; home/solve framing; `npm run validate` and `npm run test:rw`.

- **Editor polish:** 10-step undo/redo, literal bracket typing within strings, smart indentation, run-tests shortcut, shortcut help, and targeted history/typing regression checks. Shared by DSA and Real World.

- **DSA 32-pattern coding coverage:** 17 added exercises → 47 total with local content, tips, examples, hidden cases, node adapters, flexible output grading, and automated reference/runner checks. Mapping documented in `plan/dsa-pattern-coverage.md`.

- **DSA quizzes:** original 32 problem-to-pattern questions plus 96 trigger/scenario variations using the same 32 answers. Four choices, explanations, shuffled 32-question rounds, separate browser progress, and content/round validation.

- **Phase 0 — Scaffold:** Vite React app in `client/` (React 19, Vite 8). Folder structure (`content/`, `engine/`, `components/`), dark AWS-themed styling, `.gitignore`.
- **Phase 1 — AWS MVP:**
  - Content: Domain 1 (`d1-secure`) with 8 single-answer questions + explanations; Domains 2–4 are empty placeholders.
  - Engine: `select.js` (shuffle + weighted pick), `score.js` (grading, %, per-section, weak sections, 72% pass), `storage.js` (localStorage + derived summary).
  - UI: Home (Overall Test + Section Review cards + progress stats + clear), Quiz (one-at-a-time, progress bar), Results (score ring, pass/fail, per-section bars, weak-section list, full answer review with explanations).
  - Verified with `npm run build` and `npm run lint` (both clean). App not run by agent per project rules.
- **Phase 1 refinement — progress stats:** totals split into Overall mocks vs Section reviews; overall panel shows latest + best; each section card shows its own latest + best + attempts (`summarize()` groups section-review attempts per section).
- **Phase 2 — full quiz content:** Domains 2–4 authored, 8 questions each with explanations; one multi-select (all-or-nothing) question per domain (D2/D3/D4). Question bank now 32 across 4 sections; Overall Test draws all four by weight. Build + lint clean.
- **Phase 3 — AWS polish:** `scripts/validate-content.mjs` + `npm run validate` (shape/id/correctness checks; passes for all 32). Overall Test length chooser (10/20/Full). "Recent attempts" history list (last 8) on Home with date, label, score, pass/fail color. README documents `validate`. Timer deferred as optional.
- **Phase 4 — DSA MVP:** App restructured into a shell (`App.jsx`) with track tabs + per-track orchestrators (`tracks/AwsTrack.jsx`, `tracks/DsaTrack.jsx`). `storage.js` generalized to `loadAttempts/saveAttempt/clearAttempts(track, …)`. DSA: `content/dsa/problems.js`, `engine/dsa/runner.js` + `worker.js` (Web Worker, 3s timeout, deepEqual), `components/dsa/DsaHome.jsx` + `Solve.jsx` (textarea editor, run, per-test results, solved tracking). CSS for tabs/editor/test rows.
- **Phase 5 — DSA expansion:** 6 more problems (Contains Duplicate, Valid Anagram, Valid Palindrome, Valid Parentheses, Single Number, Majority Element) → 10 total across 7 topics. Per-test `hidden` flag (redacted as "Hidden test" in UI, still graded). Solve time shown on run; DsaHome cards show best solve time + attempt count.
- **DSA editor UX (in `Solve.jsx` keydown handler):** auto-close brackets `()[]{}` and quotes (wraps a selection), Tab / Shift+Tab indent-outdent (2 spaces, multi-line aware) instead of leaving the field, Enter between a bracket pair expands to an indented empty line, type-over closing bracket/quote, and Backspace deletes an empty pair. No new deps.
- **AWS bank expansion (from user-suggestions):** added 35 questions across domains → 67 total. Includes IAM fundamentals, EC2 purchasing/instance types, placement groups, ENI/Elastic IP, EBS/EFS/storage, plus true/false and "EXCEPT" formats. Correct answers + explanations authored; `user-suggestions.md` emptied.
- **Real-exam alignment:** Overall Test = 65-question Full exam option, **timed** at 120 s/question (`SECONDS_PER_QUESTION` in `AwsTrack.jsx`; quiz carries `timeLimitSec`). Timer in `Quiz.jsx` (counts down, red < 5 min, auto-submits at 0) — overall only, never section reviews. Fixed `pickOverall` to cap to exactly `n` (rounded section targets summed to >n). Bank grown to **82** (d1:24, d2:20, d3:20, d4:18) with practical scenario questions (ACM, GuardDuty, Macie, Cognito; SQS FIFO, target tracking, S3→Lambda, NAT per-AZ, queue-depth scaling, API GW+Lambda, Global Tables, Aurora; Standard-IA, Compute Savings Plans, CloudFront).
- **DSA expansion (10 → 25 problems):** added Fibonacci, Climbing Stairs, House Robber, Coin Change, Word Break (Dynamic Programming); Palindrome Number (Math); Missing Number, Best Time to Buy/Sell, Move Zeroes, Product Except Self (Arrays); Binary Search; Two Sum II (Two Pointers); Longest Substring (Sliding Window); Number of Islands (Graphs); Trapping Rain Water (Two Pointers). Easy→medium→hard ramp; manually verified expected values incl. hidden tests. `DsaHome.jsx` gained a difficulty filter + difficulty-sorted display + color-coded `.diff` tags.
- **DSA design problems (25 → 30) + engine support:** added `kind: "design"` path to `worker.js`/`runner.js` (instantiate class, replay op sequence, compare outputs); shows "Define a class named X". Added Min Stack, Implement Queue using Stacks, Design HashMap, Implement Trie, LRU Cache. Verified via reference solutions. Tab relabeled "DSA".
- **Real World track (3rd tab):** generalized code engine into `tracks/CodeTrack.jsx` + `components/code/CodeHome.jsx` + `CodeSolve.jsx` (props: trackKey/title/intro/problems/topics); App renders AwsTrack + two CodeTracks; removed old `components/dsa/*` and `tracks/DsaTrack.jsx`. New `content/realworld/problems.js` with 13 problems (Merge Meeting Times, Can Attend All Meetings, Parse Query String, Parse CSV Row, Paginate, Totals by Category, Dedupe, Summarize Ranges, Validate IPv4, Exponential Backoff, Rate Limiter, Shopping Cart, Leaderboard). Verified via reference solutions.
- **Topic-based Section Review + IAM content:** `content/aws-saa/topics.js` (course sections → sub-topics, reviewId helpers); `components/SectionReview.jsx` (nested domain → section → sub-topic, per-target Latest/Best/#taken, 75% target); `AwsTrack` `startReview(reviewId)`; `score.js` adds `reviewId`+`target` (75% reviews / 72% overall); `Results` shows target met/below for reviews; `Quiz` titles reviews; `storage.summarize` counts reviews; validator checks subtopic ids. IAM & AWS CLI section authored (4 sub-topics × 5). Old 4-domain card grid removed.
- **Collapsible Section Review:** course sections collapse with chevron headers for easy navigation.
- **Section Review two-group restructure + Section 5 (EC2):** `topics.js` course sections decoupled from domains (a section can span domains); `SectionReview.jsx` renders "By exam domain" (domain rows) + "By course section" (collapsible). Added Section 5 EC2 Fundamentals (6 sub-topics × 5). Re-tagged existing EC2 questions (SG, instance types, purchasing, spot, user data, instance role) and added 17 new (d1 +7, d3 +6, d4 +4). Bank 110.
- **Section 6 (EC2 — SAA Level):** course section with 4 sub-topics × 5 — Private/Public/Elastic IP, Placement Groups (Cluster/Spread/Partition), ENI, Hibernate. Re-tagged existing (Elastic IP d2-010, placement d2-011/d3-012, ENI d2-012, Hibernate d4-015) + 15 new (d2 +8 ip/eni, d3 +3 placement, d4 +4 hibernate). Bank 125.
- **Section 7 (EC2 Instance Storage):** 5 sub-topics — EBS Basics & Volume Types (6), EBS Snapshots & Encryption, AMI, Instance Store, EFS. Re-tagged existing d3 storage (d3-001/004/013/014/015/016/017/018/019/020) + d1-020 (encryption); added 15 new (d3 +13, d1 +2). Bank 140.
- **Section 8 (HA — ELB & ASG):** 3 sub-topics × 5 — Load Balancer Types (ALB L7 / NLB L4 / GWLB), Load Balancer Features (sticky, cross-zone, connection draining, health checks, SSL+SNI), Auto Scaling Groups. Re-tagged d2-002/007/014 (asg) + 12 new (d2 +11, d1 +1 for SSL/SNI). Bank 152.
- **Section 9 (RDS, Aurora & ElastiCache):** 4 sub-topics × 5 — RDS Basics & Read Replicas vs Multi-AZ, Aurora (overview/6-way storage/reader endpoint/Global DB), RDS Backups/Security/Proxy (encryption, IAM auth, private+SG, RDS Proxy, backups vs snapshots), ElastiCache (Redis vs Memcached, caching, session store). Re-tagged d2-003/020, d3-002/005/007 + 15 new (d3 +7, d2 +5, d1 +3). Bank 167.
- **Section 10 (Route 53):** 4 sub-topics — DNS & Route 53 Basics (DNS, R53, A record, TTL, CNAME vs Alias), Routing Policies (simple/weighted/latency/failover/geolocation/multivalue), Health Checks (types, failover integration, CloudWatch for private), Resolver & Hybrid DNS (resolver, inbound/outbound endpoints). Re-tagged d2-008 + 17 new (d2 +16, d3 +1 latency). Bank 184.
- **Section 11 (Classic Solutions Architectures):** 2 sub-topics × 5 — Web App Architecture Patterns (stateless ALB+ASG multi-AZ, session store, shared EFS, golden AMI, RDS snapshot restore) and Elastic Beanstalk (what/control/cost/use case/platforms). 10 new (d2 +7, d3 +2, d4 +1); no re-tagging. Bank 194.
- **Section 12 (Amazon S3 Introduction):** 5 sub-topics — S3 Basics & Static Websites (d3), S3 Security & Bucket Policies (d1: bucket policy, Block Public Access, cross-account, VPC endpoint), S3 Versioning (d1: delete markers, suspend), S3 Replication (d2: CRR/SRR, versioning prereq, batch for existing), S3 Storage Classes (d4: classes overview, One Zone-IA, Glacier Deep Archive + re-tagged Intelligent-Tiering/Standard-IA). 19 new (d3 +5, d1 +7, d2 +4, d4 +3). Bank 213.
- **Section 13 (Advanced Amazon S3):** 3 sub-topics — Lifecycle Rules & Analytics (d4: lifecycle, noncurrent expiry, S3 Analytics, Intelligent-Tiering vs lifecycle + re-tagged d4-001), Event Notifications & Performance (d2 events: destinations, prefix/suffix filters + re-tagged d2-015; d3 perf: multipart/Transfer Acceleration, prefixes), Requester Pays/Batch Ops/Storage Lens (d4). 12 new (d4 +8, d2 +2, d3 +2). Bank 225.
- **Section 14 (Amazon S3 Security):** 3 sub-topics × 5 (course section id `s3-sec` to avoid clashing with the `s3-security` subtopic in Section 12) — S3 Encryption (SSE-S3/KMS/SSE-C, default encryption, aws:SecureTransport), Access & Sharing (pre-signed URLs, CORS, Access Points, Object Lambda), Data Protection (Object Lock + modes, MFA Delete, Glacier Vault Lock, access logs). Re-tagged d1-002 + 14 new (all d1). Bank 239. (d1 now 69 — helps domain balance.)
- **Section 15 (CloudFront & Global Accelerator):** 2 sub-topics — CloudFront (6: overview, cache invalidation, geo restriction, OAC + re-tagged d3-003/d4-018) and Global Accelerator (5: overview, use case vs CloudFront, anycast IPs, backbone routing + re-tagged d3-006). 8 new (d3 +6, d1 +2). Bank 247.
- **Section 16 (AWS Storage Extras):** 3 sub-topics × 5 — Snow Family (d4: overview, Snowball use case, Snowmobile, into-Glacier, edge compute), Amazon FSx (d3: overview, Windows File Server, Lustre, EFS vs FSx), Storage Gateway/DataSync/Transfer Family (d4: gateway/datasync/transfer; d3: Snowball-vs-DataSync, S3 File Gateway). 15 new (d4 +8, d3 +7); no re-tagging. Bank 262.
- **Section 17 (Decoupling — SQS/SNS/Kinesis/MQ):** 4 sub-topics — SQS (visibility timeout, long polling + re-tagged d2-001/013/017), SNS & Fan-Out (pub/sub, subscribers, vs SQS + re-tagged d2-004), Kinesis (Data Streams/Firehose/diff/use case + re-tagged d3-008), Choosing (SQS/SNS/Kinesis mapping, MQ, Firehose-vs-Streams, replay). Re-tagged 5 + 14 new (d2 +10, d3 +4). Bank 276.
- **Section 18 (Containers — ECS/Fargate/ECR/EKS):** 2 sub-topics × 5 — Docker/ECS/Fargate (Docker, ECS, EC2 vs Fargate launch type, Fargate serverless [d4], ECS auto scaling + ALB [d3]) and ECR/EKS (ECR registry, EKS, ECS vs EKS, Fargate for both, ECR pull workflow). 10 new (d2 +8, d4 +1, d3 +1); no re-tagging. Bank 286.
- **Section 19 (Serverless):** 5 sub-topics × 5 — Lambda Basics (serverless, Lambda, triggers, use case + pricing[d4]), Lambda Advanced (limits/concurrency/SnapStart/Edge [d3] + Lambda-in-VPC [d2]), DynamoDB (what/use/DAX [d3] + re-tagged Global Tables d2-019 & on-demand d4-006), API Gateway (what/features/Step? + re-tagged d2-018; auth [d1]; caching [d3]), Step Functions & Cognito (Step Functions [d2] + Cognito user/identity pools [d1] + re-tagged d1-024). Re-tagged 4 + 21 new (d2 +9, d3 +8, d4 +1, d1 +3). Bank 307.
- **Section 20 (Serverless Architectures):** 2 sub-topics × 3 — Serverless App & Web Patterns (mobile serverless stack, serverless website, Cognito credentials [d1]) and Microservices & Content Distribution (decoupling, benefits, S3+CloudFront distribution [d3]). 6 new (d2 +4, d1 +1, d3 +1); no re-tagging. Bank 313.
- **Section 21 (Databases in AWS):** 2 sub-topics × 5 (all d3) — Choosing the Right Database (relational/OLTP, NoSQL key-value, OLAP/Redshift, in-memory cache, purpose-built principle) and Purpose-Built DBs (DocumentDB/Mongo, Neptune/graph, Keyspaces/Cassandra, Timestream/time-series, QLDB/ledger). 10 new; no re-tagging. Bank 323.
- **Section 22 (Data & Analytics):** 3 sub-topics — Query & BI (Athena, Redshift, Athena-vs-Redshift, QuickSight, OpenSearch), ETL & Data Lakes (Glue, Glue Data Catalog, Lake Formation, EMR, S3 data lake), Streaming Analytics & Pipelines (MSK, MSK-vs-Kinesis, Managed Flink, end-to-end big-data pipeline). 14 new (d3 +10, d2 +4); no re-tagging. Bank 337.
- **Section 23 (Machine Learning):** 1 sub-topic (light, recognition) — AI/ML Services: Rekognition, Transcribe, Polly, Translate, Comprehend, Lex, SageMaker, Textract. 8 new (d3); no re-tagging. ML mostly out-of-scope for SAA-C03. Bank 345.
- **Section 24 (Monitoring & Audit):** 3 sub-topics — CloudWatch (metrics, logs, agent for mem/disk, alarms, Logs Insights [d2]), EventBridge (what/event-pattern rules/scheduled cron [d2]), CloudTrail & Config (CloudTrail API audit, Config compliance+history, the classic CloudTrail-vs-CloudWatch-vs-Config distinction [d1]). 13 new (d2 +8, d1 +5); no re-tagging. Bank 358.
- **Section 25 (IAM Advanced):** 3 sub-topics × 5 (all d1) — AWS Organizations (what/OUs+SCPs/consolidated billing/tag policies + re-tagged d1-007), Advanced IAM Policies (identity vs resource-based, cross-account [re-tagged d1-004], evaluation logic, permissions boundary), Identity Center/Directory Service/Control Tower (Identity Center, Managed AD, Control Tower, federation, CT vs Orgs). Re-tagged 2 + 13 new. Bank 371.
- **Section 26 (Security & Encryption):** 4 sub-topics × 5 (all d1) — Encryption & KMS (at-rest vs in-transit, KMS, CMK vs AWS-managed, multi-Region keys, CloudHSM), Secrets & Certificates (Parameter Store, Secrets-vs-Parameter-Store, ACM + re-tagged d1-005/d1-021), Network Protection (Shield Std/Adv, Firewall Manager, DDoS best practices, WAF-vs-Shield + re-tagged WAF d1-006), Threat Detection (Inspector, GuardDuty/Macie/Inspector matching, Security Hub + re-tagged GuardDuty d1-022/Macie d1-023). Re-tagged 5 + 15 new. Bank 386.
- **Section 27 (Networking - VPC):** 6 sub-topics — VPC Fundamentals (5+1 d4), Routing & Gateways (re-tag d1-003 + 5), NACLs & SGs (re-tag d1-008 + 4), VPC Connectivity (3 d1 + Transit Gateway d3 + endpoint-cost d4), Hybrid Networking (3 d1 + DX-perf d3 + VPN-vs-DX cost d4), VPC Monitoring (4 d1: Flow Logs, troubleshooting, Traffic Mirroring, Network Firewall). Re-tagged 2 (d1-003 routing, d1-008 nacl-sg) + 29 new (24 d1 / 2 d3 / 3 d4). Bank 415.
- **Section 28 (DR & Migrations):** 4 sub-topics — DR Strategies (re-tag d2-005 + RTO/RPO, 4-strategy order, Backup&Restore, DRS), Migration Services (DMS, SCT, MGN, RDS/Aurora migration, CDC), On-Premises & Hybrid (Outposts, VMware Cloud, Migration Hub, App Discovery Service), Backup & Data Transfer (AWS Backup, cross-Region/account+Vault Lock, DataSync, DataSync-perf d3, Snow offline d4). Re-tagged 1 + 18 new (16 d2 / 1 d3 / 1 d4). Bank 433.
- **Section 29 (More Solution Architectures):** 2 sub-topics — Architecture Patterns (blocking IP layers d1, event processing S3→SQS+DLQ d2, caching layers d3), HPC & EC2 HA (ASG self-heal d2, cluster placement + EFA d3, FSx Lustre d3). 6 new (1 d1 / 2 d2 / 3 d3). Bank 439.
- **Section 30 (Other Services):** 4 sub-topics — IaC & Deployment (CFN what/benefit, service role, Amplify), Messaging & Engagement (SES, Pinpoint, AppFlow), Operations & Management (SSM Session Manager + Run Command/Patch, AWS Batch, Instance Scheduler), Cost Management (Cost Explorer, Cost Anomaly Detection, CE/Anomaly/Budgets matching). Outposts skipped (in Sec 28). 14 new (3 d1 / 5 d2 / 2 d3 / 4 d4). Bank 453.

---

## Problems & risks

- **OPEN:** Git status could not run because the local Xcode license has not been accepted.
- **OPEN (low):** Production build passes with a bundle-size warning (>500 kB).
- Risk (low): SAA-C03 may retire ~late 2026 (unconfirmed on AWS). If SAA-C04 lands, refresh content. Tracked in `plan/aws-saa-reference.md`.

---

## User notes / feedback

- Prep for DataAnnotation Software Engineer: vibe-code review, rate model reasoning, red-team unsafe code / faked test passes / confidently wrong solutions. Added as Real World → AI Red Team (not a fifth tab).
