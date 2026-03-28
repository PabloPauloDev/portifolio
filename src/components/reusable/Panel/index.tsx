"use client";

import { ReactNode } from "react";

export default function Panel({
  col, row, transparent = false, children,
}: {
  col: number;
  row: number;
  transparent?: boolean;
  children: ReactNode;
}) {
  return (
    <div style={{
      position: "absolute",
      left: `${col * 100}vw`,
      top: `${row * 100}vh`,
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
      ...(transparent ? {} : {}),
    }}>
      {children}
    </div>
  );
}
