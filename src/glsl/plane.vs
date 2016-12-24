attribute vec3 position;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform float time;

varying vec3 vPosition;

#pragma glslify: rotateMatrixX = require(glsl-matrix/rotateMatrixX);
#pragma glslify: cnoise3 = require(glsl-noise/classic/3d);

void main(void) {
  vec3 updatePosition = (rotateMatrixX(radians(90.0)) * vec4(position, 1.0)).xyz;
  float sin1 = sin(updatePosition.x / 128.0);
  vec3 noisePosition = updatePosition + vec3(0.0, 0.0, time * -30.0);
  float noise1 = cnoise3(noisePosition * 0.08);
  float noise2 = cnoise3(noisePosition * 0.5);
  vec3 lastPosition = updatePosition + vec3(0.0, (noise1 * sin1 * 20.0) + noise2 * 1.2 + pow(abs(sin1), 2.0) * 60.0, 0.0);

  vPosition = lastPosition;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(lastPosition, 1.0);
}
