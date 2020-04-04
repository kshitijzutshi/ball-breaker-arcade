import {
  BG_IMG,
  LEVEL_IMG,
  LIFE_IMG,
  SCORE_IMG,
  WALL_HIT,
  LIFE_LOST,
  PADDLE_HIT,
  WIN,
  BRICK_HIT
} from "/src/component.js";

// Select the canvas

const cvs = document.getElementById("breakout");

const ctx = cvs.getContext("2d");

const PADDLE_WIDTH = 100;
const PADDLE_MARGIN_BOTTOM = 50;
const PADDLE_HEIGHT = 20;
const BALL_RAD = 8;
let leftArrow = false;
let rightArrow = false;
let LEVEL = 1;
const MAX_LEVEL = 3;
let GAME_OVER = false;
let LIFE = 3;
let SCORE = 0;
let SCORE_UNIT = 10;

// Add border

cvs.style.border = "1px solid #0ff";

// Make line thick wile drawing on canvas
ctx.lineWidth = 3;

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

// Move paddle function add here
function movePaddle() {
  if (rightArrow && paddle.x + paddle.width < cvs.width) {
    paddle.x += paddle.dx;
  } else if (leftArrow && paddle.x > 0) {
    paddle.x -= paddle.dx;
  }
}

// create ball
const ball = {
  x: cvs.width / 2,
  y: paddle.y - BALL_RAD,
  radius: BALL_RAD,
  speed: 4,
  dx: 3 * (Math.random() * 2 - 1),
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
  if (ball.x + ball.radius > cvs.width || ball.x - ball.radius < 0) {
    ball.dx = -ball.dx;
    WALL_HIT.play();
  }

  //top boundary
  if (ball.y - ball.radius < 0) {
    ball.dy = -ball.dy;
    WALL_HIT.play();
  }
  // // bottom wall
  if (ball.y + ball.radius > cvs.height) {
    LIFE--;
    LIFE_LOST.play();
    resetBall();
  }
}

// Ball paddle collision
function ballPaddleCollision() {
  if (
    ball.x < paddle.x + paddle.width &&
    ball.x > paddle.x &&
    ball.y > paddle.y
  ) {
    PADDLE_HIT.play();
    // Now check where the ball hit the paddle
    let collidePoint = ball.x - (paddle.x + paddle.width / 2);

    // Normalize the values
    collidePoint = collidePoint / (paddle.width / 2);

    // Calculate the angle of the ball
    let angle = (collidePoint * Math.PI) / 3;

    // Change the ball dx, dy considering the angle

    ball.dx = ball.speed * Math.sin(angle);
    ball.dy = -ball.speed * Math.cos(angle);

    // This changes in ball movement dosent cosider the angle of impact of the ball on the paddlle

    // ball.dx = -ball.dx;
    // ball.dy = -ball.dy;
  }
}

// Reset ball function
function resetBall() {
  ball.x = cvs.width / 2;
  ball.y = paddle.y - BALL_RAD;
  ball.radius = BALL_RAD;
  ball.dx = 3 * (Math.random() * 2 - 1);
  ball.dy = -3;
}

// create the brick
const brick = {
  row: 3,
  coloumn: 5,
  width: 55,
  height: 20,
  offsetLeft: 20,
  offsetTop: 20,
  marginTop: 40,
  fillColor: "#2e3548",
  strokeColor: "#FFF"
};

// create bricks
let bricks = [];

function createBricks() {
  for (let r = 0; r < brick.row; r++) {
    bricks[r] = [];
    for (let c = 0; c < brick.coloumn; c++) {
      bricks[r][c] = {
        x: c * (brick.offsetLeft + brick.width) + brick.offsetLeft,
        y:
          r * (brick.offsetTop + brick.height) +
          brick.offsetTop +
          brick.marginTop,
        status: true
      };
    }
  }
}

createBricks();

// draw the bricks
function drawBricks() {
  for (let r = 0; r < brick.row; r++) {
    for (let c = 0; c < brick.coloumn; c++) {
      let b = bricks[r][c];
      // if brick not broken
      if (b.status) {
        ctx.fillStyle = brick.fillColor;
        ctx.fillRect(b.x, b.y, brick.width, brick.height);

        ctx.strokeStyle = brick.strokeColor;
        ctx.strokeRect(b.x, b.y, brick.width, brick.height);
      }
    }
  }
}

// ball and brick collision detection
function ballBrickCollision() {
  for (let r = 0; r < brick.row; r++) {
    for (let c = 0; c < brick.coloumn; c++) {
      let b = bricks[r][c];
      // if brick not broken
      if (b.status) {
        if (
          ball.x + ball.radius > b.x &&
          ball.x - ball.radius < b.x + brick.width &&
          ball.y + ball.radius > b.y &&
          ball.y - ball.radius < b.y + brick.height
        ) {
          BRICK_HIT.play();
          ball.dy = -ball.dy;
          b.status = false;
          SCORE += SCORE_UNIT;
        }
      }
    }
  }
}

// Show game stats

function showGameStats(text, textX, textY, img, imgX, imgY) {
  ctx.fillStyle = "#FFF";
  ctx.font = "25px Germania One";
  ctx.fillText(text, textX, textY);

  // draw image
  ctx.drawImage(img, imgX, imgY, 25, 25);
}

function draw() {
  drawPaddle();
  drawBall();
  drawBricks();

  // SHOW SCORES

  showGameStats(SCORE, 35, 25, SCORE_IMG, 5, 5);
  showGameStats(LIFE, cvs.width - 25, 25, LIFE_IMG, cvs.width - 55, 5);
  showGameStats(LEVEL, cvs.width / 2, 25, LEVEL_IMG, cvs.width / 2 - 30, 5);
}

// Game over rules

function gameOver() {
  if (LIFE <= 0) {
    showYouLose();
    GAME_OVER = true;
  }
}

// function to level up

function levelUp() {
  let isLevelDone = true;
  for (let r = 0; r < brick.row; r++) {
    for (let c = 0; c < brick.coloumn; c++) {
      isLevelDone = isLevelDone && !bricks[r][c].status;
    }
  }
  if (isLevelDone) {
    WIN.play();
    if (LEVEL >= MAX_LEVEL) {
      showYouWin();
      GAME_OVER = true;
      return;
    }
    brick.row += 1;
    createBricks();
    ball.speed += 1;
    resetBall();
    LEVEL += 1;
  }
}

function update() {
  // function loop
  movePaddle();
  moveBall();
  ballWallCollision();
  ballPaddleCollision();
  ballBrickCollision();
  levelUp();
  gameOver();
}
function loop() {
  // Clear the canvas
  ctx.drawImage(BG_IMG, 0, 0);

  draw();

  update();

  if (!GAME_OVER) {
    requestAnimationFrame(loop);
  }
}

loop();

// SELECT SOUND ELEMENT

const soundElement = document.getElementById("sound");
soundElement.addEventListener("click", audioManager);

function audioManager() {
  // This function changes the source to sound off or on
  let imgsrc = soundElement.getAttribute("src");
  let SOUND_IMG =
    imgsrc === "/assets/images/SOUND_ON.png"
      ? "/assets/images/SOUND_OFF.png"
      : "/assets/images/SOUND_ON.png";

  // Now change source
  soundElement.setAttribute("src", SOUND_IMG);

  // mute and unmute sounds

  WALL_HIT.muted = WALL_HIT.muted ? false : true;
  PADDLE_HIT.muted = PADDLE_HIT.muted ? false : true;
  BRICK_HIT.muted = BRICK_HIT.muted ? false : true;
  WIN.muted = WIN.muted ? false : true;
  LIFE_LOST.muted = LIFE_LOST.muted ? false : true;
}

// SHOW GAME OVER MESSAGES

const gameover = document.getElementById("gameover");
const youwon = document.getElementById("youwon");
const youlose = document.getElementById("youlose");
const restart = document.getElementById("restart");

restart.addEventListener("click", function() {
  location.reload(); // reload the page
});

// Show you win
function showYouWin() {
  gameover.style.display = "block";
  youwon.style.display = "block";
}

// Show you lose
function showYouLose() {
  gameover.style.display = "block";
  youlose.style.display = "block";
}
