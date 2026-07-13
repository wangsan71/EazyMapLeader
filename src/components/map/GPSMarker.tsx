import { useMemo } from 'react';
import { Marker } from 'react-map-gl/maplibre';

interface GPSMarkerProps {
  lat: number;
  lng: number;
  heading: number | null;
}

function drawMarker(heading: number | null): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;
  const cx = 32;
  const cy = 32;

  ctx.clearRect(0, 0, 64, 64);

  // glow
  ctx.beginPath();
  ctx.arc(cx, cy, 20, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(26, 115, 232, 0.12)';
  ctx.fill();

  // direction fan
  if (heading !== null && !isNaN(heading) && heading >= 0) {
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    const rad = ((heading - 90) * Math.PI) / 180;
    ctx.arc(cx, cy, 24, rad - 0.45, rad + 0.45);
    ctx.closePath();
    ctx.fillStyle = 'rgba(26, 115, 232, 0.25)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(26, 115, 232, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  // blue dot
  ctx.beginPath();
  ctx.arc(cx, cy, 9, 0, Math.PI * 2);
  ctx.fillStyle = '#1a73e8';
  ctx.fill();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 3;
  ctx.stroke();

  // center dot
  ctx.beginPath();
  ctx.arc(cx, cy, 3, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();

  return canvas;
}

export function GPSMarker({ lat, lng, heading }: GPSMarkerProps) {
  const canvas = useMemo(() => drawMarker(heading), [heading]);

  return (
    <Marker
      longitude={lng}
      latitude={lat}
      anchor="center"
      offset={[0, 0]}
    >
      <div
        style={{ width: 64, height: 64, pointerEvents: 'none' }}
        dangerouslySetInnerHTML={{ __html: canvas.outerHTML }}
      />
    </Marker>
  );
}
