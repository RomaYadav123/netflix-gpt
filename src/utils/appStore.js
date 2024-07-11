import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "../utils/userSlice";
import moviesReducer from "../utils/movieSlice";
import gptReducer from "../utils/gptSlice";
import configReducer from "../utils/configSlice";

const appStore = configureStore({
  reducer: {
    user: userSliceReducer,
    movies: moviesReducer,
    gpt: gptReducer,
    config: configReducer,
  },
});

export default appStore;
