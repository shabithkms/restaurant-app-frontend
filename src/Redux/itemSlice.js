import { createSlice } from '@reduxjs/toolkit';

export const itemSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
  },
  reducers: {
    update_item: (state, action) => {
      state.item = { ...action.payload };
    },
  },
});

export const {update_item} = itemSlice.actions;
export default itemSlice.reducer;
