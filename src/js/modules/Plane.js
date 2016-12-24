const glslify = require('glslify');

export default class Plane {
  constructor() {
    this.uniforms = {
      time: {
        type: 'f',
        value: 0,
      },
    };
    this.mesh = this.createMesh();
    this.time = 1;
  }
  createMesh() {
    return new THREE.Mesh(
      new THREE.PlaneGeometry(256, 256, 256, 256),
      new THREE.RawShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: glslify('../../glsl/plane.vs'),
        fragmentShader: glslify('../../glsl/plane.fs'),
        transparent: true
      })
    );
  }
  render(time) {
    this.uniforms.time.value += time * this.time;
  }
}
