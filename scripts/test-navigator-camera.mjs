import assert from 'node:assert/strict';
import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

// The shader registry reads viewport size at import time. These tests exercise
// the real camera methods without constructing a renderer or a browser scene.
globalThis.window = { innerWidth: 1280, innerHeight: 720, addEventListener() {} };
// Asset preloading is unrelated to camera input and needs a browser URL.
const preload = DRACOLoader.prototype.preload;
DRACOLoader.prototype.preload = function () { return this; };
const { StudioEngine } = await import('../src/core/studioEngine.ts');
DRACOLoader.prototype.preload = preload;

function cameraFixture() {
  const engine = Object.create(StudioEngine.prototype);
  Object.assign(engine, {
    navigatorSensitivity: 1,
    cameraSpherical: new THREE.Spherical(4, 1.2, 0.8),
    targetSpherical: new THREE.Spherical(4, 1.2, 0.8),
    cameraTarget: new THREE.Vector3(),
    targetPosition: new THREE.Vector3(),
    camera: new THREE.PerspectiveCamera(),
    markDirty() { this.dirty = true; },
  });
  return engine;
}

function near(actual, expected) {
  assert.ok(Math.abs(actual - expected) < 1e-10, `${actual} != ${expected}`);
}

const direct = cameraFixture();
direct.orbitNavigator(20, 10);
near(direct.cameraSpherical.theta, 0.4);
near(direct.cameraSpherical.phi, 1);
assert.equal(direct.dirty, true);
direct.updateCameraPosition();
const releasedPosition = direct.camera.position.clone();
for (let frame = 0; frame < 120; frame++) direct.updateCameraPosition();
near(direct.camera.position.distanceTo(releasedPosition), 0);
near(direct.cameraSpherical.radius, 4);

// Grabbing an unfinished snap starts at the visible angle, not its future target.
const interrupted = cameraFixture();
interrupted.targetSpherical.theta = 2.5;
interrupted.targetSpherical.phi = 0.1;
interrupted.orbitNavigator(5, 0);
near(interrupted.cameraSpherical.theta, 0.7);
near(interrupted.targetSpherical.theta, 0.7);
near(interrupted.cameraSpherical.phi, 1.2);

// Tiny samples and one large sample must produce the same movement.
const sampled = cameraFixture();
for (let i = 0; i < 20; i++) sampled.orbitNavigator(1, 0.5);
near(sampled.cameraSpherical.theta, direct.cameraSpherical.theta);
near(sampled.cameraSpherical.phi, direct.cameraSpherical.phi);
sampled.orbitNavigator(-20, -10);
near(sampled.cameraSpherical.theta, 0.8);
near(sampled.cameraSpherical.phi, 1.2);

const limits = cameraFixture();
limits.orbitNavigator(0, 10000);
near(limits.cameraSpherical.phi, 0.01);
limits.orbitNavigator(0, -10000);
near(limits.cameraSpherical.phi, Math.PI - 0.01);

const precise = cameraFixture();
precise.setNavigatorSensitivity(0.5);
precise.orbitNavigator(20 * 0.25, 0);
near(precise.cameraSpherical.theta, 0.75);

// Viewport orbit and preset transitions retain their existing smoothing.
const viewport = cameraFixture();
viewport.orbit(20, 10);
near(viewport.cameraSpherical.theta, 0.8);
assert.notEqual(viewport.targetSpherical.theta, viewport.cameraSpherical.theta);
viewport.updateCameraPosition();
assert.ok(viewport.cameraSpherical.theta > viewport.targetSpherical.theta);
console.log('Camera checks passed: direct response, no release drift, interrupted snap, event-rate independence, reversal, pole limits, sensitivity, and viewport smoothing.');
