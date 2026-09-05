/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { NavVariationProps } from '../types';

/**
 * Concept: Sector Light-Cone Gimbal (exec-7d0d94c9.png)
 * "Drag center to orbit · Drag rim to roll · Double-tap center to reset"
 * - Center: Dome with blue illuminated cone / view sector and pinpoint center LED
 * - Outer Bezel: 4 chevrons (^, v, <, >) for cardinal step alignment
 * - Satellite View Button: VIEW [camera] toggle for projection / hero framing
 * - Left Roll Button: 360° turntable cycle
 * - Resting: Sleek dark puck with illuminated blue sector cone
 */
export const SectorLightConeNavigator: React.FC<NavVariationProps> = ({
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

  const [activeGesture, setActiveGesture] = useState<'center' | 'rim' | null>(null);
  const dialRef = useRef<HTMLDivElement>(null);
  const lastPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastAngleRef = useRef<number>(0);
  const lastTapRef = useRef<number>(0);

  // Center dome drag: orbit yaw & pitch
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
      yaw: prev.yaw + dx * 0.7,
      pitch: Math.max(-85, Math.min(85, prev.pitch + dy * 0.7)),
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

  // Double tap to reset
  const handleCenterClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const now = Date.now();
    if (now - lastTapRef.current < 320) {
      onReset();
    }
    lastTapRef.current = now;
  };

  // Outer rim drag: roll
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

  // 1. RESTING STATE (Puck)
  const renderRestingState = () => (
    <div
      onClick={toggleResting}
      className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1b1e24] border border-white/20 shadow-2xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 touch-none"
      style={{ touchAction: 'none' }}
      title="Tap to open Sector Light-Cone Gimbal"
      role="button"
      aria-label="Open Sector Light-Cone Gimbal"
    >
      {/* Outer Chamfer */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#232730] to-[#121418] shadow-inner" />

      {/* Mini Sector Cone */}
      <div
        className="w-7 h-7 rounded-full relative overflow-hidden"
        style={{
          background: `conic-gradient(from ${(state.yaw % 360) - 25}deg at 50% 50%, rgba(56,189,248,0.7) 0deg, rgba(56,189,248,0) 50deg, transparent 50deg)`,
        }}
      />

      {/* Center Pinpoint */}
      <div className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)]" />
    </div>
  );

  // 2. ACTIVE EXPANDED CONTROLLER
  const renderExpandedState = () => (
    <div className="flex flex-col items-center select-none touch-none" style={{ touchAction: 'none' }}>
      {/* Top VIEW [camera] Toggle Pill */}
      <div className="mb-2 flex items-center gap-1 px-3 py-1 rounded-full bg-[#181a20] border border-white/15 shadow-md">
        <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">VIEW</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChange((p) => ({
              ...p,
              projection: p.projection === 'orthographic' ? 'perspective' : 'orthographic',
            }));
          }}
          className="w-5 h-5 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
          title="Toggle Orthographic / Perspective camera"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        </button>
      </div>

      <div
        ref={dialRef}
        className="relative w-[185px] h-[185px] sm:w-[220px] sm:h-[220px] rounded-full flex items-center justify-center"
      >
        {/* Outer Rim Bezel (Drag to Roll) */}
        <div
          onPointerDown={handleRimPointerDown}
          onPointerMove={handleRimPointerMove}
          onPointerUp={handleRimPointerUp}
          onPointerCancel={handleRimPointerUp}
          className="absolute inset-0 rounded-full bg-gradient-to-b from-[#2a2d36] via-[#1c1f26] to-[#121419] border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.7)] cursor-grab active:cursor-grabbing flex items-center justify-center touch-none"
          style={{ touchAction: 'none' }}
        >
          {/* Cardinal Arrow Chevrons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onChange((p) => ({ ...p, pitch: 90, yaw: 0, roll: 0 }));
            }}
            className="absolute top-2 w-6 h-6 flex items-center justify-center text-white/40 hover:text-white transition-colors text-[10px] cursor-pointer"
            title="Snap Top"
          >
            ▲
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onChange((p) => ({ ...p, pitch: -90, yaw: 0, roll: 0 }));
            }}
            className="absolute bottom-2 w-6 h-6 flex items-center justify-center text-white/40 hover:text-white transition-colors text-[10px] cursor-pointer"
            title="Snap Bottom"
          >
            ▼
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onChange((p) => ({ ...p, pitch: 0, yaw: -90, roll: 0 }));
            }}
            className="absolute left-2 w-6 h-6 flex items-center justify-center text-white/40 hover:text-white transition-colors text-[10px] cursor-pointer"
            title="Snap Left"
          >
            ◀
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onChange((p) => ({ ...p, pitch: 0, yaw: 90, roll: 0 }));
            }}
            className="absolute right-2 w-6 h-6 flex items-center justify-center text-white/40 hover:text-white transition-colors text-[10px] cursor-pointer"
            title="Snap Right"
          >
            ▶
          </button>

          {/* Minimize Button */}
          <button
            onClick={toggleResting}
            className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-[#1e222b] border border-white/20 text-neutral-400 hover:text-white flex items-center justify-center text-xs shadow-md transition-all cursor-pointer z-20"
            title="Minimize"
          >
            _
          </button>
        </div>

        {/* Center Illuminated Light-Cone Dome */}
        <div
          onPointerDown={handleCenterPointerDown}
          onPointerMove={handleCenterPointerMove}
          onPointerUp={handleCenterPointerUp}
          onPointerCancel={handleCenterPointerUp}
          onClick={handleCenterClick}
          className="relative w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] rounded-full bg-gradient-to-b from-[#242832] via-[#1a1d24] to-[#121419] border border-white/15 shadow-[0_6px_20px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(255,255,255,0.15)] cursor-grab active:cursor-grabbing flex items-center justify-center overflow-hidden transition-transform active:scale-95 touch-none"
          style={{ touchAction: 'none' }}
          title="Drag center to orbit freely · Double tap to reset"
          role="slider"
          aria-label="Orbit Light Cone"
        >
          {/* Blue Illuminated View Cone / Sector */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(from ${(state.yaw % 360) - 25}deg at 50% 50%, rgba(56,189,248,0.7) 0deg, rgba(56,189,248,0.05) 50deg, transparent 50deg)`,
            }}
          />

          {/* Soft Diffuse Dome Surface */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

          {/* Center LED Pinpoint */}
          <div className="relative w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
        </div>

        {/* Left Satellite Turntable Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChange((p) => ({ ...p, turntableActive: !p.turntableActive }));
          }}
          className={`absolute -bottom-2 -left-2 w-8 h-8 rounded-full border shadow-md flex items-center justify-center transition-all cursor-pointer ${
            state.turntableActive
              ? 'bg-sky-500/20 border-sky-400 text-sky-400'
              : 'bg-[#1e222b] border-white/20 text-neutral-400 hover:text-white'
          }`}
          title="Toggle Turntable Rotation"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
          </svg>
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
