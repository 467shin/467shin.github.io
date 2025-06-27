import * as THREE from "https://unpkg.com/three@0.126.1/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js";

const textureLoader = new THREE.TextureLoader();

/** 구름 생성 */
const createClouds = () => {
  const canvasCloud = textureLoader.load(`../static/textures/earth_clouds.png`);

  const geometry = new THREE.SphereGeometry(1.51, 32, 32);
  const material = new THREE.MeshPhongMaterial({
    map: canvasCloud,
    transparent: true,
    depthTest: false,
  });

  const cloudMesh = new THREE.Mesh(geometry, material);

  return cloudMesh;
};

/** 지구 매터리얼 생성 */
const createMaterial = () => {
  const material = new THREE.MeshPhongMaterial();

  // earth map
  const earthMap = textureLoader.load("../static/textures/earth_map.jpg");
  material.map = earthMap;

  // bump
  const earthBump = textureLoader.load("../static/textures/earth_bump.jpg");
  material.bumpMap = earthBump;
  material.bumpScale = 0.005;

  // specular map
  const earthSpecular = textureLoader.load("../static/textures/earth_specular.png");
  material.specularMap = earthSpecular;
  material.specular = new THREE.Color("grey");

  return material;
};

/** 지구 생성 */
const createEarth = () => {
  const geometry = new THREE.SphereGeometry(1.5, 32, 32);

  const cloudMesh = createClouds();

  const material = createMaterial();

  const earth = new THREE.Mesh(geometry, material);
  earth.add(cloudMesh);

  return earth;
};

/** 광원 생성 */
const createLight = () => {
  // 자연광
  const ambientLight = new THREE.AmbientLight("white", 1);

  // 직사광
  const mainLight = new THREE.DirectionalLight("white", 0.05);

  // 직사광 포지셔닝
  mainLight.position.set(5, 3, 5);

  return { mainLight, ambientLight };
};

// 실행 함수
const earthSlide = () => {
  // 사이즈 기준
  const slide = document.querySelector(".slide-content");
  // 장면 설정
  const scene = new THREE.Scene();
  // 카메라 생성
  const camera = new THREE.PerspectiveCamera(75, slide.clientWidth / slide.clientHeight, 0.1, 1000);

  // 렌더러 정의
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(slide.clientWidth, slide.clientHeight);
  document.querySelector("#earth-slide").appendChild(renderer.domElement);
  // 지구 생성
  const earth = createEarth();
  scene.add(earth);

  // 광원 생성
  const { mainLight, ambientLight } = createLight();
  scene.add(mainLight, ambientLight);

  camera.position.z = 5;

  const controls = new OrbitControls(camera, renderer.domElement);
  // 드래그 불허
  controls.enableRotate = false;

  /** 회전 애니메이션 */
  const animate = function () {
    requestAnimationFrame(animate);
    earth.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, camera);
  };
  animate();
};

export { earthSlide };
