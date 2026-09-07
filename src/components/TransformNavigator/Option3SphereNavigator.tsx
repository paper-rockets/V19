import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { StudioEngine } from '../../core/studioEngine';
import { TransformTargetScope } from '../../types';
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
  layers?: any[];
  activeLayerId?: string | null;
  onSelectLayer?: (id: string) => void;
  models?: any[];
  activeModelId?: string | null;
  onSelectModel?: (id: string) => void;
}

interface TargetItem {
  id: string;
  name: string;
  note?: string;
  object: THREE.Object3D;
  home?: { p: THREE.Vector3; q: THREE.Quaternion };
}

interface AxisDef {
  dir: [number, number, number];
  lbl: string;
  back: string;
  tone: string;
}

const AXES: AxisDef[] = [
  { dir: [0, 1, 0], lbl: 'Up', back: 'Down', tone: '#e0822a' },
  { dir: [1, 0, 0], lbl: 'Side', back: 'Side', tone: '#2f80c4' },
  { dir: [0, 0, 1], lbl: 'Front', back: 'Back', tone: '#3f9a62' }
];

const ROT_STEPS = [
  { v: 0, lbl: 'Free' },
  { v: 5, lbl: '5°' },
  { v: 15, lbl: '15°' },
  { v: 45, lbl: '45°' }
];
const MOVE_STEPS = [
  { v: 0, lbl: 'Free' },
  { v: 0.25, lbl: '0.25' },
  { v: 0.5, lbl: '0.5' },
  { v: 1, lbl: '1' }
];

const DEG = Math.PI / 180;
const CROP = 0.055;

export const Option3SphereNavigator: React.FC<Option3SphereNavigatorProps> = ({
  engine,
  theme = 'dark',
  layers = [],
  activeLayerId,
  onSelectLayer,
  models = [],
  activeModelId,
  onSelectModel,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [corner, setCorner] = useState<'br' | 'bl' | 'tr' | 'tl'>('br');
  const [isListOpen, setIsListOpen] = useState(false);
  const [isStepsOpen, setIsStepsOpen] = useState(false);
  const [targetsList, setTargetsList] = useState<TargetItem[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [mode, setModeState] = useState<'move' | 'rotate' | 'look'>('move');
  const [rotStep, setRotStep] = useState<number>(15);
  const [moveStep, setMoveStep] = useState<number>(0.5);
  const [hintText, setHintText] = useState<string>('Drag an arrow to slide Canvas.');
  const [isLiveHint, setIsLiveHint] = useState<boolean>(false);
  const [isTourHint, setIsTourHint] = useState<boolean>(false);
  const [historyLen, setHistoryLen] = useState<number>(0);
  const [isTourRunning, setIsTourRunning] = useState<boolean>(false);

  const nvRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const headRef = useRef<HTMLDivElement | null>(null);
  const puckRef = useRef<HTMLButtonElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const puckCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const readRef = useRef<HTMLSpanElement | null>(null);

  // Mutable math state (exact mirror of reference script)
  const gzRef = useRef({
    size: 168,
    mode: 'move' as 'move' | 'rotate' | 'look',
    rotStep: 15,
    moveStep: 0.5,
    active: null as any,
    hover: null as any,
    ring: null as any,
  });

  const objRef = useRef({ pos: new THREE.Vector3(), quat: new THREE.Quaternion() });
  const dispRef = useRef({ pos: new THREE.Vector3(), quat: new THREE.Quaternion() });
  const targetObjRef = useRef<THREE.Object3D | null>(null);
  const targetsRef = useRef<TargetItem[]>([]);
  const currentRef = useRef<number>(0);

  const camRef = useRef({
    radius: 11,
    theta: 0.78,
    phi: 1.05,
    target: new THREE.Vector3(0, 1.1, 0)
  });

  const selBoxRef = useRef(new THREE.Box3());
  const localBoxRef = useRef(new THREE.Box3());
  const outlineRef = useRef<THREE.Box3Helper | null>(null);
  const historyRef = useRef<Array<{ o: THREE.Object3D; p: THREE.Vector3; q: THREE.Quaternion }>>([]);
  const flightRef = useRef<{ p0: number; t0: number; p1: number; t1: number; start: number; ms: number } | null>(null);
  const tourRef = useRef<any>(null);
  const themeRef = useRef<any>({
    up: '#e0822a',
    side: '#2f80c4',
    front: '#3f9a62',
    ghost: 'rgba(51,46,40,.22)',
    hub: 'rgba(255,255,255,.96)',
    ink: '#332e28',
    onColor: '#ffffff',
    line: 'rgba(51,46,40,.13)'
  });
  const lastStepRef = useRef<any>(null);
  const dragRef = useRef<any>(null);
  const hintTimerRef = useRef<any>(null);
  const reduceMotionRef = useRef<boolean>(false);

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Theme checking
  const isDark = useCallback(() => {
    if (theme === 'dark') return true;
    if (theme === 'light') return false;
    const root = document.documentElement;
    const forced = root.dataset.nvTheme;
    if (forced === 'dark') return true;
    if (forced === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }, [theme]);

  const readTheme = useCallback(() => {
    const nvEl = nvRef.current || document.getElementById('nv');
    if (!nvEl) return;
    const cs = getComputedStyle(nvEl);
    const v = (n: string) => cs.getPropertyValue(n).trim();
    themeRef.current = {
      up: v('--nv-up') || '#e0822a',
      side: v('--nv-side') || '#2f80c4',
      front: v('--nv-front') || '#3f9a62',
      ghost: v('--nv-ghost') || 'rgba(51,46,40,.22)',
      hub: v('--nv-hub') || 'rgba(255,255,255,.96)',
      ink: v('--nv-ink') || '#332e28',
      onColor: v('--nv-on-color') || '#ffffff',
      line: v('--nv-line') || 'rgba(51,46,40,.13)'
    };
    AXES[0].tone = themeRef.current.up;
    AXES[1].tone = themeRef.current.side;
    AXES[2].tone = themeRef.current.front;

    if (outlineRef.current) {
      const dark = isDark();
      (outlineRef.current.material as THREE.LineBasicMaterial).color.set(dark ? 0xf2ede6 : 0x332e28);
    }
  }, [isDark]);

  // Safe area placement
  const cssPx = (n: string) => parseFloat(getComputedStyle(document.documentElement).getPropertyValue(n)) || 0;
  const safeBox = useCallback(() => {
    const g = cssPx('--nv-gap') || 10;
    return {
      left: (cssPx('--nv-left') || 60) + g,
      top: (cssPx('--nv-top') || 60) + g,
      right: window.innerWidth - (cssPx('--nv-right') || 8) - g,
      bottom: window.innerHeight - (cssPx('--nv-bottom') || 30) - g
    };
  }, []);

  const place = useCallback((x: number, y: number) => {
    const el = isOpen ? boxRef.current : puckRef.current;
    if (!el) return;
    const s = safeBox();
    el.style.left = Math.round(Math.max(s.left, Math.min(s.right - el.offsetWidth, x))) + 'px';
    el.style.top = Math.round(Math.max(s.top, Math.min(s.bottom - el.offsetHeight, y))) + 'px';
  }, [isOpen, safeBox]);

  const toCorner = useCallback((c: 'br' | 'bl' | 'tr' | 'tl') => {
    setCorner(c);
    const box = boxRef.current;
    const puck = puckRef.current;
    if (box) {
      box.style.left = '';
      box.style.top = '';
    }
    if (puck) {
      puck.style.left = '';
      puck.style.top = '';
    }
  }, []);

  const nearestCorner = useCallback(() => {
    const el = isOpen ? boxRef.current : puckRef.current;
    if (!el) return 'br';
    const r = el.getBoundingClientRect();
    const isTop = r.top + r.height / 2 < window.innerHeight / 2;
    const isLeft = r.left + r.width / 2 < window.innerWidth / 2;
    return (isTop ? 't' : 'b') + (isLeft ? 'l' : 'r') as 'br' | 'bl' | 'tr' | 'tl';
  }, [isOpen]);

  // Selection outline
  const markSelection = useCallback(() => {
    const targetObj = targetObjRef.current;
    const outline = outlineRef.current;
    if (!targetObj || !outline) {
      if (outline) outline.visible = false;
      return;
    }
    targetObj.updateWorldMatrix(true, false);
    localBoxRef.current.setFromObject(targetObj);
    if (localBoxRef.current.isEmpty()) {
      outline.visible = false;
      return;
    }
    targetObj.worldToLocal(localBoxRef.current.min);
    targetObj.worldToLocal(localBoxRef.current.max);
    selBoxRef.current.copy(localBoxRef.current).applyMatrix4(targetObj.matrixWorld).expandByScalar(0.09);
    outline.visible = true;
    engine?.markDirty();
  }, [engine]);

  // Target synchronization
  const syncFromTarget = useCallback(() => {
    const targetObj = targetObjRef.current;
    if (!targetObj) return;
    targetObj.updateWorldMatrix(true, false);
    targetObj.getWorldPosition(objRef.current.pos);
    targetObj.getWorldQuaternion(objRef.current.quat);
    dispRef.current.pos.copy(objRef.current.pos);
    dispRef.current.quat.copy(objRef.current.quat);
  }, []);

  const commit = useCallback(() => {
    const targetObj = targetObjRef.current;
    if (!targetObj) return;
    const p = targetObj.parent;
    if (p) {
      p.updateWorldMatrix(true, false);
      targetObj.position.copy(p.worldToLocal(dispRef.current.pos.clone()));
      targetObj.quaternion.copy(
        p.getWorldQuaternion(new THREE.Quaternion()).invert().multiply(dispRef.current.quat)
      );
    } else {
      targetObj.position.copy(dispRef.current.pos);
      targetObj.quaternion.copy(dispRef.current.quat);
    }
    targetObj.updateMatrixWorld(true);
    markSelection();
    engine?.markDirty();
  }, [markSelection, engine]);

  const jumpDisplay = useCallback(() => {
    dispRef.current.pos.copy(objRef.current.pos);
    dispRef.current.quat.copy(objRef.current.quat);
    commit();
  }, [commit]);

  const easeDisplay = useCallback((dt: number) => {
    const gz = gzRef.current;
    if (reduceMotionRef.current || !(gz.rotStep || gz.moveStep)) {
      jumpDisplay();
      return false;
    }
    const near = dispRef.current.pos.distanceToSquared(objRef.current.pos) < 1e-7 &&
                 1 - Math.abs(dispRef.current.quat.dot(objRef.current.quat)) < 1e-8;
    if (near) {
      if (!dispRef.current.pos.equals(objRef.current.pos) || !dispRef.current.quat.equals(objRef.current.quat)) {
        jumpDisplay();
        return true;
      }
      return false;
    }
    const k = 1 - Math.exp(-Math.min(dt, 0.05) * 20);
    dispRef.current.pos.lerp(objRef.current.pos, k);
    dispRef.current.quat.slerp(objRef.current.quat, k);
    commit();
    return true;
  }, [jumpDisplay, commit]);

  // Gizmo Canvas Metrics
  const metrics = (S: number) => ({ S, c: S / 2, arm: S * 0.235, hand: S * 0.102, hub: S * 0.112 });

  const fitGizmo = (size: number) => {
    const gzc = canvasRef.current;
    if (!gzc) return;
    const gctx = gzc.getContext('2d');
    if (!gctx) return;
    const dpr = Math.min(window.devicePixelRatio, 2);
    const h = Math.round(size * (1 - CROP * 2));
    gzc.style.width = size + 'px';
    gzc.style.height = h + 'px';
    gzc.width = Math.round(size * dpr);
    gzc.height = Math.round(h * dpr);
    gctx.setTransform(dpr, 0, 0, dpr, 0, -size * CROP * dpr);
  };

  const fit = (canvas: HTMLCanvasElement | null, ctx: CanvasRenderingContext2D | null, size: number) => {
    if (!canvas || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const axisDir = (a: AxisDef) => {
    const v = new THREE.Vector3(a.dir[0], a.dir[1], a.dir[2]);
    if (gzRef.current.mode !== 'look') v.applyQuaternion(dispRef.current.quat);
    return v.normalize();
  };

  // Spherical camera projection from reference prototype
  const project = useCallback((axisWorldDir: THREE.Vector3, m: ReturnType<typeof metrics>) => {
    const cam = camRef.current;
    const sp = Math.sin(cam.phi), cp = Math.cos(cam.phi);
    const st = Math.sin(cam.theta), ct = Math.cos(cam.theta);
    const sx = axisWorldDir.x * ct + axisWorldDir.z * -st;
    const sy = axisWorldDir.x * (-cp * st) + axisWorldDir.y * sp + axisWorldDir.z * (-cp * ct);
    const depth = axisWorldDir.x * (sp * st) + axisWorldDir.y * cp + axisWorldDir.z * (sp * ct);
    return { x: m.c + sx * m.arm, y: m.c - sy * m.arm, depth, len: Math.hypot(sx, sy) };
  }, []);

  const handles = useCallback((m: ReturnType<typeof metrics>) => {
    const out: any[] = [];
    AXES.forEach((a, i) => {
      const d = axisDir(a);
      out.push({ a, i, sign: 1, dir: d, p: project(d, m) });
      const n = d.clone().negate();
      out.push({ a, i, sign: -1, dir: n, p: project(n, m) });
    });
    return out;
  }, [project]);

  const labelFont = (ctx: CanvasRenderingContext2D, text: string, r: number) => {
    let size = r * 0.66;
    const fam = getComputedStyle(document.body).fontFamily || 'sans-serif';
    for (let i = 0; i < 6; i++) {
      ctx.font = '600 ' + size.toFixed(1) + 'px ' + fam;
      if (ctx.measureText(text).width <= r * 1.62) break;
      size *= 0.9;
    }
  };

  const hubIcon = (ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) => {
    const T = themeRef.current;
    ctx.save();
    ctx.strokeStyle = T.ink; ctx.fillStyle = T.ink; ctx.lineWidth = 1.5;
    if (gzRef.current.mode === 'move') {
      for (let k = 0; k < 4; k++) {
        ctx.save(); ctx.translate(cx, cy); ctx.rotate(k * Math.PI / 2);
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(r * 0.86, 0); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(r, 0); ctx.lineTo(r * 0.6, -r * 0.32); ctx.lineTo(r * 0.6, r * 0.32);
        ctx.closePath(); ctx.fill(); ctx.restore();
      }
    } else if (gzRef.current.mode === 'rotate') {
      ctx.beginPath(); ctx.arc(cx, cy, r * 0.82, -2.5, 1.7); ctx.stroke();
      const ax = cx + Math.cos(1.7) * r * 0.82, ay = cy + Math.sin(1.7) * r * 0.82;
      ctx.beginPath();
      ctx.moveTo(ax + 3.6, ay - 0.4); ctx.lineTo(ax - 1.5, ay + 3.6); ctx.lineTo(ax - 2.8, ay - 2.6);
      ctx.closePath(); ctx.fill();
    } else {
      ctx.beginPath(); ctx.arc(cx, cy, r * 0.34, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx, cy, r * 0.9, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.restore();
  };

  const pulse = (ctx: CanvasRenderingContext2D, m: ReturnType<typeof metrics>, now?: number) => {
    const gz = gzRef.current;
    const t = ((now || performance.now()) % 1100) / 1100;
    let x = m.c, y = m.c, r0 = m.hub * 1.4;
    if (gz.ring.type === 'axis') {
      const h = handles(m).filter((k: any) => k.i === gz.ring.i && k.sign === 1)[0];
      if (h) { x = h.p.x; y = h.p.y; r0 = m.hand * 1.4; }
    }
    ctx.save();
    ctx.strokeStyle = themeRef.current.ink;
    ctx.globalAlpha = 0.5 * (1 - t);
    ctx.lineWidth = 2.6;
    ctx.beginPath();
    ctx.arc(x, y, r0 + t * m.hand * 1.6, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  };

  const paint = useCallback((ctx: CanvasRenderingContext2D, m: ReturnType<typeof metrics>, live: boolean, now?: number) => {
    const gz = gzRef.current;
    const T = themeRef.current;
    ctx.clearRect(-2, -2, m.S + 4, m.S + 4);
    const hs = handles(m).sort((p: any, q: any) => p.p.depth - q.p.depth);

    hs.forEach((h: any) => {
      const front = h.p.depth >= -0.04;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(m.c, m.c);
      ctx.lineTo(h.p.x, h.p.y);
      if (h.sign > 0 && front) { ctx.strokeStyle = h.a.tone; ctx.lineWidth = 3; }
      else { ctx.strokeStyle = T.ghost; ctx.lineWidth = 1.2; ctx.setLineDash([3, 4]); }
      ctx.stroke();
      ctx.restore();
    });

    hs.forEach((h: any) => {
      const front = h.p.depth >= -0.04;
      const on = live && gz.active && gz.active.type === 'axis' && gz.active.i === h.i && gz.active.sign === h.sign;
      const hov = live && gz.hover && gz.hover.i === h.i && gz.hover.sign === h.sign;

      if (h.sign < 0 || !front) {
        ctx.beginPath();
        ctx.arc(h.p.x, h.p.y, m.hand * (h.sign < 0 ? 0.58 : 0.72), 0, Math.PI * 2);
        ctx.fillStyle = (on || hov) ? T.ink : T.ghost;
        ctx.fill();
        return;
      }
      if (h.p.len > (gz.mode === 'rotate' ? 0.34 : 0.22)) {
        const ux = (h.p.x - m.c) / (m.arm * h.p.len), uy = (h.p.y - m.c) / (m.arm * h.p.len);
        ctx.save();
        ctx.translate(h.p.x, h.p.y);
        ctx.rotate(Math.atan2(uy, ux));
        ctx.fillStyle = h.a.tone; ctx.strokeStyle = h.a.tone;
        if (gz.mode === 'rotate') {
          ctx.lineWidth = 2.6;
          ctx.beginPath();
          ctx.arc(0, 0, m.hand * 1.4, -0.92, 0.92);
          ctx.stroke();
          const ax = Math.cos(0.92) * m.hand * 1.4, ay = Math.sin(0.92) * m.hand * 1.4;
          ctx.beginPath();
          ctx.moveTo(ax + 3.6, ay + 1.2); ctx.lineTo(ax - 3, ay + 3.8); ctx.lineTo(ax - 1.2, ay - 2.9);
          ctx.closePath(); ctx.fill();
        } else {
          const base = m.hand * 1.02, wide = m.hand * 0.56;
          ctx.beginPath();
          ctx.moveTo(base + m.hand * 0.98, 0);
          ctx.lineTo(base, -wide);
          ctx.lineTo(base, wide);
          ctx.closePath(); ctx.fill();
        }
        ctx.restore();
      }
      ctx.beginPath();
      ctx.arc(h.p.x, h.p.y, m.hand * (on || hov ? 1.08 : 1), 0, Math.PI * 2);
      ctx.fillStyle = h.a.tone;
      ctx.fill();
      if (on || hov) {
        ctx.strokeStyle = T.ink;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(h.p.x, h.p.y, m.hand * 1.36, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.fillStyle = '#ffffff';
      labelFont(ctx, h.a.lbl, m.hand);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(h.a.lbl, h.p.x, h.p.y + 0.5);
    });

    ctx.beginPath();
    ctx.arc(m.c, m.c, m.hub, 0, Math.PI * 2);
    ctx.fillStyle = T.hub;
    ctx.fill();
    ctx.strokeStyle = live && gz.active && gz.active.type === 'hub' ? T.ink : T.ghost;
    ctx.lineWidth = 1.6;
    ctx.stroke();
    hubIcon(ctx, m.c, m.c, m.hub * 0.6);

    if (live && gz.ring) pulse(ctx, m, now);
  }, [handles]);

  const drawGizmo = useCallback((now?: number) => {
    const nvEl = nvRef.current;
    const open = nvEl ? nvEl.getAttribute('data-open') === 'true' : isOpen;
    if (open && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) paint(ctx, metrics(gzRef.current.size), true, now);
    } else if (puckCanvasRef.current) {
      fit(puckCanvasRef.current, puckCanvasRef.current.getContext('2d'), 56);
      const ctx = puckCanvasRef.current.getContext('2d');
      if (ctx) paint(ctx, metrics(56), false, now);
    }
  }, [isOpen, paint]);

  const applyObject = useCallback(() => {
    if (reduceMotionRef.current || !(gzRef.current.rotStep || gzRef.current.moveStep)) jumpDisplay();
    const e = new THREE.Euler().setFromQuaternion(objRef.current.quat, 'YXZ');
    if (readRef.current) {
      readRef.current.innerHTML = 'height <b>' + objRef.current.pos.y.toFixed(1) + '</b> · tilt <b>' +
        Math.round(e.x / DEG) + '°</b> · spin <b>' + Math.round(e.y / DEG) + '°</b>';
    }
    drawGizmo();
  }, [jumpDisplay, drawGizmo]);

  const applyCamera = useCallback(() => {
    const cam = camRef.current;
    if (engine) {
      engine.setCameraView(cam.theta, cam.phi, cam.radius, true);
      engine.cameraTarget.copy(cam.target);
      engine.markDirty();
    }
    drawGizmo();
  }, [engine, drawGizmo]);

  // Hints
  const idleHint = useCallback(() => {
    if (tourRef.current) return;
    setIsLiveHint(false);
    setIsTourHint(false);
    const targets = targetsRef.current;
    const current = currentRef.current;
    const what = targets[current] ? targets[current].name : 'it';
    const m = gzRef.current.mode;
    setHintText(m === 'look' ? 'Drag to spin around. Tap a dot to look from there.'
      : m === 'move' ? 'Drag an arrow to slide ' + what + '.'
      : 'Drag an arrow to turn ' + what + '.');
  }, []);

  const say = useCallback((text: string, live?: boolean) => {
    setHintText(text);
    setIsLiveHint(!!live);
    setIsTourHint(false);
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    if (live) hintTimerRef.current = setTimeout(idleHint, 1400);
  }, [idleHint]);

  // Handle snapping & tick
  const snap = (v: number, step: number) => Math.round(v / step) * step;

  const clampPos = () => {
    objRef.current.pos.x = Math.max(-12, Math.min(12, objRef.current.pos.x));
    objRef.current.pos.y = Math.max(-3, Math.min(9, objRef.current.pos.y));
    objRef.current.pos.z = Math.max(-12, Math.min(12, objRef.current.pos.z));
  };

  const tick = (step: any) => {
    if (lastStepRef.current === step) return;
    lastStepRef.current = step;
    if (navigator.vibrate) { try { navigator.vibrate(4); } catch (_) {} }
  };

  // Camera basis & pixel scale
  const camBasis = () => {
    const camera = engine?.getCamera();
    if (camera) {
      const right = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 0);
      const up = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 1);
      return { right, up };
    }
    const cam = camRef.current;
    const sp = Math.sin(cam.phi), cp = Math.cos(cam.phi);
    const st = Math.sin(cam.theta), ct = Math.cos(cam.theta);
    return { right: new THREE.Vector3(ct, 0, -st), up: new THREE.Vector3(-cp * st, sp, -cp * ct) };
  };

  const unitsPerPixel = () => {
    const camera = engine?.getCamera();
    const H = window.innerHeight || 900;
    if (camera && camera instanceof THREE.PerspectiveCamera) {
      const targetPos = new THREE.Vector3();
      if (targetObjRef.current) targetObjRef.current.getWorldPosition(targetPos);
      else targetPos.copy(camRef.current.target);
      const distanceToTarget = camera.position.distanceTo(targetPos) || camRef.current.radius || 10;
      return (2 * distanceToTarget * Math.tan((camera.fov * DEG) / 2)) / H;
    }
    return (2 * camRef.current.radius * Math.tan((46 * DEG) / 2)) / H;
  };

  // History
  const pushHistory = () => {
    const targetObj = targetObjRef.current;
    if (!targetObj) return;
    historyRef.current.push({ o: targetObj, p: objRef.current.pos.clone(), q: objRef.current.quat.clone() });
    if (historyRef.current.length > 40) historyRef.current.shift();
    setHistoryLen(historyRef.current.length);
  };

  const undo = () => {
    const s = historyRef.current.pop();
    if (!s) return;
    if (s.o !== targetObjRef.current) {
      const idx = targetsRef.current.findIndex(t => t.object === s.o);
      if (idx >= 0) selectTarget(idx, true);
    }
    objRef.current.pos.copy(s.p);
    objRef.current.quat.copy(s.q);
    applyObject();
    setHistoryLen(historyRef.current.length);
    say('Undone', true);
  };

  // Flight animation
  const flyTo = (phi: number, theta: number, ms?: number) => {
    const cam = camRef.current;
    let t = theta;
    while (t - cam.theta > Math.PI) t -= Math.PI * 2;
    while (t - cam.theta < -Math.PI) t += Math.PI * 2;
    const p1 = Math.max(0.06, Math.min(Math.PI - 0.06, phi));
    if (reduceMotionRef.current) {
      cam.phi = p1; cam.theta = t;
      applyCamera();
      return;
    }
    flightRef.current = { p0: cam.phi, t0: cam.theta, p1, t1: t, start: performance.now(), ms: ms || 500 };
  };

  const stepFlight = (now: number) => {
    const flight = flightRef.current;
    if (!flight) return;
    const k = Math.min(1, (now - flight.start) / flight.ms);
    const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
    camRef.current.phi = flight.p0 + (flight.p1 - flight.p0) * e;
    camRef.current.theta = flight.t0 + (flight.t1 - flight.t0) * e;
    applyCamera();
    if (k >= 1) flightRef.current = null;
  };

  const faceDirection = (dir: THREE.Vector3, label?: string) => {
    const d = dir.clone().normalize();
    flyTo(Math.acos(Math.max(-1, Math.min(1, d.y))), Math.atan2(d.x, d.z));
    if (label) say('Looking from the ' + label.toLowerCase() + ' side', true);
    if (navigator.vibrate) { try { navigator.vibrate(8); } catch (_) {} }
  };

  // Pointer Picking
  const gzPoint = (e: React.PointerEvent<HTMLCanvasElement> | PointerEvent) => {
    const gzc = canvasRef.current;
    if (!gzc) return { x: 0, y: 0 };
    const r = gzc.getBoundingClientRect();
    const k = gzRef.current.size / r.width;
    return { x: (e.clientX - r.left) * k, y: (e.clientY - r.top) * k + gzRef.current.size * CROP };
  };

  const pickHandle = (pt: { x: number; y: number }) => {
    const m = metrics(gzRef.current.size);
    const near: any[] = [];
    handles(m).forEach((h: any) => {
      const d = Math.hypot(pt.x - h.p.x, pt.y - h.p.y);
      if (d < m.hand * (h.sign > 0 ? 1.8 : 1.45)) near.push({ h, d, front: h.p.depth >= -0.04 });
    });
    if (!near.length) return null;
    near.sort((a: any, b: any) => a.d - b.d);
    const tie = near.find((c: any) => c.front && c.d <= near[0].d + m.hand * 0.4);
    return (tie || near[0]).h;
  };

  // Modes
  const setMode = (m: 'move' | 'rotate' | 'look') => {
    gzRef.current.mode = m;
    setModeState(m);
    idleHint();
    drawGizmo();
  };

  // Orientations
  const setOrient = (pitch: number, roll: number, label: string) => {
    stopTour(); pushHistory();
    const e = new THREE.Euler().setFromQuaternion(objRef.current.quat, 'YXZ');
    objRef.current.quat.setFromEuler(new THREE.Euler(pitch * DEG, e.y, roll * DEG, 'YXZ'));
    applyObject(); say(label, true);
  };

  const lookAtIt = () => {
    stopTour();
    camRef.current.target.copy(objRef.current.pos);
    faceDirection(new THREE.Vector3(0, 1, 0).applyQuaternion(objRef.current.quat), '');
    say('Looking straight at it', true);
  };

  const resetTarget = () => {
    stopTour(); pushHistory();
    const targets = targetsRef.current;
    const current = currentRef.current;
    const targetObj = targetObjRef.current;
    const home = targets[current] && targets[current].home;
    if (home && targetObj) {
      targetObj.position.copy(home.p);
      targetObj.quaternion.copy(home.q);
    }
    syncFromTarget();
    camRef.current.target.copy(objRef.current.pos);
    applyObject(); applyCamera();
    say((targets[current] ? targets[current].name : 'It') + ' back to the start', true);
  };

  // Tour
  const TOUR = [
    { t: 0, dur: 4200, ring: { type: 'axis', i: 0 }, cap: 'Drag the orange arrow to lift it up.' },
    { t: 4200, dur: 4200, ring: { type: 'axis', i: 1 }, cap: 'Tap a dot to look from that side. Tapping never moves it.' },
    { t: 8400, dur: 4600, ring: { type: 'hub' }, cap: 'Tap the middle circle to switch to Turn.' },
    { t: 13000, dur: 2200, ring: null, cap: 'Your turn. Undo fixes anything.' }
  ];

  const stopTour = () => {
    const tour = tourRef.current;
    if (!tour) return;
    const s = tour.save;
    objRef.current.pos.copy(s.pos);
    objRef.current.quat.copy(s.quat);
    camRef.current.phi = s.phi;
    camRef.current.theta = s.theta;
    flightRef.current = null;
    gzRef.current.ring = null;
    tourRef.current = null;
    setIsTourRunning(false);
    setMode(s.mode);
    applyObject(); applyCamera(); idleHint();
  };

  const startTour = () => {
    stopTour();
    tourRef.current = {
      start: performance.now(),
      step: -1,
      save: {
        pos: objRef.current.pos.clone(),
        quat: objRef.current.quat.clone(),
        phi: camRef.current.phi,
        theta: camRef.current.theta,
        mode: gzRef.current.mode
      }
    };
    setMode('move');
    setIsTourRunning(true);
  };

  const stepTour = (now: number) => {
    const tour = tourRef.current;
    if (!tour) return;
    const el = Math.max(0, now - tour.start);
    let idx = 0;
    for (let i = 0; i < TOUR.length; i++) if (el >= TOUR[i].t) idx = i;
    const last = TOUR[TOUR.length - 1];
    if (el > last.t + last.dur) { stopTour(); return; }

    if (idx !== tour.step) {
      tour.step = idx;
      const s = TOUR[idx];
      gzRef.current.ring = s.ring;
      setHintText(s.cap);
      setIsTourHint(true);
      setIsLiveHint(false);
      if (idx === 1) {
        const h = handles(metrics(gzRef.current.size)).filter((k: any) => k.i === 1 && k.sign === 1)[0];
        if (h) faceDirection(h.dir, '');
      }
      if (idx === 2) setMode('rotate');
      if (idx === 3) { setMode('move'); flyTo(tour.save.phi, tour.save.theta, 600); }
    }
    const s = TOUR[idx];
    const wave = Math.sin(Math.min(1, (el - s.t) / s.dur * 1.25) * Math.PI);
    if (idx === 0) {
      objRef.current.pos.copy(tour.save.pos);
      objRef.current.pos.y = tour.save.pos.y + wave * 1.6;
      applyObject();
    } else if (idx === 2) {
      objRef.current.quat.copy(tour.save.quat).premultiply(
        new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), wave * 50 * DEG)
      );
      applyObject();
    }
    drawGizmo(now);
  };

  // Select target
  const selectTarget = useCallback((i: number, quiet?: boolean) => {
    const targets = targetsRef.current;
    if (i < 0 || !targets[i]) return;
    currentRef.current = i;
    setCurrentIdx(i);
    targetObjRef.current = targets[i].object;
    syncFromTarget();
    jumpDisplay();
    markSelection();
    applyObject();
    if (!quiet) say('Now moving ' + targets[i].name, true);
    if (targets[i].id) {
      onSelectLayer?.(targets[i].id);
      onSelectModel?.(targets[i].id);
    }
  }, [syncFromTarget, jumpDisplay, markSelection, applyObject, say, onSelectLayer, onSelectModel]);

  const setTargets = useCallback((list: TargetItem[]) => {
    const formatted = list.map(t => {
      t.object.updateWorldMatrix(true, false);
      return Object.assign({}, t, {
        home: { p: t.object.position.clone(), q: t.object.quaternion.clone() }
      });
    });
    targetsRef.current = formatted;
    setTargetsList(formatted);
    selectTarget(Math.min(currentRef.current, formatted.length - 1), true);
  }, [selectTarget]);

  // Populate targets from engine
  useEffect(() => {
    if (!engine) return;
    const list: TargetItem[] = [];
    const drawingPlane = engine.getDrawingPlane();
    const sceneRoot = engine.getModelRoot();
    const loadedModel = sceneRoot?.children?.find(
      c => c !== drawingPlane && (c as any).name !== 'DrawingPlaneCanvas' && !(c as any).isLine && !(c as any).isPoints
    );

    if (sceneRoot) list.push({ id: 'scene', name: 'Everything', note: 'model + canvas', object: sceneRoot });
    if (loadedModel) list.push({ id: 'model', name: 'Model', note: 'the 3D shape', object: loadedModel });
    if (drawingPlane) list.push({ id: 'canvas', name: 'Canvas', note: 'what you draw on', object: drawingPlane });

    if (layers && layers.length > 0) {
      layers.forEach(l => {
        const layerObj = (drawingPlane?.getObjectByName?.(l.id) || (drawingPlane?.children?.find((c: any) => c.userData?.layerId === l.id))) as THREE.Object3D;
        if (layerObj) {
          list.push({ id: l.id, name: l.name || 'Layer', note: l.type || 'layer', object: layerObj });
        }
      });
    }

    if (list.length === 0) {
      const dummy = new THREE.Group();
      list.push({ id: 'canvas', name: 'Canvas', note: 'what you draw on', object: dummy });
    }

    setTargets(list);
    const canvasIdx = list.findIndex(t => t.id === 'canvas');
    selectTarget(canvasIdx >= 0 ? canvasIdx : 0, true);
  }, [engine, layers, setTargets, selectTarget]);

  // Keep target selection in sync when app activeLayerId changes
  useEffect(() => {
    if (activeLayerId) {
      const idx = targetsRef.current.findIndex(t => t.id === activeLayerId);
      if (idx >= 0 && idx !== currentRef.current) {
        selectTarget(idx, true);
      }
    }
  }, [activeLayerId, selectTarget]);

  // Size to box and fit
  const sizeToBox = useCallback(() => {
    const box = boxRef.current;
    if (!box) return;
    const s = Math.max(140, Math.min(212, Math.round(box.clientWidth - 14)));
    if (s !== gzRef.current.size) {
      gzRef.current.size = s;
      fitGizmo(s);
    }
  }, []);

  const setOpen = useCallback((open: boolean) => {
    setIsOpen(open);
    requestAnimationFrame(() => {
      if (open) sizeToBox();
      else fit(puckCanvasRef.current, puckCanvasRef.current?.getContext('2d') || null, 56);
      toCorner(corner);
      drawGizmo();
    });
  }, [sizeToBox, toCorner, corner, drawGizmo]);

  // Pointer dragging on head or puck
  useEffect(() => {
    const head = headRef.current;
    const box = boxRef.current;
    const puck = puckRef.current;
    if (!head || !box || !puck) return;

    const listeners: Array<() => void> = [];
    [[head, box], [puck, puck]].forEach(([handle, el]: [HTMLElement, HTMLElement]) => {
      let d: any = null;
      const onDown = (e: PointerEvent) => {
        if ((e.target as HTMLElement).closest('.nv-icon')) return;
        e.preventDefault();
        const r = el.getBoundingClientRect();
        d = { x: e.clientX, y: e.clientY, left: r.left, top: r.top, moved: false };
        handle.setPointerCapture(e.pointerId);
      };
      const onMove = (e: PointerEvent) => {
        if (!d) return;
        if (!d.moved && Math.hypot(e.clientX - d.x, e.clientY - d.y) < 4) return;
        d.moved = true;
        place(d.left + e.clientX - d.x, d.top + e.clientY - d.y);
      };
      const onUp = (e: PointerEvent) => {
        if (!d) return;
        const moved = d.moved;
        d = null;
        try { handle.releasePointerCapture(e.pointerId); } catch (_) {}
        if (moved) toCorner(nearestCorner());
        else if (handle === puck) setOpen(true);
      };
      handle.addEventListener('pointerdown', onDown);
      handle.addEventListener('pointermove', onMove);
      handle.addEventListener('pointerup', onUp);
      listeners.push(() => {
        handle.removeEventListener('pointerdown', onDown);
        handle.removeEventListener('pointermove', onMove);
        handle.removeEventListener('pointerup', onUp);
      });
    });

    return () => listeners.forEach(un => un());
  }, [place, toCorner, nearestCorner, setOpen]);

  // Pointer events on gizmo canvas
  useEffect(() => {
    const gzc = canvasRef.current;
    if (!gzc) return;

    const onDown = (e: PointerEvent) => {
      e.preventDefault(); e.stopPropagation();
      stopTour();
      const pt = gzPoint(e);
      const m = metrics(gzRef.current.size);
      const r = Math.hypot(pt.x - m.c, pt.y - m.c);
      const hit = pickHandle(pt);
      if (hit) gzRef.current.active = { type: 'axis', i: hit.i, sign: hit.sign };
      else if (r <= m.hub * 1.3 && gzRef.current.mode !== 'look') gzRef.current.active = { type: 'hub' };
      else gzRef.current.active = { type: 'orbit' };

      dragRef.current = {
        startX: e.clientX, startY: e.clientY, moved: false, hit,
        pos: objRef.current.pos.clone(), quat: objRef.current.quat.clone(),
        theta: camRef.current.theta, phi: camRef.current.phi,
        startAngle: Math.atan2(pt.y - m.c, pt.x - m.c), committed: false
      };
      lastStepRef.current = null;
      nvRef.current?.classList.add('nv-grabbing', 'nv-focus');
      gzc.setPointerCapture(e.pointerId);
      drawGizmo();
    };

    const onMove = (e: PointerEvent) => {
      const m = metrics(gzRef.current.size);
      const drag = dragRef.current;
      if (!drag) {
        const hit = pickHandle(gzPoint(e));
        const changed = (hit ? hit.i + ':' + hit.sign : '') !== (gzRef.current.hover ? gzRef.current.hover.i + ':' + gzRef.current.hover.sign : '');
        gzRef.current.hover = hit ? { i: hit.i, sign: hit.sign } : null;
        gzc.style.cursor = hit ? 'pointer' : 'grab';
        if (changed) drawGizmo();
        return;
      }
      const dx = e.clientX - drag.startX, dy = e.clientY - drag.startY;
      if (!drag.moved && Math.hypot(dx, dy) < 4) return;
      drag.moved = true;
      const act = gzRef.current.active;

      if (act.type === 'orbit' || (act.type === 'axis' && gzRef.current.mode === 'look')) {
        camRef.current.theta = drag.theta - dx * 0.0062;
        camRef.current.phi = Math.max(0.06, Math.min(Math.PI - 0.06, drag.phi - dy * 0.0062));
        applyCamera();
        say('Walking around it', true);
        return;
      }
      if (!drag.committed) { pushHistory(); drag.committed = true; }

      if (act.type === 'hub') {
        if (gzRef.current.mode === 'move') {
          const b = camBasis(), k = unitsPerPixel();
          objRef.current.pos.copy(drag.pos).addScaledVector(b.right, dx * k).addScaledVector(b.up, -dy * k);
          if (gzRef.current.moveStep) {
            objRef.current.pos.x = snap(objRef.current.pos.x, gzRef.current.moveStep);
            objRef.current.pos.y = snap(objRef.current.pos.y, gzRef.current.moveStep);
            objRef.current.pos.z = snap(objRef.current.pos.z, gzRef.current.moveStep);
          }
          clampPos(); applyObject();
          tick(objRef.current.pos.x + ':' + objRef.current.pos.y + ':' + objRef.current.pos.z);
          say('Sliding it around', true);
        } else {
          const b = camBasis();
          let ay = -dx * 0.5, ax = -dy * 0.5;
          if (gzRef.current.rotStep) { ay = snap(ay, gzRef.current.rotStep); ax = snap(ax, gzRef.current.rotStep); }
          const q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), ay * DEG)
            .multiply(new THREE.Quaternion().setFromAxisAngle(b.right, ax * DEG));
          objRef.current.quat.copy(drag.quat).premultiply(q);
          applyObject();
          tick(ay + ':' + ax);
          say('Tumbling it', true);
        }
        return;
      }

      const h = drag.hit, a = AXES[h.i], worldDir = h.dir, p = project(worldDir, m);
      if (gzRef.current.mode === 'move') {
        const len = Math.max(0.001, p.len);
        const nx = (p.x - m.c) / (m.arm * len), ny = (p.y - m.c) / (m.arm * len);
        let amount = (dx * nx + dy * ny) * unitsPerPixel() / Math.max(0.30, len);
        if (gzRef.current.moveStep) amount = snap(amount, gzRef.current.moveStep);
        objRef.current.pos.copy(drag.pos).addScaledVector(worldDir, amount);
        clampPos(); applyObject();
        tick(amount);
        say((h.sign > 0 ? a.lbl : a.back) + '  ' + Math.abs(amount).toFixed(gzRef.current.moveStep && gzRef.current.moveStep >= 0.5 ? 1 : 2), true);
      } else {
        const pt = gzPoint(e);
        let d = Math.atan2(pt.y - m.c, pt.x - m.c) - drag.startAngle;
        while (d > Math.PI) d -= Math.PI * 2;
        while (d < -Math.PI) d += Math.PI * 2;
        let deg = -(d / DEG) * (p.depth >= 0 ? 1 : -1);
        if (gzRef.current.rotStep) deg = snap(deg, gzRef.current.rotStep);
        objRef.current.quat.copy(drag.quat).premultiply(new THREE.Quaternion().setFromAxisAngle(worldDir, deg * DEG));
        applyObject();
        tick(deg);
        say('Turned ' + Math.round(Math.abs(deg)) + '°', true);
      }
    };

    const onUp = (e: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag) return;
      if (!drag.moved && drag.hit) faceDirection(drag.hit.dir, drag.hit.sign > 0 ? drag.hit.a.lbl : drag.hit.a.back);
      else if (!drag.moved && gzRef.current.active && gzRef.current.active.type === 'hub') setMode(gzRef.current.mode === 'move' ? 'rotate' : 'move');
      gzRef.current.active = null; dragRef.current = null;
      nvRef.current?.classList.remove('nv-grabbing', 'nv-focus');
      try { gzc.releasePointerCapture(e.pointerId); } catch (_) {}
      drawGizmo(); idleHint();
      setHistoryLen(historyRef.current.length);
    };

    gzc.addEventListener('pointerdown', onDown);
    gzc.addEventListener('pointermove', onMove);
    gzc.addEventListener('pointerup', onUp);
    gzc.addEventListener('pointercancel', onUp);

    return () => {
      gzc.removeEventListener('pointerdown', onDown);
      gzc.removeEventListener('pointermove', onMove);
      gzc.removeEventListener('pointerup', onUp);
      gzc.removeEventListener('pointercancel', onUp);
    };
  }, [drawGizmo, applyCamera, applyObject, idleHint, say]);

  // Dimming while drawing on canvas
  useEffect(() => {
    const onDocDown = (e: PointerEvent) => {
      if (nvRef.current && !nvRef.current.contains(e.target as Node)) {
        nvRef.current.classList.add('nv-dim');
      }
    };
    const onDocUp = () => {
      nvRef.current?.classList.remove('nv-dim');
    };
    document.addEventListener('pointerdown', onDocDown, true);
    document.addEventListener('pointerup', onDocUp, true);
    document.addEventListener('pointercancel', onDocUp, true);

    return () => {
      document.removeEventListener('pointerdown', onDocDown, true);
      document.removeEventListener('pointerup', onDocUp, true);
      document.removeEventListener('pointercancel', onDocUp, true);
    };
  }, []);

  // Set up 3D Selection outline in scene
  useEffect(() => {
    if (!engine) return;
    const scene = engine.getScene();
    const dark = isDark();
    const outline = new THREE.Box3Helper(selBoxRef.current, dark ? 0xf2ede6 : 0x332e28);
    const mat = outline.material as THREE.LineBasicMaterial;
    if (mat) {
      mat.transparent = true;
      mat.opacity = 0.55;
    }
    outline.visible = false;
    scene.add(outline);
    outlineRef.current = outline;

    return () => {
      scene.remove(outline);
      outline.dispose?.();
    };
  }, [engine, isDark]);

  // Main Animation Loop
  useEffect(() => {
    let animId: number;
    let lastFrame = 0;

    const loop = (now: number) => {
      animId = requestAnimationFrame(loop);
      const dt = lastFrame ? Math.min(0.06, (now - lastFrame) / 1000) : 0.016;
      lastFrame = now;

      stepFlight(now);
      stepTour(now);

      // Camera sync from main viewport
      if (!dragRef.current && !flightRef.current && !tourRef.current && engine) {
        const engCam = engine.cameraSpherical;
        if (
          Math.abs(camRef.current.theta - engCam.theta) > 1e-4 ||
          Math.abs(camRef.current.phi - engCam.phi) > 1e-4
        ) {
          camRef.current.theta = engCam.theta;
          camRef.current.phi = engCam.phi;
          camRef.current.radius = engCam.radius;
          camRef.current.target.copy(engine.cameraTarget);
          drawGizmo(now);
        }
      }

      if (easeDisplay(dt)) drawGizmo(now);
    };

    fit(puckCanvasRef.current, puckCanvasRef.current?.getContext('2d') || null, 56);
    sizeToBox();
    document.documentElement.dataset.nvTheme = theme;
    readTheme();
    applyObject();
    if (engine?.cameraSpherical) {
      camRef.current.theta = engine.cameraSpherical.theta;
      camRef.current.phi = engine.cameraSpherical.phi;
      camRef.current.radius = engine.cameraSpherical.radius;
      if (engine.cameraTarget) {
        camRef.current.target.copy(engine.cameraTarget);
      }
    }
    idleHint();
    toCorner('br');
    drawGizmo();

    animId = requestAnimationFrame(loop);

    const onResize = () => {
      sizeToBox();
      toCorner(corner);
      drawGizmo();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, [sizeToBox, readTheme, applyObject, applyCamera, idleHint, toCorner, corner, drawGizmo, easeDisplay, engine]);

  // Theme change
  useEffect(() => {
    document.documentElement.dataset.nvTheme = theme;
    readTheme();
    drawGizmo();
  }, [theme, readTheme, drawGizmo]);

  const currentTarget = targetsList[currentIdx];
  const rStepObj = ROT_STEPS.find(o => o.v === rotStep);
  const mStepObj = MOVE_STEPS.find(o => o.v === moveStep);
  const stepLabel = mode === 'rotate' ? (rStepObj ? rStepObj.lbl : 'Free') : (mStepObj ? mStepObj.lbl : 'Free');

  return (
    <div id="nv" ref={nvRef} data-open={isOpen ? 'true' : 'false'} data-corner={corner}>
      <div className="nv-box" id="nv-box" ref={boxRef}>
        <div className="nv-head" id="nv-head" ref={headRef}>
          <span className="nv-grip"><i></i><i></i><i></i><i></i></span>
          <span className="nv-read" id="nv-read" ref={readRef}></span>
          <button
            className="nv-icon"
            id="nv-tour"
            title={isTourRunning ? 'Stop' : 'Show me how'}
            onClick={() => (isTourRunning ? stopTour() : startTour())}
          >
            {isTourRunning ? '✕' : '?'}
          </button>
          <button className="nv-icon" id="nv-fold" title="Tuck away" onClick={() => setOpen(false)}>–</button>
        </div>
        <div className="nv-row">
          <button
            className={`nv-target ${mode === 'look' ? 'nv-mute' : ''}`}
            id="nv-target"
            aria-expanded={isListOpen}
            onClick={() => {
              stopTour();
              setIsStepsOpen(false);
              setIsListOpen(!isListOpen);
            }}
          >
            <span>Moving</span><b id="nv-target-name">{currentTarget?.name || 'Canvas'}</b><span>▾</span>
          </button>
          <button
            className={`nv-step ${mode === 'look' ? 'nv-mute' : ''}`}
            id="nv-step"
            aria-expanded={isStepsOpen}
            title={`Step size · turning ${rStepObj ? rStepObj.lbl : 'Free'}, sliding ${mStepObj ? mStepObj.lbl : 'Free'}`}
            onClick={() => {
              stopTour();
              setIsListOpen(false);
              setIsStepsOpen(!isStepsOpen);
            }}
          >
            {stepLabel}
          </button>
        </div>

        <div className={`nv-list ${isListOpen ? 'nv-on' : ''}`} id="nv-list" role="listbox">
          {targetsList.map((t, idx) => (
            <button
              key={t.id + '_' + idx}
              className="nv-opt"
              role="option"
              aria-selected={currentIdx === idx}
              onClick={() => {
                selectTarget(idx);
                setIsListOpen(false);
              }}
            >
              <span className="nv-swatch"></span>
              <span>{t.name}{t.note ? <em> {t.note}</em> : null}</span>
            </button>
          ))}
        </div>

        <div className={`nv-steps ${isStepsOpen ? 'nv-on' : ''}`} id="nv-steps">
          <h4>Turning steps</h4>
          <div id="nv-rot-steps">
            {ROT_STEPS.map(o => (
              <button
                key={o.v}
                className="nv-chip"
                aria-pressed={rotStep === o.v}
                onClick={() => {
                  gzRef.current.rotStep = o.v;
                  setRotStep(o.v);
                  say(o.lbl === 'Free' ? 'Free movement' : 'Steps of ' + o.lbl, true);
                }}
              >
                {o.lbl}
              </button>
            ))}
          </div>
          <h4>Sliding steps</h4>
          <div id="nv-move-steps">
            {MOVE_STEPS.map(o => (
              <button
                key={o.v}
                className="nv-chip"
                aria-pressed={moveStep === o.v}
                onClick={() => {
                  gzRef.current.moveStep = o.v;
                  setMoveStep(o.v);
                  say(o.lbl === 'Free' ? 'Free movement' : 'Steps of ' + o.lbl, true);
                }}
              >
                {o.lbl}
              </button>
            ))}
          </div>
        </div>

        <canvas className="nv-canvas" id="nv-canvas" ref={canvasRef}></canvas>

        <div className="nv-modes">
          <button
            className="nv-mode"
            id="nv-look"
            aria-pressed={mode === 'look'}
            onClick={() => { stopTour(); setMode('look'); }}
          >
            Look
          </button>
          <button
            className="nv-mode"
            id="nv-move"
            aria-pressed={mode === 'move'}
            onClick={() => { stopTour(); setMode('move'); }}
          >
            Move
          </button>
          <button
            className="nv-mode"
            id="nv-turn"
            aria-pressed={mode === 'rotate'}
            onClick={() => { stopTour(); setMode('rotate'); }}
          >
            Turn
          </button>
        </div>

        <div className={`nv-hint ${isLiveHint ? 'nv-live' : ''} ${isTourHint ? 'nv-tour' : ''}`} id="nv-hint">
          {hintText}
        </div>

        <div className="nv-acts">
          <button className="nv-act" id="nv-flat" onClick={() => setOrient(0, 0, 'Flat like a table')}>Lay flat</button>
          <button className="nv-act" id="nv-wall" onClick={() => setOrient(90, 0, 'Up like a wall')}>Stand up</button>
          <button className="nv-act" id="nv-lean" onClick={() => setOrient(45, 0, 'Leaning like a ramp')}>Lean</button>
          <button className="nv-act" id="nv-face" onClick={lookAtIt}>Look at it</button>
          <button className="nv-act" id="nv-undo" disabled={historyLen === 0} onClick={() => { stopTour(); undo(); }}>Undo</button>
          <button className="nv-act" id="nv-reset" onClick={resetTarget}>Start over</button>
        </div>
      </div>

      <button
        className="nv-puck"
        id="nv-puck"
        ref={puckRef}
        title="Open"
        onClick={() => setOpen(true)}
      >
        <canvas id="nv-puck-canvas" ref={puckCanvasRef}></canvas>
      </button>
    </div>
  );
};
