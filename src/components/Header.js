import React from 'react';
import PropTypes from 'prop-types';

const Header = props => (
  <header className="header">
    <h1>{props.title}</h1>
  </header>
)

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Header;