/**
 * Represents a settings card in the game, extending the base Card class
 * Allows configuring number of AI players before starting game
 */
class SettingCard extends Card {
  /**
   * Create a new settings card
   * @param {Object} data - The card data
   */
  constructor(game, data) {
    super(game, data);
  }

  /**
   * Renders the settings card
   * @returns {string} HTML representation of the card
   */
  render() {
    return `
    <div class="card card-setting">
      <div class="card-center">
        ${this.name}
      </div>
      ${this.renderActions()}
    </div>
    `;
  }

  renderActions() {
    this.actions = [];
    if (this.game.scene.state === "setting") {
      this.actions.push(new Action(`Play`, `game.addAIPlayers()`));
    }
    return `
    <div class="card-footer">
      ${this.actions.map((action) => action.render()).join("")}
    </div>
    `;
  }
}
