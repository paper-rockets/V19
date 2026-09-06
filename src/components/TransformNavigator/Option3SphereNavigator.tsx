import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { StudioEngine } from '../../core/studioEngine';
import { TransformTargetScope } from '../../types';
import { subscribeCameraPose, getCameraPose } from '../../core/telemetryStore';
import { haptics } from '../../utils/haptics';
import './navigatorStyles.css';

export interface Option3SphereNavigatorProps {
  engine?: StudioEngine | null;
  theme?: 'light' | 'dark';
  targetScope?: TransformTargetScope;
  onSelectTargetScope?: (scope: TransformTargetScope) => void;
  isLocked?: boolean;
  onLockChange?: (locked: boolean) => void;
  onClose?: () => void;
  uiScale?: number;
  isSimple?: boolean;
}

const DEG = Math.PI / 180;
const SIZES = [140, 172, 210];

interface AxisDef {
  key: 'y' | 'x' | 'z';
  dir: [number, number, number];
  lbl: string;
  back: string;
  tone: string;
  label: string;
  word: string;
  viewName: 'top' | 'bottom' | 'front' | 'back' | 'left' | 'right';
}

export const Option3SphereNavigator: React.FC<Option3SphereNavigatorProps> = ({
  engine,
  theme = 'light',
  targetScope = 'all',
  onSelectTargetScope,
  isLocked = false,
  onLockChange,
  uiScale = 1.0,
  isSimple = true,
}) => {
  const isDark = theme === 'dark';

  // Sizing: 140 (Small), 172 (Medium), 210 (Large). Kids defaults to 214, Pro defaults to 172
  const [sizeIdx, setSizeIdx] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('paperrocket_gizmo_size_idx');
      if (saved !== null) {
        const n = parseInt(saved, 10);
        if (n >= 0 && n < SIZES.length) return n;
      }
    } catch (_) {}
    return isSimple ? 2 : 1;
  });

  const gzSize = isSimple ? 214 : SIZES[sizeIdx];

  // Mode: move | rotate | look
  const [mode, setMode] = useState<'move' | 'rotate' | 'look'>('move');

  // Snapping: Kids is always snapped; Pro is toggleable via Snap button or 'S' key
  const [isSnapOn, setIsSnapOn] = useState<boolean>(() => {
    if (isSimple) return true;
    try {
      const saved = localStorage.getItem('paperrocket_gizmo_pro_snap');
      if (saved !== null) return saved === 'true';
    } catch (_) {}
    return isLocked || false;
  });

  // Keep parent lock state in sync
  const toggleSnap = useCallback(() => {
    setIsSnapOn((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('paperrocket_gizmo_pro_snap', String(next));
      } catch (_) {}
      onLockChange?.(next);
      return next;
    });
  }, [onLockChange]);

  // Keys panel toggle for Pro mode
  const [isKeysOpen, setIsKeysOpen] = useState<boolean>(false);

  // Pro mode intro banner: "Tap an axis to face it. Drag it to change it."
  const [showIntro, setShowIntro] = useState<boolean>(!isSimple);
  const [introFading, setIntroFading] = useState<boolean>(false);

  useEffect(() => {
    if (isSimple) {
      setShowIntro(false);
      return;
    }
    const t1 = setTimeout(() => setIntroFading(true), 5200);
    const t2 = setTimeout(() => setShowIntro(false), 7000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isSimple]);

  // Walkthrough Tour State for Kids Mode ("Show me how")
  const [isTourActive, setIsTourActive] = useState<boolean>(false);
  const [caption, setCaption] = useState<{ main: string; sub?: string } | null>(null);
  const tourRef = useRef<{
    start: number;
    step: number;
    ring: { type: 'axis' | 'hub'; i?: number } | null;
    rafId: number | null;
  } | null>(null);

  // Position on screen
  const [pos, setPos] = useState<{ x: number; y: number }>(() => {
    const screenW = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const screenH = typeof window !== 'undefined' ? window.innerHeight : 800;
    const defX = Math.max(14, screenW - (isSimple ? 256 : 220));
    const defY = Math.max(80, screenH - (isSimple ? 380 : 340));
    try {
      const saved = localStorage.getItem('paperrocket_opt3_coords_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.x === 'number' && typeof parsed.y === 'number') {
          return {
            x: Math.max(10, Math.min(screenW - 160, parsed.x)),
            y: Math.max(10, Math.min(screenH - 240, parsed.y)),
          };
        }
      }
    } catch (_) {}
    return { x: defX, y: defY };
  });

  const [isDraggingRoot, setIsDraggingRoot] = useState<boolean>(false);
  const rootDragRef = useRef<{ startX: number; startY: number; origX: number; origY: number }>({
    startX: 0,
    startY: 0,
    origX: 0,
    origY: 0,
  });

  // Dynamic Hint Text
  const [hintText, setHintText] = useState<string>(
    isSimple ? 'Drag an arrow to slide it. Tap a dot to look from there.' : 'Drag an axis to slide · hub to float'
  );
  const [isHintLive, setIsHintLive] = useState<boolean>(false);
  const hintTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const idleHint = useCallback(() => {
    setIsHintLive(false);
    if (isSimple) {
      if (mode === 'look') setHintText('Drag to spin around it. Tap a dot to look from there.');
      else if (mode === 'move') setHintText('Drag an arrow to slide it. Tap a dot to look from there.');
      else setHintText('Drag an arrow to turn it. Tap the middle to go back to Move.');
    } else {
      if (mode === 'look') setHintText('Tap an axis to face it');
      else if (mode === 'move') setHintText('Drag an axis to slide · hub to float');
      else setHintText('Drag an axis to turn around it');
    }
  }, [isSimple, mode]);

  const say = useCallback((text: string, live: boolean = false) => {
    setHintText(text);
    setIsHintLive(live);
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    if (live) {
      hintTimerRef.current = setTimeout(idleHint, isSimple ? 1500 : 1300);
    }
  }, [idleHint, isSimple]);

  // Telemetry Readout State
  const [telemetry, setTelemetry] = useState<{
    height: string;
    tilt: string;
    turnOrSpin: string;
    bank: string;
  }>({
    height: isSimple ? '1.1' : '0.00',
    tilt: '0°',
    turnOrSpin: '0°',
    bank: '0°',
  });

  // Helper to obtain target quaternion (follows the plane/model orientation in 3D)
  const getTargetQuaternion = useCallback((): THREE.Quaternion => {
    if (!engine) return new THREE.Quaternion();
    if (targetScope === 'plane') {
      const plane = engine.getDrawingPlane();
      if (plane) {
        const q = new THREE.Quaternion();
        plane.getWorldQuaternion(q);
        return q;
      }
    } else if (targetScope === 'model') {
      if (engine.modelRoot) {
        const q = new THREE.Quaternion();
        engine.modelRoot.getWorldQuaternion(q);
        return q;
      }
    } else {
      const plane = engine.getDrawingPlane();
      if (plane) {
        const q = new THREE.Quaternion();
        plane.getWorldQuaternion(q);
        return q;
      }
      if (engine.modelRoot) {
        const q = new THREE.Quaternion();
        engine.modelRoot.getWorldQuaternion(q);
        return q;
      }
    }
    return new THREE.Quaternion();
  }, [engine, targetScope]);

  const updateTelemetry = useCallback(() => {
    if (!engine) return;
    const center = engine.getSelectionCenter(targetScope);
    const quat = getTargetQuaternion();
    const e = new THREE.Euler().setFromQuaternion(quat, 'YXZ');
    setTelemetry({
      height: isSimple ? center.y.toFixed(1) : center.y.toFixed(2),
      tilt: Math.round(e.x / DEG) + '°',
      turnOrSpin: Math.round(e.y / DEG) + '°',
      bank: Math.round(e.z / DEG) + '°',
    });
  }, [engine, getTargetQuaternion, isSimple, targetScope]);

  // Axis definitions
  // Kids mode: Orange Up, Blue Side, Green Front
  // Pro mode: Precision Monochromatic Grayscale (Y: #111111/#f4f4f5, X: #7c7c7a/#a1a1aa, Z: #c2c2be/#71717a)
  const AXES: AxisDef[] = isSimple
    ? [
        { key: 'y', dir: [0, 1, 0], lbl: 'Up', back: 'Down', tone: '#ec8a2c', label: '#ffffff', word: 'up', viewName: 'top' },
        { key: 'x', dir: [1, 0, 0], lbl: 'Side', back: 'Side', tone: '#2f7fd0', label: '#ffffff', word: 'sideways', viewName: 'right' },
        { key: 'z', dir: [0, 0, 1], lbl: 'Front', back: 'Back', tone: '#3f9e63', label: '#ffffff', word: 'forward', viewName: 'front' },
      ]
    : isDark
    ? [
        { key: 'y', dir: [0, 1, 0], lbl: 'Y', back: '-Y', tone: '#f4f4f5', label: '#09090b', word: 'Height', viewName: 'top' },
        { key: 'x', dir: [1, 0, 0], lbl: 'X', back: '-X', tone: '#a1a1aa', label: '#09090b', word: 'Across', viewName: 'right' },
        { key: 'z', dir: [0, 0, 1], lbl: 'Z', back: '-Z', tone: '#71717a', label: '#ffffff', word: 'Depth', viewName: 'front' },
      ]
    : [
        { key: 'y', dir: [0, 1, 0], lbl: 'Y', back: '-Y', tone: '#111111', label: '#ffffff', word: 'Height', viewName: 'top' },
        { key: 'x', dir: [1, 0, 0], lbl: 'X', back: '-X', tone: '#7c7c7a', label: '#ffffff', word: 'Across', viewName: 'right' },
        { key: 'z', dir: [0, 0, 1], lbl: 'Z', back: '-Z', tone: '#c2c2be', label: '#111111', word: 'Depth', viewName: 'front' },
      ];

  const GHOST = isDark ? 'rgba(255,255,255,0.22)' : 'rgba(17,17,17,0.20)';
  const HAIR = isDark ? 'rgba(255,255,255,0.14)' : 'rgba(17,17,17,0.13)';

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const activeInteractionRef = useRef<{
    type: 'axis' | 'hub' | 'orbit';
    i?: number;
    sign?: number;
  } | null>(null);

  const hoverRef = useRef<{ i: number; sign: number } | null>(null);

  const dragSessionRef = useRef<{
    startX: number;
    startY: number;
    moved: boolean;
    hit: { a: AxisDef; i: number; sign: number; dir: THREE.Vector3; viewName: AxisDef['viewName'] } | null;
    startTheta: number;
    startPhi: number;
    startAngle: number;
    lastAppliedAmount: number;
    lastAppliedDeg: number;
    lastAppliedFloatX: number;
    lastAppliedFloatY: number;
    lastAppliedAy: number;
    lastAppliedAx: number;
  } | null>(null);

  const gzMetrics = useCallback(() => {
    const S = gzSize;
    return {
      S,
      c: S / 2,
      arm: isSimple ? S * 0.26 : S * 0.30,
      hand: isSimple ? S * 0.105 : S * 0.082,
      hub: isSimple ? S * 0.12 : S * 0.105,
      ring: S * 0.455,
    };
  }, [gzSize, isSimple]);

  const axisDir = useCallback(
    (a: AxisDef) => {
      const v = new THREE.Vector3(a.dir[0], a.dir[1], a.dir[2]);
      if (mode !== 'look') {
        v.applyQuaternion(getTargetQuaternion());
      }
      return v.normalize();
    },
    [getTargetQuaternion, mode]
  );

  const project = useCallback(
    (v: THREE.Vector3, m: ReturnType<typeof gzMetrics>, cam: { phi: number; theta: number }) => {
      const sp = Math.sin(cam.phi),
        cp = Math.cos(cam.phi);
      const st = Math.sin(cam.theta),
        ct = Math.cos(cam.theta);
      const sx = v.x * ct + v.z * -st;
      const sy = v.x * (-cp * st) + v.y * sp + v.z * (-cp * ct);
      const depth = v.x * (sp * st) + v.y * cp + v.z * (sp * ct);
      return { x: m.c + sx * m.arm, y: m.c - sy * m.arm, depth, len: Math.hypot(sx, sy) };
    },
    []
  );

  const getHandles = useCallback(
    (m: ReturnType<typeof gzMetrics>, cam: { phi: number; theta: number }) => {
      const out: Array<{
        a: AxisDef;
        i: number;
        sign: number;
        dir: THREE.Vector3;
        viewName: AxisDef['viewName'];
        p: ReturnType<typeof project>;
      }> = [];

      const oppView: Record<string, AxisDef['viewName']> = {
        top: 'bottom',
        bottom: 'top',
        right: 'left',
        left: 'right',
        front: 'back',
        back: 'front',
      };

      AXES.forEach((a, i) => {
        const d = axisDir(a);
        out.push({ a, i, sign: 1, dir: d, viewName: a.viewName, p: project(d, m, cam) });
        const n = d.clone().negate();
        out.push({ a, i, sign: -1, dir: n, viewName: oppView[a.viewName] || 'front', p: project(n, m, cam) });
      });
      return out;
    },
    [AXES, axisDir, project]
  );

  const drawHubIcon = useCallback(
    (g: CanvasRenderingContext2D, cx: number, cy: number, r: number) => {
      g.save();
      const col = isDark ? '#f4f4f5' : '#111111';
      g.strokeStyle = col;
      g.fillStyle = col;
      g.lineWidth = isSimple ? 1.5 : 1.3;
      if (mode === 'move') {
        for (let k = 0; k < 4; k++) {
          g.save();
          g.translate(cx, cy);
          g.rotate((k * Math.PI) / 2);
          g.beginPath();
          g.moveTo(0, 0);
          g.lineTo(r * 0.86, 0);
          g.stroke();
          g.beginPath();
          g.moveTo(r, 0);
          g.lineTo(r * 0.6, -r * 0.32);
          g.lineTo(r * 0.6, r * 0.32);
          g.closePath();
          g.fill();
          g.restore();
        }
      } else if (mode === 'rotate') {
        g.beginPath();
        g.arc(cx, cy, r * 0.82, -2.5, 1.7);
        g.stroke();
        const ax = cx + Math.cos(1.7) * r * 0.82,
          ay = cy + Math.sin(1.7) * r * 0.82;
        g.beginPath();
        g.moveTo(ax + (isSimple ? 3.8 : 3.4), ay - 0.4);
        g.lineTo(ax - (isSimple ? 1.6 : 1.4), ay + 3.4);
        g.lineTo(ax - (isSimple ? 2.9 : 2.6), ay - 2.4);
        g.closePath();
        g.fill();
      } else {
        g.beginPath();
        g.arc(cx, cy, r * 0.34, 0, Math.PI * 2);
        g.fill();
        g.beginPath();
        g.arc(cx, cy, r * 0.9, 0, Math.PI * 2);
        g.stroke();
      }
      g.restore();
    },
    [isDark, isSimple, mode]
  );

  const drawGizmo = useCallback(
    (now?: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const g = canvas.getContext('2d');
      if (!g) return;

      const m = gzMetrics();
      const pose = getCameraPose();
      const cam = { phi: pose.phi, theta: pose.theta };

      g.clearRect(0, 0, m.S, m.S);

      // See-through circular disc
      g.beginPath();
      g.arc(m.c, m.c, m.ring, 0, Math.PI * 2);
      g.fillStyle = isDark ? 'rgba(255,255,255,0.06)' : isSimple ? 'rgba(255,255,255,0.34)' : 'rgba(255,255,255,0.30)';
      g.fill();
      g.strokeStyle =
        activeInteractionRef.current?.type === 'orbit'
          ? isDark
            ? 'rgba(255,255,255,0.36)'
            : 'rgba(17,17,17,0.34)'
          : HAIR;
      g.lineWidth = 1;
      g.stroke();

      const hs = getHandles(m, cam).sort((p, q) => p.p.depth - q.p.depth);

      // Stems (back to front)
      hs.forEach((h) => {
        const front = h.p.depth >= -0.04;
        g.save();
        g.beginPath();
        g.moveTo(m.c, m.c);
        g.lineTo(h.p.x, h.p.y);
        if (h.sign > 0 && front) {
          g.strokeStyle = h.a.tone;
          g.lineWidth = isSimple ? 3 : 2.4;
        } else {
          g.strokeStyle = GHOST;
          g.lineWidth = isSimple ? 1.2 : 1;
          g.setLineDash([3, 4]);
        }
        g.stroke();
        g.restore();
      });

      // Handles (back to front)
      hs.forEach((h) => {
        const front = h.p.depth >= -0.04;
        const act = activeInteractionRef.current;
        const on = act && act.type === 'axis' && act.i === h.i && act.sign === h.sign;
        const hov = hoverRef.current && hoverRef.current.i === h.i && hoverRef.current.sign === h.sign;

        if (h.sign < 0 || !front) {
          g.beginPath();
          g.arc(h.p.x, h.p.y, m.hand * (h.sign < 0 ? (isSimple ? 0.6 : 0.66) : (isSimple ? 0.74 : 0.78)), 0, Math.PI * 2);
          g.fillStyle = on || hov ? (isDark ? 'rgba(255,255,255,0.5)' : 'rgba(17,17,17,0.42)') : GHOST;
          g.fill();
          return;
        }

        // Cap arrow points where drag goes
        if (h.p.len > (mode === 'rotate' ? 0.34 : 0.22)) {
          const ux = (h.p.x - m.c) / (m.arm * h.p.len);
          const uy = (h.p.y - m.c) / (m.arm * h.p.len);
          const base = m.hand * (isSimple ? 1.1 : 1.12);
          const wide = m.hand * (isSimple ? 0.6 : 0.62);
          g.save();
          g.translate(h.p.x, h.p.y);
          g.rotate(Math.atan2(uy, ux));
          g.fillStyle = h.a.tone;
          if (mode === 'rotate') {
            g.beginPath();
            g.arc(0, 0, m.hand * (isSimple ? 1.48 : 1.5), -0.95, 0.95);
            g.strokeStyle = h.a.tone;
            g.lineWidth = isSimple ? 2.6 : 2;
            g.stroke();
            const ax = Math.cos(0.95) * m.hand * (isSimple ? 1.48 : 1.5);
            const ay = Math.sin(0.95) * m.hand * (isSimple ? 1.48 : 1.5);
            g.beginPath();
            g.moveTo(ax + (isSimple ? 4 : 3.2), ay + (isSimple ? 1.4 : 1.2));
            g.lineTo(ax - (isSimple ? 3.2 : 2.6), ay + (isSimple ? 4.2 : 3.4));
            g.lineTo(ax - (isSimple ? 1.4 : 1.1), ay - (isSimple ? 3.2 : 2.6));
            g.closePath();
            g.fill();
          } else {
            g.beginPath();
            g.moveTo(base + m.hand * (isSimple ? 1.1 : 1.15), 0);
            g.lineTo(base, -wide);
            g.lineTo(base, wide);
            g.closePath();
            g.fill();
          }
          g.restore();
        }

        // Handle circle
        g.beginPath();
        g.arc(h.p.x, h.p.y, m.hand * (on || hov ? (isSimple ? 1.08 : 1.1) : 1), 0, Math.PI * 2);
        g.fillStyle = h.a.tone;
        g.fill();
        if (on || hov) {
          g.strokeStyle = isDark ? '#ffffff' : '#111111';
          g.lineWidth = isSimple ? 2 : 1.6;
          g.beginPath();
          g.arc(h.p.x, h.p.y, m.hand * (isSimple ? 1.34 : 1.42), 0, Math.PI * 2);
          g.stroke();
        }
        g.fillStyle = isSimple ? '#ffffff' : h.a.label;
        g.font = '600 ' + (m.hand * (isSimple ? 0.6 : 1.05)).toFixed(1) + 'px ui-sans-serif, -apple-system, sans-serif';
        g.textAlign = 'center';
        g.textBaseline = 'middle';
        g.fillText(h.a.lbl, h.p.x, h.p.y + 0.5);
      });

      // Center Hub
      g.beginPath();
      g.arc(m.c, m.c, m.hub, 0, Math.PI * 2);
      g.fillStyle = isDark ? 'rgba(30,32,38,0.92)' : isSimple ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.88)';
      g.fill();
      const isHubActive = activeInteractionRef.current && activeInteractionRef.current.type === 'hub';
      g.strokeStyle = isHubActive
        ? isDark
          ? '#ffffff'
          : '#111111'
        : isDark
        ? 'rgba(255,255,255,0.45)'
        : 'rgba(17,17,17,0.42)';
      g.lineWidth = isHubActive ? (isSimple ? 2 : 1.8) : isSimple ? 1.4 : 1.2;
      g.stroke();
      drawHubIcon(g, m.c, m.c, m.hub * (isSimple ? 0.6 : 0.62));

      // Draw Pulsing Tour Ring in Kids Mode
      if (isSimple && tourRef.current?.ring) {
        const ring = tourRef.current.ring;
        const t = ((now || performance.now()) % 1100) / 1100;
        let rx = m.c,
          ry = m.c,
          r0 = m.hub * 1.5;
        if (ring.type === 'axis' && typeof ring.i === 'number') {
          const h = hs.find((k) => k.i === ring.i && k.sign === 1);
          if (h) {
            rx = h.p.x;
            ry = h.p.y;
            r0 = m.hand * 1.5;
          }
        }
        g.save();
        g.strokeStyle = isDark
          ? 'rgba(255,255,255,' + (0.55 * (1 - t)).toFixed(3) + ')'
          : 'rgba(17,17,17,' + (0.55 * (1 - t)).toFixed(3) + ')';
        g.lineWidth = 2.4;
        g.beginPath();
        g.arc(rx, ry, r0 + t * m.hand * 1.5, 0, Math.PI * 2);
        g.stroke();
        g.restore();
      }
    },
    [drawHubIcon, getHandles, gzMetrics, isDark, isSimple, mode]
  );

  // Subscribe to telemetry camera pose
  useEffect(() => {
    const unsub = subscribeCameraPose(() => {
      drawGizmo();
      updateTelemetry();
    });
    return unsub;
  }, [drawGizmo, updateTelemetry]);

  // Size canvas when gzSize changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.style.width = `${gzSize}px`;
    canvas.style.height = `${gzSize}px`;
    canvas.width = Math.round(gzSize * dpr);
    canvas.height = Math.round(gzSize * dpr);
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawGizmo();
  }, [gzSize, drawGizmo]);

  const gzPoint = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return {
      x: (e.clientX - r.left) * (gzSize / r.width),
      y: (e.clientY - r.top) * (gzSize / r.height),
    };
  };

  const pickHandle = (pt: { x: number; y: number }) => {
    const m = gzMetrics();
    const pose = getCameraPose();
    const cam = { phi: pose.phi, theta: pose.theta };
    let best: ReturnType<typeof getHandles>[0] | null = null;
    let bd = Infinity;

    getHandles(m, cam).forEach((h) => {
      const d = Math.hypot(pt.x - h.p.x, pt.y - h.p.y);
      const reach = m.hand * (h.sign > 0 ? (isSimple ? 1.8 : 1.85) : (isSimple ? 1.45 : 1.5));
      const score = d - (h.p.depth >= -0.04 ? m.hand * 0.5 : 0);
      if (d < reach && score < bd) {
        bd = score;
        best = h;
      }
    });
    return best;
  };

  const stopTour = useCallback(() => {
    if (!tourRef.current) return;
    if (tourRef.current.rafId) cancelAnimationFrame(tourRef.current.rafId);
    tourRef.current = null;
    setIsTourActive(false);
    setCaption(null);
    drawGizmo();
  }, [drawGizmo]);

  const startTour = useCallback(() => {
    stopTour();
    setIsTourActive(true);
    setMode('move');
    const TOUR = [
      { t: 0, dur: 4200, ring: { type: 'axis' as const, i: 0 }, cap: 'Drag the orange arrow to lift it up.', sub: 'Every arrow slides it a different way.' },
      { t: 4200, dur: 4200, ring: { type: 'axis' as const, i: 1 }, cap: 'Tap a dot to look from that side.', sub: 'Tapping never moves your thing.' },
      { t: 8400, dur: 4600, ring: { type: 'hub' as const }, cap: 'Tap the middle circle to switch to Turn.', sub: 'Then the arrows spin it instead.' },
      { t: 13000, dur: 2000, ring: null, cap: 'Your turn. Undo fixes anything.', sub: '' }
    ];

    const startTime = performance.now();
    tourRef.current = { start: startTime, step: -1, ring: { type: 'axis', i: 0 }, rafId: null };

    const tick = (now: number) => {
      if (!tourRef.current) return;
      const el = Math.max(0, now - startTime);
      let idx = 0;
      for (let i = 0; i < TOUR.length; i++) {
        if (el >= TOUR[i].t) idx = i;
      }
      const last = TOUR[TOUR.length - 1];
      if (el > last.t + last.dur) {
        stopTour();
        return;
      }

      if (idx !== tourRef.current.step) {
        tourRef.current.step = idx;
        const s = TOUR[idx];
        tourRef.current.ring = s.ring;
        setCaption({ main: s.cap, sub: s.sub });
        if (idx === 1) {
          engine?.snapToView('right');
        } else if (idx === 2) {
          setMode('rotate');
        } else if (idx === 3) {
          setMode('move');
          engine?.resetCamera();
        }
      }
      drawGizmo(now);
      tourRef.current.rafId = requestAnimationFrame(tick);
    };
    tourRef.current.rafId = requestAnimationFrame(tick);
  }, [drawGizmo, engine, stopTour]);

  const snapTo = (v: number, step: number) => Math.round(v / step) * step;
  const fmt = (v: number) => (v >= 0 ? '+' : '') + v.toFixed(2);

  // Pro mode keyboard shortcuts
  useEffect(() => {
    if (isSimple) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.altKey || e.ctrlKey) return;
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }
      const k = e.key.toLowerCase();
      if (k === 'g') {
        setMode('move');
        say('Mode: Move', true);
      } else if (k === 'r') {
        setMode('rotate');
        say('Mode: Rotate', true);
      } else if (k === 'l') {
        setMode('look');
        say('Mode: Look', true);
      } else if (k === 'f') {
        engine?.alignSurfaceToCamera(targetScope);
        say('Facing the surface', true);
        updateTelemetry();
      } else if (k === 's') {
        toggleSnap();
        say(!isSnapOn ? 'Snapping to 0.25 m and 15°' : 'Snapping off', true);
      } else if (k === 'z') {
        e.preventDefault();
        engine?.undo();
        say('Undone', true);
        updateTelemetry();
      } else if (k === '0') {
        engine?.resetTransform(targetScope);
        engine?.resetCamera();
        say('Surface reset', true);
        updateTelemetry();
      } else if (k.startsWith('arrow')) {
        e.preventDefault();
        const step = e.shiftKey ? 1.0 : 0.25;
        if (k === 'arrowleft' || k === 'arrowright') {
          const s = k === 'arrowright' ? step : -step;
          engine?.translateScreenSpace(s, 0, targetScope, false);
          say('Nudged ' + fmt(s) + ' m', true);
        } else if (k === 'arrowup' || k === 'arrowdown') {
          const s = k === 'arrowup' ? step : -step;
          engine?.translateScreenSpace(0, -s, targetScope, false);
          say('Nudged ' + fmt(s) + ' m', true);
        }
        updateTelemetry();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [engine, isSimple, isSnapOn, say, targetScope, toggleSnap, updateTelemetry]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    e.stopPropagation();
    stopTour();

    const pt = gzPoint(e);
    const m = gzMetrics();
    const r = Math.hypot(pt.x - m.c, pt.y - m.c);
    const hit = pickHandle(pt);

    if (hit) {
      activeInteractionRef.current = { type: 'axis', i: hit.i, sign: hit.sign };
    } else if (r <= m.hub * 1.25 && mode !== 'look') {
      activeInteractionRef.current = { type: 'hub' };
    } else {
      activeInteractionRef.current = { type: 'orbit' };
    }

    const pose = getCameraPose();
    dragSessionRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      moved: false,
      hit,
      startTheta: pose.theta,
      startPhi: pose.phi,
      startAngle: Math.atan2(pt.y - m.c, pt.x - m.c),
      lastAppliedAmount: 0,
      lastAppliedDeg: 0,
      lastAppliedFloatX: 0,
      lastAppliedFloatY: 0,
      lastAppliedAy: 0,
      lastAppliedAx: 0,
    };

    if (mode === 'move' || mode === 'rotate') {
      engine?.beginTransform(targetScope);
    }

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (_) {}
    drawGizmo();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const session = dragSessionRef.current;
    if (!session) {
      const hit = pickHandle(gzPoint(e));
      hoverRef.current = hit ? { i: hit.i, sign: hit.sign } : null;
      e.currentTarget.style.cursor = hit ? 'pointer' : 'grab';
      drawGizmo();
      return;
    }

    const dx = e.clientX - session.startX;
    const dy = e.clientY - session.startY;
    if (!session.moved && Math.hypot(dx, dy) < (isSimple ? 4 : 3.5)) return;
    session.moved = true;

    const act = activeInteractionRef.current;
    if (!act) return;

    // Orbit camera in look mode or empty disc drag
    if (act.type === 'orbit' || (act.type === 'axis' && mode === 'look')) {
      const sens = 0.006 * (engine?.navigatorSensitivity || 1);
      engine?.orbitNavigator(dx * sens, dy * sens);
      session.startX = e.clientX;
      session.startY = e.clientY;
      say(isSimple ? 'Walking around it' : 'Orbiting', true);
      return;
    }

    // Units per pixel scale
    const pose = getCameraPose();
    const H = typeof window !== 'undefined' ? window.innerHeight : 800;
    const FOV = 46;
    const unitsPerPixel = (2 * pose.radius * Math.tan((FOV * DEG) / 2)) / H;

    // Floating Screen Pan / Trackball Tumble on Hub
    if (act.type === 'hub') {
      if (mode === 'move') {
        let fx = dx * unitsPerPixel;
        let fy = -dy * unitsPerPixel;
        if (isSimple || isSnapOn) {
          const step = isSimple ? 0.5 : 0.25;
          fx = snapTo(fx, step);
          fy = snapTo(fy, step);
        }
        const deltaX = fx - session.lastAppliedFloatX;
        const deltaY = fy - session.lastAppliedFloatY;
        if (Math.abs(deltaX) > 0.0001 || Math.abs(deltaY) > 0.0001) {
          engine?.translateScreenSpace(deltaX, -deltaY, targetScope, false);
          session.lastAppliedFloatX = fx;
          session.lastAppliedFloatY = fy;
          updateTelemetry();
        }
        say(isSimple ? 'Sliding it around' : `Floating  ${fmt(fx)} , ${fmt(fy)}`, true);
      } else {
        let ay = -dx * 0.5;
        let ax = -dy * 0.5;
        if (isSimple || isSnapOn) {
          ay = snapTo(ay, 15);
          ax = snapTo(ax, 15);
        }
        const deltaAy = ay - session.lastAppliedAy;
        const deltaAx = ax - session.lastAppliedAx;
        if (Math.abs(deltaAy) > 0.0001 || Math.abs(deltaAx) > 0.0001) {
          engine?.rotateTrackball(deltaAy * 2, deltaAx * 2, targetScope);
          session.lastAppliedAy = ay;
          session.lastAppliedAx = ax;
          updateTelemetry();
        }
        say(isSimple ? 'Tumbling it' : 'Turning freely', true);
      }
      return;
    }

    // Axis Dragging
    if (session.hit) {
      const h = session.hit;
      const m = gzMetrics();
      const p = project(h.dir, m, { phi: pose.phi, theta: pose.theta });

      if (mode === 'move') {
        const len = Math.max(0.001, p.len);
        const nx = (p.x - m.c) / (m.arm * len);
        const ny = (p.y - m.c) / (m.arm * len);
        const along = dx * nx + dy * ny;
        let amount = (along * unitsPerPixel) / Math.max(0.3, len);
        if (isSimple || isSnapOn) {
          const step = isSimple ? 0.5 : 0.25;
          amount = snapTo(amount, step);
        }
        const delta = amount - session.lastAppliedAmount;
        if (Math.abs(delta) > 0.0001) {
          engine?.translateAxis3D(h.a.key, delta * h.sign, targetScope, false);
          session.lastAppliedAmount = amount;
          updateTelemetry();
        }
        if (isSimple) {
          const label = h.sign > 0 ? h.a.lbl : h.a.back;
          say(`${label}  ${amount >= 0 ? '' : 'back '}${Math.abs(amount).toFixed(1)} steps`, true);
        } else {
          say(`Along ${h.a.lbl}  ${fmt(amount)} m`, true);
        }
      } else if (mode === 'rotate') {
        const pt = gzPoint(e);
        let d = Math.atan2(pt.y - m.c, pt.x - m.c) - session.startAngle;
        while (d > Math.PI) d -= Math.PI * 2;
        while (d < -Math.PI) d += Math.PI * 2;
        let deg = -(d / DEG) * (p.depth >= 0 ? 1 : -1);
        if (isSimple || isSnapOn) {
          deg = snapTo(deg, 15);
        }
        const deltaDeg = deg - session.lastAppliedDeg;
        if (Math.abs(deltaDeg) > 0.0001) {
          engine?.rotateAxis3D(h.a.key, deltaDeg * DEG * h.sign, targetScope, false);
          session.lastAppliedDeg = deg;
          updateTelemetry();
        }
        if (isSimple) {
          say(`Turned ${Math.round(Math.abs(deg))}°`, true);
        } else {
          say(`Turn around ${h.a.lbl}  ${deg > 0 ? '+' : ''}${Math.round(deg)}°`, true);
        }
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const session = dragSessionRef.current;
    if (session) {
      if (!session.moved && session.hit) {
        haptics.trigger('light');
        engine?.snapToView(session.hit.viewName);
        if (isSimple) {
          const label = session.hit.sign > 0 ? session.hit.a.lbl : session.hit.a.back;
          say(`Looking from the ${label.toLowerCase()} side`, true);
        } else {
          say(`Facing ${session.hit.sign < 0 ? '−' : ''}${session.hit.a.lbl}`, true);
        }
      } else if (!session.moved && activeInteractionRef.current?.type === 'hub') {
        setMode((curr) => (curr === 'move' ? 'rotate' : 'move'));
      }
    }

    if (mode === 'move' || mode === 'rotate') {
      engine?.endTransform();
    }

    activeInteractionRef.current = null;
    dragSessionRef.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (_) {}
    drawGizmo();
    idleHint();
    updateTelemetry();
  };

  const handleGripPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    stopTour();
    setIsDraggingRoot(true);
    rootDragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: pos.x,
      origY: pos.y,
    };
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch (_) {}
  };

  const handleGripPointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRoot) return;
    const dx = e.clientX - rootDragRef.current.startX;
    const dy = e.clientY - rootDragRef.current.startY;
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const newX = Math.max(6, Math.min(screenW - gzSize - 10, rootDragRef.current.origX + dx));
    const newY = Math.max(30, Math.min(screenH - gzSize - 140, rootDragRef.current.origY + dy));
    setPos({ x: newX, y: newY });
  };

  const handleGripPointerUp = (e: React.PointerEvent) => {
    if (isDraggingRoot) {
      setIsDraggingRoot(false);
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch (_) {}
      try {
        localStorage.setItem('paperrocket_opt3_coords_v3', JSON.stringify(pos));
      } catch (_) {}
    }
  };

  const handleToggleSize = () => {
    const next = (sizeIdx + 1) % SIZES.length;
    setSizeIdx(next);
    try {
      localStorage.setItem('paperrocket_gizmo_size_idx', String(next));
    } catch (_) {}
    say(`Gizmo ${['small', 'medium', 'large'][next]}`, true);
  };

  const handleSaveCopy = () => {
    try {
      const filename = isSimple ? 'navigator-gizmo-kids.html' : 'navigator-gizmo.html';
      const fileUrl = isSimple ? '/simple_gizmo.html' : '/new_gizmo.html';
      const a = document.createElement('a');
      a.href = fileUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => a.remove(), 800);
      say('Downloaded copy', true);
    } catch (_) {}
  };

  return (
    <>
      {/* Intro Toast for Pro Mode */}
      {showIntro && !isSimple && (
        <div className={`paper-gz-intro ${introFading ? 'gone' : ''}`}>
          Tap an axis to face it. Drag it to change it.
        </div>
      )}

      {/* Tour Caption for Kids Mode */}
      {caption && isSimple && (
        <div className="paper-gz-caption on">
          {caption.main}
          {caption.sub && <small>{caption.sub}</small>}
        </div>
      )}

      <div
        className={`paper-gz-root ${isSimple ? 'kids' : 'pro'} ${isDark ? 'dark' : ''} ${
          isDraggingRoot ? 'dragging moved' : ''
        }`}
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: `scale(${uiScale})`,
          transformOrigin: 'top left',
        }}
      >
        {/* Telemetry Readout Pill */}
        <div className="paper-gz-readout">
          <span>
            Height <b>{telemetry.height}</b>
          </span>
          <span>
            Tilt <b>{telemetry.tilt}</b>
          </span>
          <span className={isSimple ? 'wide' : ''}>
            {isSimple ? 'Spin' : 'Turn'} <b>{telemetry.turnOrSpin}</b>
          </span>
          {!isSimple && (
            <span className="wide">
              Bank <b>{telemetry.bank}</b>
            </span>
          )}
        </div>

        {/* Scope Row / Header Bar */}
        <div className="paper-gz-scope-row">
          {(['all', 'model', 'plane'] as TransformTargetScope[]).map((sc) => (
            <button
              key={sc}
              className={`paper-gz-scope-btn ${targetScope === sc ? 'active' : ''}`}
              onClick={() => onSelectTargetScope?.(sc)}
            >
              {sc === 'all' ? 'All' : sc === 'model' ? 'Model' : 'Surface'}
            </button>
          ))}
          {isSimple ? (
            <button
              className="paper-gz-scope-btn tour-btn"
              style={{ fontWeight: 600, color: isTourActive ? '#ec8a2c' : undefined }}
              onClick={isTourActive ? stopTour : startTour}
            >
              {isTourActive ? 'Stop' : 'Show me how'}
            </button>
          ) : (
            <>
              <button
                className={`paper-gz-scope-btn ${isKeysOpen ? 'active' : ''}`}
                onClick={() => setIsKeysOpen((prev) => !prev)}
              >
                Keys
              </button>
              <button className="paper-gz-scope-btn" onClick={handleSaveCopy} title="Save HTML sandbox copy">
                Save
              </button>
            </>
          )}
        </div>

        {/* Keys Panel Popover for Pro Mode */}
        {isKeysOpen && !isSimple && (
          <div className="paper-gz-keys-panel">
            <dl>
              <dt>G</dt>
              <dd>Move</dd>
              <dt>R</dt>
              <dd>Rotate</dd>
              <dt>L</dt>
              <dd>Look</dd>
              <dt>F</dt>
              <dd>Face surface</dd>
              <dt>S</dt>
              <dd>Snap on / off</dd>
              <dt>Z</dt>
              <dd>Undo</dd>
              <dt>0</dt>
              <dd>Reset surface</dd>
              <dt>↑↓←→</dt>
              <dd>Nudge</dd>
            </dl>
            <p>Drag scene to orbit. Two fingers or scroll to zoom.</p>
          </div>
        )}

        {/* Grip Handle */}
        <div
          className="paper-gz-grip"
          title={isSimple ? 'Drag to move this control' : 'Drag to reposition'}
          onPointerDown={handleGripPointerDown}
          onPointerMove={handleGripPointerMove}
          onPointerUp={handleGripPointerUp}
          onPointerCancel={handleGripPointerUp}
        >
          <svg width={isSimple ? '12' : '10'} height={isSimple ? '12' : '10'} viewBox="0 0 10 10" aria-hidden="true">
            <circle cx="2" cy="2" r="1.2" fill="currentColor" />
            <circle cx="8" cy="2" r="1.2" fill="currentColor" />
            <circle cx="2" cy="8" r="1.2" fill="currentColor" />
            <circle cx="8" cy="8" r="1.2" fill="currentColor" />
          </svg>
        </div>

        {/* Size Switcher (Pro Mode Only) */}
        {!isSimple && (
          <button className="paper-gz-size" title="Gizmo size" onClick={handleToggleSize}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            >
              <path d="M1.5 4.5v-3h3M10.5 7.5v3h-3M1.7 1.7l3.1 3.1M10.3 10.3L7.2 7.2" />
            </svg>
          </button>
        )}

        {/* Interactive 3D Canvas */}
        <canvas
          ref={canvasRef}
          className="paper-gz-canvas"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        />

        {/* Modes Bar */}
        <div className="paper-gz-modes">
          <button
            className="paper-gz-mode-btn"
            aria-pressed={mode === 'move'}
            onClick={() => {
              stopTour();
              setMode('move');
              say(isSimple ? 'Mode: Move' : 'Mode: Move', true);
            }}
          >
            Move
          </button>
          <button
            className="paper-gz-mode-btn"
            aria-pressed={mode === 'rotate'}
            onClick={() => {
              stopTour();
              setMode('rotate');
              say(isSimple ? 'Mode: Turn' : 'Mode: Rotate', true);
            }}
          >
            {isSimple ? 'Turn' : 'Rotate'}
          </button>
          <button
            className="paper-gz-mode-btn"
            aria-pressed={mode === 'look'}
            onClick={() => {
              stopTour();
              setMode('look');
              say('Mode: Look', true);
            }}
          >
            Look
          </button>
        </div>

        {/* Dynamic Hint */}
        <div className={`paper-gz-hint ${isHintLive ? 'live' : ''}`}>{hintText}</div>

        {/* Presets Action Bar */}
        <div className="paper-gz-bar">
          <button
            className="paper-gz-bar-btn"
            onClick={() => {
              stopTour();
              engine?.snapActiveToGround(targetScope);
              say(isSimple ? 'Flat like a table' : 'Flat', true);
              updateTelemetry();
            }}
          >
            {isSimple ? 'Lay flat' : 'Flat'}
          </button>
          <button
            className="paper-gz-bar-btn"
            onClick={() => {
              stopTour();
              engine?.rotateAxis3D('x', Math.PI / 2, targetScope, false);
              say(isSimple ? 'Up like a wall' : 'Wall', true);
              updateTelemetry();
            }}
          >
            {isSimple ? 'Stand up' : 'Wall'}
          </button>
          <button
            className="paper-gz-bar-btn"
            onClick={() => {
              stopTour();
              engine?.rotateAxis3D('x', Math.PI / 4, targetScope, false);
              say(isSimple ? 'Lean like a ramp' : '45°', true);
              updateTelemetry();
            }}
          >
            {isSimple ? 'Lean' : '45°'}
          </button>
          <button
            className="paper-gz-bar-btn"
            onClick={() => {
              stopTour();
              engine?.alignSurfaceToCamera(targetScope);
              say(isSimple ? 'Looking straight at it' : 'Face', true);
              updateTelemetry();
            }}
          >
            {isSimple ? 'Look at it' : 'Face'}
          </button>
          {!isSimple && (
            <button
              className="paper-gz-bar-btn"
              aria-pressed={isSnapOn}
              onClick={() => {
                toggleSnap();
                say(!isSnapOn ? 'Snapping to 0.25 m and 15°' : 'Snapping off', true);
              }}
            >
              Snap
            </button>
          )}
          <button
            className="paper-gz-bar-btn"
            onClick={() => {
              stopTour();
              engine?.undo?.();
              say('Undone', true);
              updateTelemetry();
            }}
          >
            Undo
          </button>
          <button
            className="paper-gz-bar-btn"
            onClick={() => {
              stopTour();
              engine?.resetTransform(targetScope);
              engine?.resetCamera();
              say(isSimple ? 'Back to the start' : 'Reset', true);
              updateTelemetry();
            }}
          >
            {isSimple ? 'Start over' : 'Reset'}
          </button>
        </div>
      </div>
    </>
  );
};
