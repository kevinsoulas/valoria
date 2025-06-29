class Cost {
  constructor(type, typeValue, f = null, fValue = null) {
    this.type = type;
    this.typeValue = typeValue;
    this.f = f;
    this.fValue = fValue;
  }

  static create(type, typeValue, f = null, fValue = null) {
    switch (type) {
      case "token":
        return new TokenCost(typeValue, f, fValue);
      case "card":
        return new CardCost(typeValue, f, fValue);
    }
  }
}
