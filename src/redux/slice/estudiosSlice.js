import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  temas: [],
  temaID: [],
  temaPost: [],
  temaPut: [],
  subTemaPut: [],
  subTemaPost: [],
  subTemaDelete: [],
};

export const estudioSlice = createSlice({
  name: "estudio",
  initialState,
  reducers: {
    getTemas: (state, action) => {
      state.temas = action.payload;
    },
    getTemasID: (state, action) => {
      state.temaID = action.payload;
    },
    postTema: (state, action) => {
      state.temaPost = action.payload;
    },
    putTema: (state, action) => {
      state.temaPut = action.payload;
    },
    putSubtema: (state, action) => {
      state.subTemaPut = action.payload;
    },
    postSubtema: (state, action) => {
      state.subTemaPost = action.payload;
    },
    deleteSubtema: (state, action) => {
      state.subTemaDelete = action.payload;
    },
  },
});

export const {
  getTemas,
  getTemasID,
  postTema,
  putTema,
  putSubtema,
  postSubtema,
  deleteSubtema,
} = estudioSlice.actions;
export default estudioSlice.reducer;
