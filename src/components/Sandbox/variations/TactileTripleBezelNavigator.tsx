/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { NavVariationProps } from '../types';
import { playHapticSound } from '../../../utils/audio';

/**
 * Concept 3: Tactile Triple-Bezel Gimbal (exec-d93302dc.png)
 * - Compact puck resting state with dual metallic lip bevel
 * - Active 3-tier concentric bezel: LOOK (center blue dot) + TILT + ORBIT
 */
export const TactileTripleBezelNavigator: React.FC<NavVariationProps> = ({
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

  const [activeTier, setActiveTier] = useState<'look' | 'tilt' | 'orbit' | null>(null);
  const dragStartRef = useRef<{ x: number; y: number; initialNav: typeof state }>({
    x: 0,
    y: 0,
    initialNav: state,
  });

  const dialRef = useRef<HTMLDivElement>(null);
  const lastPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastAngleRef = useRef<number>(0);

  // Unified Pointer Down for 3 Concentric Bezel Tiers
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

    let tier: 'look' | 'tilt' | 'orbit' = 'orbit';
    if (dist <= 48) {
      tier = 'look';
    } else if (dist <= 88) {
      tier = 'tilt';
    } else {
      tier = 'orbit';
    }

    setActiveTier(tier);
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    lastAngleRef.current = Math.atan2(dy, dx);

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}

    playHapticSound('click', soundEnabled);
  };

  // Unified Pointer Move
  const handleDialPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!activeTier) return;
    e.preventDefault();

    const rect = dialRef.current?.getBoundingClientRect();
    if (!rect) return;

    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    if (activeTier === 'look') {
      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;
      onChange((prev) => ({
        ...prev,
        x: prev.x + dx * 0.85,
        y: prev.y - dy * 0.85,
        activeGesture: 'Look / Pan',
      }));
    } else if (activeTier === 'tilt') {
      const dy = e.clientY - lastPosRef.current.y;
      onChange((prev) => ({
        ...prev,
        pitch: Math.max(-85, Math.min(85, prev.pitch - dy * 0.85)),
        activeGesture: 'Tilt',
      }));
      playHapticSound('tick', soundEnabled);
    } else if (activeTier === 'orbit') {
      const currentAngle = Math.atan2(e.clientY - cy, e.clientX - cx);
      let dAngle = currentAngle - lastAngleRef.current;

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

  const handleDialPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activeTier) {
      setActiveTier(null);
      onChange((prev) => ({ ...prev, activeGesture: null }));
      playHapticSound('pop', soundEnabled);
    }
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  // Resting Compact Puck
  const renderRestingPuck = () => (
    <div className="flex flex-col items-center select-none touch-none">
      <div
        onClick={toggleResting}
        title="Tap to expand camera gimbal"
        className="w-[76px] h-[76px] rounded-full cursor-pointer flex items-center justify-center relative shadow-[0_12px_28px_rgba(0,0,0,0.7),inset_0_2px_2px_rgba(255,255,255,0.2)] border-2 border-[#32363f] bg-gradient-to-b from-[#2a2d36] via-[#1c1e24] to-[#121317] active:scale-95 transition-transform touch-none"
      >
        {/* Dual concentric beveled lip */}
        <div className="w-[54px] h-[54px] rounded-full border border-neutral-700/80 bg-gradient-to-b from-[#242730] to-[#15171d] flex items-center justify-center shadow-inner">
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
        </div>
      </div>
      <div className="mt-3 text-center font-sans">
        <div className="font-mono text-[9px] tracking-widest uppercase text-white font-bold">Resting</div>
        <div className="text-[9px] text-neutral-400 mt-0.5">Compact puck</div>
      </div>
    </div>
  );

  // Active Triple-Tier Camera Gimbal (Master Annular Touch Surface)
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
      {/* Tier 1: Outer "ORBIT" Ring */}
      <div
        className={`absolute inset-0 rounded-full flex flex-col items-center justify-start pt-2 border-2 transition-colors ${
          activeTier === 'orbit' ? 'border-sky-400/80 bg-[#252834]' : 'border-[#333742] bg-gradient-to-b from-[#232630] via-[#181a20] to-[#0f1013]'
        } shadow-[0_16px_36px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.15)]`}
      >
        <span className="font-mono text-[9px] font-bold tracking-widest text-neutral-300 pointer-events-none">
          ORBIT
        </span>

        {/* Precision Tick Marks */}
        <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
          <div className="w-2.5 h-[1.5px] bg-neutral-400" />
          <div className="w-2.5 h-[1.5px] bg-neutral-400" />
        </div>
        <div className="absolute inset-y-2 left-1/2 -translate-x-1/2 flex flex-col justify-between pointer-events-none">
          <div className="w-[1.5px] h-2.5 bg-neutral-400" />
          <div className="w-[1.5px] h-2.5 bg-neutral-400" />
        </div>
      </div>

      {/* Tier 2: Middle "TILT" Ring */}
      <div
        className={`absolute w-[164px] h-[164px] rounded-full pointer-events-none flex flex-col items-center justify-start pt-1.5 border transition-colors ${
          activeTier === 'tilt' ? 'border-sky-400/80 bg-[#282d38]' : 'border-[#3e4350] bg-gradient-to-b from-[#2a2d36] to-[#16181e]'
        } shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]`}
      >
        <span className="font-mono text-[9px] font-bold tracking-widest text-neutral-400 pointer-events-none">
          TILT
        </span>
        <div className="absolute top-1.5 w-[1px] h-2 bg-neutral-500" />
      </div>

      {/* Tier 3: Inner "LOOK" Center Puck */}
      <div
        className={`relative z-20 w-[96px] h-[96px] rounded-full pointer-events-none flex flex-col items-center justify-center border-2 transition-all ${
          activeTier === 'look' ? 'border-sky-400 scale-95 shadow-[0_0_15px_rgba(56,189,248,0.5)]' : 'border-[#454b5a] shadow-[0_8px_24px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(255,255,255,0.25)]'
        } bg-gradient-to-b from-[#313642] via-[#1f222a] to-[#121317]`}
      >
        <span className="font-mono text-[10px] font-bold tracking-widest text-neutral-200 pointer-events-none">
          LOOK
        </span>
        {/* Glowing Pinpoint Cyan LED */}
        <div className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_10px_#38bdf8] mt-1 pointer-events-none" />
      </div>
    </div>
  );

  // Side-by-side showcase mode matching Image 3
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
