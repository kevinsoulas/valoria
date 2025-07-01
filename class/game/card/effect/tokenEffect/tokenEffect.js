/**
 * Represents an effect that modifies a player's token amounts
 * Extends the base Effect class
 */
class TokenEffect extends Effect {
  /**
   * Creates a new TokenEffect instance
   * @param {string} typeValue - The type of token to modify (gold, favor, etc)
   * @param {string} f - The function to apply (set, add, or remove)
   * @param {number} fValue - The amount to modify by
   * @param {string|null} condition - Any condition that must be met (optional)
   */
  constructor(typeValue, f, fValue, condition) {
    super("token", typeValue, f, fValue, condition);
  }

  /**
   * Applies the effect to the player
   * @param {Player} player - The player to apply the effect to
   */
  on(player) {
    switch (this.f) {
      case "set":
        player.setToken(this.typeValue, this.fValue);
        break;
      case "add":
        player.addToken(this.typeValue, this.fValue);
        break;
      case "mult":
        player.multToken(this.typeValue, this.fValue);
        break;
      case "per":
        let count = player.countTokenAll(this.fValue);
        if (this.fValue === "life") {
          count += player.countTokenAll("immune");
        }
        player.addToken(this.typeValue, count);
        break;
    }
  }

  /**
   * Scores the effect
   * @param {Player} player - The player to score the effect for
   * @returns {number} The score of the effect
   */
  score(player) {
    let max = {
      gold: 7,
      favor: 7,
      prestige: 7,
      shield: 1,
      crime: 7,
      life:
        player.familyCard.slots.find((slot) => slot.type === "life")?.max || 0,
    };
    let adding = 0;
    switch (this.f) {
      case "set":
        adding = this.fValue - player.countToken(this.typeValue);
        break;
      case "add":
        adding = this.fValue;
        break;
      case "mult":
        adding = player.countToken(this.typeValue) * (this.fValue - 1);
        break;
      case "per":
        adding = player.countToken(this.fValue);
        break;
    }
    let adding_max = Math.min(
      adding,
      max[this.typeValue] - player.countToken(this.typeValue)
    );
    return adding_max * player.game.evals[this.typeValue];
  }

  /**
   * Renders the function and value as a string
   * @returns {string} The formatted value with appropriate +/- prefix
   */
  renderFValue(token) {
    switch (this.f) {
      case "set":
        if (this.fValue == 0) {
          return `<div class="no"><span>❌</span>${token}</div>`;
        }
        return `${this.fValue} ${token}`;
      case "add":
        return `${token}`.repeat(this.fValue);
      case "mult":
        return `x${this.fValue} ${token}`;
      case "per":
        switch (this.fValue) {
          case "life":
            return `${token} : ❤️`;
          case "favor":
            return `${token} : 👑`;
          case "prestige":
            return `${token} : 💎`;
          case "gift":
            return `${token} : 🍀`;
          case "crime":
            return `${token} : ☠️`;
          case "immune":
            return `${token} : 💛`;
        }
    }
  }

  /**
   * Renders the token type with an appropriate emoji
   * @returns {string} The formatted token name with emoji
   */
  renderToken() {
    switch (this.typeValue) {
      case "life":
        return `❤️`;
      case "shield":
        return `🛡️`;
      case "favor":
        return `👑`;
      case "prestige":
        return `💎`;
      case "gold":
        return `💰`;
      case "gift":
        return `🍀`;
      case "crime":
        return `☠️`;
      case "immune":
        return `💛`;
    }
  }

  /**
   * Renders the complete token effect as HTML
   * @returns {string} HTML string showing the token modification
   */
  render() {
    return `<div class="token-effect">${this.renderFValue(
      this.renderToken()
    )}${new Helper(this.typeValue).render()}</div>`;
  }
}
