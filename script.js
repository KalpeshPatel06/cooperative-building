const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  antialias: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(25);

// ================= LIGHTS =================

const pointLight = new THREE.PointLight(0xffffff, 2);
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0x404040, 2);

scene.add(pointLight);
scene.add(ambientLight);

// ================= BUILDING =================

const buildingGeometry = new THREE.BoxGeometry(12, 20, 12);

const buildingMaterial = new THREE.MeshStandardMaterial({
  color: 0x111827,
  metalness: 0.7,
  roughness: 0.3,
});

const building = new THREE.Mesh(
  buildingGeometry,
  buildingMaterial
);

scene.add(building);

// ================= WINDOWS =================

const windows = [];

for (let y = -8; y <= 8; y += 3) {
  for (let x = -4; x <= 4; x += 2.5) {

    const windowGeometry = new THREE.BoxGeometry(
      1,
      1.5,
      0.2
    );

    const windowMaterial = new THREE.MeshStandardMaterial({
      color: 0xffff66,
      emissive: 0xffff00,
      emissiveIntensity: Math.random() * 2,
    });

    const windowMesh = new THREE.Mesh(
      windowGeometry,
      windowMaterial
    );

    windowMesh.position.set(x, y, 6.1);

    building.add(windowMesh);

    windows.push(windowMesh);
  }
}

// ================= FLOATING DEVOPS CUBES =================

const cubes = [];

for (let i = 0; i < 20; i++) {

  const geometry = new THREE.BoxGeometry(
    0.5,
    0.5,
    0.5
  );

  const material = new THREE.MeshStandardMaterial({
    color: 0x00ffff,
    emissive: 0x00ffff,
    emissiveIntensity: 0.5,
  });

  const cube = new THREE.Mesh(geometry, material);

  cube.position.x = (Math.random() - 0.5) * 50;
  cube.position.y = (Math.random() - 0.5) * 30;
  cube.position.z = (Math.random() - 0.5) * 30;

  scene.add(cube);

  cubes.push(cube);
}

// ================= STARS =================

function addStar() {

  const geometry = new THREE.SphereGeometry(
    0.1,
    24,
    24
  );

  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
  });

  const star = new THREE.Mesh(
    geometry,
    material
  );

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);

  scene.add(star);
}

Array(300)
  .fill()
  .forEach(addStar);

// ================= ANIMATION =================

function animate() {

  requestAnimationFrame(animate);

  // Rotate Building
  building.rotation.y += 0.003;

  // Flicker Windows
  windows.forEach((w) => {
    w.material.emissiveIntensity =
      Math.random() * 2;
  });

  // Animate Cubes
  cubes.forEach((cube, index) => {

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    cube.position.y +=
      Math.sin(Date.now() * 0.001 + index) * 0.002;
  });

  renderer.render(scene, camera);
}

animate();

// ================= RESPONSIVE =================

window.addEventListener('resize', () => {

  camera.aspect =
    window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );
});
