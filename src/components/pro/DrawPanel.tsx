import React, { useState } from 'react';
import {
  PenLine,
  Eraser,
  Pipette,
  Palette,
  Sparkles,
  Zap,
  Sliders,
  Flame,
  Scissors,
  Check,
  Spline,
  Ruler,
  Maximize2,
} from 'lucide-react';
import { StudioEngine } from '../../core/studioEngine';
import {
  ToolType,
  BrushSettings,
  StrokeProfile,
  MaterialType,
  SmoothingAlgorithm,
  EraserMode,
} from '../../types';
import {
  DEFAULT_BRUSH_PRESETS,
  applyBrushPresetToSettings,
} from '../../presets/brushPresets';
import { haptics } from '../../utils/haptics';

interface DrawPanelProps {
  engine?: StudioEngine | null;
  tool: ToolType;
  setTool: (tool: ToolType) => void;
  brushSettings: BrushSettings;
  setBrushSettings: React.Dispatch<React.SetStateAction<BrushSettings>>;
  onOpenColorStudio?: () => void;
  theme?: 'light' | 'dark';
}

export const DrawPanel: React.FC<DrawPanelProps> = ({
  tool,
  setTool,
  brushSettings,
  setBrushSettings,
  onOpenColorStudio,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';

  const updateSetting = <K extends keyof BrushSettings>(key: K, value: BrushSettings[K]) => {
    setBrushSettings((prev) => ({ ...prev, [key]: value }));
  };

  const cardClass = isLight
    ? 'p-3 rounded-2xl bg-neutral-100/70 border border-black/5 space-y-2.5'
    : 'p-3 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2.5';

  const subHeadingClass = `text-[11px] font-bold uppercase tracking-wider ${
    isLight ? 'text-neutral-500' : 'text-neutral-400'
  }`;

  const PROFILES: { id: StrokeProfile; label: string }[] = [
    { id: 'ribbon', label: 'Ribbon' },
    { id: 'tube', label: '3D Tube' },
    { id: 'marker', label: 'Marker' },
    { id: 'conformal', label: 'Surface Decal' },
  ];

  const MATERIALS: { id: MaterialType; label: string; icon: any }[] = [
    { id: 'shadeless', label: 'Flat Paint', icon: Palette },
    { id: 'shaded', label: 'Lit Form', icon: Zap },
    { id: 'glow', label: 'Glow Light', icon: Flame },
    { id: 'cutout', label: 'Cutout', icon: Scissors },
  ];

  const SMOOTHING_OPTIONS: { id: SmoothingAlgorithm; label: string }[] = [
    { id: 'streamline', label: 'Smooth Glide' },
    { id: 'exponential', label: 'Natural' },
    { id: 'none', label: 'Direct Raw' },
  ];

  return (
    <div className="space-y-4 text-xs select-none">
      {/* 1. UNIFIED TOOL ROW: Draw / Erase / Eyedropper */}
      <div className={cardClass}>
        <div className={subHeadingClass}>Active Tool</div>
        <div className="grid grid-cols-3 gap-2">
          {/* Draw Button (Unified 3D Pen / Sketch) */}
          <button
            type="button"
            onClick={() => {
              haptics.trigger('light');
              setTool('brush');
            }}
            className={`min-h-[44px] px-2 py-2 rounded-xl border flex flex-col items-center justify-center gap-1 font-semibold transition-all ${
              tool === 'brush'
                ? isLight
                  ? 'bg-neutral-900 border-neutral-900 text-white shadow-sm'
                  : 'bg-white border-white text-neutral-950 shadow-sm'
                : isLight
                ? 'bg-white border-black/10 text-neutral-700 hover:bg-neutral-200/50'
                : 'bg-black/30 border-white/10 text-neutral-300 hover:bg-white/5'
            }`}
          >
            <PenLine className="w-4 h-4" />
            <span className="text-[11px]">Draw</span>
          </button>

          {/* Erase Button */}
          <button
            type="button"
            onClick={() => {
              haptics.trigger('light');
              setTool('eraser');
            }}
            className={`min-h-[44px] px-2 py-2 rounded-xl border flex flex-col items-center justify-center gap-1 font-semibold transition-all ${
              tool === 'eraser'
                ? isLight
                  ? 'bg-neutral-900 border-neutral-900 text-white shadow-sm'
                  : 'bg-white border-white text-neutral-950 shadow-sm'
                : isLight
                ? 'bg-white border-black/10 text-neutral-700 hover:bg-neutral-200/50'
                : 'bg-black/30 border-white/10 text-neutral-300 hover:bg-white/5'
            }`}
          >
            <Eraser className="w-4 h-4" />
            <span className="text-[11px]">Erase</span>
          </button>

          {/* Eyedropper / Copy Look */}
          <button
            type="button"
            onClick={() => {
              haptics.trigger('light');
              setTool('eyedropper');
            }}
            className={`min-h-[44px] px-2 py-2 rounded-xl border flex flex-col items-center justify-center gap-1 font-semibold transition-all ${
              tool === 'eyedropper'
                ? isLight
                  ? 'bg-neutral-900 border-neutral-900 text-white shadow-sm'
                  : 'bg-white border-white text-neutral-950 shadow-sm'
                : isLight
                ? 'bg-white border-black/10 text-neutral-700 hover:bg-neutral-200/50'
                : 'bg-black/30 border-white/10 text-neutral-300 hover:bg-white/5'
            }`}
            title="Sample color and brush look from screen"
          >
            <Pipette className="w-4 h-4" />
            <span className="text-[11px]">Sample</span>
          </button>
        </div>
      </div>

      {/* 2. ONE COLOUR ENTRY POINT: Interactive Swatch opening ColorStudioModal */}
      <div className={cardClass}>
        <div className="flex items-center justify-between">
          <div className={subHeadingClass}>Color & Material</div>
          <span className="font-mono text-[11px] font-bold opacity-80">
            {(brushSettings.color || '#38bdf8').toUpperCase()}
          </span>
        </div>

        <button
          type="button"
          onClick={() => {
            haptics.trigger('light');
            onOpenColorStudio?.();
          }}
          className={`w-full min-h-[44px] p-2.5 rounded-xl border flex items-center justify-between transition-all group ${
            isLight
              ? 'bg-white border-black/10 hover:border-black/30 text-neutral-900'
              : 'bg-black/30 border-white/10 hover:border-white/30 text-white'
          }`}
          title="Open Color Studio (Palettes, HSV, PBR, Shaders)"
        >
          <div className="flex items-center gap-3">
            <span
              className="w-7 h-7 rounded-lg border border-black/15 dark:border-white/20 shadow-xs shrink-0"
              style={{ backgroundColor: brushSettings.color || '#38bdf8' }}
            />
            <div className="text-left">
              <div className="font-semibold text-xs leading-none">Color Studio & Shaders</div>
              <div className="text-[10px] opacity-60 mt-0.5">Palettes, gradients, & materials</div>
            </div>
          </div>
          <Palette className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>

      {/* 3. PRESETS: Quick One-Tap Brush Presets */}
      <div className={cardClass}>
        <div className={subHeadingClass}>Presets</div>
        <div className="grid grid-cols-2 gap-1.5">
          {DEFAULT_BRUSH_PRESETS.slice(0, 6).map((preset) => {
            const isSelected = brushSettings.brushPresetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  haptics.trigger('light');
                  setBrushSettings((prev) => ({
                    ...applyBrushPresetToSettings(preset, prev),
                    brushPresetId: preset.id,
                  }));
                }}
                className={`min-h-[44px] px-2.5 py-1.5 rounded-xl border flex items-center gap-2 text-left transition-all ${
                  isSelected
                    ? isLight
                      ? 'bg-neutral-900 border-neutral-900 text-white font-bold shadow-xs'
                      : 'bg-white border-white text-neutral-950 font-bold shadow-xs'
                    : isLight
                    ? 'bg-white border-black/10 text-neutral-700 hover:bg-neutral-200/50'
                    : 'bg-black/30 border-white/10 text-neutral-300 hover:bg-white/5'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0 border border-black/10 dark:border-white/20"
                  style={{ backgroundColor: preset.color || '#38bdf8' }}
                />
                <span className="truncate text-[11px]">{preset.name.replace(/^(Streamline|Volumetric|Drafting)\s+/, '')}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. BRUSH DYNAMICS & SURFACE (from BrushSettingsPanel) */}
      <div className={cardClass}>
        <div className={subHeadingClass}>Stroke Dynamics</div>

        {/* Size Slider */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-[11px]">
            <span className="font-medium text-current">Brush Size</span>
            <span className="font-mono text-[10px] font-bold">
              {(brushSettings.size * 100).toFixed(1)}%
            </span>
          </div>
          <input
            type="range"
            min="0.005"
            max="0.25"
            step="0.005"
            value={brushSettings.size}
            onChange={(e) => updateSetting('size', parseFloat(e.target.value))}
            className={`w-full h-1.5 rounded cursor-pointer ${
              isLight ? 'accent-neutral-900 bg-neutral-200' : 'accent-white bg-neutral-800'
            }`}
          />
        </div>

        {/* Opacity Slider */}
        <div className="space-y-1 pt-1">
          <div className="flex justify-between items-center text-[11px]">
            <span className="font-medium text-current">Opacity</span>
            <span className="font-mono text-[10px] font-bold">
              {Math.round(brushSettings.opacity * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0.05"
            max="1.0"
            step="0.05"
            value={brushSettings.opacity}
            onChange={(e) => updateSetting('opacity', parseFloat(e.target.value))}
            className={`w-full h-1.5 rounded cursor-pointer ${
              isLight ? 'accent-neutral-900 bg-neutral-200' : 'accent-white bg-neutral-800'
            }`}
          />
        </div>

        {/* Profile Selection */}
        <div className="space-y-1 pt-1">
          <label className={`text-[10.5px] font-medium ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
            Stroke Profile
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {PROFILES.map(({ id, label }) => {
              const isSelected = brushSettings.profile === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    haptics.trigger('light');
                    updateSetting('profile', id);
                  }}
                  className={`min-h-[44px] px-2 py-1.5 rounded-xl border text-center font-medium transition-all text-xs ${
                    isSelected
                      ? isLight
                        ? 'bg-neutral-900 border-neutral-900 text-white font-bold shadow-xs'
                        : 'bg-white border-white text-neutral-950 font-bold shadow-xs'
                      : isLight
                      ? 'bg-white border-black/10 text-neutral-700 hover:bg-neutral-200/50'
                      : 'bg-black/30 border-white/10 text-neutral-300 hover:bg-white/5'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Material Type Selection */}
        <div className="space-y-1 pt-1">
          <label className={`text-[10.5px] font-medium ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
            Surface Finish
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {MATERIALS.map(({ id, label, icon: Icon }) => {
              const isSelected = brushSettings.materialType === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    haptics.trigger('light');
                    updateSetting('materialType', id);
                  }}
                  className={`min-h-[44px] px-2 py-1.5 rounded-xl border flex items-center justify-center gap-1.5 font-medium transition-all text-xs ${
                    isSelected
                      ? isLight
                        ? 'bg-neutral-900 border-neutral-900 text-white font-bold shadow-xs'
                        : 'bg-white border-white text-neutral-950 font-bold shadow-xs'
                      : isLight
                      ? 'bg-white border-black/10 text-neutral-700 hover:bg-neutral-200/50'
                      : 'bg-black/30 border-white/10 text-neutral-300 hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Smoothing Selection */}
        <div className="space-y-1 pt-1">
          <div className="flex justify-between items-center text-[11px]">
            <span className="font-medium text-current">Stroke Smoothing</span>
            <span className="font-mono text-[10px] font-bold">
              {Math.round(brushSettings.smoothingStrength * 100)}%
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 mb-1.5">
            {SMOOTHING_OPTIONS.map(({ id, label }) => {
              const isSelected = brushSettings.smoothingAlgorithm === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    haptics.trigger('light');
                    updateSetting('smoothingAlgorithm', id);
                  }}
                  className={`min-h-[44px] px-1.5 py-1 rounded-xl border text-center font-medium transition-all text-[11px] ${
                    isSelected
                      ? isLight
                        ? 'bg-neutral-900 border-neutral-900 text-white font-bold shadow-xs'
                        : 'bg-white border-white text-neutral-950 font-bold shadow-xs'
                      : isLight
                      ? 'bg-white border-black/10 text-neutral-700 hover:bg-neutral-200/50'
                      : 'bg-black/30 border-white/10 text-neutral-300 hover:bg-white/5'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <input
            type="range"
            min="0"
            max="1.0"
            step="0.05"
            value={brushSettings.smoothingStrength}
            onChange={(e) => updateSetting('smoothingStrength', parseFloat(e.target.value))}
            className={`w-full h-1.5 rounded cursor-pointer ${
              isLight ? 'accent-neutral-900 bg-neutral-200' : 'accent-white bg-neutral-800'
            }`}
          />
        </div>
      </div>

      {/* 5. DRAWING TOGGLES & ERASER MODE */}
      <div className={cardClass}>
        <div className={subHeadingClass}>Drawing Assistance & Eraser</div>

        <div className="space-y-2">
          {/* Straight line mode */}
          <label className="flex items-center justify-between min-h-[44px] cursor-pointer">
            <div className="flex items-center gap-2">
              <Ruler className="w-4 h-4" />
              <span className="text-[11px] font-medium">Straight Line (Ruler)</span>
            </div>
            <input
              type="checkbox"
              checked={brushSettings.straightLineMode || false}
              onChange={(e) => updateSetting('straightLineMode', e.target.checked)}
              className="w-4 h-4 rounded accent-neutral-900 dark:accent-white cursor-pointer"
            />
          </label>

          {/* Shape snapping */}
          <label className="flex items-center justify-between min-h-[44px] cursor-pointer border-t border-black/5 dark:border-white/5 pt-1">
            <div className="flex items-center gap-2">
              <Spline className="w-4 h-4" />
              <span className="text-[11px] font-medium">Geometric Shape Snapping</span>
            </div>
            <input
              type="checkbox"
              checked={brushSettings.shapeSnapping || false}
              onChange={(e) => updateSetting('shapeSnapping', e.target.checked)}
              className="w-4 h-4 rounded accent-neutral-900 dark:accent-white cursor-pointer"
            />
          </label>

          {/* Pressure sensitivity */}
          <label className="flex items-center justify-between min-h-[44px] cursor-pointer border-t border-black/5 dark:border-white/5 pt-1">
            <span className="text-[11px] font-medium">Stylus Pressure Sensitivity</span>
            <input
              type="checkbox"
              checked={brushSettings.pressureSensitivity !== false}
              onChange={(e) => updateSetting('pressureSensitivity', e.target.checked)}
              className="w-4 h-4 rounded accent-neutral-900 dark:accent-white cursor-pointer"
            />
          </label>

          {/* Eraser Mode: Cutout vs Vacuum */}
          <div className="pt-2 border-t border-black/5 dark:border-white/5 space-y-1.5">
            <div className="flex justify-between items-center text-[11px]">
              <span className="font-medium text-current">Eraser Mode</span>
              <span className="font-mono text-[10px] opacity-70">
                {brushSettings.eraserMode === 'cutout' ? 'Negative Mask' : 'Super Zap (Continuous)'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {(['vacuum', 'cutout'] as EraserMode[]).map((mode) => {
                const isSelected = (brushSettings.eraserMode || 'vacuum') === mode;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => {
                      haptics.trigger('light');
                      updateSetting('eraserMode', mode);
                    }}
                    className={`min-h-[44px] px-2 py-1.5 rounded-xl border text-center font-medium transition-all text-xs ${
                      isSelected
                        ? isLight
                          ? 'bg-neutral-900 border-neutral-900 text-white font-bold shadow-xs'
                          : 'bg-white border-white text-neutral-950 font-bold shadow-xs'
                        : isLight
                        ? 'bg-white border-black/10 text-neutral-700 hover:bg-neutral-200/50'
                        : 'bg-black/30 border-white/10 text-neutral-300 hover:bg-white/5'
                    }`}
                  >
                    {mode === 'vacuum' ? 'Super Zap (Full Curve)' : 'Mask Cutout'}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
