export interface Blade {
  id:       string;
  name:     string;
  port:     string;
  type:     string;
  role:     string;
  uptime:   string;
  deepDive: {
    lines: readonly string[];
    note:  string;
  };
}

export type BladeId = string;
