/**
 * Represents a game scene that handles rendering of game components
 */
class Scene {
  /**
   * Creates a new Scene instance
   * @param {Game} game - The game instance this scene belongs to
   */
  constructor(game, state = "menu") {
    this.game = game;
    this.state = state;
    this.lastState = state;
  }

  /**
   * Sets the current state of the scene
   * @param {string} state - The state to set
   */
  setState(state) {
    this.lastState = this.state;
    this.state = state;
    this.render();
  }

  back() {
    this.setState(this.lastState);
  }

  /**
   * Renders the scene based on the current state
   * @returns {string} HTML for the game scene
   */
  render() {
    let html = "";
    switch (this.state) {
      case "menu":
        html = this.renderMenu();
        break;
      case "setting":
        html = this.renderSetting();
        break;
      case "help":
        html = this.renderHelp();
        break;
      default:
        html = `
          ${this.renderShortcuts()}
          ${this.renderOpponents()}
          ${this.renderBoard()}
          ${this.renderPlayer()}
          ${this.renderConsole()}
        `;
    }
    document.getElementById("game").innerHTML = html;
  }

  /**
   * Renders the shortcuts section
   * @returns {string} HTML for the shortcuts section
   */
  renderShortcuts() {
    return `
    <div id="shortcuts">
      <div class="shortcuts-buttons">
        <button onclick="game.scene.setState('menu')">Menu</button>
        <button onclick="game.restartGame()">Restart</button>
        <button onclick="game.scene.setState('help')">Help</button>
      </div>
    </div>
    `;
  }

  /**
   * Renders the settings menu
   * @returns {string} HTML for the settings section
   */
  renderSetting() {
    return `
    <div id="setting">
      <p class="section">Settings</p>
      <div class="menu-buttons">
        <button onclick="game.scene.back()">Back</button>
      </div>
      ${this.renderAiSetting()}
    </div>
    `;
  }

  /**
   * Renders the AI players setting
   * @returns {string} HTML for the AI players setting
   */
  renderAiSetting() {
    return `
    <small>AI Players: ${this.game.setting.aiPlayers}</small>
      <div class="setting-buttons">
        <button onclick="game.setAIPlayers(-1)" ${
          this.game.setting.aiPlayers === 1 ? "disabled" : ""
        }>-</button>
        <button onclick="game.setAIPlayers(1)" ${
          this.game.setting.aiPlayers === this.game.getMaxPlayers() - 1
            ? "disabled"
            : ""
        }>+</button>
      </div>
    `;
  }

  /**
   * Renders the extension setting
   * @returns {string} HTML for the extension setting
   */
  renderExtensionSetting() {
    return `
    <small>Extension: ${this.game.setting.extension}</small>
    <div class="setting-buttons">
        <button onclick="game.setExtension(-1)" ${
          this.game.setting.extension === 0 ? "disabled" : ""
        }>-</button>
        <button onclick="game.setExtension(1)" ${
          this.game.setting.extension === 2 ? "disabled" : ""
        }>+</button>
      </div>
    `;
  }

  /**
   * Renders the main menu
   * @returns {string} HTML for the menu section
   */
  renderMenu() {
    return `
    <div id="menu">
      <p class="title">Valoria</p>
      <div class="menu-buttons">
      <button onclick="game.newGame()">New game</button>
      <button onclick="game.continueGame()" ${
        this.game.turn === undefined ? "disabled" : ""
      }>Continue</button>
      <button onclick="game.scene.setState('setting')">Settings</button>
      <button onclick="game.scene.setState('help')">Help</button>
      </div>
      <p class="section grey">version 0.9.0</p>
    </div>
    `;
  }

  /**
   * Renders the opponents section including the table and selected opponent
   * Only renders if not in family selection state
   * @returns {string} HTML for opponents section
   */
  renderOpponents() {
    if (this.state != "family") {
      return `
      <div id="opponents">
        <div id="table">${this.game.table.render()}</div>
        ${this.game.opponent?.render() || ""}
      </div>
      `;
    }
    return "";
  }

  /**
   * Renders the game board section
   * @returns {string} HTML for game board
   */
  renderBoard() {
    return `
    <div id="board">
      ${this.game.board.render()}
    </div>
    `;
  }

  /**
   * Renders the player's section
   * @returns {string} HTML for player section
   */
  renderPlayer() {
    return `
    <div id="player">
      ${this.game.player.render()}
    </div>
    `;
  }

  /**
   * Renders the console section
   * @returns {string} HTML for console section
   */
  renderConsole() {
    return `
    <div id="console">
      ${this.game.logs?.map((log) => `<small>${log}</small>`).join("") || ""}
    </div>
    `;
  }

  /**
   * Renders the help section
   * @returns {string} HTML for help section
   */
  renderHelp() {
    return `
    <div id="help">
      <div id="help-content">
        <button onclick="game.scene.back()">Back</button>
        <small>Valoria is a card game for 2 to 8 players. Each player represents a family in the kingdom trying to get the throne. Through the kingdom events, use the king and the court to your advantage, find a path to the throne before your opponents.</small>
        <p>How to win</p>
        <small>There are 2 ways to win the game:</small>
        <ul>
          <li><small>1. Overthrone the king by gaining more 💎 prestige than the king himself.</small></li>
          <li><small>2. Become the heir of the king by gaining more 👑 favor than the other players and characters in the court. Wait for the king to die or precipitate his death to succeed him.</small></li>
        </ul>
        <p>How to lose</p>
        <small>You lose the game if any other player gets the throne or you die by being 🗡️ attacked or 🤢 poisoned.</small>
        <p>Cards</p>
        <small>There are 4 types of cards:</small>
        <ul>
          <li><small>1. Family (9)</small></li>
          <li><small>2. Character (17)</small></li>
          <li><small>3. Posture (81)</small></li>
          <li><small>4. Gift (19)</small></li>
        </ul>
        <small>Permanent tokens can be displayed at the top of cards. Some cards also have spaces to add tokens to the card.</small>
        <p>Tokens</p>
        <small>Tokens are collectible items (stackable based on available space on a card, or up to 7 when not on a card) that influence game effects. There are 5 types:</small>
        <ul>
          <li><small>❤️ life (maximum 2 or 3) - Represents family members and survival</small></li>
          <li><small>🛡️ shield (unique) - Protects against attacks</small></li>
          <li><small>👑 favor (maximum 7) - Determines heir status</small></li>
          <li><small>💎 prestige (maximum 7) - Used to overthrow the king</small></li>
          <li><small>💰 gold (maximum 7) - Currency for court services</small></li>
        </ul>
        <small>A new token, ☠️ crime, is introduced in the Valoria Shadows extension.</small>
        <p>❤️ Life</p>
        <small>Each life represents a member of the family. In addition to your family card's base life, you can have up to 2 or 3 additional lives and be protected by a 🛡️ shield. Stay alive until the end. The life represents the number of times a character or a family can be 🗡️ attacked (without 🛡️ shield) or 🤢 poisoned before 💀 dying.</small>
        <small>A special token 💛 immunity gives some families or characters protection against 🤢 poison.</small>
        <p>👑 Favor</p>
        <small>The favor determines who becomes heir to the throne. The character or family with the most favor wins when the King dies.</small>
        <p>💎 Prestige</p>
        <small>The prestige allows a player to overthrow the King and win the game if they become more prestigious than the King himself.</small>
        <p>💰 Gold</p>
        <small>The gold is the game's currency, used to buy services from the court.</small>
        <p>☠️ Crime</p>
        <small>Introduced in the Valoria Shadows extension, the crime is a special token collected when you murder a player or a character (directly or through the court) but also in other events.</small>
        <p>Chapters</p>
        <small>The King's reign extends over a maximum of 3 chapters of 6 turns each (+1 turn per extension). The King dies at the end of chapter 3, but the game can end prematurely.</small>
        <p>Turns</p>
        <small>Each turn, 3 new posture cards are revealed. Players all choose a posture to play for that turn before revealing and applying effects on players. Players can call upon court services at any time, except when effects are being revealed (apply all effects to all players before requesting the court).</small>
        <p>Postures</p>
        <small>Each posture card has 1, 2, or 3 possible effects and indicates which chapters it can appear in. Cards with a single effect have a certain outcome and appear only once during the game. Cards with 2 possible effects will appear twice in 2 different chapters. Cards with 3 possible effects appear in all 3 chapters. All effects will occur during the game, but in random order. Players must remember past effects to eliminate remaining possibilities.</small>
        <p>Characters</p>
        <small>At the beginning of each turn, a new character is introduced to the court. You can use their services at any time (and multiple times if needed) by paying the required price. Services grant tokens or powers to players. Like players, characters have permanent and/or collectible tokens on their card. You can kill a character (and remove them from the game permanently) using the same mechanics as with players.</small>
        <p>Powers</p>
        <small>There are 6 powers that can target players or court characters:</small>
        <ul>
          <li><small>▸🗡️◂ attack - Removes a ❤️ life (if not protected by 🛡️ shield)</small></li>
          <li><small>▸🤢◂ poison - Removes a ❤️ life (if not 💛 immune to poison)</small></li>
          <li><small>▸💩◂ shame - Removes a 💎 prestige</small></li>
          <li><small>▸😡◂ denounce - Removes a 👑 favor</small></li>
          <li><small>▸😈◂ steal - Takes a 🍀 gift card or 🛡️ shield token</small></li>
          <li><small>▸💀◂ regicide - Murders the king</small></li>
        </ul>
        <small>The 👁️ vision power allows a player to look at a Posture card or a player's hand (all their gift cards). Tip: use vision on a player before stealing from them to get their best gift card.</small>
        <p>🍀 Gifts</p>
        <small>A gift deck contains special items or secrets that grant tokens or powers to the player. It is up to the player to decide when to play them.</small>
        <small>Special gifts like 🔮 Prophecy or 🗝️ Key can be used as currency for services, or to cause the King's death (by collecting both prophecy pieces and revealing them to the King).</small>
        <button onclick="game.scene.back()">Back</button>
      </div>
    </div>
    `;
  }
}
