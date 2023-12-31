import * as THREE from "three";

export default function example() {
  // 동적으로 캔버스 조립하기
  // const renderer = new THREE.WebGLRenderer();
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // document.body.appendChild(renderer.domElement);

  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  console.log(window.devicePixelRatio);
  const scene = new THREE.Scene();

  // const camera = new THREE.PerspectiveCamera(
  //   75, // 시야각
  //   window.innerWidth / window.innerHeight, // 종횡비(aspect)
  //   0.1, // near
  //   1000 // far
  // );
  // camera.position.x = 1;
  // camera.position.z = 5;
  // camera.position.y = 2;
  // scene.add(camera);

  const camera = new THREE.OrthographicCamera(
    -(window.innerWidth / window.innerHeight), // left
    window.innerWidth / window.innerHeight, // right
    1, // top
    -1, // bottom
    0.1,
    1000
  );
  camera.position.x = 1;
  camera.position.y = 2;
  camera.position.z = 5;
  camera.lookAt(0, 0, 0);
  camera.zoom = 0.1;
  camera.updateProjectionMatrix();
  scene.add(camera);
  //  mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    //   color: 0xff0000,
    //   color: red,
    color: "#ff0000",
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  renderer.render(scene, camera);

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    // updateProjectionMatrix 카메라 투영에 관련된 값에 변화가 있을 경우 실행해야 함.
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  window.addEventListener("resize", setSize);
}
