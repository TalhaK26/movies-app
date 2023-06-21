import { createSlice } from "@reduxjs/toolkit";
import {
  nowPlaying,
  setNowPlayingInStorage,
  selectedRegion,
  setRegionInStorage,
} from "../../utilities/storage";

// Initial Movies State
const initialState = {
  nowPlaying: nowPlaying ? JSON.parse(nowPlaying) : null,
  selectedRegion: selectedRegion ? selectedRegion : "us",
};

// Movies Reducer
export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    // Actions
    setNowPlaying: (state, action) => {
      const payload = action.payload;
      setNowPlayingInStorage(payload);
      state.nowPlaying = payload;
    },
    setRegion: (state, action) => {
      const payload = action.payload;
      setRegionInStorage(payload);
      state.selectedRegion = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNowPlaying, setRegion } = moviesSlice.actions;

export default moviesSlice.reducer;
