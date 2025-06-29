const giftCards = [
  {
    extension: -1,
    type: "gift",
    color: "green",
    id: "cheat",
    name: "Cheat",
    description: "A powerful collection of resources to dominate the game.",
    tokens: [
      {
        type: "gift",
        value: 1,
      },
    ],
    effects: [
      {
        card: "gift",
        add: 20,
      },
      {
        token: "favor",
        add: 7,
      },
      {
        token: "prestige",
        add: 7,
      },
      {
        token: "gold",
        add: 7,
      },
      {
        token: "shield",
        add: 1,
      },
      {
        token: "life",
        add: 3,
      },
      // {
      //   token: "crime",
      //   add: 7,
      // },
    ],
  },
  {
    extension: 0,
    type: "gift",
    color: "green",
    id: "red-potion",
    name: "Red Potion",
    description: "Magical healing liquid that brings life back to warriors.",
    tokens: [
      {
        type: "gift",
        value: 1,
      },
    ],
    effects: [
      {
        token: "life",
        add: 1,
      },
    ],
  },
  {
    extension: 0,
    type: "gift",
    color: "green",
    id: "blue-potion",
    name: "Blue Potion",
    description: "Enchanted drink revealing secrets of the cards to come.",
    tokens: [
      {
        type: "gift",
        value: 1,
      },
    ],
    effects: [
      {
        power: "vision",
      },
    ],
  },
  {
    extension: 0,
    type: "gift",
    color: "green",
    id: "green-potion",
    name: "Green Potion",
    description: "Lethal venom that brings swift death to enemies.",
    tokens: [
      {
        type: "gift",
        value: 1,
      },
    ],
    effects: [
      {
        power: "poison",
      },
    ],
  },
  {
    extension: 1,
    type: "gift",
    color: "green",
    id: "purple-potion",
    name: "Purple Potion",
    description: "Mysterious concoction that confuses and disorients the mind.",
    tokens: [
      {
        type: "gift",
        value: 1,
      },
    ],
    effects: [
      {
        power: "steal",
      },
    ],
  },
  {
    extension: 0,
    type: "gift",
    color: "green",
    id: "precious-gems",
    name: "Precious Gems",
    description: "Rare and valuable stones from deep within the earth.",
    tokens: [
      {
        type: "gift",
        value: 1,
      },
    ],
    effects: [
      {
        token: "gold",
        add: 2,
      },
    ],
  },
  {
    extension: 1,
    type: "gift",
    color: "green",
    id: "nobles-letter",
    name: "Noble's Letter",
    description:
      "Secret correspondence revealing the darkest political schemes.",
    tokens: [
      {
        type: "gift",
        value: 1,
      },
    ],
    effects: [
      {
        token: "favor",
        add: 1,
      },
    ],
  },
  {
    extension: 1,
    type: "gift",
    color: "green",
    id: "hidden-ledger",
    name: "Hidden Ledger",
    description: "Ancient book containing records of forbidden dealings.",
    tokens: [
      {
        type: "gift",
        value: 1,
      },
    ],
    effects: [
      {
        token: "prestige",
        add: 1,
      },
    ],
  },
  {
    extension: 0,
    type: "gift",
    color: "green",
    id: "royal-scandal",
    name: "Royal Scandal",
    description: "Shocking secrets that could destroy the royal family.",
    tokens: [
      {
        type: "gift",
        value: 1,
      },
    ],
    effects: [
      {
        token: "favor",
        add: 1,
      },
    ],
  },
  {
    extension: 1,
    type: "gift",
    color: "green",
    id: "ancient-crown",
    name: "Ancient Crown",
    description:
      "Precious royal artifact from a long-forgotten kingdom's past.",
    tokens: [
      {
        type: "gift",
        value: 1,
      },
    ],
    effects: [
      {
        token: "gold",
        add: 3,
      },
    ],
  },
  {
    extension: 0,
    type: "gift",
    color: "green",
    id: "sacred-chalice",
    name: "Sacred Chalice",
    description: "Holy vessel used to crown kings and queens.",
    tokens: [
      {
        type: "gift",
        value: 1,
      },
    ],
    effects: [
      {
        token: "prestige",
        add: 1,
      },
    ],
  },
  {
    extension: 1,
    type: "gift",
    color: "green",
    id: "genius-invention",
    name: "Genius Invention",
    description: "Mysterious machine that converts life force into wealth.",
    tokens: [
      {
        type: "gift",
        value: 1,
      },
    ],
    effects: [
      {
        token: "gold",
        per: "life",
      },
    ],
  },
  {
    extension: 0,
    type: "gift",
    color: "green",
    id: "royal-shield",
    name: "Royal Shield",
    description: "Legendary shield that has protected generations of rulers.",
    tokens: [
      {
        type: "gift",
        value: 1,
      },
    ],
    effects: [
      {
        token: "shield",
        set: 1,
      },
    ],
  },
  {
    extension: 0,
    type: "gift",
    color: "green",
    id: "faithful-hound",
    name: "Faithful Hound",
    description: "Battle-trained dog that fights fiercely for its master.",
    tokens: [
      {
        type: "gift",
        value: 1,
      },
    ],
    effects: [
      {
        power: "attack",
      },
    ],
  },
  {
    extension: 0,
    type: "gift",
    color: "green",
    id: "shameful-secret",
    name: "Shameful Secret",
    description:
      "A dark secret that could ruin someone's reputation if revealed.",
    tokens: [
      {
        type: "gift",
        value: 1,
      },
    ],
    effects: [
      {
        power: "shame",
      },
    ],
  },
  {
    extension: 0,
    type: "gift",
    color: "green",
    id: "prophecy-1",
    name: "Prophecy",
    description: "First part of ancient text foretelling royal destiny.",
    tokens: [
      {
        type: "prophecy",
        value: 1,
      },
      {
        type: "gift",
        value: 1,
      },
    ],
  },
  {
    extension: 0,
    type: "gift",
    color: "green",
    id: "prophecy-2",
    name: "Prophecy",
    description: "Second part of ancient text foretelling royal destiny.",
    tokens: [
      {
        type: "prophecy",
        value: 1,
      },
      {
        type: "gift",
        value: 1,
      },
    ],
  },
  {
    extension: 2,
    type: "gift",
    color: "green",
    id: "prison-key",
    name: "Prison Key",
    description: "Key to the prison where the king's enemy is held.",
    tokens: [
      {
        type: "key",
        value: 1,
      },
      {
        type: "gift",
        value: 1,
      },
    ],
  },
  {
    extension: 2,
    type: "gift",
    color: "green",
    id: "allegations",
    name: "Allegations",
    description: "Scandalous claims that can destroy anyone's good name.",
    tokens: [
      {
        type: "gift",
        value: 1,
      },
    ],
    effects: [
      {
        power: "denounce",
      },
    ],
  },
  {
    extension: 2,
    type: "gift",
    color: "green",
    id: "family-secrets",
    name: "Family Secrets",
    description: "Dark secrets that can be leveraged for wealth.",
    tokens: [
      {
        type: "gift",
        value: 1,
      },
    ],
    effects: [
      {
        token: "gold",
        per: "crime",
      },
    ],
  },
];
