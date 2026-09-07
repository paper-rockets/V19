// ================================================================
//  MODEL CANVAS — convert uploaded 3D models into active drawing planes
//  Extracts pure BufferGeometry (mesh only), strips textures/materials,
//  and activates as the active 3D drawing canvas (surfType = 'model').
// ================================================================
(function(){
  'use strict';

  // Stored model geometry + centroid + name
  window._modelCanvasGeo = null;
  window._modelCanvasCen = null;
  window._modelCanvasName = '';

  // Extract and combine all mesh geometries from a Three.js scene/object
  function extractMeshGeometry(rootObj) {
    var geometries = [];

    rootObj.updateMatrixWorld(true);
    var rootInv = new THREE.Matrix4().copy(rootObj.matrixWorld).invert();

    rootObj.traverse(function(child) {
      if (child.isMesh && child.geometry) {
        var geo = child.geometry.clone();
        if (geo.isBufferGeometry) {
          var matrix = new THREE.Matrix4().multiplyMatrices(rootInv, child.matrixWorld);
          geo.applyMatrix4(matrix);
          geometries.push(geo);
        }
      }
    });

    if (geometries.length === 0) return null;
    if (geometries.length === 1) {
      var single = geometries[0];
      single.computeVertexNormals();
      return single;
    }

    // Merge multiple geometries into a single BufferGeometry
    var totalPos = 0, totalNorm = 0, totalIdx = 0;
    for (var i = 0; i < geometries.length; i++) {
      var g = geometries[i];
      if (g.attributes.position) totalPos += g.attributes.position.array.length;
      if (g.index) totalIdx += g.index.array.length;
      else if (g.attributes.position) totalIdx += g.attributes.position.count;
    }

    var mergedPos = new Float32Array(totalPos);
    var mergedNorm = new Float32Array(totalPos);
    var mergedIdx = (totalPos / 3 > 65535) ? new Uint32Array(totalIdx) : new Uint16Array(totalIdx);

    var posOffset = 0, idxOffset = 0, vertCountOffset = 0;

    for (var j = 0; j < geometries.length; j++) {
      var geom = geometries[j];
      var pAttr = geom.attributes.position;
      var nAttr = geom.attributes.normal;
      var numVerts = pAttr.count;

      // Positions
      mergedPos.set(pAttr.array, posOffset);

      // Normals
      if (nAttr) {
        mergedNorm.set(nAttr.array, posOffset);
      }

      // Indices
      if (geom.index) {
        var idxArr = geom.index.array;
        for (var k = 0; k < idxArr.length; k++) {
          mergedIdx[idxOffset + k] = idxArr[k] + vertCountOffset;
        }
        idxOffset += idxArr.length;
      } else {
        for (var k2 = 0; k2 < numVerts; k2++) {
          mergedIdx[idxOffset + k2] = k2 + vertCountOffset;
        }
        idxOffset += numVerts;
      }

      posOffset += pAttr.array.length;
      vertCountOffset += numVerts;
      geom.dispose();
    }

    var mergedGeo = new THREE.BufferGeometry();
    mergedGeo.setAttribute('position', new THREE.BufferAttribute(mergedPos, 3));
    mergedGeo.setAttribute('normal', new THREE.BufferAttribute(mergedNorm, 3));
    mergedGeo.setIndex(new THREE.BufferAttribute(mergedIdx, 1));
    mergedGeo.computeVertexNormals();

    return mergedGeo;
  }

  var _calibrationsCache = {};

  function loadCalibrationsCache(cb) {
    fetch('model_calibrations.json?t=' + Date.now())
      .then(function(res) { return res.json(); })
      .then(function(data) {
        _calibrationsCache = data || {};
        if (typeof cb === 'function') cb(_calibrationsCache);
      })
      .catch(function() {
        try {
          var stored = localStorage.getItem('sketchbook_3d_calibrations');
          if (stored) _calibrationsCache = JSON.parse(stored);
        } catch (e) {}
        if (typeof cb === 'function') cb(_calibrationsCache);
      });
  }
  loadCalibrationsCache();

  function getCalibrationForModel(urlOrName) {
    if (!urlOrName) return null;
    var raw = urlOrName.split('?')[0].split('/').pop().replace(/\.(glb|gltf|obj)$/i, '');
    if (_calibrationsCache[raw]) return _calibrationsCache[raw];
    for (var k in _calibrationsCache) {
      var c = _calibrationsCache[k];
      if (c.file && (c.file === raw || c.file.replace(/\.(glb|gltf|obj)$/i, '') === raw)) return c;
      if (c.id && c.id === raw) return c;
      if (c.name && c.name.toLowerCase() === urlOrName.toLowerCase()) return c;
    }
    return null;
  }

  // Normalize and center base geometry to 1.0 unit bounding box
  function prepareModelGeometry(rawGeo) {
    rawGeo.computeBoundingBox();
    var box = rawGeo.boundingBox;
    var sz = new THREE.Vector3();
    box.getSize(sz);

    // Center geometry at (0, 0, 0)
    rawGeo.center();

    // Normalize base scale to 1.0 unit bounding box so unit scaling is 100% consistent across all models
    var maxDim = Math.max(sz.x, sz.y, sz.z);
    var normScale = (maxDim > 0.0001) ? (1.0 / maxDim) : 1.0;
    rawGeo.scale(normScale, normScale, normScale);

    rawGeo.computeVertexNormals();
    rawGeo.computeBoundingBox();
    rawGeo.computeBoundingSphere();

    // Snap base to ground (Z=0 in Sketchbook)
    if (rawGeo.boundingBox) {
      rawGeo.translate(0, 0, -rawGeo.boundingBox.min.z);
    }

    return rawGeo;
  }

  // Activate model as active drawing surface with calibration applied
  window._activateModelCanvas = function(geo, name, cal) {
    if (!geo && !window._modelCanvasGeo) {
      if (window.toast) toast('No 3D model loaded — drag & drop a .glb/.obj file');
      return;
    }

    if (geo) {
      if (window._modelCanvasGeo && window._modelCanvasGeo !== geo) {
        window._modelCanvasGeo.dispose();
      }
      window._modelCanvasGeo = geo;
    }
    if (name) window._modelCanvasName = name;

    surfType = 'model';
    curPlane = 'xy';

    // Apply calibrated position, rotation, scale
    var scaleVal = 4.0;
    var rx = 90, ry = 0, rz = 0;
    var px = 0, py = 0, pz = 0;

    if (cal) {
      if (typeof cal.scale === 'number' && cal.scale > 0) scaleVal = cal.scale;
      if (cal.rot) {
        if (cal.rot.x !== undefined) rx = cal.rot.x;
        if (cal.rot.y !== undefined) ry = cal.rot.y;
        if (cal.rot.z !== undefined) rz = cal.rot.z;
      }
      if (cal.pos) {
        if (cal.pos.x !== undefined) px = cal.pos.x;
        if (cal.pos.y !== undefined) py = cal.pos.y;
        if (cal.pos.z !== undefined) pz = cal.pos.z;
      }
    }

    if (typeof surfPos !== 'undefined') surfPos.set(px, py, pz);
    if (typeof surfEuler !== 'undefined') surfEuler.set((rx * Math.PI) / 180, (ry * Math.PI) / 180, (rz * Math.PI) / 180);
    if (typeof surfScale !== 'undefined') surfScale = scaleVal;
    if (typeof surfScaleAxes !== 'undefined') surfScaleAxes.set(1, 1, 1);
    if (typeof syncSurf === 'function') syncSurf();

    buildSurf();

    surfGroup.visible = true;
    var bsurf = document.getElementById('bsurf');
    if (bsurf) bsurf.classList.add('on');

    // Update surface mode buttons
    document.querySelectorAll('[data-surf]').forEach(function(b) {
      b.classList.toggle('on', b.dataset.surf === 'model');
    });

    // Sync all surf cycle buttons
    ['pb-cyc-surf', 'pb-cyc-surf2', 'sb-cyc-surf'].forEach(function(id) {
      var b = document.getElementById(id);
      if (b) b.textContent = 'Model';
    });

    // Disable bloom and post-processing glow effects by default for clean model canvas view
    if (window._stageSystem && window._stageSystem.pipeline) {
      window._stageSystem.pipeline.setBloom(false);
      window._stageSystem.pipeline.setGrain(false);
      window._stageSystem.pipeline.setDoF(false);
      window._stageSystem.refreshUI();
    }

    if (window._updateLoftDelBtn) window._updateLoftDelBtn();
    window._hudUserHidden = false;
    if (window._updateModelCanvasHUD) window._updateModelCanvasHUD(true);
    if (window.markDirty) window.markDirty();
    if (window.setMode) window.setMode('draw');

    if (window.toast) toast('3D Model Canvas Active: ' + (window._modelCanvasName || 'Model'));
  };

  // Clear stored model canvas
  window._clearModelCanvas = function() {
    if (window._modelCanvasGeo) {
      window._modelCanvasGeo.dispose();
      window._modelCanvasGeo = null;
    }
    window._modelCanvasName = '';
    window._hudUserHidden = false;

    if (window._updateModelCanvasHUD) window._updateModelCanvasHUD();

    if (surfType === 'model') {
      surfType = 'plane';
      buildSurf();
      ['pb-cyc-surf', 'pb-cyc-surf2', 'sb-cyc-surf'].forEach(function(id) {
        var b = document.getElementById(id);
        if (b) b.textContent = 'Plane';
      });
      if (window.markDirty) window.markDirty();
      if (window.toast) toast('Reset to standard drawing plane');
    }
  };

  // ─────────────────────────────────────────────────────────────────
  // 3D MODEL CANVAS TRANSFORM, SNAP & COLOR HUD
  // ─────────────────────────────────────────────────────────────────

  var _hudEl = null;

  window.snapModelToGround = function() {
    if (typeof surfMesh === 'undefined' || !surfMesh || typeof surfGroup === 'undefined' || !surfGroup) return;
    surfGroup.updateMatrixWorld(true);
    var box = new THREE.Box3().setFromObject(surfMesh);
    if (box.isEmpty()) return;
    surfPos.z -= box.min.z;
    if (typeof syncSurf === 'function') syncSurf();
    if (window._updateModelCanvasHUD) window._updateModelCanvasHUD();
    if (window.markDirty) window.markDirty();
    if (typeof renderer !== 'undefined' && typeof scene !== 'undefined' && typeof camera !== 'undefined') {
      renderer.render(scene, camera);
    }
    if (window.toast) toast('Snapped to Ground (Z = 0.0)');
  };

  window.setModelCanvasColor = function(col) {
    window._modelCanvasColor = (typeof col === 'string') ? parseInt(col.replace('#', '0x'), 16) : col;
    var hexStr = (typeof col === 'string') ? col : ('#' + col.toString(16).padStart(6, '0'));
    if (typeof surfFillMat !== 'undefined' && surfFillMat) {
      surfFillMat.color.set(hexStr);
      surfFillMat.needsUpdate = true;
    }
    if (typeof surfMesh !== 'undefined' && surfMesh) {
      surfMesh.traverse(function(child) {
        if (child.isMesh && child.material && child.material !== surfWireMat) {
          child.material.color.set(hexStr);
          child.material.needsUpdate = true;
        }
      });
    }
    var cp = document.getElementById('mc-hud-color-picker');
    if (cp) cp.value = hexStr;
    if (window.markDirty) window.markDirty();
    if (typeof renderer !== 'undefined' && typeof scene !== 'undefined' && typeof camera !== 'undefined') {
      renderer.render(scene, camera);
    }
  };

  // Permanently save active 3D model calibration to server & local cache
  window.saveActiveModelCalibration = function() {
    var modelId = window._modelCanvasFileId || (window._modelCanvasUrl ? window._modelCanvasUrl.split('?')[0].split('/').pop().replace(/\.(glb|gltf|obj)$/i, '') : '') || (window._modelCanvasName || '').toLowerCase().replace(/[^a-z0-9_]/g, '_').replace(/_3d$/i, '');
    if (!modelId) {
      if (window.toast) toast('No active 3D model to save');
      return;
    }

    var rx = 0, ry = 0, rz = 0;
    if (typeof surfEuler !== 'undefined' && surfEuler) {
      rx = Math.round((surfEuler.x * 180 / Math.PI) % 360); if (rx < 0) rx += 360;
      ry = Math.round((surfEuler.y * 180 / Math.PI) % 360); if (ry < 0) ry += 360;
      rz = Math.round((surfEuler.z * 180 / Math.PI) % 360); if (rz < 0) rz += 360;
    }

    var scale = (typeof surfScale !== 'undefined') ? Number(surfScale.toFixed(2)) : 4.0;
    var px = (typeof surfPos !== 'undefined') ? Number(surfPos.x.toFixed(2)) : 0;
    var py = (typeof surfPos !== 'undefined') ? Number(surfPos.y.toFixed(2)) : 0;
    var pz = (typeof surfPos !== 'undefined') ? Number(surfPos.z.toFixed(2)) : 0;

    var camData = { theta: -1.15, phi: 1.15, radius: 8.0, tx: 0, ty: 0, tz: 0 };
    if (typeof cam !== 'undefined' && cam) {
      camData.theta = Number((cam.theta || -1.15).toFixed(2));
      camData.phi = Number((cam.phi || 1.15).toFixed(2));
      camData.radius = Number((cam.radius || 8.0).toFixed(1));
      if (cam.target) {
        camData.tx = Number((cam.target.x || 0).toFixed(2));
        camData.ty = Number((cam.target.y || 0).toFixed(2));
        camData.tz = Number((cam.target.z || 0).toFixed(2));
      }
    }

    var existing = _calibrationsCache[modelId] || {};
    var entry = {
      id: modelId,
      name: existing.name || window._modelCanvasName || modelId,
      file: existing.file || (modelId + '.glb'),
      category: existing.category || 'anime',
      scale: scale,
      rot: { x: rx, y: ry, z: rz },
      pos: { x: px, y: py, z: pz },
      camera: camData
    };

    _calibrationsCache[modelId] = entry;

    try {
      localStorage.setItem('sketchbook_3d_calibrations', JSON.stringify(_calibrationsCache));
    } catch (e) {}

    fetch('/api/save-calibrations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(_calibrationsCache, null, 2)
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (data && data.success) {
        if (window.toast) toast('CALIBRATION PERMANENTLY SAVED: ' + (entry.name || modelId));
      } else {
        if (window.toast) toast('Saved to browser storage');
      }
    })
    .catch(function() {
      if (window.toast) toast('Saved to browser storage');
    });
  };

  function createModelCanvasHUD() {
    if (_hudEl) return _hudEl;

    var panel = document.createElement('div');
    panel.id = 'model-canvas-hud';
    panel.className = 'card';
    panel.style.cssText = 'position:fixed;bottom:20px;left:240px;z-index:250;display:none;flex-direction:column;width:256px;background:var(--pan,#ffffff);border:1px solid var(--bdr,rgba(0,0,0,0.08));border-radius:var(--r-card,16px);box-shadow:var(--sh-pop,0 8px 32px rgba(0,0,0,0.12));font-family:var(--font-main);color:var(--ink,#282c35);user-select:none;overflow:hidden;gap:8px;padding:12px 14px';

    // Header
    var header = document.createElement('div');
    header.style.cssText = 'display:flex;align-items:center;justify-content:space-between;cursor:move;padding-bottom:6px;border-bottom:1px solid var(--bdr,rgba(0,0,0,0.06))';

    var titleBox = document.createElement('div');
    titleBox.style.cssText = 'display:flex;align-items:center;gap:6px;overflow:hidden';

    var tagBadge = document.createElement('span');
    tagBadge.textContent = '3D CANVAS';
    tagBadge.style.cssText = 'font-size:8.5px;font-weight:700;letter-spacing:0.04em;color:var(--mut,#788090);background:var(--pan-subtle,#f4f6f9);border:1px solid var(--bdr,rgba(0,0,0,0.08));border-radius:5px;padding:2px 5px;flex-shrink:0';

    var title = document.createElement('span');
    title.id = 'mc-hud-title';
    title.textContent = '3D Model';
    title.style.cssText = 'font-size:11px;font-weight:700;color:var(--ink,#282c35);white-space:nowrap;overflow:hidden;text-overflow:ellipsis';

    titleBox.appendChild(tagBadge);
    titleBox.appendChild(title);

    var closeBtn = document.createElement('button');
    closeBtn.id = 'mc-hud-collapse-btn';
    closeBtn.textContent = '▼';
    closeBtn.title = 'Minimize / expand 3D Canvas controls';
    closeBtn.style.cssText = 'padding:2px 6px;font-size:10px;font-weight:700;border-radius:4px;border:none;background:transparent;color:var(--mut,#788090);cursor:pointer;flex-shrink:0';
    closeBtn.addEventListener('mouseenter', function() { closeBtn.style.color = 'var(--ink,#282c35)'; });
    closeBtn.addEventListener('mouseleave', function() { closeBtn.style.color = 'var(--mut,#788090)'; });
    closeBtn.addEventListener('pointerdown', function(e) { e.stopPropagation(); });
    closeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      e.preventDefault();
      var body = document.getElementById('mc-hud-body');
      if (!body) return;
      var isCollapsed = body.style.display === 'none';
      body.style.display = isCollapsed ? '' : 'none';
      closeBtn.textContent = isCollapsed ? '▼' : '▲';
    });

    var hideBtn = document.createElement('button');
    hideBtn.id = 'mc-hud-hide-btn';
    hideBtn.textContent = '✕';
    hideBtn.title = 'Hide to small tab';
    hideBtn.style.cssText = 'padding:2px 6px;font-size:11px;font-weight:700;border-radius:4px;border:none;background:transparent;color:var(--mut,#788090);cursor:pointer;flex-shrink:0;margin-left:2px';
    hideBtn.addEventListener('mouseenter', function() { hideBtn.style.color = 'var(--ink,#282c35)'; });
    hideBtn.addEventListener('mouseleave', function() { hideBtn.style.color = 'var(--mut,#788090)'; });
    hideBtn.addEventListener('pointerdown', function(e) { e.stopPropagation(); });
    hideBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      e.preventDefault();
      panel.style.display = 'none';
      window._hudUserHidden = true;
      var tab = createModelCanvasDockTab();
      if (tab) tab.style.display = 'flex';
    });

    var lockBtn = document.createElement('button');
    lockBtn.id = 'mc-hud-lock-btn';
    lockBtn.textContent = window._modelCanvasLocked ? 'LOCKED' : 'LOCK';
    lockBtn.title = 'Lock/Unlock 3D model transforms and position';
    lockBtn.style.cssText = 'padding:2px 7px;font-size:8.5px;font-weight:700;border-radius:5px;border:1px solid var(--bdr,rgba(0,0,0,0.15));cursor:pointer;background:' + (window._modelCanvasLocked ? '#ef4444' : 'var(--pan-subtle,#f4f6f9)') + ';color:' + (window._modelCanvasLocked ? '#ffffff' : 'var(--ink,#282c35)');
    lockBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      window._modelCanvasLocked = !window._modelCanvasLocked;
      var l = window._modelCanvasLocked;
      lockBtn.textContent = l ? 'LOCKED' : 'LOCK';
      lockBtn.style.background = l ? '#ef4444' : 'var(--pan-subtle,#f4f6f9)';
      lockBtn.style.color = l ? '#ffffff' : 'var(--ink,#282c35)';
      if (window.toast) toast(l ? 'Model Locked' : 'Model Unlocked');
    });

    var btnBox = document.createElement('div');
    btnBox.style.cssText = 'display:flex;align-items:center;gap:3px';
    btnBox.addEventListener('pointerdown', function(e) { e.stopPropagation(); });
    btnBox.appendChild(lockBtn);
    btnBox.appendChild(closeBtn);
    btnBox.appendChild(hideBtn);

    header.appendChild(titleBox);
    header.appendChild(btnBox);

    // Draggable header logic
    var isDragging = false, dragStartX = 0, dragStartY = 0, initLeft = 0, initTop = 0;
    header.addEventListener('pointerdown', function(e) {
      if (btnBox.contains(e.target) || e.target === closeBtn || e.target === hideBtn) return;
      isDragging = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      var rect = panel.getBoundingClientRect();
      initLeft = rect.left;
      initTop = rect.top;
      panel.style.bottom = 'auto';
      panel.style.left = initLeft + 'px';
      panel.style.top = initTop + 'px';
      header.setPointerCapture(e.pointerId);
    });
    header.addEventListener('pointermove', function(e) {
      if (!isDragging) return;
      var dx = e.clientX - dragStartX;
      var dy = e.clientY - dragStartY;
      panel.style.left = Math.max(10, Math.min(window.innerWidth - 270, initLeft + dx)) + 'px';
      panel.style.top = Math.max(10, Math.min(window.innerHeight - 60, initTop + dy)) + 'px';
    });
    header.addEventListener('pointerup', function(e) {
      isDragging = false;
      try { header.releasePointerCapture(e.pointerId); } catch (err) {}
    });
    header.addEventListener('click', function(e) {
      if (btnBox.contains(e.target) || e.target === closeBtn || e.target === hideBtn) return;
      var body = document.getElementById('mc-hud-body');
      if (!body || body.style.display !== 'none') return;
      body.style.display = '';
      closeBtn.textContent = '▼';
    });

    // Row 1: Quick Ground, Wireframe, Reset, and Remove Actions
    var actRow = document.createElement('div');
    actRow.style.cssText = 'display:flex;gap:4px;align-items:center';

    var groundBtn = document.createElement('button');
    groundBtn.textContent = 'GROUND';
    groundBtn.title = 'Snap base of model to ground (Z = 0.0)';
    groundBtn.style.cssText = 'flex:1.1;padding:5px 0;font-size:9.5px;font-weight:700;letter-spacing:0.02em;border-radius:8px;background:var(--pan-subtle,#f4f6f9);color:var(--ink,#282c35);border:1px solid var(--bdr,rgba(0,0,0,0.08));cursor:pointer';
    groundBtn.addEventListener('click', function() {
      window.snapModelToGround();
    });

    var wireBtn = document.createElement('button');
    wireBtn.id = 'mc-hud-wire-btn';
    wireBtn.textContent = 'WIRE';
    wireBtn.title = 'Toggle wireframe overlay contours';
    wireBtn.style.cssText = 'flex:0.9;padding:5px 0;font-size:9px;font-weight:600;border-radius:8px;border:1px solid var(--bdr,rgba(0,0,0,0.08));background:var(--pan-subtle,#f4f6f9);color:var(--ink,#282c35);cursor:pointer';
    wireBtn.addEventListener('click', function() {
      if (typeof surfWireMat !== 'undefined' && surfWireMat) {
        var isVis = (surfWireMat.opacity > 0.05);
        surfWireMat.opacity = isVis ? 0 : 0.65;
        wireBtn.textContent = isVis ? 'WIRE: OFF' : 'WIRE';
        wireBtn.style.color = isVis ? 'var(--mut,#788090)' : 'var(--ink,#282c35)';
        if (window.markDirty) window.markDirty();
      }
    });

    var resetBtn = document.createElement('button');
    resetBtn.textContent = 'RESET';
    resetBtn.title = 'Reset model position, rotation and scale';
    resetBtn.style.cssText = 'flex:0.9;padding:5px 0;font-size:9px;font-weight:600;border-radius:8px;border:1px solid var(--bdr,rgba(0,0,0,0.08));background:var(--pan-subtle,#f4f6f9);color:var(--mut,#788090);cursor:pointer';
    resetBtn.addEventListener('click', function() {
      if (typeof surfPos !== 'undefined') surfPos.set(0, 0, 0);
      if (typeof surfEuler !== 'undefined') surfEuler.set(0, 0, 0);
      if (typeof surfScale !== 'undefined') surfScale = 1;
      if (typeof surfScaleAxes !== 'undefined') surfScaleAxes.set(1, 1, 1);
      if (typeof syncSurf === 'function') syncSurf();
      window._updateModelCanvasHUD();
      if (window.toast) toast('3D Canvas transform reset');
    });

    var debugBtn = document.createElement('button');
    debugBtn.id = 'mc-hud-debug-btn';
    debugBtn.textContent = 'DEBUG';
    debugBtn.title = 'Toggle Raycast Diagnostics & Normal Visualizers (F8 / Alt+R)';
    debugBtn.style.cssText = 'flex:0.9;padding:5px 0;font-size:9px;font-weight:600;border-radius:8px;border:1px solid var(--bdr,rgba(0,0,0,0.08));background:var(--pan-subtle,#f4f6f9);color:var(--mut,#788090);cursor:pointer';
    debugBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      if (window.toggleRaycastDebug) window.toggleRaycastDebug();
    });

    var removeBtn = document.createElement('button');
    removeBtn.textContent = 'REMOVE';
    removeBtn.title = 'Remove 3D Model and switch back to 2D drawing plane';
    removeBtn.style.cssText = 'flex:1;padding:5px 0;font-size:9px;font-weight:600;border-radius:8px;border:1px solid rgba(239,68,68,0.3);background:rgba(239,68,68,0.06);color:#ef4444;cursor:pointer';
    removeBtn.addEventListener('click', function() {
      window._clearModelCanvas();
    });

    var lockBtn = document.createElement('button');
    lockBtn.id = 'mc-hud-lock-btn';
    lockBtn.textContent = window._modelCanvasLocked ? 'LOCKED' : 'LOCK';
    lockBtn.title = 'Lock/Unlock model to prevent accidental moving or resizing';
    lockBtn.style.cssText = 'flex:1.1;padding:5px 0;font-size:9.5px;font-weight:700;letter-spacing:0.02em;border-radius:8px;cursor:pointer;background:' + (window._modelCanvasLocked ? '#ef4444' : 'var(--pan-subtle,#f4f6f9)') + ';color:' + (window._modelCanvasLocked ? '#ffffff' : 'var(--ink,#282c35)') + ';border:1px solid var(--bdr,rgba(0,0,0,0.12))';
    lockBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      window._modelCanvasLocked = !window._modelCanvasLocked;
      var l = window._modelCanvasLocked;
      lockBtn.textContent = l ? 'LOCKED' : 'LOCK';
      lockBtn.style.background = l ? '#ef4444' : 'var(--pan-subtle,#f4f6f9)';
      lockBtn.style.color = l ? '#ffffff' : 'var(--ink,#282c35)';
      if (window.toast) toast(l ? 'Model Locked' : 'Model Unlocked');
    });

    var repoBtn = document.createElement('button');
    repoBtn.id = 'mc-hud-reposition-btn';
    repoBtn.textContent = 'MOVE';
    repoBtn.title = 'Reposition model by dragging directly across the flat ground plane';
    repoBtn.style.cssText = 'flex:1;padding:5px 0;font-size:9.5px;font-weight:700;letter-spacing:0.02em;border-radius:8px;background:var(--pan-subtle,#f4f6f9);color:var(--ink,#282c35);border:1px solid var(--bdr,rgba(0,0,0,0.08));cursor:pointer';
    repoBtn.addEventListener('click', function() {
      if (window._modelCanvasLocked) {
        if (window.toast) toast('Unlock model first to reposition');
        return;
      }
      window._modelCanvasReposition = !window._modelCanvasReposition;
      var isRep = window._modelCanvasReposition;
      repoBtn.style.background = isRep ? '#0284c7' : 'var(--pan-subtle,#f4f6f9)';
      repoBtn.style.color = isRep ? '#ffffff' : 'var(--ink,#282c35)';
      repoBtn.textContent = isRep ? 'DONE' : 'MOVE';
      if (isRep) {
        if (window.toast) toast('Drag in 3D viewport to slide model across ground');
      } else {
        if (window.toast) toast('Model position set');
      }
    });

    actRow.appendChild(lockBtn);
    actRow.appendChild(repoBtn);
    actRow.appendChild(groundBtn);
    actRow.appendChild(wireBtn);
    actRow.appendChild(resetBtn);
    actRow.appendChild(removeBtn);

    // Row 2: Scale & Elevation Steppers
    var ctrlRow = document.createElement('div');
    ctrlRow.style.cssText = 'display:flex;gap:6px;align-items:center';

    // Scale Box
    var scaleBox = document.createElement('div');
    scaleBox.style.cssText = 'flex:1;display:flex;align-items:center;justify-content:space-between;background:var(--pan-subtle,#f4f6f9);border:1px solid var(--bdr,rgba(0,0,0,0.08));border-radius:8px;padding:3px 6px';

    var scaleLbl = document.createElement('span');
    scaleLbl.textContent = 'SCALE';
    scaleLbl.style.cssText = 'font-size:9px;font-weight:700;color:var(--mut,#788090)';

    var scaleMinus = document.createElement('button');
    scaleMinus.textContent = '-';
    scaleMinus.style.cssText = 'width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;background:var(--pan,#ffffff);border:1px solid var(--bdr,rgba(0,0,0,0.08));color:var(--ink,#282c35);border-radius:5px;cursor:pointer';
    scaleMinus.addEventListener('click', function() {
      if (typeof surfScale !== 'undefined') {
        var step = surfScale > 10 ? 2.0 : (surfScale > 3.0 ? 0.5 : 0.1);
        surfScale = Math.max(0.05, Math.round((surfScale - step) * 100) / 100);
        if (typeof syncSurf === 'function') syncSurf();
        window._updateModelCanvasHUD();
      }
    });

    var scaleVal = document.createElement('span');
    scaleVal.id = 'mc-hud-scale-val';
    scaleVal.textContent = '1.0x';
    scaleVal.title = 'Click to enter exact scale (0.05 - 50.0x)';
    scaleVal.style.cssText = 'font-size:9.5px;font-weight:700;color:var(--ink,#282c35);font-family:var(--font-mono,monospace);cursor:pointer;padding:0 2px';
    scaleVal.addEventListener('click', function() {
      var current = typeof surfScale !== 'undefined' ? surfScale.toFixed(2) : '1.0';
      var val = prompt('Enter 3D Model Scale (0.05 - 50.0):', current);
      if (val !== null) {
        var num = parseFloat(val);
        if (!isNaN(num) && num > 0) {
          surfScale = Math.max(0.05, Math.min(50.0, num));
          if (typeof syncSurf === 'function') syncSurf();
          window._updateModelCanvasHUD();
          if (window.toast) toast('Model Scale: ' + surfScale.toFixed(2) + 'x');
        }
      }
    });

    var scalePlus = document.createElement('button');
    scalePlus.textContent = '+';
    scalePlus.style.cssText = 'width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;background:var(--pan,#ffffff);border:1px solid var(--bdr,rgba(0,0,0,0.08));color:var(--ink,#282c35);border-radius:5px;cursor:pointer';
    scalePlus.addEventListener('click', function() {
      if (typeof surfScale !== 'undefined') {
        var step = surfScale >= 10 ? 2.0 : (surfScale >= 3.0 ? 0.5 : 0.1);
        surfScale = Math.min(50.0, Math.round((surfScale + step) * 100) / 100);
        if (typeof syncSurf === 'function') syncSurf();
        window._updateModelCanvasHUD();
      }
    });

    scaleBox.appendChild(scaleLbl);
    scaleBox.appendChild(scaleMinus);
    scaleBox.appendChild(scaleVal);
    scaleBox.appendChild(scalePlus);

    // Elevation Box
    var elevBox = document.createElement('div');
    elevBox.style.cssText = 'flex:1;display:flex;align-items:center;justify-content:space-between;background:var(--pan-subtle,#f4f6f9);border:1px solid var(--bdr,rgba(0,0,0,0.08));border-radius:8px;padding:3px 6px';

    var elevLbl = document.createElement('span');
    elevLbl.textContent = 'ELEV';
    elevLbl.style.cssText = 'font-size:9px;font-weight:700;color:var(--mut,#788090)';

    var elevDown = document.createElement('button');
    elevDown.textContent = '-';
    elevDown.title = 'Lower model (-0.5)';
    elevDown.style.cssText = 'width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;background:var(--pan,#ffffff);border:1px solid var(--bdr,rgba(0,0,0,0.08));color:var(--ink,#282c35);border-radius:5px;cursor:pointer';
    elevDown.addEventListener('click', function() {
      if (typeof surfPos !== 'undefined') {
        surfPos.z = Math.round((surfPos.z - 0.5) * 100) / 100;
        if (typeof syncSurf === 'function') syncSurf();
        window._updateModelCanvasHUD();
      }
    });

    var elevVal = document.createElement('span');
    elevVal.id = 'mc-hud-elev-val';
    elevVal.textContent = '0.0';
    elevVal.title = 'Click to enter exact elevation (Z)';
    elevVal.style.cssText = 'font-size:9.5px;font-weight:700;color:var(--ink,#282c35);font-family:var(--font-mono,monospace);cursor:pointer;padding:0 2px';
    elevVal.addEventListener('click', function() {
      var current = typeof surfPos !== 'undefined' ? surfPos.z.toFixed(2) : '0.0';
      var val = prompt('Enter 3D Model Elevation (Z):', current);
      if (val !== null) {
        var num = parseFloat(val);
        if (!isNaN(num)) {
          surfPos.z = num;
          if (typeof syncSurf === 'function') syncSurf();
          window._updateModelCanvasHUD();
          if (window.toast) toast('Elevation (Z): ' + surfPos.z.toFixed(2));
        }
      }
    });

    var elevUp = document.createElement('button');
    elevUp.textContent = '+';
    elevUp.title = 'Raise model (+0.5)';
    elevUp.style.cssText = 'width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;background:var(--pan,#ffffff);border:1px solid var(--bdr,rgba(0,0,0,0.08));color:var(--ink,#282c35);border-radius:5px;cursor:pointer';
    elevUp.addEventListener('click', function() {
      if (typeof surfPos !== 'undefined') {
        surfPos.z = Math.round((surfPos.z + 0.5) * 100) / 100;
        if (typeof syncSurf === 'function') syncSurf();
        window._updateModelCanvasHUD();
      }
    });

    elevBox.appendChild(elevLbl);
    elevBox.appendChild(elevDown);
    elevBox.appendChild(elevVal);
    elevBox.appendChild(elevUp);

    ctrlRow.appendChild(scaleBox);
    ctrlRow.appendChild(elevBox);

    // Row 3: Move Left/Right (X) and Front/Back (Y) Steppers
    var posRow = document.createElement('div');
    posRow.style.cssText = 'display:flex;gap:6px;align-items:center';

    // Move Left/Right (X)
    var posXBox = document.createElement('div');
    posXBox.style.cssText = 'flex:1;display:flex;align-items:center;justify-content:space-between;background:var(--pan-subtle,#f4f6f9);border:1px solid var(--bdr,rgba(0,0,0,0.08));border-radius:8px;padding:3px 6px';

    var posXLbl = document.createElement('span');
    posXLbl.textContent = 'POS X';
    posXLbl.title = 'Move Left / Right';
    posXLbl.style.cssText = 'font-size:9px;font-weight:700;color:var(--mut,#788090)';

    var posXLeft = document.createElement('button');
    posXLeft.textContent = '<';
    posXLeft.title = 'Move model left (-0.5)';
    posXLeft.style.cssText = 'width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;background:var(--pan,#ffffff);border:1px solid var(--bdr,rgba(0,0,0,0.08));color:var(--ink,#282c35);border-radius:5px;cursor:pointer';
    posXLeft.addEventListener('click', function() {
      if (typeof surfPos !== 'undefined') {
        surfPos.x = Math.round((surfPos.x - 0.5) * 100) / 100;
        if (typeof syncSurf === 'function') syncSurf();
        window._updateModelCanvasHUD();
      }
    });

    var posXVal = document.createElement('span');
    posXVal.id = 'mc-hud-posx-val';
    posXVal.textContent = '0.0';
    posXVal.title = 'Click to enter exact X position (Left / Right)';
    posXVal.style.cssText = 'font-size:9.5px;font-weight:700;color:var(--ink,#282c35);font-family:var(--font-mono,monospace);cursor:pointer;padding:0 2px';
    posXVal.addEventListener('click', function() {
      var current = typeof surfPos !== 'undefined' ? surfPos.x.toFixed(2) : '0.0';
      var val = prompt('Enter 3D Model X Position (Left / Right):', current);
      if (val !== null) {
        var num = parseFloat(val);
        if (!isNaN(num)) {
          surfPos.x = num;
          if (typeof syncSurf === 'function') syncSurf();
          window._updateModelCanvasHUD();
          if (window.toast) toast('Position X: ' + surfPos.x.toFixed(2));
        }
      }
    });

    var posXRight = document.createElement('button');
    posXRight.textContent = '>';
    posXRight.title = 'Move model right (+0.5)';
    posXRight.style.cssText = 'width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;background:var(--pan,#ffffff);border:1px solid var(--bdr,rgba(0,0,0,0.08));color:var(--ink,#282c35);border-radius:5px;cursor:pointer';
    posXRight.addEventListener('click', function() {
      if (typeof surfPos !== 'undefined') {
        surfPos.x = Math.round((surfPos.x + 0.5) * 100) / 100;
        if (typeof syncSurf === 'function') syncSurf();
        window._updateModelCanvasHUD();
      }
    });

    posXBox.appendChild(posXLbl);
    posXBox.appendChild(posXLeft);
    posXBox.appendChild(posXVal);
    posXBox.appendChild(posXRight);

    // Move Front/Back (Y)
    var posYBox = document.createElement('div');
    posYBox.style.cssText = 'flex:1;display:flex;align-items:center;justify-content:space-between;background:var(--pan-subtle,#f4f6f9);border:1px solid var(--bdr,rgba(0,0,0,0.08));border-radius:8px;padding:3px 6px';

    var posYLbl = document.createElement('span');
    posYLbl.textContent = 'POS Y';
    posYLbl.title = 'Move Front / Back';
    posYLbl.style.cssText = 'font-size:9px;font-weight:700;color:var(--mut,#788090)';

    var posYBack = document.createElement('button');
    posYBack.textContent = 'v';
    posYBack.title = 'Move model forward / front (-0.5)';
    posYBack.style.cssText = 'width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;background:var(--pan,#ffffff);border:1px solid var(--bdr,rgba(0,0,0,0.08));color:var(--ink,#282c35);border-radius:5px;cursor:pointer';
    posYBack.addEventListener('click', function() {
      if (typeof surfPos !== 'undefined') {
        surfPos.y = Math.round((surfPos.y - 0.5) * 100) / 100;
        if (typeof syncSurf === 'function') syncSurf();
        window._updateModelCanvasHUD();
      }
    });

    var posYVal = document.createElement('span');
    posYVal.id = 'mc-hud-posy-val';
    posYVal.textContent = '0.0';
    posYVal.title = 'Click to enter exact Y position (Front / Back)';
    posYVal.style.cssText = 'font-size:9.5px;font-weight:700;color:var(--ink,#282c35);font-family:var(--font-mono,monospace);cursor:pointer;padding:0 2px';
    posYVal.addEventListener('click', function() {
      var current = typeof surfPos !== 'undefined' ? surfPos.y.toFixed(2) : '0.0';
      var val = prompt('Enter 3D Model Y Position (Front / Back):', current);
      if (val !== null) {
        var num = parseFloat(val);
        if (!isNaN(num)) {
          surfPos.y = num;
          if (typeof syncSurf === 'function') syncSurf();
          window._updateModelCanvasHUD();
          if (window.toast) toast('Position Y: ' + surfPos.y.toFixed(2));
        }
      }
    });

    var posYFwd = document.createElement('button');
    posYFwd.textContent = '^';
    posYFwd.title = 'Move model backward / back (+0.5)';
    posYFwd.style.cssText = 'width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;background:var(--pan,#ffffff);border:1px solid var(--bdr,rgba(0,0,0,0.08));color:var(--ink,#282c35);border-radius:5px;cursor:pointer';
    posYFwd.addEventListener('click', function() {
      if (typeof surfPos !== 'undefined') {
        surfPos.y = Math.round((surfPos.y + 0.5) * 100) / 100;
        if (typeof syncSurf === 'function') syncSurf();
        window._updateModelCanvasHUD();
      }
    });

    posYBox.appendChild(posYLbl);
    posYBox.appendChild(posYBack);
    posYBox.appendChild(posYVal);
    posYBox.appendChild(posYFwd);

    posRow.appendChild(posXBox);
    posRow.appendChild(posYBox);

    // Row 4: Rotation Quick Buttons
    var rotRow = document.createElement('div');
    rotRow.style.cssText = 'display:flex;gap:4px;align-items:center';

    var rotLblText = document.createElement('span');
    rotLblText.textContent = 'ROT:';
    rotLblText.style.cssText = 'font-size:9px;font-weight:700;color:var(--mut,#788090);margin-right:2px';
    rotRow.appendChild(rotLblText);

    [
      { label: '< 45°', fn: function() { surfEuler.z -= Math.PI / 4; } },
      { label: '45° >', fn: function() { surfEuler.z += Math.PI / 4; } },
      { label: 'TURN 90°', fn: function() { surfEuler.z += Math.PI / 2; } },
      { label: 'FLIP 180°', fn: function() { surfEuler.z += Math.PI; } }
    ].forEach(function(rItem) {
      var rBtn = document.createElement('button');
      rBtn.textContent = rItem.label;
      rBtn.style.cssText = 'flex:1;padding:5px 0;font-size:9px;font-weight:700;border-radius:7px;border:1px solid var(--bdr,rgba(0,0,0,0.12));background:var(--pan-subtle,#f4f6f9);color:var(--ink,#282c35);cursor:pointer';
      rBtn.addEventListener('click', function() {
        if (typeof surfEuler !== 'undefined') {
          rItem.fn();
          if (typeof syncSurf === 'function') syncSurf();
          window._updateModelCanvasHUD();
        }
      });
      rotRow.appendChild(rBtn);
    });

    // Row 4: Permanent Calibration Set Button
    var saveRow = document.createElement('div');
    saveRow.style.cssText = 'display:flex;gap:4px;align-items:center;padding-top:2px';

    var saveBtn = document.createElement('button');
    saveBtn.id = 'mc-hud-save-btn';
    saveBtn.textContent = 'SET: PERMA-SAVE CALIBRATION';
    saveBtn.title = 'Permanently save position, rotation, scale and view for this model';
    saveBtn.style.cssText = 'width:100%;padding:7px 0;font-size:9.5px;font-weight:700;letter-spacing:0.04em;border-radius:8px;border:1px solid #000000;background:var(--ink,#282c35);color:#ffffff;cursor:pointer;text-align:center';
    saveBtn.addEventListener('click', function() {
      if (window.saveActiveModelCalibration) {
        window.saveActiveModelCalibration();
        saveBtn.textContent = 'SAVED TO GAME';
        setTimeout(function() {
          saveBtn.textContent = 'SET: PERMA-SAVE CALIBRATION';
        }, 1800);
      }
    });

    saveRow.appendChild(saveBtn);

    // Row 5: Working Color Picker & Swatches
    var colorRow = document.createElement('div');
    colorRow.style.cssText = 'display:flex;gap:5px;align-items:center;padding-top:4px;border-top:1px solid var(--bdr,rgba(0,0,0,0.06))';

    var colorInput = document.createElement('input');
    colorInput.id = 'mc-hud-color-picker';
    colorInput.type = 'color';
    colorInput.value = '#d6dbe1';
    colorInput.style.cssText = 'width:22px;height:22px;border-radius:6px;border:1px solid var(--bdr,rgba(0,0,0,0.15));background:transparent;cursor:pointer;padding:0';
    colorInput.addEventListener('input', function(e) {
      window.setModelCanvasColor(e.target.value);
    });

    colorRow.appendChild(colorInput);

    var swatches = [
      { hex: '#d6dbe1', title: 'Light Grey' },
      { hex: '#f8fafc', title: 'White Marble' },
      { hex: '#475569', title: 'Dark Slate' },
      { hex: '#d4a373', title: 'Warm Sand' },
      { hex: '#90e0ef', title: 'Sky Blue' },
      { hex: '#f28482', title: 'Pastel Rose' }
    ];

    swatches.forEach(function(sw) {
      var swBtn = document.createElement('button');
      swBtn.title = sw.title;
      swBtn.style.cssText = 'flex:1;height:20px;border-radius:6px;border:1px solid rgba(0,0,0,0.12);background:' + sw.hex + ';cursor:pointer';
      swBtn.addEventListener('click', function() {
        window.setModelCanvasColor(sw.hex);
      });
      colorRow.appendChild(swBtn);
    });

    panel.appendChild(header);
    panel.appendChild(actRow);
    panel.appendChild(ctrlRow);
    panel.appendChild(posRow);
    panel.appendChild(rotRow);
    panel.appendChild(saveRow);
    panel.appendChild(colorRow);

    document.body.appendChild(panel);
    _hudEl = panel;
    return panel;
  }

  var _dockTab = null;

  function createModelCanvasDockTab() {
    if (_dockTab) return _dockTab;
    var tab = document.createElement('button');
    tab.id = 'mc-dock-tab';
    tab.className = 'card btn';
    tab.style.cssText = 'position:fixed;top:44px;right:75px;z-index:240;display:none;align-items:center;gap:6px;padding:3px 10px;border-radius:12px;font-size:9.5px;font-weight:700;background:var(--pan,#ffffff);border:1px solid var(--bdr,rgba(0,0,0,0.12));color:var(--ink,#282c35);cursor:pointer;box-shadow:var(--sh-pop,0 4px 16px rgba(0,0,0,0.1));font-family:var(--font-main);letter-spacing:0.03em';
    
    var dot = document.createElement('span');
    dot.style.cssText = 'width:6px;height:6px;border-radius:50%;background:#1d9fd6;flex-shrink:0';
    
    var titleSpan = document.createElement('span');
    titleSpan.id = 'mc-dock-tab-title';
    titleSpan.textContent = '3D Model';
    titleSpan.style.cssText = 'max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap';

    var arrow = document.createElement('span');
    arrow.id = 'mc-dock-tab-arrow';
    arrow.textContent = '▾';
    arrow.style.cssText = 'font-size:8.5px;color:var(--mut,#788090);margin-left:2px';

    tab.appendChild(dot);
    tab.appendChild(titleSpan);
    tab.appendChild(arrow);

    tab.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleModelCanvasHUD();
    });

    document.body.appendChild(tab);
    _dockTab = tab;
    return tab;
  }

  window._updateModelCanvasHUD = function(forceShow) {
    var hud = createModelCanvasHUD();
    var tab = createModelCanvasDockTab();
    var isModel = (typeof surfType !== 'undefined' && surfType === 'model' && !!window._modelCanvasGeo);

    if (!isModel) {
      hud.style.display = 'none';
      tab.style.display = 'none';
      return;
    }

    var modelName = window._modelCanvasName || '3D Model Canvas';
    var title = document.getElementById('mc-hud-title');
    if (title) title.textContent = modelName;
    var tabTitle = document.getElementById('mc-dock-tab-title');
    if (tabTitle) tabTitle.textContent = modelName;

    if (forceShow) {
      window._hudUserHidden = false;
      hud.style.display = 'flex';
      tab.style.display = 'none';
    } else {
      if (window._hudUserHidden) {
        hud.style.display = 'none';
        tab.style.display = 'flex';
      } else if (hud.style.display !== 'none') {
        tab.style.display = 'none';
      } else {
        tab.style.display = 'flex';
      }
    }

    var lockBtn = document.getElementById('mc-hud-lock-btn');
    if (lockBtn) {
      var l = !!window._modelCanvasLocked;
      lockBtn.textContent = l ? 'LOCKED' : 'LOCK';
      lockBtn.style.background = l ? '#ef4444' : 'var(--pan-subtle,#f4f6f9)';
      lockBtn.style.color = l ? '#ffffff' : 'var(--ink,#282c35)';
    }

    var scaleVal = document.getElementById('mc-hud-scale-val');
    if (scaleVal && typeof surfScale !== 'undefined') {
      scaleVal.textContent = (surfScale >= 10 ? surfScale.toFixed(1) : surfScale.toFixed(2)) + 'x';
    }

    var elevVal = document.getElementById('mc-hud-elev-val');
    if (elevVal && typeof surfPos !== 'undefined') {
      elevVal.textContent = surfPos.z.toFixed(1);
    }

    var posXVal = document.getElementById('mc-hud-posx-val');
    if (posXVal && typeof surfPos !== 'undefined') {
      posXVal.textContent = surfPos.x.toFixed(1);
    }

    var posYVal = document.getElementById('mc-hud-posy-val');
    if (posYVal && typeof surfPos !== 'undefined') {
      posYVal.textContent = surfPos.y.toFixed(1);
    }
  };

  window.toggleModelCanvasHUD = function() {
    var isModel = (typeof surfType !== 'undefined' && surfType === 'model' && !!window._modelCanvasGeo);
    if (!isModel) return;
    var hud = createModelCanvasHUD();
    var tab = createModelCanvasDockTab();
    if (hud.style.display === 'flex') {
      hud.style.display = 'none';
      tab.style.display = 'flex';
      window._hudUserHidden = true;
    } else {
      hud.style.display = 'flex';
      tab.style.display = 'none';
      window._hudUserHidden = false;
    }
  };

  // Shared Draco & GLTF Loaders
  var _sharedDracoLoader = null;
  var _sharedGltfLoader = null;

  function getOrCreateGLTFLoader() {
    if (!window.THREE || !window.THREE.GLTFLoader) return null;
    if (!_sharedGltfLoader) {
      _sharedGltfLoader = new window.THREE.GLTFLoader();
      if (window.THREE.DRACOLoader) {
        if (!_sharedDracoLoader) {
          _sharedDracoLoader = new window.THREE.DRACOLoader();
          var decoderPath = 'js/lib/draco/gltf/';
          if (typeof window !== 'undefined' && window.location && window.location.pathname) {
            var p = window.location.pathname;
            var dir = p.substring(0, p.lastIndexOf('/') + 1);
            if (dir && dir !== '/') decoderPath = dir + 'js/lib/draco/gltf/';
          }
          _sharedDracoLoader.setDecoderPath(decoderPath);
          _sharedDracoLoader.setDecoderConfig({ type: 'wasm' });
          try { _sharedDracoLoader.preload(); } catch (e) {}
        }
        _sharedGltfLoader.setDRACOLoader(_sharedDracoLoader);
      }
    }
    return _sharedGltfLoader;
  }

  // Load and convert file directly to drawing canvas
  window.load3DModelToCanvas = function(file) {
    if (!file) return;
    window._modelCanvasUrl = file.name;
    window._modelCanvasFileId = file.name.replace(/\.(glb|gltf|obj)$/i, '');
    var url = URL.createObjectURL(file);
    var ext = file.name.split('.').pop().toLowerCase();

    if (ext === 'obj' && (window.THREE && window.THREE.OBJLoader)) {
      var objLoader = new window.THREE.OBJLoader();
      if (window.toast) toast('Extracting mesh geometry...');
      objLoader.load(url, function(obj) {
        var geo = extractMeshGeometry(obj);
        if (geo) {
          loadCalibrationsCache(function() {
            var cal = getCalibrationForModel(file.name);
            var prepGeo = prepareModelGeometry(geo);
            window._activateModelCanvas(prepGeo, file.name, cal);
            if (cal && cal.camera && typeof cam !== 'undefined') {
              if (cal.camera.theta !== undefined) cam.theta = cal.camera.theta;
              if (cal.camera.phi !== undefined) cam.phi = cal.camera.phi;
              if (cal.camera.radius !== undefined) cam.radius = cal.camera.radius;
              if (cal.camera.tx !== undefined) cam.target.set(cal.camera.tx || 0, cal.camera.ty || 0, cal.camera.tz || 0);
              if (typeof updCam === 'function') updCam();
            }
          });
        } else {
          if (window.toast) toast('Error: No mesh found in OBJ');
        }
        URL.revokeObjectURL(url);
      }, undefined, function(err) {
        console.error('[ModelCanvas] Failed to parse OBJ:', err);
        if (window.toast) toast('Failed to load OBJ file');
        URL.revokeObjectURL(url);
      });
    } else if ((ext === 'glb' || ext === 'gltf') && (window.THREE && window.THREE.GLTFLoader)) {
      var gltfLoader = getOrCreateGLTFLoader() || new window.THREE.GLTFLoader();
      if (window.toast) toast('Extracting mesh geometry...');
      gltfLoader.load(url, function(gltf) {
        var rawScene = gltf.scene || gltf.scenes[0];
        var geo = extractMeshGeometry(rawScene);
        if (geo) {
          loadCalibrationsCache(function() {
            var cal = getCalibrationForModel(file.name);
            var prepGeo = prepareModelGeometry(geo);
            window._activateModelCanvas(prepGeo, file.name, cal);
            if (cal && cal.camera && typeof cam !== 'undefined') {
              if (cal.camera.theta !== undefined) cam.theta = cal.camera.theta;
              if (cal.camera.phi !== undefined) cam.phi = cal.camera.phi;
              if (cal.camera.radius !== undefined) cam.radius = cal.camera.radius;
              if (cal.camera.tx !== undefined) cam.target.set(cal.camera.tx || 0, cal.camera.ty || 0, cal.camera.tz || 0);
              if (typeof updCam === 'function') updCam();
            }
          });
        } else {
          if (window.toast) toast('Error: No mesh found in GLTF/GLB');
        }
        URL.revokeObjectURL(url);
      }, undefined, function(err) {
        console.error('[ModelCanvas] Failed to parse GLTF/GLB:', err);
        if (window.toast) toast('Failed to load 3D model');
        URL.revokeObjectURL(url);
      });
    } else {
      if (window.toast) toast('Supported formats: .glb, .gltf, .obj');
    }
  };

  // Load 3D model directly from URL / file path onto drawing canvas
  window.load3DModelUrlToCanvas = function(url, name, onComplete, onError) {
    if (!url) return;
    window._modelCanvasUrl = url;
    window._modelCanvasFileId = (url.split('?')[0].split('/').pop().replace(/\.(glb|gltf|obj)$/i, ''));
    var ext = url.split('?')[0].split('.').pop().toLowerCase();
    var modelName = name || url.split('/').pop();

    if (ext === 'obj' && (window.THREE && window.THREE.OBJLoader)) {
      var objLoader = new window.THREE.OBJLoader();
      if (window.toast) toast('Loading 3D model canvas...');
      objLoader.load(url, function(obj) {
        var geo = extractMeshGeometry(obj);
        if (geo) {
          loadCalibrationsCache(function() {
            var cal = getCalibrationForModel(url || modelName);
            var prepGeo = prepareModelGeometry(geo);
            window._activateModelCanvas(prepGeo, modelName, cal);
            if (cal && cal.camera && typeof cam !== 'undefined') {
              if (cal.camera.theta !== undefined) cam.theta = cal.camera.theta;
              if (cal.camera.phi !== undefined) cam.phi = cal.camera.phi;
              if (cal.camera.radius !== undefined) cam.radius = cal.camera.radius;
              if (cal.camera.tx !== undefined) cam.target.set(cal.camera.tx || 0, cal.camera.ty || 0, cal.camera.tz || 0);
              if (typeof updCam === 'function') updCam();
            }
            if (typeof onComplete === 'function') onComplete(prepGeo);
          });
        } else {
          if (window.toast) toast('Error: No mesh found in OBJ');
          if (typeof onError === 'function') onError(new Error('No mesh found in OBJ'));
        }
      }, undefined, function(err) {
        console.error('[ModelCanvas] Failed to load OBJ from URL:', err);
        if (window.toast) toast('Failed to load 3D model');
        if (typeof onError === 'function') onError(err);
      });
    } else if ((ext === 'glb' || ext === 'gltf') && (window.THREE && window.THREE.GLTFLoader)) {
      var gltfLoader = getOrCreateGLTFLoader() || new window.THREE.GLTFLoader();
      if (window.toast) toast('Loading 3D model canvas...');
      gltfLoader.load(url, function(gltf) {
        var rawScene = gltf.scene || gltf.scenes[0];
        var geo = extractMeshGeometry(rawScene);
        if (geo) {
          loadCalibrationsCache(function() {
            var cal = getCalibrationForModel(url || modelName);
            var prepGeo = prepareModelGeometry(geo);
            window._activateModelCanvas(prepGeo, modelName, cal);
            if (cal && cal.camera && typeof cam !== 'undefined') {
              if (cal.camera.theta !== undefined) cam.theta = cal.camera.theta;
              if (cal.camera.phi !== undefined) cam.phi = cal.camera.phi;
              if (cal.camera.radius !== undefined) cam.radius = cal.camera.radius;
              if (cal.camera.tx !== undefined) cam.target.set(cal.camera.tx || 0, cal.camera.ty || 0, cal.camera.tz || 0);
              if (typeof updCam === 'function') updCam();
            }
            if (typeof onComplete === 'function') onComplete(prepGeo);
          });
        } else {
          if (window.toast) toast('Error: No mesh found in GLTF/GLB');
          if (typeof onError === 'function') onError(new Error('No mesh found in GLTF/GLB'));
        }
      }, undefined, function(err) {
        console.error('[ModelCanvas] Failed to load GLTF/GLB from URL:', err);
        if (window.toast) toast('Failed to load 3D model');
        if (typeof onError === 'function') onError(err);
      });
    } else {
      if (window.toast) toast('Supported formats: .glb, .gltf, .obj');
      if (typeof onError === 'function') onError(new Error('Unsupported format'));
    }
  };

  // Set up Drag & Drop onto viewport
  function setupDragAndDrop() {
    window.addEventListener('dragover', function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
    }, false);

    window.addEventListener('drop', function(e) {
      if (!e.dataTransfer || !e.dataTransfer.files || !e.dataTransfer.files.length) return;
      var file = e.dataTransfer.files[0];
      var ext = file.name.split('.').pop().toLowerCase();
      if (ext === 'glb' || ext === 'gltf' || ext === 'obj') {
        e.preventDefault();
        e.stopPropagation();
        window.load3DModelToCanvas(file);
      }
    }, false);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupDragAndDrop);
  } else {
    setupDragAndDrop();
  }

})();
