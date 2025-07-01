/**
 * Brain of the player
 * @param {Player} player - The player to score the postures for
 */
class Brain {
  /**
   * Creates a new Brain instance
   * @param {Game} game - The game instance this Brain belongs to
   * @param {Player} player - The player this Brain belongs to
   */
  constructor(game, player, riskFactor = 2) {
    // Game and player
    this.game = game;
    this.player = player;

    // Risk factor
    this.riskFactor = riskFactor;

    // Memory
    this.memory = [];

    // Evaluations
    this.evals = {
      scores: {},
      scoresMin: {},
      scoresMax: {},
      normalizedScores: {},
      chances: {},
    };
  }

  /**
   * Remembers a posture card
   * @param {Posture} posture - The posture card to remember
   */
  remember(posture) {
    if (
      !this.memory.find(
        (p) => p.id === posture.id && p.variation === posture.variation
      )
    ) {
      this.memory.push(posture);
    }
  }

  /**
   * Scores all postures
   * @returns {Object} The scores of all postures
   */
  scorePostures() {
    // Score each posture
    const scores = {};
    const stdDev = {};
    const normalizedScores = {};
    const chances = {};
    let totalNormalizedScore = 0;

    // Calculate scores and logs
    for (const posture of this.game.board.postures) {
      scores[posture.id] = this.scorePostureId(posture.id).avg;
      stdDev[posture.id] =
        this.scorePostureId(posture.id).max -
        this.scorePostureId(posture.id).min;
      normalizedScores[posture.id] = Math.exp(
        scores[posture.id] * this.riskFactor
      );
      totalNormalizedScore += normalizedScores[posture.id];
    }

    // Calculate chances based on proportional logs
    for (const posture of this.game.board.postures) {
      chances[posture.id] = normalizedScores[posture.id] / totalNormalizedScore;
    }

    // Store the calculations in player memory
    this.evals.scores = scores;
    this.evals.stdDev = stdDev;
    this.evals.normalizedScores = normalizedScores;
    this.evals.chances = chances;
  }

  /**
   * Scores a posture
   * @param {*} postureId - The postureId to score
   * @returns {number} The score of the posture
   */
  scorePostureId(postureId) {
    // Get the posture card
    const postureCard = this.game.board.postures.find(
      (p) => p.id === postureId
    );

    let minScore = Infinity;
    let maxScore = -Infinity;
    let totalScore = 0;
    let countPossibleEffects = postureCard.possibleEffects.length;

    for (let i = 0; i < postureCard.possibleEffects.length; i++) {
      const effectList = postureCard.possibleEffects[i];
      if (
        this.memory.find(
          (p) => p.id === postureCard.id && p.variation === i + 1
        )
      ) {
        countPossibleEffects--;
        continue;
      }
      const score = this.scoreEffectList(effectList);
      minScore = Math.min(minScore, score);
      maxScore = Math.max(maxScore, score);
      totalScore += score;
    }

    let avgScore =
      countPossibleEffects > 0 ? totalScore / countPossibleEffects : 0;

    return {
      min: minScore === Infinity ? avgScore : minScore,
      avg: avgScore,
      max: maxScore === -Infinity ? avgScore : maxScore,
    };
  }

  /**
   * Scores an effect list
   * @param {Array} effectList - The effect list to score
   * @returns {number} The score of the effect list
   */
  scoreEffectList(effectList) {
    let score = 0;
    for (const effect of effectList) {
      score += effect.score(this.player);
    }
    return score;
  }

  /**
   * Scores a cost list
   * @param {Array} costList - The cost list to score
   * @returns {number} The score of the cost list
   */
  scoreCostList(costList) {
    let score = 0;
    for (const cost of costList) {
      score += cost.score(this.player);
    }
    return score;
  }

  /**
   * Checks if the player should use gifts
   */
  mayUseGifts() {
    if (this.player.gifts.countCards() > 0) {
      for (const giftCard of this.player.gifts.cards) {
        if (this.scoreEffectList(giftCard.effects) > 1) {
          this.game.log(
            `${this.player.familyCard.name} uses gift ${giftCard.name}`
          );
          this.player.useGift(giftCard.id);
          break;
        }
      }
    }
    return;
  }

  /**
   * Checks if the player should pay characters
   */
  mayPayCharacter() {
    const characters = [...this.player.game.board.characters];
    characters.sort(() => Math.random() - 0.5);
    for (const character of characters) {
      if (Math.random() <= this.mayPayCharacterId(character.id)) {
        this.game.log(
          `${this.player.familyCard.name} pays character ${character.name}`
        );
        this.player.payCharacter(character.id);
      }
    }
    return;
  }

  /**
   * Checks if the player should pay a character
   * @param {string} characterId - The id of the character to pay
   * @returns {number} The chance of the player paying the character
   */
  mayPayCharacterId(characterId) {
    const character = this.player.game.board.characters.find(
      (c) => c.id === characterId
    );
    if (this.player.canPayCharacter(character.id)) {
      const effectScore = this.scoreEffectList(character.effects);
      const costScore = this.scoreCostList(
        character.costs.filter((c) => c.type !== "card")
      );
      const scoreDiff = effectScore - costScore - 1;
      const chance = Math.min(1, Math.max(0, scoreDiff / 4));
      return chance;
    }
    return 0;
  }

  /**
   * Checks if the player should use power
   */
  mayUsePower() {
    if (this.player.power === null) {
      return;
    }
    let killed = false;
    let stealed = false;
    switch (this.player.power) {
      case "vision":
        let maxScore = 0;
        let bestPosture = null;
        for (const posture of this.player.game.board.postures) {
          const score =
            this.evals.stdDev[posture.id] - this.evals.scores[posture.id];
          if (score > maxScore) {
            maxScore = score;
            bestPosture = posture;
          }
        }
        if (bestPosture && maxScore > 0) {
          this.player.useVision(bestPosture.id);
        }
        return;
      case "poison":
        // Find players that can be killed if poisoned
        killed = false;
        for (const player of this.player.game.players) {
          // Skip if player is already dead or is self
          if (!player.alive || player === this.player) continue;
          // Check if player has only 1 life and can be poisoned
          if (
            player.countTokenAll("life") === 1 &&
            player.countTokenAll("immune") === 0
          ) {
            this.game.log(
              `${this.player.familyCard.name} poisons and kills ${player.familyCard.name}`
            );
            this.player.poison(player.familyCard.id);
            killed = true;
            break;
          }
        }
        // If nobody was killed, target player with least life
        if (!killed) {
          let minLife = Infinity;
          let targetPlayer = null;
          for (const player of this.player.game.players) {
            if (!player.alive || player === this.player) continue;
            const life = player.countToken("life");
            if (life < minLife && player.countTokenAll("immune") === 0) {
              minLife = life;
              targetPlayer = player;
            }
          }
          if (targetPlayer) {
            this.game.log(
              `${this.player.familyCard.name} poisons ${targetPlayer.familyCard.name} who has only ${minLife} life`
            );
            this.player.poison(targetPlayer.familyCard.id);
          }
        }
        return;
      case "attack":
        // Find players that can be killed if attacked
        killed = false;
        for (const player of this.player.game.players) {
          // Skip if player is already dead or is self
          if (!player.alive || player === this.player) continue;
          // Check if player has only 1 life and no shield
          if (
            player.countTokenAll("life") === 1 &&
            player.countTokenAll("shield") === 0
          ) {
            this.game.log(
              `${this.player.familyCard.name} attacks and kills ${player.familyCard.name}`
            );
            this.player.attack(player.familyCard.id);
            killed = true;
            break;
          }
        }
        // If nobody was killed, target player with least life and no shield
        if (!killed) {
          let minLife = Infinity;
          let targetPlayer = null;
          for (const player of this.player.game.players) {
            if (!player.alive || player === this.player) continue;
            const life = player.countToken("life");
            if (life < minLife && player.countTokenAll("shield") === 0) {
              minLife = life;
              targetPlayer = player;
            }
          }
          if (targetPlayer) {
            this.game.log(
              `${this.player.familyCard.name} attacks ${targetPlayer.familyCard.name} who has only ${minLife} life`
            );
            this.player.attack(targetPlayer.familyCard.id);
          }
        }
        return;
      case "shame":
        // Check if player has same prestige as king
        const kingPrestige =
          this.player.game.board.characters[0].countTokenAll("prestige");
        const playerPrestige = this.player.countTokenAll("prestige");

        if (playerPrestige === kingPrestige) {
          this.game.log(`${this.player.familyCard.name} shames the king`);
          this.player.shameCharacter("king");
          return;
        }

        // Find player with most prestige
        let maxPrestige = -1;
        let targetPlayer = null;
        for (const player of this.player.game.players) {
          if (!player.alive || player === this.player) continue;
          const prestige = player.countTokenAll("prestige");
          if (prestige > maxPrestige) {
            maxPrestige = prestige;
            targetPlayer = player;
          }
        }

        if (targetPlayer) {
          this.game.log(
            `${this.player.familyCard.name} shames ${targetPlayer.familyCard.name} who has ${maxPrestige} prestige`
          );
          this.player.shame(targetPlayer.familyCard.id);
        }
        return;
      case "denounce":
        // Check if there is an heir
        const heir = this.player.game.heir;
        if (heir) {
          // If heir is a player
          if (heir.player && heir.player !== this.player) {
            this.game.log(
              `${this.player.familyCard.name} denounces the heir ${heir.player.familyCard.name}`
            );
            this.player.denounce(heir.player.familyCard.id);
          }
          // If heir is a character
          else if (!heir.player) {
            this.game.log(
              `${this.player.familyCard.name} denounces the heir ${heir.name}`
            );
            this.player.denounceCharacter(heir.id);
          }
        }
        return;
      case "steal":
        stealed = false;
        if (this.player.countTokenAll("shield") === 0) {
          // First check for characters with shields
          for (const character of this.player.game.board.characters) {
            if (character.countToken("shield") > 0) {
              this.game.log(
                `${this.player.familyCard.name} steals a shield from ${character.name}`
              );
              this.player.stealCharacterShield(character.id);
              stealed = true;
              break;
            }
          }
          if (!stealed) {
            // Then check for players with shields
            for (const player of this.player.game.players) {
              if (
                player !== this.player &&
                player.familyCard?.countToken("shield") > 0
              ) {
                this.game.log(
                  `${this.player.familyCard.name} steals a shield from ${player.familyCard.name}`
                );
                this.player.stealShield(player.familyCard.id);
                stealed = true;
                break;
              }
            }
          }
        }
        if (!stealed) {
          // Finally look for player with most gifts
          let maxGifts = -1;
          let targetPlayer = null;
          for (const player of this.player.game.players) {
            if (player !== this.player) {
              const giftCount = player.gifts.countCards();
              if (giftCount > maxGifts) {
                maxGifts = giftCount;
                targetPlayer = player;
              }
            }
          }
          if (targetPlayer && maxGifts > 0) {
            this.game.log(
              `${this.player.familyCard.name} steals a gift from ${targetPlayer.familyCard.name}`
            );
            let giftId =
              targetPlayer.gifts.cards[targetPlayer.gifts.cards.length - 1].id;
            this.player.stealGift(targetPlayer.familyCard.id, giftId);
            stealed = true;
          }
        }
        return;
      case "regicide":
        // If player is heir, kill the king
        if (this.game.heir && this.game.heir.player === this.player) {
          this.game.log(`${this.player.familyCard.name} kills the king`);
          this.player.killCharacter("king");
        }
        return;
    }
  }
}
