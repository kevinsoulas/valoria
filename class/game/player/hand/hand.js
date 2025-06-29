/**
 * Display player's hand of gift cards
 * This class is responsible for rendering the visual representation
 * of a player's current hand of cards
 */
class Hand {
  /**
   * Creates a new Hand instance
   * @param {Player} player - The player whose hand will be displayed
   */
  constructor(player) {
    this.player = player;
  }

  hide() {
    this.visible = false;
    for (const card of this.player.gifts.cards) {
      card.hide();
    }
  }

  show() {
    this.visible = true;
    for (const card of this.player.gifts.cards) {
      card.show();
    }
  }

  /**
   * Renders the player's current hand of cards
   * Creates a container with the player's gift cards
   * Uses flexbox layout for card positioning
   * @returns {string} HTML string representing the player's hand
   */
  render() {
    if (this.visible) {
      this.show();
      return `
      <div class="cards-container">
        <div class="cards">
          ${this.player.gifts.render()}
        </div>
      </div>
      `;
    } else {
      this.hide();
      return `
      <div class="card-group">
        ${this.player.gifts.render()}
      </div>
      `;
    }
  }
}
