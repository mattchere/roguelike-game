import React, { Component } from 'react';
import Header from './Header';
import Game from '../containers/Game';

class App extends Component {
  render() {
    return (
      <div className="main-container">
        <Header title="Game" />
        <Game />
      </div>
    );
  }
}

export default App;
