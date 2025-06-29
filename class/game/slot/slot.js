/**
 * Represents a slot that can hold game tokens of a specific type
 */
class Slot {
  /**
   * Creates a new slot
   * @param {string} type - The type of token this slot can hold (shield, life, favor, etc)
   * @param {number} max - Maximum number of tokens this slot can hold
   * @param {Token[]} tokens - Array of tokens currently in this slot
   */
  constructor(type, max) {
    this.type = type;
    this.max = max;
    this.tokens = [];
  }

  /**
   * Counts the number of tokens in this slot
   * @returns {number} The number of tokens in the slot
   */
  countToken() {
    return this.tokens.length;
  }

  /**
   * Sets the number of tokens in this slot, clearing existing ones first
   * @param {number} amount - The number of tokens to set
   */
  setToken(amount) {
    // Clear existing tokens
    this.tokens = [];

    // Add new tokens
    this.addToken(amount);
  }

  /**
   * Adds tokens to this slot up to the maximum allowed
   * @param {string} type - The type of token to add
   * @param {number} amount - Number of tokens to add (default: 1)
   */
  addToken(amount = 1) {
    if (amount > 0) {
      const remainingSpace = (this.max || Infinity) - this.countToken();
      for (let i = 0; i < Math.min(amount, remainingSpace); i++) {
        this.tokens.push(new Token(this.type));
      }
    }
  }

  /**
   * Removes tokens from this slot
   * @param {string} type - The type of token to remove
   * @param {number} amount - Number of tokens to remove (default: 1)
   */
  removeToken(amount = 1) {
    if (amount > 0) {
      const tokensToRemove = Math.min(amount, this.countToken());
      this.tokens.splice(0, tokensToRemove);
    }
  }

  /**
   * Empties the slot of all tokens
   */
  emptyToken() {
    this.tokens = [];
  }

  /**
   * Multiplies the number of tokens in this slot
   * @param {number} amount - The number of times to multiply the tokens (default: 1)
   */
  multToken(amount = 1) {
    if (amount > 0) {
      const remainingSpace = (this.max || Infinity) - this.countToken();
      for (
        let i = 0;
        i < Math.min((amount - 1) * this.countToken(), remainingSpace);
        i++
      ) {
        this.tokens.push(new Token(this.type));
      }
    }
  }
}
