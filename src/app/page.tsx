"use client";

import { useState } from "react";
import IntroScreen from "@/components/pages/IntroScreen";
import HybridScroll, { GRID } from "@/hooks/useHybridScroll";
import MiniMap from "@/components/pages/MiniMap";
import Nav from "@/components/pages/Nav";
import Hero from "@/components/pages/Hero";
import Projects from "@/components/pages/Projects";
import InteractiveDiagram from "@/components/custom/InteractiveDiagram";
import VerifiedExpertise from "@/components/pages/VerifiedExpertise";
import WhoAmIFieldOpsStage from "@/components/pages/WhoAmIFieldOpsStage";
import Footer from "@/components/pages/Footer";
import Panel from "@/components/reusable/Panel";
import CustomCursor from "@/components/reusable/CustomCursor";

export default function Home() {
  const [introDone, setIntroDone] = useState(() => typeof window !== "undefined" && sessionStorage.getItem("intro-done") === "1");

  return (
    <>
      {!introDone && <IntroScreen onDone={() => { sessionStorage.setItem("intro-done", "1"); setIntroDone(true); }} />}
      <CustomCursor />
      <Nav />
      <HybridScroll>
        <Panel col={GRID.home[0]} row={GRID.home[1]}>
          <Hero />
        </Panel>
        <Panel col={GRID.projects[0]} row={GRID.projects[1]}>
          <Projects />
        </Panel>
        <Panel col={GRID.playground[0]} row={GRID.playground[1]}>
          <InteractiveDiagram />
        </Panel>
        <Panel col={GRID.expertise[0]} row={GRID.expertise[1]}>
          <VerifiedExpertise />
        </Panel>
        <Panel col={GRID.whoami[0]} row={GRID.whoami[1]}>
          <WhoAmIFieldOpsStage />
        </Panel>
        <Panel col={GRID.contact[0]} row={GRID.contact[1]} transparent>
          <Footer />
        </Panel>
      </HybridScroll>
      <MiniMap />
    </>
  );
}
