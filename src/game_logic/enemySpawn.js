// A function that returns an array of n enemies
const generateEnemies = (n, player) => {
  let enemies = [];
  for (let i=0; i<n; i++) {
    enemies.push({
      id: i,
      stats: {
        health: 100,
        level: 1,
      },
      location: randLocationExcluding([...getLocationsFrom(enemies), player.location]),
    });
  }
  return enemies;
}


// A function that returns a random location that isn't in the given array
const randLocationExcluding = (otherLocations) => {

  // A function that returns a random location
  const randLocation = (height, width) => (
    [Math.floor(Math.random()*height), Math.floor(Math.random()*width)]
  );

  let location;
  do {
    location = randLocation(20, 30);
  }
  while (!checkLoc(location, otherLocations));

  return location;
}

// A function that translates an enemies array into an array of locations
const getLocationsFrom = (enemies) => {
  return enemies.map(e => e.location)
};

// A function that checks the random location against an array of other locations
const checkLoc = (location, otherLocations) => (
  otherLocations
    .filter(loc => loc[0] === location[0] && loc[1] === location[1])
    .length === 0
);

export {
  checkLoc,
  getLocationsFrom,
  generateEnemies,
};