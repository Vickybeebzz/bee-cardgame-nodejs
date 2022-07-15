const { Console } = require("console");
const Game = require("./game");
const ui = require("./ui");

let game = new Game({
  frontImages: ["🐱", "🐼", "🐍", "🐝", "🐟", "🐸", "🦇", "🐁"],
  backImage: "⬜",
});

game.onStart = () => {
  ui.drawUI(game);
};

game.onScoreUpdate = () => {
  ui.drawUI(game);
};
game.start();
