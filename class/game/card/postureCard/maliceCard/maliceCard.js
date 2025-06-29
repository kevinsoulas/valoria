/**
 * Represents a malice card in the game, extending the base Card class
 * Each malice card can provide various effects and resources
 */
class MaliceCard extends PostureCard {
  /**
   * Create a new malice card
   * @param {Object} data - The card data containing effects and resource modifications
   */
  constructor(game, data) {
    super(game, data);
  }
}
