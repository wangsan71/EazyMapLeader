# EazyMapLeader

EazyMapLeader is a browser-based navigation map for Macau. It combines an OpenStreetMap-based map, Nominatim place search, OSRM driving routes, GPS navigation, device orientation, and local LaneGo lane guidance data.

## Features

- Search locations and select origins or destinations directly on the map
- Auto-use the current GPS position as the origin when only a destination is chosen
- Display driving routes with turn-by-turn instructions using LaneGo turn icons
- Head-up navigation: the map tilts and rotates to follow the direction of travel
- Follow the current GPS position during navigation, with a one-tap cancel control in the trip summary bar
- Show current road and lane guidance (LaneGo icon set) when local road data matches the GPS position
- Responsive, full-screen layout for desktop and mobile browsers, including safe-area support for notched devices

## Development

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

The Vite server listens on `http://localhost:5173` and is exposed to the local network.

Useful checks:

```bash
npm run lint
npx tsc --noEmit
npm run build
npx vitest run
```

## Data and Services

- Map style: [OpenFreeMap](https://openfreemap.org/)
- Map data and geocoding: [OpenStreetMap](https://www.openstreetmap.org/) and [Nominatim](https://nominatim.openstreetmap.org/)
- Routing: [OSRM](https://project-osrm.org/) public routing service
- Lane guidance: local data in `public/data/roads.json` and `public/data/lane_overrides.json`

The external services are public services and may be unavailable or rate-limited. Browser testing requires network access and location permission for GPS features.

## License

This project is released under the [MIT License](LICENSE).

The map, geocoding, routing, and road data remain subject to their respective third-party licenses and terms of use.
