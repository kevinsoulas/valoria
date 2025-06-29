/**
 * Represents a deck of cards
 */
class Deck {
  /**
   * Creates a new Deck instance
   * @param {Array} cards - Array of card objects to initialize the deck with
   */
  constructor(game, type, dataCards = null) {
    this.game = game;
    this.type = type;
    this.cards = [];
    if (dataCards) {
      switch (type) {
        case "family":
          this.cards = dataCards.map(
            (dataCard) => new FamilyCard(game, dataCard)
          );
          break;
        case "gift":
          this.cards = dataCards.map(
            (dataCard) => new GiftCard(game, dataCard)
          );
          break;
        case "character":
          this.cards = dataCards.map(
            (dataCard) => new CharacterCard(game, dataCard)
          );
          break;
        case "posture":
          this.cards = dataCards.map(
            (dataCard) => new PostureCard(game, dataCard)
          );
          break;
      }
    }
  }

  /**
   * Shuffles the deck
   */
  shuffle() {
    if (this.type == "posture") {
      // Group cards by chapter
      const cardsByChapter = {};
      this.cards.forEach((card) => {
        if (!cardsByChapter[card.chapter]) {
          cardsByChapter[card.chapter] = [];
        }
        cardsByChapter[card.chapter].push(card);
      });
      // Shuffle within each chapter
      Object.values(cardsByChapter).forEach((cards) => {
        cards.sort(() => Math.random() - 0.5);
      });
      // Combine back in chapter order
      this.cards = Object.keys(cardsByChapter)
        .sort((a, b) => a - b)
        .flatMap((chapter) => cardsByChapter[chapter]);
    } else {
      this.cards = this.cards.sort(() => Math.random() - 0.5);
    }
  }

  /**
   * Reverses the deck
   */
  reverse() {
    this.cards = this.cards.reverse();
  }

  /**
   * Select and draw a card by id
   * @param {string} id - The id of the card to select
   * @returns {Card} The selected card
   */
  select(player, id) {
    const card = this.cards.find((card) => card.id === id);
    if (card) {
      card.player = player;
      this.cards = this.cards.filter((card) => card.id !== id);
      return card;
    } else {
      this.game.log("Notice: Card not found");
      return null;
    }
  }

  /**
   * Adds a card to the deck
   * @param {Card} card - The card to add
   */
  add(card) {
    this.cards.push(card);
  }

  /**
   * Draws a card from the deck
   * @returns {Card} The drawn card
   */
  draw(player = null, hide = false) {
    if (this.cards.length === 0) {
      this.game.log("Notice: Cannot draw from empty deck");
      return null;
    }
    const card = this.cards.pop();
    card.player = player;
    if (hide) {
      card.hide();
    }
    return card;
  }

  /**
   * Draws a card from the deck by id
   * @param {string} id - The id of the card to draw
   * @returns {Card} The drawn card
   */
  drawId(id) {
    const card = this.cards.find((card) => card.id === id);
    if (card) {
      this.cards = this.cards.filter((card) => card.id !== id);
      return card;
    }
    return null;
  }

  /**
   * Empties the deck
   */
  empty() {
    this.cards = [];
  }

  /**
   * Returns the number of cards in the deck
   * @returns {number} The number of cards in the deck
   */
  countCard() {
    return this.cards.length;
  }

  /**
   * Renders all cards in the deck
   * Calls render() on each individual card
   */
  render() {
    return `
    <div class="cards-container">
      <div class="cards">
        ${this.cards.map((card) => card.render()).join("")}
      </div>
    </div>
    `;
  }
}
