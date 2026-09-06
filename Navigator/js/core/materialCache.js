// Material Cache Isolation Engine
// Implements Feather-style material types:
// - Shaded: Dynamic PBR MeshStandardMaterial responding to scene lights & shadows
// - Shadeless: Flat, unlit MeshBasicMaterial unaffected by scene lighting
// - Glow: Self-illuminated emissive material triggering bloom post-processing
// - Cutout: Spatial transparency material punching negative space through overlapping 3D curves
// - Procedural Surface Patterns: Halftone Dot, Line Hatch, Crosshatch, Terrazzo, Stipple

(function(window) {
  'use strict';

  function MaterialCache() {
    this.cache = new Map();
  }

  MaterialCache.prototype.getStrokeMaterial = function(settings, isOnModel, layerOpacity) {
    if (isOnModel === undefined) isOnModel = true;
    if (layerOpacity === undefined) layerOpacity = 1.0;

    var effectiveOpacity = Math.max(0.01, Math.min(1.0, (settings.opacity !== undefined ? settings.opacity : 1.0) * layerOpacity));
    var modeKey = isOnModel ? 'm1' : 'm0';
    var stencilKey = (settings.stencilMasking && isOnModel) ? 's1' : 's0';
    var matType = settings.materialType || 'shaded';
    var patType = settings.patternType || 'none';
    var patScale = settings.patternScale !== undefined ? settings.patternScale : 4.0;
    var patInt = settings.patternIntensity !== undefined ? settings.patternIntensity : 0.8;
    var patAng = settings.patternAngle !== undefined ? settings.patternAngle : 45;
    var patContr = settings.patternContrast !== undefined ? settings.patternContrast : 1.0;

    var key = matType + '|' + (settings.color || '#38bdf8') + '|o' + effectiveOpacity.toFixed(3) + '|r' + ((settings.roughness !== undefined ? settings.roughness : 0.35)).toFixed(2) + '|m' + ((settings.metalness !== undefined ? settings.metalness : 0.15)).toFixed(2) + '|e' + ((settings.emissiveIntensity !== undefined ? settings.emissiveIntensity : 0)).toFixed(2) + '|' + modeKey + '|' + stencilKey + '|p_' + patType + '_' + patScale + '_' + patInt + '_' + patAng + '_' + patContr;

    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    var color = new THREE.Color(settings.color || '#38bdf8');
    var isOpaque = effectiveOpacity >= 0.99;

    var patternTexture = window.PatternGenerator ? window.PatternGenerator.getPatternTexture(patType, patScale, patInt, patAng, patContr) : null;

    var material;

    if (matType === 'cutout') {
      material = new THREE.MeshBasicMaterial({
        colorWrite: false,
        depthWrite: true,
        depthTest: true,
        transparent: false,
        side: THREE.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: -4.0,
        polygonOffsetUnits: -4.0
      });
    } else if (matType === 'shadeless') {
      material = new THREE.MeshBasicMaterial({
        color: color,
        map: patternTexture,
        transparent: !isOpaque,
        opacity: effectiveOpacity,
        side: THREE.DoubleSide,
        depthTest: true,
        depthWrite: isOpaque,
        polygonOffset: true,
        polygonOffsetFactor: -3.0,
        polygonOffsetUnits: -3.0
      });
    } else if (matType === 'glow') {
      var glowIntensity = Math.max(1.8, (settings.emissiveIntensity || 1.0) * 2.5);
      var glowColor = color.clone().multiplyScalar(glowIntensity);
      material = new THREE.MeshBasicMaterial({
        color: glowColor,
        map: patternTexture,
        transparent: !isOpaque,
        opacity: effectiveOpacity,
        side: THREE.DoubleSide,
        depthTest: true,
        depthWrite: isOpaque,
        polygonOffset: true,
        polygonOffsetFactor: -3.0,
        polygonOffsetUnits: -3.0
      });
    } else {
      // Default: 'shaded' (PBR MeshStandardMaterial)
      var emissiveColor = color.clone().multiplyScalar(settings.emissiveIntensity || 0.0);
      material = new THREE.MeshStandardMaterial({
        color: color,
        map: patternTexture,
        roughness: settings.roughness !== undefined ? settings.roughness : 0.35,
        metalness: settings.metalness !== undefined ? settings.metalness : 0.15,
        emissive: emissiveColor,
        transparent: !isOpaque,
        opacity: effectiveOpacity,
        side: THREE.DoubleSide,
        depthTest: true,
        depthWrite: isOpaque,
        polygonOffset: true,
        polygonOffsetFactor: -3.0,
        polygonOffsetUnits: -3.0
      });
    }

    if (isOnModel && settings.stencilMasking) {
      material.stencilWrite = false;
      material.stencilRef = 1;
      material.stencilFunc = THREE.EqualStencilFunc;
    } else {
      material.stencilFunc = THREE.AlwaysStencilFunc;
    }

    this.cache.set(key, material);
    return material;
  };

  MaterialCache.configureModelMaterial = function(material) {
    if (!material) return;
    material.stencilWrite = true;
    material.stencilRef = 1;
    material.stencilZPass = THREE.ReplaceStencilOp;
    material.stencilWriteMask = 0xff;
    material.polygonOffset = false;
    material.needsUpdate = true;
  };

  MaterialCache.prototype.clear = function() {
    this.cache.forEach(function(mat) {
      if (mat && mat.dispose) mat.dispose();
    });
    this.cache.clear();
  };

  window.MaterialCache = MaterialCache;
})(window);
