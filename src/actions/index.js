import{
  MOVE,
  ATTACK,
  KILL,
  GAMEOVER,
  RESET_PLAYER,
  HEAL,
  REMOVE_ENTITY,
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

const createHeal = (healAmount) => ({
  type: HEAL,
  payload: {
    healAmount: healAmount,
  }
});

const createRemoveEntity = (entity) => ({
  type: REMOVE_ENTITY,
  payload: {
    entity,
  }
});

export {
  createMove,
  createAttack,
  createKill,
  createGameOver,
  createResetPlayer,
  createHeal,
  createRemoveEntity,
};