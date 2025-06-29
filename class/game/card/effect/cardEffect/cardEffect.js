/**
 * Represents an effect that involves a card
 * Extends the base Effect class
 */
class CardEffect extends Effect {
  /**
   * Creates a new CardEffect instance
   * @param {string} typeValue - The type of card
   * @param {string} f - The function to apply (draw)
   * @param {number} fValue - The amount to draw
   */
  constructor(typeValue, f, fValue) {
    super("card", typeValue, f, fValue);
  }

  /**
   * Applies the effect to the player
   * @param {Player} player - The player to apply the effect to
   */
  on(player) {
    switch (this.typeValue) {
      case "gift":
        switch (this.f) {
          case "set":
            player.gifts.empty();
            if (this.fValue > 0) {
              for (let i = 0; i < this.fValue; i++) {
                const card = player.game.board.giftDeck.draw(player);
                if (card) {
                  player.gifts.add(card);
                }
              }
            }
            break;
          case "add":
            for (let i = 0; i < this.fValue; i++) {
              const card = player.game.board.giftDeck.draw(player);
              if (card) {
                player.gifts.add(card);
              }
            }
            break;
          case "per":
            let count = player.countTokenAll(this.fValue);
            if (this.fValue === "life") {
              count += player.countTokenAll("immune");
            }
            for (let i = 0; i < count; i++) {
              const card = player.game.board.giftDeck.draw(player);
              if (card) {
                player.gifts.add(card);
              }
            }
            break;
        }
        break;
    }
  }

  /**
   * Scores the effect
   * @param {Player} player - The player to score the effect for
   * @returns {number} The score of the effect
   */
  score(player) {
    let adding = 0;
    switch (this.f) {
      case "set":
        adding = this.fValue - player.countCard(this.typeValue);
        break;
      case "add":
        adding = this.fValue;
        break;
      case "per":
        adding = player.countTokenAll(this.fValue);
        break;
    }
    let adding_max = Math.min(adding, player.game.board.giftDeck.countCard());
    return adding_max * player.game.evals[this.typeValue];
  }

  /**
   * Renders the function and value as a string
   * @returns {string} The formatted value with appropriate +/- prefix
   */
  renderFValue(card) {
    switch (this.f) {
      case "set":
        if (this.fValue == 0) {
          return `<div class="no"><span>❌</span>${card}</div>`;
        }
        return `${this.fValue} ${card}`;
      case "add":
        return `${card}`.repeat(this.fValue);
      case "per":
        switch (this.fValue) {
          case "life":
            return `${card} : ❤️`;
          case "favor":
            return `${card} : 👑`;
          case "prestige":
            return `${card} : 💎`;
          case "crime":
            return `${card} : 💀`;
        }
    }
  }

  /**
   * Renders the card type with an appropriate emoji
   * @returns {string} The formatted card name with emoji
   */
  renderCard() {
    switch (this.typeValue) {
      case "gift":
        return `🍀`;
    }
  }

  /**
   * Renders the complete card effect as HTML
   * @returns {string} HTML string showing the card modification
   */
  render() {
    return `<div class="card-effect">${this.renderFValue(
      this.renderCard()
    )}${new Helper(this.typeValue).render()}</div>`;
  }
}
