"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useMounted } from "@/hooks/useMounted";
import IntroScreen from "@/components/pages/IntroScreen";
import HybridScroll, { GRID, scrollToSection } from "@/hooks/useHybridScroll";
import MiniMap from "@/components/pages/MiniMap";
import Nav from "@/components/pages/Nav";
import Hero from "@/components/pages/Hero";
import Projects from "@/components/pages/Projects";
import InteractiveDiagram from "@/components/custom/InteractiveDiagram";
import VerifiedExpertise from "@/components/pages/VerifiedExpertise";
import WhoAmIFieldOpsStage from "@/components/pages/WhoAmIFieldOpsStage";
import Footer from "@/components/pages/Footer";
import Panel from "@/components/reusable/Panel";

// Survives in-session back-navigation; resets on full page load (module reload)
let _introDone = false;

export default function Home() {
  const mounted = useMounted();
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    if (_introDone) setIntroDone(true);
    if (window.location.search.includes("back=1")) {
      window.history.replaceState(null, "", "/");
      scrollToSection(1);
    }
  }, []);

  // Suppress SSR output so Framer Motion sees a fresh DOM mount
  // and plays all initial animations correctly after hydration.
  if (!mounted) return null;

  const handleIntroDone = () => { _introDone = true; setIntroDone(true); };

  return (
    <>
      <AnimatePresence initial={true}>
        {!introDone && <IntroScreen key="intro" onDone={handleIntroDone} />}
      </AnimatePresence>
      <Nav delay={introDone ? 0.4 : 3.2} />
      <HybridScroll>
        <Panel col={GRID.home[0]} row={GRID.home[1]}><Hero /></Panel>
        <Panel col={GRID.projects[0]} row={GRID.projects[1]}><Projects /></Panel>
        <Panel col={GRID.playground[0]} row={GRID.playground[1]}><InteractiveDiagram /></Panel>
        <Panel col={GRID.expertise[0]} row={GRID.expertise[1]}><VerifiedExpertise /></Panel>
        <Panel col={GRID.whoami[0]} row={GRID.whoami[1]}><WhoAmIFieldOpsStage /></Panel>
        <Panel col={GRID.contact[0]} row={GRID.contact[1]} transparent><Footer /></Panel>
      </HybridScroll>
      <MiniMap />
    </>
  );
}
