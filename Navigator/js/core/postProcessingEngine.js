// Post-Processing & Render Modifiers Engine
// Supports Draft Mode and Render Mode with Toon cel-shading, bloom, DoF bokeh, film grain, and retro pixelation.

(function(window) {
  'use strict';

  function PostProcessingEngine(renderer, scene, camera, width, height) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;

    var pr = (renderer && renderer.getPixelRatio) ? renderer.getPixelRatio() : 1;
    var w = Math.max(1, Math.floor((width || window.innerWidth) * pr));
    var h = Math.max(1, Math.floor((height || window.innerHeight) * pr));

    var options = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.HalfFloatType || THREE.UnsignedByteType,
      stencilBuffer: true,
      depthBuffer: true
    };

    this.renderTargetA = new THREE.WebGLRenderTarget(w, h, options);
    this.renderTargetB = new THREE.WebGLRenderTarget(w, h, options);
    this.bloomTarget = new THREE.WebGLRenderTarget(Math.floor(w / 2), Math.floor(h / 2), options);

    this.postScene = new THREE.Scene();
    this.postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    this.settings = {
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
    };

    this.postMaterial = new THREE.ShaderMaterial({
      uniforms: {
        tDiffuse: { value: null },
        uResolution: { value: new THREE.Vector2(w, h) },
        uTime: { value: 0.0 },
        uRenderMode: { value: 0 },
        uToonShading: { value: false },
        uToonSteps: { value: 3.0 },
        uBloom: { value: true },
        uBloomIntensity: { value: 1.2 },
        uBloomThreshold: { value: 0.85 },
        uBloomRadius: { value: 0.8 },
        uDoF: { value: false },
        uFocusDistance: { value: 2.5 },
        uAperture: { value: 0.015 },
        uGrain: { value: false },
        uGrainIntensity: { value: 0.08 },
        uPixelation: { value: false },
        uPixelSize: { value: 4.0 },
        uCameraNear: { value: 0.1 },
        uCameraFar: { value: 100.0 }
      },
      vertexShader: [
        'varying vec2 vUv;',
        'void main() {',
        '  vUv = uv;',
        '  gl_Position = vec4(position.xy, 0.0, 1.0);',
        '}'
      ].join('\n'),
      fragmentShader: [
        'uniform sampler2D tDiffuse;',
        'uniform vec2 uResolution;',
        'uniform float uTime;',
        'uniform int uRenderMode;',
        'uniform bool uToonShading;',
        'uniform float uToonSteps;',
        'uniform bool uBloom;',
        'uniform float uBloomIntensity;',
        'uniform float uBloomThreshold;',
        'uniform float uBloomRadius;',
        'uniform bool uDoF;',
        'uniform float uFocusDistance;',
        'uniform float uAperture;',
        'uniform bool uGrain;',
        'uniform float uGrainIntensity;',
        'uniform bool uPixelation;',
        'uniform float uPixelSize;',
        'varying vec2 vUv;',

        'float rand(vec2 co) {',
        '  return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);',
        '}',

        'void main() {',
        '  vec2 uv = vUv;',

        '  if (uPixelation && uPixelSize > 1.0) {',
        '    vec2 dxy = uPixelSize / uResolution;',
        '    uv = dxy * floor(uv / dxy);',
        '  }',

        '  vec4 baseColor = texture2D(tDiffuse, uv);',

        '  if (uRenderMode == 0) {',
        '    gl_FragColor = baseColor;',
        '    return;',
        '  }',

        '  vec3 color = baseColor.rgb;',

        '  if (uDoF) {',
        '    vec2 blurDir = (uv - vec2(0.5));',
        '    float distFromCenter = length(blurDir);',
        '    float blurAmount = clamp(abs(distFromCenter - 0.3) * uAperture * 30.0, 0.0, 0.015);',
        '    vec3 blurred = vec3(0.0);',
        '    float totalWeight = 0.0;',
        '    for (int x = -2; x <= 2; x++) {',
        '      for (int y = -2; y <= 2; y++) {',
        '        vec2 offset = vec2(float(x), float(y)) * blurAmount;',
        '        float weight = 1.0 / (1.0 + length(vec2(x, y)));',
        '        blurred += texture2D(tDiffuse, uv + offset).rgb * weight;',
        '        totalWeight += weight;',
        '      }',
        '    }',
        '    color = blurred / totalWeight;',
        '  }',

        '  if (uBloom) {',
        '    vec3 bloomSum = vec3(0.0);',
        '    float stepScale = uBloomRadius * 4.0;',
        '    float bWeight = 0.0;',
        '    for (int i = -3; i <= 3; i++) {',
        '      for (int j = -3; j <= 3; j++) {',
        '        vec2 bOffset = vec2(float(i), float(j)) * (stepScale / uResolution);',
        '        vec3 sampleColor = texture2D(tDiffuse, uv + bOffset).rgb;',
        '        float brightness = dot(sampleColor, vec3(0.299, 0.587, 0.114));',
        '        if (brightness > uBloomThreshold || max(sampleColor.r, max(sampleColor.g, sampleColor.b)) > 1.0) {',
        '          float w = 1.0 / (1.0 + float(i*i + j*j));',
        '          bloomSum += sampleColor * w;',
        '          bWeight += w;',
        '        }',
        '      }',
        '    }',
        '    if (bWeight > 0.0) {',
        '      vec3 bloom = (bloomSum / bWeight) * uBloomIntensity;',
        '      color += bloom;',
        '    }',
        '  }',

        '  if (uToonShading) {',
        '    float luma = dot(color, vec3(0.299, 0.587, 0.114));',
        '    float steppedLuma = floor(luma * uToonSteps + 0.5) / uToonSteps;',
        '    color = color * (steppedLuma / max(0.05, luma));',
        '  }',

        '  if (uGrain) {',
        '    float noise = (rand(uv + fract(uTime * 0.05)) - 0.5) * uGrainIntensity;',
        '    color += vec3(noise);',
        '  }',

        '  gl_FragColor = vec4(color, baseColor.a);',
        '}'
      ].join('\n'),
      depthTest: false,
      depthWrite: false
    });

    this.postQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.postMaterial);
    this.postScene.add(this.postQuad);
  }

  PostProcessingEngine.prototype.setSize = function(width, height) {
    var pr = (this.renderer && this.renderer.getPixelRatio) ? this.renderer.getPixelRatio() : 1;
    var w = Math.max(1, Math.floor(width * pr));
    var h = Math.max(1, Math.floor(height * pr));

    this.renderTargetA.setSize(w, h);
    this.renderTargetB.setSize(w, h);
    this.bloomTarget.setSize(Math.floor(w / 2), Math.floor(h / 2));
    this.postMaterial.uniforms.uResolution.value.set(w, h);
  };

  PostProcessingEngine.prototype.updateSettings = function(newSettings) {
    for (var k in newSettings) {
      this.settings[k] = newSettings[k];
    }

    var u = this.postMaterial.uniforms;
    u.uRenderMode.value = this.settings.renderMode === 'render' ? 1 : 0;
    u.uToonShading.value = !!this.settings.toonShading;
    u.uToonSteps.value = Number(this.settings.toonSteps) || 3.0;
    u.uBloom.value = !!this.settings.bloom;
    u.uBloomIntensity.value = Number(this.settings.bloomIntensity) || 1.2;
    u.uBloomRadius.value = Number(this.settings.bloomRadius) || 0.8;
    u.uBloomThreshold.value = Number(this.settings.bloomThreshold) || 0.85;
    u.uDoF.value = !!this.settings.dof;
    u.uFocusDistance.value = Number(this.settings.dofFocusDistance) || 2.5;
    u.uAperture.value = Number(this.settings.dofAperture) || 0.015;
    u.uGrain.value = !!this.settings.grain;
    u.uGrainIntensity.value = Number(this.settings.grainIntensity) || 0.08;
    u.uPixelation.value = !!this.settings.pixelation;
    u.uPixelSize.value = Number(this.settings.pixelSize) || 4.0;
  };

  PostProcessingEngine.prototype.getSettings = function() {
    var copy = {};
    for (var k in this.settings) copy[k] = this.settings[k];
    return copy;
  };

  PostProcessingEngine.prototype.render = function(time) {
    time = time || 0;
    if (this.settings.renderMode === 'draft') {
      this.renderer.setRenderTarget(null);
      this.renderer.render(this.scene, this.camera);
      return;
    }

    this.renderer.setRenderTarget(this.renderTargetA);
    this.renderer.render(this.scene, this.camera);

    this.postMaterial.uniforms.tDiffuse.value = this.renderTargetA.texture;
    this.postMaterial.uniforms.uTime.value = time;
    this.postMaterial.uniforms.uCameraNear.value = this.camera.near;
    this.postMaterial.uniforms.uCameraFar.value = this.camera.far;

    this.renderer.setRenderTarget(null);
    this.renderer.render(this.postScene, this.postCamera);
  };

  PostProcessingEngine.prototype.dispose = function() {
    this.renderTargetA.dispose();
    this.renderTargetB.dispose();
    this.bloomTarget.dispose();
    this.postMaterial.dispose();
    this.postQuad.geometry.dispose();
  };

  window.PostProcessingEngine = PostProcessingEngine;
})(window);
