# Copilot Instructions — Portfolio Architecture

## Hard Rules

1. **100-line max per file** — no exceptions. If a new component or edit would push a file over 100 lines, split it immediately.
2. **Semantic colors only** — never hardcode hex values. Use CSS variables (`var(--rust)`, `var(--amber)`, `var(--cream)`) or Tailwind semantic tokens (`text-rust`, `bg-amber`).
3. **Component encapsulation** — every component directory must contain:
   - `index.tsx` (component entry point)
   - `types/index.ts` (if it has props interfaces or complex types)
   - `*.stories.tsx` (Storybook story for visual testing)
   - `repository/` with `data.json` + `schema.ts` (Zod) for static data blobs
4. **Import convention** — always use `@/` path aliases, never relative `../../../`.
5. **Folder hierarchy**:
   - `src/components/reusable/` — pure UI, no business logic, no page-specific deps
   - `src/components/custom/` — domain-specific composites (diagrams, terminal, scrollytelling)
   - `src/components/pages/` — full page sections tied to HybridScroll grid positions
6. **No dead code** — unused components, imports, or variables must be removed.
7. **Framer Motion** — use `motion.div` for animations. Keep animation config near the component.
8. **TypeScript strict** — no `any`, no `@ts-ignore`. All props typed with interfaces.

## Architecture

- **HybridScroll** (`src/hooks/useHybridScroll/`) — 2D canvas engine, 7 sections on a 400vw×400vh grid
- **ThemeProvider** — `cream ↔ rust` animated theme transition via `motionValue`
- **Tailwind v4** — `@theme inline` in `src/styles/globals.css`, no `tailwind.config.ts`
- **Next.js 16 App Router** — read `node_modules/next/dist/docs/` for API guidance

## Common Patterns

- Extract sub-components when a file approaches 80 lines
- Use `useCallback` / `useMemo` for handlers passed as props
- Repository pattern: `blades.json` → Zod schema → typed export
