/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { NavVariationProps } from '../types';

/**
 * Concept: Camera Trackball Gimbal (exec-c6ba0801.png)
 * "Orbit freely. Drag rim to constrain horizon."
 * - Center: Glossy ceramic spherical trackball ("ROLL BALL / ORBIT FREELY")
 * - Inner Bezel: Illuminated cyan horizon sweep arc and cardinal arrows (^, v, <, >)
 * - Outer Bezel: "DRAG RIM / CONSTRAIN HORIZON", 6h notch, camera icon, double-tap hero view
 * - Resting: Sleek ceramic puck with glossy ball, horizontal LED status bar, and camera glyph
 */
export const CameraTrackballGimbalNavigator: React.FC<NavVariationProps> = ({
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

  const [activeGesture, setActiveGesture] = useState<'trackball' | 'rim' | null>(null);
  const dialRef = useRef<HTMLDivElement>(null);
  const lastPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastAngleRef = useRef<number>(0);
  const lastTapTimeRef = useRef<number>(0);

  // Trackball center drag: free orbit (yaw + pitch)
  const handleBallPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    setActiveGesture('trackball');
  };

  const handleBallPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activeGesture !== 'trackball') return;
    const dx = e.clientX - lastPosRef.current.x;
    const dy = e.clientY - lastPosRef.current.y;
    lastPosRef.current = { x: e.clientX, y: e.clientY };

    onChange((prev) => ({
      ...prev,
      yaw: prev.yaw + dx * 0.7,
      pitch: Math.max(-85, Math.min(85, prev.pitch + dy * 0.7)),
    }));
  };

  const handleBallPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activeGesture === 'trackball') {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch (_) {}
      setActiveGesture(null);
    }
  };

  // Double tap ball to reset hero view
  const handleBallDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onReset();
  };

  const handleBallClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const now = Date.now();
    if (now - lastTapTimeRef.current < 320) {
      onReset();
    }
    lastTapTimeRef.current = now;
  };

  // Rim drag: constrain horizon roll
  const handleRimPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!dialRef.current) return;
    const rect = dialRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - cy, e.clientX - cx);

    e.currentTarget.setPointerCapture(e.pointerId);
    lastAngleRef.current = angle;
    setActiveGesture('rim');
  };

  const handleRimPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activeGesture !== 'rim' || !dialRef.current) return;
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

  const handleRimPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activeGesture === 'rim') {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch (_) {}
      setActiveGesture(null);
    }
  };

  // Cardinal snap buttons (^, v, <, >)
  const handleCardinalSnap = (axis: 'top' | 'bottom' | 'left' | 'right', e: React.MouseEvent) => {
    e.stopPropagation();
    if (axis === 'top') onChange((p) => ({ ...p, pitch: 90, yaw: 0, roll: 0 }));
    if (axis === 'bottom') onChange((p) => ({ ...p, pitch: -90, yaw: 0, roll: 0 }));
    if (axis === 'left') onChange((p) => ({ ...p, pitch: 0, yaw: -90, roll: 0 }));
    if (axis === 'right') onChange((p) => ({ ...p, pitch: 0, yaw: 90, roll: 0 }));
  };

  // 1. RESTING STATE (Puck)
  const renderRestingState = () => (
    <div
      onClick={toggleResting}
      className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#20232b] border border-white/20 shadow-2xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 touch-none"
      style={{ touchAction: 'none' }}
      title="Tap to expand Camera Gimbal"
      role="button"
      aria-label="Expand Camera Gimbal"
    >
      {/* Outer Ceramic Bezel */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#2a2e39] to-[#181a20] shadow-inner" />

      {/* Glossy Sphere Trackball */}
      <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-[#e2e8f0] via-[#94a3b8] to-[#475569] shadow-lg flex items-center justify-center overflow-hidden">
        {/* Specular Highlight */}
        <div className="absolute top-0.5 left-1 w-2.5 h-2.5 rounded-full bg-white/70 blur-[1px]" />
      </div>

      {/* Horizontal LED Status Bar */}
      <div className="absolute bottom-1.5 w-3 h-0.5 rounded-full bg-sky-400/90 shadow-[0_0_6px_rgba(56,189,248,0.8)]" />
    </div>
  );

  // 2. ACTIVE EXPANDED INSTRUMENT
  const renderExpandedState = () => (
    <div
      ref={dialRef}
      className="relative w-[185px] h-[185px] sm:w-[220px] sm:h-[220px] rounded-full select-none touch-none flex items-center justify-center"
      style={{ touchAction: 'none' }}
    >
      {/* Outer Titanium/Ceramic Rim (Drag to Constrain Horizon Roll) */}
      <div
        onPointerDown={handleRimPointerDown}
        onPointerMove={handleRimPointerMove}
        onPointerUp={handleRimPointerUp}
        onPointerCancel={handleRimPointerUp}
        className="absolute inset-0 rounded-full bg-gradient-to-b from-[#282c37] via-[#1c1f26] to-[#14161d] border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.7)] cursor-grab active:cursor-grabbing flex items-center justify-center touch-none"
        style={{ touchAction: 'none' }}
      >
        {/* Rim Calibration Dot Ticks */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <div
            key={deg}
            className="absolute w-1 h-1 rounded-full bg-white/20"
            style={{
              transform: `rotate(${deg}deg) translateY(-80px)`,
            }}
          />
        ))}

        {/* 6 o'clock Notch Marker */}
        <div className="absolute bottom-2.5 w-1 h-2 rounded-full bg-white/50" />

        {/* Outer Bezel Camera Glyph */}
        <div className="absolute bottom-5 flex items-center justify-center text-white/40 hover:text-white/80 transition-colors pointer-events-none">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        </div>

        {/* Minimize / Rest Puck Action Button at Top Right */}
        <button
          onClick={toggleResting}
          className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-[#1e222b] border border-white/20 text-neutral-400 hover:text-white flex items-center justify-center text-xs shadow-md transition-all cursor-pointer z-20"
          title="Minimize to resting puck"
          aria-label="Minimize"
        >
          _
        </button>
      </div>

      {/* Inner Horizon Bezel (Illuminated cyan arc indicator) */}
      <div className="relative w-[126px] h-[126px] sm:w-[150px] sm:h-[150px] rounded-full bg-[#181b22] border border-white/10 shadow-inner flex items-center justify-center pointer-events-none">
        {/* Horizon Cyan Arc (Rotates with roll) */}
        <div
          className="absolute inset-2 rounded-full border-2 border-transparent border-t-sky-400/90 shadow-[0_0_12px_rgba(56,189,248,0.5)] transition-transform duration-75"
          style={{ transform: `rotate(${state.roll}deg)` }}
        />

        {/* Cardinal Snap Arrows (^, v, <, >) */}
        <button
          onClick={(e) => handleCardinalSnap('top', e)}
          className="pointer-events-auto absolute top-1.5 w-6 h-6 flex items-center justify-center text-white/40 hover:text-sky-300 transition-colors text-[10px] cursor-pointer"
          title="Top View"
        >
          ▲
        </button>
        <button
          onClick={(e) => handleCardinalSnap('bottom', e)}
          className="pointer-events-auto absolute bottom-1.5 w-6 h-6 flex items-center justify-center text-white/40 hover:text-sky-300 transition-colors text-[10px] cursor-pointer"
          title="Bottom View"
        >
          ▼
        </button>
        <button
          onClick={(e) => handleCardinalSnap('left', e)}
          className="pointer-events-auto absolute left-1.5 w-6 h-6 flex items-center justify-center text-white/40 hover:text-sky-300 transition-colors text-[10px] cursor-pointer"
          title="Left View"
        >
          ◀
        </button>
        <button
          onClick={(e) => handleCardinalSnap('right', e)}
          className="pointer-events-auto absolute right-1.5 w-6 h-6 flex items-center justify-center text-white/40 hover:text-sky-300 transition-colors text-[10px] cursor-pointer"
          title="Right View"
        >
          ▶
        </button>

        {/* Central Spherical Trackball (Free 360° Orbit Drag) */}
        <div
          onPointerDown={handleBallPointerDown}
          onPointerMove={handleBallPointerMove}
          onPointerUp={handleBallPointerUp}
          onPointerCancel={handleBallPointerUp}
          onClick={handleBallClick}
          onDoubleClick={handleBallDoubleClick}
          className="pointer-events-auto relative w-[68px] h-[68px] sm:w-[82px] sm:h-[82px] rounded-full bg-gradient-to-br from-[#f1f5f9] via-[#94a3b8] to-[#334155] shadow-[0_8px_24px_rgba(0,0,0,0.6),inset_0_-4px_8px_rgba(0,0,0,0.4)] cursor-grab active:cursor-grabbing flex items-center justify-center overflow-hidden transition-transform active:scale-95 touch-none"
          style={{ touchAction: 'none' }}
          title="Drag to orbit freely · Double-tap to reset view"
          role="slider"
          aria-label="Camera Trackball"
        >
          {/* Ceramic Specular Highlight */}
          <div className="absolute top-1.5 left-2.5 w-6 h-4 rounded-full bg-gradient-to-b from-white/90 to-transparent blur-[1px]" />
          <div className="absolute bottom-1.5 right-2.5 w-3.5 h-2 rounded-full bg-sky-300/30 blur-[2px]" />

          {/* Ball Rotation Vector Indicator */}
          <div
            className="w-2.5 h-2.5 rounded-full bg-slate-800/60 border border-white/40 shadow-sm"
            style={{
              transform: `translate(${(state.yaw % 360) * 0.08}px, ${(state.pitch % 360) * 0.08}px)`,
            }}
          />
        </div>
      </div>
    </div>
  );

  // Side-by-side study mode
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
