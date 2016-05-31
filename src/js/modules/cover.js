import THREE from ('three');
import glslify from ('glslify');

export default class Cover {
  constructor(canvas) {
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
    });
  }
}
