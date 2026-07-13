import { useState, useCallback } from 'react';
import type { OSRMRoute } from '../types/routing';
import { fetchRoute } from '../services/osrm';

export function useRouting() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [route, setRoute] = useState<OSRMRoute | null>(null);

  const calculateRoute = useCallback(
    async (
      originLng: number,
      originLat: number,
      destLng: number,
      destLat: number
    ) => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchRoute(originLng, originLat, destLng, destLat);
        if (data.code !== 'Ok' || !data.routes.length) {
          setError('找不到路線');
          setRoute(null);
          return null;
        }
        const best = data.routes[0];
        setRoute(best);
        return best;
      } catch (e) {
        const msg = e instanceof Error ? e.message : '路線規劃失敗';
        setError(msg);
        setRoute(null);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const clear = useCallback(() => {
    setRoute(null);
    setError(null);
  }, []);

  return { loading, error, route, calculateRoute, clear };
}
