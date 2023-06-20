import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "../redux/job/jobSlice";

export const store = configureStore({
  reducer: {
    job: jobReducer,
  },
});
