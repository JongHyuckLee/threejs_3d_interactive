import * as THREE from "three";
import gsap from "gsap";

export default function example() {
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog("black", 3, 7);
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.y = 1;
  camera.position.z = 5;
  camera.lookAt(0, 0, 0);

  camera.updateProjectionMatrix();
  scene.add(camera);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.x = 1;
  light.position.y = 3;
  light.position.z = 10;
  scene.add(light);

  //  mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    //   color: 0xff0000,
    //   color: red,
    color: "#ff0000",
  });

  const meshes = [];
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  let time = Date.now();
  // 그리기
  function draw() {
    const newTime = Date.now();
    const deltaTime = newTime - time;
    time = newTime;

    renderer.render(scene, camera);
    // window.requestAnimationFrame(draw);
    renderer.setAnimationLoop(draw);
  }

  gsap.to(mesh.position, {
    duration: 1,
    y: 2,
    z: 3,
  });

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    // updateProjectionMatrix 카메라 투영에 관련된 값에 변화가 있을 경우 실행해야 함.
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  window.addEventListener("resize", setSize);
  draw();
}
