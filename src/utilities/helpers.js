// This file is used to store 2 functions. 
// 1. areMovesLeft
// 2. getBoardResult
// These 2 functions are used in the game logic to check if the game is over and if the current player has won.

import {
  BOARD_RESULTS,
  BOARD_RESULT_MODES
} from "./constants";

const areMovesLeft = (board) => {
  for (let i = 0; i <= 8; i++) {
    if (board[i] === ' ')
      return true;
  }
  return false;
}

export const getBoardResult = (board, mode, cpuMark = null) => {
  // check rows
  for (let row = 0; row < 9; row += 3) {
    if (board[row] !== ' ' && board[row] === board[row + 1] && board[row + 1] === board[row + 2]) {
      if (mode === BOARD_RESULT_MODES.TYPE) {
        return {
          mark: board[row], 
          line: [row, row + 1, row + 2]
        }
      }  
      if (mode === BOARD_RESULT_MODES.SCORE) return board[row] === cpuMark ? 10 : -10;
    }
  }
  // check columns
  for (let col = 0; col < 3; col++) {
    if (board[col] !== ' ' && board[col] === board[col + 3] && board[col + 3] === board[col + 6]) {
      if (mode === BOARD_RESULT_MODES.TYPE) {
        return {
          mark: board[col],
          line: [col, col + 3, col + 6]
        }
      }
      if (mode === BOARD_RESULT_MODES.SCORE) return board[col] === cpuMark ? 10 : -10;
    }
  }
  // check diagonals
  if (board[0] !== ' ' && board[0] === board[4] && board[4] === board[8]) {
    if (mode === BOARD_RESULT_MODES.TYPE) {
      return {
        mark: board[0],
        line: [0, 4, 8]
      }
    }
    if (mode === BOARD_RESULT_MODES.SCORE) return board[0] === cpuMark ? 10 : -10;
  }
  if (board[2] !== ' ' && board[2] === board[4] && board[4] === board[6]) {
    if (mode === BOARD_RESULT_MODES.TYPE) {
      return {
        mark: board[2],
        line: [2, 4, 6]
      }
    }
    if (mode === BOARD_RESULT_MODES.SCORE) return board[2] === cpuMark ? 10 : -10;
  }
  // check for tie
  if (!areMovesLeft(board)) {
    if (mode === BOARD_RESULT_MODES.TYPE) {
      return {
        mark: BOARD_RESULTS.TIE,
        line: null
      }
    }
    if (mode === BOARD_RESULT_MODES.SCORE) return 0;
  }
  if (mode === BOARD_RESULT_MODES.TYPE) {
    return {
      mark: BOARD_RESULTS.CONTINUE,
      line: null
    }
  }
  if (mode === BOARD_RESULT_MODES.SCORE) return 0;
}
