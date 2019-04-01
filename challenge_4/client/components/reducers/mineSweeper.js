// Single reducer that handles all possible actions to manipulate the game state.
import { OPEN_CELL, FLAG_CELL, UNFLAG_CELL, RESET_GAME } from '../actions/actionTypes';
import Helpers from './mineSweeperHelpers';
import Difficulty from '../difficulty';

// Create initial state
let currDiff = Difficulty.getDefaultDifficulty();

const initialState = {
  currDiff,
  flagsLeft: currDiff.flags,
  gameBoard: Helpers.newBoard(currDiff)
};

export default (state = initialState, action) => {
  let pair = action.payload;
  const { gameBoard } = state;

  switch (action.type) {
    case OPEN_CELL:
      return {
        ...state,
        gameBoard: Helpers.openCell(gameBoard, pair.r, pair.c)
      };

    case FLAG_CELL:
      return {
        ...state,
        flagsLeft: state.flagsLeft -= 1,
        gameBoard: Helpers.flagCell(gameBoard, pair.r, pair.c)
      };

    case UNFLAG_CELL:
      return {
        ...state,
        flagsLeft: state.flagsLeft += 1,
        gameBoard: Helpers.unflagCell(gameBoard, pair.r, pair.c)
      };

    case RESET_GAME:
      return Object.assign({}, state, {
        flagsLeft: state.currDiff.flags,
        gameBoard: Helpers.newBoard(state.currDiff)
      });

    default:
      return state;
  }
}
