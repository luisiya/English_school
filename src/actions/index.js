import { createAsyncThunk } from '@reduxjs/toolkit';
import { showTasks, mixWords, setTranslates, resetToWordSets } from '../reducers/tasksReducer';

// Async thunk for fetching tasks using fetch instead of axios
export const getTasks = createAsyncThunk(
  'tasks/getTasks',
  async () => {
    try {
      const response = await fetch('https://my-json-server.typicode.com/luisiya/data_english/db');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.actions;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }
);

// Action creators
export const showUnits = () => showTasks();

export const shuffleWords = (words) => mixWords(words);

export const translatesWords = (translates) => setTranslates(translates);

export const goBackToWordSets = () => resetToWordSets();
