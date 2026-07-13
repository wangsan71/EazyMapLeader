# Agent Instructions

## Commands

- Install dependencies with `npm install` (the repository uses `package-lock.json`).
- Run the Vite dev server with `npm run dev`; it listens on port `5173` and enables LAN access.
- Run `npm run lint` for ESLint, `npx tsc --noEmit` for a focused typecheck, and `npm run build` for the production check (`tsc -b` followed by `vite build`).
- `npm test` starts Vitest in watch mode; use `npx vitest run` for a non-interactive run or pass a test path/pattern for focused tests.

## Application Wiring

- `src/main.tsx` mounts `src/App.tsx`; `NavigationProvider` owns route/planning state and `AppContent` composes all map and overlay UI.
- `src/components/map/MapView.tsx` owns the MapLibre map; map sources/layers and markers must remain rendered inside its map context.
- `src/services/` contains the external integrations: Nominatim geocoding, OSRM routing, and local LaneGo road data loading from `public/data/`.
- `src/hooks/` contains GPS, device orientation, road matching, routing, and navigation behavior; keep rendering components focused on presentation.

## Runtime Constraints

- The map uses the remote OpenFreeMap style, Nominatim search, and the public OSRM service, so browser testing requires network access and may encounter service throttling.
- `public/data/roads.json` and `public/data/lane_overrides.json` are runtime assets; reference them as `/data/<filename>`, not through `src` imports.
- TypeScript is strict, uses bundler module resolution, and supports the `@/*` alias for `src/*`; source files are the typecheck boundary (`tsconfig.json` includes `src`).
- `dist/` is generated output and is ignored; do not edit or review it as source.
