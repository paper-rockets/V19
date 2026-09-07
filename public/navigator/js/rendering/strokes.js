const DEFAULT_FX_COLORS = {
  fire: '#ff5500',
  ocean_wave: '#0088cc',
  waterfall: '#1d9fd6',
  caustic: '#1ca8b8',
  foam: '#2488aa',
  ripple: '#3078a0',
  glow: '#00ffff',
  stardust: '#ffd700',
  lava: '#ff4500',
  galaxy: '#6a0dad',
  rainbow: '#ffffff',
  lightning: '#4080ff',
  glitter: '#ffddff',
  candy: '#ff4070',
  slime: '#39ff14',
  sparkler: '#ffcc00',
  foliage_leaf: '#2e8b57',
  foliage_fir: '#228b22',
  cloud: '#ffffff',
  jelly: '#2ecc71',
  plasma: '#d946ef',
  rim_light: '#ffaa44',
  anime_cel: '#ff5533',
  volumetric_plasma: '#ff7700',
  jelly_warp: '#2ecc71',
  posterize_ink: '#e67e22'
};

const _EFFECT_FRAG_BODIES={
  fire: `
    void main() {
      vec3 baseCol = (length(uColor) < 0.05) ? vec3(1.0, 0.4, 0.05) : uColor;
      vec3 viewDir = normalize(vViewPosition);
      float t = uTime * uSpeed;
      
      // 3D Volumetric raymarch through stroke depth
      vec3 rayStep = -viewDir * (0.08 / max(0.2, uScale));
      vec3 samplePos = vWorldPosition * (0.4 * uScale);
      
      float density = 0.0;
      float heat = 0.0;
      
      for(int i = 0; i < 6; i++) {
        vec3 p = samplePos + rayStep * float(i);
        // Upward rising buoyancy drift
        vec3 drift = vec3(sin(t * 1.5 + p.y) * 0.2, t * 1.8, cos(t * 1.5 + p.x) * 0.2);
        vec3 coord = p - drift;
        
        float n1 = fbm2(coord.xz * 2.0 + coord.y);
        float n2 = noise2d(coord.xy * 4.0 + vec2(0.0, -t * 2.0));
        float d = smoothstep(0.3, 0.8, n1 * 0.7 + n2 * 0.3);
        
        // Edge falloff on stroke ribbon
        float edgeDist = abs(vUv.x - 0.5) * 2.0;
        d *= smoothstep(1.0, 0.15, edgeDist);
        
        density += d * (1.0 - density) * 0.45;
        heat += pow(d, 2.0) * (1.0 - float(i) / 6.0) * 0.35;
      }
      
      vec3 darkSmoke = vec3(0.08, 0.03, 0.02);
      vec3 flameBody = baseCol;
      vec3 incandescentCore = vec3(1.0, 0.95, 0.6);
      
      vec3 col = mix(darkSmoke, flameBody, smoothstep(0.1, 0.5, density));
      col = mix(col, incandescentCore, smoothstep(0.4, 0.9, heat * 2.2));
      col += vec3(1.0, 0.9, 0.8) * pow(heat, 3.0) * 1.5;
      
      float alpha = uOpacity * clamp(density * 1.6, 0.0, 1.0);
      gl_FragColor = vec4(col, alpha);
    }
  `,
  ocean_wave: `
    void main() {
      vec3 baseCol = (length(uColor) < 0.05) ? vec3(0.05, 0.35, 0.65) : uColor;
      float t = uTime * uSpeed * 1.5;
      vec2 uv = vec2(vUv.x * 2.0, vUv.y * uScale + t * 0.5);
      
      float w1 = 1.0 - abs(sin(uv.x * 3.14159 + sin(uv.y * 2.0 + t)));
      float w2 = 1.0 - abs(cos(uv.y * 4.0 - uv.x * 2.0 + t * 0.7));
      float wave = pow(w1 * w2, 0.85);
      
      float n = fbm2(uv * 4.0 + vec2(t * 0.3, -t * 0.2));
      float foam = smoothstep(0.55, 0.75, wave + n * 0.4);
      
      vec3 deepWater = baseCol * 0.45;
      vec3 surfaceWater = baseCol * 1.35 + vec3(0.1, 0.2, 0.25);
      vec3 foamCol = vec3(0.9, 0.97, 1.0);
      
      vec3 col = mix(deepWater, surfaceWater, wave);
      col = mix(col, foamCol, foam);
      
      float edgeAlpha = smoothstep(1.0, 0.8, abs(vUv.x - 0.5) * 2.0);
      gl_FragColor = vec4(col, uOpacity * edgeAlpha);
    }
  `,
  lightning: `
    void main() {
      vec3 baseCol = (length(uColor) < 0.05) ? vec3(0.25, 0.5, 1.0) : uColor;
      float t = uTime * uSpeed;
      vec2 coord = vec2(vUv.x * 2.0, vUv.y * uScale + t * 2.5);
      float n = fbm2(coord * 3.0);
      float bolt = 1.0 - abs(vUv.x - 0.5 - (n - 0.5) * 0.45);
      bolt = pow(clamp(bolt, 0.0, 1.0), 24.0);
      float outerGlow = pow(clamp(1.0 - abs(vUv.x - 0.5) * 2.0, 0.0, 1.0), 2.5);
      vec3 col = baseCol * (outerGlow * 1.5 + 0.3) + vec3(1.0, 1.0, 1.0) * bolt * 3.0;
      gl_FragColor = vec4(col, uOpacity);
    }
  `,
  glitter: `
    void main() {
      vec3 baseCol = (length(uColor) < 0.05) ? vec3(1.0, 0.85, 1.0) : uColor;
      float t = uTime * uSpeed;
      vec2 grid = vec2(vUv.x * 4.0, vUv.y * uScale * 4.0);
      vec2 cell = floor(grid);
      vec2 gv = fract(grid) - 0.5;
      float h = hash2d(cell);
      float twinkle = pow(sin(t * 4.0 + h * 6.283185) * 0.5 + 0.5, 8.0);
      float star = smoothstep(0.28, 0.0, length(gv)) * twinkle;
      float sparkleX = (smoothstep(0.04, 0.0, abs(gv.x)) * smoothstep(0.4, 0.0, abs(gv.y)) + smoothstep(0.04, 0.0, abs(gv.y)) * smoothstep(0.4, 0.0, abs(gv.x))) * twinkle;
      vec3 prismatic = vec3(sin(h * 6.28) * 0.5 + 0.5, sin(h * 6.28 + 2.09) * 0.5 + 0.5, sin(h * 6.28 + 4.18) * 0.5 + 0.5);
      vec3 col = baseCol * 0.6 + prismatic * 0.4;
      col += (prismatic * 2.0 + vec3(1.0)) * (star + sparkleX);
      gl_FragColor = vec4(col, uOpacity);
    }
  `,
  candy: `
    void main() {
      float t = uTime * uSpeed;
      float spiral = fract(vUv.y * uScale + vUv.x * 2.0 + t * 0.6);
      float stripeRed = smoothstep(0.0, 0.04, spiral) - smoothstep(0.46, 0.5, spiral);
      float stripeCyan = smoothstep(0.5, 0.54, spiral) - smoothstep(0.96, 1.0, spiral);
      vec3 colWhite = vec3(1.0, 0.98, 0.98);
      vec3 colRed = (length(uColor) < 0.05) ? vec3(1.0, 0.15, 0.35) : uColor;
      vec3 colCyan = vec3(0.2, 0.85, 0.95);
      vec3 col = mix(colWhite, colRed, stripeRed);
      col = mix(col, colCyan, stripeCyan);
      float gloss = pow(max(0.0, 1.0 - abs(vUv.x - 0.35) * 3.0), 3.0) * 0.35;
      col += vec3(gloss);
      gl_FragColor = vec4(col, uOpacity);
    }
  `,
  slime: `
    void main() {
      vec3 baseCol = (length(uColor) < 0.05) ? vec3(0.22, 1.0, 0.1) : uColor;
      float t = uTime * uSpeed;
      vec2 uv = vec2(vUv.x * 2.0, vUv.y * uScale - t * 0.4);
      float v = voronoi(uv * 2.5, 0.05, 0.5, t * 0.5);
      float bubble = smoothstep(0.25, 0.05, v);
      vec3 slimeDark = baseCol * 0.35 + vec3(0.02, 0.0, 0.08);
      vec3 col = mix(slimeDark, baseCol * 1.3, smoothstep(0.15, 0.65, v));
      col += vec3(0.9, 1.0, 0.7) * bubble * 0.6;
      gl_FragColor = vec4(col, uOpacity);
    }
  `,
  sparkler: `
    void main() {
      float t = uTime * uSpeed;
      vec2 uv = vec2(vUv.x, vUv.y * uScale + t * 0.8);
      float n = noise2d(uv * 16.0);
      float sparks = pow(n, 6.0) * 5.0;
      vec3 gold = (length(uColor) < 0.05) ? vec3(1.0, 0.8, 0.2) : uColor;
      vec3 col = mix(gold * 0.5, gold * 2.0, sparks * 0.4);
      col += vec3(1.0, 1.0, 1.0) * smoothstep(0.65, 0.95, n) * 1.5;
      gl_FragColor = vec4(col, uOpacity);
    }
  `,
  waterfall: `
    void main() {
      vec3 baseCol = (length(uColor) < 0.05) ? vec3(0.114, 0.624, 0.839) : uColor;
      float t = uTime * uSpeed;
      vec2 coord = vec2(vUv.x * uScale, vUv.y * uScale + t * 0.5);
      float n1 = noise2d(coord * 3.0);
      float n2 = noise2d(coord * 6.0 + vec2(0.0, t * 0.3));
      float n3 = noise2d(coord * 12.0 + vec2(0.0, t * 0.8));
      float flow = (1.0 - vUv.y) * (n1 * 0.6 + n2 * 0.3 + n3 * 0.1);
      float shadow1 = smoothstep(0.3, 0.35, flow);
      float shadow2 = smoothstep(0.5, 0.55, flow);
      float highlight = smoothstep(0.7, 0.75, n3);
      vec3 dark = baseCol * 0.4;
      vec3 mid = baseCol * 0.7;
      vec3 col = mix(dark, mid, shadow1);
      col = mix(col, baseCol, shadow2);
      col = mix(col, vec3(1.0), highlight * 0.35);
      gl_FragColor = vec4(col, uOpacity);
    }
  `,
  caustic: `
    void main() {
      vec3 baseCol = (length(uColor) < 0.05) ? vec3(0.11, 0.66, 0.72) : uColor;
      float t = uTime * uSpeed;
      vec2 coord = vUv * uScale * 2.0 + vec2(t * 0.5, t * 0.25);
      float vNoise = voronoi(coord, 0.001, 0.5, t);
      float sNoise = voronoi(coord, 0.4, 0.5, t);
      float fV = smoothstep(0.0, 0.01, vNoise - sNoise);
      float vNoise2 = voronoi(coord, 0.001, 0.3, t);
      float sNoise2 = voronoi(coord, 0.4, 0.3, t);
      float offV = smoothstep(0.0, 0.01, vNoise2 - sNoise2);
      vec3 dark = baseCol * 0.8;
      vec3 col = mix(baseCol, dark, fV);
      col = mix(col, vec3(1.0), (1.0 - offV) * 0.45);
      gl_FragColor = vec4(col, uOpacity);
    }
  `,
  foam: `
    void main() {
      vec3 baseCol = (length(uColor) < 0.05) ? vec3(0.14, 0.53, 0.67) : uColor;
      float t = uTime * uSpeed;
      vec2 coord = vUv * uScale;
      float n1 = fbm2(coord - vec2(0.0, t * 0.3));
      float n2 = fbm2(coord + vec2(0.0, t * 0.3));
      float c = n1 * n2;
      float limit = 0.28;
      float border = 0.08;
      float foamMask = step(limit - border, c) - step(limit, c);
      vec3 dark = baseCol * 0.5;
      vec3 col = mix(dark, baseCol, smoothstep(0.15, 0.3, c));
      col = mix(col, vec3(1.0), foamMask * 0.6);
      gl_FragColor = vec4(col, uOpacity);
    }
  `,
  ripple: `
    void main() {
      vec3 baseCol = (length(uColor) < 0.05) ? vec3(0.19, 0.47, 0.63) : uColor;
      float t = uTime * uSpeed;
      vec2 coord = vUv * uScale;
      float n1 = fbm2(coord * 2.0 + vec2(0.0, t * 0.5));
      float n2 = noise2d(coord + vec2(0.0, t * 1.2));
      float ripple = abs(n1 - n2 * 0.8);
      float waveCrest = smoothstep(0.0, 0.05, vUv.y - sin(vUv.x * 10.0) / 15.0 - n1 * 0.5);
      vec3 dark = baseCol * 0.5;
      vec3 col = mix(dark, baseCol, smoothstep(0.1, 0.4, ripple));
      col = mix(col, vec3(1.0), (1.0 - waveCrest) * 0.35);
      gl_FragColor = vec4(col, uOpacity);
    }
  `,
  glow: `
    void main() {
      vec3 baseCol = (length(uColor) < 0.05) ? vec3(0.0, 1.0, 1.0) : uColor;
      float edge = 1.0 + pow(abs(vUv.x - 0.5) * 2.0, 2.0) * 0.8;
      vec3 col = baseCol * 2.2 * edge;
      gl_FragColor = vec4(col, uOpacity);
    }
  `,
  shaded: `
    void main() {
      vec3 lightDir = normalize(length(uLightDirection) > 0.01 ? uLightDirection : vec3(0.5, 0.8, 1.0));
      float diff = max(dot(vNormal, lightDir), 0.0) * 0.65 + 0.35;
      vec3 viewDir = normalize(vViewPosition);
      vec3 halfDir = normalize(lightDir + viewDir);
      float spec = pow(max(dot(vNormal, halfDir), 0.0), 16.0) * 0.25;
      vec3 col = uColor * diff + vec3(spec);
      gl_FragColor = vec4(col, uOpacity);
    }
  `,
  cel_shaded: `
    void main() {
      vec3 lightDir = normalize(length(uLightDirection) > 0.01 ? uLightDirection : vec3(0.5, 0.8, 1.0));
      float d = dot(vNormal, lightDir);
      float stepVal = d > 0.35 ? 1.0 : (d > -0.15 ? 0.68 : 0.42);
      vec3 col = uColor * stepVal;
      gl_FragColor = vec4(col, uOpacity);
    }
  `,
  toon: `
    void main() {
      vec3 lightDir = normalize(length(uLightDirection) > 0.01 ? uLightDirection : vec3(0.5, 0.8, 1.0));
      float d = dot(vNormal, lightDir);
      float stepVal = d > 0.35 ? 1.0 : (d > -0.15 ? 0.68 : 0.42);
      vec3 col = uColor * stepVal;
      gl_FragColor = vec4(col, uOpacity);
    }
  `,
  flat: `
    void main() {
      gl_FragColor = vec4(uColor, uOpacity);
    }
  `,
  unlit: `
    void main() {
      gl_FragColor = vec4(uColor, uOpacity);
    }
  `,
  pencil: `
    void main() {
      float noise = noise2d(vUv * 60.0);
      float grain = smoothstep(0.1, 0.7, noise);
      vec3 col = mix(uColor * 0.3, uColor * 1.1, grain);
      gl_FragColor = vec4(col, uOpacity);
    }
  `,
  marker: `
    void main() {
      float edge = pow(abs(vUv.x - 0.5) * 2.0, 3.0);
      vec3 col = mix(uColor, uColor * 0.7, edge);
      gl_FragColor = vec4(col, uOpacity);
    }
  `,
  acrylic: `
    void main() {
      float streak = sin(vUv.x * 30.0 * 6.2831853);
      float body = smoothstep(-0.8, 0.8, streak);
      vec3 col = mix(uColor * 0.85, uColor * 1.15, body);
      gl_FragColor = vec4(col, uOpacity);
    }
  `,
  watercolor: `
    void main() {
      float edgeDist = abs(vUv.x - 0.5) * 2.0;
      float puddle = smoothstep(0.4, 0.95, edgeDist);
      vec3 col = mix(uColor * 1.1, uColor * 0.75, puddle);
      float alpha = uOpacity * smoothstep(1.0, 0.7, edgeDist);
      gl_FragColor = vec4(col, alpha);
    }
  `,
  rainbow: `
    void main() {
      float phase = vUv.y * 3.0 * 6.2831853 + uTime * 1.5;
      vec3 col = vec3(
        sin(phase) * 0.5 + 0.5,
        sin(phase + 2.094) * 0.5 + 0.5,
        sin(phase + 4.188) * 0.5 + 0.5
      );
      gl_FragColor = vec4(col, uOpacity);
    }
  `,
  stardust: `
    void main() {
      vec3 baseCol = (length(uColor) < 0.05) ? vec3(1.0, 0.84, 0.0) : uColor;
      vec2 centered = (vUv - 0.5) * 2.0;
      float dist = length(centered);
      float sparkle = pow(max(0.0, 1.0 - dist), 2.0);
      float twinkle = sin(uTime * 4.0 + hash2d(floor(vUv * 10.0)) * 6.28) * 0.3 + 0.7;
      vec3 col = baseCol * (sparkle * 3.0 * twinkle + 0.5);
      float alpha = uOpacity * smoothstep(1.0, 0.0, dist);
      gl_FragColor = vec4(col, alpha);
    }
  `,
  lava: `
    void main() {
      float t = uTime * uSpeed;
      vec2 coord = vUv * uScale;
      float n1 = fbm2(coord * 2.0 + vec2(t * 0.15, t * 0.1));
      float n2 = fbm2(coord * 3.0 - vec2(t * 0.1, t * 0.2));
      float blend = n1 * n2 * 4.0;
      vec3 hot = vec3(1.0, 0.9, 0.2);
      vec3 warm = vec3(1.0, 0.35, 0.05);
      vec3 dark = vec3(0.15, 0.02, 0.0);
      vec3 col = mix(dark, warm, smoothstep(0.15, 0.4, blend));
      col = mix(col, hot, smoothstep(0.5, 0.7, blend));
      float glow = smoothstep(0.6, 0.8, blend) * 0.4;
      col += vec3(glow, glow * 0.5, 0.0);
      gl_FragColor = vec4(col, uOpacity);
    }
  `,
  galaxy: `
    void main() {
      float t = uTime * uSpeed;
      vec2 coord = vUv * uScale;
      float n1 = fbm2(coord * 2.0 + vec2(t * 0.05, 0.0));
      float nebula = smoothstep(0.3, 0.7, n1);
      vec3 purple = vec3(0.4, 0.1, 0.7);
      vec3 blue = vec3(0.1, 0.2, 0.8);
      vec3 pink = vec3(0.8, 0.2, 0.5);
      vec3 col = mix(vec3(0.02, 0.01, 0.05), purple, nebula);
      col = mix(col, blue, smoothstep(0.5, 0.8, n1));
      col = mix(col, pink, smoothstep(0.7, 0.9, n1) * 0.5);
      vec2 starCoord = coord * 15.0;
      vec2 starCell = floor(starCoord);
      vec2 starUv = fract(starCoord) - 0.5;
      float starRnd = hash2d(starCell);
      float twinkle = pow(max(sin(t * 2.0 + starRnd * 6.2831), 0.0), 16.0);
      float star = smoothstep(0.3, 0.0, length(starUv)) * twinkle;
      col += vec3(star);
      gl_FragColor = vec4(col, uOpacity);
    }
  `,
  foliage_leaf: `
    void main() {
      vec3 baseCol = (length(uColor) < 0.05) ? vec3(0.18, 0.55, 0.34) : uColor;
      float vein = abs(vUv.x - 0.5) * 2.0;
      vec3 col = mix(baseCol * 1.15, baseCol * 0.7, vein);
      float alpha = uOpacity * smoothstep(0.95, 0.75, length((vUv - 0.5) * 2.0));
      gl_FragColor = vec4(col, alpha);
    }
  `,
  foliage_fir: `
    void main() {
      vec3 baseCol = (length(uColor) < 0.05) ? vec3(0.13, 0.55, 0.13) : uColor;
      float needleTip = vUv.y;
      vec3 col = mix(baseCol * 0.7, baseCol * 1.2, needleTip);
      gl_FragColor = vec4(col, uOpacity);
    }
  `,
  halftone: `
    void main() {
      vec3 lightDir = normalize(length(uLightDirection) > 0.01 ? uLightDirection : vec3(0.5, 0.8, 1.0));
      float lightIntensity = clamp(dot(vNormal, lightDir) * 0.5 + 0.5, 0.0, 1.0);
      float dotSpacing = 8.0 * max(0.5, uScale * 0.25);
      vec2 grid = mod(gl_FragCoord.xy, dotSpacing) - vec2(dotSpacing * 0.5);
      float dist = length(grid);
      float maxRadius = dotSpacing * 0.48;
      float targetRadius = (1.0 - lightIntensity) * maxRadius;
      float dotMask = smoothstep(targetRadius + 0.7, targetRadius - 0.7, dist);
      vec3 shadowCol = uColor * 0.3;
      vec3 col = mix(shadowCol, uColor, dotMask);
      gl_FragColor = vec4(col, uOpacity);
    }
  `,
  hatch: `
    void main() {
      vec3 lightDir = normalize(length(uLightDirection) > 0.01 ? uLightDirection : vec3(0.5, 0.8, 1.0));
      float lightIntensity = clamp(dot(vNormal, lightDir) * 0.5 + 0.5, 0.0, 1.0);
      float angle = 0.785398;
      float ry = gl_FragCoord.x * sin(angle) + gl_FragCoord.y * cos(angle);
      float lineSpacing = 7.0 * max(0.5, uScale * 0.25);
      float line = sin((ry / lineSpacing) * 6.2831853);
      float lineCut = mix(0.4, -0.6, lightIntensity);
      float pat = smoothstep(lineCut, lineCut + 0.2, line);
      vec3 col = mix(uColor * 0.3, uColor, pat);
      gl_FragColor = vec4(col, uOpacity);
    }
  `,
  crosshatch: `
    void main() {
      vec3 lightDir = normalize(length(uLightDirection) > 0.01 ? uLightDirection : vec3(0.5, 0.8, 1.0));
      float lightIntensity = clamp(dot(vNormal, lightDir) * 0.5 + 0.5, 0.0, 1.0);
      float angle = 0.785398;
      float ry = gl_FragCoord.x * sin(angle) + gl_FragCoord.y * cos(angle);
      float r2y = -gl_FragCoord.x * sin(angle) + gl_FragCoord.y * cos(angle);
      float lineSpacing = 8.0 * max(0.5, uScale * 0.25);
      float line1 = sin((ry / lineSpacing) * 6.2831853);
      float line2 = sin((r2y / lineSpacing) * 6.2831853);
      float lineCut = mix(0.4, -0.5, lightIntensity);
      float pat1 = smoothstep(lineCut, lineCut + 0.2, line1);
      float pat2 = smoothstep(lineCut, lineCut + 0.2, line2);
      float pat = min(pat1, pat2);
      vec3 col = mix(uColor * 0.25, uColor, pat);
      gl_FragColor = vec4(col, uOpacity);
    }
  `,
  stipple: `
    void main() {
      vec3 lightDir = normalize(length(uLightDirection) > 0.01 ? uLightDirection : vec3(0.5, 0.8, 1.0));
      float lightIntensity = clamp(dot(vNormal, lightDir) * 0.5 + 0.5, 0.0, 1.0);
      vec2 screenCoord = gl_FragCoord.xy * (0.8 / max(0.5, uScale * 0.2));
      float grain = hash2d(floor(screenCoord));
      float threshold = mix(0.75, 0.2, lightIntensity);
      float mask = grain > threshold ? 1.0 : 0.0;
      vec3 col = mix(uColor * 0.35, uColor * 1.05, mask);
      gl_FragColor = vec4(col, uOpacity);
    }
  `,
  terrazzo: `
    void main() {
      float v = noise2d(gl_FragCoord.xy * 0.05);
      float pat = smoothstep(0.05, 0.15, v);
      vec3 col = mix(uColor * 0.3, uColor, pat);
      gl_FragColor = vec4(col, uOpacity);
    }
  `,
  cutout: `
    void main() {
      float checker = mod(floor(gl_FragCoord.x / 12.0) + floor(gl_FragCoord.y / 12.0), 2.0);
      vec3 bg1 = vec3(0.12, 0.13, 0.16);
      vec3 bg2 = vec3(0.18, 0.19, 0.22);
      vec3 col = mix(bg1, bg2, checker);
      gl_FragColor = vec4(col, uOpacity);
    }
  `,
  cloud: `
    void main() {
      vec3 lightDir = normalize(length(uLightDirection) > 0.01 ? uLightDirection : vec3(0.5, 0.8, 1.0));
      vec3 viewDir = normalize(vViewPosition);
      float t = uTime * uSpeed * 0.5;
      
      // 3D Volumetric raymarch through cloud density
      vec3 rayStep = -viewDir * (0.1 / max(0.2, uScale));
      vec3 samplePos = vWorldPosition * (0.3 * uScale) + vec3(t * 0.05);
      
      float density = 0.0;
      float lightAcc = 0.0;
      
      for(int i = 0; i < 6; i++) {
        vec3 p = samplePos + rayStep * float(i);
        float n = fbm2(p.xy * 2.0 + p.z * 1.5) * 0.65 + noise2d(p.yz * 3.5 - t * 0.1) * 0.35;
        
        float edgeDist = abs(vUv.x - 0.5) * 2.0;
        float d = smoothstep(0.85, 0.25, edgeDist + (n - 0.5) * 0.6);
        
        // Volumetric shadow ray step toward light source
        vec3 shadowSample = p + lightDir * 0.08;
        float shadowNoise = fbm2(shadowSample.xy * 2.0 + shadowSample.z * 1.5);
        float shadow = clamp(1.0 - shadowNoise * 0.6, 0.25, 1.0);
        
        density += d * (1.0 - density) * 0.4;
        lightAcc += d * shadow * (1.0 - float(i) / 6.0) * 0.3;
      }
      
      vec3 shadowCol = uColor * 0.45 + vec3(0.06, 0.09, 0.14);
      vec3 litCol = uColor * 1.25 + vec3(0.15);
      vec3 col = mix(shadowCol, litCol, clamp(lightAcc * 2.0, 0.0, 1.0));
      
      gl_FragColor = vec4(col, density * uOpacity);
    }
  `,
  jelly: `
    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);
      vec3 lightDir = normalize(length(uLightDirection) > 0.01 ? uLightDirection : vec3(0.5, 0.8, 1.0));
      float t = uTime * uSpeed;
      
      float ndotv = max(dot(normal, viewDir), 0.0);
      float fresnel = pow(1.0 - ndotv, 2.5);
      
      // 3D Volumetric raymarch through translucent jelly volume with bubbles
      vec3 rayStep = -viewDir * (0.07 / max(0.2, uScale));
      vec3 samplePos = vWorldPosition * (0.5 * uScale);
      
      float internalGlow = 0.0;
      float bubbleMask = 0.0;
      
      for(int i = 0; i < 5; i++) {
        vec3 p = samplePos + rayStep * float(i);
        float v = voronoi(p.xy * 3.0 + vec2(t * 0.2), 0.08, 0.5, t * 0.3);
        float b = smoothstep(0.18, 0.02, v);
        bubbleMask += b * (1.0 - bubbleMask) * 0.4;
        internalGlow += (1.0 - float(i) / 5.0) * 0.25;
      }
      
      vec3 halfDir = normalize(lightDir + viewDir);
      float spec = pow(max(dot(normal, halfDir), 0.0), 32.0) * 0.7;
      float spec2 = pow(max(dot(normal, halfDir), 0.0), 8.0) * 0.25;
      
      vec3 base = (length(uColor) < 0.05) ? vec3(0.2, 0.88, 0.6) : uColor;
      vec3 innerCol = base * (0.35 + internalGlow * 0.65) + vec3(0.9, 1.0, 0.8) * bubbleMask * 0.8;
      vec3 rimCol = vec3(1.0) * fresnel * 0.6;
      vec3 col = innerCol + rimCol + vec3(spec + spec2);
      
      float alpha = uOpacity * clamp(0.35 + internalGlow * 0.45 + fresnel * 0.4 + bubbleMask * 0.2, 0.0, 1.0);
      gl_FragColor = vec4(col, alpha);
    }
  `,
  plasma: `
    void main() {
      vec3 viewDir = normalize(vViewPosition);
      float t = uTime * uSpeed * 2.5;
      vec3 base = (length(uColor) < 0.05) ? vec3(0.85, 0.2, 1.0) : uColor;
      
      // 3D Volumetric raymarch through electric charge field
      vec3 rayStep = -viewDir * (0.09 / max(0.2, uScale));
      vec3 samplePos = vWorldPosition * (0.6 * uScale);
      
      float charge = 0.0;
      float arcCore = 0.0;
      
      for(int i = 0; i < 6; i++) {
        vec3 p = samplePos + rayStep * float(i);
        vec3 coord = p * 2.0 + vec3(sin(t + p.y * 2.0) * 0.4, t, cos(t + p.x * 2.0) * 0.4);
        float n = fbm2(coord.xz * 2.5 + coord.y);
        
        float edgeDist = abs(vUv.x - 0.5) * 2.0;
        float d = pow(clamp(1.0 - edgeDist + (n - 0.5) * 0.6, 0.0, 1.0), 2.0);
        float bolt = pow(clamp(1.0 - abs(n - 0.5) * 4.0, 0.0, 1.0), 8.0);
        
        charge += d * 0.25;
        arcCore += bolt * 0.45;
      }
      
      vec3 col = mix(base * 0.4, base * 2.5, charge);
      col += vec3(1.0, 0.95, 1.0) * arcCore * 2.5;
      
      float alpha = uOpacity * clamp(charge + arcCore, 0.0, 1.0);
      gl_FragColor = vec4(col, alpha);
    }
  `,
  rim_light: `
    void main() {
      vec3 lightDir = normalize(length(uLightDirection) > 0.01 ? uLightDirection : vec3(0.5, 0.8, 1.0));
      vec3 normal = normalize(vNormal);
      vec3 view = normalize(vViewPosition);
      float ndotl = dot(normal, lightDir);
      float stepVal = ndotl > 0.35 ? 1.0 : (ndotl > -0.15 ? 0.65 : 0.38);
      vec3 shadowCol = uColor * 0.45 + vec3(0.04, 0.02, 0.08);
      vec3 diffuse = mix(shadowCol, uColor * 1.15, stepVal);
      
      float ndotv = abs(dot(view, normal));
      float rimSpread = 1.2;
      float rimThreshold = 0.32;
      float rP = dot(normalize(-normal - dot(-normal, view) * view), normalize(lightDir - dot(lightDir, view) * view));
      rP = clamp(1.0 - 1.0 / (max(0.001, rP) + rimSpread), 0.0, 1.0);
      rP *= (1.0 - ndotv) / rimThreshold;
      float rimPower = clamp(rP, 0.0, 1.0);
      float rimStep = step(0.35, rimPower);
      
      vec3 rimCol = vec3(1.0, 0.96, 0.88) * rimStep * 0.75;
      vec3 col = diffuse + rimCol;
      gl_FragColor = vec4(col, uOpacity);
    }
  `,
  anime_cel: `
    void main() {
      vec3 lightDir = normalize(length(uLightDirection) > 0.01 ? uLightDirection : vec3(0.5, 0.8, 1.0));
      vec3 normal = normalize(vNormal);
      vec3 view = normalize(vViewPosition);
      float ndotl = dot(normal, lightDir) * 0.5 + 0.5;
      
      float layers = 4.0;
      float scaled = clamp(ndotl, 0.0, 1.0) * layers;
      float band = floor(scaled);
      float f = fract(scaled);
      float w = fwidth(scaled);
      float aa = smoothstep(1.0 - w, 1.0, f);
      float toon = (band + aa) / layers;
      
      vec3 base = (length(uColor) < 0.05) ? vec3(0.95, 0.4, 0.2) : uColor;
      vec3 shadowCol = base * 0.35 + vec3(0.08, 0.02, 0.06);
      vec3 col = mix(shadowCol, base * 1.1, toon);
      
      vec3 halfDir = normalize(lightDir + view);
      float rawSpec = pow(max(dot(normal, halfDir), 0.0), 48.0);
      float sw = fwidth(rawSpec) * 2.5;
      float specMask = smoothstep(0.4 - sw, 0.4 + sw, rawSpec);
      col += vec3(1.0, 0.98, 0.92) * specMask * 0.45;
      
      gl_FragColor = vec4(col, uOpacity);
    }
  `,
  volumetric_plasma: `
    void main() {
      float t = uTime * uSpeed;
      vec3 base = (length(uColor) < 0.05) ? vec3(0.98, 0.35, 0.1) : uColor;
      vec3 p = vWorldPosition * (0.4 * uScale) + vec3(0.0, 0.0, t * 0.15);
      
      float n1 = noise2d(p.xy * 3.0 + vec2(t * 0.2, -t * 0.1));
      float n2 = noise2d(p.yz * 6.0 - vec2(t * 0.15, t * 0.25));
      float n3 = noise2d(p.zx * 12.0 + vec2(t * 0.3, t * 0.1));
      float density = n1 * 0.55 + n2 * 0.3 + n3 * 0.15;
      
      float edgeDist = abs(vUv.x - 0.5) * 2.0;
      float coreMask = pow(clamp(1.0 - edgeDist, 0.0, 1.0), 3.0);
      float absorption = clamp(density * coreMask * 2.2, 0.0, 1.0);
      
      vec3 sunCol = vec3(1.0, 0.9, 0.4);
      vec3 plasmaCol = mix(base * 0.4, base * 1.8 + sunCol * 0.5, pow(absorption, 1.25));
      vec3 col = plasmaCol + sunCol * pow(coreMask, 5.0) * 1.2;
      
      float alpha = uOpacity * clamp(absorption * 1.4 + coreMask * 0.5, 0.0, 1.0);
      gl_FragColor = vec4(col, alpha);
    }
  `,
  jelly_warp: `
    void main() {
      float t = uTime * uSpeed;
      vec3 normal = normalize(vNormal);
      vec3 view = normalize(vViewPosition);
      vec3 lightDir = normalize(length(uLightDirection) > 0.01 ? uLightDirection : vec3(0.5, 0.8, 1.0));
      
      vec2 coord = vUv * uScale * 2.0;
      coord.x += 0.08 * sin(coord.y * 5.0 + t * 2.0);
      coord.y += 0.08 * sin(coord.x * 5.0 + t * 1.6);
      
      float v = voronoi(coord, 0.05, 0.4, t * 0.4);
      float blob = smoothstep(0.4, 0.05, v);
      
      float ndotv = max(dot(normal, view), 0.0);
      float fresnel = pow(1.0 - ndotv, 2.8);
      
      vec3 base = (length(uColor) < 0.05) ? vec3(0.18, 0.82, 0.45) : uColor;
      vec3 inner = mix(base * 0.4, base * 1.2, blob);
      
      vec3 halfDir = normalize(lightDir + view);
      float spec = pow(max(dot(normal, halfDir), 0.0), 32.0);
      float sw = fwidth(spec) * 2.0;
      float specAA = smoothstep(0.35 - sw, 0.35 + sw, spec);
      
      vec3 col = inner + vec3(1.0) * fresnel * 0.55 + vec3(1.0) * specAA * 0.4;
      float alpha = uOpacity * clamp(0.4 + blob * 0.45 + fresnel * 0.35, 0.0, 1.0);
      gl_FragColor = vec4(col, alpha);
    }
  `,
  posterize_ink: `
    void main() {
      vec3 lightDir = normalize(length(uLightDirection) > 0.01 ? uLightDirection : vec3(0.5, 0.8, 1.0));
      vec3 normal = normalize(vNormal);
      vec3 view = normalize(vViewPosition);
      
      float diff = max(dot(normal, lightDir), 0.0);
      float cel = ceil(diff * 3.0) / 3.0;
      
      vec3 base = (length(uColor) < 0.05) ? vec3(0.95, 0.55, 0.15) : uColor;
      vec3 shadowCol = base * 0.35 + vec3(0.05, 0.01, 0.08);
      vec3 col = mix(shadowCol, base, cel);
      
      float ndotv = abs(dot(view, normal));
      float edge = smoothstep(0.22, 0.28, ndotv);
      col *= edge;
      
      gl_FragColor = vec4(col, uOpacity);
    }
  `
};

function _registerAnimatedMaterial(mat) {
  if (_animatedUniformsList.indexOf(mat) === -1) {
    _animatedUniformsList.push(mat);
  }
}

function _updateAnimatedMaterials() {
  if (_animatedUniformsList.length === 0) return;
  var now = performance.now() * 0.001;
  var stageSys = window._paperRocketsStage || window._stageSystem;
  var sunDir = (stageSys && stageSys.sky && stageSys.sky.uniforms && stageSys.sky.uniforms.uSunPosition) ? stageSys.sky.uniforms.uSunPosition.value : null;
  for (var i = _animatedUniformsList.length - 1; i >= 0; i--) {
    var m = _animatedUniformsList[i];
    if (!m || !m.uniforms) {
      _animatedUniformsList.splice(i, 1);
      continue;
    }
    if (m.uniforms.uTime) m.uniforms.uTime.value = now;
    if (sunDir && m.uniforms.uLightDirection) m.uniforms.uLightDirection.value.copy(sunDir);
  }
}

function getStrokeMat(color,op,flat,matType,fxScale,isModel){
  matType = matType || 'default';
  const modelSuffix = isModel ? '|m1' : '|m0';
  if(matType === 'default'){
    const key=color+'|'+op.toFixed(3)+'|'+(flat?'1':'0')+modelSuffix;
    if(_matCache.has(key))return _matCache.get(key);
    const col=new THREE.Color(color);
    const mat=new THREE.MeshBasicMaterial({
      color:col,transparent:true,opacity:op,
      side:THREE.DoubleSide,
      depthWrite: false
    });
    _matCache.set(key,mat);
    return mat;
  }
  var effectiveColor = color;
  if(DEFAULT_FX_COLORS[matType] && (!effectiveColor || effectiveColor === '#000000')){
    effectiveColor = DEFAULT_FX_COLORS[matType];
  }
  const col=new THREE.Color(effectiveColor);
  const keyShader=effectiveColor+'|'+op.toFixed(3)+'|'+(flat?'1':'0')+'|'+matType+'|'+(fxScale||1)+modelSuffix;
  if(_matCache.has(keyShader))return _matCache.get(keyShader);
  const isAnimated=(matType==='waterfall'||matType==='caustic'||matType==='foam'||matType==='ripple'||matType==='rainbow'||matType==='stardust'||matType==='lava'||matType==='galaxy'||matType==='lightning'||matType==='glitter'||matType==='candy'||matType==='slime'||matType==='sparkler'||matType==='toon'||matType==='cel_shaded'||matType==='halftone'||matType==='stipple'||matType==='hatch'||matType==='crosshatch'||matType==='shaded'||matType==='cloud'||matType==='jelly'||matType==='plasma'||matType==='rim_light'||matType==='anime_cel'||matType==='volumetric_plasma'||matType==='jelly_warp'||matType==='posterize_ink');
  const fragCode=_EFFECT_FRAG_BODIES[matType]||_EFFECT_FRAG_BODIES.waterfall;
  
  var baseScale = matType==='waterfall'?4.0:(matType==='caustic'?3.0:(matType==='foam'?5.0:(matType==='lava'?3.5:(matType==='galaxy'?2.5:(matType==='cloud'?3.0:(matType==='plasma'?2.0:(matType==='volumetric_plasma'?2.5:(matType==='jelly_warp'?2.0:4.0))))))));
  var scaleVal = (fxScale !== undefined && fxScale !== null) ? fxScale : (window._curFxScale || baseScale);
  var sunDir = new THREE.Vector3(0.5, 0.8, 1.0).normalize();
  var stageSys = window._paperRocketsStage || window._stageSystem;
  if (stageSys && stageSys.sky && stageSys.sky.uniforms && stageSys.sky.uniforms.uSunPosition) {
    sunDir = stageSys.sky.uniforms.uSunPosition.value;
  }
  var resVal = new THREE.Vector2(window.innerWidth || 1920, window.innerHeight || 1080);

  const uniforms={
    uColor:{value:col},
    uOpacity:{value:op},
    uTime:{value:0},
    uSpeed:{value:matType==='lightning'?1.8:(matType==='sparkler'?1.5:(matType==='glitter'?1.0:(matType==='slime'?0.6:(matType==='candy'?0.7:(matType==='waterfall'?1.0:(matType==='caustic'?0.8:(matType==='foam'?0.6:(matType==='lava'?0.5:(matType==='galaxy'?0.4:(matType==='plasma'?1.6:(matType==='cloud'?0.4:(matType==='volumetric_plasma'?1.2:(matType==='jelly_warp'?0.9:0.7)))))))))))))},
    uScale:{value:scaleVal},
    uLightDirection:{value:sunDir},
    uResolution:{value:resVal}
  };
  const mat=new THREE.ShaderMaterial({
    uniforms:uniforms,
    vertexShader:_EFFECT_VERT_SHADER,
    fragmentShader:_COMMON_GLSL_HEAD+'\n'+fragCode,
    transparent:true,
    side:THREE.DoubleSide,
    depthWrite:false,
    depthTest:true
  });
  mat.userData={matType:matType,isAnimated:isAnimated,baseColor:color,opacity:op,flat:flat};
  if(isAnimated){
    _registerAnimatedMaterial(mat);
  }
  _matCache.set(keyShader, mat);
  return mat;
}
function getStrokeMatForMesh(color,op,flat,matType,fxScale,isModel){return getStrokeMat(color,op,flat,matType,fxScale,isModel);}
function rebuildStrokeMaterials(){markDirty();}

// ── Stroke physics ───────────────────────────────────────────────
function computeVels(pts){
  var v=[0];
  for(var i=1;i<pts.length;i++)v.push(pts[i].distanceTo(pts[i-1]));
  // 7-point gaussian-weighted smoothing kernel [1,4,8,12,8,4,1]/38
  var s=v.slice();
  var weights=[1,4,8,12,8,4,1],half=3;
  for(var i=0;i<s.length;i++){
    var sum=0,wUsed=0;
    for(var j=-half;j<=half;j++){
      var idx=i+j;
      if(idx>=0&&idx<v.length){sum+=v[idx]*weights[j+half];wUsed+=weights[j+half];}
    }
    s[i]=sum/wUsed;
  }
  // Clamp velocity on last 3 points to avoid whipping artifact on pen lift
  var tail=Math.min(3,s.length-1);
  if(s.length>2){
    var refV=s[s.length-1-tail]||s[0];
    for(var j=s.length-tail;j<s.length;j++)s[j]=Math.min(s[j],refV*1.5);
  }
  // Also clamp first 3 points to avoid start whip
  var head=Math.min(3,s.length-1);
  if(s.length>2){
    var refVH=s[head]||s[s.length-1];
    for(var k=0;k<head;k++)s[k]=Math.min(s[k],refVH*1.5);
  }
  return s;
}

// velocityTaper: when false, uniform radius (no speed-based taper)
let velocityTaper=true;

function buildTube(pts,vels,color,sz,op,flat,matType,fxScale){
  if(pts.length<2)return null;
  const f=[pts[0]],fv=[vels[0]];
  for(let i=1;i<pts.length;i++){if(f[f.length-1].distanceTo(pts[i])>.003){f.push(pts[i]);fv.push(vels[i]);}}
  if(f.length<2)return null;
  const N=f.length;
  var maxV=0,minV=Infinity;for(var _vi=0;_vi<fv.length;_vi++){if(fv[_vi]>maxV)maxV=fv[_vi];if(fv[_vi]<minV)minV=fv[_vi];}
  if(maxV===0)maxV=1;const range=maxV-minV||1;
  const isModel = (window.surfType === 'model');
  var scaleFactor = isModel ? (typeof surfScale !== 'undefined' ? Math.max(1.0, surfScale) : 1.0) : 1.0;
  const baseR = (sz * 0.011) * (isModel ? Math.max(1.0, Math.min(8.0, scaleFactor * 0.12)) : 1.0);
  const mat=getStrokeMatForMesh(color,op,flat,matType,fxScale,isModel);
  if(mat){
    mat.polygonOffset = true;
    mat.polygonOffsetFactor = -10.0;
    mat.polygonOffsetUnits = -20.0;
    mat.depthWrite = false;
    // Stencil clip: on model surfaces, only render where model was drawn (stencil=1)
    if(isModel){
      mat.stencilWrite = true;
      mat.stencilWriteMask = 0x00;
      mat.stencilRef = 1;
      mat.stencilFunc = THREE.EqualStencilFunc;
    }
    mat.needsUpdate = true;
  }
  var pos=[],norms=[],idx=[],uvs=[];
  var ac=typeof activeCam === 'function' ? activeCam() : camera;
  var camPos=ac ? ac.position : new THREE.Vector3(0,0,10);

  // ── Unified ribbon: CatmullRomCurve3 + camera-facing orientation ──
  // Same approach for model and flat plane surfaces.
  var curve = new THREE.CatmullRomCurve3(f);
  var segs = Math.max(N*4, 24);
  var groupNorm = (typeof surfGroup !== 'undefined' && surfGroup) ? new THREE.Vector3(0,0,1).applyQuaternion(surfGroup.quaternion) : new THREE.Vector3(0,0,1);
  var prevTang = curve.getTangent(0).normalize();
  var prevUp = new THREE.Vector3().copy(groupNorm);
  if(f[0] && f[0].normal) prevUp.copy(f[0].normal);
  var initSide = new THREE.Vector3().crossVectors(prevTang, prevUp);
  if(initSide.lengthSq() < 0.001){
    prevUp.set(0,1,0);
    if(Math.abs(prevTang.y) > 0.9) prevUp.set(1,0,0);
    initSide.crossVectors(prevTang, prevUp);
  }
  initSide.normalize();
  prevUp.crossVectors(initSide, prevTang).normalize();
  var radSegs = isModel ? 4 : 1;
  for(var ri = 0; ri <= segs; ri++){
    var rt = ri / segs;
    var rIdx = Math.min(Math.floor(rt * (N-1)), N-1);
    var rVn = velocityTaper ? (fv[rIdx] - minV) / range * 0.75 : 0;
    var rTipTaper = rt < 0.05 ? Math.sin((rt / 0.05) * (Math.PI / 2)) : rt > 0.95 ? Math.sin(((1 - rt) / 0.05) * (Math.PI / 2)) : 1.0;
    var rVw = (1 - rVn * 0.5) * rTipTaper;
    var rW = baseR * (isModel ? (thinPaint ? 1.4 : 2.2) : (thinPaint ? 4.0 : 3.0)) * rVw * (window._brushWidthMult || 1);
    var rPt = curve.getPoint(rt);
    var rTang = curve.getTangent(rt).normalize();
    // Parallel transport
    var rAxis = new THREE.Vector3().crossVectors(prevTang, rTang);
    if(rAxis.lengthSq() > 1e-7){
      var rAngle = Math.asin(Math.max(-1, Math.min(1, rAxis.length())));
      rAxis.normalize();
      prevUp.applyAxisAngle(rAxis, rAngle);
    }
    // Guide toward surface normal
    if(isModel && f[rIdx] && f[rIdx].normal){
      prevUp.copy(f[rIdx].normal).normalize();
    } else if(f[rIdx] && f[rIdx].normal){
      var rSn = f[rIdx].normal;
      if(rSn.dot(prevUp) < 0) rSn = rSn.clone().negate();
      prevUp.lerp(rSn, 0.25).normalize();
    }
    var rSide = new THREE.Vector3().crossVectors(rTang, prevUp).normalize();
    if(rSide.lengthSq() < 0.001){
      rSide.set(1,0,0);
      if(Math.abs(rTang.x) > 0.9) rSide.set(0,1,0);
      rSide.crossVectors(rTang, rSide).normalize();
    }
    var rUp = new THREE.Vector3().crossVectors(rSide, rTang).normalize();
    if(!isModel && ri === 0){
      var rToCam = new THREE.Vector3().subVectors(camPos, rPt).normalize();
      if(rUp.dot(rToCam) < 0) { rUp.negate(); rSide.negate(); }
    }
    prevTang.copy(rTang);
    prevUp.copy(rUp);
    var rSo = Math.max(0.004, baseR * (isModel ? 0.02 : 0.08));

    if(isModel){
      var _tubeRC = new THREE.Raycaster();
      var _rayOrigin = new THREE.Vector3();
      var _rayDir = new THREE.Vector3();
      var _normMat = (typeof surfMesh !== 'undefined' && surfMesh) ? new THREE.Matrix3().getNormalMatrix(surfMesh.matrixWorld) : null;
      var _sm = typeof surfMesh !== 'undefined' ? surfMesh : null;

      // Conformal arched paint bead: curves over the surface with rounded dome cross-section
      for(var si = 0; si <= radSegs; si++){
        var u = (si / radSegs) * 2.0 - 1.0;
        var arch = Math.sqrt(Math.max(0.0, 1.0 - u * u));
        var height = rSo + rW * 0.18 * arch;
        var widthOff = u * rW;

        var vx = rPt.x + rSide.x * widthOff;
        var vy = rPt.y + rSide.y * widthOff;
        var vz = rPt.z + rSide.z * widthOff;

        var fx = vx + rUp.x * height;
        var fy = vy + rUp.y * height;
        var fz = vz + rUp.z * height;

        // Magnetic surface conform: test if vertex can snap to actual mesh surface
        if(_sm && Math.abs(u) > 0.05){
          _rayOrigin.set(vx + rUp.x * (rW + 0.04), vy + rUp.y * (rW + 0.04), vz + rUp.z * (rW + 0.04));
          _rayDir.copy(rUp).negate();
          _tubeRC.set(_rayOrigin, _rayDir);
          _tubeRC.far = (rW + 0.04) * 2.5;
          var hList = _tubeRC.intersectObject(_sm, false);
          if(hList.length > 0){
            var h0 = hList[0];
            var hNorm = (h0.face && h0.face.normal && _normMat) ? h0.face.normal.clone().applyMatrix3(_normMat).normalize() : rUp;
            fx = h0.point.x + hNorm.x * height;
            fy = h0.point.y + hNorm.y * height;
            fz = h0.point.z + hNorm.z * height;
          } else {
            // Overhanging off the silhouette: clamp down to edge at rPt rather than protruding into space
            var clampFrac = 0.35;
            fx = rPt.x + rSide.x * (widthOff * clampFrac) + rUp.x * rSo;
            fy = rPt.y + rSide.y * (widthOff * clampFrac) + rUp.y * rSo;
            fz = rPt.z + rSide.z * (widthOff * clampFrac) + rUp.z * rSo;
          }
        }

        pos.push(fx, fy, fz);
        var nX = rSide.x * u * 0.6 + rUp.x * (arch + 0.4);
        var nY = rSide.y * u * 0.6 + rUp.y * (arch + 0.4);
        var nZ = rSide.z * u * 0.6 + rUp.z * (arch + 0.4);
        var nLen = Math.hypot(nX, nY, nZ) || 1;
        norms.push(nX / nLen, nY / nLen, nZ / nLen);
        uvs.push(si / radSegs, rt);
      }
    } else {
      // Flat ribbon on 2D plane
      pos.push(
        rPt.x + rSide.x * rW + rUp.x * rSo, rPt.y + rSide.y * rW + rUp.y * rSo, rPt.z + rSide.z * rW + rUp.z * rSo,
        rPt.x - rSide.x * rW + rUp.x * rSo, rPt.y - rSide.y * rW + rUp.y * rSo, rPt.z - rSide.z * rW + rUp.z * rSo
      );
      var rUn = rUp.toArray(); norms.push(rUn[0],rUn[1],rUn[2],rUn[0],rUn[1],rUn[2]);
      uvs.push(1, rt, 0, rt);
    }
  }
  var ringVerts = radSegs + 1;
  for(var rj = 0; rj < segs; rj++){
    for(var si = 0; si < radSegs; si++){
      var a = rj * ringVerts + si;
      var b = (rj + 1) * ringVerts + si;
      var c = rj * ringVerts + si + 1;
      var d = (rj + 1) * ringVerts + si + 1;
      idx.push(a, b, c, c, b, d);
    }
  }
  var geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(norms, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(idx); geo.computeVertexNormals();
  var m = new THREE.Mesh(geo, mat); m.renderOrder = 5; m.userData.radSeg = 4; return m;
}

// ── End cap: sphere at start & end, matching full stroke radius ──
function buildCap(pt,color,sz,op,matType,fxScale){
  const isModel = (window.surfType === 'model');
  var scaleFactor = isModel ? (typeof surfScale !== 'undefined' ? Math.max(1.0, surfScale) : 1.0) : 1.0;
  const baseR = (sz * 0.011) * (isModel ? Math.max(1.0, Math.min(8.0, scaleFactor * 0.12)) : 1.0);
  const mat=getStrokeMatForMesh(color,op,false,matType,fxScale,isModel);
  if(mat){
    mat.polygonOffset = true;
    mat.polygonOffsetFactor = -10.0;
    mat.polygonOffsetUnits = -20.0;
    mat.depthWrite = false;
    if(isModel){
      mat.stencilWrite = true;
      mat.stencilWriteMask = 0x00;
      mat.stencilRef = 1;
      mat.stencilFunc = THREE.EqualStencilFunc;
    }
    mat.needsUpdate = true;
  }
  const m=new THREE.Mesh(new THREE.SphereGeometry(baseR,8,6),mat);
  m.position.copy(pt);m.renderOrder=5;return m;
}

// ── State ────────────────────────────────────────────────────────
let mode='draw',flatBrush=true,thinPaint=false;
var _partialErase=false; // false=whole-line erase (default), true=partial erase (split)
let prevDrawMode='draw'; // tracks last draw/erase/select mode for returning from nav modes
let curColor='#000000',brushSz=1,brushOp=.95;
let isDrawing=false,rawPts=[],smoothPts=[],velHistory=[],lazyPos=null;
const LAZY_ON=.18,LAZY_OFF=1.0;let smoothingOn=false,LAZY=LAZY_OFF;

// Layers
// Layers declared below in layer system section

// Strokes + undo/redo
const strokes=[],redoStack=[];

function addStroke(s){scene.add(s.mesh);strokes.push(s);redoStack.length=0;_redoStack.length=0;markDirty();}

var _UNDO_MAX=100;

window.strokes = strokes;
window.redoStack = redoStack;
window.addStroke = addStroke;
window.buildTube = buildTube;
window.buildCap = buildCap;
window.computeVels = computeVels;
window.getStrokeMat = getStrokeMat;
window.getStrokeMatForMesh = getStrokeMatForMesh;
window._updateAnimatedMaterials = _updateAnimatedMaterials;