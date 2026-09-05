import React, { useState, useRef, useCallback } from 'react';
import * as THREE from 'three';
import {
  Sun,
  X,
  Move,
  CloudSun,
} from 'lucide-react';
import { StudioEngine } from '../core/studioEngine';
import { haptics } from '../utils/haptics';

interface SimpleSceneIlluminationModalProps {
  engine: StudioEngine | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenSkybox?: () => void;
  theme?: 'light' | 'dark';
}

interface ToneOption {
  name: string;
  color: string;
  bgClass: string;
}

const TONES: ToneOption[] = [
  { name: 'Warm', color: '#ffecd0', bgClass: 'bg-[#ffecd0]' },
  { name: 'White', color: '#ffffff', bgClass: 'bg-[#ffffff]' },
  { name: 'Cool', color: '#7da4d9', bgClass: 'bg-[#7da4d9]' },
  { name: 'Golden', color: '#f59e0b', bgClass: 'bg-[#f59e0b]' },
];

export const SimpleSceneIlluminationModal: React.FC<SimpleSceneIlluminationModalProps> = ({
  engine,
  isOpen,
  onClose,
  onOpenSkybox,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';

  // Live Light State
  const [intensity, setIntensity] = useState<number>(1.4);
  const [lightColor, setLightColor] = useState<string>('#ffecd0');
  const [modelMode, setModelMode] = useState<'clay' | 'texture'>('clay');
  const [shadowFloor, setShadowFloor] = useState<boolean>(true);

  // Trackball Dome State & Refs
  const domeRef = useRef<HTMLDivElement | null>(null);
  const isDraggingDome = useRef<boolean>(false);
  // Puck position in px relative to dome center (default top-right key light)
  const [puckPos, setPuckPos] = useState<{ x: number; y: number }>({ x: 22, y: -24 });
  const lightDirRef = useRef<{ x: number; y: number; z: number }>({ x: 0.5, y: 0.8, z: 0.6 });

  // Floating Panel Drag State
  const [panelPos, setPanelPos] = useState<{ x: number; y: number } | null>(null);
  const isDraggingHeader = useRef(false);
  const dragStart = useRef({ mouseX: 0, mouseY: 0, startX: 0, startY: 0 });

  // Apply light adjustments immediately to 3D scene
  const applyLighting = useCallback(
    (opts: {
      intensity: number;
      color: string;
      dir?: { x: number; y: number; z: number };
      shadowFloor: boolean;
      modelMode: 'clay' | 'texture';
    }) => {
      if (!engine) return;

      engine.setSunIntensity(opts.intensity);
      engine.setSunColor(opts.color);
      if (opts.dir) {
        engine.setSunPositionVector(opts.dir.x, opts.dir.y, opts.dir.z);
      }
      engine.setModelDisplayMode(opts.modelMode);

      // Directly update DirectionalLight and shadow floor in scene
      const scene = engine.getScene();
      if (scene) {
        scene.traverse((obj) => {
          if (obj instanceof THREE.DirectionalLight) {
            obj.color.set(opts.color);
            obj.intensity = opts.intensity;
            if (opts.dir) {
              obj.position.set(opts.dir.x * 12, Math.max(2, opts.dir.y * 12), opts.dir.z * 12);
              obj.updateMatrixWorld();
            }
          }
        });

        const ground = scene.getObjectByName('StudioGroundPlane') as THREE.Mesh | null;
        if (ground) {
          ground.visible = opts.shadowFloor;
        }
      }
    },
    [engine]
  );

  // Trackball pointer calculations
  const updateLightFromPointer = useCallback(
    (clientX: number, clientY: number) => {
      if (!domeRef.current || !engine) return;
      const rect = domeRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const radius = rect.width / 2 - 8;

      const rawDx = (clientX - cx) / radius;
      const rawDy = (clientY - cy) / radius;
      const distSq = rawDx * rawDx + rawDy * rawDy;

      let x = rawDx;
      let z = rawDy;
      let y = 0.2;

      if (distSq <= 1.0) {
        y = Math.sqrt(Math.max(0.04, 1.0 - distSq));
      } else {
        const len = Math.sqrt(distSq);
        x /= len;
        z /= len;
        y = 0.15;
      }

      setPuckPos({ x: x * radius, y: z * radius });
      lightDirRef.current = { x, y, z };

      applyLighting({
        intensity,
        color: lightColor,
        dir: { x, y, z },
        shadowFloor,
        modelMode,
      });
    },
    [engine, intensity, lightColor, shadowFloor, modelMode, applyLighting]
  );

  const handleDomePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    isDraggingDome.current = true;
    haptics.trigger('light');
    updateLightFromPointer(e.clientX, e.clientY);
  };

  const handleDomePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingDome.current) return;
    e.preventDefault();
    e.stopPropagation();
    updateLightFromPointer(e.clientX, e.clientY);
  };

  const handleDomePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingDome.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  // Header Drag Handlers
  const handleHeaderPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    isDraggingHeader.current = true;
    const currentX = panelPos?.x ?? 72;
    const currentY = panelPos?.y ?? 64;
    dragStart.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      startX: currentX,
      startY: currentY,
    };
  };

  const handleHeaderPointerMove = (e: React.PointerEvent) => {
    if (!isDraggingHeader.current) return;
    const dx = e.clientX - dragStart.current.mouseX;
    const dy = e.clientY - dragStart.current.mouseY;
    setPanelPos({
      x: Math.max(8, Math.min(window.innerWidth - 270, dragStart.current.startX + dx)),
      y: Math.max(8, Math.min(window.innerHeight - 320, dragStart.current.startY + dy)),
    });
  };

  const handleHeaderPointerUp = (e: React.PointerEvent) => {
    isDraggingHeader.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  // Preset Shortcuts
  const applyPreset = (presetName: 'warm' | 'product' | 'dramatic') => {
    haptics.trigger('medium');
    let pIntensity = 1.4;
    let pColor = '#ffecd0';
    let pMode: 'clay' | 'texture' = 'clay';
    let pDir = { x: 0.5, y: 0.8, z: 0.6 };

    if (presetName === 'warm') {
      pIntensity = 1.45;
      pColor = '#ffecd0';
      pMode = 'clay';
      pDir = { x: 0.45, y: 0.82, z: 0.35 };
    } else if (presetName === 'product') {
      pIntensity = 1.7;
      pColor = '#ffffff';
      pMode = 'texture';
      pDir = { x: 0.6, y: 0.88, z: 0.5 };
    } else if (presetName === 'dramatic') {
      pIntensity = 1.2;
      pColor = '#ffd8a8';
      pMode = 'texture';
      pDir = { x: -0.65, y: 0.5, z: 0.65 };
    }

    setIntensity(pIntensity);
    setLightColor(pColor);
    setModelMode(pMode);
    setShadowFloor(true);

    const radius = 46;
    setPuckPos({ x: pDir.x * radius, y: pDir.z * radius });
    lightDirRef.current = pDir;

    applyLighting({
      intensity: pIntensity,
      color: pColor,
      dir: pDir,
      shadowFloor: true,
      modelMode: pMode,
    });
  };

  if (!isOpen) return null;

  return (
    <aside
      aria-label="Mini Illumination Menu"
      style={{
        left: panelPos ? `${panelPos.x}px` : undefined,
        top: panelPos ? `${panelPos.y}px` : undefined,
      }}
      className={`fixed z-50 select-none pointer-events-auto w-64 rounded-2xl border shadow-2xl transition-shadow ${
        panelPos ? '' : 'left-16 sm:left-20 top-16 sm:top-20'
      } ${
        isLight
          ? 'bg-white/95 border-neutral-200 text-neutral-900 shadow-neutral-400/20'
          : 'bg-neutral-950/95 border-neutral-800 text-neutral-100 shadow-black/60'
      }`}
    >
      {/* Draggable Header */}
      <div
        onPointerDown={handleHeaderPointerDown}
        onPointerMove={handleHeaderPointerMove}
        onPointerUp={handleHeaderPointerUp}
        className={`flex items-center justify-between px-3.5 py-2.5 border-b cursor-grab active:cursor-grabbing rounded-t-2xl ${
          isLight ? 'border-neutral-200 bg-neutral-50/80' : 'border-neutral-800/80 bg-neutral-900/60'
        }`}
      >
        <div className="flex items-center gap-2">
          <Sun className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-xs font-bold tracking-tight">Studio Light</span>
          <Move className="w-3 h-3 text-neutral-400 opacity-60" />
        </div>
        <div className="flex items-center gap-1">
          {onOpenSkybox && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenSkybox();
              }}
              className={`min-h-[44px] px-2 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer flex items-center gap-1 ${
                isLight
                  ? 'border-neutral-200 hover:bg-neutral-100 text-neutral-600'
                  : 'border-neutral-800 hover:bg-neutral-800 text-neutral-300'
              }`}
              title="Full Skybox"
            >
              <CloudSun className="w-3.5 h-3.5 text-sky-400" />
              <span>Sky</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              haptics.trigger('light');
              onClose();
            }}
            className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg transition-colors cursor-pointer ${
              isLight ? 'hover:bg-neutral-200 text-neutral-600' : 'hover:bg-neutral-800 text-neutral-400'
            }`}
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Miniature Interactive Content */}
      <div className="p-3 flex flex-col gap-3 text-xs">
        {/* Trackball Dome */}
        <div className="flex flex-col items-center">
          <div
            ref={domeRef}
            onPointerDown={handleDomePointerDown}
            onPointerMove={handleDomePointerMove}
            onPointerUp={handleDomePointerUp}
            className="relative w-28 h-28 rounded-full bg-gradient-to-b from-[#242b3d] to-[#0c0f18] border border-[#3b435a] shadow-inner cursor-crosshair flex items-center justify-center touch-none select-none"
            title="Drag inside dome to rotate light live"
          >
            {/* Guide Rings */}
            <div className="w-20 h-20 rounded-full border border-dashed border-white/10 pointer-events-none" />
            <div className="w-10 h-10 rounded-full border border-white/5 pointer-events-none" />

            {/* Compass Marks */}
            <span className="absolute top-1 text-[7px] font-bold text-neutral-400 pointer-events-none">N</span>
            <span className="absolute bottom-1 text-[7px] font-bold text-neutral-400 pointer-events-none">S</span>
            <span className="absolute left-1 text-[7px] font-bold text-neutral-400 pointer-events-none">W</span>
            <span className="absolute right-1 text-[7px] font-bold text-neutral-400 pointer-events-none">E</span>

            {/* Glowing Sun Puck */}
            <div
              style={{
                transform: `translate(${puckPos.x}px, ${puckPos.y}px)`,
              }}
              className="absolute w-4 h-4 rounded-full bg-amber-300 border border-white shadow-[0_0_10px_#f59e0b] flex items-center justify-center pointer-events-none transition-transform duration-75"
            >
              <div className="w-1 h-1 rounded-full bg-amber-900" />
            </div>
          </div>
          <span className="text-[9px] text-neutral-400 mt-1 font-mono tracking-wide">
            Drag Dome to Move Light
          </span>
        </div>

        {/* 3 Quick Presets */}
        <div className="grid grid-cols-3 gap-1">
          <button
            type="button"
            onClick={() => applyPreset('warm')}
            className={`min-h-[44px] px-2 py-1 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
              isLight
                ? 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-800'
                : 'border-neutral-800 bg-neutral-900/60 hover:bg-neutral-800 text-neutral-200'
            }`}
          >
            Warm
          </button>
          <button
            type="button"
            onClick={() => applyPreset('product')}
            className={`min-h-[44px] px-2 py-1 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
              isLight
                ? 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-800'
                : 'border-neutral-800 bg-neutral-900/60 hover:bg-neutral-800 text-neutral-200'
            }`}
          >
            Product
          </button>
          <button
            type="button"
            onClick={() => applyPreset('dramatic')}
            className={`min-h-[44px] px-2 py-1 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
              isLight
                ? 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-800'
                : 'border-neutral-800 bg-neutral-900/60 hover:bg-neutral-800 text-neutral-200'
            }`}
          >
            Dramatic
          </button>
        </div>

        {/* Brightness Slider */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-neutral-400 font-semibold flex items-center gap-1">
              <Sun className="w-3 h-3 text-amber-400" />
              Brightness
            </span>
            <span className="font-mono font-bold">{intensity.toFixed(2)}x</span>
          </div>
          <input
            type="range"
            min="0.2"
            max="2.5"
            step="0.05"
            value={intensity}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              setIntensity(val);
              applyLighting({
                intensity: val,
                color: lightColor,
                dir: lightDirRef.current,
                shadowFloor,
                modelMode,
              });
            }}
            className="w-full h-1.5 rounded cursor-pointer accent-amber-400 bg-neutral-700"
          />
        </div>

        {/* Light Tone Chips */}
        <div className="flex items-center justify-between gap-1 pt-0.5">
          <span className="text-[10px] text-neutral-400">Tone:</span>
          <div className="flex gap-1">
            {TONES.map((t) => (
              <button
                key={t.name}
                type="button"
                onClick={() => {
                  haptics.trigger('light');
                  setLightColor(t.color);
                  applyLighting({
                    intensity,
                    color: t.color,
                    dir: lightDirRef.current,
                    shadowFloor,
                    modelMode,
                  });
                }}
                className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg border transition-all cursor-pointer ${
                  lightColor === t.color
                    ? 'border-amber-400 bg-amber-400/20 shadow-sm'
                    : 'border-neutral-700 hover:border-neutral-500'
                }`}
                title={t.name}
                aria-label={t.name}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full ${t.bgClass} border border-neutral-600 shadow-inner`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Two Quick Toggles: Floor Shadow & Model Finish */}
        <div className="grid grid-cols-2 gap-1.5 pt-1">
          {/* Shadow Floor */}
          <button
            type="button"
            onClick={() => {
              haptics.trigger('light');
              const next = !shadowFloor;
              setShadowFloor(next);
              applyLighting({
                intensity,
                color: lightColor,
                dir: lightDirRef.current,
                shadowFloor: next,
                modelMode,
              });
            }}
            className={`min-h-[44px] px-2 py-1.5 rounded-lg border text-[10px] font-bold flex flex-col items-center justify-center transition-all cursor-pointer ${
              shadowFloor
                ? 'border-emerald-500/80 bg-emerald-500/15 text-emerald-300'
                : 'border-neutral-800 bg-neutral-900/40 text-neutral-400'
            }`}
          >
            <span>Shadow Floor</span>
            <span className="text-[9px] opacity-80">{shadowFloor ? 'ON' : 'OFF'}</span>
          </button>

          {/* Model Clay Finish */}
          <button
            type="button"
            onClick={() => {
              haptics.trigger('light');
              const nextMode = modelMode === 'clay' ? 'texture' : 'clay';
              setModelMode(nextMode);
              applyLighting({
                intensity,
                color: lightColor,
                dir: lightDirRef.current,
                shadowFloor,
                modelMode: nextMode,
              });
            }}
            className={`min-h-[44px] px-2 py-1.5 rounded-lg border text-[10px] font-bold flex flex-col items-center justify-center transition-all cursor-pointer ${
              modelMode === 'clay'
                ? 'border-amber-400/80 bg-amber-400/15 text-amber-300'
                : 'border-neutral-800 bg-neutral-900/40 text-neutral-400'
            }`}
          >
            <span>Finish</span>
            <span className="text-[9px] opacity-80">{modelMode === 'clay' ? 'Matte Clay' : 'Texture'}</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
