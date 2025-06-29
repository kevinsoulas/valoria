/**
 * Represents an effect that grants special powers to a player
 * Extends the base Effect class
 */
class PowerEffect extends Effect {
  /**
   * Creates a new PowerEffect instance
   * @param {string} typeValue - The type of power to grant (vision, attacked, prophecy)
   * @param {string|null} f - The function to apply (optional)
   * @param {string|number|null} fValue - The value for the function (optional)
   * @param {string|null} condition - Any condition that must be met (optional)
   */
  constructor(typeValue, f, fValue, condition) {
    super("power", typeValue, f, fValue, condition);
  }

  /**
   * Applies the power effect to the player
   * @param {Player} player - The player to apply the effect to
   */
  on(player) {
    player.power = this.typeValue;
  }

  /**
   * Scores the effect
   * @param {Player} player - The player to score the effect for
   * @returns {number} The score of the effect
   */
  score(player) {
    if (player.power) {
      return 0;
    }
    switch (this.typeValue) {
      case "vision":
        if (player.game.scene.state === "play") {
          return player.game.evals.vision;
        }
        let max = 0;
        for (const posture of player.game.board.postures) {
          let score =
            player.brain.evals.stdDev[posture.id] -
            player.brain.evals.scores[posture.id];
          if (score > max) {
            max = score;
          }
        }
        return max;
      case "poison":
        if (
          player.game.players.some(
            (p) =>
              p !== player &&
              p.countToken("life") > 0 &&
              p.countTokenAll("immune") === 0
          )
        ) {
          return player.game.evals.poison;
        }
        return 0;
      case "attack":
        if (
          player.game.players.some(
            (p) => p !== player && p.countTokenAll("shield") === 0
          )
        ) {
          return player.game.evals.attack;
        }
        return 0;
      case "shame":
        if (
          player.countToken("prestige") ===
          player.game.board.characters[0].countToken("prestige")
        ) {
          return player.game.evals.victory;
        }
        if (
          player.game.players.some(
            (p) => p !== player && p.countToken("prestige") > 0
          )
        ) {
          return player.game.evals.shame;
        }
        return 0;
      case "steal":
        const hasShield =
          player.game.characters.some((c) => c.countToken("shield") > 0) ||
          player.game.players.some(
            (p) => p !== player && p.familyCard?.countToken("shield") > 0
          );
        if (hasShield) {
          return player.game.evals.shield;
        }
        if (
          player.game.players.some(
            (p) => p !== player && p.gifts.countCard() > 0
          )
        ) {
          return player.game.evals.gift;
        }
        return 0;
      case "denounce":
        if (player.game.heir && player.game.heir !== player.familyCard) {
          return player.game.evals.denounce;
        }
        return 0;
      case "gift-choice":
        return 0;
      case "meet":
        return 0;
      case "regicide":
        if (player.game.heir === player.familyCard) {
          return player.game.evals.victory;
        }
        return player.game.evals.defeat;
    }
  }

  /**
   * Renders the power type with an appropriate emoji
   * @returns {string} The formatted power name with emoji
   */
  renderPower() {
    switch (this.typeValue) {
      case "vision":
        return `👁️`;
      case "poison":
        return `▸🤢◂`;
      case "attack":
        return `▸🗡️◂`;
      case "shame":
        return `▸💩◂`;
      case "steal":
        return `▸😈◂`;
      case "denounce":
        return `▸😡◂`;
      case "gift-choice":
        return `▸🍀◂`;
      case "meet":
        return `▸😶◂`;
      case "regicide":
        return `▸💀◂`;
    }
  }

  /**
   * Renders the complete power effect as HTML
   * @returns {string} HTML string showing the power granted
   */
  render() {
    return `<div class="power-effect">${this.renderPower()}${new Helper(
      this.typeValue
    ).render()}</div>`;
  }
}
