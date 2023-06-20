import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../redux/movies/moviesSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});
