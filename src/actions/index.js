import{
  MOVE,
  ATTACK,
  KILL,
  GAMEOVER,
  RESET_PLAYER,
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

export {
  createMove,
  createAttack,
  createKill,
  createGameOver,
  createResetPlayer,
};