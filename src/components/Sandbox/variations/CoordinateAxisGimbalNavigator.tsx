/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { NavVariationProps } from '../types';
import { playHapticSound } from '../../../utils/audio';

/**
 * Concept 5: Coordinate Axis Gimbal (exec-8cb3d224.png)
 * - Labeled axes: Y/Y (vertical), X/X (horizontal), Z/Z (depth)
 * - Center dome joystick puck
 * - Integrated base mode pill: "Flat | 3D" view toggle
 */
export const CoordinateAxisGimbalNavigator: React.FC<NavVariationProps> = ({
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

  const [activeAxis, setActiveAxis] = useState<'X' | 'Y' | 'Z' | 'free' | null>(null);
  const [domeOffset, setDomeOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const isFlat = state.projection === 'orthographic';
  const lastPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    setActiveAxis('free');
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    playHapticSound('click', soundEnabled);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!activeAxis) return;
    e.preventDefault();
    const dx = e.clientX - lastPosRef.current.x;
    const dy = e.clientY - lastPosRef.current.y;
    lastPosRef.current = { x: e.clientX, y: e.clientY };

    const maxOffset = 24;
    setDomeOffset((prev) => {
      const nx = prev.x + dx;
      const ny = prev.y + dy;
      const dist = Math.hypot(nx, ny);
      if (dist <= maxOffset) return { x: nx, y: ny };
      const angle = Math.atan2(ny, nx);
      return { x: Math.cos(angle) * maxOffset, y: Math.sin(angle) * maxOffset };
    });

    if (isFlat) {
      // In Flat mode, drag strictly translates on screen plane X / Y
      onChange((prev) => ({
        ...prev,
        x: prev.x + dx * 0.85,
        y: prev.y - dy * 0.85,
        activeGesture: 'Flat Pan [X, Y]',
      }));
    } else {
      // In 3D mode, pan and orbit
      onChange((prev) => ({
        ...prev,
        yaw: (prev.yaw + dx * 0.85) % 360,
        pitch: Math.max(-85, Math.min(85, prev.pitch - dy * 0.85)),
        activeGesture: '3D Orbit [Yaw, Pitch]',
      }));
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activeAxis) {
      setActiveAxis(null);
      setDomeOffset({ x: 0, y: 0 });
      onChange((prev) => ({ ...prev, activeGesture: null }));
      playHapticSound('pop', soundEnabled);
    }
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  // Switch between Flat and 3D modes
  const handleModeToggle = (mode: 'flat' | '3d') => {
    playHapticSound('mode', soundEnabled);
    if (mode === 'flat') {
      onChange((prev) => ({
        ...prev,
        projection: 'orthographic',
        pitch: 0,
        yaw: 0,
        roll: 0,
        activeGesture: 'Switch to Flat 2D View',
      }));
    } else {
      onChange((prev) => ({
        ...prev,
        projection: 'perspective',
        pitch: 15,
        yaw: -30,
        activeGesture: 'Switch to 3D Space View',
      }));
    }
  };

  // Resting View
  const renderRestingPuck = () => (
    <div className="flex flex-col items-center select-none touch-none">
      <div
        onClick={toggleResting}
        title="Tap to expand axis gimbal"
        className="w-[64px] h-[64px] rounded-full cursor-pointer flex items-center justify-center relative shadow-lg border border-neutral-700 bg-gradient-to-b from-[#282b34] to-[#121316] active:scale-95 transition-transform touch-none"
      >
        <div className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
      </div>
      <span className="mt-2 font-mono text-[9px] tracking-wider uppercase text-neutral-400">Resting</span>
    </div>
  );

  // Active Axis Gimbal
  const renderActiveDial = () => (
    <div
      className="relative flex flex-col items-center select-none touch-none"
      style={{ touchAction: 'none' }}
    >
      <div className="relative w-[230px] h-[230px] rounded-full flex items-center justify-center border border-neutral-700/60 bg-[#16181f]/40 shadow-[0_8px_32px_rgba(0,0,0,0.6)] touch-none">
        {/* Y-Axis Labels (Top and Bottom) */}
        <div className="absolute top-2.5 flex flex-col items-center font-mono text-[10px] font-bold text-neutral-300 pointer-events-none">
          <span>Y</span>
          <span className="text-[8px] opacity-60">Y</span>
        </div>
        <div className="absolute bottom-2.5 flex flex-col items-center font-mono text-[10px] font-bold text-neutral-300 pointer-events-none">
          <span className="text-[8px] opacity-60">Y</span>
          <span>Y</span>
        </div>

        {/* X-Axis Labels (Left and Right) */}
        <div className="absolute left-3 flex items-center gap-1 font-mono text-[10px] font-bold text-neutral-300 pointer-events-none">
          <span>X</span>
          <span className="text-[8px] opacity-60">X</span>
        </div>
        <div className="absolute right-3 flex items-center gap-1 font-mono text-[10px] font-bold text-neutral-300 pointer-events-none">
          <span className="text-[8px] opacity-60">X</span>
          <span>X</span>
        </div>

        {/* Z-Axis Labels (Diagonal) */}
        <div className="absolute bottom-5 right-5 font-mono text-[9px] font-semibold text-neutral-400 pointer-events-none">
          Z Z
        </div>

        {/* Inner Subtle Coordinate Reticle */}
        <div className="absolute w-[140px] h-[140px] rounded-full border border-neutral-700/40 pointer-events-none" />

        {/* Center Metallic Dome Joystick Puck */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{
            transform: `translate(${domeOffset.x}px, ${domeOffset.y}px)`,
          }}
          className="relative z-20 w-[76px] h-[76px] rounded-full cursor-grab active:cursor-grabbing flex items-center justify-center border border-neutral-500 shadow-[0_10px_24px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.3)] bg-gradient-to-b from-[#3a3f4d] via-[#22252c] to-[#121418] transition-transform duration-75 touch-none"
        >
          {/* Metallic Dome Glint */}
          <div className="w-2 h-2 rounded-full bg-white/80 shadow-[0_0_6px_rgba(255,255,255,0.8)] pointer-events-none" />
        </div>
      </div>

      {/* Integrated Bottom Mode Pill: "Flat | 3D" */}
      <div className="-mt-3 z-30 flex items-center p-1 rounded-full border border-neutral-700 bg-neutral-900/95 shadow-lg touch-none">
        <button
          onClick={() => handleModeToggle('flat')}
          className={`min-w-[44px] min-h-[44px] px-4 py-1.5 rounded-full text-[11px] font-mono transition-colors cursor-pointer flex items-center justify-center ${
            isFlat
              ? 'bg-sky-500 text-white shadow-[0_0_10px_rgba(56,189,248,0.5)] font-bold'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Flat
        </button>
        <button
          onClick={() => handleModeToggle('3d')}
          className={`min-w-[44px] min-h-[44px] px-4 py-1.5 rounded-full text-[11px] font-mono transition-colors cursor-pointer flex items-center justify-center ${
            !isFlat
              ? 'bg-sky-500 text-white shadow-[0_0_10px_rgba(56,189,248,0.5)] font-bold'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          3D
        </button>
      </div>
    </div>
  );

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
