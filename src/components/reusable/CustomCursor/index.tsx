"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const move = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll("a, button, [data-cursor]");
    const enter = () => setCursorVariant("hover");
    const leave = () => setCursorVariant("default");
    els.forEach((el) => { el.addEventListener("mouseenter", enter); el.addEventListener("mouseleave", leave); });
    return () => { els.forEach((el) => { el.removeEventListener("mouseenter", enter); el.removeEventListener("mouseleave", leave); }); };
  }, []);

  const isHover = cursorVariant === "hover";

  return (
    <motion.div className="fixed top-0 left-0 pointer-events-none z-[300] mix-blend-difference"
      animate={{ x: mousePos.x - (isHover ? 20 : 8), y: mousePos.y - (isHover ? 20 : 8),
        width: isHover ? 40 : 16, height: isHover ? 40 : 16 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}>
      <div className={`w-full h-full rounded-full border-2 transition-colors duration-200 ${
        isHover ? "border-amber bg-amber/10" : "border-rust bg-rust/5"}`} />
    </motion.div>
  );
}
