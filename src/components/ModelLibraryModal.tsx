import React, { useState, useMemo } from 'react';
import { SampleModelFactory, PresetModelDefinition } from '../core/sampleModels';
import { StudioEngine } from '../core/studioEngine';
import { ModelDisplayMode } from '../types';
import {
  Box,
  Upload,
  X,
  Check,
  Search,
  Sparkles,
  Loader2,
  Zap,
  Palette,
} from 'lucide-react';

interface ModelLibraryModalProps {
  engine: StudioEngine | null;
  onClose: () => void;
  activeModelName: string;
  onOpenConverter?: () => void;
  theme?: 'light' | 'dark';
}

export const ModelLibraryModal: React.FC<ModelLibraryModalProps> = ({
  engine,
  onClose,
  activeModelName,
  onOpenConverter,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';
  const presets = useMemo(() => SampleModelFactory.getPresets(), []);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loadDisplayMode, setLoadDisplayMode] = useState<ModelDisplayMode>('texture');
  const [urlInput, setUrlInput] = useState('');

  const filteredPresets = useMemo(() => {
    return presets.filter((p) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [presets, searchQuery]);

  const handleSelectPreset = async (preset: PresetModelDefinition) => {
    if (!engine) return;
    setLoading(true);
    setError(null);
    try {
      await engine.loadPresetModel(preset.id, loadDisplayMode);
      onClose();
    } catch (err: any) {
      setError(err?.message || `Failed to load ${preset.name}.`);
    } finally {
      setLoading(false);
    }
  };

  const handleUrlLoad = async () => {
    if (!engine || !urlInput.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const url = urlInput.trim();
      const modelName = url.split('/').pop()?.split('?')[0] || 'Remote Model';
      await engine.loadGLTF(url, modelName);
      engine.setModelDisplayMode(loadDisplayMode);
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Failed to download or parse remote 3D model.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!engine) return;
    setLoading(true);
    setError(null);

    try {
      await engine.loadUniversalFiles([file], file.name);
      engine.setModelDisplayMode(loadDisplayMode);
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Failed to parse 3D model file.');
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div
        id="model-library-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Model Library"
        className={`pr-surface paperrocket-library-tray pointer-events-auto absolute inset-x-0 bottom-0 sm:inset-x-5 sm:bottom-5 flex flex-col p-4 sm:p-5 rounded-t-3xl sm:rounded-3xl border shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-150 ${
          isLight
            ? 'bg-white border-black/10 text-neutral-900 shadow-[0_25px_60px_rgba(0,0,0,0.15)]'
            : 'bg-neutral-900 border-neutral-800 text-zinc-100 shadow-2xl'
        }`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between pb-4 border-b ${isLight ? 'border-black/10' : 'border-zinc-800'}`}>
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${
              isLight ? 'bg-neutral-900 dark:bg-white/10 border-neutral-900 dark:border-white/20 text-neutral-900 dark:text-zinc-200' : 'bg-white/10 border-white/20 text-white'
            }`}>
              <Box className="w-5 h-5" />
            </div>
            <div>
              <h2 className={`font-semibold text-base leading-tight ${isLight ? 'text-neutral-900' : 'text-zinc-100'}`}>
                Models
              </h2>
              <p className={`text-xs ${isLight ? 'text-neutral-500' : 'text-zinc-400'}`}>
                Library & import
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {onOpenConverter && (
              <button
                onClick={() => {
                  onClose();
                  onOpenConverter();
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                  isLight
                    ? 'bg-neutral-100 hover:bg-neutral-200 border-black/10 text-neutral-800'
                    : 'bg-zinc-800 text-zinc-200 border-zinc-700 hover:bg-zinc-700'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Import model</span>
              </button>
            )}
            <button
              id="close-model-library-btn"
              onClick={onClose}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isLight ? 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Surface Loading Mode Selector & Search Filter Bar */}
        <div className={`py-3 flex flex-col gap-2.5 border-b ${isLight ? 'border-black/10' : 'border-zinc-800'}`}>
          <div className="flex items-center justify-between px-1">
            <span className={`text-[11px] font-medium uppercase tracking-wider ${isLight ? 'text-neutral-500' : 'text-zinc-400'}`}>
              Model appearance
            </span>
            <div className={`flex items-center gap-1 p-1 rounded-xl border ${
              isLight ? 'bg-neutral-100 border-black/10' : 'bg-zinc-950 border-zinc-800'
            }`}>
              <button
                type="button"
                onClick={() => setLoadDisplayMode('texture')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  loadDisplayMode === 'texture'
                    ? isLight
                      ? 'bg-white text-neutral-900 font-bold shadow-xs border border-black/10'
                      : 'bg-white text-zinc-950 font-bold shadow-sm'
                    : isLight
                    ? 'text-neutral-600 hover:text-neutral-900'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Original</span>
              </button>
              <button
                type="button"
                onClick={() => setLoadDisplayMode('clay')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  loadDisplayMode === 'clay'
                    ? isLight
                      ? 'bg-white text-neutral-900 font-bold shadow-xs border border-black/10'
                      : 'bg-white text-zinc-950 font-bold shadow-sm'
                    : isLight
                    ? 'text-neutral-600 hover:text-neutral-900'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>White clay</span>
              </button>
            </div>
          </div>

          <div className="relative">
            <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${isLight ? 'text-neutral-400' : 'text-zinc-400'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search models…"
              className={`w-full rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none transition-all ${
                isLight
                  ? 'bg-neutral-50 border border-black/15 text-neutral-900 placeholder-neutral-400 focus:border-neutral-900 dark:border-white'
                  : 'bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:border-zinc-500'
              }`}
            />
          </div>

        </div>

        {/* Models Grid & Ingestion */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          {error && (
            <div className={`p-3 rounded-xl border text-xs ${
              isLight ? 'bg-neutral-100 dark:bg-white/5 border-black/10 dark:border-white/10 text-neutral-800 dark:text-neutral-200' : 'bg-zinc-800 border-zinc-700 text-zinc-300'
            }`}>
              {error}
            </div>
          )}

          {loading ? (
            <div className={`h-64 flex flex-col items-center justify-center gap-3 ${isLight ? 'text-neutral-500' : 'text-zinc-400'}`}>
              <Loader2 className={`w-8 h-8 animate-spin ${isLight ? 'text-neutral-800' : 'text-zinc-200'}`} />
              <p className="text-xs">Preparing model…</p>
            </div>
          ) : (
            <div className="paperrocket-model-grid grid grid-cols-1 gap-0">
              {filteredPresets.map((preset) => {
                const isCurrent =
                  activeModelName.toLowerCase() === preset.name.toLowerCase() ||
                  activeModelName.toLowerCase().includes(preset.id.replace(/_/g, ' '));
                return (
                  <div
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className={`paperrocket-model-item group relative p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isCurrent
                        ? isLight
                          ? 'bg-neutral-100 dark:bg-white/5 border-neutral-900 dark:border-white shadow-sm'
                          : 'bg-white/10 border-white shadow-md'
                        : isLight
                        ? 'bg-[#f4f0e9]/80 border-black/10 hover:bg-[#ede8e0] hover:border-black/20'
                        : 'bg-zinc-950/60 border-zinc-800 hover:bg-zinc-800/50 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className={`text-sm font-semibold leading-tight transition-colors ${
                          isLight ? 'text-neutral-900 group-hover:text-neutral-900 dark:text-neutral-200' : 'text-zinc-100 group-hover:text-white'
                        }`}>
                          {preset.name}
                        </h3>
                        {isCurrent && (
                          <span className={`flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded font-bold ${
                            isLight ? 'bg-neutral-900 dark:bg-white text-white' : 'bg-white text-zinc-950'
                          }`}>
                            <Check className="w-2.5 h-2.5" /> Active
                          </span>
                        )}
                      </div>
                      <p className={`text-xs line-clamp-2 leading-relaxed ${isLight ? 'text-neutral-600' : 'text-zinc-400'}`}>
                        {preset.description}
                      </p>
                    </div>

                    <div className={`mt-3 pt-2.5 border-t flex items-center justify-between text-[11px] ${
                      isLight ? 'border-black/10 text-neutral-500' : 'border-zinc-800/60 text-zinc-400'
                    }`}>
                      <span className="text-[10px]">
                        {preset.file ? 'Draco GLB' : 'Procedural Mesh'}
                      </span>
                      <span className={`font-medium group-hover:translate-x-0.5 transition-all ${
                        isLight ? 'text-neutral-800 group-hover:text-neutral-900 dark:text-zinc-200' : 'text-zinc-300 group-hover:text-white'
                      }`}>
                        Load Model →
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {filteredPresets.length === 0 && !loading && (
            <div className={`py-12 text-center text-xs ${isLight ? 'text-neutral-400' : 'text-zinc-500'}`}>
              No 3D models match &ldquo;{searchQuery}&rdquo;. Try another search term or upload a file.
            </div>
          )}

          {/* Upload Dropzone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`paperrocket-model-upload mt-4 p-5 rounded-2xl border-2 border-dashed transition-all text-center flex flex-col items-center justify-center gap-2 ${
              isDragging
                ? isLight
                  ? 'border-neutral-900 dark:border-white bg-neutral-100 dark:bg-white/5 text-neutral-900 dark:text-white'
                  : 'border-white bg-white/10 text-white'
                : isLight
                ? 'border-neutral-300 bg-neutral-50 text-neutral-600 hover:border-neutral-400'
                : 'border-zinc-800 bg-zinc-950/30 text-zinc-400 hover:border-zinc-700'
            }`}
          >
            <Upload className={`w-6 h-6 ${isLight ? 'text-neutral-500' : 'text-zinc-400'}`} />
            <div>
              <p className={`text-xs font-medium ${isLight ? 'text-neutral-800' : 'text-zinc-200'}`}>
                Drag & drop any custom 3D model (.glb, .gltf, .obj)
              </p>
              <p className={`text-[11px] mt-0.5 ${isLight ? 'text-neutral-500' : 'text-zinc-400'}`}>
                GLB, GLTF, and OBJ files supported
              </p>
            </div>
            <label className={`mt-1 px-3.5 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-colors border ${
              isLight
                ? 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border-black/10'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700'
            }`}>
              Choose file
              <input
                type="file"
                accept=".glb,.gltf,.obj"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
              />
            </label>
          </div>

          {/* Remote URL Ingestion */}
          <div className="paperrocket-model-url flex gap-2">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Or paste direct 3D model GLB URL (e.g. GitHub raw or CDN)..."
              className={`flex-1 rounded-xl px-3 py-2 text-xs focus:outline-none transition-all ${
                isLight
                  ? 'bg-neutral-50 border border-black/15 text-neutral-900 placeholder-neutral-400 focus:border-neutral-900 dark:border-white'
                  : 'bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:border-zinc-500'
              }`}
            />
            <button
              onClick={handleUrlLoad}
              disabled={!urlInput.trim() || loading}
              className="px-4 py-2 rounded-xl bg-neutral-900 dark:bg-white hover:bg-neutral-900 dark:bg-white disabled:opacity-50 text-white text-xs font-semibold transition-colors"
            >
              Fetch & Load
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
