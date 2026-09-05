import React, { useEffect, useRef, useState } from 'react';
import { PenLine, Square, Eraser, Spline, ChevronRight } from 'lucide-react';
import { ToolType, BrushSettings } from '../../types';
import { PLAY_BRUSHES } from '../../presets/playTiers';
import { applyBrushPresetToSettings, DEFAULT_BRUSH_PRESETS } from '../../presets/brushPresets';
import { haptics } from '../../utils/haptics';
import { StudioEngine } from '../../core/studioEngine';

export type PlayToolId = 'draw' | 'shape' | 'eraser';
interface PlayDockProps { tool: ToolType; brushSettings: BrushSettings; setBrushSettings: React.Dispatch<React.SetStateAction<BrushSettings>>; shapeSnapping: boolean; onSelect: (id: PlayToolId) => void; onOpenFullColor?: () => void; engine?: StudioEngine | null; theme?: 'light' | 'dark'; }
const TOOLS = [{ id: 'draw' as const, label: 'Draw', icon: PenLine }, { id: 'shape' as const, label: 'Shape', icon: Square }, { id: 'eraser' as const, label: 'Erase', icon: Eraser }];
const COLORS = ['#f47c38', '#e9e7e1', '#67d7f5', '#ef6a73', '#98d46b', '#7c73e6', '#272a30', '#ffffff'];
const SIZES = [0.015, 0.035, 0.07, 0.13];

export function activePlayTool(tool: ToolType, shapeSnapping: boolean): PlayToolId { if (tool === 'eraser') return 'eraser'; return shapeSnapping ? 'shape' : 'draw'; }
export function playToolSettings(id: PlayToolId): { tool: ToolType; patch: Partial<BrushSettings> } { if (id === 'eraser') return { tool: 'eraser', patch: { eraserMode: 'vacuum', shapeSnapping: false } }; return { tool: 'brush', patch: { shapeSnapping: id === 'shape', straightLineMode: false } }; }

export const PlayDock: React.FC<PlayDockProps> = ({
  tool,
  brushSettings,
  setBrushSettings,
  shapeSnapping,
  onSelect,
  onOpenFullColor,
  theme = 'dark',
}) => {
  const active = activePlayTool(tool, shapeSnapping);
  const [panel, setPanel] = useState<'color' | 'size' | 'profile' | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const light = theme === 'light';
  const shell = light
    ? 'bg-white/95 border-black/10 text-neutral-800'
    : 'bg-[#111317]/95 border-white/10 text-white/85';
  const floatingInk = light ? 'text-neutral-800' : 'text-white/85';

  const [isPortrait, setIsPortrait] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.innerHeight > window.innerWidth;
  });

  useEffect(() => {
    const updateOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    window.addEventListener('resize', updateOrientation);
    window.addEventListener('orientationchange', updateOrientation);

    if (window.screen?.orientation) {
      window.screen.orientation.addEventListener('change', updateOrientation);
    }

    return () => {
      window.removeEventListener('resize', updateOrientation);
      window.removeEventListener('orientationchange', updateOrientation);
      if (window.screen?.orientation) {
        window.screen.orientation.removeEventListener('change', updateOrientation);
      }
    };
  }, []);

  useEffect(() => {
    const close = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setPanel(null);
    };
    window.addEventListener('pointerdown', close);
    return () => window.removeEventListener('pointerdown', close);
  }, []);

  const chooseProfile = () => {
    const index = Math.max(0, PLAY_BRUSHES.indexOf(brushSettings.brushPresetId || ''));
    const id = PLAY_BRUSHES[(index + 1) % PLAY_BRUSHES.length];
    const preset = DEFAULT_BRUSH_PRESETS.find((p) => p.id === id);
    if (preset) {
      setBrushSettings((prev) => ({ ...applyBrushPresetToSettings(preset, prev), brushPresetId: id }));
    }
  };

  return (
    <div ref={root} className="fixed inset-0 z-30 pointer-events-none select-none">
      {isPortrait ? (
        /* PORTRAIT ORIENTATION: Unified vertical toolbar on the left side */
        <div
          className={`pr-surface paperrocket-toolbar-surface pointer-events-auto absolute left-3 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 rounded-2xl border p-1.5 shadow-xl sm:left-5 ${shell}`}
        >
          {/* Tool mode buttons: Draw, Shape, Erase */}
          {TOOLS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                haptics.trigger('light');
                onSelect(id);
                setPanel(null);
              }}
              title={label}
              className={`relative flex h-11 w-11 items-center justify-center rounded-xl border transition-all active:scale-95 ${
                active === id
                  ? `${
                      light
                        ? 'border-sky-500/70 bg-black/[0.04] text-neutral-950'
                        : 'border-sky-400/70 bg-white/[0.06] text-white'
                    } shadow-[0_0_0_1px_rgba(56,189,248,0.1)]`
                  : 'border-transparent opacity-55 hover:opacity-95 hover:bg-white/[0.03]'
              }`}
              aria-label={label}
              aria-pressed={active === id}
            >
              <Icon className="h-[21px] w-[21px] shrink-0" strokeWidth={1.35} />
            </button>
          ))}

          {/* Divider */}
          <span className={`w-7 h-px my-0.5 ${light ? 'bg-black/10' : 'bg-white/10'}`} />

          {/* Color swatch button */}
          <button
            type="button"
            onClick={() => setPanel(panel === 'color' ? null : 'color')}
            className="w-11 h-11 rounded-xl grid place-items-center hover:bg-white/[0.04] active:scale-95 transition-all"
            aria-label="Color"
            title="Color"
          >
            <span
              className="w-7 h-7 rounded-full border border-current/25 ring-1 ring-inset ring-white/15"
              style={{ background: brushSettings.color || '#f47c38' }}
            />
          </button>

          {/* Stroke size button */}
          <button
            type="button"
            onClick={() => setPanel(panel === 'size' ? null : 'size')}
            className="w-11 h-11 rounded-xl grid place-items-center hover:bg-white/[0.04] active:scale-95 transition-all"
            aria-label="Stroke size"
            title="Stroke size"
          >
            <span className="w-7 h-7 rounded-full border border-current/20 grid place-items-center">
              <span
                className="rounded-full bg-current"
                style={{
                  width: Math.max(4, Math.min(12, brushSettings.size * 110)),
                  height: Math.max(4, Math.min(12, brushSettings.size * 110)),
                }}
              />
            </span>
          </button>

          {/* Brush profile button */}
          <button
            type="button"
            onClick={() => {
              chooseProfile();
              setPanel('profile');
            }}
            className="w-11 h-11 rounded-xl grid place-items-center hover:bg-white/[0.04] active:scale-95 transition-all"
            aria-label="Brush profile"
            title="Brush profile"
          >
            <Spline className="w-[21px] h-[21px]" strokeWidth={1.35} />
          </button>

          {/* Popout menu appearing to the RIGHT of the left rail */}
          {panel && (
            <div
              className={`pr-surface absolute left-full ml-3 top-1/2 -translate-y-1/2 rounded-2xl border p-2.5 shadow-2xl z-50 ${shell}`}
            >
              {panel === 'color' && (
                <div className="flex flex-col gap-2">
                  <div className="grid grid-cols-4 gap-2">
                    {COLORS.map((color) => (
                      <button
                        key={color}
                        onClick={() => {
                          setBrushSettings((p) => ({ ...p, color }));
                          setPanel(null);
                        }}
                        className="w-9 h-9 rounded-full border border-white/20 active:scale-90 transition-transform"
                        style={{ background: color }}
                        aria-label={`Use ${color}`}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setPanel(null);
                      onOpenFullColor?.();
                    }}
                    className="w-full h-8 rounded-lg border border-white/15 flex items-center justify-center gap-1.5 text-xs font-medium hover:bg-white/10 active:scale-95 transition-all"
                    aria-label="More colors"
                  >
                    <span>More colors</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </button>
                </div>
              )}

              {panel === 'size' && (
                <div className="flex flex-col gap-2 items-center">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setBrushSettings((p) => ({ ...p, size }));
                        setPanel(null);
                      }}
                      className="w-11 h-11 grid place-items-center rounded-full border border-white/15 active:scale-90 transition-transform"
                      aria-label={`Stroke size ${size}`}
                    >
                      <span
                        className="rounded-full bg-current"
                        style={{
                          width: Math.max(4, size * 160),
                          height: Math.max(4, size * 160),
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}

              {panel === 'profile' && (
                <span className="px-3 h-8 flex items-center text-xs whitespace-nowrap">
                  Brush profile changed
                </span>
              )}
            </div>
          )}
        </div>
      ) : (
        /* LANDSCAPE ORIENTATION: Tools on left, properties dock at bottom center */
        <>
          <div
            className={`pointer-events-auto absolute left-3 top-1/2 -translate-y-1/2 flex flex-col gap-3 sm:left-5 ${floatingInk}`}
          >
            {TOOLS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  haptics.trigger('light');
                  onSelect(id);
                  setPanel(null);
                }}
                title={label}
                className={`relative flex h-12 w-12 items-center justify-center rounded-xl border transition-all active:scale-95 ${
                  active === id
                    ? `${
                        light
                          ? 'border-sky-500/70 bg-black/[0.035] text-neutral-950'
                          : 'border-sky-400/70 bg-white/[0.045] text-white'
                      } shadow-[0_0_0_1px_rgba(56,189,248,0.08)]`
                    : 'border-transparent opacity-50 hover:opacity-90 hover:bg-white/[0.025]'
                }`}
                aria-label={label}
                aria-pressed={active === id}
              >
                <Icon className="h-[23px] w-[23px] shrink-0" strokeWidth={1.35} />
              </button>
            ))}
          </div>

          <div
            className={`pr-surface paperrocket-toolbar-surface pointer-events-auto absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center rounded-xl border p-1 shadow-lg sm:bottom-5 ${shell}`}
          >
            <button
              type="button"
              onClick={() => setPanel(panel === 'color' ? null : 'color')}
              className="w-11 h-11 rounded-lg grid place-items-center"
              aria-label="Color"
            >
              <span
                className="w-7 h-7 rounded-full border border-current/25 ring-1 ring-inset ring-white/15"
                style={{ background: brushSettings.color || '#f47c38' }}
              />
            </button>
            <span className={`h-7 w-px ${light ? 'bg-black/10' : 'bg-white/10'}`} />
            <button
              type="button"
              onClick={() => setPanel(panel === 'size' ? null : 'size')}
              className="w-11 h-11 rounded-lg grid place-items-center"
              aria-label="Stroke size"
            >
              <span className="w-7 h-7 rounded-full border border-current/20 grid place-items-center">
                <span
                  className="rounded-full bg-current"
                  style={{
                    width: Math.max(4, Math.min(12, brushSettings.size * 110)),
                    height: Math.max(4, Math.min(12, brushSettings.size * 110)),
                  }}
                />
              </span>
            </button>
            <span className={`h-7 w-px ${light ? 'bg-black/10' : 'bg-white/10'}`} />
            <button
              type="button"
              onClick={() => {
                chooseProfile();
                setPanel('profile');
              }}
              className="w-11 h-11 rounded-lg grid place-items-center"
              aria-label="Brush profile"
            >
              <Spline className="w-[23px] h-[23px]" strokeWidth={1.35} />
            </button>

            {panel && (
              <div
                className={`pr-surface absolute bottom-full mb-2 left-1/2 -translate-x-1/2 flex gap-2 rounded-lg border p-2 ${shell}`}
              >
                {panel === 'color' && (
                  <>
                    {COLORS.map((color) => (
                      <button
                        key={color}
                        onClick={() => {
                          setBrushSettings((p) => ({ ...p, color }));
                          setPanel(null);
                        }}
                        className="w-10 h-10 rounded-full border border-white/20"
                        style={{ background: color }}
                        aria-label={`Use ${color}`}
                      />
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        setPanel(null);
                        onOpenFullColor?.();
                      }}
                      className="relative -mr-4 w-9 h-10 rounded-r-full border border-l-0 border-white/15 grid place-items-center"
                      aria-label="More colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}
                {panel === 'size' &&
                  SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setBrushSettings((p) => ({ ...p, size }));
                        setPanel(null);
                      }}
                      className="w-11 h-11 grid place-items-center rounded-full border border-white/15"
                      aria-label={`Stroke size ${size}`}
                    >
                      <span
                        className="rounded-full bg-current"
                        style={{ width: Math.max(4, size * 160), height: Math.max(4, size * 160) }}
                      />
                    </button>
                  ))}
                {panel === 'profile' && (
                  <span className="px-3 h-10 flex items-center text-xs whitespace-nowrap">
                    Brush profile changed
                  </span>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
