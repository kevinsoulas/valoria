/**
 * Represents the game board that manages decks and game state
 */
class Board {
  /**
   * Creates a new Board instance
   * @param {Game} game - Reference to the main game instance
   */
  constructor(game) {
    this.game = game;
    // Initialize deck of family cards
    this.familyDeck = new Deck(game, "family", familyCards);
    // Filter family cards based on game extension level
    this.familyDeck.cards = this.familyDeck.cards.filter(
      (card) => card.extension <= game.setting.extension
    );
    // Initialize deck of gift cards
    this.giftDeck = new Deck(game, "gift", giftCards);
    // Filter gift cards based on game extension level
    this.giftDeck.cards = this.giftDeck.cards.filter(
      (card) => card.extension >= 0 && card.extension <= game.setting.extension
    );
    this.giftDeck.shuffle();
    // Initialize deck of posture cards
    this.postureDeck = new Deck(
      game,
      "posture",
      this.generatePossibleEffects(postureCards)
    );
    // Filter posture cards based on game extension level
    this.postureDeck.cards = this.postureDeck.cards.filter(
      (card) => card.extension <= game.setting.extension
    );
    this.postureDeck.shuffle();
    this.postureDeck.reverse();
    // Initialize deck of character cards
    this.characterDeck = new Deck(game, "character", characterCards);
    // Filter character cards based on game extension level
    this.characterDeck.cards = this.characterDeck.cards.filter(
      (card) => card.extension <= game.setting.extension
    );
    this.characterDeck.shuffle();
    // Initialize discard deck
    this.discardDeck = new Deck(game, "discard");
    // Initialize characters
    this.characters = [];
    // Initialize postures
    this.postures = [];
    // Initialize heir
    this.heir = null;
  }

  /**
   * Generates possible effects for a list of cards
   * @param {Array} cards - Array of cards
   * @returns {Array} Array of cards with possible effects
   */
  generatePossibleEffects(cards) {
    let newCards = [];
    for (const card of cards) {
      if (card.possibleChapters) {
        // Shuffle the possible chapters
        card.possibleChapters = card.possibleChapters.sort(
          () => Math.random() - 0.5
        );
      }
      if (card.possibleEffects) {
        for (let i = 0; i < card.possibleEffects.length; i++) {
          let newCard = { ...card };
          newCard.effects = card.possibleEffects[i];
          newCard.variation = i + 1;
          newCard.chapter = card.possibleChapters[i];
          newCards.push(newCard);
        }
      } else {
        newCards.push(card);
      }
    }
    return newCards;
  }

  /**
   * Draw postures for a new turn
   */
  drawPostures() {
    this.postures = [];
    if (this.postureDeck.countCards() > 0) {
      // Draw three cards
      for (let i = 0; i < 3; i++) {
        this.postures.push(this.postureDeck.draw(null, true));
      }
      // Draw one character card
      if (this.characterDeck.countCards() > 0) {
        if (this.characters.length === 0) {
          this.characters.push(this.characterDeck.drawId("king"));
        } else {
          this.characters.push(this.characterDeck.draw());
        }
      }
    }
  }

  /**
   * Applies the effects of the postures
   */
  applyPosturesEffects() {
    this.game.scene.setState("revealing");

    // Apply postures
    for (let i = 0; i < this.postures.length; i++) {
      const posture = this.postures[i];
      // Apply posture to players
      for (const player of this.game.players) {
        if (player.posture && player.posture.id === posture.id) {
          posture.playOn(player, true);
          posture.show();
          // Remember posture for all players
          for (const playerMemory of this.game.players) {
            playerMemory.brain.remember(posture);
          }
        }
      }
    }

    // Reset player postures and check if AI players can use gifts or pay characters
    for (const player of this.game.players) {
      player.posture = null;
      // Check if AI players can use gifts or pay characters
      for (const player of this.game.players) {
        if (player !== this.game.player) {
          player.brain.mayUseGifts();
        }
      }
    }

    // Render
    this.game.render();
  }

  /**
   * Renders the board based on game state
   * @returns {string} HTML representation of the board
   */
  render() {
    return `
      ${this.renderTurn()}
      ${this.renderPostures()}
      ${this.renderCharacters()}
      ${this.renderCharacterDeck()}
      ${this.renderGiftDeck()}
    `;
  }

  renderTurn() {
    if (this.game.turn < 0) {
      return `<p class="section">Game board</p>`;
    }
    return `<p class="section">Chapter ${this.game.chapter}<br>Turn ${
      (this.game.turn % this.game.turnPerChapter) + 1
    } / ${this.game.turnPerChapter}</p>`;
  }

  /**
   * Renders the postures
   * @returns {string} HTML representation of the postures
   */
  renderPostures() {
    return `
    <div id="postures" class="cards-container">
      <div class="cards">
        ${this.renderPostureCards()}
        ${this.renderPostureDeck()}
      </div>
    </div>
    `;
  }

  /**
   * Renders the next turn button
   * @returns {string} HTML representation of the next turn button
   */
  renderPostureDeck() {
    if (this.postureDeck.countCards() > 0) {
      return `
        <div class="card card-down">
          <div class="card-center">
            ${
              this.game.scene.state === "revealing" &&
              this.game.player.power != "meet"
                ? `<button onclick="game.nextTurn()">Next turn</button>`
                : ""
            }
          </div>
        </div>
      `;
    }
    return `
    <div class="card card-ghost">
      <div class="card-center">
        <button onclick="game.die()">End game</button>
      </div>
    </div>
  `;
  }

  /**
   * Renders the posture cards on the board
   * @returns {string} HTML representation of all posture cards, or empty string if none
   */

  renderPostureCards() {
    if (this.postures.length > 0) {
      return `${this.postures.map((card) => card.render()).join("")}`;
    }
    return ``;
  }

  /**
   * Renders the characters
   * @returns {string}
   */
  renderCharacters() {
    if (
      this.characters.length > 0 &&
      this.game.player.power != "gift-choice" &&
      (this.game.player.power != "meet" || this.characters.length > 0)
    ) {
      return `
      <div id="characters" class="cards-container">
        <div class="cards">
          ${this.characters.length > 0 ? this.characters[0].render() : ""}
          ${this.renderOverthrone()}
          ${this.renderHeir()}
          ${this.characters
            .slice(1)
            .map((card) => card.render())
            .join("")}
        </div>
      </div>
      `;
    }
    return "";
  }

  renderOverthrone() {
    if (this.game.overthrone) {
      return `
        <div class="card card-ghost">
          <div class="card-center">
            <small>Overthroned by</small>
            <p style="padding: 3px;">${this.game.overthrone.name}</p>
            <p>${"💎".repeat(
              this.game.overthrone.player.countTokenAll("prestige")
            )}</p>
          </div>
        </div>
      `;
    }
    return "";
  }

  /**
   * Renders the heir
   * @returns {string} HTML representation of the heir
   */
  renderHeir() {
    if (this.game.heir && !this.game.overthrone) {
      let countFavor = 0;
      if (this.game.heir.type === "character") {
        countFavor = this.game.heir.countTokenAll("favor");
      } else {
        countFavor = this.game.heir.player.countTokenAll("favor");
      }
      return `
      <div class="card card-ghost">
        <div class="card-center">
          <small>${!this.characters[0].alive ? "New king!" : "Heir"}</small>
          <p style="padding: 3px;">${this.game.heir.name}</p>
          <p>${"👑".repeat(countFavor)}</p>
        </div>
      </div>
      `;
    }
    return "";
  }

  /**
   * Renders the gift deck
   * @returns {string} HTML representation of the gift deck
   */
  renderGiftDeck() {
    if (this.game.player.power == "gift-choice") {
      return `
        <div id="gift-deck">
          <p class="section">Pick a gift</p>
          ${this.giftDeck.render()}
        </div>
      `;
    }
    return "";
  }

  /**
   * Renders the character deck
   * @returns {string} HTML representation of the character deck
   */
  renderCharacterDeck() {
    if (
      this.game.player.power == "meet" &&
      this.characterDeck.countCards() > 0
    ) {
      return `
        <div id="character-deck">
          <p class="section">Pick a character</p>
          ${this.characterDeck.render()}
        </div>
      `;
    }
    return "";
  }
}
