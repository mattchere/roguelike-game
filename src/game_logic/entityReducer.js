import {
  executeAttack,
  getDamage,
} from './attack';
import {
  moveActor,   
} from './move';
import {
  removeEnemy
} from './entityManager';

const entityReducer = (entities, action) => {
  switch(action.type) {
    case 'MOVE':
      return movePlayer(entities, action.payload.newPos);
    case 'ATTACK':
      return attack(entities, action.payload.enemy, getDamage);
    case 'KILL':
      return kill(entities, action.payload.enemy);
    case 'RESET_PLAYER':
      return resetPlayer(entities);
    case 'PICKUP':
      break;
    default:
      break;
  }

  return entities;
}

const movePlayer = (entities, pos) => {
  return {
    ...entities,
    player: moveActor(entities.player, pos)
  };
};

const attack = (entities, enemy, getDamage) => {
  const afterAttackActors = executeAttack(entities.player, enemy, getDamage);
  const player = afterAttackActors[0];
  const damagedEnemy = afterAttackActors[1];
  return {
    ...entities,
    player: player,
    enemies: [
      ...entities.enemies.slice(0, damagedEnemy.id),
      damagedEnemy,
      ...entities.enemies.slice(damagedEnemy.id+1)
    ]
  };
}

const kill = (entities, enemy) => ({
  ...removeEnemy(entities, enemy.id),
  player: {
    ...entities.player,
    stats: {
      ...entities.player.stats,
      xp: entities.player.stats.xp + 25,
    },
  },
});

const resetPlayer = (entities) => ({
  ...entities,
  player: {
    stats: {
      health: 100,
      level: 1,
      xp: 0,
      weapon: 'Fist',
    },
    location: [10,15],
  }
});

export {
  entityReducer,
  movePlayer,
  attack,
  kill,
};