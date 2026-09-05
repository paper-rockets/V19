/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { NavVariationProps } from '../types';

/**
 * Concept: Radial Quick-Action Compass Dial (exec-cc60fb26.png)
 * - Soft dark circular vignette disc
 * - Center: Cyan-illuminated Isometric Cube Snap Button (Tap to snap, drag to orbit)
 * - 4 Directional Nudge Arrows (up, down, left, right)
 * - 4 Cardinal Action Icons:
 *   - 12h: Layers (surface grid toggle)
 *   - 3h: Turntable rotation cycle
 *   - 6h: Fit to Screen / Zoom reset
 *   - 9h: Studio Lighting toggle
 * - Resting: Vignette puck with glowing isometric cube
 */
export const RadialActionCompassNavigator: React.FC<NavVariationProps> = ({
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

  // Center button drag: free orbit
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

  // 1. RESTING STATE (Vignette Puck with Isometric Cube)
  const renderRestingState = () => (
    <div
      onClick={toggleResting}
      className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#181a20] border border-white/20 shadow-2xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 touch-none"
      style={{ touchAction: 'none' }}
      title="Expand Radial Compass"
      role="button"
      aria-label="Expand Radial Compass"
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#242832] to-[#0f1115] shadow-inner" />
      <svg className="w-5 h-5 text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    </div>
  );

  // 2. ACTIVE EXPANDED CONTROLLER
  const renderExpandedState = () => (
    <div
      className="relative w-[185px] h-[185px] sm:w-[220px] sm:h-[220px] rounded-full select-none touch-none flex items-center justify-center"
      style={{ touchAction: 'none' }}
    >
      {/* Dark Vignette Disc Background */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#252830]/90 via-[#181a20]/95 to-[#0f1115] border border-white/15 shadow-[0_12px_42px_rgba(0,0,0,0.7)] flex items-center justify-center">
        {/* 12h: Layers / Surface Grid Action */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChange((p) => ({ ...p, floorGridActive: !p.floorGridActive }));
          }}
          className={`absolute top-2.5 w-7 h-7 flex items-center justify-center rounded-md transition-colors cursor-pointer ${
            state.floorGridActive ? 'text-sky-300' : 'text-white/40 hover:text-white'
          }`}
          title="Toggle Grid / Layers"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        </button>

        {/* 3h: Turntable / Continuous Rotation */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChange((p) => ({ ...p, turntableActive: !p.turntableActive }));
          }}
          className={`absolute right-2.5 w-7 h-7 flex items-center justify-center rounded-md transition-colors cursor-pointer ${
            state.turntableActive ? 'text-sky-300' : 'text-white/40 hover:text-white'
          }`}
          title="Toggle Turntable Rotation"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
          </svg>
        </button>

        {/* 6h: Fit View / Reset Zoom */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChange((p) => ({ ...p, scale: 1.0, x: 0, y: 0, z: 0 }));
          }}
          className="absolute bottom-2.5 w-7 h-7 flex items-center justify-center rounded-md text-white/40 hover:text-white transition-colors cursor-pointer"
          title="Fit to Screen / Reset Scale"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </button>

        {/* 9h: Studio Lighting / Projection */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChange((p) => ({
              ...p,
              projection: p.projection === 'orthographic' ? 'perspective' : 'orthographic',
            }));
          }}
          className={`absolute left-2.5 w-7 h-7 flex items-center justify-center rounded-md transition-colors cursor-pointer ${
            state.projection === 'orthographic' ? 'text-sky-300' : 'text-white/40 hover:text-white'
          }`}
          title="Toggle Flat Orthographic vs 3D Perspective"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        </button>

        {/* Minimizer Action Button */}
        <button
          onClick={toggleResting}
          className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-[#1e222b] border border-white/20 text-neutral-400 hover:text-white flex items-center justify-center text-xs shadow-md transition-all cursor-pointer z-20"
          title="Minimize"
        >
          _
        </button>
      </div>

      {/* 4 Directional Nudge Arrows around Center */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onChange((p) => ({ ...p, pitch: Math.min(85, p.pitch + 15) }));
        }}
        className="absolute top-10 sm:top-12 w-6 h-6 flex items-center justify-center text-white/40 hover:text-sky-300 text-[9px] cursor-pointer"
        title="Tilt Up"
      >
        ▲
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onChange((p) => ({ ...p, pitch: Math.max(-85, p.pitch - 15) }));
        }}
        className="absolute bottom-10 sm:bottom-12 w-6 h-6 flex items-center justify-center text-white/40 hover:text-sky-300 text-[9px] cursor-pointer"
        title="Tilt Down"
      >
        ▼
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onChange((p) => ({ ...p, yaw: p.yaw - 15 }));
        }}
        className="absolute left-10 sm:left-12 w-6 h-6 flex items-center justify-center text-white/40 hover:text-sky-300 text-[9px] cursor-pointer"
        title="Orbit Left"
      >
        ◀
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onChange((p) => ({ ...p, yaw: p.yaw + 15 }));
        }}
        className="absolute right-10 sm:right-12 w-6 h-6 flex items-center justify-center text-white/40 hover:text-sky-300 text-[9px] cursor-pointer"
        title="Orbit Right"
      >
        ▶
      </button>

      {/* Center Illuminated Isometric Cube Button (Drag to orbit freely, tap to snap) */}
      <div
        onPointerDown={handleCenterPointerDown}
        onPointerMove={handleCenterPointerMove}
        onPointerUp={handleCenterPointerUp}
        onPointerCancel={handleCenterPointerUp}
        onClick={(e) => {
          e.stopPropagation();
          onChange((p) => ({ ...p, pitch: 35.264, yaw: 45, roll: 0 }));
        }}
        onDoubleClick={onReset}
        className="relative w-[56px] h-[56px] sm:w-[68px] sm:h-[68px] rounded-full bg-[#181b22] border-2 border-sky-400/80 shadow-[0_0_16px_rgba(56,189,248,0.5),inset_0_2px_4px_rgba(255,255,255,0.2)] cursor-grab active:cursor-grabbing flex items-center justify-center transition-transform active:scale-95 touch-none"
        style={{ touchAction: 'none' }}
        title="Tap to snap Isometric · Drag to orbit · Double tap to reset"
        role="slider"
        aria-label="Isometric Orbit Cube"
      >
        <svg className="w-6 h-6 text-sky-300 drop-shadow-[0_0_6px_rgba(56,189,248,0.8)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
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
