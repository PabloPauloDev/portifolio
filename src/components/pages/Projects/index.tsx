"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { PROJECTS } from "./constants";

export default function Projects() {
  return (
    <section id="projects" className="w-full h-full flex flex-col pt-14 px-8 pb-8">
      <motion.div
        className="flex-shrink-0 pt-6 pb-5"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 3.2 }}
      >
        <p className="font-hand text-amber text-base mb-1">{"// case studies"}</p>
        <h2 className="text-3xl lg:text-4xl font-mono font-bold text-rust">
          Architecture Deep Dives
        </h2>
      </motion.div>

      <div className="flex-1 flex gap-5 min-h-0">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} {...project} index={i} />
        ))}
      </div>
    </section>
  );
}
