import { BG_IMG } from "/src/component.js";

// Select the canvas

const cvs = document.getElementById("breakout");

const ctx = cvs.getContext("2d");

const PADDLE_WIDTH = 100;
const PADDLE_MARGIN_BOTTOM = 50;
const PADDLE_HEIGHT = 20;
let leftArrow = false;
let rightArrow = false;
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

// Move paddle
function movePaddle() {
  if (rightArrow && paddle.x + paddle.width < cvs.width) {
    paddle.x += paddle.dx;
  } else if (leftArrow && paddle.x > 0) {
    paddle.x -= paddle.dx;
  }

  // this.position.x += this.speed;

  // if (rightArrow) {
  //   paddle.x += paddle.dx;
  //   if (paddle.x + paddle.width > cvs.width)
  //     paddle.x = cvs.width - paddle.width;
  //   else if (leftArrow) {
  //     paddle.x -= paddle.dx;
  //     if (paddle.x < 0) paddle.x = 0;
  //   }
  // }
}

function draw() {
  drawPaddle();
}

function update() {
  // function loop
  movePaddle();
}
function loop() {
  // Clear the canvas
  ctx.drawImage(BG_IMG, 0, 0);

  draw();

  update();

  requestAnimationFrame(loop);
}

loop();
