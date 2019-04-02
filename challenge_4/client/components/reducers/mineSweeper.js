// Single reducer that handles all possible actions to manipulate the game state.
import { OPEN_CELL, FLAG_CELL, UNFLAG_CELL, RESET_GAME } from '../actions/actionTypes';
import Helpers from './mineSweeperHelpers';
import Difficulty from '../difficulty';

// Game status constants
const GAME_ON = 0, GAME_NO_MINES = 1, MINE_TRIGGERED = 2, GAME_WON = 3;

// Create initial state
let currDiff = Difficulty.getDefaultDifficulty();

const initialState = {
  currDiff,
  cellsLeft: currDiff.width * currDiff.length - currDiff.flags,
  flagsLeft: currDiff.flags,
  gameBoard: Helpers.newBoard(currDiff),
  gameStatus: `Flags remaining: ${currDiff.flags}`,
  statusCode: GAME_NO_MINES
};

export default (state = initialState, action) => {
  let pair = action.payload;
  const { gameBoard, flagsLeft } = state;

  // If game is over, then don't let cell actions do anything
  if (action && state.statusCode > GAME_NO_MINES && (action.type === OPEN_CELL || action.type === FLAG_CELL || action.type === UNFLAG_CELL)) {
    return state;
  }

  // Don't flag cells if there's no more flags or open cell
  if (action.type === FLAG_CELL && (flagsLeft === 0 ||
    gameBoard[pair.r][pair.c] === 1)) {
    return state;
  }

  switch (action.type) {
    case OPEN_CELL:
      let { newBoard, gameStatus, cellsLeft } =
        Helpers.openCell(gameBoard, pair.r, pair.c, state.statusCode, state.currDiff, state.cellsLeft);

      return {
        ...state,
        cellsLeft: cellsLeft,
        gameBoard: newBoard,
        gameStatus: Helpers.getGameStatus(gameStatus, flagsLeft),
        statusCode: gameStatus
      };

    case FLAG_CELL:
      return {
        ...state,
        flagsLeft: flagsLeft - 1,
        gameBoard: Helpers.flagCell(gameBoard, pair.r, pair.c),
        gameStatus: `Flags remaining: ${flagsLeft - 1}`
      };

    case UNFLAG_CELL:
      return {
        ...state,
        flagsLeft: flagsLeft + 1,
        gameBoard: Helpers.unflagCell(gameBoard, pair.r, pair.c),
        gameStatus: `Flags remaining: ${flagsLeft + 1}`
      };

    case RESET_GAME:
      return {
        ...state,
        cellsLeft: currDiff.width * currDiff.length - currDiff.flags,
        flagsLeft: state.currDiff.flags,
        gameBoard: Helpers.newBoard(state.currDiff),
        gameStatus: `Flags remaining: ${currDiff.flags}`,
        statusCode: GAME_NO_MINES
      };

    default:
      return state;
  }
}
