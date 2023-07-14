import { configureStore } from "@reduxjs/toolkit";
import habitos from "./slice/habitoSlice";
import navBarAction from "./slice/navBarSlice";
import estudio from "./slice/estudiosSlice";

const store = configureStore({
  reducer: {
    habitos: habitos,
    navBarAction: navBarAction,
    estudio: estudio,
  },
});

export default store;
