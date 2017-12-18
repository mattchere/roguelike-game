const gameOverReducer = (gameOver, action) => {
  switch(action.type) {
    case 'GAMEOVER':
      return true;
    default:
      break;
  }
  return gameOver;
}

export {
  gameOverReducer
};