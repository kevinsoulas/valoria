/**
 * Represents an effect that modifies game settings
 * Extends the base Effect class
 */
class SettingEffect extends Effect {
  /**
   * Creates a new SettingEffect instance
   * @param {string} typeValue - The type of setting to modify
   * @param {string} f - The function to apply (amount)
   * @param {number} fValue - The amount to modify by
   */
  constructor(typeValue, f, fValue) {
    super("setting", typeValue, f, fValue);
  }

  /**
   * Renders the function and value as a string
   * @returns {string} The formatted value with appropriate +/- prefix
   */
  renderFValue() {
    switch (this.f) {
      case "set":
        return `${this.fValue}`;
    }
  }

  /**
   * Renders the setting type with an appropriate emoji
   * @returns {string} The formatted setting name with emoji
   */
  renderSetting() {
    switch (this.typeValue) {
      case "ai":
        return `🤖 AI`;
    }
  }

  /**
   * Renders the complete setting effect as HTML
   * @returns {string} HTML string showing the setting modification
   */
  render() {
    return `<small><em>${this.renderFValue()} ${this.renderSetting()}</em></small>`;
  }
}
