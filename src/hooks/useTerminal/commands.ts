import type { TermLine } from "./types";
import { APP_MAP, ROOT_DIRS } from "./filesystem";

const HELP_LINES: TermLine[] = [
  { type: "help", content: "╔══════════════════════════════════════╗" },
  { type: "help", content: "║     FIELD-OPS SYSTEM MANUAL         ║" },
  { type: "help", content: "╠══════════════════════════════════════╣" },
  { type: "help", content: "║  ls          list directories       ║" },
  { type: "help", content: "║  cd <dir>    enter a service dir    ║" },
  { type: "help", content: "║  cd ..       back to root           ║" },
  { type: "help", content: "║  cat <file>  read a config file     ║" },
  { type: "help", content: "║  clear       wipe the terminal      ║" },
  { type: "help", content: "║  help        show this manual       ║" },
  { type: "help", content: "╚══════════════════════════════════════╝" },
  { type: "help", content: "" },
  { type: "help", content: "Network topology:" },
  { type: "help", content: "  Internet → Cloudflare → Nginx :443" },
  { type: "help", content: "  Nginx proxy_pass → internal Docker network" },
  { type: "help", content: "  Each service has its own isolated container" },
  { type: "help", content: "  SSL termination at edge, plain HTTP inside" },
  { type: "help", content: "" },
  { type: "help", content: "Tip: cd into a folder, then cat docker-compose.yml" },
];

type Push = (...lines: TermLine[]) => void;
type SetCwd = (cwd: string) => void;

export function execCommand(
  input: string,
  cwd: string,
  push: Push,
  setCwd: SetCwd,
  clearLines: () => void,
): void {
  const parts = input.split(/\s+/);
  const cmd = parts[0];
  const arg = parts.slice(1).join(" ");

  if (cmd === "clear") { clearLines(); return; }

  if (cmd === "help") { push(...HELP_LINES); return; }

  if (cmd === "ls") {
    if (cwd === "/root") {
      push(...ROOT_DIRS.map((d): TermLine => ({ type: "dir", content: `${d}/` })));
    } else {
      const id = cwd.split("/").pop()!;
      if (APP_MAP.has(id)) push({ type: "text", content: "docker-compose.yml" });
      else push({ type: "error", content: "ls: cannot access directory" });
    }
    return;
  }

  if (cmd === "cd") {
    if (!arg || arg === "/" || arg === "~" || arg === "..") {
      setCwd("/root");
      push({ type: "text", content: "/root" });
      return;
    }
    const target = arg.replace(/\/$/, "");
    if (cwd === "/root" && ROOT_DIRS.includes(target)) {
      setCwd(`/root/${target}`);
      push({ type: "text", content: `/root/${target}` });
    } else {
      push({ type: "error", content: `cd: no such directory: ${arg}` });
    }
    return;
  }

  if (cmd === "cat") {
    const file = arg.replace(/^\.\//, "");
    if (file !== "docker-compose.yml") {
      push({ type: "error", content: `cat: ${arg}: No such file` });
      return;
    }
    const id = cwd.split("/").pop()!;
    const app = APP_MAP.get(id);
    if (!app) { push({ type: "error", content: "cat: not inside a service directory" }); return; }
    push(
      { type: "text", content: `# ${app.name}` },
      { type: "text", content: `# ${app.desc}` },
      { type: "text", content: "" },
      { type: "code", content: app.compose },
    );
    return;
  }

  push({ type: "error", content: `command not found: ${cmd}` });
}
