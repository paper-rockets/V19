// Main Scene Coordinator & Interactive Event System
// Connects 3D Studio Engine with UI, Navigation, Multi-Touch Gestures, and Modals.

(function(window) {
  'use strict';

  // Global State
  var state = {
    tool: 'draw',
    mode: 'easy', // 'easy' or 'pro'
    symmetry: 'none',
    symmetryModes: ['none', 'mirror_x', 'mirror_y', 'mirror_z', 'radial_4x', 'radial_8x'],
    symmetryLabels: {
      none: 'SYMMETRY: OFF',
      mirror_x: 'SYMMETRY: X',
      mirror_y: 'SYMMETRY: Y',
      mirror_z: 'SYMMETRY: Z',
      radial_4x: 'SYMMETRY: 4X',
      radial_8x: 'SYMMETRY: 8X'
    },
    lightingPreset: 'studio',
    lightingPresets: ['studio', 'daylight', 'neon', 'sunset', 'clay_neutral'],
    lightingLabels: {
      studio: 'LIGHT: STUDIO',
      daylight: 'LIGHT: DAYLIGHT',
      neon: 'LIGHT: NEON',
      sunset: 'LIGHT: SUNSET',
      clay_neutral: 'LIGHT: CLAY'
    },
    brushSettings: {
      size: 0.035,
      opacity: 1.0,
      color: '#38bdf8',
      roughness: 0.35,
      metalness: 0.15,
      emissiveIntensity: 0.0,
      pressureSensitivity: true,
      archSegments: 5,
      domeFactor: 0.22,
      surfaceOffset: 0.003,
      taperLength: 0.05,
      silhouetteClamping: true,
      stencilMasking: true,
      smoothingAlgorithm: 'one_euro',
      smoothingStrength: 0.55,
      predictiveTracking: true,
      predictionFactor: 0.4,
      materialType: 'shaded',
      profile: 'conformal',
      patternType: 'none',
      patternScale: 4.0,
      patternIntensity: 0.8,
      patternAngle: 45,
      patternContrast: 1.0,
      chiselAngle: 45,
      aspectRatio: 3.5
    },
    postSettings: {
      renderMode: 'draft',
      toonShading: false,
      toonSteps: 3,
      bloom: true,
      bloomIntensity: 1.2,
      bloomRadius: 0.8,
      bloomThreshold: 0.85,
      dof: false,
      dofFocusDistance: 2.5,
      dofAperture: 0.015,
      grain: false,
      grainIntensity: 0.08,
      pixelation: false,
      pixelSize: 4
    },
    layers: [
      { id: 'layer_base_1', name: 'Layer 1', visible: true, locked: false, opacity: 1.0 }
    ],
    activeLayerId: 'layer_base_1',
    isStylusOnly: false,
    showWireframe: false,
    modelScale: 1.0,
    modelElev: 0.0
  };

  function toast(msg) {
    var t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._timer);
    t._timer = setTimeout(function() {
      t.classList.remove('show');
    }, 2200);
  }
  window.toast = toast;

  function getActiveLayer() {
    return state.layers.find(function(l) { return l.id === state.activeLayerId; }) || state.layers[0];
  }

  function initApp() {
    var container = document.getElementById('cc');
    if (!container) return;

    // Initialize Studio Engine
    var engine = new window.StudioEngine(container);
    window.studioEngine = engine;

    // Initialize NavCube & Sidebar
    if (window.initNavCube) window.initNavCube('navcube');
    if (window.initSidebar) window.initSidebar();

    // Window Resize
    window.addEventListener('resize', function() {
      engine.resize(container.clientWidth, container.clientHeight);
    });

    // ─────────────────────────────────────────────────────────────
    // POINTER & TOUCH GESTURES (Orbit, Pan, Zoom, Conformal Drawing)
    // ─────────────────────────────────────────────────────────────
    var activePointers = new Map();
    var isOrbiting = false;
    var isPanning = false;
    var lastPointerPos = { x: 0, y: 0 };
    var lastTouchDist = null;

    function getNormalizedCoords(e) {
      var rect = container.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      var y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      return { x: x, y: y };
    }

    container.addEventListener('pointerdown', function(e) {
      e.preventDefault();
      container.setPointerCapture(e.pointerId);
      activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY, pointerType: e.pointerType });

      var isStylus = e.pointerType === 'pen';
      var isRightClick = e.button === 2;
      var isMiddleClick = e.button === 1;
      var isAlt = e.altKey;
      var isSpace = e.shiftKey || state.tool === 'pan';

      // Multi-touch gestures: 2 fingers = orbit/zoom, 3 fingers = pan
      if (activePointers.size === 2) {
        isOrbiting = true;
        isPanning = false;
        var pArray = Array.from(activePointers.values());
        lastTouchDist = Math.hypot(pArray[0].x - pArray[1].x, pArray[0].y - pArray[1].y);
        lastPointerPos = { x: (pArray[0].x + pArray[1].x) / 2, y: (pArray[0].y + pArray[1].y) / 2 };
        return;
      } else if (activePointers.size >= 3) {
        isPanning = true;
        isOrbiting = false;
        var pArray3 = Array.from(activePointers.values());
        lastPointerPos = { x: pArray3[0].x, y: pArray3[0].y };
        return;
      }

      // Camera navigation override
      if (isRightClick || isAlt || state.tool === 'look') {
        isOrbiting = true;
        lastPointerPos = { x: e.clientX, y: e.clientY };
        return;
      }
      if (isMiddleClick || isSpace) {
        isPanning = true;
        lastPointerPos = { x: e.clientX, y: e.clientY };
        return;
      }

      // If Stylus-only mode is ON and input is touch finger -> Orbit camera
      if (state.isStylusOnly && !isStylus) {
        isOrbiting = true;
        lastPointerPos = { x: e.clientX, y: e.clientY };
        return;
      }

      // Eyedropper tool
      if (state.tool === 'eyedropper') {
        var coords = getNormalizedCoords(e);
        var hit = engine.raycastModel(coords.x, coords.y);
        if (hit) {
          toast('Color Picked');
        }
        return;
      }

      // Start Painting Stroke
      var coordsD = getNormalizedCoords(e);
      var pressure = e.pressure > 0 ? e.pressure : 1.0;
      var layer = getActiveLayer();
      engine.startStroke(coordsD.x, coordsD.y, state.brushSettings, state.tool, layer, pressure, state.symmetry);
    });

    container.addEventListener('pointermove', function(e) {
      activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY, pointerType: e.pointerType });

      // Multi-touch gestures
      if (activePointers.size === 2) {
        var pArray = Array.from(activePointers.values());
        var currentDist = Math.hypot(pArray[0].x - pArray[1].x, pArray[0].y - pArray[1].y);
        var currentCenter = { x: (pArray[0].x + pArray[1].x) / 2, y: (pArray[0].y + pArray[1].y) / 2 };

        if (lastTouchDist !== null && currentDist > 0) {
          var zoomFactor = lastTouchDist / currentDist;
          engine.zoom(zoomFactor);
        }

        var dx = currentCenter.x - lastPointerPos.x;
        var dy = currentCenter.y - lastPointerPos.y;
        var invX = state.invertOrbitX ? -1 : 1;
        var invY = state.invertOrbitY ? -1 : 1;
        engine.orbit(-dx * 0.012 * invX, -dy * 0.012 * invY);

        lastTouchDist = currentDist;
        lastPointerPos = currentCenter;
        return;
      }

      if (isPanning) {
        var pdx = e.clientX - lastPointerPos.x;
        var pdy = e.clientY - lastPointerPos.y;
        engine.pan(pdx, pdy);
        lastPointerPos = { x: e.clientX, y: e.clientY };
        return;
      }

      if (isOrbiting) {
        var odx = e.clientX - lastPointerPos.x;
        var ody = e.clientY - lastPointerPos.y;
        var invX2 = state.invertOrbitX ? -1 : 1;
        var invY2 = state.invertOrbitY ? -1 : 1;
        engine.orbit(-odx * 0.012 * invX2, -ody * 0.012 * invY2);
        lastPointerPos = { x: e.clientX, y: e.clientY };
        return;
      }

      var coords = getNormalizedCoords(e);
      var pressure = e.pressure > 0 ? e.pressure : 1.0;

      // Update 3D Decal Cursor
      engine.updateCursor(coords.x, coords.y, state.brushSettings.size);

      // Continue Stroke
      if (engine.isDrawing) {
        engine.addStrokePoint(coords.x, coords.y, state.brushSettings, state.tool, pressure, state.symmetry);
      }
    });

    function endPointer(e) {
      activePointers.delete(e.pointerId);
      if (activePointers.size === 0) {
        isOrbiting = false;
        isPanning = false;
        lastTouchDist = null;
      }
      if (engine.isDrawing) {
        engine.endStroke(state.brushSettings, state.tool);
      }
      try { container.releasePointerCapture(e.pointerId); } catch (err) {}
    }

    container.addEventListener('pointerup', endPointer);
    container.addEventListener('pointercancel', endPointer);

    // Mouse Wheel Zoom
    container.addEventListener('wheel', function(e) {
      e.preventDefault();
      var factor = e.deltaY > 0 ? 1.08 : 0.92;
      engine.zoom(factor);
    }, { passive: false });

    // ─────────────────────────────────────────────────────────────
    // UI CONTROLS & WIRING
    // ─────────────────────────────────────────────────────────────

    // 1. Tool Selectors
    function setTool(t) {
      state.tool = t;
      document.querySelectorAll('.act-tool-btn').forEach(function(b) {
        b.classList.toggle('on', b.dataset.acttool === t);
      });
      toast('Tool: ' + t.toUpperCase());
    }

    document.querySelectorAll('.act-tool-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        if (btn.dataset.acttool) setTool(btn.dataset.acttool);
      });
    });

    // 2. Easy Mode Magic Presets
    var magicPresets = {
      pencil: { profile: 'marker', size: 0.015, opacity: 1.0, materialType: 'shadeless', color: '#0f172a' },
      marker: { profile: 'ribbon', size: 0.045, opacity: 0.9, materialType: 'shaded', color: '#38bdf8' },
      glow: { profile: 'tube', size: 0.03, opacity: 1.0, materialType: 'glow', color: '#00ffff', emissiveIntensity: 2.0 },
      rainbow: { profile: 'ribbon', size: 0.05, opacity: 1.0, materialType: 'shaded', color: '#ec4899', patternType: 'line' },
      lava: { profile: 'conformal', size: 0.04, opacity: 1.0, materialType: 'glow', color: '#ff4500', emissiveIntensity: 1.5 },
      waterfall: { profile: 'conformal', size: 0.05, opacity: 0.85, materialType: 'shaded', color: '#1d9fd6' },
      slime: { profile: 'conformal', size: 0.04, opacity: 1.0, materialType: 'shaded', color: '#22c55e' },
      candy: { profile: 'ribbon', size: 0.04, opacity: 1.0, materialType: 'shaded', color: '#ff4070' },
      shaded: { profile: 'conformal', size: 0.035, opacity: 1.0, materialType: 'shaded', color: '#38bdf8' }
    };

    document.querySelectorAll('.easy-brush-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.easy-brush-btn').forEach(function(b) { b.classList.remove('on'); });
        btn.classList.add('on');
        var k = btn.dataset.ekey;
        var p = magicPresets[k];
        if (p) {
          for (var prop in p) {
            state.brushSettings[prop] = p[prop];
          }
          setTool('draw');
          toast('Brush: ' + k.toUpperCase());
        }
      });
    });

    // 3. Profile Selectors
    document.querySelectorAll('.profile-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.profile-btn').forEach(function(b) { b.classList.remove('on'); });
        btn.classList.add('on');
        state.brushSettings.profile = btn.dataset.profile;
        toast('Profile: ' + btn.dataset.profile.toUpperCase());
      });
    });

    // 4. Material Type Selectors
    document.querySelectorAll('.mat-type-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.mat-type-btn').forEach(function(b) { b.classList.remove('on'); });
        btn.classList.add('on');
        state.brushSettings.materialType = btn.dataset.mattype;
        toast('Material: ' + btn.dataset.mattype.toUpperCase());
      });
    });

    // 5. Sliders (Size & Opacity)
    var szSlider = document.getElementById('sb-sz-slider');
    var szVal = document.getElementById('sb-sz-val');
    if (szSlider) {
      szSlider.addEventListener('input', function() {
        var s = parseFloat(szSlider.value);
        state.brushSettings.size = s;
        if (szVal) szVal.textContent = Math.round(s * 1000);
      });
    }

    var opSlider = document.getElementById('sb-op-slider');
    var opVal = document.getElementById('sb-op-val');
    if (opSlider) {
      opSlider.addEventListener('input', function() {
        var op = parseFloat(opSlider.value);
        state.brushSettings.opacity = op;
        if (opVal) opVal.textContent = Math.round(op * 100) + '%';
      });
    }

    // 6. Color Selection
    function setColor(hex) {
      state.brushSettings.color = hex;
      var dot = document.getElementById('cur-color-dot');
      if (dot) dot.style.background = hex;
      var popHex = document.getElementById('pop-hex-val');
      if (popHex) popHex.textContent = hex;
      var cpick = document.getElementById('pop-cpick');
      if (cpick) cpick.value = hex;
    }

    document.querySelectorAll('[data-c]').forEach(function(sw) {
      sw.addEventListener('click', function() {
        setColor(sw.dataset.c);
        document.querySelectorAll('[data-c]').forEach(function(s) { s.classList.remove('on'); });
        sw.classList.add('on');
      });
    });

    var colorPickInput = document.getElementById('pop-cpick');
    if (colorPickInput) {
      colorPickInput.addEventListener('input', function() {
        setColor(colorPickInput.value);
      });
    }

    // 7. Symmetry Cycling
    var symBtn = document.getElementById('bsymm');
    if (symBtn) {
      symBtn.addEventListener('click', function() {
        var idx = state.symmetryModes.indexOf(state.symmetry);
        var nextIdx = (idx + 1) % state.symmetryModes.length;
        state.symmetry = state.symmetryModes[nextIdx];
        symBtn.textContent = state.symmetryLabels[state.symmetry];
        symBtn.classList.toggle('on', state.symmetry !== 'none');
        toast(state.symmetryLabels[state.symmetry]);
      });
    }

    // 8. Lighting Preset Cycling
    var stageBtn = document.getElementById('btn-stage-toggle');
    if (stageBtn) {
      stageBtn.addEventListener('click', function() {
        var idx = state.lightingPresets.indexOf(state.lightingPreset);
        var nextIdx = (idx + 1) % state.lightingPresets.length;
        state.lightingPreset = state.lightingPresets[nextIdx];
        stageBtn.textContent = state.lightingLabels[state.lightingPreset];
        engine.setLightingPreset(state.lightingPreset);
        toast(state.lightingLabels[state.lightingPreset]);
      });
    }

    // 9. Showcase Turntable Spin
    var showcaseBtn = document.getElementById('bshowcase-tb');
    if (showcaseBtn) {
      showcaseBtn.addEventListener('click', function() {
        engine.isTurntable = !engine.isTurntable;
        showcaseBtn.classList.toggle('on', engine.isTurntable);
        toast(engine.isTurntable ? 'Turntable ON' : 'Turntable OFF');
      });
    }

    // 10. Light / Dark Theme Toggle
    var themeBtn = document.getElementById('btheme-toggle');
    var currentTheme = localStorage.getItem('studio_theme') || 'dark';
    function applyTheme(theme) {
      currentTheme = theme;
      document.body.dataset.theme = theme;
      localStorage.setItem('studio_theme', theme);
      if (themeBtn) themeBtn.textContent = theme === 'dark' ? 'THEME: DARK' : 'THEME: LIGHT';
      if (engine && engine.scene) {
        engine.scene.background.setHex(theme === 'dark' ? 0x1b1e24 : 0xe2e8f0);
      }
      if (window.navcubeDraw) window.navcubeDraw();
    }
    applyTheme(currentTheme);

    if (themeBtn) {
      themeBtn.addEventListener('click', function() {
        var nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
        toast(nextTheme === 'dark' ? 'Dark Mode' : 'Light Mode');
      });
    }

    // 11. Stylus Mode Toggle
    var stylusBtn = document.getElementById('bstylus');
    if (stylusBtn) {
      stylusBtn.addEventListener('click', function() {
        state.isStylusOnly = !state.isStylusOnly;
        stylusBtn.textContent = state.isStylusOnly ? 'PEN ONLY' : 'FINGER';
        stylusBtn.classList.toggle('on', state.isStylusOnly);
        toast(state.isStylusOnly ? 'Stylus draw, finger orbit' : 'Finger draws & orbits');
      });
    }

    // 11. Undo / Redo
    var handleUndo = function() { engine.undo(); toast('Undo'); };
    var handleRedo = function() { engine.redo(state.layers); toast('Redo'); };

    var undoBtn = document.getElementById('grid-undo-btn');
    if (undoBtn) undoBtn.addEventListener('click', handleUndo);
    var redoBtn = document.getElementById('grid-redo-btn');
    if (redoBtn) redoBtn.addEventListener('click', handleRedo);
    var pbUndo = document.getElementById('pb-undo');
    if (pbUndo) pbUndo.addEventListener('click', handleUndo);
    var pbRedo = document.getElementById('pb-redo');
    if (pbRedo) pbRedo.addEventListener('click', handleRedo);

    // 12. Clear All
    var clearBtn = document.getElementById('bclear');
    if (clearBtn) {
      clearBtn.addEventListener('click', function() {
        if (confirm('Clear all paint strokes on all layers?')) {
          engine.clearAllStrokes();
          toast('Cleared All Strokes');
        }
      });
    }

    // 13. NavCube & Camera Helpers
    var navSegBtns = document.querySelectorAll('#nav-mode-seg .seg-btn');
    var navCamView = document.getElementById('nav-camera-view');
    var navSurfView = document.getElementById('nav-surface-view');
    var navTiltView = document.getElementById('nav-tiltpad-view');
    if (navSegBtns) {
      navSegBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
          navSegBtns.forEach(function(b) { b.classList.remove('on'); });
          btn.classList.add('on');
          var tab = btn.dataset.navtab;
          if (navCamView) navCamView.style.display = tab === 'camera' ? 'flex' : 'none';
          if (navSurfView) navSurfView.style.display = tab === 'surface' ? 'flex' : 'none';
          if (navTiltView) navTiltView.style.display = tab === 'tiltpad' ? 'flex' : 'none';
        });
      });
    }

    if (window.TiltPadNavigator && document.getElementById('tiltpad-mount-panel')) {
      window.tiltPadNavInstance = new window.TiltPadNavigator({
        container: 'tiltpad-mount-panel',
        preset: 'wall',
        pitch: 90,
        yaw: 0,
        depth: 0,
        showActions: true,
        onPlaneChange: function(planeState) {
          if (engine && typeof engine.setDrawingPlane === 'function') {
            engine.setDrawingPlane(planeState);
          }
        },
        onCameraAlign: function() {
          if (engine && typeof engine.alignPlaneToCamera === 'function') {
            engine.alignPlaneToCamera();
          }
          toast('Plane aligned to Camera');
        }
      });
    }

    var greset = document.getElementById('greset');
    if (greset) greset.addEventListener('click', function() { engine.resetView(); toast('View Reset'); });

    var gsnap = document.getElementById('gsnap');
    if (gsnap) gsnap.addEventListener('click', function() { engine.snapView('front'); toast('Snapped to Front'); });

    var ginvert = document.getElementById('ginvert');
    if (ginvert) {
      ginvert.addEventListener('click', function() {
        state.invertOrbitY = !state.invertOrbitY;
        ginvert.classList.toggle('on', state.invertOrbitY);
        toast(state.invertOrbitY ? 'Orbit Inverted' : 'Orbit Standard');
      });
    }

    var gground = document.getElementById('gground');
    if (gground) {
      gground.addEventListener('click', function() {
        var box = new THREE.Box3().setFromObject(engine.modelRoot);
        if (!box.isEmpty()) {
          engine.modelRoot.position.y -= box.min.y;
          toast('Model Snapped to Ground');
        }
      });
    }

    var gwire = document.getElementById('gwire');
    if (gwire) {
      gwire.addEventListener('click', function() {
        state.showWireframe = !state.showWireframe;
        engine.toggleWireframe(state.showWireframe);
        gwire.classList.toggle('on', state.showWireframe);
        toast(state.showWireframe ? 'Wireframe ON' : 'Wireframe OFF');
      });
    }

    // 14. Model Scale & Elevation Steppers
    var scDec = document.getElementById('mc-scale-dec');
    var scInc = document.getElementById('mc-scale-inc');
    var scVal = document.getElementById('mc-scale-val');
    if (scDec && scInc) {
      scDec.addEventListener('click', function() {
        state.modelScale = Math.max(0.2, state.modelScale - 0.1);
        engine.modelRoot.scale.set(state.modelScale, state.modelScale, state.modelScale);
        if (scVal) scVal.textContent = state.modelScale.toFixed(1) + 'x';
      });
      scInc.addEventListener('click', function() {
        state.modelScale = Math.min(5.0, state.modelScale + 0.1);
        engine.modelRoot.scale.set(state.modelScale, state.modelScale, state.modelScale);
        if (scVal) scVal.textContent = state.modelScale.toFixed(1) + 'x';
      });
    }

    var elDec = document.getElementById('mc-elev-dec');
    var elInc = document.getElementById('mc-elev-inc');
    var elVal = document.getElementById('mc-elev-val');
    if (elDec && elInc) {
      elDec.addEventListener('click', function() {
        state.modelElev -= 0.2;
        engine.modelRoot.position.y = state.modelElev;
        if (elVal) elVal.textContent = state.modelElev.toFixed(1);
      });
      elInc.addEventListener('click', function() {
        state.modelElev += 0.2;
        engine.modelRoot.position.y = state.modelElev;
        if (elVal) elVal.textContent = state.modelElev.toFixed(1);
      });
    }

    // ─────────────────────────────────────────────────────────────
    // MODALS & POPOVERS
    // ─────────────────────────────────────────────────────────────

    // Models Modal
    var modelsModal = document.getElementById('models-modal');
    var btemplates = document.getElementById('btemplates');
    var pbModels = document.getElementById('pb-models');
    var modelsClose = document.getElementById('models-modal-close');
    var presetListEl = document.getElementById('preset-models-list');

    function populateModelLibrary() {
      if (!presetListEl || !window.SampleModelFactory) return;
      presetListEl.innerHTML = '';
      var presets = window.SampleModelFactory.getPresets();

      presets.forEach(function(p, idx) {
        var card = document.createElement('div');
        card.className = 'model-preset-card' + (idx === 0 ? ' active' : '');
        card.dataset.preset = p.id;

        var nameSpan = document.createElement('span');
        nameSpan.className = 'model-preset-name';
        nameSpan.textContent = p.name;

        var descSpan = document.createElement('span');
        descSpan.className = 'model-preset-desc';
        descSpan.textContent = p.description;

        var tagSpan = document.createElement('span');
        tagSpan.className = 'model-preset-tag';
        tagSpan.textContent = (p.category || 'MODEL').toUpperCase();

        card.appendChild(nameSpan);
        card.appendChild(descSpan);
        card.appendChild(tagSpan);

        card.addEventListener('click', function() {
          document.querySelectorAll('.model-preset-card').forEach(function(c) { c.classList.remove('active'); });
          card.classList.add('active');
          engine.loadPresetModel(p.id);
          closeModels();
          toast('Loaded: ' + p.name);
        });

        presetListEl.appendChild(card);
      });
    }

    var openModels = function() {
      populateModelLibrary();
      modelsModal.classList.add('open');
    };
    var closeModels = function() { modelsModal.classList.remove('open'); };
    if (btemplates) btemplates.addEventListener('click', openModels);
    if (pbModels) pbModels.addEventListener('click', openModels);
    if (modelsClose) modelsClose.addEventListener('click', closeModels);
    populateModelLibrary();

    // Dropzone & File Ingestion
    var dropzone = document.getElementById('dropzone');
    var fileInput = document.getElementById('model-file-input');
    if (dropzone && fileInput) {
      dropzone.addEventListener('click', function() { fileInput.click(); });
      fileInput.addEventListener('change', function(e) {
        var file = e.target.files[0];
        if (!file) return;
        var reader = new FileReader();
        var ext = file.name.split('.').pop().toLowerCase();
        if (ext === 'glb' || ext === 'gltf') {
          reader.onload = function(evt) {
            engine.loadGLTF(evt.target.result, file.name);
            closeModels();
            toast('Imported: ' + file.name);
          };
          reader.readAsArrayBuffer(file);
        } else if (ext === 'obj') {
          reader.onload = function(evt) {
            engine.loadOBJ(evt.target.result, file.name);
            closeModels();
            toast('Imported: ' + file.name);
          };
          reader.readAsText(file);
        }
      });
    }

    // Export Modal
    var exportModal = document.getElementById('export-modal');
    var exportBtn = document.getElementById('bexport-tb');
    var pbExport = document.getElementById('pb-export');
    var exportClose = document.getElementById('export-modal-close');

    var openExport = function() { exportModal.classList.add('open'); };
    var closeExport = function() { exportModal.classList.remove('open'); };
    if (exportBtn) exportBtn.addEventListener('click', openExport);
    if (pbExport) pbExport.addEventListener('click', openExport);
    if (exportClose) exportClose.addEventListener('click', closeExport);

    var btnExpGLB = document.getElementById('btn-export-glb');
    if (btnExpGLB) {
      btnExpGLB.addEventListener('click', function() {
        engine.exportGLTF().then(function(buffer) {
          var blob = new Blob([buffer], { type: 'model/gltf-binary' });
          var link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = (engine.activeModelName || 'model_painted') + '.glb';
          link.click();
          closeExport();
          toast('GLB Exported');
        });
      });
    }

    var btnExpOBJ = document.getElementById('btn-export-obj');
    if (btnExpOBJ) {
      btnExpOBJ.addEventListener('click', function() {
        var text = engine.exportOBJ();
        var blob = new Blob([text], { type: 'text/plain' });
        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = (engine.activeModelName || 'model_painted') + '.obj';
        link.click();
        closeExport();
        toast('OBJ Exported');
      });
    }

    var btnExpTex = document.getElementById('btn-export-textures');
    if (btnExpTex) {
      btnExpTex.addEventListener('click', function() {
        var pngData = engine.uvEngine.exportPNG();
        var link = document.createElement('a');
        link.href = pngData;
        link.download = (engine.activeModelName || 'texture') + '_painted_uv.png';
        link.click();
        closeExport();
        toast('Texture Downloaded');
      });
    }

    var btnExpShot = document.getElementById('btn-export-screenshot');
    if (btnExpShot) {
      btnExpShot.addEventListener('click', function() {
        var shotData = engine.exportScreenshot();
        var link = document.createElement('a');
        link.href = shotData;
        link.download = 'screenshot_3d_paint.png';
        link.click();
        closeExport();
        toast('Screenshot Captured');
      });
    }

    // Render Settings Modal
    var renderModal = document.getElementById('render-settings-modal');
    var viewsBtn = document.getElementById('bviews-btn');
    var renderClose = document.getElementById('render-settings-close');

    if (viewsBtn) viewsBtn.addEventListener('click', function() { renderModal.classList.add('open'); });
    if (renderClose) renderClose.addEventListener('click', function() { renderModal.classList.remove('open'); });

    var rmDraft = document.getElementById('rm-draft-btn');
    var rmRender = document.getElementById('rm-render-btn');
    if (rmDraft && rmRender) {
      rmDraft.addEventListener('click', function() {
        state.postSettings.renderMode = 'draft';
        rmDraft.classList.add('on');
        rmRender.classList.remove('on');
        engine.setPostProcessSettings(state.postSettings);
      });
      rmRender.addEventListener('click', function() {
        state.postSettings.renderMode = 'render';
        rmRender.classList.add('on');
        rmDraft.classList.remove('on');
        engine.setPostProcessSettings(state.postSettings);
      });
    }

    var toonTgl = document.getElementById('rs-toon-toggle');
    var toonStp = document.getElementById('rs-toon-steps');
    var toonVal = document.getElementById('rs-toon-val');
    if (toonTgl && toonStp) {
      toonTgl.addEventListener('change', function() {
        state.postSettings.toonShading = toonTgl.checked;
        engine.setPostProcessSettings(state.postSettings);
      });
      toonStp.addEventListener('input', function() {
        var val = parseInt(toonStp.value, 10);
        state.postSettings.toonSteps = val;
        if (toonVal) toonVal.textContent = val;
        engine.setPostProcessSettings(state.postSettings);
      });
    }

    var bloomTgl = document.getElementById('rs-bloom-toggle');
    var bloomInt = document.getElementById('rs-bloom-int');
    var bloomVal = document.getElementById('rs-bloom-val');
    if (bloomTgl && bloomInt) {
      bloomTgl.addEventListener('change', function() {
        state.postSettings.bloom = bloomTgl.checked;
        engine.setPostProcessSettings(state.postSettings);
      });
      bloomInt.addEventListener('input', function() {
        var val = parseFloat(bloomInt.value);
        state.postSettings.bloomIntensity = val;
        if (bloomVal) bloomVal.textContent = val.toFixed(1);
        engine.setPostProcessSettings(state.postSettings);
      });
    }

    // Color Palette Popover
    var colorPop = document.getElementById('color-pop');
    var colorTrig = document.getElementById('color-wheel-trig-btn');
    var pbColorTrig = document.getElementById('pb-ccpick-btn');
    var colorPopClose = document.getElementById('color-pop-close');
    if (colorTrig) colorTrig.addEventListener('click', function() { colorPop.classList.toggle('open'); });
    if (pbColorTrig) pbColorTrig.addEventListener('click', function() { colorPop.classList.toggle('open'); });
    if (colorPopClose) colorPopClose.addEventListener('click', function() { colorPop.classList.remove('open'); });

    // FX Popover
    var fxPop = document.getElementById('fx-pop');
    var fxTrig = document.getElementById('fx-lbl-trig');
    var fxTrigPb = document.getElementById('fx-trig-pb');
    var fxPopClose = document.getElementById('fx-pop-close');
    if (fxTrig) fxTrig.addEventListener('click', function() { fxPop.classList.toggle('open'); });
    if (fxTrigPb) fxTrigPb.addEventListener('click', function() { fxPop.classList.toggle('open'); });
    if (fxPopClose) fxPopClose.addEventListener('click', function() { fxPop.classList.remove('open'); });

    document.querySelectorAll('.pattern-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.pattern-btn').forEach(function(b) { b.classList.remove('on'); });
        btn.classList.add('on');
        state.brushSettings.patternType = btn.dataset.pattern;
        toast('Pattern: ' + btn.dataset.pattern.toUpperCase());
      });
    });

    document.querySelectorAll('.smooth-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.smooth-btn').forEach(function(b) { b.classList.remove('on'); });
        btn.classList.add('on');
        state.brushSettings.smoothingAlgorithm = btn.dataset.smoother;
        toast('Smoothing: ' + btn.dataset.smoother.toUpperCase());
      });
    });

    // Layers Popover
    var layersPop = document.getElementById('layers-pop');
    var layersBtn = document.getElementById('blayers');
    if (layersBtn) layersBtn.addEventListener('click', function() { layersPop.classList.toggle('open'); });

    // Global Keyboard Shortcuts
    window.addEventListener('keydown', function(e) {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) handleRedo();
        else handleUndo();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        handleRedo();
      } else if (e.key.toLowerCase() === 'd') {
        setTool('draw');
      } else if (e.key.toLowerCase() === 'u') {
        setTool('uv_brush');
      } else if (e.key.toLowerCase() === 'e') {
        setTool('erase');
      } else if (e.key.toLowerCase() === 'i') {
        setTool('eyedropper');
      } else if (e.key === '[') {
        state.brushSettings.size = Math.max(0.005, state.brushSettings.size - 0.005);
        if (szSlider) szSlider.value = state.brushSettings.size;
        if (szVal) szVal.textContent = Math.round(state.brushSettings.size * 1000);
      } else if (e.key === ']') {
        state.brushSettings.size = Math.min(0.2, state.brushSettings.size + 0.005);
        if (szSlider) szSlider.value = state.brushSettings.size;
        if (szVal) szVal.textContent = Math.round(state.brushSettings.size * 1000);
      }
    });

    toast('3D Model Painting Studio Ready');
  }

  window.addEventListener('DOMContentLoaded', initApp);
})(window);