/**
 * Represents a character card in the game, extending the base Card class
 * Each character card has special powers and associated costs
 */
class CharacterCard extends Card {
  /**
   * Create a new character card
   * @param {Object} data - The card data containing effects, costs and character info
   */
  constructor(game, data) {
    super(game, data);
    this.alive = true;
    this.heir = false;
  }

  /**
   * Kills the player
   * @param {Player} byPlayer - The player who killed the target player
   */
  killed(byPlayer = null) {
    if (this.alive) {
      this.alive = false;
      this.hide();
      if (byPlayer) {
        byPlayer.addToken("crime", 1);
      }
    }
  }

  /**
   * Poisons the character card
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
   * Attacks the character card
   */
  attacked(byPlayer = null) {
    if (this.alive) {
      if (this.countTokenAll("shield") === 0) {
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
   * Shames the character card
   */
  shamed(byPlayer = null) {
    if (this.countToken("prestige") > 0) {
      this.removeToken("prestige", 1);
    }
  }

  /**
   * Denounces the character card
   */
  denounced(byPlayer = null) {
    if (this.countToken("favor") > 0) {
      this.removeToken("favor", 1);
    }
  }

  /**
   * Renders the character card showing name, description, effects and costs
   * @returns {string} HTML representation of the card
   */
  render() {
    if (!this.alive) {
      return `
      <div class="card card-down card-character">
        <div class="card-tokens">
          ${new Token("dead").renderMini()}
        </div>
        <div class="card-header">
        <p class="card-name">${this.name}</p>
      </div>
      </div>
      `;
    }
    return `
    <div class="card card-character card-${this.color}">
      <div class="card-tokens">
        ${this.renderTokens()}
      </div>
      <div class="card-header">
        <p class="card-name">${this.name}</p>
      </div>
      <div class="card-content">
        <small class="grey card-description">${this.description}</small>
        <div class="card-cost-effects">
          ${this.renderCosts()}
          <div class="effects">
            ${this.effects.map((effect) => effect.render()).join("")}
          </div>
        </div>
      </div>
      ${this.renderSlots()}
      ${this.renderActions()}
    </div>
    `;
  }

  /**
   * Renders the costs of the character card
   * @returns {string} HTML representation of the costs
   */
  renderCosts() {
    return `
    <div class="card-costs">
      ${this.costs.map((cost) => cost.render()).join("")}
    </div>
    `;
  }

  /**
   * Renders the actions of the character card
   * @returns {string} HTML representation of the actions
   */
  renderActions() {
    this.actions = [];
    const power = this.game.player.power;
    let disabled = false;
    // Attack
    if (power === "attack") {
      disabled = !this.game.player.canAttackCharacter(this.id);
      this.actions.push(
        new Action(
          "Attack",
          `game.player.attackCharacter('${this.id}')`,
          disabled
        )
      );
    }
    // Poison
    if (power === "poison") {
      disabled = !this.game.player.canPoisonCharacter(this.id);
      this.actions.push(
        new Action(
          "Poison",
          `game.player.poisonCharacter('${this.id}')`,
          disabled
        )
      );
    }
    // Shame
    if (power === "shame") {
      disabled = !this.game.player.canShameCharacter(this.id);
      this.actions.push(
        new Action(
          "Shame",
          `game.player.shameCharacter('${this.id}')`,
          disabled
        )
      );
    }
    // Denounce
    if (power === "denounce") {
      disabled = !this.game.player.canDenounceCharacter(this.id);
      this.actions.push(
        new Action(
          "Denounce",
          `game.player.denounceCharacter('${this.id}')`,
          disabled
        )
      );
    }
    // Steal
    if (power === "steal") {
      disabled = !this.game.player.canStealCharacterShield(this.id);
      this.actions.push(
        new Action(
          "Steal",
          `game.player.stealCharacterShield('${this.id}')`,
          disabled
        )
      );
    }
    // Regicide
    if (power === "regicide") {
      disabled = this.id !== "king";
      this.actions.push(
        new Action("Kill", `game.player.killCharacter('${this.id}')`, disabled)
      );
    }
    // Pick a character
    if (power === "meet") {
      this.actions.push(
        new Action("Pick", `game.player.selectCharacter('${this.id}')`)
      );
    }
    // Pay
    if (power === null || power === "vision" || power === "gift-choice") {
      if (this.game.player.alive) {
        disabled = !this.game.player.canPayCharacter(this.id);
        this.actions.push(
          new Action("Pay", `game.player.payCharacter('${this.id}')`, disabled)
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
