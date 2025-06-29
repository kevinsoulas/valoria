const maliceCards = [
  {
    type: "malice",
    id: "dealings",
    name: "Dealings",
    description: "Make questionable trades that may draw attention.",
    possibleEffects: [
      [
        {
          card: "family",
          effect: "attacked",
        },
      ],
      [
        {
          token: "gold",
          add: 3,
        },
      ],
    ],
    need: "courage",
  },
  {
    type: "malice",
    id: "vengeance",
    name: "Vengeance",
    description: "Take revenge on those who wronged you",
    possibleEffects: [
      [
        {
          power: "shame",
        },
      ],
      [
        {
          card: "family",
          effect: "shamed",
        },
      ],
    ],
    need: "prestige",
  },
  {
    type: "malice",
    id: "double-game",
    name: "Double Game",
    description: "Play both sides of the court",
    possibleEffects: [
      [
        {
          card: "family",
          effect: "attacked",
        },
        {
          token: "favor",
          add: 1,
        },
      ],
    ],
    need: "favor",
  },
  {
    type: "malice",
    id: "deadly-gambit",
    name: "Deadly Gambit",
    description: "Sacrifice your loyalty to seize power",
    possibleEffects: [
      [
        {
          card: "family",
          effect: "shamed",
        },
        {
          token: "favor",
          set: 0,
        },
        {
          token: "prestige",
          add: 1,
        },
      ],
    ],
    need: "favor",
  },
  {
    type: "malice",
    id: "blackmail",
    name: "Blackmail",
    description: "Threaten to reveal secrets for personal gain",
    possibleEffects: [
      [
        {
          card: "family",
          effect: "shamed",
        },
        {
          token: "gold",
          add: 3,
        },
      ],
    ],
    need: "prestige",
  },
  {
    type: "malice",
    id: "strategic-retreat",
    name: "Strategic Retreat",
    description: "Withdraw temporarily to plan your next move",
    possibleEffects: [
      [
        {
          power: "vision",
        },
      ],
    ],
  },
  {
    type: "malice",
    id: "public-scandal",
    name: "Public Scandal",
    description: "Orchestrate rumors to elevate your standing",
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
    need: "favor",
  },
  {
    type: "malice",
    id: "secret-remedy",
    name: "Secret Remedy",
    description: "Use forbidden knowledge to restore health",
    possibleEffects: [
      [
        {
          token: "gold",
          remove: 1,
        },
        {
          card: "family",
          effect: "healed",
        },
      ],
    ],
    need: "gold",
  },
  {
    type: "malice",
    id: "old-friend",
    name: "Old Friend",
    description:
      "A stranger you aided returns with gratitude, sharing a valuable secret",
    possibleEffects: [
      [
        {
          power: "vision",
        },
      ],
    ],
    need: "prestige",
  },
  {
    type: "malice",
    id: "new-friend",
    name: "New Friend",
    description:
      "A chance encounter leads to a friendship that mends old wounds",
    possibleEffects: [
      [
        {
          card: "family",
          effect: "healed",
        },
        {
          deck: "gift",
          draw: 1,
        },
      ],
    ],
    need: "prestige",
  },
  {
    type: "malice",
    id: "hostile-takeover",
    name: "Hostile Takeover",
    description:
      "Seize control of a rival's business empire through cunning tactics",
    possibleEffects: [
      [
        {
          power: "vision",
        },
        {
          token: "gold",
          add: 4,
        },
      ],
    ],
    need: "shield",
  },
  {
    type: "malice",
    id: "high-treason",
    name: "High Treason",
    description: "Betray the crown for personal gain",
    possibleEffects: [
      [
        {
          token: "gold",
          add: 3,
        },
        {
          token: "favor",
          set: 0,
        },
      ],
    ],
    need: "favor",
  },
  {
    type: "malice",
    id: "bribery",
    name: "Bribery",
    description: "A risky attempt to influence the council's favor",
    possibleEffects: [
      [
        {
          token: "favor",
          add: 1,
        },
        {
          deck: "gift",
          set: 0,
        },
      ],
    ],
    need: "gift",
  },
  {
    type: "malice",
    id: "kill-king",
    name: "Kill the King",
    description: "Participate in a deadly conspiracy against the crown",
    possibleEffects: [
      [
        {
          condition: "light",
          token: "gold",
          add: 4,
        },
        {
          condition: "dark",
          game: "regicide",
        },
      ],
    ],
    need: "prestige",
  },
  {
    type: "malice",
    id: "costume-ball",
    name: "Costume Ball",
    description:
      "Host an extravagant masquerade where influence becomes wealth",
    possibleEffects: [
      [
        {
          condition: "light",
          token: "gold",
          per: "prestige",
        },
        {
          condition: "dark",
          token: "prestige",
          remove: 1,
        },
      ],
    ],
    need: "prestige",
  },
  {
    type: "malice",
    id: "festin",
    name: "Royal Feast",
    description: "Attend a lavish feast where plots unfold",
    possibleEffects: [
      [
        {
          token: "gold",
          per: "favor",
        },
      ],
      [
        {
          card: "family",
          effect: "poisoned",
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
          effect: "attacked",
        },
      ],
    ],
    need: "favor",
  },
];
