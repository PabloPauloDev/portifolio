import type { DiagramNode } from "@/types/diagram";

export const NODE_W = 140;
export const NODE_H = 52;

export const typeStyles: Record<string, { bg: string; border: string; icon: string }> = {
  entry:    { bg: "rgba(255,150,68,0.12)", border: "#FF9644", icon: "→" },
  compute:  { bg: "rgba(86,47,0,0.08)",    border: "#562F00", icon: "⚙" },
  database: { bg: "rgba(86,47,0,0.06)",    border: "#8B6914", icon: "⛁" },
  storage:  { bg: "rgba(255,150,68,0.08)", border: "#C97A30", icon: "▤" },
  cache:    { bg: "rgba(255,200,100,0.12)",border: "#D4A024", icon: "⚡" },
  queue:    { bg: "rgba(86,47,0,0.05)",    border: "#7A5C2E", icon: "≋" },
  cdn:      { bg: "rgba(255,150,68,0.10)", border: "#E88A3A", icon: "◎" },
  service:  { bg: "rgba(86,47,0,0.07)",    border: "#6B4423", icon: "◆" },
};

export function getEdgePath(from: DiagramNode, to: DiagramNode): string {
  const x1 = from.x + NODE_W, y1 = from.y + NODE_H / 2;
  const x2 = to.x,            y2 = to.y + NODE_H / 2;
  const cx = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`;
}

export function getEdgeLabelPos(from: DiagramNode, to: DiagramNode) {
  const x1 = from.x + NODE_W, y1 = from.y + NODE_H / 2;
  const x2 = to.x,            y2 = to.y + NODE_H / 2;
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  return {
    x: (x1 + x2) / 2 + (dy / len) * 18,
    y: (y1 + y2) / 2 - (dx / len) * 18,
  };
}
