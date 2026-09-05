import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Camera, Layers } from 'lucide-react';
import { StudioEngine } from '../../core/studioEngine';
import { TransformTargetScope } from '../../types';
import { getCameraPose, subscribeCameraPose } from '../../core/telemetryStore';
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
}

interface AxisDef {
  dir: [number, number, number];
  col: string;
  lbl: string;
  viewName: 'top' | 'bottom' | 'front' | 'back' | 'left' | 'right';
}

const AXES: AxisDef[] = [
  { dir: [0, 1, 0], col: '#f4f4f5', lbl: 'Y', viewName: 'top' },
  { dir: [0, -1, 0], col: '#777a80', lbl: '-Y', viewName: 'bottom' },
  { dir: [-1, 0, 0], col: '#b8bac0', lbl: 'X', viewName: 'left' },
  { dir: [1, 0, 0], col: '#b8bac0', lbl: '-X', viewName: 'right' },
  { dir: [0, 0, 1], col: '#d4d5d8', lbl: 'Z', viewName: 'front' },
  { dir: [0, 0, -1], col: '#8b8e94', lbl: '-Z', viewName: 'back' },
];

const DIAL_SIZE = 130;
const WIDGET_WIDTH = 136;
const WIDGET_HEIGHT = 196;

export const Option3SphereNavigator: React.FC<Option3SphereNavigatorProps> = ({
  engine,
  theme = 'dark',
  targetScope: propTargetScope = 'all',
  onSelectTargetScope,
  isLocked = false,
  uiScale = 1.0,
}) => {
  const isLight = theme === 'light';
  const [c3Mode, setC3Mode] = useState<'surface' | 'camera'>('surface');
  const [targetScope, setTargetScope] = useState<TransformTargetScope>(propTargetScope);

  useEffect(() => {
    if (propTargetScope) {
      setTargetScope(propTargetScope);
    }
  }, [propTargetScope]);

  const handleSelectScope = useCallback(
    (scope: TransformTargetScope) => {
      setTargetScope(scope);
      if (onSelectTargetScope) {
        onSelectTargetScope(scope);
      }
      haptics.trigger('light');
    },
    [onSelectTargetScope]
  );

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Position state (persisted to localStorage, clamped to screen bounds)
  const [position, setPosition] = useState<{ x: number; y: number }>(() => {
    const screenW = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const screenH = typeof window !== 'undefined' ? window.innerHeight : 800;
    const defaultX = 16;
    const defaultY = Math.max(10, screenH - WIDGET_HEIGHT - 24);

    try {
      const saved = localStorage.getItem('paperrocket_opt3_coords_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.x === 'number' && typeof parsed.y === 'number') {
          const maxX = Math.max(10, screenW - WIDGET_WIDTH);
          const maxY = Math.max(10, screenH - WIDGET_HEIGHT - 24);
          return {
            x: Math.max(10, Math.min(maxX, parsed.x)),
            y: Math.max(10, Math.min(maxY, parsed.y)),
          };
        }
      }
    } catch (_) {}
    return { x: defaultX, y: defaultY };
  });

  const isDraggingCardRef = useRef<boolean>(false);
  const [isRepositioning, setIsRepositioning] = useState<boolean>(false);
  const isRepositioningRef = useRef<boolean>(false);
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const initialPointerPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const pendingHitAxisRef = useRef<AxisDef | null>(null);
  const suppressClickRef = useRef<boolean>(false);

  const dragStartRef = useRef<{ mouseX: number; mouseY: number; startX: number; startY: number }>({
    mouseX: 0,
    mouseY: 0,
    startX: 0,
    startY: 0,
  });

  const cancelLongPressTimer = useCallback(() => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }, []);

  const startLongPressTimer = useCallback(
    (clientX: number, clientY: number, onLongPress?: () => void) => {
      cancelLongPressTimer();
      initialPointerPosRef.current = { x: clientX, y: clientY };
      suppressClickRef.current = false;

      longPressTimerRef.current = setTimeout(() => {
        longPressTimerRef.current = null;
        isRepositioningRef.current = true;
        setIsRepositioning(true);
        suppressClickRef.current = true;
        haptics.trigger('medium');

        dragStartRef.current = {
          mouseX: clientX,
          mouseY: clientY,
          startX: position.x,
          startY: position.y,
        };

        if (onLongPress) onLongPress();
      }, 380);
    },
    [cancelLongPressTimer, position.x, position.y]
  );

  useEffect(() => {
    return () => cancelLongPressTimer();
  }, [cancelLongPressTimer]);

  const handleCardDragStart = useCallback(
    (e: React.PointerEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('canvas')) return;

      const isButton = !!target.closest('button');

      dragStartRef.current = {
        mouseX: e.clientX,
        mouseY: e.clientY,
        startX: position.x,
        startY: position.y,
      };

      if (!isButton) {
        // Direct drag on the pill drag bar
        isDraggingCardRef.current = true;
        try {
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        } catch (_) {}
      } else {
        // Long press on pill buttons
        startLongPressTimer(e.clientX, e.clientY);
      }

      const handlePointerMove = (moveEv: PointerEvent) => {
        if (longPressTimerRef.current) {
          const movedDist = Math.hypot(
            moveEv.clientX - initialPointerPosRef.current.x,
            moveEv.clientY - initialPointerPosRef.current.y
          );
          if (movedDist > 7) {
            cancelLongPressTimer();
          }
        }

        if (!isDraggingCardRef.current && !isRepositioningRef.current) return;

        const dx = moveEv.clientX - dragStartRef.current.mouseX;
        const dy = moveEv.clientY - dragStartRef.current.mouseY;
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const maxX = Math.max(10, screenW - WIDGET_WIDTH);
        const maxY = Math.max(10, screenH - WIDGET_HEIGHT);
        const newX = Math.min(maxX, Math.max(10, dragStartRef.current.startX + dx));
        const newY = Math.min(maxY, Math.max(10, dragStartRef.current.startY + dy));
        setPosition({ x: newX, y: newY });
      };

      const handlePointerUp = () => {
        cancelLongPressTimer();
        if (isDraggingCardRef.current || isRepositioningRef.current) {
          const wasRepositioning = isRepositioningRef.current;
          isDraggingCardRef.current = false;
          isRepositioningRef.current = false;
          setIsRepositioning(false);
          if (wasRepositioning) {
            haptics.trigger('light');
          }
          setPosition((curr) => {
            try {
              localStorage.setItem('paperrocket_opt3_coords_v3', JSON.stringify(curr));
            } catch (_) {}
            return curr;
          });
        }
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
      };

      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    },
    [cancelLongPressTimer, position.x, position.y, startLongPressTimer]
  );

  // Auto-clamp when viewport resizes
  useEffect(() => {
    const handleResize = () => {
      setPosition((curr) => {
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const maxX = Math.max(10, screenW - WIDGET_WIDTH);
        const maxY = Math.max(10, screenH - WIDGET_HEIGHT);
        const clampedX = Math.min(maxX, Math.max(10, curr.x));
        const clampedY = Math.min(maxY, Math.max(10, curr.y));
        if (clampedX !== curr.x || clampedY !== curr.y) {
          return { x: clampedX, y: clampedY };
        }
        return curr;
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Independent 3D Gimbal Pose for Surface / Layer Transform (tumbles live with drag)
  const gimbalPoseRef = useRef<{ theta: number; phi: number }>({
    theta: Math.PI / 4,
    phi: Math.PI / 3,
  });

  // 3D Math Projection
  const projectDir = useCallback(
    (dx: number, dy: number, dz: number, GW: number, GH: number, G_ARM: number) => {
      const pose = c3Mode === 'surface' ? gimbalPoseRef.current : getCameraPose();
      const GCX = GW / 2,
        GCY = GH / 2;
      const sinT = Math.sin(pose.theta),
        cosT = Math.cos(pose.theta);
      const sinP = Math.sin(pose.phi),
        cosP = Math.cos(pose.phi);

      const rx = cosT,
        ry = 0,
        rz = -sinT;
      const ux = -cosP * sinT,
        uy = sinP,
        uz = -cosP * cosT;
      const fx = sinP * sinT,
        fy = cosP,
        fz = sinP * cosT;

      const sx = dx * rx + dy * ry + dz * rz;
      const sy = dx * ux + dy * uy + dz * uz;
      const depth = dx * fx + dy * fy + dz * fz;

      return { x: GCX + sx * G_ARM, y: GCY - sy * G_ARM, depth };
    },
    [c3Mode]
  );

  // Active Drag Highlight State for Canvas Feedback
  const [activeSector, setActiveSector] = useState<'center' | 'gizmo' | 'rim' | 'up' | 'down' | 'axis_x' | 'axis_z' | null>(null);
  const rimAngleRef = useRef<number>(0);

  // Auto-repeat for holding Up/Down/Left/Right directional buttons
  const repeatTimerRef = useRef<{ timeoutId?: ReturnType<typeof setTimeout>; intervalId?: ReturnType<typeof setInterval> }>({});
  const stopRepeat = useCallback(() => {
    if (repeatTimerRef.current.timeoutId) {
      clearTimeout(repeatTimerRef.current.timeoutId);
      repeatTimerRef.current.timeoutId = undefined;
    }
    if (repeatTimerRef.current.intervalId) {
      clearInterval(repeatTimerRef.current.intervalId);
      repeatTimerRef.current.intervalId = undefined;
    }
  }, []);

  const startRepeat = useCallback((fn: () => void) => {
    stopRepeat();
    repeatTimerRef.current.timeoutId = setTimeout(() => {
      repeatTimerRef.current.intervalId = setInterval(fn, 60);
    }, 220);
  }, [stopRepeat]);

  useEffect(() => {
    return () => stopRepeat();
  }, [stopRepeat]);

  // Redraw High-DPI Canvas
  const drawGimbal = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cssSize = DIAL_SIZE;
    const pxSize = Math.round(cssSize * dpr);
    if (canvas.width !== pxSize || canvas.height !== pxSize) {
      canvas.width = pxSize;
      canvas.height = pxSize;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssSize, cssSize);

    const GW = cssSize;
    const GH = cssSize;
    const G_ARM = GW * 0.365;
    const G_DOT = GW * 0.088;

    const isSurface = c3Mode === 'surface';
    const snugRadius = G_ARM + G_DOT;

    // 100% See-through (no opaque background sphere or box)

    // 1. ALWAYS Render the 3D Projected Gimbal Orbit Sphere
    const getAxisColor = (ax: AxisDef) => {
      if (ax.lbl === 'Y') return isLight ? '#18181b' : '#f4f4f5';
      return ax.col;
    };

    const projected = AXES.map((ax) => {
      const p = projectDir(ax.dir[0], ax.dir[1], ax.dir[2], GW, GH, G_ARM);
      return { ax, p, depth: p.depth };
    }).sort((a, b) => a.depth - b.depth);

    projected.forEach(({ ax, p, depth }) => {
      const isFront = depth >= -0.05;
      const col = getAxisColor(ax);
      ctx.save();
      ctx.strokeStyle = isFront
        ? col
        : isLight
        ? 'rgba(0,0,0,0.22)'
        : 'rgba(255, 255, 255, 0.18)';
      ctx.lineWidth = isFront ? 2 : 1;
      if (!isFront) ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(GW / 2, GH / 2);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      ctx.restore();
    });

    // Axis Nodes / Markers
    projected.forEach(({ ax, p, depth }) => {
      const isFront = depth >= -0.05;
      const col = getAxisColor(ax);
      ctx.save();

      // In Surface mode: Y and -Y are replaced by clean UP and DOWN triangles directly!
      if (isSurface && (ax.lbl === 'Y' || ax.lbl === '-Y')) {
        const isUp = ax.lbl === 'Y';
        const triW = 8.5;
        const triH = 11.5;
        ctx.beginPath();
        ctx.lineJoin = 'round';
        if (isUp) {
          ctx.moveTo(p.x, p.y - triH / 2);
          ctx.lineTo(p.x - triW, p.y + triH / 2);
          ctx.lineTo(p.x + triW, p.y + triH / 2);
        } else {
          ctx.moveTo(p.x, p.y + triH / 2);
          ctx.lineTo(p.x - triW, p.y - triH / 2);
          ctx.lineTo(p.x + triW, p.y - triH / 2);
        }
        ctx.closePath();
        const isActive = isUp ? activeSector === 'up' : activeSector === 'down';
        ctx.fillStyle = isActive
          ? (isLight ? '#000000' : '#ffffff')
          : (isLight ? '#18181b' : '#f4f4f5');
        ctx.fill();
        ctx.strokeStyle = isActive
          ? (isLight ? '#ffffff' : '#000000')
          : (isLight ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.25)');
        ctx.lineWidth = 1.4;
        ctx.stroke();
        ctx.restore();
        return;
      }

      // Standard sphere (X, -X, Z, -Z or all axes in camera mode)
      const dotR = G_DOT * (isFront ? 1.0 : 0.78);
      ctx.beginPath();
      ctx.arc(p.x, p.y, dotR, 0, Math.PI * 2);
      const isAxisActive =
        (ax.lbl === 'X' || ax.lbl === '-X') && activeSector === 'axis_x' ||
        (ax.lbl === 'Z' || ax.lbl === '-Z') && activeSector === 'axis_z';

      if (isFront) {
        ctx.fillStyle = isAxisActive ? (isLight ? '#000000' : '#ffffff') : col;
        ctx.fill();
        ctx.strokeStyle = isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = isAxisActive
          ? (isLight ? '#ffffff' : '#000000')
          : (ax.lbl === 'Y' && !isLight) ? '#09090b' : '#ffffff';
        ctx.font = 'bold 8px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(ax.lbl, p.x, p.y + 0.5);
      } else {
        ctx.fillStyle = isLight ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.25)';
        ctx.fill();
      }
      ctx.restore();
    });

    // Center origin dot
    ctx.save();
    ctx.fillStyle = activeSector === 'center'
      ? (isLight ? '#18181b' : '#f4f4f5')
      : isLight
      ? 'rgba(0,0,0,0.45)'
      : 'rgba(255, 255, 255, 0.6)';
    ctx.beginPath();
    ctx.arc(GW / 2, GH / 2, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 2. If in Surface (Layer Transform) mode:
    // Add curved side brackets on left/right for in-plane rotation
    if (isSurface) {
      const bracketRadius = G_ARM + 10;
      const bracketCol = isLight ? '#18181b' : '#f4f4f5';

      // Curved side brackets on left and right: (  )
      ctx.save();
      const rot = rimAngleRef.current;
      ctx.strokeStyle = activeSector === 'rim'
        ? bracketCol
        : isLight
        ? 'rgba(24, 24, 27, 0.45)'
        : 'rgba(244, 244, 245, 0.45)';
      ctx.lineWidth = activeSector === 'rim' ? 3.5 : 2.6;
      ctx.lineCap = 'round';

      // Left bracket (
      ctx.beginPath();
      ctx.arc(GW / 2, GH / 2, bracketRadius, rot + Math.PI * 0.82, rot + Math.PI * 1.18);
      ctx.stroke();

      // Right bracket )
      ctx.beginPath();
      ctx.arc(GW / 2, GH / 2, bracketRadius, rot - Math.PI * 0.18, rot + Math.PI * 0.18);
      ctx.stroke();
      ctx.restore();
    }
  }, [c3Mode, isLight, projectDir, activeSector]);

  // Subscribe to live camera pose telemetry (Always on)
  useEffect(() => {
    drawGimbal();
    const unsubscribe = subscribeCameraPose(() => {
      drawGimbal();
    });
    return () => unsubscribe();
  }, [drawGimbal]);

  // Canvas Touch/Pointer Handlers
  const canvasDragState = useRef<{
    isDragging: boolean;
    pointerId: number;
    scale: number;
    startX: number;
    startY: number;
    action: 'center' | 'gizmo' | 'rim' | 'up' | 'down' | 'axis_x' | 'axis_z';
    targetAxis: AxisDef | null;
    startAngle: number;
  }>({
    isDragging: false,
    pointerId: -1,
    scale: 1,
    startX: 0,
    startY: 0,
    action: 'gizmo',
    targetAxis: null,
    startAngle: 0,
  });

  const handleCanvasPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.stopPropagation();
    if (e.button !== 0 || canvasDragState.current.isDragging) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const r = canvas.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const scale = DIAL_SIZE / Math.max(1, r.width);
    const normX = (e.clientX - cx) * scale + DIAL_SIZE / 2;
    const normY = (e.clientY - cy) * scale + DIAL_SIZE / 2;

    const GW = DIAL_SIZE;
    const canvasCX = GW / 2;
    const canvasCY = GW / 2;
    const G_ARM = GW * 0.365;

    const distFromCenter = Math.hypot(normX - canvasCX, normY - canvasCY);
    const startAngle = Math.atan2(e.clientY - cy, e.clientX - cx);

    let action: 'center' | 'gizmo' | 'rim' | 'up' | 'down' | 'axis_x' | 'axis_z' = 'gizmo';
    let targetAxis: AxisDef | null = null;

    if (c3Mode === 'surface') {
      const bracketRadius = G_ARM + 10;
      const bracketDist = Math.abs(distFromCenter - bracketRadius);
      const isSide = Math.abs(normX - canvasCX) > 28;

      // Project axes to test hit on Y (up), -Y (down), X/-X (axis_x), Z/-Z (axis_z)
      const projected = AXES.map((ax) => {
        const p = projectDir(ax.dir[0], ax.dir[1], ax.dir[2], GW, GW, G_ARM);
        return { ax, p, depth: p.depth, dist: Math.hypot(normX - p.x, normY - p.y) };
      });

      projected.sort((a, b) => a.dist - b.dist);
      const closest = projected[0];

      if (closest && closest.dist < 18) {
        targetAxis = closest.ax;
        if (closest.ax.lbl === 'Y') {
          action = 'up';
        } else if (closest.ax.lbl === '-Y') {
          action = 'down';
        } else if (closest.ax.lbl === 'X' || closest.ax.lbl === '-X') {
          action = 'axis_x';
        } else if (closest.ax.lbl === 'Z' || closest.ax.lbl === '-Z') {
          action = 'axis_z';
        }
      } else if (bracketDist < 14 && isSide) {
        action = 'rim';
      } else {
        action = 'gizmo';
      }
    } else {
      const projected = AXES.map((ax) => {
        const p = projectDir(ax.dir[0], ax.dir[1], ax.dir[2], GW, GW, G_ARM);
        return { ax, p, depth: p.depth };
      });
      const hitAxis = projected.find(({ p, depth }) => {
        return depth >= -0.05 && Math.hypot(normX - p.x, normY - p.y) < 14;
      });
      pendingHitAxisRef.current = hitAxis ? hitAxis.ax : null;
    }

    canvasDragState.current = {
      isDragging: true,
      pointerId: e.pointerId,
      scale,
      startX: e.clientX,
      startY: e.clientY,
      action,
      targetAxis,
      startAngle,
    };

    if (c3Mode === 'surface') {
      engine?.beginTransform(targetScope);
      if (action === 'up') {
        haptics.trigger('light');
        engine?.translateAxis3D('y', 0.1, targetScope);
        startRepeat(() => engine?.translateAxis3D('y', 0.05, targetScope));
      } else if (action === 'down') {
        haptics.trigger('light');
        engine?.translateAxis3D('y', -0.1, targetScope);
        startRepeat(() => engine?.translateAxis3D('y', -0.05, targetScope));
      } else if (action === 'axis_x') {
        haptics.trigger('light');
        const sign = targetAxis?.lbl === '-X' ? 1 : -1;
        engine?.translateAxis3D('x', 0.1 * sign, targetScope);
        startRepeat(() => engine?.translateAxis3D('x', 0.05 * sign, targetScope));
      } else if (action === 'axis_z') {
        haptics.trigger('light');
        const sign = targetAxis?.lbl === 'Z' ? 1 : -1;
        engine?.translateAxis3D('z', 0.1 * sign, targetScope);
        startRepeat(() => engine?.translateAxis3D('z', 0.05 * sign, targetScope));
      }
    }

    setActiveSector(action);
    e.currentTarget.setPointerCapture(e.pointerId);
    drawGimbal();

    // Start long-press timer if not holding directional repeat arrow
    const isDirectionalRepeat =
      c3Mode === 'surface' && (action === 'up' || action === 'down' || action === 'axis_x' || action === 'axis_z');
    if (!isDirectionalRepeat) {
      startLongPressTimer(e.clientX, e.clientY, () => {
        stopRepeat();
        if (c3Mode === 'surface') engine?.endTransform();
        pendingHitAxisRef.current = null;
        setActiveSector(null);
        drawGimbal();
      });
    }
  };

  const handleCanvasPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!canvasDragState.current.isDragging || e.pointerId !== canvasDragState.current.pointerId) return;

    if (longPressTimerRef.current) {
      const movedDist = Math.hypot(
        e.clientX - initialPointerPosRef.current.x,
        e.clientY - initialPointerPosRef.current.y
      );
      if (movedDist > 7) {
        cancelLongPressTimer();
        pendingHitAxisRef.current = null;
      }
    }

    if (isRepositioningRef.current) {
      const dx = e.clientX - dragStartRef.current.mouseX;
      const dy = e.clientY - dragStartRef.current.mouseY;
      const screenW = window.innerWidth;
      const screenH = window.innerHeight;
      const maxX = Math.max(10, screenW - WIDGET_WIDTH);
      const maxY = Math.max(10, screenH - WIDGET_HEIGHT);
      const newX = Math.min(maxX, Math.max(10, dragStartRef.current.startX + dx));
      const newY = Math.min(maxY, Math.max(10, dragStartRef.current.startY + dy));
      setPosition({ x: newX, y: newY });
      return;
    }

    if (!engine) return;
    const dx = e.clientX - canvasDragState.current.startX;
    const dy = e.clientY - canvasDragState.current.startY;
    const { action } = canvasDragState.current;

    if (c3Mode === 'surface') {
      if (action === 'gizmo') {
        const speed = 0.02 * (engine.navigatorSensitivity || 1);
        gimbalPoseRef.current.theta -= dx * speed;
        gimbalPoseRef.current.phi = Math.max(
          0.01,
          Math.min(Math.PI - 0.01, gimbalPoseRef.current.phi - dy * speed)
        );
        engine.rotateTrackball(dx, dy, targetScope);
      } else if (action === 'rim') {
        const canvas = canvasRef.current;
        if (canvas) {
          const r = canvas.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const currentAngle = Math.atan2(e.clientY - cy, e.clientX - cx);
          let deltaAngle = currentAngle - canvasDragState.current.startAngle;
          if (deltaAngle > Math.PI) deltaAngle -= 2 * Math.PI;
          if (deltaAngle < -Math.PI) deltaAngle += 2 * Math.PI;
          canvasDragState.current.startAngle = currentAngle;
          rimAngleRef.current += deltaAngle;

          engine.rotateOnPlane(deltaAngle, targetScope, isLocked);
        }
      } else if (action === 'up' || action === 'down') {
        if (Math.hypot(dx, dy) > 3) {
          stopRepeat();
          engine.translateAxis3D('y', -dy * 0.04, targetScope);
        }
      } else if (action === 'axis_x') {
        if (Math.hypot(dx, dy) > 3) {
          stopRepeat();
          engine.translateAxis3D('x', dx * 0.04, targetScope);
        }
      } else if (action === 'axis_z') {
        if (Math.hypot(dx, dy) > 3) {
          stopRepeat();
          engine.translateAxis3D('z', (dy - dx * 0.4) * 0.04, targetScope);
        }
      }
    } else {
      const scale = canvasDragState.current.scale * (e.shiftKey ? 0.25 : 1);
      engine.orbitNavigator(dx * scale, dy * scale);
    }

    canvasDragState.current.startX = e.clientX;
    canvasDragState.current.startY = e.clientY;
    drawGimbal();
  };

  const handleCanvasPointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    cancelLongPressTimer();
    stopRepeat();

    if (isRepositioningRef.current) {
      isRepositioningRef.current = false;
      setIsRepositioning(false);
      haptics.trigger('light');
      setPosition((curr) => {
        try {
          localStorage.setItem('paperrocket_opt3_coords_v3', JSON.stringify(curr));
        } catch (_) {}
        return curr;
      });
      canvasDragState.current.isDragging = false;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch (_) {}
      drawGimbal();
      return;
    }

    if (!canvasDragState.current.isDragging || e.pointerId !== canvasDragState.current.pointerId) return;
    canvasDragState.current.isDragging = false;
    setActiveSector(null);

    // If user tapped an axis node without long-pressing or dragging, snap to view!
    if (pendingHitAxisRef.current) {
      haptics.trigger('light');
      engine?.snapToView(pendingHitAxisRef.current.viewName);
      pendingHitAxisRef.current = null;
    }

    if (c3Mode === 'surface') engine?.endTransform();
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (_) {}
    drawGimbal();
  };

  // Frameless Floating Navigator (Kokraf style, always on)
  return (
    <div
      ref={cardRef}
      className={`nav-frameless-root ${isLight ? 'card-theme-light' : 'card-theme-dark'} ${
        isRepositioning ? 'repositioning' : ''
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${WIDGET_WIDTH}px`,
        transform: `scale(${uiScale})`,
        transformOrigin: 'top left',
      }}
    >
      {isRepositioning && <div className="nav-reposition-badge">Drag to move</div>}

      {/* Frameless Circular Gimbal Dial */}
      <div className="nav-dial-wrap">
        <canvas
          ref={canvasRef}
          className="nav-dial-canvas"
          style={{ width: DIAL_SIZE, height: DIAL_SIZE }}
          onPointerDown={handleCanvasPointerDown}
          onPointerMove={handleCanvasPointerMove}
          onPointerUp={handleCanvasPointerUp}
          onPointerCancel={handleCanvasPointerUp}
          onLostPointerCapture={handleCanvasPointerUp}
          title={
            c3Mode === 'camera'
              ? 'Drag to orbit. Long-press to move tool. Tap an axis node to snap.'
              : 'Drag center to pan, arrows to step. Long-press to move tool.'
          }
        />
      </div>

      {/* Mode Toggle Pill (Placed underneath the dial) */}
      <div
        className="nav-mode-pill-drag-bar"
        onPointerDown={handleCardDragStart}
        title="Long-press or drag to reposition navigator"
      >
        <div className="nav-mode-pill" aria-label="Navigator mode">
          <button
            type="button"
            className={`nav-mode-choice ${c3Mode === 'camera' ? 'active' : ''}`}
            onClick={() => {
              if (suppressClickRef.current) return;
              if (c3Mode === 'camera') {
                engine?.resetCamera();
                drawGimbal();
              } else {
                setC3Mode('camera');
              }
            }}
            title={c3Mode === 'camera' ? 'Camera Orbit (Tap to reset camera view)' : 'Switch to Camera Orbit'}
            aria-label="Camera View"
          >
            <Camera className="w-3.5 h-3.5 shrink-0" />
          </button>
          <button
            type="button"
            className={`nav-mode-choice ${c3Mode === 'surface' ? 'active' : ''}`}
            onClick={() => {
              if (suppressClickRef.current) return;
              if (c3Mode === 'surface') {
                rimAngleRef.current = 0;
                gimbalPoseRef.current = { theta: Math.PI / 4, phi: Math.PI / 3 };
                engine?.resetTransform(targetScope);
                drawGimbal();
              } else {
                gimbalPoseRef.current = { theta: Math.PI / 4, phi: Math.PI / 3 };
                rimAngleRef.current = 0;
                setC3Mode('surface');
              }
            }}
            title={c3Mode === 'surface' ? 'Surface Transform (Tap to reset plane transform)' : 'Switch to Surface Transform'}
            aria-label="Surface Transform"
          >
            <Layers className="w-3.5 h-3.5 shrink-0" />
          </button>
        </div>
      </div>

      {/* Target Scope Selector: When in Surface Mode, lets the user pick what is being moved */}
      {c3Mode === 'surface' && (
        <div className="nav-scope-container">
          <div className="nav-scope-pill" aria-label="Target to transform">
            <button
              type="button"
              className={`nav-scope-btn ${targetScope === 'all' ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                handleSelectScope('all');
              }}
              title="Move Everything (Canvas + Painting together)"
              aria-label="All"
            >
              All
            </button>
            <button
              type="button"
              className={`nav-scope-btn ${targetScope === 'model' ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                handleSelectScope('model');
              }}
              title="Move Canvas Only (Painting stays in place)"
              aria-label="Canvas only"
            >
              Canvas
            </button>
            <button
              type="button"
              className={`nav-scope-btn ${targetScope === 'strokes' ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                handleSelectScope('strokes');
              }}
              title="Move Painting Only (Canvas stays in place)"
              aria-label="Painting only"
            >
              Paint
            </button>
            <button
              type="button"
              className={`nav-scope-btn ${targetScope === 'active_layer' ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                handleSelectScope('active_layer');
              }}
              title="Move Active Layer Only"
              aria-label="Layer only"
            >
              Layer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
