import { 
  checkLoc,
  getLocationsFrom,
  generateEnemies 
} from '../game_logic/enemySpawn';

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
    location: [1,1],
  },
];

describe('ENEMY SPAWNING', () => {

  describe('checkLoc', () => {
    it('should be true if no other locations are given', () => {
      expect(checkLoc([0,0], [])).toBeTruthy();
    });
    it('should be true if given location is not in other locations', () => {
      expect(checkLoc([0,0], [[0,1], [1,0]])).toBeTruthy();
    });
    it('should be false if given location is in other locations', () => {
      expect(checkLoc([0,0], [[0,1], [0,0]])).toBeFalsy();
    });
  });

  describe('getLocationsFrom', () => {
    it('should return the same number of locations as the number of enemies', () => {
      expect(getLocationsFrom(enemies).length).toEqual(enemies.length);
    });
    it('should return the correct locations for each enemy', () => {
      expect(getLocationsFrom(enemies)[0]).toEqual(enemies[0].location);
      expect(getLocationsFrom(enemies)[1]).toEqual(enemies[1].location);
    });
  });

  describe('generateEnemies', () => {
    it('should generate the given number of enemies', () => {
      expect(generateEnemies(5, player).length).toBe(5);
    });
    it('should generate objects that have the same properties as enemies', () => {
      generateEnemies(5, player).forEach(e => {
        expect(Object.keys(e)).toEqual(Object.keys(enemies[0]));
      })
    });
  });
});