import { configureStore } from "@reduxjs/toolkit";
import savedPostsReducer from "./features/savedPostsSlice";
import chatReducer from "./features/chatSlice";

export const store = configureStore({
  reducer: {
    savedPosts: savedPostsReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
