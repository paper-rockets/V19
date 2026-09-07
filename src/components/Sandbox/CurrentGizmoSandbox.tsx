import React, { useEffect, useRef, useState, useCallback } from 'react';
import { StudioEngine } from '../../core/studioEngine';
import { Option3SphereNavigator } from '../TransformNavigator/Option3SphereNavigator';
import { PostProcessSettings } from '../../types';

const DEFAULT_POST_SETTINGS: PostProcessSettings = {
  renderMode: 'draft',
  toonShading: false,
  toonSteps: 3,
  bloom: true,
  bloomIntensity: 1.2,
  bloomRadius: 0.8,
  bloomThreshold: 0.85,
  dof: false,
  dofFocusDistance: 2.5,
  dofAperture: 0.015,
  grain: false,
  grainIntensity: 0.08,
  pixelation: false,
  pixelSize: 4,
};

export const CurrentGizmoSandbox: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [engine, setEngine] = useState<StudioEngine | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Initialize StudioEngine
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const inst = new StudioEngine(container);
    inst.setSkyPreset('off');
    inst.setTheme('dark');
    inst.setGrid(true);
    inst.setupDefaultDrawingPlane();
    inst.toggleDrawingPlane(true);
    inst.setPostProcessSettings(DEFAULT_POST_SETTINGS);

    setEngine(inst);

    return () => {
      inst.dispose();
    };
  }, []);

  // Theme toggle
  const toggleTheme = useCallback(() => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.dataset.nvTheme = nextTheme;
    if (engine) {
      engine.setTheme(nextTheme);
    }
  }, [theme, engine]);

  // Reset Camera View
  const handleResetCamera = useCallback(() => {
    if (engine) {
      engine.resetCamera();
    }
  }, [engine]);

  // Reset Drawing Plane to center
  const handleResetCanvas = useCallback(() => {
    if (engine) {
      const plane = engine.getDrawingPlane();
      if (plane) {
        plane.position.set(0, 0, 0);
        plane.quaternion.identity();
        engine.markDirty();
      }
    }
  }, [engine]);

  // Direct canvas orbit / pan / zoom
  const isPointerDownRef = useRef<boolean>(false);
  const lastPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('#nv')) return;
    isPointerDownRef.current = true;
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    try {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    } catch (_) {}
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current || !engine) return;
    const dx = e.clientX - lastPosRef.current.x;
    const dy = e.clientY - lastPosRef.current.y;
    lastPosRef.current = { x: e.clientX, y: e.clientY };

    // Right-click or two-finger: pan, left-click: orbit
    if (e.buttons === 2 || e.shiftKey) {
      engine.pan(dx, dy);
    } else {
      engine.orbit(dx, dy);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isPointerDownRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch (_) {}
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!engine) return;
    engine.zoom(e.deltaY * 0.002);
  };

  const isDark = theme === 'dark';

  return (
    <div
      className={`relative w-screen h-screen overflow-hidden select-none ${
        isDark ? 'bg-[#181a1d] text-neutral-200' : 'bg-[#e5e1d8] text-neutral-800'
      }`}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Bare utilitarian top bar */}
      <header
        className={`absolute top-0 left-0 right-0 z-30 h-11 px-3 flex items-center justify-between border-b text-xs font-mono ${
          isDark
            ? 'bg-[#202226]/90 border-white/10 text-neutral-300'
            : 'bg-[#f0ebe3]/90 border-black/10 text-neutral-700'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="font-semibold tracking-wide uppercase text-[11px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-500">
            Sandbox
          </span>
          <span className="font-sans text-xs font-medium">Option 3 Gizmo</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className={`px-2.5 py-1 rounded border text-[11px] font-sans transition-colors ${
              isDark
                ? 'bg-neutral-800 border-neutral-700 hover:bg-neutral-700 text-neutral-200'
                : 'bg-white border-neutral-300 hover:bg-neutral-100 text-neutral-800'
            }`}
          >
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button
            onClick={handleResetCanvas}
            className={`px-2.5 py-1 rounded border text-[11px] font-sans transition-colors ${
              isDark
                ? 'bg-neutral-800 border-neutral-700 hover:bg-neutral-700 text-neutral-200'
                : 'bg-white border-neutral-300 hover:bg-neutral-100 text-neutral-800'
            }`}
          >
            Reset Canvas
          </button>
          <button
            onClick={handleResetCamera}
            className={`px-2.5 py-1 rounded border text-[11px] font-sans transition-colors ${
              isDark
                ? 'bg-neutral-800 border-neutral-700 hover:bg-neutral-700 text-neutral-200'
                : 'bg-white border-neutral-300 hover:bg-neutral-100 text-neutral-800'
            }`}
          >
            Reset View
          </button>
          <a
            href="/"
            className={`px-2.5 py-1 rounded border text-[11px] font-sans text-center transition-colors ${
              isDark
                ? 'bg-neutral-900 border-neutral-700 hover:bg-neutral-800 text-neutral-400'
                : 'bg-neutral-100 border-neutral-300 hover:bg-neutral-200 text-neutral-600'
            }`}
          >
            Studio &rarr;
          </a>
        </div>
      </header>

      {/* 3D Canvas Viewport */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onWheel={handleWheel}
      />

      {/* Option 3 Sphere Navigator Gizmo */}
      {engine && (
        <Option3SphereNavigator
          engine={engine}
          theme={theme}
        />
      )}
    </div>
  );
};
