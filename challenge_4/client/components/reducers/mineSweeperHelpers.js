// Cell constants
const COVERED = 0, UNCOVERED = 1, FLAGGED = 8, MINE = 3;

// Helper functions to manipulate the game model
export default class mineSweeperHelpers {
  static openCell(board, r, c) {
    let newBoard = mineSweeperHelpers.getBoard(board);
    newBoard[r][c] = UNCOVERED;
    return newBoard;
  }

  // We need to preserve the previous state, so treat the value as a bit vector
  static flagCell(board, r, c) {
    let newBoard = mineSweeperHelpers.getBoard(board);
    newBoard[r][c] |= FLAGGED;
    return newBoard;
  }

  static unflagCell(board, r, c) {
    let newBoard = mineSweeperHelpers.getBoard(board);
    newBoard[r][c] &= ~FLAGGED;
    return newBoard;
  }

  // Redux requires all the objects in the state object to change for React to call render().
  // Create the new board in only O(oldBoard.length) time
  static getBoard(oldBoard) {
    let board = new Array(oldBoard.length);
    for (let i = 0; i < board.length; i += 1) {
      board[i] = oldBoard[i];
    }

    return board;
  }

  static newBoard(currDiff) {
    let gameBoard = new Array(currDiff.width);
    for (let i = 0; i < currDiff.width; i++) {
      gameBoard[i] = new Array(currDiff.length).fill(COVERED);
    }

    return gameBoard;
  };
}
