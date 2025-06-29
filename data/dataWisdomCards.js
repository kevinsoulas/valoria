const wisdomCards = [
  {
    type: "wisdom",
    id: "penitence",
    name: "Penitence",
    description: "Give up worldly possessions in pursuit of enlightenment",
    possibleEffects: [
      [
        {
          token: "gold",
          set: 0,
        },
        {
          card: "family",
          effect: "healed",
        },
      ],
      [
        {
          token: "gold",
          set: 0,
        },
        {
          power: "vision",
        },
      ],
    ],
  },
  {
    type: "wisdom",
    id: "construction",
    name: "Construction",
    description: "Study engineering to build new machines",
    possibleEffects: [
      [
        {
          token: "gold",
          add: 1,
        },
      ],
      [
        {
          token: "prestige",
          add: 1,
        },
      ],
      [
        {
          card: "family",
          effect: "shamed",
        },
      ],
    ],
  },
  {
    type: "wisdom",
    id: "spiritual-leader",
    name: "Spiritual Leader",
    description: "Take an unorthodox path to guide others",
    possibleEffects: [
      [
        {
          condition: "light",
          token: "prestige",
          add: 1,
        },
        {
          condition: "dark",
          token: "gold",
          set: 0,
        },
      ],
    ],
  },
  {
    type: "wisdom",
    id: "healing-prayer",
    name: "Healing Prayer",
    description: "A moment of divine intervention restores your health",
    possibleEffects: [
      [
        {
          card: "family",
          effect: "healed",
        },
      ],
    ],
  },
  {
    type: "wisdom",
    id: "forbidden-knowledge",
    name: "Forbidden Knowledge",
    description: "Study ancient texts that could reveal great wisdom",
    possibleEffects: [
      [
        {
          condition: "dark",
          token: "prestige",
          add: 1,
        },
        {
          condition: "light",
          card: "family",
          effect: "healed",
        },
      ],
    ],
  },
  {
    type: "wisdom",
    id: "daily-potion",
    name: "Daily Potion",
    description: "Taste the wizard's potion of the day",
    possibleEffects: [
      [
        {
          condition: "light",
          card: "family",
          effect: "healed",
        },
        {
          condition: "dark",
          token: "gold",
          set: 0,
        },
      ],
    ],
  },
  {
    type: "wisdom",
    id: "investment",
    name: "Investment",
    description: "Make a calculated financial decision",
    possibleEffects: [
      [
        {
          token: "gold",
          mult: 2,
        },
      ],
      [
        {
          token: "gold",
          set: 0,
        },
      ],
    ],
  },
  {
    type: "wisdom",
    id: "diplomacy",
    name: "Diplomacy",
    description: "Negotiate skillfully with the court",
    possibleEffects: [
      [
        {
          condition: "light",
          token: "favor",
          add: 1,
        },
        {
          condition: "dark",
          power: "vision",
        },
      ],
    ],
  },
  {
    type: "wisdom",
    id: "meditation",
    name: "Meditation",
    description: "Achieve clarity through deep contemplation",
    possibleEffects: [
      [
        {
          power: "vision",
        },
      ],
    ],
  },
  {
    type: "wisdom",
    id: "audience",
    name: "Audience",
    description: "Hold a private meeting with a potential ally",
    possibleEffects: [
      [
        {
          condition: "light",
          card: "family",
          effect: "healed",
        },
        {
          condition: "dark",
          card: "family",
          effect: "shamed",
        },
      ],
      [
        {
          power: "vision",
        },
      ],
    ],
  },
  {
    type: "wisdom",
    id: "market-foresight",
    name: "Market Foresight",
    description: "Glimpse future opportunities for profit in the marketplace",
    possibleEffects: [
      [
        {
          power: "vision",
        },
        {
          token: "gold",
          add: 2,
        },
      ],
    ],
  },
  {
    type: "wisdom",
    id: "fortunes-favor",
    name: "Fortune's Favor",
    description: "The threads of fate lead to an unexpected treasure",
    possibleEffects: [
      [
        {
          deck: "gift",
          draw: 1,
        },
      ],
    ],
  },
  {
    type: "wisdom",
    id: "enlightened-path",
    name: "Enlightened Path",
    description:
      "To obtain either enlightened insight or noble recognition from those with malicious intent.",
    possibleEffects: [
      [
        {
          condition: "light",
          power: "vision",
        },
        {
          condition: "dark",
          token: "prestige",
          add: 1,
        },
      ],
    ],
  },
  {
    type: "wisdom",
    id: "royal-counsel",
    name: "Royal Counsel",
    description:
      "Present your assessment of the realm's affairs to the royal council",
    possibleEffects: [
      [
        {
          token: "favor",
          add: 1,
        },
      ],
      [
        {
          card: "family",
          effect: "shamed",
        },
      ],
    ],
  },
  {
    type: "wisdom",
    id: "divine-blessing",
    name: "Divine Blessing",
    description:
      "Receive a divine blessing that may heal or bestow fortune's favor",
    possibleEffects: [
      [
        {
          card: "family",
          effect: "healed",
        },
      ],
      [
        {
          token: "gold",
          set: 0,
        },
        {
          deck: "gift",
          draw: 1,
        },
      ],
    ],
  },
];
