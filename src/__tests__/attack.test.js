import {
  getWeaponAttack,
  getAttackRange,
  takeDamage,
  executeAttack,
} from '../game_logic/attack';

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

describe('ATTACK FUNCTIONS', () => {

  const enemy = Object.assign({}, enemies[0], );

  describe('getWeaponAttack', () => {
    const weapons = ['Fist', 'Knife', 'Dagger', 'Short sword', 'Long sword'];
    const wepAttacks = {
      Fist: 20,
      Knife: 40,
      Dagger: 60,
      'Short sword': 80,
      'Long sword': 100,
    };
    it('should return a number', () => {
      expect(getWeaponAttack(weapons[0])).toEqual(expect.any(Number));
    });
    it('should return the correct attack for that weapon', () => {
      weapons.forEach(wep => {
        expect(getWeaponAttack(wep)).toBe(wepAttacks[wep]);
      });
    });
  });

  describe('getAttackRange', () => {

    const pAttack = getAttackRange(player);    
    const playerAverage = (pAttack.min + pAttack.max) / 2;    

    const eAttack = getAttackRange(enemy);
    const enemyAverage = (eAttack.min + eAttack.max) / 2;

    it('should return an object with min and max props', () => {
      expect(Object.keys(getAttackRange(player))).toEqual(['min', 'max']);
    });
    it('should have numbers as min and max', () => {
      expect(pAttack.min).toEqual(expect.any(Number));
      expect(pAttack.max).toEqual(expect.any(Number));
      expect(eAttack.min).toEqual(expect.any(Number));
      expect(eAttack.max).toEqual(expect.any(Number));
    });
    it('should calculate the correct average', () => {
      expect(playerAverage).toBe(20);
      expect(enemyAverage).toBe(50);
    });    
    it('should have a range of 20% from the average', () => {
      expect(pAttack.min / playerAverage).toBeCloseTo(0.8, 1);
    });
  });

  describe('takeDamage', () => {
    it('should return an object with the same properties', () => {
      expect(Object.keys(takeDamage(player, 10))).toEqual(Object.keys(player));
    });
    it('should reduce health by the damaged amount', () => {
      expect(takeDamage(player, 10).stats.health).toBe(90);
      expect(takeDamage(enemy, 10).stats.health).toBe(90);
    });
  });

  describe('executeAttack', () => {

    const damageStub = (actor) => 10;
    const executed = executeAttack(player, enemy, damageStub);    

    it('should return an array', () => {
      expect(executed).toEqual(expect.any(Array));
    });
    it('should return objects with the same properties as those given', () => {
      const expectedArray = [Object.keys(player), Object.keys(enemy)];
      const receivedArray = executed.map(a => Object.keys(a));
      expect(receivedArray).toEqual(expectedArray);
    });
    it('should change no other property except health', () => {
      const recPlayer = Object.assign({}, executed[0], {
        stats: {
          ...executed[0].stats,
          health: 100,
        }
      });
      const recEnemy = Object.assign({}, executed[1], {
        stats: {
          ...executed[1].stats,
          health: 100,
        }
      });
      
      expect(recPlayer).toEqual(player);
      expect(recEnemy).toEqual(enemy);
    });
    it('should cause the correct damage on both actors', () => {
      const pHealth = executed[0].stats.health;
      const eHealth = executed[1].stats.health;

      expect(pHealth).toBe(90);
      expect(eHealth).toBe(90);
    });
  });
});