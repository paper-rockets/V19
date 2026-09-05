import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Compass, RotateCcw, Minus, Maximize2, Camera, Layers } from 'lucide-react';
import { StudioEngine } from '../../core/studioEngine';
import { TransformTargetScope } from '../../types';
import { getCameraPose, subscribeCameraPose } from '../../core/telemetryStore';
import './navigatorStyles.css';

export interface Option3SphereNavigatorProps {
  engine?: StudioEngine | null;
  theme?: 'light' | 'dark';
  targetScope?: TransformTargetScope;
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
  { dir: [0, 1, 0], col: '#38bdf8', lbl: 'Y', viewName: 'top' },
  { dir: [0, -1, 0], col: '#777a80', lbl: '-Y', viewName: 'bottom' },
  { dir: [-1, 0, 0], col: '#b8bac0', lbl: 'X', viewName: 'left' },
  { dir: [1, 0, 0], col: '#b8bac0', lbl: '-X', viewName: 'right' },
  { dir: [0, 0, 1], col: '#d4d5d8', lbl: 'Z', viewName: 'front' },
  { dir: [0, 0, -1], col: '#8b8e94', lbl: '-Z', viewName: 'back' },
];

export const Option3SphereNavigator: React.FC<Option3SphereNavigatorProps> = ({
  engine,
  theme = 'dark',
  targetScope = 'active_layer',
  isLocked = false,
  uiScale = 1.0,
}) => {
  const isLight = theme === 'light';
  const [c3Mode, setC3Mode] = useState<'surface' | 'camera'>('surface');
  const [isExpanded, setIsExpanded] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('paperrocket_nav_expanded');
      if (saved !== null) return saved === 'true';
    } catch (_) {}
    return false;
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Position state (persisted to localStorage, clamped to screen bounds)
  const [position, setPosition] = useState<{ x: number; y: number }>(() => {
    const defaultWidth = 196;
    const defaultHeight = 280;
    const screenW = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const screenH = typeof window !== 'undefined' ? window.innerHeight : 800;
    const defaultX = 18;
    const defaultY = Math.round(screenH / 2 + 215);

    try {
      const saved = localStorage.getItem('paperrocket_opt3_coords');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.x === 'number' && typeof parsed.y === 'number') {
          const maxX = Math.max(10, screenW - defaultWidth);
          const maxY = Math.max(10, screenH - defaultHeight);
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
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; startX: number; startY: number }>({
    mouseX: 0,
    mouseY: 0,
    startX: 0,
    startY: 0,
  });

  const handleCardDragStart = useCallback((e: React.PointerEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('canvas')) return;

    isDraggingCardRef.current = true;
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      startX: position.x,
      startY: position.y,
    };

    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch (_) {}

    const handlePointerMove = (moveEv: PointerEvent) => {
      if (!isDraggingCardRef.current) return;
      const dx = moveEv.clientX - dragStartRef.current.mouseX;
      const dy = moveEv.clientY - dragStartRef.current.mouseY;
      const screenW = window.innerWidth;
      const screenH = window.innerHeight;
      const maxX = Math.max(10, screenW - 196);
      const maxY = Math.max(10, screenH - 80);
      const newX = Math.min(maxX, Math.max(10, dragStartRef.current.startX + dx));
      const newY = Math.min(maxY, Math.max(10, dragStartRef.current.startY + dy));
      setPosition({ x: newX, y: newY });
    };

    const handlePointerUp = () => {
      if (isDraggingCardRef.current) {
        isDraggingCardRef.current = false;
        setPosition((curr) => {
          try {
            localStorage.setItem('paperrocket_opt3_coords', JSON.stringify(curr));
          } catch (_) {}
          return curr;
        });
      }
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  }, [position.x, position.y]);

  const puckDragRef = useRef<{
    startX: number;
    startY: number;
    posX: number;
    posY: number;
    hasDragged: boolean;
  }>({
    startX: 0,
    startY: 0,
    posX: 0,
    posY: 0,
    hasDragged: false,
  });

  const [isPuckDragging, setIsPuckDragging] = useState(false);

  const expandCard = useCallback(() => {
    setPosition((curr) => {
      const screenW = typeof window !== 'undefined' ? window.innerWidth : 1200;
      const screenH = typeof window !== 'undefined' ? window.innerHeight : 800;
      const maxX = Math.max(10, screenW - 196);
      const maxY = Math.max(10, screenH - 280);
      return {
        x: Math.min(maxX, Math.max(10, curr.x)),
        y: Math.min(maxY, Math.max(10, curr.y)),
      };
    });
    try {
      localStorage.setItem('paperrocket_nav_expanded', 'true');
    } catch (_) {}
    setIsExpanded(true);
  }, []);

  const handlePuckPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0) return;
    e.preventDefault();

    puckDragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      posX: position.x,
      posY: position.y,
      hasDragged: false,
    };

    const targetEl = e.currentTarget as HTMLElement;
    try {
      targetEl.setPointerCapture(e.pointerId);
    } catch (_) {}

    const handlePointerMove = (moveEv: PointerEvent) => {
      const dx = moveEv.clientX - puckDragRef.current.startX;
      const dy = moveEv.clientY - puckDragRef.current.startY;
      if (!puckDragRef.current.hasDragged && Math.hypot(dx, dy) > 3) {
        puckDragRef.current.hasDragged = true;
        setIsPuckDragging(true);
      }
      if (puckDragRef.current.hasDragged) {
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const maxX = Math.max(10, screenW - 48);
        const maxY = Math.max(10, screenH - 30);
        const newX = Math.min(maxX, Math.max(10, puckDragRef.current.posX + dx));
        const newY = Math.min(maxY, Math.max(10, puckDragRef.current.posY + dy));
        setPosition({ x: newX, y: newY });
      }
    };

    const handlePointerUp = (upEv: PointerEvent) => {
      try {
        targetEl.releasePointerCapture(upEv.pointerId);
      } catch (_) {}
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      setIsPuckDragging(false);

      if (puckDragRef.current.hasDragged) {
        setPosition((curr) => {
          try {
            localStorage.setItem('paperrocket_opt3_coords', JSON.stringify(curr));
          } catch (_) {}
          return curr;
        });
      } else {
        expandCard();
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  }, [position.x, position.y, expandCard]);

  // Auto-clamp when viewport resizes
  useEffect(() => {
    const handleResize = () => {
      setPosition((curr) => {
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const maxX = Math.max(10, screenW - 196);
        const maxY = Math.max(10, screenH - 120);
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

  // 3D Math Projection
  const projectDir = useCallback(
    (dx: number, dy: number, dz: number, GW: number, GH: number, G_ARM: number) => {
      const pose = getCameraPose();
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
    []
  );

  // Active Drag Highlight State for Canvas Feedback
  const [activeSector, setActiveSector] = useState<'center' | 'cones' | 'sides' | 'rim' | null>(null);
  const rimAngleRef = useRef<number>(0);

  // Redraw High-DPI Canvas
  const drawGimbal = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cssSize = 184;
    if (canvas.width !== cssSize * dpr) {
      canvas.width = cssSize * dpr;
      canvas.height = cssSize * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, cssSize, cssSize);

    const GW = cssSize;
    const GH = cssSize;
    const G_ARM = GW * 0.365;
    const G_DOT = GW * 0.088;

    const isSurface = c3Mode === 'surface';
    const snugRadius = G_ARM + G_DOT;

    // Background sphere
    ctx.save();
    ctx.fillStyle = isLight ? '#ebe7df' : '#1c1e23';
    ctx.beginPath();
    ctx.arc(GW / 2, GH / 2, snugRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = isSurface
      ? '#38bdf8'
      : isLight
      ? 'rgba(0, 0, 0, 0.12)'
      : 'rgba(255, 255, 255, 0.10)';
    ctx.lineWidth = isSurface ? 2 : 1.2;
    ctx.stroke();

    // Outer Orbit Dashes & Markers
    if (isSurface) {
      ctx.strokeStyle = activeSector === 'rim' ? '#38bdf8' : 'rgba(56, 189, 248, 0.35)';
      ctx.lineWidth = activeSector === 'rim' ? 2 : 1;
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.arc(GW / 2, GH / 2, snugRadius - 4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      const rot = rimAngleRef.current;
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.arc(GW / 2, GH / 2, snugRadius - 4, rot + Math.PI * 0.85, rot + Math.PI * 1.15);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(GW / 2, GH / 2, snugRadius - 4, rot - Math.PI * 0.15, rot + Math.PI * 0.15);
      ctx.stroke();
    }
    ctx.restore();

    // Projected axes
    const projected = AXES.map((ax) => {
      const p = projectDir(ax.dir[0], ax.dir[1], ax.dir[2], GW, GH, G_ARM);
      return { ax, p, depth: p.depth };
    }).sort((a, b) => a.depth - b.depth);

    projected.forEach(({ ax, p, depth }) => {
      const isFront = depth >= -0.05;
      ctx.save();
      ctx.strokeStyle = isFront
        ? ax.col
        : isLight
        ? 'rgba(0,0,0,0.22)'
        : 'rgba(255, 255, 255, 0.18)';
      ctx.lineWidth = isFront ? 2.4 : 1.2;
      if (!isFront) ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(GW / 2, GH / 2);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      ctx.restore();
    });

    // Center disc
    ctx.save();
    if (isSurface) {
      ctx.fillStyle = activeSector === 'center'
        ? 'rgba(56, 189, 248, 0.45)'
        : isLight
        ? 'rgba(56, 189, 248, 0.22)'
        : 'rgba(56, 189, 248, 0.18)';
      ctx.beginPath();
      ctx.arc(GW / 2, GH / 2, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.6;
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(GW / 2, GH / 2, 4, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = activeSector === 'center'
        ? (isLight ? '#0284c7' : '#38bdf8')
        : isLight
        ? 'rgba(0,0,0,0.45)'
        : 'rgba(255, 255, 255, 0.6)';
      ctx.beginPath();
      ctx.arc(GW / 2, GH / 2, 4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Cones / Axis Markers
    projected.forEach(({ ax, p, depth }) => {
      const isFront = depth >= -0.05;
      ctx.save();
      if (isSurface) {
        if (ax.lbl === 'Y') {
          const triSize = G_DOT * 1.35;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y - triSize);
          ctx.lineTo(p.x - triSize * 0.85, p.y + triSize * 0.65);
          ctx.lineTo(p.x + triSize * 0.85, p.y + triSize * 0.65);
          ctx.closePath();
          ctx.fillStyle = isFront
            ? '#38bdf8'
            : isLight
            ? 'rgba(0,0,0,0.3)'
            : 'rgba(255,255,255,0.3)';
          ctx.fill();
          if (isFront) {
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.8;
            ctx.stroke();
          }
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 8.5px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('Up', p.x, p.y + triSize * 0.1);
        } else if (ax.lbl === '-Y') {
          const triSize = G_DOT * 1.35;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y + triSize);
          ctx.lineTo(p.x - triSize * 0.85, p.y - triSize * 0.65);
          ctx.lineTo(p.x + triSize * 0.85, p.y - triSize * 0.65);
          ctx.closePath();
          ctx.fillStyle = isFront
            ? '#475569'
            : isLight
            ? 'rgba(0,0,0,0.3)'
            : 'rgba(255,255,255,0.3)';
          ctx.fill();
          if (isFront) {
            ctx.strokeStyle = isLight ? '#0f172a' : '#94a3b8';
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 8px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('Dn', p.x, p.y - triSize * 0.1);
        } else {
          const dotR = G_DOT * (isFront ? 1.0 : 0.75);
          ctx.beginPath();
          ctx.arc(p.x, p.y, dotR, 0, Math.PI * 2);
          if (isFront) {
            ctx.fillStyle = ax.col;
            ctx.fill();
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 9px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(ax.lbl, p.x, p.y + 0.5);
          } else {
            ctx.fillStyle = isLight ? 'rgba(0,0,0,0.22)' : 'rgba(255,255,255,0.22)';
            ctx.fill();
          }
        }
      } else {
        const dotR = G_DOT * (isFront ? 1.0 : 0.78);
        ctx.beginPath();
        ctx.arc(p.x, p.y, dotR, 0, Math.PI * 2);
        if (isFront) {
          ctx.fillStyle = ax.col;
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 9px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(ax.lbl, p.x, p.y + 0.5);
        } else {
          ctx.fillStyle = isLight ? 'rgba(0,0,0,0.22)' : 'rgba(255,255,255,0.22)';
          ctx.fill();
        }
      }
      ctx.restore();
    });

    ctx.restore();
  }, [c3Mode, isLight, projectDir, activeSector]);

  // Subscribe to live camera pose telemetry
  useEffect(() => {
    if (!isExpanded) return;
    drawGimbal();
    const unsubscribe = subscribeCameraPose(() => {
      drawGimbal();
    });
    return () => unsubscribe();
  }, [isExpanded, drawGimbal]);

  // Canvas Touch/Pointer Handlers
  const canvasDragState = useRef<{
    isDragging: boolean;
    pointerId: number;
    scale: number;
    startX: number;
    startY: number;
    action: 'center' | 'cones' | 'sides' | 'rim';
    startAngle: number;
  }>({
    isDragging: false,
    pointerId: -1,
    scale: 1,
    startX: 0,
    startY: 0,
    action: 'center',
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
    const mx = e.clientX - r.left;
    const my = e.clientY - r.top;
    const distFromCenter = Math.hypot(mx - r.width / 2, my - r.height / 2);

    let action: 'center' | 'cones' | 'sides' | 'rim' = 'sides';
    if (c3Mode === 'surface') {
      if (distFromCenter < 28) {
        action = 'center';
      } else if (distFromCenter >= 60) {
        action = 'rim';
      } else {
        action = 'sides';
      }
    }

    const startAngle = Math.atan2(e.clientY - cy, e.clientX - cx);

    canvasDragState.current = {
      isDragging: true,
      pointerId: e.pointerId,
      scale: 184 / Math.max(1, r.width),
      startX: e.clientX,
      startY: e.clientY,
      action,
      startAngle,
    };

    if (c3Mode === 'surface') engine?.beginTransform(targetScope);
    setActiveSector(action);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleCanvasPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!canvasDragState.current.isDragging || e.pointerId !== canvasDragState.current.pointerId || !engine) return;

    const dx = e.clientX - canvasDragState.current.startX;
    const dy = e.clientY - canvasDragState.current.startY;
    const { action } = canvasDragState.current;

    if (c3Mode === 'surface') {
      if (action === 'center') {
        // Move model/plane in screen space
        engine.translateScreenSpace(dx * 1.5, dy * 1.5, targetScope, isLocked);
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

          // Flat screen-space roll: rotates object/canvas in one direction around view axis
          engine.rotateScreenSpace(-deltaAngle, targetScope, isLocked);
        }
      } else {
        // Trackball 3D rotation
        engine.rotateTrackball(dx * 1.7, dy * 1.7, targetScope);
      }
    } else {
      // Camera mode uses the entire sphere, including every axis node, as one
      // continuous diagonal orbit surface.
      const scale = canvasDragState.current.scale * (e.shiftKey ? 0.25 : 1);
      engine.orbitNavigator(dx * scale, dy * scale);
    }

    canvasDragState.current.startX = e.clientX;
    canvasDragState.current.startY = e.clientY;
    if (c3Mode === 'surface') drawGimbal();
  };

  const handleCanvasPointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!canvasDragState.current.isDragging || e.pointerId !== canvasDragState.current.pointerId) return;
    canvasDragState.current.isDragging = false;
    setActiveSector(null);
    if (c3Mode === 'surface') engine?.endTransform();
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (_) {}
    drawGimbal();
  };

  // Mini Collapsed Puck - Micro Floating Pill
  if (!isExpanded) {
    return (
      <div
        role="button"
        tabIndex={0}
        aria-label="Expand 3D Navigator"
        title="3D Navigator (Drag to move, click to expand)"
        className={`nav-mini-puck ${isLight ? 'card-theme-light' : 'card-theme-dark'} ${isPuckDragging ? 'is-dragging' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `scale(${uiScale})`,
          transformOrigin: 'top left',
        }}
        onPointerDown={handlePuckPointerDown}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            expandCard();
          }
        }}
      >
        <Compass className="w-3.5 h-3.5 text-sky-400 shrink-0 pointer-events-none" />
        <Maximize2 className="w-2.5 h-2.5 opacity-60 shrink-0 pointer-events-none" />
      </div>
    );
  }

  // Full Expanded Card
  return (
    <div
      ref={cardRef}
      onPointerDown={handleCardDragStart}
      className={`pr-surface nav-controller-modal ${isLight ? 'card-theme-light' : 'card-theme-dark'}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '196px',
        transform: `scale(${uiScale})`,
        transformOrigin: 'top left',
      }}
    >
      {/* Top Toolbar (draggable via background) */}
      <div
        className="nav-top-toolbar cursor-grab active:cursor-grabbing"
        onPointerDown={handleCardDragStart}
      >
        {/* Surface vs Camera Pill */}
        <div className="seg-pill-wrap" aria-label="Navigator mode">
          <button
            type="button"
            className={`seg-choice flex items-center justify-center ${c3Mode === 'camera' ? 'active' : ''}`}
            onClick={() => setC3Mode('camera')}
            title="Camera View (Orbit)"
            aria-label="Camera View"
          >
            <Camera className="w-3.5 h-3.5 shrink-0" />
          </button>
          <button
            type="button"
            className={`seg-choice flex items-center justify-center ${c3Mode === 'surface' ? 'active' : ''}`}
            onClick={() => setC3Mode('surface')}
            title="Surface Transform (Rotate/Move)"
            aria-label="Surface Transform"
          >
            <Layers className="w-3.5 h-3.5 shrink-0" />
          </button>
        </div>

        {/* Reset Button */}
        <button
          className="nav-tool-btn"
          onClick={() => {
            rimAngleRef.current = 0;
            engine?.resetTransform(targetScope);
            engine?.resetCamera();
            drawGimbal();
          }}
          title="Reset Transform & Camera"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* Minimize Button */}
        <button
          className="nav-tool-btn"
          onClick={() => {
            try {
              localStorage.setItem('paperrocket_nav_expanded', 'false');
            } catch (_) {}
            setIsExpanded(false);
          }}
          title="Minimize Navigator"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Sphere Gimbal Canvas Area */}
      <div className="c3-gimbal-wrap">
        <canvas
          ref={canvasRef}
          className="gimbal-canvas-3"
          style={{ width: 184, height: 184 }}
          onPointerDown={handleCanvasPointerDown}
          onPointerMove={handleCanvasPointerMove}
          onPointerUp={handleCanvasPointerUp}
          onPointerCancel={handleCanvasPointerUp}
          onLostPointerCapture={handleCanvasPointerUp}
          title={c3Mode === 'camera' ? 'Drag to orbit. Hold Shift for precision.' : undefined}
        />
      </div>

      {/* Quick Snap Preset Chips (≥ 44px) */}
      <div className="presets-grid">
        <button
          className="preset-chip"
          onClick={() => engine?.snapToView('top')}
          title="Snap to flat ground"
        >
          Ground
        </button>
        <button
          className="preset-chip"
          onClick={() => engine?.snapToView('front')}
          title="Snap to vertical wall"
        >
          Wall
        </button>
        <button
          className="preset-chip"
          onClick={() => engine?.snapToView('isometric')}
          title="Snap to 45° angle"
        >
          45°
        </button>
        <button
          className="preset-chip"
          onClick={() => engine?.snapToView('isometric')}
          title="Align view"
        >
          Align
        </button>
      </div>
    </div>
  );
};
