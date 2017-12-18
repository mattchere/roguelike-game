import {
  moveActor,
  canMove,
  getNewPos,
} from '../game_logic/move';

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

const entities = {
  player: player,
  enemies: enemies.slice(),
};

describe('MOVE FUNCTIONS', () => {

  describe('moveActor', () => {
    it('should return an object with the same properties', () => {
      expect(Object.keys(moveActor(player, [1,0]))).toEqual(Object.keys(player));
    });
    it('should move the actor to the new location', () => {
      expect(moveActor(player, [1,0]).location).toEqual([1,0]);
    });
  });

  describe('canMove', () => {
    it('should be false if moving out of bounds', () => {
      expect(canMove(entities, [-1,0])).toBe(false);
      expect(canMove(entities, [0,-1])).toBe(false);
      expect(canMove(entities, [20,0])).toBe(false);
      expect(canMove(entities, [0,30])).toBe(false);
    });
    it('should be false if moving onto an enemy space', () => {
      expect(canMove(entities, [1,1])).toBe(false);
    });
    it('should be true if moving onto an empty space', () => {
      // Check corners
      expect(canMove(entities, [0,0])).toBe(true);
      expect(canMove(entities, [0,29])).toBe(true);
      expect(canMove(entities, [19,29])).toBe(true);
      expect(canMove(entities, [19,0])).toBe(true);

      // Check middle
      expect(canMove(entities, [10, 15])).toBe(true);
    });
  });
  describe('getNewPos', () => {
    it('should return a location array', () => {
      expect(getNewPos(player, 'LEFT')).toBeInstanceOf(Array);
      expect(getNewPos(player, 'LEFT').length).toBe(2);
    });
    it('should return the correct location for each direction', () => {
      expect(getNewPos(player, 'LEFT')).toEqual([10, 14]);
      expect(getNewPos(player, 'UP')).toEqual([9, 15]);
      expect(getNewPos(player, 'RIGHT')).toEqual([10, 16]);
      expect(getNewPos(player, 'DOWN')).toEqual([11, 15]);
    });
    it('should throw an error if invalid direction is given', () => {
      expect(() => getNewPos(player, 'ASDF'))
        .toThrow('Cannot process invalid direction');
      expect(() => getNewPos(player, 1))
        .toThrow('Direction must be a string');
    });
  });
});
