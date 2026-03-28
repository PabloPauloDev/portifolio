# Solutions Architect Portfolio

Next.js 16 + React 19 + Tailwind v4 + Framer Motion 12 portfolio site with a 2D HybridScroll engine.

## Quick Start

```bash
npm install
npm run dev          # http://localhost:3000
npm run storybook    # http://localhost:6006
npm run build        # production build
```

## Architecture

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout + ThemeProvider
│   ├── page.tsx                  # Home page (HybridScroll canvas)
│   └── projects/[id]/story/     # Dynamic story pages
├── styles/
│   └── globals.css               # Tailwind v4 @theme + semantic vars
├── hooks/
│   ├── useHybridScroll/          # 2D scroll engine + snap + context
│   └── useTerminal/              # Virtual terminal emulator
├── components/
│   ├── reusable/                 # Pure UI building blocks
│   │   ├── ExperienceBrick/      # Animated job card
│   │   ├── RackUnit/             # Server rack + blade rows
│   │   ├── DiagramPreview/       # Static SVG diagram
│   │   ├── ThemeProvider/        # Cream↔Rust theme
│   │   ├── Panel/                # Canvas grid cell
│   │   └── CustomCursor/         # Custom mouse cursor
│   ├── custom/                   # Domain-specific composites
│   │   ├── DiagramRenderer/      # Animated SVG diagram
│   │   ├── MorphingDiagramRenderer/  # Spring-morphing diagram
│   │   ├── DiagramEditor/        # JSON editor for diagrams
│   │   ├── InteractiveDiagram/   # Editor + renderer combo
│   │   ├── MacTerminal/          # Interactive terminal widget
│   │   ├── Scrollytelling/       # Story mode split-view
│   │   └── PageTransition/       # Route transition wrapper
│   └── pages/                    # Full page sections
│       ├── Hero/                 # Landing hero
│       ├── Projects/             # Project cards grid
│       ├── VerifiedExpertise/    # Certification cards
│       ├── WhoAmIFieldOpsStage/  # Bio + terminal (16 files)
│       ├── IntroScreen/          # Splash screen
│       ├── Footer/               # Contact footer
│       ├── Nav/                  # Top navigation
│       └── MiniMap/              # Camera position mini-map
├── data/                         # Static data (diagrams, certs, stories)
└── types/                        # Shared TypeScript types
```

## Design System

| Token     | Value     | Usage              |
|-----------|-----------|--------------------|
| `--rust`  | `#562F00` | Primary / text     |
| `--amber` | `#FF9644` | Accent / CTA       |
| `--cream` | `#FFFDF1` | Background         |

## 2D Scroll Grid

```
home [0,0] → projects [1,0] → playground [2,0]
                                      ↓
                                expertise [2,1]
                                      ↓
                             whoami/fieldops [2,2]
                                      ↓
                                  contact [2,3]
```

## Rules

- **100-line max** per file (hard limit)
- **Zero hardcoded colors** — use CSS vars or Tailwind tokens
- **Component encapsulation** — index.tsx + types/index.ts + stories + repository/
- **TypeScript strict** — no `any`, no `@ts-ignore`
