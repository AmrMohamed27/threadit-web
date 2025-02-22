import { configureStore } from "@reduxjs/toolkit";
import savedPostsReducer from "./features/savedPostsSlice";
import hiddenPostsReducer from "./features/hiddenPostsSlice";

export const store = configureStore({
  reducer: {
    savedPosts: savedPostsReducer,
    hiddenPosts: hiddenPostsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
