import type { StoryChapter } from "@/types/diagram";
import { legacyMonolith, dddSplit, stranglerFig, finalState } from "./story-diagrams";

export const stories: Record<string, StoryChapter[]> = {
  "monolith-to-micro": [
    {
      title: "The Legacy State",
      description:
        "The system was a single Go binary. Deployment took 40 minutes, and a single bug brought down the payment gateway. The team spent more time coordinating releases than writing features.",
      visual: legacyMonolith,
    },
    {
      title: "Defining Bounded Contexts",
      description:
        "Applying Domain-Driven Design, we identified three main domains: Identity, Catalog, and Ordering. Event Storming workshops with stakeholders revealed the aggregate boundaries and domain events.",
      visual: dddSplit,
    },
    {
      title: "The Strangler Fig Pattern",
      description:
        "We routed traffic through Nginx, slowly migrating routes to the new K8s-hosted microservices. The monolith kept running — no big bang. Each sprint strangled another slice of the old system.",
      visual: stranglerFig,
    },
    {
      title: "The Final Architecture",
      description:
        "With all bounded contexts extracted, the monolith was decommissioned. Each service owns its data, communicates via Kafka events, and deploys independently. Deployment time dropped from 40 minutes to 4.",
      visual: finalState,
    },
  ],
  "multi-region-aws": [
    {
      title: "Single Region Pain",
      description:
        "Everything lived in us-east-1. APAC users suffered 200ms+ latency. A single AZ outage in 2022 caused 3 hours of downtime, violating our SLA and costing $180k in credits.",
    },
    {
      title: "Multi-Region Blueprint",
      description:
        "We designed a multi-region architecture with Aurora Global Database for <1s replication, EKS clusters per region, and CloudFront for edge caching. Terraform modules made it reproducible.",
    },
    {
      title: "Cutting Over",
      description:
        "Route 53 latency-based routing directed users to the nearest region. We ran both regions in parallel for 2 weeks, validating replication consistency before promoting the multi-region setup.",
    },
  ],
  "ml-edtech": [
    {
      title: "Static Curriculum Problem",
      description:
        "Every student saw the same content in the same order. Students who already understood a topic wasted time, while those who struggled got no extra help. Completion rates were at 42%.",
    },
    {
      title: "Building the ML Pipeline",
      description:
        "We built a feature store capturing learning velocity, quiz scores, and time-on-task. A transformer model trained nightly on SageMaker predicted the optimal next lesson for each student.",
    },
    {
      title: "Serving Predictions",
      description:
        "The API layer calls the SageMaker endpoint on each lesson completion. Predictions come back in <50ms P99. A/B tests showed 35% improvement in completion rates within 6 weeks of launch.",
    },
  ],
};
