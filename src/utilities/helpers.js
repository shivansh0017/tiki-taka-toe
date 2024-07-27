import { useSelector } from "react-redux";
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

export const getIndices = (index) => {
  return {
    row: Math.floor(index / 3),
    col: index % 3
  }
}

export const getFullName = (name) => {
  switch(name){
    case 'AJA': return 'Ajax';
    case 'AMO': return 'Monaco';
    case 'ARS': return 'Arsenal';
    case 'ATM': return 'Atletico Madrid';
    case 'BAR': return 'Barcelona';
    case 'BAY': return 'Bayern Munich';
    case 'CHE': return 'Chelsea';
    case 'DOR': return 'Dortmund';
    case 'INT': return 'Inter Milan';
    case 'JUV': return 'Juventus';
    case 'LAZ': return 'Lazio';
    case 'LIV': return 'Liverpool';
    case 'MCI': return 'Manchester City';
    case 'MIL': return 'AC Milan';
    case 'MUN': return 'Manchester United';
    case 'NAP': return 'Napoli';
    case 'OLM': return 'Olympique Marseille';
    case 'POR': return 'Porto';
    case 'PSG': return 'Paris Saint-Germain';
    case 'PSV': return 'PSV Eindhoven';
    case 'RMA': return 'Real Madrid';
    case 'ROM': return 'Roma';
    case 'SLB': return 'Benfica';
    case 'TOT': return 'Tottenham';
    default: return name;
  }
}

export const checkForPlayerValidity = (event, result) => {
  
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
