/**
 * Base class representing a card in the game
 */
class Card {
  /**
   * Creates a new Card instance
   */
  constructor(game, data) {
    this.game = game;
    this.extension = data.extension;
    this.type = data.type;
    this.color = data.color;
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.tokens = [];
    this.slots = [];
    this.effects = [];
    this.actions = [];
    this.costs = [];
    this.face = "up";
    this.player = null;

    // Initialize tokens
    if (data.tokens) {
      for (const token of data.tokens) {
        for (let i = 0; i < token.value; i++) {
          this.tokens.push(new Token(token.type));
        }
      }
    }

    // Initialize slots
    if (data.slots) {
      for (const slot of data.slots) {
        let newSlot = new Slot(slot.type, slot.max);
        this.slots.push(newSlot);
        if (this.type === "character") {
          newSlot.addToken(slot.max);
        }
      }
    }

    // Initialize effects
    if (data.effects) {
      for (const effect of data.effects) {
        if (Object.keys(effect)[0] == "condition") {
          this.effects.push(
            Effect.create(
              Object.keys(effect)[1],
              Object.values(effect)[1],
              Object.keys(effect)[2],
              Object.values(effect)[2],
              Object.values(effect)[0]
            )
          );
        } else {
          this.effects.push(
            Effect.create(
              Object.keys(effect)[0],
              Object.values(effect)[0],
              Object.keys(effect)[1],
              Object.values(effect)[1]
            )
          );
        }
      }
    }

    // Initialize costs
    if (data.costs) {
      for (const cost of data.costs) {
        this.costs.push(
          Cost.create(
            Object.keys(cost)[0],
            Object.values(cost)[0],
            Object.keys(cost)[1],
            Object.values(cost)[1]
          )
        );
      }
    }
  }

  /**
   * Plays the card on a player
   * @param {Player} player - The player to play the card on
   */
  playOn(player) {
    for (const effect of this.effects) {
      effect.on(player);
    }
  }

  /**
   * Checks if the card has a specific token
   * @param {string} type - The type of token to check (prophecy)
   * @returns {boolean} True if the card has the token, false otherwise
   */
  hasToken(type) {
    return this.tokens.some((token) => token.type === type);
  }

  /**
   * Flips the card face up/down
   * Toggles between "up" and "down" states
   */
  flip() {
    this.face = this.face === "up" ? "down" : "up";
  }

  /**
   * Hides the card by setting face to "down"
   */
  hide() {
    this.face = "down";
  }

  /**
   * Shows the card by setting face to "up"
   */
  show() {
    this.face = "up";
  }

  /**
   * Counts the number of tokens of a specific type
   * @param {string} type - The type of token to count (shield, life, favor, prestige, gold)
   * @returns {number} The number of tokens of the specified type
   */
  countToken(type) {
    return this.slots.find((slot) => slot.type === type)?.countToken() || 0;
  }

  /**
   * Counts the total number of tokens of a specific type, including both slots and permanent tokens
   * @param {string} type - The type of token to count (shield, life, favor, prestige, gold)
   * @returns {number} The total number of tokens of the specified type
   */
  countTokenAll(type) {
    return (
      (this.slots.find((slot) => slot.type === type)?.countToken() || 0) +
      (this.player && this.face === "down"
        ? 0
        : this.tokens.filter((token) => token.type === type).length || 0)
    );
  }

  /**
   * Sets the number of tokens of a specific type
   * @param {string} type - The type of token to set (shield, life, favor, prestige, gold)
   * @param {number} amount - The number of tokens to set
   */
  setToken(type, amount = 1) {
    this.slots.find((slot) => slot.type === type).setToken(amount);
  }

  /**
   * Adds tokens to the card's slots
   * @param {string} type - The type of token to add (shield, life, favor, prestige, gold)
   * @param {number} amount - The number of tokens to add (default: 1)
   */
  addToken(type, amount = 1) {
    this.slots.find((slot) => slot.type === type).addToken(amount);
  }

  /**
   * Removes tokens from the card's slots
   * @param {string} type - The type of token to remove (shield, life, favor, prestige, gold)
   * @param {number} amount - The number of tokens to remove (default: 1)
   */
  removeToken(type, amount = 1) {
    this.slots.find((slot) => slot.type === type).removeToken(amount);
  }

  /**
   * Multiplies the number of tokens of a specific type
   * @param {string} type - The type of token to multiply (shield, life, favor, prestige, gold)
   * @param {number} amount - The number of times to multiply the tokens (default: 1)
   */
  multToken(type, amount = 1) {
    this.slots.find((slot) => slot.type === type).multToken(amount);
  }

  /**
   * Renders the card tokens
   * @returns {string} HTML representation of the tokens
   */
  renderTokens() {
    return this.tokens.map((token) => token.renderMini()).join("");
  }

  /**
   * Renders the card slots that can hold tokens
   * @returns {string} HTML representation of the slots and their tokens
   */
  renderSlots() {
    let html = "";
    if (this.slots) {
      html = `<div class="card-slots-container">`;
      for (const slot of this.slots) {
        let tokens = "";
        for (let i = 0; i < slot.max; i++) {
          if (slot.tokens[i]) {
            tokens += `${slot.tokens[i].render()}`;
          } else {
            tokens += `<div class="slot slot-${slot.type}"></div>`;
          }
        }
        html += `
            <div class="card-slots">
              ${tokens}
            </div>
            `;
      }
      html += `</div>`;
    }
    return html;
  }
}
