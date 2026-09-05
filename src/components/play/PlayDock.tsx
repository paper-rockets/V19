import React, { useEffect, useRef, useState } from 'react';
import { PenLine, Square, Eraser, ChevronRight, Star } from 'lucide-react';
import { ToolType, BrushSettings } from '../../types';
import {
  SCULPT_BRUSHES,
  getActiveCuratedBrush,
  applyCuratedBrush,
  getBrushesForTab,
  BrushCategoryTab,
} from '../../presets/curatedBrushes';
import { haptics } from '../../utils/haptics';
import { StudioEngine } from '../../core/studioEngine';
import { useDismissibleSurface } from '../../hooks/useDismissibleSurface';

export type PlayToolId = 'draw' | 'shape' | 'eraser';

interface PlayDockProps {
  tool: ToolType;
  brushSettings: BrushSettings;
  setBrushSettings: React.Dispatch<React.SetStateAction<BrushSettings>>;
  shapeSnapping: boolean;
  onSelect: (id: PlayToolId) => void;
  onOpenFullColor?: () => void;
  engine?: StudioEngine | null;
  theme?: 'light' | 'dark';
  hideToolRail?: boolean;
}

const TOOLS = [
  { id: 'draw' as const, label: 'Draw', icon: PenLine },
  { id: 'shape' as const, label: 'Shape', icon: Square },
  { id: 'eraser' as const, label: 'Erase', icon: Eraser },
];

const COLORS = ['#2563eb', '#38bdf8', '#ef4444', '#f59e0b', '#10b981', '#a855f7', '#18191d', '#ffffff'];

const SIZE_PRESETS = [
  { value: 0.015, label: 'S', scale: 0.6, name: 'Fine' },
  { value: 0.035, label: 'M', scale: 0.8, name: 'Medium' },
  { value: 0.07, label: 'L', scale: 1.0, name: 'Bold' },
  { value: 0.12, label: 'XL', scale: 1.25, name: 'Heavy' },
];

export function activePlayTool(tool: ToolType, shapeSnapping: boolean): PlayToolId {
  if (tool === 'eraser') return 'eraser';
  return shapeSnapping ? 'shape' : 'draw';
}

export function playToolSettings(id: PlayToolId): { tool: ToolType; patch: Partial<BrushSettings> } {
  if (id === 'eraser') return { tool: 'eraser', patch: { eraserMode: 'vacuum', shapeSnapping: false } };
  return { tool: 'brush', patch: { shapeSnapping: id === 'shape', straightLineMode: false } };
}

export const PlayDock: React.FC<PlayDockProps> = ({
  tool,
  brushSettings,
  setBrushSettings,
  shapeSnapping,
  onSelect,
  onOpenFullColor,
  theme = 'dark',
  hideToolRail = false,
}) => {
  const active = activePlayTool(tool, shapeSnapping);
  const [panel, setPanel] = useState<'color' | 'size' | 'brush' | null>(null);
  const [activeTab, setActiveTab] = useState<BrushCategoryTab>('Sculpt');
  const root = useRef<HTMLDivElement>(null);

  const activeBrush = getActiveCuratedBrush(brushSettings);
  const displayedBrushes = getBrushesForTab(activeTab);

  const isConformal = brushSettings.drawingMode !== 'spatial_3d' && tool !== 'free_brush';
  const isFlat = brushSettings.profile === 'ribbon' || brushSettings.profile === 'conformal';

  const checkIsCompressed = () => {
    if (typeof window === 'undefined') return false;
    return window.innerHeight > window.innerWidth || window.innerWidth < 800;
  };

  const [isCompressed, setIsCompressed] = useState<boolean>(checkIsCompressed);

  useEffect(() => {
    const updateOrientation = () => {
      setIsCompressed(checkIsCompressed());
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

  const isLight = theme === 'light';

  useDismissibleSurface({
    isOpen: panel !== null,
    onClose: () => setPanel(null),
    surfaceRef: root,
  });

  const railClasses = isLight
    ? 'border-black/15 bg-[#f7f4ee]/98 shadow-[0_12px_36px_rgba(35,28,20,0.12)] text-neutral-800'
    : 'border-white/[0.08] bg-[#121316]/95 shadow-2xl text-white';
  const dockClasses = isLight
    ? 'border-black/15 bg-[#f7f4ee]/98 shadow-[0_12px_36px_rgba(35,28,20,0.12)] text-neutral-800'
    : 'border-white/[0.08] bg-[#121316]/95 shadow-2xl text-white';
  const popoverClasses = isLight
    ? 'border-black/15 bg-[#f7f4ee]/98 shadow-[0_20px_50px_rgba(35,28,20,0.16)] text-neutral-900'
    : 'border-white/[0.08] bg-[#131518]/96 shadow-2xl text-white';
  const dividerClasses = isLight ? 'bg-black/10' : 'bg-white/10';
  const subTextClasses = isLight ? 'text-neutral-600' : 'text-white/70';
  const sliderTrackClasses = isLight ? 'bg-black/15' : 'bg-white/20';
  const grabHandleClasses = isLight ? 'bg-black/20' : 'bg-white/20';
  const cardBorderClasses = isLight ? 'border-black/10' : 'border-white/[0.08]';

  // Brush size integer for display (matching the "56" in the mockup)
  const displaySizeNumber = Math.round(((brushSettings.size - 0.008) / (0.16 - 0.008)) * 90 + 10);
  const displayStrengthNumber = Math.round((brushSettings.opacity ?? 1.0) * 100);

  return (
    <div ref={root} className="fixed inset-0 z-30 pointer-events-none select-none">
      {isCompressed && !hideToolRail ? (
        /* ================= COMPRESSED / PORTRAIT ORIENTATION: Left tool rail ================= */
        <div
          className={`pointer-events-auto absolute left-3 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 rounded-2xl border p-1.5 sm:left-5 ${railClasses}`}
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
                  ? isLight
                    ? 'border-sky-600/70 bg-black/[0.04] text-neutral-950 shadow-xs'
                    : 'border-sky-400/80 bg-white/[0.08] text-white shadow-[0_0_8px_rgba(56,189,248,0.15)]'
                  : isLight
                  ? 'border-transparent text-neutral-500 hover:text-neutral-950 hover:bg-black/[0.03]'
                  : 'border-transparent text-white/50 hover:text-white/90 hover:bg-white/[0.04]'
              }`}
              aria-label={label}
              aria-pressed={active === id}
            >
              <Icon className="h-[21px] w-[21px] shrink-0" strokeWidth={1.4} />
            </button>
          ))}

          {/* Divider */}
          <span className={`w-7 h-px my-0.5 ${dividerClasses}`} />

          {/* Color swatch disc */}
          <button
            type="button"
            onClick={() => setPanel(panel === 'color' ? null : 'color')}
            className={`w-11 h-11 rounded-xl grid place-items-center active:scale-95 transition-all ${
              panel === 'color' ? (isLight ? 'bg-black/[0.06]' : 'bg-white/[0.08]') : (isLight ? 'hover:bg-black/[0.03]' : 'hover:bg-white/[0.05]')
            }`}
            aria-label="Color"
            title="Color"
          >
            <span
              className="w-7 h-7 rounded-full border border-black/10 dark:border-white/20 shadow-md ring-1 ring-inset ring-black/5 dark:ring-white/20"
              style={{ background: brushSettings.color || '#38bdf8' }}
            />
          </button>

          {/* Size button - Sleek concentric target circle from mockup */}
          <button
            type="button"
            onClick={() => setPanel(panel === 'size' ? null : 'size')}
            className={`w-11 h-11 rounded-xl flex items-center justify-center active:scale-95 transition-all border ${
              panel === 'size'
                ? isLight
                  ? 'border-sky-600/80 bg-sky-600/10 text-neutral-950'
                  : 'border-sky-400/80 bg-sky-500/[0.12] text-white'
                : isLight
                ? 'border-black/10 bg-black/[0.02] text-neutral-600 hover:text-neutral-950'
                : 'border-white/[0.08] bg-white/[0.02] text-white/75 hover:text-white'
            }`}
            aria-label="Stroke size"
            title={`Size: ${activeBrush.name}`}
          >
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isLight ? 'border-neutral-400' : 'border-white/40'}`}>
              <span
                className={`rounded-full transition-all ${isLight ? 'bg-neutral-900' : 'bg-white'}`}
                style={{
                  width: Math.max(4, Math.min(10, brushSettings.size * 100)),
                  height: Math.max(4, Math.min(10, brushSettings.size * 100)),
                }}
              />
            </div>
          </button>

          {/* Brushes button - Sleek spline wave curve from mockup */}
          <button
            type="button"
            onClick={() => setPanel(panel === 'brush' ? null : 'brush')}
            className={`w-11 h-11 rounded-xl flex items-center justify-center active:scale-95 transition-all border ${
              panel === 'brush'
                ? isLight
                  ? 'border-sky-600/80 bg-sky-600/10 text-neutral-950'
                  : 'border-sky-400/80 bg-sky-500/[0.12] text-white'
                : isLight
                ? 'border-black/10 bg-black/[0.02] text-neutral-600 hover:text-neutral-950'
                : 'border-white/[0.08] bg-white/[0.02] text-white/75 hover:text-white'
            }`}
            aria-label="Brushes"
            title={`Brush: ${activeBrush.name}`}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none">
              <path d="M 4 14 Q 8 6, 12 12 T 20 10" strokeWidth={1.6} strokeLinecap="round" />
            </svg>
          </button>

          {/* Divider */}
          <span className={`w-7 h-px my-0.5 ${dividerClasses}`} />

          {/* Palette Confirmation (Portrait) */}
          <div className="flex flex-col items-center gap-1">
            <button
              type="button"
              onClick={() => {
                haptics.trigger('light');
                setBrushSettings((p) => ({
                  ...p,
                  drawingMode: p.drawingMode === 'spatial_3d' ? 'surface' : 'spatial_3d',
                }));
              }}
              className={`px-1.5 py-0.5 rounded-md border text-[9px] font-bold tracking-tight transition-all active:scale-95 ${
                isConformal
                  ? isLight
                    ? 'bg-sky-50 text-sky-700 border-sky-300'
                    : 'bg-sky-500/20 text-sky-300 border-sky-400/40'
                  : isLight
                  ? 'bg-amber-50 text-amber-700 border-amber-300'
                  : 'bg-amber-500/20 text-amber-300 border-amber-400/40'
              }`}
              title={isConformal ? 'Conformal (Surface). Tap to switch to Non-Conformal.' : 'Non-Conformal (Mid-Air). Tap to switch to Conformal.'}
            >
              {isConformal ? 'Conf' : 'Non-C'}
            </button>
            <button
              type="button"
              onClick={() => {
                haptics.trigger('light');
                setBrushSettings((p) => ({
                  ...p,
                  profile: (p.profile === 'ribbon' || p.profile === 'conformal') ? 'tube' : 'ribbon',
                }));
              }}
              className={`px-1.5 py-0.5 rounded-md border text-[9px] font-bold tracking-tight transition-all active:scale-95 ${
                isFlat
                  ? isLight
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                  : isLight
                  ? 'bg-purple-50 text-purple-700 border-purple-300'
                  : 'bg-purple-500/20 text-purple-300 border-purple-400/40'
              }`}
              title={isFlat ? 'Flat (Ribbon). Tap to switch to Not Flat (Tube).' : 'Not Flat (Tube). Tap to switch to Flat (Ribbon).'}
            >
              {isFlat ? 'Flat' : '3D'}
            </button>
          </div>

          {/* Popout menu appearing to the RIGHT in portrait */}
          {panel && (
            <div
              className={`absolute left-full ml-3 top-1/2 -translate-y-1/2 rounded-2xl border p-3.5 z-50 select-none animate-in fade-in slide-in-from-left-2 duration-150 ${popoverClasses} ${
                panel === 'color'
                  ? 'w-[190px]'
                  : panel === 'size'
                  ? 'w-[250px] max-w-[calc(100vw-88px)]'
                  : 'w-[300px] max-w-[calc(100vw-88px)]'
              }`}
            >
              {/* Top grab handle */}
              <div className={`w-8 h-1 rounded-full mx-auto mb-3 ${grabHandleClasses}`} />

              {/* Color Panel */}
              {panel === 'color' && (
                <div className="flex flex-col gap-2.5">
                  <div className="grid grid-cols-4 gap-2">
                    {COLORS.map((color) => (
                      <button
                        key={color}
                        onClick={() => {
                          setBrushSettings((p) => ({ ...p, color }));
                          setPanel(null);
                        }}
                        className="w-8 h-8 rounded-full border border-white/20 active:scale-90 transition-transform shadow-sm"
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
                    className="w-full h-8 rounded-lg border border-white/10 flex items-center justify-center gap-1.5 text-xs font-medium text-white/80 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
                  >
                    <span>More colors</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </button>
                </div>
              )}

              {/* Size Selector Panel - Knows active brush & renders its 3D clay mark at each size */}
              {panel === 'size' && (
                <div className="flex flex-col gap-3 w-full">
                  {/* Header: Active Brush in hand */}
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-black/40 border border-white/[0.08] flex items-center justify-center overflow-hidden">
                        <img
                          src={activeBrush.iconUrl}
                          alt={activeBrush.name}
                          className="w-6 h-6 object-contain pointer-events-none"
                        />
                      </div>
                      <span className="text-xs font-semibold text-white/95">{activeBrush.name}</span>
                    </div>
                    <span className="text-xs font-mono text-sky-400 font-semibold">{displaySizeNumber}</span>
                  </div>

                  {/* Size options rendering active brush's 3D sculpt mark */}
                  <div className="grid grid-cols-2 gap-2">
                    {SIZE_PRESETS.map(({ value, label, scale, name }) => {
                      const isSelected = Math.abs(brushSettings.size - value) < 0.012;
                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() => {
                            haptics.trigger('light');
                            setBrushSettings((p) => ({ ...p, size: value }));
                            setPanel(null);
                          }}
                          className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all active:scale-95 ${
                            isSelected
                              ? 'border-sky-400 bg-sky-500/[0.12] text-white shadow-[0_0_12px_rgba(56,189,248,0.25)] ring-1 ring-sky-400/60'
                              : 'border-white/[0.06] bg-[#18191e] hover:border-white/20 text-white/80'
                          }`}
                          title={`${name} size`}
                        >
                          <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
                            <img
                              src={activeBrush.iconUrl}
                              alt={activeBrush.name}
                              className="object-contain pointer-events-none"
                              style={{
                                width: `${Math.round(36 * scale)}px`,
                                height: `${Math.round(36 * scale)}px`,
                              }}
                            />
                          </div>
                          <span className="text-[10px] font-semibold tracking-wide text-white/75">{label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Size fine slider matching the mockup */}
                  <div className="pt-2 border-t border-white/[0.08] flex flex-col gap-1.5">
                    <div className="flex justify-between text-[11px] text-white/70">
                      <span>Brush Size</span>
                      <span className="font-mono text-white/95">{displaySizeNumber}</span>
                    </div>
                    <input
                      type="range"
                      min="0.008"
                      max="0.16"
                      step="0.002"
                      value={brushSettings.size}
                      onChange={(e) => {
                        setBrushSettings((p) => ({ ...p, size: parseFloat(e.target.value) }));
                      }}
                      className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-sky-400"
                    />
                  </div>
                </div>
              )}

              {/* Brushes Panel - Exact Design Language from Image 1 */}
              {panel === 'brush' && (
                <div className="flex flex-col gap-3 w-full">
                  {/* Header Title & Category Tabs */}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-semibold tracking-tight text-white/95">Brushes</h3>
                    <div className="flex items-center gap-4 text-xs font-medium border-b border-white/[0.08] pb-1.5">
                      {(['Favorites', 'Sculpt', 'Surface', 'Polish'] as BrushCategoryTab[]).map((tab) => {
                        const isTabActive = activeTab === tab;
                        return (
                          <button
                            key={tab}
                            type="button"
                            onClick={() => setActiveTab(tab)}
                            className={`transition-colors relative pb-1 ${
                              isTabActive ? 'text-sky-400 font-semibold' : 'text-white/40 hover:text-white/75'
                            }`}
                          >
                            {tab}
                            {isTabActive && (
                              <span className="absolute bottom-[-7px] left-0 right-0 h-[2px] bg-sky-400 rounded-full shadow-[0_0_6px_rgba(56,189,248,0.5)]" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 4x2 Grid of 3D Sculpt Brushes */}
                  <div className="grid grid-cols-4 gap-2 py-1">
                    {displayedBrushes.map((preset) => {
                      const isSelected = activeBrush.id === preset.id;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => {
                            haptics.trigger('medium');
                            setBrushSettings((prev) => applyCuratedBrush(preset, prev));
                          }}
                          className={`relative rounded-xl p-1.5 flex flex-col items-center justify-between transition-all active:scale-95 aspect-[4/5] border ${
                            isSelected
                              ? 'border-sky-400/90 bg-sky-500/[0.12] shadow-[0_0_12px_rgba(56,189,248,0.25)] ring-1 ring-sky-400/70'
                              : 'border-white/[0.06] bg-[#18191e] hover:border-white/20 hover:bg-[#1f2127]'
                          }`}
                          title={preset.description}
                        >
                          {/* Active Cyan Star */}
                          {isSelected && (
                            <Star className="w-2.5 h-2.5 text-sky-400 fill-sky-400 absolute top-1.5 right-1.5" />
                          )}

                          {/* 3D Clay Thumbnail */}
                          <div className="w-full flex-1 flex items-center justify-center p-0.5 overflow-hidden">
                            <img
                              src={preset.iconUrl}
                              alt={preset.name}
                              className="w-10 h-10 object-contain pointer-events-none"
                            />
                          </div>

                          {/* Label */}
                          <span
                            className={`text-[10px] truncate w-full text-center leading-tight pb-0.5 ${
                              isSelected ? 'text-white font-semibold' : 'text-white/70'
                            }`}
                          >
                            {preset.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Bottom Sliders & Falloff (matching Image 1) */}
                  <div className="pt-2 border-t border-white/[0.08] flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 flex flex-col gap-0.5">
                        <div className="flex justify-between text-[10px] text-white/70">
                          <span>Size</span>
                          <span className="font-mono text-white/90">{displaySizeNumber}</span>
                        </div>
                        <input
                          type="range"
                          min="0.008"
                          max="0.16"
                          step="0.002"
                          value={brushSettings.size}
                          onChange={(e) => setBrushSettings((p) => ({ ...p, size: parseFloat(e.target.value) }))}
                          className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-sky-400"
                        />
                      </div>
                      <div className="flex-1 flex flex-col gap-0.5">
                        <div className="flex justify-between text-[10px] text-white/70">
                          <span>Strength</span>
                          <span className="font-mono text-white/90">{displayStrengthNumber}</span>
                        </div>
                        <input
                          type="range"
                          min="0.05"
                          max="1.0"
                          step="0.02"
                          value={brushSettings.opacity ?? 1.0}
                          onChange={(e) => setBrushSettings((p) => ({ ...p, opacity: parseFloat(e.target.value) }))}
                          className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-sky-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* ================= LANDSCAPE ORIENTATION: Bottom Dock matching Image 1 & 2 ================= */
        <>
          {/* Left Vertical Tools */}
          {!hideToolRail && (
            <div
              className={`pointer-events-auto absolute left-3 top-1/2 -translate-y-1/2 flex flex-col gap-3 sm:left-5 ${isLight ? 'text-neutral-800' : 'text-white/85'}`}
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
                      ? isLight
                        ? 'border-sky-600/70 bg-black/[0.04] text-neutral-950 shadow-xs'
                        : 'border-sky-400/80 bg-white/[0.06] text-white shadow-[0_0_8px_rgba(56,189,248,0.12)]'
                      : isLight
                      ? 'border-transparent text-neutral-500 hover:text-neutral-950 hover:bg-black/[0.03]'
                      : 'border-transparent opacity-50 hover:opacity-95 hover:bg-white/[0.03]'
                  }`}
                  aria-label={label}
                  aria-pressed={active === id}
                >
                  <Icon className="h-[23px] w-[23px] shrink-0" strokeWidth={1.4} />
                </button>
              ))}
            </div>
          )}

          {/* Bottom Dock Bar (matching Image 2) */}
          <div
            className={`pointer-events-auto absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 rounded-2xl border px-3 py-2 sm:bottom-5 ${dockClasses}`}
          >
            {/* 3 Buttons: Color, Size, Profile */}
            <div className="flex items-center gap-2">
              {/* Color Swatch Disc */}
              <button
                type="button"
                onClick={() => setPanel(panel === 'color' ? null : 'color')}
                className={`w-9 h-9 rounded-xl grid place-items-center active:scale-95 transition-all ${
                  panel === 'color' ? (isLight ? 'bg-black/[0.06]' : 'bg-white/[0.08]') : (isLight ? 'hover:bg-black/[0.03]' : 'hover:bg-white/[0.05]')
                }`}
                aria-label="Color"
                title="Color"
              >
                <span
                  className="w-6 h-6 rounded-full border border-black/10 dark:border-white/20 shadow-sm ring-1 ring-inset ring-black/5 dark:ring-white/20"
                  style={{ background: brushSettings.color || '#38bdf8' }}
                />
              </button>

              {/* Size Button - Concentric Target Circle from Image 2 */}
              <button
                type="button"
                onClick={() => setPanel(panel === 'size' ? null : 'size')}
                className={`w-9 h-9 rounded-xl flex items-center justify-center active:scale-95 transition-all border ${
                  panel === 'size'
                    ? isLight
                      ? 'border-sky-600/80 bg-sky-600/10 text-neutral-950'
                      : 'border-sky-400/80 bg-sky-500/[0.12] text-white'
                    : isLight
                    ? 'border-black/10 bg-black/[0.02] text-neutral-600 hover:text-neutral-950'
                    : 'border-white/[0.08] bg-white/[0.02] text-white/75 hover:text-white'
                }`}
                aria-label="Stroke size"
                title={`Size: ${activeBrush.name}`}
              >
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isLight ? 'border-neutral-400' : 'border-white/40'}`}>
                  <span
                    className={`rounded-full transition-all ${isLight ? 'bg-neutral-900' : 'bg-white'}`}
                    style={{
                      width: Math.max(3.5, Math.min(8.5, brushSettings.size * 80)),
                      height: Math.max(3.5, Math.min(8.5, brushSettings.size * 80)),
                    }}
                  />
                </div>
              </button>

              {/* Brushes Button - Sleek single spline wave from Image 2 */}
              <button
                type="button"
                onClick={() => setPanel(panel === 'brush' ? null : 'brush')}
                className={`w-9 h-9 rounded-xl flex items-center justify-center active:scale-95 transition-all border ${
                  panel === 'brush'
                    ? isLight
                      ? 'border-sky-600/80 bg-sky-600/10 text-neutral-950'
                      : 'border-sky-400/80 bg-sky-500/[0.12] text-white'
                    : isLight
                    ? 'border-black/10 bg-black/[0.02] text-neutral-600 hover:text-neutral-950'
                    : 'border-white/[0.08] bg-white/[0.02] text-white/75 hover:text-white'
                }`}
                aria-label="Brushes"
                title={`Brush: ${activeBrush.name}`}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none">
                  <path d="M 4 14 Q 8 6, 12 12 T 20 10" strokeWidth={1.6} strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Vertical Separator */}
            <span className={`h-6 w-px ${dividerClasses}`} />

            {/* Current Palette Type Confirmation: Conformal / Non-Conformal & Flat / Not Flat */}
            <div
              className={`flex items-center gap-1.5 px-2 py-1 rounded-xl border text-[11px] font-semibold transition-all ${
                isLight
                  ? 'border-black/10 bg-black/[0.025] text-neutral-800'
                  : 'border-white/[0.08] bg-white/[0.035] text-white/90'
              }`}
              title={`Current Palette Type: ${isConformal ? 'Conformal (Surface Snapping)' : 'Non-Conformal (3D Mid-Air)'} • ${isFlat ? 'Flat (Ribbon Band)' : 'Not Flat (Round 3D Tube)'}`}
            >
              {/* Conformal indicator button */}
              <button
                type="button"
                onClick={() => {
                  haptics.trigger('light');
                  setBrushSettings((p) => ({
                    ...p,
                    drawingMode: p.drawingMode === 'spatial_3d' ? 'surface' : 'spatial_3d',
                  }));
                }}
                className={`px-2 py-0.5 rounded-lg border text-[11px] transition-all active:scale-95 cursor-pointer ${
                  isConformal
                    ? isLight
                      ? 'bg-sky-50 text-sky-700 border-sky-300 font-bold'
                      : 'bg-sky-500/20 text-sky-300 border-sky-400/40 font-bold'
                    : isLight
                    ? 'bg-amber-50 text-amber-700 border-amber-300 font-bold'
                    : 'bg-amber-500/20 text-amber-300 border-amber-400/40 font-bold'
                }`}
                title={isConformal ? 'Conformal: Hugs 3D surface. Click to switch to Non-Conformal.' : 'Non-Conformal: 3D Mid-Air. Click to switch to Conformal.'}
              >
                {isConformal ? 'Conformal' : 'Non-Conformal'}
              </button>

              <span className="text-[10px] opacity-35">•</span>

              {/* Flat indicator button */}
              <button
                type="button"
                onClick={() => {
                  haptics.trigger('light');
                  setBrushSettings((p) => ({
                    ...p,
                    profile: (p.profile === 'ribbon' || p.profile === 'conformal') ? 'tube' : 'ribbon',
                  }));
                }}
                className={`px-2 py-0.5 rounded-lg border text-[11px] transition-all active:scale-95 cursor-pointer ${
                  isFlat
                    ? isLight
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-bold'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40 font-bold'
                    : isLight
                    ? 'bg-purple-50 text-purple-700 border-purple-300 font-bold'
                    : 'bg-purple-500/20 text-purple-300 border-purple-400/40 font-bold'
                }`}
                title={isFlat ? 'Flat: Flat ribbon band. Click to switch to Not Flat (Round Tube).' : 'Not Flat: Round 3D tube. Click to switch to Flat (Ribbon).'}
              >
                {isFlat ? 'Flat' : 'Not Flat'}
              </button>
            </div>

            {/* Vertical Separator */}
            <span className={`hidden xl:block h-6 w-px ${dividerClasses}`} />

            {/* Quick Sliders from Image 2: Brush Size & Intensity */}
            <div className="hidden xl:flex items-center gap-4">
              {/* Brush Size Slider */}
              <div className="flex items-center gap-2.5">
                <span className={`text-[11px] font-medium whitespace-nowrap ${subTextClasses}`}>Brush Size</span>
                <span className={`text-[11px] font-mono w-5 text-right ${isLight ? 'text-neutral-900' : 'text-white/95'}`}>{displaySizeNumber}</span>
                <input
                  type="range"
                  min="0.008"
                  max="0.16"
                  step="0.002"
                  value={brushSettings.size}
                  onChange={(e) => setBrushSettings((p) => ({ ...p, size: parseFloat(e.target.value) }))}
                  className={`w-24 h-1 rounded-full appearance-none cursor-pointer accent-sky-400 ${sliderTrackClasses}`}
                />
              </div>

              {/* Vertical Separator */}
              <span className={`h-4 w-px ${dividerClasses}`} />

              {/* Intensity Slider */}
              <div className="flex items-center gap-2.5">
                <span className={`text-[11px] font-medium whitespace-nowrap ${subTextClasses}`}>Intensity</span>
                <span className={`text-[11px] font-mono w-5 text-right ${isLight ? 'text-neutral-900' : 'text-white/95'}`}>{displayStrengthNumber}</span>
                <input
                  type="range"
                  min="0.05"
                  max="1.0"
                  step="0.02"
                  value={brushSettings.opacity ?? 1.0}
                  onChange={(e) => setBrushSettings((p) => ({ ...p, opacity: parseFloat(e.target.value) }))}
                  className={`w-24 h-1 rounded-full appearance-none cursor-pointer accent-sky-400 ${sliderTrackClasses}`}
                />
              </div>
            </div>

            {/* Popout menu appearing ABOVE the bottom dock */}
            {panel && (
              <div
                className={`absolute bottom-full mb-3 left-1/2 -translate-x-1/2 rounded-2xl border p-4 z-50 select-none animate-in fade-in slide-in-from-bottom-2 duration-150 ${popoverClasses}`}
              >
                {/* Top grab handle */}
                <div className={`w-9 h-1 rounded-full mx-auto mb-3 ${grabHandleClasses}`} />

                {/* Color Panel */}
                {panel === 'color' && (
                  <div className="flex items-center gap-2">
                    {COLORS.map((color) => (
                      <button
                        key={color}
                        onClick={() => {
                          setBrushSettings((p) => ({ ...p, color }));
                          setPanel(null);
                        }}
                        className={`w-8 h-8 rounded-full border active:scale-90 transition-transform shadow-sm ${
                          isLight ? 'border-black/20' : 'border-white/20'
                        }`}
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
                      className={`w-8 h-8 rounded-xl border grid place-items-center transition-colors ${
                        isLight ? 'border-black/15 hover:bg-black/5 text-neutral-700' : 'border-white/15 hover:bg-white/10 text-white/70'
                      }`}
                      title="More colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Size Selector Panel */}
                {panel === 'size' && (
                  <div className="flex flex-col gap-3 min-w-[300px] max-w-[calc(100vw-24px)]">
                    <div className={`flex items-center justify-between pb-1.5 border-b ${isLight ? 'border-black/10' : 'border-white/[0.08]'}`}>
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center overflow-hidden border ${
                          isLight ? 'bg-black/5 border-black/10' : 'bg-black/40 border-white/[0.08]'
                        }`}>
                          <img
                            src={activeBrush.iconUrl}
                            alt={activeBrush.name}
                            className="w-6 h-6 object-contain pointer-events-none"
                          />
                        </div>
                        <span className={`text-xs font-semibold ${isLight ? 'text-neutral-900' : 'text-white/95'}`}>{activeBrush.name} Size</span>
                      </div>
                      <span className="text-xs font-mono text-sky-500 dark:text-sky-400 font-semibold">{displaySizeNumber}</span>
                    </div>

                    {/* S, M, L, XL sizes in a horizontal row showing active brush 3D mark */}
                    <div className="flex items-center gap-2 py-1">
                      {SIZE_PRESETS.map(({ value, label, scale, name }) => {
                        const isSelected = Math.abs(brushSettings.size - value) < 0.012;
                        return (
                          <button
                            key={value}
                            type="button"
                            onClick={() => {
                              haptics.trigger('light');
                              setBrushSettings((p) => ({ ...p, size: value }));
                              setPanel(null);
                            }}
                            className={`flex-1 p-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all active:scale-95 ${
                              isSelected
                                ? 'border-sky-500 dark:border-sky-400 bg-sky-500/[0.12] text-neutral-900 dark:text-white shadow-[0_0_12px_rgba(56,189,248,0.25)] ring-1 ring-sky-400/60'
                                : isLight
                                  ? 'border-black/10 bg-black/5 hover:border-black/20 text-neutral-700'
                                  : 'border-white/[0.06] bg-[#18191e] hover:border-white/20 text-white/80'
                            }`}
                            title={`${name} size`}
                          >
                            <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
                              <img
                                src={activeBrush.iconUrl}
                                alt={activeBrush.name}
                                className="object-contain pointer-events-none"
                                style={{
                                  width: `${Math.round(36 * scale)}px`,
                                  height: `${Math.round(36 * scale)}px`,
                                }}
                              />
                            </div>
                            <span className={`text-[10px] font-semibold ${isLight ? 'text-neutral-600' : 'text-white/75'}`}>{label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Brushes Panel - Exact Design from Image 1 */}
                {panel === 'brush' && (
                  <div className="flex flex-col gap-3 w-[560px] max-w-[calc(100vw-24px)]">
                    {/* Header Title & Category Tabs */}
                    <div className={`flex items-center justify-between border-b pb-2 ${isLight ? 'border-black/10' : 'border-white/[0.08]'}`}>
                      <h3 className={`text-sm font-semibold tracking-tight ${isLight ? 'text-neutral-900' : 'text-white/95'}`}>Brushes</h3>
                      <div className="flex items-center gap-3 sm:gap-5 text-xs font-medium">
                        {(['Favorites', 'Sculpt', 'Surface', 'Polish'] as BrushCategoryTab[]).map((tab) => {
                          const isTabActive = activeTab === tab;
                          return (
                            <button
                              key={tab}
                              type="button"
                              onClick={() => setActiveTab(tab)}
                              className={`transition-colors relative pb-1 ${
                                isTabActive
                                  ? 'text-sky-600 dark:text-sky-400 font-semibold'
                                  : isLight
                                    ? 'text-neutral-500 hover:text-neutral-800'
                                    : 'text-white/40 hover:text-white/75'
                              }`}
                            >
                              {tab}
                              {isTabActive && (
                                <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-sky-500 dark:bg-sky-400 rounded-full shadow-[0_0_6px_rgba(56,189,248,0.5)]" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Horizontal 8-card row (or 4x2 grid on mobile) */}
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 py-1">
                      {displayedBrushes.map((preset) => {
                        const isSelected = activeBrush.id === preset.id;
                        return (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => {
                              haptics.trigger('medium');
                              setBrushSettings((prev) => applyCuratedBrush(preset, prev));
                              if (tool !== 'brush') {
                                onSelect('draw');
                              }
                            }}
                            className={`relative rounded-xl p-1.5 flex flex-col items-center justify-between transition-all active:scale-95 aspect-[4/5] border ${
                              isSelected
                                ? 'border-sky-500 dark:border-sky-400/90 bg-sky-500/[0.12] shadow-[0_0_12px_rgba(56,189,248,0.25)] ring-1 ring-sky-400/70'
                                : isLight
                                  ? 'border-black/10 bg-black/[0.03] hover:border-black/20 hover:bg-black/[0.06]'
                                  : 'border-white/[0.06] bg-[#18191e] hover:border-white/20 hover:bg-[#1f2127]'
                            }`}
                            title={preset.description}
                          >
                            {/* Active Cyan Star */}
                            {isSelected && (
                              <Star className="w-2.5 h-2.5 text-sky-500 dark:text-sky-400 fill-sky-500 dark:fill-sky-400 absolute top-1.5 right-1.5" />
                            )}

                            {/* 3D Clay Thumbnail */}
                            <div className="w-full flex-1 flex items-center justify-center p-0.5 overflow-hidden">
                              <img
                                src={preset.iconUrl}
                                alt={preset.name}
                                className="w-10 h-10 object-contain pointer-events-none"
                              />
                            </div>

                            {/* Label */}
                            <span
                              className={`text-[10px] truncate w-full text-center leading-tight pb-0.5 ${
                                isSelected
                                  ? isLight ? 'text-neutral-900 font-semibold' : 'text-white font-semibold'
                                  : isLight ? 'text-neutral-600' : 'text-white/70'
                              }`}
                            >
                              {preset.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Bottom Controls Row: Size, Strength, Falloff (matching Image 1) */}
                    <div className={`pt-2 border-t flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 sm:gap-4 ${
                      isLight ? 'border-black/10' : 'border-white/[0.08]'
                    }`}>
                      {/* Size slider */}
                      <div className="flex-1 flex items-center gap-2">
                        <span className={`text-[11px] font-medium whitespace-nowrap ${isLight ? 'text-neutral-600' : 'text-white/60'}`}>Size</span>
                        <input
                          type="range"
                          min="0.008"
                          max="0.16"
                          step="0.002"
                          value={brushSettings.size}
                          onChange={(e) => setBrushSettings((p) => ({ ...p, size: parseFloat(e.target.value) }))}
                          className={`w-full h-1 rounded-full appearance-none cursor-pointer accent-sky-500 dark:accent-sky-400 ${
                            isLight ? 'bg-black/15' : 'bg-white/20'
                          }`}
                        />
                      </div>

                      {/* Strength slider */}
                      <div className="flex-1 flex items-center gap-2">
                        <span className={`text-[11px] font-medium whitespace-nowrap ${isLight ? 'text-neutral-600' : 'text-white/60'}`}>Strength</span>
                        <input
                          type="range"
                          min="0.05"
                          max="1.0"
                          step="0.02"
                          value={brushSettings.opacity ?? 1.0}
                          onChange={(e) => setBrushSettings((p) => ({ ...p, opacity: parseFloat(e.target.value) }))}
                          className={`w-full h-1 rounded-full appearance-none cursor-pointer accent-sky-500 dark:accent-sky-400 ${
                            isLight ? 'bg-black/15' : 'bg-white/20'
                          }`}
                        />
                      </div>

                      {/* Falloff Preview Curve (from Image 1) */}
                      <div className="flex items-center gap-2">
                        <span className={`text-[11px] font-medium whitespace-nowrap ${isLight ? 'text-neutral-600' : 'text-white/60'}`}>Falloff</span>
                        <div className={`w-20 h-7 rounded-lg border px-1.5 py-0.5 flex items-center justify-center ${
                          isLight ? 'border-black/10 bg-black/5' : 'border-white/10 bg-black/40'
                        }`}>
                          <svg viewBox="0 0 40 18" className={`w-full h-full fill-none ${isLight ? 'stroke-neutral-700' : 'stroke-white/80'}`}>
                            <path d="M 2 16 C 14 16, 20 2, 32 2 C 36 2, 38 16, 39 16" strokeWidth="1.2" />
                          </svg>
                        </div>
                      </div>

                      {/* Stylus Tip Button (from Image 1) */}
                      <button
                        type="button"
                        className={`w-8 h-8 rounded-lg border flex items-center justify-center active:scale-95 transition-all ${
                          isLight
                            ? 'border-sky-500 bg-sky-500/10 text-sky-700 shadow-sm'
                            : 'border-sky-400/80 bg-sky-500/10 text-white shadow-[0_0_8px_rgba(56,189,248,0.2)]'
                        }`}
                        title="Stylus pressure tip"
                      >
                        <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none">
                          <path d="M 12 2 L 18 8 L 8 18 L 4 20 L 6 16 Z" strokeWidth="1.5" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
