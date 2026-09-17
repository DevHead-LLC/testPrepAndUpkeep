// Domain 3 — Design High-Performing Architectures (24%)
// Question shape is documented in plan/01-architecture.md.
// `correct` is ALWAYS an array of option ids (one or more for multi-select).
// Independently authored educational practice content based on publicly documented AWS concepts.
export const questions = [
  {
    id: "saa-d3-001",
    section: "d3-high-performing",
    subtopic: "ebs-basics",
    type: "single",
    prompt:
      "An EC2-hosted database runs OLTP-style transactions and must sustain steady high IOPS without overspending on storage. Which EBS volume class should you pick first?",
    options: [
      { id: "a", text: "gp3 General Purpose SSD" },
      { id: "b", text: "sc1 Cold HDD" },
      { id: "c", text: "st1 Throughput Optimized HDD" },
      { id: "d", text: "Magnetic (legacy standard volume)" },
    ],
    correct: ["a"],
    explanation:
      "General Purpose gp3 SSD lets you tune IOPS and throughput separately and usually costs less than Provisioned IOPS io2 while meeting typical transactional IOPS needs. Cold and throughput HDD tiers target sequential or infrequent access, not random high IOPS.",
    difficulty: "medium",
    services: ["ebs","ec2"],
  },
  {
    id: "saa-d3-002",
    section: "d3-high-performing",
    subtopic: "elasticache",
    type: "single",
    prompt:
      "Users hit the same costly read queries against RDS over and over, and response times are suffering. Which layer should you introduce to speed reads with minimal code changes?",
    options: [
      { id: "a", text: "Place Amazon ElastiCache (or similar in-memory cache) between the app and RDS" },
      { id: "b", text: "Provision a bigger EBS disk for the database instance" },
      { id: "c", text: "Turn on RDS Multi-AZ deployment" },
      { id: "d", text: "Downgrade to magnetic EBS for the DB" },
    ],
    correct: ["a"],
    explanation:
      "Caching hot query results in memory cuts round trips to RDS and shrinks latency. Multi-AZ is for resilience, not read scaling; disk size or slower media does not fix repeated expensive reads.",
    difficulty: "easy",
    services: ["elasticache","rds"],
  },
  {
    id: "saa-d3-003",
    section: "d3-high-performing",
    subtopic: "cloudfront",
    type: "single",
    prompt:
      "Worldwide users pull heavy static media from a single-Region S3 bucket and see slow downloads when they are geographically distant. What architecture change helps most?",
    options: [
      { id: "a", text: "Put Amazon CloudFront in front of the bucket as the origin" },
      { id: "b", text: "Place an Application Load Balancer in front of S3" },
      { id: "c", text: "Configure cross-Region S3 read replicas" },
      { id: "d", text: "Upgrade to a higher S3 storage tier only" },
    ],
    correct: ["a"],
    explanation:
      "CloudFront serves cached objects from edge PoPs near users, which lowers latency and lightens load on S3. ALBs are not used to front S3; S3 has no read-replica feature; storage class alone does not improve global delivery speed.",
    difficulty: "easy",
    services: ["cloudfront","s3"],
  },
  {
    id: "saa-d3-004",
    section: "d3-high-performing",
    subtopic: "efs",
    type: "single",
    prompt:
      "A group of EC2 instances in several Availability Zones must share one file tree and perform concurrent POSIX reads and writes. Which AWS storage option matches?",
    options: [
      { id: "a", text: "Separate Amazon EBS volumes on each instance" },
      { id: "b", text: "Amazon EFS mounted on every instance" },
      { id: "c", text: "Amazon S3 exposed as a local block device" },
      { id: "d", text: "Instance store disks on each host" },
    ],
    correct: ["b"],
    explanation:
      "EFS is a managed NFS-compatible file system that scales and allows many instances in multiple AZs to mount the same namespace. EBS is block storage tied to one instance per volume; S3 is object storage; instance store is local and ephemeral.",
    difficulty: "medium",
    services: ["efs","ebs","s3"],
  },
  {
    id: "saa-d3-005",
    section: "d3-high-performing",
    subtopic: "rds-basics",
    type: "single",
    prompt:
      "Heavy read-only reporting queries on your primary RDS are competing with production writes and slowing the app. How should you scale read capacity?",
    options: [
      { id: "a", text: "Provision RDS read replica(s) and send reporting traffic to them" },
      { id: "b", text: "Deploy Multi-AZ on the primary only" },
      { id: "c", text: "Extend automated backup retention" },
      { id: "d", text: "Relocate the primary instance to another AZ" },
    ],
    correct: ["a"],
    explanation:
      "Read replicas accept read-only connections and take pressure off the writer. Multi-AZ standby is not queryable; backup settings and AZ moves do not add read throughput.",
    difficulty: "medium",
    services: ["rds"],
  },
  {
    id: "saa-d3-006",
    section: "d3-high-performing",
    subtopic: "global-accelerator",
    type: "single",
    prompt:
      "A real-time multiplayer game uses TCP and needs stable anycast IPs, path optimization over the AWS backbone, and quick failover between Regions. Which service is the strongest match?",
    options: [
      { id: "a", text: "CloudFront CDN for cached HTTP delivery" },
      { id: "b", text: "Global Accelerator anycast performance routing" },
      { id: "c", text: "Amazon Route 53 latency-based routing alone" },
      { id: "d", text: "API Gateway managed HTTP/WebSocket APIs" },
    ],
    correct: ["b"],
    explanation:
      "Global Accelerator exposes fixed anycast addresses and steers TCP/UDP workloads across the private AWS network with health-based failover—well suited to interactive, non-cacheable traffic. CloudFront excels at caching HTTP/S assets, not raw game sessions.",
    difficulty: "hard",
    services: ["global-accelerator","cloudfront"],
  },
  {
    id: "saa-d3-007",
    section: "d3-high-performing",
    subtopic: "rds-basics",
    type: "multi",
    prompt:
      "Read demand on a relational database keeps climbing. Which TWO actions directly increase read performance? (Choose two.)",
    options: [
      { id: "a", text: "Front hot data with Amazon ElastiCache or another application-level cache" },
      { id: "b", text: "Stand up read replicas and point read workloads at them" },
      { id: "c", text: "Run backups more often" },
      { id: "d", text: "Enable Multi-AZ for synchronous standby" },
      { id: "e", text: "Narrow the maintenance window" },
    ],
    correct: ["a","b"],
    explanation:
      "In-memory caching and read replicas both add paths to serve reads faster and in parallel. Backup frequency, failover standby, and maintenance scheduling affect operations and availability—not read scaling.",
    difficulty: "medium",
    services: ["elasticache","rds"],
  },
  {
    id: "saa-d3-008",
    section: "d3-high-performing",
    subtopic: "kinesis",
    type: "single",
    prompt:
      "Marketing needs to capture click events as they happen and let analytics, alerting, and warehousing pipelines each consume the same live feed. Which AWS service is built for that pattern?",
    options: [
      { id: "a", text: "Kinesis Data Streams real-time shards" },
      { id: "b", text: "SQS standard queue for high-throughput decoupled messaging" },
      { id: "c", text: "Amazon S3 with object-created events" },
      { id: "d", text: "AWS Glue ETL and data catalog" },
    ],
    correct: ["a"],
    explanation:
      "Kinesis Data Streams ingests high-throughput streams and supports many independent consumers on one shard sequence. SQS delivers each message to one consumer; S3 is batch-oriented storage; Glue is primarily batch ETL.",
    difficulty: "medium",
    services: ["kinesis"],
  },
  {
    id: "saa-d3-009",
    section: "d3-high-performing",
    subtopic: "ec2-instance-types",
    type: "single",
    prompt:
      "You plan to run a tightly coupled HPC simulation on EC2. Which instance category emphasizes CPU performance?",
    options: [
      { id: "a", text: "Storage Optimized instances for high sequential disk I/O" },
      { id: "b", text: "Compute Optimized instances for CPU-bound workloads" },
      { id: "c", text: "Memory Optimized instances for large in-memory datasets" },
      { id: "d", text: "General Purpose instances for balanced CPU/memory needs" },
    ],
    correct: ["b"],
    explanation:
      "Compute Optimized (C instance families) prioritize vCPU power for CPU-bound science, rendering, and batch jobs. Storage-, memory-, and general-purpose families optimize other resource ratios.",
    difficulty: "easy",
    services: ["ec2"],
  },
  {
    id: "saa-d3-010",
    section: "d3-high-performing",
    subtopic: "ec2-instance-types",
    type: "single",
    prompt:
      "Production depends on an in-memory database that must hold a large working set in RAM. Which EC2 instance category fits best?",
    options: [
      { id: "a", text: "Compute Optimized instances for CPU-bound workloads" },
      { id: "b", text: "Storage Optimized instances for high sequential disk I/O" },
      { id: "c", text: "Memory Optimized instances for large in-memory datasets" },
      { id: "d", text: "General Purpose instances for balanced CPU/memory needs" },
    ],
    correct: ["c"],
    explanation:
      "Memory Optimized instances (R and related families) offer high memory-to-vCPU ratios for datasets and databases that live primarily in memory.",
    difficulty: "easy",
    services: ["ec2"],
  },
  {
    id: "saa-d3-011",
    section: "d3-high-performing",
    subtopic: "ec2-instance-types",
    type: "single",
    prompt:
      "You are lifting a busy e-commerce OLTP database that processes thousands of transactions per second onto EC2. Which instance type line should you favor?",
    options: [
      { id: "a", text: "Compute Optimized instances for CPU-bound workloads" },
      { id: "b", text: "Storage Optimized instances for high sequential disk I/O" },
      { id: "c", text: "Memory Optimized instances for large in-memory datasets" },
      { id: "d", text: "General Purpose instances for balanced CPU/memory needs" },
    ],
    correct: ["c"],
    explanation:
      "OLTP at high TPS benefits from ample RAM to cache buffers and indexes, which Memory Optimized shapes provide. Pure compute or disk-heavy families are secondary unless the bottleneck is clearly elsewhere.",
    difficulty: "medium",
    services: ["ec2"],
  },
  {
    id: "saa-d3-012",
    section: "d3-high-performing",
    subtopic: "ec2-placement",
    type: "single",
    prompt:
      "A cluster of EC2 nodes runs tightly coupled big-data jobs and must exchange data with the lowest latency and highest bandwidth between peers. Which placement group type should you use?",
    options: [
      { id: "a", text: "Spread placement group" },
      { id: "b", text: "Cluster placement group" },
      { id: "c", text: "Partition placement group" },
    ],
    correct: ["b"],
    explanation:
      "Cluster placement groups colocate instances in one AZ on low-latency hardware, maximizing east-west network performance. Spread and partition strategies prioritize fault isolation over raw inter-instance speed.",
    difficulty: "medium",
    services: ["ec2","placement-groups"],
  },
  {
    id: "saa-d3-013",
    section: "d3-high-performing",
    subtopic: "ebs-basics",
    type: "single",
    prompt:
      "After terminating an instance in us-east-1a, a colleague cannot attach its detached EBS volume to a new instance in us-east-1b. What is the most likely explanation?",
    options: [
      { id: "a", text: "Missing IAM permission to attach volumes" },
      { id: "b", text: "EBS volumes cannot leave their AWS Region" },
      { id: "c", text: "EBS volumes are bound to a single Availability Zone" },
    ],
    correct: ["c"],
    explanation:
      "Volume and instance must reside in the same AZ. To use the data in another AZ, snapshot the volume and create a new volume from that snapshot in the target AZ.",
    difficulty: "medium",
    services: ["ebs"],
  },
  {
    id: "saa-d3-014",
    section: "d3-high-performing",
    subtopic: "ebs-basics",
    type: "single",
    prompt:
      "An EC2 instance boots from a root EBS volume and also has a separate data EBS volume attached. When the instance is terminated, what happens to each volume by default?",
    options: [
      { id: "a", text: "Both volumes are deleted" },
      { id: "b", text: "The root volume is deleted; the additional volume remains" },
      { id: "c", text: "The root volume remains; the additional volume is deleted" },
      { id: "d", text: "Neither volume is deleted" },
    ],
    correct: ["b"],
    explanation:
      "Root volumes typically have DeleteOnTermination enabled, so they go away with the instance. Extra data volumes default to persisting unless you explicitly enable delete-on-termination for them.",
    difficulty: "medium",
    services: ["ebs","ec2"],
  },
  {
    id: "saa-d3-015",
    section: "d3-high-performing",
    subtopic: "ami",
    type: "single",
    prompt:
      "An AMI registered in us-east-1 (N. Virginia) can launch instances in any AWS Region without extra steps.",
    options: [
      { id: "a", text: "True — a us-east-1 AMI can launch EC2 instances in every Region as-is" },
      { id: "b", text: "False — AMIs are Regional; copy the AMI to another Region before launching there" },
    ],
    correct: ["b"],
    explanation:
      "AMIs are Regional resources. Launching elsewhere requires copying the AMI into the destination Region first.",
    difficulty: "easy",
    services: ["ec2","ami"],
  },
  {
    id: "saa-d3-016",
    section: "d3-high-performing",
    subtopic: "ebs-basics",
    type: "single",
    prompt:
      "Which combination of EBS volume types can serve as the boot volume when launching an EC2 instance?",
    options: [
      { id: "a", text: "gp2, gp3, st1, and sc1 volume families" },
      { id: "b", text: "gp2, gp3, io1, and io2 SSD volume families" },
      { id: "c", text: "io1, io2, st1, and sc1 volume families" },
    ],
    correct: ["b"],
    explanation:
      "Only SSD-backed types (General Purpose gp2/gp3 and Provisioned IOPS io1/io2) qualify as boot volumes. Throughput and cold HDD (st1, sc1) cannot boot an instance.",
    difficulty: "medium",
    services: ["ebs"],
  },
  {
    id: "saa-d3-017",
    section: "d3-high-performing",
    subtopic: "ebs-basics",
    type: "single",
    prompt:
      "What capability does EBS Multi-Attach provide?",
    options: [
      { id: "a", text: "One volume attached to multiple EC2 instances across different AZs" },
      { id: "b", text: "Many volumes in one AZ attached to a single EC2 instance" },
      { id: "c", text: "One io1/io2 volume attached to multiple EC2 instances in the same AZ" },
      { id: "d", text: "Many volumes in multiple AZs attached to one EC2 instance" },
    ],
    correct: ["c"],
    explanation:
      "Multi-Attach allows a single Provisioned IOPS SSD volume to be mounted by several instances simultaneously, but only within the same Availability Zone.",
    difficulty: "medium",
    services: ["ebs"],
  },
  {
    id: "saa-d3-018",
    section: "d3-high-performing",
    subtopic: "efs",
    type: "single",
    prompt:
      "Workers on EC2 spread across Availability Zones need a shared NFS mount for the same dataset. What should you deploy?",
    options: [
      { id: "a", text: "Amazon EBS — block volumes typically attached to one instance in one AZ" },
      { id: "b", text: "Amazon EFS — shared NFS file system mountable across AZs" },
      { id: "c", text: "Instance store — ephemeral disks local to a single host" },
    ],
    correct: ["b"],
    explanation:
      "EFS provides a Regional, elastic file system that multiple instances mount concurrently via NFS, including across AZs.",
    difficulty: "easy",
    services: ["efs"],
  },
  {
    id: "saa-d3-019",
    section: "d3-high-performing",
    subtopic: "instance-store",
    type: "single",
    prompt:
      "Your app needs ultra-fast local scratch space on EC2, and the data can be discarded when the instance stops or terminates. Which storage should you use?",
    options: [
      { id: "a", text: "EBS network-attached block storage" },
      { id: "b", text: "EFS shared elastic file system" },
      { id: "c", text: "Instance store physically attached ephemeral disks" },
    ],
    correct: ["c"],
    explanation:
      "Instance store volumes sit on the physical host and offer low-latency ephemeral capacity—appropriate when durability beyond the instance lifecycle is not required.",
    difficulty: "medium",
    services: ["instance-store","ec2"],
  },
  {
    id: "saa-d3-020",
    section: "d3-high-performing",
    subtopic: "ebs-basics",
    type: "single",
    prompt:
      "A database workload demands roughly 250,000 IOPS from a single EBS volume. Which option meets that requirement on EBS?",
    options: [
      { id: "a", text: "EBS gp2" },
      { id: "b", text: "EBS io1" },
      { id: "c", text: "EC2 Instance Store" },
      { id: "d", text: "EBS io2 Block Express" },
    ],
    correct: ["d"],
    explanation:
      "io2 Block Express is designed for extreme IOPS and sub-millisecond latency at scale. gp2 and standard io1 caps fall far short of this tier; instance store may be fast but is not the EBS answer for durable managed block storage at this IOPS level.",
    difficulty: "hard",
    services: ["ebs"],
  },
  {
    id: "saa-d3-021",
    section: "d3-high-performing",
    subtopic: "ec2-basics",
    type: "single",
    prompt:
      "Which statement best describes Amazon EC2?",
    options: [
      { id: "a", text: "On-demand, resizable virtual compute in the cloud" },
      { id: "b", text: "Managed object storage" },
      { id: "c", text: "Fully managed relational database service" },
      { id: "d", text: "Global HTTP content delivery service" },
    ],
    correct: ["a"],
    explanation:
      "EC2 supplies virtual machines you scale up or down. S3 stores objects, RDS runs managed SQL engines, and CloudFront accelerates web content—not general compute.",
    difficulty: "easy",
    services: ["ec2"],
  },
  {
    id: "saa-d3-022",
    section: "d3-high-performing",
    subtopic: "ec2-basics",
    type: "single",
    prompt:
      "In EC2 terms, what is an Amazon Machine Image (AMI)?",
    options: [
      { id: "a", text: "A launch template bundling OS image, software, and settings for new instances" },
      { id: "b", text: "A block storage volume type" },
      { id: "c", text: "A VPC subnet or route table object" },
      { id: "d", text: "A reserved-instance pricing contract" },
    ],
    correct: ["a"],
    explanation:
      "An AMI is the image EC2 boots from—it captures the operating environment. It is not EBS pricing, networking metadata, or a billing SKU by itself, and it is tied to a Region.",
    difficulty: "easy",
    services: ["ec2","ami"],
  },
  {
    id: "saa-d3-023",
    section: "d3-high-performing",
    subtopic: "ec2-basics",
    type: "single",
    prompt:
      "When does EC2 User Data execute?",
    options: [
      { id: "a", text: "One time at initial launch, with root-level access" },
      { id: "b", text: "On every interactive user login" },
      { id: "c", text: "Only after you SSH in manually" },
      { id: "d", text: "Never; it is run only by AWS Support on request" },
    ],
    correct: ["a"],
    explanation:
      "User Data scripts bootstrap the instance at first boot as root—for example installing packages or writing config—before normal operation.",
    difficulty: "easy",
    services: ["ec2"],
  },
  {
    id: "saa-d3-024",
    section: "d3-high-performing",
    subtopic: "ec2-basics",
    type: "single",
    prompt:
      "You STOP an EBS-backed EC2 instance (you do not terminate it). What happens to data on the root volume?",
    options: [
      { id: "a", text: "Data remains on the volume; you can start the instance again later" },
      { id: "b", text: "Data is erased immediately" },
      { id: "c", text: "Data is copied automatically into S3" },
      { id: "d", text: "Data is wiped and the volume is re-encrypted from scratch" },
    ],
    correct: ["a"],
    explanation:
      "Stop preserves attached EBS volumes including the root disk. Termination (with default delete-on-termination on the root) removes the root volume.",
    difficulty: "medium",
    services: ["ec2","ebs"],
  },
  {
    id: "saa-d3-025",
    section: "d3-high-performing",
    subtopic: "ec2-instance-types",
    type: "single",
    prompt:
      "For an instance size named m5.large, what does the letter m represent?",
    options: [
      { id: "a", text: "The instance family—in this case general purpose" },
      { id: "b", text: "The vCPU count" },
      { id: "c", text: "The hosting Region code" },
      { id: "d", text: "Included EBS capacity in GiB" },
    ],
    correct: ["a"],
    explanation:
      "Naming follows family letter (m = general purpose, c = compute, r = memory, etc.), generation number (5), and size suffix (large). It does not encode Region or exact vCPU count in the letter alone.",
    difficulty: "medium",
    services: ["ec2"],
  },
  {
    id: "saa-d3-026",
    section: "d3-high-performing",
    subtopic: "ec2-instance-types",
    type: "single",
    prompt:
      "For typical web and application servers without an extreme CPU, memory, or disk skew, which EC2 family is the usual starting point?",
    options: [
      { id: "a", text: "General Purpose (T and M families, for example)" },
      { id: "b", text: "Compute Optimized instances for CPU-bound workloads" },
      { id: "c", text: "Memory Optimized instances for large in-memory datasets" },
      { id: "d", text: "Storage Optimized instances for high sequential disk I/O" },
    ],
    correct: ["a"],
    explanation:
      "General Purpose instances balance compute, memory, and networking. Move to specialized families when profiling shows a clear bottleneck in CPU, RAM, or local storage throughput.",
    difficulty: "easy",
    services: ["ec2"],
  },
  {
    id: "saa-d3-027",
    section: "d3-high-performing",
    subtopic: "ec2-placement",
    type: "single",
    prompt:
      "Large distributed stores such as HDFS, HBase, or Cassandra benefit from spreading instances across fault-isolated rack groups. Which placement group strategy is designed for that?",
    options: [
      { id: "a", text: "Partition placement group — spread across partitions" },
      { id: "b", text: "Cluster placement group — pack instances close together" },
      { id: "c", text: "Spread placement group — one instance per hardware rack" },
      { id: "d", text: "Default placement with no dedicated placement group" },
    ],
    correct: ["a"],
    explanation:
      "Partition placement groups place instances in separate partitions (rack cohorts) so one hardware failure affects only a slice of the fleet—matching replicated big-data topologies.",
    difficulty: "medium",
    services: ["ec2","placement-groups"],
  },
  {
    id: "saa-d3-028",
    section: "d3-high-performing",
    subtopic: "ec2-placement",
    type: "single",
    prompt:
      "What is an important downside of using a Cluster placement group?",
    options: [
      { id: "a", text: "Excellent inter-instance networking, but all members sit in one AZ, so an AZ outage can hit the entire group" },
      { id: "b", text: "Instances are automatically distributed across all Regions" },
      { id: "c", text: "Enhanced networking cannot be used" },
      { id: "d", text: "Only a single instance is permitted" },
    ],
    correct: ["a"],
    explanation:
      "Cluster groups trade geographic/AZ spread for proximity and bandwidth. They do not span Regions, do not block enhanced networking, and support many instances—not one.",
    difficulty: "medium",
    services: ["ec2","placement-groups"],
  },
  {
    id: "saa-d3-029",
    section: "d3-high-performing",
    subtopic: "ec2-placement",
    type: "single",
    prompt:
      "When is a Spread placement group the best choice?",
    options: [
      { id: "a", text: "A handful of critical instances that must run on separate underlying hardware" },
      { id: "b", text: "Maximizing network throughput for an HPC cluster in one AZ" },
      { id: "c", text: "Cramming thousands of nodes onto one physical rack" },
      { id: "d", text: "Lowering the hourly EC2 rate" },
    ],
    correct: ["a"],
    explanation:
      "Spread isolates each instance on distinct racks (with per-AZ limits), ideal for small sets of singleton-critical VMs. Cluster optimizes throughput; placement groups do not change instance pricing.",
    difficulty: "medium",
    services: ["ec2","placement-groups"],
  },
  {
    id: "saa-d3-030",
    section: "d3-high-performing",
    subtopic: "ebs-snapshots",
    type: "single",
    prompt:
      "How should you define an Amazon EBS snapshot?",
    options: [
      { id: "a", text: "An incremental, point-in-time copy of a volume stored durably in S3 behind the scenes" },
      { id: "b", text: "A duplicate of an AMI image" },
      { id: "c", text: "A dump of the instance's live memory" },
      { id: "d", text: "An export of VPC security group rules" },
    ],
    correct: ["a"],
    explanation:
      "Snapshots capture EBS volume state at a moment in time; AWS stores them redundantly (S3-backed) and you use them to recreate volumes or copy data across AZs and Regions.",
    difficulty: "easy",
    services: ["ebs"],
  },
  {
    id: "saa-d3-031",
    section: "d3-high-performing",
    subtopic: "ebs-snapshots",
    type: "single",
    prompt:
      "You need the contents of an EBS volume available on an instance in a different Availability Zone (or Region). What is the supported approach?",
    options: [
      { id: "a", text: "Snapshot the volume, then create a new volume from the snapshot in the target AZ (copy the snapshot to the other Region first if required)" },
      { id: "b", text: "Detach in the source AZ and attach directly in the destination AZ" },
      { id: "c", text: "Wait for automatic cross-AZ replication of the volume" },
      { id: "d", text: "Enable Multi-Attach across Availability Zones" },
    ],
    correct: ["a"],
    explanation:
      "Volumes are AZ-scoped, so cross-AZ or cross-Region moves go through snapshots (and Regional snapshot copy when changing Region). Direct cross-AZ attach and Multi-Attach across AZs are not supported.",
    difficulty: "medium",
    services: ["ebs"],
  },
  {
    id: "saa-d3-032",
    section: "d3-high-performing",
    subtopic: "ami",
    type: "single",
    prompt:
      "Which approach produces a private Amazon Machine Image from your own baseline?",
    options: [
      { id: "a", text: "Launch and configure an EC2 instance, then create an AMI from it (AWS stores volume snapshots the image references)" },
      { id: "b", text: "Define the image in an S3 bucket policy document" },
      { id: "c", text: "Allocate a new Elastic IP and register it as an AMI" },
      { id: "d", text: "Export a security group and import it as an AMI" },
    ],
    correct: ["a"],
    explanation:
      "Custom AMIs come from a running or stopped instance you have prepared. EC2 snapshots the attached EBS volumes and registers an AMI that points at those snapshots, so future launches inherit that configuration.",
    difficulty: "easy",
    services: ["ec2","ami"],
  },
  {
    id: "saa-d3-033",
    section: "d3-high-performing",
    subtopic: "ami",
    type: "single",
    prompt:
      "Your team built a custom AMI in us-east-1 and must deploy identical EC2 instances in eu-west-1. What step is required?",
    options: [
      { id: "a", text: "Copy the AMI into eu-west-1 before launching instances there" },
      { id: "b", text: "No action — AMIs are available in every Region automatically" },
      { id: "c", text: "Manually rebuild each server in the target Region without an AMI" },
      { id: "d", text: "Turn on Multi-Attach for the AMI to span Regions" },
    ],
    correct: ["a"],
    explanation:
      "An AMI exists only in the Region where it was created. Use AMI copy to replicate the image and its snapshot data into the destination Region, then launch from the copy.",
    difficulty: "medium",
    services: ["ec2","ami"],
  },
  {
    id: "saa-d3-034",
    section: "d3-high-performing",
    subtopic: "ami",
    type: "single",
    prompt:
      "A platform team wants predictable, quick instance bootstraps. Why might they ship a golden AMI with applications pre-installed instead of relying solely on User Data scripts?",
    options: [
      { id: "a", text: "Boot times shrink and every instance starts from the same baked-in software stack" },
      { id: "b", text: "AWS mandates golden AMIs for production workloads" },
      { id: "c", text: "Golden AMIs remove all charges for attached EBS volumes" },
      { id: "d", text: "Golden AMIs bypass security group enforcement" },
    ],
    correct: ["a"],
    explanation:
      "Pre-installing software in the image avoids repeating long install steps at every launch and reduces drift between instances. User Data still works but adds variability and boot delay compared to a standardized AMI.",
    difficulty: "medium",
    services: ["ec2","ami"],
  },
  {
    id: "saa-d3-035",
    section: "d3-high-performing",
    subtopic: "ami",
    type: "single",
    prompt:
      "When you register an AMI, what components does AWS associate with that image?",
    options: [
      { id: "a", text: "Operating system, configuration, and EBS snapshot data (via block device mappings) required to start an instance" },
      { id: "b", text: "The EC2 instance type only" },
      { id: "c", text: "Attached security group rules only" },
      { id: "d", text: "A reserved Elastic IP address only" },
    ],
    correct: ["a"],
    explanation:
      "An AMI is a launch template: it describes which EBS snapshots (root and optional data volumes) to attach, along with metadata like architecture and virtualization type. Instance type, security groups, and Elastic IPs are chosen at launch, not embedded in the AMI itself.",
    difficulty: "easy",
    services: ["ec2","ami"],
  },
  {
    id: "saa-d3-036",
    section: "d3-high-performing",
    subtopic: "instance-store",
    type: "single",
    prompt:
      "An EC2 instance uses locally attached Instance Store volumes. What happens to data on those disks when the instance stops or is terminated?",
    options: [
      { id: "a", text: "The data is discarded — Instance Store is ephemeral storage on the physical host" },
      { id: "b", text: "The data remains available like data on a detached EBS volume" },
      { id: "c", text: "AWS automatically replicates the data to S3" },
      { id: "d", text: "AWS creates EBS snapshots of Instance Store automatically" },
    ],
    correct: ["a"],
    explanation:
      "Instance Store lives on the hypervisor host and is not durable across stop, terminate, or hardware failure. For data that must survive those events, attach EBS or another persistent service.",
    difficulty: "easy",
    services: ["instance-store"],
  },
  {
    id: "saa-d3-037",
    section: "d3-high-performing",
    subtopic: "instance-store",
    type: "single",
    prompt:
      "A performance-sensitive workload needs the lowest possible latency to disk and can tolerate data loss on instance failure. Why pick Instance Store over EBS?",
    options: [
      { id: "a", text: "Local NVMe or SSD on the host delivers very high IOPS and throughput for temporary data" },
      { id: "b", text: "Instance Store is designed for durable archival storage" },
      { id: "c", text: "Instance Store volumes can be moved between instances like EBS" },
      { id: "d", text: "Instance Store has no usage charges under any instance type" },
    ],
    correct: ["a"],
    explanation:
      "Because disks are physically local, Instance Store often outperforms network-attached EBS for scratch, cache, and streaming buffers. The tradeoff is no persistence—EBS is the choice when durability matters.",
    difficulty: "medium",
    services: ["instance-store"],
  },
  {
    id: "saa-d3-038",
    section: "d3-high-performing",
    subtopic: "instance-store",
    type: "single",
    prompt:
      "Which comparison between Amazon EBS and EC2 Instance Store is accurate?",
    options: [
      { id: "a", text: "EBS is persistent block storage whose lifecycle can be independent of the instance; Instance Store is ephemeral and lost when the instance or host goes away" },
      { id: "b", text: "Both storage types keep data after the instance is terminated" },
      { id: "c", text: "Instance Store supports Multi-Attach across Availability Zones" },
      { id: "d", text: "EBS is ephemeral while Instance Store is the durable option" },
    ],
    correct: ["a"],
    explanation:
      "EBS is network block storage that can outlive an instance (subject to DeleteOnTermination settings) and supports snapshots. Instance Store is tied to the host and suitable only when you accept ephemeral behavior.",
    difficulty: "medium",
    services: ["instance-store","ebs"],
  },
  {
    id: "saa-d3-039",
    section: "d3-high-performing",
    subtopic: "instance-store",
    type: "single",
    prompt:
      "Which application pattern is the strongest match for Instance Store?",
    options: [
      { id: "a", text: "A rebuildable in-memory-style cache or temp workspace that favors speed over durability" },
      { id: "b", text: "The sole copy of a transactional database" },
      { id: "c", text: "Compliance archives that must be retained for years" },
      { id: "d", text: "A shared file repository for a fleet of web servers" },
    ],
    correct: ["a"],
    explanation:
      "Use Instance Store when losing the data is acceptable or recoverable. Primary databases, long-term backups, and shared files need EBS, RDS, EFS, or S3 instead.",
    difficulty: "easy",
    services: ["instance-store"],
  },
  {
    id: "saa-d3-040",
    section: "d3-high-performing",
    subtopic: "efs",
    type: "single",
    prompt:
      "How does capacity work on a standard Amazon EFS file system?",
    options: [
      { id: "a", text: "Storage expands and contracts automatically as you add or delete files" },
      { id: "b", text: "You must allocate a fixed quota before creating files" },
      { id: "c", text: "Total size is hard-limited to 16 TiB per file system" },
      { id: "d", text: "Administrators resize the file system manually with CLI commands" },
    ],
    correct: ["a"],
    explanation:
      "EFS is elastic NFS storage: you do not pre-provision capacity. Billing follows actual stored data, and the service scales throughput and size with usage (subject to performance modes and tiers you choose).",
    difficulty: "easy",
    services: ["efs"],
  },
  {
    id: "saa-d3-041",
    section: "d3-high-performing",
    subtopic: "efs",
    type: "single",
    prompt:
      "Your architecture needs many Linux EC2 instances in different Availability Zones to read and write the same directory tree concurrently. Which mount target fits?",
    options: [
      { id: "a", text: "Amazon EFS — multiple Linux instances mount the same file system over NFS across AZs" },
      { id: "b", text: "A single Windows EC2 instance with local disk only" },
      { id: "c", text: "AWS Lambda functions without a VPC attachment" },
      { id: "d", text: "One EC2 instance exclusively — no concurrent mounts" },
    ],
    correct: ["a"],
    explanation:
      "EFS is built for shared POSIX access from many Linux clients simultaneously. Windows SMB shares use FSx; Lambda needs VPC configuration to reach EFS; EBS normally attaches to one instance at a time.",
    difficulty: "medium",
    services: ["efs"],
  },
  {
    id: "saa-d3-042",
    section: "d3-high-performing",
    subtopic: "efs",
    type: "single",
    prompt:
      "What is the fundamental architectural difference between Amazon EFS and Amazon EBS?",
    options: [
      { id: "a", text: "EFS offers a shared NFS file system reachable from many instances across AZs; EBS is a block device typically bound to one instance in one AZ" },
      { id: "b", text: "EFS is block storage while EBS stores objects in buckets" },
      { id: "c", text: "EBS is multi-AZ shared NFS and EFS is single-attach block storage" },
      { id: "d", text: "They differ only in pricing, not in access model" },
    ],
    correct: ["a"],
    explanation:
      "Choose EFS when many hosts need the same files at file-system semantics. Choose EBS when one instance needs a low-latency block volume (with exceptions like Multi-Attach for specific use cases).",
    difficulty: "medium",
    services: ["efs","ebs"],
  },
  {
    id: "saa-d3-043",
    section: "d3-high-performing",
    subtopic: "rds-basics",
    type: "single",
    prompt:
      "Which description best defines Amazon RDS?",
    options: [
      { id: "a", text: "Managed relational databases — AWS handles operations like patching and backups for engines such as MySQL, PostgreSQL, MariaDB, Oracle, and SQL Server" },
      { id: "b", text: "A serverless key-value NoSQL datastore" },
      { id: "c", text: "Durable object storage for unstructured files" },
      { id: "d", text: "An in-memory key-value cache cluster" },
    ],
    correct: ["a"],
    explanation:
      "RDS automates relational DB administration. DynamoDB covers NoSQL keys, S3 holds objects, and ElastiCache provides caching—not primary transactional SQL storage.",
    difficulty: "easy",
    services: ["rds"],
  },
  {
    id: "saa-d3-044",
    section: "d3-high-performing",
    subtopic: "rds-basics",
    type: "single",
    prompt:
      "How do RDS Read Replicas differ from a Multi-AZ deployment?",
    options: [
      { id: "a", text: "Read Replicas use asynchronous replication to offload reads (including cross-Region); Multi-AZ keeps a synchronous standby for high availability and automatic failover" },
      { id: "b", text: "They are two names for the same RDS feature" },
      { id: "c", text: "Read Replicas automatically promote on primary failure without configuration" },
      { id: "d", text: "Multi-AZ is primarily for distributing read-heavy traffic" },
    ],
    correct: ["a"],
    explanation:
      "Scale reads with replicas (accept eventual consistency). Protect uptime with Multi-AZ, where the standby is not meant for read traffic but for synchronous failover. Promoting a replica is a separate DR pattern.",
    difficulty: "medium",
    services: ["rds"],
  },
  {
    id: "saa-d3-045",
    section: "d3-high-performing",
    subtopic: "aurora",
    type: "single",
    prompt:
      "An Aurora cluster has one writer and several Aurora Replicas. How should the application send SELECT traffic?",
    options: [
      { id: "a", text: "Use the cluster reader endpoint so Aurora distributes connections across replicas" },
      { id: "b", text: "Send all reads and writes to the cluster writer endpoint" },
      { id: "c", text: "Hard-code each replica instance endpoint in the client" },
      { id: "d", text: "Aurora does not support read scaling with replicas" },
    ],
    correct: ["a"],
    explanation:
      "The reader endpoint load-balances read sessions among healthy replicas and adjusts as replicas are added or removed. The writer endpoint targets the primary for write operations.",
    difficulty: "medium",
    services: ["aurora"],
  },
  {
    id: "saa-d3-046",
    section: "d3-high-performing",
    subtopic: "elasticache",
    type: "single",
    prompt:
      "What service category does Amazon ElastiCache belong to?",
    options: [
      { id: "a", text: "Managed in-memory caching with Valkey, Redis OSS, or Memcached engines" },
      { id: "b", text: "Fully managed SQL relational databases" },
      { id: "c", text: "Scalable object storage in buckets" },
      { id: "d", text: "Layer-7 traffic distribution for HTTP requests" },
    ],
    correct: ["a"],
    explanation:
      "ElastiCache hosts Valkey, Redis OSS, or Memcached clusters in the cloud so applications can store hot data in RAM. It complements—not replaces—databases and load balancers.",
    difficulty: "easy",
    services: ["elasticache"],
  },
  {
    id: "saa-d3-047",
    section: "d3-high-performing",
    subtopic: "elasticache",
    type: "single",
    prompt:
      "Dashboard users hammer the same RDS queries millions of times per day. Which ElastiCache pattern addresses this?",
    options: [
      { id: "a", text: "Store query results in the cache so repeat reads avoid round trips to RDS" },
      { id: "b", text: "Drop RDS and point the app at ElastiCache with zero schema changes" },
      { id: "c", text: "Enable transparent RDS encryption through ElastiCache" },
      { id: "d", text: "Configure ElastiCache to perform Multi-AZ RDS failover" },
    ],
    correct: ["a"],
    explanation:
      "Cache-aside (or similar) keeps frequently accessed results in memory, lowering latency and DB CPU. The application still owns cache population and invalidation; ElastiCache is not a drop-in relational store or HA substitute for RDS.",
    difficulty: "easy",
    services: ["elasticache","rds"],
  },
  {
    id: "saa-d3-048",
    section: "d3-high-performing",
    subtopic: "elasticache",
    type: "single",
    prompt:
      "When choosing among Valkey, Redis OSS, and Memcached on ElastiCache, which capability summary is correct?",
    options: [
      { id: "a", text: "Valkey and Redis OSS offer replication, optional persistence, and richer data structures; Memcached is a lightweight multi-threaded cache without built-in persistence" },
      { id: "b", text: "Memcached provides replication and disk persistence while Valkey and Redis OSS do not" },
      { id: "c", text: "Valkey and Redis OSS cannot persist data to disk under any configuration" },
      { id: "d", text: "All three engines expose identical persistence and clustering models" },
    ],
    correct: ["a"],
    explanation:
      "Pick Valkey or Redis OSS when you need durability features, pub/sub, or complex types. Memcached excels at simple, horizontally scaled RAM caching where losing a node’s data is acceptable.",
    difficulty: "medium",
    services: ["elasticache"],
  },
  {
    id: "saa-d3-049",
    section: "d3-high-performing",
    subtopic: "elasticache",
    type: "single",
    prompt:
      "You are autoscaling a stateless web fleet behind an Application Load Balancer. Where should session data go so any task can serve any user?",
    options: [
      { id: "a", text: "Centralize sessions in ElastiCache (or another external store) reachable from every instance" },
      { id: "b", text: "Rely only on ALB sticky sessions without shared storage" },
      { id: "c", text: "Write sessions to each instance’s local filesystem" },
      { id: "d", text: "Remove the load balancer so users always hit the same server" },
    ],
    correct: ["a"],
    explanation:
      "External session storage decouples user state from individual EC2 instances, enabling safe scale-in/out. Sticky sessions or local disks tie users to specific nodes and fight autoscaling.",
    difficulty: "medium",
    services: ["elasticache"],
  },
  {
    id: "saa-d3-050",
    section: "d3-high-performing",
    subtopic: "r53-routing",
    type: "single",
    prompt:
      "Global users should reach the AWS Region that minimizes network latency for each client. Which Amazon Route 53 routing policy applies?",
    options: [
      { id: "a", text: "Latency-based Route 53 routing to the lowest-latency Region" },
      { id: "b", text: "Weighted Route 53 routing to split traffic by weight" },
      { id: "c", text: "Geolocation Route 53 routing by user location" },
      { id: "d", text: "Simple Route 53 routing with a single record" },
    ],
    correct: ["a"],
    explanation:
      "Latency-based routing uses measured RTT to steer DNS answers toward the lowest-latency healthy Region. Geolocation picks by geographic rule, weighted splits by percentage, and simple routing returns one record without optimization.",
    difficulty: "medium",
    services: ["route-53"],
  },
  {
    id: "saa-d3-051",
    section: "d3-high-performing",
    subtopic: "arch-patterns",
    type: "single",
    prompt:
      "A retail site runs horizontally scaled web servers. Shopping cart contents must survive refreshes and land on any server in the pool. Where should cart state reside?",
    options: [
      { id: "a", text: "A shared external datastore such as ElastiCache or DynamoDB" },
      { id: "b", text: "Local disk on whichever instance first received the user" },
      { id: "c", text: "Inside the load balancer’s memory only" },
      { id: "d", text: "Ephemeral instance store volumes on each web node" },
    ],
    correct: ["a"],
    explanation:
      "Cart and session data must live outside individual EC2 instances so the tier stays stateless. ElastiCache suits session blobs; DynamoDB suits durable keyed cart records. Local or instance store breaks when traffic shifts instances.",
    difficulty: "medium",
    services: ["elasticache","dynamodb"],
  },
  {
    id: "saa-d3-052",
    section: "d3-high-performing",
    subtopic: "arch-patterns",
    type: "single",
    prompt:
      "Several EC2 instances host WordPress and must present identical upload directories as a mounted path. Which AWS storage service satisfies that requirement?",
    options: [
      { id: "a", text: "Amazon EFS as a shared NFS mount for all instances" },
      { id: "b", text: "Separate EBS volumes, one per instance, with manual sync" },
      { id: "c", text: "Instance Store on each host for wp-content uploads" },
      { id: "d", text: "S3 Glacier Deep Archive mounted as POSIX" },
    ],
    correct: ["a"],
    explanation:
      "WordPress expects a common filesystem path for media. EFS lets every Linux instance mount the same tree. Per-instance EBS lacks sharing; instance store is ephemeral; Glacier is archival object storage, not a live mount.",
    difficulty: "medium",
    services: ["efs"],
  },
  {
    id: "saa-d3-053",
    section: "d3-high-performing",
    subtopic: "s3-basics",
    type: "single",
    prompt:
      "Which statement describes Amazon S3 at a high level?",
    options: [
      { id: "a", text: "Regional object storage: files live as objects in buckets with extreme durability and virtually unlimited scale" },
      { id: "b", text: "Block volumes attached to a single EC2 instance" },
      { id: "c", text: "A managed engine for SQL transactions" },
      { id: "d", text: "A POSIX NFS file share for many EC2 hosts" },
    ],
    correct: ["a"],
    explanation:
      "S3 stores objects addressed by key within buckets. It is not block storage (EBS), relational (RDS), or shared file (EFS)—it is optimized for durable, scalable object workloads.",
    difficulty: "easy",
    services: ["s3"],
  },
  {
    id: "saa-d3-054",
    section: "d3-high-performing",
    subtopic: "s3-basics",
    type: "single",
    prompt:
      "Which fact about S3 buckets and objects is true?",
    options: [
      { id: "a", text: "Each object has a unique key within its bucket, and S3 bucket names must be globally unique" },
      { id: "b", text: "S3 exposes raw block devices to applications" },
      { id: "c", text: "Buckets are tied to a single Availability Zone like EBS volumes" },
      { id: "d", text: "No object may exceed 5 GB in size under any upload method" },
    ],
    correct: ["a"],
    explanation:
      "Objects are identified by bucket plus key. Bucket names are global across AWS. Objects can reach 5 TB using multipart upload; the 5 GB limit applies to a single PUT, not the maximum object size.",
    difficulty: "medium",
    services: ["s3"],
  },
  {
    id: "saa-d3-055",
    section: "d3-high-performing",
    subtopic: "s3-basics",
    type: "single",
    prompt:
      "What durability target does the S3 Standard storage class advertise?",
    options: [
      { id: "a", text: "99.999999999% (11 nines) across redundant storage in multiple Availability Zones" },
      { id: "b", text: "A single replica stored in one Availability Zone" },
      { id: "c", text: "Approximately 99% annual durability" },
      { id: "d", text: "No published durability SLA" },
    ],
    correct: ["a"],
    explanation:
      "S3 Standard spreads object data across many devices and AZs to achieve 11 nines of designed durability. Lower storage classes trade cost for different access or redundancy models but Standard is the baseline high-durability tier.",
    difficulty: "easy",
    services: ["s3"],
  },
  {
    id: "saa-d3-056",
    section: "d3-high-performing",
    subtopic: "s3-basics",
    type: "single",
    prompt:
      "Can you publish a static website (HTML, CSS, JavaScript) directly from S3?",
    options: [
      { id: "a", text: "Yes — enable static website hosting on the bucket to serve those assets over HTTP" },
      { id: "b", text: "No — S3 accepts backup archives only" },
      { id: "c", text: "Only if every page is rendered by an EC2 web server in the same bucket" },
      { id: "d", text: "Only when fronted by an RDS database endpoint" },
    ],
    correct: ["a"],
    explanation:
      "Static website hosting serves index and error documents from the bucket. Teams often add CloudFront for HTTPS, caching, and custom domains, but S3 alone can host static content.",
    difficulty: "easy",
    services: ["s3"],
  },
  {
    id: "saa-d3-057",
    section: "d3-high-performing",
    subtopic: "s3-basics",
    type: "single",
    prompt:
      "Which workloads commonly rely on Amazon S3?",
    options: [
      { id: "a", text: "Backup archives, analytics data lakes, video assets, and static web content" },
      { id: "b", text: "Primary OLTP relational tables with SQL joins" },
      { id: "c", text: "Interactive remote desktop sessions for developers" },
      { id: "d", text: "EC2 instance root volumes at boot time" },
    ],
    correct: ["a"],
    explanation:
      "S3 excels at durable, cheap object storage for unstructured or semi-structured data. Transactional SQL belongs on RDS/Aurora; boot volumes use EBS; desktops are not an S3 use case.",
    difficulty: "easy",
    services: ["s3"],
  },
  {
    id: "saa-d3-058",
    section: "d3-high-performing",
    subtopic: "s3-events-perf",
    type: "single",
    prompt:
      "Remote clients upload multi-gigabyte files to S3 over slow long-haul links. Which combination improves throughput?",
    options: [
      { id: "a", text: "Multipart upload for parallel parts plus S3 Transfer Acceleration via the CloudFront edge network" },
      { id: "b", text: "Move objects immediately to Glacier Deep Archive before upload completes" },
      { id: "c", text: "Disable bucket versioning to reduce API calls" },
      { id: "d", text: "Force all traffic through a NAT gateway in the bucket Region" },
    ],
    correct: ["a"],
    explanation:
      "Multipart upload splits large objects so parts upload concurrently and retries are granular. Transfer Acceleration routes data to a nearby edge location and then over AWS backbone to the bucket Region.",
    difficulty: "medium",
    services: ["s3"],
  },
  {
    id: "saa-d3-059",
    section: "d3-high-performing",
    subtopic: "s3-events-perf",
    type: "single",
    prompt:
      "Which statement reflects Amazon S3 request scalability?",
    options: [
      { id: "a", text: "S3 handles very high request rates per prefix; using varied key prefixes increases aggregate parallelism" },
      { id: "b", text: "Each bucket is capped at one read or write per second" },
      { id: "c", text: "Operators must pre-warm buckets before production traffic" },
      { id: "d", text: "Throughput is fixed solely by the bucket’s home Region name" },
    ],
    correct: ["a"],
    explanation:
      "S3 automatically scales to high request rates. Workloads can increase aggregate throughput by using multiple prefixes and parallel requests. There is no manual warm-up step for normal workloads.",
    difficulty: "medium",
    services: ["s3"],
  },
  {
    id: "saa-d3-060",
    section: "d3-high-performing",
    subtopic: "cloudfront",
    type: "single",
    prompt:
      "What role does Amazon CloudFront play in a global application?",
    options: [
      { id: "a", text: "A CDN that caches responses at edge PoPs so users receive content with lower latency" },
      { id: "b", text: "A hosted relational database for web tiers" },
      { id: "c", text: "An internal-only load balancer confined to one Availability Zone" },
      { id: "d", text: "A managed IPsec site-to-site VPN appliance" },
    ],
    correct: ["a"],
    explanation:
      "CloudFront pulls from origins (S3, ALB, custom HTTP) and serves cached copies from the edge, cutting round-trip time and origin load. It is not a database, AZ-local LB, or VPN product.",
    difficulty: "easy",
    services: ["cloudfront"],
  },
  {
    id: "saa-d3-061",
    section: "d3-high-performing",
    subtopic: "cloudfront",
    type: "single",
    prompt:
      "You deployed new assets to the origin, but viewers still receive stale objects from CloudFront until TTL expiry. How do you flush the old content immediately?",
    options: [
      { id: "a", text: "Submit a cache invalidation for the affected object paths or wildcards" },
      { id: "b", text: "Delete the entire distribution and create a new one" },
      { id: "c", text: "Rename the S3 bucket that backs the origin" },
      { id: "d", text: "Turn off S3 versioning on the origin bucket" },
    ],
    correct: ["a"],
    explanation:
      "Invalidations remove specified paths from edge caches so the next request refetches from origin. Versioned file names (cache busting) avoid invalidation costs; recreating the distribution is unnecessary and disruptive.",
    difficulty: "medium",
    services: ["cloudfront"],
  },
  {
    id: "saa-d3-062",
    section: "d3-high-performing",
    subtopic: "global-accelerator",
    type: "single",
    prompt:
      "Which capability does AWS Global Accelerator primarily deliver?",
    options: [
      { id: "a", text: "Two static anycast IPs and traffic steering over the AWS global network to the closest healthy endpoint for TCP/UDP workloads" },
      { id: "b", text: "HTTP edge caching like a traditional CDN" },
      { id: "c", text: "Managed installation of SQL Server on EC2" },
      { id: "d", text: "Public DNS zone registration and record hosting only" },
    ],
    correct: ["a"],
    explanation:
      "Global Accelerator improves reachability and performance for interactive, non-cacheable protocols by entering the AWS backbone early. CloudFront caches HTTP/S content; Route 53 hosts DNS; RDS/SQL Server management is unrelated.",
    difficulty: "medium",
    services: ["global-accelerator"],
  },
  {
    id: "saa-d3-063",
    section: "d3-high-performing",
    subtopic: "global-accelerator",
    type: "single",
    prompt:
      "For which type of application is AWS Global Accelerator the strongest fit?",
    options: [
      { id: "a", text: "Real-time TCP/UDP workloads outside HTTP (games, voice) that need low latency, stable anycast IPs, and rapid cross-Region failover" },
      { id: "b", text: "A brochure site whose assets are almost entirely cacheable at the edge" },
      { id: "c", text: "Overnight ETL jobs where completion time matters more than response time" },
      { id: "d", text: "Interactive analytics on a petabyte-scale warehouse" },
    ],
    correct: ["a"],
    explanation:
      "Global Accelerator optimizes latency-sensitive, non-HTTP protocols on the AWS backbone. Heavily cacheable web assets are a better match for Amazon CloudFront.",
    difficulty: "medium",
    services: ["global-accelerator"],
  },
  {
    id: "saa-d3-064",
    section: "d3-high-performing",
    subtopic: "global-accelerator",
    type: "single",
    prompt:
      "Why do teams value Global Accelerator’s pair of static anycast IP addresses?",
    options: [
      { id: "a", text: "Applications expose consistent IPs to clients while Global Accelerator steers to the best healthy endpoint and shifts quickly when a Region fails" },
      { id: "b", text: "They enable edge caching of HTTP GET responses" },
      { id: "c", text: "They turn on server-side encryption for stored data automatically" },
      { id: "d", text: "They remove the need for IAM policies on API calls" },
    ],
    correct: ["a"],
    explanation:
      "Stable anycast IPs simplify firewall rules and DNS; Global Accelerator handles health-aware routing and fast failover without clients changing endpoints.",
    difficulty: "medium",
    services: ["global-accelerator"],
  },
  {
    id: "saa-d3-065",
    section: "d3-high-performing",
    subtopic: "global-accelerator",
    type: "single",
    prompt:
      "Describe how Global Accelerator delivers traffic from end users to your application.",
    options: [
      { id: "a", text: "Traffic enters AWS at a nearby edge location, then rides the private global network to the nearest healthy endpoint you configured" },
      { id: "b", text: "It load-balances uniformly across every registered endpoint regardless of health" },
      { id: "c", text: "It stays on the public internet for the entire path from client to origin" },
      { id: "d", text: "It always terminates in one predetermined AWS Region only" },
    ],
    correct: ["a"],
    explanation:
      "Early entry onto the AWS backbone reduces hops on the public internet, which typically improves latency and path stability compared with end-to-end public routing.",
    difficulty: "medium",
    services: ["global-accelerator"],
  },
  {
    id: "saa-d3-066",
    section: "d3-high-performing",
    subtopic: "fsx",
    type: "single",
    prompt:
      "Which description best characterizes Amazon FSx?",
    options: [
      { id: "a", text: "Fully managed file systems built on specialized engines—Windows File Server, Lustre, NetApp ONTAP, and OpenZFS—for demanding workloads" },
      { id: "b", text: "Durable object storage with REST APIs" },
      { id: "c", text: "A managed SQL database engine" },
      { id: "d", text: "A global CDN for static and dynamic content" },
    ],
    correct: ["a"],
    explanation:
      "FSx delivers managed file storage in several technology-specific variants, whereas Amazon EFS targets general Linux NFS use cases.",
    difficulty: "easy",
    services: ["fsx"],
  },
  {
    id: "saa-d3-067",
    section: "d3-high-performing",
    subtopic: "fsx",
    type: "single",
    prompt:
      "Your Windows EC2 fleet requires a shared SMB volume with NTFS semantics and Active Directory join support. Which AWS offering should you pick?",
    options: [
      { id: "a", text: "FSx for Windows File Server (SMB)" },
      { id: "b", text: "Amazon EFS shared NFS file storage" },
      { id: "c", text: "Amazon S3 object storage" },
      { id: "d", text: "EC2 instance store for temporary local disks" },
    ],
    correct: ["a"],
    explanation:
      "FSx for Windows File Server is built for SMB/NTFS and AD integration. EFS exposes NFS for Linux clients, not native Windows file sharing.",
    difficulty: "medium",
    services: ["fsx"],
  },
  {
    id: "saa-d3-068",
    section: "d3-high-performing",
    subtopic: "fsx",
    type: "single",
    prompt:
      "You are running HPC, ML training, or large-scale analytics and need parallel file throughput, often with data staged from S3. Which FSx variant fits?",
    options: [
      { id: "a", text: "FSx for Lustre high-performance parallel file system" },
      { id: "b", text: "Amazon EFS shared NFS file storage" },
      { id: "c", text: "S3 Glacier archival storage classes" },
      { id: "d", text: "Storage Gateway hybrid cloud storage appliances" },
    ],
    correct: ["a"],
    explanation:
      "FSx for Lustre provides high-bandwidth, low-latency parallel storage for compute-heavy jobs and can synchronize with S3 as a backing repository.",
    difficulty: "medium",
    services: ["fsx"],
  },
  {
    id: "saa-d3-069",
    section: "d3-high-performing",
    subtopic: "fsx",
    type: "single",
    prompt:
      "Linux instances across multiple Availability Zones need a straightforward shared NFS mount without Windows or HPC-specific features. What is the leanest choice?",
    options: [
      { id: "a", text: "Amazon EFS shared NFS file storage" },
      { id: "b", text: "FSx for Windows File Server (SMB)" },
      { id: "c", text: "FSx for Lustre high-performance parallel file system" },
      { id: "d", text: "EC2 instance store for temporary local disks" },
    ],
    correct: ["a"],
    explanation:
      "EFS is the default managed NFS solution for Linux fleets spanning AZs. FSx options address Windows shares or specialized performance profiles instead.",
    difficulty: "easy",
    services: ["efs","fsx"],
  },
  {
    id: "saa-d3-070",
    section: "d3-high-performing",
    subtopic: "fsx",
    type: "single",
    prompt:
      "Which claim about Amazon FSx is accurate?",
    options: [
      { id: "a", text: "AWS operates several managed file-system engines optimized for distinct use cases, including Active Directory integration on the Windows engine" },
      { id: "b", text: "It stores unstructured data as S3-style objects" },
      { id: "c", text: "It is intended primarily for infrequent-access archival tiers" },
      { id: "d", text: "It cannot participate in an Active Directory domain" },
    ],
    correct: ["a"],
    explanation:
      "FSx spans Windows, Lustre, ONTAP, and OpenZFS deployments under a managed service model; the Windows flavor supports AD domain join.",
    difficulty: "medium",
    services: ["fsx"],
  },
  {
    id: "saa-d3-071",
    section: "d3-high-performing",
    subtopic: "hybrid-storage",
    type: "single",
    prompt:
      "Half a petabyte must leave your data center, but the WAN would need many months to finish. Which migration approach aligns with current AWS guidance?",
    options: [
      { id: "a", text: "Obtain adequate bandwidth and use DataSync for the move (and ongoing sync), or evaluate AWS Data Transfer Terminal / Partner physical-transfer options when online transfer remains impractical" },
      { id: "b", text: "Run DataSync for every migration regardless of volume or link speed and ignore bandwidth limits" },
      { id: "c", text: "Rely solely on unscheduled public-internet uploads with no transfer tooling" },
      { id: "d", text: "Use AWS Transfer Family as the only migration path for the entire half-petabyte NAS exit" },
    ],
    correct: ["a"],
    explanation:
      "DataSync is the recommended online path when network capacity is usable, including for ongoing synchronization. When the pipe cannot finish a one-shot bulk move in time, AWS points new customers to Data Transfer Terminal or Partner physical-transfer options. Ignoring bandwidth, ad-hoc internet uploads, or treating Transfer Family as the sole petabyte migration tool are poor fits.",
    difficulty: "medium",
    services: ["datasync"],
  },
  {
    id: "saa-d3-072",
    section: "d3-high-performing",
    subtopic: "hybrid-storage",
    type: "single",
    prompt:
      "On-premises servers must save files through a familiar share while the authoritative copy lives in S3, with hot data kept close for speed. Which Storage Gateway mode applies?",
    options: [
      { id: "a", text: "S3 File Gateway presenting NFS/SMB to on-prem hosts" },
      { id: "b", text: "Volume Gateway presenting iSCSI block volumes" },
      { id: "c", text: "Tape Gateway virtual tape library for backups" },
      { id: "d", text: "Amazon Athena for interactive SQL queries over objects in S3" },
    ],
    correct: ["a"],
    explanation:
      "S3 File Gateway maps NFS/SMB shares to S3 objects and caches active files locally. Volume Gateway is block-oriented; Tape Gateway virtualizes tape backups; Athena queries data already in S3—it is not a hybrid file-share bridge.",
    difficulty: "medium",
    services: ["storage-gateway","s3"],
  },
  {
    id: "saa-d3-073",
    section: "d3-high-performing",
    subtopic: "kinesis",
    type: "single",
    prompt:
      "How should you describe Amazon Kinesis Data Streams?",
    options: [
      { id: "a", text: "A durable, real-time ingestion layer where many independent consumers can read the same records and replay them within a configurable retention window" },
      { id: "b", text: "A point-to-point queue that deletes each message after one consumer handles it" },
      { id: "c", text: "A managed relational datastore with SQL queries" },
      { id: "d", text: "A worldwide edge network for HTTP assets" },
    ],
    correct: ["a"],
    explanation:
      "Data Streams captures high-velocity events; multiple applications can consume shards in parallel and revisit older data until retention expires.",
    difficulty: "medium",
    services: ["kinesis"],
  },
  {
    id: "saa-d3-074",
    section: "d3-high-performing",
    subtopic: "kinesis",
    type: "single",
    prompt:
      "What role does Amazon Data Firehose (formerly Kinesis Data Firehose) play?",
    options: [
      { id: "a", text: "It automatically batches and loads streaming records into targets such as S3, Amazon Redshift, and Amazon OpenSearch Service with no consumer infrastructure to run" },
      { id: "b", text: "It is a pull-based work queue for decoupled microservices" },
      { id: "c", text: "It provisions attachable block storage for EC2" },
      { id: "d", text: "It provides authoritative DNS resolution for public hostnames" },
    ],
    correct: ["a"],
    explanation:
      "Firehose is a managed delivery pipeline: you publish to a stream and AWS handles buffering, transformation hooks, and destination writes.",
    difficulty: "medium",
    services: ["firehose"],
  },
  {
    id: "saa-d3-075",
    section: "d3-high-performing",
    subtopic: "kinesis",
    type: "single",
    prompt:
      "When comparing Kinesis Data Streams with Amazon Data Firehose, what is the essential distinction?",
    options: [
      { id: "a", text: "Data Streams supports custom real-time processing and record replay; Firehose is hands-off delivery into AWS destinations without writing consumers" },
      { id: "b", text: "Both services are interchangeable for every streaming pattern" },
      { id: "c", text: "Firehose lets applications rewind and reprocess historical shards" },
      { id: "d", text: "Data Streams cannot increase shard capacity as volume grows" },
    ],
    correct: ["a"],
    explanation:
      "Choose Data Streams when you own consumption logic and need replay; choose Firehose when you want managed loading into analytics stores.",
    difficulty: "medium",
    services: ["kinesis","firehose"],
  },
  {
    id: "saa-d3-076",
    section: "d3-high-performing",
    subtopic: "kinesis",
    type: "single",
    prompt:
      "Which scenario aligns best with Kinesis Data Streams?",
    options: [
      { id: "a", text: "Continuous ingestion of clickstreams, device telemetry, or log streams feeding one or more live processing pipelines" },
      { id: "b", text: "Years-long retention of rarely accessed compliance archives" },
      { id: "c", text: "Hosting HTML and JavaScript for a public marketing site" },
      { id: "d", text: "Running normalized OLTP tables with foreign keys" },
    ],
    correct: ["a"],
    explanation:
      "Data Streams is designed for high-throughput, low-latency event pipelines where multiple downstream systems react to the same live data.",
    difficulty: "easy",
    services: ["kinesis"],
  },
  {
    id: "saa-d3-077",
    section: "d3-high-performing",
    subtopic: "ecs-fargate",
    type: "single",
    prompt:
      "An ECS service faces bursty HTTP traffic. How do you automatically grow task count and spread requests evenly?",
    options: [
      { id: "a", text: "Configure ECS Service Auto Scaling on the service and register tasks behind an Application Load Balancer" },
      { id: "b", text: "SSH into hosts and start tasks manually when load spikes" },
      { id: "c", text: "Create Route 53 records alone and expect ECS to scale itself" },
      { id: "d", text: "Persist container state on ephemeral instance store volumes" },
    ],
    correct: ["a"],
    explanation:
      "Service Auto Scaling adjusts desired task count from CloudWatch metrics, while the ALB distributes HTTP traffic across healthy task IPs.",
    difficulty: "medium",
    services: ["ecs","alb"],
  },
  {
    id: "saa-d3-078",
    section: "d3-high-performing",
    subtopic: "lambda-advanced",
    type: "single",
    prompt:
      "Which Lambda service quota is important to plan around for long-running work?",
    options: [
      { id: "a", text: "Each invocation may run at most 15 minutes before AWS terminates it" },
      { id: "b", text: "Functions may execute indefinitely without timeout" },
      { id: "c", text: "Memory allocation is uncapped on all runtimes" },
      { id: "d", text: "Every function must stay active for at least one hour per call" },
    ],
    correct: ["a"],
    explanation:
      "The 15-minute ceiling means sustained batch or streaming jobs belong on ECS/Fargate, AWS Batch, or Step Functions orchestration instead.",
    difficulty: "medium",
    services: ["lambda"],
  },
  {
    id: "saa-d3-079",
    section: "d3-high-performing",
    subtopic: "lambda-advanced",
    type: "single",
    prompt:
      "What problem does Lambda provisioned concurrency solve?",
    options: [
      { id: "a", text: "It pre-initializes a pool of execution environments so latency-sensitive functions avoid cold-start delays" },
      { id: "b", text: "It lowers S3 storage charges for function deployment packages" },
      { id: "c", text: "It encrypts environment variables at rest by default" },
      { id: "d", text: "It substitutes for Amazon API Gateway on HTTP APIs" },
    ],
    correct: ["a"],
    explanation:
      "Provisioned concurrency keeps warm workers ready; reserved concurrency only limits or reserves concurrent executions and does not pre-warm.",
    difficulty: "hard",
    services: ["lambda"],
  },
  {
    id: "saa-d3-080",
    section: "d3-high-performing",
    subtopic: "lambda-advanced",
    type: "single",
    prompt:
      "What capability does AWS Lambda SnapStart provide?",
    options: [
      { id: "a", text: "It shortens cold starts by restoring execution environments from a pre-initialized snapshot" },
      { id: "b", text: "It extends the maximum invocation duration to 60 minutes" },
      { id: "c", text: "It embeds a managed relational database inside the function" },
      { id: "d", text: "It automatically encrypts CloudWatch log events" },
    ],
    correct: ["a"],
    explanation:
      "SnapStart takes a snapshot of an initialized execution environment and restores from that snapshot on later invokes, reducing cold-start latency on supported runtimes and packaging options.",
    difficulty: "hard",
    services: ["lambda"],
  },
  {
    id: "saa-d3-081",
    section: "d3-high-performing",
    subtopic: "lambda-advanced",
    type: "single",
    prompt:
      "You want to tweak HTTP requests or responses at CloudFront edge PoPs with minimal latency. Which compute options apply?",
    options: [
      { id: "a", text: "Lambda@Edge or CloudFront Functions running at edge locations" },
      { id: "b", text: "A regional Lambda function in one home Region only" },
      { id: "c", text: "An EC2 instance deployed in every AWS Region" },
      { id: "d", text: "Amazon Route 53 health checks alone" },
    ],
    correct: ["a"],
    explanation:
      "Edge functions run close to viewers for header rewrites, redirects, and lightweight authorization without round-tripping to a central Region.",
    difficulty: "medium",
    services: ["lambda","cloudfront"],
  },
  {
    id: "saa-d3-082",
    section: "d3-high-performing",
    subtopic: "dynamodb",
    type: "single",
    prompt:
      "Which statement defines Amazon DynamoDB?",
    options: [
      { id: "a", text: "A serverless, fully managed NoSQL store for key-value and document items with consistent single-digit-millisecond performance at scale" },
      { id: "b", text: "A traditional relational engine with fixed schemas and SQL joins" },
      { id: "c", text: "Binary large-object storage accessed via HTTP" },
      { id: "d", text: "A durable message broker between microservices" },
    ],
    correct: ["a"],
    explanation:
      "DynamoDB targets low-latency, horizontally scalable NoSQL access patterns without provisioning database servers.",
    difficulty: "easy",
    services: ["dynamodb"],
  },
  {
    id: "saa-d3-083",
    section: "d3-high-performing",
    subtopic: "dynamodb",
    type: "single",
    prompt:
      "Which application profile is DynamoDB designed to serve well?",
    options: [
      { id: "a", text: "Massive throughput of simple key-value or document lookups where the schema can evolve" },
      { id: "b", text: "Deep normalization with many-table SQL joins and strict ACID across relations" },
      { id: "c", text: "Storing multi-gigabyte video files as the primary access pattern" },
      { id: "d", text: "Infrequent retrieval from glacier-style archival tiers" },
    ],
    correct: ["a"],
    explanation:
      "DynamoDB excels at partition-key access at scale. Relational OLTP belongs on RDS/Aurora; large media belongs in S3.",
    difficulty: "medium",
    services: ["dynamodb"],
  },
  {
    id: "saa-d3-084",
    section: "d3-high-performing",
    subtopic: "dynamodb",
    type: "single",
    prompt:
      "Which AWS component adds an in-memory caching tier with microsecond read latency in front of DynamoDB?",
    options: [
      { id: "a", text: "DAX microsecond in-memory cache in front of DynamoDB" },
      { id: "b", text: "A standard RDS read replica" },
      { id: "c", text: "Amazon CloudFront distributions" },
      { id: "d", text: "An Application Load Balancer target group" },
    ],
    correct: ["a"],
    explanation:
      "DAX is a DynamoDB-aware cluster cache that speaks the same API, accelerating hot reads without redesigning application code.",
    difficulty: "medium",
    services: ["dynamodb","dynamodb-dax"],
  },
  {
    id: "saa-d3-085",
    section: "d3-high-performing",
    subtopic: "api-gateway",
    type: "single",
    prompt:
      "Which API Gateway features help backends stay fast and resilient under load?",
    options: [
      { id: "a", text: "Turn on stage-level response caching and enforce throttling or usage plans to cap request rates" },
      { id: "b", text: "Enable EBS volume encryption on the integration EC2 instances" },
      { id: "c", text: "Configure cross-Region S3 replication for static assets" },
      { id: "d", text: "Run the API logic inside Fargate tasks managed by API Gateway" },
    ],
    correct: ["a"],
    explanation:
      "Caching trims repeat origin work and latency; throttling shields downstream Lambdas or containers from traffic surges.",
    difficulty: "medium",
    services: ["api-gateway"],
  },
  {
    id: "saa-d3-086",
    section: "d3-high-performing",
    subtopic: "serverless-micro-dist",
    type: "single",
    prompt:
      "A software vendor must push multi-gigabyte installer images to customers globally with low latency and minimal transfer cost. What architecture works best?",
    options: [
      { id: "a", text: "Host artifacts in Amazon S3 and front them with Amazon CloudFront so edges cache downloads and reduce origin egress" },
      { id: "b", text: "Serve every download from one oversized EC2 instance in a single Region" },
      { id: "c", text: "Attach installers to individual email messages" },
      { id: "d", text: "Share a single EBS volume across many EC2 hosts with Multi-Attach" },
    ],
    correct: ["a"],
    explanation:
      "S3 provides durable origin storage; CloudFront caches popular objects near users, improving speed and lowering repeated data-transfer charges.",
    difficulty: "easy",
    services: ["s3","cloudfront"],
  },
  {
    id: "saa-d3-087",
    section: "d3-high-performing",
    subtopic: "db-choice",
    type: "single",
    prompt:
      "Your OLTP application depends on ACID guarantees and multi-table SQL joins. Which AWS data store is appropriate?",
    options: [
      { id: "a", text: "Amazon RDS or Amazon Aurora relational engines" },
      { id: "b", text: "DynamoDB managed NoSQL tables" },
      { id: "c", text: "Neptune managed graph database" },
      { id: "d", text: "Amazon Timestream for InfluxDB" },
    ],
    correct: ["a"],
    explanation:
      "RDS and Aurora deliver transactional SQL semantics. DynamoDB is NoSQL, Neptune is graph-oriented, and Timestream for InfluxDB targets time-series metrics.",
    difficulty: "easy",
    services: ["rds","aurora"],
  },
  {
    id: "saa-d3-088",
    section: "d3-high-performing",
    subtopic: "db-choice",
    type: "single",
    prompt:
      "An internet-scale service needs predictable single-digit-millisecond reads on partition keys with a schema that changes often. Which database should you select?",
    options: [
      { id: "a", text: "DynamoDB managed NoSQL tables" },
      { id: "b", text: "Amazon RDS managed relational databases" },
      { id: "c", text: "Amazon Redshift cloud data warehouse" },
      { id: "d", text: "Neptune managed graph database" },
    ],
    correct: ["a"],
    explanation:
      "DynamoDB’s serverless NoSQL model matches high-cardinality key access at massive request rates.",
    difficulty: "easy",
    services: ["dynamodb"],
  },
  {
    id: "saa-d3-089",
    section: "d3-high-performing",
    subtopic: "db-choice",
    type: "single",
    prompt:
      "Business intelligence teams must run heavy aggregations and scans across terabytes of historical data. Which AWS database fits OLAP workloads?",
    options: [
      { id: "a", text: "Amazon Redshift as a columnar data warehouse" },
      { id: "b", text: "DynamoDB managed NoSQL tables" },
      { id: "c", text: "Amazon RDS tuned for transactional traffic" },
      { id: "d", text: "ElastiCache managed in-memory cache" },
    ],
    correct: ["a"],
    explanation:
      "Redshift’s MPP columnar design supports large analytical queries; OLTP engines and key-value caches are poor fits for warehouse-style scans.",
    difficulty: "medium",
    services: ["redshift"],
  },
  {
    id: "saa-d3-090",
    section: "d3-high-performing",
    subtopic: "db-choice",
    type: "single",
    prompt:
      "To shrink read latency and shield your primary database from repeated identical queries, which managed service should sit in front?",
    options: [
      { id: "a", text: "ElastiCache managed in-memory cache" },
      { id: "b", text: "An RDS read replica by itself without an in-memory tier" },
      { id: "c", text: "Amazon S3 Standard storage" },
      { id: "d", text: "Neptune managed graph database" },
    ],
    correct: ["a"],
    explanation:
      "ElastiCache clusters (Valkey, Redis OSS, or Memcached) hold hot datasets in RAM for sub-millisecond reads and reduced load on relational or NoSQL primaries.",
    difficulty: "easy",
    services: ["elasticache"],
  },
  {
    id: "saa-d3-091",
    section: "d3-high-performing",
    subtopic: "db-choice",
    type: "single",
    prompt:
      "What principle does AWS recommend when picking among its database portfolio?",
    options: [
      { id: "a", text: "Select a purpose-built engine whose data model and access patterns match the workload instead of stretching one generic database for all cases" },
      { id: "b", text: "Standardize on one relational instance for every application tier" },
      { id: "c", text: "Default to DynamoDB even when relational semantics are required" },
      { id: "d", text: "Self-manage databases on EC2 and avoid AWS managed offerings" },
    ],
    correct: ["a"],
    explanation:
      "AWS offers relational, key-value, document, graph, time-series, in-memory, and warehouse engines—each optimized for different shapes of data.",
    difficulty: "medium",
    services: ["rds","dynamodb"],
  },
  {
    id: "saa-d3-092",
    section: "d3-high-performing",
    subtopic: "purpose-built-db",
    type: "single",
    prompt:
      "Which AWS service provides a managed document database with MongoDB API compatibility?",
    options: [
      { id: "a", text: "DocumentDB MongoDB-compatible document store" },
      { id: "b", text: "Neptune managed graph database" },
      { id: "c", text: "Keyspaces managed Cassandra-compatible tables" },
      { id: "d", text: "Amazon Timestream for InfluxDB" },
    ],
    correct: ["a"],
    explanation:
      "DocumentDB implements the MongoDB wire protocol for JSON document workloads; Neptune is graph, Keyspaces is wide-column Cassandra-compatible, Timestream for InfluxDB is time-series.",
    difficulty: "medium",
    services: ["documentdb"],
  },
  {
    id: "saa-d3-093",
    section: "d3-high-performing",
    subtopic: "purpose-built-db",
    type: "single",
    prompt:
      "You model entities as nodes and edges—social graphs, recommendation engines, or fraud rings—and need efficient traversals. Which AWS database is built for that?",
    options: [
      { id: "a", text: "Neptune managed graph database" },
      { id: "b", text: "DocumentDB MongoDB-compatible document store" },
      { id: "c", text: "DynamoDB managed NoSQL tables" },
      { id: "d", text: "Amazon Redshift cloud data warehouse" },
    ],
    correct: ["a"],
    explanation:
      "Neptune is AWS’s managed graph engine optimized for relationship queries that would be awkward in relational or key-value stores.",
    difficulty: "medium",
    services: ["neptune"],
  },
  {
    id: "saa-d3-094",
    section: "d3-high-performing",
    subtopic: "purpose-built-db",
    type: "single",
    prompt:
      "Your team is migrating an on-premises Apache Cassandra workload and needs a managed wide-column store on AWS with CQL compatibility. Which service should they choose?",
    options: [
      { id: "a", text: "Keyspaces managed Cassandra-compatible wide-column store" },
      { id: "b", text: "Amazon Neptune, a graph database for relationship-heavy queries" },
      { id: "c", text: "Amazon Aurora, a MySQL/PostgreSQL-compatible relational engine" },
      { id: "d", text: "Amazon Timestream for InfluxDB, built for time-ordered metrics and events" },
    ],
    correct: ["a"],
    explanation:
      "Keyspaces is AWS's serverless, Cassandra-compatible wide-column database. Neptune targets graphs, Aurora is relational, and Timestream for InfluxDB is for time-series—not Cassandra workloads.",
    difficulty: "medium",
    services: ["keyspaces"],
  },
  {
    id: "saa-d3-095",
    section: "d3-high-performing",
    subtopic: "purpose-built-db",
    type: "single",
    prompt:
      "An IoT platform ingests device telemetry and operational metrics that must be stored and queried primarily by time. Which AWS database is designed for that pattern?",
    options: [
      { id: "a", text: "Amazon Timestream for InfluxDB" },
      { id: "b", text: "Amazon DynamoDB, a general-purpose key-value and document store" },
      { id: "c", text: "Amazon Neptune for connected-entity workloads" },
      { id: "d", text: "Amazon DocumentDB with MongoDB-compatible APIs" },
    ],
    correct: ["a"],
    explanation:
      "Amazon Timestream for InfluxDB is the current AWS-managed path for new time-series workloads that need InfluxDB-compatible storage and query patterns. DynamoDB, Neptune, and DocumentDB are not optimized as first-class time-series engines.",
    difficulty: "medium",
    services: ["timestream"],
  },
  {
    id: "saa-d3-096",
    section: "d3-high-performing",
    subtopic: "purpose-built-db",
    type: "single",
    prompt:
      "An application needs microsecond reads with Redis compatibility and durable data that survives node failures without a separate cache tier. Which AWS service fits?",
    options: [
      { id: "a", text: "Amazon MemoryDB for Redis" },
      { id: "b", text: "Amazon DynamoDB with standard table updates" },
      { id: "c", text: "Amazon Neptune for graph relationship modeling" },
      { id: "d", text: "Amazon RDS with transactional SQL" },
    ],
    correct: ["a"],
    explanation:
      "MemoryDB is a durable, Redis-compatible in-memory database with Multi-AZ durability—suited when you want Redis APIs as the primary store rather than a cache in front of another database. DynamoDB, Neptune, and RDS target different data models and access patterns.",
    difficulty: "medium",
    services: ["memorydb"],
  },
  {
    id: "saa-d3-097",
    section: "d3-high-performing",
    subtopic: "analytics-query",
    type: "single",
    prompt:
      "Which statement best describes Amazon Athena?",
    options: [
      { id: "a", text: "Serverless interactive SQL over objects in S3, billed from bytes scanned per query" },
      { id: "b", text: "A fully managed OLTP relational database cluster" },
      { id: "c", text: "Kubernetes-style orchestration for containers" },
      { id: "d", text: "Global edge caching for static assets" },
    ],
    correct: ["a"],
    explanation:
      "Athena runs standard SQL against S3 without servers you manage; cost tracks data scanned (often reduced with Parquet/ORC and partitions). The other choices describe RDS-like DBs, orchestrators, or CDNs—not Athena.",
    difficulty: "easy",
    services: ["athena","s3"],
  },
  {
    id: "saa-d3-098",
    section: "d3-high-performing",
    subtopic: "analytics-query",
    type: "single",
    prompt:
      "How should you characterize Amazon Redshift in an analytics architecture?",
    options: [
      { id: "a", text: "Managed columnar warehouse using MPP for large-scale OLAP and BI" },
      { id: "b", text: "A schemaless key-value NoSQL datastore" },
      { id: "c", text: "An ElastiCache-style in-memory key store" },
      { id: "d", text: "A durable FIFO messaging backbone" },
    ],
    correct: ["a"],
    explanation:
      "Redshift is AWS's petabyte-scale columnar warehouse for complex analytics. It is not a NoSQL KV store, cache, or message queue.",
    difficulty: "easy",
    services: ["redshift"],
  },
  {
    id: "saa-d3-099",
    section: "d3-high-performing",
    subtopic: "analytics-query",
    type: "single",
    prompt:
      "Analysts occasionally need to explore raw files already sitting in S3 without standing up a warehouse. When is Athena the better fit than Redshift?",
    options: [
      { id: "a", text: "Ad-hoc, serverless SQL on S3 with no cluster provisioning or bulk load step" },
      { id: "b", text: "Continuous heavy BI with modeled tables and many concurrent complex queries" },
      { id: "c", text: "Single-digit millisecond primary-key lookups" },
      { id: "d", text: "Caching hot objects closer to users" },
    ],
    correct: ["a"],
    explanation:
      "Athena shines for exploratory or infrequent queries directly on lake data. Redshift fits sustained, loaded, high-concurrency analytics. Key-value lookups and edge caching are different problem domains.",
    difficulty: "medium",
    services: ["athena","redshift"],
  },
  {
    id: "saa-d3-100",
    section: "d3-high-performing",
    subtopic: "analytics-query",
    type: "single",
    prompt:
      "Leadership wants self-service dashboards and visual reports without operating BI infrastructure. Which AWS service provides that?",
    options: [
      { id: "a", text: "Amazon QuickSight, a serverless BI tool for charts and dashboards" },
      { id: "b", text: "Amazon RDS for transactional storage" },
      { id: "c", text: "AWS Glue as a pure ETL-only product with no visualization" },
      { id: "d", text: "Amazon ECR for storing container images" },
    ],
    correct: ["a"],
    explanation:
      "QuickSight connects to sources like S3, Athena, Redshift, and RDS to publish interactive visuals without managing BI servers. Glue prepares data; it is not a dashboard product. RDS and ECR are unrelated to BI front ends.",
    difficulty: "easy",
    services: ["quicksight"],
  },
  {
    id: "saa-d3-101",
    section: "d3-high-performing",
    subtopic: "analytics-query",
    type: "single",
    prompt:
      "Operations wants full-text search, log analytics, and observability dashboards—the capability historically offered as Amazon Elasticsearch Service. Which service should they use today?",
    options: [
      { id: "a", text: "OpenSearch Service for search and log analytics" },
      { id: "b", text: "Amazon Redshift for warehouse-style SQL only" },
      { id: "c", text: "Amazon Athena for one-off S3 SQL" },
      { id: "d", text: "Amazon QuickSight as the search index itself" },
    ],
    correct: ["a"],
    explanation:
      "OpenSearch Service (successor to Elasticsearch Service) indexes and searches logs and operational data. Redshift, Athena, and QuickSight do not replace a search/analytics cluster for that use case.",
    difficulty: "medium",
    services: ["opensearch"],
  },
  {
    id: "saa-d3-102",
    section: "d3-high-performing",
    subtopic: "etl-datalake",
    type: "single",
    prompt:
      "Which AWS offering is primarily a serverless ETL platform that also maintains a metadata catalog for datasets?",
    options: [
      { id: "a", text: "AWS Glue—extract, transform, and load jobs plus a shared data catalog" },
      { id: "b", text: "Amazon Aurora as an OLTP engine" },
      { id: "c", text: "Elastic Load Balancing for traffic distribution" },
      { id: "d", text: "Amazon CloudFront for content delivery" },
    ],
    correct: ["a"],
    explanation:
      "Glue runs managed ETL and registers schemas in the Data Catalog for downstream tools like Athena and Redshift Spectrum. Aurora, load balancers, and CloudFront are not ETL/catalog services.",
    difficulty: "easy",
    services: ["glue"],
  },
  {
    id: "saa-d3-103",
    section: "d3-high-performing",
    subtopic: "etl-datalake",
    type: "single",
    prompt:
      "What role does the AWS Glue Data Catalog play in an analytics pipeline?",
    options: [
      { id: "a", text: "Central registry of table and schema metadata consumed by Athena, Redshift Spectrum, and EMR" },
      { id: "b", text: "Attachable block storage for EC2 instances" },
      { id: "c", text: "Authoritative DNS for public hostnames" },
      { id: "d", text: "Managed publish-subscribe messaging" },
    ],
    correct: ["a"],
    explanation:
      "The Data Catalog tells query engines where data lives and how it is structured. EBS, Route 53-style DNS, and SNS/SQS-style queues are unrelated to dataset metadata.",
    difficulty: "medium",
    services: ["glue"],
  },
  {
    id: "saa-d3-104",
    section: "d3-high-performing",
    subtopic: "etl-datalake",
    type: "single",
    prompt:
      "Which service helps you stand up a secure data lake on S3 with centralized, granular access controls?",
    options: [
      { id: "a", text: "AWS Lake Formation for lake setup and fine-grained permissions" },
      { id: "b", text: "Amazon RDS as the lake's primary object store" },
      { id: "c", text: "Amazon ECS for container scheduling only" },
      { id: "d", text: "CloudFront as the authoritative data lake bucket" },
    ],
    correct: ["a"],
    explanation:
      "Lake Formation streamlines ingesting into S3 lakes and governing who can access which tables and columns. RDS is relational storage, ECS orchestrates containers, and CloudFront delivers content—it does not define lake governance.",
    difficulty: "medium",
    services: ["lake-formation","s3"],
  },
  {
    id: "saa-d3-105",
    section: "d3-high-performing",
    subtopic: "etl-datalake",
    type: "single",
    prompt:
      "You need managed clusters to run Apache Spark, Hadoop, Hive, and similar frameworks at scale. Which AWS service provides that?",
    options: [
      { id: "a", text: "Amazon EMR—a managed big-data cluster platform for those frameworks" },
      { id: "b", text: "Amazon Athena as a always-on Spark cluster" },
      { id: "c", text: "Amazon DynamoDB for batch ETL compute" },
      { id: "d", text: "Amazon CloudFront for distributed batch jobs" },
    ],
    correct: ["a"],
    explanation:
      "EMR provisions and tunes clusters for Hadoop/Spark/Hive/Presto-style processing. Athena is serverless SQL on S3, not a long-running Spark cluster manager. DynamoDB and CloudFront are not batch compute platforms.",
    difficulty: "medium",
    services: ["emr"],
  },
  {
    id: "saa-d3-106",
    section: "d3-high-performing",
    subtopic: "etl-datalake",
    type: "single",
    prompt:
      "In a typical AWS data lake design, which component usually holds the raw and curated datasets that everything else queries?",
    options: [
      { id: "a", text: "Amazon S3 object storage" },
      { id: "b", text: "Amazon EBS volumes tied to individual EC2 hosts" },
      { id: "c", text: "Amazon RDS instances as the lake backbone" },
      { id: "d", text: "Ephemeral instance store on a single server" },
    ],
    correct: ["a"],
    explanation:
      "S3's durability, scale, and cost make it the standard lake storage layer, with Athena, Spectrum, Glue, and Lake Formation layered above. EBS, RDS, and local instance store lack the same lake-scale economics and decoupling.",
    difficulty: "easy",
    services: ["s3"],
  },
  {
    id: "saa-d3-107",
    section: "d3-high-performing",
    subtopic: "ai-ml-services",
    type: "single",
    prompt:
      "A media app must detect faces, objects, and inappropriate content in uploaded photos and video. Which AWS AI service applies?",
    options: [
      { id: "a", text: "Rekognition image and video analysis" },
      { id: "b", text: "Amazon Comprehend for unstructured text NLP" },
      { id: "c", text: "Amazon Polly for synthetic speech" },
      { id: "d", text: "Amazon Translate for cross-language text" },
    ],
    correct: ["a"],
    explanation:
      "Rekognition analyzes images and video for labels, faces, and moderation signals. Comprehend, Polly, and Translate address language—not computer vision on pixels.",
    difficulty: "easy",
    services: ["rekognition"],
  },
  {
    id: "saa-d3-108",
    section: "d3-high-performing",
    subtopic: "ai-ml-services",
    type: "single",
    prompt:
      "Call-center recordings must be turned into searchable transcripts automatically. Which service performs speech-to-text?",
    options: [
      { id: "a", text: "Transcribe speech-to-text" },
      { id: "b", text: "Amazon Polly, which synthesizes speech from text" },
      { id: "c", text: "Amazon Rekognition for audio scene detection" },
      { id: "d", text: "Amazon Translate for language pair conversion" },
    ],
    correct: ["a"],
    explanation:
      "Transcribe converts audio streams into text. Polly does text-to-speech, Rekognition focuses on images/video, and Translate rewrites text between languages rather than transcribing audio.",
    difficulty: "easy",
    services: ["transcribe"],
  },
  {
    id: "saa-d3-109",
    section: "d3-high-performing",
    subtopic: "ai-ml-services",
    type: "single",
    prompt:
      "An accessibility feature should read on-screen text aloud with natural voices. Which AWS service handles text-to-speech?",
    options: [
      { id: "a", text: "Polly text-to-speech" },
      { id: "b", text: "Amazon Transcribe for audio capture" },
      { id: "c", text: "Amazon Lex for conversational bots only" },
      { id: "d", text: "Amazon Comprehend for sentiment on text" },
    ],
    correct: ["a"],
    explanation:
      "Polly generates lifelike spoken audio from text. Transcribe is the inverse flow, Lex builds dialog bots, and Comprehend analyzes meaning—not speech synthesis.",
    difficulty: "easy",
    services: ["polly"],
  },
  {
    id: "saa-d3-110",
    section: "d3-high-performing",
    subtopic: "ai-ml-services",
    type: "single",
    prompt:
      "A global support portal must render user posts in each visitor's language using neural translation. Which service should you integrate?",
    options: [
      { id: "a", text: "Translate neural machine translation" },
      { id: "b", text: "Amazon Comprehend for entity extraction only" },
      { id: "c", text: "Amazon Transcribe for spoken input" },
      { id: "d", text: "Amazon Kendra for enterprise search" },
    ],
    correct: ["a"],
    explanation:
      "Translate performs machine translation between languages. Comprehend analyzes text in one language, Transcribe handles audio, and Kendra indexes documents for search—not general translation APIs.",
    difficulty: "easy",
    services: ["translate"],
  },
  {
    id: "saa-d3-111",
    section: "d3-high-performing",
    subtopic: "ai-ml-services",
    type: "single",
    prompt:
      "Product reviews need automatic sentiment scoring, entity tagging, and key phrase detection from free text. Which NLP service fits?",
    options: [
      { id: "a", text: "Comprehend NLP for text insights" },
      { id: "b", text: "Amazon Rekognition for image labels" },
      { id: "c", text: "Amazon Polly for voice output" },
      { id: "d", text: "Amazon Textract for scanned forms" },
    ],
    correct: ["a"],
    explanation:
      "Comprehend applies NLP to discover sentiment, entities, phrases, and dominant language in text. Rekognition, Polly, and Textract target vision, speech, and document OCR respectively.",
    difficulty: "easy",
    services: ["comprehend"],
  },
  {
    id: "saa-d3-112",
    section: "d3-high-performing",
    subtopic: "ai-ml-services",
    type: "single",
    prompt:
      "You are designing a voice and chat assistant for a contact center, similar to what powers Amazon Connect self-service flows. Which service builds the conversational layer?",
    options: [
      { id: "a", text: "Lex conversational chatbots" },
      { id: "b", text: "Amazon Polly alone without dialog management" },
      { id: "c", text: "Amazon Kendra as a Q&A search index" },
      { id: "d", text: "Amazon Translate for intent routing" },
    ],
    correct: ["a"],
    explanation:
      "Lex provides intent/slot dialog models for chatbots and integrates with Connect. Polly only speaks text, Kendra searches documents, and Translate converts languages—they do not replace Lex's conversation engine.",
    difficulty: "easy",
    services: ["lex"],
  },
  {
    id: "saa-d3-113",
    section: "d3-high-performing",
    subtopic: "ai-ml-services",
    type: "single",
    prompt:
      "Data scientists need notebooks, training jobs, hyperparameter tuning, and model hosting in one managed environment. Which AWS service is the end-to-end ML platform?",
    options: [
      { id: "a", text: "SageMaker end-to-end ML platform" },
      { id: "b", text: "Amazon Rekognition as a custom training studio" },
      { id: "c", text: "Amazon Comprehend for bespoke model pipelines" },
      { id: "d", text: "Amazon Polly for deploying neural nets" },
    ],
    correct: ["a"],
    explanation:
      "SageMaker covers the full custom ML lifecycle. Rekognition, Comprehend, and Polly are pre-built API services for specific tasks, not general model build/train/deploy platforms.",
    difficulty: "easy",
    services: ["sagemaker"],
  },
  {
    id: "saa-d3-114",
    section: "d3-high-performing",
    subtopic: "ai-ml-services",
    type: "single",
    prompt:
      "Invoices arrive as PDF scans; the app must pull out fields, tables, and printed or handwritten text beyond basic OCR. Which service should you use?",
    options: [
      { id: "a", text: "Textract OCR and form extraction" },
      { id: "b", text: "Amazon Rekognition for generic image classification" },
      { id: "c", text: "Amazon Comprehend for document semantics only" },
      { id: "d", text: "Amazon Transcribe for document audio" },
    ],
    correct: ["a"],
    explanation:
      "Textract extracts structured text, forms, and tables from documents. Rekognition lacks form/table extraction, Comprehend expects already-extracted text, and Transcribe targets audio—not scanned pages.",
    difficulty: "easy",
    services: ["textract"],
  },
  {
    id: "saa-d3-115",
    section: "d3-high-performing",
    subtopic: "hybrid-networking",
    type: "single",
    prompt:
      "An enterprise plans ongoing bulk replication from its colocation facility into AWS and requires predictable bandwidth with minimal jitter—not best-effort internet VPN. What connectivity model is most appropriate?",
    options: [
      { id: "a", text: "AWS Direct Connect with a dedicated private link and stable throughput" },
      { id: "b", text: "Site-to-Site VPN encrypted over the public internet" },
      { id: "c", text: "VPC peering between the data center and AWS" },
      { id: "d", text: "A NAT gateway for outbound-only traffic" },
    ],
    correct: ["a"],
    explanation:
      "Direct Connect offers a private, contracted path with consistent performance for large transfers. VPN latency varies on the internet, VPC peering does not extend to on-premises, and NAT gateways serve outbound SNAT—not hybrid dedicated links.",
    difficulty: "medium",
    services: ["direct-connect"],
  },
  {
    id: "saa-d3-116",
    section: "d3-high-performing",
    subtopic: "vpc-connectivity",
    type: "single",
    prompt:
      "Your network architecture must link hundreds of VPCs plus on-premises sites so traffic can route through one central hub with transitive paths. What scales operationally?",
    options: [
      { id: "a", text: "AWS Transit Gateway as a regional hub for VPCs, VPN, and Direct Connect attachments" },
      { id: "b", text: "A manual full mesh of pairwise VPC peering connections" },
      { id: "c", text: "An internet gateway in every VPC as the hub" },
      { id: "d", text: "One shared NAT gateway for all inter-VPC routing" },
    ],
    correct: ["a"],
    explanation:
      "Transit Gateway simplifies hub-and-spoke routing at large scale. VPC peering is non-transitive and explodes in pairwise links; IGs expose public ingress/egress, and NAT gateways are not inter-VPC routers.",
    difficulty: "medium",
    services: ["transit-gateway"],
  },
  {
    id: "saa-d3-117",
    section: "d3-high-performing",
    subtopic: "backup-transfer",
    type: "single",
    prompt:
      "Migration teams will sync terabytes from on-premises NAS to Amazon S3 repeatedly over the network and need encryption plus checksum validation out of the box. Which transfer service is built for that?",
    options: [
      { id: "a", text: "AWS DataSync with optimized protocol, encryption, and integrity verification" },
      { id: "b", text: "Amazon Athena for moving files" },
      { id: "c", text: "Amazon Polly for audio pipelines" },
      { id: "d", text: "AWS Config for compliance recording" },
    ],
    correct: ["a"],
    explanation:
      "DataSync agents accelerate and validate large online migrations to S3, EFS, and FSx. Athena queries data, Polly synthesizes speech, and Config tracks resource configuration—not bulk data movement.",
    difficulty: "medium",
    services: ["datasync"],
  },
  {
    id: "saa-d3-118",
    section: "d3-high-performing",
    subtopic: "arch-patterns",
    type: "single",
    prompt:
      "Assign each caching technology to its typical role: edge delivery of web assets, in-memory offload for RDS or sessions, and microsecond reads in front of DynamoDB.",
    options: [
      { id: "a", text: "CloudFront at the edge, ElastiCache for DB/session caching, DynamoDB Accelerator (DAX) for DynamoDB" },
      { id: "b", text: "All three are interchangeable general-purpose caches" },
      { id: "c", text: "DAX serves CDN traffic; CloudFront backs DynamoDB; ElastiCache is a CDN" },
      { id: "d", text: "ElastiCache replaces CloudFront at the edge; CloudFront sits in front of DynamoDB tables" },
    ],
    correct: ["a"],
    explanation:
      "Each layer has a distinct job: CloudFront caches HTTP content globally, ElastiCache (Valkey, Redis OSS, or Memcached) reduces database load and stores sessions, and DAX is an in-VPC accelerator for DynamoDB read latency. Swapping their roles breaks the architecture.",
    difficulty: "medium",
    services: ["cloudfront","elasticache","dax"],
  },
  {
    id: "saa-d3-119",
    section: "d3-high-performing",
    subtopic: "hpc-availability",
    type: "single",
    prompt:
      "A weather simulation uses MPI across many EC2 nodes and requires the tightest possible node-to-node latency. Which design aligns with AWS HPC guidance?",
    options: [
      { id: "a", text: "Cluster placement group together with Elastic Fabric Adapter (EFA) networking" },
      { id: "b", text: "Spread placement group stretched across multiple Regions" },
      { id: "c", text: "Instances in separate VPCs reaching each other over the public internet" },
      { id: "d", text: "Burstable T instance types on default enhanced networking" },
    ],
    correct: ["a"],
    explanation:
      "Cluster placement keeps instances physically close; EFA provides low-latency, OS-bypass interconnect ideal for MPI. Spread groups increase isolation (hurting latency), cross-VPC internet paths add delay, and burstable T classes lack HPC networking characteristics.",
    difficulty: "hard",
    services: ["ec2","efa"],
  },
  {
    id: "saa-d3-120",
    section: "d3-high-performing",
    subtopic: "hpc-availability",
    type: "single",
    prompt:
      "Thousands of HPC cores must share one POSIX file system with high aggregate throughput for large simulation datasets. Which storage option is the strongest match?",
    options: [
      { id: "a", text: "FSx for Lustre high-performance parallel file system" },
      { id: "b", text: "Amazon S3 Glacier Deep Archive for active compute" },
      { id: "c", text: "A lone EBS gp2 volume attached to one instance" },
      { id: "d", text: "Amazon RDS as shared file storage" },
    ],
    correct: ["a"],
    explanation:
      "FSx for Lustre delivers parallel, low-latency file access suited to HPC and can integrate with S3 for data staging. Glacier Deep Archive is archival, a single gp2 volume does not scale out, and RDS is a database—not a cluster file system.",
    difficulty: "medium",
    services: ["fsx","fsx-lustre"],
  },
  {
    id: "saa-d3-121",
    section: "d3-high-performing",
    subtopic: "iac-deployment",
    type: "single",
    prompt:
      "Which description matches AWS Amplify for application teams?",
    options: [
      { id: "a", text: "Integrated toolkit and hosting to ship full-stack web and mobile apps with auth, APIs, and storage" },
      { id: "b", text: "A MySQL-compatible relational cluster service" },
      { id: "c", text: "A managed batch scheduler for HPC queues" },
      { id: "d", text: "A global DNS registration service" },
    ],
    correct: ["a"],
    explanation:
      "Amplify combines CI/CD hosting with client libraries and backend primitives for rapid full-stack development. It is not a database engine, batch platform, or DNS product.",
    difficulty: "easy",
    services: ["amplify"],
  },
  {
    id: "saa-d3-122",
    section: "d3-high-performing",
    subtopic: "operations-mgmt",
    type: "single",
    prompt:
      "Genomics pipelines submit hundreds of thousands of independent batch jobs; you want AWS to size and scale the compute pool automatically. Which service is purpose-built for that workload?",
    options: [
      { id: "a", text: "AWS Batch managed batch job scheduling" },
      { id: "b", text: "Amazon SES for email delivery" },
      { id: "c", text: "Amazon SNS for pub/sub notifications" },
      { id: "d", text: "AWS Amplify for frontend hosting" },
    ],
    correct: ["a"],
    explanation:
      "AWS Batch queues jobs and provisions EC2 or Fargate capacity—including Spot—without you managing clusters. SES and SNS are messaging channels; Amplify targets app delivery, not large-scale batch compute.",
    difficulty: "medium",
    services: ["batch"],
  },
];
