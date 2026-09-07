// Preset 3D Models Library (GLB Models and Procedural Presets)

(function(window) {
  'use strict';

  var SampleModelFactory = {
    getPresets: function() {
      return [
        // Anime & Characters
        {
          id: 'pusheen_classic',
          name: 'Pusheen Cat',
          category: 'Characters',
          file: 'models/pusheen_classic.glb',
          description: 'Cute stylized Pusheen cat model.',
          scale: 4.0,
          rot: { x: 90, y: 0, z: 0 }
        },
        {
          id: 'pusheen_busy',
          name: 'Pusheen Laptop',
          category: 'Characters',
          file: 'models/pusheen_busy.glb',
          description: 'Pusheen cat working on a laptop.',
          scale: 12.0,
          rot: { x: 90, y: 0, z: 0 }
        },
        {
          id: 'pusheen_vs_noodle',
          name: 'Pusheen Ramen',
          category: 'Characters',
          file: 'models/pusheen_vs_noodle.glb',
          description: 'Pusheen eating a bowl of ramen noodles.',
          scale: 4.0,
          rot: { x: 90, y: 0, z: 0 }
        },
        {
          id: 'pompompurin',
          name: 'Pompompurin',
          category: 'Characters',
          file: 'models/pompompurin.glb',
          description: 'Golden retriever dog character with brown beret.',
          scale: 4.0,
          rot: { x: 0, y: 0, z: 0 }
        },
        {
          id: 'capybara_cute',
          name: 'Cute Capybara',
          category: 'Characters',
          file: 'models/capybara_cute.glb',
          description: 'Friendly chill capybara companion.',
          scale: 1.0,
          rot: { x: 90, y: 0, z: 0 },
          pos: { x: 0, y: 0, z: 1.26 }
        },
        {
          id: 'capybara_bath',
          name: 'Capybara Onsen',
          category: 'Characters',
          file: 'models/capybara_bath.glb',
          description: 'Capybara soaking in a hot spring tub.',
          scale: 3.5,
          rot: { x: 90, y: 0, z: 0 }
        },
        {
          id: 'chonky_axolotl',
          name: 'Chonky Axolotl',
          category: 'Characters',
          file: 'models/chonky_axolotl.glb',
          description: 'Adorable pink aquatic salamander.',
          scale: 1.1,
          rot: { x: 270, y: 0, z: 0 },
          pos: { x: 0, y: 0, z: 2.0 }
        },

        // Architecture & Dioramas
        {
          id: 'fantasy_house',
          name: 'Storybook House',
          category: 'Architecture',
          file: 'models/fantasy_house.glb',
          description: 'Stylized fairytale fantasy house with chimney.',
          scale: 5.0,
          rot: { x: 90, y: 0, z: 0 }
        },
        {
          id: 'medieval_house',
          name: 'Medieval House',
          category: 'Architecture',
          file: 'models/stylized_medieval_house.glb',
          description: 'Timber frame medieval village cottage.',
          scale: 5.5,
          rot: { x: 90, y: 0, z: 0 }
        },
        {
          id: 'korean_bakery',
          name: 'Korean Bakery',
          category: 'Architecture',
          file: 'models/korean_bakery.glb',
          description: 'Charming modern street corner cafe and bakery.',
          scale: 5.5,
          rot: { x: 90, y: 0, z: 0 }
        },
        {
          id: 'car_house',
          name: 'Camper Van House',
          category: 'Architecture',
          file: 'models/car_house.glb',
          description: 'Mobile motorhome adventure house.',
          scale: 28.0,
          rot: { x: 90, y: 0, z: 0 }
        },
        {
          id: 'modern_house',
          name: 'Modern Cottage',
          category: 'Architecture',
          file: 'models/house.glb',
          description: 'Low-poly modern suburban house.',
          scale: 5.5,
          rot: { x: 90, y: 0, z: 0 }
        },
        {
          id: 'isometric_castle',
          name: 'Fantasy Castle',
          category: 'Architecture',
          file: 'models/isometric_fantasy_castle.glb',
          description: 'Fortified stone castle towers with battlements.',
          scale: 6.0,
          rot: { x: 90, y: 0, z: 0 }
        },

        // Vehicles & Tech
        {
          id: 'psx_saviola_s21',
          name: 'PSX Seaplane',
          category: 'Vehicles',
          file: 'models/psx_saviola_s21.glb',
          description: 'Retro red flying boat aircraft.',
          scale: 3.0,
          rot: { x: 90, y: 0, z: 0 },
          pos: { x: 0, y: 0, z: 3.0 }
        },
        {
          id: 'matilda_tank',
          name: 'Matilda Tank',
          category: 'Vehicles',
          file: 'models/matilda.glb',
          description: 'Heavy armored tracked vehicle with turret.',
          scale: 4.5,
          rot: { x: 90, y: 0, z: 0 }
        },
        {
          id: 'scifi_drone',
          name: 'Recon Drone',
          category: 'Vehicles',
          description: 'Spherical hull with thruster pods and sensor lenses.',
          createMesh: this.createSciFiDrone.bind(this)
        },
        {
          id: 'cyber_helmet',
          name: 'Cyber Helmet',
          category: 'Vehicles',
          description: 'Aerodynamic armored visor with sharp facets.',
          createMesh: this.createCyberHelmet.bind(this)
        },

        // Sculptures & Benchmarks
        {
          id: 'sculpted_bust',
          name: 'Classical Bust',
          category: 'Sculpture',
          description: 'Smooth organic anatomical contours.',
          createMesh: this.createSculptedBust.bind(this)
        },
        {
          id: 'ceramic_vase',
          name: 'Ceramic Amphora',
          category: 'Sculpture',
          description: 'Curved porcelain vase with handles.',
          createMesh: this.createCeramicVase.bind(this)
        },
        {
          id: 'torus_knot',
          name: 'Torus Knot',
          category: 'Sculpture',
          description: 'Continuous mathematical topology benchmark.',
          createMesh: this.createTorusKnot.bind(this)
        }
      ];
    },

    createCyberHelmet: function() {
      var group = new THREE.Group();
      group.name = 'CyberHelmet';

      var baseMaterial = new THREE.MeshStandardMaterial({
        color: 0x22272e,
        roughness: 0.35,
        metalness: 0.65,
        side: THREE.DoubleSide
      });

      var visorMaterial = new THREE.MeshStandardMaterial({
        color: 0x111622,
        roughness: 0.1,
        metalness: 0.9,
        side: THREE.DoubleSide
      });

      var accentMaterial = new THREE.MeshStandardMaterial({
        color: 0x3b4252,
        roughness: 0.5,
        metalness: 0.3,
        side: THREE.DoubleSide
      });

      var skullGeom = new THREE.SphereGeometry(1.0, 48, 36);
      var pos = skullGeom.attributes.position;
      for (var i = 0; i < pos.count; i++) {
        var x = pos.getX(i);
        var y = pos.getY(i);
        var z = pos.getZ(i);
        var nz = z * 1.15;
        var ny = y * 1.05;
        if (z > 0.3 && y < 0.2) nz += 0.15 * Math.sin(y * Math.PI);
        pos.setXYZ(i, x * 0.95, ny, nz);
      }
      skullGeom.computeVertexNormals();
      var skullMesh = new THREE.Mesh(skullGeom, baseMaterial);
      group.add(skullMesh);

      var visorGeom = new THREE.CylinderGeometry(0.85, 0.82, 0.65, 32, 16, true, -Math.PI * 0.45, Math.PI * 0.9);
      var visorPos = visorGeom.attributes.position;
      for (var j = 0; j < visorPos.count; j++) {
        visorPos.setZ(j, visorPos.getZ(j) + 0.35);
      }
      visorGeom.computeVertexNormals();
      var visorMesh = new THREE.Mesh(visorGeom, visorMaterial);
      visorMesh.position.set(0, 0.05, 0.3);
      group.add(visorMesh);

      var earGeom = new THREE.CylinderGeometry(0.28, 0.25, 0.2, 24);
      earGeom.rotateZ(Math.PI / 2);
      var earL = new THREE.Mesh(earGeom, accentMaterial);
      earL.position.set(0.92, -0.05, 0.1);
      group.add(earL);

      var earR = earL.clone();
      earR.position.set(-0.92, -0.05, 0.1);
      group.add(earR);

      var chinGeom = new THREE.BoxGeometry(0.55, 0.35, 0.65);
      var chinMesh = new THREE.Mesh(chinGeom, accentMaterial);
      chinMesh.position.set(0, -0.75, 0.6);
      chinMesh.rotation.x = Math.PI * 0.12;
      group.add(chinMesh);

      return group;
    },

    createSculptedBust: function() {
      var group = new THREE.Group();
      group.name = 'SculptedBust';

      var marbleMat = new THREE.MeshStandardMaterial({
        color: 0xedebe6,
        roughness: 0.6,
        metalness: 0.05,
        side: THREE.DoubleSide
      });

      var headGeom = new THREE.SphereGeometry(0.75, 48, 36);
      var pos = headGeom.attributes.position;
      for (var i = 0; i < pos.count; i++) {
        var x = pos.getX(i);
        var y = pos.getY(i);
        var z = pos.getZ(i);
        var ny = y * 1.25;
        var nz = z;
        if (y < 0 && z > 0.2) nz += 0.12;
        pos.setXYZ(i, x * 0.85, ny, nz);
      }
      headGeom.computeVertexNormals();
      var head = new THREE.Mesh(headGeom, marbleMat);
      head.position.set(0, 0.6, 0);
      group.add(head);

      var neckGeom = new THREE.CylinderGeometry(0.32, 0.42, 0.7, 32);
      var neck = new THREE.Mesh(neckGeom, marbleMat);
      neck.position.set(0, -0.05, -0.05);
      group.add(neck);

      var torsoGeom = new THREE.CylinderGeometry(0.45, 0.95, 1.1, 32);
      var tPos = torsoGeom.attributes.position;
      for (var j = 0; j < tPos.count; j++) {
        tPos.setXYZ(j, tPos.getX(j) * 1.7, tPos.getY(j), tPos.getZ(j) * 0.85);
      }
      torsoGeom.computeVertexNormals();
      var torso = new THREE.Mesh(torsoGeom, marbleMat);
      torso.position.set(0, -0.75, -0.05);
      group.add(torso);

      var baseGeom = new THREE.CylinderGeometry(0.7, 0.85, 0.35, 36);
      var pedestal = new THREE.Mesh(baseGeom, marbleMat);
      pedestal.position.set(0, -1.45, -0.05);
      group.add(pedestal);

      return group;
    },

    createCeramicVase: function() {
      var group = new THREE.Group();
      group.name = 'CeramicVase';

      var ceramicMat = new THREE.MeshStandardMaterial({
        color: 0xf4f1eb,
        roughness: 0.25,
        metalness: 0.1,
        side: THREE.DoubleSide
      });

      var points = [];
      for (var i = 0; i <= 30; i++) {
        var t = i / 30;
        var y = (t - 0.5) * 2.4;
        var r = 0.35 + 0.45 * Math.sin(t * Math.PI) + 0.15 * Math.sin(t * Math.PI * 2.5);
        points.push(new THREE.Vector2(Math.max(0.12, r), y));
      }

      var latheGeom = new THREE.LatheGeometry(points, 48);
      latheGeom.computeVertexNormals();
      var vaseMesh = new THREE.Mesh(latheGeom, ceramicMat);
      group.add(vaseMesh);

      var handleGeom = new THREE.TorusGeometry(0.35, 0.065, 20, 32, Math.PI);
      handleGeom.rotateZ(-Math.PI / 2);

      var handleL = new THREE.Mesh(handleGeom, ceramicMat);
      handleL.position.set(0.72, 0.25, 0);
      group.add(handleL);

      var handleR = new THREE.Mesh(handleGeom, ceramicMat);
      handleR.rotation.y = Math.PI;
      handleR.position.set(-0.72, 0.25, 0);
      group.add(handleR);

      return group;
    },

    createSciFiDrone: function() {
      var group = new THREE.Group();
      group.name = 'SciFiDrone';

      var hullMat = new THREE.MeshStandardMaterial({
        color: 0x2b303c,
        roughness: 0.4,
        metalness: 0.7,
        side: THREE.DoubleSide
      });

      var lensMat = new THREE.MeshStandardMaterial({
        color: 0x00e5ff,
        roughness: 0.05,
        metalness: 0.9,
        emissive: 0x005577,
        emissiveIntensity: 0.4,
        side: THREE.DoubleSide
      });

      var plateMat = new THREE.MeshStandardMaterial({
        color: 0xdf8435,
        roughness: 0.3,
        metalness: 0.2,
        side: THREE.DoubleSide
      });

      var sphere = new THREE.Mesh(new THREE.SphereGeometry(0.85, 48, 36), hullMat);
      group.add(sphere);

      var eye = new THREE.Mesh(new THREE.SphereGeometry(0.35, 32, 24), lensMat);
      eye.position.set(0, 0, 0.75);
      eye.scale.set(1, 1, 0.5);
      group.add(eye);

      var ring = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.12, 24, 48), plateMat);
      ring.rotation.x = Math.PI / 2;
      group.add(ring);

      for (var i = 0; i < 4; i++) {
        var angle = (i * Math.PI) / 2 + Math.PI / 4;
        var thruster = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.25, 0.6, 24), hullMat);
        thruster.position.set(Math.cos(angle) * 0.95, -0.4, Math.sin(angle) * 0.95);
        thruster.rotation.x = Math.PI * 0.15 * Math.sin(angle);
        thruster.rotation.z = -Math.PI * 0.15 * Math.cos(angle);
        group.add(thruster);
      }

      return group;
    },

    createTorusKnot: function() {
      var group = new THREE.Group();
      group.name = 'TorusKnot';

      var mat = new THREE.MeshStandardMaterial({
        color: 0x3f51b5,
        roughness: 0.35,
        metalness: 0.4,
        side: THREE.DoubleSide
      });

      var geom = new THREE.TorusKnotGeometry(0.8, 0.26, 128, 32, 2, 3);
      geom.computeVertexNormals();
      var mesh = new THREE.Mesh(geom, mat);
      group.add(mesh);

      return group;
    }
  };

  window.SampleModelFactory = SampleModelFactory;
})(window);
