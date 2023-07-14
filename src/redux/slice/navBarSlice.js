import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navHabito: "",
};

export const navBarSlice = createSlice({
  name: "navHabitos",
  initialState,
  reducers: {
    valueHabito: (state, action) => {
      state.navHabito = action.payload;
    },
  },
});

export const { valueHabito } = navBarSlice.actions;
export default navBarSlice.reducer;
