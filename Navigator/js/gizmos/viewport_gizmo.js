/**
 * 3D Viewport Navigation Gizmo for Three.js (ES Module)
 * 
 * Provides interactive viewport navigation including:
 * - 3D Coordinate Axis Gimbal Mode (X, Y, Z, -X, -Y, -Z pins with labels and orbit rings)
 * - 3D ViewCube Mode (26 interactive facets: 6 faces, 12 beveled edges, 8 isometric corners)
 * - Hybrid Mode (ViewCube with coordinate axis stems)
 * - Drag-to-orbit directly on the gizmo
 * - Smooth camera slerp and easeInOut transitions to any standard or custom view
 * - High-DPI crisp rendering via WebGL scissor overlay or standalone overlay canvas
 * - Full theme, size, and placement customization
 */

import * as THREE from 'three';

// --- Easing Functions ---
export function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

// --- Preset Theme Definitions ---
export const THEMES = {
  dark: {
    xColor: '#ef4444',
    negXColor: '#7f1d1d',
    yColor: '#22c55e',
    negYColor: '#14532d',
    zColor: '#3b82f6',
    negZColor: '#1e3a8a',
    cubeFace: '#1e293b',
    cubeFaceHover: '#0284c7',
    cubeEdge: '#334155',
    cubeEdgeHover: '#38bdf8',
    cubeCorner: '#475569',
    cubeCornerHover: '#7dd3fc',
    textColor: '#ffffff',
    textHoverColor: '#ffffff',
    ringColor: 'rgba(255, 255, 255, 0.14)',
    pivotColor: '#94a3b8',
    background: 'rgba(15, 23, 42, 0.75)',
    compassText: '#64748b'
  },
  light: {
    xColor: '#dc2626',
    negXColor: '#fca5a5',
    yColor: '#16a34a',
    negYColor: '#86efac',
    zColor: '#2563eb',
    negZColor: '#93c5fd',
    cubeFace: '#f1f5f9',
    cubeFaceHover: '#38bdf8',
    cubeEdge: '#cbd5e1',
    cubeEdgeHover: '#0284c7',
    cubeCorner: '#94a3b8',
    cubeCornerHover: '#0369a1',
    textColor: '#0f172a',
    textHoverColor: '#ffffff',
    ringColor: 'rgba(0, 0, 0, 0.12)',
    pivotColor: '#64748b',
    background: 'rgba(255, 255, 255, 0.85)',
    compassText: '#94a3b8'
  },
  cyber: {
    xColor: '#ff0055',
    negXColor: '#80002b',
    yColor: '#00ff66',
    negYColor: '#006629',
    zColor: '#00f0ff',
    negZColor: '#006066',
    cubeFace: '#0a0e17',
    cubeFaceHover: '#00f0ff',
    cubeEdge: '#162238',
    cubeEdgeHover: '#ff0055',
    cubeCorner: '#243b5e',
    cubeCornerHover: '#00ff66',
    textColor: '#00f0ff',
    textHoverColor: '#000000',
    ringColor: 'rgba(0, 240, 255, 0.25)',
    pivotColor: '#00f0ff',
    background: 'rgba(6, 10, 19, 0.9)',
    compassText: '#00f0ff'
  },
  studio: {
    xColor: '#f59e0b',
    negXColor: '#78350f',
    yColor: '#10b981',
    negYColor: '#064e3b',
    zColor: '#6366f1',
    negZColor: '#312e81',
    cubeFace: '#262626',
    cubeFaceHover: '#f59e0b',
    cubeEdge: '#404040',
    cubeEdgeHover: '#fbbf24',
    cubeCorner: '#525252',
    cubeCornerHover: '#fde68a',
    textColor: '#fafafa',
    textHoverColor: '#171717',
    ringColor: 'rgba(245, 158, 11, 0.2)',
    pivotColor: '#d4d4d4',
    background: 'rgba(23, 23, 23, 0.85)',
    compassText: '#a3a3a3'
  }
};

// --- Dynamic Canvas Texture Generator for Text & Labels ---
function createTextCanvasTexture(text, options = {}) {
  const size = options.size || 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  const bgColor = options.bgColor || 'transparent';
  const textColor = options.textColor || '#ffffff';
  const font = options.font || 'bold 100px Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif';
  const borderColor = options.borderColor || null;
  const borderWidth = options.borderWidth || 0;
  const cornerRadius = options.cornerRadius || 0;

  // Background
  if (bgColor !== 'transparent') {
    ctx.fillStyle = bgColor;
    if (cornerRadius > 0) {
      ctx.beginPath();
      ctx.roundRect(4, 4, size - 8, size - 8, cornerRadius);
      ctx.fill();
    } else {
      ctx.fillRect(0, 0, size, size);
    }
  }

  // Border
  if (borderColor && borderWidth > 0) {
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth;
    if (cornerRadius > 0) {
      ctx.beginPath();
      ctx.roundRect(borderWidth / 2, borderWidth / 2, size - borderWidth, size - borderWidth, cornerRadius);
      ctx.stroke();
    } else {
      ctx.strokeRect(borderWidth / 2, borderWidth / 2, size - borderWidth, size - borderWidth);
    }
  }

  // Text
  ctx.fillStyle = textColor;
  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, size / 2, size / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return { texture, canvas, ctx };
}

// --- ViewportGizmo Class ---
export class ViewportGizmo {
  constructor(camera, renderer, options = {}) {
    this.mainCamera = camera;
    this.mainRenderer = renderer;
    this.domElement = renderer ? renderer.domElement : (options.domElement || document.body);

    // Options
    this.mode = options.mode || 'axes'; // 'axes' | 'cube' | 'hybrid'
    this.placement = options.placement || 'top-right'; // 'top-right', 'top-left', 'bottom-right', 'bottom-left'
    this.size = options.size || 128;
    this.offset = options.offset || { x: 16, y: 16 };
    this.animationDuration = options.animationDuration !== undefined ? options.animationDuration : 350;
    this.target = options.target || new THREE.Vector3(0, 0, 0);
    this.controls = options.controls || null;
    this.dragSpeed = options.dragSpeed || 1.8;
    this.interactive = options.interactive !== undefined ? options.interactive : true;

    // Theme setup
    const themeKey = typeof options.theme === 'string' ? options.theme : 'dark';
    this.theme = Object.assign({}, THEMES[themeKey] || THEMES.dark, typeof options.theme === 'object' ? options.theme : {});

    // Gizmo internal scene and camera
    this.gizmoScene = new THREE.Scene();
    this.gizmoCamera = new THREE.OrthographicCamera(-1.8, 1.8, 1.8, -1.8, 0.1, 50);
    this.gizmoCamera.position.set(0, 0, 4);

    // Internal groups
    this.axesGroup = new THREE.Group();
    this.cubeGroup = new THREE.Group();
    this.gizmoScene.add(this.axesGroup);
    this.gizmoScene.add(this.cubeGroup);

    // Lights for gizmo scene
    this._initLights();

    // Raycasting & Interaction State
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.hoveredObject = null;
    this.isDragging = false;
    this.dragMoved = false;
    this.dragStartPos = { x: 0, y: 0 };
    this.dragPrevPos = { x: 0, y: 0 };

    // Camera animation state
    this.animating = false;
    this.animStartTime = 0;
    this.animStartPos = new THREE.Vector3();
    this.animEndPos = new THREE.Vector3();
    this.animStartUp = new THREE.Vector3();
    this.animEndUp = new THREE.Vector3();
    this.animStartTarget = new THREE.Vector3();
    this.animEndTarget = new THREE.Vector3();
    this.animDistance = 10;
    this.animActiveView = null;

    // Callbacks
    this._listeners = {};

    // Build geometry
    this._buildAxes();
    this._buildCube();
    this.setMode(this.mode);

    // Bind event listeners
    this._onPointerDown = this._onPointerDown.bind(this);
    this._onPointerMove = this._onPointerMove.bind(this);
    this._onPointerUp = this._onPointerUp.bind(this);
    this._onPointerCancel = this._onPointerCancel.bind(this);
    this._onDoubleClick = this._onDoubleClick.bind(this);

    if (this.domElement && this.interactive) {
      this.domElement.addEventListener('pointerdown', this._onPointerDown, { passive: false });
      this.domElement.addEventListener('pointermove', this._onPointerMove, { passive: false });
      this.domElement.addEventListener('pointerup', this._onPointerUp, { passive: false });
      this.domElement.addEventListener('pointercancel', this._onPointerCancel, { passive: false });
      this.domElement.addEventListener('dblclick', this._onDoubleClick, { passive: false });
    }
  }

  // --- Lighting Setup ---
  _initLights() {
    const ambient = new THREE.AmbientLight(0xffffff, 1.1);
    this.gizmoScene.add(ambient);

    const dir1 = new THREE.DirectionalLight(0xffffff, 1.4);
    dir1.position.set(3, 4, 5);
    this.gizmoScene.add(dir1);

    const dir2 = new THREE.DirectionalLight(0xffffff, 0.6);
    dir2.position.set(-3, -2, -3);
    this.gizmoScene.add(dir2);
  }

  // --- Build Coordinate Axis Gimbal ---
  _buildAxes() {
    while (this.axesGroup.children.length > 0) {
      const child = this.axesGroup.children[0];
      this.axesGroup.remove(child);
    }

    const axisLength = 1.15;
    const headRadius = 0.22;
    const stalkRadius = 0.038;

    const axesConfig = [
      { name: 'right', label: 'X', dir: new THREE.Vector3(1, 0, 0), color: this.theme.xColor, isPositive: true },
      { name: 'left', label: '-X', dir: new THREE.Vector3(-1, 0, 0), color: this.theme.negXColor, isPositive: false },
      { name: 'top', label: 'Y', dir: new THREE.Vector3(0, 1, 0), color: this.theme.yColor, isPositive: true },
      { name: 'bottom', label: '-Y', dir: new THREE.Vector3(0, -1, 0), color: this.theme.negYColor, isPositive: false },
      { name: 'front', label: 'Z', dir: new THREE.Vector3(0, 0, 1), color: this.theme.zColor, isPositive: true },
      { name: 'back', label: '-Z', dir: new THREE.Vector3(0, 0, -1), color: this.theme.negZColor, isPositive: false }
    ];

    // Center pivot sphere
    const pivotGeo = new THREE.SphereGeometry(0.14, 24, 24);
    const pivotMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(this.theme.pivotColor),
      roughness: 0.3,
      metalness: 0.5
    });
    const pivotMesh = new THREE.Mesh(pivotGeo, pivotMat);
    pivotMesh.userData = { isPivot: true, snapView: 'iso-front-right' };
    this.axesGroup.add(pivotMesh);

    // Orbit Ring / Gimbal halo
    const ringGeo = new THREE.TorusGeometry(axisLength * 1.05, 0.015, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(this.theme.ringColor),
      transparent: true,
      opacity: 0.5
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    this.axesGroup.add(ringMesh);

    axesConfig.forEach((cfg) => {
      const stalkGeo = new THREE.CylinderGeometry(stalkRadius, stalkRadius, axisLength, 16);
      const stalkMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(cfg.color),
        transparent: true,
        opacity: cfg.isPositive ? 0.95 : 0.4
      });
      const stalkMesh = new THREE.Mesh(stalkGeo, stalkMat);

      // Orient stalk along direction vector
      const midpoint = cfg.dir.clone().multiplyScalar(axisLength / 2);
      stalkMesh.position.copy(midpoint);
      stalkMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), cfg.dir);
      this.axesGroup.add(stalkMesh);

      // Head Bubble / Sphere
      const bubbleRadius = cfg.isPositive ? headRadius : headRadius * 0.72;
      const headGeo = new THREE.SphereGeometry(bubbleRadius, 28, 28);

      let headMat;
      if (cfg.isPositive) {
        const textTex = createTextCanvasTexture(cfg.label, {
          size: 128,
          textColor: '#ffffff',
          font: '900 78px Inter, sans-serif'
        });
        headMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(cfg.color),
          roughness: 0.25,
          metalness: 0.35,
          map: textTex.texture
        });
      } else {
        headMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(cfg.color),
          roughness: 0.4,
          metalness: 0.3,
          transparent: true,
          opacity: 0.5
        });
      }

      const headMesh = new THREE.Mesh(headGeo, headMat);
      headMesh.position.copy(cfg.dir.clone().multiplyScalar(axisLength));
      headMesh.userData = {
        isAxis: true,
        axisConfig: cfg,
        snapView: cfg.name,
        baseColor: cfg.color,
        baseScale: 1.0
      };

      this.axesGroup.add(headMesh);
    });
  }

  // --- Build 26-Facet ViewCube ---
  _buildCube() {
    while (this.cubeGroup.children.length > 0) {
      const child = this.cubeGroup.children[0];
      this.cubeGroup.remove(child);
    }

    const cubeSize = 1.35;
    const half = cubeSize / 2;
    const edgeWidth = 0.24;
    const cornerSize = 0.24;

    // 1. Six Primary Faces
    const facesConfig = [
      { name: 'right', label: 'RIGHT', dir: new THREE.Vector3(1, 0, 0), rot: [0, Math.PI / 2, 0] },
      { name: 'left', label: 'LEFT', dir: new THREE.Vector3(-1, 0, 0), rot: [0, -Math.PI / 2, 0] },
      { name: 'top', label: 'TOP', dir: new THREE.Vector3(0, 1, 0), rot: [-Math.PI / 2, 0, 0] },
      { name: 'bottom', label: 'BOTTOM', dir: new THREE.Vector3(0, -1, 0), rot: [Math.PI / 2, 0, 0] },
      { name: 'front', label: 'FRONT', dir: new THREE.Vector3(0, 0, 1), rot: [0, 0, 0] },
      { name: 'back', label: 'BACK', dir: new THREE.Vector3(0, 0, -1), rot: [0, Math.PI, 0] }
    ];

    facesConfig.forEach((fc) => {
      const faceTex = createTextCanvasTexture(fc.label, {
        size: 256,
        bgColor: this.theme.cubeFace,
        textColor: this.theme.textColor,
        borderColor: this.theme.cubeEdge,
        borderWidth: 8,
        font: '800 48px Inter, -apple-system, sans-serif'
      });

      const faceGeo = new THREE.PlaneGeometry(cubeSize - edgeWidth * 1.8, cubeSize - edgeWidth * 1.8);
      const faceMat = new THREE.MeshStandardMaterial({
        map: faceTex.texture,
        roughness: 0.35,
        metalness: 0.15,
        side: THREE.DoubleSide
      });

      const faceMesh = new THREE.Mesh(faceGeo, faceMat);
      faceMesh.position.copy(fc.dir.clone().multiplyScalar(half + 0.005));
      faceMesh.rotation.set(fc.rot[0], fc.rot[1], fc.rot[2]);
      faceMesh.userData = {
        isCubeFacet: true,
        facetType: 'face',
        snapView: fc.name,
        baseColor: this.theme.cubeFace,
        hoverColor: this.theme.cubeFaceHover,
        canvasData: faceTex,
        label: fc.label
      };

      this.cubeGroup.add(faceMesh);
    });

    // 2. Twelve Edges (Chamfer Bevels)
    const edgesConfig = [
      // Top 4 edges
      { name: 'top-front', dir: new THREE.Vector3(0, 1, 1).normalize(), pos: [0, half, half], size: [cubeSize - edgeWidth * 2, edgeWidth * 0.9, edgeWidth * 0.9], rot: [Math.PI / 4, 0, 0] },
      { name: 'top-back', dir: new THREE.Vector3(0, 1, -1).normalize(), pos: [0, half, -half], size: [cubeSize - edgeWidth * 2, edgeWidth * 0.9, edgeWidth * 0.9], rot: [-Math.PI / 4, 0, 0] },
      { name: 'top-right', dir: new THREE.Vector3(1, 1, 0).normalize(), pos: [half, half, 0], size: [edgeWidth * 0.9, edgeWidth * 0.9, cubeSize - edgeWidth * 2], rot: [0, 0, -Math.PI / 4] },
      { name: 'top-left', dir: new THREE.Vector3(-1, 1, 0).normalize(), pos: [-half, half, 0], size: [edgeWidth * 0.9, edgeWidth * 0.9, cubeSize - edgeWidth * 2], rot: [0, 0, Math.PI / 4] },
      // Bottom 4 edges
      { name: 'bottom-front', dir: new THREE.Vector3(0, -1, 1).normalize(), pos: [0, -half, half], size: [cubeSize - edgeWidth * 2, edgeWidth * 0.9, edgeWidth * 0.9], rot: [-Math.PI / 4, 0, 0] },
      { name: 'bottom-back', dir: new THREE.Vector3(0, -1, -1).normalize(), pos: [0, -half, -half], size: [cubeSize - edgeWidth * 2, edgeWidth * 0.9, edgeWidth * 0.9], rot: [Math.PI / 4, 0, 0] },
      { name: 'bottom-right', dir: new THREE.Vector3(1, -1, 0).normalize(), pos: [half, -half, 0], size: [edgeWidth * 0.9, edgeWidth * 0.9, cubeSize - edgeWidth * 2], rot: [0, 0, Math.PI / 4] },
      { name: 'bottom-left', dir: new THREE.Vector3(-1, -1, 0).normalize(), pos: [-half, -half, 0], size: [edgeWidth * 0.9, edgeWidth * 0.9, cubeSize - edgeWidth * 2], rot: [0, 0, -Math.PI / 4] },
      // Vertical 4 edges
      { name: 'front-right', dir: new THREE.Vector3(1, 0, 1).normalize(), pos: [half, 0, half], size: [edgeWidth * 0.9, cubeSize - edgeWidth * 2, edgeWidth * 0.9], rot: [0, Math.PI / 4, 0] },
      { name: 'front-left', dir: new THREE.Vector3(-1, 0, 1).normalize(), pos: [-half, 0, half], size: [edgeWidth * 0.9, cubeSize - edgeWidth * 2, edgeWidth * 0.9], rot: [0, -Math.PI / 4, 0] },
      { name: 'back-right', dir: new THREE.Vector3(1, 0, -1).normalize(), pos: [half, 0, -half], size: [edgeWidth * 0.9, cubeSize - edgeWidth * 2, edgeWidth * 0.9], rot: [0, -Math.PI / 4, 0] },
      { name: 'back-left', dir: new THREE.Vector3(-1, 0, -1).normalize(), pos: [-half, 0, -half], size: [edgeWidth * 0.9, cubeSize - edgeWidth * 2, edgeWidth * 0.9], rot: [0, Math.PI / 4, 0] }
    ];

    edgesConfig.forEach((ed) => {
      const edgeGeo = new THREE.BoxGeometry(ed.size[0], ed.size[1], ed.size[2]);
      const edgeMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(this.theme.cubeEdge),
        roughness: 0.4,
        metalness: 0.2
      });

      const edgeMesh = new THREE.Mesh(edgeGeo, edgeMat);
      edgeMesh.position.set(ed.pos[0], ed.pos[1], ed.pos[2]);
      edgeMesh.rotation.set(ed.rot[0], ed.rot[1], ed.rot[2]);
      edgeMesh.userData = {
        isCubeFacet: true,
        facetType: 'edge',
        snapView: ed.name,
        baseColor: this.theme.cubeEdge,
        hoverColor: this.theme.cubeEdgeHover
      };

      this.cubeGroup.add(edgeMesh);
    });

    // 3. Eight Corner Vertices (Triangular / Cube Octants)
    const cornersConfig = [
      { name: 'iso-top-front-right', dir: new THREE.Vector3(1, 1, 1).normalize(), pos: [half, half, half] },
      { name: 'iso-top-front-left', dir: new THREE.Vector3(-1, 1, 1).normalize(), pos: [-half, half, half] },
      { name: 'iso-top-back-right', dir: new THREE.Vector3(1, 1, -1).normalize(), pos: [half, half, -half] },
      { name: 'iso-top-back-left', dir: new THREE.Vector3(-1, 1, -1).normalize(), pos: [-half, half, -half] },
      { name: 'iso-bottom-front-right', dir: new THREE.Vector3(1, -1, 1).normalize(), pos: [half, -half, half] },
      { name: 'iso-bottom-front-left', dir: new THREE.Vector3(-1, -1, 1).normalize(), pos: [-half, -half, half] },
      { name: 'iso-bottom-back-right', dir: new THREE.Vector3(1, -1, -1).normalize(), pos: [half, -half, -half] },
      { name: 'iso-bottom-back-left', dir: new THREE.Vector3(-1, -1, -1).normalize(), pos: [-half, -half, -half] }
    ];

    cornersConfig.forEach((cr) => {
      const cornerGeo = new THREE.BoxGeometry(cornerSize * 0.95, cornerSize * 0.95, cornerSize * 0.95);
      const cornerMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(this.theme.cubeCorner),
        roughness: 0.35,
        metalness: 0.25
      });

      const cornerMesh = new THREE.Mesh(cornerGeo, cornerMat);
      cornerMesh.position.set(cr.pos[0], cr.pos[1], cr.pos[2]);
      cornerMesh.userData = {
        isCubeFacet: true,
        facetType: 'corner',
        snapView: cr.name,
        baseColor: this.theme.cubeCorner,
        hoverColor: this.theme.cubeCornerHover
      };

      this.cubeGroup.add(cornerMesh);
    });

    // Inner Core Mesh (fills inner volume)
    const innerGeo = new THREE.BoxGeometry(cubeSize * 0.98, cubeSize * 0.98, cubeSize * 0.98);
    const innerMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    this.cubeGroup.add(innerMesh);
  }

  // --- Display Mode Toggle ---
  setMode(mode) {
    this.mode = mode || 'axes';
    if (this.mode === 'axes') {
      this.axesGroup.visible = true;
      this.cubeGroup.visible = false;
    } else if (this.mode === 'cube') {
      this.axesGroup.visible = false;
      this.cubeGroup.visible = true;
    } else if (this.mode === 'hybrid') {
      this.axesGroup.visible = true;
      this.cubeGroup.visible = true;
    }
  }

  // --- Theme Setter ---
  setTheme(theme) {
    if (typeof theme === 'string' && THEMES[theme]) {
      this.theme = Object.assign({}, THEMES[theme]);
    } else if (typeof theme === 'object') {
      this.theme = Object.assign({}, this.theme, theme);
    }
    this._buildAxes();
    this._buildCube();
    this.setMode(this.mode);
  }

  // --- Viewport Bounds Calculation ---
  getViewportRect() {
    const elem = this.domElement;
    const width = elem.clientWidth || window.innerWidth;
    const height = elem.clientHeight || window.innerHeight;
    const size = this.size;
    const offsetX = this.offset.x;
    const offsetY = this.offset.y;

    let x = 0;
    let y = 0;

    switch (this.placement) {
      case 'top-left':
        x = offsetX;
        y = height - size - offsetY;
        break;
      case 'bottom-left':
        x = offsetX;
        y = offsetY;
        break;
      case 'bottom-right':
        x = width - size - offsetX;
        y = offsetY;
        break;
      case 'top-right':
      default:
        x = width - size - offsetX;
        y = height - size - offsetY;
        break;
    }

    return { x, y, width: size, height: size, screenHeight: height, screenWidth: width };
  }

  // --- Normalized Pointer Coordinates relative to Gizmo Viewport ---
  _getGizmoPointerNdc(event) {
    const rect = this.domElement.getBoundingClientRect();
    const clientX = event.clientX !== undefined ? event.clientX : (event.touches ? event.touches[0].clientX : 0);
    const clientY = event.clientY !== undefined ? event.clientY : (event.touches ? event.touches[0].clientY : 0);

    const elemX = clientX - rect.left;
    const elemY = clientY - rect.top;

    const vp = this.getViewportRect();
    // Convert WebGL scissor Y (bottom-up) to DOM Y (top-down)
    const domVpY = vp.screenHeight - vp.y - vp.height;

    if (
      elemX >= vp.x &&
      elemX <= vp.x + vp.width &&
      elemY >= domVpY &&
      elemY <= domVpY + vp.height
    ) {
      const ndcX = ((elemX - vp.x) / vp.width) * 2 - 1;
      const ndcY = -(((elemY - domVpY) / vp.height) * 2 - 1);
      return { inside: true, x: ndcX, y: ndcY, clientX, clientY };
    }

    return { inside: false, x: 0, y: 0, clientX, clientY };
  }

  // --- Interaction Event Listeners ---
  _onPointerDown(event) {
    const p = this._getGizmoPointerNdc(event);
    if (!p.inside) return;

    event.stopPropagation();
    this.isDragging = true;
    this.dragMoved = false;
    this.dragStartPos = { x: p.clientX, y: p.clientY };
    this.dragPrevPos = { x: p.clientX, y: p.clientY };

    if (this.controls) {
      this.controls.enabled = false;
    }

    try {
      this.domElement.setPointerCapture(event.pointerId);
    } catch (e) {}

    this._emit('dragstart', { event });
  }

  _onPointerMove(event) {
    const p = this._getGizmoPointerNdc(event);

    if (this.isDragging) {
      event.stopPropagation();
      const dx = p.clientX - this.dragPrevPos.x;
      const dy = p.clientY - this.dragPrevPos.y;

      if (Math.hypot(p.clientX - this.dragStartPos.x, p.clientY - this.dragStartPos.y) > 3) {
        this.dragMoved = true;
      }

      this.dragPrevPos = { x: p.clientX, y: p.clientY };
      this._orbitCamera(dx, dy);
      return;
    }

    if (p.inside) {
      this.mouse.set(p.x, p.y);
      this.raycaster.setFromCamera(this.mouse, this.gizmoCamera);

      const activeGroup = this.mode === 'cube' ? this.cubeGroup : this.axesGroup;
      const intersects = this.raycaster.intersectObjects(activeGroup.children, true);

      let hitInteractive = null;
      for (let i = 0; i < intersects.length; i++) {
        const obj = intersects[i].object;
        if (obj.userData && (obj.userData.isAxis || obj.userData.isCubeFacet || obj.userData.isPivot)) {
          hitInteractive = obj;
          break;
        }
      }

      this._setHoveredObject(hitInteractive);
      this.domElement.style.cursor = hitInteractive ? 'pointer' : 'default';
    } else {
      if (this.hoveredObject) {
        this._setHoveredObject(null);
        this.domElement.style.cursor = 'default';
      }
    }
  }

  _onPointerUp(event) {
    if (!this.isDragging) return;

    const p = this._getGizmoPointerNdc(event);
    if (!this.dragMoved && this.hoveredObject && this.hoveredObject.userData.snapView) {
      this.snapView(this.hoveredObject.userData.snapView);
    }

    this.isDragging = false;
    if (this.controls) {
      this.controls.enabled = true;
    }

    try {
      this.domElement.releasePointerCapture(event.pointerId);
    } catch (e) {}

    this._emit('dragend', { event });
  }

  _onPointerCancel(event) {
    this.isDragging = false;
    if (this.controls) {
      this.controls.enabled = true;
    }
  }

  _onDoubleClick(event) {
    const p = this._getGizmoPointerNdc(event);
    if (p.inside) {
      event.stopPropagation();
      this.snapView('iso-front-right');
    }
  }

  // --- Hover Highlighting State ---
  _setHoveredObject(obj) {
    if (this.hoveredObject === obj) return;

    // Reset previous hovered object
    if (this.hoveredObject) {
      const prevData = this.hoveredObject.userData;
      if (prevData.isAxis) {
        this.hoveredObject.scale.set(1, 1, 1);
        if (this.hoveredObject.material && this.hoveredObject.material.color) {
          this.hoveredObject.material.color.set(prevData.baseColor);
        }
      } else if (prevData.isCubeFacet) {
        if (prevData.facetType === 'face' && prevData.canvasData) {
          const origTex = createTextCanvasTexture(prevData.label, {
            size: 256,
            bgColor: this.theme.cubeFace,
            textColor: this.theme.textColor,
            borderColor: this.theme.cubeEdge,
            borderWidth: 8,
            font: '800 48px Inter, -apple-system, sans-serif'
          });
          this.hoveredObject.material.map = origTex.texture;
          this.hoveredObject.material.needsUpdate = true;
        } else if (this.hoveredObject.material && this.hoveredObject.material.color) {
          this.hoveredObject.material.color.set(prevData.baseColor);
        }
      }
    }

    this.hoveredObject = obj;

    // Apply hover styling to new object
    if (this.hoveredObject) {
      const nextData = this.hoveredObject.userData;
      if (nextData.isAxis) {
        this.hoveredObject.scale.set(1.22, 1.22, 1.22);
      } else if (nextData.isCubeFacet) {
        if (nextData.facetType === 'face' && nextData.canvasData) {
          const hovTex = createTextCanvasTexture(nextData.label, {
            size: 256,
            bgColor: nextData.hoverColor,
            textColor: this.theme.textHoverColor,
            borderColor: '#ffffff',
            borderWidth: 10,
            font: '900 48px Inter, -apple-system, sans-serif'
          });
          this.hoveredObject.material.map = hovTex.texture;
          this.hoveredObject.material.needsUpdate = true;
        } else if (this.hoveredObject.material && this.hoveredObject.material.color) {
          this.hoveredObject.material.color.set(nextData.hoverColor);
        }
      }
      this._emit('hover', { viewName: nextData.snapView, object: this.hoveredObject });
    } else {
      this._emit('hover', { viewName: null, object: null });
    }
  }

  // --- Orbit Camera Direct Drag Interaction ---
  _orbitCamera(dx, dy) {
    const target = typeof this.target === 'function' ? this.target() : (this.controls ? this.controls.target : this.target);
    const offset = this.mainCamera.position.clone().sub(target);

    const spherical = new THREE.Spherical();
    spherical.setFromVector3(offset);

    const speed = (this.dragSpeed * 0.0065);
    spherical.theta -= dx * speed;
    spherical.phi -= dy * speed;

    // Prevent flipping over poles
    const eps = 0.0001;
    spherical.phi = Math.max(eps, Math.min(Math.PI - eps, spherical.phi));

    offset.setFromSpherical(spherical);
    this.mainCamera.position.copy(target).add(offset);
    this.mainCamera.lookAt(target);

    if (this.controls && typeof this.controls.update === 'function') {
      this.controls.update();
    }

    this._emit('change', { orientation: spherical, camera: this.mainCamera });
  }

  // --- Camera Snap View Logic ---
  getViewOrientation(viewName) {
    const dir = new THREE.Vector3(0, 0, 1);
    const up = new THREE.Vector3(0, 1, 0);

    switch (viewName) {
      // Primary orthogonal faces
      case 'front':
        dir.set(0, 0, 1);
        up.set(0, 1, 0);
        break;
      case 'back':
        dir.set(0, 0, -1);
        up.set(0, 1, 0);
        break;
      case 'top':
        dir.set(0, 1, 0);
        up.set(0, 0, -1);
        break;
      case 'bottom':
        dir.set(0, -1, 0);
        up.set(0, 0, 1);
        break;
      case 'right':
        dir.set(1, 0, 0);
        up.set(0, 1, 0);
        break;
      case 'left':
        dir.set(-1, 0, 0);
        up.set(0, 1, 0);
        break;

      // 12 Bevel Edges (45 deg)
      case 'top-front':
        dir.set(0, 1, 1).normalize();
        up.set(0, 1, -1).normalize();
        break;
      case 'top-back':
        dir.set(0, 1, -1).normalize();
        up.set(0, 1, 1).normalize();
        break;
      case 'top-right':
        dir.set(1, 1, 0).normalize();
        up.set(-1, 1, 0).normalize();
        break;
      case 'top-left':
        dir.set(-1, 1, 0).normalize();
        up.set(1, 1, 0).normalize();
        break;
      case 'bottom-front':
        dir.set(0, -1, 1).normalize();
        up.set(0, 1, 1).normalize();
        break;
      case 'bottom-back':
        dir.set(0, -1, -1).normalize();
        up.set(0, 1, -1).normalize();
        break;
      case 'bottom-right':
        dir.set(1, -1, 0).normalize();
        up.set(-1, -1, 0).normalize();
        break;
      case 'bottom-left':
        dir.set(-1, -1, 0).normalize();
        up.set(1, -1, 0).normalize();
        break;
      case 'front-right':
        dir.set(1, 0, 1).normalize();
        up.set(0, 1, 0);
        break;
      case 'front-left':
        dir.set(-1, 0, 1).normalize();
        up.set(0, 1, 0);
        break;
      case 'back-right':
        dir.set(1, 0, -1).normalize();
        up.set(0, 1, 0);
        break;
      case 'back-left':
        dir.set(-1, 0, -1).normalize();
        up.set(0, 1, 0);
        break;

      // 8 Isometric Corners
      case 'iso':
      case 'iso-top-front-right':
      case 'iso-front-right':
        dir.set(1, 1, 1).normalize();
        up.set(0, 1, 0);
        break;
      case 'iso-top-front-left':
      case 'iso-front-left':
        dir.set(-1, 1, 1).normalize();
        up.set(0, 1, 0);
        break;
      case 'iso-top-back-right':
      case 'iso-back-right':
        dir.set(1, 1, -1).normalize();
        up.set(0, 1, 0);
        break;
      case 'iso-top-back-left':
      case 'iso-back-left':
        dir.set(-1, 1, -1).normalize();
        up.set(0, 1, 0);
        break;
      case 'iso-bottom-front-right':
        dir.set(1, -1, 1).normalize();
        up.set(0, 1, 0);
        break;
      case 'iso-bottom-front-left':
        dir.set(-1, -1, 1).normalize();
        up.set(0, 1, 0);
        break;
      case 'iso-bottom-back-right':
        dir.set(1, -1, -1).normalize();
        up.set(0, 1, 0);
        break;
      case 'iso-bottom-back-left':
        dir.set(-1, -1, -1).normalize();
        up.set(0, 1, 0);
        break;
      default:
        dir.set(0, 0, 1);
        up.set(0, 1, 0);
        break;
    }

    return { direction: dir, up };
  }

  snapView(viewName, animated = true) {
    const target = typeof this.target === 'function' ? this.target() : (this.controls ? this.controls.target : this.target);
    const orientation = this.getViewOrientation(viewName);

    let currentDist = this.mainCamera.position.distanceTo(target);
    if (currentDist < 0.001) currentDist = 10;

    const targetPos = target.clone().add(orientation.direction.clone().multiplyScalar(currentDist));

    if (!animated || this.animationDuration <= 0) {
      this.mainCamera.position.copy(targetPos);
      this.mainCamera.up.copy(orientation.up);
      this.mainCamera.lookAt(target);
      if (this.controls && typeof this.controls.update === 'function') {
        this.controls.update();
      }
      this._emit('snap', { viewName });
      return;
    }

    // Initialize smooth animated slerp
    this.animating = true;
    this.animStartTime = performance.now();
    this.animStartPos.copy(this.mainCamera.position);
    this.animEndPos.copy(targetPos);
    this.animStartUp.copy(this.mainCamera.up);
    this.animEndUp.copy(orientation.up);
    this.animStartTarget.copy(target);
    this.animEndTarget.copy(target);
    this.animDistance = currentDist;
    this.animActiveView = viewName;

    this._emit('snapstart', { viewName });
  }

  // --- Animation Stepping ---
  update(delta) {
    if (!this.animating) return;

    const now = performance.now();
    const elapsed = now - this.animStartTime;
    const t = Math.min(1.0, elapsed / this.animationDuration);
    const ease = easeInOutCubic(t);

    const target = this.animEndTarget;

    // Slerp position around focus target
    const startDir = this.animStartPos.clone().sub(target).normalize();
    const endDir = this.animEndPos.clone().sub(target).normalize();

    const qStart = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), startDir);
    const qEnd = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), endDir);
    const qCurrent = qStart.clone().slerp(qEnd, ease);

    const curDir = new THREE.Vector3(0, 0, 1).applyQuaternion(qCurrent).normalize();
    this.mainCamera.position.copy(target).add(curDir.multiplyScalar(this.animDistance));

    // Interpolate camera up vector
    this.mainCamera.up.lerpVectors(this.animStartUp, this.animEndUp, ease).normalize();
    this.mainCamera.lookAt(target);

    if (this.controls && typeof this.controls.update === 'function') {
      this.controls.update();
    }

    if (t >= 1.0) {
      this.animating = false;
      this.mainCamera.position.copy(this.animEndPos);
      this.mainCamera.up.copy(this.animEndUp);
      this.mainCamera.lookAt(target);
      this._emit('snapend', { viewName: this.animActiveView });
    }
  }

  // --- Render Pass ---
  render() {
    if (!this.mainRenderer || !this.mainCamera) return;

    // Step animation if in progress
    this.update();

    const target = typeof this.target === 'function' ? this.target() : (this.controls ? this.controls.target : this.target);
    const renderer = this.mainRenderer;
    const vp = this.getViewportRect();

    // Orient gizmo camera to match main scene camera rotation
    const offset = this.mainCamera.position.clone().sub(target).normalize();
    this.gizmoCamera.position.copy(offset.multiplyScalar(3.6));
    this.gizmoCamera.up.copy(this.mainCamera.up);
    this.gizmoCamera.lookAt(0, 0, 0);

    // Render WebGL scissor overlay
    const prevAutoClear = renderer.autoClear;
    renderer.autoClear = false;
    renderer.clearDepth();

    const pixelRatio = renderer.getPixelRatio();
    const scX = Math.floor(vp.x * pixelRatio);
    const scY = Math.floor(vp.y * pixelRatio);
    const scW = Math.floor(vp.width * pixelRatio);
    const scH = Math.floor(vp.height * pixelRatio);

    renderer.setViewport(scX, scY, scW, scH);
    renderer.setScissor(scX, scY, scW, scH);
    renderer.setScissorTest(true);

    renderer.render(this.gizmoScene, this.gizmoCamera);

    renderer.setScissorTest(false);
    renderer.setViewport(0, 0, Math.floor(vp.screenWidth * pixelRatio), Math.floor(vp.screenHeight * pixelRatio));
    renderer.autoClear = prevAutoClear;
  }

  // --- Event Handling ---
  addEventListener(type, listener) {
    if (!this._listeners[type]) this._listeners[type] = [];
    this._listeners[type].push(listener);
  }

  removeEventListener(type, listener) {
    if (!this._listeners[type]) return;
    const index = this._listeners[type].indexOf(listener);
    if (index !== -1) this._listeners[type].splice(index, 1);
  }

  _emit(type, data) {
    if (!this._listeners[type]) return;
    const list = this._listeners[type].slice();
    for (let i = 0; i < list.length; i++) {
      list[i].call(this, data);
    }
  }

  // --- Dispose Cleanup ---
  dispose() {
    if (this.domElement) {
      this.domElement.removeEventListener('pointerdown', this._onPointerDown);
      this.domElement.removeEventListener('pointermove', this._onPointerMove);
      this.domElement.removeEventListener('pointerup', this._onPointerUp);
      this.domElement.removeEventListener('pointercancel', this._onPointerCancel);
      this.domElement.removeEventListener('dblclick', this._onDoubleClick);
    }
    this._listeners = {};
  }
}

// Global browser window export fallback
if (typeof window !== 'undefined') {
  window.ViewportGizmo = ViewportGizmo;
  window.ViewportGizmoThemes = THEMES;
}
