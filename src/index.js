const { Console } = require("console");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const Game = require("./game");

let game = new Game({
  frontImages: ["🐱", "🐼", "🐍", "🐝", "🐟", "🐸", "🦇", "🐁"],
  backImage: "⬜",
});

game.onStart = () => {
  require("./ui").drawUI(game);
  rl.question("Enter tile (e.g A 2): ", function (tile) {
    let splitString = tile.split(" ");
    if (tile === "") {
      game.updateScore();
    } else {
      let id = matrix[splitString[0]][splitString[1]].id;
      game.flip(id);
    }
  });
};

game.onScoreUpdate = () => {
  console.clear();
  console.log("   1  2  3  4");
  console.log(
    `A ${matrix.A[1].getCurrentImage()} ${matrix.A[2].getCurrentImage()} ${matrix.A[3].getCurrentImage()} ${matrix.A[4].getCurrentImage()}`
  );
  console.log(
    `B ${matrix.B[1].getCurrentImage()} ${matrix.B[2].getCurrentImage()} ${matrix.B[3].getCurrentImage()} ${matrix.B[4].getCurrentImage()}`
  );
  console.log(
    `C ${matrix.C[1].getCurrentImage()} ${matrix.C[2].getCurrentImage()} ${matrix.C[3].getCurrentImage()} ${matrix.C[4].getCurrentImage()}`
  );
  console.log(
    `D ${matrix.D[1].getCurrentImage()} ${matrix.D[2].getCurrentImage()} ${matrix.D[3].getCurrentImage()} ${matrix.D[4].getCurrentImage()}`
  );

  if (game.score == 8) {
    console.log("You Win!");
    game.reset();
  } else {
    rl.question("Enter tile (e.g A 2): ", function (tile) {
      let splitString = tile.split(" ");
      if (tile === "") {
        game.updateScore();
      } else {
        let id = matrix[splitString[0]][splitString[1]].id;
        game.flip(id);
      }
    });
  }
};
game.start();
