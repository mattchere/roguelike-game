import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';
import Game from '../containers/Game';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe('Jest', ()=> {
  it('should pass a simple expect', () => {
    expect(true).toBeTruthy;
  });
});

// describe('GAME COMPONENT METHODS', () => {
//   describe('canMove', () => {
//     it('should return false if moving off the screen', () => {
//       const canMove = Game.canMove;
//       expect(canMove([0, -1])).toBeFalsy;
//       expect(canMove([-1, 0])).toBeFalsy;
//       expect(canMove([0, 30])).toBeFalsy;
//       expect(canMove([20, 0])).toBeFalsy;
//     });
//   });
// });
