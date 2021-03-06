import ConsoleSignature from './modules/ConsoleSignature.js';
import PostEffect from './modules/PostEffect.js';
import Plane from './modules/Plane.js';
import buildIndexContent from './modules/buildIndexContent.js';
import Hover from './modules/Hover.js';

const hovers = document.getElementsByClassName('js-hover');

const canvas = document.getElementById('canvas-webgl');
const renderer = new THREE.WebGLRenderer({
  antialias: false,
  canvas: canvas,
});
const renderBack = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
const scene = new THREE.Scene();
const sceneBack = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
const cameraBack = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
const clock = new THREE.Clock();

const postEffect = new PostEffect(renderBack.texture);
const plane = new Plane();

const resizeWindow = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cameraBack.aspect = window.innerWidth / window.innerHeight;
  cameraBack.updateProjectionMatrix();
  renderBack.setSize(window.innerWidth, window.innerHeight);
  renderer.setSize(window.innerWidth, window.innerHeight);
}
const on = () => {
  window.addEventListener('resize', () => {
    resizeWindow();
  })
}
const render = () => {
  plane.render(clock.getDelta());
  renderer.render(sceneBack, cameraBack, renderBack);
  postEffect.render(clock.getDelta());
  renderer.render(scene, camera);
}
const renderLoop = () => {
  render();
  requestAnimationFrame(renderLoop);
}

const init = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xeeeeee, 1.0);
  cameraBack.position.set(0, 16, 128);
  cameraBack.lookAt(new THREE.Vector3(0, 28, 0));

  scene.add(postEffect.mesh);
  sceneBack.add(plane.mesh);

  on();
  resizeWindow();
  renderLoop();
  buildIndexContent();

  for (var i = 0; i < hovers.length; i++) {
    new Hover(hovers[i]);
  }

  new ConsoleSignature();
}
init();
