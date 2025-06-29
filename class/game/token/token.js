/**
 * Represents a game token that can be of different types (shield, life, favor, etc)
 */
class Token {
  /**
   * Creates a new token of the specified type
   * @param {string} type - The type of token (shield, life, favor, prestige, gold)
   */
  constructor(type) {
    this.type = type;
  }

  /**
   * Gets the emoji representation for this token's type
   * @returns {string} The emoji character for this token type
   */
  renderTokenEmoji() {
    switch (this.type) {
      case "shield":
        return "🛡️";
      case "life":
        return "❤️";
      case "favor":
        return "👑";
      case "prestige":
        return "💎";
      case "gold":
        return "💰";
      case "immune":
        return "💛";
      case "dead":
        return "💀";
      case "gift":
        return "🍀";
      case "prophecy":
        return "🔮";
      case "crime":
        return "☠️";
      case "key":
        return "🗝️";
    }
  }

  /**
   * Renders the HTML representation of this token
   * @returns {string} HTML string showing the token with its emoji
   */
  renderMini() {
    return `
    <div class="token-mini token-mini-${this.type}">
      ${this.renderTokenEmoji()}${new Helper(this.type).render()}
    </div>
    `;
  }

  /**
   * Renders the HTML representation of this token
   * @returns {string} HTML string showing the token with its emoji
   */
  render() {
    return `
    <div class="token token-${this.type}">
      ${this.renderTokenEmoji()}${new Helper(this.type).render()}
    </div>
    `;
  }
}
