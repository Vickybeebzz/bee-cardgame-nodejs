const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const fs = require("fs");
const { exit } = require("process");
const filePath = "./best.txt";

const letters = "ABCDEFGHIJ";
const numbers = "0123456789";
const data = "";

if (fs.existsSync(filePath)) data = fs.readFileSync(filePath);

function Matrix(options, game) {
  this.options = options;

  if (
    this.options.frontImages.length != 2 &&
    this.options.frontImages.length != 8 &&
    this.options.frontImages.length != 18 &&
    this.options.frontImages.length != 32 &&
    this.options.frontImages.length != 50
  ) {
    console.log(
      "Please enter 2, 8, 18, 32 or 50 images in the 'frontImages' array."
    );
    exit();
  }
  this.size = game.deck.cards.length;

  for (let i = 0; i < Math.sqrt(this.size); i++) {
    this[letters[i]] = [];
    for (let j = 0; j < Math.sqrt(this.size); j++) {
      this[letters[i]].push(this[numbers[j]]);
    }
  }

  let k = 0;
  for (let i = 0; i < Math.sqrt(this.size); i++) {
    for (let j = 0; j < Math.sqrt(this.size); j++) {
      this[letters[i]][numbers[j]] = game.deck.cards[k];
      k++;
    }
  }
}

function drawUI(matrix, game) {
  console.clear();
  let numberString = "";

  for (let i = 0; i < Math.sqrt(game.deck.cards.length); i++) {
    numberString += i + "  ";
  }

  console.log(`${numberString.padStart(numberString.length + 2, "  ")}`);

  for (let i = 0; i < Math.sqrt(game.deck.cards.length); i++) {
    let emojiLine = `${letters[i]} `;
    for (let j = 0; j < Math.sqrt(game.deck.cards.length); j++) {
      emojiLine += `${matrix[letters[i]][numbers[j]].getCurrentImage()} `;
    }
    console.log(emojiLine);
  }
  console.log(`Moves Used: ${game.flips}`);

  if (fs.existsSync(filePath)) {
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
        splitString.length === 2 ||
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

module.exports = { drawUI, Matrix };
