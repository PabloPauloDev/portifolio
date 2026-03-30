"use client";
import { useSyncExternalStore } from "react";

/**
 * Returns false during SSR and the first render, then flips to true
 * after hydration. Use this to gate animations so Framer Motion sees
 * a fresh DOM mount instead of a pre-rendered element.
 */
const subscribe = () => () => {};
export function useMounted(): boolean {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
