/**
 * Represents a posture card in the game, extending the base Card class
 * Each posture card can provide various effects and resources
 */
class PostureCard extends Card {
  /**
   * Create a new posture card
   * @param {Object} data - The card data containing effects and resource modifications
   */
  constructor(game, data) {
    super(game, data);
    this.possibleChapters = data.possibleChapters;
    this.possibleEffects = [];
    this.variation = data.variation;
    this.chapter = data.chapter;

    // Initialize possible effects
    if (data.possibleEffects) {
      for (const possibleEffect of data.possibleEffects) {
        let effects = [];
        for (const effect of possibleEffect) {
          if (Object.keys(effect)[0] == "condition") {
            effects.push(
              Effect.create(
                Object.keys(effect)[1],
                Object.values(effect)[1],
                Object.keys(effect)[2],
                Object.values(effect)[2],
                Object.values(effect)[0]
              )
            );
          } else {
            effects.push(
              Effect.create(
                Object.keys(effect)[0],
                Object.values(effect)[0],
                Object.keys(effect)[1],
                Object.values(effect)[1]
              )
            );
          }
        }
        this.possibleEffects.push(effects);
      }
    }
  }

  /**
   * Renders the front face of the posture card showing name, description and actions
   * @returns {string} HTML representation of the card front
   */
  render() {
    if (this.face === "up") {
      return `
        <div class="card card-up card-posture">
          <div class="card-center">
            ${this.renderEffects()}
          </div>
          ${this.game.scene.state === "play" ? this.renderActions() : ""}
        </div>
      `;
    } else {
      return `
      <div class="card card-down card-posture">
        <div class="card-header">
          ${this.game.DEBUG ? this.renderScore() : this.renderChapters()}
          <p>${this.name}</p>
        </div>
        <div class="card-content">
          <small class="grey">${this.description}</small>
          ${this.renderPossibleEffects()}
        </div>
        ${this.game.scene.state === "play" ? this.renderActions() : ""}
      </div>
    `;
    }
  }

  /**
   * Renders the chapters for the posture card
   * @returns {string} HTML representation of the chapters
   */
  renderChapters() {
    return `
      <div class="card-chapters">
        ${this.possibleChapters
          .sort((a, b) => a - b)
          .map((chapter) => this.renderChapter(chapter))
          .join("")}
      </div>
    `;
  }

  /**
   * Renders a single chapter
   * @param {number} chapter - The chapter number
   * @returns {string} HTML representation of the chapter
   */
  renderChapter(chapter) {
    return `
      <div class="chapter">
        ${chapter}
      </div>
    `;
  }

  /**
   * Renders the score for the posture card
   * @returns {string} HTML representation of the score
   */
  renderScore() {
    let playerScore = this.game.opponent
      ? this.game.opponent
      : this.game.player;
    let scores = `${playerScore.brain.evals.scores[this.id]?.toFixed(1)}`;
    let stdDev = `±${playerScore.brain.evals.stdDev[this.id]?.toFixed(1)}`;
    let normalizedScores = `${playerScore.brain.evals.normalizedScores[
      this.id
    ]?.toFixed(1)}`;
    let chances = `${(playerScore.brain.evals.chances[this.id] * 100).toFixed(
      0
    )}%<br>`;
    return `
      <div class="score">
        ${[chances, scores, stdDev].join(" ")}
      </div>
    `;
  }

  /**
   * Renders the effects for the posture card
   * @returns {string} HTML representation of the effects
   */
  renderEffects() {
    return `
      <div class="effects">
        ${this.effects.map((effect) => effect.render()).join("")}
      </div>
    `;
  }

  /**
   * Renders the possible effects for the posture card
   * @returns {string} HTML representation of the possible effects
   */
  renderPossibleEffects() {
    return `
      <div class="possible-effects">
        ${this.possibleEffects
          .map((effects) => {
            return `<div class="effects">${effects
              .map((effect) => effect.render())
              .join("")}</div>`;
          })
          .join("")}
      </div>
    `;
  }

  /**
   * Renders the need of the posture card
   * @returns {string} HTML representation of the need
   */
  renderNeed() {
    if (this.need) {
      switch (this.need) {
        case "courage":
          return `❤️`;
        case "favor":
          return `👑`;
        case "prestige":
          return `💎`;
        case "gold":
          return `💰`;
        case "gift":
          return `🍀`;
        case "shield":
          return `🛡️`;
      }
    } else {
      return "";
    }
  }

  /**
   * Renders the actions for the courage card
   * @returns {string} HTML representation of the actions
   */
  renderActions() {
    this.actions = [];
    if (this.game.player.power === "vision") {
      this.actions.push(
        new Action("Look", `game.player.lookPosture('${this.id}')`)
      );
    } else {
      if (this.face === "up") {
        this.actions.push(
          new Action("Back", `game.player.backPosture('${this.id}')`)
        );
      } else if (
        this.game.player.alive &&
        this.game.board.characters[0].alive &&
        !this.game.overthrone
      ) {
        this.actions.push(
          new Action("Play", `game.player.playPosture('${this.id}')`)
        );
      }
    }
    return `
      <div class="card-footer">
        ${this.actions.map((action) => action.render()).join("")}
      </div>
    `;
  }
}
