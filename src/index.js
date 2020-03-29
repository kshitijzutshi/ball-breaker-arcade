import "./styles.css";
import Game from "/src/game";

// document.getElementById("app").innerHTML = `
// <h1>Hello Vanilla!</h1>
// <div>
//   We use Parcel to bundle this sandbox, you can find more info about Parcel
//   <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
// </div>
// `;

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

// Now if you change any param say width, it morphs the object, so to clear the previous stuff
// and draw again on canvas we use clear fn.
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let game = new Game(GAME_WIDTH, GAME_HEIGHT);
game.start();

ctx.clearRect(0, 0, 800, 600);

// ctx.fillStyle = "red";

// // 4 param -> x, y, width, height
// ctx.fillRect(20, 20, 100, 100);
// ctx.fillStyle = "blue";

// ctx.fillRect(220, 200, 50, 50);

// paddle.draw(ctx);

let lastTime = 0;

function gameLoop(timestamp) {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  game.update(deltaTime);
  game.draw(ctx);

  // when next frame is ready call gameloop again, it calculates deltatime etc., and continue
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
