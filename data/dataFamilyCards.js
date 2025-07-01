const familyCards = [
  {
    extension: 0,
    type: "family",
    color: "red",
    id: "valorage",
    name: "Valorage",
    description: "Royal family blessed with the King's favor and protection",
    heirPriority: 1,
    tokens: [
      {
        type: "favor",
        value: 1,
      },
      {
        type: "life",
        value: 1,
      },
    ],
    slots: [
      {
        type: "shield",
        max: 1,
      },
      {
        type: "life",
        max: 3,
      },
    ],
    effects: [
      {
        token: "life",
        set: 1,
      },
      {
        token: "gold",
        set: 1,
      },
    ],
  },
  {
    extension: 0,
    type: "family",
    color: "red",
    id: "ombrevoie",
    name: "Ombrevoie",
    description: "Ancient nobles commanding respect through influence",
    heirPriority: 2,
    tokens: [
      {
        type: "life",
        value: 1,
      },
    ],
    slots: [
      {
        type: "shield",
        max: 1,
      },
      {
        type: "life",
        max: 3,
      },
    ],
    effects: [
      {
        token: "life",
        set: 1,
      },
      {
        power: "vision",
      },
      {
        token: "gold",
        set: 3,
      },
    ],
  },
  {
    extension: 0,
    type: "family",
    color: "red",
    id: "salbatar",
    name: "Salbatar",
    description:
      "Wealthy merchants built fortune through generations of trading",
    heirPriority: 3,
    tokens: [
      {
        type: "life",
        value: 1,
      },
    ],
    slots: [
      {
        type: "shield",
        max: 1,
      },
      {
        type: "life",
        max: 3,
      },
    ],
    effects: [
      {
        token: "life",
        set: 1,
      },
      {
        token: "gold",
        set: 4,
      },
    ],
  },
  {
    extension: 0,
    type: "family",
    color: "red",
    id: "lamarel",
    name: "Lamarel",
    description: "Masters of courtly intrigue and valuable connections",
    heirPriority: 4,
    tokens: [
      {
        type: "life",
        value: 1,
      },
    ],
    slots: [
      {
        type: "shield",
        max: 1,
      },
      {
        type: "life",
        max: 3,
      },
    ],
    effects: [
      {
        token: "life",
        set: 1,
      },
      {
        token: "gold",
        set: 2,
      },
      {
        card: "gift",
        set: 1,
      },
    ],
  },
  {
    extension: 0,
    type: "family",
    color: "red",
    id: "gavanor",
    name: "Gavanor",
    description: "Stalwart defenders with loyalty strong as armor",
    heirPriority: 5,
    tokens: [
      {
        type: "life",
        value: 1,
      },
    ],
    slots: [
      {
        type: "shield",
        max: 1,
      },
      {
        type: "life",
        max: 3,
      },
    ],
    effects: [
      {
        token: "life",
        set: 1,
      },
      {
        token: "shield",
        set: 1,
      },
      {
        token: "prestige",
        set: 1,
      },
    ],
  },
  {
    extension: 0,
    type: "family",
    color: "red",
    id: "perceval",
    name: "Perceval",
    description: "Noble warriors who earned glory in battle and honor",
    heirPriority: 6,
    tokens: [
      {
        type: "life",
        value: 1,
      },
    ],
    slots: [
      {
        type: "shield",
        max: 1,
      },
      {
        type: "life",
        max: 3,
      },
    ],
    effects: [
      {
        token: "life",
        set: 2,
      },
      {
        power: "vision",
      },
    ],
  },
  {
    extension: 0,
    type: "family",
    color: "red",
    id: "corbrune",
    name: "Corbrune",
    description: "Diplomats maintaining influence through vast ally networks",
    heirPriority: 7,
    tokens: [
      {
        type: "life",
        value: 1,
      },
    ],
    slots: [
      {
        type: "shield",
        max: 1,
      },
      {
        type: "life",
        max: 3,
      },
    ],
    effects: [
      {
        token: "life",
        set: 1,
      },
      {
        card: "gift",
        set: 2,
      },
    ],
  },
  {
    extension: 1,
    type: "family",
    color: "red",
    id: "black",
    name: "Black",
    description: "A notorious family surviving through cunning and crime",
    heirPriority: 8,
    tokens: [
      {
        type: "crime",
        value: 1,
      },
      {
        type: "life",
        value: 1,
      },
    ],
    slots: [
      {
        type: "shield",
        max: 1,
      },
      {
        type: "life",
        max: 3,
      },
    ],
    effects: [
      {
        card: "gift",
        set: 1,
      },
      {
        token: "crime",
        set: 1,
      },
    ],
  },
  {
    extension: 2,
    type: "family",
    color: "red",
    id: "adamantin",
    name: "Adamantin",
    description:
      "Ancient family whose blood grants them supernatural resilience",
    heirPriority: 9,
    tokens: [
      {
        type: "immune",
        value: 1,
      },
    ],
    slots: [
      {
        type: "shield",
        max: 1,
      },
    ],
    effects: [
      {
        token: "gold",
        set: 2,
      },
    ],
  },
];
