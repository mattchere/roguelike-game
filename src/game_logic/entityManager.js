import {
  compLoc,
} from './utils';
import { createWeaponsArray } from './entityCreators';

const compLocArray = (entArray, loc) => (
  entArray.reduce((acc, e) =>
    compLoc(e.location, loc) ? e : acc, false)
);

const checkLocForEntities = (entities, loc) => (
  compLocArray(entities.enemies, loc) ||
  compLocArray(entities.healthItems, loc) ||
  compLocArray(entities.weapons, loc)
);

const removeEntity = (entities, entity) => {
  if (entity.stats) {
    // Enemy
    const enemies = removeEntityFromArray(entities.enemies, entity);
    return {
      ...entities,
      enemies,
    };
  }
  else if (entity.healAmount) {
    // Health item
    const healthItems = removeEntityFromArray(entities.healthItems, entity);
    return {
      ...entities,
      healthItems,
    };
  }
  else if (entity.name) {
    // It's a weapon item
    const weapons = removeEntityFromArray(entities.weapons, entity);
    return {
      ...entities,
      weapons,
    }
  }
  else {
    throw new Error('Invalid entity provided');
  }
};

const removeEntityFromArray = (array, entity) => (
  array.filter(e => e.id !== entity.id)
);

const checkDead = (entities) => (
  entities.enemies.reduce((acc, e) => (
    e.stats.health > 0 ? acc : acc.concat([e])
  ), [])
);

const gameOver = (entities) => entities.player.stats.health <= 0;

const generate = (locations, entityCreator) => (
  locations.map((loc, index) => entityCreator(index, loc))
);

const generateWeps = (locations) => (
  locations.map((loc, i) => createWeaponsArray()[i](i, loc))
);

export {
  checkLocForEntities,
  removeEntity,
  checkDead,
  gameOver,
  generate,
  generateWeps,
};