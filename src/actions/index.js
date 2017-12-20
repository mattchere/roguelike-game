import{
  MOVE,
  ATTACK,
  KILL,
  GAMEOVER,
  RESET_PLAYER,
  HEAL,
  REMOVE_ENTITY,
  PICKUP,
  LEVEL_UP
} from '../actionTypes';

const createMove = (newPos) => ({
  type: MOVE,
  payload: {
    newPos: newPos,
  },
});

const createAttack = (enemy) => ({
  type: ATTACK,
  payload: {
    enemy: enemy,
  }
});

const createKill = (enemy) => ({
  type: KILL,
  payload: {
    enemy: enemy,
  }
});

const createGameOver = () => ({
  type: GAMEOVER,
});

const createResetPlayer = () => ({
  type: RESET_PLAYER,
});

const createHeal = healAmount => ({
  type: HEAL,
  payload: {
    healAmount: healAmount,
  }
});

const createRemoveEntity = entity => ({
  type: REMOVE_ENTITY,
  payload: {
    entity,
  }
});

const createPickup = name => ({
  type: PICKUP,
  payload: {
    name,
  }
});

const createLevelUp = () => ({
  type: LEVEL_UP,
});

export {
  createMove,
  createAttack,
  createKill,
  createGameOver,
  createResetPlayer,
  createHeal,
  createRemoveEntity,
  createPickup,
  createLevelUp,
};