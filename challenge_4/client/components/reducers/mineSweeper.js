// Single reducer that handles all possible actions to manipulate the game state.
import { OPEN_CELL, FLAG_CELL, UNFLAG_CELL, RESET_GAME } from './actionTypes';
import Difficulty from '../difficulty';

// Board constants
const COVERED = 0, UNCOVERED = 1, FLAGGED = 8, MINE = 3;

// Create initial state
let currDiff = Difficulty.getDefaultDifficulty();

const newBoard = function(currDiff) {
  let gameBoard = new Array(currDiff.width);
  for (let i = 0; i < currDiff.width; i++) {
    gameBoard[i] = new Array(currDiff.length).fill(COVERED);
  }
  
  return gameBoard;
};

const initialState = {
  currDiff,
  flagsLeft: currDiff.flags,
  gameBoard: newBoard(currDiff)
};

export default function(state = initialState, action) {
  switch (action.type) {
    case OPEN_CELL:
      const { r, c } = action.payload;
      state.gameBoard[r][c] = UNCOVERED;
      
      return Object.assign({}, state, {
        gameBoard: state.gameBoard
      });

    // We need to preserve the previous state, so treat the value as a bit vector
    case FLAG_CELL:
      const { r, c } = action.payload;
      state.gameBoard[r][c] |= FLAGGED;
      
      return Object.assign({}, state, {
        flagsLeft: state.flagsLeft -= 1,
        gameBoard: state.gameBoard
      });

    case UNFLAG_CELL:
      const { r, c } = action.payload;
      state.gameBoard[r][c] &= ~FLAGGED;
      
      return Object.assign({}, state, {
        flagsLeft: state.flagsLeft += 1,
        gameBoard: state.gameBoard
      });

    // Just return a new state object with a fresh game board
    case RESET:
      return Object.assign({}, state, {
        flagsLeft: state.currDiff.flags,
        gameBoard: newBoard(state.currDiff)
      });
    
    default:
      return state;
  }
}
