export const consultationTiers = [
  {
    id: "discovery",
    name: "Discovery Call",
    price: "$0",
    duration: "30 min",
    description: "Perfect for initial conversations about your needs",
    features: [
      "Understand your project goals",
      "Assess technical requirements",
      "Discuss timeline & scope",
      "Get high-level recommendations",
    ],
  },
  {
    id: "strategy",
    name: "Strategy Session",
    price: "$75",
    duration: "60 min",
    description: "In-depth planning for your project",
    features: [
      "Detailed technical architecture",
      "Technology stack recommendations",
      "Implementation roadmap",
      "Cost & timeline estimates",
      "Action items & next steps",
    ],
  },
  {
    id: "technical",
    name: "Technical Consultation",
    price: "$120",
    duration: "90 min",
    description: "Deep dive into technical challenges",
    features: [
      "Problem-solving session",
      "Code review & optimization",
      "System design consultation",
      "Performance analysis",
      "Detailed recommendations",
      "Follow-up support (7 days)",
    ],
  },
  {
    id: "project",
    name: "Project Kickoff",
    price: "Custom",
    duration: "Flexible",
    description: "Comprehensive planning for project start",
    features: [
      "Full project assessment",
      "Team structure planning",
      "Complete development roadmap",
      "Risk mitigation strategy",
      "Communication framework",
      "Ongoing coordination",
    ],
  },
];

export const consultationTypes = [
  { value: "web-development", label: "Web Development" },
  { value: "mobile-development", label: "Mobile Development (React Native/Expo)" },
  { value: "ai-integration", label: "AI & Machine Learning Integration" },
  { value: "system-architecture", label: "System Architecture & Design" },
  { value: "technical-audit", label: "Technical Audit & Optimization" },
  { value: "startup-tech", label: "Startup Technology Stack" },
  { value: "other", label: "Other (Please describe)" },
];
