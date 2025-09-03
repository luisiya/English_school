import { createSlice } from '@reduxjs/toolkit';
import { getTasks } from '../actions';

const initialState = {
  tasks: [],
  show: true,
  shuffleWords: [],
  translates: [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    showTasks: (state) => {
      state.show = !state.show;
    },
    resetToWordSets: (state) => {
      state.show = true;
      state.shuffleWords = [];
      state.translates = [];
    },
    mixWords: (state, action) => {
      state.shuffleWords = action.payload;
    },
    setTranslates: (state, action) => {
      state.translates = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { showTasks, mixWords, setTranslates, resetToWordSets } = tasksSlice.actions;
export default tasksSlice.reducer;
