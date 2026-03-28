import { multiRegionAWS, monolithToMicro, mlEdtech } from "@/data/diagrams";
import type { ProjectDef } from "./types";

export const PROJECTS: ProjectDef[] = [
  {
    id: "monolith-to-micro",
    title: "Monolith → Microservices",
    accent: "#FF9644",
    tags: ["DDD", "Event Sourcing", "CQRS", "Docker", "K8s"],
    diagram: monolithToMicro,
    hasStory: true,
    decisions: {
      problem: "Monolith scaling poorly under 10k RPM; deployments took 4+ hours.",
      solution: "Domain-Driven decomposition into bounded contexts with event bus.",
      tradeoff: "Increased network latency vs. better team autonomy & independent deploys.",
      win: "Reduced deployment time by 40%, enabled 3 teams to ship independently.",
    },
  },
  {
    id: "multi-region-aws",
    title: "Multi-Region AWS Infrastructure",
    accent: "#E67A2A",
    tags: ["Terraform", "EKS", "Aurora Global", "CloudFront", "IaC"],
    diagram: multiRegionAWS,
    hasStory: true,
    decisions: {
      problem: "Single-region architecture; 200ms+ latency for APAC users.",
      solution: "Multi-region with Aurora Global DB, EKS clusters, CloudFront edge.",
      tradeoff: "30% cost increase vs. global P95 latency under 80ms.",
      win: "99.99% uptime SLA achieved; APAC user engagement up 60%.",
    },
  },
  {
    id: "ml-edtech",
    title: "ML Integration — EdTech",
    accent: "#C85A00",
    tags: ["Python", "SageMaker", "Feature Store", "GraphQL", "React"],
    diagram: mlEdtech,
    hasStory: true,
    decisions: {
      problem: "Static curriculum couldn't adapt to individual learning pace.",
      solution: "Real-time ML inference pipeline with feature store for personalization.",
      tradeoff: "Model complexity vs. inference latency; chose lighter model with batch updates.",
      win: "Student completion rate improved by 35%; model serves in <50ms P99.",
    },
  },
];
