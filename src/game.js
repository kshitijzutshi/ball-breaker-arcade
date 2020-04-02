import { BG_IMG } from "/src/component.js";

// Select the canvas

const cvs = document.getElementById("breakout");

const ctx = cvs.getContext("2d");

const PADDLE_WIDTH = 100;
const PADDLE_MARGIN_BOTTOM = 50;
const PADDLE_HEIGHT = 20;
// Add border

cvs.style.border = "1px solid #0ff";

// Make line thick wile drawing on canvas
ctx.lineWidth = 3;

// const BG_IMG = new Image();

// BG_IMG.src = "/assets/images/bg.jpg";

// create paddle

const paddle = {
  x: cvs.width / 2 - PADDLE_WIDTH / 2,
  y: cvs.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT,
  width: PADDLE_WIDTH,
  height: PADDLE_HEIGHT,
  dx: 5
};

// Draw paddle
function drawPaddle() {
  ctx.fillStyle = "#2e3548";
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

  ctx.strokeStyle = "#ffcd05";
  ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function draw() {
  drawPaddle();
}

function update() {}

// function loop

function loop() {
  // Clear the canvas
  ctx.drawImage(BG_IMG, 0, 0);

  draw();

  update();

  requestAnimationFrame(loop);
}

loop();
