import * as THREE from "three";

export default function example() {
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;
  camera.lookAt(0, 0, 0);

  camera.updateProjectionMatrix();
  scene.add(camera);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.x = 1;
  light.position.z = 2;
  scene.add(light);

  //  mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    //   color: 0xff0000,
    //   color: red,
    color: "#ff0000",
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  console.log(Date.now());

  let oldTime = Date.now();
  // 그리기
  function draw() {
    const newTime = Date.now();
    const deltaTime = newTime - oldTime;
    oldTime = newTime;
    // 각도는 Radian을 사용
    // 360도는 2파이
    // mesh.rotation.y += 0.01;
    // mesh.rotation.y += THREE.MathUtils.degToRad(1);
    mesh.rotation.y = deltaTime;

    mesh.position.y += 2 * deltaTime;
    if (mesh.position.y > 3) {
      mesh.position.y = 0;
    }
    renderer.render(scene, camera);
    // window.requestAnimationFrame(draw);
    renderer.setAnimationLoop(draw);
  }

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
