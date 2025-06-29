/**
 * Represents a family card in the game, extending the base Card class
 * Each family has initial resources and heir priority
 */
class FamilyCard extends Card {
  /**
   * Create a new family card
   * @param {Object} data - The card data containing initial resource amounts and heir priority
   */
  constructor(game, data) {
    super(game, data);

    // Priority for determining heir succession order
    this.heirPriority = data.heirPriority || 0;
    this.downType = null;
  }

  /**
   * Renders the family card using the parent Card class's render method
   * @returns {string} HTML representation of the card
   */
  render() {
    if (this.game.scene.state === "family") {
      return `
      <div class="card card-family card-${this.color}">
      <div class="card-tokens">
        ${this.renderTokens()}
      </div>
      <div class="card-header">
        <div class="card-helper">
          <p>${this.name}</p>${new Helper("card-family").render()}
        </div>
      </div>
      <div class="card-content">
        <small class="grey">${this.description}</small>
        <div class="possible-effects">
          ${this.effects.map((effect) => effect.render()).join("")}  
        </div>
      </div>
        ${this.renderActions()}
      </div>
      `;
    }
    if (!this.player.alive) {
      return `
      <div class="card card-down card-family">
        <div class="card-tokens">
          ${new Token("dead").renderMini()}
        </div>
        <div class="card-header">
          <p>${this.name}</p>
        </div>
      </div>
      `;
    }
    return `
    <div class="card card-family card-${this.color}">
      <div class="card-tokens">
        ${this.renderTokens()}
      </div>
      <div class="card-header">
        <p>${this.name}</p>
      </div>
      <div class="card-content">
        <small class="grey">${this.description}</small>
      </div>
      ${this.renderSlots()}
      ${this.renderActions()}
    </div>
    `;
  }

  /**
   * Renders the slots for life and shield tokens on the family card
   * @returns {string} HTML markup for the token slots
   */
  renderSlots() {
    let html = "";
    if (this.slots) {
      html = `<div class="card-slots-container">`;
      for (const slot of this.slots) {
        html += `<div class="card-slots">`;
        for (let i = 0; i < slot.max; i++) {
          if (slot.tokens[i]) {
            html += `${slot.tokens[i].render()}`;
          } else {
            html += `<div class="slot slot-${slot.type}"></div>`;
          }
        }
        html += `</div>`;
      }
      html += `</div>`;
    }
    return html;
  }

  /**
   * Renders the action buttons available for this family card based on game state
   * Actions include selecting family during setup, stealing/attacking during gameplay
   * @returns {string} HTML markup for the action buttons
   */
  renderActions() {
    this.actions = [];
    let disabled = false;
    if (this.game.scene.state === "family") {
      this.actions.push(
        new Action("Select", `game.player.selectFamily('${this.id}')`)
      );
    }
    if (this.player !== this.game.player) {
      // Poison
      if (this.game.player.power == "poison") {
        disabled = !this.game.player.canPoison(this.id);
        this.actions.push(
          new Action("Poison", `game.player.poison('${this.id}')`, disabled)
        );
      }
      // Attack
      if (this.game.player.power == "attack") {
        disabled = !this.game.player.canAttack(this.id);
        this.actions.push(
          new Action("Attack", `game.player.attack('${this.id}')`, disabled)
        );
      }
      // Shame
      if (
        this.player !== this.game.player &&
        this.game.player.power == "shame"
      ) {
        disabled = !this.game.player.canShame(this.id);
        this.actions.push(
          new Action("Shame", `game.player.shame('${this.id}')`, disabled)
        );
      }
      // Denounce
      if (this.game.player.power == "denounce") {
        disabled = !this.game.player.canDenounce(this.id);
        this.actions.push(
          new Action("Denounce", `game.player.denounce('${this.id}')`, disabled)
        );
      }
      // Steal
      if (this.game.player.power == "steal") {
        disabled = !this.game.player.canStealShield(this.id);
        this.actions.push(
          new Action("Steal", `game.player.stealShield('${this.id}')`, disabled)
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
