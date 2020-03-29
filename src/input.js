export default class InputHandler {
  constructor(paddle) {
    document.addEventListener("keydown", event => {
      // alert(event.keyCode);
      switch (event.keyCode) {
        case 37:
          // alert("Move Left");
          paddle.moveLeft();
          break;

        case 39:
          paddle.moveRight();
          break;

        default:
          break;
      }
    });

    document.addEventListener("keyup", event => {
      // alert(event.keyCode);
      switch (event.keyCode) {
        case 37:
          // alert("Move Left");
          if (paddle.speed < 0) paddle.stop();
          break;

        case 39:
          if (paddle.speed > 0) paddle.stop();
          break;

        default:
          break;
      }
    });
  }
}
