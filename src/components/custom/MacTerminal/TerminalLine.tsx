"use client";

import type { TermLine } from "@/hooks/useTerminal";
import YamlLine from "./YamlLine";

export default function TerminalLine({ line }: { line: TermLine }) {
  switch (line.type) {
    case "prompt":
      return <p className="font-mono" style={{ fontSize: 12, color: "#FF9644" }}>{line.content}</p>;
    case "error":
      return <p className="font-mono" style={{ fontSize: 12, color: "#A0522D" }}>{line.content}</p>;
    case "dir":
      return <p className="font-mono font-bold" style={{ fontSize: 12, color: "#FF9644" }}>{line.content}</p>;
    case "help":
      return <p className="font-hand" style={{ fontSize: 14, color: "#562F00", lineHeight: 1.55 }}>{line.content}</p>;
    case "code":
      return (
        <pre className="font-mono whitespace-pre leading-relaxed my-1" style={{ fontSize: 11, color: "#562F00" }}>
          {line.content.split("\n").map((l, i) => (
            <span key={i} className="block"><YamlLine text={l} /></span>
          ))}
        </pre>
      );
    default:
      return <p className="font-mono" style={{ fontSize: 12, color: "#562F00" }}>{line.content}</p>;
  }
}
