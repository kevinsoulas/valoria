/**
 * Represents the game table that displays other players' information
 */
class Table {
  /**
   * Creates a new Table instance
   * @param {Game} game - Reference to the main game instance
   */
  constructor(game) {
    this.game = game;
  }

  /**
   * Renders the table showing all other players except the current player
   * @returns {string} HTML representation of other players' tables
   */
  render() {
    return this.game.players
      .filter((player) => player !== this.game.player)
      .map(
        (player) => `
        <div>
          ${player.renderTable()}
        </div>
      `
      )
      .join("");
  }
}
