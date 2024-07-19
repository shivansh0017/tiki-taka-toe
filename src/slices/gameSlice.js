import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


import {
  BOARD_RESULTS,
  BOARD_RESULT_MODES,
  MARKS,
  MODAL_STATES,
  STATUS,
  PAGES
} from "../utilities/constants";
import { getBoardResult } from "../utilities/helpers";

const initialState = {
  columnCategories: [...Array(3).fill(' ')],
  rowCategories: [...Array(3).fill(' ')],
  loading: false,
  error: '', 
  randomCategoriesIndex: [...Array(6).fill(0)],
  board: [...Array(9).fill(' ')],
  page: PAGES.NEW_GAME,
  currentTurn: MARKS.X,
  modalState: MODAL_STATES.NONE,
  selectedMark: MARKS.X,
  status: STATUS.INITIAL_GAME_LOAD,
  winningLine: [],
  winsX: 0,
  winsO: 0,
  ties: 0
}

export const fetchTeams = createAsyncThunk('teams/fetchTeams', async () => {
  try {
    const response = await axios.get('/teams.json');
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = response.data;
    if (!data || !data.teams) {
      throw new Error('No teams found in the response.');
    }
    const teams = data.teams;
    let randomCategoriesIndex = new Set();
    while (randomCategoriesIndex.size < 6) {
      randomCategoriesIndex.add(Math.floor(Math.random() * teams.length));
    }
    const rowCategories1 = Array.from({ length: 3 }, (_, i) => teams[[...randomCategoriesIndex][i]].short_code);
    const columnCategories1 = Array.from({ length: 3 }, (_, i) => teams[[...randomCategoriesIndex][i + 3]].short_code);
    return { rowCategories1, columnCategories1 };
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw error;
  }
});

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    reset: () => initialState,
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTeams.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchTeams.fulfilled, (state, action) => {
      state.page = PAGES.GAME;
      state.loading = false
      state.rowCategories = action.payload.rowCategories1
      state.columnCategories = action.payload.columnCategories1
      state.error = ''
    })
    builder.addCase(fetchTeams.rejected, (state, action) => {
      state.loading = false
      state.teams = []
      state.error = action.error.message
    })
  }
});

export const {
  reset,
  addMarkToBoard,
  resetRecord,
  restartGame,
  setFirstTurn,
  togglePause,
  toggleSettings,
  toggleSelectedMark
} = gameSlice.actions;

export default gameSlice.reducer;

