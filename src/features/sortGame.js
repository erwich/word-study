import { createSlice } from "@reduxjs/toolkit";
import data from "../data";

const initialState = {
  gameMode: null,
  wordBoxWords: [],
  wordColumns: data.map((category) => ({
    ...category,
    words: [],
  })),
  writingPromptWord: null,
  complete: null,
  outcome: null,
};

const findWordColumnIndex = (wordColumns, category) =>
  wordColumns.findIndex((column) => column.category === category);

export const sortGameSlice = createSlice({
  name: "sortGame",
  initialState,
  reducers: {
    setGameMode: (state, action) => {
      state.gameMode = action.payload;
    },
    setWordBoxWords: (state, action) => {
      state.wordBoxWords = action.payload;
    },
    setWordColumns: (state, action) => {
      state.wordColumns = action.payload;
    },
    resetWordColumns: (state, action) => {
      state.wordColumns = data.map((category) => ({
        ...category,
        words: [],
      }));
    },
    resetGameMode: (state, action) => {
      state.gameMode = null;
      state.writingPromptWord = null;
      state.complete = false;
      state.outcome = {};
      state.wordBoxWords = [];
      state.wordColumns = data.map((category) => ({
        ...category,
        words: [],
      }));
    },
    dropWord: (state, action) => {
      const { word, category } = action.payload;
      const ndx = findWordColumnIndex(state.wordColumns, category);
      state.wordBoxWords = state.wordBoxWords.filter((w) => w !== word);
      state.wordColumns = state.wordColumns.map((column) => ({
        ...column,
        words: column.words.filter((w) => w !== word),
      }));
      state.wordColumns[ndx].words = [...state.wordColumns[ndx].words, word];
    },
    completeGame: (state, action) => {
      state.complete = true;
      state.outcome = {
        score: state.wordColumns.reduce(
          (totalPts, category) =>
            totalPts +
            category.words.reduce(
              (pts, word) =>
                data[
                  findWordColumnIndex(state.wordColumns, category.category)
                ].words.includes(word)
                  ? pts + 1
                  : pts,
              0
            ),
          0
        ),
        maxScore: data.reduce( (pts, column ) => pts + column.words.length, 0 ),
        errorColumns: state.wordColumns
          .filter((column) =>
            column.words.some(
              (word) =>
                !data[
                  findWordColumnIndex(state.wordColumns, column.category)
                ].words.includes(word)
            )
          )
          .map((column) => column.category),
      };
    },
    fixAnswers: (state, action) => {
        state.complete = false
        state.outcome = null
    },
    submitWritingWord: (state, action) => {
      const { category, word } = action.payload
      const ndx = findWordColumnIndex(state.wordColumns, category);
      state.wordBoxWords = state.wordBoxWords.filter((w) => w !== word);
      state.wordColumns = state.wordColumns.map((column) => ({
        ...column,
        words: column.words.filter((w) => w !== word),
      }));
      state.wordColumns[ndx].words = [...state.wordColumns[ndx].words, word];
    },
    setNewWritingPromptWord: (state, action) => {
      state.writingPromptWord = state.wordBoxWords.length > 0 ? state.wordBoxWords[0] : null
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setGameMode,
  setWordBoxWords,
  setWordColumns,
  resetWordColumns,
  resetGameMode,
  dropWord,
  completeGame,
  fixAnswers,
  submitWritingWord,
  setNewWritingPromptWord,
} = sortGameSlice.actions;

export default sortGameSlice.reducer;
