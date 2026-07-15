# Agent Instructions

## Commands

- Install dependencies with `npm install` (the repository uses `package-lock.json`).
- Run the Vite dev server with `npm run dev`; it targets port `5173` with LAN access (`server.host: true`), and falls back to the next free port (e.g. `5174`) if `5173` is taken.
- Run `npm run lint` for ESLint, `npx tsc --noEmit` for a focused typecheck, and `npm run build` for the production check (`tsc -b` followed by `vite build`).
- `npm test` starts Vitest in watch mode; use `npx vitest run` for a non-interactive run or pass a test path/pattern for focused tests.

## Application Wiring

- `src/main.tsx` mounts `src/App.tsx`; `NavigationProvider` owns route/planning state and `AppContent` composes all map and overlay UI.
- `src/components/map/MapView.tsx` owns the MapLibre map; map sources/layers and markers must remain rendered inside its map context.
- `src/services/` contains the external integrations: Nominatim geocoding, OSRM routing, and local LaneGo road data loading from `public/data/`.
- `src/hooks/` contains GPS, device orientation, road matching, routing, and navigation behavior; keep rendering components focused on presentation.

## Build and Styling

- Vite config sets `base: '/EazyMapLeader/'`, so `npm run build` and `npm run preview` expect assets under that subpath. `npm run dev` serves at root (`/`), so asset URLs work differently between dev and prod/preview.
- Tailwind CSS (v3) is the styling system; component styling should use Tailwind utility classes. The `index.css` entrypoint includes `@tailwind base/components/utilities`.

## Runtime Constraints

- The map uses the remote OpenFreeMap style, Nominatim search, and the public OSRM service, so browser testing requires network access and may encounter service throttling.
- The map defaults to Macau coordinates (`[113.5439, 22.1987]` at zoom 13).
- `public/data/roads.json` and `public/data/lane_overrides.json` are runtime assets; reference them as `/data/<filename>`, not through `src` imports.
- TypeScript is strict, uses bundler module resolution, and supports the `@/*` alias for `src/*`; source files are the typecheck boundary (`tsconfig.json` includes `src`).
- `dist/` is generated output and is ignored; do not edit or review it as source.
- Map components use `react-map-gl/maplibre` v7, not vanilla `maplibre-gl`, to render inside React.

## Testing

- Existing tests are pure-function suites under `src/utils/` (`geo`, `lanes`, `formatters`) using `.test.ts`; place new tests alongside their source.
- `vite.config.ts` has no Vitest block, so tests run in the default node environment. `jsdom` and `@testing-library/react` are installed but not wired up—component tests need a `test.environment: 'jsdom'` config (and setup file) added first.
- Prettier is a dev dependency with no config file; formatting follows its defaults.
