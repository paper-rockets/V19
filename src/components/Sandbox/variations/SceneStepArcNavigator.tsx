/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { NavVariationProps } from '../types';
import { playHapticSound } from '../../../utils/audio';

/**
 * Concept 6: SCENE Step & Dynamic Arc Meter (exec-9dfeaac6.png)
 * - Resting: Dome puck with SCENE label, dome icon, and horizon bar
 * - Active: Center crosshair + SCENE button, + / — step zoom, < > pan, dynamic glowing blue arc meter
 */
export const SceneStepArcNavigator: React.FC<NavVariationProps> = ({
  state,
  onChange,
  onReset,
  theme,
  soundEnabled = true,
  isResting: controlledResting,
  onToggleResting,
  displayMode = 'expanded',
}) => {
  const [internalResting, setInternalResting] = useState(false);
  const isResting = controlledResting !== undefined ? controlledResting : internalResting;
  const toggleResting = onToggleResting || (() => setInternalResting((p) => !p));

  const [isDraggingCenter, setIsDraggingCenter] = useState(false);
  const lastPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Calculate arc fill for current scale/zoom (scale ranges from 0.1 to 5.0)
  const normScale = Math.min(1, Math.max(0, (state.scale - 0.5) / 2.5));
  // Arc spans 60 degrees on right side
  const startAngle = -30 * (Math.PI / 180);
  const currentArcAngle = startAngle + normScale * (60 * (Math.PI / 180));
  const arcRadius = 110;
  const arcX = 115 + Math.cos(currentArcAngle) * arcRadius;
  const arcY = 115 + Math.sin(currentArcAngle) * arcRadius;

  // Center button drag handlers
  const handleCenterDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    setIsDraggingCenter(true);
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    playHapticSound('click', soundEnabled);
  };

  const handleCenterMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingCenter) return;
    e.preventDefault();
    const dx = e.clientX - lastPosRef.current.x;
    const dy = e.clientY - lastPosRef.current.y;
    lastPosRef.current = { x: e.clientX, y: e.clientY };

    onChange((prev) => ({
      ...prev,
      yaw: (prev.yaw + dx * 0.85) % 360,
      pitch: Math.max(-85, Math.min(85, prev.pitch - dy * 0.85)),
      activeGesture: 'Scene Orbit',
    }));
  };

  const handleCenterUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingCenter) {
      setIsDraggingCenter(false);
      onChange((prev) => ({ ...prev, activeGesture: null }));
      playHapticSound('pop', soundEnabled);
    }
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  // Step Zoom In (+)
  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    playHapticSound('click', soundEnabled);
    onChange((prev) => ({
      ...prev,
      scale: Math.min(4.0, prev.scale + 0.2),
      activeGesture: 'Step Zoom In (+)',
    }));
  };

  // Step Zoom Out (—)
  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    playHapticSound('click', soundEnabled);
    onChange((prev) => ({
      ...prev,
      scale: Math.max(0.3, prev.scale - 0.2),
      activeGesture: 'Step Zoom Out (—)',
    }));
  };

  // Step Pan Left/Right (< >)
  const handlePanStep = (dir: 'left' | 'right') => {
    playHapticSound('tick', soundEnabled);
    onChange((prev) => ({
      ...prev,
      x: prev.x + (dir === 'left' ? -20 : 20),
      activeGesture: `Pan Step ${dir.toUpperCase()}`,
    }));
  };

  // Resting Puck View
  const renderRestingPuck = () => (
    <div className="flex flex-col items-center select-none touch-none">
      <div
        onClick={toggleResting}
        title="Tap to expand active scene controller"
        className="w-[76px] h-[76px] rounded-full cursor-pointer flex flex-col items-center justify-center relative shadow-[0_12px_28px_rgba(0,0,0,0.7)] border-2 border-neutral-700 bg-gradient-to-b from-[#282b35] via-[#1c1e25] to-[#111216] active:scale-95 transition-transform touch-none"
      >
        {/* Dome Arc Icon */}
        <div className="w-5 h-2.5 rounded-t-full border-t border-x border-neutral-400 opacity-60 pointer-events-none" />
        {/* SCENE Text */}
        <span className="font-mono text-[9px] font-bold tracking-widest uppercase text-neutral-200 mt-1 pointer-events-none">
          SCENE
        </span>
      </div>
      <span className="mt-3 font-mono text-[10px] uppercase tracking-widest text-neutral-400">Resting</span>
    </div>
  );

  // Active Multi-Control Dial View
  const renderActiveDial = () => (
    <div
      className="relative flex flex-col items-center select-none touch-none"
      style={{ touchAction: 'none' }}
    >
      {/* Outer Dial Container */}
      <div className="relative w-[230px] h-[230px] rounded-full flex items-center justify-center border-2 border-neutral-700/80 bg-gradient-to-b from-[#1c1e25] to-[#101115] shadow-[0_16px_36px_rgba(0,0,0,0.8)] touch-none">
        {/* Dynamic Zoom Arc Meter SVG on right */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 230 230">
          {/* Background meter track */}
          <path
            d="M 210 59 A 110 110 0 0 1 210 171"
            fill="none"
            stroke="#334155"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Active bright blue arc meter */}
          <path
            d={`M 210 59 A 110 110 0 0 1 ${arcX} ${arcY}`}
            fill="none"
            stroke="#38bdf8"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="filter drop-shadow-[0_0_8px_#38bdf8]"
          />
        </svg>

        {/* Top Control: Plus (+) */}
        <button
          onClick={handleZoomIn}
          title="Zoom In"
          className="absolute top-1 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center text-lg font-bold text-neutral-300 hover:text-white hover:bg-white/10 active:scale-90 transition-all cursor-pointer touch-none"
        >
          +
        </button>

        {/* Bottom Control: Minus (—) */}
        <button
          onClick={handleZoomOut}
          title="Zoom Out"
          className="absolute bottom-1 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center text-lg font-bold text-neutral-300 hover:text-white hover:bg-white/10 active:scale-90 transition-all cursor-pointer touch-none"
        >
          —
        </button>

        {/* Left Control: Pan Step (< >) */}
        <div className="absolute left-1 flex items-center gap-0.5">
          <button
            onClick={() => handlePanStep('left')}
            className="min-w-[28px] min-h-[44px] flex items-center justify-center text-sm font-bold text-neutral-400 hover:text-white active:scale-90 cursor-pointer touch-none"
          >
            ‹
          </button>
          <button
            onClick={() => handlePanStep('right')}
            className="min-w-[28px] min-h-[44px] flex items-center justify-center text-sm font-bold text-neutral-400 hover:text-white active:scale-90 cursor-pointer touch-none"
          >
            ›
          </button>
        </div>

        {/* Right Control: Depth Meter Indicator */}
        <div className="absolute right-3.5 flex items-center text-xs text-sky-400 font-mono pointer-events-none">
          ‹ ›
        </div>

        {/* Inner Physical SCENE Center Button */}
        <div
          onPointerDown={handleCenterDown}
          onPointerMove={handleCenterMove}
          onPointerUp={handleCenterUp}
          onPointerCancel={handleCenterUp}
          className="relative z-20 w-[108px] h-[108px] rounded-full cursor-grab active:cursor-grabbing flex flex-col items-center justify-center border-2 border-neutral-600 shadow-[0_10px_24px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.25)] bg-gradient-to-b from-[#2e323e] via-[#1d2028] to-[#111317] transition-transform active:scale-95 touch-none"
        >
          {/* 4 Crosshair Dots */}
          <div className="relative w-5 h-5 flex items-center justify-center mb-1 pointer-events-none">
            <div className="absolute -top-1.5 w-1 h-1 rounded-full bg-neutral-400" />
            <div className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-neutral-400" />
            <div className="absolute -left-1.5 w-1 h-1 rounded-full bg-neutral-400" />
            <div className="absolute -right-1.5 w-1 h-1 rounded-full bg-neutral-400" />
            <div className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_6px_#38bdf8]" />
          </div>

          {/* Dome Icon */}
          <div className="w-5 h-2 rounded-t-full border-t border-x border-neutral-400 opacity-60 pointer-events-none" />

          {/* SCENE Text */}
          <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-neutral-200 mt-1 pointer-events-none">
            SCENE
          </span>
        </div>
      </div>

      <div className="mt-4 font-mono text-[10px] tracking-widest uppercase opacity-70">Active</div>
    </div>
  );

  // Side-by-side mode matching Image 6
  if (displayMode === 'side-by-side') {
    return (
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24 py-4 select-none">
        <div className="flex flex-col items-center">
          {renderRestingPuck()}
        </div>
        <div className="hidden md:block w-px h-64 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        <div className="flex flex-col items-center">
          {renderActiveDial()}
        </div>
      </div>
    );
  }

  return isResting ? renderRestingPuck() : renderActiveDial();
};
