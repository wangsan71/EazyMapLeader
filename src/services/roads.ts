import type { Road } from '../types/roads';

let roadDatabase: Road[] = [];
let isLoaded = false;

export async function loadRoads(
  dataUrl: string = '/data/roads.json'
): Promise<Road[]> {
  if (isLoaded) return roadDatabase;

  try {
    const res = await fetch(dataUrl);
    if (!res.ok) {
      console.warn(`Failed to load roads from ${dataUrl}: ${res.status}`);
      return [];
    }
    roadDatabase = await res.json();
    isLoaded = true;
    return roadDatabase;
  } catch (e) {
    console.warn('Failed to load road data:', e);
    return [];
  }
}

export function getRoads(): Road[] {
  return roadDatabase;
}

export function hasRoads(): boolean {
  return isLoaded && roadDatabase.length > 0;
}

export function clearRoads(): void {
  roadDatabase = [];
  isLoaded = false;
}
