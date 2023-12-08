import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todo: {},
  },
  reducers: {
    set_todo: (state, action) => {
      state.todo = action.payload;
    },
  },
});

export const { set_todo } = todoSlice.actions;

export default todoSlice.reducer;
