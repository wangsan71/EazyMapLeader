import { useState, useCallback } from 'react';
import type { Road, RoadMatch } from '../types/roads';
import { findNearestRoad, getDirection, roadBearing } from '../utils/lanes';
import { getRoads } from '../services/roads';

const MAX_DISTANCE = 120;

export function useRoadMatching() {
  const [match, setMatch] = useState<RoadMatch | null>(null);
  const [currentRoad, setCurrentRoad] = useState<Road | null>(null);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  const update = useCallback(
    (
      lat: number,
      lng: number,
      gpsHeading: number | null,
      deviceHeading: number | null
    ) => {
      const roads = getRoads();
      if (roads.length === 0) {
        setMatch(null);
        setCurrentRoad(null);
        return;
      }

      const nearest = findNearestRoad(lat, lng, roads);
      if (!nearest || nearest.distance > MAX_DISTANCE) {
        setMatch(null);
        setCurrentRoad(null);
        return;
      }

      let effectiveHeading: number;

      if (gpsHeading !== null && !isNaN(gpsHeading) && gpsHeading >= 0) {
        effectiveHeading = gpsHeading;
      } else if (deviceHeading !== null && !isNaN(deviceHeading)) {
        effectiveHeading = deviceHeading;
      } else {
        effectiveHeading = roadBearing(nearest.road);
      }

      // For one-way roads there is only a forward lane set; always show it
      // regardless of the computed heading (avoids blank "backward" cards).
      const dir = nearest.road.oneway
        ? 'forward'
        : getDirection(nearest, effectiveHeading);

      setMatch(nearest);
      setCurrentRoad(nearest.road);
      setDirection(dir);
    },
    []
  );

  return { match, currentRoad, direction, update };
}
