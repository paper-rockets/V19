/**
 * TiltPad Navigator UI - Professional Edition
 * Interactive 3D tilt disc controlling drawing plane pitch (Floor, Wall, Side, Cam) with depth slider.
 * Pure Single-Axis Tilt Pad: Only tilts 1 axis at a time (Up/Down) with 0°, 30°, 45°, 60°, 90° quick snap.
 * 6x4 proportion canvas plate, 100% level and symmetrical, zero skew/roll.
 * Mobile-first touch ergonomics with generous touch targets and optional haptic feedback.
 * Icon-free, ultra-clean aesthetic matching Sketchbook studio design standards.
 */

(function(window) {
  'use strict';

  function TiltPadNavigator(options) {
    options = options || {};
    this.container = typeof options.container === 'string'
      ? document.getElementById(options.container)
      : (options.container || document.body);

    this.onPlaneChange = options.onPlaneChange || function() {};
    this.onCameraAlign = options.onCameraAlign || function() {};

    this.state = {
      preset: options.preset || 'wall', // 'floor' | 'wall' | 'side' | 'cam'
      pitch: options.pitch !== undefined ? options.pitch : 90, // 0 = Floor, 90 = Wall / Side
      yaw: 0,
      depth: options.depth !== undefined ? options.depth : 0, // -50 to 50
      showActions: options.showActions !== undefined ? options.showActions : true,
      showAngleSnaps: options.showAngleSnaps !== undefined ? options.showAngleSnaps : true
    };

    this.dom = {};
    this._isDragging = false;
    this._dragStartY = 0;
    this._dragStartPitch = 90;

    this._animFrame = null;
    this._animStartTime = 0;
    this._animStartPitch = 0;
    this._animTargetPitch = 0;

    // 6x4 Proportion Canvas Area (180 wide x 86 high)
    this._canvasWidth = options.canvasWidth || 180;
    this._canvasHeight = options.canvasHeight || 86;

    this._initDOM();
    this._bindEvents();
    this.render();
  }

  TiltPadNavigator.prototype._initDOM = function() {
    var root = document.createElement('div');
    root.className = 'tiltpad-container';
    root.style.cssText = [
      'display: flex',
      'flex-direction: column',
      'align-items: center',
      'gap: 7px',
      'padding: 12px 14px',
      'background: rgba(24, 28, 36, 0.94)',
      'backdrop-filter: blur(20px)',
      '-webkit-backdrop-filter: blur(20px)',
      'border: 1px solid rgba(255, 255, 255, 0.12)',
      'border-radius: 22px',
      'box-shadow: 0 14px 38px rgba(0, 0, 0, 0.45)',
      'user-select: none',
      '-webkit-user-select: none',
      'touch-action: none',
      'width: fit-content',
      'max-width: calc(100vw - 20px)',
      'font-family: "Inter", -apple-system, sans-serif'
    ].join(';');

    // 1. Preset Switcher Bar (Floor | Wall | Side | Cam)
    var segBar = document.createElement('div');
    segBar.className = 'tiltpad-presets';
    segBar.style.cssText = [
      'display: flex',
      'align-items: center',
      'gap: 3px',
      'background: rgba(255, 255, 255, 0.08)',
      'padding: 3px',
      'border-radius: 16px',
      'border: 1px solid rgba(255, 255, 255, 0.09)',
      'box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2)'
    ].join(';');

    var presets = ['Floor', 'Wall', 'Side', 'Cam'];
    this.dom.presetButtons = {};

    presets.forEach(function(name) {
      var key = name.toLowerCase();
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = name;
      btn.className = 'tiltpad-preset-btn';
      btn.setAttribute('data-preset', key);
      btn.style.cssText = [
        'border: none',
        'outline: none',
        'background: transparent',
        'color: #8b93a4',
        'font-family: "Inter", sans-serif',
        'font-size: 10.5px',
        'font-weight: 600',
        'padding: 5px 12px',
        'min-height: 26px',
        'border-radius: 12px',
        'cursor: pointer',
        'transition: all 0.15s ease',
        'line-height: 1',
        '-webkit-tap-highlight-color: transparent'
      ].join(';');
      segBar.appendChild(btn);
      this.dom.presetButtons[key] = btn;
    }.bind(this));

    // 2. Interactive Single-Axis Tilt Quad Canvas
    var cvsWrap = document.createElement('div');
    cvsWrap.style.cssText = 'position: relative; cursor: ns-resize; display: flex; justify-content: center; align-items: center; padding: 2px 0; touch-action: none;';

    var canvas = document.createElement('canvas');
    canvas.width = this._canvasWidth * (window.devicePixelRatio || 1);
    canvas.height = this._canvasHeight * (window.devicePixelRatio || 1);
    canvas.style.width = this._canvasWidth + 'px';
    canvas.style.height = this._canvasHeight + 'px';
    canvas.style.filter = 'drop-shadow(0 6px 16px rgba(0, 0, 0, 0.35))';
    canvas.style.borderRadius = '8px';
    cvsWrap.appendChild(canvas);

    // 3. Quick Angle Snap Stepper Bar (0° Floor, 30°, 45° ISO, 60°, 90° Wall)
    var angleBar = document.createElement('div');
    angleBar.style.cssText = 'display: flex; gap: 3px; width: 100%; justify-content: space-between;';
    angleBar.style.display = this.state.showAngleSnaps ? 'flex' : 'none';

    var snapAngles = [
      { label: '0°', pitch: 0, title: 'Floor (0°)' },
      { label: '30°', pitch: 30, title: '30°' },
      { label: '45°', pitch: 45, title: 'Isometric (45°)' },
      { label: '60°', pitch: 60, title: '60°' },
      { label: '90°', pitch: 90, title: 'Wall (90°)' }
    ];

    this.dom.angleButtons = {};
    snapAngles.forEach(function(item) {
      var abtn = document.createElement('button');
      abtn.type = 'button';
      abtn.textContent = item.label;
      abtn.title = item.title;
      abtn.setAttribute('data-angle', item.pitch);
      abtn.style.cssText = [
        'flex: 1',
        'height: 22px',
        'border-radius: 11px',
        'border: 1px solid rgba(255, 255, 255, 0.10)',
        'background: rgba(255, 255, 255, 0.04)',
        'color: #8b93a4',
        'font-family: "DM Mono", monospace',
        'font-size: 8.5px',
        'font-weight: 700',
        'cursor: pointer',
        'transition: all 0.12s ease',
        'padding: 0',
        '-webkit-tap-highlight-color: transparent'
      ].join(';');
      angleBar.appendChild(abtn);
      this.dom.angleButtons[item.pitch] = abtn;
    }.bind(this));

    // 4. Monospace Helper Prompt
    var helperText = document.createElement('div');
    helperText.style.cssText = [
      'font-family: "DM Mono", ui-monospace, monospace',
      'font-size: 8.5px',
      'color: #8b93a4',
      'text-align: center',
      'line-height: 1.3',
      'letter-spacing: -0.01em',
      'margin-top: -1px'
    ].join(';');
    helperText.innerHTML = '<div>Drag to tilt</div><div>Double-tap to reset</div>';

    // 5. Depth Slider Row
    var depthWrap = document.createElement('div');
    depthWrap.style.cssText = 'display: flex; flex-direction: column; align-items: center; gap: 3px; width: 160px;';

    var depthLabel = document.createElement('span');
    depthLabel.style.cssText = 'font-family: "DM Mono", ui-monospace, monospace; font-size: 9.5px; font-weight: 700; color: #8b93a4; letter-spacing: 0.02em;';
    depthLabel.textContent = 'Depth 0';

    var depthSlider = document.createElement('input');
    depthSlider.type = 'range';
    depthSlider.min = '-50';
    depthSlider.max = '50';
    depthSlider.step = '1';
    depthSlider.value = String(this.state.depth);
    depthSlider.style.cssText = [
      'width: 100%',
      'height: 8px',
      '-webkit-appearance: none',
      'appearance: none',
      'background: rgba(255, 255, 255, 0.14)',
      'border-radius: 4px',
      'outline: none',
      'cursor: pointer',
      'margin: 2px 0',
      'touch-action: none'
    ].join(';');

    depthWrap.appendChild(depthLabel);
    depthWrap.appendChild(depthSlider);

    // 6. Drawing On Status Pill
    var statusPill = document.createElement('div');
    statusPill.style.cssText = [
      'padding: 5px 18px',
      'background: #ffffff',
      'color: #0f172a',
      'border-radius: 20px',
      'font-family: "DM Mono", ui-monospace, monospace',
      'font-size: 10.5px',
      'font-weight: 700',
      'box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25)',
      'white-space: nowrap',
      'letter-spacing: 0.01em',
      'text-align: center'
    ].join(';');
    statusPill.textContent = 'Drawing on: Wall (90°)';

    // 7. Action Bar
    var actionRow = document.createElement('div');
    actionRow.style.cssText = 'display: flex; gap: 4px; width: 100%; margin-top: 1px;';
    actionRow.style.display = this.state.showActions ? 'flex' : 'none';

    var actions = [
      { id: 'align', label: 'Align Cam' },
      { id: 'iso', label: 'ISO 45°' },
      { id: 'front', label: 'Front' },
      { id: 'reset', label: 'Reset' }
    ];

    this.dom.actionButtons = {};
    actions.forEach(function(act) {
      var abtn = document.createElement('button');
      abtn.type = 'button';
      abtn.textContent = act.label;
      abtn.setAttribute('data-act', act.id);
      abtn.style.cssText = [
        'flex: 1',
        'height: 24px',
        'border-radius: 12px',
        'border: 1px solid rgba(255, 255, 255, 0.12)',
        'background: rgba(255, 255, 255, 0.05)',
        'color: #edf0f5',
        'font-family: "Inter", sans-serif',
        'font-size: 9px',
        'font-weight: 600',
        'cursor: pointer',
        'transition: all 0.12s ease',
        'padding: 0 4px',
        'white-space: nowrap',
        '-webkit-tap-highlight-color: transparent'
      ].join(';');
      actionRow.appendChild(abtn);
      this.dom.actionButtons[act.id] = abtn;
    }.bind(this));

    // Assemble DOM
    root.appendChild(segBar);
    root.appendChild(cvsWrap);
    root.appendChild(angleBar);
    root.appendChild(helperText);
    root.appendChild(depthWrap);
    root.appendChild(statusPill);
    root.appendChild(actionRow);

    this.container.appendChild(root);

    this.dom.root = root;
    this.dom.cvsWrap = cvsWrap;
    this.dom.canvas = canvas;
    this.dom.ctx = canvas.getContext('2d');
    this.dom.angleBar = angleBar;
    this.dom.depthLabel = depthLabel;
    this.dom.depthSlider = depthSlider;
    this.dom.statusPill = statusPill;
    this.dom.actionRow = actionRow;
  };

  TiltPadNavigator.prototype._bindEvents = function() {
    var self = this;

    // Preset Switching with smooth animation
    Object.keys(this.dom.presetButtons).forEach(function(key) {
      var btn = self.dom.presetButtons[key];
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        self.setPreset(key);
      });
    });

    // Quick Angle Snapping Buttons
    if (this.dom.angleButtons) {
      Object.keys(this.dom.angleButtons).forEach(function(pitchKey) {
        var btn = self.dom.angleButtons[pitchKey];
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          if (navigator.vibrate) navigator.vibrate(10);
          self.animateToPitch(parseFloat(pitchKey));
        });
      });
    }

    // Depth Slider Input
    this.dom.depthSlider.addEventListener('input', function(e) {
      self.setDepth(parseFloat(e.target.value));
    });

    // Strict 1-Axis Vertical Drag (Pitch Up/Down ONLY)
    var cvs = this.dom.canvas;

    cvs.addEventListener('pointerdown', function(e) {
      self._isDragging = true;
      self._dragStartY = e.clientY;
      self._dragStartPitch = self.state.pitch;

      cvs.setPointerCapture(e.pointerId);
      cvs.style.cursor = 'grabbing';
      if (self._animFrame) cancelAnimationFrame(self._animFrame);
      e.preventDefault();
    });

    window.addEventListener('pointermove', function(e) {
      if (!self._isDragging) return;

      var totalDy = e.clientY - self._dragStartY;

      // Vertical Drag (Pitch: Push UP -> Floor 0°, Pull DOWN -> Wall 90°)
      var newPitch = self._dragStartPitch + totalDy * 0.85;
      self.state.pitch = Math.max(-90, Math.min(180, newPitch));

      self.render();
      self._notifyChange();
    });

    window.addEventListener('pointerup', function() {
      if (self._isDragging) {
        self._isDragging = false;
        cvs.style.cursor = 'ns-resize';
      }
    });

    window.addEventListener('pointercancel', function() {
      self._isDragging = false;
      cvs.style.cursor = 'ns-resize';
    });

    // Double click / Double tap to reset
    cvs.addEventListener('dblclick', function(e) {
      e.preventDefault();
      self.resetPresetPitch();
    });

    // Action Buttons
    if (this.dom.actionButtons) {
      if (this.dom.actionButtons['align']) {
        this.dom.actionButtons['align'].addEventListener('click', function() {
          self.setPreset('cam');
        });
      }
      if (this.dom.actionButtons['iso']) {
        this.dom.actionButtons['iso'].addEventListener('click', function() {
          self.animateToPitch(45);
        });
      }
      if (this.dom.actionButtons['front']) {
        this.dom.actionButtons['front'].addEventListener('click', function() {
          self.setPreset('wall');
        });
      }
      if (this.dom.actionButtons['reset']) {
        this.dom.actionButtons['reset'].addEventListener('click', function() {
          self.resetAll();
        });
      }
    }
  };

  TiltPadNavigator.prototype.setPreset = function(preset) {
    this.state.preset = preset;
    if (preset === 'cam') {
      this.onCameraAlign();
      this.animateToPitch(90);
    } else {
      var targetPitch = (preset === 'floor') ? 0 : 90;
      this.animateToPitch(targetPitch);
    }
  };

  TiltPadNavigator.prototype.resetPresetPitch = function() {
    var targetPitch = (this.state.preset === 'floor') ? 0 : 90;
    this.animateToPitch(targetPitch);
  };

  TiltPadNavigator.prototype.animateToPitch = function(targetPitch) {
    if (this._animFrame) cancelAnimationFrame(this._animFrame);

    var self = this;
    this._animStartTime = performance.now();
    this._animStartPitch = this.state.pitch;
    this._animTargetPitch = targetPitch;

    var duration = 160; // ms

    function step(now) {
      var elapsed = now - self._animStartTime;
      var t = Math.min(1, elapsed / duration);
      var ease = 1 - Math.pow(1 - t, 3); // Ease out cubic

      self.state.pitch = self._animStartPitch + (self._animTargetPitch - self._animStartPitch) * ease;
      self.render();
      self._notifyChange();

      if (t < 1) {
        self._animFrame = requestAnimationFrame(step);
      } else {
        self.state.pitch = self._animTargetPitch;
        self.render();
        self._notifyChange();
      }
    }

    this._animFrame = requestAnimationFrame(step);
  };

  TiltPadNavigator.prototype.setPitch = function(pitch) {
    this.state.pitch = pitch;
    this.render();
    this._notifyChange();
  };

  TiltPadNavigator.prototype.setDepth = function(depth) {
    this.state.depth = Math.max(-50, Math.min(50, Math.round(depth)));
    this.dom.depthSlider.value = String(this.state.depth);
    this.render();
    this._notifyChange();
  };

  TiltPadNavigator.prototype.resetAll = function() {
    this.state.depth = 0;
    this.dom.depthSlider.value = '0';
    this.setPreset('wall');
  };

  TiltPadNavigator.prototype.render = function() {
    var self = this;

    // 1. Update Preset Buttons Style
    Object.keys(this.dom.presetButtons).forEach(function(key) {
      var btn = self.dom.presetButtons[key];
      var isCurrent = self.state.preset === key;
      if (isCurrent) {
        btn.style.background = '#ffffff';
        btn.style.color = '#0f172a';
        btn.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
        btn.style.fontWeight = '700';
      } else {
        btn.style.background = 'transparent';
        btn.style.color = '#8b93a4';
        btn.style.boxShadow = 'none';
        btn.style.fontWeight = '600';
      }
    });

    // 2. Update Angle Snap Buttons Style
    if (this.dom.angleButtons) {
      var curPitch = Math.round(this.state.pitch);
      Object.keys(this.dom.angleButtons).forEach(function(pitchKey) {
        var btn = self.dom.angleButtons[pitchKey];
        var isAngle = Math.abs(curPitch - parseInt(pitchKey, 10)) <= 2;
        if (isAngle) {
          btn.style.background = 'rgba(255, 255, 255, 0.22)';
          btn.style.color = '#ffffff';
          btn.style.borderColor = 'rgba(255, 255, 255, 0.35)';
        } else {
          btn.style.background = 'rgba(255, 255, 255, 0.04)';
          btn.style.color = '#8b93a4';
          btn.style.borderColor = 'rgba(255, 255, 255, 0.10)';
        }
      });
    }

    // 3. Update Depth Label
    this.dom.depthLabel.textContent = 'Depth ' + (this.state.depth > 0 ? '+' : '') + this.state.depth;

    // 4. Update Status Pill
    var presetName = this.state.preset.charAt(0).toUpperCase() + this.state.preset.slice(1);
    var pitchDeg = Math.round(this.state.pitch);
    this.dom.statusPill.textContent = 'Drawing on: ' + presetName + ' (' + pitchDeg + '°)';

    // 5. Draw Pure Symmetrical 1-Axis Perspective Plate
    this._drawSingleAxisPlate();
  };

  TiltPadNavigator.prototype._drawSingleAxisPlate = function() {
    var cvs = this.dom.canvas;
    var ctx = this.dom.ctx;
    var dpr = window.devicePixelRatio || 1;
    var width = this._canvasWidth;
    var height = this._canvasHeight;

    ctx.save();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.translate(width / 2, height / 2);

    var pitch = this.state.pitch;

    // 6x4 Proportion Base Dimensions (56px half-width, 36px half-height)
    var baseW = 56;
    var baseH = 36;

    // 1-Axis Pitch Perspective Taper
    var pitchRad = (pitch * Math.PI) / 180;
    var cosP = Math.cos(pitchRad);
    var sinP = Math.sin(pitchRad);

    var topW, btmW;
    if (cosP >= 0) {
      // Tilted backward towards Floor (0°): Top is narrower, Bottom is wider
      topW = baseW * (1 - 0.28 * cosP);
      btmW = baseW * (1 + 0.22 * cosP);
    } else {
      // Tilted forward towards Ceiling (180°): Top is wider, Bottom is narrower
      var absCos = Math.abs(cosP);
      topW = baseW * (1 + 0.22 * absCos);
      btmW = baseW * (1 - 0.28 * absCos);
    }

    // Height foreshortening
    var h = Math.max(15, baseH * (0.42 + 0.58 * Math.abs(sinP)));

    // 1. Outer Glass Quad: Symmetrical, Level, Zero Skew
    ctx.beginPath();
    ctx.moveTo(-topW, -h);
    ctx.lineTo(topW, -h);
    ctx.lineTo(btmW, h);
    ctx.lineTo(-btmW, h);
    ctx.closePath();

    // Specular Gradient Fill
    var grad = ctx.createLinearGradient(0, -h, 0, h);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.24)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0.07)');
    ctx.fillStyle = grad;
    ctx.fill();

    // Crisp Outer Rim
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.90)';
    ctx.lineWidth = 1.6;
    ctx.lineJoin = 'round';
    ctx.stroke();

    // 2. Internal Grid: 6 Columns x 4 Rows
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(-topW, -h);
    ctx.lineTo(topW, -h);
    ctx.lineTo(btmW, h);
    ctx.lineTo(-btmW, h);
    ctx.closePath();
    ctx.clip();

    // 3 Horizontal Grid Lines (4 Rows)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.24)';
    ctx.lineWidth = 0.9;
    for (var r = 1; r <= 3; r++) {
      var tRow = r / 4;
      var rowY = -h + (h * 2) * tRow;
      var rowW = topW + (btmW - topW) * tRow;
      ctx.beginPath();
      ctx.moveTo(-rowW, rowY);
      ctx.lineTo(rowW, rowY);
      ctx.stroke();
    }

    // 5 Vertical Grid Lines (6 Columns, converging symmetrically)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
    ctx.lineWidth = 0.9;
    for (var c = 1; c <= 5; c++) {
      var tCol = c / 6;
      var xTop = -topW + (topW * 2) * tCol;
      var xBtm = -btmW + (btmW * 2) * tCol;
      ctx.beginPath();
      ctx.moveTo(xTop, -h);
      ctx.lineTo(xBtm, h);
      ctx.stroke();
    }

    // 3. Center Crosshair '+' Mark at (0, 0)
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(0, -4.5);
    ctx.lineTo(0, 4.5);
    ctx.moveTo(-4.5, 0);
    ctx.lineTo(4.5, 0);
    ctx.stroke();

    ctx.restore();
    ctx.restore();
  };

  TiltPadNavigator.prototype._notifyChange = function() {
    var pitchRad = (this.state.pitch * Math.PI) / 180;

    var nx = 0, ny = 0, nz = 0;
    if (this.state.preset === 'floor') {
      nx = 0;
      ny = Math.cos(pitchRad);
      nz = Math.sin(pitchRad);
    } else if (this.state.preset === 'side') {
      nx = Math.cos(pitchRad);
      ny = Math.sin(pitchRad);
      nz = 0;
    } else {
      // Wall or Cam
      nx = 0;
      ny = Math.sin(pitchRad);
      nz = Math.cos(pitchRad);
    }

    this.onPlaneChange({
      preset: this.state.preset,
      pitch: this.state.pitch,
      yaw: (this.state.preset === 'side') ? 90 : 0,
      depth: this.state.depth,
      normal: { x: nx, y: ny, z: nz }
    });
  };

  TiltPadNavigator.prototype.getState = function() {
    return {
      preset: this.state.preset,
      pitch: this.state.pitch,
      yaw: (this.state.preset === 'side') ? 90 : 0,
      depth: this.state.depth
    };
  };

  TiltPadNavigator.prototype.destroy = function() {
    if (this._animFrame) cancelAnimationFrame(this._animFrame);
    if (this.dom.root && this.dom.root.parentNode) {
      this.dom.root.parentNode.removeChild(this.dom.root);
    }
  };

  // Expose globally
  window.TiltPadNavigator = TiltPadNavigator;

})(window);
