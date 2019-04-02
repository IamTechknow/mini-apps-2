import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { openCell, flagCell, unflagCell, resetGame } from './actions/actions';

// Cell constants
const COVERED = 0, UNCOVERED = 1, FLAGGED = 8, MINE = 3;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.openFunc = this.openFunc.bind(this);
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

  // Use a Higher order function to create callbacks for each cell
  openFunc(r, c) {
    return () => {
      this.props.open(r, c);
    };
  }

  render() {
    const { reset, currDiff, gameStatus, gameBoard } = this.props;

    return (
      <div>
        <span id="status">{gameStatus}</span>

        <div id="colGrid">
          {
            gameBoard.map((arr, r) => (
              <div className="rowGrid">
                {
                  arr.map((cell, c) => (
                    <div className={App.getStyles(cell)} onClick={this.openFunc(r, c)}></div>
                  ))
                }
              </div>
            ))
          }
        </div>

        <button onClick={reset}>New Game</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currDiff: state.currDiff,
    gameBoard: state.gameBoard,
    gameStatus: state.gameStatus
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reset: () => {
      dispatch(resetGame());
    },
    open: (r, c) => {
      dispatch(openCell(r, c));
    },
    flag: (r, c) => {
      dispatch(flagCell(r, c));
    },
    unflag: (r, c) => {
      dispatch(unflagCell(r, c));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
