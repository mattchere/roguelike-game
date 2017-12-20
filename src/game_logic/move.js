import { validLocation } from './utils';

// Movement related actions

const moveActor = (actor, newPos) => ({
  ...actor,
  location: newPos
});

const canMove = (entities, newPos) => {
  if (validLocation(newPos)) {

    return entities.enemies.reduce((acc, e) => 
      acc && (newPos[0] !== e.location[0] || newPos[1] !== e.location[1])
    , true);

  }
  return false;
};

const getNewPos = (actor, direction) => {
  if (typeof direction !== 'string') {
    throw new Error('Direction must be a string');
  }
  else if (
    direction !== 'LEFT' && 
    direction !== 'UP'&&
    direction !== 'RIGHT' &&
    direction !== 'DOWN'
  ) {
    throw new Error('Cannot process invalid direction')
  }

  const loc = actor.location;
  switch(direction) {
    case 'LEFT':
      return [loc[0], loc[1]-1];
    case 'UP':
      return [loc[0]-1, loc[1]];
    case 'RIGHT':
      return [loc[0], loc[1]+1];
    case 'DOWN':
      return [loc[0]+1, loc[1]];
    default:
      break;
  }
  return loc;
};

export {
  moveActor,
  canMove,
  getNewPos,
};