/**
 * Base class representing an effect that can be applied to game elements
 */
class Effect {
  /**
   * Creates a new Effect instance
   * @param {string} type - The type of effect (token, card, deck, etc)
   * @param {string} typeValue - The specific value for the type
   * @param {string|null} f - The function to apply (optional)
   * @param {string|number|null} fValue - The value for the function (optional)
   * @param {string|null} condition - Any condition that must be met (optional)
   */
  constructor(type, typeValue, f = null, fValue = null, condition = null) {
    this.type = type;
    this.typeValue = typeValue;
    this.f = f;
    this.fValue = fValue;
    this.condition = condition;
  }

  /**
   * Factory method to create the appropriate Effect subclass
   * @param {string} type - The type of effect
   * @param {string} typeValue - The specific value for the type
   * @param {string|null} f - The function to apply (optional)
   * @param {string|number|null} fValue - The value for the function (optional)
   * @returns {Effect} The appropriate Effect subclass instance
   */
  static create(type, typeValue, f = null, fValue = null, condition = null) {
    switch (type) {
      case "token":
        return new TokenEffect(typeValue, f, fValue, condition);
      case "card":
        return new CardEffect(typeValue, f, fValue, condition);
      case "deck":
        return new DeckEffect(typeValue, f, fValue, condition);
      case "setting":
        return new SettingEffect(typeValue, f, fValue, condition);
      case "power":
        return new PowerEffect(typeValue, f, fValue, condition);
      case "player":
        return new PlayerEffect(typeValue, f, fValue, condition);
      case "game":
        return new GameEffect(typeValue, f, fValue, condition);
    }
  }
}
