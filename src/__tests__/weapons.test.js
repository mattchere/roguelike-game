import {
  pickupWeapon,
} from '../game_logic/weapons';

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

const weapon = {
  id: 0,
  name: 'Knife',
  location: [0,0],
}

describe('WEAPON FUNCTIONS', () => {
  describe('pickupWeapon', () => {
    const newPlayer = pickupWeapon(player, weapon.name);
    it('should return a player object', () => {
      expect(Object.keys(newPlayer)).toEqual(Object.keys(player));
      expect(Object.keys(newPlayer.stats)).toEqual(Object.keys(player.stats));
    });
    it('should not modify anything except the player weapon', () => {
      const received = {
        ...newPlayer,
        stats: {
          ...newPlayer.stats,
          weapon: 'Fist',
        }
      };
      
      expect(received).toEqual(player);
    });
    it('should change the player weapon to the given name', () => {
      expect(newPlayer.stats.weapon).toEqual('Knife');
    });
  });
});