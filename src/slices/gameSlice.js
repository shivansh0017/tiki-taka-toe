import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  BOARD_RESULTS,
  BOARD_RESULT_MODES,
  MARKS,
  MODAL_STATES,
  STATUS,
  PAGES,
  SEARCH_PLAYER
} from "../utilities/constants";
import { getBoardResult, getIndices } from "../utilities/helpers";

const initialState = {
  rowCategories: [...Array(3).fill(' ')],
  columnCategories: [...Array(3).fill(' ')],
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
  searchPlayer: SEARCH_PLAYER.NO,
  row: 0,
  col: 0,
  rowIds: [...Array(3).fill(' ')],
  colIds: [...Array(3).fill(' ')],
  currentRowId: 0,
  currentColId: 0,
  winsX: 0,
  winsO: 0,
  ties: 0,
  index: 0
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
    const result = data.teams;
    let randomCategoriesIndex = new Set();
    while (randomCategoriesIndex.size < 6) {
      randomCategoriesIndex.add(Math.floor(Math.random() * result.length));
    }
    const rowCategories1 = Array.from({ length: 3 }, (_, i) => result[[...randomCategoriesIndex][i]].short_code);
    const columnCategories1 = Array.from({ length: 3 }, (_, i) => result[[...randomCategoriesIndex][i + 3]].short_code);
    const rowIds1 = Array.from({ length: 3 }, (_, i) => result[[...randomCategoriesIndex][i]].id);
    const columnIds1 = Array.from({ length: 3 }, (_, i) => result[[...randomCategoriesIndex][i + 3]].id);
    return { rowCategories1, columnCategories1, rowIds1, columnIds1 };
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
          state.searchPlayer = SEARCH_PLAYER.NO;
          console.log(result.line)
          console.log(state.winningLine);
          return;
        }
        case BOARD_RESULTS.O: {
          state.winsO++;
          state.status = STATUS.GAME_OVER;
          state.modalState = MODAL_STATES.QUIT_GAME;
          state.winningLine = result.line;
          state.searchPlayer = SEARCH_PLAYER.NO;
          console.log(result.line)
          console.log(state.winningLine);
          return;
        }
        case BOARD_RESULTS.TIE: {
          state.ties++;
          state.status = STATUS.GAME_OVER;
          state.modalState = MODAL_STATES.QUIT_GAME;
          state.searchPlayer = SEARCH_PLAYER.NO;
          return;
        }
        default: {
          break;
        }
      }
      // the game isn't over, change the turn
      state.searchPlayer = SEARCH_PLAYER.NO;
      state.currentTurn = state.currentTurn === MARKS.X ? MARKS.O : MARKS.X;
    },
    skipTurn(state){
      state.currentTurn = state.currentTurn === MARKS.X ? MARKS.O : MARKS.X;
      state.searchPlayer = SEARCH_PLAYER.NO;
      state.modalState = MODAL_STATES.NONE;
    },
    restartGame: (state) => {
      let result = getBoardResult(state.board, BOARD_RESULT_MODES.TYPE);
      state.board = [...Array(9).fill(' ')];
      state.currentTurn = result.mark === BOARD_RESULTS.X ? MARKS.O : MARKS.X;
      state.modalState = MODAL_STATES.NONE;
      state.paused = false;
      state.status = STATUS.INITIAL_GAME_LOAD;
      state.searchPlayer = SEARCH_PLAYER.NO;
      state.winningLine = [];
    },
    setFirstTurn: (state) => {
      if (state.selectedMark === MARKS.X) {
        state.currentTurn = MARKS.X
        state.status = STATUS.PLAYER_TURN;
        state.searchPlayer = SEARCH_PLAYER.NO;
      }
      else {
        state.currentTurn = MARKS.O
        state.status = STATUS.PLAYER_TURN;
        state.searchPlayer = SEARCH_PLAYER.NO;
      }
    },
    toggleInstructions: (state) => {
      state.modalState = state.modalState === MODAL_STATES.INSTRUCTIONS? MODAL_STATES.NONE : MODAL_STATES.INSTRUCTIONS
    },
    togglePause: (state) => {
      state.modalState = state.modalState === MODAL_STATES.PAUSED ? MODAL_STATES.NONE : MODAL_STATES.PAUSED;
    },
    toggleSkipTurn: (state) => {
      state.modalState = state.modalState === MODAL_STATES.SKIP ? MODAL_STATES.NONE : MODAL_STATES.SKIP;
    },
    toggleSettings: (state) => {
      state.modalState = state.modalState === MODAL_STATES.SETTINGS ? MODAL_STATES.NONE : MODAL_STATES.SETTINGS;
    },
    toggleSearchPlayer: (state, action) => {
      state.searchPlayer = (state.searchPlayer === SEARCH_PLAYER.NO && state.modalState === MODAL_STATES.NONE) ? SEARCH_PLAYER.YES : SEARCH_PLAYER.NO;
      let indices = getIndices(action.payload);
      state.index = action.payload;
      state.row = indices.row;
      state.col = indices.col;
      state.currentRowId = state.rowIds[state.row];
      state.currentColId = state.colIds[state.col];
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
      state.rowIds = action.payload.rowIds1
      state.colIds = action.payload.columnIds1
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
  skipTurn,
  restartGame,
  setFirstTurn,
  toggleInstructions,
  togglePause,
  toggleSkipTurn,
  toggleSettings,
  toggleSearchPlayer,
  toggleSelectedMark
} = gameSlice.actions;

export default gameSlice.reducer;

