// AWS SAA-C03 content domains = our quiz sections.
// `weight` is the official exam weighting, used to draw questions for the Overall Test.
// See plan/aws-saa-reference.md for sources.
export const sections = [
  { key: "d1-secure", name: "Design Secure Architectures", weight: 0.3 },
  { key: "d2-resilient", name: "Design Resilient Architectures", weight: 0.26 },
  { key: "d3-high-performing", name: "Design High-Performing Architectures", weight: 0.24 },
  { key: "d4-cost-optimized", name: "Design Cost-Optimized Architectures", weight: 0.2 },
];

export const sectionByKey = Object.fromEntries(sections.map((s) => [s.key, s]));
