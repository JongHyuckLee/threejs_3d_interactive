import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// ----- 주제: Geometry 기본

export default function example() {
  // Renderer
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 10;
  scene.add(camera);

  const controls = new OrbitControls(camera, renderer.domElement);

  // Light
  const ambientLight = new THREE.AmbientLight("white", 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight("white", 1);
  directionalLight.position.x = 1;
  directionalLight.position.z = 3;
  scene.add(directionalLight);

  // Mesh
  const geometry = new THREE.SphereGeometry(5, 64, 64);
  const positionArray = geometry.attributes.position.array;

  for (let i = 0; i < positionArray.length; i += 3) {
    // 정점(Vertext) 한 개의 x, y, z 좌표를 랜덤으로 조정
    positionArray[i] = positionArray[i] + (Math.random() - 0.5) * 0.2;
    positionArray[i + 1] = positionArray[i + 1] + (Math.random() - 0.5) * 0.2;
    positionArray[i + 2] = positionArray[i + 2] + (Math.random() - 0.5) * 0.2;
  }

  const material = new THREE.MeshStandardMaterial({
    color: "orangered",
    side: THREE.DoubleSide,
    // wireframe: true,
    flatShading: true,
  });
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);
  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const time = clock.getElapsedTime() * 3;
    for (let i = 0; i < positionArray.length; i += 3) {
      // 변하는 값을 set 해주어야 한다.
      positionArray[i] += Math.sign(time) * 0.002;
    }
    geometry.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw);
  }

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // 이벤트
  window.addEventListener("resize", setSize);

  draw();
}
