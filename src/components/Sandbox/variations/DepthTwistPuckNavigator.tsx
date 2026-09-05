/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useCallback } from 'react';
import { NavVariationProps } from '../types';
import { playHapticSound } from '../../../utils/audio';

/**
 * Concept 1: Depth & Twist Multi-Axis Puck (exec-3155529c.png)
 * - Resting: Sleek tactile puck with center pin dot and vertical notches.
 * - Active: Slide Pan, Hold+Slide Depth, Twist Rotate arc, Floor grid glyph, Pressure meter.
 */
export const DepthTwistPuckNavigator: React.FC<NavVariationProps> = ({
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

  const [activeGesture, setActiveGesture] = useState<'pan' | 'depth' | 'rotate' | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [currentPressure, setCurrentPressure] = useState<number>(0.2);
  const dragStartRef = useRef<{ x: number; y: number; initialNav: typeof state }>({
    x: 0,
    y: 0,
    initialNav: state,
  });

  const isDark = theme === 'dark';

  const dialRef = useRef<HTMLDivElement>(null);
  const lastPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastAngleRef = useRef<number>(0);

  // Handle pointer down on center puck
  const handlePuckPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const isShiftOrAlt = e.shiftKey || e.altKey;
    const initialGesture = isShiftOrAlt ? 'depth' : 'pan';
    setActiveGesture(initialGesture);

    const pressure = e.pressure && e.pressure > 0 ? e.pressure : 0.65;
    setCurrentPressure(pressure);

    lastPosRef.current = { x: e.clientX, y: e.clientY };

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}

    playHapticSound('click', soundEnabled);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!activeGesture || activeGesture === 'rotate') return;
    e.preventDefault();

    const dx = e.clientX - lastPosRef.current.x;
    const dy = e.clientY - lastPosRef.current.y;
    lastPosRef.current = { x: e.clientX, y: e.clientY };

    const pressure = e.pressure && e.pressure > 0 ? e.pressure : Math.min(1.0, 0.4 + Math.hypot(dx, dy) * 0.02);
    setCurrentPressure(pressure);

    // Visual drag clamp for the physical puck
    const maxOffset = 24;
    setDragOffset((prev) => {
      const nx = prev.x + dx;
      const ny = prev.y + dy;
      const dist = Math.hypot(nx, ny);
      if (dist <= maxOffset) return { x: nx, y: ny };
      const angle = Math.atan2(ny, nx);
      return { x: Math.cos(angle) * maxOffset, y: Math.sin(angle) * maxOffset };
    });

    if (activeGesture === 'pan') {
      onChange((prev) => ({
        ...prev,
        x: prev.x + dx * 0.85,
        y: prev.y - dy * 0.85,
        pressure,
        activeGesture: 'Slide Pan',
      }));
    } else if (activeGesture === 'depth') {
      onChange((prev) => ({
        ...prev,
        z: prev.z - dy * 1.2,
        pressure,
        activeGesture: 'Slide Depth',
      }));
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activeGesture) {
      setActiveGesture(null);
      setDragOffset({ x: 0, y: 0 });
      setCurrentPressure(0.2);
      onChange((prev) => ({ ...prev, activeGesture: null }));
      playHapticSound('pop', soundEnabled);
    }
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  // Twist outer ring drag handler with precise circular tracking
  const handleTwistPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setActiveGesture('rotate');

    const rect = dialRef.current?.getBoundingClientRect() || e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    lastAngleRef.current = Math.atan2(e.clientY - cy, e.clientX - cx);

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}

    playHapticSound('click', soundEnabled);
  };

  const handleTwistPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activeGesture !== 'rotate') return;
    e.preventDefault();

    const rect = dialRef.current?.getBoundingClientRect() || e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const currentAngle = Math.atan2(e.clientY - cy, e.clientX - cx);

    let dAngle = currentAngle - lastAngleRef.current;
    if (dAngle > Math.PI) dAngle -= Math.PI * 2;
    if (dAngle < -Math.PI) dAngle += Math.PI * 2;
    lastAngleRef.current = currentAngle;

    const dDeg = dAngle * (180 / Math.PI);

    onChange((prev) => ({
      ...prev,
      yaw: (prev.yaw + dDeg) % 360,
      activeGesture: 'Twist Rotate',
    }));
    playHapticSound('tick', soundEnabled);
  };

  // Toggle floor grid mode
  const handleFloorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playHapticSound('mode', soundEnabled);
    onChange((prev) => ({
      ...prev,
      floorGridActive: !prev.floorGridActive,
      activeGesture: 'Toggle Floor Mode',
    }));
  };

  // Resting Puck View
  const renderRestingPuck = () => (
    <div className="flex flex-col items-center select-none">
      <div
        onClick={toggleResting}
        title="Tap to expand active gimbal"
        className="w-[72px] h-[72px] rounded-full cursor-pointer transition-transform active:scale-95 flex items-center justify-center relative shadow-[0_8px_20px_rgba(0,0,0,0.6)] border border-neutral-700/60 bg-gradient-to-b from-[#252830] via-[#1a1c22] to-[#121317]"
      >
        {/* Top & bottom vertical notch ticks */}
        <div className="absolute top-1.5 w-[1.5px] h-[7px] bg-neutral-400/80 rounded-full" />
        <div className="absolute bottom-1.5 w-[1.5px] h-[7px] bg-neutral-400/80 rounded-full" />
        {/* Center pin dot */}
        <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
      </div>
      <div className="mt-3 font-mono text-[10px] tracking-widest uppercase opacity-60">Resting</div>
    </div>
  );

  // Active Multi-Ring Controller View
  const renderActiveDial = () => (
    <div
      ref={dialRef}
      className="relative flex flex-col items-center select-none touch-none"
      style={{ touchAction: 'none' }}
    >
      {/* Outer Rotating Coordinate Ring Container */}
      <div className="relative w-[240px] h-[240px] flex items-center justify-center touch-none">
        {/* Diagonal Cross Grid Lines */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-20">
          <div className="w-[260px] h-[1px] bg-white rotate-45" />
          <div className="w-[260px] h-[1px] bg-white -rotate-45" />
        </div>

        {/* Outer Concentric Reticle Rings */}
        <div className="absolute w-[236px] h-[236px] rounded-full border border-neutral-700/50 pointer-events-none" />
        <div className="absolute w-[190px] h-[190px] rounded-full border border-neutral-600/40 pointer-events-none" />

        {/* Twist Outer Ring / Arc Track */}
        <div
          onPointerDown={handleTwistPointerDown}
          onPointerMove={handleTwistPointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="absolute w-[210px] h-[210px] rounded-full cursor-grab active:cursor-grabbing flex items-center justify-center touch-none"
          title="Drag along perimeter to twist rotate"
        >
          {/* Outer Dashed Twist Arc on top right */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 210 210">
            <path
              d="M 148 26 A 95 95 0 0 1 200 105"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.85"
            />
          </svg>
        </div>

        {/* Labeled Annotations */}
        {/* Top: Depth Guide */}
        <div className="absolute -top-5 flex flex-col items-center pointer-events-none">
          <span className="font-mono text-[8px] tracking-widest text-neutral-400 uppercase">Hold + Slide</span>
          <span className="font-mono text-[9px] font-bold text-white tracking-wider">DEPTH</span>
          <div className="text-[9px] text-sky-400 mt-0.5 leading-none">↑<br />↓</div>
        </div>

        {/* Left: Slide Pan Guide */}
        <div className="absolute -left-10 flex flex-col items-end pointer-events-none">
          <span className="font-mono text-[8px] tracking-widest text-neutral-400 uppercase">Slide</span>
          <span className="font-mono text-[9px] font-bold text-white tracking-wider">PAN</span>
          <span className="text-[9px] text-sky-400 leading-none">←··→</span>
        </div>

        {/* Right: Twist Rotate Guide */}
        <div className="absolute -right-12 flex flex-col items-start pointer-events-none">
          <span className="font-mono text-[8px] tracking-widest text-neutral-400 uppercase">Twist</span>
          <span className="font-mono text-[9px] font-bold text-white tracking-wider">ROTATE</span>
          <span className="text-[9px] text-sky-400 leading-none">↗</span>
        </div>

        {/* Inner Physical Beveled Joystick Puck */}
        <div
          onPointerDown={handlePuckPointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{
            transform: `translate(${dragOffset.x}px, ${dragOffset.y}px)`,
          }}
          className="relative z-20 w-[84px] h-[84px] rounded-full cursor-grab active:cursor-grabbing flex items-center justify-center shadow-[0_12px_32px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.25)] border border-neutral-600 bg-gradient-to-b from-[#2b2f38] via-[#1a1c22] to-[#0f1013] transition-transform duration-75 touch-none"
        >
          {/* Top and Bottom Notch Ticks */}
          <div className="absolute top-1.5 w-[2px] h-[8px] bg-neutral-300 rounded-full" />
          <div className="absolute bottom-1.5 w-[2px] h-[8px] bg-neutral-300 rounded-full" />

          {/* Center Glowing Blue LED Indicator */}
          <div className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_10px_#38bdf8]" />

          {/* Active Gesture Ring Glow */}
          {activeGesture && (
            <div className="absolute inset-0 rounded-full border border-sky-400/60 animate-pulse pointer-events-none" />
          )}
        </div>

        {/* Bottom Mode Floor Glyph Button */}
        <button
          onClick={handleFloorClick}
          title="Toggle Active Floor Mode"
          className={`absolute bottom-2.5 z-30 p-2 rounded-lg border transition-all cursor-pointer touch-none ${
            state.floorGridActive
              ? 'bg-sky-500/20 border-sky-400 text-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.4)]'
              : 'bg-neutral-800/80 border-neutral-700 text-neutral-400 hover:text-white'
          }`}
        >
          {/* Isometric Floor Grid Icon */}
          <svg className="w-4 h-4 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </button>
      </div>

      <div className="mt-4 font-mono text-[10px] tracking-widest uppercase opacity-70">Active</div>

      {/* Pressure Meter */}
      <div className="mt-3 flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/90 font-mono text-[9px] text-neutral-300">
        <span className="opacity-60 uppercase tracking-wider">Pressure</span>
        <span className="opacity-40">Light</span>
        <div className="flex items-center gap-1">
          {[0.2, 0.4, 0.6, 0.8, 1.0].map((step, idx) => (
            <div
              key={idx}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                currentPressure >= step ? 'bg-blue-400 shadow-[0_0_6px_#60a5fa]' : 'bg-neutral-700'
              }`}
            />
          ))}
        </div>
        <span className="opacity-40">Firm</span>
      </div>
    </div>
  );

  // Side-by-side showcase mode matching Concept Image 1
  if (displayMode === 'side-by-side') {
    return (
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24 py-4 select-none">
        {/* Left: Resting Monograph Column */}
        <div className="flex flex-col items-center">
          {renderRestingPuck()}
          {/* Subtle Technical Blueprint Legend */}
          <div className="mt-8 space-y-2.5 font-mono text-[10px] text-neutral-400 max-w-[240px]">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full border border-neutral-500/70 inline-block shrink-0" />
              <span className="tracking-wide">Slide to move plane</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-sky-400 font-mono text-[11px] w-2.5 text-center shrink-0">↕</span>
              <span className="tracking-wide">Hold + slide for depth</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-sky-400 font-mono text-[11px] w-2.5 text-center shrink-0">↻</span>
              <span className="tracking-wide">Twist perimeter to rotate</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded border border-sky-400/80 inline-block shrink-0" />
              <span className="tracking-wide">Floor glyph mode</span>
            </div>
          </div>
        </div>

        {/* Center Hairline Divider */}
        <div className="hidden md:block w-px h-64 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

        {/* Right: Active Controller Column */}
        <div className="flex flex-col items-center">
          {renderActiveDial()}
        </div>
      </div>
    );
  }

  // Single interactive mode with toggle
  return isResting ? renderRestingPuck() : renderActiveDial();
};
