const characterCards = [
  {
    extension: 0,
    type: "character",
    color: "yellow",
    id: "king",
    name: "King",
    description: "A powerful but paranoid ruler who lives in constant fear",
    tokens: [
      {
        type: "prestige",
        value: 2,
      },
      {
        type: "shield",
        value: 1,
      },
      {
        type: "immune",
        value: 1,
      },
    ],
    slots: [
      {
        type: "prestige",
        max: 3,
      },
    ],
    effects: [
      {
        power: "regicide",
      },
    ],
    costs: [
      {
        card: "prophecy",
        value: 2,
      },
    ],
  },
  {
    extension: 1,
    type: "character",
    color: "purple",
    id: "princess",
    name: "Princess",
    description: "The princess is the eldest daughter of the royal family",
    heirPriority: 0,
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
        type: "favor",
        max: 1,
      },
    ],
    effects: [
      {
        power: "regicide",
      },
    ],
    costs: [
      {
        token: "gold",
        value: 7,
      },
    ],
  },
  {
    extension: 0,
    type: "character",
    color: "purple",
    id: "guard",
    name: "Guard",
    description: "The elite royal guards who loyally protect the royal family",
    tokens: [
      {
        type: "shield",
        value: 1,
      },
      {
        type: "life",
        value: 1,
      },
    ],
    effects: [
      {
        power: "attack",
      },
    ],
    costs: [
      {
        token: "favor",
        value: 1,
      },
    ],
  },
  {
    extension: 0,
    type: "character",
    color: "purple",
    id: "priest",
    name: "Priest",
    description: "A holy person who faithfully serves the kingdom",
    tokens: [
      {
        type: "immune",
        value: 1,
      },
    ],
    effects: [
      {
        power: "shame",
      },
    ],
    costs: [
      {
        token: "gold",
        value: 5,
      },
    ],
  },
  {
    extension: 0,
    type: "character",
    color: "purple",
    id: "broker",
    name: "Broker",
    description: "A shrewd negotiator who can arrange favorable deals",
    tokens: [
      {
        type: "life",
        value: 1,
      },
    ],
    effects: [
      {
        power: "gift-choice",
      },
    ],
    costs: [
      {
        token: "gold",
        value: 3,
      },
    ],
  },
  {
    extension: 0,
    type: "character",
    color: "purple",
    id: "knight",
    name: "Knight",
    description: "A noble and valiant warrior sworn to protect the realm",
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
    ],
    effects: [
      {
        power: "regicide",
      },
    ],
    costs: [
      {
        token: "prestige",
        value: 3,
      },
    ],
  },
  {
    extension: 0,
    type: "character",
    color: "purple",
    id: "prince",
    name: "Prince",
    description: "A newborn royal heir, first in line to the throne",
    heirPriority: -1,
    tokens: [
      {
        type: "favor",
        value: 2,
      },
      {
        type: "life",
        value: 1,
      },
    ],
    slots: [
      {
        type: "favor",
        max: 1,
      },
      {
        type: "life",
        max: 1,
      },
    ],
    effects: [
      {
        card: "gift",
        add: 1,
      },
    ],
    costs: [
      {
        token: "gold",
        value: 2,
      },
    ],
  },
  {
    extension: 0,
    type: "character",
    color: "purple",
    id: "baron",
    name: "Baron",
    description: "A cunning noble who dabbles in deadly poisons",
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
    ],
    effects: [
      {
        power: "poison",
      },
    ],
    costs: [
      {
        token: "gold",
        value: 3,
      },
    ],
  },
  {
    extension: 0,
    type: "character",
    color: "purple",
    id: "healer",
    name: "Healer",
    description: "A skilled medic who tenderly tends to the wounded",
    tokens: [
      {
        type: "immune",
        value: 1,
      },
    ],
    effects: [
      {
        token: "life",
        add: 1,
      },
    ],
    costs: [
      {
        token: "gold",
        value: 2,
      },
    ],
  },
  {
    extension: 1,
    type: "character",
    color: "purple",
    id: "justiciar",
    name: "Justiciar",
    description: "A stern enforcer of the law who roots out corruption",
    tokens: [
      {
        type: "life",
        value: 1,
      },
    ],
    slots: [
      {
        type: "life",
        max: 1,
      },
    ],
    effects: [
      {
        power: "denounce",
      },
    ],
    costs: [
      {
        token: "gold",
        value: 3,
      },
    ],
  },
  {
    extension: 1,
    type: "character",
    color: "purple",
    id: "thief",
    name: "Thief",
    description:
      "A stealthy rogue who cleverly pilfers from the wealthy nobles",
    tokens: [
      {
        type: "life",
        value: 1,
      },
    ],
    effects: [
      {
        power: "steal",
      },
    ],
    costs: [
      {
        token: "favor",
        value: 1,
      },
    ],
  },
  {
    extension: 1,
    type: "character",
    color: "purple",
    id: "oracle",
    name: "Oracle",
    description: "A mystical seer who glimpses the uncertain future ahead",
    tokens: [
      {
        type: "life",
        value: 1,
      },
    ],
    effects: [
      {
        power: "vision",
      },
    ],
    costs: [
      {
        token: "gold",
        value: 2,
      },
    ],
  },
  {
    extension: 1,
    type: "character",
    color: "purple",
    id: "merchant",
    name: "Merchant",
    description:
      "A wealthy trader who skillfully deals in valuable exotic goods",
    tokens: [
      {
        type: "life",
        value: 1,
      },
    ],
    effects: [
      {
        token: "prestige",
        add: 1,
      },
    ],
    costs: [
      {
        card: "gift",
        value: 2,
      },
    ],
  },
  {
    extension: 2,
    type: "character",
    color: "purple",
    id: "collector",
    name: "Collector",
    description: "A wealthy patron who amasses rare and valuable treasures",
    tokens: [
      {
        type: "life",
        value: 1,
      },
    ],
    effects: [
      {
        token: "favor",
        add: 1,
      },
    ],
    costs: [
      {
        card: "gift",
        value: 3,
      },
    ],
  },
  {
    extension: 2,
    type: "character",
    color: "purple",
    id: "blacksmith",
    name: "Blacksmith",
    description:
      "A skilled craftsman who forges shields and believes in prophecies",
    tokens: [
      {
        type: "life",
        value: 1,
      },
    ],
    effects: [
      {
        token: "shield",
        add: 1,
      },
    ],
    costs: [
      {
        card: "prophecy",
        value: 1,
      },
    ],
  },
  {
    extension: 2,
    type: "character",
    color: "purple",
    id: "devil",
    name: "Devil",
    description: "A sinister being who trades life force for riches",
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
    ],
    effects: [
      {
        token: "gold",
        add: 7,
      },
    ],
    costs: [
      {
        token: "life",
        value: 2,
      },
    ],
  },
  {
    extension: 2,
    type: "character",
    color: "purple",
    id: "prisoner",
    name: "Prisoner",
    description: "The king's sworn enemy, locked away but plotting revenge",
    tokens: [
      {
        type: "life",
        value: 1,
      },
    ],
    effects: [
      {
        token: "crime",
        add: 3,
      },
    ],
    costs: [
      {
        card: "key",
        value: 1,
      },
    ],
  },
];
