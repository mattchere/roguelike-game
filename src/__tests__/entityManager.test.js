import {
  checkLocForEntities,
  removeEnemy,
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

const entities = {
  player: player,
  enemies: enemies.slice(),
};


describe('ENTITY MANAGER FUNCTIONS', () => {
  describe('checkLocForEntities', () => {
    it('should return false if no entities are on that position', () => {
      expect(checkLocForEntities(entities, [0,0])).toBeFalsy();
    });
    it('should return the correct entity if it exists', () => {
      expect(checkLocForEntities(entities, [1,1])).toEqual(enemies[0]);
      expect(checkLocForEntities(entities, [1,2])).toEqual(enemies[1]);
    });
  });

  describe('removeEnemy', () => {
    it('should throw an error if a number is not given', () => {
      expect(() => removeEnemy(entities, '')).toThrow('Must provide a valid number for the enemyID');
    });
    it('should throw an error if the enemyID does not exist', () => {
      expect(() => removeEnemy(entities, 50)).toThrow('Enemy ID does not exist');
    });
    it('should return the new entities object without that enemy', () => {
      const newEnemies = removeEnemy(entities, 0).enemies;
      expect(newEnemies.length).toBe(entities.enemies.length-1);
      for (let i=0; i<newEnemies.length; i++) {
        expect(newEnemies[i].id).not.toBe(0);
      }
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