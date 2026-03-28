"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import type { certifications } from "@/data/certifications";

type Cert = (typeof certifications)[number];

export default function CertCard({ cert }: { cert: Cert }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-80, 80], [12, -12]), { stiffness: 300, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-80, 80], [-12, 12]), { stiffness: 300, damping: 20 });

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  const formatted = new Date(cert.issueDate).toLocaleDateString("en-US", { year: "numeric", month: "short" });

  return (
    <motion.div className="glass-card rounded-xl p-6 cursor-pointer"
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouse} onMouseLeave={() => { x.set(0); y.set(0); }}
      whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      <div className="w-10 h-10 rounded-lg mb-4 flex items-center justify-center"
        style={{ backgroundColor: cert.color + "20", border: `1.5px solid ${cert.color}40` }}>
        <span className="text-lg" style={{ color: cert.color }}>✦</span>
      </div>
      <h3 className="font-mono text-sm font-bold text-rust mb-2 leading-snug">{cert.certificateName}</h3>
      <p className="font-hand text-amber text-sm mb-3">{formatted}</p>
      <div className="flex items-center gap-2 pt-3 border-t border-rust/5">
        <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: cert.color }} />
        <span className="font-mono text-[10px] text-rust/40 uppercase tracking-wider">Verified</span>
      </div>
    </motion.div>
  );
}
