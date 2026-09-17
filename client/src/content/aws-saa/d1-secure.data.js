// Domain 1 — Design Secure Architectures (30%)
// Independently authored educational practice content based on publicly documented AWS concepts.
// Question shape is documented in plan/01-architecture.md.
// `correct` is ALWAYS an array of option ids (one id for single-answer).
export const questions = [
  {
    id: "saa-d1-001",
    section: "d1-secure",
    subtopic: "ec2-access",
    type: "single",
    prompt:
      "A workload on Amazon EC2 must fetch files from an S3 bucket. Leadership wants credential handling aligned with AWS security guidance. What should the solutions architect propose?",
    options: [
      { id: "a", text: "Provision an IAM user, create access keys, and place them in the application's configuration" },
      { id: "b", text: "Associate an IAM role with the EC2 instance whose policy permits reading from the required S3 bucket" },
      { id: "c", text: "Embed the AWS account root user's access keys in the application source code" },
      { id: "d", text: "Put permanent access keys in environment variables on the EC2 host" },
    ],
    correct: ["b"],
    explanation:
      "Instance profiles deliver short-lived credentials through the instance metadata service, so the app never stores long-lived keys. That pattern is the recommended way for EC2 to access S3. IAM users with static keys, root keys, or keys in env vars all increase exposure and rotation burden.",
    difficulty: "easy",
    services: ["iam","ec2","s3"],
  },
  {
    id: "saa-d1-002",
    section: "d1-secure",
    subtopic: "s3-encryption",
    type: "single",
    prompt:
      "Regulations require confidential files in Amazon S3 to be encrypted at rest. Security must own the keys—setting policies, reviewing usage, and auditing access—while keeping day-to-day operations light. Which option fits best?",
    options: [
      { id: "a", text: "Server-side encryption with Amazon S3-managed keys (SSE-S3)" },
      { id: "b", text: "Server-side encryption with AWS KMS using a customer managed CMK (SSE-KMS)" },
      { id: "c", text: "Encrypt objects in the application before upload and manage keys locally" },
      { id: "d", text: "Force TLS when clients connect to the bucket URL" },
    ],
    correct: ["b"],
    explanation:
      "SSE-KMS with a customer managed key lets you define KMS key policies, track usage in CloudTrail, and control who can use the key, while AWS performs encryption at rest. SSE-S3 does not give you customer key policies. Client-side encryption shifts all key ops to you. TLS protects data in flight, not on disk.",
    difficulty: "medium",
    services: ["s3","kms"],
  },
  {
    id: "saa-d1-003",
    section: "d1-secure",
    subtopic: "routing-gateways",
    type: "single",
    prompt:
      "EC2 hosts for a web app live in private subnets and receive traffic only through an Application Load Balancer. They need outbound internet access for security updates but must stay unreachable from the public internet. What network design satisfies this?",
    options: [
      { id: "a", text: "Point the private subnet route tables at an internet gateway for default routes" },
      { id: "b", text: "Move the servers into public subnets and assign each a public IP address" },
      { id: "c", text: "Deploy a NAT gateway in a public subnet and send private-subnet egress through it" },
      { id: "d", text: "Rely on VPC peering as a substitute for internet egress" },
    ],
    correct: ["c"],
    explanation:
      "A NAT gateway in a public subnet gives private instances a path for initiated outbound connections (such as patch mirrors) while blocking inbound connections from the internet. Direct IGW routes or public subnets would expose instances. Peering connects VPCs; it is not an internet gateway replacement.",
    difficulty: "medium",
    services: ["vpc","nat-gateway","ec2"],
  },
  {
    id: "saa-d1-004",
    section: "d1-secure",
    subtopic: "iam-advanced-policies",
    type: "single",
    prompt:
      "You must let another AWS account access selected resources in your account for a limited time, with an audit trail, without handing over permanent passwords or access keys. What is the best approach?",
    options: [
      { id: "a", text: "Create a dedicated IAM user in your account and send the access key to the partner" },
      { id: "b", text: "Define an IAM role trusted by the external account so their principals assume it through AWS STS" },
      { id: "c", text: "Import the partner's IAM users into your account's IAM groups" },
      { id: "d", text: "Open the bucket with a public access policy for the vendor" },
    ],
    correct: ["b"],
    explanation:
      "Cross-account roles with trust policies let external accounts call STS AssumeRole and receive temporary credentials; CloudTrail records those sessions. Sharing IAM user keys or opening resources publicly breaks least privilege and weakens accountability.",
    difficulty: "medium",
    services: ["iam","sts"],
  },
  {
    id: "saa-d1-005",
    section: "d1-secure",
    subtopic: "secrets-certs",
    type: "single",
    prompt:
      "Production code needs database usernames and passwords that rotate on a schedule and are fetched securely when the app starts. Which AWS offering is built for that workflow?",
    options: [
      { id: "a", text: "Standard parameters in AWS Systems Manager Parameter Store" },
      { id: "b", text: "Secrets Manager for storing credentials with automatic rotation" },
      { id: "c", text: "An encrypted Amazon S3 object holding a credentials file" },
      { id: "d", text: "AWS Key Management Service (KMS) alone" },
    ],
    correct: ["b"],
    explanation:
      "Secrets Manager stores secrets, supports automatic rotation (including RDS integration), and controls retrieval with IAM. KMS encrypts data with keys—it does not run secret rotation workflows. Standard Parameter Store parameters do not provide the same managed rotation features.",
    difficulty: "medium",
    services: ["secrets-manager","rds"],
  },
  {
    id: "saa-d1-006",
    section: "d1-secure",
    subtopic: "network-protection",
    type: "single",
    prompt:
      "You need to block common web attacks—including SQL injection and cross-site scripting—at the layer where HTTP and HTTPS requests are inspected. Which AWS service should sit in front of the application?",
    options: [
      { id: "a", text: "Shield Standard (DDoS protection at the network edge)" },
      { id: "b", text: "GuardDuty (intelligent threat detection)" },
      { id: "c", text: "WAF (HTTP request filtering for injection and XSS)" },
      { id: "d", text: "Macie (sensitive-data discovery in object storage)" },
    ],
    correct: ["c"],
    explanation:
      "AWS WAF evaluates web requests and can block SQLi and XSS via managed or custom rule sets on CloudFront, ALB, or API Gateway. Shield Standard mitigates common DDoS at the network edge. GuardDuty analyzes logs for threats. Macie finds sensitive data in S3.",
    difficulty: "easy",
    services: ["waf","cloudfront","alb"],
  },
  {
    id: "saa-d1-007",
    section: "d1-secure",
    subtopic: "organizations",
    type: "single",
    prompt:
      "Enterprise governance requires that no linked account in AWS Organizations can turn off or delete organization CloudTrail trails, even if local administrators grant themselves broad IAM rights. How should this be enforced?",
    options: [
      { id: "a", text: "Apply an IAM permissions boundary to every human user in every account" },
      { id: "b", text: "Attach a service control policy (SCP) at the organization or OU level that denies trail-disabling actions" },
      { id: "c", text: "Rely solely on a resource policy attached to the CloudTrail trail" },
      { id: "d", text: "Create an IAM group in each member account with a deny statement for CloudTrail APIs" },
    ],
    correct: ["b"],
    explanation:
      "SCPs cap what identities in member accounts can do; an explicit deny on CloudTrail management cannot be overridden by account IAM. Boundaries and local groups are per-account and can be removed by account admins. Trail resource policies do not replace org-wide permission ceilings.",
    difficulty: "hard",
    services: ["organizations","scp","cloudtrail"],
  },
  {
    id: "saa-d1-008",
    section: "d1-secure",
    subtopic: "nacl-sg",
    type: "single",
    prompt:
      "Both security groups and network ACLs filter traffic in a VPC. Which answer accurately contrasts them?",
    options: [
      { id: "a", text: "Security groups do not track connection state; network ACLs do" },
      { id: "b", text: "Instance security groups track connection state; subnet NACLs do not" },
      { id: "c", text: "Both are stateless and rules are processed strictly by number" },
      { id: "d", text: "Network ACLs bind to ENIs; security groups bind to entire subnets" },
    ],
    correct: ["b"],
    explanation:
      "Security groups remember allowed flows, so return traffic for permitted requests is typically allowed automatically. NACLs evaluate each direction separately with numbered rules and no connection tracking. Security groups attach to ENIs; NACLs attach to subnets.",
    difficulty: "medium",
    services: ["vpc","security-groups","nacl"],
  },
  {
    id: "saa-d1-009",
    section: "d1-secure",
    subtopic: "iam-users-groups",
    type: "single",
    prompt:
      "Which description best matches an IAM role?",
    options: [
      { id: "a", text: "A collection of IAM users spread across several groups" },
      { id: "b", text: "An IAM object that sets password complexity rules for human users" },
      { id: "c", text: "An IAM identity carrying permission policies that a trusted party—such as a person, app, or AWS service—assumes to obtain temporary credentials" },
      { id: "d", text: "The bundle of API permissions permanently tied to a single IAM user" },
    ],
    correct: ["c"],
    explanation:
      "Roles are identities with trust and permission policies. Trusted entities assume the role via STS and receive short-lived credentials instead of relying on static access keys tied to a user.",
    difficulty: "easy",
    services: ["iam"],
  },
  {
    id: "saa-d1-010",
    section: "d1-secure",
    subtopic: "iam-cli-sdk",
    type: "single",
    prompt:
      "Which item below is a genuine IAM security reporting feature?",
    options: [
      { id: "a", text: "IAM credential report" },
      { id: "b", text: "Root Account Manager (not a real IAM feature)" },
      { id: "c", text: "Services Report dashboard (not a real IAM feature)" },
      { id: "d", text: "Security Advisor console (not a real IAM feature)" },
    ],
    correct: ["a"],
    explanation:
      "The credential report summarizes each IAM user's passwords, access keys, and MFA status. Access Advisor is another real tool for reviewing service permissions. The other listed names are not actual IAM products.",
    difficulty: "easy",
    services: ["iam"],
  },
  {
    id: "saa-d1-011",
    section: "d1-secure",
    subtopic: "iam-users-groups",
    type: "single",
    prompt:
      "Select the statement about IAM users that is NOT true.",
    options: [
      { id: "a", text: "One IAM user may belong to more than one group" },
      { id: "b", text: "An IAM user is allowed to exist without membership in any group" },
      { id: "c", text: "Managed or inline policies may be attached directly to an IAM user" },
      { id: "d", text: "Routine AWS access for an IAM user should use the root user's sign-in credentials" },
    ],
    correct: ["d"],
    explanation:
      "IAM users authenticate with their own credentials; they must not use the root account for normal work. Multi-group membership, standalone users, and direct policy attachment are all valid.",
    difficulty: "easy",
    services: ["iam"],
  },
  {
    id: "saa-d1-012",
    section: "d1-secure",
    subtopic: "iam-users-groups",
    type: "single",
    prompt:
      "Which choice reflects recognized IAM hygiene?",
    options: [
      { id: "a", text: "Issue separate IAM users every time the same employee switches projects" },
      { id: "b", text: "Avoid day-to-day tasks with the AWS account root user" },
      { id: "c", text: "Share one IAM user's password so a teammate can finish urgent work" },
      { id: "d", text: "Skip MFA to reduce login friction" },
    ],
    correct: ["b"],
    explanation:
      "Reserve the root user for rare account-level tasks and operate daily work through individual IAM users with MFA. Multiple users per person, credential sharing, and disabling MFA all weaken security.",
    difficulty: "easy",
    services: ["iam"],
  },
  {
    id: "saa-d1-013",
    section: "d1-secure",
    subtopic: "iam-policies",
    type: "single",
    prompt:
      "In IAM, what are policies?",
    options: [
      { id: "a", text: "Cross-account billing agreements between AWS customers" },
      { id: "b", text: "JSON documents that allow or deny API actions and can be linked to users, groups, and roles" },
      { id: "c", text: "Templates that assign console passwords to new employees" },
      { id: "d", text: "Marketing documents describing AWS service offerings" },
    ],
    correct: ["b"],
    explanation:
      "IAM policies are structured JSON that define effects on actions and resources. They attach to identities (users, groups, roles) or resources to govern who may call which AWS APIs.",
    difficulty: "easy",
    services: ["iam"],
  },
  {
    id: "saa-d1-014",
    section: "d1-secure",
    subtopic: "iam-policies",
    type: "single",
    prompt:
      "When assigning IAM permissions, which guiding principle should you follow?",
    options: [
      { id: "a", text: "Grant the widest access that keeps people unblocked" },
      { id: "b", text: "Expand permissions whenever someone requests more access" },
      { id: "c", text: "Give only the permissions required for the task" },
      { id: "d", text: "Strip all permissions from the root user via custom policy" },
    ],
    correct: ["c"],
    explanation:
      "Least privilege means each principal receives only the permissions needed for their job. Over-permissioning and reactive broad grants increase blast radius; the root user cannot be limited the same way as IAM users through ordinary policies.",
    difficulty: "easy",
    services: ["iam"],
  },
  {
    id: "saa-d1-015",
    section: "d1-secure",
    subtopic: "iam-mfa",
    type: "single",
    prompt:
      "Which action most directly strengthens protection of the AWS account root user?",
    options: [
      { id: "a", text: "Attach a custom policy that removes all root permissions" },
      { id: "b", text: "Perform every task exclusively through the AWS CLI as root" },
      { id: "c", text: "Disable IAM users and sign in only as root" },
      { id: "d", text: "Turn on multi-factor authentication (MFA) for the root user" },
    ],
    correct: ["d"],
    explanation:
      "MFA adds a second verification step for root sign-in. You cannot eliminate root's inherent capabilities with IAM policies, and using root for routine work or avoiding IAM users is unsafe practice.",
    difficulty: "easy",
    services: ["iam"],
  },
  {
    id: "saa-d1-016",
    section: "d1-secure",
    subtopic: "iam-users-groups",
    type: "single",
    prompt:
      "An IAM group may contain both IAM users and other IAM groups.",
    options: [
      { id: "a", text: "True — groups can nest other groups alongside users" },
      { id: "b", text: "False — groups hold users only and cannot nest other groups" },
    ],
    correct: ["b"],
    explanation:
      "Groups hold IAM users only. Nested groups are not supported, so one group cannot be a member of another.",
    difficulty: "easy",
    services: ["iam"],
  },
  {
    id: "saa-d1-017",
    section: "d1-secure",
    subtopic: "iam-policies",
    type: "single",
    prompt:
      "IAM policies contain one or more statements. Which element is NOT part of an individual statement?",
    options: [
      { id: "a", text: "Effect (Allow or Deny)" },
      { id: "b", text: "Principal (who the statement applies to)" },
      { id: "c", text: "Version (policy language version)" },
      { id: "d", text: "Action (API operations covered)" },
      { id: "e", text: "Resource (ARNs the statement covers)" },
    ],
    correct: ["c"],
    explanation:
      "Version appears once at the policy document root (for example, 2012-10-17). Each statement includes elements such as Effect, Action, Resource, and optionally Principal, Sid, and Condition—not Version.",
    difficulty: "medium",
    services: ["iam"],
  },
  {
    id: "saa-d1-018",
    section: "d1-secure",
    subtopic: "ec2-security-groups",
    type: "single",
    prompt:
      "What is the primary VPC mechanism for permitting or denying network traffic to and from an EC2 instance?",
    options: [
      { id: "a", text: "Subnet network ACL" },
      { id: "b", text: "Security group" },
      { id: "c", text: "IAM identity policy" },
    ],
    correct: ["b"],
    explanation:
      "Security groups act as a stateful firewall on the instance ENI. NACLs filter at subnet boundaries. IAM policies authorize AWS API calls, not packet flow to instances.",
    difficulty: "easy",
    services: ["vpc","security-groups","ec2"],
  },
  {
    id: "saa-d1-019",
    section: "d1-secure",
    subtopic: "ec2-security-groups",
    type: "single",
    prompt:
      "Each security group can be associated with at most one EC2 instance.",
    options: [
      { id: "a", text: "False — one security group can be attached to many instances" },
      { id: "b", text: "True — a security group is limited to a single EC2 instance" },
    ],
    correct: ["a"],
    explanation:
      "The same security group may protect many instances, and each instance can have multiple security groups attached simultaneously.",
    difficulty: "easy",
    services: ["vpc","security-groups","ec2"],
  },
  {
    id: "saa-d1-020",
    section: "d1-secure",
    subtopic: "ebs-snapshots",
    type: "single",
    prompt:
      "An EC2 instance uses an unencrypted EBS volume, and you must move to an encrypted volume without losing data. What is the standard approach?",
    options: [
      { id: "a", text: "Snapshot the volume, copy the snapshot with encryption enabled, then create a new volume from the encrypted copy" },
      { id: "b", text: "Open volume settings in the console and toggle on-the-fly KMS encryption" },
      { id: "c", text: "Attach a second blank encrypted volume and manually rsync every block in place on the live disk" },
      { id: "d", text: "Open a support case asking AWS to encrypt the existing volume in place" },
    ],
    correct: ["a"],
    explanation:
      "Existing EBS volumes cannot be encrypted in place. The supported path is snapshot → encrypted snapshot copy → new encrypted volume, then swap attachments. There is no console toggle for live encryption, and support cannot flip encryption on the original volume.",
    difficulty: "medium",
    services: ["ebs","kms"],
  },
  {
    id: "saa-d1-021",
    section: "d1-secure",
    subtopic: "secrets-certs",
    type: "single",
    prompt:
      "Traffic to a web app terminates on an Application Load Balancer. The team wants TLS for clients with certificates that AWS renews automatically. What should they configure?",
    options: [
      { id: "a", text: "Request a public certificate in AWS Certificate Manager (ACM) and bind it to an HTTPS listener on the ALB" },
      { id: "b", text: "Purchase a third-party cert and install it manually on every backend EC2 instance" },
      { id: "c", text: "Turn on SSE-S3 for objects related to the load balancer" },
      { id: "d", text: "Upload a self-signed certificate to S3 and reference it from the ALB" },
    ],
    correct: ["a"],
    explanation:
      "ACM public certificates integrate with ALB HTTPS listeners and renew before expiry at no extra cert cost. Per-instance manual certs add operational drag. SSE-S3 protects S3 objects at rest, not TLS to browsers. ALB does not pull listener certs from arbitrary S3 objects.",
    difficulty: "medium",
    services: ["acm","alb"],
  },
  {
    id: "saa-d1-022",
    section: "d1-secure",
    subtopic: "threat-detection",
    type: "single",
    prompt:
      "Which managed service ingests CloudTrail, VPC Flow Logs, and DNS logs to flag suspicious activity such as odd API patterns or compromised EC2 behavior?",
    options: [
      { id: "a", text: "GuardDuty analyzing CloudTrail, VPC Flow Logs, and DNS" },
      { id: "b", text: "Macie classifying personal data in buckets" },
      { id: "c", text: "Inspector assessing host and image vulnerabilities" },
      { id: "d", text: "Trusted Advisor surfacing cost and security recommendations" },
    ],
    correct: ["a"],
    explanation:
      "GuardDuty is AWS's continuous threat detection service for those log sources. Macie focuses on sensitive S3 content. Inspector finds software vulnerabilities. Trusted Advisor surfaces cost and reliability recommendations, not threat analytics.",
    difficulty: "medium",
    services: ["guardduty"],
  },
  {
    id: "saa-d1-023",
    section: "d1-secure",
    subtopic: "threat-detection",
    type: "single",
    prompt:
      "Compliance requires automatically finding and labeling PII and other sensitive content stored in Amazon S3 buckets. Which service should you enable?",
    options: [
      { id: "a", text: "Macie using ML to find PII and other sensitive objects in S3" },
      { id: "b", text: "GuardDuty looking for malicious activity patterns" },
      { id: "c", text: "Config tracking whether resources stay compliant" },
      { id: "d", text: "KMS managing cryptographic keys rather than scanning objects" },
    ],
    correct: ["a"],
    explanation:
      "Macie scans S3 for sensitive data types including PII using ML and customizable identifiers. GuardDuty detects threats, Config records configuration history, and KMS manages encryption keys—not content classification.",
    difficulty: "medium",
    services: ["macie","s3"],
  },
  {
    id: "saa-d1-024",
    section: "d1-secure",
    subtopic: "serverless-integration",
    type: "single",
    prompt:
      "A mobile client must sign users in—including through social IdPs like Google—and hand the app short-lived AWS credentials with limited scope. Which solution aligns with AWS best practices?",
    options: [
      { id: "a", text: "Cognito for end-user sign-up, sign-in, and identity pools" },
      { id: "b", text: "Create a dedicated IAM user account for each end user of the app" },
      { id: "c", text: "AWS Directory Service alone, without federation" },
      { id: "d", text: "Ship one shared IAM access key inside the mobile app binary" },
    ],
    correct: ["a"],
    explanation:
      "Cognito user pools handle authentication and social federation; identity pools exchange tokens for temporary AWS credentials. Per-user IAM users do not scale for consumer apps, and embedded long-lived keys are easily extracted.",
    difficulty: "medium",
    services: ["cognito"],
  },
  {
    id: "saa-d1-025",
    section: "d1-secure",
    subtopic: "iam-users-groups",
    type: "single",
    prompt:
      "Three engineers joining the same team need identical AWS permissions. What is the cleanest way to administer their access?",
    options: [
      { id: "a", text: "Create one IAM group, attach the shared policy to the group, and add all three users" },
      { id: "b", text: "Duplicate the same policy attachment on each user separately" },
      { id: "c", text: "Let all three share one IAM user login" },
      { id: "d", text: "Distribute the root account password to the team" },
    ],
    correct: ["a"],
    explanation:
      "Centralizing permissions on a group means one policy update applies to every member. Repeated per-user attachments drift over time. Shared users and root credentials break individual accountability.",
    difficulty: "easy",
    services: ["iam"],
  },
  {
    id: "saa-d1-026",
    section: "d1-secure",
    subtopic: "iam-policies",
    type: "single",
    prompt:
      "An IAM user inherits one policy that Allow s3:GetObject on a bucket and another that explicitly Deny s3:GetObject on the same bucket. What happens when the user tries to download an object?",
    options: [
      { id: "a", text: "The request is denied because an explicit Deny overrides any Allow" },
      { id: "b", text: "The request succeeds because Allow statements take precedence" },
      { id: "c", text: "IAM randomly chooses between the conflicting policies" },
      { id: "d", text: "Whichever policy was attached most recently determines the outcome" },
    ],
    correct: ["a"],
    explanation:
      "IAM evaluation treats an explicit Deny as final: if any applicable statement denies the action, access fails even when other statements allow it. Attachment order does not break ties.",
    difficulty: "medium",
    services: ["iam"],
  },
  {
    id: "saa-d1-027",
    section: "d1-secure",
    subtopic: "iam-policies",
    type: "single",
    prompt:
      "Inside a single IAM policy statement, which field names the service operations (for example, s3:PutObject) that the statement permits or forbids?",
    options: [
      { id: "a", text: "Action — which API calls are covered" },
      { id: "b", text: "Resource — which ARNs are targeted" },
      { id: "c", text: "Effect — Allow versus Deny" },
      { id: "d", text: "Principal — which identity the statement applies to" },
    ],
    correct: ["a"],
    explanation:
      "The Action element lists API operations. Resource identifies ARNs the actions apply to. Effect is Allow or Deny. Principal specifies who the statement applies to in resource-based policies.",
    difficulty: "easy",
    services: ["iam"],
  },
  {
    id: "saa-d1-028",
    section: "d1-secure",
    subtopic: "iam-mfa",
    type: "single",
    prompt:
      "How does enabling MFA change the sign-in experience compared with password alone?",
    options: [
      { id: "a", text: "It requires an additional factor, such as a time-based code from a registered device" },
      { id: "b", text: "It forces users to choose a longer minimum password length only" },
      { id: "c", text: "It mandates storing a recovery email in the account profile" },
      { id: "d", text: "It automatically rotates IAM access keys on each login" },
    ],
    correct: ["a"],
    explanation:
      "MFA combines something you know with something you possess, so stolen passwords alone are insufficient. It does not replace password policy, require backup email, or rotate access keys by itself.",
    difficulty: "easy",
    services: ["iam"],
  },
  {
    id: "saa-d1-029",
    section: "d1-secure",
    subtopic: "iam-mfa",
    type: "single",
    prompt:
      "Which of these can serve as an MFA device when securing an AWS account?",
    options: [
      { id: "a", text: "A virtual authenticator app or a supported hardware security key" },
      { id: "b", text: "An IAM user's access key pair" },
      { id: "c", text: "A customer master key in AWS KMS" },
      { id: "d", text: "An EC2 SSH key pair" },
    ],
    correct: ["a"],
    explanation:
      "AWS accepts TOTP apps, hardware tokens, and FIDO2 keys as MFA devices. Programmatic access keys, KMS keys, and SSH keys authenticate differently and are not MFA factors.",
    difficulty: "easy",
    services: ["iam"],
  },
  {
    id: "saa-d1-030",
    section: "d1-secure",
    subtopic: "iam-mfa",
    type: "single",
    prompt:
      "After choosing a strong root password, what single control adds the most protection for the AWS account root user?",
    options: [
      { id: "a", text: "Enable MFA on the root user" },
      { id: "b", text: "Create a duplicate root user for redundancy" },
      { id: "c", text: "Generate active access keys for the root user" },
      { id: "d", text: "Publish the account ID on a public website" },
    ],
    correct: ["a"],
    explanation:
      "Root MFA is a foundational control. AWS allows only one root user, root access keys should remain unused, and exposing account details publicly increases risk.",
    difficulty: "easy",
    services: ["iam"],
  },
  {
    id: "saa-d1-031",
    section: "d1-secure",
    subtopic: "iam-mfa",
    type: "single",
    prompt:
      "Operators with permission to delete production infrastructure should face stronger authentication. What should the company mandate?",
    options: [
      { id: "a", text: "MFA for those users, enforceable with a condition such as aws:MultiFactorAuthPresent" },
      { id: "b", text: "A longer password policy only, with no second factor" },
      { id: "c", text: "One shared IAM user so the team can act quickly" },
      { id: "d", text: "Stop CloudTrail logging to reduce alert volume" },
    ],
    correct: ["a"],
    explanation:
      "MFA plus IAM conditions ensures destructive API calls require a second factor. Password length alone is weaker. Shared identities blur audit trails, and turning off CloudTrail removes evidence of who changed what.",
    difficulty: "medium",
    services: ["iam"],
  },
  {
    id: "saa-d1-032",
    section: "d1-secure",
    subtopic: "iam-cli-sdk",
    type: "single",
    prompt:
      "When software calls AWS APIs programmatically (not through the interactive console login), how does it prove identity?",
    options: [
      { id: "a", text: "With an access key ID and secret access key, or preferably by assuming an IAM role for temporary credentials" },
      { id: "b", text: "With the email address registered to the AWS account" },
      { id: "c", text: "With an MFA code by itself, without any access key or role" },
      { id: "d", text: "With an AWS KMS CMK identifier" },
    ],
    correct: ["a"],
    explanation:
      "SDK and CLI requests are signed with credentials from access keys or, ideally, short-lived credentials obtained by assuming a role. Email alone, MFA alone, or a KMS key ID does not authenticate API calls.",
    difficulty: "easy",
    services: ["iam"],
  },
  {
    id: "saa-d1-033",
    section: "d1-secure",
    subtopic: "iam-cli-sdk",
    type: "single",
    prompt:
      "What is the recommended way to handle IAM access keys inside application source code?",
    options: [
      { id: "a", text: "Do not embed them; use IAM roles where possible, otherwise store keys in a secrets service and rotate them" },
      { id: "b", text: "Check them into version control so deployments stay reproducible" },
      { id: "c", text: "Email keys to anyone who needs to run the app locally" },
      { id: "d", text: "Expose keys in browser-side JavaScript for simplicity" },
    ],
    correct: ["a"],
    explanation:
      "Static keys in code or repos leak easily. Roles eliminate long-lived secrets on compute; when keys are unavoidable, keep them in Secrets Manager or similar and rotate on a schedule.",
    difficulty: "easy",
    services: ["iam"],
  },
  {
    id: "saa-d1-034",
    section: "d1-secure",
    subtopic: "iam-cli-sdk",
    type: "single",
    prompt:
      "What is the main purpose of the AWS Command Line Interface (CLI)?",
    options: [
      { id: "a", text: "Invoke AWS service APIs from a shell and automate them in scripts" },
      { id: "b", text: "Generate graphical VPC topology diagrams" },
      { id: "c", text: "Transparently encrypt every attached EBS volume" },
      { id: "d", text: "Replace IAM entirely for human authentication" },
    ],
    correct: ["a"],
    explanation:
      "The CLI is a command-line client for AWS APIs, using configured credentials to manage resources and automate tasks. It does not diagram networks, encrypt disks by itself, or substitute for IAM identity management.",
    difficulty: "easy",
    services: ["iam","cli"],
  },
  {
    id: "saa-d1-035",
    section: "d1-secure",
    subtopic: "iam-cli-sdk",
    type: "single",
    prompt:
      "What role do AWS SDKs play in application development?",
    options: [
      { id: "a", text: "They let programs in languages like Python or JavaScript call AWS APIs without hand-crafting HTTP requests" },
      { id: "b", text: "They replace the need for any AWS account" },
      { id: "c", text: "They define hardware SKUs for EC2 fleets" },
      { id: "d", text: "They generate Cost Explorer invoices each month" },
    ],
    correct: ["a"],
    explanation:
      "Language-specific SDKs (for example boto3 or the AWS SDK for JavaScript) wrap service APIs so your code can create, read, and manage AWS resources programmatically. Console clicks, instance families, and billing reports are unrelated to SDKs.",
    difficulty: "easy",
    services: ["iam","sdk"],
  },
  {
    id: "saa-d1-036",
    section: "d1-secure",
    subtopic: "ec2-security-groups",
    type: "single",
    prompt:
      "When you create a new VPC security group with no custom rules yet, what traffic is permitted?",
    options: [
      { id: "a", text: "Egress to anywhere is allowed; ingress from anywhere is denied" },
      { id: "b", text: "Ingress from anywhere is allowed; egress is denied" },
      { id: "c", text: "Both ingress and egress are wide open" },
      { id: "d", text: "Neither ingress nor egress is allowed" },
    ],
    correct: ["a"],
    explanation:
      "Fresh security groups start with an implicit deny on inbound connections and an allow-all outbound rule. Rules only grant access—they cannot express explicit denies—and return traffic for allowed flows is tracked because security groups are stateful.",
    difficulty: "easy",
    services: ["vpc","security-groups"],
  },
  {
    id: "saa-d1-037",
    section: "d1-secure",
    subtopic: "ec2-security-groups",
    type: "single",
    prompt:
      "Your application servers should accept HTTP only from an Application Load Balancer, even when the balancer’s addresses change. What inbound rule design fits best?",
    options: [
      { id: "a", text: "Allow the app tier’s port from the load balancer’s security group ID as the source" },
      { id: "b", text: "List every current private IP of the load balancer nodes in the rule" },
      { id: "c", text: "Open the listener port to the entire internet (0.0.0.0/0)" },
      { id: "d", text: "Permit all protocols in a subnet network ACL instead" },
    ],
    correct: ["a"],
    explanation:
      "Security group rules can use another group as the source, so instances behind the load balancer stay reachable without maintaining IP lists. Static IPs break when targets scale, public-CIDR rules expose the tier, and NACLs are subnet-level and less precise for instance-to-instance trust.",
    difficulty: "medium",
    services: ["vpc","security-groups"],
  },
  {
    id: "saa-d1-038",
    section: "d1-secure",
    subtopic: "ec2-security-groups",
    type: "single",
    prompt:
      "Clients will connect to your EC2 web server over TLS. Which inbound port should the instance security group permit?",
    options: [
      { id: "a", text: "443 (HTTPS)" },
      { id: "b", text: "80 (HTTP)" },
      { id: "c", text: "22 (SSH)" },
      { id: "d", text: "3389 (RDP)" },
    ],
    correct: ["a"],
    explanation:
      "Encrypted HTTP (HTTPS) listens on 443. Port 80 is plain HTTP, 22 is SSH for Linux administration, and 3389 is RDP for Windows—not web TLS.",
    difficulty: "easy",
    services: ["vpc","security-groups"],
  },
  {
    id: "saa-d1-039",
    section: "d1-secure",
    subtopic: "ec2-access",
    type: "single",
    prompt:
      "You need an encrypted terminal session into a Linux EC2 host. Which access method and port pair is standard?",
    options: [
      { id: "a", text: "Secure Shell (SSH) using TCP 22" },
      { id: "b", text: "Remote Desktop Protocol (RDP) using TCP 3389" },
      { id: "c", text: "Unencrypted web traffic (HTTP) using TCP 80" },
      { id: "d", text: "TLS-protected web traffic (HTTPS) using TCP 443" },
    ],
    correct: ["a"],
    explanation:
      "Administrators reach Linux instances with SSH over TCP 22. RDP serves Windows desktops; ports 80 and 443 carry web traffic, not interactive shells.",
    difficulty: "easy",
    services: ["ec2"],
  },
  {
    id: "saa-d1-040",
    section: "d1-secure",
    subtopic: "ec2-access",
    type: "single",
    prompt:
      "Which capability does EC2 Instance Connect primarily offer?",
    options: [
      { id: "a", text: "One-click browser SSH from the console using a short-lived key instead of a local .pem file" },
      { id: "b", text: "Automatic creation of a Client VPN endpoint" },
      { id: "c", text: "Hot attachment of additional EBS data volumes" },
      { id: "d", text: "Managed Layer-7 load balancing for the instance" },
    ],
    correct: ["a"],
    explanation:
      "Instance Connect injects a temporary public key for your session so you can SSH from the AWS console; port 22 must still be allowed. It is not VPN, volume management, or ELB functionality.",
    difficulty: "medium",
    services: ["ec2"],
  },
  {
    id: "saa-d1-041",
    section: "d1-secure",
    subtopic: "ec2-access",
    type: "single",
    prompt:
      "An EC2 instance has an IAM role attached. Where should application code on that instance obtain its AWS access keys?",
    options: [
      { id: "a", text: "Query the instance metadata service (IMDS) for rotating role credentials" },
      { id: "b", text: "Copy long-term keys from a file baked into the AMI" },
      { id: "c", text: "Request symmetric keys directly from AWS KMS on each API call" },
      { id: "d", text: "Download credentials from a bucket the role provisions at boot" },
    ],
    correct: ["a"],
    explanation:
      "IMDS publishes temporary security credentials for the attached role; SDKs and the CLI fetch them automatically. Embedding keys, using KMS as a credential store, or relying on S3 for secrets are anti-patterns for instance roles.",
    difficulty: "medium",
    services: ["ec2","iam"],
  },
  {
    id: "saa-d1-042",
    section: "d1-secure",
    subtopic: "ec2-access",
    type: "single",
    prompt:
      "Why do you associate an EC2 key pair when launching a Linux instance?",
    options: [
      { id: "a", text: "To prove identity during SSH login—you retain the private half of the pair" },
      { id: "b", text: "To enable default encryption on attached EBS volumes" },
      { id: "c", text: "To sign SigV4 requests to AWS service endpoints" },
      { id: "d", text: "To satisfy MFA requirements for the root account" },
    ],
    correct: ["a"],
    explanation:
      "Key pairs authenticate interactive SSH: the public key lands on the instance and you guard the private key locally. They do not encrypt disks, sign API calls, or replace MFA.",
    difficulty: "easy",
    services: ["ec2"],
  },
  {
    id: "saa-d1-043",
    section: "d1-secure",
    subtopic: "ebs-snapshots",
    type: "single",
    prompt:
      "Turning on encryption for an EBS volume—what protection does that deliver?",
    options: [
      { id: "a", text: "KMS-backed encryption for data on the volume, in snapshots, and on the wire between volume and instance" },
      { id: "b", text: "Encryption of packets only after they leave the VPC" },
      { id: "c", text: "No protection unless the application layer also encrypts fields" },
      { id: "d", text: "Encryption limited to the first sector of the block device" },
    ],
    correct: ["a"],
    explanation:
      "EBS encryption uses AWS KMS keys to protect stored blocks, snapshot copies, and I/O between the instance and volume transparently. It is broader than network-only or boot-sector-only schemes and does not require app-level crypto to be effective.",
    difficulty: "medium",
    services: ["ebs","kms"],
  },
  {
    id: "saa-d1-044",
    section: "d1-secure",
    subtopic: "ebs-snapshots",
    type: "single",
    prompt:
      "You snapshot a volume that already has EBS encryption enabled. What is true about the resulting snapshot and any volume restored from it?",
    options: [
      { id: "a", text: "The snapshot stays encrypted, and new volumes created from it inherit encryption" },
      { id: "b", text: "Snapshots are always plaintext regardless of the source volume" },
      { id: "c", text: "You must run a separate re-encryption job on the snapshot" },
      { id: "d", text: "Encryption applies only if restore happens in the same Availability Zone" },
    ],
    correct: ["a"],
    explanation:
      "Encryption settings flow through the snapshot lifecycle: encrypted sources yield encrypted snapshots, and volumes provisioned from those snapshots remain encrypted. Region/AZ does not strip encryption, and no manual re-encryption step is required.",
    difficulty: "medium",
    services: ["ebs","kms"],
  },
  {
    id: "saa-d1-045",
    section: "d1-secure",
    subtopic: "elb-features",
    type: "single",
    prompt:
      "One HTTPS listener on an Application Load Balancer must present different TLS certificates for several hostnames. How does AWS support that?",
    options: [
      { id: "a", text: "Associate multiple ACM certificates and rely on SNI so the ALB selects the cert matching the client’s hostname" },
      { id: "b", text: "Obtain one certificate that must list every hostname with no alternative approach" },
      { id: "c", text: "Pass encrypted traffic through to targets and terminate TLS only on EC2" },
      { id: "d", text: "Front the ALB with a NAT gateway to multiplex certificates" },
    ],
    correct: ["a"],
    explanation:
      "Server Name Indication lets a single ALB listener host many ACM certificates and choose based on the TLS Client Hello. A single mega-cert is not required, backend-only termination misses the multi-domain-at-LB goal, and NAT does not handle TLS cert selection.",
    difficulty: "medium",
    services: ["elb","acm"],
  },
  {
    id: "saa-d1-046",
    section: "d1-secure",
    subtopic: "rds-security-proxy",
    type: "single",
    prompt:
      "What is the supported way to encrypt Amazon RDS data at rest?",
    options: [
      { id: "a", text: "Turn on KMS encryption when creating the DB; backups, snapshots, and read replicas inherit it" },
      { id: "b", text: "RDS never offers at-rest encryption" },
      { id: "c", text: "Rely solely on custom application encryption before INSERT" },
      { id: "d", text: "Enable SSL to clients while leaving stored pages unencrypted" },
    ],
    correct: ["a"],
    explanation:
      "RDS encryption at rest is a creation-time KMS setting that encrypts storage, automated backups, snapshots, and replicas. In-transit SSL does not replace disk encryption, and RDS does support native at-rest protection.",
    difficulty: "medium",
    services: ["rds","kms"],
  },
  {
    id: "saa-d1-047",
    section: "d1-secure",
    subtopic: "rds-security-proxy",
    type: "single",
    prompt:
      "Your team wants apps to reach RDS or Aurora without embedding a long-lived database password. Which authentication model helps?",
    options: [
      { id: "a", text: "IAM database authentication using short-lived auth tokens" },
      { id: "b", text: "Store the master user password in source control" },
      { id: "c", text: "Connect with the AWS account root user credentials" },
      { id: "d", text: "Disable database login requirements entirely" },
    ],
    correct: ["a"],
    explanation:
      "Supported engines accept IAM-generated tokens tied to database users mapped from IAM identities, avoiding static passwords. Shared master passwords, root AWS credentials, or open access weaken security.",
    difficulty: "medium",
    services: ["rds","iam"],
  },
  {
    id: "saa-d1-048",
    section: "d1-secure",
    subtopic: "rds-security-proxy",
    type: "single",
    prompt:
      "Which network layout best limits who can reach an RDS instance?",
    options: [
      { id: "a", text: "Deploy the database in private subnets and permit only app-tier security groups on the DB port" },
      { id: "b", text: "Assign a public IP and allow 0.0.0.0/0 on the database port" },
      { id: "c", text: "Use an IAM policy alone with no VPC or security group rules" },
      { id: "d", text: "Place the instance in a public subnet without any security group" },
    ],
    correct: ["a"],
    explanation:
      "RDS should sit on private address space with security groups restricting sources—typically application servers. Public exposure, missing groups, or IAM alone do not substitute for network-layer isolation.",
    difficulty: "medium",
    services: ["rds","vpc","security-groups"],
  },
  {
    id: "saa-d1-049",
    section: "d1-secure",
    subtopic: "s3-security",
    type: "single",
    prompt:
      "How would you describe an Amazon S3 bucket policy?",
    options: [
      { id: "a", text: "JSON access control attached to the bucket resource that grants or denies actions on the bucket and objects" },
      { id: "b", text: "A dedicated IAM user created for each bucket" },
      { id: "c", text: "A rule that moves objects between storage tiers over time" },
      { id: "d", text: "A billing tier that sets per-GB pricing" },
    ],
    correct: ["a"],
    explanation:
      "Bucket policies are resource-based IAM documents on the bucket, commonly used for cross-account access or conditions like requiring HTTPS. They are not IAM users, lifecycle transitions, or storage classes.",
    difficulty: "medium",
    services: ["s3"],
  },
  {
    id: "saa-d1-050",
    section: "d1-secure",
    subtopic: "s3-security",
    type: "single",
    prompt:
      "Leadership requires that a sensitive bucket can never become world-readable, even if someone misconfigures ACLs or policies. What control should you enable first?",
    options: [
      { id: "a", text: "S3 Block Public Access at the account level, the bucket level, or both" },
      { id: "b", text: "Object ACLs alone without any account-level guardrails" },
      { id: "c", text: "A DNS CNAME alias pointing at the bucket" },
      { id: "d", text: "An aggressive CloudFront cache TTL" },
    ],
    correct: ["a"],
    explanation:
      "Block Public Access acts as a safety net that prevents public ACLs or policies from taking effect. ACL-only controls, DNS aliases, and cache settings do not stop anonymous S3 reads.",
    difficulty: "medium",
    services: ["s3"],
  },
  {
    id: "saa-d1-051",
    section: "d1-secure",
    subtopic: "s3-security",
    type: "single",
    prompt:
      "Another AWS account needs read-only access to objects in your bucket. What aligns with least privilege?",
    options: [
      { id: "a", text: "Add a bucket policy or cross-account IAM role granting that account specific s3:GetObject (and related) actions" },
      { id: "b", text: "Enable public read on the entire bucket" },
      { id: "c", text: "Email your IAM user’s access key ID and secret" },
      { id: "d", text: "Zip the files and send them outside AWS" },
    ],
    correct: ["a"],
    explanation:
      "Cross-account bucket policies or assumable roles scope permissions to the partner account without exposing data to the internet or sharing long-term keys.",
    difficulty: "medium",
    services: ["s3","iam"],
  },
  {
    id: "saa-d1-052",
    section: "d1-secure",
    subtopic: "s3-security",
    type: "single",
    prompt:
      "Traffic to S3 must stay on the AWS network from your VPC and never traverse the public internet. Which setup is appropriate?",
    options: [
      { id: "a", text: "Create an S3 gateway VPC endpoint and restrict the bucket policy to requests from that endpoint" },
      { id: "b", text: "Make the bucket public but filter by source IP in the policy" },
      { id: "c", text: "Route S3 calls through a NAT gateway to hide the bucket" },
      { id: "d", text: "Associate an Elastic IP directly with the bucket" },
    ],
    correct: ["a"],
    explanation:
      "Gateway endpoints keep S3 access on Amazon’s backbone inside the Region; conditioning the bucket policy on the endpoint ID (for example aws:sourceVpce) limits who can call the API. Public buckets, NAT, and EIPs do not provide private VPC-only S3 paths.",
    difficulty: "hard",
    services: ["s3","vpc-endpoints"],
  },
  {
    id: "saa-d1-053",
    section: "d1-secure",
    subtopic: "s3-versioning",
    type: "single",
    prompt:
      "After you enable S3 Versioning on a bucket, what benefit do you gain?",
    options: [
      { id: "a", text: "S3 keeps prior revisions so you can roll back accidental overwrites or deletions" },
      { id: "b", text: "All objects are automatically encrypted with a new key daily" },
      { id: "c", text: "Storage charges drop because old bytes are deduplicated" },
      { id: "d", text: "Objects replicate to another Region without extra configuration" },
    ],
    correct: ["a"],
    explanation:
      "Versioning preserves historical object versions for recovery. It does not by itself encrypt data, reduce cost, or enable cross-Region replication.",
    difficulty: "easy",
    services: ["s3"],
  },
  {
    id: "saa-d1-054",
    section: "d1-secure",
    subtopic: "s3-versioning",
    type: "single",
    prompt:
      "Versioning is on. A user deletes the current version of an object through the console. What does S3 do?",
    options: [
      { id: "a", text: "It inserts a delete marker while older versions remain recoverable" },
      { id: "b", text: "It immediately purges every version of the key from storage" },
      { id: "c", text: "It ignores the delete request completely" },
      { id: "d", text: "It transitions all versions to Glacier automatically" },
    ],
    correct: ["a"],
    explanation:
      "Deletes in versioned buckets are non-destructive by default: a delete marker hides the latest view but prior versions persist until explicitly removed. There is no automatic Glacier move or total erase on a simple delete.",
    difficulty: "medium",
    services: ["s3"],
  },
  {
    id: "saa-d1-055",
    section: "d1-secure",
    subtopic: "s3-versioning",
    type: "single",
    prompt:
      "You change a versioned bucket from Enabled to Suspended. What happens to object versions that already exist?",
    options: [
      { id: "a", text: "They remain stored; only new writes stop creating additional versions" },
      { id: "b", text: "S3 deletes every historical version automatically" },
      { id: "c", text: "The bucket itself is removed" },
      { id: "d", text: "Existing objects become unreadable" },
    ],
    correct: ["a"],
    explanation:
      "Suspending versioning is forward-looking: retained versions stay available, but overwrites and deletes no longer stack new versions. It does not wipe data or block reads.",
    difficulty: "medium",
    services: ["s3"],
  },
  {
    id: "saa-d1-056",
    section: "d1-secure",
    subtopic: "s3-encryption",
    type: "single",
    prompt:
      "You want S3 to handle encryption keys entirely—no CMKs or customer key uploads. Which server-side option fits?",
    options: [
      { id: "a", text: "SSE-S3 (keys managed by Amazon S3, AES-256)" },
      { id: "b", text: "SSE-C (you supply a key with each request)" },
      { id: "c", text: "SSE-KMS (keys in AWS KMS with audit trails)" },
      { id: "d", text: "Client-side encryption before PutObject" },
    ],
    correct: ["a"],
    explanation:
      "SSE-S3 is fully managed by the service. SSE-KMS adds KMS operations, SSE-C shifts key custody to you, and client-side encryption happens outside S3 before upload.",
    difficulty: "medium",
    services: ["s3"],
  },
  {
    id: "saa-d1-057",
    section: "d1-secure",
    subtopic: "s3-encryption",
    type: "single",
    prompt:
      "Your compliance team chose SSE-C for certain objects. Who owns the encryption keys and how does S3 use them?",
    options: [
      { id: "a", text: "You generate and send keys over HTTPS with each request; S3 encrypts or decrypts but never persists your key material" },
      { id: "b", text: "AWS generates and stores the keys in your account automatically" },
      { id: "c", text: "Keys are written into object metadata inside the bucket" },
      { id: "d", text: "SSE-C disables encryption entirely" },
    ],
    correct: ["a"],
    explanation:
      "With customer-provided keys you must supply the key on every upload/download over TLS; S3 performs crypto operations ephemerally. AWS does not retain SSE-C keys, and encryption is very much in use—not disabled.",
    difficulty: "hard",
    services: ["s3"],
  },
  {
    id: "saa-d1-058",
    section: "d1-secure",
    subtopic: "s3-encryption",
    type: "single",
    prompt:
      "Every object uploaded to a bucket should be encrypted at rest even when clients omit encryption headers. What bucket setting enforces that?",
    options: [
      { id: "a", text: "Configure default bucket encryption using SSE-S3 or SSE-KMS" },
      { id: "b", text: "Trust each uploader to remember optional encryption flags" },
      { id: "c", text: "Create a Route 53 CNAME to the bucket hostname" },
      { id: "d", text: "Turn on versioning for the bucket" },
    ],
    correct: ["a"],
    explanation:
      "Default encryption applies SSE-S3 or SSE-KMS to new objects automatically. Versioning tracks revisions but does not encrypt; DNS aliases and honor-system uploads do not guarantee at-rest protection.",
    difficulty: "easy",
    services: ["s3"],
  },
  {
    id: "saa-d1-059",
    section: "d1-secure",
    subtopic: "s3-encryption",
    type: "single",
    prompt:
      "Policy requires that clients never call S3 over plain HTTP. How can you enforce TLS at the bucket level?",
    options: [
      { id: "a", text: "Deny s3:* when the aws:SecureTransport condition is false" },
      { id: "b", text: "Disable the bucket until users complain" },
      { id: "c", text: "Switch all objects to SSE-C" },
      { id: "d", text: "Enable MFA Delete on the bucket" },
    ],
    correct: ["a"],
    explanation:
      "A Deny statement keyed on aws:SecureTransport blocks non-HTTPS API calls. Disabling the bucket, SSE-C, and MFA Delete address different problems—not mandatory in-transit encryption.",
    difficulty: "medium",
    services: ["s3"],
  },
  {
    id: "saa-d1-060",
    section: "d1-secure",
    subtopic: "s3-access",
    type: "single",
    prompt:
      "A partner needs to download one private object for the next hour without opening the bucket to the world. What should you issue?",
    options: [
      { id: "a", text: "A pre-signed URL for that object with a short expiration" },
      { id: "b", text: "A bucket policy making all objects public read" },
      { id: "c", text: "Your IAM access key pair" },
      { id: "d", text: "A DNS CNAME record to the object key" },
    ],
    correct: ["a"],
    explanation:
      "Pre-signed URLs delegate the signer’s permissions for a single object until expiry. Public buckets, shared keys, and DNS tricks do not provide scoped temporary download rights.",
    difficulty: "easy",
    services: ["s3"],
  },
  {
    id: "saa-d1-061",
    section: "d1-secure",
    subtopic: "s3-access",
    type: "single",
    prompt:
      "Which operations can a pre-signed S3 URL authorize for a limited time?",
    options: [
      { id: "a", text: "Downloading (GET) or uploading (PUT) a specific object using the creator’s IAM permissions" },
      { id: "b", text: "Making an entire bucket permanently anonymous" },
      { id: "c", text: "Applying server-side encryption keys to all future objects" },
      { id: "d", text: "Configuring cross-Region replication rules" },
    ],
    correct: ["a"],
    explanation:
      "Pre-signed URLs wrap SigV4 for one object and one HTTP method (commonly GET or PUT) until they expire. They cannot flip buckets public, set default encryption, or define replication.",
    difficulty: "medium",
    services: ["s3"],
  },
  {
    id: "saa-d1-062",
    section: "d1-secure",
    subtopic: "s3-access",
    type: "single",
    prompt:
      "A SPA at https://app.example.com fetches images from an S3 bucket in another domain, and the browser reports a CORS error. What S3 configuration fixes this?",
    options: [
      { id: "a", text: "A CORS rule on the bucket allowing https://app.example.com (and needed methods/headers)" },
      { id: "b", text: "A lifecycle transition to Intelligent-Tiering" },
      { id: "c", text: "MFA Delete on the bucket" },
      { id: "d", text: "A NAT gateway in the VPC" },
    ],
    correct: ["a"],
    explanation:
      "Browsers enforce cross-origin rules; the bucket must advertise permitted origins via CORS. Lifecycle, MFA Delete, and NAT do not satisfy browser preflight checks.",
    difficulty: "medium",
    services: ["s3"],
  },
  {
    id: "saa-d1-063",
    section: "d1-secure",
    subtopic: "s3-access",
    type: "single",
    prompt:
      "Why might you create S3 Access Points for a large shared dataset?",
    options: [
      { id: "a", text: "Each access point exposes a dedicated hostname and policy so teams get tailored permissions without one monolithic bucket policy" },
      { id: "b", text: "They replace CloudFront as a global CDN" },
      { id: "c", text: "They store CMKs separate from KMS" },
      { id: "d", text: "They provision an Aurora cluster behind the bucket" },
    ],
    correct: ["a"],
    explanation:
      "Access Points partition access management for shared buckets by giving workloads their own endpoint and IAM/resource policy. They are not CDN, key storage, or database services.",
    difficulty: "medium",
    services: ["s3"],
  },
  {
    id: "saa-d1-064",
    section: "d1-secure",
    subtopic: "s3-access",
    type: "single",
    prompt:
      "What problem does S3 Object Lambda solve?",
    options: [
      { id: "a", text: "It invokes AWS Lambda during GET to transform object bytes on the fly—such as redacting fields—while the stored object stays unchanged" },
      { id: "b", text: "It hosts static websites with custom domains" },
      { id: "c", text: "It replicates objects across Regions automatically" },
      { id: "d", text: "It consolidates AWS invoices for S3 usage" },
    ],
    correct: ["a"],
    explanation:
      "Object Lambda runs your function at retrieval time to filter or reshape data clients receive without rewriting the underlying S3 object. Static hosting, replication, and billing are separate features.",
    difficulty: "hard",
    services: ["s3","lambda"],
  },
  {
    id: "saa-d1-065",
    section: "d1-secure",
    subtopic: "s3-compliance",
    type: "single",
    prompt:
      "When S3 MFA Delete is enabled, which actions typically require multi-factor authentication?",
    options: [
      { id: "a", text: "Permanently removing object versions and changing the bucket’s versioning state" },
      { id: "b", text: "Every GetObject call from any principal" },
      { id: "c", text: "Each PutObject upload" },
      { id: "d", text: "No actions—MFA Delete is informational only" },
    ],
    correct: ["a"],
    explanation:
      "MFA Delete guards destructive version operations and versioning configuration changes. Routine reads and uploads are unaffected, and the feature is enforced—not cosmetic.",
    difficulty: "medium",
    services: ["s3"],
  },
  {
    id: "saa-d1-066",
    section: "d1-secure",
    subtopic: "s3-compliance",
    type: "single",
    prompt:
      "Regulations require WORM storage so records cannot be altered or removed until a retention date passes. Which S3 capability provides that?",
    options: [
      { id: "a", text: "Object Lock for WORM retention on S3 objects" },
      { id: "b", text: "S3 CORS configuration" },
      { id: "c", text: "Transfer Acceleration using CloudFront edge locations for uploads" },
      { id: "d", text: "Requester Pays so downloaders cover request and data-transfer costs" },
    ],
    correct: ["a"],
    explanation:
      "Object Lock implements WORM retention and legal holds on object versions. CORS, acceleration, and requester pays do not immutably lock content.",
    difficulty: "medium",
    services: ["s3"],
  },
  {
    id: "saa-d1-067",
    section: "d1-secure",
    subtopic: "s3-compliance",
    type: "single",
    prompt:
      "S3 Object Lock supports two retention modes. How do they differ?",
    options: [
      { id: "a", text: "Governance mode allows privileged users to override retention; Compliance mode blocks deletion—including by root—until retention ends" },
      { id: "b", text: "There is only one mode with no override path" },
      { id: "c", text: "Read mode versus write mode for object ACLs" },
      { id: "d", text: "Public mode versus private mode for bucket access" },
    ],
    correct: ["a"],
    explanation:
      "Governance retention can be lifted by users with s3:BypassGovernanceRetention; Compliance retention is strict until the period expires. The other choices describe unrelated or fictional modes.",
    difficulty: "hard",
    services: ["s3"],
  },
  {
    id: "saa-d1-068",
    section: "d1-secure",
    subtopic: "s3-compliance",
    type: "single",
    prompt:
      "What is the purpose of S3 Glacier Vault Lock?",
    options: [
      { id: "a", text: "Apply a vault policy that enforces compliance controls such as WORM; once locked, the policy cannot be relaxed" },
      { id: "b", text: "Expose archive data to anonymous internet users" },
      { id: "c", text: "Introduce a new S3 Standard storage class" },
      { id: "d", text: "Deliver Glacier objects through a CDN edge network" },
    ],
    correct: ["a"],
    explanation:
      "Vault Lock lets you publish and then irreversibly lock a Glacier vault access policy for regulatory WORM requirements. It does not publish data publicly, define storage classes, or act as a CDN.",
    difficulty: "medium",
    services: ["s3-glacier"],
  },
  {
    id: "saa-d1-069",
    section: "d1-secure",
    subtopic: "s3-compliance",
    type: "single",
    prompt:
      "Your security team needs a durable audit trail of every API-style access attempt against a specific S3 bucket. What should you configure?",
    options: [
      { id: "a", text: "Turn on S3 server access logging, or capture S3 data events in CloudTrail, and deliver logs to a dedicated logging bucket" },
      { id: "b", text: "Turn on bucket versioning on the data bucket" },
      { id: "c", text: "Issue pre-signed URLs for each download" },
      { id: "d", text: "Enable S3 Transfer Acceleration on the bucket" },
    ],
    correct: ["a"],
    explanation:
      "Server access logging and CloudTrail S3 data events both produce per-request records suitable for compliance reviews. Versioning preserves object history but does not log who accessed what; pre-signed URLs and Transfer Acceleration do not provide audit trails.",
    difficulty: "medium",
    services: ["s3","cloudtrail"],
  },
  {
    id: "saa-d1-070",
    section: "d1-secure",
    subtopic: "cloudfront",
    type: "single",
    prompt:
      "A media company must block viewers in certain countries from streaming through CloudFront while allowing the rest of the world. Which feature applies?",
    options: [
      { id: "a", text: "Configure CloudFront geographic restrictions to allowlist or blocklist countries" },
      { id: "b", text: "Add an S3 lifecycle transition rule" },
      { id: "c", text: "Attach a NAT gateway to the origin" },
      { id: "d", text: "Switch Route 53 to latency-based routing" },
    ],
    correct: ["a"],
    explanation:
      "Geo restriction (geo-blocking) on a distribution filters viewers by country code—ideal for licensing or regulatory limits. Lifecycle rules, NAT, and DNS routing do not enforce viewer geography at the CDN edge.",
    difficulty: "medium",
    services: ["cloudfront"],
  },
  {
    id: "saa-d1-071",
    section: "d1-secure",
    subtopic: "cloudfront",
    type: "single",
    prompt:
      "Objects in an S3 bucket must be readable only via your CloudFront distribution, with direct S3 URLs rejected. What is the recommended pattern?",
    options: [
      { id: "a", text: "Attach Origin Access Control (OAC) to the distribution and update the bucket policy so only that distribution may GetObject" },
      { id: "b", text: "Set the bucket ACL to public-read" },
      { id: "c", text: "Require a unique pre-signed URL for every object request" },
      { id: "d", text: "Place a NAT gateway between users and S3" },
    ],
    correct: ["a"],
    explanation:
      "OAC (replacing legacy OAI) lets CloudFront authenticate to S3 while the bucket policy blocks anonymous or direct access. Public buckets, per-object pre-signing at scale, and NAT do not lock the origin to a single distribution.",
    difficulty: "medium",
    services: ["cloudfront","s3"],
  },
  {
    id: "saa-d1-072",
    section: "d1-secure",
    subtopic: "api-gateway",
    type: "single",
    prompt:
      "Which mechanisms can API Gateway use to decide whether an incoming HTTP request may invoke your backend?",
    options: [
      { id: "a", text: "IAM authorization, Amazon Cognito user pool authorizers, or Lambda authorizers for custom logic" },
      { id: "b", text: "Only by leaving every method unauthenticated and public" },
      { id: "c", text: "Only by routing traffic through a NAT gateway first" },
      { id: "d", text: "API Gateway cannot enforce authorization on requests" },
    ],
    correct: ["a"],
    explanation:
      "API Gateway supports multiple authorizer types: SigV4/IAM, JWT validation via Cognito user pools, and custom Lambda authorizers. Public APIs, NAT, and the claim that authorization is unsupported are all incorrect.",
    difficulty: "medium",
    services: ["api-gateway","cognito","iam"],
  },
  {
    id: "saa-d1-073",
    section: "d1-secure",
    subtopic: "serverless-integration",
    type: "single",
    prompt:
      "What capability does an Amazon Cognito user pool primarily deliver?",
    options: [
      { id: "a", text: "A hosted user directory with sign-up, sign-in, and federation that returns tokens your app uses to recognize users" },
      { id: "b", text: "Long-lived IAM access keys embedded in mobile clients" },
      { id: "c", text: "A fully managed SQL database engine" },
      { id: "d", text: "Durable object storage for static assets" },
    ],
    correct: ["a"],
    explanation:
      "User pools manage application identities and issue JWTs after authentication. They do not vend AWS API credentials (that is identity pools), nor are they RDS or S3.",
    difficulty: "medium",
    services: ["cognito"],
  },
  {
    id: "saa-d1-074",
    section: "d1-secure",
    subtopic: "serverless-integration",
    type: "single",
    prompt:
      "What is the main purpose of an Amazon Cognito identity pool?",
    options: [
      { id: "a", text: "Exchange a logged-in or unauthenticated app identity for short-lived AWS credentials via STS" },
      { id: "b", text: "Host relational tables with SQL queries" },
      { id: "c", text: "Cache and deliver web content globally" },
      { id: "d", text: "Store and scan container images" },
    ],
    correct: ["a"],
    explanation:
      "Identity pools (federated identities) map external or Cognito user pool identities to temporary, scoped IAM credentials. User pools authenticate humans; identity pools authorize AWS API calls. The distractors describe other AWS services.",
    difficulty: "hard",
    services: ["cognito","sts"],
  },
  {
    id: "saa-d1-075",
    section: "d1-secure",
    subtopic: "serverless-app-patterns",
    type: "single",
    prompt:
      "A mobile client needs both user login and least-privilege access to DynamoDB and S3 without shipping secrets in the app binary. What architecture fits?",
    options: [
      { id: "a", text: "Authenticate with a Cognito user pool, then obtain scoped temporary credentials through a Cognito identity pool" },
      { id: "b", text: "Hard-code IAM user access keys in the application package" },
      { id: "c", text: "Sign API calls with the AWS account root user credentials" },
      { id: "d", text: "Remove authentication and expose the DynamoDB table to the internet" },
    ],
    correct: ["a"],
    explanation:
      "The Cognito pair handles human auth and STS-backed AWS access with rotating credentials. Static keys, root credentials, and public data stores violate security best practices for client apps.",
    difficulty: "medium",
    services: ["cognito"],
  },
  {
    id: "saa-d1-076",
    section: "d1-secure",
    subtopic: "cloudtrail-config",
    type: "single",
    prompt:
      "Which type of information does AWS CloudTrail primarily capture?",
    options: [
      { id: "a", text: "Management and optional data-plane API calls—actor, action, time, and source—for governance and forensics" },
      { id: "b", text: "CPU, memory, and disk utilization time series" },
      { id: "c", text: "Point-in-time configuration snapshots of each resource" },
      { id: "d", text: "Stdout and stderr from EC2 application processes" },
    ],
    correct: ["a"],
    explanation:
      "CloudTrail is the account activity log for AWS API usage. CloudWatch covers metrics and operational logs; Config tracks configuration history; application stdout is not CloudTrail's role.",
    difficulty: "easy",
    services: ["cloudtrail"],
  },
  {
    id: "saa-d1-077",
    section: "d1-secure",
    subtopic: "cloudtrail-config",
    type: "single",
    prompt:
      "After an EC2 instance was terminated, you need the principal name, timestamp, and source IP of the delete call. Where do you look first?",
    options: [
      { id: "a", text: "CloudTrail event history or log files in your trail's S3 bucket" },
      { id: "b", text: "CloudWatch default EC2 metric dashboards" },
      { id: "c", text: "The S3 storage class of unrelated backup objects" },
      { id: "d", text: "Inbound rules on the instance security group" },
    ],
    correct: ["a"],
    explanation:
      "CloudTrail records who invoked TerminateInstances and related API details. Metrics show utilization, not identity; storage class and security groups do not answer 'who deleted this resource.'",
    difficulty: "medium",
    services: ["cloudtrail"],
  },
  {
    id: "saa-d1-078",
    section: "d1-secure",
    subtopic: "cloudtrail-config",
    type: "single",
    prompt:
      "Which statement best describes AWS Config?",
    options: [
      { id: "a", text: "It inventories resource settings over time and runs rules to detect configuration drift and compliance gaps" },
      { id: "b", text: "It logs every API invocation for forensic audit" },
      { id: "c", text: "It ingests metrics and fires operational alarms" },
      { id: "d", text: "It distributes HTTP requests across targets" },
    ],
    correct: ["a"],
    explanation:
      "Config focuses on what resources look like and whether they match policies. CloudTrail audits actions; CloudWatch monitors performance; load balancing is unrelated.",
    difficulty: "medium",
    services: ["config"],
  },
  {
    id: "saa-d1-079",
    section: "d1-secure",
    subtopic: "cloudtrail-config",
    type: "single",
    prompt:
      "Compliance requires ongoing checks that no S3 bucket is public and that EBS volumes stay encrypted, plus a timeline of setting changes. Which service fits?",
    options: [
      { id: "a", text: "AWS Config with managed or custom config rules and configuration history" },
      { id: "b", text: "AWS CloudTrail alone" },
      { id: "c", text: "Amazon CloudWatch alarms" },
      { id: "d", text: "Amazon Inspector vulnerability scans only" },
    ],
    correct: ["a"],
    explanation:
      "Config rules evaluate resource properties continuously and retain configuration timelines. CloudTrail shows who changed settings but not ongoing compliance state; CloudWatch and Inspector serve different purposes.",
    difficulty: "medium",
    services: ["config"],
  },
  {
    id: "saa-d1-080",
    section: "d1-secure",
    subtopic: "cloudtrail-config",
    type: "single",
    prompt:
      "Which pairing correctly separates CloudTrail, CloudWatch, and AWS Config?",
    options: [
      { id: "a", text: "CloudTrail tracks API activity; CloudWatch handles metrics, logs, and alarms; Config tracks resource configuration and compliance over time" },
      { id: "b", text: "All three are interchangeable branding for one product" },
      { id: "c", text: "CloudTrail stores CPU graphs; CloudWatch stores API audits; Config only sends SNS emails" },
      { id: "d", text: "Each service exists solely to create IAM users" },
    ],
    correct: ["a"],
    explanation:
      "Exam questions often test this split: audit trail (CloudTrail), operational monitoring (CloudWatch), and configuration compliance (Config). The other options misassign or trivialize those roles.",
    difficulty: "medium",
    services: ["cloudtrail","cloudwatch","config"],
  },
  {
    id: "saa-d1-081",
    section: "d1-secure",
    subtopic: "organizations",
    type: "single",
    prompt:
      "What problem does AWS Organizations solve for enterprises with many accounts?",
    options: [
      { id: "a", text: "Central governance of a multi-account estate—OUs, SCPs, and consolidated billing from one management account" },
      { id: "b", text: "Hosting a managed Microsoft Active Directory forest" },
      { id: "c", text: "Replacing all IAM with a single shared password" },
      { id: "d", text: "Running Kubernetes clusters across Regions" },
    ],
    correct: ["a"],
    explanation:
      "Organizations links member accounts, applies service control policies, and aggregates billing. Directory Service, plain IAM, and EKS/ECS orchestration are separate concerns.",
    difficulty: "easy",
    services: ["organizations"],
  },
  {
    id: "saa-d1-082",
    section: "d1-secure",
    subtopic: "organizations",
    type: "single",
    prompt:
      "You want guardrails to inherit from a parent grouping down to dozens of member accounts. How should the org be structured?",
    options: [
      { id: "a", text: "Place accounts in organizational units (OUs) and attach service control policies (SCPs) at the root, OU, or account level" },
      { id: "b", text: "Add every human to one large IAM group in a single account" },
      { id: "c", text: "Share one VPC CIDR across all accounts without peering" },
      { id: "d", text: "Create a separate Route 53 hosted zone per policy requirement" },
    ],
    correct: ["a"],
    explanation:
      "OUs create a hierarchy; SCPs limit maximum permissions for everything beneath where they attach. IAM groups, shared VPC tricks, and DNS zones do not provide org-wide permission guardrails.",
    difficulty: "medium",
    services: ["organizations"],
  },
  {
    id: "saa-d1-083",
    section: "d1-secure",
    subtopic: "organizations",
    type: "single",
    prompt:
      "Why enable consolidated billing in AWS Organizations?",
    options: [
      { id: "a", text: "Single invoice for the org, pooled usage for tiered pricing, and sharing of Reserved Instances and Savings Plans across linked accounts" },
      { id: "b", text: "Automatic encryption of every EBS volume in all accounts" },
      { id: "c", text: "Global anycast DNS for application endpoints" },
      { id: "d", text: "Elimination of IAM in member accounts" },
    ],
    correct: ["a"],
    explanation:
      "Consolidated billing aggregates spend and discount eligibility; it does not encrypt data, provide DNS, or remove the need for IAM within each account.",
    difficulty: "medium",
    services: ["organizations"],
  },
  {
    id: "saa-d1-084",
    section: "d1-secure",
    subtopic: "organizations",
    type: "single",
    prompt:
      "What is the intent of tag policies in AWS Organizations?",
    options: [
      { id: "a", text: "Enforce consistent tag keys and allowed values across accounts to improve cost allocation and automation" },
      { id: "b", text: "Apply server-side encryption keys to all resources" },
      { id: "c", text: "Grant or deny IAM actions organization-wide" },
      { id: "d", text: "Steer network packets between VPCs" },
    ],
    correct: ["a"],
    explanation:
      "Tag policies standardize labeling; SCPs control permissions, KMS handles encryption, and networking services handle traffic—not tag policies.",
    difficulty: "medium",
    services: ["organizations"],
  },
  {
    id: "saa-d1-085",
    section: "d1-secure",
    subtopic: "iam-advanced-policies",
    type: "single",
    prompt:
      "How do identity-based IAM policies differ from resource-based policies?",
    options: [
      { id: "a", text: "Identity policies bind to users, groups, or roles; resource policies attach to the resource (such as an S3 bucket) and include a Principal" },
      { id: "b", text: "There is no difference—they are stored in the same place" },
      { id: "c", text: "Resource policies can only be attached to IAM users" },
      { id: "d", text: "Identity policies must always declare an external Principal element" },
    ],
    correct: ["a"],
    explanation:
      "Identity-based policies grant the attached principal permissions. Resource-based policies live on the resource and explicitly name who may access it. Principals belong on resource policies, not typical identity policies.",
    difficulty: "medium",
    services: ["iam"],
  },
  {
    id: "saa-d1-086",
    section: "d1-secure",
    subtopic: "iam-advanced-policies",
    type: "single",
    prompt:
      "Two common cross-account access patterns exist. Which answer captures both and their behavioral difference?",
    options: [
      { id: "a", text: "A resource policy trusting the foreign account (caller keeps their identity) versus assuming a role in your account (session uses the role's permissions)" },
      { id: "b", text: "Publishing the resource on the public internet only" },
      { id: "c", text: "Emailing long-term access keys to the partner" },
      { id: "d", text: "Cross-account access is not supported in AWS" },
    ],
    correct: ["a"],
    explanation:
      "Resource policies and role assumption are both standard, credential-free cross-account models with different identity semantics during the call. Public exposure and shared keys are anti-patterns; cross-account access is well supported.",
    difficulty: "hard",
    services: ["iam","sts"],
  },
  {
    id: "saa-d1-087",
    section: "d1-secure",
    subtopic: "iam-advanced-policies",
    type: "single",
    prompt:
      "Which rules describe IAM's default authorization logic?",
    options: [
      { id: "a", text: "Implicit deny unless allowed; an explicit Deny overrides any Allow; SCPs and permissions boundaries can further limit the outcome" },
      { id: "b", text: "All actions are permitted until the user is removed" },
      { id: "c", text: "Whichever policy was edited most recently decides access" },
      { id: "d", text: "An Allow statement always beats an explicit Deny" },
    ],
    correct: ["a"],
    explanation:
      "IAM evaluation is deny-by-default, explicit deny wins, and organization SCPs plus permissions boundaries cap effective permissions. The distractors describe incorrect evaluation orders.",
    difficulty: "hard",
    services: ["iam"],
  },
  {
    id: "saa-d1-088",
    section: "d1-secure",
    subtopic: "iam-advanced-policies",
    type: "single",
    prompt:
      "What does attaching an IAM permissions boundary to a user or role accomplish?",
    options: [
      { id: "a", text: "It defines the upper limit of permissions that identity can ever exercise—it filters grants but does not grant access by itself" },
      { id: "b", text: "It automatically grants AdministratorAccess" },
      { id: "c", text: "It creates a stateful firewall between subnets" },
      { id: "d", text: "It triggers billing alerts when spend exceeds a threshold" },
    ],
    correct: ["a"],
    explanation:
      "Effective permissions are the intersection of identity policies and the boundary. Boundaries are a delegation safety net, not admin grants, network ACLs, or cost tools.",
    difficulty: "hard",
    services: ["iam"],
  },
  {
    id: "saa-d1-089",
    section: "d1-secure",
    subtopic: "identity-governance",
    type: "single",
    prompt:
      "What is AWS IAM Identity Center (formerly AWS Single Sign-On)?",
    options: [
      { id: "a", text: "A hub for SSO into many AWS accounts and SaaS apps, often federated to your corporate IdP" },
      { id: "b", text: "An Aurora-compatible database cluster" },
      { id: "c", text: "A global edge cache for static files" },
      { id: "d", text: "Private Docker image hosting" },
    ],
    correct: ["a"],
    explanation:
      "Identity Center centralizes workforce access with permission sets across an organization. It is not RDS, CloudFront, or ECR.",
    difficulty: "medium",
    services: ["iam-identity-center"],
  },
  {
    id: "saa-d1-090",
    section: "d1-secure",
    subtopic: "identity-governance",
    type: "single",
    prompt:
      "What does the AWS Managed Microsoft AD option in AWS Directory Service offer?",
    options: [
      { id: "a", text: "A highly available Active Directory domain in AWS that can trust on-premises AD and support EC2 domain join" },
      { id: "b", text: "Unlimited S3 object storage" },
      { id: "c", text: "A managed runtime for Lambda functions" },
      { id: "d", text: "Petabyte-scale analytics warehousing" },
    ],
    correct: ["a"],
    explanation:
      "Directory Service runs managed AD (plus Connector and Simple AD variants) for Windows-centric workloads. The wrong choices map to storage, compute, and Redshift-like services.",
    difficulty: "medium",
    services: ["directory-service"],
  },
  {
    id: "saa-d1-091",
    section: "d1-secure",
    subtopic: "identity-governance",
    type: "single",
    prompt:
      "How would you describe AWS Control Tower?",
    options: [
      { id: "a", text: "Automated setup of a multi-account landing zone with guardrails, built on AWS Organizations best practices" },
      { id: "b", text: "An Application Load Balancer feature set" },
      { id: "c", text: "A key-value NoSQL table service" },
      { id: "d", text: "A replacement for Amazon CloudFront" },
    ],
    correct: ["a"],
    explanation:
      "Control Tower orchestrates account vending (Account Factory), preventive/detective controls, and org integration. It is governance software, not networking, DynamoDB, or CDN.",
    difficulty: "medium",
    services: ["control-tower"],
  },
  {
    id: "saa-d1-092",
    section: "d1-secure",
    subtopic: "identity-governance",
    type: "single",
    prompt:
      "Employees already authenticate with corporate SAML or OIDC. How should they access AWS without a separate IAM user per employee?",
    options: [
      { id: "a", text: "Configure federation—IAM Identity Center or IAM roles trusting your IdP—to map IdP identities to AWS access" },
      { id: "b", text: "Manually create and rotate IAM users for every employee" },
      { id: "c", text: "Distribute the AWS root user password" },
      { id: "d", text: "Make all workloads public to skip login" },
    ],
    correct: ["a"],
    explanation:
      "Federation issues temporary credentials tied to corporate identities. Per-user IAM accounts, shared root access, and public resources scale poorly and increase risk.",
    difficulty: "medium",
    services: ["iam","iam-identity-center"],
  },
  {
    id: "saa-d1-093",
    section: "d1-secure",
    subtopic: "identity-governance",
    type: "single",
    prompt:
      "Which statement best explains how Control Tower depends on AWS Organizations?",
    options: [
      { id: "a", text: "Organizations supplies accounts, OUs, and SCPs; Control Tower automates landing-zone setup and guardrails on that foundation" },
      { id: "b", text: "They operate independently with no shared components" },
      { id: "c", text: "Organizations is a submodule installed inside Control Tower databases" },
      { id: "d", text: "Both are primarily OLTP database engines" },
    ],
    correct: ["a"],
    explanation:
      "Organizations is the structural and policy layer; Control Tower is an opinionated governance layer atop it. The other statements invert or mischaracterize that dependency.",
    difficulty: "medium",
    services: ["control-tower","organizations"],
  },
  {
    id: "saa-d1-094",
    section: "d1-secure",
    subtopic: "kms",
    type: "single",
    prompt:
      "What is the practical distinction between encryption at rest and encryption in transit?",
    options: [
      { id: "a", text: "At rest protects data persisted on media (EBS, S3 objects); in transit protects bytes moving over networks (typically TLS)" },
      { id: "b", text: "The terms are synonyms with no separate meaning" },
      { id: "c", text: "At rest applies exclusively to RDS; in transit applies exclusively to S3" },
      { id: "d", text: "In transit means plaintext is intentionally used on the wire" },
    ],
    correct: ["a"],
    explanation:
      "Strong architectures combine stored-data encryption with TLS for client and service communication. The wrong answers confuse scope or imply transit is unencrypted.",
    difficulty: "easy",
    services: ["kms"],
  },
  {
    id: "saa-d1-095",
    section: "d1-secure",
    subtopic: "kms",
    type: "single",
    prompt:
      "Which description matches AWS Key Management Service (KMS)?",
    options: [
      { id: "a", text: "Central creation and control of encryption keys with tight integration to AWS services and CloudTrail auditing of key use" },
      { id: "b", text: "A managed PostgreSQL-compatible database" },
      { id: "c", text: "An edge network for low-latency downloads" },
      { id: "d", text: "Layer-7 request routing to EC2 targets" },
    ],
    correct: ["a"],
    explanation:
      "KMS manages CMKs and data keys consumed by services like S3, EBS, and RDS. It is not a database, CDN, or load balancer.",
    difficulty: "easy",
    services: ["kms"],
  },
  {
    id: "saa-d1-096",
    section: "d1-secure",
    subtopic: "kms",
    type: "single",
    prompt:
      "Why might you create a customer managed KMS key instead of relying on an AWS managed key?",
    options: [
      { id: "a", text: "You need granular key policies, optional rotation control, disable/enable lifecycle, and detailed usage tracking" },
      { id: "b", text: "Customer managed keys never incur monthly charges" },
      { id: "c", text: "They remove the requirement for any IAM policies" },
      { id: "d", text: "They guarantee faster cryptographic throughput than AWS managed keys" },
    ],
    correct: ["a"],
    explanation:
      "CMKs offer policy and lifecycle control important for compliance and cross-account scenarios. They are not free by default, do not bypass IAM, and are not primarily a performance upgrade.",
    difficulty: "medium",
    services: ["kms"],
  },
  {
    id: "saa-d1-097",
    section: "d1-secure",
    subtopic: "kms",
    type: "single",
    prompt:
      "When are AWS KMS multi-Region keys appropriate?",
    options: [
      { id: "a", text: "When the same key material must decrypt in multiple Regions—for example encrypted S3 cross-Region replication or multi-Region DR" },
      { id: "b", text: "When you want to publish the key to anonymous callers" },
      { id: "c", text: "When you need a centralized application log index" },
      { id: "d", text: "When you need to spread HTTP traffic across AZs" },
    ],
    correct: ["a"],
    explanation:
      "Multi-Region keys replicate identical key material so ciphertext created in one Region can be decrypted in a replica Region without re-encryption. They are not for public keys, logging, or load balancing.",
    difficulty: "hard",
    services: ["kms"],
  },
  {
    id: "saa-d1-098",
    section: "d1-secure",
    subtopic: "kms",
    type: "single",
    prompt:
      "Under what requirement would AWS CloudHSM be preferred over AWS KMS?",
    options: [
      { id: "a", text: "Regulations demand a dedicated single-tenant HSM with FIPS 140-2 Level 3 validation and full key custody in your VPC" },
      { id: "b", text: "You want the lowest operational overhead multi-tenant key service" },
      { id: "c", text: "You primarily need durable object storage" },
      { id: "d", text: "You primarily need a global CDN" },
    ],
    correct: ["a"],
    explanation:
      "CloudHSM gives exclusive HSM hardware for strict compliance workloads. KMS is shared, fully managed infrastructure suited to most encryption needs; S3 and CloudFront solve unrelated problems.",
    difficulty: "hard",
    services: ["cloudhsm","kms"],
  },
  {
    id: "saa-d1-099",
    section: "d1-secure",
    subtopic: "secrets-certs",
    type: "single",
    prompt:
      "What is AWS Systems Manager Parameter Store used for?",
    options: [
      { id: "a", text: "Hierarchical storage of configuration and secrets—plain String or KMS-backed SecureString—with optional versioning" },
      { id: "b", text: "Transactional SQL with ACID guarantees" },
      { id: "c", text: "Layer-4 traffic distribution to targets" },
      { id: "d", text: "OCI-compatible container image repositories" },
    ],
    correct: ["a"],
    explanation:
      "Parameter Store holds parameters and secrets at low cost, optionally encrypted with KMS. It does not provide relational transactions, ELB functionality, or ECR-style registries.",
    difficulty: "medium",
    services: ["ssm-parameter-store"],
  },
  {
    id: "saa-d1-100",
    section: "d1-secure",
    subtopic: "secrets-certs",
    type: "single",
    prompt:
      "In which scenario does AWS Secrets Manager make more sense than Parameter Store?",
    options: [
      { id: "a", text: "You require built-in automatic rotation—for example database credentials on a schedule—and managed secret lifecycle features" },
      { id: "b", text: "You want the lowest-cost static config with no rotation requirements" },
      { id: "c", text: "You need to host a static website from a bucket" },
      { id: "d", text: "You need petabyte-scale columnar analytics" },
    ],
    correct: ["a"],
    explanation:
      "Secrets Manager's differentiator is rotation integrations and secret management workflows. Parameter Store fits simple, inexpensive config; S3 websites and Redshift-like analytics are unrelated.",
    difficulty: "medium",
    services: ["secrets-manager","ssm-parameter-store"],
  },
  {
    id: "saa-d1-101",
    section: "d1-secure",
    subtopic: "secrets-certs",
    type: "single",
    prompt:
      "What role does AWS Certificate Manager (ACM) play?",
    options: [
      { id: "a", text: "Provision, attach, and auto-renew TLS certificates for integrated services like ALB, CloudFront, and API Gateway (public certs at no charge)" },
      { id: "b", text: "Rotate database passwords on a cron schedule" },
      { id: "c", text: "Generate and store symmetric KMS data keys only" },
      { id: "d", text: "Provide always-on DDoS mitigation by itself" },
    ],
    correct: ["a"],
    explanation:
      "ACM simplifies HTTPS certificate lifecycle for supported AWS endpoints. Secrets Manager handles secret rotation; KMS manages encryption keys; Shield addresses DDoS—not certificate issuance.",
    difficulty: "easy",
    services: ["acm"],
  },
  {
    id: "saa-d1-102",
    section: "d1-secure",
    subtopic: "network-protection",
    type: "single",
    prompt:
      "How do AWS Shield Standard and Shield Advanced compare?",
    options: [
      { id: "a", text: "Standard is included at no extra cost with automatic layer 3/4 DDoS protection; Advanced is a paid tier with stronger mitigations, 24/7 DRT support, and cost protection during attacks" },
      { id: "b", text: "They offer identical capabilities and pricing" },
      { id: "c", text: "Standard requires a subscription fee while Advanced is free" },
      { id: "d", text: "Shield protects only S3 bucket endpoints" },
    ],
    correct: ["a"],
    explanation:
      "Every AWS customer gets Shield Standard on CloudFront, Route 53, and Elastic IP/ELB resources. Advanced adds enhanced detection, the response team, and billing safeguards—not S3-only scope or reversed pricing.",
    difficulty: "medium",
    services: ["shield"],
  },
  {
    id: "saa-d1-103",
    section: "d1-secure",
    subtopic: "network-protection",
    type: "single",
    prompt:
      "Which AWS service lets security teams roll out and enforce firewall-related policies organization-wide?",
    options: [
      { id: "a", text: "AWS Firewall Manager, which centrally administers WAF ACLs, Shield Advanced settings, security groups, and Network Firewall policies across member accounts" },
      { id: "b", text: "Server-side encryption for objects stored in S3" },
      { id: "c", text: "Authoritative DNS lookup for domain names" },
      { id: "d", text: "Orchestration of Docker containers on ECS or EKS" },
    ],
    correct: ["a"],
    explanation:
      "Firewall Manager is built for multi-account governance: you define policies once and they propagate WAF, Shield Advanced, security group, and Network Firewall rules consistently across an AWS Organization.",
    difficulty: "medium",
    services: ["firewall-manager"],
  },
  {
    id: "saa-d1-104",
    section: "d1-secure",
    subtopic: "network-protection",
    type: "single",
    prompt:
      "A company runs a customer-facing web app on the public internet. Which architecture best improves resilience against large-scale DDoS events?",
    options: [
      { id: "a", text: "Front the origin with CloudFront, Global Accelerator, or Route 53; add AWS WAF and Shield; use Auto Scaling so compute can grow under attack" },
      { id: "b", text: "Expose one EC2 instance directly with a public Elastic IP and no caching layer" },
      { id: "c", text: "Turn off load balancer and target group health checks to reduce noise" },
      { id: "d", text: "Configure security groups to allow all inbound traffic from 0.0.0.0/0 on every port" },
    ],
    correct: ["a"],
    explanation:
      "Effective DDoS defense absorbs and filters traffic at scalable edge layers (CDN, DNS, accelerator), applies WAF rules and Shield protection, and scales backends so the origin is not a single bottleneck.",
    difficulty: "medium",
    services: ["shield","waf","cloudfront"],
  },
  {
    id: "saa-d1-105",
    section: "d1-secure",
    subtopic: "network-protection",
    type: "single",
    prompt:
      "How should you distinguish AWS WAF from AWS Shield in terms of what each protects?",
    options: [
      { id: "a", text: "WAF inspects and filters Layer 7 HTTP/HTTPS requests (e.g., SQL injection, XSS, rate limits); Shield focuses on network-layer DDoS (Layers 3/4, with broader coverage on Advanced)" },
      { id: "b", text: "They are two names for one identical product" },
      { id: "c", text: "WAF is the primary DDoS scrubbing service; Shield is for blocking SQL injection in web apps" },
      { id: "d", text: "Both services exist only to create and rotate IAM access keys" },
    ],
    correct: ["a"],
    explanation:
      "WAF sits in front of web applications and applies request-level rules at Layer 7. Shield automatically mitigates volumetric and protocol attacks at lower layers; Shield Advanced adds enhanced DDoS response and cost protection.",
    difficulty: "medium",
    services: ["waf","shield"],
  },
  {
    id: "saa-d1-106",
    section: "d1-secure",
    subtopic: "threat-detection",
    type: "single",
    prompt:
      "What is the primary function of Amazon Inspector?",
    options: [
      { id: "a", text: "Continuous, automated scanning of EC2, container images in ECR, and Lambda for known vulnerabilities and risky network exposure" },
      { id: "b", text: "Classification and discovery of regulated or sensitive data stored in S3 buckets" },
      { id: "c", text: "Immutable logging of management API activity across your account" },
      { id: "d", text: "Low-latency delivery of static assets from edge locations worldwide" },
    ],
    correct: ["a"],
    explanation:
      "Inspector is a vulnerability management service: it assesses software CVEs and exposure on EC2 hosts, ECR images, and Lambda functions—not data classification (Macie) or API auditing (CloudTrail).",
    difficulty: "medium",
    services: ["inspector"],
  },
  {
    id: "saa-d1-107",
    section: "d1-secure",
    subtopic: "threat-detection",
    type: "single",
    prompt:
      "Pair each AWS security service with its main responsibility: analyzing logs for threats, finding sensitive S3 content, and scanning compute for flaws.",
    options: [
      { id: "a", text: "Amazon GuardDuty for threat detection from logs; Amazon Macie for sensitive-data discovery in S3; Amazon Inspector for workload vulnerability assessment" },
      { id: "b", text: "All three services perform identical overlapping scans" },
      { id: "c", text: "Inspector locates PII in buckets; Macie lists CVEs on EC2; GuardDuty serves HTTP traffic" },
      { id: "d", text: "GuardDuty classifies S3 objects; Macie mitigates DDoS attacks" },
    ],
    correct: ["a"],
    explanation:
      "GuardDuty uses ML on CloudTrail, VPC Flow Logs, and DNS logs to flag suspicious activity. Macie discovers PII and sensitive data in S3. Inspector reports CVEs and network exposure on workloads—three distinct roles often tested together.",
    difficulty: "medium",
    services: ["guardduty","macie","inspector"],
  },
  {
    id: "saa-d1-108",
    section: "d1-secure",
    subtopic: "threat-detection",
    type: "single",
    prompt:
      "You need one dashboard that collects, deduplicates, and ranks findings from GuardDuty, Inspector, Macie, and other security tools. Which service fits?",
    options: [
      { id: "a", text: "Security Hub consolidating multi-service security findings" },
      { id: "b", text: "CloudWatch collecting metrics and logs for operations" },
      { id: "c", text: "Config evaluating resource configurations against rules" },
      { id: "d", text: "Athena querying files in S3 with SQL" },
    ],
    correct: ["a"],
    explanation:
      "Security Hub ingests findings from integrated AWS and partner products, applies severity scoring, and supports compliance standards—unlike CloudWatch (metrics/logs), Config (resource configuration history), or Athena (SQL on S3 data).",
    difficulty: "medium",
    services: ["security-hub"],
  },
  {
    id: "saa-d1-109",
    section: "d1-secure",
    subtopic: "vpc-fundamentals",
    type: "single",
    prompt:
      "In networking, what does a CIDR block such as 10.0.0.0/16 represent?",
    options: [
      { id: "a", text: "A contiguous block of IP addresses; the number after the slash is how many leading bits are fixed for the network (a smaller suffix means a larger pool)" },
      { id: "b", text: "Exactly one host address with no subnetting" },
      { id: "c", text: "A fully qualified domain name for routing" },
      { id: "d", text: "The bit length of a symmetric encryption algorithm" },
    ],
    correct: ["a"],
    explanation:
      "CIDR notation defines network prefix length. For example, /16 yields about 65,536 addresses in the block; /24 yields 256. Lower prefix numbers allocate bigger address spaces.",
    difficulty: "easy",
    services: ["vpc"],
  },
  {
    id: "saa-d1-110",
    section: "d1-secure",
    subtopic: "vpc-fundamentals",
    type: "single",
    prompt:
      "When designing a VPC, which address blocks are valid private (RFC 1918) ranges?",
    options: [
      { id: "a", text: "RFC 1918 private ranges: 10/8, 172.16/12, and 192.168/16" },
      { id: "b", text: "Only 8.8.8.0/24" },
      { id: "c", text: "Any routable public IPv4 the ISP assigns" },
      { id: "d", text: "Exclusively global unicast IPv6 prefixes" },
    ],
    correct: ["a"],
    explanation:
      "RFC 1918 defines three private IPv4 spaces—10/8, 172.16/12, and 192.168/16—that are not routed on the public internet and are standard choices for VPC CIDR planning.",
    difficulty: "easy",
    services: ["vpc"],
  },
  {
    id: "saa-d1-111",
    section: "d1-secure",
    subtopic: "vpc-fundamentals",
    type: "single",
    prompt:
      "Which description best fits Amazon VPC?",
    options: [
      { id: "a", text: "A dedicated virtual network within an AWS Region where you deploy resources; it can include subnets in multiple Availability Zones" },
      { id: "b", text: "A single virtual machine with one elastic network interface" },
      { id: "c", text: "A worldwide anycast DNS resolver" },
      { id: "d", text: "A fully managed SQL or NoSQL datastore" },
    ],
    correct: ["a"],
    explanation:
      "A VPC is your isolated Layer 3 network in one Region. You subdivide it into subnets (each tied to one AZ) and attach gateways, endpoints, and routing to control connectivity.",
    difficulty: "easy",
    services: ["vpc"],
  },
  {
    id: "saa-d1-112",
    section: "d1-secure",
    subtopic: "vpc-fundamentals",
    type: "single",
    prompt:
      "How is a VPC subnet scoped, and what routing pattern typically marks it as public?",
    options: [
      { id: "a", text: "Each subnet belongs to exactly one Availability Zone; it is public when the associated route table sends default internet traffic (0.0.0.0/0) to an internet gateway" },
      { id: "b", text: "A subnet spans every AZ in the Region; it is public whenever a NAT gateway exists anywhere in the VPC" },
      { id: "c", text: "A subnet equals an entire Region; publicity depends on whether EBS encryption is off" },
      { id: "d", text: "A subnet is synonymous with an EC2 instance; multiple private IPs make it public" },
    ],
    correct: ["a"],
    explanation:
      "Subnets are AZ-specific IP ranges. Public subnets have a route to an IGW for internet-bound traffic; private subnets lack that default route (they may use NAT for outbound-only access).",
    difficulty: "medium",
    services: ["vpc"],
  },
  {
    id: "saa-d1-113",
    section: "d1-secure",
    subtopic: "vpc-fundamentals",
    type: "single",
    prompt:
      "What does AWS provision automatically as the default VPC in each Region?",
    options: [
      { id: "a", text: "A preconfigured VPC with a public subnet per AZ, an attached internet gateway, and automatic public IP assignment so new instances can reach the internet out of the box" },
      { id: "b", text: "An empty VPC shell with no subnets, routes, or gateways" },
      { id: "c", text: "A VPC that blocks all inbound and outbound internet connectivity by design" },
      { id: "d", text: "A managed Amazon EKS control plane and worker nodes" },
    ],
    correct: ["a"],
    explanation:
      "The default VPC is a convenience template: public subnets in each AZ, IGW attached, and auto-assign public IPv4 enabled—so quick launches get internet access without manual network setup.",
    difficulty: "easy",
    services: ["vpc"],
  },
  {
    id: "saa-d1-114",
    section: "d1-secure",
    subtopic: "routing-gateways",
    type: "single",
    prompt:
      "Why attach an internet gateway to a VPC?",
    options: [
      { id: "a", text: "It is a redundant, horizontally scaled edge that enables bidirectional internet connectivity for the VPC when subnets route to it (one IGW per VPC)" },
      { id: "b", text: "It transparently encrypts all EBS and S3 data at rest" },
      { id: "c", text: "It distributes HTTP requests across a fleet of EC2 instances" },
      { id: "d", text: "It resolves hostnames inside the VPC to IP addresses" },
    ],
    correct: ["a"],
    explanation:
      "The IGW is the VPC's internet attachment point. Subnets become internet-reachable when their route tables target the IGW for 0.0.0.0/0 (IPv4) or ::/0 (IPv6). Only one IGW may attach to a given VPC.",
    difficulty: "easy",
    services: ["vpc","internet-gateway"],
  },
  {
    id: "saa-d1-115",
    section: "d1-secure",
    subtopic: "routing-gateways",
    type: "single",
    prompt:
      "What decision does a VPC route table make for traffic leaving a subnet?",
    options: [
      { id: "a", text: "It maps destination CIDR blocks to next hops—local VPC traffic, internet gateway, NAT gateway, peering link, transit gateway, or VPC endpoints" },
      { id: "b", text: "It authenticates human users signing into the AWS Management Console" },
      { id: "c", text: "It selects the KMS key used to encrypt EBS volumes" },
      { id: "d", text: "It picks the EC2 instance family and size at launch time" },
    ],
    correct: ["a"],
    explanation:
      "Route tables are the traffic steering layer: each association with a subnet determines where packets go based on longest-prefix match to targets like IGW, NAT, peering, or endpoints.",
    difficulty: "medium",
    services: ["vpc"],
  },
  {
    id: "saa-d1-116",
    section: "d1-secure",
    subtopic: "routing-gateways",
    type: "single",
    prompt:
      "Compared with running your own NAT instance on EC2, why might you choose a managed NAT gateway?",
    options: [
      { id: "a", text: "AWS operates it end to end—built-in bandwidth scaling within the AZ, no OS patching, and high availability as a managed service" },
      { id: "b", text: "It exposes private instances to unsolicited inbound connections from the internet" },
      { id: "c", text: "There is never an hourly or data processing charge" },
      { id: "d", text: "It removes the requirement for any internet gateway in the VPC" },
    ],
    correct: ["a"],
    explanation:
      "NAT gateways offload operations: no AMI maintenance, automatic scaling, and AWS-managed resilience in an AZ. Neither NAT gateways nor NAT instances accept inbound initiations from the internet; outbound still relies on an IGW in a public subnet.",
    difficulty: "medium",
    services: ["nat-gateway"],
  },
  {
    id: "saa-d1-117",
    section: "d1-secure",
    subtopic: "routing-gateways",
    type: "single",
    prompt:
      "In a layered VPC design, what is a bastion host used for?",
    options: [
      { id: "a", text: "A locked-down jump box in a public subnet that admins use to reach instances in private subnets over SSH or RDP" },
      { id: "b", text: "A connection pooler sitting between apps and Amazon RDS" },
      { id: "c", text: "An edge PoP that caches static website content" },
      { id: "d", text: "An archival storage class for infrequently accessed objects" },
    ],
    correct: ["a"],
    explanation:
      "Instead of giving every private instance a public IP, you harden one bastion in a public subnet, restrict its security group, and use it as the controlled administrative entry point.",
    difficulty: "medium",
    services: ["ec2","vpc"],
  },
  {
    id: "saa-d1-118",
    section: "d1-secure",
    subtopic: "routing-gateways",
    type: "single",
    prompt:
      "When would you deploy an egress-only internet gateway in a VPC?",
    options: [
      { id: "a", text: "To let IPv6-enabled instances initiate outbound connections to the internet while preventing inbound initiation—similar in spirit to NAT for IPv6" },
      { id: "b", text: "To grant inbound IPv4 traffic from the internet to private hosts" },
      { id: "c", text: "To apply TLS encryption to all egress packets automatically" },
      { id: "d", text: "To establish a private mesh between two unrelated VPC CIDR blocks" },
    ],
    correct: ["a"],
    explanation:
      "IPv6 addresses in a VPC are globally routable. An egress-only IGW allows outbound IPv6 while blocking unsolicited inbound, giving private-subnet-style behavior without NAT64/NAT66 for that pattern.",
    difficulty: "hard",
    services: ["vpc"],
  },
  {
    id: "saa-d1-119",
    section: "d1-secure",
    subtopic: "nacl-sg",
    type: "single",
    prompt:
      "Where in the VPC hierarchy do network ACLs versus security groups apply their rules?",
    options: [
      { id: "a", text: "NACLs filter at the subnet boundary; security groups filter traffic to and from elastic network interfaces on instances" },
      { id: "b", text: "Both firewalls attach only to individual EC2 instances, never subnets" },
      { id: "c", text: "Both firewalls are configured exclusively at the subnet level" },
      { id: "d", text: "NACLs bind to ENIs; security groups bind to entire subnets" },
    ],
    correct: ["a"],
    explanation:
      "Think defense in depth: optional stateless NACLs on each subnet, plus stateful security groups on ENIs. The exam often tests knowing which layer you are changing.",
    difficulty: "easy",
    services: ["nacl","security-groups"],
  },
  {
    id: "saa-d1-120",
    section: "d1-secure",
    subtopic: "nacl-sg",
    type: "single",
    prompt:
      "Which statement correctly contrasts rule behavior in NACLs and security groups?",
    options: [
      { id: "a", text: "NACLs may allow or deny and process rules in numeric order; security groups only allow traffic and evaluate all matching rules together" },
      { id: "b", text: "NACLs support allows only; security groups support explicit deny statements" },
      { id: "c", text: "Both layers support deny-only policies" },
      { id: "d", text: "Neither layer supports configurable traffic rules" },
    ],
    correct: ["a"],
    explanation:
      "NACL evaluation is ordered and can block specific flows with deny entries. Security groups are stateful allow-lists—there is no deny rule type, so blocked traffic is simply anything not permitted.",
    difficulty: "medium",
    services: ["nacl","security-groups"],
  },
  {
    id: "saa-d1-121",
    section: "d1-secure",
    subtopic: "nacl-sg",
    type: "single",
    prompt:
      "After allowing inbound HTTP on a subnet NACL, return traffic still fails. Why might you need outbound rules for ephemeral ports?",
    options: [
      { id: "a", text: "NACLs do not track connection state, so replies to permitted inbound sessions must be explicitly allowed on the client ephemeral port range" },
      { id: "b", text: "NACLs automatically mirror security group statefulness for return packets" },
      { id: "c", text: "Ephemeral ports are mandated by KMS for key rotation traffic" },
      { id: "d", text: "Security groups always drop reply packets unless NACLs are disabled" },
    ],
    correct: ["a"],
    explanation:
      "Because NACLs are stateless, a rule permitting TCP 443 inbound does not implicitly permit the response to the caller's high port (often 1024–65535). Outbound NACL entries must cover those ephemeral ports.",
    difficulty: "hard",
    services: ["nacl"],
  },
  {
    id: "saa-d1-122",
    section: "d1-secure",
    subtopic: "nacl-sg",
    type: "single",
    prompt:
      "Security operations wants to drop all traffic from one known bad IPv4 address before it hits any instance in a subnet. What is the appropriate control?",
    options: [
      { id: "a", text: "Add a deny rule for that source IP on the subnet's network ACL" },
      { id: "b", text: "Add a deny rule on the instance security group" },
      { id: "c", text: "Attach an IAM policy denying the IP at the identity layer" },
      { id: "d", text: "Create a Route 53 A record pointing the IP to null" },
    ],
    correct: ["a"],
    explanation:
      "Security groups cannot deny—only allow. NACLs support numbered deny rules at subnet scope, which is the classic way to block a specific IP for everything in that subnet.",
    difficulty: "medium",
    services: ["nacl"],
  },
  {
    id: "saa-d1-123",
    section: "d1-secure",
    subtopic: "vpc-connectivity",
    type: "single",
    prompt:
      "Which facts about VPC peering connections are accurate?",
    options: [
      { id: "a", text: "Two VPCs communicate privately over the AWS network; their CIDR blocks must not overlap; peering does not transit through a third VPC automatically" },
      { id: "b", text: "Peering is transitive—if VPC A peers with B and B peers with C, A can reach C without extra setup" },
      { id: "c", text: "Peering requires intentionally overlapping IP ranges in both VPCs" },
      { id: "d", text: "All peering traffic is hairpinned over the public internet by default" },
    ],
    correct: ["a"],
    explanation:
      "Peering is a one-to-one private link (same or different account/Region). Non-overlapping CIDRs are required, routes must be added on both sides, and there is no transitive peering—you need separate connections or a transit hub.",
    difficulty: "medium",
    services: ["vpc-peering"],
  },
  {
    id: "saa-d1-124",
    section: "d1-secure",
    subtopic: "vpc-connectivity",
    type: "single",
    prompt:
      "How do Gateway VPC endpoints differ from Interface VPC endpoints?",
    options: [
      { id: "a", text: "Gateway endpoints (S3 and DynamoDB only) are targets in route tables; Interface endpoints use PrivateLink ENIs with private IPs in your subnets for most other services" },
      { id: "b", text: "They are interchangeable implementations with identical pricing and setup" },
      { id: "c", text: "Gateway types create ENIs; Interface types only update route tables" },
      { id: "d", text: "Interface endpoints are limited to Amazon S3 and cannot reach other services" },
    ],
    correct: ["a"],
    explanation:
      "Gateway endpoints are route-table entries to S3/DynamoDB prefixes (no hourly ENI charge). Interface endpoints place an ENI in your subnet and support many AWS and partner services via PrivateLink, with hourly and data processing fees.",
    difficulty: "hard",
    services: ["vpc-endpoints"],
  },
  {
    id: "saa-d1-125",
    section: "d1-secure",
    subtopic: "vpc-connectivity",
    type: "single",
    prompt:
      "What problem does AWS PrivateLink solve for service consumers?",
    options: [
      { id: "a", text: "Consumers reach a service through interface endpoints inside their VPC without peering, public IPs, or traversing the open internet" },
      { id: "b", text: "It globally caches JavaScript and images for static websites" },
      { id: "c", text: "It hosts a multi-AZ relational database with automatic failover" },
      { id: "d", text: "It automatically peers thousands of VPCs in a transitive full mesh" },
    ],
    correct: ["a"],
    explanation:
      "PrivateLink exposes a service via ENIs in consumer VPCs, keeping traffic on the AWS backbone. Many consumers can connect without managing a web of peering relationships or exposing the provider publicly.",
    difficulty: "hard",
    services: ["privatelink","vpc-endpoints"],
  },
  {
    id: "saa-d1-126",
    section: "d1-secure",
    subtopic: "hybrid-networking",
    type: "single",
    prompt:
      "For AWS Site-to-Site VPN, which two gateway roles sit on opposite sides of the encrypted tunnel?",
    options: [
      { id: "a", text: "A Virtual Private Gateway attached to the VPC on AWS, and a Customer Gateway representing your on-premises VPN device, linked by IPsec" },
      { id: "b", text: "An internet gateway paired with a NAT gateway in the same subnet" },
      { id: "c", text: "Only a Direct Connect gateway and a transit gateway with no customer-side device" },
      { id: "d", text: "Two separate internet gateways in one VPC" },
    ],
    correct: ["a"],
    explanation:
      "Site-to-Site VPN terminates on a VGW (or transit gateway) in AWS and a CGW object describing your router/firewall on premises, with IPsec tunnels typically riding over the public internet.",
    difficulty: "medium",
    services: ["vpn","vgw","cgw"],
  },
  {
    id: "saa-d1-127",
    section: "d1-secure",
    subtopic: "hybrid-networking",
    type: "single",
    prompt:
      "Your hybrid link relies on a single Direct Connect circuit. Which addition improves continuity if that circuit fails?",
    options: [
      { id: "a", text: "Stand up a Site-to-Site VPN as a secondary path so traffic can fail over when Direct Connect is unavailable" },
      { id: "b", text: "Delete VPC route tables so routers stop forwarding" },
      { id: "c", text: "Keep exactly one DX connection and accept total outage risk" },
      { id: "d", text: "Move every workload into a public subnet with public IPs" },
    ],
    correct: ["a"],
    explanation:
      "A lone DX link is a single point of failure. Pairing it with VPN backup (or a second DX) gives a fallback path—VPN is a common cost-conscious choice when DX drops.",
    difficulty: "medium",
    services: ["direct-connect","vpn"],
  },
  {
    id: "saa-d1-128",
    section: "d1-secure",
    subtopic: "hybrid-networking",
    type: "single",
    prompt:
      "Why attach a Direct Connect gateway to your connectivity design?",
    options: [
      { id: "a", text: "One Direct Connect link can reach multiple VPCs in different AWS Regions (outside China) through a single DX gateway attachment model" },
      { id: "b", text: "It enables default encryption of every object uploaded to S3" },
      { id: "c", text: "It replaces on-premises DNS with Route 53 resolver endpoints only" },
      { id: "d", text: "It substitutes for VPC security groups on EC2 instances" },
    ],
    correct: ["a"],
    explanation:
      "Direct Connect Gateway aggregates connectivity so one physical DX port can fan out to VPCs across Regions/accounts instead of provisioning separate DX for each VPC.",
    difficulty: "hard",
    services: ["direct-connect"],
  },
  {
    id: "saa-d1-129",
    section: "d1-secure",
    subtopic: "vpc-monitoring",
    type: "single",
    prompt:
      "Which information do VPC Flow Logs record about network traffic?",
    options: [
      { id: "a", text: "Connection metadata—addresses, ports, protocol, bytes, and whether the flow was logged as accepted or rejected—published to CloudWatch Logs, S3, or Kinesis" },
      { id: "b", text: "Complete packet captures including application-layer payloads for every flow" },
      { id: "c", text: "Every AWS API request and response in the account" },
      { id: "d", text: "Stdout and stderr from applications running on EC2" },
    ],
    correct: ["a"],
    explanation:
      "Flow Logs are metadata-only (no payload). Enable them on a VPC, subnet, or ENI to troubleshoot connectivity and correlate with NACL/SG decisions. API activity belongs in CloudTrail, not Flow Logs.",
    difficulty: "medium",
    services: ["vpc-flow-logs"],
  },
  {
    id: "saa-d1-130",
    section: "d1-secure",
    subtopic: "vpc-monitoring",
    type: "single",
    prompt:
      "Packets never reach an EC2 instance and you suspect a subnet or security group block. Which observability source exposes ACCEPT versus REJECT outcomes?",
    options: [
      { id: "a", text: "VPC Flow Logs, where the action field indicates if traffic was permitted or dropped by the evaluation path" },
      { id: "b", text: "Macie for sensitive data discovery" },
      { id: "c", text: "Budgets for spend alerts" },
      { id: "d", text: "Polly for speech synthesis" },
    ],
    correct: ["a"],
    explanation:
      "Flow Log records include an action of ACCEPT or REJECT, helping you determine whether traffic failed at NACL or security group evaluation—Macie, Budgets, and Polly serve unrelated purposes.",
    difficulty: "medium",
    services: ["vpc-flow-logs"],
  },
  {
    id: "saa-d1-131",
    section: "d1-secure",
    subtopic: "vpc-monitoring",
    type: "single",
    prompt:
      "What capability does VPC Traffic Mirroring provide that Flow Logs do not?",
    options: [
      { id: "a", text: "It duplicates live packet streams from a source ENI to an analysis target for full-packet inspection by IDS/IPS or forensic tools" },
      { id: "b", text: "It writes the same five-tuple summaries Flow Logs already capture" },
      { id: "c", text: "It encrypts all inter-subnet traffic by default" },
      { id: "d", text: "It performs layer-4 load balancing between Auto Scaling members" },
    ],
    correct: ["a"],
    explanation:
      "Traffic Mirroring forwards actual packet copies (content included) to monitoring appliances—deeper visibility than Flow Logs' metadata-only records, at higher cost and operational complexity.",
    difficulty: "hard",
    services: ["vpc"],
  },
  {
    id: "saa-d1-132",
    section: "d1-secure",
    subtopic: "vpc-monitoring",
    type: "single",
    prompt:
      "Which statement describes AWS Network Firewall?",
    options: [
      { id: "a", text: "A managed, stateful VPC-level firewall and intrusion prevention system with customizable rule groups for traffic inspection" },
      { id: "b", text: "A web-only Layer 7 ACL service identical to AWS WAF" },
      { id: "c", text: "The automatic DDoS mitigation tier bundled with all accounts" },
      { id: "d", text: "A centralized service for creating and rotating KMS keys" },
    ],
    correct: ["a"],
    explanation:
      "Network Firewall inspects VPC traffic with stateful rules and IPS signatures. AWS WAF protects HTTP/S at the edge/ALB; AWS Shield addresses DDoS; KMS handles encryption keys—each at a different layer.",
    difficulty: "medium",
    services: ["network-firewall"],
  },
  {
    id: "saa-d1-133",
    section: "d1-secure",
    subtopic: "arch-patterns",
    type: "single",
    prompt:
      "A web tier sits behind CloudFront and an Application Load Balancer. You must refuse requests from one abusive source IP at the application edge. What should you use?",
    options: [
      { id: "a", text: "AWS WAF with an IP match condition or IP set on the CloudFront distribution and/or ALB web ACL" },
      { id: "b", text: "A security group rule that denies that IP on the EC2 instances" },
      { id: "c", text: "An IAM policy attached to the application IAM role" },
      { id: "d", text: "A public DNS A record in Route 53" },
    ],
    correct: ["a"],
    explanation:
      "For CloudFront/ALB architectures, WAF at Layer 7 is the right place to block client IPs via IP sets. NACLs can block at the subnet, but security groups cannot deny; IAM and Route 53 do not filter HTTP requests.",
    difficulty: "medium",
    services: ["waf","cloudfront"],
  },
  {
    id: "saa-d1-134",
    section: "d1-secure",
    subtopic: "iac-deployment",
    type: "single",
    prompt:
      "In AWS CloudFormation, what is the purpose of assigning a service role to a stack operation?",
    options: [
      { id: "a", text: "CloudFormation assumes that IAM role to provision, update, or delete stack resources using permissions separate from the human or pipeline user who triggered the change" },
      { id: "b", text: "It grants console login rights to developers" },
      { id: "c", text: "It defines a subnet and route table inside the VPC template" },
      { id: "d", text: "It sends email alerts when monthly spend exceeds a threshold" },
    ],
    correct: ["a"],
    explanation:
      "The service role lets CloudFormation act with least-privilege credentials scoped to stack operations, rather than inheriting the full power of whoever clicked Create Stack—important for delegated self-service.",
    difficulty: "medium",
    services: ["cloudformation","iam"],
  },
  {
    id: "saa-d1-135",
    section: "d1-secure",
    subtopic: "operations-mgmt",
    type: "single",
    prompt:
      "Engineers need interactive access to Linux instances in private subnets without opening SSH from the internet, distributing key pairs, or maintaining a bastion—with auditable session history. Which AWS service meets this?",
    options: [
      { id: "a", text: "Systems Manager Session Manager for browser or CLI shell access without SSH keys" },
      { id: "b", text: "Assigning a public Elastic IP to each private instance" },
      { id: "c", text: "Adding a second internet gateway to the VPC" },
      { id: "d", text: "Amazon Cognito user pools" },
    ],
    correct: ["a"],
    explanation:
      "Session Manager uses the SSM agent and IAM for shell access over AWS APIs—no inbound port 22, no long-lived SSH keys, no bastion host—and can log sessions to CloudWatch Logs or S3 for compliance review.",
    difficulty: "medium",
    services: ["ssm","ssm-session-manager"],
  },
  {
    id: "saa-d1-136",
    section: "d1-secure",
    subtopic: "operations-mgmt",
    type: "single",
    prompt:
      "Operations must run ad hoc scripts and schedule OS patching across hundreds of SSM-managed EC2 instances. Which Systems Manager features apply?",
    options: [
      { id: "a", text: "Run Command for remote execution and Patch Manager for baseline-driven patching" },
      { id: "b", text: "Amazon Route 53 health checks and routing policies" },
      { id: "c", text: "AWS Shield Advanced response team engagement" },
      { id: "d", text: "Amazon Macie automated sensitive data discovery jobs" },
    ],
    correct: ["a"],
    explanation:
      "Run Command executes PowerShell/shell commands and documents at fleet scale without SSH. Patch Manager automates scan-and-install workflows for operating system and application updates on managed nodes.",
    difficulty: "medium",
    services: ["ssm"],
  },
];
