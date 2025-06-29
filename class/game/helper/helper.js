/**
 * Represents a helper text for a token or a card
 */
class Helper {
  /**
   * Creates a new Helper instance
   * @param {string} id - The id of the helper
   */
  constructor(id) {
    this.id = id;
  }

  /**
   * Renders the helper text for the token
   * @returns {string} HTML string showing the helper text
   */
  render() {
    return `<div class="helper">${this.renderHelper()}</div>`;
  }

  /**
   * Renders the helper text for the cost
   * @returns {string} HTML string showing the helper text
   */
  renderCost() {
    return `<div class="helper">Cost of the service</div>`;
  }

  /**
   * Renders the helper text for the token
   * @returns {string} HTML string showing the helper text
   */
  renderHelper() {
    switch (this.id) {
      case "shield":
        return `The 🛡️ shield protects a character or a family from being 🗡️ attacked.`;
      case "life":
        return `The ❤️ life represents the number of times a character or a family can be 🗡️ attacked (without 🛡️ shield) or 🤢 poisoned before 💀 dying.`;
      case "favor":
        return `The 👑 favor determines who becomes heir to the throne. The character or family with the most favor wins when the King 💀 dies.`;
      case "prestige":
        return `The 💎 prestige allows a player to overthrow the King and win the game if they become more prestigious than the King himself.`;
      case "gold":
        return `The 💰 gold is the game's currency, used to buy services from the court.`;
      case "crime":
        return `The ☠️ crimes are counted when you murder a player or a character (directly or through the court) but also in other events.`;
      case "key":
        return `The 🗝️ key gives you access to the prison.`;
      case "gift":
        return `The 🍀 gift is a valuable object that can be used to influence the course of the game.`;
      case "immune":
        return `💛 immuned to poison.`;
      case "prophecy":
        return `Complete the 🔮 prophecy and push the King to commit suicide or convince the Blacksmith to forge a 🛡️ shield for you.`;
      case "dead":
        return `Just 💀 dead.`;
      case "vision":
        return `The 👁️ vision allows a player to see a player 🍀 cards or a future event.`;
      case "poison":
        return `▸🤢◂ poison a character or a family and removes a ❤️ life (if not 💛 immune to poison).`;
      case "attack":
        return `▸🗡️◂ attack a character or a family and removes a ❤️ life (if not protected by 🛡️ shield).`;
      case "shame":
        return `▸💩◂ shame a character or a family and removes a 💎 prestige.`;
      case "denounce":
        return `▸😡◂ denounce a character or a family and removes a 👑 favor.`;
      case "steal":
        return `▸😈◂ steal a character or a family 🍀 gift card or 🛡️ shield token.`;
      case "gift-choice":
        return `▸🍀◂ choose a 🍀 gift from the deck.`;
      case "meet":
        return `▸😶◂ choose a character to draw from the deck.`;
      case "regicide":
        return `▸💀◂ murder the king.`;
      case "poisoned":
        return `When 🤢 poisoned, you remove a ❤️ life (if not 💛 immune to poison).`;
      case "shamed":
        return `When 💩 shamed, you remove a 💎 prestige.`;
      case "attacked":
        return `When 🗡️ attacked, you remove a ❤️ life (if not protected by 🛡️ shield).`;
      case "denounced":
        return `When 😡 denounced, you remove a 👑 favor.`;
      case "card-family":
        return `Each player has only one family card. Each ❤️ life represents a member of the family. You can have up to 3 or 4 ❤️ lives and be protected by a 🛡️ shield. Stay alive until the end.`;
      default:
        return "";
    }
  }
}
