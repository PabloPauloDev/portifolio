import { useCallback, useRef } from "react";
import type { ShutdownPhase } from "./types";
import { SHUTDOWN_DELAYS } from "./constants";
import { animateTheme } from "@/components/reusable/ThemeProvider";

export function useShutdownSequence(
  goShutdown: (p: ShutdownPhase) => void,
  setShutdownCount: React.Dispatch<React.SetStateAction<number>>,
  setRackVisible: React.Dispatch<React.SetStateAction<boolean>>,
  shutdownRef: React.RefObject<ShutdownPhase>,
) {
  const shutdownTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const cancelShutdown = useCallback(() => {
    shutdownTimers.current.forEach(clearTimeout);
    shutdownTimers.current = [];
    shutdownRef.current = "idle";
    goShutdown("idle");
    setShutdownCount(0);
  }, [goShutdown, setShutdownCount, shutdownRef]);

  const startShutdown = useCallback(() => {
    shutdownTimers.current.forEach(clearTimeout);
    shutdownTimers.current = [];
    goShutdown("killing");
    setShutdownCount(0);
    setRackVisible(false);

    SHUTDOWN_DELAYS.forEach((delay, i) => {
      shutdownTimers.current.push(setTimeout(() => setShutdownCount(i + 1), delay));
    });

    const collapseAt = SHUTDOWN_DELAYS[SHUTDOWN_DELAYS.length - 1] + 500;
    shutdownTimers.current.push(setTimeout(() => goShutdown("collapsing"), collapseAt));
    shutdownTimers.current.push(setTimeout(() => {
      goShutdown("minimizing");
      animateTheme("rust");
    }, collapseAt + 650));
  }, [goShutdown, setShutdownCount, setRackVisible]);

  return { cancelShutdown, startShutdown };
}
