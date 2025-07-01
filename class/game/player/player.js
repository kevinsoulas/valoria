/**
 * Represents a player in the game, managing their cards, tokens, and game state
 */
class Player {
  /**
   * Create a new player and initialize their game components
   * @param {Game} game - The game instance this player belongs to
   */
  constructor(game) {
    // Reference to parent game instance for accessing shared state
    this.game = game;

    // UI Components for displaying player state and cards
    this.display = new Display(this);
    this.hand = new Hand(this);

    // Player's selected family card that determines their abilities
    this.alive = true;
    this.familyCard = null;

    // Player's heir card representing their heir status
    this.heirCard = null;
    this.heirPosition = null;

    // Slots
    this.CARD_TOKENS = ["shield", "life"];
    this.slots = [
      new Slot("favor", 7),
      new Slot("prestige", 7),
      new Slot("gold", 7),
      new Slot("crime", 7),
    ];

    // Gift cards in player's possession that can be used for effects
    this.gifts = new Deck(game, "gift");

    // Power of the player
    this.power = null;

    // Posture
    this.posture = null;

    // Brain
    this.brain = new Brain(game, this);
  }

  /**
   * Selects a family card for this player and initializes their starting state
   * @param {string} familyId - The unique ID of the family card to select
   */
  selectFamily(familyId) {
    // Retrieve and assign the chosen family card
    this.familyCard = this.game.board.familyDeck.select(this, familyId);
    this.familyCard.player = this;
    this.familyCard.actions = [];

    // Set up initial player state
    this.familyCard.playOn(this);

    // Update game state if this is the active player
    if (this.game.player === this) {
      // ["cheat", "prophecy-1", "prophecy-2"].forEach((id) => {
      //   const card = this.game.board.giftDeck.select(this, id);
      //   if (card) this.gifts.add(card);
      // });
      this.game.addAIPlayers();
      this.hand.show();
      this.game.render();
    }
  }

  /**
   * Plays a posture card
   * @param {string} postureId - The posture being played
   */
  playPosture(postureId) {
    this.posture = this.game.board.postures.find(
      (posture) => posture.id === postureId
    );
    if (this.game.player === this) {
      // AI players play
      for (const player of this.game.players) {
        if (player !== this) {
          player.hand.hide();
          player.playAIPosture();
        }
      }
      this.game.board.applyPosturesEffects();
    }
  }

  /**
   * Hides a posture card from view
   * @param {string} id - The unique ID of the posture card to hide
   */
  backPosture(id) {
    const posture = this.game.board.postures.find(
      (posture) => posture.id === id
    );
    posture.hide();
    this.game.render();
  }

  /**
   * Counts the number of tokens of a specific type
   * @param {string} type - The type of token to count (shield, life, favor, prestige, gold)
   * @returns {number} The number of tokens of the specified type
   */
  countToken(type) {
    if (this.CARD_TOKENS.includes(type)) {
      return this.familyCard.countToken(type);
    } else {
      return this.slots.find((slot) => slot.type === type)?.countToken() || 0;
    }
  }

  /**
   * Counts the total number of tokens of a specific type, including both slots and permanent tokens
   * @param {string} type - The type of token to count (shield, life, favor, prestige, gold)
   * @returns {number} The total number of tokens of the specified type
   */
  countTokenAll(type) {
    return (
      this.familyCard.countTokenAll(type) +
      (this.slots.find((slot) => slot.type === type)?.countToken() || 0)
    );
  }

  /**
   * Sets the number of tokens of a specific type
   * @param {string} type - The type of token to set (shield, life, favor, prestige, gold)
   * @param {number} amount - The number of tokens to set
   */
  setToken(type, amount = 1) {
    if (this.CARD_TOKENS.includes(type)) {
      const slot = this.familyCard.slots.find((slot) => slot.type === type);
      if (slot) {
        this.familyCard.setToken(type, amount);
      }
    } else {
      this.slots.find((slot) => slot.type === type).setToken(amount);
    }
  }

  /**
   * Adds tokens to the player's slots
   * @param {string} type - The type of token to add (shield, life, favor, prestige, gold)
   * @param {number} amount - The number of tokens to add (default: 1)
   */
  addToken(type, amount = 1) {
    if (this.CARD_TOKENS.includes(type)) {
      const slot = this.familyCard.slots.find((slot) => slot.type === type);
      if (slot) {
        this.familyCard.addToken(type, amount);
      }
    } else {
      this.slots.find((slot) => slot.type === type).addToken(amount);
    }
  }

  /**
   * Removes tokens from the player's slots
   * @param {string} type - The type of token to remove (shield, life, favor, prestige, gold)
   * @param {number} amount - The number of tokens to remove (default: 1)
   */
  removeToken(type, amount = 1) {
    if (this.CARD_TOKENS.includes(type)) {
      const slot = this.familyCard.slots.find((slot) => slot.type === type);
      if (slot) {
        this.familyCard.removeToken(type, amount);
      }
    } else {
      this.slots.find((slot) => slot.type === type).removeToken(amount);
    }
  }

  /**
   * Multiplies the number of tokens of a specific type
   * @param {string} type - The type of token to multiply (shield, life, favor, prestige, gold)
   * @param {number} amount - The number of times to multiply the tokens (default: 1)
   */
  multToken(type, amount = 1) {
    if (this.CARD_TOKENS.includes(type)) {
      const slot = this.familyCard.slots.find((slot) => slot.type === type);
      if (slot) {
        this.familyCard.multToken(type, amount);
      }
    } else {
      this.slots.find((slot) => slot.type === type).multToken(amount);
    }
  }

  /**
   * Checks if the player can pay the costs of a character card
   * @param {string} characterId - The unique ID of the character card to check
   * @returns {boolean} True if the player can pay the costs, false otherwise
   */
  canPayCharacter(characterId) {
    const character = this.game.board.characters.find(
      (card) => card.id === characterId
    );
    return character.costs.every((cost) => cost.canPay(this));
  }

  /**
   * Pays a character card from the character deck
   * @param {string} characterId - The unique ID of the character card to pay
   */
  payCharacter(characterId) {
    const character = this.game.board.characters.find(
      (card) => card.id === characterId
    );
    if (character) {
      // Check if player can pay all costs before paying
      if (this.canPayCharacter(characterId)) {
        // Pay all costs
        character.costs.forEach((cost) => cost.pay(this));
        character.playOn(this);
        this.game.render();
      } else {
        return;
      }
    }
  }

  /**
   * Checks if the player can steal a gift from another player
   * @param {string} familyId - The family ID of the target player
   * @returns {boolean} True if the player can steal a gift, false otherwise
   */
  canStealGift(familyId) {
    const targetPlayer = this.game.players.find(
      (player) => player.familyCard?.id === familyId
    );
    return targetPlayer.countCards() > 0;
  }

  /**
   * Steals a gift from another player
   * @param {string} familyId - The family ID of the target player
   * @param {string} giftId - The unique ID of the gift card to steal
   */
  stealGift(familyId, giftId) {
    const targetPlayer = this.game.players.find(
      (player) => player.familyCard?.id === familyId
    );
    const gift = targetPlayer.gifts.select(this, giftId);
    if (gift) {
      this.gifts.add(gift);
      this.power = null;
      this.game.render();
    }
  }

  /**
   * Checks if the player can steal a shield from another player
   * @param {string} familyId - The family ID of the target player
   * @returns {boolean} True if the player can steal a shield, false otherwise
   */
  canStealShield(familyId) {
    const targetPlayer = this.game.players.find(
      (player) => player.familyCard?.id === familyId
    );
    return targetPlayer.countToken("shield") > 0;
  }

  /**
   * Steals a shield from another player
   * @param {string} familyId - The family ID of the target player
   */
  stealShield(familyId) {
    const targetPlayer = this.game.players.find(
      (player) => player.familyCard?.id === familyId
    );
    targetPlayer.removeToken("shield", 1);
    this.addToken("shield", 1);
    this.power = null;
    this.game.render();
  }

  /**
   * Checks if the player can steal a shield from a character card
   * @param {string} characterId - The unique ID of the character card to check
   * @returns {boolean} True if the player can steal a shield, false otherwise
   */
  canStealCharacterShield(characterId) {
    const targetCharacter = this.game.board.characters.find(
      (card) => card.id === characterId
    );
    return targetCharacter.countToken("shield") > 0;
  }

  /**
   * Steals a shield from a character card
   * @param {string} characterId - The unique ID of the character card to steal a shield from
   */
  stealCharacterShield(characterId) {
    const targetCharacter = this.game.board.characters.find(
      (card) => card.id === characterId
    );
    targetCharacter.removeToken("shield", 1);
    this.addToken("shield", 1);
    this.power = null;
    this.game.render();
  }

  /**
   * Uses a gift card from the player's collection and applies its effects
   * @param {string} giftId - The unique ID of the gift card to use
   */
  useGift(giftId) {
    const gift = this.gifts.select(this, giftId);
    if (gift) {
      gift.playOn(this);
      this.discard(gift);
      this.game.render();
    }
  }

  /**
   * Selects a gift card from the gift deck
   * @param {string} giftId - The unique ID of the gift card to select
   */
  selectGift(giftId) {
    const gift = this.game.board.giftDeck.select(this, giftId);
    this.gifts.add(gift);
    this.power = null;
    this.game.render();
  }

  /**
   * Selects a character card from the character deck
   * @param {string} characterId - The unique ID of the character card to select
   */
  selectCharacter(characterId) {
    const character = this.game.board.characterDeck.select(this, characterId);
    this.game.board.characters.push(character);
    this.power = null;
    this.game.render();
  }

  /**
   * Moves a card to the discard pile
   * @param {Card} card - The card to discard
   */
  discard(card) {
    this.game.board.discardDeck.add(card);
  }

  /**
   * Kills the player
   * @param {Player} byPlayer - The player who killed the target player
   */
  killed(byPlayer = null) {
    this.alive = false;
    this.familyCard.hide();
    if (byPlayer) {
      byPlayer.addToken("crime", 1);
    }
  }

  /**
   * Kills a player
   * @param {string} familyId - The family ID of the target player
   */
  kill(familyId) {
    const targetPlayer = this.game.players.find(
      (player) => player.familyCard?.id === familyId
    );
    targetPlayer.killed(this);
    this.power = null;
    this.game.render();
  }

  /**
   * Kills a character card
   * @param {string} characterId - The unique ID of the character card to kill
   */
  killCharacter(characterId) {
    const targetCharacter = this.game.board.characters.find(
      (card) => card.id === characterId
    );
    targetCharacter.killed(this);
    this.power = null;
    this.game.render();
  }

  /**
   * Poisons the player
   */
  poisoned(byPlayer = null) {
    if (this.alive) {
      if (this.countToken("life") > 0) {
        this.removeToken("life", 1);
        return;
      }
      if (this.countTokenAll("life") === 1) {
        this.killed(byPlayer);
        return;
      }
    }
  }

  /**
   * Checks if the player can poison a family card
   * @param {string} familyId - The family ID of the target player
   * @returns {boolean} True if the player can poison the family card, false otherwise
   */
  canPoison(familyId) {
    const targetPlayer = this.game.players.find(
      (player) => player.familyCard?.id === familyId
    );
    return targetPlayer.countTokenAll("life") > 0;
  }

  /**
   * Initiates a poison against another player
   * @param {string} familyId - The family ID of the target player
   */
  poison(familyId) {
    const targetPlayer = this.game.players.find(
      (player) => player.familyCard?.id === familyId
    );
    targetPlayer.poisoned(this);
    this.power = null;
    this.game.render();
  }

  /**
   * Checks if the player can poison a character card
   * @param {string} characterId - The unique ID of the character card to poison
   * @returns {boolean} True if the player can poison the character card, false otherwise
   */
  canPoisonCharacter(characterId) {
    const targetCharacter = this.game.board.characters.find(
      (card) => card.id === characterId
    );
    return targetCharacter.countTokenAll("life") > 0;
  }

  /**
   * Poisons a character card
   * @param {string} characterId - The unique ID of the character card to poison
   */
  poisonCharacter(characterId) {
    const targetCharacter = this.game.board.characters.find(
      (card) => card.id === characterId
    );
    targetCharacter.poisoned(this);
    this.power = null;
    this.game.render();
  }

  /**
   * Attacks the player
   */
  attacked(byPlayer = null) {
    if (this.alive) {
      if (this.countToken("shield") === 0) {
        if (this.countToken("life") > 0) {
          this.removeToken("life", 1);
          return;
        }
        if (this.countTokenAll("life") + this.countTokenAll("immune") === 1) {
          this.killed(byPlayer);
          return;
        }
      }
    }
  }

  /**
   * Checks if the player can attack a family card
   * @param {string} familyId - The family ID of the target player
   * @returns {boolean} True if the player can attack the family card, false otherwise
   */
  canAttack(familyId) {
    const targetPlayer = this.game.players.find(
      (player) => player.familyCard?.id === familyId
    );
    return targetPlayer.countTokenAll("shield") === 0;
  }

  /**
   * Initiates an attack against another player
   * @param {string} familyId - The family ID of the target player
   */
  attack(familyId) {
    const targetPlayer = this.game.players.find(
      (player) => player.familyCard?.id === familyId
    );
    targetPlayer.attacked(this);
    this.power = null;
    this.game.render();
  }

  /**
   * Checks if the player can attack a character card
   * @param {string} characterId - The unique ID of the character card to attack
   * @returns {boolean} True if the player can attack the character card, false otherwise
   */
  canAttackCharacter(characterId) {
    const targetCharacter = this.game.board.characters.find(
      (card) => card.id === characterId
    );
    return targetCharacter.countTokenAll("shield") === 0;
  }

  /**
   * Attacks a character card
   * @param {string} characterId - The unique ID of the character card to attack
   */
  attackCharacter(characterId) {
    const targetCharacter = this.game.board.characters.find(
      (card) => card.id === characterId
    );
    targetCharacter.attacked(this);
    this.power = null;
    this.game.render();
  }

  /**
   * Shames the player
   */
  shamed() {
    if (this.countToken("prestige") > 0) {
      this.removeToken("prestige", 1);
    }
  }

  /**
   * Checks if the player can shame a family card
   * @param {string} familyId - The family ID of the target player
   * @returns {boolean} True if the player can shame the family card, false otherwise
   */
  canShame(familyId) {
    const targetPlayer = this.game.players.find(
      (player) => player.familyCard?.id === familyId
    );
    return targetPlayer.countToken("prestige") > 0;
  }

  /**
   * Initiates a shame against another player
   * @param {string} familyId - The family ID of the target player
   */
  shame(familyId) {
    const targetPlayer = this.game.players.find(
      (player) => player.familyCard?.id === familyId
    );
    targetPlayer.shamed();
    this.power = null;
    this.game.render();
  }

  /**
   * Checks if the player can shame a character card
   * @param {string} characterId - The unique ID of the character card to shame
   * @returns {boolean} True if the player can shame the character card, false otherwise
   */
  canShameCharacter(characterId) {
    const targetCharacter = this.game.board.characters.find(
      (card) => card.id === characterId
    );
    return targetCharacter.countToken("prestige") > 0;
  }

  /**
   * Shames a character card
   * @param {string} characterId - The unique ID of the character card to shame
   */
  shameCharacter(characterId) {
    const targetCharacter = this.game.board.characters.find(
      (card) => card.id === characterId
    );
    targetCharacter.shamed();
    this.power = null;
    this.game.render();
  }

  /**
   * Denounces the player
   */
  denounced() {
    this.removeToken("favor", 1);
  }

  /**
   * Checks if the player can denounce a family card
   * @param {string} familyId - The family ID of the target player
   * @returns {boolean} True if the player can denounce the family card, false otherwise
   */
  canDenounce(familyId) {
    const targetPlayer = this.game.players.find(
      (player) => player.familyCard?.id === familyId
    );
    return targetPlayer.countToken("favor") > 0;
  }

  /**
   * Denounces a family card
   * @param {string} familyId - The family ID of the target player
   */
  denounce(familyId) {
    const targetPlayer = this.game.players.find(
      (player) => player.familyCard?.id === familyId
    );
    targetPlayer.denounced();
    this.power = null;
    this.game.render();
  }

  /**
   * Checks if the player can denounce a character card
   * @param {string} characterId - The unique ID of the character card to denounce
   * @returns {boolean} True if the player can denounce the character card, false otherwise
   */
  canDenounceCharacter(characterId) {
    const targetCharacter = this.game.board.characters.find(
      (card) => card.id === characterId
    );
    return targetCharacter.countToken("favor") > 0;
  }

  /**
   * Denounces a character card
   * @param {string} characterId - The unique ID of the character card to denounce
   */
  denounceCharacter(characterId) {
    const targetCharacter = this.game.board.characters.find(
      (card) => card.id === characterId
    );
    targetCharacter.denounced();
    this.power = null;
    this.game.render();
  }

  /**
   * Reveals another player's gift cards
   * @param {string} familyId - The family ID of the target player
   */
  lookHand(familyId) {
    // Show the target player's hand
    const targetPlayer = this.game.players.find(
      (player) => player.familyCard?.id === familyId
    );
    targetPlayer.hand.show();

    // Clear power of the player
    this.power = null;

    // Render the game
    this.game.render();
  }

  /**
   * Shows a posture card
   * @param {string} postureId - The ID of the posture card to show
   */
  lookPosture(postureId) {
    const posture = this.game.board.postures.find(
      (posture) => posture.id === postureId
    );
    posture.show();
    this.brain.remember(posture);
    this.power = null;
    this.game.render();
  }

  /**
   * Counts the number of cards of a specific type
   * @param {string} type - The type of card to count
   * @returns {number} The number of cards of the specified type
   */
  countCards(type) {
    switch (type) {
      case "gift":
        return this.gifts.countCards();
    }
    return 0;
  }

  /**
   * Discards a card of a specific type
   * @param {string} type - The type of card to discard
   * @param {number} amount - The number of cards to discard (default: 1)
   */
  discardCardType(type, amount = 1) {
    if (type === "gift") {
      for (let i = 0; i < amount; i++) {
        const card = this.gifts.draw();
        this.discard(card);
      }
    }
  }

  /**
   * Discards a card by ID
   * @param {string} id - The ID of the card to discard
   */
  discardCardId(id) {
    const card = this.gifts.cards.find((card) => card.id === id);
    this.gifts.cards = this.gifts.cards.filter((card) => card.id !== id);
    this.discard(card);
  }

  /**
   * Renders the player's complete UI including display area and hand
   * @returns {string} HTML markup for the player's interface
   */
  render() {
    if (this.game.scene.state === "family") {
      return `
        <p class="section">Choose your family</p>
        <div class="cards-container" style="justify-content: center;">
          <div class="cards">
            ${this.game.board.familyDeck.render()}
          </div>
        </div>
      `;
    }
    return `
    <p class="section">${this.game.player === this ? "Your hand" : ""}</p>
    <div class="cards-container">
      <div class="cards">
        ${this.display.render()}
        ${this.hand.render()}
      </div>
    </div>
    `;
  }

  /**
   * Renders the player's table
   * @returns {string} HTML markup for the player's table
   */
  renderTable() {
    return `
    <div class="opponent">
      <div>
        ${this.heirCard ? "👑" : ""}
        ${this.alive ? "" : "💀"}
        ${this.familyCard ? this.familyCard.name : "No Family"} 
      </div>
      <div class="table-data">
        <button onclick="game.openOpponent('${this.familyCard?.id}')">${
      game.opponent === this ? "Close" : "Open"
    }</button>
        ${["shield", "life", "immune", "favor", "prestige", "gold", "crime"]
          .map((type) => {
            const count = this.countTokenAll(type);
            return count
              ? `<div class="table-data-item">${count} ${new Token(
                  type
                ).renderTokenEmoji()}${new Helper(type).render()}</div>`
              : "";
          })
          .join(" ")}
      ${
        this.countCards("gift")
          ? `<div class="table-data-item">${this.countCards(
              "gift"
            )} ${new Token("gift").renderTokenEmoji()}${new Helper(
              "gift"
            ).render()}</div>`
          : ""
      }
      </div>
    </div>
    `;
  }
}
