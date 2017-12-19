const createEnemy = (id, location) => ({
  id: id,
  stats: {
    health: 100,
    level: 1,
  },
  location: location.slice(),
});

const createHealthItem = (id, location) => ({
  id: id,
  healAmount: 50,
  location: location.slice(),
});

const createWeaponsArray = () => {
  const wepAttacks = {
    Fist: 20,
    Knife: 40,
    Dagger: 60,
    'Short sword': 80,
    'Long sword': 100,
  };

  const weapons = [
    'Fist',
    'Knife',
    'Dagger',
    'Short sword',
    'Long sword'
  ];
  return weapons.map(w => weaponCreator(wepAttacks[w]));
};

const weaponCreator = attack => (id, location) => ({
  id,
  attack,
  location: location.slice(),
});

export {
  createEnemy,
  createHealthItem,
  createWeaponsArray,
};