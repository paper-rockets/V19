/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { NavVariationProps } from '../types';
import { playHapticSound } from '../../../utils/audio';

/**
 * Concept 4: Floating SCENE Joystick Nub (exec-fa01295a.png)
 * - "SCENE" header with cyan 12 o'clock notch tick
 * - Center floating joystick puck with glowing blue trail
 * - Collapsed mini-puck with chevron expand toggle
 */
export const FloatingNubNavigator: React.FC<NavVariationProps> = ({
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

  const [isDragging, setIsDragging] = useState(false);
  const [nubPos, setNubPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; y: number; initialNav: typeof state }>({
    x: 0,
    y: 0,
    initialNav: state,
  });

  const maxRadius = 60; // maximum displacement radius

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      initialNav: { ...state },
    };
    playHapticSound('click', soundEnabled);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;

    const dist = Math.hypot(dx, dy);
    const clampedDist = Math.min(maxRadius, dist);
    const angle = Math.atan2(dy, dx);
    const clampedX = Math.cos(angle) * clampedDist;
    const clampedY = Math.sin(angle) * clampedDist;

    setNubPos({ x: clampedX, y: clampedY });

    // Update rotation and translation simultaneously
    onChange((prev) => ({
      ...prev,
      yaw: (dragStartRef.current.initialNav.yaw + dx * 0.8) % 360,
      pitch: Math.max(-85, Math.min(85, dragStartRef.current.initialNav.pitch - dy * 0.6)),
      x: dragStartRef.current.initialNav.x + dx * 0.4,
      activeGesture: 'Joystick Orbit',
    }));
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      setIsDragging(false);
      // Spring return to center
      setNubPos({ x: 0, y: 0 });
      onChange((prev) => ({ ...prev, activeGesture: null }));
      playHapticSound('pop', soundEnabled);
    }
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  // Collapsed Mini-Puck
  const renderCollapsedPuck = () => (
    <div className="flex items-center gap-2 select-none touch-none">
      <div
        onClick={toggleResting}
        title="Expand Scene Joystick"
        className="w-[56px] h-[56px] rounded-full cursor-pointer flex items-center justify-center relative shadow-lg border border-neutral-700 bg-gradient-to-b from-[#242730] to-[#121316] active:scale-95 transition-transform touch-none"
      >
        {/* Top cyan notch */}
        <div className="absolute top-1.5 w-[2px] h-1.5 bg-sky-400 rounded-full" />
        {/* 4 Crosshair Dots */}
        <div className="relative w-4 h-4 flex items-center justify-center pointer-events-none">
          <div className="absolute -top-1 w-1 h-1 rounded-full bg-neutral-400" />
          <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-neutral-400" />
          <div className="absolute -left-1 w-1 h-1 rounded-full bg-neutral-400" />
          <div className="absolute -right-1 w-1 h-1 rounded-full bg-neutral-400" />
          <div className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_6px_#38bdf8]" />
        </div>
      </div>
      <button
        onClick={toggleResting}
        className="p-2 rounded-full text-neutral-400 hover:text-white cursor-pointer touch-none"
      >
        <svg className="w-4 h-4 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );

  // Active Floating Joystick Nub View
  const renderActiveDial = () => (
    <div
      className="relative flex flex-col items-center select-none touch-none"
      style={{ touchAction: 'none' }}
    >
      {/* SCENE Header Label */}
      <div className="mb-2 font-mono text-[10px] font-bold tracking-widest uppercase text-neutral-300 pointer-events-none">
        SCENE
      </div>

      {/* Main Reticle Dial Container */}
      <div
        ref={containerRef}
        className="relative w-[230px] h-[230px] rounded-full flex items-center justify-center border border-neutral-700/60 bg-[#16181f]/30 shadow-[0_8px_32px_rgba(0,0,0,0.6)] touch-none"
      >
        {/* Cardinal Tick Marks */}
        {/* Top Tick (Highlighted Cyan) */}
        <div className="absolute top-2 w-[2px] h-3 bg-sky-400 shadow-[0_0_8px_#38bdf8] rounded-full pointer-events-none" />
        {/* Bottom Tick */}
        <div className="absolute bottom-2 w-[1.5px] h-2.5 bg-neutral-500 rounded-full pointer-events-none" />
        {/* Left Tick */}
        <div className="absolute left-2 w-2.5 h-[1.5px] bg-neutral-500 rounded-full pointer-events-none" />
        {/* Right Tick */}
        <div className="absolute right-2 w-2.5 h-[1.5px] bg-neutral-500 rounded-full pointer-events-none" />

        {/* Dynamic Motion Trail SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 230 230">
          {isDragging && (
            <>
              {/* Glowing tether curve */}
              <line
                x1="115"
                y1="115"
                x2={115 + nubPos.x}
                y2={115 + nubPos.y}
                stroke="#38bdf8"
                strokeWidth="2"
                strokeDasharray="3 3"
                opacity="0.8"
              />
              {/* Translucent swept circle */}
              <circle
                cx={115 + nubPos.x}
                cy={115 + nubPos.y}
                r="26"
                fill="#38bdf8"
                opacity="0.15"
              />
            </>
          )}
        </svg>

        {/* Center Origin Reference Ring */}
        <div className="absolute w-4 h-4 rounded-full border border-neutral-600/50 pointer-events-none" />

        {/* Floating Physical Joystick Nub */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{
            transform: `translate(${nubPos.x}px, ${nubPos.y}px)`,
          }}
          className={`relative z-20 w-[64px] h-[64px] rounded-full cursor-grab active:cursor-grabbing flex items-center justify-center border border-neutral-500 shadow-[0_8px_20px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.3)] bg-gradient-to-b from-[#2e323d] via-[#1c1e24] to-[#121317] touch-none ${
            isDragging ? 'scale-105' : 'transition-transform duration-150'
          }`}
        >
          {/* Subtle center glint */}
          <div className="w-1.5 h-1.5 rounded-full bg-sky-300 shadow-[0_0_6px_#38bdf8]" />
        </div>
      </div>

      {/* Collapse button */}
      <button
        onClick={toggleResting}
        className="mt-3 text-[10px] font-mono text-neutral-400 hover:text-white uppercase tracking-wider cursor-pointer p-2 touch-none"
      >
        Collapse
      </button>
    </div>
  );

  // Side-by-side mode
  if (displayMode === 'side-by-side') {
    return (
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24 py-4 select-none">
        <div className="flex flex-col items-center">
          {renderCollapsedPuck()}
          <p className="mt-4 font-mono text-[10px] text-neutral-400 uppercase tracking-widest">Resting Puck</p>
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
