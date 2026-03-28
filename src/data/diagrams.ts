import { DiagramData } from "@/types/diagram";

export const multiRegionAWS: DiagramData = {
  systemName: "Multi-Region AWS Infrastructure",
  nodes: [
    { id: "cf", label: "CloudFront", type: "cdn", x: 80, y: 180, description: "Global CDN edge with 200+ PoPs, TLS termination and origin failover." },
    { id: "lb", label: "ALB", type: "entry", x: 250, y: 180, description: "Application Load Balancer with path-based routing and WAF integration." },
    { id: "k8s", label: "EKS Cluster", type: "compute", x: 440, y: 120, description: "Managed Kubernetes running 12 microservices across 3 node groups." },
    { id: "svc", label: "Microservices", type: "service", x: 440, y: 260, description: "gRPC service mesh with Istio sidecar proxies and circuit breakers." },
    { id: "cache", label: "ElastiCache", type: "cache", x: 640, y: 120, description: "Redis 7.x cluster for session store and query result caching." },
    { id: "db", label: "Aurora Global", type: "database", x: 640, y: 260, description: "Aurora Global Database with <1s cross-region replication lag." },
    { id: "s3", label: "S3 Bucket", type: "storage", x: 640, y: 400, description: "S3 with cross-region replication for static assets and backups." },
  ],
  edges: [
    { from: "cf", to: "lb", label: "HTTPS" },
    { from: "lb", to: "k8s", label: "TCP/443" },
    { from: "lb", to: "svc", label: "gRPC" },
    { from: "k8s", to: "cache", label: "Redis" },
    { from: "k8s", to: "db", label: "SQL" },
    { from: "svc", to: "db", label: "SQL" },
    { from: "svc", to: "s3", label: "PUT/GET" },
  ],
};

export const monolithToMicro: DiagramData = {
  systemName: "Monolith → Microservices (DDD)",
  nodes: [
    { id: "gw", label: "API Gateway", type: "entry", x: 100, y: 200, description: "Kong API Gateway handling auth, rate limiting, and request routing." },
    { id: "auth", label: "Auth Service", type: "service", x: 300, y: 80, description: "OAuth2 / OIDC identity provider issuing JWTs with RBAC claims." },
    { id: "orders", label: "Order Context", type: "service", x: 300, y: 200, description: "Bounded context owning the order lifecycle and payment orchestration." },
    { id: "inv", label: "Inventory", type: "service", x: 300, y: 320, description: "Inventory domain with eventual consistency via domain events." },
    { id: "queue", label: "Event Bus", type: "queue", x: 500, y: 200, description: "Kafka cluster with exactly-once semantics and schema registry." },
    { id: "db1", label: "Orders DB", type: "database", x: 700, y: 120, description: "PostgreSQL with event sourcing tables and CQRS read models." },
    { id: "db2", label: "Inventory DB", type: "database", x: 700, y: 300, description: "PostgreSQL with optimistic locking for stock level mutations." },
  ],
  edges: [
    { from: "gw", to: "auth", label: "JWT" },
    { from: "gw", to: "orders", label: "REST" },
    { from: "gw", to: "inv", label: "REST" },
    { from: "orders", to: "queue", label: "Events" },
    { from: "inv", to: "queue", label: "Events" },
    { from: "queue", to: "db1" },
    { from: "queue", to: "db2" },
  ],
};

export const mlEdtech: DiagramData = {
  systemName: "ML Pipeline — EdTech Platform",
  nodes: [
    { id: "app", label: "Student App", type: "entry", x: 80, y: 200, description: "React Native mobile app with offline-first sync and push notifications." },
    { id: "api", label: "API Layer", type: "service", x: 260, y: 200, description: "GraphQL gateway aggregating curriculum, user progress, and ML predictions." },
    { id: "ml", label: "ML Inference", type: "compute", x: 460, y: 120, description: "SageMaker endpoint running a transformer model for learning path recommendations." },
    { id: "train", label: "Training Pipeline", type: "compute", x: 460, y: 300, description: "Nightly retraining pipeline on SageMaker with automated model evaluation." },
    { id: "feat", label: "Feature Store", type: "storage", x: 660, y: 120, description: "SageMaker Feature Store with real-time and batch feature groups." },
    { id: "db", label: "Analytics DB", type: "database", x: 660, y: 300, description: "ClickHouse analytics database for learning metrics and A/B test results." },
  ],
  edges: [
    { from: "app", to: "api", label: "GraphQL" },
    { from: "api", to: "ml", label: "Predict" },
    { from: "api", to: "db", label: "Log" },
    { from: "ml", to: "feat", label: "Read" },
    { from: "train", to: "feat", label: "Write" },
    { from: "train", to: "db", label: "Metrics" },
  ],
};
