import { useMotionValueEvent } from "framer-motion";
import { useHybridScroll } from "@/hooks/useHybridScroll";
import { SECTION_KEYS } from "@/hooks/useHybridScroll";
import { animateTheme } from "@/components/reusable/ThemeProvider";
import type { Scene, ShutdownPhase } from "./types";
import { WHO_AMI_IDX, FIELD_OPS_IDX, CONTACT_IDX } from "./types";
import type { StackPhase } from "@/components/reusable/ExperienceBrick";

const N = SECTION_KEYS.length;

export function useStageScroll(
  prevIdxRef: React.MutableRefObject<number>,
  currentIdxRef: React.MutableRefObject<number>,
  sceneRef: React.MutableRefObject<Scene>,
  shutdownRef: React.MutableRefObject<ShutdownPhase>,
  isExitingRef: React.MutableRefObject<boolean>,
  goScene: (s: Scene) => void,
  goStack: (s: StackPhase) => void,
  goShutdown: (s: ShutdownPhase) => void,
  cancelShutdown: () => void,
  startShutdown: () => void,
  setDropKey: React.Dispatch<React.SetStateAction<number>>,
  setRackVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setTermReady: React.Dispatch<React.SetStateAction<boolean>>,
  setBootKey: React.Dispatch<React.SetStateAction<number>>,
  bootTimersRef: React.MutableRefObject<ReturnType<typeof setTimeout>[]>,
) {
  const { scrollYProgress } = useHybridScroll();

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.round(v * (N - 1));
    const prev = prevIdxRef.current;
    currentIdxRef.current = idx;

    if (isExitingRef.current && idx !== CONTACT_IDX) {
      window.scrollTo(0, FIELD_OPS_IDX * window.innerHeight);
      return;
    }

    if (idx === WHO_AMI_IDX && prev !== WHO_AMI_IDX) {
      if (isExitingRef.current || shutdownRef.current !== "idle") {
        isExitingRef.current = false;
        cancelShutdown();
      }
      setDropKey((k) => k + 1);
      goStack("dropping");
      goScene("whoami");
      setRackVisible(false);
      setTermReady(false);
    } else if (idx === FIELD_OPS_IDX && prev === WHO_AMI_IDX) {
      goScene("fieldops");
      goStack("shattering");
    } else if (idx === WHO_AMI_IDX && prev === FIELD_OPS_IDX) {
      bootTimersRef.current.forEach(clearTimeout);
      bootTimersRef.current = [];
      if (isExitingRef.current || shutdownRef.current !== "idle") {
        isExitingRef.current = false;
        cancelShutdown();
      }
      goScene("whoami");
      setDropKey((k) => k + 1);
      goStack("dropping");
      setRackVisible(false);
      setTermReady(false);
    } else if (prev === FIELD_OPS_IDX && idx === CONTACT_IDX) {
      if (shutdownRef.current === "done") {
        cancelShutdown();
        isExitingRef.current = false;
        goScene("dimmed");
      } else if (isExitingRef.current || shutdownRef.current !== "idle") {
        window.scrollTo(0, FIELD_OPS_IDX * window.innerHeight);
        return;
      } else {
        isExitingRef.current = true;
        window.scrollTo(0, FIELD_OPS_IDX * window.innerHeight);
        startShutdown();
        prevIdxRef.current = FIELD_OPS_IDX;
        return;
      }
    } else if (idx === FIELD_OPS_IDX && prev === CONTACT_IDX) {
      cancelShutdown();
      setRackVisible(false);
      setTermReady(false);
      goStack("initial");
      goScene("fieldops");
      animateTheme("cream");
      bootTimersRef.current.push(setTimeout(() => setBootKey((k) => k + 1), 500));
    }

    prevIdxRef.current = idx;
  });
}
