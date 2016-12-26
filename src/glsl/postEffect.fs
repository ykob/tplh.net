precision highp float;

uniform float time;
uniform vec2 resolution;
uniform sampler2D texture;

varying vec3 vPosition;
varying vec2 vUv;

#pragma glslify: random = require(glsl-util/random);

void main() {
  float noise = random(vPosition.xy + time);
  vec4 color = texture2D(texture, vUv);
  gl_FragColor = color + vec4(vec3(noise * 0.1), 1.0);
}
