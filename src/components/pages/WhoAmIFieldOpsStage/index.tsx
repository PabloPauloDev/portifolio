"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import { useTerminal } from "@/hooks/useTerminal";
import type { Scene, ShutdownPhase } from "./types";
import { CONTACT_IDX } from "./types";
import type { StackPhase } from "@/components/reusable/ExperienceBrick";
import { useShutdownSequence } from "./useShutdownSequence";
import { useBootSequence } from "./useBootSequence";
import { useStageScroll } from "./useStageScroll";
import { useScrollGuard } from "./useScrollGuard";
import { useBrickPhysics } from "./useBrickPhysics";
import WhoAmIScene from "./WhoAmIScene";
import FieldOpsScene from "./FieldOpsScene";
import BrickStack from "./BrickStack";
import StageOverlays from "./StageOverlays";

export default function WhoAmIFieldOpsStage() {
  const { cwd, lines, exec } = useTerminal();
  const [scene, setScene] = useState<Scene>("idle");
  const [stackPhase, setStackPhase] = useState<StackPhase>("initial");
  const [dropKey, setDropKey] = useState(0);
  const [bootKey, setBootKey] = useState(0);
  const [bootCount, setBootCount] = useState(0);
  const [rackVisible, setRackVisible] = useState(false);
  const [termReady, setTermReady] = useState(false);
  const [input, setInput] = useState("");
  const [shutdownPhase, setShutdownPhase] = useState<ShutdownPhase>("idle");
  const [shutdownCount, setShutdownCount] = useState(0);

  const prevIdx = useRef(-1);
  const currentIdxRef = useRef(-1);
  const sceneRef = useRef<Scene>("idle");
  const stackRef = useRef<StackPhase>("initial");
  const shutdownRef = useRef<ShutdownPhase>("idle");
  const isExiting = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  const goScene = useCallback((n: Scene) => { sceneRef.current = n; setScene(n); }, []);
  const goStack = useCallback((n: StackPhase) => { stackRef.current = n; setStackPhase(n); }, []);
  const goShutdown = useCallback((n: ShutdownPhase) => { shutdownRef.current = n; setShutdownPhase(n); }, []);

  const { cancelShutdown, startShutdown } = useShutdownSequence(goShutdown, setShutdownCount, setRackVisible, shutdownRef);
  const bootTimers = useBootSequence(scene, bootKey, setBootCount, setRackVisible, setTermReady);

  useStageScroll(prevIdx, currentIdxRef, sceneRef, shutdownRef, isExiting,
    goScene, goStack, goShutdown, cancelShutdown, startShutdown,
    setDropKey, setRackVisible, setTermReady, setBootKey, bootTimers);
  useScrollGuard(currentIdxRef, shutdownRef, isExiting, startShutdown);
  useBrickPhysics(stackPhase, sceneRef, goStack, setBootKey);

  useEffect(() => { if (termReady) { const t = setTimeout(() => setRackVisible(true), 150); return () => clearTimeout(t); } }, [termReady]);
  useEffect(() => { if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight; }, [bootCount, shutdownCount, lines]);
  useEffect(() => { if (termReady && scene === "fieldops" && shutdownPhase === "idle") inputRef.current?.focus(); }, [termReady, scene, shutdownPhase]);

  const handleSubmit = useCallback(() => { const cmd = input.trim(); if (cmd) exec(cmd); setInput(""); }, [input, exec]);
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { handleSubmit(); } else if (e.key === " ") { e.preventDefault(); e.stopPropagation(); setInput((p) => p + " "); }
  }, [handleSubmit]);

  const isDimmed = scene === "dimmed";
  const showWhoAmI = scene === "whoami" || scene === "idle";
  const showFieldOps = scene === "fieldops" || isDimmed;
  const showStack = stackPhase !== "initial";
  const showFloor = stackPhase === "resting" || stackPhase === "dropping";
  const isShuttingDown = shutdownPhase !== "idle" && shutdownPhase !== "done";

  const onGenieComplete = useCallback(() => {
    goShutdown("done");
    window.scrollTo(0, CONTACT_IDX * window.innerHeight);
  }, [goShutdown]);

  return (
    <LayoutGroup>
      <section className="relative w-full h-full overflow-hidden" style={{
        background: "#FFFDF1",
        backgroundImage: "linear-gradient(rgba(86,47,0,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(86,47,0,0.05) 1px,transparent 1px)",
        backgroundSize: "36px 36px",
      }}>
        <StageOverlays showFieldOps={showFieldOps} shutdownPhase={shutdownPhase} />
        <BrickStack stackPhase={stackPhase} dropKey={dropKey} showStack={showStack} showFloor={showFloor} />
        <AnimatePresence mode="wait">
          {showWhoAmI && <WhoAmIScene key="whoami" scene={scene} />}
          {showFieldOps && <FieldOpsScene key="fieldops" isDimmed={isDimmed} shutdownPhase={shutdownPhase}
            rackVisible={rackVisible} isShuttingDown={isShuttingDown} termReady={termReady} bootKey={bootKey}
            bootCount={bootCount} shutdownCount={shutdownCount} lines={lines} cwd={cwd} input={input}
            inputRef={inputRef} logRef={logRef} onInputChange={setInput} onKeyDown={handleKeyDown}
            onGenieComplete={onGenieComplete} />}
        </AnimatePresence>
      </section>
    </LayoutGroup>
  );
}
