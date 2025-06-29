/**
 * AI player class that extends the base Player class
 * Handles automated decision making for non-human players
 */
class AI extends Player {
  /**
   * Creates a new AI player instance
   * @param {Game} game - The game instance this AI belongs to
   */
  constructor(game) {
    super(game);
  }

  /**
   * Randomly selects and plays a posture card for the AI
   * Chooses between courage, wisdom and malice postures
   */
  playAIPosture() {
    if (!this.alive) {
      return;
    }
    this.brain.scorePostures();
    let postureId = this.pickPostureId();
    if (postureId) {
      this.playPosture(postureId);
    }
  }

  /**
   * Finds the best posture to play
   * @returns {string} The ID of the best posture to play
   */
  pickPostureId() {
    // Pick a random posture weighted by chances
    const rand = Math.random();
    let cumulative = 0;
    for (const posture of this.game.board.postures) {
      cumulative += this.brain.evals.chances[posture.id];
      if (rand <= cumulative) {
        return posture.id;
      }
    }
  }

  /**
   * Uses vision to look at a posture
   * @param {string} postureId - The ID of the posture to look at
   */
  useVision(postureId) {
    let posture = this.game.board.postures.find(
      (posture) => posture.id === postureId
    );
    this.game.log(`${this.familyCard.name} uses vision on ${posture.name}`);
    // Remember the posture we looked at
    this.brain.remember(posture);
    // Recalculate scores with new information
    this.brain.scorePostures();
  }
}
