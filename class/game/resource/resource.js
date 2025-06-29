/**
 * Class representing a game resource like gold, favor, etc.
 */
class Resource {
  /**
   * Create a resource
   * @param {string} id - The identifier of the resource (life, gold, etc)
   * @param {number} amount - The quantity of the resource
   */
  constructor(id, amount) {
    this.id = id;
    this.amount = amount;
    this.type = ["shield", "favor", "prestige", "gold"].includes(id)
      ? "token"
      : "card";
  }

  /**
   * Renders the initial state of the resource
   * Special case for life - only shows when at 0
   * For other resources, only shows if amount > 0
   * @returns {string} The formatted resource string
   */
  renderInitial() {
    if (this.id === "life") {
      return this.amount === 0 ? "🫥 life" : "";
    }
    if (this.amount === 0) {
      return "";
    }
    return this.amount + " " + this.renderResource();
  }
  /**
   * Renders the resource as a formatted string with emoji and name
   * @returns {string} The formatted resource string with emoji and name
   */
  renderResource() {
    return `${this.renderResourceEmoji()} ${this.renderResourceName()}`;
  }

  /**
   * Gets the display name for the resource type
   * @returns {string} The resource name (life, gold, etc)
   */
  renderResourceName() {
    switch (this.id) {
      case "life":
        return "life";
      case "gold":
        return "gold";
      case "favor":
        return "favor";
      case "prestige":
        return "prestige";
      case "gift":
        return "gift";
      case "shield":
        return "shield";
    }
  }

  /**
   * Gets the emoji icon for the resource type
   * @returns {string} The emoji representing the resource (❤️, 💰, etc)
   */
  renderResourceEmoji() {
    switch (this.id) {
      case "life":
        return "❤️";
      case "gold":
        return "💰";
      case "favor":
        return "👑";
      case "prestige":
        return "💎";
      case "gift":
        return "🎁";
      case "shield":
        return "🛡️";
    }
  }
}
