"use client";

const DEBRIS_LABELS = [
  "AWS Architect", "K8s Admin", "Solutions Arch.", "Terraform Assoc.",
  "GCP Architect", "Event-Driven", "FinTech Platform",
];

export default function DebrisBricks() {
  return (
    <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 pb-2 px-12 pointer-events-none overflow-hidden"
      style={{ height: 52 }}>
      {DEBRIS_LABELS.map((label, i) => (
        <div key={label} className="flex-shrink-0 rounded px-2 py-[3px] self-end"
          style={{
            border: "1px solid rgba(255,253,241,0.12)",
            transform: `rotate(${((i * 3 + 1) % 7) - 3}deg) translateY(${(i % 3) * 5}px)`,
            fontSize: 8, fontFamily: "var(--font-mono)", color: "rgba(255,253,241,0.18)", whiteSpace: "nowrap",
          }}>
          {label}
        </div>
      ))}
    </div>
  );
}
