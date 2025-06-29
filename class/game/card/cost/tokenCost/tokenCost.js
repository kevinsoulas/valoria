/**
 * Represents a cost that requires spending tokens
 * Extends the base Cost class
 */
class TokenCost extends Cost {
  /**
   * Creates a new TokenCost instance
   * @param {string} typeValue - The type of token required (gold, favor, etc)
   * @param {string} f - The function to apply (set, add, or remove)
   * @param {number} fValue - The amount required
   */
  constructor(typeValue, f, fValue) {
    super("token", typeValue, f, fValue);
  }

  /**
   * Checks if the player can pay the token cost
   * @param {Player} player - The player to check
   * @returns {boolean} Whether the player has enough tokens
   */
  canPay(player) {
    return player.countToken(this.typeValue) >= this.fValue;
  }

  /**
   * Makes the player pay the token cost
   * @param {Player} player - The player paying the cost
   */
  pay(player) {
    player.removeToken(this.typeValue, this.fValue);
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
   * Renders the token type with an appropriate emoji
   * @returns {string} The formatted token name with emoji
   */
  renderToken() {
    switch (this.typeValue) {
      case "gold":
        return `💰`;
      case "favor":
        return `👑`;
      case "prestige":
        return `💎`;
      case "shield":
        return `🛡️`;
      case "life":
        return `❤️`;
    }
  }

  /**
   * Renders the formatted value of the token cost
   * @returns {string} The formatted value
   */
  renderFValue(token) {
    switch (this.fValue) {
      case "gift-count":
        return `${game.board.giftDeck.cards.length} ${token} (size of 🍀 gift deck)`;
      default:
        return `${this.fValue} ${token}`;
    }
  }

  /**
   * Renders the complete token cost as HTML
   * @returns {string} HTML string showing the token cost
   */
  render() {
    return `<div class="token-cost">${this.renderFValue(
      this.renderToken()
    )}${new Helper().renderCost()}</div>`;
  }
}
