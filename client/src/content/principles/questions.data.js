// Independently authored software-principles practice (multiple choice).
// Mix of name↔meaning and scenario→principle items.

export const principleQuestions = [
  // ── Easy ──────────────────────────────────────────────────────────────
  {
    id: "pr-e-01",
    difficulty: "easy",
    type: "single",
    prompt: "What does DRY stand for, and what does it ask you to avoid?",
    snippet: "DRY",
    options: [
      { id: "a", text: "Don't Repeat Yourself — avoid duplicating the same knowledge/logic in multiple places" },
      { id: "b", text: "Do Refactor Yearly — schedule annual cleanups only" },
      { id: "c", text: "Deploy Rapidly Yesterday — ship unfinished features fast" },
      { id: "d", text: "Don't Review Yourself — never self-review code" },
    ],
    correct: ["a"],
    explanation:
      "DRY means every piece of knowledge should have a single, authoritative representation. Copy-pasted business rules are the classic smell.",
  },
  {
    id: "pr-e-02",
    difficulty: "easy",
    type: "single",
    prompt: "What does KISS recommend?",
    snippet: "KISS",
    options: [
      { id: "a", text: "Keep It Simple, Stupid — prefer the simplest design that works" },
      { id: "b", text: "Keep Interfaces Strictly Separate — always split every file" },
      { id: "c", text: "Kill Incomplete State Soon — crash on any null" },
      { id: "d", text: "Know It Ships Saturday — prioritize deadlines over clarity" },
    ],
    correct: ["a"],
    explanation:
      "KISS pushes back on unnecessary cleverness and complexity. Simple, clear code is easier to change and debug.",
  },
  {
    id: "pr-e-03",
    difficulty: "easy",
    type: "single",
    prompt: "What does YAGNI warn against?",
    snippet: "YAGNI",
    options: [
      { id: "a", text: "You Aren't Gonna Need It — don't build speculative features “just in case”" },
      { id: "b", text: "You Always Get New Interfaces — rewrite APIs constantly" },
      { id: "c", text: "Yield All Globals Now Immediately — ban module scope" },
      { id: "d", text: "Your App Gets No Indexes — never optimize databases" },
    ],
    correct: ["a"],
    explanation:
      "YAGNI says wait until a real need appears. Speculative abstractions often cost more than they save.",
  },
  {
    id: "pr-e-04",
    difficulty: "easy",
    type: "single",
    prompt: "Which statement best describes Separation of Concerns?",
    snippet: "Separation of Concerns",
    options: [
      { id: "a", text: "Different responsibilities (UI, data, business rules) should live in distinct parts of the system" },
      { id: "b", text: "Every function must be under five lines" },
      { id: "c", text: "Never share utilities between modules" },
      { id: "d", text: "Only one developer may touch each file" },
    ],
    correct: ["a"],
    explanation:
      "SoC keeps unrelated reasons-to-change apart so you can understand and modify one concern without unraveling others.",
  },
  {
    id: "pr-e-05",
    difficulty: "easy",
    type: "single",
    prompt: "What is the Single Responsibility Principle (SRP)?",
    snippet: "SRP",
    options: [
      { id: "a", text: "A module/class should have one reason to change — one cohesive responsibility" },
      { id: "b", text: "A function may only call one other function" },
      { id: "c", text: "Each repo may have only one package.json" },
      { id: "d", text: "Only one person should own production deploys" },
    ],
    correct: ["a"],
    explanation:
      "SRP is about cohesion of change: if two unrelated stakeholders force edits to the same unit, it likely has too many responsibilities.",
  },
  {
    id: "pr-e-06",
    difficulty: "easy",
    type: "single",
    prompt: "What does the Open/Closed Principle say?",
    snippet: "Open/Closed Principle",
    options: [
      { id: "a", text: "Open for extension, closed for modification — add behavior without editing stable core code" },
      { id: "b", text: "Never open pull requests after Friday" },
      { id: "c", text: "All classes must be final/sealed" },
      { id: "d", text: "APIs must never version" },
    ],
    correct: ["a"],
    explanation:
      "OCP favors designs (often via polymorphism or plugins) where new behavior plugs in instead of rewriting battle-tested code.",
  },
  {
    id: "pr-e-07",
    difficulty: "easy",
    type: "single",
    prompt: "Fail Fast means you should…",
    snippet: "Fail Fast",
    options: [
      { id: "a", text: "Detect and surface invalid state early, close to the cause" },
      { id: "b", text: "Ship broken builds so QA finds them" },
      { id: "c", text: "Catch every exception and ignore it" },
      { id: "d", text: "Optimize for the happy path only" },
    ],
    correct: ["a"],
    explanation:
      "Failing fast (validate inputs, assert invariants) prevents corrupted state from spreading and makes root causes obvious.",
  },
  {
    id: "pr-e-08",
    difficulty: "easy",
    type: "single",
    prompt: "Principle of Least Privilege means…",
    snippet: "Least Privilege",
    options: [
      { id: "a", text: "Grant only the minimum access needed to do the job" },
      { id: "b", text: "Give every service admin credentials for convenience" },
      { id: "c", text: "Never use authentication" },
      { id: "d", text: "Privilege means the tallest class in a hierarchy" },
    ],
    correct: ["a"],
    explanation:
      "Least privilege limits blast radius: users, tokens, and processes should not have rights they do not need.",
  },
  {
    id: "pr-e-09",
    difficulty: "easy",
    type: "single",
    prompt: "Which name matches: “prefer assembling behavior from small parts over deep inheritance trees”?",
    snippet: "name the principle",
    options: [
      { id: "a", text: "Composition over Inheritance" },
      { id: "b", text: "Liskov Substitution Principle" },
      { id: "c", text: "Law of Demeter" },
      { id: "d", text: "Fail Fast" },
    ],
    correct: ["a"],
    explanation:
      "Composition over Inheritance favors has-a / delegation designs that stay flexible without brittle base-class coupling.",
  },
  {
    id: "pr-e-10",
    difficulty: "easy",
    type: "single",
    prompt: "High cohesion / low coupling asks you to…",
    snippet: "Cohesion & Coupling",
    options: [
      { id: "a", text: "Keep related logic together; minimize hard dependencies between modules" },
      { id: "b", text: "Put all code in one file to reduce imports" },
      { id: "c", text: "Couple every module to a global singleton" },
      { id: "d", text: "Maximize cross-file edits for every feature" },
    ],
    correct: ["a"],
    explanation:
      "Cohesive units do one job well. Low coupling means changes do not ripple everywhere.",
  },

  // ── Medium ────────────────────────────────────────────────────────────
  {
    id: "pr-m-01",
    difficulty: "medium",
    type: "single",
    prompt: "A UserService validates passwords, sends welcome email, and renders HTML invoices. Which principle is most clearly violated?",
    snippet: "scenario → principle",
    options: [
      { id: "a", text: "Single Responsibility Principle" },
      { id: "b", text: "Liskov Substitution Principle" },
      { id: "c", text: "Principle of Least Privilege" },
      { id: "d", text: "Fail Fast" },
    ],
    correct: ["a"],
    explanation:
      "Auth, email, and invoicing are separate reasons to change packed into one service — a classic SRP problem (also weak SoC).",
  },
  {
    id: "pr-m-02",
    difficulty: "medium",
    type: "single",
    prompt: "You add a huge “future analytics” pipeline nobody asked for. Which principle did you ignore?",
    snippet: "scenario → principle",
    options: [
      { id: "a", text: "YAGNI" },
      { id: "b", text: "Open/Closed Principle" },
      { id: "c", text: "Interface Segregation Principle" },
      { id: "d", text: "Law of Demeter" },
    ],
    correct: ["a"],
    explanation:
      "Building speculative infrastructure “we might need later” is exactly what YAGNI cautions against.",
  },
  {
    id: "pr-m-03",
    difficulty: "medium",
    type: "single",
    prompt: "PaymentProvider is an interface. CreditCard and CryptoWallet both implement it and can replace each other in checkout without breaking callers. Which principle is being honored?",
    snippet: "scenario → principle",
    options: [
      { id: "a", text: "Liskov Substitution Principle" },
      { id: "b", text: "Don't Repeat Yourself" },
      { id: "c", text: "Principle of Least Privilege" },
      { id: "d", text: "Boy Scout Rule" },
    ],
    correct: ["a"],
    explanation:
      "LSP: subtypes must be usable wherever the base type is expected without surprising failures or weakened contracts.",
  },
  {
    id: "pr-m-04",
    difficulty: "medium",
    type: "single",
    prompt: "A fat Worker interface forces every implementer to stub print(), fax(), and scan() even when they only print. Which principle is violated?",
    snippet: "scenario → principle",
    options: [
      { id: "a", text: "Interface Segregation Principle" },
      { id: "b", text: "Fail Fast" },
      { id: "c", text: "KISS" },
      { id: "d", text: "Composition over Inheritance" },
    ],
    correct: ["a"],
    explanation:
      "ISP says clients should not depend on methods they do not use — prefer smaller, focused interfaces.",
  },
  {
    id: "pr-m-05",
    difficulty: "medium",
    type: "single",
    prompt: "High-level OrderFlow imports concrete MySqlOrderRepo instead of an OrderRepository abstraction. Which principle is weakest here?",
    snippet: "scenario → principle",
    options: [
      { id: "a", text: "Dependency Inversion Principle" },
      { id: "b", text: "Don't Repeat Yourself" },
      { id: "c", text: "Fail Fast" },
      { id: "d", text: "Law of Demeter" },
    ],
    correct: ["a"],
    explanation:
      "DIP: high-level policy should depend on abstractions, not low-level details. The DB adapter should plug into an interface the flow owns/uses.",
  },
  {
    id: "pr-m-06",
    difficulty: "medium",
    type: "single",
    prompt: "order.getCustomer().getAddress().getZip() appears throughout the UI. Which principle is most associated with avoiding this style?",
    snippet: "scenario → principle",
    options: [
      { id: "a", text: "Law of Demeter (talk only to close collaborators)" },
      { id: "b", text: "Open/Closed Principle" },
      { id: "c", text: "YAGNI" },
      { id: "d", text: "Principle of Least Privilege" },
    ],
    correct: ["a"],
    explanation:
      "Law of Demeter / “don’t talk to strangers” discourages long getter chains that couple you to distant object graphs.",
  },
  {
    id: "pr-m-07",
    difficulty: "medium",
    type: "single",
    prompt: "How do Separation of Concerns and Single Responsibility relate?",
    snippet: "SoC vs SRP",
    options: [
      { id: "a", text: "SoC is the broader idea of splitting concerns; SRP applies that idea to a unit’s reasons to change" },
      { id: "b", text: "They are exact synonyms with identical scope" },
      { id: "c", text: "SoC is only for security; SRP is only for naming" },
      { id: "d", text: "SRP replaces SoC and makes it obsolete" },
    ],
    correct: ["a"],
    explanation:
      "SoC is architectural/organizational. SRP is a sharper OOP/module guideline about one cohesive responsibility per unit.",
  },
  {
    id: "pr-m-08",
    difficulty: "medium",
    type: "single",
    prompt: "A function silently coerces bad input to defaults and continues. Weeks later data is corrupt. Which principle was neglected?",
    snippet: "scenario → principle",
    options: [
      { id: "a", text: "Fail Fast" },
      { id: "b", text: "Open/Closed Principle" },
      { id: "c", text: "Interface Segregation Principle" },
      { id: "d", text: "Composition over Inheritance" },
    ],
    correct: ["a"],
    explanation:
      "Fail Fast would reject or loudly error on invalid input at the boundary instead of laundering bad data downstream.",
  },
  {
    id: "pr-m-09",
    difficulty: "medium",
    type: "single",
    prompt: "An API token for a read-only report job also allows deleting production tables. Which principle is violated?",
    snippet: "scenario → principle",
    options: [
      { id: "a", text: "Principle of Least Privilege" },
      { id: "b", text: "Don't Repeat Yourself" },
      { id: "c", text: "Liskov Substitution Principle" },
      { id: "d", text: "KISS" },
    ],
    correct: ["a"],
    explanation:
      "Least privilege requires scoping credentials to the minimum actions needed — read-only jobs should not get destructive rights.",
  },
  {
    id: "pr-m-10",
    difficulty: "medium",
    type: "single",
    prompt: "You copy the same discount formula into five controllers. Later finance changes the rule and three places are missed. Which principle was broken?",
    snippet: "scenario → principle",
    options: [
      { id: "a", text: "Don't Repeat Yourself (DRY)" },
      { id: "b", text: "Liskov Substitution Principle" },
      { id: "c", text: "Principle of Least Astonishment" },
      { id: "d", text: "Tell, Don't Ask" },
    ],
    correct: ["a"],
    explanation:
      "Duplicated business knowledge drifts. DRY would keep one authoritative implementation of the discount rule.",
  },

  // ── Hard ──────────────────────────────────────────────────────────────
  {
    id: "pr-h-01",
    difficulty: "hard",
    type: "single",
    prompt: "Square extends Rectangle. Setting width on a Square also changes height, surprising code written for Rectangle. Which principle is violated?",
    snippet: "classic hierarchy smell",
    options: [
      { id: "a", text: "Liskov Substitution Principle" },
      { id: "b", text: "YAGNI" },
      { id: "c", text: "Principle of Least Privilege" },
      { id: "d", text: "Boy Scout Rule" },
    ],
    correct: ["a"],
    explanation:
      "A Square is not a behavioral subtype of Rectangle if it breaks Rectangle’s contract (independent width/height). That is an LSP violation.",
  },
  {
    id: "pr-h-02",
    difficulty: "hard",
    type: "single",
    prompt: "Which design best reflects Dependency Inversion (not merely “using a DI container”)?",
    snippet: "DIP nuance",
    options: [
      { id: "a", text: "Domain code defines a Port interface; infrastructure implements it and is injected at the edge" },
      { id: "b", text: "Every class imports a global service locator and pulls concretes" },
      { id: "c", text: "UI widgets subclass database drivers directly" },
      { id: "d", text: "Rename variables to sound abstract" },
    ],
    correct: ["a"],
    explanation:
      "DIP is about dependency direction toward abstractions owned by policy. A DI framework can help, but the principle is the inversion of ownership/coupling.",
  },
  {
    id: "pr-h-03",
    difficulty: "hard",
    type: "single",
    prompt: "You need a new export format. Instead of editing a giant switch, you register a new Exporter strategy. Which principle are you mainly applying?",
    snippet: "scenario → principle",
    options: [
      { id: "a", text: "Open/Closed Principle" },
      { id: "b", text: "Fail Fast" },
      { id: "c", text: "Principle of Least Privilege" },
      { id: "d", text: "Law of Demeter" },
    ],
    correct: ["a"],
    explanation:
      "Extending via new strategy implementations without rewriting the core orchestration is textbook OCP.",
  },
  {
    id: "pr-h-04",
    difficulty: "hard",
    type: "single",
    prompt: "How do Interface Segregation and Dependency Inversion differ?",
    snippet: "ISP vs DIP",
    options: [
      { id: "a", text: "ISP: keep interfaces small for clients; DIP: high-level modules depend on abstractions, not details" },
      { id: "b", text: "They are identical SOLID rules with two marketing names" },
      { id: "c", text: "ISP is about databases; DIP is about CSS" },
      { id: "d", text: "DIP forbids interfaces; ISP requires god interfaces" },
    ],
    correct: ["a"],
    explanation:
      "ISP shapes the surface area of contracts. DIP shapes who depends on whom. You often use both together, but they answer different questions.",
  },
  {
    id: "pr-h-05",
    difficulty: "hard",
    type: "single",
    prompt: "A method returns account balances and also mutates a cache as a side effect with no clear name signal. Which principle is most offended?",
    snippet: "naming & behavior",
    options: [
      { id: "a", text: "Principle of Least Astonishment (and CQS / clear command vs query)" },
      { id: "b", text: "Principle of Least Privilege" },
      { id: "c", text: "Open/Closed Principle" },
      { id: "d", text: "Composition over Inheritance" },
    ],
    correct: ["a"],
    explanation:
      "Callers should not be surprised. Queries that silently mutate violate least astonishment and muddy command–query separation.",
  },
  {
    id: "pr-h-06",
    difficulty: "hard",
    type: "single",
    prompt: "Instead of asking object fields and deciding outside, you call order.ship() and let Order enforce its rules. Which idea is that?",
    snippet: "Tell, Don't Ask",
    options: [
      { id: "a", text: "Tell, Don't Ask — send intent to the object that owns the data/rules" },
      { id: "b", text: "YAGNI — never ship orders" },
      { id: "c", text: "Least Privilege — deny all methods" },
      { id: "d", text: "DRY — duplicate shipping in the UI" },
    ],
    correct: ["a"],
    explanation:
      "Tell, Don't Ask reduces feature envy: behavior stays with the data rather than pulling guts out for external decision logic.",
  },
  {
    id: "pr-h-07",
    difficulty: "hard",
    type: "single",
    prompt: "You touch a file for a bugfix and leave clearer names plus a tiny test. Which informal principle is that?",
    snippet: "incremental cleanup",
    options: [
      { id: "a", text: "Boy Scout Rule — leave the campground cleaner than you found it" },
      { id: "b", text: "Liskov Substitution Principle" },
      { id: "c", text: "Interface Segregation Principle" },
      { id: "d", text: "Fail Fast" },
    ],
    correct: ["a"],
    explanation:
      "The Boy Scout Rule encourages small, continuous improvement whenever you edit code, without waiting for a grand rewrite.",
  },
  {
    id: "pr-h-08",
    difficulty: "hard",
    type: "single",
    prompt: "When is DRY harmful if applied blindly?",
    snippet: "DRY nuance",
    options: [
      { id: "a", text: "When coincidental similarity is forced into one abstraction that then couples unrelated change reasons" },
      { id: "b", text: "Never — more sharing is always better" },
      { id: "c", text: "Only in functional languages" },
      { id: "d", text: "Only when using TypeScript" },
    ],
    correct: ["a"],
    explanation:
      "DRY targets duplicated knowledge, not accidental sameness. Premature unification can violate SRP/SoC by coupling things that only looked alike.",
  },
  {
    id: "pr-h-09",
    difficulty: "hard",
    type: "single",
    prompt: "KISS and YAGNI both fight complexity. How do they differ?",
    snippet: "KISS vs YAGNI",
    options: [
      { id: "a", text: "KISS: simplify the solution you do build; YAGNI: don’t build unused capabilities at all" },
      { id: "b", text: "KISS is only for UI; YAGNI is only for databases" },
      { id: "c", text: "YAGNI requires complex frameworks; KISS forbids functions" },
      { id: "d", text: "There is no meaningful difference" },
    ],
    correct: ["a"],
    explanation:
      "YAGNI decides whether to build something. KISS decides how simply to implement what you actually need.",
  },
  {
    id: "pr-h-10",
    difficulty: "hard",
    type: "single",
    prompt: "A microservice runs as root, mounts the host filesystem, and uses a shared admin DB user “for convenience.” Which principle is the primary violation?",
    snippet: "security posture",
    options: [
      { id: "a", text: "Principle of Least Privilege" },
      { id: "b", text: "Open/Closed Principle" },
      { id: "c", text: "Don't Repeat Yourself" },
      { id: "d", text: "Liskov Substitution Principle" },
    ],
    correct: ["a"],
    explanation:
      "Excess process and data rights violate least privilege. Other principles may also suffer, but privilege scope is the direct hit.",
  },
];

export const difficultyLabels = { easy: "Easy", medium: "Medium", hard: "Hard" };

export function questionsForDifficulty(difficulty) {
  if (!difficultyLabels[difficulty]) throw new Error(`Unknown difficulty: ${difficulty}`);
  return principleQuestions.filter((q) => q.difficulty === difficulty);
}

export const principleBanks = ["easy", "medium", "hard"].map((difficulty) => ({
  key: `principles:${difficulty}`,
  difficulty,
  title: `Principles — ${difficultyLabels[difficulty]}`,
  intro:
    difficulty === "easy"
      ? "Names and core meanings: DRY, KISS, YAGNI, SOLID basics, SoC, fail fast, least privilege, and related classics."
      : difficulty === "medium"
        ? "Scenario → principle: spot which guideline fits (and tell similar ones apart)."
        : "Nuance and traps: LSP hierarchies, DIP vs DI tooling, ISP vs DIP, when DRY hurts, KISS vs YAGNI, Tell Don’t Ask, Boy Scout Rule.",
  questions: questionsForDifficulty(difficulty),
}));
