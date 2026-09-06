// Dynamic UV Texture Painting Engine
// Implements direct GPU texture painting onto 3D model UV maps using
// offscreen high-resolution 2D Canvas textures with seamless interpolation and undo history.

(function(window) {
  'use strict';

  function UVPaintingEngine(resolution) {
    this.width = resolution || 2048;
    this.height = resolution || 2048;
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });

    this.lastUV = null;
    this.historyStack = [];
    this.historyIndex = -1;
    this.maxHistory = 25;
    this.isDrawing = false;
    this.activeMeshes = [];

    this.clearCanvas();

    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.generateMipmaps = true;
    this.texture.minFilter = THREE.LinearMipmapLinearFilter;
    this.texture.magFilter = THREE.LinearFilter;
    this.texture.wrapS = THREE.RepeatWrapping;
    this.texture.wrapT = THREE.RepeatWrapping;

    this.saveState();
  }

  UVPaintingEngine.prototype.getTexture = function() {
    return this.texture;
  };

  UVPaintingEngine.prototype.getCanvas = function() {
    return this.canvas;
  };

  UVPaintingEngine.prototype.clearCanvas = function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    if (this.texture) {
      this.texture.needsUpdate = true;
    }
  };

  UVPaintingEngine.prototype.clearToColor = function(color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.width, this.height);
    if (this.texture) {
      this.texture.needsUpdate = true;
    }
  };

  UVPaintingEngine.prototype.attachToModel = function(root) {
    this.activeMeshes = [];
    var self = this;
    root.traverse(function(child) {
      if (child.isMesh && child.geometry && child.name !== 'UV_Overlay') {
        self.activeMeshes.push(child);

        if (!child.geometry.attributes.uv) {
          self.generateFallbackUVs(child.geometry);
        }

        var existingOverlay = null;
        for (var i = 0; i < child.children.length; i++) {
          if (child.children[i].name === 'UV_Overlay') {
            existingOverlay = child.children[i];
            break;
          }
        }

        if (!existingOverlay) {
          var overlayMat = new THREE.MeshStandardMaterial({
            map: self.texture,
            transparent: true,
            opacity: 1.0,
            roughness: 0.4,
            metalness: 0.1,
            depthTest: true,
            depthWrite: false,
            polygonOffset: true,
            polygonOffsetFactor: -1.0,
            polygonOffsetUnits: -2.0,
            side: THREE.DoubleSide
          });
          var overlayMesh = new THREE.Mesh(child.geometry, overlayMat);
          overlayMesh.name = 'UV_Overlay';
          overlayMesh.renderOrder = 4;
          child.add(overlayMesh);
        }
      }
    });
  };

  UVPaintingEngine.prototype.generateFallbackUVs = function(geometry) {
    var pos = geometry.attributes.position;
    if (!pos) return;
    var uvs = new Float32Array(pos.count * 2);
    for (var i = 0; i < pos.count; i++) {
      var x = pos.getX(i);
      var y = pos.getY(i);
      var z = pos.getZ(i);
      var u = 0.5 + Math.atan2(z, x) / (2 * Math.PI);
      var v = 0.5 - Math.asin(Math.max(-1, Math.min(1, y))) / Math.PI;
      uvs[i * 2] = u;
      uvs[i * 2 + 1] = v;
    }
    geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  };

  UVPaintingEngine.prototype.beginStroke = function(uv, settings) {
    this.isDrawing = true;
    this.lastUV = uv.clone();
    this.paintStamp(uv, settings, 1.0);
  };

  UVPaintingEngine.prototype.paintTo = function(uv, settings, pressure) {
    pressure = pressure !== undefined ? pressure : 1.0;
    if (!this.isDrawing) {
      this.beginStroke(uv, settings);
      return;
    }

    if (!this.lastUV) {
      this.lastUV = uv.clone();
      this.paintStamp(uv, settings, pressure);
      return;
    }

    var p1x = this.lastUV.x * this.width;
    var p1y = (1.0 - this.lastUV.y) * this.height;
    var p2x = uv.x * this.width;
    var p2y = (1.0 - uv.y) * this.height;

    var dx = p2x - p1x;
    var dy = p2y - p1y;
    var dist = Math.sqrt(dx * dx + dy * dy);

    var baseRadius = settings.size * (this.width * 0.25);
    var radius = Math.max(2, baseRadius * (settings.pressureSensitivity ? pressure : 1.0));
    var step = Math.max(1.5, radius * 0.25);
    var count = Math.ceil(dist / step);

    for (var i = 1; i <= count; i++) {
      var t = i / count;
      var x = p1x + dx * t;
      var y = p1y + dy * t;
      this.renderBrushAtPixel(x, y, radius, settings);
    }

    this.lastUV.copy(uv);
    this.texture.needsUpdate = true;
  };

  UVPaintingEngine.prototype.paintStamp = function(uv, settings, pressure) {
    pressure = pressure !== undefined ? pressure : 1.0;
    var px = uv.x * this.width;
    var py = (1.0 - uv.y) * this.height;
    var baseRadius = settings.size * (this.width * 0.25);
    var radius = Math.max(2, baseRadius * (settings.pressureSensitivity ? pressure : 1.0));

    this.renderBrushAtPixel(px, py, radius, settings);
    this.texture.needsUpdate = true;
  };

  UVPaintingEngine.prototype.renderBrushAtPixel = function(x, y, radius, settings) {
    this.ctx.save();

    var radGrad = this.ctx.createRadialGradient(x, y, 0, x, y, radius);
    var hex = settings.color || '#38bdf8';
    var alpha = settings.opacity !== undefined ? settings.opacity : 1.0;

    var c = new THREE.Color(hex);
    var r = Math.round(c.r * 255);
    var g = Math.round(c.g * 255);
    var b = Math.round(c.b * 255);

    radGrad.addColorStop(0, 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')');
    radGrad.addColorStop(0.7, 'rgba(' + r + ', ' + g + ', ' + b + ', ' + (alpha * 0.85) + ')');
    radGrad.addColorStop(1, 'rgba(' + r + ', ' + g + ', ' + b + ', 0)');

    this.ctx.fillStyle = radGrad;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fill();

    this.handleWrapping(x, y, radius, radGrad);
    this.ctx.restore();
  };

  UVPaintingEngine.prototype.handleWrapping = function(x, y, radius, style) {
    var wrapX = 0;
    var wrapY = 0;

    if (x - radius < 0) wrapX = this.width;
    else if (x + radius > this.width) wrapX = -this.width;

    if (y - radius < 0) wrapY = this.height;
    else if (y + radius > this.height) wrapY = -this.height;

    if (wrapX !== 0) {
      this.ctx.beginPath();
      this.ctx.arc(x + wrapX, y, radius, 0, Math.PI * 2);
      this.ctx.fill();
    }
    if (wrapY !== 0) {
      this.ctx.beginPath();
      this.ctx.arc(x, y + wrapY, radius, 0, Math.PI * 2);
      this.ctx.fill();
    }
    if (wrapX !== 0 && wrapY !== 0) {
      this.ctx.beginPath();
      this.ctx.arc(x + wrapX, y + wrapY, radius, 0, Math.PI * 2);
      this.ctx.fill();
    }
  };

  UVPaintingEngine.prototype.endStroke = function() {
    if (this.isDrawing) {
      this.isDrawing = false;
      this.lastUV = null;
      this.saveState();
    }
  };

  UVPaintingEngine.prototype.saveState = function() {
    var data = this.ctx.getImageData(0, 0, this.width, this.height);
    if (this.historyIndex < this.historyStack.length - 1) {
      this.historyStack = this.historyStack.slice(0, this.historyIndex + 1);
    }
    this.historyStack.push(data);
    if (this.historyStack.length > this.maxHistory) {
      this.historyStack.shift();
    } else {
      this.historyIndex++;
    }
  };

  UVPaintingEngine.prototype.undo = function() {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      this.ctx.putImageData(this.historyStack[this.historyIndex], 0, 0);
      this.texture.needsUpdate = true;
      return true;
    }
    return false;
  };

  UVPaintingEngine.prototype.redo = function() {
    if (this.historyIndex < this.historyStack.length - 1) {
      this.historyIndex++;
      this.ctx.putImageData(this.historyStack[this.historyIndex], 0, 0);
      this.texture.needsUpdate = true;
      return true;
    }
    return false;
  };

  UVPaintingEngine.prototype.exportPNG = function() {
    return this.canvas.toDataURL('image/png');
  };

  UVPaintingEngine.prototype.dispose = function() {
    this.texture.dispose();
    this.historyStack = [];
  };

  window.UVPaintingEngine = UVPaintingEngine;
})(window);
