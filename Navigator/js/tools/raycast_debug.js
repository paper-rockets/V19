/**
 * Raycast Debug Overlay & 3D Visualizer + Session Telemetry Recorder
 * Real-time diagnostic overlay for surface raycasting, normal evaluation, depth continuity,
 * and comprehensive session recording / JSON & CSV export.
 */
(function(global) {
  "use strict";

  var isDebugActive = false;
  var isRecording = false;
  var recordStartTime = 0;
  var recordedEvents = [];
  var debugGroup = null;
  var hudElement = null;
  var hitMarker = null;
  var normalArrow = null;
  var cameraRayLine = null;
  var tangentPlaneDisc = null;
  var projectionLine = null;
  var hitTrailPoints = [];
  var MAX_TRAIL_PTS = 48;
  var trailGeo = null;
  var trailMesh = null;

  function init3DVisualizers() {
    if (debugGroup && debugGroup.parent) return;

    if (!debugGroup) {
      debugGroup = new THREE.Group();
      debugGroup.name = "raycastDebugGroup";
      debugGroup.visible = isDebugActive;

      // Hit Point Sphere Marker (Cyan)
      var markerGeo = new THREE.SphereGeometry(0.018, 16, 16);
      var markerMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        depthTest: false,
        transparent: true,
        opacity: 0.95
      });
      hitMarker = new THREE.Mesh(markerGeo, markerMat);
      hitMarker.renderOrder = 9999;
      debugGroup.add(hitMarker);

      // Surface Normal Arrow (Yellow)
      normalArrow = new THREE.ArrowHelper(
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(0, 0, 0),
        0.2,
        0xffff00,
        0.05,
        0.03
      );
      normalArrow.line.material.depthTest = false;
      normalArrow.line.renderOrder = 9999;
      normalArrow.cone.material.depthTest = false;
      normalArrow.cone.renderOrder = 9999;
      debugGroup.add(normalArrow);

      // Camera Ray Line (Red/Orange)
      var rayGeo = new THREE.BufferGeometry();
      rayGeo.setAttribute("position", new THREE.Float32BufferAttribute([0, 0, 0, 0, 0, 0], 3));
      var rayMat = new THREE.LineBasicMaterial({
        color: 0xff3b30,
        depthTest: false,
        transparent: true,
        opacity: 0.65
      });
      cameraRayLine = new THREE.Line(rayGeo, rayMat);
      cameraRayLine.renderOrder = 9998;
      debugGroup.add(cameraRayLine);

      // Local Tangent Plane Disc (Translucent Blue)
      var discGeo = new THREE.CircleGeometry(0.09, 32);
      var discMat = new THREE.MeshBasicMaterial({
        color: 0x0088ff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.35,
        depthTest: false
      });
      tangentPlaneDisc = new THREE.Mesh(discGeo, discMat);
      tangentPlaneDisc.renderOrder = 9997;
      debugGroup.add(tangentPlaneDisc);

      // Gap Projection Indicator Line (Magenta)
      var projGeo = new THREE.BufferGeometry();
      projGeo.setAttribute("position", new THREE.Float32BufferAttribute([0, 0, 0, 0, 0, 0], 3));
      var projMat = new THREE.LineBasicMaterial({
        color: 0xff00ff,
        depthTest: false,
        transparent: true,
        opacity: 0.85
      });
      projectionLine = new THREE.Line(projGeo, projMat);
      projectionLine.renderOrder = 9999;
      debugGroup.add(projectionLine);

      // Historical Hit Trail (Green dots)
      trailGeo = new THREE.BufferGeometry();
      var trailBuf = new Float32Array(MAX_TRAIL_PTS * 3);
      trailGeo.setAttribute("position", new THREE.Float32BufferAttribute(trailBuf, 3));
      var trailMat = new THREE.PointsMaterial({
        color: 0x30d158,
        size: 4,
        sizeAttenuation: false,
        depthTest: false
      });
      trailMesh = new THREE.Points(trailGeo, trailMat);
      trailMesh.renderOrder = 9996;
      debugGroup.add(trailMesh);
    }

    if (typeof scene !== "undefined" && scene && !debugGroup.parent) {
      scene.add(debugGroup);
    }
  }

  function createHudElement() {
    if (hudElement) return hudElement;
    var existing = document.getElementById("raycast-debug-hud");
    if (existing) {
      hudElement = existing;
      return hudElement;
    }

    hudElement = document.createElement("div");
    hudElement.id = "raycast-debug-hud";
    hudElement.style.cssText = [
      "position: fixed;",
      "top: 60px;",
      "right: 16px;",
      "width: 320px;",
      "background: #141821;",
      "background: rgba(20, 24, 33, 0.96);",
      "backdrop-filter: blur(12px);",
      "-webkit-backdrop-filter: blur(12px);",
      "border: 1px solid #38bdf8;",
      "border-radius: 12px;",
      "padding: 12px 14px;",
      "font-family: 'DM Mono', monospace, monospace;",
      "font-size: 11px;",
      "line-height: 1.5;",
      "color: #edf0f5;",
      "z-index: 999999;",
      "box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);",
      "display: none;",
      "pointer-events: auto;",
      "user-select: none;"
    ].join("");

    hudElement.innerHTML = [
      '<div id="rc-dbg-header" style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.15);padding-bottom:6px;margin-bottom:8px;cursor:move;">',
      '  <div style="display:flex;align-items:center;gap:6px;">',
      '    <span style="font-weight:700;color:#00f0ff;letter-spacing:0.05em;">RAYCAST DIAGNOSTICS</span>',
      '    <span id="rc-live-tag" style="font-size:9px;background:#232a38;color:#38bdf8;padding:1px 4px;border-radius:3px;border:1px solid rgba(56,189,248,0.3)">LIVE</span>',
      '  </div>',
      '  <div style="display:flex;align-items:center;gap:4px;">',
      '    <button id="rc-dbg-freeze-btn" title="Freeze / unfreeze live values" style="background:#2c3340;color:#fff;border:1px solid #555;border-radius:4px;padding:2px 6px;font-size:10px;cursor:pointer;">Freeze</button>',
      '    <button id="rc-dbg-close-btn" title="Hide overlay" style="background:#2c3340;color:#fff;border:1px solid #555;border-radius:4px;padding:2px 6px;font-size:10px;cursor:pointer;">Hide</button>',
      '  </div>',
      '</div>',
      '<div id="rc-dbg-content">',
      '  <div style="display:flex;justify-content:space-between;align-items:center;">',
      '    <div>Status: <span id="rc-val-status" style="color:#ffd60a;font-weight:700;">IDLE</span></div>',
      '    <div>Surface: <span id="rc-val-surf" style="color:#fff;font-weight:600;">none</span></div>',
      '  </div>',
      '  <div style="margin-top:4px;border-top:1px dashed rgba(255,255,255,0.1);padding-top:4px;">',
      '    Hit Coordinates:',
      '    <div id="rc-val-coords" style="color:#00f0ff;font-weight:600;padding-left:6px;">X: 0.000  Y: 0.000  Z: 0.000</div>',
      '  </div>',
      '  <div style="margin-top:2px;">',
      '    Surface Normal:',
      '    <div id="rc-val-normal" style="color:#ffff00;font-weight:600;padding-left:6px;">Nx: 0.000  Ny: 0.000  Nz: 0.000</div>',
      '  </div>',
      '  <div style="margin-top:4px;border-top:1px dashed rgba(255,255,255,0.1);padding-top:4px;">',
      '    Camera Distance: <span id="rc-val-dist" style="color:#fff;">0.000</span> units',
      '  </div>',
      '  <div style="display:flex;justify-content:space-between;">',
      '    <div>Face Index: <span id="rc-val-face" style="color:#fff;">N/A</span></div>',
      '    <div>Front Hits: <span id="rc-val-hits">0</span></div>',
      '  </div>',
      '  <div>Depth Delta: <span id="rc-val-depth" style="color:#30d158;">0.000 (OK)</span></div>',
      '  <div style="margin-top:8px;border-top:1px solid rgba(255,255,255,0.15);padding-top:6px;">',
      '    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">',
      '      <span style="font-size:10px;font-weight:700;color:#38bdf8;">SESSION RECORDER</span>',
      '      <span id="rc-rec-status" style="font-size:9.5px;color:#94a3b8;">0 events</span>',
      '    </div>',
      '    <div style="display:flex;gap:4px;">',
      '      <button id="rc-rec-btn" style="flex:1;background:#ef4444;color:#fff;font-weight:700;border:none;border-radius:5px;padding:4px 0;font-size:10px;cursor:pointer;">Record</button>',
      '      <button id="rc-export-json-btn" style="flex:1;background:#232a38;color:#fff;border:1px solid #555;border-radius:5px;padding:4px 0;font-size:10px;cursor:pointer;" disabled>Export JSON</button>',
      '      <button id="rc-export-csv-btn" style="flex:1;background:#232a38;color:#fff;border:1px solid #555;border-radius:5px;padding:4px 0;font-size:10px;cursor:pointer;" disabled>Export CSV</button>',
      '      <button id="rc-clear-rec-btn" style="background:#232a38;color:#fff;border:1px solid #555;border-radius:5px;padding:4px 8px;font-size:10px;cursor:pointer;">Clear</button>',
      '    </div>',
      '  </div>',
      '  <div style="margin-top:6px;font-size:9px;color:#94a3b8;border-top:1px solid rgba(255,255,255,0.12);padding-top:4px;">',
      '    Cyan: Hit | Yellow: Normal | Red: Ray | Disc: Plane',
      '  </div>',
      '</div>'
    ].join("");

    if (document.body) {
      document.body.appendChild(hudElement);
    } else {
      window.addEventListener("DOMContentLoaded", function() {
        document.body.appendChild(hudElement);
      });
    }

    // Draggable HUD header logic
    var header = document.getElementById("rc-dbg-header");
    if (header) {
      var isDragging = false, startX = 0, startY = 0, initL = 0, initT = 0;
      header.addEventListener("pointerdown", function(e) {
        if (e.target.tagName === "BUTTON") return;
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        var r = hudElement.getBoundingClientRect();
        initL = r.left;
        initT = r.top;
        hudElement.style.right = "auto";
        hudElement.style.left = initL + "px";
        hudElement.style.top = initT + "px";
        try { header.setPointerCapture(e.pointerId); } catch(ex) {}
      });
      header.addEventListener("pointermove", function(e) {
        if (!isDragging) return;
        var dx = e.clientX - startX;
        var dy = e.clientY - startY;
        hudElement.style.left = Math.max(4, Math.min(window.innerWidth - 330, initL + dx)) + "px";
        hudElement.style.top = Math.max(4, Math.min(window.innerHeight - 250, initT + dy)) + "px";
      });
      header.addEventListener("pointerup", function(e) {
        isDragging = false;
        try { header.releasePointerCapture(e.pointerId); } catch(ex) {}
      });
      header.addEventListener("pointercancel", function(e) {
        isDragging = false;
      });
    }

    // Event listeners
    var closeBtn = document.getElementById("rc-dbg-close-btn");
    if (closeBtn) {
      closeBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        toggleRaycastDebug(false);
      });
    }

    var freezeBtn = document.getElementById("rc-dbg-freeze-btn");
    if (freezeBtn) {
      freezeBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        window._raycastDebugFrozen = !window._raycastDebugFrozen;
        freezeBtn.textContent = window._raycastDebugFrozen ? "Unfreeze" : "Freeze";
        freezeBtn.style.background = window._raycastDebugFrozen ? "#007aff" : "#2c3340";
      });
    }

    var recBtn = document.getElementById("rc-rec-btn");
    if (recBtn) {
      recBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        toggleRecording();
      });
    }

    var expJsonBtn = document.getElementById("rc-export-json-btn");
    if (expJsonBtn) {
      expJsonBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        exportRecordedData("json");
      });
    }

    var expCsvBtn = document.getElementById("rc-export-csv-btn");
    if (expCsvBtn) {
      expCsvBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        exportRecordedData("csv");
      });
    }

    var clearBtn = document.getElementById("rc-clear-rec-btn");
    if (clearBtn) {
      clearBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        clearRecordedData();
      });
    }

    return hudElement;
  }

  function toggleRecording(forceState) {
    var next = (typeof forceState === "boolean") ? forceState : !isRecording;
    isRecording = next;
    window._raycastDebugRecording = isRecording;

    var recBtn = document.getElementById("rc-rec-btn");
    var tag = document.getElementById("rc-live-tag");
    var expJsonBtn = document.getElementById("rc-export-json-btn");
    var expCsvBtn = document.getElementById("rc-export-csv-btn");

    if (isRecording) {
      recordStartTime = performance.now();
      if (recBtn) {
        recBtn.textContent = "Stop Rec";
        recBtn.style.background = "#30d158";
      }
      if (tag) {
        tag.textContent = "REC";
        tag.style.background = "#ef4444";
        tag.style.color = "#ffffff";
      }
      if (typeof toast === "function") toast("Raycast Telemetry Recording Started");
    } else {
      if (recBtn) {
        recBtn.textContent = "Record";
        recBtn.style.background = "#ef4444";
      }
      if (tag) {
        tag.textContent = "LIVE";
        tag.style.background = "#232a38";
        tag.style.color = "#38bdf8";
      }
      if (expJsonBtn) expJsonBtn.disabled = recordedEvents.length === 0;
      if (expCsvBtn) expCsvBtn.disabled = recordedEvents.length === 0;
      if (typeof toast === "function") toast("Recording Stopped: " + recordedEvents.length + " events captured");
    }
  }

  function clearRecordedData() {
    recordedEvents = [];
    var recStatus = document.getElementById("rc-rec-status");
    if (recStatus) recStatus.textContent = "0 events";
    var expJsonBtn = document.getElementById("rc-export-json-btn");
    var expCsvBtn = document.getElementById("rc-export-csv-btn");
    if (expJsonBtn) expJsonBtn.disabled = true;
    if (expCsvBtn) expCsvBtn.disabled = true;
    if (typeof toast === "function") toast("Raycast recording buffer cleared");
  }

  function exportRecordedData(format) {
    if (recordedEvents.length === 0) {
      if (typeof toast === "function") toast("No recorded events to export");
      return;
    }

    var filename = "raycast_debug_log_" + new Date().toISOString().replace(/[:.]/g, "-");
    var blob = null;

    if (format === "json") {
      var jsonStr = JSON.stringify({
        recordedAt: new Date().toISOString(),
        totalEvents: recordedEvents.length,
        modelName: window._modelCanvasName || "none",
        events: recordedEvents
      }, null, 2);
      blob = new Blob([jsonStr], { type: "application/json" });
      filename += ".json";
    } else {
      // CSV Format
      var headers = ["time_ms", "state", "surfType", "isDrawing", "x", "y", "z", "nx", "ny", "nz", "dist", "faceIndex", "depthJump", "isProjected", "hitCount"];
      var rows = [headers.join(",")];
      for (var i = 0; i < recordedEvents.length; i++) {
        var ev = recordedEvents[i];
        rows.push([
          ev.timeMs.toFixed(1),
          ev.state,
          ev.surfType,
          ev.isDrawing ? 1 : 0,
          ev.hitPt ? ev.hitPt.x.toFixed(4) : "",
          ev.hitPt ? ev.hitPt.y.toFixed(4) : "",
          ev.hitPt ? ev.hitPt.z.toFixed(4) : "",
          ev.normal ? ev.normal.x.toFixed(4) : "",
          ev.normal ? ev.normal.y.toFixed(4) : "",
          ev.normal ? ev.normal.z.toFixed(4) : "",
          ev.distance != null ? ev.distance.toFixed(4) : "",
          ev.faceIndex != null ? ev.faceIndex : "",
          ev.depthJump != null ? ev.depthJump.toFixed(4) : "",
          ev.isProjected ? 1 : 0,
          ev.hitCount || 0
        ].join(","));
      }
      blob = new Blob([rows.join("\n")], { type: "text/csv" });
      filename += ".csv";
    }

    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (typeof toast === "function") toast("Exported Raycast Log: " + filename);
  }

  function setRaycastDebug(active) {
    isDebugActive = !!active;
    window._raycastDebug = isDebugActive;

    createHudElement();
    init3DVisualizers();

    if (isDebugActive) {
      if (debugGroup) debugGroup.visible = true;
      if (hudElement) {
        hudElement.style.display = "block";
        hudElement.style.visibility = "visible";
        hudElement.style.opacity = "1";
      }
    } else {
      if (debugGroup) debugGroup.visible = false;
      if (hudElement) {
        hudElement.style.display = "none";
        hudElement.style.visibility = "hidden";
        hudElement.style.opacity = "0";
      }
      hitTrailPoints = [];
      updateTrailMesh();
    }

    // Sync menu & topbar buttons
    ["braycast-debug", "braycast-dbg-tb", "mc-hud-debug-btn"].forEach(function(id) {
      var btn = document.getElementById(id);
      if (btn) btn.classList.toggle("on", isDebugActive);
    });

    if (typeof markDirty === "function") markDirty();
  }

  function toggleRaycastDebug(forceState) {
    var newState = (typeof forceState === "boolean") ? forceState : !isDebugActive;
    setRaycastDebug(newState);
    if (typeof toast === "function") {
      toast(newState ? "Raycast Debug: ON" : "Raycast Debug: OFF");
    }
  }

  function updateTrailMesh() {
    if (!trailGeo) return;
    var posAttr = trailGeo.attributes.position;
    var arr = posAttr.array;
    for (var i = 0; i < MAX_TRAIL_PTS; i++) {
      if (i < hitTrailPoints.length) {
        var p = hitTrailPoints[i];
        arr[i * 3] = p.x;
        arr[i * 3 + 1] = p.y;
        arr[i * 3 + 2] = p.z;
      } else {
        arr[i * 3] = 0;
        arr[i * 3 + 1] = 0;
        arr[i * 3 + 2] = 0;
      }
    }
    posAttr.needsUpdate = true;
    trailGeo.setDrawRange(0, hitTrailPoints.length);
  }

  // ── Main Hook called by s2w() ────────────────────────────────
  function updateRaycastDebug(data) {
    if (!isDebugActive || window._raycastDebugFrozen) return;
    if (!debugGroup || !debugGroup.parent) init3DVisualizers();
    if (!hudElement) createHudElement();

    var statusEl = document.getElementById("rc-val-status");
    var surfEl = document.getElementById("rc-val-surf");
    var coordsEl = document.getElementById("rc-val-coords");
    var normEl = document.getElementById("rc-val-normal");
    var distEl = document.getElementById("rc-val-dist");
    var faceEl = document.getElementById("rc-val-face");
    var depthEl = document.getElementById("rc-val-depth");
    var hitsEl = document.getElementById("rc-val-hits");
    var recStatus = document.getElementById("rc-rec-status");

    if (surfEl) surfEl.textContent = data.surfType || (typeof surfType !== "undefined" ? surfType : "none");

    if (!data.hitPt) {
      // Missed Ray
      if (statusEl) {
        statusEl.textContent = "MISSED (NO HIT)";
        statusEl.style.color = "#ff3b30";
      }
      if (coordsEl) coordsEl.textContent = "N/A";
      if (normEl) normEl.textContent = "N/A";
      if (distEl) distEl.textContent = "N/A";
      if (faceEl) faceEl.textContent = "N/A";
      if (hitsEl) hitsEl.textContent = "0";

      if (hitMarker) hitMarker.visible = false;
      if (normalArrow) normalArrow.visible = false;
      if (tangentPlaneDisc) tangentPlaneDisc.visible = false;
      if (projectionLine) projectionLine.visible = false;

      if (data.ray && cameraRayLine) {
        var pCam = data.ray.origin;
        var pTarget = new THREE.Vector3().copy(pCam).addScaledVector(data.ray.direction, 10);
        var rPos = cameraRayLine.geometry.attributes.position.array;
        rPos[0] = pCam.x; rPos[1] = pCam.y; rPos[2] = pCam.z;
        rPos[3] = pTarget.x; rPos[4] = pTarget.y; rPos[5] = pTarget.z;
        cameraRayLine.geometry.attributes.position.needsUpdate = true;
        cameraRayLine.visible = true;
      }

      // Record Event if recording
      if (isRecording) {
        recordedEvents.push({
          timeMs: performance.now() - recordStartTime,
          state: "MISSED",
          surfType: data.surfType,
          isDrawing: typeof isDrawing !== "undefined" && isDrawing,
          hitPt: null,
          normal: null,
          distance: null,
          faceIndex: null,
          depthJump: null,
          isProjected: false,
          hitCount: 0
        });
        if (recStatus) recStatus.textContent = recordedEvents.length + " events";
      }

      if (typeof markDirty === "function") markDirty();
      return;
    }

    var pt = data.hitPt;
    var norm = pt.normal || new THREE.Vector3(0, 1, 0);

    // Update 3D Marker
    if (hitMarker) {
      hitMarker.position.copy(pt);
      hitMarker.visible = true;
    }

    // Update Normal Arrow
    if (normalArrow) {
      normalArrow.position.copy(pt);
      normalArrow.setDirection(norm.clone().normalize());
      normalArrow.visible = true;
    }

    // Update Tangent Plane Disc
    if (tangentPlaneDisc) {
      tangentPlaneDisc.position.copy(pt);
      tangentPlaneDisc.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), norm.clone().normalize());
      tangentPlaneDisc.visible = true;
    }

    // Update Camera Ray
    if (data.ray && cameraRayLine) {
      var camPos = data.ray.origin;
      var rayArr = cameraRayLine.geometry.attributes.position.array;
      rayArr[0] = camPos.x; rayArr[1] = camPos.y; rayArr[2] = camPos.z;
      rayArr[3] = pt.x; rayArr[4] = pt.y; rayArr[5] = pt.z;
      cameraRayLine.geometry.attributes.position.needsUpdate = true;
      cameraRayLine.visible = true;
    }

    // Update Gap Projection Line
    if (data.isProjected && data.prevPt && projectionLine) {
      var pArr = projectionLine.geometry.attributes.position.array;
      pArr[0] = data.prevPt.x; pArr[1] = data.prevPt.y; pArr[2] = data.prevPt.z;
      pArr[3] = pt.x; pArr[4] = pt.y; pArr[5] = pt.z;
      projectionLine.geometry.attributes.position.needsUpdate = true;
      projectionLine.visible = true;
    } else if (projectionLine) {
      projectionLine.visible = false;
    }

    // Update Trail History
    hitTrailPoints.push(pt.clone());
    if (hitTrailPoints.length > MAX_TRAIL_PTS) hitTrailPoints.shift();
    updateTrailMesh();

    // Update 2D Text HUD
    var stateStr = "HIT (SURFACE)";
    if (statusEl) {
      if (data.isProjected) {
        stateStr = "PROJECTED (GAP CLAMP)";
        statusEl.textContent = stateStr;
        statusEl.style.color = "#ff00ff";
      } else if (data.surfType === "model") {
        stateStr = "HIT (3D MODEL)";
        statusEl.textContent = stateStr;
        statusEl.style.color = "#30d158";
      } else {
        statusEl.textContent = stateStr;
        statusEl.style.color = "#00f0ff";
      }
    }

    if (coordsEl) {
      coordsEl.textContent = "X: " + pt.x.toFixed(3) + "  Y: " + pt.y.toFixed(3) + "  Z: " + pt.z.toFixed(3);
    }

    if (normEl) {
      normEl.textContent = "Nx: " + norm.x.toFixed(3) + "  Ny: " + norm.y.toFixed(3) + "  Nz: " + norm.z.toFixed(3);
    }

    var distVal = data.distance ? data.distance : (data.ray ? data.ray.origin.distanceTo(pt) : 0);
    if (distEl) {
      distEl.textContent = distVal.toFixed(3);
    }

    var fIndex = (data.faceIndex != null) ? data.faceIndex : (data.bestHit && data.bestHit.faceIndex != null ? data.bestHit.faceIndex : null);
    if (faceEl) {
      faceEl.textContent = (fIndex != null) ? "#" + fIndex : "N/A";
    }

    if (depthEl) {
      if (data.depthJump != null) {
        var isHigh = data.depthJump > 0.4;
        depthEl.textContent = data.depthJump.toFixed(3) + (isHigh ? " (CLAMPED)" : " (OK)");
        depthEl.style.color = isHigh ? "#ff9500" : "#30d158";
      } else {
        depthEl.textContent = "0.000 (OK)";
        depthEl.style.color = "#30d158";
      }
    }

    var hCount = data.hitCount != null ? data.hitCount : (data.bestHit ? 1 : 0);
    if (hitsEl) {
      hitsEl.textContent = hCount;
    }

    // Record Event if recording
    if (isRecording) {
      recordedEvents.push({
        timeMs: performance.now() - recordStartTime,
        state: stateStr,
        surfType: data.surfType,
        isDrawing: typeof isDrawing !== "undefined" && isDrawing,
        hitPt: { x: Number(pt.x.toFixed(4)), y: Number(pt.y.toFixed(4)), z: Number(pt.z.toFixed(4)) },
        normal: { x: Number(norm.x.toFixed(4)), y: Number(norm.y.toFixed(4)), z: Number(norm.z.toFixed(4)) },
        distance: Number(distVal.toFixed(4)),
        faceIndex: fIndex,
        depthJump: data.depthJump != null ? Number(data.depthJump.toFixed(4)) : 0,
        isProjected: !!data.isProjected,
        hitCount: hCount
      });
      if (recStatus) recStatus.textContent = recordedEvents.length + " events";
      var expJsonBtn = document.getElementById("rc-export-json-btn");
      var expCsvBtn = document.getElementById("rc-export-csv-btn");
      if (expJsonBtn) expJsonBtn.disabled = false;
      if (expCsvBtn) expCsvBtn.disabled = false;
    }

    if (typeof markDirty === "function") markDirty();
  }

  // Keyboard shortcut F8 or Alt+R
  window.addEventListener("keydown", function(e) {
    if (e.key === "F8" || (e.altKey && (e.key === "r" || e.key === "R" || e.key === "d" || e.key === "D"))) {
      e.preventDefault();
      toggleRaycastDebug();
    }
  });

  // Auto-init DOM on load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createHudElement);
  } else {
    createHudElement();
  }

  // Export to global scope
  global.toggleRaycastDebug = toggleRaycastDebug;
  global.setRaycastDebug = setRaycastDebug;
  global._updateRaycastDebug = updateRaycastDebug;
  global.isRaycastDebugEnabled = function() { return isDebugActive; };
  global.toggleRaycastRecording = toggleRecording;
  global.exportRaycastData = exportRecordedData;
  global.clearRaycastData = clearRecordedData;
  global.getRecordedRaycastData = function() { return recordedEvents; };

})(typeof window !== "undefined" ? window : (typeof globalThis !== "undefined" ? globalThis : this));
