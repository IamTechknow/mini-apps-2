import { OPEN_CELL, FLAG_CELL, UNFLAG_CELL, RESET_GAME } from './actionTypes';

/*
 * action creators
 */

export const openCell = (r, c) => ({
  type: OPEN_CELL,
  payload: {
    r, c
  }
});

export const flagCell = (r, c) => ({
  type: FLAG_CELL,
  payload: {
    r, c
  }
});

export const unflagCell = (r, c) => ({
  type: UNFLAG_CELL,
  payload: {
    r, c
  }
});

export const resetGame = () => ({
  type: RESET_GAME
});
