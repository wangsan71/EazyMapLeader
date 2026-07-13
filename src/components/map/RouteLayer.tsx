import React, { useMemo } from 'react';
import { Source, Layer } from 'react-map-gl/maplibre';
import type { OSRMRoute } from '../../types/routing';

interface RouteLayerProps {
  route: OSRMRoute | null;
}

export function RouteLayer({ route }: RouteLayerProps) {
  const routeGeoJSON = useMemo(() => {
    if (!route) return null;

    return {
      type: 'FeatureCollection' as const,
      features: [
        {
          type: 'Feature' as const,
          properties: {},
          geometry: route.geometry,
        },
      ],
    };
  }, [route]);

  if (!routeGeoJSON) return null;

  return (
    <Source id="route" type="geojson" data={routeGeoJSON}>
      <Layer
        id="route-layer"
        type="line"
        source="route"
        paint={{
          'line-color': '#7C3AED',
          'line-width': 6,
          'line-opacity': 0.9,
        }}
      />
      <Layer
        id="route-outline"
        type="line"
        source="route"
        paint={{
          'line-color': '#ffffff',
          'line-width': 10,
          'line-opacity': 0.4,
        }}
        beforeId="route-layer"
      />
    </Source>
  );
}
