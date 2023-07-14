import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  habitos: [],
};

export const habitoSlice = createSlice({
  name: "habitos",
  initialState,
  reducers: {
    getHabitos: (state, action) => {
      state.habitos = action.payload;
    },
  },
});

export const { getHabitos } = habitoSlice.actions;
export default habitoSlice.reducer;
