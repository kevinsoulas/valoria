/**
 * Represents a wisdom card in the game, extending the base Card class
 * Each wisdom card can provide various effects and resources
 */
class WisdomCard extends PostureCard {
  /**
   * Create a new wisdom card
   * @param {Object} data - The card data containing effects and resource modifications
   */
  constructor(game, data) {
    super(game, data);
  }
}
