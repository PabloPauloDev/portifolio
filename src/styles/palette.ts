// ─── Semantic Design Tokens ───────────────────────────────────────────────────
// Single source of truth for every color in the portfolio.
// JS constants for Framer Motion / inline styles; CSS vars in globals.css.

// ── Core Triad ────────────────────────────────────────────────────────────────
export const primary    = "#562F00";
export const accent     = "#FF9644";
export const background = "#FFFDF1";

// Aliases consumers already know, remove later
export const rust  = primary;
export const amber = accent;
export const cream = background;

// ── Secondary ─────────────────────────────────────────────────────────────────
export const amberLight = "#FFB870";
export const paper      = "#FDFBF0";
export const gold       = "#D4A024";

// ── Terminal / Dark UI ────────────────────────────────────────────────────────
export const terminalBg    = "#0C0805";
export const terminalTitle = "#2E1A08";
export const rackFrame     = "#160E06";
export const rackScrew     = "#0A0603";

// ── Diagram Node Borders ──────────────────────────────────────────────────────
export const nodeEntry    = "#FF9644";
export const nodeCompute  = "#562F00";
export const nodeDatabase = "#8B6914";
export const nodeStorage  = "#C97A30";
export const nodeCache    = "#D4A024";
export const nodeQueue    = "#7A5C2E";
export const nodeCdn      = "#E88A3A";
export const nodeService  = "#6B4423";

// ── Job Accents ───────────────────────────────────────────────────────────────
export const awsOrange  = "#FF9900";
export const k8sBlue    = "#326CE5";
export const googleBlue = "#4285F4";

// ── Status ────────────────────────────────────────────────────────────────────
export const error  = "#FF5555";
export const sienna = "#A0522D";

// ── Opacity helpers (CSS variable references) ─────────────────────────────────
export const bgColor        = "var(--bg-color)";
export const textColor      = "var(--text-color)";
export const contactOverlay = "var(--contact-overlay)";

// ── Shadow presets ────────────────────────────────────────────────────────────
export const shadowMd  = "0 6px 24px rgba(86,47,0,0.07)";
export const shadowLg  = "0 24px 64px rgba(0,0,0,0.50), 0 6px 20px rgba(0,0,0,0.26)";
export const shadowXl  = "0 8px 40px rgba(0,0,0,0.45)";
export const glassCard = "rgba(255,253,241,0.7)";
