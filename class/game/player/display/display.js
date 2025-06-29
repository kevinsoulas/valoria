/**
 * Display player family card and resources
 * This class is responsible for rendering the visual representation
 * of a player's current state in the game
 */
class Display {
  /**
   * Creates a new Display instance
   * @param {Player} player - The player whose state will be displayed
   */
  constructor(player) {
    this.player = player;
  }
  /**
   * Renders the complete display including family card and all tokens
   * @returns {string} HTML string containing all display elements
   */
  render() {
    return `
    ${this.renderHeir()}
    ${this.player.familyCard ? this.player.familyCard.render() : ""}
    ${this.renderSlots()}
    `;
  }

  /**
   * Renders the player's heir card
   * @returns {string} HTML string of the heir card or empty string
   */
  renderHeir() {
    return this.player.heirCard ? this.player.heirCard.render() : "";
  }

  /**
   * Renders the player's slots in a card group
   * @returns {string} HTML string of the slots or empty string if none
   */
  renderSlots() {
    return this.player.slots
      .map((slot) => {
        return slot && slot.tokens.length > 0
          ? `
    <div class="token-group">
      ${slot.tokens.map((token) => token.render()).join("")}
    </div>
    `
          : "";
      })
      .join("");
  }
}
