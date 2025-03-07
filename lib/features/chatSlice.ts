// chatSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: { isOpen: false },
  reducers: {
    toggleChat: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeChat: (state) => {
      state.isOpen = false;
    },
    openChat: (state) => {
      state.isOpen = true;
    },
  },
});

export const { toggleChat, closeChat, openChat } = chatSlice.actions;
export default chatSlice.reducer;
