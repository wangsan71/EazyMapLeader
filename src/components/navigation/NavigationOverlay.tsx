import React, { useState } from 'react';
import { useNavigationContext } from '../../context/NavigationContext';
import { TurnList } from './TurnList';
import {
  formatDistance,
  formatDuration,
  getManeuverIconKey,
} from '../../utils/formatters';
import { LaneIcon } from '../lane/LaneIcons';

export function NavigationOverlay() {
  const { state: ctx } = useNavigationContext();
  const [showSteps, setShowSteps] = useState(false);

  if (ctx.state !== 'navigating' || !ctx.route || !ctx.route.legs[0]) {
    return null;
  }

  const steps = ctx.route.legs[0].steps;
  const currentStep = steps[ctx.currentStepIndex];
  const { remainingDistance, remainingDuration } = ctx;

  return (
    <>
      {/* Top bar - current instruction */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-11 h-11 flex items-center justify-center">
              {(() => {
                const t = currentStep?.maneuver.type;
                const m = currentStep?.maneuver.modifier;
                const key = currentStep ? getManeuverIconKey(t!, m) : 'straight';
                if (key) return <LaneIcon icon={key} size={44} />;
                return (
                  <span className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-lg">
                    {t === 'arrive' ? '🏁' : t === 'depart' ? '🚗' : '🔄'}
                  </span>
                );
              })()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-lg truncate">
                {currentStep
                  ? currentStep.name || currentStep.maneuver.modifier || '直行'
                  : '計算中...'}
              </div>
              <div className="text-sm text-gray-600">
                {currentStep ? formatDistance(currentStep.distance) : ''}
                {remainingDistance > 0 &&
                  ` · 剩餘 ${formatDistance(remainingDistance)}`}
              </div>
            </div>
            <button
              onClick={() => setShowSteps(!showSteps)}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              {showSteps ? '▼' : '▲'}
            </button>
          </div>
        </div>
      </div>

      {/* Steps list */}
      {showSteps && (
        <div className="absolute top-28 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-10 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4">
          <TurnList steps={steps} currentStepIndex={ctx.currentStepIndex} />
        </div>
      )}

      {/* Bottom bar - summary */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <div className="flex items-center gap-4 bg-black/75 backdrop-blur-sm text-white px-5 py-2.5 rounded-full text-sm">
          <span>{formatDistance(remainingDistance)}</span>
          <span className="text-gray-400">|</span>
          <span>{formatDuration(remainingDuration)}</span>
        </div>
      </div>
    </>
  );
}
