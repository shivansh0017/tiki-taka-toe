import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import gameReducer from '../slices/gameSlice';

const reducers = combineReducers({
  game: gameReducer
});

const persistConfig = {
  key: 'root',
  storage: storage
}

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTool: process.env.NODE_ENV !== 'production',
});

export default store;