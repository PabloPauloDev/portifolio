export interface TermLine {
  type: "prompt" | "text" | "error" | "code" | "help" | "dir";
  content: string;
}

export interface App {
  id:      string;
  name:    string;
  desc:    string;
  compose: string;
}
