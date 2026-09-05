import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { subscribeFps, getFps } from '../core/telemetryStore';

interface FpsCounterProps {
  uiScale?: number;
  theme?: 'light' | 'dark';
  fullDebug?: boolean;
  onToggleFullDebug?: () => void;
}

/**
 * Pro Mode FPS & Input Lag Diagnostics Counter.
 *
 * Provides both a compact badge and a full multi-line debug mode showing:
 * - now: Current frame rate with idle/resting detection.
 * - draw: Active drawing frame rate while pen/finger touches screen.
 * - lag: Real-time input latency (ms) from pointer movement to frame render (the input line).
 *
 * Click to toggle between compact pill and full 3-line debug diagnostics.
 */
const FpsCounterComponent: React.FC<FpsCounterProps> = ({
  uiScale = 1.0,
  theme = 'dark',
  fullDebug,
  onToggleFullDebug,
}) => {
  const fps = useSyncExternalStore(subscribeFps, getFps, getFps);
  const [lagMs, setLagMs] = useState<number>(0);
  const [activeFps, setActiveFps] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(() => {
    try {
      return localStorage.getItem('remix3d_pro_debug_mode') === 'true';
    } catch {
      return false;
    }
  });

  const pendingInputAt = useRef<number | null>(null);
  const isDown = useRef<boolean>(false);
  const smoothedLag = useRef<number>(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const onDown = () => {
      isDown.current = true;
      pendingInputAt.current = performance.now();
    };
    const onMove = () => {
      if (isDown.current && pendingInputAt.current === null) {
        pendingInputAt.current = performance.now();
      }
    };
    const onUp = () => {
      isDown.current = false;
      pendingInputAt.current = null;
    };

    const opts = { capture: true, passive: true } as AddEventListenerOptions;
    window.addEventListener('pointerdown', onDown, opts);
    window.addEventListener('pointermove', onMove, opts);
    window.addEventListener('pointerup', onUp, opts);
    window.addEventListener('pointercancel', onUp, opts);

    const tick = () => {
      const t = pendingInputAt.current;
      if (t !== null) {
        const sample = performance.now() - t;
        pendingInputAt.current = null;
        smoothedLag.current = smoothedLag.current * 0.8 + sample * 0.2;
        setLagMs(smoothedLag.current);
      }
      if (isDown.current) {
        setActiveFps(getFps());
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointerdown', onDown, opts);
      window.removeEventListener('pointermove', onMove, opts);
      window.removeEventListener('pointerup', onUp, opts);
      window.removeEventListener('pointercancel', onUp, opts);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  const isLight = theme === 'light';
  const resting = !isDown.current;
  const showFull = fullDebug !== undefined ? fullDebug || isExpanded : isExpanded;

  const handleToggle = () => {
    if (onToggleFullDebug) {
      onToggleFullDebug();
    }
    setIsExpanded((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('remix3d_pro_debug_mode', String(next));
      } catch {}
      return next;
    });
  };

  return (
    <div
      style={{
        transform: uiScale !== 1.0 ? `scale(${uiScale})` : undefined,
        transformOrigin: 'bottom left',
      }}
      className="fixed bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 pointer-events-auto select-none"
    >
      <button
        type="button"
        onClick={handleToggle}
        title={showFull ? 'Click to collapse debug mode' : 'Click to show full input lag & FPS debug mode'}
        className={`text-left rounded-xl font-mono text-[10px] transition-all shadow-md active:scale-95 border cursor-pointer ${
          isLight
            ? 'bg-white/95 border-neutral-200 text-neutral-800 shadow-neutral-300/60 hover:bg-neutral-50'
            : 'bg-[#18191d]/95 border-neutral-800 text-neutral-200 shadow-black/80 hover:bg-[#202126]'
        } ${showFull ? 'p-2.5 min-w-[130px]' : 'px-2 py-1'}`}
      >
        {showFull ? (
          <div className="flex flex-col gap-1 leading-tight">
            <div className="flex items-center justify-between pb-1 mb-0.5 border-b border-neutral-200 dark:border-neutral-800/80">
              <span className="text-[9px] font-semibold tracking-wider uppercase opacity-60">PRO DEBUG</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <span className="opacity-60">now</span>
              <div className="flex items-baseline gap-1">
                <span className={`font-bold tabular-nums ${resting ? 'opacity-60' : ''}`}>{fps}</span>
                <span className="opacity-50 text-[9px]">{resting ? 'fps · resting' : 'fps'}</span>
              </div>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <span className="opacity-60">draw</span>
              <div className="flex items-baseline gap-1">
                <span className="font-bold tabular-nums">{activeFps || '--'}</span>
                <span className="opacity-50 text-[9px]">fps</span>
              </div>
            </div>
            <div className="flex items-baseline justify-between gap-3 text-sky-500 dark:text-sky-400">
              <span className="font-semibold opacity-90">lag</span>
              <div className="flex items-baseline gap-1">
                <span className="font-bold tabular-nums">{lagMs ? lagMs.toFixed(0) : '--'}</span>
                <span className="opacity-70 text-[9px]">ms (input)</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold tabular-nums">{fps} FPS</span>
            <span className="opacity-30">·</span>
            <span className="text-sky-500 dark:text-sky-400 tabular-nums">
              {lagMs ? `${lagMs.toFixed(0)}ms` : 'idle'}
            </span>
          </div>
        )}
      </button>
    </div>
  );
};

export const FpsCounter = React.memo(FpsCounterComponent);
