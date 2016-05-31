import THREE from ('three');
import glslify from ('glslify');

export default class Background {
  constructor(canvas) {
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    });
  }
}
