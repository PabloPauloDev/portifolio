"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import DiagramRenderer from "@/components/custom/DiagramRenderer";
import DiagramEditor from "@/components/custom/DiagramEditor";
import { DiagramData } from "@/types/diagram";
import { multiRegionAWS } from "@/data/diagrams";

export default function InteractiveDiagram() {
  const [diagramData, setDiagramData] = useState<DiagramData>(multiRegionAWS);

  return (
    <section id="diagrams" className="w-full h-full flex flex-col pt-14 px-8 pb-8">
      <motion.div className="flex-shrink-0 pt-6 pb-4"
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
        <p className="font-hand text-amber text-base mb-1">{"// interactive"}</p>
        <h2 className="text-3xl lg:text-4xl font-mono font-bold text-rust">Architecture Playground</h2>
        <p className="text-xs text-rust/40 font-mono mt-1">Edit JSON → diagram updates in real-time.</p>
      </motion.div>
      <div className="flex-1 grid grid-cols-5 gap-5 min-h-0">
        <div className="col-span-3 glass-card rounded-xl p-4 min-h-0 overflow-hidden">
          <DiagramRenderer data={diagramData} />
        </div>
        <div className="col-span-2 min-h-0">
          <DiagramEditor data={diagramData} onChange={setDiagramData} />
        </div>
      </div>
    </section>
  );
}
