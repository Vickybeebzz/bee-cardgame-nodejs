const { Console } = require("console");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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

class Game {
  constructor() {
    this.flipEnabled = true;
    this.started = false;
    this.timeout = 0;
    this.previousCard = null;
    this.score = 0;
    this.flips = 0;
    this.deck = new Deck(
      ["🐱", "🐼", "🐍", "🐝", "🐟", "🐸", "🦇", "🐁"],
      "⬜"
    );
  }

  onStart() {}
  onFlip() {}
  onScoreUpdate() {}

  start() {
    if (this.started == true) return;
    for (let i = 0; i < this.deck.cards.length; i++) {
      this.deck.cards[i].id = i;
    }
    buildMatrix(this.deck);
    this.started = true;
    this.flipEnabled = true;
    this.onStart();
  }

  reset() {
    clearTimeout(this.timeout);
    this.score = 0;
    this.flips = 0;
    this.started = false;
    this.deck = new Deck(
      ["🐱", "🐼", "🐍", "🐝", "🐟", "🐸", "🦇", "🐁"],
      "⬜"
    );
    this.start();
  }

  flip(cardId) {
    const card = this.deck.cards[cardId];
    if (this.deck.cards[cardId].flipped == true) return;

    if (this.previousCard == null) {
      this.openFirstCard(cardId);
    } else {
      this.openSecondCard(cardId);
      this.checkCards(card, this.previousCard);
    }
    this.updateScore();
  }

  openFirstCard(cardId) {
    this.deck.cards[cardId].flipped = true;
    this.previousCard = this.deck.cards[cardId];
    this.flips = this.flips + 1;
  }

  openSecondCard(cardId) {
    this.deck.cards[cardId].flipped = true;
    this.flips = this.flips + 1;
  }

  unflipCards(card, previousCard) {
    card.flipped = false;
    previousCard.flipped = false;
    this.onFlip(card);
    this.onFlip(previousCard);
  }

  updateScore() {
    this.onScoreUpdate();
  }

  checkCards(card, previousCard) {
    if (card.value == previousCard.value) {
      this.score = this.score + 1;
      this.previousCard = null;
      if (this.score == 8) {
        setTimeout(() => this.updateScore(), 1000);
      }
      this.flipEnabled = true;
    } else {
      setTimeout(() => this.unflipCards(card, previousCard), 1000);
      this.previousCard = null;
      setTimeout(() => (this.flipEnabled = true), 1000);
    }
  }
}

class Card {
  constructor(value, backImage, frontImage) {
    this.id = 0;
    this.value = value;
    this.flipped = false;
    this.backImage = backImage;
    this.frontImage = frontImage;
  }

  getCurrentImage() {
    if (this.flipped == false) return this.backImage;
    else return this.frontImage;
  }
}

class Deck {
  constructor(frontImages, backImage) {
    this.cards = frontImages
      .map((image, index) => [
        new Card(index, backImage, image),
        new Card(index, backImage, image),
      ])
      .flat()
      .sort((a, b) => 0.5 - Math.random());
  }
}

function buildMatrix(deck) {
  matrix.A[1] = deck.cards[0];
  matrix.A[2] = deck.cards[1];
  matrix.A[3] = deck.cards[2];
  matrix.A[4] = deck.cards[3];
  matrix.B[1] = deck.cards[4];
  matrix.B[2] = deck.cards[5];
  matrix.B[3] = deck.cards[6];
  matrix.B[4] = deck.cards[7];
  matrix.C[1] = deck.cards[8];
  matrix.C[2] = deck.cards[9];
  matrix.C[3] = deck.cards[10];
  matrix.C[4] = deck.cards[11];
  matrix.D[1] = deck.cards[12];
  matrix.D[2] = deck.cards[13];
  matrix.D[3] = deck.cards[14];
  matrix.D[4] = deck.cards[15];
}

let game = new Game();

game.onStart = () => {
  console.log("   A  B  C  D");
  console.log(
    `1 ${matrix.A[1].getCurrentImage()} ${matrix.A[2].getCurrentImage()} ${matrix.A[3].getCurrentImage()} ${matrix.A[4].getCurrentImage()}`
  );
  console.log(
    `2 ${matrix.B[1].getCurrentImage()} ${matrix.B[2].getCurrentImage()} ${matrix.B[3].getCurrentImage()} ${matrix.B[4].getCurrentImage()}`
  );
  console.log(
    `3 ${matrix.C[1].getCurrentImage()} ${matrix.C[2].getCurrentImage()} ${matrix.C[3].getCurrentImage()} ${matrix.C[4].getCurrentImage()}`
  );
  console.log(
    `4 ${matrix.D[1].getCurrentImage()} ${matrix.D[2].getCurrentImage()} ${matrix.D[3].getCurrentImage()} ${matrix.D[4].getCurrentImage()}`
  );

  rl.question("Enter tile (e.g A 2): ", function (tile) {
    let splitString = tile.split(" ");
    let id = matrix[splitString[0]][splitString[1]].id;
    game.flip(id);
  });
};

game.onScoreUpdate = () => {
  console.clear();
  console.log("   A  B  C  D");
  console.log(
    `1 ${matrix.A[1].getCurrentImage()} ${matrix.A[2].getCurrentImage()} ${matrix.A[3].getCurrentImage()} ${matrix.A[4].getCurrentImage()}`
  );
  console.log(
    `2 ${matrix.B[1].getCurrentImage()} ${matrix.B[2].getCurrentImage()} ${matrix.B[3].getCurrentImage()} ${matrix.B[4].getCurrentImage()}`
  );
  console.log(
    `3 ${matrix.C[1].getCurrentImage()} ${matrix.C[2].getCurrentImage()} ${matrix.C[3].getCurrentImage()} ${matrix.C[4].getCurrentImage()}`
  );
  console.log(
    `4 ${matrix.D[1].getCurrentImage()} ${matrix.D[2].getCurrentImage()} ${matrix.D[3].getCurrentImage()} ${matrix.D[4].getCurrentImage()}`
  );

  if (game.score == 8) {
    console.log("You Win!");
    game.reset();
  } else {
    rl.question("Enter tile (e.g A 2): ", function (tile) {
      let splitString = tile.split(" ");
      let id = matrix[splitString[0]][splitString[1]].id;
      game.flip(id);
    });
  }
};
game.start();
