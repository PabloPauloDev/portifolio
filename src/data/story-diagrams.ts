import type { DiagramData } from "@/types/diagram";

export const legacyMonolith: DiagramData = {
  systemName: "Legacy Monolith (Before)",
  nodes: [
    { id: "client", label: "Web Client", type: "entry", x: 100, y: 200, description: "Single-page app calling a monolithic REST API." },
    { id: "mono", label: "Go Monolith", type: "compute", x: 350, y: 200, description: "Single Go binary: auth, catalog, ordering, payments — all in one." },
    { id: "db", label: "PostgreSQL", type: "database", x: 600, y: 200, description: "Single shared database with 200+ tables, no schema boundaries." },
  ],
  edges: [
    { from: "client", to: "mono", label: "REST" },
    { from: "mono", to: "db", label: "SQL" },
  ],
};

export const dddSplit: DiagramData = {
  systemName: "Bounded Contexts Identified",
  nodes: [
    { id: "client", label: "Web Client", type: "entry", x: 80, y: 200, description: "Unchanged frontend during context mapping phase." },
    { id: "identity", label: "Identity", type: "service", x: 300, y: 80, description: "User authentication, authorization, and profile management." },
    { id: "catalog", label: "Catalog", type: "service", x: 300, y: 200, description: "Product listing, search, and categorization." },
    { id: "ordering", label: "Ordering", type: "service", x: 300, y: 320, description: "Order lifecycle, cart, checkout, and payment orchestration." },
    { id: "db", label: "Shared DB", type: "database", x: 550, y: 200, description: "Still shared — next step is to split per context." },
  ],
  edges: [
    { from: "client", to: "identity", label: "Auth" },
    { from: "client", to: "catalog", label: "REST" },
    { from: "client", to: "ordering", label: "REST" },
    { from: "identity", to: "db", label: "SQL" },
    { from: "catalog", to: "db", label: "SQL" },
    { from: "ordering", to: "db", label: "SQL" },
  ],
};

export const stranglerFig: DiagramData = {
  systemName: "Strangler Fig Migration",
  nodes: [
    { id: "client", label: "Web Client", type: "entry", x: 60, y: 200, description: "Frontend now routing through the reverse proxy." },
    { id: "nginx", label: "Nginx Proxy", type: "cdn", x: 220, y: 200, description: "Reverse proxy routing /api/v2/* to new services, rest to monolith." },
    { id: "mono", label: "Go Monolith", type: "compute", x: 420, y: 100, description: "Shrinking monolith — catalog & ordering routes deprecated." },
    { id: "k8s", label: "K8s Services", type: "compute", x: 420, y: 300, description: "New microservices deployed on EKS with rolling updates." },
    { id: "db_old", label: "Legacy DB", type: "database", x: 640, y: 100, description: "Original database, gradually having tables migrated out." },
    { id: "db_new", label: "Service DBs", type: "database", x: 640, y: 300, description: "Per-service databases with clean schemas per bounded context." },
  ],
  edges: [
    { from: "client", to: "nginx", label: "HTTPS" },
    { from: "nginx", to: "mono", label: "/api/v1" },
    { from: "nginx", to: "k8s", label: "/api/v2" },
    { from: "mono", to: "db_old", label: "SQL" },
    { from: "k8s", to: "db_new", label: "SQL" },
  ],
};

export const finalState: DiagramData = {
  systemName: "Final Microservices Architecture",
  nodes: [
    { id: "gw", label: "API Gateway", type: "entry", x: 80, y: 200, description: "Kong API Gateway with rate limiting and JWT validation." },
    { id: "auth", label: "Auth Service", type: "service", x: 280, y: 80, description: "Standalone identity service with OAuth2 flows." },
    { id: "catalog", label: "Catalog Svc", type: "service", x: 280, y: 200, description: "Product catalog with Elasticsearch for full-text search." },
    { id: "orders", label: "Order Svc", type: "service", x: 280, y: 320, description: "Order processing with saga pattern for distributed transactions." },
    { id: "bus", label: "Event Bus", type: "queue", x: 480, y: 200, description: "Kafka cluster enabling async communication between services." },
    { id: "db1", label: "Auth DB", type: "database", x: 680, y: 80, description: "PostgreSQL for users and RBAC policies." },
    { id: "db2", label: "Catalog DB", type: "database", x: 680, y: 200, description: "PostgreSQL + Elasticsearch index." },
    { id: "db3", label: "Orders DB", type: "database", x: 680, y: 320, description: "Event-sourced PostgreSQL with CQRS projections." },
  ],
  edges: [
    { from: "gw", to: "auth", label: "JWT" },
    { from: "gw", to: "catalog", label: "REST" },
    { from: "gw", to: "orders", label: "REST" },
    { from: "auth", to: "db1" },
    { from: "catalog", to: "bus", label: "Events" },
    { from: "orders", to: "bus", label: "Events" },
    { from: "catalog", to: "db2" },
    { from: "orders", to: "db3" },
  ],
};
