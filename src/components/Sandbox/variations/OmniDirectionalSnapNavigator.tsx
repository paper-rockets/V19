/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { NavVariationProps } from '../types';
import { playHapticSound } from '../../../utils/audio';

/**
 * Concept 7: Omni-Directional 3D Snap Dome (exec-4110edb9.png)
 * - Center spherical joystick knob with 4 blue directional arrows
 * - Surrounding reticle with 3D cube camera snap targets (Isometric, Turntable, Side, Front)
 * - Collapsed mini-puck preview
 */
export const OmniDirectionalSnapNavigator: React.FC<NavVariationProps> = ({
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

  const [isDraggingSphere, setIsDraggingSphere] = useState(false);
  const [sphereOffset, setSphereOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragStartRef = useRef<{ x: number; y: number; initialNav: typeof state }>({
    x: 0,
    y: 0,
    initialNav: state,
  });

  const lastPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    setIsDraggingSphere(true);
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    playHapticSound('click', soundEnabled);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingSphere) return;
    e.preventDefault();
    const dx = e.clientX - lastPosRef.current.x;
    const dy = e.clientY - lastPosRef.current.y;
    lastPosRef.current = { x: e.clientX, y: e.clientY };

    const maxOffset = 22;
    setSphereOffset((prev) => {
      const nx = prev.x + dx;
      const ny = prev.y + dy;
      const dist = Math.hypot(nx, ny);
      if (dist <= maxOffset) return { x: nx, y: ny };
      const angle = Math.atan2(ny, nx);
      return { x: Math.cos(angle) * maxOffset, y: Math.sin(angle) * maxOffset };
    });

    onChange((prev) => ({
      ...prev,
      yaw: (prev.yaw + dx * 0.85) % 360,
      pitch: Math.max(-85, Math.min(85, prev.pitch - dy * 0.85)),
      activeGesture: 'Omni Sphere Drag',
    }));
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingSphere) {
      setIsDraggingSphere(false);
      setSphereOffset({ x: 0, y: 0 });
      onChange((prev) => ({ ...prev, activeGesture: null }));
      playHapticSound('pop', soundEnabled);
    }
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  // Camera Snapping Actions
  const handleSnapIso = (e: React.MouseEvent) => {
    e.stopPropagation();
    playHapticSound('snap', soundEnabled);
    onChange((prev) => ({
      ...prev,
      pitch: 30,
      yaw: -45,
      roll: 0,
      activeGesture: 'Snap Isometric',
    }));
  };

  const handleToggleTurntable = (e: React.MouseEvent) => {
    e.stopPropagation();
    playHapticSound('mode', soundEnabled);
    onChange((prev) => ({
      ...prev,
      turntableActive: !prev.turntableActive,
      activeGesture: prev.turntableActive ? 'Stop Turntable' : 'Start Turntable',
    }));
  };

  const handleSnapFront = (e: React.MouseEvent) => {
    e.stopPropagation();
    playHapticSound('snap', soundEnabled);
    onChange((prev) => ({
      ...prev,
      pitch: 0,
      yaw: 0,
      roll: 0,
      activeGesture: 'Snap Front View',
    }));
  };

  const handleSnapSide = (e: React.MouseEvent) => {
    e.stopPropagation();
    playHapticSound('snap', soundEnabled);
    onChange((prev) => ({
      ...prev,
      pitch: 0,
      yaw: 90,
      roll: 0,
      activeGesture: 'Snap Side View',
    }));
  };

  // Collapsed View
  const renderCollapsedPuck = () => (
    <div className="flex flex-col items-center select-none touch-none">
      <div
        onClick={toggleResting}
        title="Tap to expand 3D Dome"
        className="w-[64px] h-[64px] rounded-full cursor-pointer flex items-center justify-center relative shadow-lg border border-neutral-700 bg-gradient-to-b from-[#3a3f4e] via-[#242730] to-[#121316] active:scale-95 transition-transform touch-none"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_white] pointer-events-none" />
      </div>
      <span className="mt-2 font-mono text-[9px] uppercase tracking-wider text-neutral-400">Collapsed</span>
    </div>
  );

  // Active Omni-Directional 3D Dome Controller
  const renderActiveDial = () => (
    <div
      className="relative flex flex-col items-center select-none touch-none"
      style={{ touchAction: 'none' }}
    >
      <div className="relative w-[230px] h-[230px] rounded-full flex items-center justify-center border border-neutral-700/60 bg-[#16181f]/40 shadow-[0_12px_36px_rgba(0,0,0,0.8)] touch-none">
        {/* Top Button: Snap Isometric */}
        <button
          onClick={handleSnapIso}
          title="Snap to Isometric View"
          className="absolute top-1 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-neutral-300 hover:text-white active:scale-95 transition-all cursor-pointer touch-none"
        >
          <svg className="w-5 h-5 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </button>

        {/* Bottom Button: Auto-Turntable Rotation */}
        <button
          onClick={handleToggleTurntable}
          title="Toggle Auto-Turntable Rotation"
          className={`absolute bottom-1 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg transition-all cursor-pointer touch-none ${
            state.turntableActive
              ? 'bg-sky-500/20 text-sky-300 border border-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.4)]'
              : 'text-neutral-300 hover:text-white'
          }`}
        >
          <svg className="w-5 h-5 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
          </svg>
        </button>

        {/* Left Button: Snap Side View */}
        <button
          onClick={handleSnapSide}
          title="Snap to Side View"
          className="absolute left-1 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-neutral-300 hover:text-white active:scale-95 transition-all cursor-pointer touch-none"
        >
          <svg className="w-4 h-4 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="16" />
          </svg>
        </button>

        {/* Right Button: Snap Front View */}
        <button
          onClick={handleSnapFront}
          title="Snap to Front View"
          className="absolute right-1 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-neutral-300 hover:text-white active:scale-95 transition-all cursor-pointer touch-none"
        >
          <svg className="w-4 h-4 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
        </button>

        {/* Center Spherical 3D Joystick Dome */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{
            transform: `translate(${sphereOffset.x}px, ${sphereOffset.y}px)`,
          }}
          className="relative z-20 w-[84px] h-[84px] rounded-full cursor-grab active:cursor-grabbing flex items-center justify-center border-2 border-neutral-500 shadow-[0_12px_28px_rgba(0,0,0,0.85),inset_0_2px_4px_rgba(255,255,255,0.4)] bg-gradient-to-b from-[#4a505e] via-[#242730] to-[#121418] transition-transform duration-75 touch-none"
        >
          {/* 4 Blue Directional Cardinal Arrows */}
          <div className="absolute top-1 text-sky-400 text-xs font-bold pointer-events-none">↑</div>
          <div className="absolute bottom-1 text-sky-400 text-xs font-bold pointer-events-none">↓</div>
          <div className="absolute left-1.5 text-sky-400 text-xs font-bold pointer-events-none">←</div>
          <div className="absolute right-1.5 text-sky-400 text-xs font-bold pointer-events-none">→</div>

          {/* Center specular highlight glint */}
          <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_white] pointer-events-none" />
        </div>
      </div>

      <button
        onClick={toggleResting}
        className="mt-3 text-[10px] font-mono text-neutral-400 hover:text-white uppercase tracking-wider cursor-pointer p-2 touch-none"
      >
        Collapse
      </button>
    </div>
  );

  if (displayMode === 'side-by-side') {
    return (
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24 py-4 select-none">
        <div className="flex flex-col items-center">
          {renderCollapsedPuck()}
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
