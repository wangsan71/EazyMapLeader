export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)}m`;
  }
  return `${(meters / 1000).toFixed(1)}km`;
}

export function formatDuration(seconds: number): string {
  const mins = Math.round(seconds / 60);
  if (mins < 60) {
    return `${mins} 分鐘`;
  }
  const hrs = Math.floor(mins / 60);
  const remain = mins % 60;
  return remain > 0 ? `${hrs} 小時 ${remain} 分鐘` : `${hrs} 小時`;
}

export function formatSpeed(mps: number): string {
  const kmh = mps * 3.6;
  return `${Math.round(kmh)} km/h`;
}

export function getManeuverText(type: string, modifier?: string): string {
  const modifiers: Record<string, string> = {
    uturn: '迴轉',
    'sharp right': '急右轉',
    right: '右轉',
    'slight right': '靠右',
    straight: '直行',
    'slight left': '靠左',
    left: '左轉',
    'sharp left': '急左轉',
  };

  if (type === 'roundabout' || type === 'rotary') {
    return '進入圓環';
  }
  if (type === 'arrive') {
    return '到達目的地';
  }
  if (type === 'depart') {
    return '出發';
  }
  if (modifier) {
    return modifiers[modifier] || modifier;
  }
  if (type === 'turn' && modifier) {
    return modifiers[modifier] || '轉彎';
  }
  if (type === 'new name') {
    return '繼續直行';
  }
  if (type === 'continue') {
    return '繼續';
  }
  return type;
}

export function getManeuverIcon(
  type: string,
  modifier?: string
): string {
  if (type === 'arrive') return '🏁';
  if (type === 'depart') return '🚗';
  if (type === 'roundabout' || type === 'rotary') return '🔄';

  const icons: Record<string, string> = {
    uturn: '↩',
    'sharp right': '↪',
    right: '↪',
    'slight right': '↗',
    straight: '↑',
    'slight left': '↖',
    left: '↩',
    'sharp left': '↖',
  };

  return modifier ? icons[modifier] || '→' : '→';
}

/**
 * Map an OSRM maneuver (type + modifier) to a LaneGo icon key so navigation
 * turn arrows match the lane-guidance icon set instead of a generic arrow.
 * Returns null for maneuvers that should render a non-SVG glyph
 * (arrive/depart/roundabout).
 */
export function getManeuverIconKey(
  type: string,
  modifier?: string
): string | null {
  if (type === 'arrive' || type === 'depart') return null;
  if (type === 'roundabout' || type === 'rotary') return null;

  const map: Record<string, string> = {
    uturn: 'u_turn',
    'sharp right': 'right',
    right: 'right',
    'slight right': 'slight_right',
    straight: 'straight',
    'slight left': 'slight_left',
    left: 'left',
    'sharp left': 'left',
  };

  if (modifier && map[modifier]) return map[modifier];
  if (type === 'continue' || type === 'new name' || type === 'depart') {
    return 'straight';
  }
  return 'straight';
}
