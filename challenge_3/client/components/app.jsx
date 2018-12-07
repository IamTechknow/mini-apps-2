import React from 'react';
import ReactDOM from 'react-dom';

import BowlingGame from './bowling';

const NUM_PINS = 10;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    this.game = new BowlingGame();
    this.onBtnClick = this.onBtnClick.bind(this);
  }

  componentDidMount() {
    
  }

  onBtnClick(event) {
    this.game.rollBall(Number.parseInt(event.target.innerText, 10));
  }

  render() {
    const { name } = this.state;
    const btnState = new Array(10);

    for(let i = 0; i < 10; i++) {
      btnState[i] = this.game.pinsUp > i;
    }

    if(!name) {
      return (
        <div>
          <label htmlFor="name">
            Enter your name:
            <input type="text" id="name" onChange={ (event) => { this.name = event.target.value; } } />
          </label>
          <button type="button" onClick={ () => { this.setState({ name: this.name }); } }>Play!</button>
        </div>
      );
    }

    return (
      <div id="gameGrid">
        <div id="controls">
          <p>Score: {this.game.score}</p>
          <p>Frame {this.game.frame}</p>
          <p>Roll {this.game.roll}</p>

          {
            btnState.map((state, i) => (
              <button type="button" disabled={!state} onClick={this.onBtnClick}>{i + 1}</button>
            ))
          }
        </div>

        <div id="visualizer">
        {
          this.game.visualizePins().map(arr => (
            <div className="pinRow">
              {
                arr.map(ele => (
                  <span>{ele}</span>
                ))
              }
            </div>
          ))
        }
        </div>
      </div>
    );
  }
}
