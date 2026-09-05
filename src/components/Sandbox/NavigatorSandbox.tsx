/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback, useEffect } from 'react';
import { SandboxNavState, SandboxTheme } from './types';
import { PreviewScene } from './PreviewScene';

// 7 Reference Concept Variations
import { DepthTwistPuckNavigator } from './variations/DepthTwistPuckNavigator';
import { ConcentricGimbalNavigator } from './variations/ConcentricGimbalNavigator';
import { TactileTripleBezelNavigator } from './variations/TactileTripleBezelNavigator';
import { FloatingNubNavigator } from './variations/FloatingNubNavigator';
import { CoordinateAxisGimbalNavigator } from './variations/CoordinateAxisGimbalNavigator';
import { SceneStepArcNavigator } from './variations/SceneStepArcNavigator';
import { OmniDirectionalSnapNavigator } from './variations/OmniDirectionalSnapNavigator';

interface NavigatorSandboxProps {
  onClose?: () => void;
}

export const NavigatorSandbox: React.FC<NavigatorSandboxProps> = ({ onClose }) => {
  const [activeConcept, setActiveConcept] = useState<number>(1);
  const theme: SandboxTheme = 'dark';

  // Core navigation state
  const [navState, setNavState] = useState<SandboxNavState>({
    x: 0,
    y: 0,
    z: 0,
    pitch: 15,
    yaw: -30,
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

  // Keyboard shortcut listener: numbers 1-7 and left/right arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= 7) {
        setActiveConcept(num);
      } else if (e.key === 'ArrowRight' && !e.ctrlKey && !e.metaKey) {
        setActiveConcept((c) => (c < 7 ? c + 1 : 1));
      } else if (e.key === 'ArrowLeft' && !e.ctrlKey && !e.metaKey) {
        setActiveConcept((c) => (c > 1 ? c - 1 : 7));
      } else if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleStateChange = useCallback((updater: (prev: SandboxNavState) => SandboxNavState) => {
    setNavState((prev) => updater(prev));
  }, []);

  const handleReset = useCallback(() => {
    setNavState({
      x: 0,
      y: 0,
      z: 0,
      pitch: 15,
      yaw: -30,
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

  const concepts = [
    { id: 1, name: 'Depth & Twist Puck' },
    { id: 2, name: 'Concentric Gimbal' },
    { id: 3, name: 'Triple-Bezel Gimbal' },
    { id: 4, name: 'SCENE Floating Nub' },
    { id: 5, name: 'Coordinate Axis (Flat/3D)' },
    { id: 6, name: 'SCENE Step & Arc Meter' },
    { id: 7, name: 'Omni 3D Snap Dome' },
  ];

  // Render active variation component
  const renderNavVariation = () => {
    const props = {
      state: navState,
      onChange: handleStateChange,
      onReset: handleReset,
      theme,
      soundEnabled: true,
      isResting: navState.isResting,
      onToggleResting: () => setNavState((p) => ({ ...p, isResting: !p.isResting })),
      displayMode: 'expanded' as const,
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
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col w-screen h-screen select-none font-sans bg-[#0c0d10] text-neutral-100 overflow-hidden">
      {/* 1. THE PANE: Pure full-screen 3D viewport with aerodynamic helmet */}
      <div className="absolute inset-0 z-0">
        <PreviewScene
          navState={navState}
          theme={theme}
          modelType="helmet"
          className="w-full h-full"
        />
      </div>

      {/* 2. THE NAV TOOL SELECTOR: Minimalist, elegant floating pill at top */}
      <div className="relative z-30 w-full pt-3 px-4 flex items-center justify-between pointer-events-none">
        {/* Reset Camera View button */}
        <button
          onClick={handleReset}
          className="pointer-events-auto min-h-[44px] px-3 py-1.5 rounded-xl border border-neutral-800 bg-[#14161c]/90 text-neutral-400 hover:text-white text-xs font-mono transition-colors shadow-lg active:scale-95 cursor-pointer"
          title="Reset 3D Camera"
        >
          Reset View
        </button>

        {/* Center Concept Selector Switcher */}
        <div className="pointer-events-auto flex items-center gap-1.5 p-1 rounded-2xl border border-neutral-800 bg-[#12141a]/95 shadow-2xl backdrop-blur-none">
          <button
            onClick={() => setActiveConcept((c) => (c > 1 ? c - 1 : 7))}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 active:scale-90 transition-all cursor-pointer"
            aria-label="Previous Nav Tool"
          >
            ◀
          </button>

          {/* Direct 1-7 Number Pills */}
          <div className="flex items-center gap-1 px-1">
            {concepts.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveConcept(c.id)}
                className={`w-8 h-8 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                  activeConcept === c.id
                    ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(37,99,235,0.6)]'
                    : 'text-neutral-400 hover:text-white hover:bg-white/10'
                }`}
                title={c.name}
              >
                {c.id}
              </button>
            ))}
          </div>

          <button
            onClick={() => setActiveConcept((c) => (c < 7 ? c + 1 : 1))}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 active:scale-90 transition-all cursor-pointer"
            aria-label="Next Nav Tool"
          >
            ▶
          </button>
        </div>

        {/* Exit Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="pointer-events-auto min-h-[44px] px-3.5 py-1.5 rounded-xl border border-neutral-800 bg-[#14161c]/90 text-neutral-400 hover:text-white text-xs font-mono transition-colors shadow-lg active:scale-95 cursor-pointer flex items-center gap-1.5"
            title="Exit to Studio"
          >
            <span>Exit</span>
            <span className="text-sm leading-none">✕</span>
          </button>
        )}
      </div>

      {/* Active Concept Name Subtitle Indicator */}
      <div className="relative z-20 w-full mt-2 flex justify-center pointer-events-none select-none">
        <div className="px-3 py-1 rounded-full border border-neutral-800/80 bg-[#101217]/80 text-[11px] font-mono text-neutral-300 shadow">
          <span className="text-blue-400 font-bold mr-1.5">Tool {activeConcept}:</span>
          <span>{concepts[activeConcept - 1].name}</span>
        </div>
      </div>

      {/* 3. THE TOOL: Positioned at bottom-right (responsive for mobile) */}
      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 pointer-events-auto z-30 max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:right-auto flex flex-col items-center">
        {renderNavVariation()}
      </div>
    </div>
  );
};
