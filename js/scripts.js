// Source: https://codepen.io/Alca/pen/ZeKjmB

var canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  textFont('Roboto Mono');
}

function draw() {
  background(0);

  noFill();

  var now = new Date();

  var mil = now.getMilliseconds();
  var sec = now.getSeconds() + mil / 1000;
  var min = now.getMinutes() + sec / 60;
  var hou = now.getHours() + min / 60;
  var h = hou / 24;
  var m = min / 60;
  var s = sec / 60;

  translate(width / 2, height / 2);

  var x = Math.min(width, height) * 0.9;
  var x2 = x * 0.9;
  var x3 = x * 0.8;

  strokeCap(SQUARE);
  strokeWeight(30 / 1000 * x);
  textAlign(CENTER, CENTER);

  push();
  rotate(-HALF_PI);

  stroke('#53DF83');
  arc(0, 0, x, x, 0, TAU * h);
  stroke('#47D2E9');
  arc(0, 0, x2, x2, 0, TAU * m);
  stroke('#FFF');
  arc(0, 0, x3, x3, 0, TAU * s);
  pop();

  noStroke();
  fill('#FFF');

  textSize(100 / 1000 * x);
  text([floor(hou),
    floor(min),
    floor(sec)
    ].map(function(n) { return ('0' + n).slice(-2) }).join(':'),
    0,
    0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
