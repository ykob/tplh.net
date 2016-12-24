precision highp float;

varying vec3 vPosition;

void main(void) {
  float opacity = (96.0 - length(vPosition)) / 256.0;
  gl_FragColor = vec4(0.2, 0.2, 0.2, opacity);
}
