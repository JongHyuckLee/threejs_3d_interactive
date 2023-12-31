import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// ----- 주제: 포인트 좌표에 메쉬 생성하기

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
  camera.position.y = 1.5;
  camera.position.z = 4;
  scene.add(camera);

  // Light
  const ambientLight = new THREE.AmbientLight("white", 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight("white", 1);
  directionalLight.position.x = 1;
  directionalLight.position.z = 2;
  scene.add(directionalLight);

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // Mesh
  const planeGeometry = new THREE.PlaneGeometry(0.3, 0.3);

  const textureLoader = new THREE.TextureLoader();

  // Points
  const SphereGeometry = new THREE.SphereGeometry(1, 8, 8);
  const positionArray = SphereGeometry.attributes.position.array;
  // console.log(SphereGeometry.attributes.position.array);

  // 여러개의 Plane Mesh 생성
  let imagePanel = null;
  for (let i = 0; i < positionArray.length; i += 3) {
    imagePanel = new ImagePanel({
      textureLoader,
      scene,
      geometry: planeGeometry,
      imageSrc: `/images/${Math.ceil(Math.random() * 5)}.jpg`,
      x: positionArray[i],
      y: positionArray[i + 1],
    });
  }

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const delta = clock.getDelta();

    controls.update();

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
