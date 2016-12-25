precision highp float;

varying vec3 vPosition;

void main(void) {
  float opacity = (96.0 - length(vPosition)) / 256.0 * 0.8;
  vec3 color = vec3(0.6);
  gl_FragColor = vec4(color, opacity);
}
