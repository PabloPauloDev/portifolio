"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import type { CertificationItem } from "@/types/diagram";
import { cardAnimate, cardTransition, textAnimate } from "./types";
import type { LeavingPhase } from "./types";

interface Props {
  cert: CertificationItem;
  index: number;
  phase: LeavingPhase;
}

export default function CertCard({ cert, index, phase }: Props) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-80, 80], [12, -12]), { stiffness: 300, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-80, 80], [-12, 12]), { stiffness: 300, damping: 20 });

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top - rect.height / 2);
  }

  const isLeaving = phase !== "idle";

  return (
    <motion.div
      className="glass-card rounded-xl p-5 cursor-pointer"
      style={{ rotateX: isLeaving ? 0 : rotateX, rotateY: isLeaving ? 0 : rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={isLeaving ? undefined : handleMouse}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      animate={cardAnimate(phase)}
      transition={cardTransition(phase, index)}
      whileHover={isLeaving ? undefined : { scale: 1.03 }}
    >
      <div className="flex items-start gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element -- external cert badge URLs; next/image requires allowlist domain config */}
        <img
          src={cert.badgeUrl}
          alt={cert.certificateName}
          className="w-14 h-14 rounded-lg shrink-0 object-contain"
          style={{ backgroundColor: cert.color + "15" }}
        />
        <motion.div className="flex-1 min-w-0" animate={textAnimate(phase)} transition={{ duration: 0.3, delay: index * 0.06 }}>
          <h3 className="font-mono text-sm font-bold text-rust leading-snug mb-1">{cert.certificateName}</h3>
          <p className="font-hand text-xs text-rust/50 leading-relaxed">{cert.description}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
