import * as THREE from "three";

// 동적으로 캔버스 조립하기
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

const canvas = document.querySelector("#three-canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75, // 시야각
  window.innerWidth / window.innerHeight, // 종횡비(aspect)
  0.1, // near
  1000 // far
);
camera.position.x = 1;
camera.position.z = 5;
camera.position.y = 2;
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
