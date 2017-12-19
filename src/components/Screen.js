import React from 'react';
import Cell from './Cell';
import PropTypes from 'prop-types';

const Screen = props => {
  // Copy the background array
  const background = new Array(20).fill(0).map(() => new Array(30).fill(0));
  let screen = background.map(row => row.slice());
  if (!props.gameOver){
    screen[props.playerLoc[0]][props.playerLoc[1]] = 1;
    props.enemies.forEach(e => {
      const loc = e.location;
      screen[loc[0]][loc[1]] = 2;
    })
    props.healthItems.forEach(item => {
      const loc = item.location;
      screen[loc[0]][loc[1]] = 3
    })
  }
  else {
    screen = new Array(20).fill(0).map(() => new Array(30).fill(0));
  }

  return (
    <div className="screen">
      {screen
        .map((row, index) => (
          <div key={index} className="row">
            {row
              .map((val, i) =>
                <Cell key={i} val={val} />)}
          </div>
      ))}
    </div>
  )
}

Screen.propTypes = {
  playerLoc: PropTypes.arrayOf(PropTypes.number).isRequired,
  enemies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    stats: PropTypes.shape({
      health: PropTypes.number,
      level: PropTypes.level,
    }),
    location: PropTypes.arrayOf(PropTypes.number),
  })).isRequired,
  healthItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    healAmount: PropTypes.number,
    location: PropTypes.arrayOf(PropTypes.number),
  })).isRequired,
  gameOver: PropTypes.bool.isRequired,
}

export default Screen;