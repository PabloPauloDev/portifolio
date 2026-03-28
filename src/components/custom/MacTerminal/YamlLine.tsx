"use client";

export default function YamlLine({ text }: { text: string }) {
  const kvMatch = text.match(/^(\s*)([\w-]+)(\s*:\s*)(.*)/);
  if (kvMatch) {
    const [, indent, key, sep, val] = kvMatch;
    return (
      <span>
        {indent}
        <span style={{ color: "#FF9644" }}>{key}</span>
        <span style={{ color: "rgba(86,47,0,0.45)" }}>{sep}</span>
        <span style={{ color: "#562F00" }}>{val}</span>
      </span>
    );
  }
  if (text.trimStart().startsWith("#")) {
    return <span style={{ color: "rgba(86,47,0,0.35)" }}>{text}</span>;
  }
  const listMatch = text.match(/^(\s*)(- )(.*)/);
  if (listMatch) {
    const [, indent, dash, rest] = listMatch;
    return (
      <span>
        {indent}
        <span style={{ color: "#FF9644" }}>{dash}</span>
        <span style={{ color: "#562F00" }}>{rest}</span>
      </span>
    );
  }
  return <span style={{ color: "#562F00" }}>{text}</span>;
}
