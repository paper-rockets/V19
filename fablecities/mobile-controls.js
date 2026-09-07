/**
 * Mobile Phone Touchscreen Controls for Fable Cities
 * 
 * Provides:
 * 1. Multi-touch Pinch to Zoom In / Zoom Out
 * 2. Multi-touch 2-Finger Pan across map
 * 3. Multi-touch 2-Finger Rotate (twist)
 * 4. 1-Finger Orbit / Pan mode toggle
 * 5. On-screen Touch HUD (Zoom +, Zoom -, Rotate, Tilt, Pan D-Pad, Presets)
 */

(function () {
  'use strict';

  function waitForGame(callback) {
    if (window.__game && window.__game.cameraController) {
      callback(window.__game);
    } else {
      setTimeout(() => waitForGame(callback), 150);
    }
  }

  waitForGame(game => {
    console.log('[MobileControls] Initializing mobile phone touchscreen controls...');
    initMobileControls(game);
  });

  function initMobileControls(game) {
    const cam = game.cameraController;
    const canvas = document.getElementById('game');

    let currentMode = 'look'; // 1-finger orbits and tilts camera smoothly
    let isMinimized = false;

    const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

    // ==========================================
    // 1. CREATE ON-SCREEN MOBILE HUD
    // ==========================================
    const hud = document.createElement('div');
    hud.id = 'fc-mobile-hud';

    hud.innerHTML = `
      <!-- Top Right Toggle Pill -->
      <button id="fc-mob-toggle-btn" class="fc-mob-interactive active" title="Show/Hide touch controls">
        <span>Controls</span>
      </button>

      <!-- Gesture Hint Popup -->
      <div id="fc-mob-gesture-hint">Pinch with 2 fingers to zoom</div>

      <!-- Bottom-Left Pan D-Pad -->
      <div id="fc-mob-dpad" class="fc-mob-interactive">
        <button class="fc-dpad-btn fc-dpad-up" id="fc-btn-pan-up" aria-label="Pan Up">▲</button>
        <button class="fc-dpad-btn fc-dpad-left" id="fc-btn-pan-left" aria-label="Pan Left">◀</button>
        <div class="fc-dpad-center">PAN</div>
        <button class="fc-dpad-btn fc-dpad-right" id="fc-btn-pan-right" aria-label="Pan Right">▶</button>
        <button class="fc-dpad-btn fc-dpad-down" id="fc-btn-pan-down" aria-label="Pan Down">▼</button>
      </div>

      <!-- Bottom-Right Zoom & Rotation Cluster -->
      <div id="fc-mob-right-cluster" class="fc-mob-interactive">
        <!-- Rotation Row -->
        <div class="fc-mob-btn-row">
          <button class="fc-mob-btn" id="fc-btn-rot-left" title="Rotate Left" aria-label="Rotate Left">⟲</button>
          <button class="fc-mob-btn" id="fc-btn-rot-right" title="Rotate Right" aria-label="Rotate Right">⟳</button>
        </div>

        <!-- Tilt Row -->
        <div class="fc-mob-btn-row">
          <button class="fc-mob-btn" id="fc-btn-tilt-up" title="Tilt Up" aria-label="Tilt Up">▲</button>
          <button class="fc-mob-btn" id="fc-btn-tilt-down" title="Tilt Down" aria-label="Tilt Down">▼</button>
        </div>

        <!-- Zoom Stack -->
        <div class="fc-mob-btn-group">
          <button class="fc-mob-btn" id="fc-btn-zoom-in" title="Zoom In" aria-label="Zoom In">+</button>
          <button class="fc-mob-btn" id="fc-btn-zoom-out" title="Zoom Out" aria-label="Zoom Out">−</button>
        </div>
      </div>

      <!-- Bottom Presets Bar -->
      <div id="fc-mob-presets" class="fc-mob-interactive">
        <button class="fc-mob-preset-btn" data-preset="city">City</button>
        <button class="fc-mob-preset-btn" data-preset="top">Top</button>
        <button class="fc-mob-preset-btn" data-preset="street">Street</button>
        <button class="fc-mob-preset-btn" data-preset="aerial">Aerial</button>
        <button class="fc-mob-preset-btn" data-preset="skyline">Skyline</button>
        <button class="fc-mob-preset-btn" id="fc-btn-reset-view">↺ Reset</button>
      </div>
    `;

    document.body.appendChild(hud);

    // Auto-unminimize when start menu closes or game starts
    if (game.events && typeof game.events.on === 'function') {
      game.events.on('game:start', () => {
        isMinimized = false;
        hud.classList.remove('minimized');
        const toggleBtn = document.getElementById('fc-mob-toggle-btn');
        if (toggleBtn) toggleBtn.classList.add('active');
        const label = document.getElementById('fc-toggle-label');
        if (label) label.textContent = 'Controls';
        showHint('Touch controls active: Pinch to zoom in/out');
      });
    }

    // Also observe DOM if start menu is removed
    const menuEl = document.querySelector('.fm-stage');
    if (menuEl) {
      const observer = new MutationObserver(() => {
        if (!document.body.contains(menuEl) || menuEl.classList.contains('hidden') || menuEl.style.display === 'none') {
          isMinimized = false;
          hud.classList.remove('minimized');
          const toggleBtn = document.getElementById('fc-mob-toggle-btn');
          if (toggleBtn) toggleBtn.classList.add('active');
          const label = document.getElementById('fc-toggle-label');
          if (label) label.textContent = 'Controls';
          observer.disconnect();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true, attributes: true });
    }

    // ==========================================
    // 2. CAMERA MANIPULATION FUNCTIONS
    // ==========================================

    function zoomByFactor(factor) {
      if (!cam.desired) return;
      const cur = cam.desired.distance;
      const target = clamp(cur * factor, cam.minDistance || 10, cam.maxDistance || 3000);
      cam.desired.distance = target;
    }

    function rotateBy(deltaYaw) {
      if (!cam.desired) return;
      cam.desired.yaw += deltaYaw;
    }

    function tiltBy(deltaPitch) {
      if (!cam.desired) return;
      const minP = cam.minPitch || 0.1;
      const maxP = cam.maxPitch || 1.5;
      cam.desired.pitch = clamp(cam.desired.pitch + deltaPitch, minP, maxP);
    }

    function panBy(dx, dy) {
      if (!cam.desired || !cam.desired.target) return;
      const yaw = cam.desired.yaw;
      const scale = (cam.desired.distance / 500) * 8.0;

      const fwdX = -Math.sin(yaw);
      const fwdZ = -Math.cos(yaw);
      const rgtX = Math.cos(yaw);
      const rgtZ = -Math.sin(yaw);

      cam.desired.target.x += (rgtX * dx + fwdX * dy) * scale;
      cam.desired.target.z += (rgtZ * dx + fwdZ * dy) * scale;

      if (game.world && game.world.terrain && typeof game.world.terrain.getHeight === 'function') {
        cam.desired.target.y = game.world.terrain.getHeight(cam.desired.target.x, cam.desired.target.z);
      }
    }

    const hintEl = document.getElementById('fc-mob-gesture-hint');
    let hintTimeout;
    function showHint(text) {
      if (!hintEl) return;
      hintEl.textContent = text;
      hintEl.classList.add('show');
      clearTimeout(hintTimeout);
      hintTimeout = setTimeout(() => hintEl.classList.remove('show'), 2200);
    }

    // ==========================================
    // 3. CONTINUOUS BUTTON PRESS HANDLERS
    // ==========================================

    function setupHoldButton(btnId, actionFn) {
      const btn = document.getElementById(btnId);
      if (!btn) return;

      let intervalId = null;
      let startTimeout = null;

      const startAction = (e) => {
        if (e.cancelable) e.preventDefault();
        e.stopPropagation();
        btn.classList.add('pressed');
        actionFn();

        startTimeout = setTimeout(() => {
          intervalId = setInterval(actionFn, 50);
        }, 250);
      };

      const stopAction = () => {
        btn.classList.remove('pressed');
        clearTimeout(startTimeout);
        clearInterval(intervalId);
      };

      btn.addEventListener('pointerdown', startAction);
      btn.addEventListener('pointerup', stopAction);
      btn.addEventListener('pointercancel', stopAction);
      btn.addEventListener('pointerleave', stopAction);
    }

    // Zoom Buttons
    setupHoldButton('fc-btn-zoom-in', () => zoomByFactor(0.92));
    setupHoldButton('fc-btn-zoom-out', () => zoomByFactor(1.08));

    // Rotate Buttons
    setupHoldButton('fc-btn-rot-left', () => rotateBy(0.05));
    setupHoldButton('fc-btn-rot-right', () => rotateBy(-0.05));

    // Tilt Buttons
    setupHoldButton('fc-btn-tilt-up', () => tiltBy(0.04));
    setupHoldButton('fc-btn-tilt-down', () => tiltBy(-0.04));

    // D-Pad Pan Buttons
    setupHoldButton('fc-btn-pan-up', () => panBy(0, 1.2));
    setupHoldButton('fc-btn-pan-down', () => panBy(0, -1.2));
    setupHoldButton('fc-btn-pan-left', () => panBy(-1.2, 0));
    setupHoldButton('fc-btn-pan-right', () => panBy(1.2, 0));

    // Presets
    document.querySelectorAll('.fc-mob-preset-btn[data-preset]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const preset = btn.getAttribute('data-preset');
        if (typeof game.setCamera === 'function') {
          game.setCamera(preset);
          showHint(`Switched to ${preset.toUpperCase()} view`);
        }
      });
    });

    // Reset View
    const resetBtn = document.getElementById('fc-btn-reset-view');
    if (resetBtn) {
      resetBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (typeof game.setCamera === 'function') {
          game.setCamera('city');
          showHint('View Reset');
        }
      });
    }

    // Toggle HUD Minimized / Visible
    const toggleBtn = document.getElementById('fc-mob-toggle-btn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        isMinimized = !isMinimized;
        hud.classList.toggle('minimized', isMinimized);
        toggleBtn.classList.toggle('active', !isMinimized);
        document.getElementById('fc-toggle-label').textContent = isMinimized ? 'Touch' : 'Controls';
      });
    }

    // Mode Toggle: Build vs Look (if present)
    const buildBtn = document.getElementById('fc-mode-build');
    const lookBtn = document.getElementById('fc-mode-look');

    function setMode(mode) {
      currentMode = mode;
      if (buildBtn && lookBtn) {
        if (mode === 'build') {
          buildBtn.classList.add('active');
          lookBtn.classList.remove('active');
          showHint('Build Mode: 1-finger tool, 2-finger zoom/pan');
        } else {
          lookBtn.classList.add('active');
          buildBtn.classList.remove('active');
          showHint('Camera Mode: 1-finger orbits & tilts');
        }
      }
    }

    if (buildBtn) buildBtn.addEventListener('click', () => setMode('build'));
    if (lookBtn) lookBtn.addEventListener('click', () => setMode('look'));

    // ==========================================
    // 4. TOUCH GESTURE RECOGNIZER ON CANVAS
    // ==========================================

    let activeTouches = new Map();
    let initialPinchDist = 0;
    let initialDistance = 0;
    let initialAngle = 0;
    let initialYaw = 0;
    let lastMidpoint = { x: 0, y: 0 };
    let singleTouchStart = { x: 0, y: 0 };
    let isPinching = false;

    canvas.addEventListener('touchstart', (e) => {
      for (let i = 0; i < e.changedTouches.length; i++) {
        const t = e.changedTouches[i];
        activeTouches.set(t.identifier, { x: t.clientX, y: t.clientY });
      }

      if (activeTouches.size === 1) {
        const t = e.touches[0];
        singleTouchStart = { x: t.clientX, y: t.clientY };
      } else if (activeTouches.size === 2) {
        isPinching = true;
        const t1 = e.touches[0];
        const t2 = e.touches[1];

        initialPinchDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
        initialDistance = cam.desired ? cam.desired.distance : cam.distance;
        initialAngle = Math.atan2(t2.clientY - t1.clientY, t2.clientX - t1.clientX);
        initialYaw = cam.desired ? cam.desired.yaw : cam.yaw;
        lastMidpoint = {
          x: (t1.clientX + t2.clientX) / 2,
          y: (t1.clientY + t2.clientY) / 2
        };

        if (e.cancelable) e.preventDefault();
      }
    }, { passive: false });

    canvas.addEventListener('touchmove', (e) => {
      for (let i = 0; i < e.changedTouches.length; i++) {
        const t = e.changedTouches[i];
        activeTouches.set(t.identifier, { x: t.clientX, y: t.clientY });
      }

      // CASE 1: TWO-FINGER PINCH TO ZOOM & PAN & ROTATE
      if (e.touches.length === 2 && isPinching) {
        if (e.cancelable) e.preventDefault();

        const t1 = e.touches[0];
        const t2 = e.touches[1];

        // 1. Pinch to Zoom In / Zoom Out
        const currentPinchDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
        if (initialPinchDist > 5 && currentPinchDist > 5) {
          const pinchScale = initialPinchDist / currentPinchDist;
          if (cam.desired) {
            cam.desired.distance = clamp(
              initialDistance * pinchScale,
              cam.minDistance || 10,
              cam.maxDistance || 3000
            );
          }
        }

        // 2. Two-finger Pan
        const currentMid = {
          x: (t1.clientX + t2.clientX) / 2,
          y: (t1.clientY + t2.clientY) / 2
        };
        const dx = (currentMid.x - lastMidpoint.x) * 0.12;
        const dy = (currentMid.y - lastMidpoint.y) * 0.12;
        panBy(-dx, dy);
        lastMidpoint = currentMid;

        // 3. Two-finger Rotation (twist)
        const currentAngle = Math.atan2(t2.clientY - t1.clientY, t2.clientX - t1.clientX);
        const deltaAngle = currentAngle - initialAngle;
        if (Math.abs(deltaAngle) > 0.05 && cam.desired) {
          cam.desired.yaw = initialYaw - deltaAngle * 1.2;
        }
        return;
      }

      // CASE 2: ONE-FINGER ORBIT (When in Camera / Look mode)
      if (e.touches.length === 1 && currentMode === 'look') {
        if (e.cancelable) e.preventDefault();
        const t = e.touches[0];
        const dx = t.clientX - singleTouchStart.x;
        const dy = t.clientY - singleTouchStart.y;
        singleTouchStart = { x: t.clientX, y: t.clientY };

        rotateBy(-dx * 0.006);
        tiltBy(dy * 0.006);
      }
    }, { passive: false });

    const handleTouchEnd = (e) => {
      for (let i = 0; i < e.changedTouches.length; i++) {
        activeTouches.delete(e.changedTouches[i].identifier);
      }
      if (activeTouches.size < 2) {
        isPinching = false;
      }
      if (activeTouches.size === 1) {
        const remaining = Array.from(activeTouches.values())[0];
        singleTouchStart = { x: remaining.x, y: remaining.y };
      }
    };

    canvas.addEventListener('touchend', handleTouchEnd, { passive: false });
    canvas.addEventListener('touchcancel', handleTouchEnd, { passive: false });

    console.log('[MobileControls] Touch gestures and Mobile HUD ready!');
  }
})();
