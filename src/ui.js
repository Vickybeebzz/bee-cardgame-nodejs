const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const fs = require("fs");
const filePath = "./best.txt";

let matrix = {
  A: {
    1: {},
    2: {},
    3: {},
    4: {},
  },
  B: {
    1: {},
    2: {},
    3: {},
    4: {},
  },
  C: {
    1: {},
    2: {},
    3: {},
    4: {},
  },
  D: {
    1: {},
    2: {},
    3: {},
    4: {},
  },
};

function buildMatrix(game) {
  matrix.A[1] = game.deck.cards[0];
  matrix.A[2] = game.deck.cards[1];
  matrix.A[3] = game.deck.cards[2];
  matrix.A[4] = game.deck.cards[3];
  matrix.B[1] = game.deck.cards[4];
  matrix.B[2] = game.deck.cards[5];
  matrix.B[3] = game.deck.cards[6];
  matrix.B[4] = game.deck.cards[7];
  matrix.C[1] = game.deck.cards[8];
  matrix.C[2] = game.deck.cards[9];
  matrix.C[3] = game.deck.cards[10];
  matrix.C[4] = game.deck.cards[11];
  matrix.D[1] = game.deck.cards[12];
  matrix.D[2] = game.deck.cards[13];
  matrix.D[3] = game.deck.cards[14];
  matrix.D[4] = game.deck.cards[15];
}

function drawUI(game) {
  buildMatrix(game);
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

  console.log(`Moves Used: ${game.flips}`);

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    console.log(`Best: ${data}`);
  } else {
    console.log(`Best: 0`);
  }

  if (game.score == 8) {
    console.log("You Win!");
    fs.writeFileSync(filePath, game.flips.toString());
    game.reset();
  } else {
    rl.question("Enter tile (e.g A 2): ", function (tile) {
      let splitString = tile.split(" ");
      if (
        tile === "" ||
        splitString[1] === undefined ||
        matrix[splitString[0]] === undefined ||
        matrix[splitString[0]][splitString[1]] === undefined
      ) {
        game.updateScore();
      } else {
        let id = matrix[splitString[0]][splitString[1]].id;
        game.flip(id);
      }
    });
  }
}

module.exports = { drawUI, buildMatrix };
