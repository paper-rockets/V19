import React, { useState, useEffect, useCallback } from 'react';
import {
  IcScene as Box,
  IcUndo as Undo2,
  IcRedo as Redo2,
  IcSettings as Settings,
  IcFullscreen as Maximize,
  IcExitFullscreen as Minimize,
  IcSun as Sun,
  IcSave as Save,
  IcSessions as FolderArchive,
} from '../pro/StudioIcons';
import { Square } from 'lucide-react';
import { toggleSheet } from './sheetStore';

interface PlayTopStripProps {
  projectName: string;
  onOpenToybox: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  theme?: 'light' | 'dark';
  uiMode?: 'play' | 'pro';
  onSwitchUiMode?: () => void;
  onOpenIllumination?: () => void;
  onQuickSave?: () => void;
  onOpenSessions?: () => void;
}

export const PlayTopStrip: React.FC<PlayTopStripProps> = ({
  projectName,
  onOpenToybox,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  theme = 'dark',
  uiMode = 'play',
  onSwitchUiMode,
  onOpenIllumination,
  onQuickSave,
  onOpenSessions,
}) => {
  const ink = theme === 'light' ? 'text-neutral-800' : 'text-white/90';
  const button = `pointer-events-auto min-w-[30px] w-8 h-8 sm:w-10 sm:h-10 sm:min-w-[40px] grid place-items-center rounded-lg sm:rounded-xl transition-colors hover:bg-current/[0.045] active:bg-current/[0.075] ${ink}`;

  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleToggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        } else if ((document.documentElement as any).webkitRequestFullscreen) {
          await (document.documentElement as any).webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        }
      }
    } catch (err) {
      console.warn('Fullscreen toggle request failed:', err);
    }
  }, []);

  return (
    <header className="play-top-strip fixed inset-x-0 top-0 z-30 flex h-14 sm:h-16 items-center justify-between px-1.5 sm:px-5 pl-[max(0.375rem,env(safe-area-inset-left))] pr-[max(0.375rem,env(safe-area-inset-right))] pointer-events-none select-none">
      <button
        type="button"
        onClick={onOpenToybox}
        className={`${button} play-top-strip-left w-auto shrink-0 px-1.5 sm:px-2 gap-1 sm:gap-2 flex`}
        aria-label="Open model library"
      >
        <Box className="w-4 h-4 sm:w-[22px] sm:h-[22px] shrink-0" strokeWidth={1.35} />
        <span className="text-[11px] sm:text-[13px] font-medium tracking-[0.01em] max-w-16 sm:max-w-36 truncate">
          {projectName || 'Model'}
        </span>
      </button>
      <nav className="flex items-center gap-0.5 sm:gap-1.5 pointer-events-auto shrink-0 max-w-[calc(100vw-68px)] overflow-x-auto no-scrollbar py-0.5" aria-label="History and settings">
        <button
          type="button"
          onClick={onUndo}
          disabled={!canUndo}
          className={`${button} disabled:opacity-25`}
          aria-label="Undo"
        >
          <Undo2 className="w-[18px] h-[18px] sm:w-[21px] sm:h-[21px]" strokeWidth={1.35} />
        </button>
        <button
          type="button"
          onClick={onRedo}
          disabled={!canRedo}
          className={`${button} disabled:opacity-25`}
          aria-label="Redo"
        >
          <Redo2 className="w-[18px] h-[18px] sm:w-[21px] sm:h-[21px]" strokeWidth={1.35} />
        </button>
        {onQuickSave && (
          <button
            type="button"
            onClick={onQuickSave}
            className={button}
            aria-label="Quick Save Session (Ctrl+S)"
            title="Quick Save Session (Ctrl+S)"
          >
            <Save className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]" strokeWidth={1.35} />
          </button>
        )}
        {onOpenSessions && (
          <button
            type="button"
            onClick={onOpenSessions}
            className={button}
            aria-label="Project Sessions"
            title="Project Sessions"
          >
            <FolderArchive className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]" strokeWidth={1.35} />
          </button>
        )}
        {onOpenIllumination && (
          <button
            type="button"
            onClick={onOpenIllumination}
            className={`${button} text-amber-400 hover:text-amber-300`}
            aria-label="Studio Illumination"
            title="Studio Illumination"
          >
            <Sun className="w-[18px] h-[18px] sm:w-[21px] sm:h-[21px]" strokeWidth={1.35} />
          </button>
        )}
        <button
          type="button"
          onClick={() => toggleSheet('shapes')}
          className={button}
          aria-label="Shape Snapping"
          title="Shape Snapping (Auto-Shapes)"
        >
          <Square className="w-[17px] h-[17px] sm:w-[19px] sm:h-[19px]" strokeWidth={1.35} />
        </button>
        <button
          type="button"
          onClick={() => toggleSheet('settings')}
          className={button}
          aria-label="Settings"
          title="Settings"
        >
          <Settings className="w-[18px] h-[18px] sm:w-[21px] sm:h-[21px]" strokeWidth={1.35} />
        </button>
        <button
          type="button"
          onClick={handleToggleFullscreen}
          className={button}
          aria-label={isFullscreen ? 'Exit Full Screen' : 'Full Screen'}
          title={isFullscreen ? 'Exit Full Screen' : 'Full Screen'}
        >
          {isFullscreen ? (
            <Minimize className="w-[18px] h-[18px] sm:w-[21px] sm:h-[21px]" strokeWidth={1.35} />
          ) : (
            <Maximize className="w-[18px] h-[18px] sm:w-[21px] sm:h-[21px]" strokeWidth={1.35} />
          )}
        </button>
        {uiMode === 'pro' && onSwitchUiMode && (
          <button
            type="button"
            onClick={onSwitchUiMode}
            className={`play-top-strip-mode-btn h-8 sm:h-9 px-1.5 sm:px-3 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-semibold flex items-center gap-1 active:scale-95 transition-all shrink-0 ml-0.5 sm:ml-1 ${
              theme === 'light'
                ? 'hover:bg-black/[0.035] text-neutral-700'
                : 'hover:bg-white/[0.045] text-neutral-300'
            }`}
            title="Back to Play mode"
          >
            <span>Play</span>
          </button>
        )}
      </nav>
    </header>
  );
};
