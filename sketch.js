let myShader;
let img;
let initMouse;
let tX;
let tY;

function preload() {
  myShader = loadShader("shader/shader.vert", "shader/shader.frag");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  img = loadImage("images/lady1.jpeg");

  shader(myShader);

  myShader.setUniform("tex", img);
  noStroke();

  initMouse = { x: width / 2, y: height / 2 };
  tX = initMouse.x;
  tY = initMouse.y;
}

function draw() {
  background(255, 0, 0);
  // lets map the mouseX to frequency and mouseY to amplitude
  // try playing with these to get a more or less distorted effect
  // 10 and 0.25 are just magic numbers that I thought looked good
  let mX = mouseX || initMouse.x;
  let mY = mouseY || initMouse.y;

  tX = tX + (mX - tX) * 0.05;
  tY = tY + (mY - tY) * 0.05;

  let freq = map2(tX, 0, width, 6, 10);
  let amp = map2(tY, 0, height, 0.15, 0.35);

  myShader.setUniform("frequency", freq);
  myShader.setUniform("amplitude", amp);
  myShader.setUniform("time", frameCount * 0.01);

  rect(0, 0, width, height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
