/**
 * Represents a gift card in the game, extending the base Card class
 * Each gift card can provide various effects and resources
 */
class GiftCard extends Card {
  /**
   * Create a new gift card
   * @param {Object} data - The card data containing effects and resource modifications
   */
  constructor(game, data) {
    super(game, data);
  }

  /**
   * Renders the front face of the gift card showing name, description and actions
   * @returns {string} HTML representation of the card front
   */
  render() {
    if (this.face === "up") {
      return `
      <div class="card card-gift card-${this.color}">
        <div class="card-tokens">
          ${this.renderTokens()}
        </div>
        <div class="card-header">
          <p class="card-name">${this.name}</p>
        </div>
        <div class="card-content">
          <small class="grey card-description">${this.description}</small>
          <div class="possible-effects">
            <div class="effects">
              ${
                this.id !== "cheat"
                  ? this.effects.map((effect) => effect.render()).join("")
                  : ""
              }  
            </div>
          </div>
        </div>
        ${this.renderActions()}
      </div>
      `;
    }
    if (this.face === "down") {
      return `
      <div class="card card-gift card-down">
        <div class="card-center">
          ${new Token("gift").renderTokenEmoji()}
        </div>
        ${this.renderActions()}
      </div>
      `;
    }
  }

  renderActions() {
    this.actions = [];
    // Vision power
    if (
      this.player &&
      this.game.player.power === "vision" &&
      this.player !== this.player.game.player &&
      this.player.gifts.cards[this.player.gifts.countCards() - 1] === this &&
      this.player.hand.visible === false
    ) {
      this.actions.push(
        new Action(
          "Look",
          `game.player.lookHand('${this.player.familyCard.id}')`
        )
      );
    }
    // Use gift
    if (this.player === this.game.player && this.effects.length > 0) {
      this.actions.push(new Action("Use", `game.player.useGift('${this.id}')`));
    }
    // Steal gift
    if (this.player !== this.game.player) {
      if (
        this.player &&
        this.game.player.power === "steal" &&
        ((this.player.gifts.cards[this.player.gifts.countCards() - 1] ===
          this &&
          this.player.hand.visible === false) ||
          this.player.hand.visible === true)
      ) {
        this.actions.push(
          new Action(
            "Steal",
            `game.player.stealGift('${this.player.familyCard.id}', '${this.id}')`
          )
        );
      }
    }
    // Pick a gift
    if (this.game.player.power == "gift-choice") {
      if (this.player == null) {
        this.actions.push(
          new Action("Pick", `game.player.selectGift('${this.id}')`)
        );
      }
    }
    return `
    <div class="card-footer">
      ${this.actions.map((action) => action.render()).join("")}
    </div>
    `;
  }
}
