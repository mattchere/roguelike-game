import React, { Component } from 'react';
import StatsBar from '../components/StatsBar';
import Screen from '../components/Screen';

import {
  createMove,
  createAttack,
  createKill,
  createGameOver,
  createResetPlayer,
  createHeal,
  createRemoveEntity,
  createPickup,
  createLevelUp,
} from '../actions';

import { getAttackRange } from '../game_logic/attack';
import { createEnemy, createHealthItem } from '../game_logic/entityCreators';
import { generateRandomLocations } from '../game_logic/utils';
import { canMove, getNewPos } from '../game_logic/move';
import { 
  checkLocForEntities, 
  checkDead, 
  gameOver, 
  generate,
  generateWeps,
} from '../game_logic/entityManager';
import { entityReducer } from '../game_logic/entityReducer';
import { gameOverReducer } from '../game_logic/gameOverReducer';
import { getVisionArray, inVision } from '../game_logic/vision';


class Game extends Component {

  componentDidMount(nextProps) {
    document.addEventListener('keydown', this.handleKeyDown);
    const locations = generateRandomLocations(12, this.state.entities.player);
    this.setState({
      entities: {
        ...this.state.entities,
        weapons: generateWeps(locations.slice(0, 4)),
        enemies: generate(locations.slice(4, 9), createEnemy),
        healthItems: generate(locations.slice(9), createHealthItem),
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const dead = checkDead(this.state.entities);
    if (gameOver(this.state.entities)) {
      document.removeEventListener('keydown', this.handleKeyDown);
      this.dispatch(createGameOver());
      this.dispatch(createResetPlayer());
    }
    else if (dead.length !== 0) {
      this.dispatch(createKill(dead[0]));
    }
    else if (this.state.entities.player.stats.xp >= 100) {
      this.dispatch(createLevelUp());
    }
  }

  handleKeyDown = (e) => {
    const player = this.state.entities.player;
    const loc = player.location;
    let newPos = loc.slice();

    if (e.keyCode === 37) {
      e.preventDefault();
      newPos = getNewPos(player, 'LEFT');
    }
    else if (e.keyCode === 38) {
      e.preventDefault();
      newPos = getNewPos(player, 'UP');
    }
    else if (e.keyCode === 39) {
      e.preventDefault();
      newPos = getNewPos(player, 'RIGHT');
    }
    else if (e.keyCode === 40) {
      e.preventDefault();
      newPos = getNewPos(player, 'DOWN');
    }
    const entity = checkLocForEntities(this.state.entities, newPos);

    if (!entity && canMove(this.state.entities, newPos)) {
      // Nothing there, so move there
      this.dispatch(createMove(newPos));
    }
    else if (entity.stats) {
      // It's an enemy
      this.dispatch(createAttack(entity));
    }
    else if (entity.healAmount) {
      // It's a health item
      this.dispatch(createRemoveEntity(entity));
      this.dispatch(createMove(newPos));
      this.dispatch(createHeal(entity.healAmount));
    }
    else if (entity.name) {
      // It's a weapon
      this.dispatch(createRemoveEntity(entity));
      this.dispatch(createMove(newPos));
      this.dispatch(createPickup(entity.name));
    }
  }

  dispatch = (action) => {
    console.log(action.type);
    const entities = entityReducer(this.state.entities, action);
    const gameOver = gameOverReducer(this.state.gameOver, action);
    this.setState({
      entities: entities,
      gameOver: gameOver,
    });
  }

  state = {
    entities: {
      player: {
        stats: {
          health: 100,
          level: 1,
          xp: 0,
          weapon: 'Fist',
        },
        location: [10,15],
      },
      enemies: [],
      healthItems: [],
      weapons: [],
    },
    gameOver: false,
  }

  render() {
    const playerLoc = this.state.entities.player.location;
    const playerAttackRange = getAttackRange(this.state.entities.player);
    const playerStats = Object.assign({}, this.state.entities.player.stats, {
      attack: `${playerAttackRange.min}-${playerAttackRange.max}`
    }); 

    const vision = getVisionArray(playerLoc);
    const enemies = this.state.entities.enemies
      .filter(e => inVision(vision, e.location));
    const healthItems = this.state.entities.healthItems
      .filter(e => inVision(vision, e.location));
    const weapons = this.state.entities.weapons
      .filter(e => inVision(vision, e.location));
    return (
      <div>
        <Screen
          vision={vision}
          playerLoc={playerLoc}
          enemies={enemies}
          healthItems={healthItems}
          weapons={weapons}
          gameOver={this.state.gameOver}
        />
        <StatsBar stats={playerStats} />
      </div>
    )
  }
}

export default Game;
