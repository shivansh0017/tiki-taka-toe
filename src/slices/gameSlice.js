import { createSlice } from "@reduxjs/toolkit";


import {
  BOARD_RESULTS,
  BOARD_RESULT_MODES,
  MARKS,
  MODAL_STATES,
  STATUS
} from "../utilities/constants";
import { getBoardResult } from "../utilities/helpers";

const initialState = {
  columnCategories: [...Array(3).fill(' ')], // added
  rowCategories: [...Array(3).fill(' ')], // added
  board: [...Array(9).fill(' ')],
  currentTurn: MARKS.X,
  modalState: MODAL_STATES.NONE,
  selectedMark: MARKS.X,
  status: STATUS.INITIAL_GAME_LOAD,
  opponent: null,
  winningLine: [],
  winsX: 0,
  winsO: 0,
  ties: 0
}


const response = await fetch('/teams.json');
if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`);
}
const teamsData = await response.json();


export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    reset: () => initialState,
    setRandomCategories: (state) => {
      let randomCategoriesIndex = new Set()
      while (randomCategoriesIndex.size < 6) {
        randomCategoriesIndex.add(Math.floor(Math.random() * 25))
      }
      const uniqueNumbers = [...randomCategoriesIndex];
      for (let i = 0; i < 3; i++) {
        if (teamsData && teamsData.teams) {
          state.rowCategories[i] = teamsData.teams[uniqueNumbers[i]].short_code;
          state.columnCategories[i] = teamsData.teams[uniqueNumbers[i + 3]].short_code;
        } else {
          console.error('Error accessing teamsData or teams array or 3rd object');
        }
      }
    },
    addMarkToBoard: (state, action) => {
      let index = action.payload;
      if (state.board[index] !== ' ') return;  // move is invalid
      state.board[index] = state.currentTurn;
      let result = getBoardResult(state.board, BOARD_RESULT_MODES.TYPE);
      switch (result.mark) {
        case BOARD_RESULTS.X: {
          state.winsX++;
          state.status = STATUS.GAME_OVER;
          state.modalState = MODAL_STATES.QUIT_GAME;
          state.winningLine = result.line;
          console.log(result.line)
          console.log(state.winningLine);
          return;
        }
        case BOARD_RESULTS.O: {
          state.winsO++;
          state.status = STATUS.GAME_OVER;
          state.modalState = MODAL_STATES.QUIT_GAME;
          state.winningLine = result.line;
          console.log(result.line)
          console.log(state.winningLine);
          return;
        }
        case BOARD_RESULTS.TIE: {
          state.ties++;
          state.status = STATUS.GAME_OVER;
          state.modalState = MODAL_STATES.QUIT_GAME;
          return;
        }
        default: {
          break;
        }
      }
      // the game isn't over, change the turn
      state.currentTurn = state.currentTurn === MARKS.X ? MARKS.O : MARKS.X;
    },
    selectOpponent: (state, action) => {
      state.opponent = action.payload
    },
    resetRecord: (state) => {
      state.ties = 0;
      state.winsO = 0;
      state.winsX = 0;
    },
    restartGame: (state) => {
      let result = getBoardResult(state.board, BOARD_RESULT_MODES.TYPE);
      state.board = [...Array(9).fill(' ')];
      state.currentTurn = result.mark === BOARD_RESULTS.X ? MARKS.O : MARKS.X;
      state.modalState = MODAL_STATES.NONE;
      state.paused = false;
      state.status = STATUS.INITIAL_GAME_LOAD;
      state.winningLine = [];
    },
    setFirstTurn: (state) => {
      if (state.selectedMark === MARKS.X) {
        state.currentTurn = MARKS.X
        state.status = STATUS.PLAYER_TURN;
      }
      else {
        state.currentTurn = MARKS.O
        state.status = STATUS.PLAYER_TURN;
      }
    },
    togglePause: (state) => {
      state.modalState = state.modalState === MODAL_STATES.PAUSED ? MODAL_STATES.NONE : MODAL_STATES.PAUSED;
    },
    toggleSettings: (state) => {
      state.modalState = state.modalState === MODAL_STATES.SETTINGS ? MODAL_STATES.NONE : MODAL_STATES.SETTINGS;
    },
    toggleSelectedMark: (state, action) => {
      if (state.selectedMark !== action.payload) {
        state.selectedMark = state.selectedMark === MARKS.X ? MARKS.O : MARKS.X;
      }
    }
  }
});

export const {
  reset,
  addMarkToBoard,
  setRandomCategories,
  resetRecord,
  restartGame,
  selectOpponent,
  setFirstTurn,
  togglePause,
  toggleSettings,
  toggleSelectedMark
} = gameSlice.actions;

export default gameSlice.reducer;

