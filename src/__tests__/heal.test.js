import { heal } from '../game_logic/heal';

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

describe('HEALTH ITEM FUNCTIONS', () => {
  const healOne = heal(player, healthItems[0].healAmount);
  const healTwo = heal(player, healthItems[1].healAmount);

  describe('heal', () => {
    it('should return a player object', () => {
      expect(Object.keys(healOne)).toEqual(Object.keys(player));
      expect(Object.keys(healOne.stats)).toEqual(Object.keys(player.stats));
    });
    it('should not modify anything other than health', () => {
      const samePlayer = {
        ...healOne,
        stats: {
          ...healOne.stats,
          health: 100,
        }
      };

      expect(samePlayer).toEqual(player);
    });
    it('should heal the player by the right amount', () => {
      expect(healOne.stats.health).toBe(150);
      expect(healTwo.stats.health).toBe(125);
    });
  });
});