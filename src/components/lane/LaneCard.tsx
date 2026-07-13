import React from 'react';
import { LaneIcon } from './LaneIcons';
import type { Road } from '../../types/roads';

interface LaneCardProps {
  road: Road | null;
  direction: 'forward' | 'backward';
}

export function LaneCard({ road, direction }: LaneCardProps) {
  if (!road) return null;

  const lanes =
    direction === 'forward'
      ? road.lanesForward || []
      : road.lanesBackward || [];
  const total = lanes.length;
  const dirText = direction === 'forward' ? '順向' : '反向';

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4 w-[90%] max-w-lg">
      <div className="font-semibold text-base mb-3 text-gray-800 flex items-center gap-2">
        <span className="truncate">{road.name}</span>
        <span className="text-xs text-gray-400 font-normal flex-shrink-0">
          {dirText} · {total} 車道
        </span>
      </div>

      {total === 0 ? (
        <div className="text-center text-gray-400 py-4 text-sm">
          此路段尚未設定車道
        </div>
      ) : (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {lanes.map((lane, i) => {
            const iconKey =
              lane.icon &&
              [
                'straight',
                'left',
                'right',
                'slight_left',
                'slight_right',
                'straight_left',
                'straight_right',
                'left_right',
                'straight_left_right',
                'u_turn',
                'uturn_left',
                'uturn_right',
                'merge_left',
                'merge_right',
              ].includes(lane.icon)
                ? lane.icon
                : 'straight';

            return (
              <div
                key={i}
                className="flex flex-col items-center bg-gray-50 rounded-xl p-3 min-w-[80px]"
              >
                <LaneIcon icon={iconKey} size={48} />
                <span className="text-xs text-gray-600 mt-1.5 text-center leading-tight">
                  {lane.label}
                </span>
                <span className="text-[10px] text-gray-400 mt-0.5">
                  第 {i + 1} 車道
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
