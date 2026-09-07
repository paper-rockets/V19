// Volumetric Stroke Geometry Generator
// Supports 4 distinct geometric profiles:
// - Tube: 360-degree cylindrical 3D mesh with spherical end-caps (equal volume from all angles)
// - Ribbon: Flat tape-like cross-section aligned with drawing surface / plane
// - Marker / Chisel: Asymmetric rectangular profile with calligraphic angle variation
// - Conformal: Arched dome cross-section snapped to surface curvature
// Includes real-time Stylus Pressure Dynamics & Catmull-Rom resampling.

(function(window) {
  'use strict';

  function ConformalBeadGenerator() {
    this.raycaster = new THREE.Raycaster();
  }

  ConformalBeadGenerator.prototype.generateGeometry = function(rawPoints, settings, targetMeshes) {
    targetMeshes = targetMeshes || [];
    if (!rawPoints || rawPoints.length === 0) {
      return new THREE.BufferGeometry();
    }

    // Filter micro-jitter
    var filteredPoints = [rawPoints[0]];
    for (var i = 1; i < rawPoints.length; i++) {
      var prev = filteredPoints[filteredPoints.length - 1];
      var curr = rawPoints[i];
      if (prev.position.distanceTo(curr.position) > 0.0008) {
        filteredPoints.push(curr);
      }
    }

    var profile = settings.profile || 'conformal';

    // Handle single dab
    if (filteredPoints.length === 1) {
      return this.generateDabGeometry(filteredPoints[0], settings, profile, targetMeshes);
    }

    // Interpolate points along centripetal Catmull-Rom curve with surface snapping
    var resampled = this.resampleCurve(filteredPoints, settings.size, targetMeshes);
    var positions = resampled.positions;
    var normals = resampled.normals;
    var pressures = resampled.pressures;
    var numPoints = positions.length;

    if (numPoints < 2) {
      return this.generateDabGeometry(filteredPoints[0], settings, profile, targetMeshes);
    }

    var cumulativeDistances = [0];
    var totalLength = 0;
    for (var j = 1; j < numPoints; j++) {
      totalLength += positions[j].distanceTo(positions[j - 1]);
      cumulativeDistances.push(totalLength);
    }

    var baseOffset = settings.surfaceOffset !== undefined ? settings.surfaceOffset : 0.003;
    var taperLength = Math.max(0.01, settings.taperLength !== undefined ? settings.taperLength : 0.05);

    var tangents = [];
    var binormals = [];

    for (var k = 0; k < numPoints; k++) {
      var normal = normals[k].clone().normalize();
      var tangent = new THREE.Vector3();

      if (k === 0) {
        tangent.subVectors(positions[1], positions[0]);
      } else if (k === numPoints - 1) {
        tangent.subVectors(positions[numPoints - 1], positions[numPoints - 2]);
      } else {
        tangent.subVectors(positions[k + 1], positions[k - 1]);
      }

      if (tangent.lengthSq() < 1e-6) {
        tangent.set(1, 0, 0);
      } else {
        tangent.normalize();
      }

      var binormal = new THREE.Vector3().crossVectors(tangent, normal);
      if (binormal.lengthSq() < 1e-6) {
        binormal.crossVectors(normal, new THREE.Vector3(0, 1, 0));
        if (binormal.lengthSq() < 1e-6) {
          binormal.crossVectors(normal, new THREE.Vector3(1, 0, 0));
        }
      }
      binormal.normalize();
      tangent.crossVectors(normal, binormal).normalize();

      tangents.push(tangent);
      binormals.push(binormal);
    }

    switch (profile) {
      case 'tube':
        return this.buildTubeGeometry(positions, normals, binormals, tangents, pressures, cumulativeDistances, totalLength, settings, baseOffset, taperLength);
      case 'ribbon':
        return this.buildRibbonGeometry(positions, normals, binormals, tangents, pressures, cumulativeDistances, totalLength, settings, baseOffset, taperLength);
      case 'marker':
        return this.buildMarkerGeometry(positions, normals, binormals, tangents, pressures, cumulativeDistances, totalLength, settings, baseOffset, taperLength);
      case 'conformal':
      default:
        return this.buildConformalGeometry(positions, normals, binormals, tangents, pressures, cumulativeDistances, totalLength, settings, targetMeshes, baseOffset, taperLength);
    }
  };

  ConformalBeadGenerator.prototype.buildTubeGeometry = function(positions, normals, binormals, tangents, pressures, cumulativeDistances, totalLength, settings, baseOffset, taperLength) {
    var numPoints = positions.length;
    var radialSegments = 12;
    var vertices = [];
    var geomNormals = [];
    var uvs = [];
    var indices = [];

    for (var i = 0; i < numPoints; i++) {
      var pos = positions[i];
      var normal = normals[i];
      var binormal = binormals[i];
      var t = totalLength > 0 ? cumulativeDistances[i] / totalLength : i / (numPoints - 1);

      var taper = 1.0;
      if (t < taperLength) {
        taper = Math.sin((t / taperLength) * (Math.PI / 2));
      } else if (t > 1.0 - taperLength) {
        taper = Math.sin(((1.0 - t) / taperLength) * (Math.PI / 2));
      }
      taper = Math.max(0.05, Math.min(1.0, taper));

      var pressureScale = settings.pressureSensitivity ? Math.max(0.2, pressures[i]) : 1.0;
      var radius = settings.size * pressureScale * taper;
      var center = pos.clone().addScaledVector(normal, baseOffset + radius);

      for (var j = 0; j < radialSegments; j++) {
        var theta = (j / radialSegments) * Math.PI * 2;
        var cosT = Math.cos(theta);
        var sinT = Math.sin(theta);

        var radialDir = binormal.clone().multiplyScalar(cosT).addScaledVector(normal, sinT).normalize();
        var vPos = center.clone().addScaledVector(radialDir, radius);

        vertices.push(vPos.x, vPos.y, vPos.z);
        geomNormals.push(radialDir.x, radialDir.y, radialDir.z);
        uvs.push(j / radialSegments, t);
      }
    }

    for (var i2 = 0; i2 < numPoints - 1; i2++) {
      for (var j2 = 0; j2 < radialSegments; j2++) {
        var nextJ = (j2 + 1) % radialSegments;
        var a = i2 * radialSegments + j2;
        var b = (i2 + 1) * radialSegments + j2;
        var c = (i2 + 1) * radialSegments + nextJ;
        var d = i2 * radialSegments + nextJ;

        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }

    this.addSphericalEndCap(vertices, geomNormals, uvs, indices, positions[0], normals[0], binormals[0], tangents[0], 0, radialSegments, settings.size * pressures[0], baseOffset, true);
    this.addSphericalEndCap(vertices, geomNormals, uvs, indices, positions[numPoints - 1], normals[numPoints - 1], binormals[numPoints - 1], tangents[numPoints - 1], (numPoints - 1) * radialSegments, radialSegments, settings.size * pressures[numPoints - 1], baseOffset, false);

    var geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geom.setAttribute('normal', new THREE.Float32BufferAttribute(geomNormals, 3));
    geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geom.setIndex(indices);
    geom.computeVertexNormals();
    return geom;
  };

  ConformalBeadGenerator.prototype.buildRibbonGeometry = function(positions, normals, binormals, tangents, pressures, cumulativeDistances, totalLength, settings, baseOffset, taperLength) {
    var numPoints = positions.length;
    var vertices = [];
    var geomNormals = [];
    var uvs = [];
    var indices = [];

    for (var i = 0; i < numPoints; i++) {
      var pos = positions[i];
      var normal = normals[i];
      var binormal = binormals[i];
      var t = totalLength > 0 ? cumulativeDistances[i] / totalLength : i / (numPoints - 1);

      var taper = 1.0;
      if (t < taperLength) {
        taper = Math.sin((t / taperLength) * (Math.PI / 2));
      } else if (t > 1.0 - taperLength) {
        taper = Math.sin(((1.0 - t) / taperLength) * (Math.PI / 2));
      }
      taper = Math.max(0.05, Math.min(1.0, taper));

      var pressureScale = settings.pressureSensitivity ? Math.max(0.2, pressures[i]) : 1.0;
      var width = settings.size * pressureScale * taper * 1.5;

      var elevatedPos = pos.clone().addScaledVector(normal, baseOffset);
      var left = elevatedPos.clone().addScaledVector(binormal, -width);
      var right = elevatedPos.clone().addScaledVector(binormal, width);

      vertices.push(left.x, left.y, left.z);
      geomNormals.push(normal.x, normal.y, normal.z);
      uvs.push(0.0, t);

      vertices.push(right.x, right.y, right.z);
      geomNormals.push(normal.x, normal.y, normal.z);
      uvs.push(1.0, t);
    }

    for (var i2 = 0; i2 < numPoints - 1; i2++) {
      var a = i2 * 2;
      var b = (i2 + 1) * 2;
      var c = (i2 + 1) * 2 + 1;
      var d = i2 * 2 + 1;

      indices.push(a, b, d);
      indices.push(b, c, d);
    }

    var geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geom.setAttribute('normal', new THREE.Float32BufferAttribute(geomNormals, 3));
    geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geom.setIndex(indices);
    geom.computeVertexNormals();
    return geom;
  };

  ConformalBeadGenerator.prototype.buildMarkerGeometry = function(positions, normals, binormals, tangents, pressures, cumulativeDistances, totalLength, settings, baseOffset, taperLength) {
    var numPoints = positions.length;
    var vertices = [];
    var geomNormals = [];
    var uvs = [];
    var indices = [];

    var chiselAngleRad = ((settings.chiselAngle !== undefined ? settings.chiselAngle : 45) * Math.PI) / 180;
    var aspectRatio = settings.aspectRatio !== undefined ? settings.aspectRatio : 3.5;

    for (var i = 0; i < numPoints; i++) {
      var pos = positions[i];
      var normal = normals[i];
      var binormal = binormals[i];
      var tangent = tangents[i];
      var t = totalLength > 0 ? cumulativeDistances[i] / totalLength : i / (numPoints - 1);

      var taper = 1.0;
      if (t < taperLength) {
        taper = Math.sin((t / taperLength) * (Math.PI / 2));
      } else if (t > 1.0 - taperLength) {
        taper = Math.sin(((1.0 - t) / taperLength) * (Math.PI / 2));
      }
      taper = Math.max(0.05, Math.min(1.0, taper));

      var pressureScale = settings.pressureSensitivity ? Math.max(0.2, pressures[i]) : 1.0;
      var baseRadius = settings.size * pressureScale * taper;
      var width = baseRadius * aspectRatio * 0.7;
      var height = baseRadius * 0.35;

      var chiselDir = binormal.clone().multiplyScalar(Math.cos(chiselAngleRad)).addScaledVector(tangent, Math.sin(chiselAngleRad)).normalize();
      var center = pos.clone().addScaledVector(normal, baseOffset + height);

      var pTL = center.clone().addScaledVector(chiselDir, -width).addScaledVector(normal, height);
      var pTR = center.clone().addScaledVector(chiselDir, width).addScaledVector(normal, height);
      var pBR = center.clone().addScaledVector(chiselDir, width).addScaledVector(normal, -height);
      var pBL = center.clone().addScaledVector(chiselDir, -width).addScaledVector(normal, -height);

      var corners = [pTL, pTR, pBR, pBL];
      for (var k = 0; k < 4; k++) {
        vertices.push(corners[k].x, corners[k].y, corners[k].z);
        geomNormals.push(normal.x, normal.y, normal.z);
        uvs.push(k / 3, t);
      }
    }

    for (var i2 = 0; i2 < numPoints - 1; i2++) {
      for (var k2 = 0; k2 < 4; k2++) {
        var nextK = (k2 + 1) % 4;
        var a = i2 * 4 + k2;
        var b = (i2 + 1) * 4 + k2;
        var c = (i2 + 1) * 4 + nextK;
        var d = i2 * 4 + nextK;

        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }

    var geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geom.setAttribute('normal', new THREE.Float32BufferAttribute(geomNormals, 3));
    geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geom.setIndex(indices);
    geom.computeVertexNormals();
    return geom;
  };

  ConformalBeadGenerator.prototype.buildConformalGeometry = function(positions, normals, binormals, tangents, pressures, cumulativeDistances, totalLength, settings, targetMeshes, baseOffset, taperLength) {
    var numPoints = positions.length;
    var segmentsAcross = Math.max(3, settings.archSegments || 5);
    var uValues = [];
    for (var j = 0; j < segmentsAcross; j++) {
      uValues.push(-1.0 + (2.0 * j) / (segmentsAcross - 1));
    }

    var vertices = [];
    var geomNormals = [];
    var uvs = [];
    var indices = [];
    var domeFactor = settings.domeFactor || 0.22;

    for (var i = 0; i < numPoints; i++) {
      var pos = positions[i];
      var normal = normals[i];
      var binormal = binormals[i];
      var t = totalLength > 0 ? cumulativeDistances[i] / totalLength : i / (numPoints - 1);

      var taper = 1.0;
      if (t < taperLength) {
        taper = Math.sin((t / taperLength) * (Math.PI / 2));
      } else if (t > 1.0 - taperLength) {
        taper = Math.sin(((1.0 - t) / taperLength) * (Math.PI / 2));
      }
      taper = Math.max(0.02, Math.min(1.0, taper));

      var pressureScale = settings.pressureSensitivity ? Math.max(0.2, pressures[i]) : 1.0;
      var ringRadius = settings.size * pressureScale * taper;

      for (var s = 0; s < segmentsAcross; s++) {
        var u = uValues[s];
        var domeHeight = baseOffset + ringRadius * domeFactor * Math.sqrt(Math.max(0, 1.0 - u * u));
        var lateralOffset = u * ringRadius;

        var idealPos = pos.clone()
          .addScaledVector(binormal, lateralOffset)
          .addScaledVector(normal, domeHeight);

        var finalPos = idealPos;
        var finalNormal = normal.clone();

        if (targetMeshes.length > 0 && settings.silhouetteClamping) {
          var rayOrigin = pos.clone()
            .addScaledVector(binormal, lateralOffset)
            .addScaledVector(normal, ringRadius * 1.5 + baseOffset + 0.02);
          var rayDir = normal.clone().negate().normalize();

          this.raycaster.set(rayOrigin, rayDir);
          this.raycaster.far = ringRadius * 3.5 + baseOffset * 2 + 0.05;
          var hits = this.raycaster.intersectObjects(targetMeshes, false);

          if (hits.length > 0 && hits[0].point) {
            var hit = hits[0];
            var hitNormal = hit.face ? hit.face.normal.clone().transformDirection(hit.object.matrixWorld).normalize() : normal;
            finalPos = hit.point.clone().addScaledVector(hitNormal, domeHeight);
            finalNormal = hitNormal;
          } else {
            var clampedLateral = u * ringRadius * 0.4;
            finalPos = pos.clone()
              .addScaledVector(binormal, clampedLateral)
              .addScaledVector(normal, baseOffset * 0.8);
          }
        }

        var archNormal = normal.clone().addScaledVector(binormal, u * 0.4).normalize();

        vertices.push(finalPos.x, finalPos.y, finalPos.z);
        geomNormals.push(archNormal.x, archNormal.y, archNormal.z);
        uvs.push((u + 1.0) * 0.5, t);
      }
    }

    for (var i2 = 0; i2 < numPoints - 1; i2++) {
      for (var s2 = 0; s2 < segmentsAcross - 1; s2++) {
        var a = i2 * segmentsAcross + s2;
        var b = (i2 + 1) * segmentsAcross + s2;
        var c = (i2 + 1) * segmentsAcross + (s2 + 1);
        var d = i2 * segmentsAcross + (s2 + 1);

        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }

    this.addEndCap(vertices, geomNormals, uvs, indices, positions[0], normals[0], binormals[0], tangents[0], 0, segmentsAcross, settings.size * pressures[0], baseOffset, true);
    this.addEndCap(vertices, geomNormals, uvs, indices, positions[numPoints - 1], normals[numPoints - 1], binormals[numPoints - 1], tangents[numPoints - 1], (numPoints - 1) * segmentsAcross, segmentsAcross, settings.size * pressures[numPoints - 1], baseOffset, false);

    var geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(geomNormals, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  };

  ConformalBeadGenerator.prototype.addEndCap = function(vertices, geomNormals, uvs, indices, centerPos, normal, binormal, tangent, ringStartIndex, segmentsAcross, radius, baseOffset, isStart) {
    var tipDir = isStart ? tangent.clone().negate() : tangent.clone();
    var tipPos = centerPos.clone()
      .addScaledVector(tipDir, radius * 0.35)
      .addScaledVector(normal, baseOffset + radius * 0.15);

    var tipVertexIdx = vertices.length / 3;
    vertices.push(tipPos.x, tipPos.y, tipPos.z);
    geomNormals.push(normal.x, normal.y, normal.z);
    uvs.push(0.5, isStart ? 0.0 : 1.0);

    for (var j = 0; j < segmentsAcross - 1; j++) {
      var ringA = ringStartIndex + j;
      var ringB = ringStartIndex + j + 1;
      if (isStart) {
        indices.push(tipVertexIdx, ringB, ringA);
      } else {
        indices.push(tipVertexIdx, ringA, ringB);
      }
    }
  };

  ConformalBeadGenerator.prototype.addSphericalEndCap = function(vertices, geomNormals, uvs, indices, centerPos, normal, binormal, tangent, ringStartIndex, radialSegments, radius, baseOffset, isStart) {
    var tipDir = isStart ? tangent.clone().negate() : tangent.clone();
    var tipPos = centerPos.clone()
      .addScaledVector(normal, baseOffset + radius)
      .addScaledVector(tipDir, radius);

    var tipIdx = vertices.length / 3;
    vertices.push(tipPos.x, tipPos.y, tipPos.z);
    geomNormals.push(tipDir.x, tipDir.y, tipDir.z);
    uvs.push(0.5, isStart ? 0.0 : 1.0);

    for (var j = 0; j < radialSegments; j++) {
      var nextJ = (j + 1) % radialSegments;
      var a = ringStartIndex + j;
      var b = ringStartIndex + nextJ;
      if (isStart) {
        indices.push(tipIdx, b, a);
      } else {
        indices.push(tipIdx, a, b);
      }
    }
  };

  ConformalBeadGenerator.prototype.generateDabGeometry = function(point, settings, profile, targetMeshes) {
    var normal = point.normal.clone().normalize();
    var pressureScale = settings.pressureSensitivity ? Math.max(0.3, point.pressure) : 1.0;
    var radius = settings.size * pressureScale;
    var baseOffset = settings.surfaceOffset !== undefined ? settings.surfaceOffset : 0.0025;

    var tangent = new THREE.Vector3(0, 1, 0);
    if (Math.abs(normal.y) > 0.9) {
      tangent.set(1, 0, 0);
    }
    var binormal = new THREE.Vector3().crossVectors(normal, tangent).normalize();
    tangent.crossVectors(binormal, normal).normalize();

    var radialSegments = profile === 'marker' ? 4 : 12;
    var rings = 3;
    var vertices = [];
    var normals = [];
    var uvs = [];
    var indices = [];

    var apexHeight = baseOffset + radius * (profile === 'tube' ? 1.0 : 0.18);
    var apex = point.position.clone().addScaledVector(normal, apexHeight);
    vertices.push(apex.x, apex.y, apex.z);
    normals.push(normal.x, normal.y, normal.z);
    uvs.push(0.5, 0.5);

    for (var r = 1; r <= rings; r++) {
      var ringFraction = r / rings;
      var ringRadius = radius * ringFraction;
      var domeHeight = baseOffset + radius * 0.18 * Math.sqrt(Math.max(0, 1.0 - ringFraction * ringFraction));

      for (var s = 0; s < radialSegments; s++) {
        var theta = (s / radialSegments) * Math.PI * 2;
        var cosT = Math.cos(theta);
        var sinT = Math.sin(theta);

        var vPos = point.position.clone()
          .addScaledVector(tangent, cosT * ringRadius)
          .addScaledVector(binormal, sinT * ringRadius)
          .addScaledVector(normal, domeHeight);

        var vNorm = normal.clone()
          .addScaledVector(tangent, cosT * 0.3)
          .addScaledVector(binormal, sinT * 0.3)
          .normalize();

        vertices.push(vPos.x, vPos.y, vPos.z);
        normals.push(vNorm.x, vNorm.y, vNorm.z);
        uvs.push(0.5 + cosT * ringFraction * 0.5, 0.5 + sinT * ringFraction * 0.5);
      }
    }

    for (var s2 = 0; s2 < radialSegments; s2++) {
      var nextS = (s2 + 1) % radialSegments;
      indices.push(0, 1 + nextS, 1 + s2);
    }

    for (var r2 = 0; r2 < rings - 1; r2++) {
      var r1 = 1 + r2 * radialSegments;
      var r2Idx = 1 + (r2 + 1) * radialSegments;
      for (var s3 = 0; s3 < radialSegments; s3++) {
        var nextS2 = (s3 + 1) % radialSegments;
        var a = r1 + s3;
        var b = r1 + nextS2;
        var c = r2Idx + nextS2;
        var d = r2Idx + s3;

        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }

    var geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  };

  ConformalBeadGenerator.prototype.resampleCurve = function(points, brushSize, targetMeshes) {
    if (points.length < 2) {
      return {
        positions: points.map(function(p) { return p.position.clone(); }),
        normals: points.map(function(p) { return p.normal.clone(); }),
        pressures: points.map(function(p) { return p.pressure; })
      };
    }

    var vectorPoints = points.map(function(p) { return p.position; });
    var curve = new THREE.CatmullRomCurve3(vectorPoints, false, 'centripetal', 0.5);

    var stepSize = Math.max(0.005, brushSize * 0.35);
    var length = curve.getLength();
    var divisions = Math.max(4, Math.min(180, Math.ceil(length / stepSize)));

    var rawPoints = curve.getPoints(divisions);
    var sampledPositions = [];
    var sampledNormals = [];
    var sampledPressures = [];

    for (var i = 0; i <= divisions; i++) {
      var t = i / divisions;
      var rawIndex = t * (points.length - 1);
      var idxA = Math.floor(rawIndex);
      var idxB = Math.min(points.length - 1, idxA + 1);
      var frac = rawIndex - idxA;

      var normA = points[idxA].normal;
      var normB = points[idxB].normal;
      var interpNorm = new THREE.Vector3().copy(normA).lerp(normB, frac).normalize();
      var pos = rawPoints[i].clone();

      if (targetMeshes && targetMeshes.length > 0) {
        var searchDist = Math.max(0.35, brushSize * 3.0 + 0.08);
        var rayOrigin = pos.clone().addScaledVector(interpNorm, searchDist);
        var rayDir = interpNorm.clone().negate().normalize();

        this.raycaster.set(rayOrigin, rayDir);
        this.raycaster.far = searchDist * 2.8;
        var hits = this.raycaster.intersectObjects(targetMeshes, false);
        if (hits.length > 0 && hits[0].point) {
          pos = hits[0].point.clone();
          if (hits[0].face) {
            interpNorm = hits[0].face.normal.clone().transformDirection(hits[0].object.matrixWorld).normalize();
          }
        }
      }

      sampledPositions.push(pos);
      sampledNormals.push(interpNorm);

      var pressA = points[idxA].pressure || 1.0;
      var pressB = points[idxB].pressure || 1.0;
      sampledPressures.push(pressA + (pressB - pressA) * frac);
    }

    return {
      positions: sampledPositions,
      normals: sampledNormals,
      pressures: sampledPressures
    };
  };

  window.ConformalBeadGenerator = ConformalBeadGenerator;
})(window);
