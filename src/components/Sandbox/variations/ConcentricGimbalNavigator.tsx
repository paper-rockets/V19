/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useCallback } from 'react';
import { NavVariationProps } from '../types';
import { playHapticSound } from '../../../utils/audio';

/**
 * Concept 2: Concentric Gimbal Dial (exec-b3c65c9f.png)
 * - 3 Concentric Functional Rings: Look (center) + Tilt (middle) + Orbit (outer arc handle)
 * - Radial degree tick marks
 * - Collapsed corner mini-puck preview with camera icon
 */
export const ConcentricGimbalNavigator: React.FC<NavVariationProps> = ({
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

  const dialRef = useRef<HTMLDivElement>(null);
  const [activeZone, setActiveZone] = useState<'look' | 'tilt' | 'orbit' | null>(null);
  const lastPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastAngleRef = useRef<number>(0);

  // Orbit angle normalized to 0..360 for visual bead placement
  const currentOrbitDeg = ((state.yaw % 360) + 360) % 360;
  const orbitRad = (currentOrbitDeg * Math.PI) / 180;
  const orbitRadius = 108;
  const beadX = 120 + Math.cos(orbitRad - Math.PI / 2) * orbitRadius;
  const beadY = 120 + Math.sin(orbitRad - Math.PI / 2) * orbitRadius;

  // Master Unified Touch Pointer Down
  const handleDialPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const rect = dialRef.current?.getBoundingClientRect();
    if (!rect) return;

    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    const angle = Math.atan2(dy, dx);

    // Annular zone detection:
    // Center look puck: radius 0 - 45px
    // Middle tilt ring: radius 45 - 85px
    // Outer orbit ring: radius 85+ px
    let zone: 'look' | 'tilt' | 'orbit' = 'orbit';
    if (dist <= 45) {
      zone = 'look';
    } else if (dist <= 85) {
      zone = 'tilt';
    } else {
      zone = 'orbit';
    }

    setActiveZone(zone);
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    lastAngleRef.current = angle;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}

    playHapticSound('click', soundEnabled);
  };

  // Master Unified Touch Pointer Move (Fluid 1:1 Response)
  const handleDialPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!activeZone) return;
    e.preventDefault();

    const rect = dialRef.current?.getBoundingClientRect();
    if (!rect) return;

    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    if (activeZone === 'look') {
      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;
      onChange((prev) => ({
        ...prev,
        x: prev.x + dx * 0.85,
        y: prev.y - dy * 0.85,
        activeGesture: 'Look / Pan',
      }));
    } else if (activeZone === 'tilt') {
      const dy = e.clientY - lastPosRef.current.y;
      onChange((prev) => ({
        ...prev,
        pitch: Math.max(-85, Math.min(85, prev.pitch - dy * 0.85)),
        activeGesture: 'Tilt',
      }));
      playHapticSound('tick', soundEnabled);
    } else if (activeZone === 'orbit') {
      const currentAngle = Math.atan2(e.clientY - cy, e.clientX - cx);
      let dAngle = currentAngle - lastAngleRef.current;

      // Handle -PI to +PI modular wrap-around seamlessly
      if (dAngle > Math.PI) dAngle -= Math.PI * 2;
      if (dAngle < -Math.PI) dAngle += Math.PI * 2;

      lastAngleRef.current = currentAngle;
      const dDeg = dAngle * (180 / Math.PI);

      onChange((prev) => ({
        ...prev,
        yaw: (prev.yaw + dDeg) % 360,
        activeGesture: 'Orbit',
      }));
      playHapticSound('tick', soundEnabled);
    }

    lastPosRef.current = { x: e.clientX, y: e.clientY };
  };

  // Master Unified Touch Pointer Up & Cancel
  const handleDialPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activeZone) {
      setActiveZone(null);
      onChange((prev) => ({ ...prev, activeGesture: null }));
      playHapticSound('pop', soundEnabled);
    }
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  // Collapsed Mini-Puck Component
  const renderCollapsedPuck = () => (
    <div className="flex flex-col items-center select-none touch-none">
      <div
        onClick={toggleResting}
        title="Expand Orbit Gimbal"
        className="w-[56px] h-[56px] rounded-full cursor-pointer flex items-center justify-center relative shadow-[0_8px_20px_rgba(0,0,0,0.6)] border border-neutral-700 bg-gradient-to-b from-[#252830] via-[#1a1c22] to-[#121317] active:scale-95 transition-transform touch-none"
      >
        {/* Top cyan notch */}
        <div className="absolute top-1.5 w-1 h-1 rounded-full bg-sky-400 shadow-[0_0_6px_#38bdf8]" />
        {/* Camera Icon */}
        <svg className="w-5 h-5 text-neutral-300 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      </div>
      <span className="mt-2 font-mono text-[9px] tracking-wider uppercase text-neutral-400">Collapsed</span>
    </div>
  );

  // Active 3-Zone Concentric Dial (Master Annular Touch Surface)
  const renderActiveDial = () => (
    <div
      ref={dialRef}
      onPointerDown={handleDialPointerDown}
      onPointerMove={handleDialPointerMove}
      onPointerUp={handleDialPointerUp}
      onPointerCancel={handleDialPointerUp}
      className="relative w-[240px] h-[240px] flex items-center justify-center select-none touch-none cursor-grab active:cursor-grabbing"
      style={{ touchAction: 'none' }}
    >
      {/* Outer Orbit Zone Ring */}
      <div
        className={`absolute inset-0 rounded-full flex items-center justify-center border transition-colors ${
          activeZone === 'orbit' ? 'border-sky-400/80 bg-[#16181f]/60' : 'border-neutral-700/60 bg-[#16181f]/40'
        }`}
      >
        {/* Radial Degree Ticks */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 240 240">
          {Array.from({ length: 36 }).map((_, i) => {
            const angle = (i * 10 * Math.PI) / 180;
            const isMajor = i % 9 === 0;
            const r1 = isMajor ? 111 : 113;
            const r2 = 118;
            const x1 = 120 + Math.cos(angle) * r1;
            const y1 = 120 + Math.sin(angle) * r1;
            const x2 = 120 + Math.cos(angle) * r2;
            const y2 = 120 + Math.sin(angle) * r2;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isMajor ? '#cbd5e1' : '#475569'}
                strokeWidth={isMajor ? 1.5 : 1}
              />
            );
          })}

          {/* Active Orbit Arc Segment (glowing cyan track) */}
          <path
            d={`M ${120 + Math.cos(orbitRad - Math.PI / 2 - 0.6) * orbitRadius} ${120 + Math.sin(orbitRad - Math.PI / 2 - 0.6) * orbitRadius} A ${orbitRadius} ${orbitRadius} 0 0 1 ${beadX} ${beadY}`}
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Draggable Orbit Handle Bead */}
          <circle
            cx={beadX}
            cy={beadY}
            r="7"
            fill="#e0f2fe"
            stroke="#0284c7"
            strokeWidth="2"
            className="filter drop-shadow-[0_0_8px_#38bdf8]"
          />
        </svg>

        {/* Orbit Label at 12 o'clock */}
        <div className="absolute top-2.5 font-mono text-[9px] tracking-widest uppercase text-neutral-300 pointer-events-none">
          Orbit
        </div>
      </div>

      {/* Middle "Tilt" Zone Ring */}
      <div
        className={`absolute w-[164px] h-[164px] rounded-full pointer-events-none flex flex-col items-center justify-start pt-1.5 border transition-colors ${
          activeZone === 'tilt' ? 'border-sky-400/80 bg-[#252934]' : 'border-neutral-600/60 bg-gradient-to-b from-[#21242d] to-[#15171d]'
        } shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]`}
      >
        <span className="font-mono text-[9px] tracking-widest uppercase text-neutral-400 pointer-events-none">
          Tilt
        </span>
        {/* Cardinal notch indicators */}
        <div className="absolute inset-y-0 w-full flex items-center justify-between px-1 pointer-events-none">
          <div className="w-1.5 h-[1px] bg-neutral-500" />
          <div className="w-1.5 h-[1px] bg-neutral-500" />
        </div>
      </div>

      {/* Inner "Look" Center Puck */}
      <div
        className={`relative z-20 w-[88px] h-[88px] rounded-full pointer-events-none flex flex-col items-center justify-center border transition-all ${
          activeZone === 'look' ? 'border-sky-400 scale-95 shadow-[0_0_15px_rgba(56,189,248,0.4)]' : 'border-neutral-500 shadow-[0_10px_25px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)]'
        } bg-gradient-to-b from-[#2c303a] via-[#1d1f26] to-[#111216]`}
      >
        <span className="font-mono text-[10px] font-semibold tracking-wider text-neutral-200 pointer-events-none">
          Look
        </span>
        <svg className="w-4 h-4 text-sky-400 mt-0.5 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      </div>

      {/* Quick Collapse Trigger Pill at bottom right */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleResting();
        }}
        title="Collapse to mini puck"
        className="absolute -bottom-3 -right-3 p-2 rounded-full border border-neutral-700 bg-neutral-900/90 text-neutral-400 hover:text-white cursor-pointer transition-colors shadow-lg z-30"
      >
        <svg className="w-3.5 h-3.5 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="4 14 10 14 10 20" />
          <polyline points="20 10 14 10 14 4" />
        </svg>
      </button>
    </div>
  );

  // Side-by-side display mode
  if (displayMode === 'side-by-side') {
    return (
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24 py-4 select-none">
        <div className="flex flex-col items-center">
          {renderCollapsedPuck()}
          <p className="mt-6 text-[10px] text-neutral-400 max-w-[220px] text-center font-mono tracking-wide leading-relaxed">
            Compact puck docks unobtrusively in the canvas corner with instant tap-to-expand.
          </p>
        </div>
        <div className="hidden md:block w-px h-64 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        <div className="flex flex-col items-center">
          {renderActiveDial()}
        </div>
      </div>
    );
  }

  return isResting ? renderCollapsedPuck() : renderActiveDial();
};
