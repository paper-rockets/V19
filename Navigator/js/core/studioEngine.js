// Studio Engine — Central 3D Model Painting & Rendering Coordinator
// Integrates Conformal 3D Bead Painting, Direct UV Texture Painting,
// Post-Processing Shaders, Multi-Layer Management, Symmetry, and Model I/O.

(function(window) {
  'use strict';

  function StudioEngine(container) {
    this.container = container;

    // 1. WebGL Renderer with Stencil Buffer & Depth Preservation
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      stencil: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    if (THREE.ACESFilmicToneMapping) this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
    if (THREE.SRGBColorSpace) this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.autoClear = true;
    this.renderer.autoClearStencil = true;
    container.appendChild(this.renderer.domElement);

    // 2. Scene Hierarchy
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x1a1d24);

    // 3. Camera
    this.camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.05,
      100
    );
    this.cameraTarget = new THREE.Vector3(0, 0, 0);
    this.cameraSpherical = new THREE.Spherical(3.8, Math.PI / 2.3, Math.PI / 4);
    this.targetSpherical = new THREE.Spherical(3.8, Math.PI / 2.3, Math.PI / 4);
    this.targetPosition = new THREE.Vector3(0, 0, 0);
    this.updateCameraPosition();

    // 4. Groups with explicit render orders
    this.helperRoot = new THREE.Group();
    this.helperRoot.renderOrder = 1;

    this.modelRoot = new THREE.Group();
    this.modelRoot.renderOrder = 2;

    this.strokeRoot = new THREE.Group();
    this.strokeRoot.renderOrder = 5;

    this.lightsRoot = new THREE.Group();

    this.scene.add(this.helperRoot);
    this.scene.add(this.modelRoot);
    this.scene.add(this.strokeRoot);
    this.scene.add(this.lightsRoot);

    // 5. Tooling & Subsystems
    this.raycaster = new THREE.Raycaster();
    this.beadGenerator = new window.ConformalBeadGenerator();
    this.materialCache = new window.MaterialCache();
    this.strokeSmoother = new window.StrokeSmoother();
    this.lastHitMesh = null;
    this.uvEngine = new window.UVPaintingEngine(2048);
    this.postEngine = new window.PostProcessingEngine(
      this.renderer,
      this.scene,
      this.camera,
      container.clientWidth,
      container.clientHeight
    );

    // 6. Grid Helper
    this.gridHelper = new THREE.GridHelper(10, 20, 0x3e485e, 0x242b38);
    this.gridHelper.position.y = -1.2;
    this.helperRoot.add(this.gridHelper);

    // 7. Lighting System
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    this.hemiLight = new THREE.HemisphereLight(0xffffff, 0x111625, 0.6);
    this.dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    this.dirLight1.position.set(5, 8, 5);
    this.dirLight2 = new THREE.DirectionalLight(0x7389ae, 0.6);
    this.dirLight2.position.set(-5, -2, -5);

    this.lightsRoot.add(this.ambientLight);
    this.lightsRoot.add(this.hemiLight);
    this.lightsRoot.add(this.dirLight1);
    this.lightsRoot.add(this.dirLight2);

    // 8. 3D Brush Cursor Decal Ring
    var cursorGeom = new THREE.RingGeometry(0.85, 1.0, 32);
    var cursorMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
      depthTest: false
    });
    this.cursorDecal = new THREE.Mesh(cursorGeom, cursorMat);
    this.cursorDecal.renderOrder = 10;
    this.cursorDecal.visible = false;
    this.scene.add(this.cursorDecal);

    // Model & Mesh State
    this.targetMeshes = [];
    this.activeModelName = 'Cyber Helmet';
    this.modelMetadata = {
      name: 'Cyber Helmet',
      vertexCount: 0,
      triangleCount: 0,
      meshCount: 0,
      dimensions: new THREE.Vector3(1, 1, 1),
      hasUVs: true
    };

    // Active Stroke State
    this.isDrawing = false;
    this.activePoints = [];
    this.activeStrokeMeshes = [];
    this.activeLayerId = 'layer_base_1';
    this.activeLayerOpacity = 1.0;
    this.strokes = new Map();
    this.undoStack = [];
    this.redoStack = [];
    this.activeStrokeBatch = [];
    this.lastScreenCoords = null;
    this.lastCapturePoint = null;
    this.isOverAir = false;

    // Animation & Loop
    this.animationFrameId = null;
    this.lastTime = performance.now();
    this.fps = 60;
    this.frameCount = 0;
    this.fpsTimer = 0;
    this.isTurntable = false;

    // Load Default Model
    this.loadPresetModel('cyber_helmet');

    // Start Loop
    this.startLoop();
  }

  StudioEngine.prototype.updateCameraPosition = function() {
    this.cameraSpherical.radius += (this.targetSpherical.radius - this.cameraSpherical.radius) * 0.2;
    this.cameraSpherical.theta += (this.targetSpherical.theta - this.cameraSpherical.theta) * 0.2;
    this.cameraSpherical.phi += (this.targetSpherical.phi - this.cameraSpherical.phi) * 0.2;
    this.cameraSpherical.phi = Math.max(0.05, Math.min(Math.PI - 0.05, this.cameraSpherical.phi));

    this.cameraTarget.lerp(this.targetPosition, 0.2);

    this.camera.position.setFromSpherical(this.cameraSpherical).add(this.cameraTarget);
    this.camera.lookAt(this.cameraTarget);
  };

  StudioEngine.prototype.startLoop = function() {
    var self = this;
    function animate(time) {
      self.animationFrameId = requestAnimationFrame(animate);

      var dt = (time - self.lastTime) * 0.001;
      self.lastTime = time;

      self.frameCount++;
      self.fpsTimer += dt;
      if (self.fpsTimer >= 0.5) {
        self.fps = Math.round(self.frameCount / self.fpsTimer);
        self.frameCount = 0;
        self.fpsTimer = 0;
        if (self.onFpsUpdate) self.onFpsUpdate(self.fps);
      }

      if (self.isTurntable) {
        self.targetSpherical.theta += 0.008;
      }

      self.updateCameraPosition();
      self.postEngine.render(time * 0.001);
    }
    this.animationFrameId = requestAnimationFrame(animate);
  };

  StudioEngine.prototype.resize = function(width, height) {
    if (width <= 0 || height <= 0) return;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.postEngine.setSize(width, height);
  };

  StudioEngine.prototype.loadPresetModel = function(presetId) {
    if (!window.SampleModelFactory) return;
    var presets = window.SampleModelFactory.getPresets();
    var found = presets.find(function(p) { return p.id === presetId; }) || presets[0];
    var self = this;

    if (found.file) {
      this.loadGLTF(found.file, found.name).then(function() {
        if (found.scale) {
          self.modelRoot.scale.set(found.scale, found.scale, found.scale);
        }
        if (found.rot) {
          self.modelRoot.rotation.set(
            (found.rot.x * Math.PI) / 180,
            (found.rot.y * Math.PI) / 180,
            (found.rot.z * Math.PI) / 180
          );
        }
        if (found.pos) {
          self.modelRoot.position.set(found.pos.x || 0, found.pos.y || 0, found.pos.z || 0);
        }
      }).catch(function(err) {
        console.warn('GLB load fallback:', err);
        var meshObj = window.SampleModelFactory.createCyberHelmet();
        self.setModelObject(meshObj, 'Cyber Helmet');
      });
    } else if (found.createMesh) {
      this.clearModel();
      var meshObj = found.createMesh();
      this.setModelObject(meshObj, found.name);
    }
  };

  StudioEngine.prototype.clearModel = function() {
    while (this.modelRoot.children.length > 0) {
      var child = this.modelRoot.children[0];
      this.modelRoot.remove(child);
      child.traverse(function(c) {
        if (c.geometry && c.geometry.dispose) c.geometry.dispose();
      });
    }
    this.targetMeshes = [];
    this.lastHitMesh = null;
  };

  StudioEngine.prototype.setModelObject = function(obj, name) {
    this.clearModel();
    this.activeModelName = name || '3D Model';
    this.modelRoot.add(obj);

    this.targetMeshes = [];
    var vertexCount = 0;
    var triangleCount = 0;
    var meshCount = 0;
    var self = this;

    obj.traverse(function(child) {
      if (child.isMesh && child.geometry) {
        self.targetMeshes.push(child);
        meshCount++;
        var geom = child.geometry;
        vertexCount += geom.attributes.position ? geom.attributes.position.count : 0;
        triangleCount += geom.index ? (geom.index.count / 3) : (geom.attributes.position ? geom.attributes.position.count / 3 : 0);

        if (Array.isArray(child.material)) {
          child.material.forEach(function(m) { window.MaterialCache.configureModelMaterial(m); });
        } else if (child.material) {
          window.MaterialCache.configureModelMaterial(child.material);
        }
      }
    });

    var box = new THREE.Box3().setFromObject(obj);
    var size = new THREE.Vector3();
    box.getSize(size);
    var center = new THREE.Vector3();
    box.getCenter(center);

    obj.position.sub(center);
    obj.updateMatrixWorld(true);

    this.modelMetadata = {
      name: this.activeModelName,
      vertexCount: Math.round(vertexCount),
      triangleCount: Math.round(triangleCount),
      meshCount: meshCount,
      dimensions: size,
      hasUVs: true
    };

    if (this.onMetadataUpdate) {
      this.onMetadataUpdate(this.modelMetadata);
    }

    var maxDim = Math.max(size.x, size.y, size.z, 1.0);
    this.targetSpherical.radius = maxDim * 2.2;
    this.targetPosition.set(0, 0, 0);

    this.uvEngine.attachToModel(this.modelRoot);
  };

  StudioEngine.prototype.loadGLTF = function(bufferOrUrl, name) {
    var loader = new THREE.GLTFLoader();
    if (THREE.DRACOLoader) {
      var dracoLoader = new THREE.DRACOLoader();
      dracoLoader.setDecoderPath('js/lib/draco/gltf/');
      dracoLoader.setDecoderConfig({ type: 'wasm' });
      try { dracoLoader.preload(); } catch (e) {}
      loader.setDRACOLoader(dracoLoader);
    }
    var self = this;
    return new Promise(function(resolve, reject) {
      var onLoad = function(gltf) {
        self.setModelObject(gltf.scene || gltf.scenes[0], name);
        resolve();
      };
      if (typeof bufferOrUrl === 'string') {
        loader.load(bufferOrUrl, onLoad, undefined, reject);
      } else {
        loader.parse(bufferOrUrl, '', onLoad, reject);
      }
    });
  };

  StudioEngine.prototype.loadOBJ = function(textOrUrl, name) {
    var loader = new THREE.OBJLoader();
    var self = this;
    if (textOrUrl.startsWith('http') || textOrUrl.startsWith('blob:')) {
      return new Promise(function(resolve, reject) {
        loader.load(textOrUrl, function(obj) {
          self.setModelObject(obj, name);
          resolve();
        }, undefined, reject);
      });
    } else {
      var obj = loader.parse(textOrUrl);
      this.setModelObject(obj, name);
      return Promise.resolve();
    }
  };

  StudioEngine.prototype.raycastModel = function(screenX, screenY) {
    var coords = new THREE.Vector2(screenX, screenY);
    this.raycaster.setFromCamera(coords, this.camera);

    var hit = null;
    if (this.lastHitMesh && this.lastHitMesh.visible) {
      var directHit = this.raycaster.intersectObject(this.lastHitMesh, false);
      if (directHit.length > 0) {
        hit = directHit[0];
      }
    }

    if (!hit) {
      var intersects = this.raycaster.intersectObjects(this.targetMeshes, false);
      if (intersects.length > 0) {
        hit = intersects[0];
        this.lastHitMesh = hit.object;
      }
    }

    if (hit) {
      var normal = hit.face
        ? hit.face.normal.clone().transformDirection(hit.object.matrixWorld).normalize()
        : new THREE.Vector3(0, 1, 0);

      var camDir = new THREE.Vector3().subVectors(this.camera.position, hit.point).normalize();
      if (normal.dot(camDir) < 0) {
        normal.negate();
      }

      var uv = hit.uv;
      if (!uv && hit.point) {
        var u = 0.5 + Math.atan2(hit.point.z, hit.point.x) / (2 * Math.PI);
        var v = 0.5 - Math.asin(Math.max(-1, Math.min(1, hit.point.y / 2.0))) / Math.PI;
        uv = new THREE.Vector2(u, v);
      }

      return {
        hit: true,
        point: hit.point,
        normal: normal,
        uv: uv,
        mesh: hit.object
      };
    }

    return null;
  };

  StudioEngine.prototype.updateCursor = function(screenX, screenY, brushSize) {
    var result = this.raycastModel(screenX, screenY);
    if (result && result.point) {
      this.cursorDecal.visible = true;
      this.cursorDecal.position.copy(result.point).addScaledVector(result.normal, 0.005);

      var normal = result.normal.clone().normalize();
      var up = new THREE.Vector3(0, 0, 1);
      var quat = new THREE.Quaternion().setFromUnitVectors(up, normal);
      this.cursorDecal.setRotationFromQuaternion(quat);

      var scale = brushSize;
      this.cursorDecal.scale.set(scale, scale, scale);
    } else {
      this.cursorDecal.visible = false;
    }
  };

  StudioEngine.prototype.hideCursor = function() {
    this.cursorDecal.visible = false;
  };

  StudioEngine.prototype.getSymmetryCount = function(mode) {
    switch (mode) {
      case 'mirror_x':
      case 'mirror_y':
      case 'mirror_z':
        return 2;
      case 'radial_4x':
        return 4;
      case 'radial_8x':
        return 8;
      default:
        return 1;
    }
  };

  StudioEngine.prototype.generateSymmetricPoints = function(points, symmetryIndex, mode) {
    if (!points || points.length === 0 || mode === 'none' || symmetryIndex === 0) {
      return points;
    }

    return points.map(function(p) {
      var symPos = p.position.clone();
      var symNorm = p.normal.clone();

      if (mode === 'mirror_x') {
        symPos.x = -symPos.x;
        symNorm.x = -symNorm.x;
      } else if (mode === 'mirror_y') {
        symPos.y = -symPos.y;
        symNorm.y = -symNorm.y;
      } else if (mode === 'mirror_z') {
        symPos.z = -symPos.z;
        symNorm.z = -symNorm.z;
      } else if (mode === 'radial_4x' || mode === 'radial_8x') {
        var totalSlices = mode === 'radial_4x' ? 4 : 8;
        var angle = ((Math.PI * 2) / totalSlices) * symmetryIndex;
        var cosA = Math.cos(angle);
        var sinA = Math.sin(angle);

        var rx = symPos.x * cosA - symPos.z * sinA;
        var rz = symPos.x * sinA + symPos.z * cosA;
        symPos.x = rx;
        symPos.z = rz;

        var rnx = symNorm.x * cosA - symNorm.z * sinA;
        var rnz = symNorm.x * sinA + symNorm.z * cosA;
        symNorm.x = rnx;
        symNorm.z = rnz;
      }

      return {
        position: symPos,
        normal: symNorm,
        pressure: p.pressure,
        isSurfaceHit: p.isSurfaceHit,
        uv: p.uv,
        time: p.time
      };
    });
  };

  StudioEngine.prototype.updateActiveStrokeGeometry = function(settings, symmetry) {
    if (this.activePoints.length === 0 || this.activeStrokeMeshes.length === 0) return;

    var symmetryCount = this.getSymmetryCount(symmetry);
    for (var s = 0; s < symmetryCount; s++) {
      if (s < this.activeStrokeMeshes.length) {
        var symPoints = this.generateSymmetricPoints(this.activePoints, s, symmetry);
        var geom = this.beadGenerator.generateGeometry(symPoints, settings, this.targetMeshes);
        if (this.activeStrokeMeshes[s].geometry) {
          this.activeStrokeMeshes[s].geometry.dispose();
        }
        this.activeStrokeMeshes[s].geometry = geom;
      }
    }
  };

  StudioEngine.prototype.commitActiveSegment = function(settings, tool) {
    if (this.activePoints.length === 0) return;

    for (var s = 0; s < this.activeStrokeMeshes.length; s++) {
      var mesh = this.activeStrokeMeshes[s];
      if (mesh.geometry && mesh.geometry.attributes.position && mesh.geometry.attributes.position.count > 0) {
        var desc = {
          id: 'stroke_' + Math.random().toString(36).substr(2, 9),
          layerId: this.activeLayerId,
          tool: tool,
          points: this.generateSymmetricPoints(this.activePoints, s, 'none'),
          settings: JSON.parse(JSON.stringify(settings)),
          symmetryIndex: s,
          createdAt: Date.now()
        };
        this.strokes.set(desc.id, { descriptor: desc, meshes: [mesh] });
        this.activeStrokeBatch.push(desc);
      } else {
        this.strokeRoot.remove(mesh);
        if (mesh.geometry) mesh.geometry.dispose();
      }
    }

    this.activePoints = [];
    this.activeStrokeMeshes = [];
  };

  StudioEngine.prototype.startStroke = function(screenX, screenY, settings, tool, layer, pressure, symmetry) {
    if (layer && (layer.locked || !layer.visible)) return;

    this.isDrawing = true;
    this.activePoints = [];
    this.activeStrokeMeshes = [];
    this.activeStrokeBatch = [];
    this.activeLayerId = (layer && layer.id) || 'layer_base_1';
    this.activeLayerOpacity = (layer && layer.opacity !== undefined) ? layer.opacity : 1.0;

    this.strokeSmoother.reset();
    var smoothed = this.strokeSmoother.processPoint(
      screenX,
      screenY,
      pressure !== undefined ? pressure : 1.0,
      settings.smoothingAlgorithm || 'one_euro',
      settings.smoothingStrength !== undefined ? settings.smoothingStrength : 0.55,
      settings.predictiveTracking !== undefined ? settings.predictiveTracking : true,
      settings.predictionFactor !== undefined ? settings.predictionFactor : 0.4
    );

    this.lastScreenCoords = { x: smoothed.x, y: smoothed.y };
    this.lastCapturePoint = null;
    this.isOverAir = false;

    var rayResult = this.raycastModel(smoothed.x, smoothed.y);
    if (!rayResult || !rayResult.hit) {
      this.isOverAir = true;
      return;
    }

    if (tool === 'uv_brush' && rayResult.hit && rayResult.uv) {
      this.uvEngine.beginStroke(rayResult.uv, settings);
      this.uvEngine.paintTo(rayResult.uv, settings, smoothed.pressure);
      return;
    }

    var firstPoint = {
      position: rayResult.point.clone(),
      normal: rayResult.normal.clone(),
      pressure: smoothed.pressure,
      isSurfaceHit: true,
      uv: rayResult.uv,
      time: performance.now()
    };
    this.activePoints.push(firstPoint);
    this.lastCapturePoint = firstPoint;

    var symmetryCount = this.getSymmetryCount(symmetry);
    for (var s = 0; s < symmetryCount; s++) {
      var mat = this.materialCache.getStrokeMaterial(settings, rayResult.hit, this.activeLayerOpacity);
      var mesh = new THREE.Mesh(new THREE.BufferGeometry(), mat);
      mesh.renderOrder = 5;
      this.strokeRoot.add(mesh);
      this.activeStrokeMeshes.push(mesh);
    }

    this.updateActiveStrokeGeometry(settings, symmetry);
  };

  StudioEngine.prototype.addStrokePoint = function(screenX, screenY, settings, tool, pressure, symmetry) {
    if (!this.isDrawing) return;

    var smoothed = this.strokeSmoother.processPoint(
      screenX,
      screenY,
      pressure !== undefined ? pressure : 1.0,
      settings.smoothingAlgorithm || 'one_euro',
      settings.smoothingStrength !== undefined ? settings.smoothingStrength : 0.55,
      settings.predictiveTracking !== undefined ? settings.predictiveTracking : true,
      settings.predictionFactor !== undefined ? settings.predictionFactor : 0.4
    );

    var targetX = smoothed.x;
    var targetY = smoothed.y;
    var targetPressure = smoothed.pressure;

    if (!this.lastScreenCoords) {
      this.lastScreenCoords = { x: targetX, y: targetY };
    }

    var dx = targetX - this.lastScreenCoords.x;
    var dy = targetY - this.lastScreenCoords.y;
    var screenDist = Math.hypot(dx, dy);

    var maxStepDist = 0.005;
    var steps = Math.min(24, Math.max(1, Math.ceil(screenDist / maxStepDist)));

    for (var step = 1; step <= steps; step++) {
      var alpha = step / steps;
      var currX = this.lastScreenCoords.x + dx * alpha;
      var currY = this.lastScreenCoords.y + dy * alpha;
      var currPressure = targetPressure;

      var rayResult = this.raycastModel(currX, currY);

      if (tool === 'uv_brush') {
        if (rayResult && rayResult.hit && rayResult.uv) {
          this.uvEngine.paintTo(rayResult.uv, settings, currPressure);
        }
        continue;
      }

      if (!rayResult || !rayResult.hit) {
        if (this.activePoints.length > 0) {
          this.commitActiveSegment(settings, tool);
        }
        this.isOverAir = true;
        this.lastCapturePoint = null;
        continue;
      }

      var newPoint = {
        position: rayResult.point.clone(),
        normal: rayResult.normal.clone(),
        pressure: currPressure,
        isSurfaceHit: true,
        uv: rayResult.uv,
        time: performance.now()
      };

      if (this.lastCapturePoint) {
        var dist3D = this.lastCapturePoint.position.distanceTo(newPoint.position);
        var normalDot = this.lastCapturePoint.normal.dot(newPoint.normal);
        var maxJump = Math.max(0.18, settings.size * 6.0);
        var isDiscontinuous = this.isOverAir || dist3D > maxJump || normalDot < -0.25;

        if (isDiscontinuous) {
          if (this.activePoints.length > 0) {
            this.commitActiveSegment(settings, tool);
          }
          this.isOverAir = false;
          this.lastCapturePoint = null;
        }
      }

      this.isOverAir = false;

      if (this.activePoints.length === 0) {
        this.activePoints.push(newPoint);
        this.lastCapturePoint = newPoint;

        var symmetryCount = this.getSymmetryCount(symmetry);
        for (var s = 0; s < symmetryCount; s++) {
          var mat = this.materialCache.getStrokeMaterial(settings, true, this.activeLayerOpacity);
          var mesh = new THREE.Mesh(new THREE.BufferGeometry(), mat);
          mesh.renderOrder = 5;
          this.strokeRoot.add(mesh);
          this.activeStrokeMeshes.push(mesh);
        }
      } else {
        var distFromLast = this.lastCapturePoint.position.distanceTo(newPoint.position);
        if (distFromLast > 0.0004) {
          this.activePoints.push(newPoint);
          this.lastCapturePoint = newPoint;
        }
      }
    }

    this.lastScreenCoords = { x: targetX, y: targetY };
    this.updateActiveStrokeGeometry(settings, symmetry);
  };

  StudioEngine.prototype.endStroke = function(settings, tool) {
    if (!this.isDrawing) return;
    this.isDrawing = false;

    if (tool === 'uv_brush') {
      this.uvEngine.endStroke();
      return;
    }

    this.commitActiveSegment(settings, tool);

    if (this.activeStrokeBatch.length > 0) {
      this.undoStack.push(this.activeStrokeBatch);
      this.redoStack = [];
      if (this.onHistoryChange) {
        this.onHistoryChange(this.undoStack.length > 0, this.redoStack.length > 0);
      }
    }

    this.activeStrokeBatch = [];
    this.lastScreenCoords = null;
    this.lastCapturePoint = null;
  };

  StudioEngine.prototype.undo = function() {
    if (this.undoStack.length === 0) {
      this.uvEngine.undo();
      return;
    }

    var lastBatch = this.undoStack.pop();
    if (!lastBatch) return;

    var self = this;
    lastBatch.forEach(function(desc) {
      var item = self.strokes.get(desc.id);
      if (item) {
        item.meshes.forEach(function(mesh) {
          self.strokeRoot.remove(mesh);
          if (mesh.geometry) mesh.geometry.dispose();
        });
        self.strokes.delete(desc.id);
      }
    });

    this.redoStack.push(lastBatch);
    if (this.onHistoryChange) {
      this.onHistoryChange(this.undoStack.length > 0, this.redoStack.length > 0);
    }
  };

  StudioEngine.prototype.redo = function(layers) {
    if (this.redoStack.length === 0) {
      this.uvEngine.redo();
      return;
    }

    var batch = this.redoStack.pop();
    if (!batch) return;

    var self = this;
    batch.forEach(function(desc) {
      var layer = (layers || []).find(function(l) { return l.id === desc.layerId; }) || { visible: true, opacity: 1.0 };
      var mat = self.materialCache.getStrokeMaterial(desc.settings, true, layer.opacity);
      var geom = self.beadGenerator.generateGeometry(desc.points, desc.settings, self.targetMeshes);
      var mesh = new THREE.Mesh(geom, mat);
      mesh.renderOrder = 5;
      mesh.visible = layer.visible;
      self.strokeRoot.add(mesh);
      self.strokes.set(desc.id, { descriptor: desc, meshes: [mesh] });
    });

    this.undoStack.push(batch);
    if (this.onHistoryChange) {
      this.onHistoryChange(this.undoStack.length > 0, this.redoStack.length > 0);
    }
  };

  StudioEngine.prototype.clearAllStrokes = function() {
    var self = this;
    this.strokes.forEach(function(item) {
      item.meshes.forEach(function(mesh) {
        self.strokeRoot.remove(mesh);
        if (mesh.geometry) mesh.geometry.dispose();
      });
    });
    this.strokes.clear();
    this.undoStack = [];
    this.redoStack = [];
    this.uvEngine.clearCanvas();
    if (this.onHistoryChange) {
      this.onHistoryChange(false, false);
    }
  };

  StudioEngine.prototype.deleteLayerStrokes = function(layerId) {
    var self = this;
    var toDelete = [];
    this.strokes.forEach(function(item, id) {
      if (item.descriptor.layerId === layerId) {
        toDelete.push(id);
        item.meshes.forEach(function(mesh) {
          self.strokeRoot.remove(mesh);
          if (mesh.geometry) mesh.geometry.dispose();
        });
      }
    });
    toDelete.forEach(function(id) { self.strokes.delete(id); });
  };

  StudioEngine.prototype.syncLayers = function(layers) {
    var self = this;
    var layerMap = new Map();
    (layers || []).forEach(function(l) { layerMap.set(l.id, l); });

    this.strokes.forEach(function(item) {
      var layer = layerMap.get(item.descriptor.layerId);
      if (layer) {
        var isVis = layer.visible;
        var op = layer.opacity;
        item.meshes.forEach(function(mesh) {
          mesh.visible = isVis;
          if (mesh.material) {
            mesh.material = self.materialCache.getStrokeMaterial(item.descriptor.settings, true, op);
          }
        });
      }
    });
  };

  StudioEngine.prototype.setLightingPreset = function(preset) {
    switch (preset) {
      case 'daylight':
        this.ambientLight.intensity = 0.6;
        this.ambientLight.color.setHex(0xffffff);
        this.dirLight1.intensity = 1.4;
        this.dirLight1.color.setHex(0xfff8ee);
        this.dirLight1.position.set(6, 12, 6);
        this.dirLight2.intensity = 0.4;
        this.dirLight2.color.setHex(0x90b0e0);
        this.scene.background.setHex(0x181e28);
        break;

      case 'neon':
        this.ambientLight.intensity = 0.2;
        this.ambientLight.color.setHex(0x100520);
        this.dirLight1.intensity = 1.8;
        this.dirLight1.color.setHex(0x00f0ff);
        this.dirLight1.position.set(4, 6, 4);
        this.dirLight2.intensity = 1.4;
        this.dirLight2.color.setHex(0xff007f);
        this.dirLight2.position.set(-4, -2, -4);
        this.scene.background.setHex(0x08060e);
        break;

      case 'sunset':
        this.ambientLight.intensity = 0.4;
        this.ambientLight.color.setHex(0x402030);
        this.dirLight1.intensity = 1.6;
        this.dirLight1.color.setHex(0xff7722);
        this.dirLight1.position.set(8, 4, 3);
        this.dirLight2.intensity = 0.8;
        this.dirLight2.color.setHex(0x8833aa);
        this.dirLight2.position.set(-5, 2, -5);
        this.scene.background.setHex(0x1a1018);
        break;

      case 'clay_neutral':
        this.ambientLight.intensity = 0.7;
        this.ambientLight.color.setHex(0xffffff);
        this.dirLight1.intensity = 0.8;
        this.dirLight1.color.setHex(0xeeeeee);
        this.dirLight1.position.set(2, 8, 4);
        this.dirLight2.intensity = 0.3;
        this.dirLight2.color.setHex(0xcccccc);
        this.dirLight2.position.set(-2, -4, -4);
        this.scene.background.setHex(0x22242a);
        break;

      case 'studio':
      default:
        this.ambientLight.intensity = 0.45;
        this.ambientLight.color.setHex(0xffffff);
        this.dirLight1.intensity = 1.2;
        this.dirLight1.color.setHex(0xffffff);
        this.dirLight1.position.set(5, 8, 5);
        this.dirLight2.intensity = 0.6;
        this.dirLight2.color.setHex(0x7389ae);
        this.dirLight2.position.set(-5, -2, -5);
        this.scene.background.setHex(0x1a1d24);
        break;
    }
  };

  StudioEngine.prototype.toggleWireframe = function(show) {
    this.targetMeshes.forEach(function(mesh) {
      if (mesh.material) {
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(function(m) { m.wireframe = show; });
        } else {
          mesh.material.wireframe = show;
        }
      }
    });
  };

  StudioEngine.prototype.toggleGrid = function(show) {
    this.gridHelper.visible = show;
  };

  StudioEngine.prototype.setDrawingPlane = function(planeState) {
    if (!planeState) return;
    this.drawingPlaneState = planeState;
    if (this.drawingPlaneMesh) {
      var pitchRad = ((planeState.pitch - 90) * Math.PI) / 180;
      this.drawingPlaneMesh.position.y = (planeState.depth / 50) * 1.5;
      if (planeState.preset === 'side') {
        this.drawingPlaneMesh.rotation.set(-pitchRad, Math.PI / 2, 0);
      } else {
        this.drawingPlaneMesh.rotation.set(-pitchRad, 0, 0);
      }
    }
  };

  StudioEngine.prototype.alignPlaneToCamera = function() {
    if (this.drawingPlaneMesh) {
      this.drawingPlaneMesh.quaternion.copy(this.camera.quaternion);
    }
  };

  StudioEngine.prototype.setPostProcessSettings = function(settings) {
    this.postEngine.updateSettings(settings);
  };

  StudioEngine.prototype.orbit = function(deltaTheta, deltaPhi) {
    this.targetSpherical.theta += deltaTheta;
    this.targetSpherical.phi += deltaPhi;
    this.targetSpherical.phi = Math.max(0.05, Math.min(Math.PI - 0.05, this.targetSpherical.phi));
  };

  StudioEngine.prototype.pan = function(deltaX, deltaY) {
    var right = new THREE.Vector3(1, 0, 0).applyQuaternion(this.camera.quaternion);
    var up = new THREE.Vector3(0, 1, 0).applyQuaternion(this.camera.quaternion);
    var scale = this.targetSpherical.radius * 0.002;
    this.targetPosition.addScaledVector(right, -deltaX * scale);
    this.targetPosition.addScaledVector(up, deltaY * scale);
  };

  StudioEngine.prototype.zoom = function(factor) {
    this.targetSpherical.radius = Math.max(0.2, Math.min(30.0, this.targetSpherical.radius * factor));
  };

  StudioEngine.prototype.resetView = function() {
    this.targetSpherical.set(3.8, Math.PI / 2.3, Math.PI / 4);
    this.targetPosition.set(0, 0, 0);
  };

  StudioEngine.prototype.snapView = function(viewName) {
    var r = this.targetSpherical.radius;
    switch (viewName.toLowerCase()) {
      case 'front':
        this.targetSpherical.set(r, Math.PI / 2, 0);
        break;
      case 'back':
        this.targetSpherical.set(r, Math.PI / 2, Math.PI);
        break;
      case 'top':
        this.targetSpherical.set(r, 0.05, 0);
        break;
      case 'bottom':
        this.targetSpherical.set(r, Math.PI - 0.05, 0);
        break;
      case 'left':
        this.targetSpherical.set(r, Math.PI / 2, -Math.PI / 2);
        break;
      case 'right':
        this.targetSpherical.set(r, Math.PI / 2, Math.PI / 2);
        break;
      default:
        this.targetSpherical.set(r, Math.PI / 2.3, Math.PI / 4);
        break;
    }
  };

  StudioEngine.prototype.exportGLTF = function() {
    var exportGroup = new THREE.Group();
    exportGroup.name = 'PaintingStudio_Export';
    exportGroup.add(this.modelRoot.clone());
    exportGroup.add(this.strokeRoot.clone());

    var exporter = new THREE.GLTFExporter();
    return new Promise(function(resolve, reject) {
      exporter.parse(
        exportGroup,
        function(result) { resolve(result); },
        { binary: true },
        reject
      );
    });
  };

  StudioEngine.prototype.exportOBJ = function() {
    var exportGroup = new THREE.Group();
    exportGroup.add(this.modelRoot.clone());
    exportGroup.add(this.strokeRoot.clone());

    var exporter = new THREE.OBJExporter();
    return exporter.parse(exportGroup);
  };

  StudioEngine.prototype.exportScreenshot = function() {
    this.postEngine.render();
    return this.renderer.domElement.toDataURL('image/png');
  };

  StudioEngine.prototype.dispose = function() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.clearAllStrokes();
    this.clearModel();
    this.materialCache.clear();
    this.uvEngine.dispose();
    this.postEngine.dispose();
    this.renderer.dispose();
  };

  window.StudioEngine = StudioEngine;
})(window);
