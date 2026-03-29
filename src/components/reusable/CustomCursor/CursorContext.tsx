"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type CursorType = "default" | "link-hover" | "button-hover";

export interface TargetSize {
  width: number;
  height: number;
  borderRadius: number;
  centerX: number;
  centerY: number;
}

const DEFAULT_TARGET: TargetSize = {
  width: 20, height: 20, borderRadius: 10, centerX: -100, centerY: -100,
};

interface CursorCtxType {
  cursorType: CursorType;
  targetSize: TargetSize;
  setCursorLinkHovered: (active: boolean) => void;
  setCursorButtonHovered: (el: Element | null) => void;
}

const Ctx = createContext<CursorCtxType>({
  cursorType: "default",
  targetSize: DEFAULT_TARGET,
  setCursorLinkHovered: () => {},
  setCursorButtonHovered: () => {},
});

export function CursorProvider({ children }: { children: ReactNode }) {
  const [cursorType, setCursorType] = useState<CursorType>("default");
  const [targetSize, setTargetSize] = useState<TargetSize>(DEFAULT_TARGET);

  const setCursorLinkHovered = useCallback((active: boolean) => {
    setCursorType(active ? "link-hover" : "default");
    setTargetSize(DEFAULT_TARGET);
  }, []);

  const setCursorButtonHovered = useCallback((el: Element | null) => {
    if (!el) { setCursorType("default"); setTargetSize(DEFAULT_TARGET); return; }
    const rect = el.getBoundingClientRect();
    const br = parseFloat(window.getComputedStyle(el).borderRadius) || 8;
    setCursorType("button-hover");
    setTargetSize({
      width: rect.width, height: rect.height, borderRadius: br,
      centerX: rect.left + rect.width / 2,
      centerY: rect.top + rect.height / 2,
    });
  }, []);

  return (
    <Ctx.Provider value={{ cursorType, targetSize, setCursorLinkHovered, setCursorButtonHovered }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCursor() { return useContext(Ctx); }
