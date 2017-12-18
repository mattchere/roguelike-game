import React from 'react';
import Stat from './Stat';
import PropTypes from 'prop-types';


const StatsBar = props => {
  const stats = Object.entries(props.stats)
    .map(
      pair => pair[0] === 'xp' ? 
      ['XP', pair[1]] : 
      [pair[0].charAt(0).toUpperCase() + pair[0].slice(1), pair[1]]
    );
  return (
    <ul className="stats-bar">
      {stats.map((stat, index) => 
        <Stat key={index} title={stat[0]} value={stat[1]} />)}
    </ul>
  )
}

StatsBar.propTypes = {
  stats: PropTypes.shape({
    health: PropTypes.number.isRequired,
    weapon: PropTypes.string.isRequired,
    attack: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    xp: PropTypes.number.isRequired,
  }).isRequired,
}

export default StatsBar;