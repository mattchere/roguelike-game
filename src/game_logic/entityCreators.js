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
  const weapons = [
    'Knife',
    'Dagger',
    'Short sword',
    'Long sword'
  ];
  return weapons.map(w => weaponCreator(w));
};

const weaponCreator = name => (id, location) => ({
  id,
  name,
  location: location.slice(),
});

const createBoss = location => ({
  stats: {
    health: 500,
    level: 2,
  },
  spawned: false,
  location,
})

export {
  createEnemy,
  createHealthItem,
  createWeaponsArray,
  createBoss,
};