/**
 * Represents the main game controller, managing game state, players and game flow
 */
class Game {
  /**
   * Creates a new Game instance and initializes core game components
   */
  constructor() {
    this.DEBUG = false;
    this.setting = {
      aiPlayers: 3,
      extension: 1,
    };
    this.scene = new Scene(this);
    this.logs = [];
  }

  /**
   * Sets the number of AI players
   * @param {number} amount - Number of AI players to set
   */
  setAIPlayers(amount) {
    this.setting.aiPlayers = Math.min(
      this.getMaxPlayers() - 1,
      Math.max(1, this.setting.aiPlayers + amount)
    );
    this.render();
  }

  /**
   * Sets the extension
   * @param {number} amount - Number of extension to set
   */
  setExtension(amount) {
    this.setting.extension = Math.min(
      2,
      Math.max(0, this.setting.extension + amount)
    );
    this.setAIPlayers(0);
    this.render();
  }

  /**
   * Creates a new game
   */
  newGame() {
    this.turn = -1;
    this.chapter = null;
    this.table = new Table(this);
    this.board = new Board(this);
    this.player = new Player(this);
    this.players = [this.player];
    this.opponent = null;
    this.characters = [];
    this.prophecy = 0;
    this.evals = {
      gold: 1,
      favor: 2,
      prestige: 2,
      shield: 2,
      life: 2,
      crime: 1,
      gift: 2,
      defeat: -15,
      victory: 15,
      vision: 1,
      denounce: 3,
      shame: 3,
      attack: 2,
      poison: 2,
      prophecy: 0,
      key: 0,
    };
    this.scene.setState("family");
    this.turnPerChapter = Math.floor(this.board.postureDeck.countCards() / 9);
    this.render();
  }

  /**
   * Continues the game
   */
  continueGame() {
    if (this.turn !== undefined) {
      this.scene.setState("play");
      this.render();
    }
  }

  /**
   * Restarts the game
   */
  restartGame() {
    this.newGame();
    this.render();
  }

  /**
   * Gets the maximum number of players
   * @returns {number} The maximum number of players
   */
  getMaxPlayers() {
    return Object.values(familyCards).filter(
      (family) => family.extension <= this.setting.extension
    ).length;
  }

  /**
   * Adds AI players to the game
   * @param {number} amount - Number of AI players to add
   */
  addAIPlayers() {
    let amount = this.setting.aiPlayers;
    for (let i = 0; i < amount; i++) {
      const ai = new AI(this);
      this.players.push(ai);

      // Select Valorage if available, otherwise random available family
      const availableFamilies = this.board.familyDeck.cards.filter(
        (c) => !this.players.some((p) => p.familyCard?.id === c.id)
      );
      const hasValorage = this.players.some(
        (p) => p.familyCard?.id === "valorage"
      );
      const familyId =
        i === amount - 1 && !hasValorage
          ? "valorage"
          : availableFamilies[
              Math.floor(Math.random() * availableFamilies.length)
            ].id;

      ai.selectFamily(familyId);
    }
    this.nextTurn();
  }

  /**
   * Next turn
   */
  nextTurn() {
    this.scene.setState("play");
    this.board.drawPostures();
    this.updateTurn();
    this.updatePosturesScores();
    for (const player of this.players) {
      if (player !== this.player && player.alive) {
        player.brain.mayPayCharacter();
        player.brain.mayUsePower();
        this.updatePosturesScores();
      }
    }
    this.render();
  }

  /**
   * Updates the chapter
   */
  updateTurn() {
    this.turn++;
    this.chapter = Math.floor(this.turn / this.turnPerChapter) + 1;
  }

  /**
   * Updates the scores of the postures
   */
  updatePosturesScores() {
    for (const player of this.players) {
      player.brain.scorePostures();
    }
  }

  /**
   * Ends the game (the king is dead)
   */
  die() {
    this.player.killCharacter("king");
    this.render();
  }

  /**
   * Checks if any player has enough prestige to overthrow the king
   * A player can overthrow if they have more prestige than both:
   * 1. The king's total prestige
   * 2. All other players' prestige
   * @returns {FamilyCard|null} The family card of the overthrowing player, or null if no overthrow
   */
  getOverthrone() {
    if (this.board.characters.length === 0) {
      return null;
    }
    // Get king's total prestige
    const kingPrestige = this.board.characters[0].countTokenAll("prestige");

    // Get all players' prestige counts
    const playerPrestigeCounts = this.players
      .filter((player) => player.alive)
      .map((player) => ({
        prestige: player.countTokenAll("prestige"),
        familyCard: player.familyCard,
      }));

    // Find player with highest prestige
    const maxPrestigePlayer = playerPrestigeCounts.reduce((max, current) =>
      current.prestige > max.prestige ? current : max
    );

    // Check if max prestige player has more than king and all other players
    const hasMoreThanKing = maxPrestigePlayer.prestige > kingPrestige;
    const hasMoreThanOthers = playerPrestigeCounts.every(
      (player) =>
        player === maxPrestigePlayer ||
        maxPrestigePlayer.prestige > player.prestige
    );

    if (hasMoreThanKing && hasMoreThanOthers) {
      return maxPrestigePlayer.familyCard;
    }
    return null;
  }

  /**
   * Updates the heir status based on favor tokens and heir priority
   * The player with most favor tokens and lowest heir priority becomes heir
   */
  getHeir() {
    if (this.board.characters.length === 0) {
      return null;
    }
    // Get all characters with favor tokens (from board and players)
    let candidates = [];

    // Add board characters with favor
    this.board.characters.forEach((character) => {
      const favorCount = character.countTokenAll("favor");
      if (favorCount > 0 && character.alive) {
        candidates.push({
          favorCount,
          heirPriority: character.heirPriority,
          card: character,
        });
      }
    });

    // Add players' characters with favor
    this.players.forEach((player) => {
      const favorCount = player.countTokenAll("favor");
      if (favorCount > 0 && player.alive) {
        candidates.push({
          favorCount,
          heirPriority: player.familyCard.heirPriority,
          card: player.familyCard,
        });
      }
    });

    // Sort by favor count descending, then by heir priority ascending
    candidates.sort((a, b) => {
      if (b.favorCount !== a.favorCount) {
        return b.favorCount - a.favorCount;
      }
      return a.heirPriority - b.heirPriority;
    });

    // Clear existing heir status
    this.board.characters.forEach((c) => (c.heir = false));
    this.players.forEach((p) => (p.heir = false));

    // Set heir status on character/player with most favor
    if (candidates.length > 0) {
      let heir = candidates[0];
      heir.card.heir = true;
      return heir.card;
    }

    return null;
  }

  /**
   * Open the opponent's table
   * @param {string} familyId - The family ID of the opponent to open
   */
  openOpponent(familyId) {
    const player = this.players.find(
      (player) => player.familyCard?.id === familyId
    );
    if (familyId === this.opponent?.familyCard?.id) {
      this.opponent = null;
    } else {
      this.opponent = player;
    }
    this.render();
  }

  /**
   * Renders the game state to the DOM, updating all UI components
   */
  render() {
    if (this.scene.state === "play") {
      this.overthrone = this.getOverthrone();
      this.heir = this.getHeir();
    }
    this.scene.render();
    const consoleElement = document.getElementById("console");
    if (consoleElement) {
      consoleElement.scrollTop = consoleElement.scrollHeight;
    }
  }

  /**
   * Logs a message to the console
   * @param {string} message - The message to log
   */
  log(message) {
    this.logs.push(message);
    console.log(message);
  }
}

// Create global game instance
window.game = new Game();

// Initialize game when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  game.render();
});
