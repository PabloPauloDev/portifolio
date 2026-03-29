"use client";
import { useEffect, useState } from "react";

/**
 * Returns false during SSR and the first render, then flips to true
 * after hydration. Use this to gate animations so Framer Motion sees
 * a fresh DOM mount instead of a pre-rendered element.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  return mounted;
}
