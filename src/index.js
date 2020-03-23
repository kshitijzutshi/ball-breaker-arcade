import "./styles.css";

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
ctx.clearRect(0, 0, 800, 600);

// ctx.fillStyle = "red";

// // 4 param -> x, y, width, height
// ctx.fillRect(20, 20, 100, 100);
// ctx.fillStyle = "blue";

// ctx.fillRect(220, 200, 50, 50);
