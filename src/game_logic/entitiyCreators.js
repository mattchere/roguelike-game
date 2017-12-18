const createEnemy = (id, location) => ({
  id: id,
  stats: {
    health: 100,
    level: 1,
  },
  location: location,
});

const createHealthItem = (id, location) => ({
  id: id,
  healAmount: 50,
  location: location,
});

export {
  createEnemy,
  createHealthItem,
};