import { BG_IMG } from "/src/component.js";

// Select the canvas

const cvs = document.getElementById("breakout");

const ctx = cvs.getContext("2d");

const PADDLE_WIDTH = 100;
const PADDLE_MARGIN_BOTTOM = 50;
const PADDLE_HEIGHT = 20;
const BALL_RAD = 8;
let leftArrow = false;
let rightArrow = false;
let LIFE = 3;
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

// create ball
const ball = {
  x: cvs.width / 2,
  y: paddle.y - BALL_RAD,
  radius: BALL_RAD,
  speed: 4,
  dx: 3,
  dy: -3
};

// Draw ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#ffcd05";
  ctx.fill();

  ctx.strokeStyle = "#2e3548";
  ctx.stroke();
  ctx.closePath();
}

// Move the ball

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;
}

// Ball collision detection
function ballWallCollision() {
  // right boundary and left wall boundary
  if (ball.x + ball.radius > cvs.width || ball.x - ball.radius < 0)
    ball.dx = -ball.dx;
  // top boundary
  if (ball.y - ball.radius < 0) ball.dy = -ball.dy;
  // bottom wall
  if (ball.y + ball.radius > cvs.height) LIFE--;
  resetBall();
}

// Reset ball function
function resetBall() {
  ball.x = cvs.width / 2;
  ball.y = paddle.y - BALL_RAD;
  ball.radius = BALL_RAD;
  ball.dx = 3;
  ball.dy = -3;
}
// Add keyup and keydown event listners
document.addEventListener("keydown", function(event) {
  if (event.keyCode === 37) {
    leftArrow = true;
  } else if (event.keyCode === 39) {
    rightArrow = true;
  }
});

document.addEventListener("keyup", function(event) {
  if (event.keyCode === 37) {
    leftArrow = false;
  } else if (event.keyCode === 39) {
    rightArrow = false;
  }
});

// Move paddle function add here
function movePaddle() {
  if (rightArrow && paddle.x + paddle.width < cvs.width) {
    paddle.x += paddle.dx;
  } else if (leftArrow && paddle.x > 0) {
    paddle.x -= paddle.dx;
  }
}

function draw() {
  drawPaddle();
  drawBall();
}

function update() {
  // function loop
  movePaddle();
  moveBall();
  ballWallCollision();
}
function loop() {
  // Clear the canvas
  ctx.drawImage(BG_IMG, 0, 0);

  draw();

  update();

  requestAnimationFrame(loop);
}

loop();
