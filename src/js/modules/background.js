import THREE from 'three';
import glslify from 'glslify';

export default class Background {
  constructor(canvas) {
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    });
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 10000);
    this.mesh = this.createMesh();
    this.scene.add(this.camera);
    this.scene.add(this.mesh);
  }
  createMesh() {
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: {
          type: 'f',
          value: 0,
        },
        resolution: {
          type: 'v2',
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        }
      },
      vertexShader: glslify('../../glsl/background.vs'),
      fragmentShader: glslify('../../glsl/background.fs'),
      shading: THREE.FlatShading,
    });
    return new THREE.Mesh(geometry, material);
  }
  render() {
    this.mesh.material.uniforms.time.value++;
    this.renderer.render(this.scene, this.camera);
  }
  resize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }
}
