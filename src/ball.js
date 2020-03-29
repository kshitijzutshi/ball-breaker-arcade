export default class Ball {
  constructor(game) {
    this.image = document.getElementById("img_ball");
    this.speed = {
      x: 2,
      y: 2
    };
    this.position = {
      x: 10,
      y: 10
    };
    this.size = 16;
    this.game = game;
    this.gameHeight = game.gameHeight;
    this.gameWidth = game.gameWidth;
  }

  draw(ctx) {
    // to do
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  update(deltaTime) {
    // to do
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    // wall on left or right
    if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }

    // wall on top
    if (this.position.x + this.size > this.gameHeight || this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }
  }
}
