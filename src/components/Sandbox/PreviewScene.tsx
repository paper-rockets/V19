/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { SandboxNavState, SandboxTheme } from './types';
import { getQualityProfile, resolvePixelRatio } from '../../utils/deviceProfile';

interface PreviewSceneProps {
  navState: SandboxNavState;
  theme: SandboxTheme;
  className?: string;
}

export const PreviewScene: React.FC<PreviewSceneProps> = ({
  navState,
  theme,
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | THREE.OrthographicCamera | null>(null);
  const persCameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const orthoCameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const targetGroupRef = useRef<THREE.Group | null>(null);
  const gridHelperRef = useRef<THREE.GridHelper | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Cinematic studio background (deep graphite infinite cyc)
    scene.background = new THREE.Color(0x0e1014);

    // Function to calculate and apply camera framing so drawing pane is never cut off
    const applyFraming = (persCam: THREE.PerspectiveCamera, orthoCam: THREE.OrthographicCamera, w: number, h: number) => {
      const currentAspect = w / h;

      // Drawing pane dimensions are 4.2 x 2.7. We want at least 5.2 horizontal width and 3.8 vertical height
      const targetWidth = 5.2;
      const targetHeight = 3.8;
      const vFovRad = (persCam.fov * Math.PI) / 180;
      const halfTan = Math.tan(vFovRad / 2);

      const distV = (targetHeight / 2) / halfTan;
      const distH = (targetWidth / 2) / (halfTan * currentAspect);
      const requiredDist = Math.max(7.6, distV, distH);

      // On portrait mobile, shift lookAt target upward so pane floats above the bottom dial
      const targetCenterY = currentAspect < 1.0 ? 0.7 : 0.05;
      const camY = currentAspect < 1.0 ? targetCenterY + requiredDist * 0.12 : 1.4;

      persCam.aspect = currentAspect;
      persCam.position.set(0, camY, requiredDist);
      persCam.lookAt(0, targetCenterY, 0);
      persCam.updateProjectionMatrix();

      // Orthographic camera frustum
      const orthoVSize = currentAspect < 1.0 ? targetWidth / currentAspect : 4.6;
      orthoCam.left = (-orthoVSize * currentAspect) / 2;
      orthoCam.right = (orthoVSize * currentAspect) / 2;
      orthoCam.top = orthoVSize / 2 + (currentAspect < 1.0 ? targetCenterY : 0);
      orthoCam.bottom = -orthoVSize / 2 + (currentAspect < 1.0 ? targetCenterY : 0);
      orthoCam.position.set(0, camY, requiredDist);
      orthoCam.lookAt(0, targetCenterY, 0);
      orthoCam.updateProjectionMatrix();
    };

    // Perspective Camera
    const persCamera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    persCameraRef.current = persCamera;

    // Orthographic Camera for 2D/Flat toggle
    const orthoCamera = new THREE.OrthographicCamera(-2.3, 2.3, 2.3, -2.3, 0.1, 1000);
    orthoCameraRef.current = orthoCamera;

    applyFraming(persCamera, orthoCamera, width, height);

    cameraRef.current = navState.projection === 'orthographic' ? orthoCamera : persCamera;

    const profile = getQualityProfile();
    const renderer = new THREE.WebGLRenderer({
      antialias: profile.antialias,
      alpha: false,
      powerPreference: 'high-performance',
      precision: profile.precision,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(resolvePixelRatio(profile));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // Studio Ground Plane with Soft Contact Shadow
    const groundGeo = new THREE.PlaneGeometry(30, 30);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x0c0e12,
      roughness: 0.85,
      metalness: 0.1,
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -1.35;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // Soft Rectangular Contact Shadow beneath the drawing pane
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const ctx = shadowCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(128, 128, 20, 128, 128, 120);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.65)');
      grad.addColorStop(0.6, 'rgba(0, 0, 0, 0.25)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 256);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const contactShadowGeo = new THREE.PlaneGeometry(5.2, 3.4);
    const contactShadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
    });
    const contactShadow = new THREE.Mesh(contactShadowGeo, contactShadowMat);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = -1.34;
    scene.add(contactShadow);

    // Subtle Architectural Grid Floor
    const grid = new THREE.GridHelper(18, 36, 0x1f242e, 0x14171f);
    grid.position.y = -1.33;
    grid.visible = navState.floorGridActive ?? true;
    scene.add(grid);
    gridHelperRef.current = grid;

    // Master Studio Three-Point Lighting
    // 1. Warm Soft Key Light
    const keyLight = new THREE.DirectionalLight(0xfff8ee, 2.0);
    keyLight.position.set(5.5, 7.5, 6.0);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 25;
    keyLight.shadow.camera.left = -3;
    keyLight.shadow.camera.right = 3;
    keyLight.shadow.camera.top = 3;
    keyLight.shadow.camera.bottom = -3;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.radius = 2.5;
    scene.add(keyLight);

    // 2. Cool Soft Fill Light
    const fillLight = new THREE.DirectionalLight(0x768fae, 0.65);
    fillLight.position.set(-6.5, 2.5, -3.5);
    scene.add(fillLight);

    // 3. Top Rim / Kicker Light
    const rimLight = new THREE.DirectionalLight(0xe2e8f0, 1.2);
    rimLight.position.set(0, 6.0, -6.5);
    scene.add(rimLight);

    // 4. Ambient Base
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Target Group for the 3D Drawing Pane
    const targetGroup = new THREE.Group();
    scene.add(targetGroup);
    targetGroupRef.current = targetGroup;

    // Build Tactile 3D Drawing Pane (Sheet / Canvas)
    buildDrawingPane(targetGroup);

    // Ultra-faint background studio sketch curves
    buildStudioSketchContours(scene);

    // Render loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (navState.turntableActive && targetGroupRef.current) {
        targetGroupRef.current.rotation.y += 0.006;
      }

      const activeCamera = cameraRef.current || persCamera;
      renderer.render(scene, activeCamera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;

      applyFraming(persCamera, orthoCamera, w, h);
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [theme]);

  // Update camera projection mode
  useEffect(() => {
    if (navState.projection === 'orthographic') {
      cameraRef.current = orthoCameraRef.current;
    } else {
      cameraRef.current = persCameraRef.current;
    }
  }, [navState.projection]);

  // Update floor grid visibility
  useEffect(() => {
    if (gridHelperRef.current) {
      gridHelperRef.current.visible = navState.floorGridActive ?? true;
    }
  }, [navState.floorGridActive]);

  // Update object transform
  useEffect(() => {
    if (!targetGroupRef.current) return;
    const target = targetGroupRef.current;

    target.position.x = navState.x * 0.02;
    target.position.y = navState.y * 0.02;
    target.position.z = navState.z * 0.02;

    if (!navState.turntableActive) {
      target.rotation.x = (navState.pitch * Math.PI) / 180;
      target.rotation.y = (navState.yaw * Math.PI) / 180;
      target.rotation.z = (navState.roll * Math.PI) / 180;
    }

    const s = Math.max(0.1, navState.scale);
    target.scale.set(s, s, s);
  }, [navState]);

  return (
    <div className={`relative w-full h-full overflow-hidden select-none ${className}`}>
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
};

/**
 * Tactile 3D Drawing Canvas Sheet (Drawing Pane)
 * Replaces the 3D helmet model with an architectural drafting sheet / canvas
 * in 3D perspective space matching PaperRockets Drawing Canvas mode.
 */
function buildDrawingPane(parent: THREE.Group) {
  const paneGroup = new THREE.Group();
  parent.add(paneGroup);

  const w = 4.2;
  const h = 2.7;
  const r = 0.14;

  // 1. Extruded Rounded Sheet Geometry with Chamfered Edges
  const shape = new THREE.Shape();
  shape.moveTo(-w / 2 + r, -h / 2);
  shape.lineTo(w / 2 - r, -h / 2);
  shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
  shape.lineTo(w / 2, h / 2 - r);
  shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
  shape.lineTo(-w / 2 + r, h/2);
  shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
  shape.lineTo(-w / 2, -h / 2 + r);
  shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);

  const extrudeSettings = {
    depth: 0.045,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: 0.018,
    bevelThickness: 0.018,
  };
  const paneGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  paneGeo.center();

  // 2. High-Resolution Dynamic Canvas Texture (2048 x 1316)
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1316;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // A. Warm Graphite / Slate Drafting Surface
    const grad = ctx.createLinearGradient(0, 0, 0, 1316);
    grad.addColorStop(0, '#1c1f26');
    grad.addColorStop(1, '#14161c');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 2048, 1316);

    // B. Subtle Inset Margin Guide Line
    ctx.strokeStyle = '#2d3340';
    ctx.lineWidth = 2;
    ctx.strokeRect(48, 48, 2048 - 96, 1316 - 96);

    // C. Fine Architectural Drafting Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    const step = 48;
    for (let x = 48; x < 2048 - 48; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 48);
      ctx.lineTo(x, 1316 - 48);
      ctx.stroke();
    }
    for (let y = 48; y < 1316 - 48; y += step) {
      ctx.beginPath();
      ctx.moveTo(48, y);
      ctx.lineTo(2048 - 48, y);
      ctx.stroke();
    }

    // D. Corner Crop Crosshairs (+)
    const drawCross = (cx: number, cy: number) => {
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx - 16, cy);
      ctx.lineTo(cx + 16, cy);
      ctx.moveTo(cx, cy - 16);
      ctx.lineTo(cx, cy + 16);
      ctx.stroke();
    };
    drawCross(68, 68);
    drawCross(2048 - 68, 68);
    drawCross(68, 1316 - 68);
    drawCross(2048 - 68, 1316 - 68);

    // E. Elegant Aerodynamic Concept Ink Sketch (Active vector illustration)
    ctx.strokeStyle = '#38bdf8'; // Precision cyan
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Main fuselage contour
    ctx.beginPath();
    ctx.moveTo(480, 658);
    ctx.bezierCurveTo(720, 520, 1180, 500, 1560, 658);
    ctx.stroke();

    // Upper canopy / spine
    ctx.beginPath();
    ctx.moveTo(680, 620);
    ctx.bezierCurveTo(920, 440, 1260, 460, 1480, 640);
    ctx.stroke();

    // Delta wing swept contour
    ctx.strokeStyle = 'rgba(241, 245, 249, 0.85)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(880, 600);
    ctx.lineTo(1120, 840);
    ctx.lineTo(1380, 650);
    ctx.stroke();

    // Dimension guide line
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(480, 720);
    ctx.lineTo(1560, 720);
    ctx.stroke();
    ctx.setLineDash([]);

    // Dimension label
    ctx.fillStyle = '#94a3b8';
    ctx.font = '22px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('◄  SPAN: 1840 MM  ►', 1020, 755);

    // F. Masthead Typography on the Sheet
    ctx.font = '20px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText('PAPERROCKETS · DRAWING CANVAS 01', 72, 88);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#64748b';
    ctx.fillText('3840 × 2400 · 16:10 · DRAFTING SHEET', 2048 - 72, 88);

    // G. Footer Metadata on the Sheet
    ctx.textAlign = 'left';
    ctx.fillStyle = '#64748b';
    ctx.font = '18px "JetBrains Mono", monospace';
    ctx.fillText('LAYER 01: INK DRAFT · PRESSURE: ACTIVE', 72, 1316 - 72);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('● SPATIAL ORIENTATION: LINKED TO GIMBAL', 2048 - 72, 1316 - 72);
  }

  const canvasTexture = new THREE.CanvasTexture(canvas);
  canvasTexture.generateMipmaps = true;
  canvasTexture.minFilter = THREE.LinearMipmapLinearFilter;

  // Front Face Material (Tactile matte paper surface)
  const frontMat = new THREE.MeshStandardMaterial({
    map: canvasTexture,
    roughness: 0.5,
    metalness: 0.04,
  });

  // Frame and Backing Material (Anodized graphite tablet frame)
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x181a20,
    roughness: 0.32,
    metalness: 0.5,
  });

  const paneMesh = new THREE.Mesh(paneGeo, [frontMat, frameMat]);
  paneMesh.castShadow = true;
  paneMesh.receiveShadow = true;
  paneGroup.add(paneMesh);

  // Balanced eye-level offset
  paneGroup.position.set(0, 0.15, 0);
}

/**
 * Ultra-faint architectural contour sketch lines in the background
 * evoking a luxury industrial design studio drafting board.
 */
function buildStudioSketchContours(scene: THREE.Scene) {
  const sketchGroup = new THREE.Group();
  scene.add(sketchGroup);

  const lineMat = new THREE.LineBasicMaterial({
    color: 0x94a3b8,
    transparent: true,
    opacity: 0.07,
    linewidth: 1,
  });

  // Top-left draft curve
  const points1: THREE.Vector3[] = [];
  for (let i = 0; i <= 48; i++) {
    const t = (i / 48) * Math.PI * 2;
    const x = Math.sin(t) * 2.2 + Math.sin(t * 2) * 0.3;
    const y = Math.cos(t) * 1.2 + Math.sin(t * 3) * 0.12;
    points1.push(new THREE.Vector3(x, y, 0));
  }
  const line1 = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(points1), lineMat);
  line1.position.set(-2.6, 1.8, -2.8);
  line1.scale.set(0.85, 0.85, 0.85);
  sketchGroup.add(line1);

  // Top-right draft curve
  const points2: THREE.Vector3[] = [];
  for (let i = 0; i <= 48; i++) {
    const t = (i / 48) * Math.PI * 2;
    const x = Math.sin(t) * 1.8;
    const y = Math.cos(t) * 0.8;
    points2.push(new THREE.Vector3(x, y, 0));
  }
  const line2 = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(points2), lineMat);
  line2.position.set(2.4, 2.2, -3.2);
  line2.rotation.z = -0.25;
  sketchGroup.add(line2);
}
