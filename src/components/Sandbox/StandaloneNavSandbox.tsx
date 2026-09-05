/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback, useEffect } from 'react';
import { SandboxNavState } from './types';
import { PreviewScene } from './PreviewScene';
import { setGlobalSoundEnabled } from '../../utils/audio';

// 15 Tactile Instrument Variations
import { DepthTwistPuckNavigator } from './variations/DepthTwistPuckNavigator';
import { ConcentricGimbalNavigator } from './variations/ConcentricGimbalNavigator';
import { TactileTripleBezelNavigator } from './variations/TactileTripleBezelNavigator';
import { FloatingNubNavigator } from './variations/FloatingNubNavigator';
import { CoordinateAxisGimbalNavigator } from './variations/CoordinateAxisGimbalNavigator';
import { SceneStepArcNavigator } from './variations/SceneStepArcNavigator';
import { OmniDirectionalSnapNavigator } from './variations/OmniDirectionalSnapNavigator';
import { CameraTrackballGimbalNavigator } from './variations/CameraTrackballGimbalNavigator';
import { TactileHardwareDeckNavigator } from './variations/TactileHardwareDeckNavigator';
import { SectorLightConeNavigator } from './variations/SectorLightConeNavigator';
import { KnurledHatchPuckNavigator } from './variations/KnurledHatchPuckNavigator';
import { MultiTierOrthogonalDialNavigator } from './variations/MultiTierOrthogonalDialNavigator';
import { RadialActionCompassNavigator } from './variations/RadialActionCompassNavigator';
import { PrecisionCrosshairDialNavigator } from './variations/PrecisionCrosshairDialNavigator';
import { DirectionalArrowOrbitalNavigator } from './variations/DirectionalArrowOrbitalNavigator';

export const StandaloneNavSandbox: React.FC = () => {
  const [activeConcept, setActiveConcept] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'studio' | 'study'>('studio');

  // Complete removal of sound effects: force global sound disabled on mount
  useEffect(() => {
    setGlobalSoundEnabled(false);
  }, []);

  // Core navigation state
  const [navState, setNavState] = useState<SandboxNavState>({
    x: 0,
    y: 0,
    z: 0,
    pitch: 14,
    yaw: -28,
    roll: 0,
    scale: 1.0,
    brushSize: 12.0,
    activeMode: '3d',
    projection: 'perspective',
    floorGridActive: true,
    turntableActive: false,
    pressure: 0.2,
    activeGesture: null,
    isResting: false,
  });

  const concepts = [
    {
      id: 1,
      name: 'Depth & Twist Puck',
      subtitle: 'Continuous translation plane · Axial depth slide · Workspace roll',
      ref: 'exec-3155529c',
    },
    {
      id: 2,
      name: 'Concentric Gimbal Dial',
      subtitle: '3-tier concentric rings · Look aim · Elevation tilt · 360° Arc bead',
      ref: 'exec-b3c65c9f',
    },
    {
      id: 3,
      name: 'Tactile Triple Bezel',
      subtitle: 'Machined titanium step bezel · Center pinpoint LED · Perimeter ticks',
      ref: 'exec-d93302dc',
    },
    {
      id: 4,
      name: 'SCENE Floating Nub',
      subtitle: 'Dynamic tether trajectory · Spring return · Cardinal cyan notch',
      ref: 'exec-fa01295a',
    },
    {
      id: 5,
      name: 'Coordinate Axis Gimbal',
      subtitle: 'Orthogonal X/Y/Z labels · Metallic dome · Flush Flat/3D projection toggle',
      ref: 'exec-8cb3d224',
    },
    {
      id: 6,
      name: 'SCENE Step & Arc Meter',
      subtitle: 'Horizon resting dial · Dual-axis pan/step · Illuminated blue arc gauge',
      ref: 'exec-9dfeaac6',
    },
    {
      id: 7,
      name: 'Omni 3D Snap Dome',
      subtitle: 'Continuous spherical vector · Isometric cube snap · Turntable cycle',
      ref: 'exec-4110edb9',
    },
    {
      id: 8,
      name: 'Camera Trackball Gimbal',
      subtitle: 'Ceramic trackball dome · Horizon constrain rim · Double-tap hero view',
      ref: 'exec-c6ba0801',
    },
    {
      id: 9,
      name: 'Tactile Hardware Deck',
      subtitle: 'Physical controller nub · RGB axis snap buttons · Mechanical Flat/3D switch',
      ref: 'exec-8094dd94',
    },
    {
      id: 10,
      name: 'Sector Light-Cone Gimbal',
      subtitle: 'Illuminated blue view-cone · Cardinal chevrons · VIEW camera toggle',
      ref: 'exec-7d0d94c9',
    },
    {
      id: 11,
      name: 'Knurled Hatch Puck',
      subtitle: '45° knurled drafting hatch · Luminous pointer bead · Blue LED arc tracker',
      ref: 'exec-2d9ac5af',
    },
    {
      id: 12,
      name: 'Multi-Tier Orthogonal Dial',
      subtitle: 'Cardinal X/Y/Z pairs · Active sector badge · Spun metallic dome & cube snap',
      ref: 'exec-2add514a',
    },
    {
      id: 13,
      name: 'Radial Action Compass',
      subtitle: 'Cyan isometric cube · 4 cardinal shortcuts (Layers, Rotate, Fit, Light)',
      ref: 'exec-cc60fb26',
    },
    {
      id: 14,
      name: 'Precision Crosshair Dial',
      subtitle: 'Cyan pinhead dot · Elevation & heading crosshair · Perimeter degree ticks',
      ref: 'exec-528da0da',
    },
    {
      id: 15,
      name: 'Directional Arrow Orbital Dial',
      subtitle: 'Directional cyan cross · Orbit ring rotation · Isometric & zoom triggers',
      ref: 'exec-0a047cd1',
    },
  ];

  const totalCount = concepts.length;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= 9) {
        setActiveConcept(num);
      } else if (e.key === 'ArrowRight' && !e.ctrlKey && !e.metaKey) {
        setActiveConcept((c) => (c < totalCount ? c + 1 : 1));
      } else if (e.key === 'ArrowLeft' && !e.ctrlKey && !e.metaKey) {
        setActiveConcept((c) => (c > 1 ? c - 1 : totalCount));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalCount]);

  const handleStateChange = useCallback((updater: (prev: SandboxNavState) => SandboxNavState) => {
    setNavState((prev) => updater(prev));
  }, []);

  const handleReset = useCallback(() => {
    setNavState({
      x: 0,
      y: 0,
      z: 0,
      pitch: 14,
      yaw: -28,
      roll: 0,
      scale: 1.0,
      brushSize: 12.0,
      activeMode: '3d',
      projection: 'perspective',
      floorGridActive: true,
      turntableActive: false,
      pressure: 0.2,
      activeGesture: null,
      isResting: false,
    });
  }, []);

  const currentConcept = concepts[activeConcept - 1];

  // Render active variation component
  const renderNavVariation = (displayMode: 'expanded' | 'side-by-side' = 'expanded') => {
    const props = {
      state: navState,
      onChange: handleStateChange,
      onReset: handleReset,
      theme: 'dark' as const,
      soundEnabled: false, // Silent, distraction-free
      isResting: navState.isResting,
      onToggleResting: () => setNavState((p) => ({ ...p, isResting: !p.isResting })),
      displayMode,
    };

    switch (activeConcept) {
      case 1:
        return <DepthTwistPuckNavigator {...props} />;
      case 2:
        return <ConcentricGimbalNavigator {...props} />;
      case 3:
        return <TactileTripleBezelNavigator {...props} />;
      case 4:
        return <FloatingNubNavigator {...props} />;
      case 5:
        return <CoordinateAxisGimbalNavigator {...props} />;
      case 6:
        return <SceneStepArcNavigator {...props} />;
      case 7:
        return <OmniDirectionalSnapNavigator {...props} />;
      case 8:
        return <CameraTrackballGimbalNavigator {...props} />;
      case 9:
        return <TactileHardwareDeckNavigator {...props} />;
      case 10:
        return <SectorLightConeNavigator {...props} />;
      case 11:
        return <KnurledHatchPuckNavigator {...props} />;
      case 12:
        return <MultiTierOrthogonalDialNavigator {...props} />;
      case 13:
        return <RadialActionCompassNavigator {...props} />;
      case 14:
        return <PrecisionCrosshairDialNavigator {...props} />;
      case 15:
        return <DirectionalArrowOrbitalNavigator {...props} />;
      default:
        return null;
    }
  };

  return (
    <div
      className="fixed inset-0 w-screen h-screen select-none font-sans bg-[#0c0d10] text-neutral-200 overflow-hidden flex flex-col touch-none"
      style={{ touchAction: 'none' }}
    >
      {/* 1. CINEMATIC 3D STUDIO CANVAS (Visually dominant, natural full-viewport) */}
      <div className="absolute inset-0 z-0">
        <PreviewScene navState={navState} theme="dark" className="w-full h-full" />
      </div>

      {/* 2. RESTRAINED EDITORIAL MASTHEAD */}
      {/* MOBILE HEADER (< sm): Single slim 44px bar, zero vertical crowding */}
      <header className="sm:hidden relative z-30 w-full h-11 px-3 flex items-center justify-between border-b border-white/5 bg-[#0c0d10]/80 pointer-events-auto">
        {/* Left: Brand */}
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/90 font-semibold">
          PaperRockets
        </div>

        {/* Center: Compact Carousel Switcher */}
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-white/10 bg-[#14171e]/90 shadow-md">
          <button
            onClick={() => setActiveConcept((c) => (c > 1 ? c - 1 : totalCount))}
            className="w-7 h-7 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer text-xs"
            aria-label="Previous Instrument"
          >
            ←
          </button>
          <div className="font-mono text-[10px] tracking-wider text-neutral-300 px-1 whitespace-nowrap">
            {activeConcept.toString().padStart(2, '0')}/{totalCount.toString().padStart(2, '0')}
          </div>
          <button
            onClick={() => setActiveConcept((c) => (c < totalCount ? c + 1 : 1))}
            className="w-7 h-7 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer text-xs"
            aria-label="Next Instrument"
          >
            →
          </button>
        </div>

        {/* Right: Quick Actions */}
        <div className="flex items-center gap-1.5 font-mono text-[9px]">
          <button
            onClick={() => setViewMode((m) => (m === 'studio' ? 'study' : 'studio'))}
            className="px-2 py-1 rounded border border-white/10 text-neutral-300 hover:text-white"
          >
            {viewMode === 'studio' ? 'Study' : 'Studio'}
          </button>
          <button
            onClick={handleReset}
            className="px-2 py-1 rounded border border-white/10 text-neutral-300 hover:text-white"
          >
            Reset
          </button>
        </div>
      </header>

      {/* DESKTOP HEADER (sm+): Generous negative space editorial masthead */}
      <header className="hidden sm:flex relative z-30 w-full pt-4 px-8 items-center justify-between pointer-events-none">
        {/* Left: Minimal Brand */}
        <div className="flex flex-col select-none pointer-events-auto">
          <div className="font-mono text-[11px] tracking-[0.25em] uppercase text-white/90 font-semibold">
            PaperRockets
          </div>
          <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-neutral-500 mt-0.5">
            Spatial Gimbal Archive
          </div>
        </div>

        {/* Center: Editorial Index Switcher */}
        <div className="pointer-events-auto flex flex-col items-center select-none">
          <div className="flex items-center gap-1 px-3 py-1 rounded-full border border-white/10 bg-[#12141a]/90 shadow-lg">
            <button
              onClick={() => setActiveConcept((c) => (c > 1 ? c - 1 : totalCount))}
              className="min-w-[36px] min-h-[36px] flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer text-sm"
              aria-label="Previous Instrument"
            >
              ←
            </button>

            {concepts.map((c) => {
              const isActive = activeConcept === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveConcept(c.id)}
                  className={`min-w-[32px] min-h-[32px] flex items-center justify-center rounded-md font-mono text-[11px] transition-all cursor-pointer ${
                    isActive
                      ? 'text-white font-bold bg-white/15 shadow-inner'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {c.id.toString().padStart(2, '0')}
                </button>
              );
            })}

            <button
              onClick={() => setActiveConcept((c) => (c < totalCount ? c + 1 : 1))}
              className="min-w-[36px] min-h-[36px] flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer text-sm"
              aria-label="Next Instrument"
            >
              →
            </button>
          </div>

          {/* Quiet Concept Subtitle */}
          <div className="mt-2 font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-400 text-center">
            {currentConcept.name} · <span className="text-neutral-500">{currentConcept.subtitle}</span>
          </div>
        </div>

        {/* Right: Secondary Controls */}
        <div className="pointer-events-auto flex items-center gap-2 font-mono text-[10px] tracking-wider uppercase select-none">
          <button
            onClick={() => setViewMode((m) => (m === 'studio' ? 'study' : 'studio'))}
            className={`min-h-[36px] px-3.5 py-1 rounded-lg border transition-all cursor-pointer flex items-center justify-center ${
              viewMode === 'study'
                ? 'border-white/30 text-white bg-white/10'
                : 'border-white/10 text-neutral-400 hover:text-white'
            }`}
          >
            {viewMode === 'studio' ? 'Studio' : 'Study'}
          </button>

          <button
            onClick={handleReset}
            className="min-h-[36px] px-3.5 py-1 rounded-lg border border-white/10 text-neutral-400 hover:text-white transition-all cursor-pointer flex items-center justify-center"
            title="Zero view coordinates"
          >
            Reset
          </button>
        </div>
      </header>

      {/* 3. MAIN COMPOSITION: STUDIO MODE vs EDITORIAL STUDY MODE */}
      {viewMode === 'studio' ? (
        /* STUDIO MODE: Live tool docked naturally in the lower-right area with plenty of breathing room */
        <div
          className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 pointer-events-auto z-30 max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:right-auto flex flex-col items-center touch-none"
          style={{ touchAction: 'none' }}
        >
          {/* Subtle Mobile Concept Name Tag */}
          <div className="sm:hidden mb-2 font-mono text-[9px] tracking-widest uppercase text-neutral-500 text-center pointer-events-none">
            {currentConcept.name}
          </div>
          {renderNavVariation('expanded')}
        </div>
      ) : (
        /* STUDY MODE: Editorial Side-by-Side Architectural Study (Resting vs Active) */
        <div className="absolute inset-0 z-20 pointer-events-auto flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
          <div className="max-w-4xl w-full flex flex-col items-center select-none">
            <div className="w-full flex items-center justify-center">
              {renderNavVariation('side-by-side')}
            </div>

            <div className="mt-8 font-mono text-[9px] tracking-[0.25em] uppercase text-neutral-500 text-center max-w-lg leading-relaxed">
              Tactile hardware study · Zero software clutter · Reference: {currentConcept.ref}
            </div>
          </div>
        </div>
      )}

      {/* Subtle Bottom Status Coordinates */}
      <footer className="absolute bottom-4 left-6 z-20 pointer-events-none font-mono text-[9px] tracking-[0.18em] uppercase text-neutral-600 select-none hidden sm:block">
        POS [{navState.x.toFixed(0)}, {navState.y.toFixed(0)}, {navState.z.toFixed(0)}] · ROT [{navState.yaw.toFixed(0)}°, {navState.pitch.toFixed(0)}°] · {navState.projection || 'PERSPECTIVE'}
      </footer>
    </div>
  );
};
