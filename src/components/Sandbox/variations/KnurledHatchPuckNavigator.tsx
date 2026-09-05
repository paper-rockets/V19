/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { NavVariationProps } from '../types';

/**
 * Concept: Knurled Diagonal-Hatch Puck (exec-2d9ac5af.png)
 * - Center: Dark graphite puck with 45° diagonal knurled cross-hatch surface and luminous pointer bead
 * - Outer Ring: Horizon/landscape icon, step chevrons (< >), zoom (+ -)
 * - LED Arc Tracker: Luminous cyan/blue tracking bead rotating with yaw
 * - Resting: Hatch-textured mini puck with alignment notch
 */
export const KnurledHatchPuckNavigator: React.FC<NavVariationProps> = ({
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

  const [activeGesture, setActiveGesture] = useState<'puck' | 'ring' | null>(null);
  const dialRef = useRef<HTMLDivElement>(null);
  const lastPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastAngleRef = useRef<number>(0);

  // Center hatched puck drag: 2D orbit / yaw & pitch
  const handlePuckPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    setActiveGesture('puck');
  };

  const handlePuckPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activeGesture !== 'puck') return;
    const dx = e.clientX - lastPosRef.current.x;
    const dy = e.clientY - lastPosRef.current.y;
    lastPosRef.current = { x: e.clientX, y: e.clientY };

    onChange((prev) => ({
      ...prev,
      yaw: prev.yaw + dx * 0.7,
      pitch: Math.max(-85, Math.min(85, prev.pitch + dy * 0.7)),
    }));
  };

  const handlePuckPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activeGesture === 'puck') {
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
      className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1e2128] border border-white/20 shadow-2xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 touch-none"
      style={{ touchAction: 'none' }}
      title="Tap to open Knurled Puck"
      role="button"
      aria-label="Open Knurled Puck"
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#262b35] to-[#14171d] shadow-inner" />

      {/* Diagonal Knurl Texture */}
      <div
        className="w-7 h-7 rounded-full opacity-40"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.2) 0, rgba(255,255,255,0.2) 1px, transparent 0, transparent 4px)`,
        }}
      />

      {/* Luminous Bead */}
      <div className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)]" />
    </div>
  );

  // 2. ACTIVE STATE
  const renderExpandedState = () => (
    <div
      ref={dialRef}
      className="relative w-[185px] h-[185px] sm:w-[220px] sm:h-[220px] rounded-full select-none touch-none flex items-center justify-center"
      style={{ touchAction: 'none' }}
    >
      {/* Outer Ring Bezel */}
      <div
        onPointerDown={handleRingPointerDown}
        onPointerMove={handleRingPointerMove}
        onPointerUp={handleRingPointerUp}
        onPointerCancel={handleRingPointerUp}
        className="absolute inset-0 rounded-full bg-gradient-to-b from-[#272b35] via-[#1c1f26] to-[#121419] border border-white/15 shadow-[0_12px_42px_rgba(0,0,0,0.7)] cursor-grab active:cursor-grabbing flex items-center justify-center touch-none"
        style={{ touchAction: 'none' }}
      >
        {/* Top Zoom + Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChange((p) => ({ ...p, scale: Math.min(3.0, p.scale + 0.15) }));
          }}
          className="absolute top-2 w-6 h-6 flex items-center justify-center text-white/50 hover:text-white font-mono text-sm cursor-pointer"
          title="Zoom In"
        >
          +
        </button>

        {/* Bottom Zoom - Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChange((p) => ({ ...p, scale: Math.max(0.3, p.scale - 0.15) }));
          }}
          className="absolute bottom-2 w-6 h-6 flex items-center justify-center text-white/50 hover:text-white font-mono text-sm cursor-pointer"
          title="Zoom Out"
        >
          –
        </button>

        {/* Left Step < Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChange((p) => ({ ...p, yaw: p.yaw - 45 }));
          }}
          className="absolute left-2 w-6 h-6 flex items-center justify-center text-white/50 hover:text-white font-mono text-xs cursor-pointer"
          title="Step Rotate Left (45°)"
        >
          〈
        </button>

        {/* Right Step > Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChange((p) => ({ ...p, yaw: p.yaw + 45 }));
          }}
          className="absolute right-2 w-6 h-6 flex items-center justify-center text-white/50 hover:text-white font-mono text-xs cursor-pointer"
          title="Step Rotate Right (45°)"
        >
          〉
        </button>

        {/* Blue LED Arc Tracker Dot */}
        <div
          className="absolute w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.9)] pointer-events-none"
          style={{
            transform: `rotate(${state.yaw}deg) translateY(-80px)`,
          }}
        />

        {/* Minimize Button */}
        <button
          onClick={toggleResting}
          className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-[#1e222b] border border-white/20 text-neutral-400 hover:text-white flex items-center justify-center text-xs shadow-md transition-all cursor-pointer z-20"
          title="Minimize"
        >
          _
        </button>
      </div>

      {/* Center Knurled Diagonal-Hatched Puck */}
      <div
        onPointerDown={handlePuckPointerDown}
        onPointerMove={handlePuckPointerMove}
        onPointerUp={handlePuckPointerUp}
        onPointerCancel={handlePuckPointerUp}
        onDoubleClick={onReset}
        className="relative w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-full bg-[#1a1d24] border border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(255,255,255,0.15)] cursor-grab active:cursor-grabbing flex items-center justify-center overflow-hidden transition-transform active:scale-95 touch-none"
        style={{ touchAction: 'none' }}
        title="Drag hatched puck to orbit · Double click to reset"
        role="slider"
        aria-label="Knurled Puck"
      >
        {/* Repeating 45° Diagonal Knurl Hatch Pattern */}
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.4) 0, rgba(255,255,255,0.4) 1.5px, transparent 0, transparent 6px)`,
          }}
        />

        {/* Metallic Bevel Ring */}
        <div className="absolute inset-2 rounded-full border border-white/10 pointer-events-none" />

        {/* Luminous Glowing White Pointer Bead */}
        <div
          className="relative w-4 h-4 rounded-full bg-gradient-to-br from-white via-neutral-200 to-neutral-400 shadow-[0_0_12px_rgba(255,255,255,0.9),0_2px_4px_rgba(0,0,0,0.5)] flex items-center justify-center"
          style={{
            transform: `translate(${(state.yaw % 360) * 0.08}px, ${(state.pitch % 360) * 0.08}px)`,
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-900/60" />
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
