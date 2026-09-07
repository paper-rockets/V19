// Procedural Pattern Texture Generator
// Generates seamless procedural textures for Feather-style stroke patterns:
// - Dot: Ordered halftone dots
// - Line: Parallel hatching
// - Cross: Orthogonal crosshatch grid
// - Terrazzo: Organic mosaic stone pattern
// - Stipple: Noise-distributed stipple points

(function(window) {
  'use strict';

  var PatternGenerator = {
    cache: new Map(),

    getPatternTexture: function(type, scale, intensity, angle, contrast) {
      if (!type || type === 'none') return null;

      scale = (scale !== undefined) ? scale : 4.0;
      intensity = (intensity !== undefined) ? intensity : 0.8;
      angle = (angle !== undefined) ? angle : 45;
      contrast = (contrast !== undefined) ? contrast : 1.0;

      var cacheKey = type + '_' + scale.toFixed(1) + '_' + intensity.toFixed(2) + '_' + angle.toFixed(0) + '_' + contrast.toFixed(1);
      if (this.cache.has(cacheKey)) {
        return this.cache.get(cacheKey);
      }

      var size = 256;
      var canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      var ctx = canvas.getContext('2d');
      if (!ctx) return null;

      // Base background: white
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, size, size);

      var rad = (angle * Math.PI) / 180;
      var spacing = Math.max(8, Math.round(size / Math.max(1, scale * 3)));
      var alpha = Math.min(1.0, intensity * contrast);

      ctx.save();
      ctx.translate(size / 2, size / 2);
      ctx.rotate(rad);
      ctx.translate(-size / 2, -size / 2);

      ctx.fillStyle = 'rgba(0, 0, 0, ' + alpha.toFixed(3) + ')';
      ctx.strokeStyle = 'rgba(0, 0, 0, ' + alpha.toFixed(3) + ')';

      var expand = size * 1.5;
      var start = -expand;
      var end = size + expand;

      switch (type) {
        case 'dot': {
          var dotRadius = Math.max(1.5, spacing * 0.28 * contrast);
          for (var y = start; y <= end; y += spacing) {
            for (var x = start; x <= end; x += spacing) {
              ctx.beginPath();
              ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
              ctx.fill();
            }
          }
          break;
        }

        case 'line': {
          ctx.lineWidth = Math.max(1.2, spacing * 0.25 * contrast);
          for (var lx = start; lx <= end; lx += spacing) {
            ctx.beginPath();
            ctx.moveTo(lx, start);
            ctx.lineTo(lx, end);
            ctx.stroke();
          }
          break;
        }

        case 'cross': {
          ctx.lineWidth = Math.max(1.0, spacing * 0.2 * contrast);
          for (var cx = start; cx <= end; cx += spacing) {
            ctx.beginPath();
            ctx.moveTo(cx, start);
            ctx.lineTo(cx, end);
            ctx.stroke();
          }
          for (var cy = start; cy <= end; cy += spacing) {
            ctx.beginPath();
            ctx.moveTo(start, cy);
            ctx.lineTo(end, cy);
            ctx.stroke();
          }
          break;
        }

        case 'terrazzo': {
          var numStones = Math.round(scale * 12);
          var rand = function(s) {
            var val = Math.sin(s) * 10000;
            return val - Math.floor(val);
          };
          for (var i = 0; i < numStones; i++) {
            var stoneX = (rand(i * 3 + 1) * size * 1.4) - size * 0.2;
            var stoneY = (rand(i * 3 + 2) * size * 1.4) - size * 0.2;
            var stoneRadius = spacing * (0.3 + rand(i * 3 + 3) * 0.4);
            var sides = 3 + Math.floor(rand(i * 7) * 4);

            ctx.beginPath();
            for (var s = 0; s < sides; s++) {
              var a = (s / sides) * Math.PI * 2 + rand(i + s) * 0.8;
              var r = stoneRadius * (0.7 + rand(i * 2 + s) * 0.6);
              var px = stoneX + Math.cos(a) * r;
              var py = stoneY + Math.sin(a) * r;
              if (s === 0) ctx.moveTo(px, py);
              else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fill();
          }
          break;
        }

        case 'stipple': {
          var numDots = Math.round(scale * 150);
          var randStipple = function(s) {
            var val = Math.sin(s) * 10000;
            return val - Math.floor(val);
          };
          for (var d = 0; d < numDots; d++) {
            var stippleX = randStipple(d * 5 + 1) * size;
            var stippleY = randStipple(d * 5 + 2) * size;
            var stippleR = 0.8 + randStipple(d * 5 + 3) * 1.6 * contrast;
            var dotAlpha = alpha * (0.4 + randStipple(d * 5 + 4) * 0.6);
            ctx.fillStyle = 'rgba(0, 0, 0, ' + dotAlpha.toFixed(3) + ')';
            ctx.beginPath();
            ctx.arc(stippleX, stippleY, stippleR, 0, Math.PI * 2);
            ctx.fill();
          }
          break;
        }
      }

      ctx.restore();

      var texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(scale, scale);
      texture.needsUpdate = true;

      this.cache.set(cacheKey, texture);
      return texture;
    }
  };

  window.PatternGenerator = PatternGenerator;
})(window);
