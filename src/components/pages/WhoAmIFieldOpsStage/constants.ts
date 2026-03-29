import type { Job } from "@/components/reusable/ExperienceBrick";

export const WORK: Job[] = [
  {
    id: "w0", period: "2021 – Present", role: "Solutions Architect",
    company: "Enterprise SaaS",
    description: "Designed multi-region AWS infrastructure serving 2M+ users. Led monolith decomposition using DDD bounded contexts. Reduced cloud spend 35% through capacity planning and right-sizing.",
    tech: ["AWS", "Terraform", "Kubernetes", "Kafka", "PostgreSQL", "DDD", "Datadog", "ArgoCD"],
    accent: "#FF9900", rot: -1.5,
  },
  {
    id: "w1", period: "2018 – 2021", role: "Senior Developer",
    company: "FinTech Startup",
    description: "Built a real-time trading platform processing 50k events/sec. Implemented event sourcing + CQRS with Kafka and PostgreSQL. Mentored 8 engineers across 3 product squads.",
    tech: ["Kafka", "PostgreSQL", "Redis", "Node.js", "React", "Docker", "CQRS", "Prometheus"],
    accent: "#326CE5", rot: 0.5,
  },
  {
    id: "w2", period: "2015 – 2018", role: "Full-Stack Developer",
    company: "EdTech Platform",
    description: "Integrated ML recommendation models for adaptive learning paths. Migrated a PHP monolith to containerised microservices. Shipped a GraphQL API for 500k daily active students.",
    tech: ["Python", "GraphQL", "React", "Docker", "MySQL", "Nginx", "Jenkins", "ELK Stack"],
    accent: "#4285F4", rot: 1.5,
  },
];

export const BOOT_LOG = [
  { text: "FIELD-OPS-RACK-01  ·  Power On Self Test" },
  { text: "" },
  { text: "[  0.001]  Linux 6.8.0 #1 SMP — kernel loaded" },
  { text: "[  0.234]  Mounting ZFS rpool/data  ............  OK" },
  { text: "[  0.541]  Docker Engine  ......................  OK" },
  { text: "[  0.812]  bond0 (10GbE)  ......................  UP" },
  { text: "[  1.100]  nginx-proxy  ........................  OK" },
  { text: "[  1.323]  jellyfin  ...........................  OK" },
  { text: "[  1.512]  pihole-dns  .........................  OK" },
  { text: "[  1.734]  plex-media  .........................  OK" },
  { text: "[  1.956]  firefly-iii  ........................  OK" },
  { text: "[  2.145]  proxmox-ve  .........................  OK" },
  { text: "" },
  { text: "  >>>  6 / 6 services nominal  <<<", highlight: true },
] as const;

export const BOOT_DELAYS = [0, 80, 180, 520, 700, 920, 1140, 1340, 1560, 1760, 1960, 2160, 2360, 2520, 2720, 3100];

export const SHUTDOWN_LOG = [
  { text: "[  0.001]  Received SIGTERM — initiating graceful shutdown" },
  { text: "[  0.120]  Stopping Docker containers  ............  DONE" },
  { text: "[  0.480]  Saving state to JSON  ..................  DONE" },
  { text: "[  0.840]  Unmounting ZFS rpool/data  .............  DONE" },
  { text: "[  1.200]  bond0 (10GbE)  .........................  DOWN" },
  { text: "[  1.560]  System halted.", highlight: true },
] as const;

export const SHUTDOWN_DELAYS = [0, 400, 800, 1200, 1600, 2400];
