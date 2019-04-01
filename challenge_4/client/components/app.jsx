import React from 'react';
import ReactDOM from 'react-dom';

import Difficulty from './difficulty';

const COVERED = 0, UNCOVERED = 1, FLAGGED = 2, MINE = 3;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    let defaultDiff = Difficulty.getDefaultDifficulty();
    this.gameState = new Array(defaultDiff.width);
    for (let i = 0; i < defaultDiff.width; i++) {
      this.gameState[i] = new Array(defaultDiff.length).fill(COVERED);
    }

    this.state = {
      flags: defaultDiff.flags,
      width: defaultDiff.width,
      height: defaultDiff.height,
      gameState: this.gameState
    };

    this.onCellClick = this.onCellClick.bind(this);
  }

  static getStyles(cell) {
    switch(cell) {
      case UNCOVERED:
        return "cell uncovered";

      case FLAGGED:
        return "cell flag";

      case MINE:
        return "cell mine";

      default:
        return "cell covered";
    }
  }

  onCellClick(r, c, event) {
    this.gameState[r][c] = UNCOVERED;
    this.setState({
      gameState: this.gameState
    });
  }

  render() {
    const { flags, gameState } = this.state;

    return (
      <div>
        <span id="flags">{flags}</span>

        <div id="colGrid">
          {
            gameState.map((arr, r) => (
              <div className="rowGrid">
                {
                  arr.map((cell, c) => {
                    let classes = App.getStyles(cell);
                    return (
                      <div className={classes} onClick={this.onCellClick.bind(this, r, c)}></div>
                    );
                  })
                }
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}
