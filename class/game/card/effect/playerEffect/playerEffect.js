/**
 * Represents an effect that can be applied to a player
 * Extends the base Effect class
 */
class PlayerEffect extends Effect {
  /**
   * Creates a new PlayerEffect instance
   * @param {string} typeValue - The type of effect to apply to the player
   * @param {string|null} f - The function to apply (optional)
   * @param {string|number|null} fValue - The value for the function (optional)
   * @param {string|null} condition - Any condition that must be met (optional)
   */
  constructor(typeValue, f, fValue, condition) {
    super("player", typeValue, f, fValue, condition);
  }

  /**
   * Applies the effect to the player
   * @param {Player} player - The player to apply the effect to
   */
  on(player) {
    switch (this.typeValue) {
      case "poisoned":
        // Apply poison effect to player
        player.poisoned();
        break;
      case "shamed":
        // Apply shame effect to player
        player.shamed();
        break;
      case "attacked":
        // Apply attack effect to player
        player.attacked();
        break;
      case "denounced":
        // Apply denounce effect to player
        player.denounced();
        break;
    }
  }

  /**
   * Calculates the score value of this effect
   * @param {Player} player - The player to score for
   * @returns {number} The score value (1 for all negative effects)
   */
  score(player) {
    switch (this.typeValue) {
      case "poisoned":
        if (player.countToken("life") > 0) {
          return -player.game.evals.life;
        }
        if (player.countTokenAll("life") === 1) {
          return player.game.evals.defeat;
        }
        return 0;
      case "shamed":
        return player.countToken("prestige") > 0
          ? -player.game.evals.prestige
          : 0;
      case "attacked":
        if (player.countTokenAll("shield") > 0) {
          return 0;
        }
        if (player.countToken("life") > 0) {
          return -player.game.evals.life;
        }
        if (
          player.countTokenAll("life") + player.countTokenAll("immune") ===
          1
        ) {
          return player.game.evals.defeat;
        }
      case "denounced":
        if (player.countToken("favor") > 0) {
          return -player.game.evals.favor;
        }
        return 0;
    }
  }

  /**
   * Renders the player effect with an appropriate emoji
   * @returns {string} The formatted effect name with emoji
   */
  renderPlayer() {
    switch (this.typeValue) {
      case "poisoned":
        return "🤢"; // Poison emoji + text
      case "shamed":
        return "💩"; // Shame emoji + text
      case "attacked":
        return "🗡️"; // Attack emoji + text
      case "denounced":
        return "😡"; // Denounce emoji + text
    }
  }

  /**
   * Renders the complete player effect as HTML
   * @returns {string} HTML string showing the effect
   */
  render() {
    return `<div class="player-effect">${this.renderPlayer()}${new Helper(
      this.typeValue
    ).render()}</div>`;
  }
}
