import React from 'react';
import PropTypes from 'prop-types';

const Cell = props => {
  const backgrounds = [
    'black',
    'red',
    'grey',
    'green',
    'yellow',
  ]
  const bgStyle = {
    backgroundColor: backgrounds[props.val]
  }
  return (
    <div
      className="cell"
      style={bgStyle}>
    </div>
  )
}

Cell.propTypes = {
  val: PropTypes.number.isRequired,
}

export default Cell;