import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HiddenPostsState {
  hiddenPostsIds: number[];
  loading: boolean;
  error: string | null;
}

const initialState: HiddenPostsState = {
  hiddenPostsIds: [],
  loading: false,
  error: null,
};

const hiddenPostsSlice = createSlice({
  name: "hiddenPosts",
  initialState,
  reducers: {
    setHiddenPosts: (state, action: PayloadAction<number[]>) => {
      state.hiddenPostsIds = action.payload;
      state.loading = false;
    },
    toggleHidePost: (state, action: PayloadAction<number>) => {
      const postId = action.payload;
      if (state.hiddenPostsIds.includes(postId)) {
        state.hiddenPostsIds = state.hiddenPostsIds.filter(
          (id) => id !== postId
        );
      } else {
        state.hiddenPostsIds.push(postId);
      }
    },
  },
});

export const { setHiddenPosts, toggleHidePost } = hiddenPostsSlice.actions;
export default hiddenPostsSlice.reducer;
