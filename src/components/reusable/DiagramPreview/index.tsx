"use client";

import type { DiagramData, DiagramNode } from "@/types/diagram";

const NODE_W = 140;
const NODE_H = 52;

const previewStyles: Record<string, { bg: string; border: string }> = {
  entry:    { bg: "rgba(255,150,68,0.18)", border: "#FF9644" },
  compute:  { bg: "rgba(86,47,0,0.10)",   border: "#562F00" },
  database: { bg: "rgba(86,47,0,0.08)",   border: "#8B6914" },
  storage:  { bg: "rgba(255,150,68,0.12)",border: "#C97A30" },
  cache:    { bg: "rgba(255,200,100,0.18)",border: "#D4A024" },
  queue:    { bg: "rgba(86,47,0,0.07)",   border: "#7A5C2E" },
  cdn:      { bg: "rgba(255,150,68,0.14)",border: "#E88A3A" },
  service:  { bg: "rgba(86,47,0,0.09)",   border: "#6B4423" },
};

function edgePath(a: DiagramNode, b: DiagramNode) {
  const x1 = a.x + NODE_W, y1 = a.y + NODE_H / 2;
  const x2 = b.x,          y2 = b.y + NODE_H / 2;
  const cx = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`;
}

export default function DiagramPreview({ data }: { data: DiagramData }) {
  const nodeMap = new Map(data.nodes.map((n) => [n.id, n]));
  const maxX = Math.max(...data.nodes.map((n) => n.x + NODE_W + 40), 800);
  const maxY = Math.max(...data.nodes.map((n) => n.y + NODE_H + 40), 500);

  return (
    <svg viewBox={`0 0 ${maxX} ${maxY}`} className="w-full h-full" style={{ display: "block" }}>
      {data.edges.map((edge, i) => {
        const from = nodeMap.get(edge.from), to = nodeMap.get(edge.to);
        if (!from || !to) return null;
        return <path key={i} d={edgePath(from, to)} fill="none" stroke="rgba(86,47,0,0.22)" strokeWidth={1.5} strokeDasharray="5 3" />;
      })}
      {data.nodes.map((node) => {
        const s = previewStyles[node.type] ?? previewStyles.service;
        return (
          <g key={node.id}>
            <rect x={node.x} y={node.y} width={NODE_W} height={NODE_H} rx={7} fill={s.bg} stroke={s.border} strokeWidth={1.5} />
            <text x={node.x + NODE_W / 2} y={node.y + NODE_H / 2 + 1} textAnchor="middle" dominantBaseline="middle"
              fontSize={11} fontFamily="var(--font-jetbrains-mono), monospace" fill="#562F00" opacity={0.85}>{node.label}</text>
          </g>
        );
      })}
    </svg>
  );
}
