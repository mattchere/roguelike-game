import {
  checkLocForEntities,
  removeEntity,
  checkDead,
  gameOver,
} from '../game_logic/entityManager';

// Define globals
const player = {
  stats: {
    health: 100,
    weapon: 'Fist',
    level: 1,
    xp: 0,
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
    location: [1,2],
  },
];

const healthItems = [
  {
    id: 0,
    healAmount: 50,
    location: [0,0],
  },
  {
    id: 1,
    healAmount: 25,
    location: [0,1],
  },
];

const weapons = [
  {
    id: 0,
    name: 'Knife',
    location: [2,2],
  },
  {
    id: 1,
    name: 'Dagger',
    location: [2,3],
  },
];

const entities = {
  player: player,
  enemies: enemies.slice(),
  healthItems: healthItems.slice(),
  weapons: weapons.slice(),
};


describe('ENTITY MANAGER FUNCTIONS', () => {
  describe('checkLocForEntities', () => {
    it('should return false if no entities are on that position', () => {
      expect(checkLocForEntities(entities, [10,10])).toBeFalsy();
    });
    it('should return the correct entity if it exists', () => {
      expect(checkLocForEntities(entities, [1,1])).toEqual(enemies[0]);
      expect(checkLocForEntities(entities, [1,2])).toEqual(enemies[1]);
    });
  });

  describe('removeEntity', () => {
    it('should throw an error if an invalid entity is given', () => {
      expect(() => removeEntity({}, 50)).toThrow('Invalid entity provided');
    });
    it('should return the new entities object without that entity', () => {
      const removedEnemy = removeEntity(entities, enemies[0]).enemies;
      const removedHealthItem = removeEntity(entities, healthItems[0]).healthItems;
      const removedWeapon = removeEntity(entities, weapons[0]).weapons;

      expect(removedEnemy.length).toBe(entities.enemies.length-1);
      expect(removedHealthItem.length).toBe(entities.healthItems.length-1);
      expect(removedWeapon.length).toBe(entities.weapons.length-1);

      removedEnemy.forEach(e => {
        expect(e.id).not.toBe(enemies[0].id);
      });

      removedHealthItem.forEach(e => {
        expect(e.id).not.toBe(healthItems[0].id);
      });

      removedWeapon.forEach(e => {
        expect(e.id).not.toBe(weapons[0].id);
      });
    });
  });

  describe('checkDead', () => {
    const deadEnemyOne = {
      id: 2,
      stats: {
        health: -5, 
        level: 2,
      }, 
      location: [10, 10],
    };
    
    const deadEnemyTwo = {
      id: 3,
      stats: {
        health: -5, 
        level: 2,
      }, 
      location: [10, 11],
    };

    const newEntities = {
      player: player,
      enemies: [
        ...entities.enemies,
        deadEnemyOne,
        deadEnemyTwo,
      ],
    }

    it('should return an empty array if all actors are living', () => {
      expect(checkDead(entities).length).toBe(0);
    });
    it('should return any dead actor(s)', () => {
      expect(checkDead(newEntities).length).toBe(2);
      expect(checkDead(newEntities)).toEqual([deadEnemyOne, deadEnemyTwo]);
    });
  });

  describe('gameOver', () => {
    it('should return false if player is alive', () => {
      expect(gameOver(entities)).toBeFalsy();
    });
    it('should return true if player is dead', () => {
      const deadPlayerEntities = {
        ...entities,
        player: {
          ...entities.player,
          stats: {
            ...entities.player.stats,
            health: 0,
          },
        },
      }
      expect(gameOver(deadPlayerEntities)).toBeTruthy();
    });
  });
});