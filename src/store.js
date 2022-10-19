import { configureStore } from '@reduxjs/toolkit';
import sortGameReducer from './features/sortGame';

const store = configureStore({
  reducer: {
    sortGame: sortGameReducer,
  },
});

export default store;
