"use client";

import { useCallback, useEffect, useRef } from "react";
import { motion, useMotionValueEvent } from "framer-motion";
import { certifications } from "@/data/certifications";
import { scrollToSection, useHybridScroll, N } from "@/hooks/useHybridScroll";
import CertCard from "./CertCard";
import { useLeavingAnimation } from "./useLeavingAnimation";
import { useExpertiseScrollGuard } from "./useExpertiseScrollGuard";
import { textAnimate } from "./types";

const WHO_AMI_IDX = 4;
const EXPERTISE_IDX = 3;

export default function VerifiedExpertise() {
  const onComplete = useCallback(() => scrollToSection(WHO_AMI_IDX), []);
  const { phase, startLeaving, reset } = useLeavingAnimation(onComplete);
  const phaseRef = useRef(phase);
  useEffect(() => { phaseRef.current = phase; });

  const { scrollYProgress } = useHybridScroll();
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (Math.round(v * (N - 1)) === EXPERTISE_IDX && phaseRef.current !== "idle") reset();
  });

  useExpertiseScrollGuard(phaseRef, startLeaving);

  return (
    <section id="certifications" className="w-full h-full flex flex-col pt-14 px-8 pb-8">
      <motion.div className="shrink-0 pt-6 pb-4"
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
        animate={textAnimate(phase)}>
        <p className="font-hand text-amber text-base mb-1">{"// credentials"}</p>
        <h2 className="text-3xl lg:text-4xl font-mono font-bold text-rust">Verified Expertise</h2>
        <p className="text-xs text-rust/40 font-mono mt-1">Industry certifications. Hover for 3D effect.</p>
      </motion.div>
      <div className="flex-1 grid grid-cols-3 gap-5 min-h-0 content-start" style={{ perspective: 800 }}>
        {certifications.map((cert, i) => (
          <motion.div key={cert.certificateName}
            initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80, rotate: i % 2 === 0 ? -3 : 3 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }} viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 180, damping: 22, delay: i * 0.08 }}>
            <CertCard cert={cert} index={i} phase={phase} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
