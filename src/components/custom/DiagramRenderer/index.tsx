"use client";

import { motion } from "framer-motion";
import type { DiagramData } from "@/types/diagram";
import { NODE_W, NODE_H, typeStyles, getEdgePath, getEdgeLabelPos } from "../diagram-utils";
import DiagramTooltip from "./DiagramTooltip";
import { useTooltip } from "@/components/reusable/TooltipProvider";

interface Props { data: DiagramData; className?: string }

export default function DiagramRenderer({ data, className = "" }: Props) {
  const nodeMap = new Map(data.nodes.map((n) => [n.id, n]));
  const { show, hide } = useTooltip();
  const maxX = Math.max(...data.nodes.map((n) => n.x + NODE_W + 40), 800);
  const maxY = Math.max(...data.nodes.map((n) => n.y + NODE_H + 40), 500);

  return (
    <div className={`relative ${className}`}>
      <motion.p className="font-hand text-lg text-amber mb-2 -rotate-1"
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        {"/* "}{data.systemName}{" */"}
      </motion.p>
      <svg viewBox={`0 0 ${maxX} ${maxY}`} className="w-full h-auto" style={{ minHeight: 300 }}>
        {data.edges.map((edge, i) => {
          const from = nodeMap.get(edge.from), to = nodeMap.get(edge.to);
          if (!from || !to) return null;
          const path = getEdgePath(from, to), lp = getEdgeLabelPos(from, to);
          return (
            <g key={`edge-${i}`}>
              <motion.path d={path} fill="none" stroke="rgba(86,47,0,0.06)" strokeWidth={3}
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.3 + i * 0.15, ease: "easeInOut" }} />
              <motion.path d={path} fill="none" stroke="#562F00" strokeWidth={1.5} strokeDasharray="6 3"
                initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.5 }}
                transition={{ duration: 1, delay: 0.3 + i * 0.15, ease: "easeInOut" }} />
              <motion.circle r={3} fill="#FF9644" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 1.2 + i * 0.15 }} cx={to.x} cy={to.y + NODE_H / 2} />
              {edge.label && (
                <text x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle" fill="#FF9644"
                  fontSize={13} fontFamily="var(--font-caveat), cursive" stroke="rgba(255,253,241,0.85)"
                  strokeWidth={3} style={{ paintOrder: "stroke" }}>{edge.label}</text>
              )}
            </g>
          );
        })}
        {data.nodes.map((node, i) => {
          const s = typeStyles[node.type] ?? typeStyles.service;
          return (
            <motion.g key={node.id} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1, type: "spring", stiffness: 220, damping: 22 }}
              onPointerEnter={node.description ? () => show(<DiagramTooltip node={node} />) : undefined}
              onPointerLeave={node.description ? hide : undefined}
              style={{ cursor: node.description ? "pointer" : "default" }}>
              <rect x={node.x} y={node.y} width={NODE_W} height={NODE_H} rx={8} fill={s.bg} stroke={s.border} strokeWidth={1.5} />
              <text x={node.x + 14} y={node.y + NODE_H / 2 + 1} textAnchor="middle" dominantBaseline="middle" fontSize={14} fill={s.border}>{s.icon}</text>
              <text x={node.x + NODE_W / 2 + 8} y={node.y + NODE_H / 2 + 1} textAnchor="middle" dominantBaseline="middle"
                fontSize={12} fontFamily="var(--font-jetbrains-mono), monospace" fill="#562F00">{node.label}</text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
