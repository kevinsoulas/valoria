/**
 * Centralized system for managing game resources
 */
class ResourceSystem {
  constructor() {
    this.resources = {
      life: { type: "card", emoji: "❤️", name: "life" },
      gold: { type: "token", emoji: "💰", name: "gold" },
      favor: { type: "token", emoji: "👑", name: "favor" },
      prestige: { type: "token", emoji: "💎", name: "prestige" },
      shield: { type: "token", emoji: "🛡️", name: "shield" },
      gift: { type: "card", emoji: "🎁", name: "gift" },
    };
  }

  /**
   * Get resource configuration
   * @param {string} resourceId - The resource identifier
   * @returns {Object} Resource configuration
   */
  getResource(resourceId) {
    return this.resources[resourceId];
  }

  /**
   * Check if a resource is a token type
   * @param {string} resourceId - The resource identifier
   * @returns {boolean} True if resource is a token
   */
  isToken(resourceId) {
    return this.resources[resourceId]?.type === "token";
  }

  /**
   * Check if a resource is a card type
   * @param {string} resourceId - The resource identifier
   * @returns {boolean} True if resource is a card
   */
  isCard(resourceId) {
    return this.resources[resourceId]?.type === "card";
  }

  /**
   * Get the emoji for a resource
   * @param {string} resourceId - The resource identifier
   * @returns {string} The emoji for the resource
   */
  getEmoji(resourceId) {
    return this.resources[resourceId]?.emoji || "";
  }

  /**
   * Get the display name for a resource
   * @param {string} resourceId - The resource identifier
   * @returns {string} The display name for the resource
   */
  getName(resourceId) {
    return this.resources[resourceId]?.name || resourceId;
  }
}
