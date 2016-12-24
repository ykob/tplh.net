precision highp float;

varying vec3 vPosition;

void main(void) {
  float opacity = (96.0 - length(vPosition)) / 256.0 * 0.6;
  gl_FragColor = vec4(0.5, 0.5, 0.5, opacity);
}
