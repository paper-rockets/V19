import React from 'react';
import {
  Move,
  Shield,
  Compass,
  Scissors,
  Camera,
  Layers,
  Sparkles,
  Spline,
  RotateCcw,
  Check,
} from 'lucide-react';
import { StudioEngine } from '../../core/studioEngine';
import { LiquifySettings, NumpadTarget, ToolType } from '../../types';
import { LiquifyPanel } from '../LiquifyPanel';
import { haptics } from '../../utils/haptics';

export interface DeformPanelProps {
  engine?: StudioEngine | null;
  tool?: ToolType;
  setTool?: (tool: ToolType) => void;
  liquifySettings?: LiquifySettings;
  setLiquifySettings?: (settings: LiquifySettings) => void;
  isLiquifyOpen?: boolean;
  onOpenLiquify?: () => void;
  isCompareActive?: boolean;
  onToggleCompare?: (active: boolean) => void;
  onApplyLiquify?: () => void;
  onCancelLiquify?: () => void;
  onOpenScaffolding?: () => void;
  onOpenBentGuide?: () => void;
  onOpenCustomMirror?: () => void;
  onOpenDecimate?: () => void;
  onOpenNumpad?: (target: NumpadTarget) => void;
  theme?: 'light' | 'dark';
}

export const DeformPanel: React.FC<DeformPanelProps> = ({
  engine = null,
  tool = 'brush',
  setTool = (_t: ToolType) => {},
  liquifySettings,
  setLiquifySettings,
  isLiquifyOpen = false,
  onOpenLiquify,
  isCompareActive = false,
  onToggleCompare = () => {},
  onApplyLiquify,
  onCancelLiquify,
  onOpenScaffolding = () => {},
  onOpenBentGuide = () => {},
  onOpenCustomMirror = () => {},
  onOpenDecimate = () => {},
  onOpenNumpad,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';
  const isPushPullActive = tool === 'liquify' || isLiquifyOpen;

  const handleStartPushPull = () => {
    haptics.trigger('medium');
    if (onOpenLiquify) {
      onOpenLiquify();
    } else {
      setTool('liquify');
      engine?.startLiquifySession();
    }
  };

  const handleApplyPushPull = () => {
    haptics.trigger('medium');
    if (onApplyLiquify) {
      onApplyLiquify();
    } else {
      engine?.commitLiquify();
      setTool('brush');
    }
  };

  const handleCancelPushPull = () => {
    haptics.trigger('light');
    if (onCancelLiquify) {
      onCancelLiquify();
    } else {
      engine?.cancelLiquify();
      setTool('brush');
    }
  };

  const handleAlignMirrorToView = () => {
    haptics.trigger('medium');
    if (!engine) return;
    const camInfo = engine.getCameraOrientationForMirror();
    if (camInfo) {
      engine.setCustomMirrorPlane(camInfo.target, camInfo.normal, true);
    }
  };

  const handleQuickSimplify = () => {
    haptics.trigger('medium');
    if (!engine) return;
    engine.decimateActiveLayerCurves(0.006, true);
  };

  return (
    <div className="space-y-4 font-sans text-xs">
      {/* 1. Push & Pull Tool */}
      <div
        className={`p-3 rounded-xl border space-y-2.5 transition-colors ${
          isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-[#141519] border-white/10'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Move className={`w-4 h-4 ${isLight ? 'text-neutral-900' : 'text-neutral-200'}`} />
            <span className={`font-bold ${isLight ? 'text-neutral-900' : 'text-white'}`}>
              Push & Pull
            </span>
          </div>
          {isPushPullActive && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-500 border border-amber-500/30">
              Active
            </span>
          )}
        </div>

        <p className={`text-[11px] leading-relaxed ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
          Displace, pinch, inflate, or comb 3D curves directly with your stylus or finger.
        </p>

        {isPushPullActive && liquifySettings ? (
          <div className="pt-1">
            <LiquifyPanel
              inline={true}
              settings={liquifySettings}
              onSettingsChange={setLiquifySettings}
              isCompareActive={isCompareActive}
              onToggleCompare={onToggleCompare}
              onApply={handleApplyPushPull}
              onCancel={handleCancelPushPull}
              onReset={() => {
                engine?.cancelLiquify();
                engine?.startLiquifySession();
              }}
              onOpenNumpad={onOpenNumpad}
              theme={theme}
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={handleStartPushPull}
            className={`w-full min-h-[44px] px-3 py-2 rounded-xl font-bold flex items-center justify-center gap-2 shadow-xs transition-transform active:scale-98 ${
              isLight
                ? 'bg-neutral-900 hover:bg-neutral-800 text-white'
                : 'bg-white hover:bg-neutral-100 text-neutral-950'
            }`}
          >
            <Move className="w-4 h-4" />
            <span>Start Push & Pull</span>
          </button>
        )}
      </div>

      {/* 2. Guides */}
      <div
        className={`p-3 rounded-xl border space-y-2.5 transition-colors ${
          isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-[#141519] border-white/10'
        }`}
      >
        <div className="flex items-center gap-2">
          <Shield className={`w-4 h-4 ${isLight ? 'text-neutral-900' : 'text-neutral-200'}`} />
          <span className={`font-bold ${isLight ? 'text-neutral-900' : 'text-white'}`}>
            Guides
          </span>
        </div>

        <p className={`text-[11px] leading-relaxed ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
          Reference armatures and curved surfaces your strokes snap onto automatically.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => {
              haptics.trigger('light');
              onOpenScaffolding();
            }}
            className={`min-h-[44px] px-3 py-2 rounded-xl border font-semibold flex items-center justify-center gap-2 transition-all ${
              isLight
                ? 'bg-white hover:bg-neutral-100 border-neutral-300 text-neutral-800'
                : 'bg-neutral-900 hover:bg-neutral-800 border-neutral-700 text-neutral-200'
            }`}
          >
            <Shield className="w-4 h-4 shrink-0" />
            <span>Armatures & Forms</span>
          </button>

          <button
            type="button"
            onClick={() => {
              haptics.trigger('light');
              onOpenBentGuide();
            }}
            className={`min-h-[44px] px-3 py-2 rounded-xl border font-semibold flex items-center justify-center gap-2 transition-all ${
              isLight
                ? 'bg-white hover:bg-neutral-100 border-neutral-300 text-neutral-800'
                : 'bg-neutral-900 hover:bg-neutral-800 border-neutral-700 text-neutral-200'
            }`}
          >
            <Spline className="w-4 h-4 shrink-0" />
            <span>Bend Along a Path</span>
          </button>
        </div>
      </div>

      {/* 3. Mirror */}
      <div
        className={`p-3 rounded-xl border space-y-2.5 transition-colors ${
          isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-[#141519] border-white/10'
        }`}
      >
        <div className="flex items-center gap-2">
          <Compass className={`w-4 h-4 ${isLight ? 'text-neutral-900' : 'text-neutral-200'}`} />
          <span className={`font-bold ${isLight ? 'text-neutral-900' : 'text-white'}`}>
            Mirror
          </span>
        </div>

        <p className={`text-[11px] leading-relaxed ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
          Symmetry plane reflecting brush strokes across 3D coordinates.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => {
              haptics.trigger('light');
              onOpenCustomMirror();
            }}
            className={`min-h-[44px] px-3 py-2 rounded-xl border font-semibold flex items-center justify-center gap-2 transition-all ${
              isLight
                ? 'bg-white hover:bg-neutral-100 border-neutral-300 text-neutral-800'
                : 'bg-neutral-900 hover:bg-neutral-800 border-neutral-700 text-neutral-200'
            }`}
          >
            <Compass className="w-4 h-4 shrink-0" />
            <span>Mirror Settings</span>
          </button>

          <button
            type="button"
            onClick={handleAlignMirrorToView}
            className={`min-h-[44px] px-3 py-2 rounded-xl border font-semibold flex items-center justify-center gap-2 transition-all ${
              isLight
                ? 'bg-white hover:bg-neutral-100 border-neutral-300 text-neutral-800'
                : 'bg-neutral-900 hover:bg-neutral-800 border-neutral-700 text-neutral-200'
            }`}
            title="Align mirror plane to current camera view"
          >
            <Camera className="w-4 h-4 shrink-0" />
            <span>Align to View</span>
          </button>
        </div>
      </div>

      {/* 4. Simplify Lines */}
      <div
        className={`p-3 rounded-xl border space-y-2.5 transition-colors ${
          isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-[#141519] border-white/10'
        }`}
      >
        <div className="flex items-center gap-2">
          <Scissors className={`w-4 h-4 ${isLight ? 'text-neutral-900' : 'text-neutral-200'}`} />
          <span className={`font-bold ${isLight ? 'text-neutral-900' : 'text-white'}`}>
            Simplify Lines
          </span>
        </div>

        <p className={`text-[11px] leading-relaxed ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
          Reduces point count along stroke curves to keep performance smooth.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => {
              haptics.trigger('light');
              onOpenDecimate();
            }}
            className={`min-h-[44px] px-3 py-2 rounded-xl border font-semibold flex items-center justify-center gap-2 transition-all ${
              isLight
                ? 'bg-white hover:bg-neutral-100 border-neutral-300 text-neutral-800'
                : 'bg-neutral-900 hover:bg-neutral-800 border-neutral-700 text-neutral-200'
            }`}
          >
            <Scissors className="w-4 h-4 shrink-0" />
            <span>Simplify Settings</span>
          </button>

          <button
            type="button"
            onClick={handleQuickSimplify}
            className={`min-h-[44px] px-3 py-2 rounded-xl border font-semibold flex items-center justify-center gap-2 transition-all ${
              isLight
                ? 'bg-white hover:bg-neutral-100 border-neutral-300 text-neutral-800'
                : 'bg-neutral-900 hover:bg-neutral-800 border-neutral-700 text-neutral-200'
            }`}
            title="Lighten active layer curves by simplifying dense points"
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>Quick Simplify</span>
          </button>
        </div>
      </div>
    </div>
  );
};
