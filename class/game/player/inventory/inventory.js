/**
 * Display player resources
 * This class is responsible for rendering the visual representation
 * of a player's current state in the game
 */
class Inventory {
  /**
   * Creates a new Inventory instance
   * @param {Player} player - The player whose inventory will be displayed
   */
  constructor(player) {
    this.player = player;
  }

  render() {
    return `
    ${this.renderGroup("prestige")}
    ${this.renderGroup("favor")}
    ${this.renderGroup("gold")}
    `;
  }

  renderGroup(resourceId) {
    const resource = this.player[resourceId];
    if (!resource || resource.amount === 0) {
      return "";
    }

    const cards = Array(resource.amount)
      .fill()
      .map(
        () => `
        <div class="card">${resource.renderResourceEmoji()}<div class="card-center"><h1>${resource.renderResourceEmoji()}</h1></div></div>
      `
      )
      .join("");

    return `
    <div class="card-group">
      ${cards}
    </div>
    `;
  }
}
