const { Console } = require("console");
const Game = require("./game");

let game = new Game({
  frontImages: ["🐱", "🐼", "🐍", "🐝", "🐟", "🐸", "🦇", "🐁"],
  backImage: "⬜",
});

game.onStart = () => {
  require("./ui").drawUI(game);
};

game.onScoreUpdate = () => {
  require("./ui").drawUI(game);
};
game.start();
