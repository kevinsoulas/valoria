const courageCards = [
  {
    type: "courage",
    id: "royal-defense",
    name: "Royal Defense",
    description: "Rally to protect the king in a moment of crisis",
    possibleEffects: [
      [
        {
          condition: "light",
          token: "favor",
          add: 1,
        },
        {
          condition: "dark",
          card: "family",
          effect: "attacked",
        },
      ],
    ],
  },
  {
    type: "courage",
    id: "marriage-alliance",
    name: "Marriage Alliance",
    description:
      "Propose a marriage alliance that could bring prestige or shame",
    possibleEffects: [
      [
        {
          condition: "light",
          token: "prestige",
          add: 1,
        },
        {
          condition: "dark",
          card: "family",
          effect: "shamed",
        },
      ],
    ],
  },
  {
    type: "courage",
    id: "tournament",
    name: "Tournament",
    description: "Enter the royal tournament for glory and riches",
    possibleEffects: [
      [
        {
          token: "prestige",
          add: 1,
        },
      ],
      [
        {
          token: "shield",
          set: 0,
        },
        {
          card: "family",
          effect: "attacked",
        },
      ],
    ],
    need: "courage",
  },
  {
    type: "courage",
    id: "loyalty-test",
    name: "Loyalty Test",
    description: "Risk your life to prove your loyalty to the crown",
    possibleEffects: [
      [
        {
          card: "family",
          effect: "attacked",
        },
      ],
      [
        {
          deck: "gift",
          draw: 1,
        },
      ],
      [
        {
          token: "favor",
          add: 1,
        },
      ],
    ],
    need: "courage",
  },
  {
    type: "courage",
    id: "royal-decree",
    name: "Royal Decree",
    description:
      "A dangerous royal command that could lead to great peril or great favor",
    possibleEffects: [
      [
        {
          card: "family",
          effect: "attacked",
        },
        {
          token: "favor",
          set: 0,
        },
      ],
      [
        {
          token: "favor",
          add: 2,
        },
      ],
    ],
    need: "courage",
  },
  {
    type: "courage",
    id: "potion",
    name: "Potion",
    description: "A mysterious potion with unknown effects",
    possibleEffects: [
      [
        {
          card: "family",
          effect: "poisoned",
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
    type: "courage",
    id: "sacrifice",
    name: "Sacrifice",
    description: "Risk your safety to help another in need",
    possibleEffects: [
      [
        {
          card: "family",
          effect: "attacked",
        },
      ],
      [
        {
          deck: "gift",
          draw: 1,
        },
      ],
    ],
    need: "courage",
  },
  {
    type: "courage",
    id: "divine-decree",
    name: "Divine Decree",
    description: "Call upon higher powers with unpredictable results",
    possibleEffects: [
      [
        {
          token: "gold",
          remove: 1,
        },
        {
          card: "family",
          effect: "shamed",
        },
      ],
      [
        {
          token: "gold",
          remove: 1,
        },
        {
          token: "favor",
          add: 1,
        },
      ],
    ],
    need: "gold",
  },
  {
    type: "courage",
    id: "noble-gift",
    name: "Noble Gift",
    description: "A token of appreciation for your courageous deeds",
    possibleEffects: [
      [
        {
          deck: "gift",
          draw: 1,
        },
      ],
    ],
    need: "favor",
  },
  {
    type: "courage",
    id: "royal-reward",
    name: "Royal Reward",
    description: "Your bravery is rewarded with gold from the treasury",
    possibleEffects: [
      [
        {
          token: "gold",
          add: 1,
        },
      ],
    ],
    need: "favor",
  },
  {
    type: "courage",
    id: "oracles-insight",
    name: "Oracle's Insight",
    description: "A mystical vision reveals what lies ahead",
    possibleEffects: [
      [
        {
          power: "vision",
        },
      ],
    ],
  },
  {
    type: "courage",
    id: "monster-hunt",
    name: "Monster Hunt",
    description: "Join a perilous quest to slay a fearsome monster",
    possibleEffects: [
      [
        {
          card: "family",
          effect: "attacked",
        },
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
    need: "courage",
  },
  {
    type: "courage",
    id: "royal-defense",
    name: "Royal Defense",
    description: "Rally to protect the king in a moment of crisis",
    possibleEffects: [
      [
        {
          condition: "light",
          token: "favor",
          add: 1,
        },
        {
          condition: "dark",
          card: "family",
          effect: "attacked",
        },
      ],
    ],
    need: "courage",
  },
];
