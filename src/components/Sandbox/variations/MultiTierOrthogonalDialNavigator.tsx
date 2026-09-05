/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { NavVariationProps } from '../types';

/**
 * Concept: Multi-Tier Orthogonal Axis Dial (exec-2add514a.png)
 * - Concentric stepped dial with cardinal axis markers (X X, Y Y, Z Z)
 * - Illuminated cyan sector badge highlighting the active primary plane
 * - Brushed metallic center dome button for tactile free orbit
 * - Companion satellite buttons: Isometric cube snap button & overflow action
 * - Resting: Mini puck with X, Y, Z axis crosses and isometric cube snap
 */
export const MultiTierOrthogonalDialNavigator: React.FC<NavVariationProps> = ({
  state,
  onChange,
  onReset,
  isResting: controlledResting,
  onToggleResting,
  displayMode = 'expanded',
}) => {
  const [internalResting, setInternalResting] = useState(false);
  const isResting = controlledResting !== undefined ? controlledResting : internalResting;
  const toggleResting = onToggleResting || (() => setInternalResting((p) => !p));

  const [activeAxis, setActiveAxis] = useState<'X' | 'Y' | 'Z'>('Y');
  const [isDraggingCenter, setIsDraggingCenter] = useState(false);
  const lastPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleCenterPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    setIsDraggingCenter(true);
  };

  const handleCenterPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingCenter) return;
    const dx = e.clientX - lastPosRef.current.x;
    const dy = e.clientY - lastPosRef.current.y;
    lastPosRef.current = { x: e.clientX, y: e.clientY };

    onChange((prev) => ({
      ...prev,
      yaw: prev.yaw + dx * 0.75,
      pitch: Math.max(-85, Math.min(85, prev.pitch + dy * 0.75)),
    }));
  };

  const handleCenterPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingCenter) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch (_) {}
      setIsDraggingCenter(false);
    }
  };

  const handleAxisSelect = (axis: 'X' | 'Y' | 'Z') => {
    setActiveAxis(axis);
    if (axis === 'Y') onChange((p) => ({ ...p, pitch: 90, yaw: 0, roll: 0 }));
    if (axis === 'X') onChange((p) => ({ ...p, pitch: 0, yaw: -90, roll: 0 }));
    if (axis === 'Z') onChange((p) => ({ ...p, pitch: 0, yaw: 0, roll: 0 }));
  };

  // 1. RESTING STATE (Mini Cardinal Puck + Cube Snap)
  const renderRestingState = () => (
    <div className="flex items-center gap-2 select-none touch-none" style={{ touchAction: 'none' }}>
      <div
        onClick={toggleResting}
        className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1b1e25] border border-white/20 shadow-2xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
        title="Expand Orthogonal Dial"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#252a35] to-[#121419] shadow-inner" />
        {/* Cardinal Axis Letters */}
        <span className="absolute top-1 font-mono text-[8px] text-neutral-400">Y</span>
        <span className="absolute bottom-1 font-mono text-[8px] text-neutral-400">Y</span>
        <span className="absolute left-1 font-mono text-[8px] text-neutral-400">X</span>
        <span className="absolute right-1 font-mono text-[8px] text-neutral-400">Z</span>
        <div className="w-2 h-2 rounded-full bg-sky-400/90 shadow-[0_0_6px_rgba(56,189,248,0.8)]" />
      </div>

      {/* Companion Isometric Cube Snap Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onChange((p) => ({ ...p, pitch: 35.264, yaw: 45, roll: 0 }));
        }}
        className="w-9 h-9 rounded-lg bg-[#1a1d24] border border-white/15 hover:border-white/40 active:scale-95 text-white/70 hover:text-white flex items-center justify-center shadow-md transition-all cursor-pointer"
        title="Isometric Snap"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      </button>
    </div>
  );

  // 2. ACTIVE EXPANDED CONTROLLER
  const renderExpandedState = () => (
    <div className="flex items-center gap-3 select-none touch-none" style={{ touchAction: 'none' }}>
      <div className="relative w-[185px] h-[185px] sm:w-[220px] sm:h-[220px] rounded-full flex items-center justify-center">
        {/* Outer Fine Tick Bezel */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#262a33] via-[#1b1e25] to-[#121418] border border-white/15 shadow-[0_12px_42px_rgba(0,0,0,0.7)] flex items-center justify-center">
          {/* Cyan Highlighted Active Sector Badge (Y) */}
          <div
            onClick={() => handleAxisSelect('Y')}
            className={`absolute top-1 px-3 py-0.5 rounded-t-md font-mono text-[9px] font-bold tracking-widest cursor-pointer transition-all ${
              activeAxis === 'Y'
                ? 'bg-sky-400 text-slate-900 shadow-[0_0_12px_rgba(56,189,248,0.7)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Y
          </div>

          {/* Minimizer Button */}
          <button
            onClick={toggleResting}
            className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-[#1e222b] border border-white/20 text-neutral-400 hover:text-white flex items-center justify-center text-xs shadow-md transition-all cursor-pointer z-20"
            title="Minimize"
          >
            _
          </button>
        </div>

        {/* Stepped Mid-Bezel with X X, Y Y, Z Z Axis Selectors */}
        <div className="relative w-[138px] h-[138px] sm:w-[164px] sm:h-[164px] rounded-full bg-[#181b22] border border-white/10 shadow-inner flex items-center justify-center">
          {/* Inner Axis Labels */}
          <button
            onClick={() => handleAxisSelect('Y')}
            className="absolute top-2 font-mono text-[10px] text-neutral-300 hover:text-sky-300 cursor-pointer"
          >
            Y
          </button>
          <button
            onClick={() => handleAxisSelect('X')}
            className="absolute left-2 flex items-center gap-1 font-mono text-[10px] text-neutral-300 hover:text-sky-300 cursor-pointer"
          >
            <span>X</span> <span className="opacity-50">X</span>
          </button>
          <button
            onClick={() => handleAxisSelect('Z')}
            className="absolute right-2 flex items-center gap-1 font-mono text-[10px] text-neutral-300 hover:text-sky-300 cursor-pointer"
          >
            <span className="opacity-50">Z</span> <span>Z</span>
          </button>

          {/* Spun-Metal Center Metallic Dome Button */}
          <div
            onPointerDown={handleCenterPointerDown}
            onPointerMove={handleCenterPointerMove}
            onPointerUp={handleCenterPointerUp}
            onPointerCancel={handleCenterPointerUp}
            onDoubleClick={onReset}
            className="w-[66px] h-[66px] sm:w-[78px] sm:h-[78px] rounded-full bg-gradient-to-br from-[#64748b] via-[#334155] to-[#1e293b] border border-white/25 shadow-[0_6px_20px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(255,255,255,0.3)] cursor-grab active:cursor-grabbing flex items-center justify-center transition-transform active:scale-95 touch-none"
            style={{ touchAction: 'none' }}
            title="Drag dome to orbit · Double click to zero"
            role="slider"
            aria-label="Orbit Dome"
          >
            {/* Specular Highlight */}
            <div className="absolute top-1 left-2 w-5 h-3 rounded-full bg-white/50 blur-[1px]" />

            {/* Center Axis Pinhead */}
            <div className="w-2 h-2 rounded-full bg-sky-300 shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
          </div>
        </div>
      </div>

      {/* Satellite Buttons Column (Cube Snap & Overflow Menu) */}
      <div className="flex flex-col gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChange((p) => ({ ...p, pitch: 35.264, yaw: 45, roll: 0 }));
          }}
          className="w-10 h-10 rounded-xl bg-[#191c22] border border-white/15 hover:border-white/40 active:scale-95 text-white/80 hover:text-white flex items-center justify-center shadow-lg transition-all cursor-pointer"
          title="Isometric View Snap"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onChange((p) => ({
              ...p,
              projection: p.projection === 'orthographic' ? 'perspective' : 'orthographic',
            }));
          }}
          className="w-10 h-10 rounded-xl bg-[#191c22] border border-white/15 hover:border-white/40 active:scale-95 text-neutral-400 hover:text-white flex items-center justify-center shadow-lg font-mono text-xs transition-all cursor-pointer"
          title="Toggle Orthographic / Perspective"
        >
          ···
        </button>
      </div>
    </div>
  );

  if (displayMode === 'side-by-side') {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-center gap-12 p-6">
        <div className="flex flex-col items-center gap-3">
          <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">Resting</div>
          {renderRestingState()}
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">Active</div>
          {renderExpandedState()}
        </div>
      </div>
    );
  }

  return isResting ? renderRestingState() : renderExpandedState();
};
