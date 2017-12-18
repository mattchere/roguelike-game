import {
  compLoc,
} from './utils';

const checkLocForEntities = (entities, loc) => (
  entities.enemies.reduce((acc, e) => (
    compLoc(e.location, loc) ? e : acc
  ), false)
)

const removeEnemy = (entities, enemyID) => {
  if (typeof enemyID !== 'number') {
    throw new Error('Must provide a valid number for the enemyID');
  }

  const exists = entities.enemies.reduce((acc, e) => (
    e.id === enemyID || acc
  ), false);

  if (!exists) {
    throw new Error('Enemy ID does not exist');
  }

  return {
    ...entities,
    enemies: [
      ...entities.enemies.slice(0, enemyID),
      ...entities.enemies.slice(enemyID+1)
    ]
  }
};

const checkDead = (entities) => (
  entities.enemies.reduce((acc, e) => (
    e.stats.health > 0 ? acc : acc.concat([e])
  ), [])
);

const gameOver = (entities) => entities.player.stats.health <= 0;

export {
  checkLocForEntities,
  removeEnemy,
  checkDead,
  gameOver,
};