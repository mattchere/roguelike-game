import {
  executeAttack,
  getDamage,
} from './attack';
import {
  moveActor,   
} from './move';
import {
  removeEntity
} from './entityManager';
import { heal } from './heal';
import { pickupWeapon } from './weapons';

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
    case 'REMOVE_ENTITY':
      return removeEntity(entities, action.payload.entity);
    case 'HEAL':
      return executeHeal(entities, action.payload.healAmount);
    case 'PICKUP':
      return executePickup(entities, action.payload.name);
    case 'LEVEL_UP':
      return levelUp(entities);
    case 'SPAWN_BOSS':
      return spawnBoss(entities);
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

const kill = (entities, entity) => ({
  ...removeEntity(entities, entity),
  player: {
    ...entities.player,
    stats: {
      ...entities.player.stats,
      xp: entities.player.stats.xp + 25,
    },
  },
});

const resetPlayer = entities => ({
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

const executeHeal = (entities, healAmount) => ({
  ...entities,
  player: heal(entities.player, healAmount),
});

const executePickup = (entities, wepName) => ({
  ...entities,
  player: pickupWeapon(entities.player, wepName),
});

const levelUp = (entities) => ({
  ...entities,
  player: {
    ...entities.player,
    stats: {
      ...entities.player.stats,
      xp: 0,
      level: entities.player.stats.level + 1,
    }
  }
});

const spawnBoss = entities => ({
  ...entities,
  boss: {
    ...entities.boss,
    spawned: true,
  }
});

export {
  entityReducer,
  movePlayer,
  attack,
  kill,
  levelUp,
};