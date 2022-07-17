const Game = require("./game");
const ui = require("./ui");

const options = {
  frontImages: ["🐱", "🐼", "🐍", "🐝", "🐟", "🐸", "🦇", "🐁"],
  backImage: "⬜",
};

let game = new Game(options);
let matrix;

game.onStart = () => {
  matrix = new ui.Matrix(options, game);
  ui.drawUI(matrix, game);
};

game.onScoreUpdate = () => {
  ui.drawUI(matrix, game);
};
game.start();
