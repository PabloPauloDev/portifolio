"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { certifications } from "@/data/certifications";
import { useHybridScroll, N } from "@/hooks/useHybridScroll";
import { useMounted } from "@/hooks/useMounted";
import { useCursor } from "@/components/reusable/CustomCursor/CursorContext";
import { usePhysicsEngine } from "./usePhysicsEngine";
import { BadgeImg } from "./BadgeImg";

const BADGE_SIZE = 56;
const RECT_W = 72;
const RECT_H = 48;
const CONTACT_IDX = N - 1;

export default function PhysicsBadges() {
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const shapes = certifications.map((c) => c.shape);
  const { getStates, setOnUpdate, resetBodies, setOnDragChange, syncDOMBodies } = usePhysicsEngine(shapes);
  const { setCursorGrabbing } = useCursor();
  const { scrollYProgress } = useHybridScroll();
  const mounted = useMounted();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = (v: number) => setVisible(Math.round(v * (N - 1)) === CONTACT_IDX);
    update(scrollYProgress.get());
    return scrollYProgress.on("change", update);
  }, [scrollYProgress]);

  const syncPositions = useCallback(() => {
    const states = getStates();
    states.forEach((s, i) => {
      const el = imgRefs.current[i];
      if (!el) return;
      const shape = certifications[i].shape;
      const hw = shape === "hexagon" ? BADGE_SIZE / 2 : RECT_W / 2;
      const hh = shape === "hexagon" ? BADGE_SIZE / 2 : RECT_H / 2;
      el.style.transform = `translate(${s.x - hw}px, ${s.y - hh}px) rotate(${s.angle}rad)`;
    });
  }, [getStates]);

  const prevVisibleRef = useRef(false);
  useEffect(() => {
    if (visible && !prevVisibleRef.current) {
      resetBodies();
      const t = setTimeout(() => {
        const zone = document.querySelector("[data-physics-zone='contact']");
        const raw = zone ? [...zone.querySelectorAll("h1,h2,h3,p,a,button,span")] : [];
        syncDOMBodies(raw.filter(el => { const r = el.getBoundingClientRect(); return r.width > 20 && r.height > 10; }));
      }, 1000);
      prevVisibleRef.current = true;
      return () => clearTimeout(t);
    }
    prevVisibleRef.current = visible;
    if (!visible) syncDOMBodies([]);
  }, [visible, resetBodies, syncDOMBodies]);

  useEffect(() => {
    setOnDragChange(setCursorGrabbing);
  }, [setOnDragChange, setCursorGrabbing]);

  useEffect(() => {
    setOnUpdate(syncPositions);
  }, [setOnUpdate, syncPositions]);

  if (!mounted) return null;

  return createPortal(
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        pointerEvents: "none",
        visibility: visible ? "visible" : "hidden",
      }}
    >
      {certifications.map((_, i) => (
        <BadgeImg
          key={certifications[i].certificateName}
          index={i}
          setRef={(el) => { imgRefs.current[i] = el; }}
        />
      ))}
    </div>,
    document.body
  );
}
