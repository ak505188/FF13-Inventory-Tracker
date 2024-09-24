import { createSlice } from '@reduxjs/toolkit'

export const chapterSlice = createSlice({
  name: 'chapter',
  initialState: {
    value: 0,
    name: 'Chapter 1',
  },
  reducers: {
    increment: state => {
      if (state.value < 12) {
        state.value += 1
        state.name = `Chapter ${state.value + 1}`;
      }
    },
    decrement: state => {
      if (state.value > 0) {
        state.value -= 1
        state.name = `Chapter ${state.value + 1}`;
      }
    },
    reset: state => {
      state.value = 0
      state.name = `Chapter ${state.value + 1}`;
    }
  }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, reset } = chapterSlice.actions

export default chapterSlice.reducer
