// Domain 2 — Design Resilient Architectures (26%)
// Independently authored educational practice content based on publicly documented AWS concepts.
// Question shape is documented in plan/01-architecture.md.
// `correct` is ALWAYS an array of option ids (one or more for multi-select).
export const questions = [
  {
    id: "saa-d2-001",
    section: "d2-resilient",
    subtopic: "sqs",
    type: "single",
    prompt:
      "A front-end service accepts checkout events that a back-end fulfillment service handles more slowly. When demand surges, the back end drops work and records go missing. Which design MOST reliably separates the two layers and avoids losing work?",
    options: [
      { id: "a", text: "Register the fulfillment fleet as targets on an Application Load Balancer" },
      { id: "b", text: "Publish each checkout event to Amazon SQS and let fulfillment workers pull from the queue" },
      { id: "c", text: "Upgrade fulfillment EC2 to larger instance types" },
      { id: "d", text: "Land incoming orders in S3 and batch-process them once per hour" },
    ],
    correct: ["b"],
    explanation:
      "Amazon SQS sits between producer and consumer so bursts are held in the queue instead of overwhelming the slow tier. Producers can keep enqueueing while consumers work at a sustainable rate. Load balancing spreads concurrent HTTP calls but does not persist backlog; bigger instances still cap out and do not queue excess work.",
    difficulty: "easy",
    services: ["sqs","ec2"],
  },
  {
    id: "saa-d2-002",
    section: "d2-resilient",
    subtopic: "asg",
    type: "single",
    prompt:
      "A horizontally scalable web app must keep serving users if one Availability Zone goes down and must grow or shrink with load. Which setup satisfies both requirements?",
    options: [
      { id: "a", text: "One oversized EC2 instance with a mapped Elastic IP" },
      { id: "b", text: "EC2 instances in an Auto Scaling group across several AZs, fronted by an Application Load Balancer" },
      { id: "c", text: "A pair of EC2 hosts in one AZ registered to a Network Load Balancer" },
      { id: "d", text: "One EC2 per Region linked with VPC peering" },
    ],
    correct: ["b"],
    explanation:
      "Auto Scaling plus an ALB across multiple AZs gives zone-level fault tolerance and automatic capacity changes. A lone instance or multiple hosts confined to one AZ still fail when that zone fails.",
    difficulty: "easy",
    services: ["ec2-auto-scaling","alb"],
  },
  {
    id: "saa-d2-003",
    section: "d2-resilient",
    subtopic: "rds-basics",
    type: "single",
    prompt:
      "A team runs Amazon RDS for MySQL and needs the database to fail over automatically when the primary instance or its AZ is impaired, with as little interruption as possible. What configuration should they enable?",
    options: [
      { id: "a", text: "A read replica colocated in the primary's Availability Zone" },
      { id: "b", text: "Multi-AZ with a synchronous standby in another Availability Zone" },
      { id: "c", text: "Automated backups on a five-minute interval" },
      { id: "d", text: "Several cross-Region read replicas" },
    ],
    correct: ["b"],
    explanation:
      "RDS Multi-AZ keeps a hot standby in a second AZ and performs automatic failover—that is the built-in HA model. Read replicas improve read scale but are asynchronous and not the primary automatic failover path; snapshots are for recovery, not live failover.",
    difficulty: "medium",
    services: ["rds"],
  },
  {
    id: "saa-d2-004",
    section: "d2-resilient",
    subtopic: "sns",
    type: "single",
    prompt:
      "After a photo lands in storage, three unrelated downstream steps must run at the same time: resize a preview, scan for policy violations, and refresh a search catalog. Which pattern gives publish-subscribe decoupling?",
    options: [
      { id: "a", text: "One Amazon SQS queue consumed by a single worker that performs all three steps sequentially" },
      { id: "b", text: "An Amazon SNS topic fanning out to separate subscribers (for example, one SQS queue per workflow)" },
      { id: "c", text: "A scheduled job that lists the bucket every minute" },
      { id: "d", text: "Three blocking HTTP calls made in series from the uploader" },
    ],
    correct: ["b"],
    explanation:
      "SNS broadcast lets each downstream consumer react independently and scale on its own, often via dedicated SQS queues. One queue with one worker ties the pipelines together; synchronous chaining creates tight coupling and shared failure domains.",
    difficulty: "medium",
    services: ["sns","sqs"],
  },
  {
    id: "saa-d2-005",
    section: "d2-resilient",
    subtopic: "dr-strategies",
    type: "single",
    prompt:
      "Leadership wants disaster recovery in a second AWS Region where only essential components (such as a small database footprint) run continuously, with the rest spun up quickly after a regional outage while keeping spend lower than full dual-site operation. Which DR model matches that intent?",
    options: [
      { id: "a", text: "Backup and restore — recover from stored copies with the longest RTO" },
      { id: "b", text: "Pilot light — minimal core infra always on in the DR Region" },
      { id: "c", text: "Multi-site active-active — serve production traffic from multiple Regions at once" },
      { id: "d", text: "Single-AZ production" },
    ],
    correct: ["b"],
    explanation:
      "Pilot light leaves core shared services running in the DR Region and provisions the rest during failover. Backup and restore costs less but recovery takes longer; active-active runs full stacks in both Regions; single-AZ is availability design, not regional DR.",
    difficulty: "medium",
    services: ["disaster-recovery"],
  },
  {
    id: "saa-d2-006",
    section: "d2-resilient",
    type: "single",
    prompt:
      "Engineers plan to autoscale web servers behind a load balancer. Session data must survive instance replacement and must not stick to one host. Where should session state live?",
    options: [
      { id: "a", text: "On each instance's local filesystem" },
      { id: "b", text: "In a shared service such as Amazon ElastiCache or Amazon DynamoDB" },
      { id: "c", text: "On ephemeral instance store volumes attached to each host" },
      { id: "d", text: "Only in process memory on whichever instance first served the user" },
    ],
    correct: ["b"],
    explanation:
      "Moving sessions to ElastiCache or DynamoDB makes web nodes interchangeable so the load balancer can send any request to any healthy instance. Local disk, instance store, or RAM on one box breaks when that instance terminates or traffic shifts.",
    difficulty: "medium",
    services: ["elasticache","dynamodb"],
  },
  {
    id: "saa-d2-007",
    section: "d2-resilient",
    subtopic: "asg",
    type: "multi",
    prompt:
      "You are hardening an EC2-hosted web property against single points of failure. Which TWO changes materially improve resilience? (Choose two.)",
    options: [
      { id: "a", text: "Spread EC2 capacity across more than one Availability Zone" },
      { id: "b", text: "Run the fleet in an Auto Scaling group registered behind a load balancer" },
      { id: "c", text: "Standardize on one large On-Demand instance to simplify operations" },
      { id: "d", text: "Point all traffic at one instance via a dedicated Elastic IP" },
      { id: "e", text: "Keep application data exclusively on instance-local disks" },
    ],
    correct: ["a","b"],
    explanation:
      "Multi-AZ placement absorbs zone outages; Auto Scaling with a load balancer replaces unhealthy nodes and spreads requests. One big instance, one Elastic IP target, and local-only persistence each create a brittle single failure point.",
    difficulty: "medium",
    services: ["ec2-auto-scaling","alb"],
  },
  {
    id: "saa-d2-008",
    section: "d2-resilient",
    subtopic: "r53-routing",
    type: "single",
    prompt:
      "An organization runs the same app in two AWS Regions. DNS should prefer the primary Region under normal conditions and shift users to the secondary only when health checks show the primary is down. Which Route 53 routing policy applies?",
    options: [
      { id: "a", text: "Weighted routing — split traffic by assigned weights across records" },
      { id: "b", text: "Latency-based routing — send clients to the lowest-latency Region" },
      { id: "c", text: "Failover routing paired with health checks" },
      { id: "d", text: "Simple routing — a single record without health-based failover logic" },
    ],
    correct: ["c"],
    explanation:
      "Failover routing uses active/passive endpoints and health checks to steer traffic to the standby Region when the primary fails. Weighted routing splits by weight, latency routing optimizes RTT, and simple routing does not perform health-driven failover.",
    difficulty: "medium",
    services: ["route-53"],
  },
  {
    id: "saa-d2-009",
    section: "d2-resilient",
    subtopic: "ec2-basics",
    type: "single",
    prompt:
      "Several new EC2 instances must install packages and application binaries the first time they boot. What is the most appropriate launch-time automation?",
    options: [
      { id: "a", text: "SSH into every instance after launch and run installers by hand" },
      { id: "b", text: "Email AWS Support a shell script and ask them to execute it on each instance at boot" },
      { id: "c", text: "Supply a bootstrap shell script as EC2 User Data when launching the instances" },
    ],
    correct: ["c"],
    explanation:
      "User Data runs automatically on initial boot, giving repeatable software installation without logging into each host. Manual SSH does not scale; AWS Support is not a deployment channel for instance bootstrap.",
    difficulty: "easy",
    services: ["ec2"],
  },
  {
    id: "saa-d2-010",
    section: "d2-resilient",
    subtopic: "ec2-ip",
    type: "single",
    prompt:
      "You bookmarked an instance's auto-assigned public IPv4, then stopped and started it. The address changed and remote access broke. How can you give that instance a stable public IPv4?",
    options: [
      { id: "a", text: "Allocate an Elastic IP in your account and associate it with the instance" },
      { id: "b", text: "Configure a static public IPv4 inside the guest OS network settings" },
      { id: "c", text: "Open a support case to reserve a permanent public IPv4 for the instance" },
      { id: "d", text: "Accept that only private IPv4 addresses can remain fixed on EC2" },
    ],
    correct: ["a"],
    explanation:
      "Default public IPv4 addresses are reassigned when you stop and start. An Elastic IP is a persistent public address you control and can reattach after restarts.",
    difficulty: "easy",
    services: ["ec2","vpc"],
  },
  {
    id: "saa-d2-011",
    section: "d2-resilient",
    subtopic: "ec2-placement",
    type: "single",
    prompt:
      "A business-critical workload runs on multiple EC2 instances. If an entire Availability Zone fails, you want the smallest chance that all instances fail together. Which placement group type should you pick?",
    options: [
      { id: "a", text: "Cluster placement group" },
      { id: "b", text: "Partition placement group" },
      { id: "c", text: "Spread placement group" },
    ],
    correct: ["c"],
    explanation:
      "Spread placement groups place instances on separate underlying hardware, often across AZs, reducing correlated hardware failures. Cluster groups optimize proximity, not isolation.",
    difficulty: "medium",
    services: ["ec2","placement-groups"],
  },
  {
    id: "saa-d2-012",
    section: "d2-resilient",
    subtopic: "ec2-eni",
    type: "single",
    prompt:
      "You can attach an existing Elastic Network Interface to an EC2 instance that lives in a different Availability Zone than the ENI's subnet.",
    options: [
      { id: "a", text: "True — an ENI can be attached to instances in other Availability Zones" },
      { id: "b", text: "False — an ENI can only attach to instances in the same Availability Zone as its subnet" },
    ],
    correct: ["b"],
    explanation:
      "An ENI belongs to one subnet, and subnets are scoped to a single AZ, so attachment is limited to instances in that same zone.",
    difficulty: "medium",
    services: ["vpc","eni"],
  },
  {
    id: "saa-d2-013",
    section: "d2-resilient",
    subtopic: "sqs",
    type: "single",
    prompt:
      "A billing pipeline must handle queue messages in strict sequence and must not process duplicate deliveries. Which AWS messaging choice fits?",
    options: [
      { id: "a", text: "SQS FIFO queue — exactly-once processing with ordered messages" },
      { id: "b", text: "SQS standard queue — high throughput with at-least-once delivery" },
      { id: "c", text: "SNS standard topic — fan-out publish/subscribe notifications" },
      { id: "d", text: "Kinesis Data Firehose — managed delivery of streaming data to destinations" },
    ],
    correct: ["a"],
    explanation:
      "FIFO queues enforce ordering and deduplication semantics suited to exactly-once style processing. Standard SQS prioritizes throughput with best-effort ordering and possible duplicates; SNS and Firehose are not the same ordered queue model.",
    difficulty: "medium",
    services: ["sqs"],
  },
  {
    id: "saa-d2-014",
    section: "d2-resilient",
    subtopic: "asg",
    type: "single",
    prompt:
      "Operations wants an Auto Scaling group to maintain roughly 50% average CPU across the fleet without manual capacity tweaks. Which policy type should they configure?",
    options: [
      { id: "a", text: "Target tracking — keep a metric near a chosen target value" },
      { id: "b", text: "Scheduled scaling — change capacity on a known timetable" },
      { id: "c", text: "Manual scaling — an operator sets desired capacity by hand" },
      { id: "d", text: "Fixed desired capacity with scaling disabled" },
    ],
    correct: ["a"],
    explanation:
      "Target tracking continuously adds or removes instances to hold a metric near the target—such as 50% CPU. Scheduled scaling fits predictable calendars, not dynamic utilization goals.",
    difficulty: "easy",
    services: ["ec2-auto-scaling"],
  },
  {
    id: "saa-d2-015",
    section: "d2-resilient",
    subtopic: "s3-events-perf",
    type: "single",
    prompt:
      "Every object upload to a bucket should kick off processing immediately without maintaining servers for polling. Which architecture is MOST suitable?",
    options: [
      { id: "a", text: "S3 event notification that invokes an AWS Lambda function on PutObject" },
      { id: "b", text: "An EC2 cron job that lists new keys periodically" },
      { id: "c", text: "A Spot Fleet dedicated to scanning the bucket continuously" },
      { id: "d", text: "Amazon CloudFront as the upload trigger" },
    ],
    correct: ["a"],
    explanation:
      "S3 can emit events directly to Lambda, yielding event-driven, serverless processing with no idle polling infrastructure. Cron on EC2 and Spot scanning add operational overhead; CloudFront is not an S3 upload processing hook.",
    difficulty: "easy",
    services: ["s3","lambda"],
  },
  {
    id: "saa-d2-016",
    section: "d2-resilient",
    type: "single",
    prompt:
      "Private subnets in a multi-AZ VPC need outbound internet access that remains available when any single Availability Zone fails. How should NAT be architected?",
    options: [
      { id: "a", text: "Deploy one NAT gateway per AZ and route each private subnet to the NAT gateway in the same AZ" },
      { id: "b", text: "Share one NAT gateway across all AZs" },
      { id: "c", text: "Run a single NAT instance in one AZ for the whole VPC" },
      { id: "d", text: "Omit NAT because private subnets never need outbound internet" },
    ],
    correct: ["a"],
    explanation:
      "One NAT gateway lives in one AZ; if that zone fails, every private subnet depending on it loses egress. Per-AZ NAT gateways with local routes remove that cross-AZ dependency.",
    difficulty: "medium",
    services: ["vpc","nat-gateway"],
  },
  {
    id: "saa-d2-017",
    section: "d2-resilient",
    subtopic: "sqs",
    type: "single",
    prompt:
      "Background workers drain jobs from an Amazon SQS queue. How should fleet size track queue backlog efficiently?",
    options: [
      { id: "a", text: "Auto Scaling on ApproximateNumberOfMessages (queue depth) for the worker group" },
      { id: "b", text: "Keep a constant large worker pool running all day" },
      { id: "c", text: "Change capacity only on a fixed daily schedule" },
      { id: "d", text: "Consolidate processing onto one oversized instance" },
    ],
    correct: ["a"],
    explanation:
      "Scaling on visible queue depth adds workers when messages pile up and releases them when the queue empties, aligning spend with actual work. Fixed fleets waste money; time-only scaling ignores real backlog.",
    difficulty: "medium",
    services: ["sqs","ec2-auto-scaling"],
  },
  {
    id: "saa-d2-018",
    section: "d2-resilient",
    subtopic: "api-gateway",
    type: "single",
    prompt:
      "A product team needs a REST API that scales with traffic and requires no OS patching or server sizing decisions. Which stack aligns best?",
    options: [
      { id: "a", text: "Amazon API Gateway integrated with AWS Lambda" },
      { id: "b", text: "One always-on large EC2 instance" },
      { id: "c", text: "Self-managed EC2 behind a load balancer you operate" },
      { id: "d", text: "Amazon ECS on EC2 with customer-managed patching" },
    ],
    correct: ["a"],
    explanation:
      "API Gateway plus Lambda is fully managed and scales per request without maintaining instances. EC2 and ECS on EC2 leave patching and capacity planning with the customer.",
    difficulty: "easy",
    services: ["api-gateway","lambda"],
  },
  {
    id: "saa-d2-019",
    section: "d2-resilient",
    subtopic: "dynamodb",
    type: "single",
    prompt:
      "Users in multiple AWS Regions must read and write the same DynamoDB dataset with low latency, with changes replicated automatically between Regions. What feature should you enable?",
    options: [
      { id: "a", text: "DynamoDB global tables" },
      { id: "b", text: "A single-Region table plus manual snapshot copies" },
      { id: "c", text: "A single-Region table with read replicas (not applicable to DynamoDB)" },
      { id: "d", text: "Shared EBS volumes using Multi-Attach" },
    ],
    correct: ["a"],
    explanation:
      "Global tables provide multi-Region, multi-master replication with local reads and writes. Snapshot copying is batch-oriented; DynamoDB does not use RDS-style read replicas; EBS is block storage, not a multi-Region database layer.",
    difficulty: "medium",
    services: ["dynamodb"],
  },
  {
    id: "saa-d2-020",
    section: "d2-resilient",
    subtopic: "aurora",
    type: "single",
    prompt:
      "Which Aurora configuration enables automatic failover if the writer instance becomes unavailable?",
    options: [
      { id: "a", text: "Create Aurora Replicas in other Availability Zones to serve as failover targets" },
      { id: "b", text: "Run a single Aurora instance and rely on frequent snapshots" },
      { id: "c", text: "Place database files on a Multi-Attach EBS volume" },
      { id: "d", text: "Copy manual snapshots to another Region and restore manually" },
    ],
    correct: ["a"],
    explanation:
      "Aurora promotes an existing replica when the primary fails, minimizing outage time. Without replicas, Aurora must provision replacement capacity, which is slower; snapshots and EBS are not Aurora's HA failover mechanism.",
    difficulty: "medium",
    services: ["aurora","rds"],
  },
  {
    id: "saa-d2-021",
    section: "d2-resilient",
    subtopic: "ec2-ip",
    type: "single",
    prompt:
      "After you stop an EC2 instance and start it again, what typically happens to its automatically assigned public IPv4 address?",
    options: [
      { id: "a", text: "The old public IPv4 is released and a different one is assigned at start" },
      { id: "b", text: "The same public IPv4 is guaranteed forever" },
      { id: "c", text: "It converts into the instance private address" },
      { id: "d", text: "Networking is removed until you allocate a new ENI" },
    ],
    correct: ["a"],
    explanation:
      "Ephemeral public IPv4 addresses are not retained across stop/start cycles. Associate an Elastic IP when clients need a constant public address.",
    difficulty: "easy",
    services: ["ec2","vpc"],
  },
  {
    id: "saa-d2-022",
    section: "d2-resilient",
    subtopic: "ec2-ip",
    type: "single",
    prompt:
      "When an EC2 instance is stopped and later started, does its primary private IPv4 in the subnet usually change?",
    options: [
      { id: "a", text: "No — the private IPv4 generally remains the same for that instance in that subnet" },
      { id: "b", text: "Yes — a new private IPv4 is chosen on every start" },
      { id: "c", text: "Only when the instance also has a public IPv4 assigned" },
      { id: "d", text: "Only if AWS automatically moves the instance to another subnet" },
    ],
    correct: ["a"],
    explanation:
      "The primary private IP is tied to the instance ENI within its subnet and persists through stop/start. What changes on stop/start is typically the auto-assigned public IPv4, not the private address.",
    difficulty: "easy",
    services: ["ec2","vpc"],
  },
  {
    id: "saa-d2-023",
    section: "d2-resilient",
    subtopic: "ec2-ip",
    type: "single",
    prompt:
      "Which statement best describes an Elastic IP address in Amazon VPC?",
    options: [
      { id: "a", text: "A static public IPv4 allocated to your account that you can move between instances" },
      { id: "b", text: "A permanent private RFC1918 address inside the VPC" },
      { id: "c", text: "The default DNS hostname AWS assigns to an instance" },
      { id: "d", text: "The public endpoint of a Site-to-Site VPN tunnel" },
    ],
    correct: ["a"],
    explanation:
      "Elastic IPs are customer-owned static public IPv4 addresses designed to be remapped—for example during instance recovery or failover drills.",
    difficulty: "easy",
    services: ["ec2","vpc"],
  },
  {
    id: "saa-d2-024",
    section: "d2-resilient",
    subtopic: "ec2-ip",
    type: "single",
    prompt:
      "AWS guidance encourages limiting Elastic IPs on internet-facing apps. What pattern usually replaces per-instance Elastic IPs?",
    options: [
      { id: "a", text: "Front the fleet with a load balancer and publish DNS to the load balancer endpoint" },
      { id: "b", text: "Map a distinct Elastic IP to every backend instance" },
      { id: "c", text: "Hard-code each instance's changing public IPv4 in client applications" },
      { id: "d", text: "Expose a NAT gateway as the application's inbound entry point" },
    ],
    correct: ["a"],
    explanation:
      "Load balancers offer a stable DNS name and distribute requests across instances, so individual public IPs are unnecessary. NAT gateways provide outbound connectivity from private subnets, not inbound user traffic.",
    difficulty: "medium",
    services: ["ec2","elb"],
  },
  {
    id: "saa-d2-025",
    section: "d2-resilient",
    subtopic: "ec2-eni",
    type: "single",
    prompt:
      "In VPC terms, what is an Elastic Network Interface (ENI)?",
    options: [
      { id: "a", text: "A virtual network adapter that can carry private addresses, a MAC, and security groups" },
      { id: "b", text: "A durable block storage volume type" },
      { id: "c", text: "A Route 53 record that resolves to an instance" },
      { id: "d", text: "A managed Layer 7 load balancer resource" },
    ],
    correct: ["a"],
    explanation:
      "ENIs are logical NICs in a VPC subnet; they hold IP configuration and can have security groups applied before or after attachment to EC2.",
    difficulty: "easy",
    services: ["vpc","eni"],
  },
  {
    id: "saa-d2-026",
    section: "d2-resilient",
    subtopic: "ec2-eni",
    type: "single",
    prompt:
      "How might moving an ENI support a simple failover design?",
    options: [
      { id: "a", text: "Detach the ENI from a failed host and attach it to a warm standby so IP and MAC move with the interface" },
      { id: "b", text: "ENIs are permanently welded to the first instance and cannot be moved" },
      { id: "c", text: "Attach one ENI simultaneously to instances in two Regions" },
      { id: "d", text: "Rely on the ENI alone to encrypt all traffic without other configuration" },
    ],
    correct: ["a"],
    explanation:
      "Because network identity lives on the ENI, reattaching it to a standby in the same AZ lets the replacement inherit addresses clients already use.",
    difficulty: "medium",
    services: ["vpc","eni"],
  },
  {
    id: "saa-d2-027",
    section: "d2-resilient",
    subtopic: "ec2-eni",
    type: "single",
    prompt:
      "Is it possible for one EC2 instance to have more than one ENI attached?",
    options: [
      { id: "a", text: "Yes — multiple ENIs are supported up to limits based on instance type" },
      { id: "b", text: "No — exactly one ENI is always created and cannot be added to" },
      { id: "c", text: "Yes, but only on Windows Server AMIs" },
      { id: "d", text: "Yes, but only when the instance sits in a public subnet" },
    ],
    correct: ["a"],
    explanation:
      "Many instance types allow several ENIs, which supports designs like separate management and data interfaces on one host.",
    difficulty: "medium",
    services: ["vpc","eni"],
  },
  {
    id: "saa-d2-028",
    section: "d2-resilient",
    subtopic: "ec2-eni",
    type: "single",
    prompt:
      "Security group rules apply to instance traffic at which attachment point?",
    options: [
      { id: "a", text: "The Elastic Network Interface" },
      { id: "b", text: "The Amazon Machine Image metadata" },
      { id: "c", text: "The entire AWS Region" },
      { id: "d", text: "Individual IAM principals" },
    ],
    correct: ["a"],
    explanation:
      "Security groups bind to ENIs, filtering inbound and outbound traffic for whichever instance currently owns that interface.",
    difficulty: "medium",
    services: ["vpc","eni","security-groups"],
  },
  {
    id: "saa-d2-029",
    section: "d2-resilient",
    subtopic: "elb-types",
    type: "single",
    prompt:
      "An Application Load Balancer operates at which OSI layer, and what kinds of HTTP(S) routing decisions can it make?",
    options: [
      { id: "a", text: "Layer 7 — path, host header, and other HTTP attributes" },
      { id: "b", text: "Layer 4 — TCP and UDP ports only, no HTTP awareness" },
      { id: "c", text: "Layer 3 — IP addresses only" },
      { id: "d", text: "Layer 2 — Ethernet MAC addresses" },
    ],
    correct: ["a"],
    explanation:
      "ALBs terminate HTTP/HTTPS and route to target groups using application-layer criteria such as URL path and host name.",
    difficulty: "easy",
    services: ["elb","alb"],
  },
  {
    id: "saa-d2-030",
    section: "d2-resilient",
    subtopic: "elb-types",
    type: "single",
    prompt:
      "You expect millions of low-latency TCP or UDP connections per second and need a static IP address in each Availability Zone. Which Elastic Load Balancing option fits?",
    options: [
      { id: "a", text: "Network Load Balancer — ultra-low latency TCP/UDP at Layer 4" },
      { id: "b", text: "Application Load Balancer for HTTP content-based routing" },
      { id: "c", text: "Gateway Load Balancer for inline network appliances" },
      { id: "d", text: "Self-managed HAProxy on a single EC2 instance" },
    ],
    correct: ["a"],
    explanation:
      "NLBs handle extreme connection rates at Layer 4 and expose a stable IP per AZ (with optional Elastic IP association). ALBs target HTTP semantics; GWLB inserts appliances; one EC2 proxy is not managed ELB capacity.",
    difficulty: "medium",
    services: ["elb","nlb"],
  },
  {
    id: "saa-d2-031",
    section: "d2-resilient",
    subtopic: "elb-types",
    type: "single",
    prompt:
      "Security wants inline scaling of third-party virtual appliances—firewalls, IDS/IPS, and similar—without redesigning application endpoints. Which load balancer category is purpose-built for that?",
    options: [
      { id: "a", text: "Gateway Load Balancer — scale third-party virtual appliances" },
      { id: "b", text: "Application Load Balancer terminating HTTPS and routing by path" },
      { id: "c", text: "Network Load Balancer for raw TCP passthrough" },
      { id: "d", text: "Route 53 alone without a regional load balancer" },
    ],
    correct: ["a"],
    explanation:
      "Gateway Load Balancer transparently distributes flows through fleets of virtual appliances using GENEVE encapsulation. ALB and NLB serve application and TCP/UDP workloads; Route 53 is DNS, not an inline appliance chain.",
    difficulty: "medium",
    services: ["elb","gwlb"],
  },
  {
    id: "saa-d2-032",
    section: "d2-resilient",
    subtopic: "elb-types",
    type: "single",
    prompt:
      "HTTPS traffic must reach different microservice target groups depending on hostname and URL path. Which load balancer should you deploy?",
    options: [
      { id: "a", text: "Application Load Balancer with host/path rules" },
      { id: "b", text: "Network Load Balancer for millions of requests per second at Layer 4" },
      { id: "c", text: "Gateway Load Balancer deploying firewall or IDS appliances" },
      { id: "d", text: "NAT gateway" },
    ],
    correct: ["a"],
    explanation:
      "Content-based routing to multiple target groups over HTTP(S) is an ALB strength at Layer 7. NLB and GWLB do not perform host/path HTTP routing; NAT provides outbound translation, not inbound L7 switching.",
    difficulty: "easy",
    services: ["elb","alb"],
  },
  {
    id: "saa-d2-033",
    section: "d2-resilient",
    subtopic: "elb-types",
    type: "single",
    prompt:
      "What is the main job of an Elastic Load Balancer in a typical multi-instance application?",
    options: [
      { id: "a", text: "Spread client connections across healthy targets, commonly spanning several Availability Zones" },
      { id: "b", text: "Persist unstructured objects for later download" },
      { id: "c", text: "Encrypt data at rest on attached EBS volumes" },
      { id: "d", text: "Authoritative DNS hosting for public domain names" },
    ],
    correct: ["a"],
    explanation:
      "ELBs improve availability and scale by forwarding requests only to targets that pass health checks, often across AZs. They are not object storage, volume encryption, or DNS services.",
    difficulty: "easy",
    services: ["elb"],
  },
  {
    id: "saa-d2-034",
    section: "d2-resilient",
    subtopic: "elb-features",
    type: "single",
    prompt:
      "On an Elastic Load Balancer, what does enabling sticky sessions (session affinity) accomplish?",
    options: [
      { id: "a", text: "Routes repeat requests from the same client to the same target for a period, often using a cookie" },
      { id: "b", text: "Randomizes every request across all targets" },
      { id: "c", text: "Turns on TLS encryption between client and target automatically" },
      { id: "d", text: "Caches entire HTTP responses at CloudFront edge locations" },
    ],
    correct: ["a"],
    explanation:
      "Stickiness keeps a user on one backend so local session state remains valid, though external session stores are usually better for elastic fleets. It does not change encryption mode or edge caching behavior.",
    difficulty: "medium",
    services: ["elb"],
  },
  {
    id: "saa-d2-035",
    section: "d2-resilient",
    subtopic: "elb-features",
    type: "single",
    prompt:
      "When cross-zone load balancing is enabled on an Elastic Load Balancer, how is traffic handled across Availability Zones?",
    options: [
      { id: "a", text: "Each load balancer node can send requests to healthy targets in every registered AZ, balancing load globally" },
      { id: "b", text: "Automatically replicates application data between Regions" },
      { id: "c", text: "Forces all connections to stay within the AZ where the client first connected" },
      { id: "d", text: "Turns off target health checks to reduce overhead" },
    ],
    correct: ["a"],
    explanation:
      "Cross-zone balancing lets nodes use the full target pool across AZs, which helps when zones have uneven instance counts. It does not replicate data, isolate zones, or disable health checks.",
    difficulty: "medium",
    services: ["elb"],
  },
  {
    id: "saa-d2-036",
    section: "d2-resilient",
    subtopic: "elb-features",
    type: "single",
    prompt:
      "On an Elastic Load Balancer, what does the deregistration delay setting accomplish?",
    options: [
      { id: "a", text: "It allows active client sessions to complete before the target stops receiving new requests" },
      { id: "b", text: "It terminates every open connection the moment capacity shrinks" },
      { id: "c", text: "It enables TLS between the load balancer and backend targets" },
      { id: "d", text: "It keeps unused TCP connections warm in a pool" },
    ],
    correct: ["a"],
    explanation:
      "When a target is removed or marked unhealthy, deregistration delay (formerly connection draining) keeps serving existing requests for up to the configured timeout instead of cutting them off abruptly.",
    difficulty: "medium",
    services: ["elb"],
  },
  {
    id: "saa-d2-037",
    section: "d2-resilient",
    subtopic: "elb-features",
    type: "single",
    prompt:
      "Under normal operation, which backend instances receive new requests from a load balancer?",
    options: [
      { id: "a", text: "Only registered targets that report healthy in the configured health check" },
      { id: "b", text: "Every registered target, healthy or not" },
      { id: "c", text: "All targets in rotation, including those failing checks" },
      { id: "d", text: "Any private IP address discovered in the VPC" },
    ],
    correct: ["a"],
    explanation:
      "ELB health probes run on a schedule; the load balancer forwards new connections only to targets in a healthy state, steering around failures without manual intervention.",
    difficulty: "easy",
    services: ["elb"],
  },
  {
    id: "saa-d2-038",
    section: "d2-resilient",
    subtopic: "asg",
    type: "single",
    prompt:
      "Why would you attach EC2 instances to an Auto Scaling group?",
    options: [
      { id: "a", text: "To grow or shrink the fleet automatically while honoring minimum, maximum, and desired capacity settings" },
      { id: "b", text: "To spread HTTP requests across a pool of servers" },
      { id: "c", text: "To schedule automatic EBS snapshot creation" },
      { id: "d", text: "To turn on volume encryption by default" },
    ],
    correct: ["a"],
    explanation:
      "Auto Scaling maintains instance count within bounds, replaces failed nodes, and responds to scaling policies. Traffic distribution is the job of a load balancer, not the ASG itself.",
    difficulty: "easy",
    services: ["ec2-auto-scaling"],
  },
  {
    id: "saa-d2-039",
    section: "d2-resilient",
    subtopic: "asg",
    type: "single",
    prompt:
      "Your traffic spikes predictably each morning at 9:00. Which scaling mechanism fits that pattern?",
    options: [
      { id: "a", text: "Scheduled scaling — change capacity on a known timetable" },
      { id: "b", text: "Target tracking scaling — automatically chase a metric target" },
      { id: "c", text: "Scaling only through the console by hand" },
      { id: "d", text: "Spot Instance interruption workflows" },
    ],
    correct: ["a"],
    explanation:
      "Scheduled scaling adjusts capacity at fixed times you define. Target tracking follows a live metric such as CPU; you can use both together on the same group.",
    difficulty: "medium",
    services: ["ec2-auto-scaling"],
  },
  {
    id: "saa-d2-040",
    section: "d2-resilient",
    subtopic: "aurora",
    type: "single",
    prompt:
      "Which statement best describes Amazon Aurora?",
    options: [
      { id: "a", text: "A managed relational engine built for AWS with MySQL and PostgreSQL compatibility, elastic storage, and strong throughput" },
      { id: "b", text: "A schemaless document store for JSON workloads" },
      { id: "c", text: "An analytics warehouse for large-scale SQL reporting" },
      { id: "d", text: "A sub-millisecond key-value cache layer" },
    ],
    correct: ["a"],
    explanation:
      "Aurora is RDS's cloud-optimized relational database: compatible with popular open-source engines, with a distributed storage subsystem that scales and repairs itself automatically.",
    difficulty: "easy",
    services: ["aurora","rds"],
  },
  {
    id: "saa-d2-041",
    section: "d2-resilient",
    subtopic: "aurora",
    type: "single",
    prompt:
      "By default, how does Aurora's storage subsystem guard against data loss?",
    options: [
      { id: "a", text: "Six copies of each chunk spread across three Availability Zones" },
      { id: "b", text: "One replica stored in a single AZ" },
      { id: "c", text: "Reliance on operator-triggered snapshots alone" },
      { id: "d", text: "Replication limited to secondary Regions only" },
    ],
    correct: ["a"],
    explanation:
      "Aurora persists six redundant copies in three AZs within the Region and rebuilds from surviving copies if a failure occurs—no extra replication setup required.",
    difficulty: "medium",
    services: ["aurora"],
  },
  {
    id: "saa-d2-042",
    section: "d2-resilient",
    subtopic: "aurora",
    type: "single",
    prompt:
      "You need a primary Aurora cluster in one Region with read replicas in another Region and minimal replication lag. Which feature applies?",
    options: [
      { id: "a", text: "Aurora Global Database — cross-Region Aurora with fast secondary promotion" },
      { id: "b", text: "Aurora Serverless v2" },
      { id: "c", text: "Amazon RDS Proxy" },
      { id: "d", text: "Multi-AZ deployment in one Region only" },
    ],
    correct: ["a"],
    explanation:
      "Aurora Global Database streams storage to secondary Regions with typical lag under a second, supporting cross-Region disaster recovery and local read scaling.",
    difficulty: "medium",
    services: ["aurora"],
  },
  {
    id: "saa-d2-043",
    section: "d2-resilient",
    subtopic: "rds-security-proxy",
    type: "single",
    prompt:
      "What is the main reason to place Amazon RDS Proxy in front of an RDS database?",
    options: [
      { id: "a", text: "Multiplex many application connections onto a smaller set of database connections and smooth failovers" },
      { id: "b", text: "Replace the need for encryption of data on disk" },
      { id: "c", text: "Cache static assets at the edge worldwide" },
      { id: "d", text: "Provision read replicas without configuration" },
    ],
    correct: ["a"],
    explanation:
      "RDS Proxy pools connections to the DB engine, which helps bursty serverless workloads avoid exhausting connection limits and can reduce application impact during DB failover.",
    difficulty: "medium",
    services: ["rds","rds-proxy"],
  },
  {
    id: "saa-d2-044",
    section: "d2-resilient",
    subtopic: "rds-security-proxy",
    type: "single",
    prompt:
      "How do RDS automated backups differ from snapshots you take manually?",
    options: [
      { id: "a", text: "Automated backups are continuous within a retention period and support point-in-time restore; manual snapshots persist until you remove them" },
      { id: "b", text: "There is no practical difference between the two" },
      { id: "c", text: "Automated backups are kept forever by default" },
      { id: "d", text: "Point-in-time recovery is available only for manual snapshots" },
    ],
    correct: ["a"],
    explanation:
      "Automated backups enable restore to any second inside the retention window (max 35 days) and roll off when that window expires. Manual snapshots stay until deleted and are often used for long-term retention.",
    difficulty: "medium",
    services: ["rds"],
  },
  {
    id: "saa-d2-045",
    section: "d2-resilient",
    subtopic: "r53-basics",
    type: "single",
    prompt:
      "In networking terms, what role does DNS play?",
    options: [
      { id: "a", text: "It maps memorable hostnames to the numeric IP addresses clients use to connect" },
      { id: "b", text: "It balances HTTP requests across a fleet of servers" },
      { id: "c", text: "It inspects and blocks malicious traffic at the perimeter" },
      { id: "d", text: "It stores structured relational data for applications" },
    ],
    correct: ["a"],
    explanation:
      "DNS is the global naming layer: resolvers look up records so browsers and APIs can reach services by name instead of memorizing IP addresses.",
    difficulty: "easy",
    services: ["route-53"],
  },
  {
    id: "saa-d2-046",
    section: "d2-resilient",
    subtopic: "r53-basics",
    type: "single",
    prompt:
      "Which description matches Amazon Route 53?",
    options: [
      { id: "a", text: "AWS's authoritative DNS offering with hosted zones, registrar integration, health checks, and flexible routing" },
      { id: "b", text: "A global CDN for caching web content" },
      { id: "c", text: "A managed SQL database engine" },
      { id: "d", text: "A subnet routing table inside a VPC" },
    ],
    correct: ["a"],
    explanation:
      "Route 53 is a highly available DNS service: you host records, register domains, monitor endpoints, and apply routing policies beyond simple static answers.",
    difficulty: "easy",
    services: ["route-53"],
  },
  {
    id: "saa-d2-047",
    section: "d2-resilient",
    subtopic: "r53-basics",
    type: "single",
    prompt:
      "You want a DNS name to resolve to a 32-bit IPv4 address. Which record type do you create?",
    options: [
      { id: "a", text: "A record — map a name to an IPv4 address" },
      { id: "b", text: "AAAA record — map a name to an IPv6 address" },
      { id: "c", text: "CNAME record — alias one name to another name" },
      { id: "d", text: "MX record — mail exchanger hosts for email delivery" },
    ],
    correct: ["a"],
    explanation:
      "Type A records hold IPv4 addresses. AAAA is for IPv6, CNAME creates an alias to another name, and MX directs mail to specified hosts.",
    difficulty: "easy",
    services: ["route-53"],
  },
  {
    id: "saa-d2-048",
    section: "d2-resilient",
    subtopic: "r53-basics",
    type: "single",
    prompt:
      "When you set TTL on a Route 53 record, what behavior are you influencing?",
    options: [
      { id: "a", text: "How long downstream resolvers may reuse the answer before fetching an update" },
      { id: "b", text: "How long the record value stays encrypted in transit" },
      { id: "c", text: "The maximum runtime of an associated EC2 instance" },
      { id: "d", text: "The frequency of automatic health probe execution" },
    ],
    correct: ["a"],
    explanation:
      "TTL controls caching duration on resolvers and clients. Shorter TTLs mean faster propagation after changes but more queries to authoritative DNS.",
    difficulty: "easy",
    services: ["route-53"],
  },
  {
    id: "saa-d2-049",
    section: "d2-resilient",
    subtopic: "r53-basics",
    type: "single",
    prompt:
      "Your zone apex (example.com, not www) must target an Application Load Balancer, and standard CNAME rules forbid that at the root. What record type should you use?",
    options: [
      { id: "a", text: "A Route 53 Alias record pointing at the ALB" },
      { id: "b", text: "A CNAME at the apex" },
      { id: "c", text: "An MX record directing mail to mail servers" },
      { id: "d", text: "A TXT record only" },
    ],
    correct: ["a"],
    explanation:
      "Alias records are Route 53-specific extensions that can reference AWS targets (ALB, CloudFront, S3 website endpoints, etc.) at the zone apex where CNAME is not valid, without standard DNS query charges for the alias target.",
    difficulty: "medium",
    services: ["route-53","elb"],
  },
  {
    id: "saa-d2-050",
    section: "d2-resilient",
    subtopic: "r53-routing",
    type: "single",
    prompt:
      "Which Route 53 routing policy answers with configured values and does not apply health-based failover, weights, or latency logic?",
    options: [
      { id: "a", text: "Simple routing — a single record without health-based failover logic" },
      { id: "b", text: "Failover routing — primary/secondary records driven by health checks" },
      { id: "c", text: "Weighted routing — split traffic by assigned weights across records" },
      { id: "d", text: "Latency-based routing — send clients to the lowest-latency Region" },
    ],
    correct: ["a"],
    explanation:
      "Simple routing returns the record data as configured. If multiple values exist, resolvers may choose among them randomly—there is no built-in traffic engineering.",
    difficulty: "easy",
    services: ["route-53"],
  },
  {
    id: "saa-d2-051",
    section: "d2-resilient",
    subtopic: "r53-routing",
    type: "single",
    prompt:
      "For a canary launch you want roughly nine tenths of DNS responses aimed at production and one tenth at the new stack. Which policy fits?",
    options: [
      { id: "a", text: "Weighted routing — split traffic by assigned weights across records" },
      { id: "b", text: "Latency-based routing — send clients to the lowest-latency Region" },
      { id: "c", text: "Geolocation routing — answer based on the user's geographic location" },
      { id: "d", text: "Simple routing — a single record without health-based failover logic" },
    ],
    correct: ["a"],
    explanation:
      "Weighted routing assigns numeric weights so Route 53 distributes queries proportionally—well suited to gradual rollouts and A/B style experiments.",
    difficulty: "medium",
    services: ["route-53"],
  },
  {
    id: "saa-d2-052",
    section: "d2-resilient",
    subtopic: "r53-routing",
    type: "single",
    prompt:
      "Regulations require users in specific countries to hit different endpoints (localized content or data residency). Which routing policy should you choose?",
    options: [
      { id: "a", text: "Geolocation routing — answer based on the user's geographic location" },
      { id: "b", text: "Latency-based routing — send clients to the lowest-latency Region" },
      { id: "c", text: "Weighted routing — split traffic by assigned weights across records" },
      { id: "d", text: "Multivalue answer routing — return multiple healthy IPs roughly like round-robin" },
    ],
    correct: ["a"],
    explanation:
      "Geolocation routing selects answers based on the querier's geographic location. Latency routing optimizes round-trip time, not legal or regional targeting.",
    difficulty: "medium",
    services: ["route-53"],
  },
  {
    id: "saa-d2-053",
    section: "d2-resilient",
    subtopic: "r53-routing",
    type: "single",
    prompt:
      "You want DNS to return several healthy IP addresses so clients can spread load themselves, understanding this is not a substitute for an ELB. Which policy applies?",
    options: [
      { id: "a", text: "Multivalue answer routing — return multiple healthy IPs roughly like round-robin" },
      { id: "b", text: "Simple routing — a single record without health-based failover logic" },
      { id: "c", text: "Failover routing — primary/secondary records driven by health checks" },
      { id: "d", text: "Geoproximity routing — bias traffic by distance to AWS resources" },
    ],
    correct: ["a"],
    explanation:
      "Multivalue answer returns up to eight healthy records when health checks pass, enabling basic client-side randomization without ELB-level connection management or advanced routing.",
    difficulty: "medium",
    services: ["route-53"],
  },
  {
    id: "saa-d2-054",
    section: "d2-resilient",
    subtopic: "r53-health",
    type: "single",
    prompt:
      "Why configure Route 53 health checks on your records or endpoints?",
    options: [
      { id: "a", text: "To detect unhealthy targets and steer DNS responses toward healthy alternatives, such as in active-passive setups" },
      { id: "b", text: "To encrypt all DNS traffic end to end" },
      { id: "c", text: "To extend TTL values automatically on every query" },
      { id: "d", text: "To purchase and register new domain names" },
    ],
    correct: ["a"],
    explanation:
      "Health checks probe endpoints or derived signals so routing policies—especially failover—can stop advertising failed resources and keep users on working infrastructure.",
    difficulty: "easy",
    services: ["route-53"],
  },
  {
    id: "saa-d2-055",
    section: "d2-resilient",
    subtopic: "r53-health",
    type: "single",
    prompt:
      "Which combinations represent supported Route 53 health check designs?",
    options: [
      { id: "a", text: "Direct endpoint checks (HTTP, HTTPS, or TCP), calculated checks built from other checks, or checks tied to a CloudWatch alarm state" },
      { id: "b", text: "ICMP ping exclusively" },
      { id: "c", text: "S3 bucket polling only" },
      { id: "d", text: "IAM user credential validation only" },
    ],
    correct: ["a"],
    explanation:
      "Route 53 can probe public endpoints, aggregate child check results, or treat a CloudWatch alarm as the health signal—ICMP-only or IAM-based checks are not the model here.",
    difficulty: "medium",
    services: ["route-53"],
  },
  {
    id: "saa-d2-056",
    section: "d2-resilient",
    subtopic: "r53-health",
    type: "single",
    prompt:
      "In a typical active-passive DNS design using Route 53 failover routing, how do health checks affect the answer?",
    options: [
      { id: "a", text: "While the primary record's check succeeds, clients get the primary; after failure, the secondary record is returned" },
      { id: "b", text: "DNS resolution is disabled for the entire zone" },
      { id: "c", text: "Auto Scaling launches replacement EC2 instances automatically" },
      { id: "d", text: "Route 53 raises TTL on the failing record without changing the target" },
    ],
    correct: ["a"],
    explanation:
      "Failover pairs primary and secondary records; the primary's health check gates which set of targets Route 53 includes in responses until recovery.",
    difficulty: "medium",
    services: ["route-53"],
  },
  {
    id: "saa-d2-057",
    section: "d2-resilient",
    subtopic: "r53-health",
    type: "single",
    prompt:
      "Standard Route 53 endpoint health checks need a publicly reachable URL or IP. How can you reflect the health of a private-only workload in DNS?",
    options: [
      { id: "a", text: "Create a health check that tracks an Amazon CloudWatch alarm on a relevant metric" },
      { id: "b", text: "Private resources cannot participate in any health check" },
      { id: "c", text: "Attach a NAT gateway directly to the health check configuration" },
      { id: "d", text: "Bind an IAM role to the DNS record itself" },
    ],
    correct: ["a"],
    explanation:
      "Because Route 53 cannot probe private IPs directly, publish a CloudWatch metric or alarm from the workload and link a CloudWatch-based health check to drive routing decisions.",
    difficulty: "hard",
    services: ["route-53","cloudwatch"],
  },
  {
    id: "saa-d2-058",
    section: "d2-resilient",
    subtopic: "r53-hybrid",
    type: "single",
    prompt:
      "What is Route 53 Resolver in the context of a VPC?",
    options: [
      { id: "a", text: "The built-in DNS resolver that answers queries from VPC resources and can integrate with on-premises name servers" },
      { id: "b", text: "An application load balancing tier" },
      { id: "c", text: "Amazon CloudFront's edge caching layer" },
      { id: "d", text: "A JDBC connection pool for RDS" },
    ],
    correct: ["a"],
    explanation:
      "Every VPC includes Route 53 Resolver at the AmazonProvidedDNS address; with inbound/outbound endpoints and rules you can forward or receive queries across hybrid networks.",
    difficulty: "medium",
    services: ["route-53"],
  },
  {
    id: "saa-d2-059",
    section: "d2-resilient",
    subtopic: "r53-hybrid",
    type: "single",
    prompt:
      "On-premises resolvers must look up private hosted zone names that live in your VPC. Which Resolver component do you deploy?",
    options: [
      { id: "a", text: "Route 53 Resolver inbound endpoint — on-prem DNS queries into the VPC" },
      { id: "b", text: "Route 53 Resolver outbound endpoint — VPC DNS queries to on-prem resolvers" },
      { id: "c", text: "A NAT gateway in a public subnet" },
      { id: "d", text: "VPC peering alone, with no Resolver endpoint" },
    ],
    correct: ["a"],
    explanation:
      "Inbound endpoints accept DNS queries forwarded from your data center into the VPC so Resolver can answer names defined in AWS-hosted zones.",
    difficulty: "hard",
    services: ["route-53"],
  },
  {
    id: "saa-d2-060",
    section: "d2-resilient",
    subtopic: "r53-hybrid",
    type: "single",
    prompt:
      "EC2 instances in a VPC need to resolve hostnames that exist only on corporate DNS servers. Which Resolver resource forwards those queries out of AWS?",
    options: [
      { id: "a", text: "A Route 53 Resolver outbound endpoint paired with forwarding rules" },
      { id: "b", text: "Route 53 Resolver inbound endpoint — on-prem DNS queries into the VPC" },
      { id: "c", text: "An internet gateway attached to the VPC" },
      { id: "d", text: "A CloudFront distribution for cached HTTP delivery at the edge" },
    ],
    correct: ["a"],
    explanation:
      "Outbound endpoints send matching queries from the VPC to on-premises resolvers according to resolver rules you define for specific domains.",
    difficulty: "hard",
    services: ["route-53"],
  },
  {
    id: "saa-d2-061",
    section: "d2-resilient",
    subtopic: "arch-patterns",
    type: "single",
    prompt:
      "A stateless web tier must elasticly add capacity and keep serving if one Availability Zone goes down. Which architecture is the usual answer?",
    options: [
      { id: "a", text: "Application Load Balancer fronting a multi-AZ Auto Scaling group of interchangeable instances" },
      { id: "b", text: "One oversized EC2 instance with a static Elastic IP" },
      { id: "c", text: "Separate manual failover scripts between single instances per AZ" },
      { id: "d", text: "Application state stored only on instance store disks" },
    ],
    correct: ["a"],
    explanation:
      "ALB plus a multi-AZ ASG and stateless app servers is the standard resilient web pattern. Singletons, manual failover, and local ephemeral storage undermine availability and scale.",
    difficulty: "easy",
    services: ["elb","ec2-auto-scaling"],
  },
  {
    id: "saa-d2-062",
    section: "d2-resilient",
    subtopic: "arch-patterns",
    type: "single",
    prompt:
      "When Auto Scaling adds instances, they should boot ready to serve traffic within minutes. What practice best achieves that?",
    options: [
      { id: "a", text: "Launch from a hardened AMI with the application baked in, using User Data only for light per-launch tweaks" },
      { id: "b", text: "Log in over SSH after each launch to install packages by hand" },
      { id: "c", text: "Open a support ticket asking AWS to configure software" },
      { id: "d", text: "Always pick a bigger instance family instead of automating setup" },
    ],
    correct: ["a"],
    explanation:
      "Golden AMIs shorten boot time and reduce drift; User Data can apply environment-specific settings. Manual SSH setup does not keep pace with dynamic scaling events.",
    difficulty: "medium",
    services: ["ec2","ami"],
  },
  {
    id: "saa-d2-063",
    section: "d2-resilient",
    subtopic: "arch-patterns",
    type: "single",
    prompt:
      "You must clone a production RDS database into another Region for integration testing with minimal delay. What is the quickest reliable path?",
    options: [
      { id: "a", text: "Copy the snapshot to the destination Region if needed, then restore a new DB instance from that snapshot" },
      { id: "b", text: "Install a fresh database engine and reload every row manually" },
      { id: "c", text: "Copy files from instance store volumes over the network" },
      { id: "d", text: "Re-enter production data record by record" },
    ],
    correct: ["a"],
    explanation:
      "RDS snapshots capture a consistent image; cross-Region snapshot copy plus restore is far faster and less error-prone than rebuilding schema and data by hand.",
    difficulty: "medium",
    services: ["rds"],
  },
  {
    id: "saa-d2-064",
    section: "d2-resilient",
    subtopic: "beanstalk",
    type: "single",
    prompt:
      "How should you characterize AWS Elastic Beanstalk?",
    options: [
      { id: "a", text: "A managed PaaS that wires up EC2, scaling, and load balancing from your deployable application artifact" },
      { id: "b", text: "A fully managed wide-column NoSQL database" },
      { id: "c", text: "A global edge caching network" },
      { id: "d", text: "A standalone authoritative DNS product unrelated to compute" },
    ],
    correct: ["a"],
    explanation:
      "Elastic Beanstalk abstracts infrastructure assembly: you supply code or bundles, and it orchestrates capacity, load balancing, and health management behind the scenes.",
    difficulty: "easy",
    services: ["elastic-beanstalk"],
  },
  {
    id: "saa-d2-065",
    section: "d2-resilient",
    subtopic: "beanstalk",
    type: "single",
    prompt:
      "Who operates the EC2 instances, load balancers, and Auto Scaling resources that Beanstalk creates?",
    options: [
      { id: "a", text: "Beanstalk creates and manages them on your behalf, while they remain visible and controllable in your AWS account" },
      { id: "b", text: "AWS runs them in a hidden account you cannot inspect" },
      { id: "c", text: "You must provision every underlying resource manually before Beanstalk will accept an app" },
      { id: "d", text: "An external MSP outside AWS owns those resources" },
    ],
    correct: ["a"],
    explanation:
      "Beanstalk automates lifecycle tasks, but the stack is standard AWS resources in your account—you can still open the EC2 console, change settings, or attach other services.",
    difficulty: "medium",
    services: ["elastic-beanstalk"],
  },
  {
    id: "saa-d2-066",
    section: "d2-resilient",
    subtopic: "beanstalk",
    type: "single",
    prompt:
      "Which situation is the strongest match for choosing Elastic Beanstalk?",
    options: [
      { id: "a", text: "A team wants to ship a web application to AWS quickly without hand-building ASG, ELB, and deployment plumbing" },
      { id: "b", text: "You require bespoke control over every low-level resource with no abstraction" },
      { id: "c", text: "The workload is purely static objects in object storage" },
      { id: "d", text: "You need a fully managed Kubernetes control plane (EKS)" },
    ],
    correct: ["a"],
    explanation:
      "Beanstalk suits developers prioritizing speed over manual IaC for classic web stacks. EKS covers Kubernetes; raw EC2 or CloudFormation fits maximal control; S3 alone covers static sites.",
    difficulty: "easy",
    services: ["elastic-beanstalk"],
  },
  {
    id: "saa-d2-067",
    section: "d2-resilient",
    subtopic: "beanstalk",
    type: "single",
    prompt:
      "Which capabilities does Elastic Beanstalk include out of the box?",
    options: [
      { id: "a", text: "Multiple language runtimes, managed application version deployments, environment health views, and rollback to prior versions" },
      { id: "b", text: "Hosting static HTML exclusively with no compute" },
      { id: "c", text: "Windows-only application servers with no Linux option" },
      { id: "d", text: "Provisioning RDS as the sole supported workload" },
    ],
    correct: ["a"],
    explanation:
      "Beanstalk supports several platforms (Node.js, Python, Java, .NET, etc.) and handles rolling deployments, monitoring, and reverting to earlier application versions.",
    difficulty: "medium",
    services: ["elastic-beanstalk"],
  },
  {
    id: "saa-d2-068",
    section: "d2-resilient",
    subtopic: "s3-replication",
    type: "single",
    prompt:
      "Before configuring S3 Cross-Region or Same-Region Replication, what bucket setting is mandatory?",
    options: [
      { id: "a", text: "Object versioning enabled on the source bucket (and on the destination bucket)" },
      { id: "b", text: "Public read access on all objects" },
      { id: "c", text: "No configuration—replication is implicit for every bucket" },
      { id: "d", text: "Both buckets must reside in the same Availability Zone" },
    ],
    correct: ["a"],
    explanation:
      "Replication rules require versioning on source and destination buckets plus an IAM role authorizing S3 to copy objects. Public access and same-AZ placement are not prerequisites.",
    difficulty: "medium",
    services: ["s3"],
  },
  {
    id: "saa-d2-069",
    section: "d2-resilient",
    subtopic: "s3-replication",
    type: "single",
    prompt:
      "How do Cross-Region Replication (CRR) and Same-Region Replication (SRR) differ in destination placement?",
    options: [
      { id: "a", text: "CRR targets a bucket in a different AWS Region; SRR targets another bucket in the same Region as the source" },
      { id: "b", text: "They behave identically in all cases" },
      { id: "c", text: "CRR copies objects only within one Availability Zone" },
      { id: "d", text: "SRR is restricted to cross-account scenarios only" },
    ],
    correct: ["a"],
    explanation:
      "CRR spans Regions for disaster recovery, compliance, or regional read locality. SRR keeps copies inside one Region—for example aggregating logs or separating accounts.",
    difficulty: "medium",
    services: ["s3"],
  },
  {
    id: "saa-d2-070",
    section: "d2-resilient",
    subtopic: "s3-replication",
    type: "single",
    prompt:
      "Which goal aligns well with enabling S3 Cross-Region Replication?",
    options: [
      { id: "a", text: "Maintaining a secondary copy in another Region for disaster recovery, compliance, or faster reads for users there" },
      { id: "b", text: "Eliminating all S3 storage charges" },
      { id: "c", text: "Turning on server-side encryption as the only step" },
      { id: "d", text: "Activating versioning without any replication rule" },
    ],
    correct: ["a"],
    explanation:
      "CRR duplicates objects geographically to support failover, regulatory placement, and serving audiences closer to a remote Region. It does not remove cost, enable encryption by itself, or replace versioning setup.",
    difficulty: "easy",
    services: ["s3"],
  },
  {
    id: "saa-d2-071",
    section: "d2-resilient",
    subtopic: "s3-replication",
    type: "single",
    prompt:
      "After you turn on S3 cross-region or same-region replication, are objects that were already in the bucket before replication was configured copied automatically?",
    options: [
      { id: "a", text: "No — replication is forward-looking; backfill pre-existing keys with S3 Batch Replication" },
      { id: "b", text: "Yes — the service immediately syncs every object that was already stored" },
      { id: "c", text: "Yes, but only after it removes the older copies first" },
      { id: "d", text: "Only when the source bucket allows anonymous public reads" },
    ],
    correct: ["a"],
    explanation:
      "Replication rules apply to objects created or changed after the rule exists. Inventory that predates the rule stays put until you run S3 Batch Replication (or copy it another way). Options b–d misunderstand scope, deletion behavior, or public-access requirements.",
    difficulty: "hard",
    services: ["s3"],
  },
  {
    id: "saa-d2-072",
    section: "d2-resilient",
    subtopic: "s3-events-perf",
    type: "single",
    prompt:
      "Which AWS targets can S3 send event notifications to when bucket activity occurs?",
    options: [
      { id: "a", text: "Amazon SNS topics, Amazon SQS queues, AWS Lambda functions, and Amazon EventBridge" },
      { id: "b", text: "SMTP inboxes as the sole supported destination" },
      { id: "c", text: "Amazon CloudFront distributions exclusively" },
      { id: "d", text: "Amazon RDS instances exclusively" },
    ],
    correct: ["a"],
    explanation:
      "S3 can emit object-level events to SNS, SQS, Lambda, and EventBridge so downstream systems react without polling the bucket. Email-only, CloudFront-only, and RDS-only choices are not valid S3 notification endpoints.",
    difficulty: "easy",
    services: ["s3","sns","sqs","lambda"],
  },
  {
    id: "saa-d2-073",
    section: "d2-resilient",
    subtopic: "s3-events-perf",
    type: "single",
    prompt:
      "Your pipeline should run one Lambda for PDFs under reports/ and another for PNGs anywhere in the bucket. What is the most appropriate S3 integration pattern?",
    options: [
      { id: "a", text: "Configure S3 event notifications or EventBridge rules with prefix and suffix filters so each pattern invokes the right target" },
      { id: "b", text: "S3 cannot limit events by object key pattern" },
      { id: "c", text: "Attach an IAM bucket policy that executes application code" },
      { id: "d", text: "Define lifecycle transitions to branch processing logic" },
    ],
    correct: ["a"],
    explanation:
      "Notification configurations support prefix/suffix filters, and EventBridge can apply richer event patterns—so different key shapes can fan out to different workers. Bucket policies authorize access; lifecycle rules manage storage class transitions, not event routing.",
    difficulty: "medium",
    services: ["s3","eventbridge"],
  },
  {
    id: "saa-d2-074",
    section: "d2-resilient",
    subtopic: "sqs",
    type: "single",
    prompt:
      "In Amazon SQS, what does the visibility timeout control?",
    options: [
      { id: "a", text: "How long a message stays hidden from other consumers after one worker receives it; if it is not deleted before the timer expires, it becomes available again" },
      { id: "b", text: "The automatic purge interval that removes messages from the queue" },
      { id: "c", text: "The upper bound on payload size for a single message" },
      { id: "d", text: "The minimum delay between ReceiveMessage API calls" },
    ],
    correct: ["a"],
    explanation:
      "Visibility timeout prevents duplicate processing while a consumer works on a message. Failure to delete within that window returns the message to the pool for retry. It is unrelated to retention TTL, size limits, or poll frequency.",
    difficulty: "medium",
    services: ["sqs"],
  },
  {
    id: "saa-d2-075",
    section: "d2-resilient",
    subtopic: "sqs",
    type: "single",
    prompt:
      "Why enable long polling on an SQS queue instead of relying on short polling?",
    options: [
      { id: "a", text: "ReceiveMessage can block up to the wait time for messages to arrive, which cuts empty responses and reduces request charges" },
      { id: "b", text: "Messages are removed from the queue sooner after processing" },
      { id: "c", text: "FIFO ordering is enforced across all queue types" },
      { id: "d", text: "Server-side encryption is applied automatically to every body" },
    ],
    correct: ["a"],
    explanation:
      "Long polling holds the receive call until a message appears or the wait window ends, so workers make fewer empty polls than with immediate-return short polling. It does not change delete semantics, ordering guarantees, or encryption defaults.",
    difficulty: "medium",
    services: ["sqs"],
  },
  {
    id: "saa-d2-076",
    section: "d2-resilient",
    subtopic: "sns",
    type: "single",
    prompt:
      "Which statement best describes Amazon SNS?",
    options: [
      { id: "a", text: "Managed publish/subscribe: producers publish to a topic and SNS delivers copies to subscribers such as SQS, Lambda, HTTP/S endpoints, email, and SMS" },
      { id: "b", text: "A durable work queue where each message is read and removed by a single consumer" },
      { id: "c", text: "A shard-based stream that retains records for replay by many readers" },
      { id: "d", text: "A managed SQL database for transactional workloads" },
    ],
    correct: ["a"],
    explanation:
      "SNS fans out push notifications to every subscriber on a topic. SQS is pull-based with single-consumer semantics per delivery; Kinesis is streaming; RDS is relational storage—not pub/sub messaging.",
    difficulty: "easy",
    services: ["sns"],
  },
  {
    id: "saa-d2-077",
    section: "d2-resilient",
    subtopic: "sns",
    type: "single",
    prompt:
      "You publish one event to an SNS topic that has three SQS queues subscribed. What delivery behavior should you expect?",
    options: [
      { id: "a", text: "Each queue gets its own duplicate of the message so teams can process it independently" },
      { id: "b", text: "SNS picks one queue at random and delivers only there" },
      { id: "c", text: "The first subscriber consumes the message and others see nothing" },
      { id: "d", text: "SNS writes the payload straight into a single S3 object and skips the queues" },
    ],
    correct: ["a"],
    explanation:
      "SNS fan-out replicates the notification to every subscribed endpoint. That is why multiple SQS queues can each buffer the same event for separate microservices. Single-winner delivery describes queue semantics, not SNS broadcasting.",
    difficulty: "medium",
    services: ["sns","sqs"],
  },
  {
    id: "saa-d2-078",
    section: "d2-resilient",
    subtopic: "sns",
    type: "single",
    prompt:
      "Which endpoints can subscribe to an Amazon SNS topic?",
    options: [
      { id: "a", text: "Amazon SQS queues, AWS Lambda, HTTP/HTTPS URLs, email, SMS, and mobile push endpoints" },
      { id: "b", text: "Verified email addresses only" },
      { id: "c", text: "Standard SQS queues only" },
      { id: "d", text: "EC2 instances registered as hosts only" },
    ],
    correct: ["a"],
    explanation:
      "SNS supports a wide protocol mix for notifications and integration. Restricting subscriptions to email-only, SQS-only, or raw EC2 registration does not match the service model—HTTP/S and Lambda are common patterns too.",
    difficulty: "easy",
    services: ["sns"],
  },
  {
    id: "saa-d2-079",
    section: "d2-resilient",
    subtopic: "sns",
    type: "single",
    prompt:
      "How do Amazon SNS and Amazon SQS differ in interaction style?",
    options: [
      { id: "a", text: "SNS pushes one publication to many subscribers; SQS stores messages until consumers pull them from a queue" },
      { id: "b", text: "They are the same product with different names" },
      { id: "c", text: "SNS keeps messages until workers explicitly dequeue them" },
      { id: "d", text: "SQS implements topic-based publish/subscribe fan-out" },
    ],
    correct: ["a"],
    explanation:
      "Push fan-out versus pull buffering is the core distinction. Teams often chain them—SNS to multiple SQS queues—but the services are not interchangeable, and SQS is not a pub/sub broker.",
    difficulty: "medium",
    services: ["sns","sqs"],
  },
  {
    id: "saa-d2-080",
    section: "d2-resilient",
    subtopic: "messaging-choice",
    type: "single",
    prompt:
      "Match each need to the right AWS messaging/streaming service: (1) decoupled job queue with competing consumers, (2) broadcast to many subscribers, (3) shared stream with replay.",
    options: [
      { id: "a", text: "(1) Amazon SQS queue, (2) Amazon SNS pub/sub fan-out, (3) Amazon Kinesis Data Streams with replay" },
      { id: "b", text: "Any of the three can satisfy all three patterns equally" },
      { id: "c", text: "(1) Kinesis, (2) SQS, (3) SNS" },
      { id: "d", text: "(1) SNS, (2) SQS with long polling, (3) Amazon MQ" },
    ],
    correct: ["a"],
    explanation:
      "SQS buffers tasks for competing consumers; SNS multicasts events; Kinesis retains ordered shards for multiple independent readers within retention. Swapping roles or claiming interchangeability misses those design centers.",
    difficulty: "medium",
    services: ["sqs","sns","kinesis"],
  },
  {
    id: "saa-d2-081",
    section: "d2-resilient",
    subtopic: "messaging-choice",
    type: "single",
    prompt:
      "Under what circumstance is Amazon MQ a better fit than SQS or SNS?",
    options: [
      { id: "a", text: "You are lifting a legacy application that already speaks AMQP, MQTT, or JMS and you want to avoid rewriting clients for native AWS APIs" },
      { id: "b", text: "You need the highest theoretical throughput for a greenfield serverless design" },
      { id: "c", text: "You primarily need durable object storage with lifecycle tiers" },
      { id: "d", text: "You need authoritative DNS hosting for public hostnames" },
    ],
    correct: ["a"],
    explanation:
      "Amazon MQ hosts ActiveMQ/RabbitMQ-compatible brokers for protocol compatibility during migration. New cloud-native apps usually standardize on SQS/SNS. S3 and Route 53 solve unrelated problems.",
    difficulty: "medium",
    services: ["amazon-mq"],
  },
  {
    id: "saa-d2-082",
    section: "d2-resilient",
    subtopic: "messaging-choice",
    type: "single",
    prompt:
      "Telemetry must land in Amazon S3, Amazon Redshift, or Amazon OpenSearch Service with almost no operational overhead and no custom consumer fleet. Which service should ingest the stream?",
    options: [
      { id: "a", text: "Data Firehose — load streaming data into S3, Redshift, or similar sinks" },
      { id: "b", text: "Amazon Kinesis Data Streams with self-managed consumers" },
      { id: "c", text: "SQS as a pull-based work queue" },
      { id: "d", text: "SNS push notifications to many subscribers" },
    ],
    correct: ["a"],
    explanation:
      "Firehose is a fully managed delivery pipeline to supported destinations. Data Streams gives control but expects you to run scaling consumers. SQS and SNS are messaging, not managed ETL into analytics stores.",
    difficulty: "medium",
    services: ["kinesis","firehose"],
  },
  {
    id: "saa-d2-083",
    section: "d2-resilient",
    subtopic: "messaging-choice",
    type: "single",
    prompt:
      "Several analytics jobs must read identical events and reprocess history during the retention period. Which AWS service supports that model?",
    options: [
      { id: "a", text: "Kinesis Data Streams for ordered shards of streaming data" },
      { id: "b", text: "SQS standard queue — high throughput with at-least-once delivery" },
      { id: "c", text: "SQS FIFO queue — exactly-once processing with ordered messages" },
      { id: "d", text: "SNS topics for fan-out messaging" },
    ],
    correct: ["a"],
    explanation:
      "Kinesis shards retain records so multiple consumers can read the same data and rewind within retention. SQS deletes a message after successful processing; SNS broadcasts but does not offer shard replay semantics.",
    difficulty: "medium",
    services: ["kinesis","sqs"],
  },
  {
    id: "saa-d2-084",
    section: "d2-resilient",
    subtopic: "ecs-fargate",
    type: "single",
    prompt:
      "In container terminology, what role does Docker play?",
    options: [
      { id: "a", text: "It bundles an application and its dependencies into lightweight, portable units that behave consistently across laptops, data centers, and cloud" },
      { id: "b", text: "It is a family of EC2 instance sizes optimized for batch jobs" },
      { id: "c", text: "It is a proprietary relational engine from AWS" },
      { id: "d", text: "It distributes HTTP traffic across targets in multiple Availability Zones" },
    ],
    correct: ["a"],
    explanation:
      "Docker (and the OCI ecosystem) standardizes packaging and runtime isolation for containers. AWS runs those containers through ECS, EKS, and Fargate—it is not compute sizing, SQL, or load balancing by itself.",
    difficulty: "easy",
    services: ["docker"],
  },
  {
    id: "saa-d2-085",
    section: "d2-resilient",
    subtopic: "ecs-fargate",
    type: "single",
    prompt:
      "What capability does Amazon ECS provide?",
    options: [
      { id: "a", text: "AWS-managed orchestration that schedules Docker containers as tasks and long-running services with scaling and placement control" },
      { id: "b", text: "Bare-metal hypervisor software you install on premises" },
      { id: "c", text: "Unlimited object storage with versioning and lifecycle policies" },
      { id: "d", text: "Global edge caching for static and dynamic content" },
    ],
    correct: ["a"],
    explanation:
      "ECS is the AWS-native control plane for container workloads on EC2 or Fargate capacity. It is not a hypervisor product, S3, or CloudFront.",
    difficulty: "easy",
    services: ["ecs"],
  },
  {
    id: "saa-d2-086",
    section: "d2-resilient",
    subtopic: "ecs-fargate",
    type: "single",
    prompt:
      "How does running tasks on ECS with the EC2 launch type compare to using AWS Fargate?",
    options: [
      { id: "a", text: "EC2 launch type places containers on instances you operate; Fargate abstracts away the host fleet and bills per task vCPU/memory" },
      { id: "b", text: "There is no practical difference in who manages infrastructure" },
      { id: "c", text: "Fargate still requires you to patch and scale the underlying EC2 Auto Scaling group" },
      { id: "d", text: "The EC2 launch type is serverless and never exposes instances" },
    ],
    correct: ["a"],
    explanation:
      "EC2 launch type means you own AMI updates, capacity planning, and cluster scaling. Fargate provisions isolation per task without a visible instance layer. The other options invert those responsibilities.",
    difficulty: "medium",
    services: ["ecs","fargate"],
  },
  {
    id: "saa-d2-087",
    section: "d2-resilient",
    subtopic: "ecr-eks",
    type: "single",
    prompt:
      "What is the primary purpose of Amazon ECR?",
    options: [
      { id: "a", text: "A private, fully managed registry for storing, scanning, and versioning Docker/OCI container images" },
      { id: "b", text: "A scheduler that decides where pods or tasks should run" },
      { id: "c", text: "An OLTP database for transactional web apps" },
      { id: "d", text: "A worldwide CDN for caching HTTP responses" },
    ],
    correct: ["a"],
    explanation:
      "ECR holds image artifacts that ECS and EKS pull during deployments. Orchestration, relational data, and CDN caching are separate services.",
    difficulty: "easy",
    services: ["ecr"],
  },
  {
    id: "saa-d2-088",
    section: "d2-resilient",
    subtopic: "ecr-eks",
    type: "single",
    prompt:
      "Which description fits Amazon EKS?",
    options: [
      { id: "a", text: "A managed Kubernetes control plane so you can run standard Kubernetes workloads on AWS" },
      { id: "b", text: "AWS-only container orchestration that rejects the Kubernetes API" },
      { id: "c", text: "An event-driven function runtime with sub-second billing" },
      { id: "d", text: "Durable storage for unstructured files and static assets" },
    ],
    correct: ["a"],
    explanation:
      "EKS runs conformant Kubernetes with AWS managing the control plane. ECS is the non-Kubernetes alternative; Lambda is functions; S3 is object storage.",
    difficulty: "easy",
    services: ["eks"],
  },
  {
    id: "saa-d2-089",
    section: "d2-resilient",
    subtopic: "ecr-eks",
    type: "single",
    prompt:
      "When is Amazon EKS preferable to Amazon ECS for container workloads?",
    options: [
      { id: "a", text: "Your organization standardizes on Kubernetes APIs, tooling, and multi-cloud portability" },
      { id: "b", text: "You want the leanest AWS-specific path with no Kubernetes control plane to maintain" },
      { id: "c", text: "The workload is primarily large binary objects with infrequent access" },
      { id: "d", text: "You need to register domain names and health-check endpoints" },
    ],
    correct: ["a"],
    explanation:
      "Choose EKS when Kubernetes compatibility and ecosystem investments matter. ECS often wins for simpler AWS-native operations. S3 and Route 53 are unrelated to orchestrator selection.",
    difficulty: "medium",
    services: ["eks","ecs"],
  },
  {
    id: "saa-d2-090",
    section: "d2-resilient",
    subtopic: "ecr-eks",
    type: "single",
    prompt:
      "Is AWS Fargate available as compute for both Amazon ECS and Amazon EKS?",
    options: [
      { id: "a", text: "Yes — Fargate provides serverless worker capacity for tasks on ECS and for pods on EKS" },
      { id: "b", text: "No — Fargate integrates with ECS only" },
      { id: "c", text: "No — Fargate integrates with EKS only" },
      { id: "d", text: "No — Fargate is a storage tier, not a compute option" },
    ],
    correct: ["a"],
    explanation:
      "Fargate is a shared serverless engine: ECS Fargate launch type and EKS Fargate profiles both avoid managing EC2 worker nodes. Limiting it to one orchestrator or calling it storage is incorrect.",
    difficulty: "medium",
    services: ["fargate","ecs","eks"],
  },
  {
    id: "saa-d2-091",
    section: "d2-resilient",
    subtopic: "ecr-eks",
    type: "single",
    prompt:
      "When ECS or EKS starts a new task or pod, where does it typically fetch the container image?",
    options: [
      { id: "a", text: "From a container image registry such as Amazon ECR (or another OCI-compatible registry)" },
      { id: "b", text: "From S3 Glacier Deep Archive archives" },
      { id: "c", text: "From an EBS snapshot exported as a tarball" },
      { id: "d", text: "From Amazon Route 53 hosted zone records" },
    ],
    correct: ["a"],
    explanation:
      "Orchestrators pull tagged images from registries at deploy time. Glacier, EBS snapshots, and DNS are not image distribution mechanisms for containers.",
    difficulty: "easy",
    services: ["ecr","ecs","eks"],
  },
  {
    id: "saa-d2-092",
    section: "d2-resilient",
    subtopic: "lambda",
    type: "single",
    prompt:
      "In AWS marketing and architecture discussions, what does the term \"serverless\" usually imply?",
    options: [
      { id: "a", text: "You focus on application logic while AWS runs and scales the infrastructure, and billing tracks actual usage" },
      { id: "b", text: "You must still provision and patch EC2 instances for every component" },
      { id: "c", text: "Compute never executes because everything is configuration-only" },
      { id: "d", text: "The label applies exclusively to block and object storage tiers" },
    ],
    correct: ["a"],
    explanation:
      "Serverless shifts operational burden to the provider with automatic scaling and consumption pricing—think Lambda, API Gateway, DynamoDB on-demand, and similar services—not manual fleets or storage-only scope.",
    difficulty: "easy",
    services: ["lambda"],
  },
  {
    id: "saa-d2-093",
    section: "d2-resilient",
    subtopic: "lambda",
    type: "single",
    prompt:
      "Which statement accurately describes AWS Lambda?",
    options: [
      { id: "a", text: "Runs code on demand in response to triggers, without you managing servers, scaling with traffic and charging for invocations and GB-seconds" },
      { id: "b", text: "Hosts managed Kubernetes clusters with a dedicated control plane fee" },
      { id: "c", text: "Provides Multi-AZ SQL with automated backups" },
      { id: "d", text: "Terminates TLS and routes Layer 7 requests to targets" },
    ],
    correct: ["a"],
    explanation:
      "Lambda is the event-driven functions service. EKS is Kubernetes, RDS is relational databases, and load balancers front traffic—they are not Lambda.",
    difficulty: "easy",
    services: ["lambda"],
  },
  {
    id: "saa-d2-094",
    section: "d2-resilient",
    subtopic: "lambda",
    type: "single",
    prompt:
      "Which event sources can invoke an AWS Lambda function without you operating polling infrastructure (where integration supports it)?",
    options: [
      { id: "a", text: "Amazon S3, Amazon API Gateway, Amazon SNS, Amazon SQS, Amazon EventBridge, Amazon DynamoDB Streams, and numerous other integrations" },
      { id: "b", text: "Only manual test invocations from the AWS Management Console" },
      { id: "c", text: "Only Amazon EC2 instances via SSH login" },
      { id: "d", text: "Only Amazon RDS automatic failover events with no other sources" },
    ],
    correct: ["a"],
    explanation:
      "Lambda's value is broad event source mapping across AWS services for reactive architectures. Console-only, SSH-only, or RDS-only triggers are far too narrow.",
    difficulty: "easy",
    services: ["lambda"],
  },
  {
    id: "saa-d2-095",
    section: "d2-resilient",
    subtopic: "lambda",
    type: "single",
    prompt:
      "Which workload profile aligns well with AWS Lambda?",
    options: [
      { id: "a", text: "Bursty, short-running, event-triggered logic such as transforming uploads, lightweight APIs, or connecting managed services" },
      { id: "b", text: "A persistent daemon that keeps large in-memory state alive for weeks on one host" },
      { id: "c", text: "Software that requires kernel modules and full root control of the operating system" },
      { id: "d", text: "A rich desktop GUI that renders locally on user laptops" },
    ],
    correct: ["a"],
    explanation:
      "Lambda suits stateless, seconds-scale work triggered by events. Long-lived stateful processes, deep OS customization, and desktop UIs belong on EC2, containers, or client devices.",
    difficulty: "medium",
    services: ["lambda"],
  },
  {
    id: "saa-d2-096",
    section: "d2-resilient",
    subtopic: "lambda-advanced",
    type: "single",
    prompt:
      "A Lambda function must query an Amazon RDS database that lives in private subnets with no public endpoint. What configuration is required?",
    options: [
      { id: "a", text: "Associate the function with the VPC so Lambda creates ENIs in your subnets and security groups can allow database traffic" },
      { id: "b", text: "Enable public accessibility on the RDS instance instead" },
      { id: "c", text: "Move all relational data into Amazon S3 and query with S3 Select" },
      { id: "d", text: "Nothing — every Lambda execution environment is already inside your VPC by default" },
    ],
    correct: ["a"],
    explanation:
      "Default Lambda runs in an AWS-managed network outside your VPC. VPC configuration attaches elastic network interfaces in your subnets to reach private RDS. Public RDS, S3 substitution, or assuming default VPC placement are wrong or risky.",
    difficulty: "medium",
    services: ["lambda","vpc"],
  },
  {
    id: "saa-d2-097",
    section: "d2-resilient",
    subtopic: "api-gateway",
    type: "single",
    prompt:
      "What problem does Amazon API Gateway solve?",
    options: [
      { id: "a", text: "It offers a managed front door for REST, HTTP, and WebSocket APIs—with auth, throttling, and integration to backends like Lambda" },
      { id: "b", text: "It is a key-value database with single-digit millisecond reads" },
      { id: "c", text: "It caches static assets at edge locations worldwide" },
      { id: "d", text: "It stores OCI images for container deployments" },
    ],
    correct: ["a"],
    explanation:
      "API Gateway terminates client HTTP/WebSocket traffic and routes to integrations. DynamoDB, CloudFront, and ECR address data, CDN, and images—not API management.",
    difficulty: "easy",
    services: ["api-gateway"],
  },
  {
    id: "saa-d2-098",
    section: "d2-resilient",
    subtopic: "api-gateway",
    type: "single",
    prompt:
      "Which features are commonly implemented at the Amazon API Gateway layer rather than in every backend function?",
    options: [
      { id: "a", text: "Usage plans and throttling, authorization (IAM, Cognito, Lambda authorizers), stage deployments, optional caching, and mapping templates" },
      { id: "b", text: "Serving static HTML from an S3 website endpoint only" },
      { id: "c", text: "Authoritative DNS resolution for customer domains only" },
      { id: "d", text: "Creation and rotation of KMS customer master keys only" },
    ],
    correct: ["a"],
    explanation:
      "API Gateway centralizes cross-cutting API concerns so backends stay focused on business logic. Static hosting, DNS, and KMS are other services' specialties.",
    difficulty: "medium",
    services: ["api-gateway"],
  },
  {
    id: "saa-d2-099",
    section: "d2-resilient",
    subtopic: "serverless-integration",
    type: "single",
    prompt:
      "What is AWS Step Functions designed to do?",
    options: [
      { id: "a", text: "Coordinate multi-step serverless workflows as state machines with built-in branching, retries, timeouts, and error paths" },
      { id: "b", text: "Host Docker images for CI/CD pipelines" },
      { id: "c", text: "Provide ACID transactions across Aurora clusters" },
      { id: "d", text: "Deliver low-latency video through edge POPs" },
    ],
    correct: ["a"],
    explanation:
      "Step Functions orchestrates calls to Lambda, AWS SDK integrations, and other workers with visual state tracking. It is not a registry, SQL engine, or CDN.",
    difficulty: "medium",
    services: ["step-functions"],
  },
  {
    id: "saa-d2-100",
    section: "d2-resilient",
    subtopic: "serverless-integration",
    type: "single",
    prompt:
      "When does AWS Step Functions become the right orchestration choice?",
    options: [
      { id: "a", text: "Business processes span several AWS steps—approve, charge, fulfill—and need explicit retry, parallel branches, and failure handling" },
      { id: "b", text: "You only need durable storage for user-uploaded media" },
      { id: "c", text: "You want an in-memory cache in front of a relational database" },
      { id: "d", text: "You plan to serve a static marketing site with no backend logic" },
    ],
    correct: ["a"],
    explanation:
      "Step Functions shines when workflows are longer than a single Lambda and require state visibility. Raw storage, caching, or static sites do not need a state machine service.",
    difficulty: "medium",
    services: ["step-functions"],
  },
  {
    id: "saa-d2-101",
    section: "d2-resilient",
    subtopic: "serverless-app-patterns",
    type: "single",
    prompt:
      "A smartphone task-list app needs sign-in, a REST API, and millisecond reads/writes per user item without running servers. Which architecture is the strongest match?",
    options: [
      { id: "a", text: "Amazon Cognito for identities, Amazon API Gateway in front of AWS Lambda, and Amazon DynamoDB as the data store" },
      { id: "b", text: "Self-managed EC2 with Amazon RDS and custom session cookies" },
      { id: "c", text: "One long-running Lambda with no HTTP entry point" },
      { id: "d", text: "Amazon S3 alone for both authentication and structured task records" },
    ],
    correct: ["a"],
    explanation:
      "The common serverless mobile pattern chains managed auth, API front door, compute, and NoSQL storage. EC2/RDS adds ops burden; Lambda without API Gateway lacks client access; S3 is not an auth or query engine for structured tasks.",
    difficulty: "medium",
    services: ["api-gateway","lambda","dynamodb","cognito"],
  },
  {
    id: "saa-d2-102",
    section: "d2-resilient",
    subtopic: "serverless-app-patterns",
    type: "single",
    prompt:
      "You want a personal blog that is mostly static HTML, loads quickly worldwide, uses your own domain, and keeps dynamic features serverless. What stack fits?",
    options: [
      { id: "a", text: "Host static assets in Amazon S3, front them with Amazon CloudFront, map the domain in Amazon Route 53, and use API Gateway + Lambda + DynamoDB for interactive pieces" },
      { id: "b", text: "Run Auto Scaling groups of EC2 web servers behind an Application Load Balancer" },
      { id: "c", text: "Deploy everything on one oversized EC2 instance with manual scaling" },
      { id: "d", text: "Store HTML on Amazon FSx for Windows File Server and expose SMB shares publicly" },
    ],
    correct: ["a"],
    explanation:
      "S3 plus CloudFront delivers cheap global static content with HTTPS; Route 53 wires DNS; optional API Gateway/Lambda/DynamoDB covers comments or search. Always-on EC2 fleets or FSx SMB are heavier and miss the serverless static-site pattern.",
    difficulty: "medium",
    services: ["s3","cloudfront","route-53"],
  },
  {
    id: "saa-d2-103",
    section: "d2-resilient",
    subtopic: "serverless-micro-dist",
    type: "single",
    prompt:
      "In microservices on AWS, how should teams integrate services so each can scale and deploy on its own schedule?",
    options: [
      { id: "a", text: "Expose synchronous HTTP via API Gateway or load balancers, and use asynchronous buses such as SQS, SNS, or EventBridge between bounded contexts" },
      { id: "b", text: "Force every service to read and write the same shared database schema" },
      { id: "c", text: "Collapse all domains into one monolithic Lambda binary" },
      { id: "d", text: "Co-locate every component on a single EC2 host to simplify networking" },
    ],
    correct: ["a"],
    explanation:
      "Loose coupling via APIs and messages isolates failure domains and release cadences. Shared-database monoliths, single-function monoliths, or one-box deployments undermine independent scaling.",
    difficulty: "medium",
    services: ["api-gateway","sqs","sns","eventbridge"],
  },
  {
    id: "saa-d2-104",
    section: "d2-resilient",
    subtopic: "serverless-micro-dist",
    type: "single",
    prompt:
      "What advantage does a microservices approach often provide on AWS?",
    options: [
      { id: "a", text: "Teams can ship, scale, and fail independently per service, which speeds experimentation and limits blast radius" },
      { id: "b", text: "All functionality must deploy together as one binary on a fixed schedule" },
      { id: "c", text: "Public contracts between services become unnecessary" },
      { id: "d", text: "Observability and metrics are no longer required" },
    ],
    correct: ["a"],
    explanation:
      "Service boundaries enable parallel development and targeted scaling. Microservices still need APIs and monitoring—they do not eliminate interfaces or operational visibility.",
    difficulty: "easy",
    services: ["microservices"],
  },
  {
    id: "saa-d2-105",
    section: "d2-resilient",
    subtopic: "streaming-analytics",
    type: "single",
    prompt:
      "What does Amazon MSK provide?",
    options: [
      { id: "a", text: "Amazon Managed Streaming for Apache Kafka — fully managed Kafka clusters compatible with the open-source Kafka ecosystem" },
      { id: "b", text: "A serverless SQL warehouse for ad hoc analytics" },
      { id: "c", text: "Regional object storage with eleven nines durability" },
      { id: "d", text: "A global content delivery network for HTTPS assets" },
    ],
    correct: ["a"],
    explanation:
      "MSK operates Kafka brokers, ZooKeeper/KRaft concerns, and patching so Kafka-native producers and consumers can stream events without self-managing clusters. It is not Redshift, S3, or CloudFront.",
    difficulty: "medium",
    services: ["msk"],
  },
  {
    id: "saa-d2-106",
    section: "d2-resilient",
    subtopic: "streaming-analytics",
    type: "single",
    prompt:
      "Your team must pick a managed streaming platform on AWS. When should you favor Amazon MSK over Amazon Kinesis Data Streams?",
    options: [
      { id: "a", text: "When you need native Apache Kafka compatibility and tooling; use Kinesis when you prefer a first-party AWS streaming service with less operational overhead" },
      { id: "b", text: "The two services are interchangeable for every workload" },
      { id: "c", text: "MSK is primarily for S3-style object storage; Kinesis is a relational database" },
      { id: "d", text: "Kinesis cannot run inside AWS and is limited to on-premises deployments" },
    ],
    correct: ["a"],
    explanation:
      "MSK suits teams standardizing on Kafka APIs, connectors, and existing clusters. Kinesis Data Streams fits workloads that want AWS-managed ingestion without running Kafka. The distractors confuse storage, databases, and deployment models.",
    difficulty: "medium",
    services: ["msk","kinesis"],
  },
  {
    id: "saa-d2-107",
    section: "d2-resilient",
    subtopic: "streaming-analytics",
    type: "single",
    prompt:
      "Which capability best describes Amazon Managed Service for Apache Flink?",
    options: [
      { id: "a", text: "Running continuous analytics on live streams—filtering, aggregating, and detecting anomalies as events arrive" },
      { id: "b", text: "Archiving objects for years in cold storage tiers" },
      { id: "c", text: "Serving static HTML and assets to browsers worldwide" },
      { id: "d", text: "Executing ACID transactions in a traditional OLTP database" },
    ],
    correct: ["a"],
    explanation:
      "Managed Service for Apache Flink (successor to Kinesis Data Analytics for Flink) hosts Flink applications that transform and analyze streaming sources in near real time. It is not storage, web hosting, or transactional SQL.",
    difficulty: "medium",
    services: ["flink","kinesis"],
  },
  {
    id: "saa-d2-108",
    section: "d2-resilient",
    subtopic: "streaming-analytics",
    type: "single",
    prompt:
      "Which sequence best reflects a common AWS analytics architecture from ingestion through reporting?",
    options: [
      { id: "a", text: "Capture events with Kinesis or MSK, land raw data in S3, refine with Glue or EMR, then analyze in Athena, Redshift, or QuickSight" },
      { id: "b", text: "Load all raw feeds into one RDS database and run every report against that single instance" },
      { id: "c", text: "Forward unprocessed files to analysts by email for manual spreadsheet work" },
      { id: "d", text: "Retain datasets exclusively on ephemeral instance store with no durable lake" },
    ],
    correct: ["a"],
    explanation:
      "The lakehouse-style pattern separates durable storage (S3), transformation (Glue/EMR), and consumption (Athena, Redshift, QuickSight). A monolithic RDS, email handoffs, or instance-only storage do not scale for modern big-data analytics.",
    difficulty: "medium",
    services: ["kinesis","s3","glue","athena"],
  },
  {
    id: "saa-d2-109",
    section: "d2-resilient",
    subtopic: "cloudwatch",
    type: "single",
    prompt:
      "In Amazon CloudWatch, what are metrics?",
    options: [
      { id: "a", text: "Numeric measurements collected over time for AWS resources and custom applications, suitable for dashboards and alarms" },
      { id: "b", text: "Archived text output from application stdout and stderr" },
      { id: "c", text: "An audit trail of who called which AWS API and when" },
      { id: "d", text: "Point-in-time configuration compliance records for resources" },
    ],
    correct: ["a"],
    explanation:
      "Metrics are time-series datapoints (CPUUtilization, custom business KPIs, etc.). CloudWatch Logs holds log events, CloudTrail captures API activity, and AWS Config tracks configuration history—not performance graphs.",
    difficulty: "easy",
    services: ["cloudwatch"],
  },
  {
    id: "saa-d2-110",
    section: "d2-resilient",
    subtopic: "cloudwatch",
    type: "single",
    prompt:
      "What is the primary role of Amazon CloudWatch Logs?",
    options: [
      { id: "a", text: "Ingest, retain, and search log events from workloads with policies that control how long data is kept" },
      { id: "b", text: "Maintain a historical record of resource configuration changes" },
      { id: "c", text: "Balance incoming requests across a fleet of EC2 instances" },
      { id: "d", text: "Apply encryption-at-rest settings to attached EBS volumes" },
    ],
    correct: ["a"],
    explanation:
      "CloudWatch Logs centralizes log streams from Lambda, containers, EC2 (often via the agent), and other sources. Config tracks configuration, load balancers distribute traffic, and EBS encryption is a storage setting—not log management.",
    difficulty: "easy",
    services: ["cloudwatch"],
  },
  {
    id: "saa-d2-111",
    section: "d2-resilient",
    subtopic: "cloudwatch",
    type: "single",
    prompt:
      "An EC2 workload must report guest OS memory and disk utilization—and ship application logs—to CloudWatch. What should you deploy?",
    options: [
      { id: "a", text: "The unified CloudWatch agent on the instance" },
      { id: "b", text: "Nothing; hypervisor metrics already include RAM and filesystem usage" },
      { id: "c", text: "A NAT gateway in the VPC" },
      { id: "d", text: "A static Elastic IP address on the instance" },
    ],
    correct: ["a"],
    explanation:
      "Default EC2 metrics from the hypervisor cover CPU and network, not in-guest memory or disk free space. The CloudWatch agent collects those OS metrics and can forward log files. NAT and Elastic IPs do not publish telemetry.",
    difficulty: "medium",
    services: ["cloudwatch","ec2"],
  },
  {
    id: "saa-d2-112",
    section: "d2-resilient",
    subtopic: "cloudwatch",
    type: "single",
    prompt:
      "When would you create an Amazon CloudWatch alarm?",
    options: [
      { id: "a", text: "To run automated responses—such as SNS notifications, Auto Scaling adjustments, or EC2 recovery—when a metric crosses defined bounds" },
      { id: "b", text: "To persist log lines for later full-text search" },
      { id: "c", text: "To log every AWS API invocation in the account" },
      { id: "d", text: "To perform machine translation between languages" },
    ],
    correct: ["a"],
    explanation:
      "Alarms evaluate metrics over evaluation periods and invoke actions when thresholds breach. Logs Insights searches logs; CloudTrail records APIs; translation is unrelated to monitoring automation.",
    difficulty: "easy",
    services: ["cloudwatch"],
  },
  {
    id: "saa-d2-113",
    section: "d2-resilient",
    subtopic: "cloudwatch",
    type: "single",
    prompt:
      "Which CloudWatch feature lets you run ad hoc queries against log groups during an incident?",
    options: [
      { id: "a", text: "CloudWatch Logs Insights and its query language" },
      { id: "b", text: "Amazon Athena exclusively, with no CloudWatch integration" },
      { id: "c", text: "Amazon Redshift as the only supported log query engine" },
      { id: "d", text: "Amazon Route 53 query logging only" },
    ],
    correct: ["a"],
    explanation:
      "Logs Insights is built for interactive log analytics—filtering, stats, and visualizations—directly on CloudWatch log groups. Athena and Redshift serve other analytics patterns; Route 53 handles DNS, not general application log exploration.",
    difficulty: "medium",
    services: ["cloudwatch"],
  },
  {
    id: "saa-d2-114",
    section: "d2-resilient",
    subtopic: "eventbridge",
    type: "single",
    prompt:
      "Which statement accurately describes Amazon EventBridge?",
    options: [
      { id: "a", text: "A managed event router that matches events from AWS, partners, and custom producers to targets using declarative rules" },
      { id: "b", text: "A fully managed SQL database engine" },
      { id: "c", text: "A global edge network for caching static content" },
      { id: "d", text: "Network-attached block storage for EC2" },
    ],
    correct: ["a"],
    explanation:
      "EventBridge (evolved from CloudWatch Events) is the serverless event bus for event-driven designs—routing to Lambda, SQS, Step Functions, and more. It is not RDS, CloudFront, or EBS.",
    difficulty: "easy",
    services: ["eventbridge"],
  },
  {
    id: "saa-d2-115",
    section: "d2-resilient",
    subtopic: "eventbridge",
    type: "single",
    prompt:
      "How does EventBridge deliver an incoming event to the right downstream systems?",
    options: [
      { id: "a", text: "Configured rules evaluate event patterns and send matching events to one or more targets" },
      { id: "b", text: "Every event is fan-out delivered to all AWS services automatically" },
      { id: "c", text: "Delivery is limited to SMTP email endpoints" },
      { id: "d", text: "Consumers must long-poll a shared queue with no filtering" },
    ],
    correct: ["a"],
    explanation:
      "Rules (including scheduled expressions) filter the event stream and invoke targets selectively, optionally transforming payloads. There is no blanket broadcast, email-only mode, or mandatory polling model for standard EventBridge routing.",
    difficulty: "medium",
    services: ["eventbridge"],
  },
  {
    id: "saa-d2-116",
    section: "d2-resilient",
    subtopic: "eventbridge",
    type: "single",
    prompt:
      "You want a Lambda function to execute every night at 2:00 AM UTC without maintaining a cron server. What is the serverless approach?",
    options: [
      { id: "a", text: "Define an EventBridge rule with a cron or rate schedule that invokes the function" },
      { id: "b", text: "Keep an EC2 instance running 24/7 with crontab entries" },
      { id: "c", text: "Rely on Route 53 health check intervals to trigger the code" },
      { id: "d", text: "Configure an S3 lifecycle transition to call Lambda" },
    ],
    correct: ["a"],
    explanation:
      "EventBridge scheduled rules (or EventBridge Scheduler) invoke Lambda on cron/rate expressions with no always-on compute. EC2 crontab adds ops burden; health checks and lifecycle rules are not general-purpose schedulers for arbitrary functions.",
    difficulty: "medium",
    services: ["eventbridge","lambda"],
  },
  {
    id: "saa-d2-117",
    section: "d2-resilient",
    subtopic: "dr-strategies",
    type: "single",
    prompt:
      "How do Recovery Time Objective (RTO) and Recovery Point Objective (RPO) differ?",
    options: [
      { id: "a", text: "RTO caps acceptable service outage duration; RPO caps acceptable data loss measured as time since the last recoverable copy" },
      { id: "b", text: "RTO measures data loss; RPO measures downtime" },
      { id: "c", text: "Both metrics describe monthly storage spend" },
      { id: "d", text: "They are two names for the same DR measurement" },
    ],
    correct: ["a"],
    explanation:
      "RTO answers how fast operations must resume after failure. RPO answers how stale recovered data may be. Swapping the definitions or treating them as cost or duplicate metrics is incorrect for DR planning.",
    difficulty: "medium",
    services: ["disaster-recovery"],
  },
  {
    id: "saa-d2-118",
    section: "d2-resilient",
    subtopic: "dr-strategies",
    type: "single",
    prompt:
      "Arrange AWS disaster recovery models from lowest ongoing cost (typically slowest recovery) to highest cost (typically fastest recovery).",
    options: [
      { id: "a", text: "Backup and Restore, then Pilot Light, then Warm Standby, then Multi-Site active-active" },
      { id: "b", text: "Multi-Site active-active, then Warm Standby, then Pilot Light, then Backup and Restore" },
      { id: "c", text: "Pilot Light, then Backup and Restore, then Multi-Site, then Warm Standby" },
      { id: "d", text: "Warm Standby, then Multi-Site, then Backup and Restore, then Pilot Light" },
    ],
    correct: ["a"],
    explanation:
      "Backup and Restore keeps only copies until rebuild time. Pilot Light warms critical pieces. Warm Standby runs a reduced live stack. Multi-Site/active-active maintains full parallel capacity—fastest failover, highest spend.",
    difficulty: "hard",
    services: ["disaster-recovery"],
  },
  {
    id: "saa-d2-119",
    section: "d2-resilient",
    subtopic: "dr-strategies",
    type: "single",
    prompt:
      "Which disaster recovery approach minimizes standing cost by provisioning compute and restoring data only after an outage is declared?",
    options: [
      { id: "a", text: "Backup and Restore" },
      { id: "b", text: "Warm standby — a scaled-down but fully functional copy waiting to scale up" },
      { id: "c", text: "Multi-site active-active — both sites handle live user traffic" },
      { id: "d", text: "Pilot light — keep a small always-on footprint ready to scale out" },
    ],
    correct: ["a"],
    explanation:
      "Backup and Restore relies on backups (often in S3) and rebuilds infrastructure on demand—cheap but slow. Pilot Light, Warm Standby, and active-active keep more infrastructure warm, improving RTO at higher cost.",
    difficulty: "medium",
    services: ["disaster-recovery"],
  },
  {
    id: "saa-d2-120",
    section: "d2-resilient",
    subtopic: "dr-strategies",
    type: "single",
    prompt:
      "What problem does AWS Elastic Disaster Recovery (Elastic DR / DRS) solve?",
    options: [
      { id: "a", text: "Replicating servers at the block level into AWS for rapid failover with small recovery point objectives" },
      { id: "b", text: "Hosting a managed PostgreSQL-compatible database" },
      { id: "c", text: "Accelerating static asset delivery to end users" },
      { id: "d", text: "Federating corporate identities into AWS IAM" },
    ],
    correct: ["a"],
    explanation:
      "Elastic DR continuously replicates source machines into a staging area in AWS, enabling fast recovery with minimal data loss—replacing the former CloudEndure DR offering. It is not a database, CDN, or identity product.",
    difficulty: "medium",
    services: ["drs"],
  },
  {
    id: "saa-d2-121",
    section: "d2-resilient",
    subtopic: "migration-services",
    type: "single",
    prompt:
      "What is the main purpose of AWS Database Migration Service (AWS DMS)?",
    options: [
      { id: "a", text: "Moving databases into AWS while the source remains online, including ongoing replication for low-downtime cutovers" },
      { id: "b", text: "Applying encryption keys to database storage only" },
      { id: "c", text: "Operating a fully managed Apache Kafka cluster" },
      { id: "d", text: "Authoritative DNS resolution for public hostnames" },
    ],
    correct: ["a"],
    explanation:
      "DMS uses replication instances and endpoints to perform initial loads and ongoing sync (CDC) so applications can switch with minimal outage. Encryption, Kafka, and DNS are handled by other services.",
    difficulty: "medium",
    services: ["dms"],
  },
  {
    id: "saa-d2-122",
    section: "d2-resilient",
    subtopic: "migration-services",
    type: "single",
    prompt:
      "A legacy Oracle database must move to Amazon Aurora PostgreSQL—a different engine family. Which tool pairing fits a heterogeneous migration?",
    options: [
      { id: "a", text: "AWS Schema Conversion Tool (SCT) for schema and code conversion, then AWS DMS to replicate data" },
      { id: "b", text: "DMS alone, because Oracle and PostgreSQL use identical on-disk formats" },
      { id: "c", text: "Export an Oracle snapshot and restore it directly into Aurora PostgreSQL" },
      { id: "d", text: "Enable VPC peering and copy raw database files across the network" },
    ],
    correct: ["a"],
    explanation:
      "Different engines require SCT to translate schemas, stored procedures, and incompatible types before DMS moves rows. Same-engine moves skip SCT; snapshots and file copies do not bridge engine differences.",
    difficulty: "hard",
    services: ["dms","sct"],
  },
  {
    id: "saa-d2-123",
    section: "d2-resilient",
    subtopic: "migration-services",
    type: "single",
    prompt:
      "Which AWS service is designed for lift-and-shift rehost of servers into Amazon EC2?",
    options: [
      { id: "a", text: "AWS Application Migration Service (MGN), using continuous block-level replication with minimal application changes" },
      { id: "b", text: "AWS Schema Conversion Tool for engine-to-engine translation" },
      { id: "c", text: "Amazon SQS for durable message buffering" },
      { id: "d", text: "Amazon CloudFront for edge caching" },
    ],
    correct: ["a"],
    explanation:
      "MGN replicates source servers and launches EC2 instances for rehost migrations. SCT targets database schema conversion; SQS and CloudFront serve messaging and CDN use cases, not whole-server lift-and-shift.",
    difficulty: "medium",
    services: ["mgn"],
  },
  {
    id: "saa-d2-124",
    section: "d2-resilient",
    subtopic: "migration-services",
    type: "single",
    prompt:
      "You are moving RDS for MySQL to another RDS for MySQL instance in AWS (same engine). What is the lowest-friction path?",
    options: [
      { id: "a", text: "Restore from a snapshot, or use DMS for continuous replication if you need near-zero downtime" },
      { id: "b", text: "Run SCT because the source and target engines differ" },
      { id: "c", text: "Detach and copy underlying EBS volumes by hand" },
      { id: "d", text: "Manually re-insert every row through SQL scripts" },
    ],
    correct: ["a"],
    explanation:
      "Homogeneous MySQL-to-MySQL moves typically use native snapshots or DMS CDC. SCT is for heterogeneous engines; manual EBS surgery and row-by-row rebuilds are unnecessary and risky.",
    difficulty: "medium",
    services: ["rds","dms"],
  },
  {
    id: "saa-d2-125",
    section: "d2-resilient",
    subtopic: "migration-services",
    type: "single",
    prompt:
      "Why enable Change Data Capture (CDC) on an AWS DMS replication task?",
    options: [
      { id: "a", text: "To apply incremental source changes to the target after the initial load so both sides stay aligned until cutover" },
      { id: "b", text: "To turn on transparent data encryption for the target only" },
      { id: "c", text: "To shrink backup storage through compression algorithms" },
      { id: "d", text: "To automatically convert Oracle PL/SQL into PostgreSQL functions" },
    ],
    correct: ["a"],
    explanation:
      "CDC streams ongoing inserts, updates, and deletes so the target mirrors the source during migration windows, enabling short maintenance cutovers. Encryption, backup compression, and schema conversion are separate concerns (SCT handles schema).",
    difficulty: "medium",
    services: ["dms"],
  },
  {
    id: "saa-d2-126",
    section: "d2-resilient",
    subtopic: "on-prem-strategies",
    type: "single",
    prompt:
      "What does the AWS Outposts offering provide?",
    options: [
      { id: "a", text: "Managed AWS hardware in your facility so selected services run locally for latency or data residency while staying API-consistent with the cloud" },
      { id: "b", text: "A control plane for Kubernetes clusters only in AWS Regions" },
      { id: "c", text: "Global authoritative DNS for public domains" },
      { id: "d", text: "A FaaS runtime with no servers to manage in any location" },
    ],
    correct: ["a"],
    explanation:
      "Outposts extends AWS into on-premises data centers via racks or servers you operate locally, connected to the AWS Region. EKS is Kubernetes in-region; Route 53 is DNS; Lambda is serverless compute—not Outposts hardware.",
    difficulty: "medium",
    services: ["outposts"],
  },
  {
    id: "saa-d2-127",
    section: "d2-resilient",
    subtopic: "on-prem-strategies",
    type: "single",
    prompt:
      "An interactive application must keep single-digit millisecond latency to users in a specific metropolitan area while still using parent-Region services for the broader architecture. Which AWS deployment option fits?",
    options: [
      { id: "a", text: "AWS Local Zones placed near that metro, connected back to the parent Region" },
      { id: "b", text: "AWS Schema Conversion Tool alone with no compute placement changes" },
      { id: "c", text: "Amazon S3 static website hosting as the only tier" },
      { id: "d", text: "Default S3 bucket encryption settings with no edge or metro presence" },
    ],
    correct: ["a"],
    explanation:
      "Local Zones extend select AWS services into metro areas for ultra-low latency while remaining tethered to a parent Region. SCT converts database schemas, static website hosting is not a metro compute footprint, and S3 encryption does not address locality.",
    difficulty: "medium",
    services: ["local-zones"],
  },
  {
    id: "saa-d2-128",
    section: "d2-resilient",
    subtopic: "on-prem-strategies",
    type: "single",
    prompt:
      "What value does AWS Migration Hub add to a large migration program?",
    options: [
      { id: "a", text: "A consolidated view to discover applications, plan waves, and track status across AWS and partner migration tools" },
      { id: "b", text: "A proprietary relational database engine" },
      { id: "c", text: "A worldwide CDN for video streaming" },
      { id: "d", text: "Centralized creation and rotation of KMS keys" },
    ],
    correct: ["a"],
    explanation:
      "Migration Hub aggregates progress from services like MGN and DMS so teams see migration state by application. It does not replace RDS, CloudFront, or KMS.",
    difficulty: "easy",
    services: ["migration-hub"],
  },
  {
    id: "saa-d2-129",
    section: "d2-resilient",
    subtopic: "on-prem-strategies",
    type: "single",
    prompt:
      "Before moving workloads from a data center, which AWS service helps inventory servers and map dependencies?",
    options: [
      { id: "a", text: "AWS Application Discovery Service, collecting configuration, utilization, and dependency data for planning" },
      { id: "b", text: "A service that encrypts every on-premises disk automatically" },
      { id: "c", text: "A DNS failover product for public endpoints" },
      { id: "d", text: "An on-premises Lambda runtime appliance" },
    ],
    correct: ["a"],
    explanation:
      "Application Discovery Service agents or connectors gather server metadata and relationships to size targets and sequence migrations—often feeding Migration Hub. The other options describe unrelated security, DNS, or compute products.",
    difficulty: "medium",
    services: ["application-discovery-service"],
  },
  {
    id: "saa-d2-130",
    section: "d2-resilient",
    subtopic: "backup-transfer",
    type: "single",
    prompt:
      "How should you describe AWS Backup?",
    options: [
      { id: "a", text: "A centralized service that applies backup plans and schedules across supported resources such as EBS, RDS, DynamoDB, EFS, and S3" },
      { id: "b", text: "A utility limited to manual EBS volume snapshots only" },
      { id: "c", text: "A managed publish-subscribe messaging broker" },
      { id: "d", text: "An edge caching network for HTTP objects" },
    ],
    correct: ["a"],
    explanation:
      "AWS Backup unifies policy-driven backups, retention, and lifecycle across many AWS data services instead of configuring each engine separately. It is broader than EBS-only snapshots and is not SQS or CloudFront.",
    difficulty: "medium",
    services: ["aws-backup"],
  },
  {
    id: "saa-d2-131",
    section: "d2-resilient",
    subtopic: "backup-transfer",
    type: "single",
    prompt:
      "Your backup strategy must survive loss of an entire Region or compromise of the production account. Which AWS Backup capabilities help?",
    options: [
      { id: "a", text: "Replicate recovery points to another Region and/or another account, and use Backup Vault Lock for WORM immutability" },
      { id: "b", text: "Keep a single copy in the same Region and account as production" },
      { id: "c", text: "Turn off encryption to reduce storage footprint" },
      { id: "d", text: "Store the only backup on one EC2 instance's local disk" },
    ],
    correct: ["a"],
    explanation:
      "Cross-Region and cross-account copies isolate backups from regional disasters or account takeover; Vault Lock prevents malicious deletion. Single-region copies, disabling encryption, and ephemeral instance storage weaken resilience.",
    difficulty: "hard",
    services: ["aws-backup"],
  },
  {
    id: "saa-d2-132",
    section: "d2-resilient",
    subtopic: "backup-transfer",
    type: "single",
    prompt:
      "A company wants scheduled, automated replication from an on-premises NAS to Amazon S3 or Amazon EFS over the network. Which service fits?",
    options: [
      { id: "a", text: "DataSync for managed online data transfer between storage systems" },
      { id: "b", text: "Amazon Macie for discovering sensitive data in S3" },
      { id: "c", text: "AWS Shield for DDoS protection" },
      { id: "d", text: "Amazon CloudFront as a bulk NAS replication endpoint" },
    ],
    correct: ["a"],
    explanation:
      "DataSync is built for recurring online transfers with validation and bandwidth tuning. Macie finds sensitive data; Shield mitigates DDoS; CloudFront is a CDN—they are not NAS sync tools.",
    difficulty: "medium",
    services: ["datasync"],
  },
  {
    id: "saa-d2-133",
    section: "d2-resilient",
    subtopic: "arch-patterns",
    type: "single",
    prompt:
      "New objects landing in S3 must trigger processing that survives temporary downstream outages without losing work. Which design is most resilient?",
    options: [
      { id: "a", text: "S3 event notification enqueues to Amazon SQS; workers pull from the queue, with a dead-letter queue for poison messages" },
      { id: "b", text: "The upload client blocks on a synchronous HTTP call to the processor" },
      { id: "c", text: "Files live on one EC2 host and a local cron job processes them sequentially" },
      { id: "d", text: "Each upload generates an email attachment for manual handling" },
    ],
    correct: ["a"],
    explanation:
      "A queue decouples producers from consumers, buffering events while processors recover; a DLQ isolates repeated failures. Sync HTTP, single-instance cron, and email workflows lose resilience under failure or load spikes.",
    difficulty: "medium",
    services: ["sqs","s3","lambda"],
  },
  {
    id: "saa-d2-134",
    section: "d2-resilient",
    subtopic: "hpc-availability",
    type: "single",
    prompt:
      "You run exactly one EC2 instance for a stateless app and need automatic replacement in a healthy Availability Zone if the instance or its AZ fails. What is the simplest pattern?",
    options: [
      { id: "a", text: "Place the instance in an Auto Scaling group with min, max, and desired capacity all set to 1 across multiple AZs" },
      { id: "b", text: "Provision a larger EBS volume so failures are less likely" },
      { id: "c", text: "Associate an Elastic IP and manually restart the OS when it stops responding" },
      { id: "d", text: "Capture a daily AMI and rebuild the server by hand after each outage" },
    ],
    correct: ["a"],
    explanation:
      "An ASG spanning AZs with desired count 1 relaunches the instance elsewhere when health checks fail—covering AZ loss. Bigger disks, Elastic IPs, and manual AMI restores do not automate cross-AZ recovery.",
    difficulty: "medium",
    services: ["ec2","asg"],
  },
  {
    id: "saa-d2-135",
    section: "d2-resilient",
    subtopic: "iac-deployment",
    type: "single",
    prompt:
      "Which AWS service lets teams define infrastructure declaratively in templates and manage it as versioned stacks?",
    options: [
      { id: "a", text: "An infrastructure-as-code service that creates and updates AWS resources from declarative templates" },
      { id: "b", text: "A managed MySQL-compatible database" },
      { id: "c", text: "A global content delivery network" },
      { id: "d", text: "A standalone monitoring dashboard unrelated to provisioning" },
    ],
    correct: ["a"],
    explanation:
      "CloudFormation stacks are defined in JSON or YAML templates and provision resources as a unit. RDS is a database, CloudFront is CDN, and while CloudWatch monitors, CloudFormation's core job is repeatable infrastructure deployment.",
    difficulty: "easy",
    services: ["cloudformation"],
  },
  {
    id: "saa-d2-136",
    section: "d2-resilient",
    subtopic: "iac-deployment",
    type: "single",
    prompt:
      "Why adopt CloudFormation for environment management?",
    options: [
      { id: "a", text: "Repeatable stacks across accounts and Regions, clean teardown, drift detection, and version-controlled change history" },
      { id: "b", text: "It removes the need for any IAM roles or policies" },
      { id: "c", text: "It increases EC2 CPU clock speed automatically" },
      { id: "d", text: "It waives data transfer charges between services" },
    ],
    correct: ["a"],
    explanation:
      "IaC makes environments reproducible for DR and promotion pipelines, supports stack deletion, and highlights configuration drift. CloudFormation still requires IAM, does not boost hardware performance, and does not affect billing for data transfer.",
    difficulty: "medium",
    services: ["cloudformation"],
  },
  {
    id: "saa-d2-137",
    section: "d2-resilient",
    subtopic: "messaging-engagement",
    type: "single",
    prompt:
      "What is Amazon Simple Email Service (Amazon SES)?",
    options: [
      { id: "a", text: "A cloud email platform for sending—and optionally receiving—transactional and bulk messages at scale" },
      { id: "b", text: "A durable FIFO or standard message queue" },
      { id: "c", text: "A mobile push notification service with no email support" },
      { id: "d", text: "A managed Apache Kafka cluster on AWS" },
    ],
    correct: ["a"],
    explanation:
      "SES handles outbound (and inbound) email for applications and marketing use cases. SQS queues messages between components; SNS fans out notifications to many subscribers; MSK runs Kafka—not email delivery.",
    difficulty: "easy",
    services: ["ses"],
  },
  {
    id: "saa-d2-138",
    section: "d2-resilient",
    subtopic: "messaging-engagement",
    type: "single",
    prompt:
      "How does Amazon SNS compare to Amazon SES when an application needs to notify many systems versus send email at scale?",
    options: [
      { id: "a", text: "SNS is a pub/sub fan-out service to many subscribers (queues, functions, HTTP, SMS); SES is built for high-volume email send and receive" },
      { id: "b", text: "They are the same product under two names" },
      { id: "c", text: "SNS sends email only, while SES is exclusively for SMS" },
      { id: "d", text: "SNS is a relational datastore for user profiles only" },
    ],
    correct: ["a"],
    explanation:
      "SNS multicasts events to heterogeneous subscribers for application integration. SES is the email transport service for transactional and bulk mail. They solve different problems and are not interchangeable or role-reversed.",
    difficulty: "medium",
    services: ["sns","ses"],
  },
  {
    id: "saa-d2-139",
    section: "d2-resilient",
    subtopic: "messaging-engagement",
    type: "single",
    prompt:
      "You must move data between Salesforce (SaaS) and AWS destinations such as S3 or Amazon Redshift without building custom connectors. Which service should you use?",
    options: [
      { id: "a", text: "AppFlow for SaaS-to-AWS data integration flows" },
      { id: "b", text: "SES for sending and receiving email at scale" },
      { id: "c", text: "Batch for managed batch computing jobs" },
      { id: "d", text: "Amazon EventBridge for routing application events to targets" },
    ],
    correct: ["a"],
    explanation:
      "AppFlow provides managed, secure integrations between SaaS applications and AWS analytics/storage services. SES sends email, Batch runs batch jobs, and EventBridge routes events—not SaaS-to-AWS ETL connectors.",
    difficulty: "medium",
    services: ["appflow"],
  },
];
