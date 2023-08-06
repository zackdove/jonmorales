#ifdef GL_ES
precision mediump float;
#endif
  
precision highp float;

varying vec2 vUV;

uniform sampler2D tex;
uniform float time;
uniform float frequency;
uniform float amplitude;

void main() {
  vec2 uv = vUV;
  // uv.y = uv.y * -1.0;

  // lets create a sine wave to distort our texture coords
  // we will use the built in sin() function in glsl
  // sin() returns the sine of an angle in radians
  // first will multiply our uv * frequency -- frequency will control how many hills and valleys will be in the wave
  // then we add some time to our sine, this will make it move 
  // lastly multiply the whole thing by amplitude -- amplitude controls how tall the hills and valleys are, in this case it will be how much to distort the image
  // *try changing uv.y to uv.x and see what happens
  float sineWave = sin(uv.x * frequency + time) * amplitude;

  // create a vec2 with our sine
  // what happens if you put sineWave in the y slot? in Both slots?
  vec2 distort = vec2(sineWave, -1.);

  // use mod() to wrap our texcoords back to 0.0 if they go over 1.0
  float dim = 2.0;
  vec2 length = vec2(1.);
  uv = uv + distort;
  uv = fract(uv * 0.5) * 2.;
  uv = length - abs(uv - length);
  vec4 texColor = texture2D(tex, uv);

  gl_FragColor = texColor;
}