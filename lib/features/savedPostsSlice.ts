import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SavedPostsState {
  savedPostsIds: number[];
  loading: boolean;
  error: string | null;
}

const initialState: SavedPostsState = {
  savedPostsIds: [],
  loading: false,
  error: null,
};

const savedPostsSlice = createSlice({
  name: "savedPosts",
  initialState,
  reducers: {
    setSavedPosts: (state, action: PayloadAction<number[]>) => {
      state.savedPostsIds = action.payload;
      state.loading = false;
    },
    toggleSavePost: (state, action: PayloadAction<number>) => {
      const postId = action.payload;
      if (state.savedPostsIds.includes(postId)) {
        state.savedPostsIds = state.savedPostsIds.filter((id) => id !== postId);
      } else {
        state.savedPostsIds.push(postId);
      }
    },
    clearSavedPosts: (state) => {
      state.savedPostsIds = [];
      state.loading = false;
    },
  },
});

export const { setSavedPosts, toggleSavePost, clearSavedPosts } =
  savedPostsSlice.actions;
export default savedPostsSlice.reducer;
