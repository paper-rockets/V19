/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { NavVariationProps } from '../types';

/**
 * Concept: Tactile Hardware Trackball Deck (exec-8094dd94.png)
 * - Industrial physical controller aesthetic
 * - Center: Trackball joystick nub nestled inside a chamfered collar
 * - Axis Snap Buttons: Red [X], Green [Y], Blue [Z]
 * - Secondary concentric target button (Aperture / Reset View) at 2 o'clock
 * - Mechanical Slide Toggle: FLAT [ o- ] 3D (switches projection between Orthographic and Perspective)
 * - Resting: Compact matte puck with vertical alignment tick '|' and center dot
 */
export const TactileHardwareDeckNavigator: React.FC<NavVariationProps> = ({
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

  const [isDraggingTrackball, setIsDraggingTrackball] = useState(false);
  const lastPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleTrackballPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    setIsDraggingTrackball(true);
  };

  const handleTrackballPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingTrackball) return;
    const dx = e.clientX - lastPosRef.current.x;
    const dy = e.clientY - lastPosRef.current.y;
    lastPosRef.current = { x: e.clientX, y: e.clientY };

    onChange((prev) => ({
      ...prev,
      yaw: prev.yaw + dx * 0.75,
      pitch: Math.max(-85, Math.min(85, prev.pitch + dy * 0.75)),
    }));
  };

  const handleTrackballPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingTrackball) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch (_) {}
      setIsDraggingTrackball(false);
    }
  };

  // 1. RESTING STATE (Small Matte Puck)
  const renderRestingState = () => (
    <div
      onClick={toggleResting}
      className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1c1f24] border border-white/20 shadow-2xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 touch-none"
      style={{ touchAction: 'none' }}
      title="Tap to open Hardware Deck"
      role="button"
      aria-label="Open Hardware Deck"
    >
      {/* Outer Chamfer */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#252930] to-[#121418] shadow-inner" />

      {/* Top White Alignment Notch Line */}
      <div className="absolute top-2 w-0.5 h-2 bg-white/70 rounded-full" />

      {/* Center Subtle Pin Dot */}
      <div className="w-1.5 h-1.5 rounded-full bg-white/60 shadow-[0_0_4px_rgba(255,255,255,0.5)]" />
    </div>
  );

  // 2. ACTIVE EXPANDED CONTROLLER
  const renderExpandedState = () => (
    <div
      className="relative w-[185px] h-[185px] sm:w-[220px] sm:h-[220px] rounded-full select-none touch-none flex items-center justify-center"
      style={{ touchAction: 'none' }}
    >
      {/* Outer Chassis */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#2a2e36] via-[#1e2127] to-[#15171c] border border-white/15 shadow-[0_12px_42px_rgba(0,0,0,0.7)] flex items-center justify-center">
        {/* 4 Cardinal Calibration White Ticks */}
        <div className="absolute top-2.5 w-0.5 h-3 bg-white/60 rounded-full" />
        <div className="absolute bottom-2.5 w-0.5 h-3 bg-white/60 rounded-full" />
        <div className="absolute left-2.5 w-3 h-0.5 bg-white/60 rounded-full" />
        <div className="absolute right-2.5 w-3 h-0.5 bg-white/60 rounded-full" />

        {/* Minimize Action Button */}
        <button
          onClick={toggleResting}
          className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-[#1e222b] border border-white/20 text-neutral-400 hover:text-white flex items-center justify-center text-xs shadow-md transition-all cursor-pointer z-20"
          title="Minimize to resting puck"
          aria-label="Minimize"
        >
          _
        </button>
      </div>

      {/* Inner Recessed Faceplate */}
      <div className="relative w-[140px] h-[140px] sm:w-[168px] sm:h-[168px] rounded-full bg-[#181a20] border border-white/10 shadow-inner flex items-center justify-center pointer-events-none">
        {/* Axis Snap Buttons (Red X, Green Y, Blue Z) */}
        {/* Y AXIS (Top - Green) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChange((p) => ({ ...p, pitch: 90, yaw: 0, roll: 0 }));
          }}
          className="pointer-events-auto absolute top-2.5 w-6 h-6 sm:w-7 sm:h-7 rounded bg-[#22c55e]/20 border border-[#22c55e]/50 hover:bg-[#22c55e]/40 active:scale-95 text-[#22c55e] font-mono font-bold text-[11px] flex items-center justify-center shadow-md transition-all cursor-pointer"
          title="Align to Y Axis (Top View)"
        >
          Y
        </button>

        {/* X AXIS (Left - Red) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChange((p) => ({ ...p, pitch: 0, yaw: -90, roll: 0 }));
          }}
          className="pointer-events-auto absolute left-2.5 w-6 h-6 sm:w-7 sm:h-7 rounded bg-[#ef4444]/20 border border-[#ef4444]/50 hover:bg-[#ef4444]/40 active:scale-95 text-[#ef4444] font-mono font-bold text-[11px] flex items-center justify-center shadow-md transition-all cursor-pointer"
          title="Align to X Axis (Side View)"
        >
          X
        </button>

        {/* Z AXIS (Right - Blue) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChange((p) => ({ ...p, pitch: 0, yaw: 0, roll: 0 }));
          }}
          className="pointer-events-auto absolute right-2.5 w-6 h-6 sm:w-7 sm:h-7 rounded bg-[#3b82f6]/20 border border-[#3b82f6]/50 hover:bg-[#3b82f6]/40 active:scale-95 text-[#3b82f6] font-mono font-bold text-[11px] flex items-center justify-center shadow-md transition-all cursor-pointer"
          title="Align to Z Axis (Front View)"
        >
          Z
        </button>

        {/* 2 o'clock Concentric Target Button (Reset / Recenter) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onReset();
          }}
          className="pointer-events-auto absolute top-3.5 right-4 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#2a2d36] border border-white/25 hover:border-white/60 active:scale-90 flex items-center justify-center transition-all cursor-pointer"
          title="Recenter / Zero View"
        >
          <div className="w-2 h-2 rounded-full border border-white/60 flex items-center justify-center">
            <div className="w-0.5 h-0.5 rounded-full bg-white" />
          </div>
        </button>

        {/* Mechanical Slider: FLAT [ o- ] 3D */}
        <div className="pointer-events-auto absolute bottom-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#121418] border border-white/15 shadow-inner">
          <span
            className={`font-mono text-[8px] uppercase tracking-wider transition-colors ${
              state.projection === 'orthographic' ? 'text-white font-bold' : 'text-neutral-500'
            }`}
          >
            FLAT
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onChange((p) => ({
                ...p,
                projection: p.projection === 'orthographic' ? 'perspective' : 'orthographic',
              }));
            }}
            className="relative w-7 h-3.5 rounded-full bg-[#20232a] border border-white/20 p-0.5 flex items-center transition-all cursor-pointer"
            title="Toggle Flat Orthographic vs 3D Perspective"
            aria-label="Toggle Flat Orthographic vs 3D Perspective"
          >
            <div
              className={`w-2.5 h-2.5 rounded-full bg-gradient-to-b from-white to-neutral-300 shadow-sm transition-transform duration-200 ${
                state.projection === 'perspective' ? 'translate-x-3.5' : 'translate-x-0'
              }`}
            />
          </button>
          <span
            className={`font-mono text-[8px] uppercase tracking-wider transition-colors ${
              state.projection === 'perspective' ? 'text-white font-bold' : 'text-neutral-500'
            }`}
          >
            3D
          </span>
        </div>

        {/* Center Trackball Socket Collar */}
        <div className="relative w-[64px] h-[64px] sm:w-[76px] sm:h-[76px] rounded-full bg-gradient-to-b from-[#111216] to-[#252830] border border-white/15 shadow-inner flex items-center justify-center p-1">
          {/* Spherical Trackball Nub */}
          <div
            onPointerDown={handleTrackballPointerDown}
            onPointerMove={handleTrackballPointerMove}
            onPointerUp={handleTrackballPointerUp}
            onPointerCancel={handleTrackballPointerUp}
            className="pointer-events-auto w-full h-full rounded-full bg-gradient-to-br from-[#475569] via-[#334155] to-[#1e293b] shadow-[0_4px_12px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(255,255,255,0.2)] cursor-grab active:cursor-grabbing flex items-center justify-center overflow-hidden transition-transform active:scale-95 touch-none"
            style={{ touchAction: 'none' }}
            title="Drag trackball nub to orbit 3D model freely"
            role="slider"
            aria-label="Trackball Nub"
          >
            {/* Specular Glint */}
            <div className="absolute top-1.5 left-2 w-4 h-2.5 rounded-full bg-white/40 blur-[1px]" />

            {/* Tracking Orientation Dot */}
            <div
              className="w-2 h-2 rounded-full bg-white/80 shadow-[0_0_6px_rgba(255,255,255,0.7)]"
              style={{
                transform: `translate(${(state.yaw % 360) * 0.06}px, ${(state.pitch % 360) * 0.06}px)`,
              }}
            />
          </div>
        </div>
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
