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
    return this.frontImage;
  }
}

module.exports = Card;
