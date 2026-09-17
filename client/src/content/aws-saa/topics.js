// Our own study-module taxonomy for the SAA-C03 syllabus.
// This adds a STUDY dimension on top of the 4 exam domains:
//  - The Overall Test still uses the 4 domains (see sections.js) for weighting.
//  - Section Review offers two groupings: by exam domain, and by study module
//    (each module has sub-topics). A module is NOT tied to a single domain
//    (e.g. EC2 spans security, performance, and cost).
//
// Each question may carry a `subtopic` id (a sub-topic belongs to a module).
// Review targets are identified by a `reviewId`:
//   - domain:    the domain key itself, e.g. "d1-secure"
//   - module:    "sec:<moduleId>", e.g. "sec:ec2-fundamentals"
//   - sub-topic: "sub:<subtopicId>", e.g. "sub:ec2-spot"

import { sectionByKey } from "./sections.js";

export const courseSections = [
  {
    id: "iam",
    name: "Module 1: Identity & Access (IAM & CLI)",
    subtopics: [
      { id: "iam-users-groups", name: "IAM Users & Groups" },
      { id: "iam-policies", name: "IAM Policies" },
      { id: "iam-mfa", name: "IAM MFA" },
      { id: "iam-cli-sdk", name: "Access Keys, CLI & SDK" },
    ],
  },
  {
    id: "ec2-fundamentals",
    name: "Module 2: EC2 Essentials",
    subtopics: [
      { id: "ec2-basics", name: "EC2 Basics & User Data" },
      { id: "ec2-instance-types", name: "EC2 Instance Types" },
      { id: "ec2-security-groups", name: "Security Groups & Ports" },
      { id: "ec2-access", name: "Accessing EC2 (SSH, Instance Connect, Roles)" },
      { id: "ec2-purchasing", name: "Purchasing Options" },
      { id: "ec2-spot", name: "Spot Instances & Spot Fleet" },
    ],
  },
  {
    id: "ec2-saa",
    name: "Module 3: EC2 Networking & Advanced",
    subtopics: [
      { id: "ec2-ip", name: "Private vs Public vs Elastic IP" },
      { id: "ec2-placement", name: "Placement Groups" },
      { id: "ec2-eni", name: "Elastic Network Interfaces (ENI)" },
      { id: "ec2-hibernate", name: "EC2 Hibernate" },
    ],
  },
  {
    id: "ec2-storage",
    name: "Module 4: EC2 Storage (EBS, AMI, EFS)",
    subtopics: [
      { id: "ebs-basics", name: "EBS Basics & Volume Types" },
      { id: "ebs-snapshots", name: "EBS Snapshots & Encryption" },
      { id: "ami", name: "AMI (Amazon Machine Image)" },
      { id: "instance-store", name: "EC2 Instance Store" },
      { id: "efs", name: "Amazon EFS (and EFS vs EBS)" },
    ],
  },
  {
    id: "ha-elb-asg",
    name: "Module 5: Scaling & Load Balancing (ELB & ASG)",
    subtopics: [
      { id: "elb-types", name: "Load Balancer Types (ALB / NLB / GWLB)" },
      { id: "elb-features", name: "Load Balancer Features (Sticky, Cross-Zone, SSL, Draining)" },
      { id: "asg", name: "Auto Scaling Groups" },
    ],
  },
  {
    id: "rds-aurora-elasticache",
    name: "Module 6: Managed Databases & Caching (RDS, Aurora, ElastiCache)",
    subtopics: [
      { id: "rds-basics", name: "RDS Basics & Read Replicas vs Multi-AZ" },
      { id: "aurora", name: "Amazon Aurora" },
      { id: "rds-security-proxy", name: "RDS Backups, Security & Proxy" },
      { id: "elasticache", name: "Amazon ElastiCache" },
    ],
  },
  {
    id: "route53",
    name: "Module 7: DNS & Route 53",
    subtopics: [
      { id: "r53-basics", name: "DNS & Route 53 Basics (Records, TTL, Alias)" },
      { id: "r53-routing", name: "Routing Policies" },
      { id: "r53-health", name: "Health Checks" },
      { id: "r53-hybrid", name: "Resolver & Hybrid DNS" },
    ],
  },
  {
    id: "classic-arch",
    name: "Module 8: Classic Architecture Patterns",
    subtopics: [
      { id: "arch-patterns", name: "Web App Architecture Patterns" },
      { id: "beanstalk", name: "Elastic Beanstalk" },
    ],
  },
  {
    id: "s3-intro",
    name: "Module 9: S3 Essentials",
    subtopics: [
      { id: "s3-basics", name: "S3 Basics & Static Websites" },
      { id: "s3-security", name: "S3 Security & Bucket Policies" },
      { id: "s3-versioning", name: "S3 Versioning" },
      { id: "s3-replication", name: "S3 Replication" },
      { id: "s3-storage-classes", name: "S3 Storage Classes" },
    ],
  },
  {
    id: "s3-advanced",
    name: "Module 10: S3 Advanced (Lifecycle, Performance, Ops)",
    subtopics: [
      { id: "s3-lifecycle", name: "Lifecycle Rules & Analytics" },
      { id: "s3-events-perf", name: "Event Notifications & Performance" },
      { id: "s3-operations", name: "Requester Pays, Batch Ops & Storage Lens" },
    ],
  },
  {
    id: "s3-sec",
    name: "Module 11: S3 Security & Data Protection",
    subtopics: [
      { id: "s3-encryption", name: "S3 Encryption (SSE-S3 / SSE-KMS / SSE-C)" },
      { id: "s3-access", name: "Access & Sharing (CORS, Pre-signed URLs, Access Points)" },
      { id: "s3-compliance", name: "Data Protection (Object Lock, MFA Delete, Logs)" },
    ],
  },
  {
    id: "cloudfront-ga",
    name: "Module 12: Content Delivery (CloudFront & Global Accelerator)",
    subtopics: [
      { id: "cloudfront", name: "Amazon CloudFront" },
      { id: "global-accelerator", name: "AWS Global Accelerator" },
    ],
  },
  {
    id: "storage-extras",
    name: "Module 13: Storage Add-Ons (Transfer, FSx, Gateway)",
    subtopics: [
      { id: "data-transfer", name: "Data Transfer & Migration Paths" },
      { id: "fsx", name: "Amazon FSx" },
      { id: "hybrid-storage", name: "Storage Gateway, DataSync & Transfer Family" },
    ],
  },
  {
    id: "decoupling",
    name: "Module 14: Application Decoupling (SQS, SNS, Kinesis, MQ)",
    subtopics: [
      { id: "sqs", name: "Amazon SQS" },
      { id: "sns", name: "Amazon SNS & Fan-Out" },
      { id: "kinesis", name: "Kinesis (Data Streams & Firehose)" },
      { id: "messaging-choice", name: "Choosing: SQS vs SNS vs Kinesis vs MQ" },
    ],
  },
  {
    id: "containers",
    name: "Module 15: Containers (ECS, Fargate, ECR, EKS)",
    subtopics: [
      { id: "ecs-fargate", name: "Docker, ECS & Fargate" },
      { id: "ecr-eks", name: "ECR & EKS" },
    ],
  },
  {
    id: "serverless",
    name: "Module 16: Serverless Core (Lambda, DynamoDB, API Gateway)",
    subtopics: [
      { id: "lambda", name: "Serverless & Lambda Basics" },
      { id: "lambda-advanced", name: "Lambda Advanced (Concurrency, SnapStart, Edge, VPC)" },
      { id: "dynamodb", name: "Amazon DynamoDB" },
      { id: "api-gateway", name: "Amazon API Gateway" },
      { id: "serverless-integration", name: "Step Functions & Cognito" },
    ],
  },
  {
    id: "serverless-arch",
    name: "Module 17: Serverless Architecture Patterns",
    subtopics: [
      { id: "serverless-app-patterns", name: "Serverless App & Web Patterns" },
      { id: "serverless-micro-dist", name: "Microservices & Content Distribution" },
    ],
  },
  {
    id: "databases",
    name: "Module 18: Choosing AWS Databases",
    subtopics: [
      { id: "db-choice", name: "Choosing the Right Database" },
      { id: "purpose-built-db", name: "Purpose-Built DBs (DocumentDB, Neptune, Keyspaces, Timestream for InfluxDB, MemoryDB)" },
    ],
  },
  {
    id: "data-analytics",
    name: "Module 19: Data & Analytics",
    subtopics: [
      { id: "analytics-query", name: "Query & BI (Athena, Redshift, QuickSight, OpenSearch)" },
      { id: "etl-datalake", name: "ETL & Data Lakes (Glue, Lake Formation, EMR)" },
      { id: "streaming-analytics", name: "Streaming Analytics & Pipelines (MSK, Flink)" },
    ],
  },
  {
    id: "machine-learning",
    name: "Module 20: AI & Machine Learning",
    subtopics: [
      { id: "ai-ml-services", name: "AI/ML Services (Recognition)" },
    ],
  },
  {
    id: "monitoring",
    name: "Module 21: Monitoring & Auditing",
    subtopics: [
      { id: "cloudwatch", name: "Amazon CloudWatch (Metrics, Logs, Alarms)" },
      { id: "eventbridge", name: "Amazon EventBridge" },
      { id: "cloudtrail-config", name: "CloudTrail & AWS Config" },
    ],
  },
  {
    id: "iam-advanced",
    name: "Module 22: Advanced Identity & Governance",
    subtopics: [
      { id: "organizations", name: "AWS Organizations (OUs, SCPs, Billing)" },
      { id: "iam-advanced-policies", name: "Advanced IAM Policies (Types, Evaluation, Boundaries)" },
      { id: "identity-governance", name: "Identity Center, Directory Service & Control Tower" },
    ],
  },
  {
    id: "security-encryption",
    name: "Module 23: Security & Encryption",
    subtopics: [
      { id: "kms", name: "Encryption & KMS (incl. CloudHSM)" },
      { id: "secrets-certs", name: "Secrets & Certificates (Secrets Manager, Parameter Store, ACM)" },
      { id: "network-protection", name: "Network Protection (WAF, Shield, Firewall Manager)" },
      { id: "threat-detection", name: "Threat Detection (GuardDuty, Inspector, Macie, Security Hub)" },
    ],
  },
  {
    id: "vpc",
    name: "Module 24: VPC Networking",
    subtopics: [
      { id: "vpc-fundamentals", name: "VPC Fundamentals (CIDR, Subnets, Default VPC)" },
      { id: "routing-gateways", name: "Routing & Gateways (IGW, Route Tables, NAT, Bastion)" },
      { id: "nacl-sg", name: "NACLs & Security Groups" },
      { id: "vpc-connectivity", name: "VPC Connectivity (Peering, Endpoints, PrivateLink, Transit Gateway)" },
      { id: "hybrid-networking", name: "Hybrid Networking (VPN, Direct Connect)" },
      { id: "vpc-monitoring", name: "VPC Monitoring (Flow Logs, Traffic Mirroring, Network Firewall)" },
    ],
  },
  {
    id: "dr-migrations",
    name: "Module 25: Resilience & Migrations",
    subtopics: [
      { id: "dr-strategies", name: "DR Strategies (RTO/RPO, Pilot Light, DRS)" },
      { id: "migration-services", name: "Migration Services (DMS, SCT, MGN, DB migrations)" },
      { id: "on-prem-strategies", name: "On-Premises & Hybrid (Outposts, Local Zones, Migration Hub)" },
      { id: "backup-transfer", name: "Backup & Data Transfer (AWS Backup, DataSync, Transfer paths)" },
    ],
  },
  {
    id: "more-architectures",
    name: "Module 26: Architecture Deep Dives",
    subtopics: [
      { id: "arch-patterns", name: "Architecture Patterns (Event Processing, Caching, Blocking IPs)" },
      { id: "hpc-availability", name: "HPC & EC2 High Availability" },
    ],
  },
  {
    id: "other-services",
    name: "Module 27: Additional Services",
    subtopics: [
      { id: "iac-deployment", name: "IaC & Deployment (CloudFormation, Amplify)" },
      { id: "messaging-engagement", name: "Messaging & Engagement (SES, SNS, AppFlow)" },
      { id: "operations-mgmt", name: "Operations & Management (SSM, AWS Batch, Instance Scheduler)" },
      { id: "cost-management", name: "Cost Management (Cost Explorer, Cost Anomaly Detection)" },
    ],
  },
];

export const subtopicById = {};
for (const sec of courseSections) {
  for (const st of sec.subtopics) subtopicById[st.id] = st;
}

// Resolve which questions belong to a review target.
export function reviewQuestions(allQuestions, reviewId) {
  if (reviewId.startsWith("sub:")) {
    const id = reviewId.slice(4);
    return allQuestions.filter((q) => q.subtopic === id);
  }
  if (reviewId.startsWith("sec:")) {
    const id = reviewId.slice(4);
    const sec = courseSections.find((s) => s.id === id);
    const ids = new Set((sec?.subtopics ?? []).map((st) => st.id));
    return allQuestions.filter((q) => ids.has(q.subtopic));
  }
  // domain key
  return allQuestions.filter((q) => q.section === reviewId);
}

export function reviewName(reviewId) {
  if (!reviewId) return "Review";
  if (reviewId.startsWith("sub:")) {
    return subtopicById[reviewId.slice(4)]?.name ?? reviewId;
  }
  if (reviewId.startsWith("sec:")) {
    return (
      courseSections.find((s) => s.id === reviewId.slice(4))?.name ?? reviewId
    );
  }
  return sectionByKey[reviewId]?.name ?? reviewId;
}
