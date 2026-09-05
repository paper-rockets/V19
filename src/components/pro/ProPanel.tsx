import React from 'react';
import { ChevronRight } from 'lucide-react';
import { ProMode, closeSheet, useOpenSheet } from '../play/sheetStore';
import { haptics } from '../../utils/haptics';
import { SelectPanel } from './SelectPanel';
import { DrawPanel } from './DrawPanel';
import { CreatePanel } from './CreatePanel';
import { DeformPanel } from './DeformPanel';
import { LayerPanel } from '../LayerPanel';
import { StudioEngine } from '../../core/studioEngine';
import {
  ToolType,
  BrushSettings,
  TransformTargetScope,
  NumpadTarget,
  ModelDisplayMode,
  LiquifySettings,
  Layer,
} from '../../types';

export interface ProPanelProps {
  engine?: StudioEngine | null;
  tool?: ToolType;
  setTool?: (tool: ToolType) => void;
  brushSettings?: BrushSettings;
  setBrushSettings?: React.Dispatch<React.SetStateAction<BrushSettings>>;
  isGizmoActive?: boolean;
  onToggleGizmo?: () => void;
  isGizmoLocked?: boolean;
  onToggleLock?: () => void;
  onOpenNumpad?: (target: NumpadTarget) => void;
  onOpenColorStudio?: () => void;
  activeModelName?: string;
  modelDisplayMode?: ModelDisplayMode;
  onSetModelDisplayMode?: (mode: ModelDisplayMode) => void;
  onOpenModelLibrary?: () => void;
  onOpenImporter?: () => void;
  targetScope?: TransformTargetScope;
  onSelectTargetScope?: (scope: TransformTargetScope) => void;
  onGizmoReset?: () => void;
  // Deform Mode props
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
  // Layers Mode props
  layers?: Layer[];
  setLayers?: React.Dispatch<React.SetStateAction<Layer[]>>;
  activeLayerId?: string;
  setActiveLayerId?: (id: string) => void;
  onClearLayerStrokes?: (layerId: string) => void;
  onMergeLayerDown?: (layerId: string) => void;
  theme?: 'light' | 'dark';
}

const MODE_TITLES: Record<ProMode, string> = {
  select: 'Select',
  draw: 'Draw',
  create: 'Create',
  deform: 'Deform',
  layers: 'Layers',
};

export const ProPanel: React.FC<ProPanelProps> = ({
  engine = null,
  tool = 'brush',
  setTool = () => {},
  brushSettings,
  setBrushSettings = () => {},
  isGizmoActive = true,
  onToggleGizmo = () => {},
  isGizmoLocked = false,
  onToggleLock = () => {},
  onOpenNumpad,
  onOpenColorStudio,
  activeModelName = 'Default Model',
  modelDisplayMode = 'texture',
  onSetModelDisplayMode = () => {},
  onOpenModelLibrary = () => {},
  onOpenImporter = () => {},
  targetScope = 'all',
  onSelectTargetScope = () => {},
  onGizmoReset,
  liquifySettings,
  setLiquifySettings,
  isLiquifyOpen,
  onOpenLiquify,
  isCompareActive,
  onToggleCompare,
  onApplyLiquify,
  onCancelLiquify,
  onOpenScaffolding,
  onOpenBentGuide,
  onOpenCustomMirror,
  onOpenDecimate,
  layers,
  setLayers,
  activeLayerId,
  setActiveLayerId,
  onClearLayerStrokes,
  onMergeLayerDown,
  theme = 'dark',
}) => {
  const openSheet = useOpenSheet();
  const light = theme === 'light';

  // Only render if a ProMode is active
  const isProMode =
    openSheet === 'select' ||
    openSheet === 'draw' ||
    openSheet === 'create' ||
    openSheet === 'deform' ||
    openSheet === 'layers';

  if (!isProMode || !openSheet) return null;

  const mode = openSheet as ProMode;
  const title = MODE_TITLES[mode] ?? mode;

  return (
    <aside
      role="region"
      aria-label={`${title} Panel`}
      data-theme={theme}
      className={`paperrocket-pro-panel fixed left-[76px] sm:left-[88px] top-1/2 -translate-y-1/2 z-40 w-[300px] max-w-[calc(100vw-6rem)] max-h-[72vh] rounded-2xl border shadow-2xl flex flex-col overflow-hidden select-none animate-in fade-in slide-in-from-left-3 duration-150 ${
        light
          ? 'bg-white border-black/10 text-neutral-800'
          : 'bg-[#18191d] border-white/10 text-neutral-200'
      }`}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between px-4 py-3 border-b min-h-[44px] shrink-0 ${
          light ? 'border-neutral-200 bg-neutral-50' : 'border-white/10 bg-[#141519]'
        }`}
      >
        <h2 className="text-sm font-bold tracking-tight text-current">{title}</h2>
        <button
          type="button"
          onClick={() => {
            haptics.trigger('light');
            closeSheet();
          }}
          className={`flex items-center justify-center h-8 w-8 rounded-lg min-h-[44px] min-w-[44px] transition-colors ${
            light
              ? 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
              : 'text-neutral-400 hover:text-white hover:bg-white/10'
          }`}
          aria-label={`Close ${title} Panel`}
          title="Collapse Panel"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Body / Placeholders */}
      <div className="paperrocket-pro-content flex-1 px-3 py-2 overflow-y-auto">
        {mode === 'select' && brushSettings && (
          <SelectPanel
            engine={engine}
            tool={tool}
            setTool={setTool}
            brushSettings={brushSettings}
            setBrushSettings={setBrushSettings}
            isGizmoActive={isGizmoActive}
            onToggleGizmo={onToggleGizmo}
            isGizmoLocked={isGizmoLocked}
            onToggleLock={onToggleLock}
            onOpenNumpad={onOpenNumpad}
            targetScope={targetScope}
            onSelectTargetScope={onSelectTargetScope}
            onGizmoReset={onGizmoReset}
            theme={theme}
          />
        )}
        {mode === 'draw' && brushSettings && (
          <DrawPanel
            engine={engine}
            tool={tool}
            setTool={setTool}
            brushSettings={brushSettings}
            setBrushSettings={setBrushSettings}
            onOpenColorStudio={onOpenColorStudio}
            theme={theme}
          />
        )}
        {mode === 'create' && (
          <CreatePanel
            engine={engine}
            activeModelName={activeModelName}
            modelDisplayMode={modelDisplayMode}
            onSetModelDisplayMode={onSetModelDisplayMode}
            onOpenModelLibrary={onOpenModelLibrary}
            onOpenImporter={onOpenImporter}
            theme={theme}
          />
        )}
        {mode === 'deform' && (
          <DeformPanel
            engine={engine}
            tool={tool}
            setTool={setTool}
            liquifySettings={liquifySettings}
            setLiquifySettings={setLiquifySettings}
            isLiquifyOpen={isLiquifyOpen}
            onOpenLiquify={onOpenLiquify}
            isCompareActive={isCompareActive}
            onToggleCompare={onToggleCompare}
            onApplyLiquify={onApplyLiquify}
            onCancelLiquify={onCancelLiquify}
            onOpenScaffolding={onOpenScaffolding}
            onOpenBentGuide={onOpenBentGuide}
            onOpenCustomMirror={onOpenCustomMirror}
            onOpenDecimate={onOpenDecimate}
            onOpenNumpad={onOpenNumpad}
            theme={theme}
          />
        )}
        {mode === 'layers' && layers && setLayers && activeLayerId && setActiveLayerId && (
          <LayerPanel
            layers={layers}
            setLayers={setLayers}
            activeLayerId={activeLayerId}
            setActiveLayerId={setActiveLayerId}
            onClearLayerStrokes={onClearLayerStrokes || (() => {})}
            onMergeLayerDown={onMergeLayerDown}
            inline={true}
            theme={theme}
          />
        )}
      </div>
    </aside>
  );
};
