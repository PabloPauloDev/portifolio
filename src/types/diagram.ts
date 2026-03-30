export interface DiagramNode {
  id: string;
  label: string;
  type: "entry" | "compute" | "database" | "storage" | "cache" | "queue" | "cdn" | "service";
  x: number;
  y: number;
  description?: string;
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
}

export interface DiagramData {
  systemName: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}

export interface StoryChapter {
  title: string;
  description: string;
  visual?: string | DiagramData;
}

export interface ProjectMeta {
  id: string;
  title: string;
  tags: string[];
  diagram: DiagramData;
  decisions: {
    problem: string;
    solution: string;
    tradeoff: string;
    win: string;
  };
  story?: StoryChapter[];
}

export interface HobbyItem {
  name: string;
  description: string;
  icon: string;
}

export interface CertificationItem {
  certificateName: string;
  description: string;
  issueDate: string;
  badgeUrl: string;
  color: string;
  shape: "hexagon" | "rectangle";
}
