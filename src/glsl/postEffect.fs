precision highp float;

uniform float time;
uniform vec2 resolution;
uniform sampler2D texture;

varying vec3 vPosition;
varying vec2 vUv;

float rand(vec2 co){
  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
  float noise = rand(vPosition.xy + time);
  vec4 color = texture2D(texture, vUv);
  gl_FragColor = color + vec4(vec3(noise * 0.1), 1.0);
}
