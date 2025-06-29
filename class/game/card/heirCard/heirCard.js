/**
 * Represents an heir card in the game, extending the base Card class
 * Tracks heir priority and succession status
 */
class HeirCard extends Card {
  /**
   * Create a new heir card
   * @param {Object} data - The card data containing heir information
   */
  constructor(game, data) {
    super(game, data);
  }

  /**
   * Renders the heir card showing succession status
   * @returns {string} HTML representation of the heir card
   */
  render() {
    return `  
    <div class="card card-heir card-down card-${this.color}">
      <div class="card-center">
        <h1>👑</h1>
        <small>${this.description}</small>
      </div>
    </div>
    `;
  }
}
