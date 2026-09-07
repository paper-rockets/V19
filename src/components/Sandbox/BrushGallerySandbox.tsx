/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { StudioEngine } from '../../core/studioEngine';
import { DEFAULT_BRUSH_PRESETS, applyBrushPresetToSettings } from '../../presets/brushPresets';
import { SCULPT_BRUSHES } from '../../presets/curatedBrushes';
import { SampleModelFactory } from '../../core/sampleModels';
import { BrushSettings, StrokePoint, StrokeDescriptor, PostProcessSettings, PatternType } from '../../types';
import { FEATHER_BANANA_CURVES, FEATHER_BANANA_STAGE } from '../../presets/featherBananaData';

const DEFAULT_POST: PostProcessSettings = {
  renderMode: 'draft',
  toonShading: false,
  toonSteps: 3,
  bloom: true,
  bloomIntensity: 1.35,
  bloomRadius: 0.8,
  bloomThreshold: 0.82,
  dof: false,
  dofFocusDistance: 2.5,
  dofAperture: 0.015,
  grain: false,
  grainIntensity: 0.06,
  pixelation: false,
  pixelSize: 4,
};

const BASE_CANVAS_WIDTH = 16.0;
const BASE_CANVAS_HEIGHT = 28.0;

export interface BotStrokeTask {
  id: string;
  category: 'banana' | 'pattern' | 'visual_preset' | 'clay_sculpt' | 'bust';
  presetId: string;
  brushName: string;
  strokeName: string;
  color: string;
  size: number;
  settings: BrushSettings;
  points: StrokePoint[];
  cameraTarget?: { x: number; y: number; z: number; azimuth?: number; elevation?: number; distance?: number };
}

export const BrushGallerySandbox: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [engine, setEngine] = useState<StudioEngine | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [boardTint, setBoardTint] = useState<'white' | 'slate'>('white');
  const [mode, setMode] = useState<'orbit' | 'draw'>('orbit');
  const [selectedPresetId, setSelectedPresetId] = useState<string>(DEFAULT_BRUSH_PRESETS[0].id);
  const [customBrushSize, setCustomBrushSize] = useState<number>(0.04);
  const [customColor, setCustomColor] = useState<string>('#38bdf8');
  const [gridActive, setGridActive] = useState<boolean>(false);
  const [showGuide, setShowGuide] = useState<boolean>(false);
  const [showBotControls, setShowBotControls] = useState<boolean>(true);

  // ── Auto-Draw Bot State ──
  const [isBotRunning, setIsBotRunning] = useState<boolean>(false);
  const [isBotPaused, setIsBotPaused] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [botSpeed, setBotSpeed] = useState<number>(1.0); // 0.5x, 1x, 2x, 4x, 8x
  const [botScope, setBotScope] = useState<'banana' | 'all' | 'bust' | 'clay' | 'presets' | 'patterns'>('banana');
  const [cameraFollow, setCameraFollow] = useState<boolean>(true);
  const [cameraOrbit, setCameraOrbit] = useState<boolean>(false);
  const [botTaskIndex, setBotTaskIndex] = useState<number>(0);
  const [botTotalTasks, setBotTotalTasks] = useState<number>(0);
  const [botActionMessage, setBotActionMessage] = useState<string>('Idle');
  const [activeTaskInfo, setActiveTaskInfo] = useState<{ name: string; color: string; size: number } | null>(null);

  // Stylus Cursor State
  const [stylusState, setStylusState] = useState<{
    visible: boolean;
    x: number;
    y: number;
    isDown: boolean;
    color: string;
    brushName: string;
  }>({
    visible: false,
    x: 0,
    y: 0,
    isDown: false,
    color: '#38bdf8',
    brushName: 'Stylus',
  });

  const botRunningRef = useRef<boolean>(false);
  const botPausedRef = useRef<boolean>(false);
  const botSpeedRef = useRef<number>(1.0);
  const cameraFollowRef = useRef<boolean>(true);
  const cameraOrbitRef = useRef<boolean>(false);
  const bananaThetaRef = useRef<number>(FEATHER_BANANA_STAGE.camera.theta);
  const botAnimationIdRef = useRef<number | null>(null);
  const planeMeshRef = useRef<THREE.Mesh | null>(null);
  const bustMeshRef = useRef<THREE.Object3D | null>(null);

  botSpeedRef.current = botSpeed;
  cameraFollowRef.current = cameraFollow;
  cameraOrbitRef.current = cameraOrbit;
  botPausedRef.current = isBotPaused;

  const createDefaultBrushSettings = (partial: Partial<BrushSettings> = {}): BrushSettings => ({
    size: 0.04,
    opacity: 1.0,
    color: '#38bdf8',
    roughness: 0.5,
    metalness: 0.1,
    emissiveIntensity: 0,
    pressureSensitivity: true,
    archSegments: 5,
    domeFactor: 0.2,
    surfaceOffset: 0.005,
    taperLength: 0.06,
    silhouetteClamping: false,
    stencilMasking: false,
    smoothingAlgorithm: 'streamline',
    smoothingStrength: 0.7,
    materialType: 'shaded',
    profile: 'ribbon',
    patternType: 'none',
    patternScale: 4.0,
    patternIntensity: 0.8,
    patternAngle: 45,
    patternContrast: 1.0,
    chiselAngle: 45,
    aspectRatio: 3.5,
    ...partial,
  });

  // Generate high-resolution texture for the extra large canvas board
  const generateBoardTexture = useCallback((tint: 'white' | 'slate'): THREE.CanvasTexture => {
    const W = 2048;
    const H = 3584; // 16:28 aspect ratio matching 16.0 x 28.0 canvas
    const c = document.createElement('canvas');
    c.width = W;
    c.height = H;
    const ctx = c.getContext('2d')!;

    const isWhite = tint === 'white';
    const bgCol = isWhite ? '#ffffff' : '#14171d';
    const borderCol = isWhite ? '#cbd5e1' : '#2d3340';
    const textMain = isWhite ? '#0f172a' : '#f8fafc';
    const textMuted = isWhite ? '#64748b' : '#94a3b8';
    const sectionBg = isWhite ? 'rgba(0, 0, 0, 0.03)' : 'rgba(255, 255, 255, 0.04)';
    const rowDivider = isWhite ? 'rgba(0, 0, 0, 0.07)' : 'rgba(255, 255, 255, 0.08)';
    const rowBgAlt = isWhite ? 'rgba(0, 0, 0, 0.015)' : 'rgba(255, 255, 255, 0.02)';

    // Fill background
    ctx.fillStyle = bgCol;
    ctx.fillRect(0, 0, W, H);

    // Fine drafting grid lines
    ctx.strokeStyle = isWhite ? 'rgba(0, 0, 0, 0.035)' : 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1.5;
    const gridStep = 64;
    for (let x = gridStep; x < W; x += gridStep) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = gridStep; y < H; y += gridStep) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    // Outer border frame
    ctx.strokeStyle = borderCol;
    ctx.lineWidth = 10;
    ctx.strokeRect(16, 16, W - 32, H - 32);

    // ── MAIN HEADER ──
    ctx.fillStyle = textMain;
    ctx.font = '700 40px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('MODY 3D CREATIVE STUDIO — BRUSH & PATTERN EXHIBIT', 74, 86);

    ctx.fillStyle = textMuted;
    ctx.font = '500 20px "JetBrains Mono", monospace';
    ctx.fillText('18 VISUAL PRESETS · 8 CLAY SCULPTING BRUSHES · 6 PROCEDURAL PATTERNS', 74, 122);

    ctx.strokeStyle = borderCol;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(74, 142);
    ctx.lineTo(W - 74, 142);
    ctx.stroke();

    // ── SECTION 0: PROCEDURAL PATTERN COMPARISON ──
    ctx.fillStyle = sectionBg;
    ctx.fillRect(50, 156, W - 100, 36);
    ctx.fillStyle = textMain;
    ctx.font = '700 16px "JetBrains Mono", monospace';
    ctx.fillText('PROCEDURAL PATTERN DECAL MODES (ALL 6 REPEAT TEXTURES)', 74, 180);

    const patLabels = [
      '1. SOLID FLAT',
      '2. STIPPLE SPRAY',
      '3. TERRAZZO STONE',
      '4. ARCHITECTURAL DOT',
      '5. LINE HATCH',
      '6. CROSS-HATCH',
    ];
    const patColStep = (W - 148) / 6;
    patLabels.forEach((label, i) => {
      ctx.fillStyle = textMuted;
      ctx.font = '700 13px "JetBrains Mono", monospace';
      ctx.fillText(label, 74 + i * patColStep, 214);
    });

    ctx.strokeStyle = borderCol;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(74, 340);
    ctx.lineTo(W - 74, 340);
    ctx.stroke();

    // ── SECTION 1: 18 VISUAL & SHADER BRUSH PRESETS ──
    ctx.fillStyle = sectionBg;
    ctx.fillRect(50, 355, W - 100, 36);
    ctx.fillStyle = textMain;
    ctx.font = '700 16px "JetBrains Mono", monospace';
    ctx.fillText('PART 1: 18 VISUAL & SHADER BRUSH PRESETS (PBR METALS, 3D TUBES, GLSL SHADERS, DECALS)', 74, 379);

    ctx.fillStyle = textMuted;
    ctx.font = '700 15px "JetBrains Mono", monospace';
    ctx.fillText('BRUSH PRESET & PROFILE', 74, 416);
    ctx.fillText('SHORT (TICK / FLICK)', 742, 416);
    ctx.fillText('MEDIUM (ARC / S-CURVE)', 985, 416);
    ctx.fillText('LONG (FULL DYNAMICS & SHADER)', 1459, 416);

    ctx.strokeStyle = borderCol;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(74, 428);
    ctx.lineTo(W - 74, 428);
    ctx.stroke();

    const visualRowStepPx = (0.72 / 28.0) * H; // ~92.16 px
    const visualStartPx = ((14.0 - 8.6) / 28.0) * H; // ~691.2 px

    DEFAULT_BRUSH_PRESETS.forEach((preset, idx) => {
      const midY = visualStartPx + idx * visualRowStepPx;
      const topY = midY - visualRowStepPx * 0.5;

      if (idx % 2 === 1) {
        ctx.fillStyle = rowBgAlt;
        ctx.fillRect(40, topY, W - 80, visualRowStepPx);
      }

      ctx.strokeStyle = rowDivider;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(74, topY + visualRowStepPx);
      ctx.lineTo(W - 74, topY + visualRowStepPx);
      ctx.stroke();

      const numStr = String(idx + 1).padStart(2, '0');
      ctx.fillStyle = textMuted;
      ctx.font = '700 18px "JetBrains Mono", monospace';
      ctx.fillText(numStr, 74, midY - 2);

      ctx.fillStyle = textMain;
      ctx.font = '700 19px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(preset.name, 118, midY - 2);

      const profileLabel = preset.profile.toUpperCase();
      const materialLabel = preset.materialType.toUpperCase();
      const fxLabel = preset.shaderEffect ? ` · FX: ${preset.shaderEffect.toUpperCase()}` : '';
      const patLabel = preset.patternType && preset.patternType !== 'none' ? ` · PAT: ${preset.patternType.toUpperCase()}` : '';
      const sub = `${preset.category.toUpperCase()} · ${profileLabel} · ${materialLabel}${fxLabel}${patLabel}`;

      ctx.fillStyle = textMuted;
      ctx.font = '500 13px "JetBrains Mono", monospace';
      ctx.fillText(sub, 118, midY + 19);
    });

    // ── SECTION 2: 8 CLAY SCULPTING BRUSHES ──
    const sculptStartPx = ((14.0 - (-5.4)) / 28.0) * H; // ~2483.2 px
    const sculptHeaderY = sculptStartPx - 110;

    ctx.strokeStyle = borderCol;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(74, sculptHeaderY - 18);
    ctx.lineTo(W - 74, sculptHeaderY - 18);
    ctx.stroke();

    ctx.fillStyle = sectionBg;
    ctx.fillRect(50, sculptHeaderY - 5, W - 100, 36);
    ctx.fillStyle = textMain;
    ctx.font = '700 16px "JetBrains Mono", monospace';
    ctx.fillText('PART 2: 8 CLAY SCULPTING BRUSHES (VOLUME BUILDUP, INFLATE, PINCH, CREASE, FLATTEN, SMOOTH)', 74, sculptHeaderY + 19);

    ctx.fillStyle = textMuted;
    ctx.font = '700 15px "JetBrains Mono", monospace';
    ctx.fillText('SCULPT BRUSH & BEHAVIOR', 74, sculptHeaderY + 54);
    ctx.fillText('SHORT (LOCAL TAMP / INCISION)', 742, sculptHeaderY + 54);
    ctx.fillText('MEDIUM (SCULPT GESTURE)', 985, sculptHeaderY + 54);
    ctx.fillText('LONG (CONTINUOUS FORM STRIP)', 1459, sculptHeaderY + 54);

    ctx.strokeStyle = borderCol;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(74, sculptHeaderY + 66);
    ctx.lineTo(W - 74, sculptHeaderY + 66);
    ctx.stroke();

    SCULPT_BRUSHES.forEach((brush, idx) => {
      const midY = sculptStartPx + idx * visualRowStepPx;
      const topY = midY - visualRowStepPx * 0.5;

      if (idx % 2 === 1) {
        ctx.fillStyle = rowBgAlt;
        ctx.fillRect(40, topY, W - 80, visualRowStepPx);
      }

      ctx.strokeStyle = rowDivider;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(74, topY + visualRowStepPx);
      ctx.lineTo(W - 74, topY + visualRowStepPx);
      ctx.stroke();

      const numStr = String(idx + 19).padStart(2, '0');
      ctx.fillStyle = '#f97316';
      ctx.font = '700 18px "JetBrains Mono", monospace';
      ctx.fillText(numStr, 74, midY - 2);

      ctx.fillStyle = textMain;
      ctx.font = '700 19px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(brush.name, 118, midY - 2);

      const sub = `CLAY SCULPT · ${brush.description.toUpperCase()} · PROFILE: ${brush.profile.toUpperCase()}`;
      ctx.fillStyle = textMuted;
      ctx.font = '500 13px "JetBrains Mono", monospace';
      ctx.fillText(sub, 118, midY + 19);
    });

    ctx.fillStyle = textMuted;
    ctx.font = '500 14px "JetBrains Mono", monospace';
    ctx.fillText('MODY 3D ENGINE · CONFORMAL SURFACE MESH GENERATION · REAL-TIME 3D SPATIAL SCULPTING', 74, H - 42);

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    tex.needsUpdate = true;
    return tex;
  }, []);

  // Compiles all 89 distinct stroke tasks for the Auto-Draw Bot
  const buildAllStrokeTasks = useCallback((): BotStrokeTask[] => {
    const tasks: BotStrokeTask[] = [];

    // 1. PROCEDURAL PATTERNS (6 swatches across y = 11.8)
    const patternRowY = 11.8;
    const patterns: Array<{ type: PatternType; color: string; label: string }> = [
      { type: 'none', color: '#0284c7', label: 'Solid Flat' },
      { type: 'stipple', color: '#e11d48', label: 'Stipple Spray' },
      { type: 'terrazzo', color: '#475569', label: 'Terrazzo Stone' },
      { type: 'dot', color: '#0369a1', label: 'Dot Matrix' },
      { type: 'line', color: '#059669', label: 'Line Hatch' },
      { type: 'cross', color: '#7c3aed', label: 'Cross-Hatch' },
    ];
    const patSlotWidth = (BASE_CANVAS_WIDTH - 2.0) / 6;

    patterns.forEach((pat, i) => {
      const leftX = -BASE_CANVAS_WIDTH * 0.5 + 1.2 + i * patSlotWidth;
      const rightX = leftX + patSlotWidth - 0.4;
      const midY = patternRowY;

      const swatchPoints: StrokePoint[] = [];
      const samples = 18;
      for (let s = 0; s <= samples; s++) {
        const t = s / samples;
        swatchPoints.push({
          position: new THREE.Vector3(leftX + t * (rightX - leftX), midY, 0.005),
          normal: new THREE.Vector3(0, 0, 1),
          surfaceOffset: 0.005,
          pressure: 1.0,
          isSurfaceHit: true,
          time: performance.now(),
        });
      }

      tasks.push({
        id: `showcase_pat_${pat.type}`,
        category: 'pattern',
        presetId: `pat_${pat.type}`,
        brushName: pat.label,
        strokeName: `${pat.label} Decal Swatch`,
        color: pat.color,
        size: 0.12,
        settings: createDefaultBrushSettings({
          size: 0.12,
          color: pat.color,
          patternType: pat.type,
          patternScale: 5.0,
          patternIntensity: 1.0,
          patternContrast: 1.0,
          materialType: 'shaded',
          profile: 'ribbon',
        }),
        points: swatchPoints,
        cameraTarget: { x: -1.0, y: 11.5, z: 0, distance: 11 },
      });
    });

    // 2. 18 VISUAL PRESETS (54 strokes)
    const visualStartY = 8.6;
    const visualRowStep = 0.72;

    DEFAULT_BRUSH_PRESETS.forEach((preset, idx) => {
      const rowY = visualStartY - idx * visualRowStep;
      const baseSettings = createDefaultBrushSettings({
        size: preset.size || 0.04,
        opacity: preset.opacity ?? 1.0,
        color: preset.color || '#38bdf8',
        roughness: preset.roughness ?? 0.5,
        metalness: preset.metalness ?? 0.1,
        emissiveIntensity: preset.emissiveIntensity ?? (preset.materialType === 'glow' ? 2.0 : 0),
        archSegments: preset.archSegments ?? 5,
        domeFactor: preset.domeFactor ?? 0.2,
        materialType: preset.materialType || 'shaded',
        profile: preset.profile || 'ribbon',
        patternType: preset.patternType || 'none',
        patternScale: preset.patternScale ?? 4.0,
        patternIntensity: preset.patternIntensity ?? 0.8,
        chiselAngle: (preset as any).chiselAngle ?? 45,
        aspectRatio: (preset as any).aspectRatio ?? 3.5,
      });
      const settings = applyBrushPresetToSettings(preset, baseSettings);
      const camTarget = { x: -1.0, y: rowY, z: 0, distance: 13 };

      // Short Stroke
      const shortPoints: StrokePoint[] = [];
      const shortSamples = 16;
      for (let s = 0; s <= shortSamples; s++) {
        const t = s / shortSamples;
        let x = -3.2 + t * 1.4;
        let y = rowY;
        let z = 0.005;

        if (preset.id === 'chisel_marker') {
          x = -3.2 + t * 1.4;
          y = rowY - 0.14 + t * 0.28;
        } else if (preset.id === 'spatial_pipe' || preset.id === 'neon_cable') {
          y = rowY + Math.sin(t * Math.PI) * 0.05;
          z = 0.01 + Math.sin(t * Math.PI) * 0.28;
        } else if (preset.id === 'jitter_wire') {
          y = rowY + (s % 2 === 0 ? 0.09 : -0.09);
        } else if (preset.id === 'drafting_wire') {
          y = rowY;
        } else {
          y = rowY + Math.sin(t * Math.PI) * 0.12;
        }

        const pressure = preset.id === 'drafting_wire' ? 1.0 : 0.25 + 0.75 * Math.sin(t * Math.PI);
        shortPoints.push({
          position: new THREE.Vector3(x, y, z),
          normal: new THREE.Vector3(0, 0, 1),
          surfaceOffset: 0.005,
          pressure,
          isSurfaceHit: true,
          time: performance.now(),
        });
      }

      tasks.push({
        id: `showcase_${preset.id}_short`,
        category: 'visual_preset',
        presetId: preset.id,
        brushName: preset.name,
        strokeName: 'Short (Tick / Flick)',
        color: preset.color || '#38bdf8',
        size: (preset.size || 0.04) * (preset.id === 'drafting_wire' ? 1.5 : 1.0),
        settings: { ...settings, size: (preset.size || 0.04) * (preset.id === 'drafting_wire' ? 1.5 : 1.0) },
        points: shortPoints,
        cameraTarget: camTarget,
      });

      // Medium Stroke
      const medPoints: StrokePoint[] = [];
      const medSamples = 30;
      for (let s = 0; s <= medSamples; s++) {
        const t = s / medSamples;
        let x = -1.3 + t * 2.8;
        let y = rowY;
        let z = 0.005;

        if (preset.id === 'chisel_marker') {
          if (t < 0.35) {
            x = -1.3 + (t / 0.35) * 1.0;
            y = rowY + 0.16;
          } else if (t < 0.7) {
            const dt = (t - 0.35) / 0.35;
            x = -0.3 - dt * 0.6;
            y = rowY + 0.16 - dt * 0.32;
          } else {
            const dt = (t - 0.7) / 0.3;
            x = -0.9 + dt * 2.4;
            y = rowY - 0.16;
          }
        } else if (preset.id === 'spatial_pipe') {
          x = -1.3 + t * 2.8;
          y = rowY + Math.sin(t * 2 * Math.PI) * 0.22;
          z = 0.01 + Math.sin(t * Math.PI) * 0.48;
        } else if (preset.id === 'neon_cable') {
          x = -1.3 + t * 2.8;
          y = rowY + Math.sin(t * 4 * Math.PI) * 0.18;
          z = 0.04 + (Math.cos(t * 4 * Math.PI) * 0.2 + 0.2);
        } else if (preset.id === 'jitter_wire') {
          x = -1.3 + t * 2.8;
          y = rowY + Math.sin(t * 4 * Math.PI) * 0.15 + (Math.random() - 0.5) * 0.14;
        } else if (preset.id === 'drafting_wire') {
          if (t < 0.2) {
            x = -1.3;
            y = rowY - 0.14 + (t / 0.2) * 0.28;
          } else if (t < 0.8) {
            x = -1.3 + ((t - 0.2) / 0.6) * 2.8;
            y = rowY + 0.14;
          } else {
            x = 1.5;
            y = rowY + 0.14 - ((t - 0.8) / 0.2) * 0.28;
          }
        } else {
          x = -1.3 + t * 2.8;
          y = rowY + Math.sin(t * 2 * Math.PI) * 0.18;
        }

        const pressure = 0.3 + 0.7 * Math.sin(t * Math.PI);
        medPoints.push({
          position: new THREE.Vector3(x, y, z),
          normal: new THREE.Vector3(0, 0, 1),
          surfaceOffset: 0.005,
          pressure,
          isSurfaceHit: true,
          time: performance.now(),
        });
      }

      tasks.push({
        id: `showcase_${preset.id}_med`,
        category: 'visual_preset',
        presetId: preset.id,
        brushName: preset.name,
        strokeName: 'Medium (Arc / S-Curve)',
        color: preset.color || '#38bdf8',
        size: preset.size || 0.04,
        settings: { ...settings, size: preset.size || 0.04 },
        points: medPoints,
        cameraTarget: camTarget,
      });

      // Long Stroke
      const longPoints: StrokePoint[] = [];
      const longSamples = 54;
      for (let s = 0; s <= longSamples; s++) {
        const t = s / longSamples;
        let x = 2.4 + t * 4.2;
        let y = rowY;
        let z = 0.005;

        if (preset.id === 'spatial_pipe') {
          y = rowY + Math.sin(t * 3 * Math.PI) * 0.24;
          z = 0.02 + Math.sin(t * 2 * Math.PI) * 0.55 + 0.15 * Math.sin(t * Math.PI);
        } else if (preset.id === 'neon_cable') {
          y = rowY + Math.sin(t * 3 * Math.PI) * 0.22;
          z = 0.05 + Math.sin(t * Math.PI) * 0.45;
        } else if (preset.id === 'chisel_marker') {
          y = rowY + Math.sin(t * 4 * Math.PI) * 0.2 * (1.0 - 0.2 * t);
        } else if (preset.id === 'drafting_wire') {
          x = 2.4 + t * 4.2;
          y = rowY + (s % 10 === 0 ? 0.08 : 0);
        } else if (preset.id === 'jitter_wire') {
          y = rowY + Math.sin(t * 5 * Math.PI) * 0.18 + (s % 2 === 0 ? 0.06 : -0.06);
        } else {
          y = rowY + Math.sin(t * 3 * Math.PI) * 0.22 * (1.0 - 0.2 * t);
        }

        const pressure = 0.35 + 0.65 * Math.sin(t * Math.PI);
        longPoints.push({
          position: new THREE.Vector3(x, y, z),
          normal: new THREE.Vector3(0, 0, 1),
          surfaceOffset: 0.005,
          pressure,
          isSurfaceHit: true,
          time: performance.now(),
        });
      }

      tasks.push({
        id: `showcase_${preset.id}_long`,
        category: 'visual_preset',
        presetId: preset.id,
        brushName: preset.name,
        strokeName: 'Long (Full Wave)',
        color: preset.color || '#38bdf8',
        size: (preset.size || 0.04) * 1.15,
        settings: { ...settings, size: (preset.size || 0.04) * 1.15 },
        points: longPoints,
        cameraTarget: camTarget,
      });
    });

    // 3. 8 CLAY SCULPTING BRUSHES (24 strokes)
    const sculptStartY = -5.4;
    const sculptRowStep = 0.72;

    const sculptConfigs: Array<{
      id: string;
      color: string;
      size: number;
      profile: 'ribbon' | 'tube' | 'marker' | 'conformal';
      materialType: 'shaded' | 'shadeless';
      domeFactor: number;
      chiselAngle?: number;
      aspectRatio?: number;
      opacity?: number;
      name: string;
    }> = [
      { id: 'clay', name: 'Soft Clay', color: '#c27848', size: 0.055, profile: 'ribbon', materialType: 'shaded', domeFactor: 0.35 },
      { id: 'build', name: 'Add Volume', color: '#b45309', size: 0.052, profile: 'tube', materialType: 'shaded', domeFactor: 0.4 },
      { id: 'move', name: 'Drag Surface', color: '#92400e', size: 0.06, profile: 'ribbon', materialType: 'shaded', domeFactor: 0.25 },
      { id: 'inflate', name: 'Inflate', color: '#ea580c', size: 0.088, profile: 'tube', materialType: 'shaded', domeFactor: 0.8 },
      { id: 'pinch', name: 'Pinch', color: '#7c2d12', size: 0.038, profile: 'marker', materialType: 'shaded', domeFactor: 0.5, chiselAngle: 45, aspectRatio: 4.2 },
      { id: 'crease', name: 'Crease', color: '#1c1917', size: 0.013, profile: 'tube', materialType: 'shadeless', domeFactor: 0.1 },
      { id: 'flatten', name: 'Flatten', color: '#d97706', size: 0.085, profile: 'conformal', materialType: 'shaded', domeFactor: 0.02 },
      { id: 'smooth', name: 'Smooth', color: '#fed7aa', size: 0.082, profile: 'conformal', materialType: 'shaded', domeFactor: 0.15, opacity: 0.65 },
    ];

    sculptConfigs.forEach((sc, idx) => {
      const rowY = sculptStartY - idx * sculptRowStep;
      const claySettings = createDefaultBrushSettings({
        size: sc.size,
        color: sc.color,
        profile: sc.profile,
        materialType: sc.materialType,
        domeFactor: sc.domeFactor,
        chiselAngle: sc.chiselAngle ?? 45,
        aspectRatio: sc.aspectRatio ?? 3.5,
        opacity: sc.opacity ?? 1.0,
        roughness: 0.6,
        metalness: 0.05,
      });
      const camTarget = { x: -1.0, y: rowY, z: 0, distance: 13 };

      // Short Clay Stroke
      const shortPoints: StrokePoint[] = [];
      const shortSamples = 16;
      for (let s = 0; s <= shortSamples; s++) {
        const t = s / shortSamples;
        let x = -3.2 + t * 1.4;
        let y = rowY;
        let z = 0.005;

        if (sc.id === 'inflate') {
          z = 0.01 + Math.sin(t * Math.PI) * 0.22;
          y = rowY + Math.sin(t * Math.PI) * 0.08;
        } else if (sc.id === 'crease') {
          y = rowY + Math.sin(t * Math.PI) * 0.04;
        } else if (sc.id === 'pinch') {
          z = 0.01 + Math.sin(t * Math.PI) * 0.14;
        } else {
          y = rowY + Math.sin(t * Math.PI) * 0.1;
        }

        shortPoints.push({
          position: new THREE.Vector3(x, y, z),
          normal: new THREE.Vector3(0, 0, 1),
          surfaceOffset: 0.005,
          pressure: 0.4 + 0.6 * Math.sin(t * Math.PI),
          isSurfaceHit: true,
          time: performance.now(),
        });
      }

      tasks.push({
        id: `showcase_sculpt_${sc.id}_short`,
        category: 'clay_sculpt',
        presetId: sc.id,
        brushName: sc.name,
        strokeName: 'Short (Local Tamp)',
        color: sc.color,
        size: sc.size,
        settings: claySettings,
        points: shortPoints,
        cameraTarget: camTarget,
      });

      // Medium Clay Stroke
      const medPoints: StrokePoint[] = [];
      const medSamples = 30;
      for (let s = 0; s <= medSamples; s++) {
        const t = s / medSamples;
        let x = -1.3 + t * 2.8;
        let y = rowY;
        let z = 0.005;

        if (sc.id === 'build') {
          y = rowY + Math.sin(t * 2 * Math.PI) * 0.16;
          z = 0.01 + t * 0.15;
        } else if (sc.id === 'inflate') {
          y = rowY + Math.sin(t * 2 * Math.PI) * 0.18;
          z = 0.02 + Math.sin(t * Math.PI) * 0.28;
        } else if (sc.id === 'pinch') {
          y = rowY + Math.sin(t * 2 * Math.PI) * 0.16;
          z = 0.01 + Math.sin(t * Math.PI) * 0.18;
        } else if (sc.id === 'flatten') {
          y = rowY + Math.sin(t * 2 * Math.PI) * 0.14;
        } else {
          y = rowY + Math.sin(t * 2 * Math.PI) * 0.18;
        }

        medPoints.push({
          position: new THREE.Vector3(x, y, z),
          normal: new THREE.Vector3(0, 0, 1),
          surfaceOffset: 0.005,
          pressure: 0.4 + 0.6 * Math.sin(t * Math.PI),
          isSurfaceHit: true,
          time: performance.now(),
        });
      }

      tasks.push({
        id: `showcase_sculpt_${sc.id}_med`,
        category: 'clay_sculpt',
        presetId: sc.id,
        brushName: sc.name,
        strokeName: 'Medium (Sculpt Gesture)',
        color: sc.color,
        size: sc.size,
        settings: claySettings,
        points: medPoints,
        cameraTarget: camTarget,
      });

      // Long Clay Stroke
      const longPoints: StrokePoint[] = [];
      const longSamples = 54;
      for (let s = 0; s <= longSamples; s++) {
        const t = s / longSamples;
        let x = 2.4 + t * 4.2;
        let y = rowY;
        let z = 0.005;

        if (sc.id === 'inflate') {
          y = rowY + Math.sin(t * 3 * Math.PI) * 0.22;
          z = 0.02 + Math.abs(Math.sin(t * 3 * Math.PI)) * 0.32;
        } else if (sc.id === 'pinch') {
          y = rowY + Math.sin(t * 3 * Math.PI) * 0.2;
          z = 0.02 + Math.sin(t * Math.PI) * 0.22;
        } else if (sc.id === 'build') {
          y = rowY + Math.sin(t * 3 * Math.PI) * 0.18;
          z = 0.01 + (t % 0.33) * 0.25;
        } else if (sc.id === 'crease') {
          y = rowY + Math.sin(t * 3 * Math.PI) * 0.15;
        } else {
          y = rowY + Math.sin(t * 3 * Math.PI) * 0.2 * (1.0 - 0.2 * t);
        }

        longPoints.push({
          position: new THREE.Vector3(x, y, z),
          normal: new THREE.Vector3(0, 0, 1),
          surfaceOffset: 0.005,
          pressure: 0.35 + 0.65 * Math.sin(t * Math.PI),
          isSurfaceHit: true,
          time: performance.now(),
        });
      }

      tasks.push({
        id: `showcase_sculpt_${sc.id}_long`,
        category: 'clay_sculpt',
        presetId: sc.id,
        brushName: sc.name,
        strokeName: 'Long (Continuous Form)',
        color: sc.color,
        size: sc.size * 1.15,
        settings: { ...claySettings, size: sc.size * 1.15 },
        points: longPoints,
        cameraTarget: camTarget,
      });
    });

    // 4. INTERACTIVE 3D SCULPTED BUST (5 strokes)
    const bustCamTarget = { x: 11.5, y: 0.5, z: 0, distance: 9.5, azimuth: 0.35, elevation: Math.PI / 2.3 };

    // 4A. Soft Clay Cheek Sculpt
    const cheekPoints: StrokePoint[] = [];
    for (let s = 0; s <= 20; s++) {
      const t = s / 20;
      const bx = 11.5 + 0.3 + t * 0.85;
      const by = 2.1 - t * 0.5;
      const bz = 2.15 - t * t * 0.35;
      cheekPoints.push({
        position: new THREE.Vector3(bx, by, bz),
        normal: new THREE.Vector3(0.3, 0.2, 0.9).normalize(),
        surfaceOffset: 0.015,
        pressure: 0.4 + 0.6 * Math.sin(t * Math.PI),
        isSurfaceHit: true,
        time: performance.now(),
      });
    }
    tasks.push({
      id: 'bust_clay_cheek',
      category: 'bust',
      presetId: 'clay',
      brushName: 'Soft Clay',
      strokeName: '3D Cheek Sculpt',
      color: '#c27848',
      size: 0.065,
      settings: createDefaultBrushSettings({
        size: 0.065,
        color: '#c27848',
        profile: 'ribbon',
        materialType: 'shaded',
        domeFactor: 0.35,
        roughness: 0.65,
      }),
      points: cheekPoints,
      cameraTarget: bustCamTarget,
    });

    // 4B. Sharp Pinch Ridge down the 3D Nose Bridge
    const nosePoints: StrokePoint[] = [];
    for (let s = 0; s <= 18; s++) {
      const t = s / 18;
      const bx = 11.5;
      const by = 2.6 - t * 0.8;
      const bz = 2.25 + Math.sin(t * Math.PI) * 0.15;
      nosePoints.push({
        position: new THREE.Vector3(bx, by, bz),
        normal: new THREE.Vector3(0, 0.1, 0.99).normalize(),
        surfaceOffset: 0.015,
        pressure: 0.6 + 0.4 * Math.sin(t * Math.PI),
        isSurfaceHit: true,
        time: performance.now(),
      });
    }
    tasks.push({
      id: 'bust_pinch_nose',
      category: 'bust',
      presetId: 'pinch',
      brushName: 'Pinch',
      strokeName: '3D Nose Bridge Ridge',
      color: '#7c2d12',
      size: 0.04,
      settings: createDefaultBrushSettings({
        size: 0.04,
        color: '#7c2d12',
        profile: 'marker',
        materialType: 'shaded',
        aspectRatio: 4.2,
        domeFactor: 0.5,
      }),
      points: nosePoints,
      cameraTarget: bustCamTarget,
    });

    // 4C. Deep Carved Crease under the Chin/Jaw
    const jawPoints: StrokePoint[] = [];
    for (let s = 0; s <= 24; s++) {
      const t = s / 24;
      const angle = -0.6 + t * 1.2;
      const bx = 11.5 + Math.sin(angle) * 1.1;
      const by = 1.35 - Math.cos(angle) * 0.25;
      const bz = 1.95 + Math.cos(angle) * 0.35;
      jawPoints.push({
        position: new THREE.Vector3(bx, by, bz),
        normal: new THREE.Vector3(Math.sin(angle) * 0.4, -0.6, 0.7).normalize(),
        surfaceOffset: 0.012,
        pressure: 0.9,
        isSurfaceHit: true,
        time: performance.now(),
      });
    }
    tasks.push({
      id: 'bust_crease_jaw',
      category: 'bust',
      presetId: 'crease',
      brushName: 'Crease',
      strokeName: '3D Jawline Crease',
      color: '#1c1917',
      size: 0.015,
      settings: createDefaultBrushSettings({
        size: 0.015,
        color: '#1c1917',
        profile: 'tube',
        materialType: 'shadeless',
      }),
      points: jawPoints,
      cameraTarget: bustCamTarget,
    });

    // 4D. Conformal Gold Leaf Pedestal Band
    const goldPoints: StrokePoint[] = [];
    for (let s = 0; s <= 30; s++) {
      const t = s / 30;
      const angle = -0.9 + t * 1.8;
      const bx = 11.5 + Math.sin(angle) * 2.58;
      const by = -4.15;
      const bz = Math.cos(angle) * 2.58;
      goldPoints.push({
        position: new THREE.Vector3(bx, by, bz),
        normal: new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle)),
        surfaceOffset: 0.02,
        pressure: 1.0,
        isSurfaceHit: true,
        time: performance.now(),
      });
    }
    tasks.push({
      id: 'bust_gold_pedestal',
      category: 'bust',
      presetId: 'gold_leaf',
      brushName: 'Gold Leaf',
      strokeName: '3D Pedestal Band',
      color: '#facc15',
      size: 0.075,
      settings: createDefaultBrushSettings({
        size: 0.075,
        color: '#facc15',
        profile: 'conformal',
        materialType: 'shaded',
        metalness: 0.95,
        roughness: 0.18,
      }),
      points: goldPoints,
      cameraTarget: { x: 11.5, y: -3.5, z: 0, distance: 9.0, azimuth: 0.25, elevation: Math.PI / 2.3 },
    });

    // 4E. Free-Air Glowing Neon Halo
    const haloPoints: StrokePoint[] = [];
    for (let s = 0; s <= 40; s++) {
      const t = s / 40;
      const angle = t * 2 * Math.PI;
      const bx = 11.5 + Math.cos(angle) * 1.55;
      const by = 3.65 + Math.sin(angle * 2) * 0.15;
      const bz = Math.sin(angle) * 1.55;
      haloPoints.push({
        position: new THREE.Vector3(bx, by, bz),
        normal: new THREE.Vector3(0, 1, 0),
        surfaceOffset: 0.005,
        pressure: 1.0,
        isSurfaceHit: false,
        time: performance.now(),
      });
    }
    tasks.push({
      id: 'bust_neon_halo',
      category: 'bust',
      presetId: 'neon_cable',
      brushName: 'Neon Cable',
      strokeName: '3D Mid-Air Halo Ring',
      color: '#ec4899',
      size: 0.038,
      settings: createDefaultBrushSettings({
        size: 0.038,
        color: '#ec4899',
        profile: 'tube',
        materialType: 'glow',
        emissiveIntensity: 2.2,
      }),
      points: haloPoints,
      cameraTarget: { x: 11.5, y: 3.2, z: 0, distance: 8.5, azimuth: 0.45, elevation: Math.PI / 2.5 },
    });

    // 5. 3D FEATHER BANANA (428 strokes from MegaCilok Feather artwork)
    const bananaCam = {
      x: 22.0,
      y: 0.5,
      z: 0.0,
      distance: 20.0,
      azimuth: -2.122,
      elevation: 1.143,
    };

    FEATHER_BANANA_CURVES.forEach((curve, idx) => {
      const pts: StrokePoint[] = curve.points.map((p) => ({
        position: new THREE.Vector3(p[0] + 21.8, p[1] - 5.78, p[2] + 0.5),
        normal: new THREE.Vector3(0, 1, 0),
        surfaceOffset: 0.003,
        pressure: 1.0,
        isSurfaceHit: true,
        time: performance.now(),
      }));

      let strokeLabel = `Stroke #${idx + 1}`;
      const hex = curve.color.toLowerCase();
      if (hex === '#fffcca' || hex === '#ddd9ba') strokeLabel = `Banana Pulp #${idx + 1}`;
      else if (hex === '#ffc344' || hex === '#ffe74d' || hex === '#ffb637' || hex === '#ffb469') strokeLabel = `Peel Yellow #${idx + 1}`;
      else if (hex === '#84ff79' || hex === '#eeff9b' || hex === '#88c355' || hex === '#2e9c4d' || hex === '#31534d') strokeLabel = `Stem Green #${idx + 1}`;
      else if (hex.includes('ff3') || hex.includes('ff1')) strokeLabel = `Rim Highlight #${idx + 1}`;

      tasks.push({
        id: `feather_banana_${idx}_${curve.id}`,
        category: 'banana',
        presetId: curve.shape === 'RIBBON' ? 'feather_ribbon' : 'feather_marker',
        brushName: curve.shape === 'RIBBON' ? 'Feather Ribbon' : 'Feather Marker',
        strokeName: strokeLabel,
        color: curve.color,
        size: curve.size,
        settings: createDefaultBrushSettings({
          size: curve.size,
          color: curve.color,
          profile: 'ribbon',
          materialType: curve.material === 'flat' ? 'shadeless' : 'shaded',
          domeFactor: 0.2,
          taperLength: 0.04,
          pressureSensitivity: false,
          roughness: 0.45,
          metalness: 0.05,
        }),
        points: pts,
        cameraTarget: bananaCam,
      });
    });

    return tasks;
  }, []);

  // Utility to project 3D world coordinates to 2D screen pixels for the stylus
  const project3DToScreen = useCallback((pos: THREE.Vector3, eng: StudioEngine): { x: number; y: number } => {
    const container = containerRef.current;
    if (!container) return { x: 0, y: 0 };
    const camera = eng.getCamera();
    if (!camera) return { x: 0, y: 0 };

    const v = pos.clone();
    v.project(camera);
    const rect = container.getBoundingClientRect();
    return {
      x: ((v.x + 1) / 2) * rect.width,
      y: ((-v.y + 1) / 2) * rect.height,
    };
  }, []);

  // Populate all strokes instantly (when bypassing the bot)
  const populateAllInstantly = useCallback((eng: StudioEngine) => {
    eng.clearAllStrokes();
    const tasks = buildAllStrokeTasks();
    tasks.forEach((task) => {
      eng.recreateStrokeFromDescriptor({
        id: task.id,
        layerId: 'default_layer',
        tool: 'brush',
        points: task.points,
        settings: task.settings,
        createdAt: Date.now(),
      });
    });
    eng.markDirty();
  }, [buildAllStrokeTasks]);

  // Populate Feather Banana strokes instantly (when bypassing the bot)
  const populateBananaInstantly = useCallback((eng: StudioEngine) => {
    const tasks = buildAllStrokeTasks().filter((t) => t.category === 'banana');
    tasks.forEach((task) => {
      eng.recreateStrokeFromDescriptor({
        id: task.id,
        layerId: 'default_layer',
        tool: 'brush',
        points: task.points,
        settings: task.settings,
        createdAt: Date.now(),
      });
    });
    eng.markDirty();
  }, [buildAllStrokeTasks]);

  // ── Auto-Draw Bot Runner ──
  const startAutoDrawBot = useCallback(() => {
    if (!engine) return;

    // Stop any existing animation
    if (botAnimationIdRef.current !== null) {
      cancelAnimationFrame(botAnimationIdRef.current);
      botAnimationIdRef.current = null;
    }

    // Filter tasks based on selected scope
    const allTasks = buildAllStrokeTasks();
    const filteredTasks = allTasks.filter((t) => {
      if (botScope === 'all') return t.category !== 'banana';
      if (botScope === 'banana') return t.category === 'banana';
      if (botScope === 'bust') return t.category === 'bust';
      if (botScope === 'clay') return t.category === 'clay_sculpt';
      if (botScope === 'presets') return t.category === 'visual_preset';
      if (botScope === 'patterns') return t.category === 'pattern';
      return true;
    });

    if (filteredTasks.length === 0) return;

    // Set countdown for screen recording preparation (3.. 2.. 1.. GO!)
    setIsBotRunning(true);
    setIsBotPaused(false);
    botRunningRef.current = true;
    botPausedRef.current = false;
    setBotTaskIndex(0);
    setBotTotalTasks(filteredTasks.length);
    setCountdown(3);

    let count = 3;
    const countTimer = setInterval(() => {
      count -= 1;
      if (count > 0) {
        setCountdown(count);
      } else {
        clearInterval(countTimer);
        setCountdown(null);

        // Clear canvas for fresh live drawing
        engine.clearAllStrokes();

        // If starting with banana, setup Feather sky stage; if bust, focus on bust; else canvas
        if (filteredTasks[0].category === 'banana') {
          if (planeMeshRef.current) planeMeshRef.current.visible = false;
          if (bustMeshRef.current) bustMeshRef.current.visible = false;
          if (engine.scene) {
            engine.scene.background = new THREE.Color(FEATHER_BANANA_STAGE.backgroundColor);
          }
          engine.setTargetPosition(
            FEATHER_BANANA_STAGE.focus.x,
            FEATHER_BANANA_STAGE.focus.y,
            FEATHER_BANANA_STAGE.focus.z
          );
          engine.setCameraView(
            FEATHER_BANANA_STAGE.camera.theta,
            FEATHER_BANANA_STAGE.camera.phi,
            FEATHER_BANANA_STAGE.camera.radius,
            true
          );
          bananaThetaRef.current = FEATHER_BANANA_STAGE.camera.theta;
        } else if (filteredTasks[0].category === 'bust') {
          if (planeMeshRef.current) planeMeshRef.current.visible = true;
          if (bustMeshRef.current) bustMeshRef.current.visible = true;
          engine.setTargetPosition(11.5, 0.5, 0);
          engine.setCameraView(0.35, Math.PI / 2.3, 10.5, false);
        } else {
          if (planeMeshRef.current) planeMeshRef.current.visible = true;
          if (bustMeshRef.current) bustMeshRef.current.visible = true;
          engine.setTargetPosition(-1.0, 11.5, 0);
          engine.setCameraView(0, Math.PI / 2, 13.0, false);
        }

        // Execute task queue sequentially
        runTaskQueue(filteredTasks, 0);
      }
    }, 1000);
  }, [engine, botScope, buildAllStrokeTasks]);

  const runTaskQueue = useCallback((tasks: BotStrokeTask[], taskIdx: number) => {
    if (!engine || !botRunningRef.current) return;

    if (taskIdx >= tasks.length) {
      // Completed all tasks!
      setIsBotRunning(false);
      botRunningRef.current = false;
      setStylusState((prev) => ({ ...prev, visible: false }));
      if (tasks[0]?.category === 'banana') {
        setBotActionMessage('Feather Banana Complete! (428 Strokes)');
      } else {
        setBotActionMessage('Showcase Complete!');
        // Smoothly zoom out to display the finished exhibit
        engine.setTargetPosition(2.0, 0, 0);
        engine.setCameraView(0.4, Math.PI / 2.8, 27.0, false);
      }
      return;
    }

    const task = tasks[taskIdx];
    const isBanana = task.category === 'banana';
    const prevTask = taskIdx > 0 ? tasks[taskIdx - 1] : null;
    const isSameColorAndTool = prevTask && prevTask.color === task.color && prevTask.presetId === task.presetId;

    setBotTaskIndex(taskIdx);
    setActiveTaskInfo({ name: task.brushName, color: task.color, size: task.size });

    // 1. Tool Selection Phase (Visibly updates toolbar state like a human picking a tool)
    setSelectedPresetId(task.presetId);
    setCustomColor(task.color);
    setCustomBrushSize(task.size);
    setBotActionMessage(
      isBanana
        ? `[${taskIdx + 1}/${tasks.length}] ${task.brushName}: ${task.strokeName}`
        : `Selecting Brush: ${task.brushName} (${task.color})`
    );

    // Camera follow / orbit
    if (isBanana) {
      if (cameraOrbitRef.current) {
        bananaThetaRef.current += 0.015;
        engine.setCameraView(
          bananaThetaRef.current,
          FEATHER_BANANA_STAGE.camera.phi,
          FEATHER_BANANA_STAGE.camera.radius,
          false
        );
      }
    } else if (cameraFollowRef.current && task.cameraTarget) {
      engine.setTargetPosition(task.cameraTarget.x, task.cameraTarget.y, task.cameraTarget.z);
      if (task.cameraTarget.distance !== undefined) {
        engine.setCameraView(
          task.cameraTarget.azimuth ?? 0,
          task.cameraTarget.elevation ?? Math.PI / 2,
          task.cameraTarget.distance,
          false
        );
      }
    }

    const selectPauseDuration = isBanana
      ? (isSameColorAndTool ? 0 : Math.max(30, Math.round(90 / botSpeedRef.current)))
      : Math.max(120, Math.round(260 / botSpeedRef.current));

    setTimeout(() => {
      if (!botRunningRef.current) return;

      // 2. Approach Phase: Stylus moves to start point
      const startPos = task.points[0].position;
      const startScreen = project3DToScreen(startPos, engine);

      setStylusState({
        visible: true,
        x: startScreen.x,
        y: startScreen.y,
        isDown: false,
        color: task.color,
        brushName: task.brushName,
      });
      setBotActionMessage(`Drawing ${task.brushName}: ${task.strokeName}`);

      const approachDuration = isBanana
        ? (isSameColorAndTool ? Math.max(12, Math.round(30 / botSpeedRef.current)) : Math.max(25, Math.round(60 / botSpeedRef.current)))
        : Math.max(80, Math.round(180 / botSpeedRef.current));

      setTimeout(() => {
        if (!botRunningRef.current) return;

        // 3. Drawing Phase: Point-by-point live progressive stroke generation
        setStylusState((prev) => ({ ...prev, isDown: true }));

        const totalPoints = task.points.length;
        let currentCount = 2;

        const drawStep = () => {
          if (!botRunningRef.current) return;

          if (botPausedRef.current) {
            // Idle while paused
            botAnimationIdRef.current = requestAnimationFrame(drawStep);
            return;
          }

          // Advance points based on speed
          const pointsPerFrame = isBanana
            ? Math.max(2, Math.round(3.2 * botSpeedRef.current))
            : Math.max(1, Math.round(1.2 * botSpeedRef.current));
          currentCount = Math.min(totalPoints, currentCount + pointsPerFrame);

          const partialPts = task.points.slice(0, currentCount);

          // Update stroke mesh in real-time
          const existing = (engine as any).strokes.get(task.id);
          if (existing && existing.meshes) {
            existing.meshes.forEach((m: THREE.Mesh) => {
              (engine as any).strokeRoot.remove(m);
              if (m.geometry) m.geometry.dispose();
            });
          }

          engine.recreateStrokeFromDescriptor({
            id: task.id,
            layerId: 'default_layer',
            tool: 'brush',
            points: partialPts,
            settings: task.settings,
            createdAt: Date.now(),
          });
          engine.markDirty();

          // Update Stylus Screen Position to track stroke tip
          const tipPos = partialPts[partialPts.length - 1].position;
          const tipScreen = project3DToScreen(tipPos, engine);
          setStylusState((prev) => ({
            ...prev,
            x: tipScreen.x,
            y: tipScreen.y,
            isDown: true,
          }));

          if (currentCount < totalPoints) {
            botAnimationIdRef.current = requestAnimationFrame(drawStep);
          } else {
            // 4. Stroke Complete: Lift pen & pause
            setStylusState((prev) => ({ ...prev, isDown: false }));
            const liftPause = isBanana
              ? Math.max(12, Math.round(25 / botSpeedRef.current))
              : Math.max(80, Math.round(160 / botSpeedRef.current));

            setTimeout(() => {
              if (!botRunningRef.current) return;
              runTaskQueue(tasks, taskIdx + 1);
            }, liftPause);
          }
        };

        botAnimationIdRef.current = requestAnimationFrame(drawStep);
      }, approachDuration);
    }, selectPauseDuration);
  }, [engine, project3DToScreen]);

  const pauseAutoDrawBot = useCallback(() => {
    setIsBotPaused(true);
    botPausedRef.current = true;
    setBotActionMessage('Paused');
  }, []);

  const resumeAutoDrawBot = useCallback(() => {
    setIsBotPaused(false);
    botPausedRef.current = false;
    setBotActionMessage('Resumed');
  }, []);

  const stopAutoDrawBot = useCallback(() => {
    setIsBotRunning(false);
    setIsBotPaused(false);
    botRunningRef.current = false;
    botPausedRef.current = false;
    if (botAnimationIdRef.current !== null) {
      cancelAnimationFrame(botAnimationIdRef.current);
      botAnimationIdRef.current = null;
    }
    setStylusState((prev) => ({ ...prev, visible: false }));
    setCountdown(null);
    setBotActionMessage('Stopped');
  }, []);

  // Initialize engine and canvas
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const inst = new StudioEngine(container);
    inst.setSkyPreset('off');
    inst.setTheme('dark');
    inst.setGrid(false);
    inst.setPostProcessSettings(DEFAULT_POST);

    // Remove default small plane
    const oldPlane = inst.getModelRoot().getObjectByName('DrawingPlaneCanvas');
    if (oldPlane) {
      inst.getModelRoot().remove(oldPlane);
    }

    // Setup extra-large drawing plane (16.0 x 28.0) centered at (-1.0, 0, 0)
    const plane = inst.setupDefaultDrawingPlane(BASE_CANVAS_WIDTH, BASE_CANVAS_HEIGHT);
    plane.position.set(-1.0, 0, 0);
    plane.userData.initialPosition = plane.position.clone();
    plane.updateMatrix();
    plane.updateMatrixWorld(true);
    planeMeshRef.current = plane;

    // Apply high-res board texture
    const tex = generateBoardTexture(boardTint);
    if (plane.material instanceof THREE.MeshStandardMaterial) {
      plane.material.map = tex;
      plane.material.opacity = 0.98;
      plane.material.needsUpdate = true;
    }

    // Create and position 3D Sculpted Clay Bust
    try {
      const bust = SampleModelFactory.createSculptedBust();
      bust.name = 'InteractiveSculptedBust';
      bust.scale.set(3.0, 3.0, 3.0);
      bust.position.set(11.5, 0.2, 0);
      bust.updateMatrix();
      bust.updateMatrixWorld(true);

      // Warm terracotta sculptor clay material
      bust.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshStandardMaterial({
            color: 0xc89b7b,
            roughness: 0.72,
            metalness: 0.05,
          });
          child.visible = true;
          const anyEngine = inst as any;
          if (Array.isArray(anyEngine.targetMeshes) && !anyEngine.targetMeshes.includes(child)) {
            anyEngine.targetMeshes.push(child);
          }
        }
      });

      inst.getModelRoot().add(bust);
      bustMeshRef.current = bust;
    } catch (e) {
      console.warn('Failed to load 3D bust:', e);
    }

    // Expose engine and THREE for tests and console inspection
    (window as any).__STUDIO_ENGINE__ = inst;
    (window as any).THREE = THREE;

    // Check if initial view is banana
    const urlParams = new URLSearchParams(window.location.search);
    const isBananaMode = urlParams.get('scope') !== 'all' && (urlParams.get('banana') !== '0' || botScope === 'banana');

    if (isBananaMode) {
      if (planeMeshRef.current) planeMeshRef.current.visible = false;
      if (bustMeshRef.current) bustMeshRef.current.visible = false;
      const sceneObj = (inst as any).scene || (inst.getScene ? inst.getScene() : null);
      if (sceneObj) {
        sceneObj.background = new THREE.Color(FEATHER_BANANA_STAGE.backgroundColor);
      }
      const anyInst = inst as any;
      if (anyInst.ambientLight) anyInst.ambientLight.intensity = 1.6;
      if (anyInst.dirLight1) {
        anyInst.dirLight1.position.set(-15, 18, -10);
        anyInst.dirLight1.intensity = 1.8;
      }
      inst.setTargetPosition(
        FEATHER_BANANA_STAGE.focus.x,
        FEATHER_BANANA_STAGE.focus.y,
        FEATHER_BANANA_STAGE.focus.z
      );
      inst.setCameraView(
        FEATHER_BANANA_STAGE.camera.theta,
        FEATHER_BANANA_STAGE.camera.phi,
        FEATHER_BANANA_STAGE.camera.radius,
        true
      );
      bananaThetaRef.current = FEATHER_BANANA_STAGE.camera.theta;
      populateBananaInstantly(inst);
    } else {
      // Set initial front-facing camera view centered to view both canvas and the 3D model
      inst.setTargetPosition(3.0, 0, 0);
      inst.setCameraView(0, Math.PI / 2, 31.0, true);
      populateAllInstantly(inst);
    }

    setEngine(inst);

    return () => {
      if (botAnimationIdRef.current !== null) {
        cancelAnimationFrame(botAnimationIdRef.current);
      }
      inst.dispose();
    };
  }, []);

  // Handle switching drawing scopes (Banana 3D Stage vs Showcase Canvas)
  const handleScopeChange = useCallback((newScope: 'banana' | 'all' | 'bust' | 'clay' | 'presets' | 'patterns') => {
    if (isBotRunning) {
      stopAutoDrawBot();
    }
    setBotScope(newScope);
    if (!engine) return;

    const anyEng = engine as any;

    if (newScope === 'banana') {
      if (planeMeshRef.current) planeMeshRef.current.visible = false;
      if (bustMeshRef.current) bustMeshRef.current.visible = false;
      if (engine.scene) {
        engine.scene.background = new THREE.Color(FEATHER_BANANA_STAGE.backgroundColor);
      }
      if (anyEng.ambientLight) anyEng.ambientLight.intensity = 1.6;
      if (anyEng.dirLight1) {
        anyEng.dirLight1.position.set(-15, 18, -10);
        anyEng.dirLight1.intensity = 1.8;
      }
      engine.setTargetPosition(
        FEATHER_BANANA_STAGE.focus.x,
        FEATHER_BANANA_STAGE.focus.y,
        FEATHER_BANANA_STAGE.focus.z
      );
      engine.setCameraView(
        FEATHER_BANANA_STAGE.camera.theta,
        FEATHER_BANANA_STAGE.camera.phi,
        FEATHER_BANANA_STAGE.camera.radius,
        true
      );
      bananaThetaRef.current = FEATHER_BANANA_STAGE.camera.theta;
      populateBananaInstantly(engine);
    } else {
      if (planeMeshRef.current) planeMeshRef.current.visible = true;
      if (bustMeshRef.current) bustMeshRef.current.visible = true;
      if (anyEng.ambientLight) anyEng.ambientLight.intensity = 0.85;
      if (anyEng.dirLight1) {
        anyEng.dirLight1.position.set(10, 20, 15);
        anyEng.dirLight1.intensity = 1.5;
      }
      engine.setTheme(theme);
      if (newScope === 'bust') {
        engine.setTargetPosition(11.5, 0.5, 0);
        engine.setCameraView(0.35, Math.PI / 2.3, 10.5, true);
      } else if (newScope === 'all') {
        engine.setTargetPosition(3.0, 0, 0);
        engine.setCameraView(0, Math.PI / 2, 31.0, true);
      } else {
        engine.setTargetPosition(-1.0, 11.5, 0);
        engine.setCameraView(0, Math.PI / 2, 13.0, true);
      }
      populateAllInstantly(engine);
    }
  }, [engine, isBotRunning, stopAutoDrawBot, theme, populateBananaInstantly, populateAllInstantly]);

  // Board tint toggle
  const handleToggleBoardTint = useCallback(() => {
    const nextTint = boardTint === 'white' ? 'slate' : 'white';
    setBoardTint(nextTint);
    if (planeMeshRef.current && planeMeshRef.current.material instanceof THREE.MeshStandardMaterial) {
      const tex = generateBoardTexture(nextTint);
      planeMeshRef.current.material.map = tex;
      planeMeshRef.current.needsUpdate = true;
      if (engine) engine.markDirty();
    }
  }, [boardTint, generateBoardTexture, engine]);

  // Theme toggle
  const toggleTheme = useCallback(() => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (engine) engine.setTheme(nextTheme);
  }, [theme, engine]);

  // Camera presets
  const handleViewFull = useCallback(() => {
    if (engine) {
      engine.setTargetPosition(3.0, 0, 0);
      engine.setCameraView(0, Math.PI / 2, 31.0, false);
    }
  }, [engine]);

  const handleViewCanvas = useCallback(() => {
    if (engine) {
      engine.setTargetPosition(-1.0, 0, 0);
      engine.setCameraView(0, Math.PI / 2, 24.5, false);
    }
  }, [engine]);

  const handleViewBust = useCallback(() => {
    if (engine) {
      engine.setTargetPosition(11.5, 0.2, 0);
      engine.setCameraView(0.35, Math.PI / 2.3, 11.0, false);
    }
  }, [engine]);

  const handleViewClayBrushes = useCallback(() => {
    if (engine) {
      engine.setTargetPosition(-1.0, -8.0, 0);
      engine.setCameraView(0, Math.PI / 2, 12.0, false);
    }
  }, [engine]);

  const handleViewPatterns = useCallback(() => {
    if (engine) {
      engine.setTargetPosition(-1.0, 11.8, 0);
      engine.setCameraView(0, Math.PI / 2, 10.0, false);
    }
  }, [engine]);

  const handleViewTilt = useCallback(() => {
    if (engine) {
      engine.setTargetPosition(3.0, 0, 0);
      engine.setCameraView(0.42, Math.PI / 2.8, 26.0, false);
    }
  }, [engine]);

  // Manual Pointer Interactions
  const isPointerDownRef = useRef<boolean>(false);
  const lastPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('#top-toolbar') || (e.target as HTMLElement).closest('#bot-controls') || (e.target as HTMLElement).closest('#guide-panel')) return;
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
      ref={containerRef}
      className={`relative w-screen h-screen overflow-hidden select-none ${
        isDark ? 'bg-[#0f1115] text-neutral-200' : 'bg-[#e5e5e5] text-neutral-800'
      }`}
      onContextMenu={(e) => e.preventDefault()}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onWheel={handleWheel}
    >
      {/* ── TOP CONTROL BAR ── */}
      <header
        id="top-toolbar"
        className={`absolute top-0 left-0 right-0 z-30 min-h-12 px-3 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b text-xs font-mono ${
          isDark
            ? 'bg-[#181a1f]/95 border-white/10 text-neutral-300'
            : 'bg-[#f4f4f5]/95 border-black/10 text-neutral-700'
        }`}
      >
        {/* Title & Badge */}
        <div className="flex items-center gap-2">
          <span className="font-bold tracking-wide uppercase text-[11px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            SANDBOX 3
          </span>
          <span className="font-sans font-semibold text-xs">All 26 Brushes & 6 Patterns</span>
          <span className="hidden lg:inline-block px-2 py-0.5 rounded bg-neutral-500/10 text-neutral-400 text-[11px]">
            Live Auto-Draw Bot
          </span>
        </div>

        {/* Action Controls & Bot Toggle */}
        <div className="flex items-center flex-wrap gap-1.5">
          {/* Bot Control Panel Toggle */}
          <button
            onClick={() => setShowBotControls(!showBotControls)}
            className={`px-2.5 py-1 rounded border text-[11px] font-sans font-bold flex items-center gap-1.5 transition-colors ${
              showBotControls
                ? 'bg-red-600 text-white border-red-500 shadow-sm'
                : isDark
                ? 'bg-neutral-800 border-neutral-700 text-red-400 hover:bg-neutral-700'
                : 'bg-white border-neutral-300 text-red-600 hover:bg-neutral-100'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isBotRunning ? 'bg-white animate-ping' : 'bg-red-400'}`} />
            Auto-Draw Bot
          </button>

          {/* Active Brush & Color Display (Visibly driven by the Bot during drawing) */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-neutral-700/50 bg-black/15">
            <span className="text-[10px] text-neutral-400">Brush:</span>
            <select
              value={selectedPresetId}
              onChange={(e) => setSelectedPresetId(e.target.value)}
              className="bg-neutral-800 text-white text-[11px] font-mono px-1 py-0.5 rounded border border-neutral-700 focus:outline-none max-w-[130px]"
            >
              <optgroup label="Visual Styles (18)">
                {DEFAULT_BRUSH_PRESETS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Clay Sculpting (8)">
                {SCULPT_BRUSHES.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </optgroup>
            </select>
            <input
              type="color"
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              title="Current Paint Color"
              className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent"
            />
          </div>

          {/* Camera Focus Presets */}
          <button
            onClick={handleViewFull}
            className={`px-2 py-1 rounded border text-[11px] font-sans ${
              isDark ? 'bg-neutral-800 border-neutral-700 hover:bg-neutral-700' : 'bg-white border-neutral-300 hover:bg-neutral-100'
            }`}
          >
            All View
          </button>

          <button
            onClick={handleViewCanvas}
            className={`px-2 py-1 rounded border text-[11px] font-sans ${
              isDark ? 'bg-neutral-800 border-neutral-700 hover:bg-neutral-700' : 'bg-white border-neutral-300 hover:bg-neutral-100'
            }`}
          >
            Board
          </button>

          <button
            onClick={handleViewBust}
            className={`px-2 py-1 rounded border text-[11px] font-sans font-medium text-emerald-400 ${
              isDark ? 'bg-neutral-800 border-neutral-700 hover:bg-neutral-700' : 'bg-white border-neutral-300 hover:bg-neutral-100'
            }`}
          >
            3D Model
          </button>

          <button
            onClick={handleViewClayBrushes}
            className={`px-2 py-1 rounded border text-[11px] font-sans font-medium text-orange-400 ${
              isDark ? 'bg-neutral-800 border-neutral-700 hover:bg-neutral-700' : 'bg-white border-neutral-300 hover:bg-neutral-100'
            }`}
          >
            Clay (8)
          </button>

          <button
            onClick={handleViewPatterns}
            className={`px-2 py-1 rounded border text-[11px] font-sans ${
              isDark ? 'bg-neutral-800 border-neutral-700 hover:bg-neutral-700' : 'bg-white border-neutral-300 hover:bg-neutral-100'
            }`}
          >
            Patterns (6)
          </button>

          <button
            onClick={handleViewTilt}
            className={`px-2 py-1 rounded border text-[11px] font-sans ${
              isDark ? 'bg-neutral-800 border-neutral-700 hover:bg-neutral-700' : 'bg-white border-neutral-300 hover:bg-neutral-100'
            }`}
          >
            3D Tilt
          </button>

          {/* Guide Explainer Button */}
          <button
            onClick={() => setShowGuide(!showGuide)}
            className={`px-2 py-1 rounded border text-[11px] font-sans font-semibold ${
              showGuide
                ? 'bg-amber-500 text-black border-amber-400'
                : isDark
                ? 'bg-neutral-800 border-neutral-700 text-amber-300 hover:bg-neutral-700'
                : 'bg-white border-neutral-300 text-amber-600 hover:bg-neutral-100'
            }`}
          >
            {showGuide ? 'Close Guide' : '? What This App Does'}
          </button>

          {/* Grid Toggle */}
          <button
            onClick={() => {
              const next = !gridActive;
              setGridActive(next);
              if (engine) engine.setGrid(next);
            }}
            className={`px-2 py-1 rounded border text-[11px] font-sans ${
              isDark ? 'bg-neutral-800 border-neutral-700 hover:bg-neutral-700' : 'bg-white border-neutral-300 hover:bg-neutral-100'
            }`}
          >
            Grid: {gridActive ? 'On' : 'Off'}
          </button>

          {/* Board Tint Toggle */}
          <button
            onClick={handleToggleBoardTint}
            className={`px-2 py-1 rounded border text-[11px] font-sans ${
              isDark ? 'bg-neutral-800 border-neutral-700 hover:bg-neutral-700' : 'bg-white border-neutral-300 hover:bg-neutral-100'
            }`}
          >
            Board: {boardTint === 'white' ? 'White Paper' : 'Dark Slate'}
          </button>

          {/* App Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`px-2 py-1 rounded border text-[11px] font-sans ${
              isDark ? 'bg-neutral-800 border-neutral-700 hover:bg-neutral-700' : 'bg-white border-neutral-300 hover:bg-neutral-100'
            }`}
          >
            Theme: {isDark ? 'Dark' : 'Light'}
          </button>
        </div>
      </header>

      {/* ── AUTO-DRAW BOT CONTROL DOCK ── */}
      {showBotControls && (
        <div
          id="bot-controls"
          className={`absolute top-14 left-4 z-40 p-3.5 rounded border font-mono text-xs shadow-2xl ${
            isDark ? 'bg-[#181a1f]/95 border-red-500/40 text-neutral-200' : 'bg-white/95 border-red-400 text-neutral-800'
          } w-[340px]`}
        >
          {/* Dock Header */}
          <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-neutral-700/50">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isBotRunning ? 'bg-red-500 animate-ping' : 'bg-neutral-500'}`} />
              <span className="font-bold text-xs uppercase tracking-wide text-red-400">LIVE AUTO-DRAW BOT</span>
            </div>
            <span className="text-[10px] text-neutral-400 font-sans">For Screen Capture</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 mb-3">
            {!isBotRunning ? (
              <button
                onClick={startAutoDrawBot}
                className="flex-1 py-1.5 px-3 rounded bg-red-600 hover:bg-red-500 text-white font-sans font-bold text-xs flex items-center justify-center gap-1.5 shadow"
              >
                <span>Start Auto-Draw</span>
              </button>
            ) : isBotPaused ? (
              <button
                onClick={resumeAutoDrawBot}
                className="flex-1 py-1.5 px-3 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-sans font-bold text-xs"
              >
                Resume
              </button>
            ) : (
              <button
                onClick={pauseAutoDrawBot}
                className="flex-1 py-1.5 px-3 rounded bg-amber-600 hover:bg-amber-500 text-white font-sans font-bold text-xs"
              >
                Pause
              </button>
            )}

            {isBotRunning && (
              <button
                onClick={stopAutoDrawBot}
                className="py-1.5 px-2.5 rounded bg-neutral-700 hover:bg-neutral-600 text-neutral-200 font-sans text-xs"
              >
                Stop
              </button>
            )}

            <button
              onClick={() => {
                if (engine) {
                  if (botScope === 'banana') populateBananaInstantly(engine);
                  else populateAllInstantly(engine);
                }
              }}
              title="Populate complete strokes instantly without waiting"
              className="py-1.5 px-2 rounded border border-neutral-700 text-neutral-400 hover:text-white font-sans text-[11px]"
            >
              {botScope === 'banana' ? 'Show Banana' : 'Show All'}
            </button>

            <button
              onClick={() => engine && engine.clearAllStrokes()}
              title="Clear all strokes"
              className="py-1.5 px-2 rounded border border-neutral-700 text-neutral-400 hover:text-white font-sans text-[11px]"
            >
              Clear
            </button>
          </div>

          {/* Scope Selector */}
          <div className="mb-2.5">
            <div className="flex items-center justify-between text-[10px] text-neutral-400 mb-1">
              <span>Drawing Target:</span>
              {botScope === 'banana' && (
                <span className="text-yellow-400 font-bold">Feather 3D Live</span>
              )}
            </div>

            {/* Featured Banana Button */}
            <button
              onClick={() => handleScopeChange('banana')}
              className={`w-full mb-1.5 py-1.5 px-2 rounded border text-center flex items-center justify-center gap-1.5 text-[11px] font-sans transition-all ${
                botScope === 'banana'
                  ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500 font-bold shadow-[0_0_12px_rgba(234,179,8,0.25)]'
                  : 'border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 bg-neutral-900/40'
              }`}
            >
              <span>Feather 3D Banana (428 Strokes)</span>
            </button>

            <div className="grid grid-cols-3 gap-1 text-[10px] font-sans">
              <button
                onClick={() => handleScopeChange('all')}
                className={`py-1 px-1.5 rounded border text-center ${
                  botScope === 'all'
                    ? 'bg-neutral-800 text-white border-neutral-600 font-bold'
                    : 'border-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                All (89)
              </button>
              <button
                onClick={() => handleScopeChange('bust')}
                className={`py-1 px-1.5 rounded border text-center ${
                  botScope === 'bust'
                    ? 'bg-emerald-900/60 text-emerald-300 border-emerald-500 font-bold'
                    : 'border-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                3D Bust (5)
              </button>
              <button
                onClick={() => handleScopeChange('clay')}
                className={`py-1 px-1.5 rounded border text-center ${
                  botScope === 'clay'
                    ? 'bg-orange-900/60 text-orange-300 border-orange-500 font-bold'
                    : 'border-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Clay (24)
              </button>
              <button
                onClick={() => handleScopeChange('presets')}
                className={`py-1 px-1.5 rounded border text-center ${
                  botScope === 'presets'
                    ? 'bg-blue-900/60 text-blue-300 border-blue-500 font-bold'
                    : 'border-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Presets (54)
              </button>
              <button
                onClick={() => handleScopeChange('patterns')}
                className={`py-1 px-1.5 rounded border text-center ${
                  botScope === 'patterns'
                    ? 'bg-purple-900/60 text-purple-300 border-purple-500 font-bold'
                    : 'border-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Patterns (6)
              </button>
              <button
                onClick={() => {
                  if (engine) {
                    if (botScope === 'banana') populateBananaInstantly(engine);
                    else populateAllInstantly(engine);
                  }
                }}
                title="Render complete artwork instantly without bot drawing"
                className="py-1 px-1.5 rounded border border-neutral-700 text-amber-400 hover:text-amber-300 text-center"
              >
                Instant Full
              </button>
            </div>
          </div>

          {/* Speed Selector */}
          <div className="flex items-center justify-between mb-2 text-[11px]">
            <span className="text-neutral-400">Drawing Speed:</span>
            <div className="flex items-center gap-1">
              {[0.5, 1.0, 2.0, 4.0, 8.0].map((s) => (
                <button
                  key={s}
                  onClick={() => setBotSpeed(s)}
                  className={`px-1.5 py-0.5 rounded text-[10px] ${
                    botSpeed === s
                      ? 'bg-neutral-700 text-white font-bold'
                      : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

          {/* Cinematic Orbit Toggle (for 3D video screen recording) */}
          <div className="flex items-center justify-between mb-2 text-[11px]">
            <span className="text-neutral-400">Cinematic Orbit:</span>
            <button
              onClick={() => setCameraOrbit(!cameraOrbit)}
              className={`px-2 py-0.5 rounded text-[10px] font-sans border ${
                cameraOrbit
                  ? 'bg-cyan-900/60 text-cyan-300 border-cyan-500 font-bold shadow'
                  : 'border-neutral-800 text-neutral-500 hover:text-neutral-300'
              }`}
            >
              {cameraOrbit ? 'Orbiting 360°' : 'Locked View'}
            </button>
          </div>

          {/* Camera Follow Toggle */}
          <div className="flex items-center justify-between mb-2 text-[11px]">
            <span className="text-neutral-400">Camera Follow:</span>
            <button
              onClick={() => setCameraFollow(!cameraFollow)}
              className={`px-2 py-0.5 rounded text-[10px] font-sans ${
                cameraFollow ? 'bg-emerald-800 text-emerald-200 font-semibold' : 'bg-neutral-800 text-neutral-400'
              }`}
            >
              {cameraFollow ? 'Active' : 'Off (Static)'}
            </button>
          </div>

          {/* Live Progress Bar & Info */}
          {isBotRunning && (
            <div className="pt-2 border-t border-neutral-700/50 space-y-1">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-neutral-400">Stroke:</span>
                <span className="text-white font-bold">
                  {botTaskIndex + 1} of {botTotalTasks} ({Math.round(((botTaskIndex + 1) / botTotalTasks) * 100)}%)
                </span>
              </div>
              <div className="w-full h-1.5 bg-neutral-800 rounded overflow-hidden">
                <div
                  className="h-full bg-red-500 transition-all duration-150"
                  style={{ width: `${((botTaskIndex + 1) / botTotalTasks) * 100}%` }}
                />
              </div>
              <div className="text-[10px] text-emerald-400 truncate pt-0.5">
                {botActionMessage}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── COUNTDOWN SCREEN RECORDER PREP OVERLAY ── */}
      {countdown !== null && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/75 backdrop-blur-xs font-mono select-none">
          <div className="text-xs uppercase tracking-widest text-red-400 font-bold mb-3 px-3 py-1 rounded border border-red-500/40 bg-red-950/40">
            START SCREEN RECORDING NOW
          </div>
          <div className="text-8xl font-black text-white mb-4 animate-pulse">
            {countdown}
          </div>
          <div className="text-xs text-neutral-400 font-sans text-center max-w-sm">
            Auto-Draw Bot is preparing the canvas. The drawing will begin point-by-point in {countdown} second{countdown > 1 ? 's' : ''}.
          </div>
        </div>
      )}

      {/* ── VIRTUAL STYLUS CURSOR (Tracks stroke tip on screen) ── */}
      {stylusState.visible && (
        <div
          className="pointer-events-none fixed z-50 transition-transform duration-75 ease-out"
          style={{
            left: `${stylusState.x}px`,
            top: `${stylusState.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="relative flex items-center">
            {/* Pressure ripple ring */}
            <div
              className={`absolute -inset-2 rounded-full border-2 transition-all duration-100 ${
                stylusState.isDown ? 'scale-125 opacity-100' : 'scale-75 opacity-30'
              }`}
              style={{ borderColor: stylusState.color }}
            />
            {/* Nib center */}
            <div
              className="w-4 h-4 rounded-full border-2 border-white shadow-xl flex items-center justify-center"
              style={{ backgroundColor: stylusState.color }}
            >
              <div className="w-1.5 h-1.5 bg-white rounded-full" />
            </div>
            {/* Active Brush Label */}
            <div className="ml-3 px-2 py-0.5 rounded bg-black/90 border border-white/20 text-[10px] text-white font-mono whitespace-nowrap shadow-xl">
              {stylusState.brushName}
            </div>
          </div>
        </div>
      )}

      {/* ── GUIDE EXPLAINER PANEL ── */}
      {showGuide && (
        <aside
          id="guide-panel"
          className={`absolute top-14 right-4 z-40 w-96 max-h-[85vh] overflow-y-auto p-4 rounded border font-sans text-xs shadow-2xl ${
            isDark ? 'bg-[#181a1f] border-neutral-700 text-neutral-200' : 'bg-white border-neutral-300 text-neutral-800'
          }`}
        >
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-neutral-700/50">
            <span className="font-bold text-sm text-amber-400 font-mono">WHAT THIS APP ACTUALLY DOES</span>
            <button onClick={() => setShowGuide(false)} className="text-neutral-400 hover:text-white font-mono">
              [X]
            </button>
          </div>

          <div className="space-y-3 leading-relaxed">
            <div>
              <p className="font-bold text-white mb-1">1. It is a 3D Spatial Creative Studio</p>
              <p className="text-neutral-400">
                Unlike regular paint apps (like Photoshop or Procreate) that only draw flat 2D pixels on a flat screen,
                every stroke drawn in this app is a real 3D mesh that lives in 3D physical space.
              </p>
            </div>

            <div>
              <p className="font-bold text-white mb-1">2. Three Distinct Ways to Draw & Sculpt</p>
              <ul className="list-disc pl-4 space-y-1 text-neutral-400">
                <li>
                  <strong className="text-neutral-200">On 3D Objects:</strong> Draw directly onto 3D models (like the
                  sculpted clay bust on the right). Strokes wrap around curved surfaces, build clay volume, pinch ridges,
                  and carve creases.
                </li>
                <li>
                  <strong className="text-neutral-200">In Free 3D Air:</strong> Draw 3D pipes, cables, and neon wires
                  floating in mid-air. You can walk around them and view them from every perspective.
                </li>
                <li>
                  <strong className="text-neutral-200">On a 3D Drafting Canvas:</strong> Sketch on the giant drafting
                  board on the left with millimeter precision.
                </li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-white mb-1">3. The 3 Types of Brushes</p>
              <ul className="list-disc pl-4 space-y-1 text-neutral-400">
                <li>
                  <strong className="text-neutral-200">Visual & Shaders (18):</strong> Metallic chrome, polished gold leaf,
                  glowing neon cables with bloom, and live animated shaders (fire, lightning, plasma, aurora).
                </li>
                <li>
                  <strong className="text-neutral-200">Clay Sculpting (8):</strong> Digital clay tools: Add Volume (build),
                  Inflate (swelling mass), Pinch (sharp ridge), Crease (carved shadow incision), Flatten (planar bevel),
                  and Smooth (polishing blend).
                </li>
                <li>
                  <strong className="text-neutral-200">Procedural Patterns (6):</strong> Solid, Stipple spray, Terrazzo
                  stone mosaic, Dot matrix, Line hatch, and Cross-hatch decals.
                </li>
              </ul>
            </div>

            <div className="pt-2 border-t border-neutral-700/50">
              <p className="font-bold text-emerald-400 mb-1">How to Screen Record the Auto-Draw Bot:</p>
              <p className="text-neutral-400">
                1. Click <strong>'Start Auto-Draw'</strong> in the top-left dock.
                <br />
                2. A 3-second countdown will start — click 'Record' in your screen capture app.
                <br />
                3. The bot will automatically select each brush, pick colors, and draw the strokes live on the canvas and 3D model!
              </p>
            </div>
          </div>
        </aside>
      )}

      {/* ── FOOTER BAR ── */}
      <footer
        className={`absolute bottom-2 left-3 right-3 z-30 px-3 py-1.5 rounded flex items-center justify-between text-[11px] font-mono border pointer-events-none ${
          isDark
            ? 'bg-neutral-900/90 border-white/10 text-neutral-400'
            : 'bg-white/90 border-neutral-300 text-neutral-600'
        }`}
      >
        <div>
          Left-drag: <b>Orbit 3D Camera</b> &middot; Right-drag / 2-finger: <b>Pan Camera</b> &middot; Wheel / Pinch: <b>Zoom In/Out</b>
        </div>
        <div>
          Exhibits: <b>18 Visual Styles &middot; 8 Clay Brushes &middot; 6 Patterns &middot; 3D Model</b>
        </div>
      </footer>
    </div>
  );
};
