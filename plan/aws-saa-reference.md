# AWS SAA-C03 — Exam Reference

> Research notes on the real AWS Certified Solutions Architect – Associate exam.
> This doc is **reference material** for authoring questions and setting scoring rules.
> Build/architecture decisions live in `00-build-plan.md` and `01-architecture.md`.
>
> **Target:** AWS Certified Solutions Architect – Associate · **Exam code:** SAA-C03 · **Last researched:** June 2026

---

## Exam identity and currency

| Field | Value | Source |
|-------|-------|--------|
| Certification | AWS Certified Solutions Architect – Associate | [AWS Certification page](https://aws.amazon.com/certification/certified-solutions-architect-associate/) |
| Exam code | **SAA-C03** (in effect since Aug 30, 2022) | [Official exam guide (PDF v1.1)](https://d1.awsstatic.com/training-and-certification/docs-sa-assoc/AWS-Certified-Solutions-Architect-Associate_Exam-Guide.pdf), [AWS docs](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html) |
| Still current in June 2026? | **Yes** — SAA-C03 is the live exam on the official AWS site | AWS official site (no SAA-C04 registration there yet) |
| Possible successor | Third-party sources mention **SAA-C04** and a possible **SAA-C03 retirement ~late Aug 2026** — **not confirmed on aws.amazon.com**. Verify before scheduling. | Third-party prep sites; treat as scheduling risk |
| Recommended experience | 1+ year hands-on designing AWS solutions | Official exam guide |
| Prerequisite | None (Cloud Practitioner recommended for beginners) | AWS FAQ |
| Cost | $150 USD | AWS official site |
| Validity | 3 years | AWS official site |
| Retake wait | 14 days after a failed attempt | AWS policies |
| Discount | 50% off next exam after earning any AWS certification | AWS FAQ |

> **Maintenance note:** if SAA-C04 launches, domain weights and in/out-of-scope services may change. Refresh the question bank when a new exam guide publishes.

---

## Exam format (what we imitate)

| Attribute | Detail |
|-----------|--------|
| Duration | **130 minutes** |
| Total questions | **65** |
| Scored questions | **50** |
| Unscored (pretest) | **15** — not labeled during the exam |
| Delivery | Pearson VUE test center or OnVUE online proctored |
| Question types | **Multiple choice** (1 correct of 4) and **multiple response** (2+ correct of 5+ options) |
| NOT on exam | True/false, fill-in-the-blank, drag-and-drop, labs |
| Style | Scenario-based — pick the **most appropriate** solution |
| Guessing | No penalty; unanswered = incorrect |
| Service names | English exam uses **short names**; full-name reference available via Help |

**Implications for our tool:**
- Build for **single-answer** and **multi-select** only (skip true/false to stay exam-faithful).
- Multi-select is **all-or-nothing** (no partial credit).
- No negative marking — never penalize guesses.

---

## Scoring and results

| Attribute | Detail |
|-----------|--------|
| Result type | Pass / Fail; scaled score 100–1000 reported |
| Passing score | **720** of 1000 (~**72%**) |
| Scoring model | **Compensatory** — pass the overall exam, not each domain |
| Domain feedback | Score report classifies performance per domain (approximate) |

**Implications for our tool:**
- Overall pass threshold = **72%**.
- Show a **per-section breakdown** and rank weak sections — exactly what the real score report is used for.

---

## Content domains (these are our "sections")

| # | Domain (section name) | Weight | Section key (in code) |
|---|------------------------|--------|------------------------|
| 1 | Design Secure Architectures | **30%** | `d1-secure` |
| 2 | Design Resilient Architectures | **26%** | `d2-resilient` |
| 3 | Design High-Performing Architectures | **24%** | `d3-high-performing` |
| 4 | Design Cost-Optimized Architectures | **20%** | `d4-cost-optimized` |

Overall Test draws questions across sections **by weight**. Section Review drills one section at a time.

### Domain 1 — Design Secure Architectures (30%)
- **1.1 Secure access:** IAM users/groups/roles/policies, least privilege, MFA, STS, cross-account, Organizations, SCPs, Control Tower, IAM Identity Center, resource policies, shared responsibility model.
- **1.2 Secure workloads/apps:** VPC (subnets, route tables, security groups, NACLs, NAT), public/private segmentation, Shield, WAF, Cognito, Secrets Manager, VPN, Direct Connect, GuardDuty, Macie; DDoS/SQL injection.
- **1.3 Data security controls:** Encryption at rest (KMS) / in transit (ACM/TLS), key rotation, cert renewal, classification, retention, backups/replication, compliance.

### Domain 2 — Design Resilient Architectures (26%)
- **2.1 Scalable / loosely coupled:** microservices, event-driven, multi-tier, stateless vs stateful, SQS/SNS/EventBridge/Step Functions, API Gateway, Auto Scaling, horizontal vs vertical, Lambda/Fargate/ECS/EKS, caching, CDN, read replicas, storage types.
- **2.2 Highly available / fault tolerant:** Multi-AZ, multi-Region, Route 53, DR strategies (backup & restore, pilot light, warm standby, active-active), RPO/RTO, failover, eliminating SPOFs, ELB, RDS Proxy, immutable infra, X-Ray, service quotas.

### Domain 3 — Design High-Performing Architectures (24%)
- **3.1 Storage:** S3, EBS (gp3, io2, st1, sc1), EFS, FSx; hybrid storage.
- **3.2 Compute:** EC2 families, Lambda memory, Batch, EMR, Fargate; Auto Scaling.
- **3.3 Database:** RDS vs Aurora vs DynamoDB vs Redshift vs ElastiCache vs DAX; read replicas, proxies, caching; read- vs write-heavy.
- **3.4 Network:** CloudFront, Global Accelerator, ALB/NLB/GLB; VPC topology; PrivateLink, VPN, Direct Connect.
- **3.5 Data ingestion/transformation:** Kinesis, Glue, Athena, Lake Formation, QuickSight, DataSync, Storage Gateway; data lakes, streaming, ETL, format conversion.

### Domain 4 — Design Cost-Optimized Architectures (20%)
- **4.1 Storage:** S3 storage classes, lifecycle, Intelligent-Tiering, Glacier; EBS types; transfer cost minimization; Cost Explorer, Budgets, CUR, allocation tags.
- **4.2 Compute:** On-Demand vs Reserved vs Savings Plans vs Spot; right-sizing, Graviton, Lambda/Fargate vs EC2; hibernation; prod vs non-prod tiers.
- **4.3 Database:** serverless vs provisioned; snapshot/backup frequency; engine/type selection for cost; read replicas + caching.
- **4.4 Network:** NAT strategies (shared vs per-AZ), VPC endpoints vs NAT, Direct Connect vs VPN vs internet, Transit Gateway vs peering, CloudFront/edge, cross-AZ/Region transfer costs.

---

## Well-Architected Framework alignment

The exam validates design against the WAF pillars:
1. Operational Excellence  2. Security  3. Reliability  4. Performance Efficiency  5. Cost Optimization  6. Sustainability

When two answers seem valid, prefer the option that is **more secure, more resilient, more managed, right-sized, and cost-effective** for the **stated** requirement — not over-engineered. Good guidance for writing plausible-but-wrong distractors.

---

## High-frequency comparison topics ("traps")

Great seeds for questions — each pairing is a classic single-best-answer scenario:

| Topic | Distinction to test |
|-------|---------------------|
| IAM | User vs role vs federated; when to use resource policies |
| Network | IGW vs NAT Gateway vs VPC endpoints (Gateway vs Interface) |
| DNS / routing | Route 53 policies (simple, weighted, latency, failover, geolocation) |
| HA vs read scaling | RDS Multi-AZ (HA) vs read replica (scale reads) |
| Caching / CDN | CloudFront vs Global Accelerator vs ElastiCache vs DAX |
| Messaging | SQS vs SNS vs EventBridge vs MQ |
| Storage | S3 vs EBS vs EFS vs FSx; storage class selection |
| Compute | EC2 vs Lambda vs Fargate vs Elastic Beanstalk |
| Database | RDS/Aurora vs DynamoDB vs Redshift — workload fit |
| Migration / transfer | Snow Family vs DataSync vs DMS vs Transfer Family |
| Hybrid | Direct Connect vs Site-to-Site VPN vs Client VPN |
| DR | Backup & restore vs pilot light vs warm standby vs active-active |
| Cost | Spot vs Reserved vs Savings Plans; NAT and data transfer costs |
| Security | Security group (stateful) vs NACL (stateless); Shield Standard vs Advanced |
| Load balancing | ALB (L7) vs NLB (L4) vs GLB |

---

## In-scope AWS services (representative)

From the official guide appendix — non-exhaustive, subject to change:

- **Analytics:** Athena, EMR, Glue, Kinesis, MSK, OpenSearch, QuickSight, Redshift, Lake Formation
- **Integration:** EventBridge, SNS, SQS, Step Functions, AppSync, AppFlow, MQ
- **Compute:** EC2, Auto Scaling, Lambda, Batch, Beanstalk, Outposts, Fargate
- **Containers:** ECS, EKS, ECR
- **Database:** RDS, Aurora, DynamoDB, ElastiCache, DocumentDB, Neptune, Keyspaces, Timestream for InfluxDB, MemoryDB, Redshift
- **Networking:** VPC, Route 53, CloudFront, Global Accelerator, Direct Connect, VPN, Transit Gateway, PrivateLink, ELB
- **Security:** IAM, IAM Identity Center, KMS, ACM, Secrets Manager, WAF, Shield, GuardDuty, Macie, Cognito, Organizations, Control Tower, Config, CloudTrail
- **Storage:** S3, EBS, EFS, FSx, Glacier, Storage Gateway, Backup
- **Migration:** DMS, Migration Hub, Application Migration Service, DataSync, Snow Family, Transfer Family
- **Management:** CloudFormation, CloudWatch, Systems Manager, Trusted Advisor, Well-Architected Tool, Cost Explorer, Budgets
- **ML (high level):** Comprehend, Rekognition, SageMaker (conceptual use cases only)

### Out-of-scope (examples)
- Deep CI/CD: CodeBuild, CodeDeploy, CodePipeline, CDK, Cloud9
- IoT: all services · Lightsail · Blockchain (Managed Blockchain) · Game tech (GameLift)
- Hobby/specialty ML devices: DeepRacer, DeepLens, etc.

---

## Exam-day strategy (useful for tool UX later)

| Strategy | Detail |
|----------|--------|
| Pacing | ~2 min/question (130 min / 65 Qs) |
| Flag & review | Real exam lets you mark questions — nice future feature |
| Read carefully | Watch keywords: "most cost-effective", "least operational overhead", "immediate failover", "lowest latency", "compliance" |
| Multi-select | Select **exactly** the stated number; all-or-nothing |
| Eliminate distractors | Remove clearly wrong options, compare the rest to the primary requirement |
| Domain order | Domains are **interleaved**, not in four blocks |

---

## Question bank targets (for content authoring)

| Pool | Target size | Rationale |
|------|-------------|-----------|
| Per section | 40–60 | Variety without repetition |
| Overall pool | 130+ unique | ~2× a full exam for rotation |
| Multi-select share | ~15–20% | Mirrors ~10–15 of 65 on the real exam |

> Start far smaller (5–10 in one section for the MVP). These are the *eventual* targets.

---

## Weakness detection (scoring logic for Overall Test)

1. Overall % → **Likely PASS** (≥72%) or **Likely FAIL** (<72%).
2. Compute per-section % correct.
3. Flag a section if it is below **70%**, or more than **10 points below** the personal average across sections.
4. Sort flagged sections lowest-first → "Review these next."
5. Persist the attempt and update `summary.json`.

---

## Official resources

| Resource | Link |
|----------|------|
| Exam guide (web) | https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html |
| Exam guide (PDF) | https://d1.awsstatic.com/training-and-certification/docs-sa-assoc/AWS-Certified-Solutions-Architect-Associate_Exam-Guide.pdf |
| Certification page | https://aws.amazon.com/certification/certified-solutions-architect-associate/ |
| Skill Builder prep / practice | Linked from the certification page (some paid) |

---

*Verify exam code, retirement dates, and domain weights on the official AWS site before scheduling the real exam. Third-party blogs may mention SAA-C04 / retirement timelines not yet reflected on aws.amazon.com.*
