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

let emoji = ["⬜", "🐱", "🐼", "🐍", "🐝", "🐟", "🐸", "🦇", "🐁"];

class Game {
  constructor() {
    this.flipEnabled = true;
    this.started = false;
    this.timeout = 0;
    this.previousCard = null;
    this.score = 0;
    this.flips = 0;
    this.deck = new Deck();
  }

  onStart() {}
  onFlip() {}
  onScoreUpdate() {}

  start() {
    if (this.started == true) return;
    this.deck.shuffle();
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
    this.deck = new Deck();
    this.start();
  }

  flip(cardId) {
    const card = this.deck.cards.find((c) => c.id == cardId);
    if (this.deck.cards[cardId].flipped == true) return;

    if (this.previousCard == null) {
      this.openFirstCard(cardId);
    } else {
      this.openSecondCard(cardId);
      this.checkCards(card, this.previousCard);
    }
    this.onFlip(card);
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
  constructor(id, value) {
    this.id = id;
    this.value = value;
    this.flipped = false;
    this.image = emoji[0];
  }
}

class Deck {
  constructor() {
    this.cards = [];

    for (let i = 0; i < 16; i++) {
      this.cards[i] = new Card(i, Math.round((i + 1) / 2));
      this.cards[i].id = i;
    }
  }

  shuffle = function () {
    shuffle(this.cards);
  };
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

function shuffle(arr) {
  let j = 0;
  let temp;

  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}

let game = new Game();

game.onStart = () => {
  console.log("   A  B  C  D");
  console.log(
    `1 ${matrix.A[1].image} ${matrix.A[2].image} ${matrix.A[3].image} ${matrix.A[4].image}`
  );
  console.log(
    `2 ${matrix.B[1].image} ${matrix.B[2].image} ${matrix.B[3].image} ${matrix.B[4].image}`
  );
  console.log(
    `3 ${matrix.C[1].image} ${matrix.C[2].image} ${matrix.C[3].image} ${matrix.C[4].image}`
  );
  console.log(
    `4 ${matrix.D[1].image} ${matrix.D[2].image} ${matrix.D[3].image} ${matrix.D[4].image}`
  );

  rl.question("Enter tile (e.g A 2): ", function (tile) {
    let splitString = tile.split(" ");
    let id = matrix[splitString[0]][splitString[1]].id;
    game.flip(id);
  });
};

game.onFlip = (card) => {
  if (card.flipped == true) {
    card.image = emoji[card.value];
  } else {
    card.image = "⬜";
  }
};

game.onScoreUpdate = () => {
  console.clear();
  console.log("   A  B  C  D");
  console.log(
    `1 ${matrix.A[1].image} ${matrix.A[2].image} ${matrix.A[3].image} ${matrix.A[4].image}`
  );
  console.log(
    `2 ${matrix.B[1].image} ${matrix.B[2].image} ${matrix.B[3].image} ${matrix.B[4].image}`
  );
  console.log(
    `3 ${matrix.C[1].image} ${matrix.C[2].image} ${matrix.C[3].image} ${matrix.C[4].image}`
  );
  console.log(
    `4 ${matrix.D[1].image} ${matrix.D[2].image} ${matrix.D[3].image} ${matrix.D[4].image}`
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
