// Cell constants
const COVERED = 0, UNCOVERED = 1, FLAGGED = 8, MINE = 3;

// Game status constants
const GAME_ON = 0, MINE_TRIGGERED = 1, GAME_WON = 2, GAME_NO_MINES = 3;

// Helper functions to manipulate the game model
export default class mineSweeperHelpers {
  static openCell(board, r, c, statusCode, diff) {
    if (board[r][c] === UNCOVERED) {
      return { board, GAME_ON };
    }

    let newBoard = mineSweeperHelpers.getBoard(board);

    // populate the board with mines when first cell is opened
    if(mineSweeperHelpers.mineAt(newBoard, r, c)) {
      newBoard[r][c] = MINE;
      return { newBoard, MINE_TRIGGERED };
    } else {
      if (statusCode === GAME_NO_MINES) {
        newBoard = mineSweeperHelpers.populateMines(newBoard, diff.flags, r, c);
      }

      mineSweeperHelpers.revealCells(newBoard, r, c);
      return { newBoard, GAME_ON };
    }
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
  }

  static foundMinesNearby(board, r, c) {
    let mineAt = mineSweeperHelpers.mineAt;
    return mineAt(board, r - 1, c) || mineAt(board, r + 1, c) ||
      mineAt(board, r, c - 1) || mineAt(board, r, c + 1) ||
      mineAt(board, r - 1, c - 1) || mineAt(board, r - 1, c + 1) ||
      mineAt(board, r + 1, c + 1) || mineAt(board, r + 1, c - 1);
  }

  static mineAt(board, r, c) {
    return !(r < 0 || c < 0 || r >= board.length || c >= board[r].length)
      && board[r][c] === MINE;
  }

  // Generate random number such that there's a 10% chance to place mine at specified location
  // Check if there are mines left after placing one, repeat until no more mines
  static populateMines(board, mines, playerR, playerC) {
    let minesLeft = mines;

    while(minesLeft > 0) {
      for (let r = 0; r < board.length && minesLeft > 0; r += 1) {
        for (let c = 0; c < board[r].length; c += 1) {
          if (Math.random() < 0.1) {
            if (r != playerR && c != playerC) {
              minesLeft--;
              board[r][c] = MINE;
            }
          }

          if (minesLeft === 0) {
            break;
          }
        }
      }
    }

    return board;
  }

  static revealCells(board, r, c) {
    // Base case, if out of bounds do nothing
    if (r < 0 || c < 0 || r >= board.length || c >= board[r].length) {
      return 0;
    }

    // Base case, if opened, mine or flag is at r, c, don't open and return 0
    if (board[r][c] !== COVERED) {
      return 0;
    }

    // Open Cell at r, c
    let cellsOpened = 1;
    board[r][c] = UNCOVERED;

    // Base case: if one or more mines nearby, then don't open nearby cells
    if (mineSweeperHelpers.foundMinesNearby(board, r, c)) {
      return cellsOpened;
    }

    let revealCells = mineSweeperHelpers.revealCells;
    return cellsOpened + // Try to open vertically, horizontally, and diagonally CW
      revealCells(board, r - 1, c) +
      revealCells(board, r + 1, c) +
      revealCells(board, r, c - 1) +
      revealCells(board, r, c + 1) +
      revealCells(board, r - 1, c - 1) +
      revealCells(board, r - 1, c + 1) +
      revealCells(board, r + 1, c + 1) +
      revealCells(board, r + 1, c - 1);
  }

  static getGameStatus(code, flagsLeft) {
    return code === MINE_TRIGGERED ? 'You triggered a mine!' :
      code === GAME_WON ?  'You win!' : `Flags remaining: ${flagsLeft}`;
  }
}
