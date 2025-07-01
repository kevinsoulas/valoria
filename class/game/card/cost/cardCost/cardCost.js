/**
 * Represents a cost that requires discarding cards
 * Extends the base Cost class
 */
class CardCost extends Cost {
  /**
   * Creates a new CardCost instance
   * @param {string} typeValue - The type of card required (life, heir, etc)
   * @param {string} f - The function to apply (set, add, or remove)
   * @param {number} fValue - The number of cards required
   */
  constructor(typeValue, f, fValue) {
    super("card", typeValue, f, fValue);
  }

  /**
   * Checks if the player can pay the card cost
   * @param {Player} player - The player to check
   * @returns {boolean} Whether the player has enough cards
   */
  canPay(player) {
    if (this.typeValue === "prophecy" || this.typeValue === "key") {
      // Count cards with prophecy token
      const prophecyCards = player.gifts.cards.filter((card) =>
        card.hasToken(this.typeValue)
      );
      return prophecyCards.length >= this.fValue;
    }
    return player.countCards(this.typeValue) >= this.fValue;
  }

  /**
   * Makes the player pay the card cost by discarding cards
   * @param {Player} player - The player paying the cost
   */
  pay(player) {
    if (this.typeValue === "prophecy" || this.typeValue === "key") {
      // Find and discard cards with prophecy token
      for (let i = 0; i < this.fValue; i++) {
        const cards = player.gifts.cards.filter((card) =>
          card.hasToken(this.typeValue)
        );
        if (cards.length > 0) {
          const card = cards[0];
          player.discardCardId(card.id);
        }
      }
      return;
    }
    player.discardCardType(this.typeValue, this.fValue);
  }

  /**
   * Scores the cost
   * @param {Player} player - The player to score the cost for
   * @returns {number} The score of the cost
   */
  score(player) {
    return this.fValue * player.game.evals[this.typeValue];
  }

  /**
   * Renders the card type with an appropriate emoji
   * @returns {string} The formatted card name with emoji
   */
  renderCard() {
    switch (this.typeValue) {
      case "gift":
        return `🍀`;
      case "prophecy":
        return `🔮`;
      case "key":
        return `🗝️`;
    }
  }

  /**
   * Renders the complete card cost as HTML
   * @returns {string} HTML string showing the card cost
   */
  render() {
    return `<div class="card-cost">${
      this.fValue
    } ${this.renderCard()}${new Helper().renderCost()}</div>`;
  }
}
