import React from 'react';
import PropTypes from 'prop-types';

const Stat = props => (
  <li className="stat">{props.title}: {props.value}</li>
)

Stat.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
}

export default Stat;