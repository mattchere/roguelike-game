import {
  checkLoc,
  compLoc,
  getLocationsFrom,
  generateRandomLocations,
} from '../game_logic/utils';

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

describe('UTILITY FUNCTIONS', () => {
  describe('compLoc', () => {
    it('should be true if locations are the same', () => {
      expect(compLoc([0,0], [0,0])).toBe(true);
    });
    it('should be false if locations are different', () => {
      expect(compLoc([0,1], [0,0])).toBe(false);
    });
  });

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

  describe('generateRandomLocations', () => {
    it('should return an array of n locations', () => {
      const randLoc = generateRandomLocations(10, player);

      expect(randLoc).toBeInstanceOf(Array);
      expect(randLoc.length).toBe(10);

      randLoc.forEach(loc => {
        expect(loc).toBeInstanceOf(Array);
        expect(loc.length).toBe(2);
      });
    });
  });

});