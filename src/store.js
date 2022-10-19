import { configureStore } from '@reduxjs/toolkit'
import sortGameReducer from './features/sortGame'

export const store = configureStore({
  reducer: {
    sortGame: sortGameReducer,
  },
})