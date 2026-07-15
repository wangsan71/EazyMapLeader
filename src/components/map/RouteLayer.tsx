import React, { useMemo } from 'react';
import { Source, Layer } from 'react-map-gl/maplibre';
import type { OSRMRoute } from '../../types/routing';

interface RouteLayerProps {
  route: OSRMRoute | null;
  routes?: OSRMRoute[];
}

export function RouteLayer({ route, routes = [] }: RouteLayerProps) {
  const routeGeoJSON = useMemo(() => {
    if (!route) return null;

    return {
      type: 'FeatureCollection' as const,
      features: (routes.length ? routes : [route]).map((option) => ({
        type: 'Feature' as const,
        properties: { selected: option === route },
        geometry: option.geometry,
      })),
    };
  }, [route, routes]);

  if (!routeGeoJSON) return null;

  return (
    <Source id="route" type="geojson" data={routeGeoJSON}>
      <Layer
        id="route-alternatives"
        type="line"
        source="route"
        filter={['==', ['get', 'selected'], false]}
        paint={{
          'line-color': '#64748B',
          'line-width': 5,
          'line-opacity': 0.55,
        }}
      />
      <Layer
        id="route-outline"
        type="line"
        source="route"
        filter={['==', ['get', 'selected'], true]}
        paint={{
          'line-color': '#ffffff',
          'line-width': 10,
          'line-opacity': 0.55,
        }}
      />
      <Layer
        id="route-layer"
        type="line"
        source="route"
        filter={['==', ['get', 'selected'], true]}
        paint={{
          'line-color': '#7C3AED',
          'line-width': 6,
          'line-opacity': 0.9,
        }}
      />
    </Source>
  );
}
