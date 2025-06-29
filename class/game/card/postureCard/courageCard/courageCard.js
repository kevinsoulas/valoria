/**
 * Represents a courage card in the game, extending the base Card class
 * Each courage card can provide various effects and resources
 */
class CourageCard extends PostureCard {
  /**
   * Create a new courage card
   * @param {Object} data - The card data containing effects and resource modifications
   */
  constructor(game, data) {
    super(game, data);
  }
}
