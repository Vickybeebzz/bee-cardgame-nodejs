const Card = require("./card");

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

module.exports = Deck;
