// Single reducer that handles all possible actions to manipulate the game state.
import { OPEN_CELL, FLAG_CELL, UNFLAG_CELL, RESET_GAME } from '../actions/actionTypes';
import Helpers from './mineSweeperHelpers';
import Difficulty from '../difficulty';

// Game status constants
const GAME_ON = 0, MINE_TRIGGERED = 1, GAME_WON = 2, GAME_NO_MINES = 3;

// Create initial state
let currDiff = Difficulty.getDefaultDifficulty();

const initialState = {
  currDiff,
  flagsLeft: currDiff.flags,
  gameBoard: Helpers.newBoard(currDiff),
  gameStatus: `Flags remaining: ${currDiff.flags}`,
  statusCode: GAME_NO_MINES
};

export default (state = initialState, action) => {
  let pair = action.payload;
  const { gameBoard, flagsLeft } = state;

  switch (action.type) {
    case OPEN_CELL:
      let { newBoard, gameStatus } =
        Helpers.openCell(gameBoard, pair.r, pair.c, state.statusCode, state.currDiff);

      return {
        ...state,
        gameBoard: newBoard,
        gameStatus: Helpers.getGameStatus(gameStatus, flagsLeft),
        statusCode: gameStatus
      };

    case FLAG_CELL:
      return {
        ...state,
        flagsLeft: flagsLeft -= 1,
        gameBoard: Helpers.flagCell(gameBoard, pair.r, pair.c),
        gameStatus: `Flags remaining: ${flagsLeft}`
      };

    case UNFLAG_CELL:
      return {
        ...state,
        flagsLeft: flagsLeft += 1,
        gameBoard: Helpers.unflagCell(gameBoard, pair.r, pair.c),
        gameStatus: `Flags remaining: ${flagsLeft}`
      };

    case RESET_GAME:
      return {
        ...state,
        flagsLeft: state.currDiff.flags,
        gameBoard: Helpers.newBoard(state.currDiff),
        gameStatus: `Flags remaining: ${currDiff.flags}`,
        statusCode: GAME_NO_MINES
      };

    default:
      return state;
  }
}
