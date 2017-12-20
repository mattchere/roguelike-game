import {
  movePlayer,
  attack,
  kill,
  levelUp,
} from '../game_logic/entityReducer';

// Define globals
const player = {
  stats: {
    health: 100,
    weapon: 'Fist',
    level: 1,
    xp: 100,
  },
  location: [10, 15],
};

const enemies = [
  {
    id: 0,
    stats: {
      health: 100,
      level: 5,
    },
    location: [1,1],
  },
  {
    id: 1,
    stats: {
      health: 100,
      level: 1,
    },
    location: [1,1],
  },
];

const entities = {
  player: player,
  enemies: enemies.slice(),
};

describe('ENTITY REDUCER FUNCTIONS', () => {

  const enemyOne = enemies[0];
  const enemyTwo = enemies[1];

  describe('movePlayer', () => {
    it('should return the same properties as what it was given', () => {
      expect(Object.keys(movePlayer(entities, [0,1]))).toEqual(Object.keys(entities));
    });
    it('should modify nothing other than the player', () => {
      const received = {
        ...movePlayer(entities, [0,1]),
        player: entities.player,
      };
      expect(received).toEqual(entities);
    });
    it('should modify nothing on the player except for their location', () => {
      const newPlayer = {
        ...entities.player,
        location: [10,15],
      };
      const received = {
        ...movePlayer(entities, [0,1]),
        player: newPlayer,
      };
      expect(received).toEqual(entities);
    });
    it('should movePlayer the player to the given location', () => {
      expect(movePlayer(entities, [0,1]).player.location).toEqual([0,1]);
    });
  });

  describe('attack', () => {
    const damage = (actor) => 10;
    const executedAttack = attack(entities, enemyOne, damage);
    it('should modify only the player\'s health and the given enemy\'s health', () => {
      // Returns both health stats of the player and the given enemy
      // to their default value of 100
      const received = {
        ...executedAttack,
        player: {
          ...executedAttack.player,
          stats: {
            ...executedAttack.player.stats,
            health: 100,
          }
        },
        enemies: [
          ...executedAttack.enemies.slice(0, enemyOne.id),
          Object.assign({}, executedAttack.enemies[enemyOne.id], {
            stats: {
              ...executedAttack.enemies[enemyOne.id].stats,
              health: 100,
            }
          }),
          ...executedAttack.enemies.slice(enemyOne.id+1),
        ]
      };

      expect(received).toEqual(entities);
    });
    it('should reduce health based on the given damage function for both actors', () => {
      const pHealth = executedAttack.player.stats.health;
      const eHealth = executedAttack.enemies[enemyOne.id].stats.health;

      expect(pHealth).toBe(90);
      expect(eHealth).toBe(90);
    });
  });

  describe('kill', () => {
    it('should kill the given enemy', () => {
      const expected = [
        ...enemies.slice(1),
      ]
      expect(kill(entities, enemies[0]).enemies).toEqual(expected);
    });
    it('should grant XP to the player', () => {
      expect(
        kill(entities, enemies[0]).player.stats.xp
      ).toBe(entities.player.stats.xp + 25);
    });
  });

  describe('levelUp', () => {
    const levelled = levelUp(entities);
    it('should not modify anything but player level and xp', () => {
      const received = {
        ...levelled,
        player: {
          ...levelled.player,
          stats: {
            ...levelled.player.stats,
            xp: 100,
            level: 1,
          }
        }
      };

      expect(received).toEqual(entities);
    });
    it('should reset xp to 0', () => {
      expect(levelled.player.stats.xp).toBe(0);
    });
    it('should add one to the level', () => {
      expect(levelled.player.stats.level).toBe(2);
    });
  })
});