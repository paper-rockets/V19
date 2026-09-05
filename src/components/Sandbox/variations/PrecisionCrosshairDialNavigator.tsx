/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { NavVariationProps } from '../types';

/**
 * Concept: Precision Crosshair Gimbal Dial (exec-528da0da.png)
 * - Milled circular dial with perimeter degree tick marks
 * - Center: Metallic dome with pinpoint dot for free 3D orbit
 * - 4 Cardinal Cyan Arrow Stems (elevation tilt & heading pan)
 * - Corner Tick Brackets
 * - Top: Isometric Cube Snap
 * - Bottom: 3D Perspective / Ortho Axis Toggle
 * - Left/Right: Turntable Roll Arcs
 * - Resting: Sleek puck with illuminated crosshair pinhead
 */
export const PrecisionCrosshairDialNavigator: React.FC<NavVariationProps> = ({
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

  // 1. RESTING STATE
  const renderRestingState = () => (
    <div
      onClick={toggleResting}
      className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1b1e25] border border-white/20 shadow-2xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 touch-none"
      style={{ touchAction: 'none' }}
      title="Expand Precision Crosshair Dial"
      role="button"
      aria-label="Expand Precision Crosshair Dial"
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#242933] to-[#121419] shadow-inner" />
      {/* Mini Crosshair */}
      <div className="absolute w-5 h-0.5 bg-sky-400/50" />
      <div className="absolute w-0.5 h-5 bg-sky-400/50" />
      <div className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_6px_rgba(56,189,248,0.9)]" />
    </div>
  );

  // 2. ACTIVE EXPANDED CONTROLLER
  const renderExpandedState = () => (
    <div
      className="relative w-[185px] h-[185px] sm:w-[220px] sm:h-[220px] rounded-full select-none touch-none flex items-center justify-center"
      style={{ touchAction: 'none' }}
    >
      {/* Outer Dial Face */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#272b35] via-[#1c1f26] to-[#121418] border border-white/15 shadow-[0_12px_42px_rgba(0,0,0,0.7)] flex items-center justify-center">
        {/* Perimeter Degree Tick Marks */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <div
            key={deg}
            className="absolute w-0.5 h-1.5 bg-white/25"
            style={{ transform: `rotate(${deg}deg) translateY(-84px)` }}
          />
        ))}

        {/* Top: Isometric Cube Snap */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChange((p) => ({ ...p, pitch: 35.264, yaw: 45, roll: 0 }));
          }}
          className="absolute top-2 w-7 h-7 flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer"
          title="Isometric View Snap"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
        </button>

        {/* Bottom: 3D Perspective / Orthographic Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChange((p) => ({
              ...p,
              projection: p.projection === 'orthographic' ? 'perspective' : 'orthographic',
            }));
          }}
          className={`absolute bottom-2 w-7 h-7 flex items-center justify-center rounded transition-colors cursor-pointer ${
            state.projection === 'orthographic' ? 'text-sky-300' : 'text-white/50 hover:text-white'
          }`}
          title="Toggle Orthographic / Perspective"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 2v20M2 12h20" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>

        {/* Left: Turntable Roll Left */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChange((p) => ({ ...p, yaw: p.yaw - 45 }));
          }}
          className="absolute left-2 w-7 h-7 flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer"
          title="Rotate Left 45°"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>

        {/* Right: Turntable Roll Right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChange((p) => ({ ...p, yaw: p.yaw + 45 }));
          }}
          className="absolute right-2 w-7 h-7 flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer"
          title="Rotate Right 45°"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M21 12a9 9 0 1 1-9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
          </svg>
        </button>

        {/* 4 Corner Diagonal Tick Brackets */}
        <div className="absolute top-7 left-7 text-[8px] text-white/20 pointer-events-none">⌜</div>
        <div className="absolute top-7 right-7 text-[8px] text-white/20 pointer-events-none">⌝</div>
        <div className="absolute bottom-7 left-7 text-[8px] text-white/20 pointer-events-none">⌞</div>
        <div className="absolute bottom-7 right-7 text-[8px] text-white/20 pointer-events-none">⌟</div>

        {/* Minimizer Button */}
        <button
          onClick={toggleResting}
          className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-[#1e222b] border border-white/20 text-neutral-400 hover:text-white flex items-center justify-center text-xs shadow-md transition-all cursor-pointer z-20"
          title="Minimize"
        >
          _
        </button>
      </div>

      {/* 4 Cardinal Cyan Arrow Stems */}
      <div className="absolute top-10 w-2 h-4 flex items-center justify-center text-sky-400 text-[10px] pointer-events-none">
        ↑
      </div>
      <div className="absolute bottom-10 w-2 h-4 flex items-center justify-center text-sky-400 text-[10px] pointer-events-none">
        ↓
      </div>
      <div className="absolute left-10 w-4 h-2 flex items-center justify-center text-sky-400 text-[10px] pointer-events-none">
        ←
      </div>
      <div className="absolute right-10 w-4 h-2 flex items-center justify-center text-sky-400 text-[10px] pointer-events-none">
        →
      </div>

      {/* Center Metallic Dome with Blue Pinhead Dot */}
      <div
        onPointerDown={handleCenterPointerDown}
        onPointerMove={handleCenterPointerMove}
        onPointerUp={handleCenterPointerUp}
        onPointerCancel={handleCenterPointerUp}
        onDoubleClick={onReset}
        className="relative w-[68px] h-[68px] sm:w-[80px] sm:h-[80px] rounded-full bg-gradient-to-br from-[#64748b] via-[#334155] to-[#1e293b] border border-white/25 shadow-[0_6px_20px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(255,255,255,0.3)] cursor-grab active:cursor-grabbing flex items-center justify-center transition-transform active:scale-95 touch-none"
        style={{ touchAction: 'none' }}
        title="Drag dome to orbit · Double click to zero"
        role="slider"
        aria-label="Crosshair Orbit Dome"
      >
        <div className="absolute top-1.5 left-2 w-5 h-3 rounded-full bg-white/40 blur-[1px]" />
        <div className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
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
