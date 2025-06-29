const postureCards = [
  {
    extension: 0,
    type: "posture",
    id: "one-favor",
    name: "One Favor",
    description: "Perform a service to earn the king's personal gratitude",
    possibleChapters: [1],
    possibleEffects: [
      [
        {
          token: "favor",
          add: 1,
        },
      ],
    ],
  },
  {
    extension: 0,
    type: "posture",
    id: "royal-quest",
    name: "Royal Quest",
    description: "Undertake a prestigious mission in service of the crown",
    possibleChapters: [1],
    possibleEffects: [
      [
        {
          token: "prestige",
          add: 1,
        },
      ],
    ],
  },
  {
    extension: 0,
    type: "posture",
    id: "looting",
    name: "Looting",
    description: "Risk everything to steal riches from the royal coffers",
    possibleChapters: [1],
    possibleEffects: [
      [
        {
          token: "gold",
          add: 1,
        },
      ],
    ],
  },
  {
    extension: 0,
    type: "posture",
    id: "mastery",
    name: "Mastery",
    description: "Train diligently with a master to strengthen your body",
    possibleChapters: [1],
    possibleEffects: [
      [
        {
          player: "attacked",
        },
        {
          power: "gift-choice",
        },
      ],
    ],
  },
  {
    extension: 0,
    type: "posture",
    id: "strategy",
    name: "Strategy",
    description: "Take time to observe and analyze the political landscape",
    possibleChapters: [1],
    possibleEffects: [
      [
        {
          power: "vision",
        },
      ],
    ],
  },
  {
    extension: 1,
    type: "posture",
    id: "accident",
    name: "Accident",
    description:
      "Stage an unfortunate accident... but be prepared to face the consequences",
    possibleChapters: [1],
    possibleEffects: [
      [
        {
          token: "crime",
          add: 1,
        },
      ],
    ],
  },

  {
    extension: 2,
    type: "posture",
    id: "acquaintance",
    name: "Acquaintance",
    description: "Make new powerful connections in the royal court today",
    possibleChapters: [1],
    possibleEffects: [
      [
        {
          power: "meet",
        },
      ],
    ],
  },
  {
    extension: 0,
    type: "posture",
    id: "mercy",
    name: "Mercy",
    description: "Show compassion to your rivals to gain moral standing",
    possibleChapters: [2],
    possibleEffects: [
      [
        {
          token: "life",
          add: 1,
        },
        {
          player: "shamed",
        },
      ],
    ],
  },
  {
    extension: 0,
    type: "posture",
    id: "sacrifice",
    name: "Sacrifice",
    description: "Trade material wealth for a chance at greater influence",
    possibleChapters: [2],
    possibleEffects: [
      [
        {
          token: "gold",
          add: 1,
        },
        {
          player: "attacked",
        },
      ],
    ],
  },
  {
    extension: 0,
    type: "posture",
    id: "legacy",
    name: "Legacy",
    description: "Make strategic investments to secure long-term advantages",
    possibleChapters: [2],
    possibleEffects: [
      [
        {
          token: "gold",
          add: 1,
        },
        {
          card: "gift",
          add: 1,
        },
      ],
    ],
  },
  {
    extension: 0,
    type: "posture",
    id: "foresight",
    name: "Foresight",
    description: "Use your resources to gather valuable intelligence",
    possibleChapters: [2],
    possibleEffects: [
      [
        {
          token: "gold",
          add: 1,
        },
        {
          power: "vision",
        },
      ],
    ],
  },
  {
    extension: 0,
    type: "posture",
    id: "introduction",
    name: "Introduction",
    description: "A fortuitous encounter through a generous intermediary",
    possibleChapters: [2],
    possibleEffects: [
      [
        {
          token: "gold",
          add: 1,
        },
        {
          power: "meet",
        },
      ],
    ],
  },
  {
    extension: 1,
    type: "posture",
    id: "advocate",
    name: "Advocate",
    description: "Gather intelligence while undermining others' reputations",
    possibleChapters: [2],
    possibleEffects: [
      [
        {
          power: "vision",
        },
        {
          player: "shamed",
        },
      ],
    ],
  },
  {
    extension: 2,
    type: "posture",
    id: "intimidation",
    name: "Intimidation",
    description: "Use threats and coercion to force others into criminal acts",
    possibleChapters: [2],
    possibleEffects: [
      [
        {
          token: "crime",
          add: 2,
        },
      ],
    ],
  },
  {
    extension: 0,
    type: "posture",
    id: "treasure",
    name: "Treasure",
    description: "Convert your accumulated wealth into vital resources",
    possibleChapters: [3],
    possibleEffects: [
      [
        {
          token: "gold",
          per: "life",
        },
      ],
    ],
  },
  {
    extension: 0,
    type: "posture",
    id: "heresy",
    name: "Heresy",
    description: "Amass riches through forbidden and dangerous means",
    possibleChapters: [3],
    possibleEffects: [
      [
        {
          token: "gold",
          add: 2,
        },
        {
          player: "shamed",
        },
      ],
    ],
  },
  {
    extension: 0,
    type: "posture",
    id: "experiment",
    name: "Experiment",
    description: "Pursue dangerous alchemical experiments for great profit",
    possibleChapters: [3],
    possibleEffects: [
      [
        {
          token: "gold",
          add: 2,
        },
        {
          player: "poisoned",
        },
      ],
    ],
  },
  {
    extension: 0,
    type: "posture",
    id: "investment",
    name: "Investment",
    description: "Make a shrewd financial move to multiply your wealth",
    possibleChapters: [3],
    possibleEffects: [
      [
        {
          token: "gold",
          mult: 2,
        },
      ],
    ],
  },
  {
    extension: 0,
    type: "posture",
    id: "feudal-taxes",
    name: "Feudal Taxes",
    description: "Use your wealth to curry favor with the crown",
    possibleChapters: [3],
    possibleEffects: [
      [
        {
          token: "gold",
          per: "favor",
        },
      ],
    ],
  },
  {
    extension: 1,
    type: "posture",
    id: "guild",
    name: "Guild",
    description: "Trade with merchant guilds to acquire precious gems",
    possibleChapters: [3],
    possibleEffects: [
      [
        {
          token: "gold",
          per: "prestige",
        },
      ],
    ],
  },
  {
    extension: 2,
    type: "posture",
    id: "blackmail",
    name: "Blackmail",
    description: "Use dark secrets to extort gold from your enemies",
    possibleChapters: [3],
    possibleEffects: [
      [
        {
          token: "gold",
          per: "crime",
        },
      ],
    ],
  },
  {
    extension: 0,
    type: "posture",
    id: "feast",
    name: "Feast",
    description: "Aroyal banquet where both opportunities and dangers await",
    possibleChapters: [1, 2, 3],
    possibleEffects: [
      [
        {
          token: "favor",
          add: 1,
        },
      ],
      [
        {
          player: "attacked",
        },
      ],
      [
        {
          player: "poisoned",
        },
      ],
    ],
  },
  {
    extension: 0,
    type: "posture",
    id: "ceremony",
    name: "Ceremony",
    description: "Participate in a royal ceremony with uncertain outcomes",
    possibleChapters: [1, 2, 3],
    possibleEffects: [
      [
        {
          token: "prestige",
          add: 1,
        },
      ],
      [
        {
          power: "vision",
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
    extension: 0,
    type: "posture",
    id: "royal-blood",
    name: "Royal Blood",
    description: "Assert your noble lineage to gain influence",
    possibleChapters: [1, 2, 3],
    possibleEffects: [
      [
        {
          token: "favor",
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
          token: "favor",
          set: 0,
        },
        {
          token: "prestige",
          set: 0,
        },
      ],
    ],
  },
  {
    extension: 0,
    type: "posture",
    id: "hero",
    name: "Hero",
    description: "Take heroic action to gain glory or face dire consequences",
    possibleChapters: [1, 2, 3],
    possibleEffects: [
      [
        {
          token: "prestige",
          add: 1,
        },
        {
          token: "life",
          add: 1,
        },
      ],
      [
        {
          player: "attacked",
        },
      ],
      [
        {
          token: "shield",
          set: 0,
        },
        {
          player: "shamed",
        },
      ],
    ],
  },
  {
    extension: 1,
    type: "posture",
    id: "loyalty",
    name: "Loyalty",
    description: "Demonstrate your loyalty to gain rewards or suffer betrayal",
    possibleChapters: [1, 2, 3],
    possibleEffects: [
      [
        {
          card: "gift",
          per: "life",
        },
      ],
      [
        {
          player: "attacked",
        },
      ],
      [
        {
          player: "poisoned",
        },
      ],
    ],
  },
  {
    extension: 1,
    type: "posture",
    id: "tournament",
    name: "Tournament",
    description: "Enter the royal tournament to win glory or face defeat",
    possibleChapters: [1, 2, 3],
    possibleEffects: [
      [
        {
          token: "prestige",
          add: 1,
        },
        {
          token: "gold",
          add: 1,
        },
      ],
      [
        {
          token: "prestige",
          set: 0,
        },
      ],
      [
        {
          token: "shield",
          set: 0,
        },
        {
          player: "attacked",
        },
      ],
    ],
  },
  {
    extension: 0,
    type: "posture",
    id: "marriage",
    name: "Marriage",
    description: "Form a powerful political alliance through matrimony",
    possibleChapters: [1, 2],
    possibleEffects: [
      [
        {
          token: "life",
          add: 1,
        },
      ],
      [
        {
          player: "denounced",
        },
      ],
    ],
  },
  {
    extension: 0,
    type: "posture",
    id: "alliance",
    name: "Alliance",
    description: "Form a strategic partnership with another noble house",
    possibleChapters: [1, 2],
    possibleEffects: [
      [
        {
          token: "prestige",
          add: 1,
        },
      ],
      [
        {
          player: "shamed",
        },
      ],
    ],
  },
  {
    extension: 0,
    type: "posture",
    id: "conspiracy",
    name: "Conspiracy",
    description: "Plot in secret with fellow conspirators to gain advantage",
    possibleChapters: [1, 2],
    possibleEffects: [
      [
        {
          token: "gold",
          add: 1,
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
    extension: 2,
    type: "posture",
    id: "espionage",
    name: "Espionage",
    description:
      "Gather intelligence through covert means and secret informants",
    possibleChapters: [1, 2],
    possibleEffects: [
      [
        {
          power: "vision",
        },
      ],
      [
        {
          player: "denounced",
        },
        {
          token: "crime",
          add: 1,
        },
      ],
    ],
  },
  {
    extension: 0,
    type: "posture",
    id: "dark-potion",
    name: "Dark Potion",
    description: "A mysterious concoction with unpredictable effects",
    possibleChapters: [1, 3],
    possibleEffects: [
      [
        {
          power: "vision",
        },
      ],
      [
        {
          player: "poisoned",
        },
      ],
    ],
  },
  {
    extension: 0,
    type: "posture",
    id: "vengeance",
    name: "Vengeance",
    description: "Strike back at those who have wronged you...",
    possibleChapters: [1, 3],
    possibleEffects: [
      [
        {
          power: "steal",
        },
      ],
      [
        {
          player: "attacked",
        },
      ],
    ],
  },
  {
    extension: 0,
    type: "posture",
    id: "blessing",
    name: "Blessing",
    description: "Seek divine favor and guidance with uncertain outcomes",
    possibleChapters: [1, 3],
    possibleEffects: [
      [
        {
          card: "gift",
          add: 1,
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
    extension: 2,
    type: "posture",
    id: "court",
    name: "Court",
    description:
      "Use false evidence of crimes to gain leverage in the royal court",
    possibleChapters: [1, 3],
    possibleEffects: [
      [
        {
          card: "gift",
          per: "crime",
        },
      ],
      [
        {
          player: "denounced",
          per: "crime",
        },
      ],
    ],
  },
  {
    extension: 0,
    type: "posture",
    id: "bribery",
    name: "Bribery",
    description: "Use wealth to influence others, but risk exposure",
    possibleChapters: [1, 3],
    possibleEffects: [
      [
        {
          token: "favor",
          add: 1,
        },
      ],
      [
        {
          card: "gift",
          set: 0,
        },
      ],
    ],
  },
  {
    extension: 0,
    type: "posture",
    id: "spiritual",
    name: "Spiritual",
    description: "Seek spiritual enlightenment with consequences",
    possibleChapters: [1, 3],
    possibleEffects: [
      [
        {
          token: "gold",
          add: 3,
        },
      ],
      [
        {
          token: "favor",
          set: 0,
        },
      ],
    ],
  },
  {
    extension: 0,
    type: "posture",
    id: "duel",
    name: "Duel",
    description: "Challenge a rival to a duel of honor with high stakes",
    possibleChapters: [1, 3],
    possibleEffects: [
      [
        {
          token: "prestige",
          add: 1,
        },
        {
          card: "gift",
          add: 1,
        },
      ],
      [
        {
          token: "favor",
          set: 0,
        },
        {
          token: "prestige",
          set: 0,
        },
      ],
    ],
  },
  {
    extension: 2,
    type: "posture",
    id: "revenge",
    name: "Revenge",
    description: "Use criminals to take bloody revenge on enemies",
    possibleChapters: [2, 3],
    possibleEffects: [
      [
        {
          token: "prestige",
          add: 1,
        },
      ],
      [
        {
          player: "attacked",
          per: "crime",
        },
      ],
    ],
  },
];
