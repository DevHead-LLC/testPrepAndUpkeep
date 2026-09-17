// Domain 4 — Design Cost-Optimized Architectures (20%)
// Question shape is documented in plan/01-architecture.md.
// `correct` is ALWAYS an array of option ids (one or more for multi-select).
// Independently authored educational practice content based on publicly documented AWS concepts.
export const questions = [
  {
    id: "saa-d4-001",
    section: "d4-cost-optimized",
    subtopic: "s3-lifecycle",
    type: "single",
    prompt:
      "An organization keeps application logs in Amazon S3. Analysts query them heavily during the first month, occasionally during the following quarter, and then almost never touch them—yet regulations require seven years of retention. Which design minimizes storage spend while meeting retention?",
    options: [
      { id: "a", text: "Leave every object in S3 Standard for the full seven-year period" },
      { id: "b", text: "Configure S3 Lifecycle rules to move objects to Standard-IA, then to Glacier or Glacier Deep Archive as they age" },
      { id: "c", text: "Purge log objects once the first 30 days pass" },
      { id: "d", text: "Archive the logs on a high-capacity Amazon EBS volume" },
    ],
    correct: ["b"],
    explanation:
      "Lifecycle automation aligns price with how often data is read: hot logs stay in cheaper-than-Standard tiers only when access drops, and Glacier classes cover long-term archive. All-Standard storage overpays for cold data; early deletion breaks compliance; EBS is a poor fit for cheap, durable archival.",
    difficulty: "medium",
    services: ["s3","s3-glacier"],
  },
  {
    id: "saa-d4-002",
    section: "d4-cost-optimized",
    type: "single",
    prompt:
      "Engineers run a nightly batch pipeline that resizes images. The job tolerates interruptions, can checkpoint progress, and does not need a fixed finish time. Which EC2 purchase option should they pick to minimize spend?",
    options: [
      { id: "a", text: "On-Demand Instances with no upfront commitment" },
      { id: "b", text: "Spot Instances using spare EC2 capacity at steep discounts" },
      { id: "c", text: "Reserved Instances for 1- or 3-year capacity commitments" },
      { id: "d", text: "Dedicated Hosts for physical-server isolation and license control" },
    ],
    correct: ["b"],
    explanation:
      "Spot capacity is deeply discounted and fits workloads that can survive reclaim events. On-Demand costs more for the same compute; Reserved commitments reward steady 24/7 usage, not bursty batch; Dedicated Hosts address licensing isolation, not batch cost reduction.",
    difficulty: "easy",
    services: ["ec2","spot"],
  },
  {
    id: "saa-d4-003",
    section: "d4-cost-optimized",
    type: "single",
    prompt:
      "The workload is stable and expected to run continuously for three years. Which pricing models reduce cost in exchange for a long-term usage commitment?",
    options: [
      { id: "a", text: "Spot Instances using spare EC2 capacity at steep discounts" },
      { id: "b", text: "On-Demand Instances with no upfront commitment" },
      { id: "c", text: "Savings Plans or Reserved Instances" },
      { id: "d", text: "Dedicated Hosts on On-Demand pricing" },
    ],
    correct: ["c"],
    explanation:
      "Savings Plans and Reserved Instances both discount compute in return for a one- or three-year commitment. Exact maximum savings vary by plan or RI type; AWS generally recommends Savings Plans for most customers because of greater flexibility. Spot is interruptible; On-Demand and On-Demand Dedicated Hosts leave money on the table for predictable, continuous production.",
    difficulty: "easy",
    services: ["ec2","savings-plans"],
  },
  {
    id: "saa-d4-004",
    section: "d4-cost-optimized",
    subtopic: "s3-storage-classes",
    type: "single",
    prompt:
      "Objects land in S3 with access patterns that shift over time and cannot be forecast up front. The team wants AWS to optimize storage cost automatically, without slowing retrievals or charging extra when objects move between internal tiers. Which storage class fits?",
    options: [
      { id: "a", text: "S3 Standard for frequently accessed objects" },
      { id: "b", text: "S3 Intelligent-Tiering auto-shifting objects by access patterns" },
      { id: "c", text: "S3 One Zone-IA for infrequent access stored in a single AZ" },
      { id: "d", text: "S3 Glacier Deep Archive for lowest-cost long-term retention" },
    ],
    correct: ["b"],
    explanation:
      "Intelligent-Tiering monitors access and shifts objects among performance tiers without retrieval fees for those transitions—ideal when usage is unknown. Standard costs more for data that goes cold; One Zone-IA sacrifices durability; Deep Archive is for retrieval measured in hours, not dynamic hot/cold mixes.",
    difficulty: "medium",
    services: ["s3"],
  },
  {
    id: "saa-d4-005",
    section: "d4-cost-optimized",
    type: "single",
    prompt:
      "Private-subnet EC2 instances download large datasets from Amazon S3 via a NAT gateway, and NAT processing fees dominate the bill. What architectural tweak cuts that expense?",
    options: [
      { id: "a", text: "Deploy an additional NAT gateway for redundancy" },
      { id: "b", text: "Add an S3 gateway VPC endpoint so S3 traffic stays on the AWS network and skips the NAT gateway" },
      { id: "c", text: "Relocate instances to public subnets and assign public IP addresses" },
      { id: "d", text: "Turn on S3 Transfer Acceleration for all downloads" },
    ],
    correct: ["b"],
    explanation:
      "Gateway endpoints for S3 route traffic privately inside AWS without NAT per-GB processing charges for that path. More NAT gateways add cost; exposing instances publicly weakens security posture; Transfer Acceleration optimizes distance/latency for uploads, not NAT avoidance.",
    difficulty: "medium",
    services: ["vpc-endpoints","s3","nat-gateway"],
  },
  {
    id: "saa-d4-006",
    section: "d4-cost-optimized",
    subtopic: "dynamodb",
    type: "single",
    prompt:
      "A DynamoDB-backed API sees long quiet periods and occasional massive spikes. Operators want to stop paying for unused provisioned throughput yet still handle peaks without throttling. Which capacity setting is the best economic match?",
    options: [
      { id: "a", text: "Provisioned capacity provisioned for peak traffic" },
      { id: "b", text: "DynamoDB on-demand capacity billed per request" },
      { id: "c", text: "Provisioned capacity provisioned for average traffic" },
      { id: "d", text: "Switch to a larger database instance class" },
    ],
    correct: ["b"],
    explanation:
      "On-demand billing scales with actual requests, so idle time is not prepaid and bursts scale automatically. Peak-sized provisioned capacity wastes money off-peak; average-sized provisioned capacity throttles during spikes; DynamoDB is serverless—there is no instance class knob.",
    difficulty: "medium",
    services: ["dynamodb"],
  },
  {
    id: "saa-d4-007",
    section: "d4-cost-optimized",
    type: "multi",
    prompt:
      "A fleet of EC2 instances runs around the clock but CloudWatch shows sustained low CPU and memory use. Which TWO changes will directly lower monthly spend? (Select TWO.)",
    options: [
      { id: "a", text: "Downsize instance types after reviewing utilization metrics" },
      { id: "b", text: "Buy a Compute Savings Plan covering the steady baseline hours" },
      { id: "c", text: "Provision larger EBS volumes on each host" },
      { id: "d", text: "Associate an Elastic IP with every instance" },
      { id: "e", text: "Enable detailed monitoring on all instances" },
    ],
    correct: ["a","b"],
    explanation:
      "Right-sizing removes paid-for idle CPU/RAM, and a Savings Plan discounts the predictable portion of compute. Bigger disks, idle Elastic IPs, and detailed monitoring line items increase cost—they do not shrink the bill.",
    difficulty: "medium",
    services: ["ec2","savings-plans","compute-optimizer"],
  },
  {
    id: "saa-d4-008",
    section: "d4-cost-optimized",
    type: "single",
    prompt:
      "Finance needs per-project cost visibility across many linked accounts and email when projected monthly AWS charges will cross a set limit. Which toolset addresses both needs?",
    options: [
      { id: "a", text: "Cost allocation tags combined with AWS Cost Explorer and AWS Budgets" },
      { id: "b", text: "Amazon CloudWatch metrics alone" },
      { id: "c", text: "AWS CloudTrail management event logs" },
      { id: "d", text: "AWS Config conformance rules" },
    ],
    correct: ["a"],
    explanation:
      "Tags roll spend up by project, Cost Explorer analyzes and charts it, and Budgets can alert on actual or forecasted thresholds. CloudWatch tracks operational metrics; CloudTrail audits API calls; Config evaluates resource configuration—not billing attribution or forecast alerts.",
    difficulty: "medium",
    services: ["cost-explorer","budgets","cost-allocation-tags"],
  },
  {
    id: "saa-d4-009",
    section: "d4-cost-optimized",
    subtopic: "ec2-spot",
    type: "single",
    prompt:
      "Which EC2 pricing model can yield the largest percentage savings yet is a poor choice for mission-critical applications or primary database servers?",
    options: [
      { id: "a", text: "Convertible Reserved Instances that can be exchanged for different instance attributes" },
      { id: "b", text: "Dedicated Hosts for physical-server isolation and license control" },
      { id: "c", text: "Spot Instances using spare EC2 capacity at steep discounts" },
    ],
    correct: ["c"],
    explanation:
      "Spot Instances tap surplus capacity at steep discounts, but AWS can reclaim them—typically with a two-minute interruption notice for stop or terminate actions—making them risky for workloads that cannot tolerate sudden loss of a node, such as authoritative databases.",
    difficulty: "easy",
    services: ["ec2","spot"],
  },
  {
    id: "saa-d4-010",
    section: "d4-cost-optimized",
    subtopic: "ec2-purchasing",
    type: "single",
    prompt:
      "When you purchase an EC2 Reserved Instance, which commitment terms does AWS offer?",
    options: [
      { id: "a", text: "Commitment terms of 1 year or 3 years" },
      { id: "b", text: "Commitment terms of 2 years or 4 years" },
      { id: "c", text: "Commitment terms of 6 months or 1 year" },
      { id: "d", text: "Any duration from 1 through 3 years" },
    ],
    correct: ["a"],
    explanation:
      "Standard Reserved Instance terms are fixed at one year or three years; longer commitments generally earn deeper hourly discounts than one-year terms.",
    difficulty: "easy",
    services: ["ec2","reserved-instances"],
  },
  {
    id: "saa-d4-011",
    section: "d4-cost-optimized",
    subtopic: "ec2-purchasing",
    type: "single",
    prompt:
      "You expect a single EC2-hosted application to run without interruption for the next 12 months. Which purchase option is the most cost-conscious fit?",
    options: [
      { id: "a", text: "Reserved Instances for 1- or 3-year capacity commitments" },
      { id: "b", text: "Spot Instances using spare EC2 capacity at steep discounts" },
      { id: "c", text: "On-Demand Instances with no upfront commitment" },
    ],
    correct: ["a"],
    explanation:
      "Reserved Instances (or an equivalent Savings Plan) reward a year-long steady commitment with lower hourly rates. Spot is interruptible; On-Demand is the highest hourly price for continuous uptime.",
    difficulty: "easy",
    services: ["ec2","reserved-instances"],
  },
  {
    id: "saa-d4-012",
    section: "d4-cost-optimized",
    subtopic: "ec2-purchasing",
    type: "single",
    prompt:
      "Regulators require workloads to run on physically isolated servers, and software licensing is tied to specific hosts so BYOL can reduce license fees. Which EC2 option satisfies both constraints?",
    options: [
      { id: "a", text: "Convertible Reserved Instances that can be exchanged for different instance attributes" },
      { id: "b", text: "Dedicated Hosts for physical-server isolation and license control" },
      { id: "c", text: "Spot Instances using spare EC2 capacity at steep discounts" },
    ],
    correct: ["b"],
    explanation:
      "Dedicated Hosts allocate an entire physical machine to your account, supporting compliance isolation and socket/core-based BYOL licensing models that standard shared tenancy cannot satisfy.",
    difficulty: "medium",
    services: ["ec2","dedicated-hosts"],
  },
  {
    id: "saa-d4-013",
    section: "d4-cost-optimized",
    subtopic: "ec2-purchasing",
    type: "single",
    prompt:
      "A database vendor prices licenses per physical CPU socket and requires visibility into underlying hardware sockets. Which EC2 purchasing model exposes that hardware detail?",
    options: [
      { id: "a", text: "Spot Instances using spare EC2 capacity at steep discounts" },
      { id: "b", text: "On-Demand pricing with no reservation" },
      { id: "c", text: "Dedicated Hosts for physical-server isolation and license control" },
      { id: "d", text: "Reserved Instances for 1- or 3-year capacity commitments" },
    ],
    correct: ["c"],
    explanation:
      "Only Dedicated Hosts let you see and count physical sockets/cores on the underlying server—information socket-based enterprise licenses typically require.",
    difficulty: "medium",
    services: ["ec2","dedicated-hosts"],
  },
  {
    id: "saa-d4-014",
    section: "d4-cost-optimized",
    subtopic: "ec2-spot",
    type: "single",
    prompt:
      "A Spot Fleet primarily launches Spot Instances and may also include which other instance purchase type to help meet target capacity?",
    options: [
      { id: "a", text: "Reserved Instances for 1- or 3-year capacity commitments" },
      { id: "b", text: "On-Demand Instances with no upfront commitment" },
      { id: "c", text: "Dedicated Hosts for physical-server isolation and license control" },
      { id: "d", text: "Dedicated Instances running on hardware reserved for one account" },
    ],
    correct: ["b"],
    explanation:
      "Spot Fleet requests Spot capacity across pools and can blend in On-Demand Instances when you need guaranteed fulfillment while still optimizing for lowest overall price.",
    difficulty: "medium",
    services: ["ec2","spot"],
  },
  {
    id: "saa-d4-015",
    section: "d4-cost-optimized",
    subtopic: "ec2-hibernate",
    type: "single",
    prompt:
      "Which statement about EC2 hibernation is NOT true?",
    options: [
      { id: "a", text: "The instance root volume must be an instance store volume" },
      { id: "b", text: "Hibernation is supported on On-Demand, Reserved, and supported Spot configurations" },
      { id: "c", text: "Instance memory (RAM) must be less than 150 GB" },
      { id: "d", text: "The root volume must be an EBS volume" },
    ],
    correct: ["a"],
    explanation:
      "Hibernation persists RAM to an encrypted EBS root volume—instance store cannot serve as that root. The Linux RAM limit, EBS root requirement, and support across On-Demand, Reserved, and supported Spot configurations are valid constraints.",
    difficulty: "hard",
    services: ["ec2"],
  },
  {
    id: "saa-d4-016",
    section: "d4-cost-optimized",
    subtopic: "s3-storage-classes",
    type: "single",
    prompt:
      "Backup files in S3 are read only a handful of times each month, but when they are needed, restore must complete in milliseconds. Which class balances cost and that retrieval requirement?",
    options: [
      { id: "a", text: "S3 Standard-IA for rarely read objects that still need fast retrieval" },
      { id: "b", text: "S3 Standard for frequently accessed objects" },
      { id: "c", text: "S3 Glacier Deep Archive for lowest-cost long-term retention" },
      { id: "d", text: "S3 Express One Zone for high-performance single-AZ object access" },
    ],
    correct: ["a"],
    explanation:
      "Standard-IA lowers storage pricing for rarely touched objects while still offering millisecond access (with per-GB retrieval charges). Standard overpays for infrequent reads; Glacier Deep Archive is cheap storage with multi-hour restore latency.",
    difficulty: "medium",
    services: ["s3"],
  },
  {
    id: "saa-d4-017",
    section: "d4-cost-optimized",
    type: "single",
    prompt:
      "Leadership wants maximum discount on compute spanning EC2, AWS Fargate, and AWS Lambda, with freedom to change instance families, sizes, and Regions after signing a one- or three-year spend pledge. What should they purchase?",
    options: [
      { id: "a", text: "Compute Savings Plans applying across EC2, Fargate, and Lambda" },
      { id: "b", text: "Standard Reserved Instances locked to a specific instance family" },
      { id: "c", text: "Spot Instances using spare EC2 capacity at steep discounts" },
      { id: "d", text: "On-Demand Instances with no upfront commitment" },
    ],
    correct: ["a"],
    explanation:
      "Compute Savings Plans apply committed spend across EC2 (any family/size/Region), Fargate, and Lambda. Standard RIs discount specific instance attributes; Spot is interruptible; On-Demand has no commitment discount.",
    difficulty: "medium",
    services: ["savings-plans"],
  },
  {
    id: "saa-d4-018",
    section: "d4-cost-optimized",
    subtopic: "cloudfront",
    type: "single",
    prompt:
      "Global visitors repeatedly download the same large static files from the origin server, inflating egress charges and response times. What single change addresses both cost and user experience?",
    options: [
      { id: "a", text: "Front the site with Amazon CloudFront" },
      { id: "b", text: "Upgrade origin EC2 to a larger instance type" },
      { id: "c", text: "Migrate assets to a pricier S3 storage class" },
      { id: "d", text: "Attach more Elastic IP addresses to the origin" },
    ],
    correct: ["a"],
    explanation:
      "CloudFront caches static objects at edge PoPs, so repeat downloads hit the edge instead of the origin—cutting origin egress and shortening latency for distant users. Bigger EC2, costlier S3 classes, and extra Elastic IPs do not replicate that caching benefit.",
    difficulty: "easy",
    services: ["cloudfront"],
  },
  {
    id: "saa-d4-019",
    section: "d4-cost-optimized",
    subtopic: "ec2-purchasing",
    type: "single",
    prompt:
      "How does a Dedicated Host differ from a Dedicated Instance?",
    options: [
      { id: "a", text: "A Dedicated Host provides control and visibility of the physical server (sockets/cores) for BYOL; a Dedicated Instance runs on hardware dedicated to your account without that physical-level visibility" },
      { id: "b", text: "They are identical offerings with different names" },
      { id: "c", text: "A Dedicated Instance is a discounted Spot variant" },
      { id: "d", text: "A Dedicated Host is a serverless compute product" },
    ],
    correct: ["a"],
    explanation:
      "Dedicated Hosts map to a specific physical machine and expose socket/core counts for licensing. Dedicated Instances still isolate your VMs from other tenants but hide the underlying hardware layout.",
    difficulty: "medium",
    services: ["ec2","dedicated-hosts"],
  },
  {
    id: "saa-d4-020",
    section: "d4-cost-optimized",
    subtopic: "ec2-spot",
    type: "single",
    prompt:
      "Which description accurately reflects EC2 Spot Instances?",
    options: [
      { id: "a", text: "Discounted spare EC2 capacity that AWS can interrupt when it needs the capacity back" },
      { id: "b", text: "Capacity locked in with a mandatory three-year contract" },
      { id: "c", text: "Guaranteed uninterrupted compute at standard On-Demand rates" },
      { id: "d", text: "Compute instances billed at zero cost" },
    ],
    correct: ["a"],
    explanation:
      "Spot sells unused capacity at large discounts. For stop or terminate interruptions, AWS typically provides a two-minute notice; hibernation interruptions start the hibernation process immediately. Spot is neither free, contractually reserved, nor interruption-free.",
    difficulty: "easy",
    services: ["ec2","spot"],
  },
  {
    id: "saa-d4-021",
    section: "d4-cost-optimized",
    subtopic: "ec2-spot",
    type: "single",
    prompt:
      "Which workload profile is the strongest candidate for Spot Instances?",
    options: [
      { id: "a", text: "Interruptible batch processing that checkpoints and can restart after capacity loss" },
      { id: "b", text: "Primary transactional database with strict uptime SLA" },
      { id: "c", text: "Stateful session server with no redundancy" },
      { id: "d", text: "Single-node billing engine that cannot fail" },
    ],
    correct: ["a"],
    explanation:
      "Spot shines when jobs are idempotent or checkpointed and deadlines flex. Authoritative databases, lone session stores, and critical billing paths need stable capacity Spot cannot guarantee.",
    difficulty: "easy",
    services: ["ec2","spot"],
  },
  {
    id: "saa-d4-022",
    section: "d4-cost-optimized",
    subtopic: "ec2-spot",
    type: "single",
    prompt:
      "What problem does a Spot Fleet solve?",
    options: [
      { id: "a", text: "It fulfills a target capacity mix using Spot—and optionally On-Demand—instances while seeking the lowest price" },
      { id: "b", text: "It automatically buys one-year Reserved capacity" },
      { id: "c", text: "It provisions and operates an Application Load Balancer" },
      { id: "d", text: "It encrypts all attached EBS volumes by default" },
    ],
    correct: ["a"],
    explanation:
      "Spot Fleet aggregates requests across instance types and purchase options to hit capacity goals at minimal cost. It is not a reservation tool, load balancer, or volume encryption service.",
    difficulty: "medium",
    services: ["ec2","spot"],
  },
  {
    id: "saa-d4-023",
    section: "d4-cost-optimized",
    subtopic: "ec2-hibernate",
    type: "single",
    prompt:
      "When you hibernate an EC2 instance, what happens to its running state?",
    options: [
      { id: "a", text: "Contents of RAM are written to the encrypted EBS root volume so startup resumes prior application state" },
      { id: "b", text: "The instance is terminated to eliminate compute charges permanently" },
      { id: "c", text: "The instance is live-migrated to another AWS Region" },
      { id: "d", text: "An AMI snapshot replaces the instance, which is then deleted" },
    ],
    correct: ["a"],
    explanation:
      "Hibernate snapshots memory to the root EBS volume; on start, the OS reloads that image and processes continue where they paused—unlike terminate or cross-Region migration.",
    difficulty: "medium",
    services: ["ec2"],
  },
  {
    id: "saa-d4-024",
    section: "d4-cost-optimized",
    subtopic: "ec2-hibernate",
    type: "single",
    prompt:
      "For certain long-running applications, why choose hibernate over a conventional stop and later start?",
    options: [
      { id: "a", text: "RAM is preserved, so recovery is faster than a cold boot and full application warm-up" },
      { id: "b", text: "Hibernate always costs less than stopping an instance" },
      { id: "c", text: "Hibernate automatically changes the instance type on resume" },
      { id: "d", text: "Hibernate eliminates the need to maintain AMIs" },
    ],
    correct: ["a"],
    explanation:
      "The main benefit is time-to-ready: in-memory caches and app state return without repeating lengthy initialization. Pricing is similar to stopped instances; instance type and AMI requirements are unchanged.",
    difficulty: "medium",
    services: ["ec2"],
  },
  {
    id: "saa-d4-025",
    section: "d4-cost-optimized",
    subtopic: "ec2-hibernate",
    type: "single",
    prompt:
      "Which condition must be met before EC2 hibernation can be enabled on an instance?",
    options: [
      { id: "a", text: "The root volume is an encrypted EBS volume sized to hold the memory dump" },
      { id: "b", text: "The root volume uses instance store only" },
      { id: "c", text: "Installed RAM exceeds 150 GB" },
      { id: "d", text: "The instance must run exclusively as Spot" },
    ],
    correct: ["a"],
    explanation:
      "Hibernate writes RAM to the root EBS volume, which must be encrypted and large enough for the dump; RAM must stay under the service limit. Instance-store roots and Spot-only requirements are incorrect.",
    difficulty: "medium",
    services: ["ec2","ebs"],
  },
  {
    id: "saa-d4-026",
    section: "d4-cost-optimized",
    subtopic: "ec2-hibernate",
    type: "single",
    prompt:
      "While an EC2 instance remains in the hibernated state, which charges still apply?",
    options: [
      { id: "a", text: "No compute hourly charges, but EBS storage (and any associated Elastic IP) still bills" },
      { id: "b", text: "Full On-Demand instance hours continue" },
      { id: "c", text: "Absolutely no AWS charges accrue" },
      { id: "d", text: "Only outbound data transfer is metered" },
    ],
    correct: ["a"],
    explanation:
      "Hibernated instances behave like stopped ones for compute—you do not pay instance hours, yet attached EBS volumes (including space holding the memory image) and idle Elastic IPs still incur fees.",
    difficulty: "medium",
    services: ["ec2","ebs"],
  },
  {
    id: "saa-d4-027",
    section: "d4-cost-optimized",
    subtopic: "beanstalk",
    type: "single",
    prompt:
      "What is the pricing model for the AWS Elastic Beanstalk service itself?",
    options: [
      { id: "a", text: "No separate Beanstalk fee—you pay only for resources it creates, such as EC2, load balancers, and RDS" },
      { id: "b", text: "A fixed monthly platform subscription" },
      { id: "c", text: "A fee charged for each application deployment" },
      { id: "d", text: "Per-request pricing on traffic Beanstalk handles" },
    ],
    correct: ["a"],
    explanation:
      "Elastic Beanstalk is a management layer at no additional service charge; billing comes from the underlying AWS components Beanstalk provisions on your behalf.",
    difficulty: "medium",
    services: ["elastic-beanstalk"],
  },
  {
    id: "saa-d4-028",
    section: "d4-cost-optimized",
    subtopic: "s3-storage-classes",
    type: "single",
    prompt:
      "Which answer best summarizes the role of Amazon S3 storage classes?",
    options: [
      { id: "a", text: "Offerings such as Standard, Standard-IA, One Zone-IA, Glacier variants, and Intelligent-Tiering that exchange retrieval latency/fees for lower storage rates" },
      { id: "b", text: "Graduated levels of server-side encryption strength" },
      { id: "c", text: "Predefined geographic Regions for every bucket" },
      { id: "d", text: "Predefined IAM policy bundles for object access" },
    ],
    correct: ["a"],
    explanation:
      "Storage classes tune the cost/access trade-off—from frequently read Standard objects to archival Glacier tiers—with Intelligent-Tiering automating movement. They are not encryption tiers, Region presets, or IAM packages.",
    difficulty: "easy",
    services: ["s3"],
  },
  {
    id: "saa-d4-029",
    section: "d4-cost-optimized",
    subtopic: "s3-storage-classes",
    type: "single",
    prompt:
      "Under what circumstances does Amazon S3 One Zone-IA make the most sense?",
    options: [
      { id: "a", text: "Backup or secondary copies you rarely read, can rebuild if lost, and do not require storage spread across multiple Availability Zones" },
      { id: "b", text: "Production datasets where loss of an entire Availability Zone must not mean data loss" },
      { id: "c", text: "Objects that users download or update many times per day" },
      { id: "d", text: "Workloads that require synchronous replication to another AWS Region on every write" },
    ],
    correct: ["a"],
    explanation:
      "One Zone-IA keeps objects in one AZ at a reduced storage rate. That trade-off is acceptable only when you can tolerate AZ-level loss and the data is not hot. Multi-AZ classes, Standard, and cross-Region replication address durability or access patterns One Zone-IA does not.",
    difficulty: "medium",
    services: ["s3"],
  },
  {
    id: "saa-d4-030",
    section: "d4-cost-optimized",
    subtopic: "s3-storage-classes",
    type: "single",
    prompt:
      "Your compliance archive will sit untouched for years, and restores can wait many hours. Which S3 class minimizes storage charges?",
    options: [
      { id: "a", text: "S3 Glacier Deep Archive for lowest-cost long-term retention" },
      { id: "b", text: "S3 Standard for frequently accessed objects" },
      { id: "c", text: "S3 Standard-IA for infrequent access with multi-AZ durability" },
      { id: "d", text: "S3 Express One Zone for high-performance single-AZ object access" },
    ],
    correct: ["a"],
    explanation:
      "Glacier Deep Archive targets cold retention with the lowest storage price and the slowest restore options. Standard and Standard-IA cost more because they assume more frequent access. Express One Zone optimizes for millisecond latency, not archival economics.",
    difficulty: "medium",
    services: ["s3","s3-glacier"],
  },
  {
    id: "saa-d4-031",
    section: "d4-cost-optimized",
    subtopic: "s3-lifecycle",
    type: "single",
    prompt:
      "What is the primary purpose of Amazon S3 Lifecycle configuration?",
    options: [
      { id: "a", text: "Time-based policies that move objects to different storage classes and optionally remove them when they age out" },
      { id: "b", text: "Applying server-side encryption keys to every object" },
      { id: "c", text: "Continuous replication of bucket contents to another Region" },
      { id: "d", text: "Enabling static website hosting on a bucket" },
    ],
    correct: ["a"],
    explanation:
      "Lifecycle rules automate transitions to cheaper tiers and expiration deletes based on object age or prefix filters. Encryption, CRR, and website hosting are separate bucket features—not lifecycle’s job.",
    difficulty: "easy",
    services: ["s3"],
  },
  {
    id: "saa-d4-032",
    section: "d4-cost-optimized",
    subtopic: "s3-lifecycle",
    type: "single",
    prompt:
      "Versioning is on and older object versions are inflating your S3 bill. What is the cost-aware way to trim noncurrent versions automatically?",
    options: [
      { id: "a", text: "Configure a lifecycle action to delete noncurrent versions after they exceed a defined age" },
      { id: "b", text: "Turn off versioning so only the latest key remains" },
      { id: "c", text: "Have operators delete prior versions one at a time in the console" },
      { id: "d", text: "Enable cross-Region replication to copy versions elsewhere" },
    ],
    correct: ["a"],
    explanation:
      "Lifecycle supports noncurrent version expiration, which prunes historical versions on a schedule. Suspending versioning does not remove existing versions. Manual cleanup does not scale, and replication adds storage elsewhere rather than reducing it.",
    difficulty: "medium",
    services: ["s3"],
  },
  {
    id: "saa-d4-033",
    section: "d4-cost-optimized",
    subtopic: "s3-lifecycle",
    type: "single",
    prompt:
      "Before writing lifecycle transition rules, you want insight into how often objects in a prefix are read. Which S3 feature supports that?",
    options: [
      { id: "a", text: "Storage Class Analysis, which tracks access activity and suggests when Standard-IA may be appropriate" },
      { id: "b", text: "Default bucket encryption settings" },
      { id: "c", text: "Same-Region or cross-Region replication" },
      { id: "d", text: "Static website hosting configuration" },
    ],
    correct: ["a"],
    explanation:
      "Storage Class Analysis (often called S3 Analytics) reports access patterns so you can time transitions—for example from Standard to Standard-IA. It advises; it does not encrypt, replicate, or host sites.",
    difficulty: "medium",
    services: ["s3"],
  },
  {
    id: "saa-d4-034",
    section: "d4-cost-optimized",
    subtopic: "s3-lifecycle",
    type: "single",
    prompt:
      "Object read frequency is unpredictable and may shift over time. Why might S3 Intelligent-Tiering beat hand-tuned lifecycle transitions?",
    options: [
      { id: "a", text: "It monitors usage and moves objects between tiers automatically, without charging retrieval fees for those internal tier changes" },
      { id: "b", text: "It is ideal when every object’s access schedule is fixed and known months in advance" },
      { id: "c", text: "It is required only for S3 static website endpoints" },
      { id: "d", text: "Its main role is to enforce encryption at rest" },
    ],
    correct: ["a"],
    explanation:
      "Intelligent-Tiering fits volatile or unknown access because AWS adjusts tiers for you and does not bill retrieval for automated tier moves. Stable, predictable patterns are often cheaper with explicit lifecycle rules. It is not a website or encryption feature.",
    difficulty: "medium",
    services: ["s3"],
  },
  {
    id: "saa-d4-035",
    section: "d4-cost-optimized",
    subtopic: "s3-operations",
    type: "single",
    prompt:
      "You publish a large shared dataset in S3 for authenticated external consumers and want download charges billed to those callers, not your account. Which bucket setting applies?",
    options: [
      { id: "a", text: "Requester Pays, so authenticated callers cover request and data transfer fees for their downloads" },
      { id: "b", text: "A policy that waives all GET request and egress charges" },
      { id: "c", text: "Mandatory TLS client encryption on every API call" },
      { id: "d", text: "Block Public Access enabled on the bucket" },
    ],
    correct: ["a"],
    explanation:
      "Requester Pays shifts request and transfer costs to the authenticated caller who initiates access—typical for shared research or log datasets. Anonymous access is not allowed on Requester Pays buckets. It does not make traffic free or encrypt by itself.",
    difficulty: "medium",
    services: ["s3"],
  },
  {
    id: "saa-d4-036",
    section: "d4-cost-optimized",
    subtopic: "s3-operations",
    type: "single",
    prompt:
      "You must retag, copy, or restore from Glacier for millions of existing S3 objects in one coordinated job. What service fits?",
    options: [
      { id: "a", text: "S3 Batch Operations, driven by an inventory manifest to run one operation across many objects" },
      { id: "b", text: "S3 event notifications for per-object real-time triggers" },
      { id: "c", text: "S3 static website hosting" },
      { id: "d", text: "Amazon Route 53 health checks" },
    ],
    correct: ["a"],
    explanation:
      "Batch Operations is built for large-scale, batch changes—copy, ACL/tag updates, Glacier restore, Lambda invocation—from a manifest. Event notifications react to individual uploads; they are not a bulk orchestration layer.",
    difficulty: "medium",
    services: ["s3"],
  },
  {
    id: "saa-d4-037",
    section: "d4-cost-optimized",
    subtopic: "s3-operations",
    type: "single",
    prompt:
      "Leadership wants a consolidated view of S3 usage and savings opportunities across many accounts. Which capability provides that?",
    options: [
      { id: "a", text: "S3 Storage Lens dashboards and metrics with cost and protection recommendations org-wide" },
      { id: "b", text: "Amazon CloudFront as a CDN in front of buckets" },
      { id: "c", text: "SSE-KMS default encryption on each bucket" },
      { id: "d", text: "An Application Load Balancer targeting S3" },
    ],
    correct: ["a"],
    explanation:
      "Storage Lens aggregates storage metrics, activity, and guidance across accounts and Regions. CloudFront caches content; KMS encrypts; ALBs do not front S3 as a load-balanced origin in this sense.",
    difficulty: "medium",
    services: ["s3"],
  },
  {
    id: "saa-d4-038",
    section: "d4-cost-optimized",
    subtopic: "s3-operations",
    type: "single",
    prompt:
      "Failed multipart uploads are leaving orphaned parts in S3 and you are still paying for that storage. What should you configure?",
    options: [
      { id: "a", text: "A lifecycle rule that aborts incomplete multipart uploads after a specified number of days" },
      { id: "b", text: "A bucket policy forbidding multipart upload APIs entirely" },
      { id: "c", text: "Bucket versioning to consolidate partial uploads" },
      { id: "d", text: "Requester Pays so uploaders pay for abandoned parts" },
    ],
    correct: ["a"],
    explanation:
      "Incomplete uploads store parts until aborted or completed. Lifecycle can auto-abort stale multipart sessions, reclaiming storage. Banning multipart breaks large uploads; versioning does not clean parts; Requester Pays does not remove orphans.",
    difficulty: "medium",
    services: ["s3"],
  },
  {
    id: "saa-d4-039",
    section: "d4-cost-optimized",
    subtopic: "data-transfer",
    type: "single",
    prompt:
      "When on-premises storage has usable network connectivity and you need recurring, verified copies into AWS, which service is the recommended online transfer path?",
    options: [
      { id: "a", text: "AWS DataSync for managed, scheduled online data movement with integrity verification" },
      { id: "b", text: "Amazon Kinesis Data Streams for real-time event ingestion" },
      { id: "c", text: "Amazon RDS as a primary migration appliance" },
      { id: "d", text: "Amazon CloudFront as a bulk upload endpoint" },
    ],
    correct: ["a"],
    explanation:
      "DataSync is the current online path AWS emphasizes for high-throughput copies to S3, EFS, FSx, and similar targets with scheduling and verification. Kinesis is for streaming events, RDS is a database service, and CloudFront is a CDN—not a bulk migration tool.",
    difficulty: "easy",
    services: ["datasync"],
  },
  {
    id: "saa-d4-040",
    section: "d4-cost-optimized",
    subtopic: "data-transfer",
    type: "single",
    prompt:
      "A field office must load roughly 80 TB into S3, but the WAN link is slow and unreliable. Which approach aligns with current AWS guidance?",
    options: [
      { id: "a", text: "Obtain adequate bandwidth and use DataSync, or evaluate AWS Data Transfer Terminal / Partner physical-transfer options when online transfer remains impractical" },
      { id: "b", text: "Stream the entire dataset over the existing internet connection and wait out multi-month uploads" },
      { id: "c", text: "Expect DataSync alone to finish quickly on the same constrained WAN" },
      { id: "d", text: "Provision AWS Direct Connect solely for this one-time upload without considering transfer alternatives" },
    ],
    correct: ["a"],
    explanation:
      "For large migrations, AWS points new customers to DataSync when network capacity is usable, and to Data Transfer Terminal or Partner solutions when physical transfer is still needed. Saturating a weak WAN for months, assuming DataSync magically bypasses bandwidth limits, or standing up Direct Connect only for a one-off job are usually poor fits.",
    difficulty: "medium",
    services: ["datasync"],
  },
  {
    id: "saa-d4-041",
    section: "d4-cost-optimized",
    subtopic: "data-transfer",
    type: "single",
    prompt:
      "You are planning a multi-petabyte datacenter exit to AWS and will need sustained high throughput for ongoing data movement after cutover. Which connectivity model best supports that magnitude?",
    options: [
      { id: "a", text: "AWS Direct Connect for dedicated network capacity into AWS" },
      { id: "b", text: "A single Site-to-Site VPN over consumer broadband" },
      { id: "c", text: "Unscheduled public-internet uploads with no transfer tooling" },
      { id: "d", text: "Emailing archives in batches" },
    ],
    correct: ["a"],
    explanation:
      "Direct Connect provides dedicated bandwidth suited to sustained large-scale data movement. A lone consumer VPN, ad-hoc internet uploads, and email are not practical for petabyte-class ongoing transfer.",
    difficulty: "medium",
    services: ["direct-connect"],
  },
  {
    id: "saa-d4-042",
    section: "d4-cost-optimized",
    subtopic: "data-transfer",
    type: "single",
    prompt:
      "After a large migration lands objects in S3 Standard, finance wants the lowest long-term storage cost with rare retrieval. What should you do next?",
    options: [
      { id: "a", text: "Apply S3 lifecycle rules to transition objects into Glacier or Glacier Deep Archive" },
      { id: "b", text: "Leave everything in S3 Standard with no transitions" },
      { id: "c", text: "Export the same data back out of S3 immediately" },
      { id: "d", text: "Copy the dataset to ephemeral instance store on EC2" },
    ],
    correct: ["a"],
    explanation:
      "Migrations often land in Standard first; lifecycle then moves cold data to archival tiers for ongoing savings. Staying in Standard wastes money for rarely accessed data. Re-exporting or instance store does not replace durable, cheap archive storage in S3 Glacier classes.",
    difficulty: "medium",
    services: ["s3","s3-glacier"],
  },
  {
    id: "saa-d4-043",
    section: "d4-cost-optimized",
    subtopic: "data-transfer",
    type: "single",
    prompt:
      "While migrating a large NFS share with DataSync, you must avoid saturating the production WAN during business hours. Which capability helps?",
    options: [
      { id: "a", text: "Bandwidth throttling and task scheduling so transfers run within defined windows and rate limits" },
      { id: "b", text: "Disabling encryption on the DataSync task" },
      { id: "c", text: "Publishing the source share anonymously on the internet" },
      { id: "d", text: "Turning off data integrity verification permanently" },
    ],
    correct: ["a"],
    explanation:
      "DataSync supports bandwidth limits and schedules so migrations coexist with production traffic. Disabling encryption or verification, or exposing source data publicly, does not solve WAN contention and weakens security or integrity.",
    difficulty: "medium",
    services: ["datasync"],
  },
  {
    id: "saa-d4-044",
    section: "d4-cost-optimized",
    subtopic: "hybrid-storage",
    type: "single",
    prompt:
      "On-prem apps need familiar file, block, or tape interfaces while backing into virtually unlimited S3 capacity. Which AWS service bridges that gap?",
    options: [
      { id: "a", text: "Storage Gateway bridging on-premises apps to cloud storage" },
      { id: "b", text: "DataSync for managed online data movement" },
      { id: "c", text: "Amazon Athena for interactive SQL over S3" },
      { id: "d", text: "Amazon FSx managed Windows or Lustre file systems" },
    ],
    correct: ["a"],
    explanation:
      "Storage Gateway presents File, Volume, and Tape Gateway types with local cache and cloud persistence—ideal hybrid access. DataSync is scheduled copy/sync; Athena queries objects; FSx is a managed file system in AWS, not a generic on-prem bridge.",
    difficulty: "medium",
    services: ["storage-gateway"],
  },
  {
    id: "saa-d4-045",
    section: "d4-cost-optimized",
    subtopic: "hybrid-storage",
    type: "single",
    prompt:
      "You need recurring, high-throughput copies from a datacenter NFS share into Amazon S3 with integrity checks and scheduling. Which service?",
    options: [
      { id: "a", text: "DataSync for managed online data movement" },
      { id: "b", text: "Storage Gateway bridging on-premises apps to cloud storage" },
      { id: "c", text: "AWS Transfer Family for SFTP/FTPS/FTP endpoints" },
      { id: "d", text: "CloudFront caching to cut origin data-transfer costs" },
    ],
    correct: ["a"],
    explanation:
      "DataSync automates online transfer to S3, EFS, FSx, and similar targets with verification and task schedules. Storage Gateway mounts cloud storage locally; Transfer Family exposes managed file-transfer protocols; CloudFront delivers content to viewers.",
    difficulty: "medium",
    services: ["datasync"],
  },
  {
    id: "saa-d4-046",
    section: "d4-cost-optimized",
    subtopic: "hybrid-storage",
    type: "single",
    prompt:
      "External vendors must drop files into your AWS environment using SFTP or FTPS without you running servers. What should you deploy?",
    options: [
      { id: "a", text: "AWS Transfer Family managed endpoints targeting S3 or EFS" },
      { id: "b", text: "AWS DataSync agents only" },
      { id: "c", text: "AWS Storage Gateway Tape Gateway" },
      { id: "d", text: "Amazon CloudFront distributions for every upload" },
    ],
    correct: ["a"],
    explanation:
      "Transfer Family provides fully managed SFTP, FTPS, and FTP into S3 or EFS. DataSync is agent-based sync, not a multi-protocol upload endpoint. Tape Gateway and CloudFront serve different storage and delivery patterns.",
    difficulty: "medium",
    services: ["transfer-family"],
  },
  {
    id: "saa-d4-047",
    section: "d4-cost-optimized",
    subtopic: "ecs-fargate",
    type: "single",
    prompt:
      "Your team wants to run ECS tasks without maintaining a cluster of EC2 hosts. When is Fargate the better launch choice?",
    options: [
      { id: "a", text: "You prefer serverless tasks billed per vCPU and memory, with no AMI patching or capacity planning for workers" },
      { id: "b", text: "You require direct control of the container host kernel and hypervisor" },
      { id: "c", text: "The workload is primarily storing objects in S3" },
      { id: "d", text: "You need authoritative DNS for public hostnames" },
    ],
    correct: ["a"],
    explanation:
      "Fargate abstracts the EC2 layer—you pay for task resources only. EC2 launch type can win on cost at steady utilization but you operate the fleet. S3 and DNS are unrelated to picking Fargate versus EC2 for ECS.",
    difficulty: "medium",
    services: ["fargate","ecs"],
  },
  {
    id: "saa-d4-048",
    section: "d4-cost-optimized",
    subtopic: "lambda",
    type: "single",
    prompt:
      "Which statement best describes AWS Lambda pricing?",
    options: [
      { id: "a", text: "Charges accrue per invocation plus GB-seconds of execution; idle functions incur no compute fees" },
      { id: "b", text: "One fixed monthly subscription covers unlimited executions" },
      { id: "c", text: "Billing is identical to On-Demand EC2 instance hours" },
      { id: "d", text: "You pay primarily for S3 storage consumed by function code" },
    ],
    correct: ["a"],
    explanation:
      "Lambda bills requests and duration scaled by configured memory. No traffic means no duration charges—unlike always-on servers. Flat fees, EC2-hour pricing, and storage-based models do not describe Lambda.",
    difficulty: "easy",
    services: ["lambda"],
  },
  {
    id: "saa-d4-049",
    section: "d4-cost-optimized",
    subtopic: "vpc-fundamentals",
    type: "single",
    prompt:
      "Two EC2 instances exchange large volumes of traffic every minute. Which placement minimizes data transfer charges while keeping private communication?",
    options: [
      { id: "a", text: "Deploy both in the same Availability Zone and use private IP addresses, because cross-AZ traffic is billed" },
      { id: "b", text: "Distribute them across every AZ and Region for maximum separation" },
      { id: "c", text: "Force all east-west traffic through public Elastic IPs" },
      { id: "d", text: "Hairpin internal traffic through a NAT gateway in another AZ" },
    ],
    correct: ["a"],
    explanation:
      "Same-AZ private traffic between instances is not subject to the cross-AZ data transfer fee. Spreading AZs increases transfer cost for chatty pairs; public IPs and unnecessary NAT paths add egress or processing charges.",
    difficulty: "medium",
    services: ["vpc","ec2"],
  },
  {
    id: "saa-d4-050",
    section: "d4-cost-optimized",
    subtopic: "vpc-connectivity",
    type: "single",
    prompt:
      "Private subnet workloads reach S3 through a NAT gateway, and NAT processing fees are climbing. How can you cut that cost for S3 access?",
    options: [
      { id: "a", text: "Add an S3 gateway VPC endpoint so S3 traffic stays on the AWS network and skips the NAT" },
      { id: "b", text: "Deploy an additional NAT gateway for redundancy" },
      { id: "c", text: "Move the S3 bucket into a VPC subnet" },
      { id: "d", text: "Assign public IPs to every instance that reads from S3" },
    ],
    correct: ["a"],
    explanation:
      "Gateway endpoints for S3 are free to use and route traffic privately from the VPC to S3, avoiding NAT per-GB processing. Extra NAT gateways increase cost. Buckets are not placed in subnets; public IPs expose instances and do not fix NAT charges.",
    difficulty: "medium",
    services: ["vpc-endpoints","s3","nat-gateway"],
  },
  {
    id: "saa-d4-051",
    section: "d4-cost-optimized",
    subtopic: "hybrid-networking",
    type: "single",
    prompt:
      "A small company needs encrypted connectivity to its VPC this week, can tolerate internet variability, and wants to minimize spend. What hybrid link fits?",
    options: [
      { id: "a", text: "Site-to-Site VPN over the existing broadband circuit— inexpensive and quick to configure" },
      { id: "b", text: "AWS Direct Connect with a new dedicated fiber circuit— higher cost and long lead times" },
      { id: "c", text: "Two parallel Direct Connect connections for redundancy only" },
      { id: "d", text: "VPC peering directly to the corporate LAN without a gateway" },
    ],
    correct: ["a"],
    explanation:
      "Site-to-Site VPN encrypts traffic over the public internet and can be live quickly at low cost. Direct Connect trades money and time for consistent bandwidth. VPC peering connects VPCs, not on-premises networks by itself.",
    difficulty: "medium",
    services: ["vpn","direct-connect"],
  },
  {
    id: "saa-d4-052",
    section: "d4-cost-optimized",
    subtopic: "backup-transfer",
    type: "single",
    prompt:
      "Backup tapes were digitized to about 80 TB, but uploading over the corporate internet would take many months. What is the practical migration path under current AWS guidance?",
    options: [
      { id: "a", text: "Use DataSync once bandwidth is adequate, or AWS Data Transfer Terminal / Partner physical-transfer options when online transfer remains impractical" },
      { id: "b", text: "Start a continuous multipart upload over the current WAN and wait it out" },
      { id: "c", text: "Tunnel scp over Site-to-Site VPN without addressing bandwidth limits" },
      { id: "d", text: "Split files into email attachments" },
    ],
    correct: ["a"],
    explanation:
      "When the existing pipe cannot finish a large migration in time, AWS guidance favors obtaining usable bandwidth for DataSync or using Data Transfer Terminal / Partner physical-transfer paths. VPN or scp still limited by the same pipe; email is not viable at this scale.",
    difficulty: "medium",
    services: ["datasync"],
  },
  {
    id: "saa-d4-053",
    section: "d4-cost-optimized",
    subtopic: "operations-mgmt",
    type: "single",
    prompt:
      "Development EC2 instances should run weekdays 8–6 only. Which approach stops paying for overnight and weekend compute automatically?",
    options: [
      { id: "a", text: "AWS Instance Scheduler, or EventBridge rules that invoke Lambda or SSM to stop and start instances on a cron" },
      { id: "b", text: "Purchase Standard Reserved Instances sized for 24/7 operation" },
      { id: "c", text: "Upsize every instance to reduce runtime" },
      { id: "d", text: "Attach larger EBS volumes so disks spin down" },
    ],
    correct: ["a"],
    explanation:
      "Scheduled stop/start removes compute charges during off hours while preserving disks. RIs commit you to continuous usage. Bigger instances or volumes increase cost and do not schedule shutdowns.",
    difficulty: "medium",
    services: ["instance-scheduler","ec2"],
  },
  {
    id: "saa-d4-054",
    section: "d4-cost-optimized",
    subtopic: "cost-management",
    type: "single",
    prompt:
      "Finance asks for charts of past AWS spending broken down by service and tag, plus forward-looking estimates. Which tool?",
    options: [
      { id: "a", text: "AWS Cost Explorer for visualization, analysis, and forecasting of cost and usage" },
      { id: "b", text: "AWS KMS to encrypt the billing console" },
      { id: "c", text: "AWS Batch for running cost reports as jobs" },
      { id: "d", text: "Amazon S3 static website hosting for invoices" },
    ],
    correct: ["a"],
    explanation:
      "Cost Explorer is the native UI for historical spend, grouping, filtering, and forecasts. KMS, Batch, and S3 website hosting do not provide interactive cost analytics.",
    difficulty: "easy",
    services: ["cost-explorer"],
  },
  {
    id: "saa-d4-055",
    section: "d4-cost-optimized",
    subtopic: "cost-management",
    type: "single",
    prompt:
      "You want proactive notice when daily spend deviates from normal patterns without setting a fixed dollar cap. Which AWS feature?",
    options: [
      { id: "a", text: "AWS Cost Anomaly Detection, which applies ML to flag unusual cost spikes" },
      { id: "b", text: "A hard account lock that prevents launching any new resource" },
      { id: "c", text: "Encrypting Cost and Usage Reports with a customer managed key" },
      { id: "d", text: "AWS CloudFormation stack creation from templates" },
    ],
    correct: ["a"],
    explanation:
      "Cost Anomaly Detection learns typical spend and alerts on outliers—useful for surprise usage. It does not enforce hard limits (Budgets can alert on thresholds), encrypt reports by itself, or provision infrastructure.",
    difficulty: "medium",
    services: ["cost-anomaly-detection"],
  },
  {
    id: "saa-d4-056",
    section: "d4-cost-optimized",
    subtopic: "cost-management",
    type: "single",
    prompt:
      "Pick the pairing that correctly maps AWS cost tools: historical analysis and forecasting, ML-based spike alerts, and budget threshold notifications.",
    options: [
      { id: "a", text: "Cost Explorer handles trends and forecasts; Cost Anomaly Detection finds abnormal spikes; AWS Budgets sends threshold alerts" },
      { id: "b", text: "All three services perform identical functions" },
      { id: "c", text: "Budgets forecasts spend; Cost Explorer detects anomalies; Anomaly Detection enforces hard caps" },
      { id: "d", text: "Cost Explorer blocks spend at limits; Budgets only charts history" },
    ],
    correct: ["a"],
    explanation:
      "Each tool has a distinct role: Explorer for reporting and forecasting, Anomaly Detection for ML alerts on irregular spend, Budgets for defined monetary thresholds (and optional actions). The other options swap or collapse those responsibilities.",
    difficulty: "medium",
    services: ["cost-explorer","cost-anomaly-detection","budgets"],
  },
];
