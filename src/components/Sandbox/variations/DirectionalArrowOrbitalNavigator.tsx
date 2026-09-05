/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { NavVariationProps } from '../types';

/**
 * Concept: Directional Arrow Orbital Dial (exec-0a047cd1.png)
 * - Center: Dome with 4 directional cyan arrows (up, down, left, right)
 * - Outer Ring: Circular orbit arrows for continuous roll/yaw
 * - Companion Buttons: Isometric Cube Snap (top) & Diagonal Scale/Zoom (bottom-right)
 * - Resting: Mini puck with arrow cross and cube glyph
 */
export const DirectionalArrowOrbitalNavigator: React.FC<NavVariationProps> = ({
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

  const [activeGesture, setActiveGesture] = useState<'center' | 'ring' | null>(null);
  const dialRef = useRef<HTMLDivElement>(null);
  const lastPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastAngleRef = useRef<number>(0);

  // Center dome drag: free orbit
  const handleCenterPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    setActiveGesture('center');
  };

  const handleCenterPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activeGesture !== 'center') return;
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
    if (activeGesture === 'center') {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch (_) {}
      setActiveGesture(null);
    }
  };

  // Outer ring drag: continuous roll
  const handleRingPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!dialRef.current) return;
    const rect = dialRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - cy, e.clientX - cx);

    e.currentTarget.setPointerCapture(e.pointerId);
    lastAngleRef.current = angle;
    setActiveGesture('ring');
  };

  const handleRingPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activeGesture !== 'ring' || !dialRef.current) return;
    const rect = dialRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const currentAngle = Math.atan2(e.clientY - cy, e.clientX - cx);

    let dAngle = currentAngle - lastAngleRef.current;
    if (dAngle > Math.PI) dAngle -= 2 * Math.PI;
    if (dAngle < -Math.PI) dAngle += 2 * Math.PI;
    lastAngleRef.current = currentAngle;

    const dDeg = (dAngle * 180) / Math.PI;
    onChange((prev) => ({
      ...prev,
      roll: (prev.roll + dDeg) % 360,
    }));
  };

  const handleRingPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activeGesture === 'ring') {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch (_) {}
      setActiveGesture(null);
    }
  };

  // 1. RESTING STATE
  const renderRestingState = () => (
    <div
      onClick={toggleResting}
      className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1b1e25] border border-white/20 shadow-2xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 touch-none"
      style={{ touchAction: 'none' }}
      title="Expand Orbital Dial"
      role="button"
      aria-label="Expand Orbital Dial"
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#252a35] to-[#121419] shadow-inner" />
      <div className="w-5 h-5 flex items-center justify-center text-sky-400">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M2 12h20" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      </div>
    </div>
  );

  // 2. ACTIVE EXPANDED CONTROLLER
  const renderExpandedState = () => (
    <div
      ref={dialRef}
      className="relative w-[185px] h-[185px] sm:w-[220px] sm:h-[220px] rounded-full select-none touch-none flex items-center justify-center"
      style={{ touchAction: 'none' }}
    >
      {/* Outer Orbit Ring with Circular Rotate Arrows */}
      <div
        onPointerDown={handleRingPointerDown}
        onPointerMove={handleRingPointerMove}
        onPointerUp={handleRingPointerUp}
        onPointerCancel={handleRingPointerUp}
        className="absolute inset-0 rounded-full bg-gradient-to-b from-[#262a33] via-[#1b1e25] to-[#121418] border border-white/15 shadow-[0_12px_42px_rgba(0,0,0,0.7)] cursor-grab active:cursor-grabbing flex items-center justify-center touch-none"
        style={{ touchAction: 'none' }}
      >
        {/* Top: Isometric Cube Snap Button */}
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

        {/* Circular Orbit Arrows at 3h and 9h */}
        <div className="absolute left-2.5 w-6 h-6 flex items-center justify-center text-white/30 pointer-events-none text-xs">
          ↻
        </div>
        <div className="absolute right-2.5 w-6 h-6 flex items-center justify-center text-white/30 pointer-events-none text-xs">
          ↺
        </div>

        {/* Bottom-Right: Diagonal Scale/Zoom Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChange((p) => ({ ...p, scale: p.scale > 1.2 ? 1.0 : 1.5 }));
          }}
          className="absolute bottom-3 right-4 w-6 h-6 flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer"
          title="Toggle Zoom (1.0x / 1.5x)"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </button>

        {/* Minimizer Button */}
        <button
          onClick={toggleResting}
          className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-[#1e222b] border border-white/20 text-neutral-400 hover:text-white flex items-center justify-center text-xs shadow-md transition-all cursor-pointer z-20"
          title="Minimize"
        >
          _
        </button>
      </div>

      {/* Inner Recessed Dome Collar */}
      <div className="relative w-[130px] h-[130px] sm:w-[154px] sm:h-[154px] rounded-full bg-[#171920] border border-white/10 shadow-inner flex items-center justify-center pointer-events-none">
        {/* 4 Directional Cyan Arrows */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChange((p) => ({ ...p, pitch: Math.min(85, p.pitch + 15) }));
          }}
          className="pointer-events-auto absolute top-2 w-6 h-6 flex items-center justify-center text-sky-400 hover:text-sky-300 text-xs cursor-pointer"
          title="Tilt Up"
        >
          ▲
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChange((p) => ({ ...p, pitch: Math.max(-85, p.pitch - 15) }));
          }}
          className="pointer-events-auto absolute bottom-2 w-6 h-6 flex items-center justify-center text-sky-400 hover:text-sky-300 text-xs cursor-pointer"
          title="Tilt Down"
        >
          ▼
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChange((p) => ({ ...p, yaw: p.yaw - 15 }));
          }}
          className="pointer-events-auto absolute left-2 w-6 h-6 flex items-center justify-center text-sky-400 hover:text-sky-300 text-xs cursor-pointer"
          title="Turn Left"
        >
          ◀
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChange((p) => ({ ...p, yaw: p.yaw + 15 }));
          }}
          className="pointer-events-auto absolute right-2 w-6 h-6 flex items-center justify-center text-sky-400 hover:text-sky-300 text-xs cursor-pointer"
          title="Turn Right"
        >
          ▶
        </button>

        {/* Center Metallic Dome */}
        <div
          onPointerDown={handleCenterPointerDown}
          onPointerMove={handleCenterPointerMove}
          onPointerUp={handleCenterPointerUp}
          onPointerCancel={handleCenterPointerUp}
          onDoubleClick={onReset}
          className="pointer-events-auto relative w-[64px] h-[64px] sm:w-[76px] sm:h-[76px] rounded-full bg-gradient-to-br from-[#475569] via-[#334155] to-[#1e293b] border border-white/20 shadow-[0_6px_18px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(255,255,255,0.25)] cursor-grab active:cursor-grabbing flex items-center justify-center transition-transform active:scale-95 touch-none"
          style={{ touchAction: 'none' }}
          title="Drag dome to orbit freely · Double click to zero"
          role="slider"
          aria-label="Orbital Dome"
        >
          <div className="absolute top-1.5 left-2 w-5 h-3 rounded-full bg-white/40 blur-[1px]" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/90 shadow-[0_0_6px_rgba(255,255,255,0.9)]" />
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
