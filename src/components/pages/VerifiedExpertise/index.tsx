"use client";

import { motion } from "framer-motion";
import { certifications } from "@/data/certifications";
import CertCard from "./CertCard";

export default function VerifiedExpertise() {
  return (
    <section id="certifications" className="w-full h-full flex flex-col pt-14 px-8 pb-8">
      <motion.div className="flex-shrink-0 pt-6 pb-4"
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
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
            <CertCard cert={cert} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
