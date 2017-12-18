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
    healAmount: 50,
    location: [0,1],
  },
]

describe('HEALTH ITEM FUNCTIONS', () => {
  describe('heal', () => {
    it('should return a player object');
    it('should not modify anything other than health');
    it('should heal the player by the right amount');
  });
});