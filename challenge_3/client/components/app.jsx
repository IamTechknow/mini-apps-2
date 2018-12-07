import React from 'react';
import ReactDOM from 'react-dom';

import BowlingGame from './bowling';

const NUM_PINS = 10;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pins: []
    };

    this.game = new BowlingGame();
    this.onBtnClick = this.onBtnClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      score: this.game.score,
      frame: this.game.frame,
      roll: this.game.roll,
      pins: this.game.visualizePins()
    });
  }

  onBtnClick(event) {
    this.game.rollBall(Number.parseInt(event.target.innerText, 10));
    this.setState({
      score: this.game.score,
      frame: this.game.frame,
      roll: this.game.roll,
      pins: this.game.visualizePins()
    });
  }

  render() {
    const { name, pins, score, frame, roll } = this.state;
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
    } else if(this.game.isGameDone()) {
      return (
        <div>
          <p>Game over!</p>
          <p>{`Your score is ${score}`}</p>
          <button type="button" onClick={() => { this.game.reset(); this.componentDidMount(); }}>Play Again!</button>
        </div>
      );
    }

    return (
      <div id="gameGrid">
        <div id="controls">
          <p>Score: {score}</p>
          <p>Frame {frame}</p>
          <p>Roll {roll}</p>

          {
            btnState.map((state, i) => (
              <button type="button" disabled={!state} onClick={this.onBtnClick}>{i + 1}</button>
            ))
          }
        </div>

        <div id="visualizer">
        {
          pins.map(arr => (
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
