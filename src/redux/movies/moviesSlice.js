import { createSlice } from "@reduxjs/toolkit";
import { nowPlaying, setNowPlayingInStorage } from "../../utilities/storage";

// Initial Movies State
const initialState = {
  nowPlaying: nowPlaying ? JSON.parse(nowPlaying) : null,
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
  },
});

// Action creators are generated for each case reducer function
export const { setNowPlaying } = moviesSlice.actions;

export default moviesSlice.reducer;
