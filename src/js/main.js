var Get = require('./get');
var get = new Get();
var debounce = require('./debounce');
var Camera = require('./camera');
var HemiLight = require('./hemiLight');
var Mesh = require('./mesh');

var bodyWidth = document.body.clientWidth;
var bodyHeight = document.body.clientHeight;
var fps = 60;
var lasttimeBallMove = +new Date();
var raycaster = new THREE.Raycaster();
var mouseVector = new THREE.Vector2(-2, -2);
var intersects;

var canvas;
var renderer;
var scene;
var camera;
var light;
var ball;

var initThree = function() {
  canvas = document.getElementById('background-canvas');
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  if (!renderer) {
    alert('Three.jsの初期化に失敗しました。');
  }
  renderer.setSize(bodyWidth, bodyHeight);
  canvas.appendChild(renderer.domElement);
  renderer.setClearColor(0xeeeeee, 1.0);
  
  scene = new THREE.Scene();
};

var init = function() {
  var ballGeometry = new THREE.DodecahedronGeometry(5000, 1);
  var ballMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    side: THREE.BackSide,
    shading: THREE.FlatShading
  });

  initThree();
  
  camera = new Camera();
  camera.init(get.radian(20), get.radian(0), bodyWidth, bodyHeight);
  
  light = new HemiLight();
  light.init(scene, get.radian(0), get.radian(270), 1000, 0xffffff, 0xcccccc, 1);
  
  ball = new Mesh();
  ball.init(scene, ballGeometry, ballMaterial);
  scene.add(ball.mesh);
  
  renderloop();
  debounce(window, 'resize', function(event){
    resizeRenderer();
  });
};

var render = function() {
  renderer.clear();
  ball.updateVertices();
  renderer.render(scene, camera.obj);
};

var renderloop = function() {
  var now = +new Date();
  render();
  setTimeout(renderloop, 1000 / fps);
};

var resizeRenderer = function() {
  bodyWidth  = document.body.clientWidth;
  bodyHeight = document.body.clientHeight;
  renderer.setSize(bodyWidth, bodyHeight);
  camera.init(get.radian(20), get.radian(0), bodyWidth, bodyHeight);
};

init();
