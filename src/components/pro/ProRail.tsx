import React from 'react';
import { MousePointer, PenLine, Shapes, Wand2, Layers, Sun } from 'lucide-react';
import { ProMode, toggleSheet, useOpenSheet } from '../play/sheetStore';
import { haptics } from '../../utils/haptics';

interface ProRailProps {
  theme?: 'light' | 'dark';
  onOpenIllumination?: () => void;
  isIlluminationOpen?: boolean;
}

interface ModeButton {
  id: ProMode;
  label: string;
  icon: React.FC<{ className?: string; strokeWidth?: number }>;
}

const MODES: ModeButton[] = [
  { id: 'select', label: 'Select', icon: MousePointer },
  { id: 'draw', label: 'Draw', icon: PenLine },
  { id: 'create', label: 'Create', icon: Shapes },
  { id: 'deform', label: 'Deform', icon: Wand2 },
  { id: 'layers', label: 'Layers', icon: Layers },
];

export const ProRail: React.FC<ProRailProps> = ({
  theme = 'dark',
  onOpenIllumination,
  isIlluminationOpen = false,
}) => {
  const openSheet = useOpenSheet();
  const light = theme === 'light';

  return (
    <nav aria-label="Studio modes" className="fixed left-3 sm:left-5 top-1/2 -translate-y-1/2 z-40 select-none">
      <div className={`flex flex-col gap-3 ${light ? 'text-neutral-800' : 'text-white/85'}`}>
        {MODES.map(({ id, label, icon: Icon }) => {
          const isActive = openSheet === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => {
                haptics.trigger('light');
                toggleSheet(id);
              }}
              className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all active:scale-95 ${
                isActive
                  ? light
                    ? 'border-sky-600/70 bg-black/[0.035] text-neutral-950 shadow-sm'
                    : 'border-sky-400/70 bg-white/[0.045] text-white shadow-sm'
                  : light
                    ? 'border-transparent text-neutral-500 hover:text-neutral-950 hover:bg-black/[0.025]'
                    : 'border-transparent text-neutral-500 hover:text-white hover:bg-white/[0.025]'
              }`}
              aria-label={label}
              aria-pressed={isActive}
              title={label}
            >
              <Icon className="h-[23px] w-[23px] shrink-0" strokeWidth={1.35} />
            </button>
          );
        })}

        {/* Scene Illumination & Studio Lighting */}
        <div className={`my-0.5 h-px ${light ? 'bg-neutral-300/60' : 'bg-white/10'}`} />
        <button
          type="button"
          onClick={() => {
            haptics.trigger('medium');
            onOpenIllumination?.();
          }}
          className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all active:scale-95 ${
            isIlluminationOpen
              ? light
                ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-sm'
                : 'border-amber-400/80 bg-amber-500/20 text-amber-300 shadow-sm'
              : light
                ? 'border-transparent text-amber-600 hover:text-amber-800 hover:bg-black/[0.025]'
                : 'border-transparent text-amber-400/90 hover:text-amber-300 hover:bg-white/[0.025]'
          }`}
          aria-label="Scene Illumination & Studio Lighting"
          aria-pressed={isIlluminationOpen}
          title="Studio Illumination"
        >
          <Sun className="h-[23px] w-[23px] shrink-0 text-amber-400" strokeWidth={1.4} />
        </button>
      </div>
    </nav>
  );
};
