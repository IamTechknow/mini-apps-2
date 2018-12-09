import React from 'react';
import ReactDOM from 'react-dom';

const UNCOVERED = 0, CLICKED = 1, FLAGGED = 2;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flags: 10,
      gridLength: 10
    }
    
    this.gameState = new Array(this.state.flags);
    for (let i = 0; i < this.state.flags; i++) {
      this.gameState[i] = new Array(this.state.flags).fill(UNCOVERED);
    }
    
    this.onCellClick = this.onCellClick.bind(this);
  }
  
  onCellClick(r, c, event) {
    
  }
  
  render() {
    return (
      <div>
        <span id="flags">{this.state.flags}</span>
        
        <div id="colGrid">
          {
            this.gameState.map((arr, r) => (
              <div className="rowGrid">
                {
                  arr.map((cell, c) => {
                    let classes = cell === UNCOVERED ? 'cell uncovered' : 'cell';
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
