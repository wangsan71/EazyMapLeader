import React from 'react';
import type { OSRMRoute } from '../../types/routing';
import { formatDistance, formatDuration } from '../../utils/formatters';

interface RoutePanelProps {
  route: OSRMRoute;
  onStartNavigation: () => void;
  onCancel: () => void;
}

export function RoutePanel({ route, onStartNavigation, onCancel }: RoutePanelProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 w-[calc(100vw-2rem)] max-w-sm">
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <h3 className="font-semibold text-base sm:text-lg">路線資訊</h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 text-xl leading-none"
        >
          ×
        </button>
      </div>

      <div className="flex justify-around mb-3 sm:mb-4 py-2 sm:py-3 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-xl sm:text-2xl font-bold text-blue-600">
            {formatDistance(route.distance)}
          </div>
          <div className="text-xs text-gray-500 mt-1">距離</div>
        </div>
        <div className="text-center">
          <div className="text-xl sm:text-2xl font-bold text-blue-600">
            {formatDuration(route.duration)}
          </div>
          <div className="text-xs text-gray-500 mt-1">預計時間</div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onStartNavigation}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-lg transition-colors"
        >
          開始導航
        </button>
        <button
          onClick={onCancel}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium py-2 rounded-lg transition-colors"
        >
          取消
        </button>
      </div>
    </div>
  );
}
