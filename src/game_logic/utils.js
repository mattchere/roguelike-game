const compLoc = (loc1, loc2) => (
  loc1[0] === loc2[0] && loc1[1] === loc2[1]
);

// A function that returns a random location that isn't in the given array
const randLocationExcluding = (otherLocations) => {

  // A function that returns a random location
  const randLocation = (height, width) => (
    [randInt(0, height), randInt(0, width)]
  );

  let location;
  do {
    location = randLocation(20, 30);
  }
  while (!checkLoc(location, otherLocations));

  return location;
};


// A function that checks the random location against an array of other locations
const checkLoc = (location, otherLocations) => (
  otherLocations
    .filter(loc => compLoc(location, loc))
    .length === 0
);

// A function that translates an entities array into an array of locations
const getLocationsFrom = (entities) => (
  entities.map(e => e.location)
);

const randInt = (min, max) => Math.floor(Math.random()*(max-min)) + min;

const generateRandomLocations = (n, player) => {
  let locations = [];
  for (let i=0; i<n; i++) {
    let loc = randLocationExcluding(player.location);
    locations.push(loc);
  }
  return locations;
};

export {
  randLocationExcluding,
  compLoc,
  checkLoc,
  getLocationsFrom,
  generateRandomLocations,
};