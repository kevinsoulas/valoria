class Action {
  constructor(name, callback, disabled = false, visible = true) {
    this.name = name;
    this.callback = callback;
    this.disabled = disabled;
    this.visible = visible;
  }

  hide() {
    this.visible = false;
  }

  show() {
    this.visible = true;
  }

  disable() {
    this.disabled = true;
  }

  enable() {
    this.disabled = false;
  }

  render() {
    if (!this.visible) return "";
    return `<button onclick="${this.callback}" ${
      this.disabled ? "disabled" : ""
    }>${this.name}</button>`;
  }
}
