const Deck = require("./deck");

class Game {
  constructor(options) {
    this.options = options;
    this.flipEnabled = true;
    this.started = false;
    this.timeout = 0;
    this.previousCard = null;
    this.score = 0;
    this.flips = 0;
    this.deck = new Deck(options.frontImages, options.backImage);
  }

  onStart() {}
  onFlip() {}
  onScoreUpdate() {}

  start() {
    if (this.started == true) return;
    for (let i = 0; i < this.deck.cards.length; i++) {
      this.deck.cards[i].id = i;
    }
    this.started = true;
    this.flipEnabled = true;
    this.onStart();
  }

  reset() {
    clearTimeout(this.timeout);
    this.score = 0;
    this.flips = 0;
    this.started = false;
    this.deck = new Deck(this.options.frontImages, this.options.backImage);
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
      setTimeout(() => this.unflipCards(card, previousCard), 100);
      this.previousCard = null;
    }
  }
}

module.exports = Game;
