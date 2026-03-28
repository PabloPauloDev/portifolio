"use client";

export default function RackEar() {
  return (
    <div
      className="flex-shrink-0 flex flex-col items-center justify-center gap-1.5"
      style={{
        width: 18,
        alignSelf: "stretch",
        background: "#160E06",
        borderRight: "1px solid rgba(86,47,0,0.22)",
        borderLeft: "1px solid rgba(86,47,0,0.22)",
      }}
    >
      <div className="w-[7px] h-[7px] rounded-full"
        style={{ background: "#0A0603", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.6)" }} />
      <div className="w-[7px] h-[7px] rounded-full"
        style={{ background: "#0A0603", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.6)" }} />
    </div>
  );
}
