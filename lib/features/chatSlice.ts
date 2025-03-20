import { Chat, Message } from "@/generated/graphql";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  isOpen: boolean;
  chats: Chat[];
  currentChatId: number | null;
  newChatIsOpen: boolean;
}

const initialState: ChatState = {
  isOpen: false,
  chats: [],
  currentChatId: null,
  newChatIsOpen: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    // General Set Chat Handler
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload;
    },
    // Specific Set Chat Handlers
    removeChat: (state, action: PayloadAction<number>) => {
      state.chats = state.chats.filter((chat) => chat.id !== action.payload);
    },
    addChat: (state, action: PayloadAction<Chat>) => {
      if (state.chats.some((chat) => chat.id === action.payload.id)) {
        return;
      }
      state.chats.push(action.payload);
    },
    setCurrentChatId: (state, action: PayloadAction<number | null>) => {
      state.currentChatId = action.payload;
    },
    // Message Handlers
    addMessage: (
      state,
      action: PayloadAction<{ chatId: number; message: Message }>
    ) => {
      const { chatId, message } = action.payload;
      const chatIndex = state.chats.findIndex((chat) => chat.id === chatId);
      if (chatIndex >= 0) {
        // Create a new messages array
        const messages = [...(state.chats[chatIndex].messages || []), message];

        // Create a new chat object with the updated messages
        state.chats[chatIndex] = {
          ...state.chats[chatIndex],
          messages,
          updatedAt: message.createdAt,
        };
      }
    },
    mergeMessages: (
      state,
      action: PayloadAction<{ chatId: number; messages: Message[] }>
    ) => {
      const { chatId, messages } = action.payload;
      const chatIndex = state.chats.findIndex((chat) => chat.id === chatId);

      if (chatIndex >= 0) {
        // Create a Map for fast lookup of existing messages by ID
        const existingMessages = new Map(
          (state.chats[chatIndex].messages || []).map((msg) => [msg.id, msg])
        );

        // Add new messages that don't exist yet
        messages.forEach((message) => {
          if (!existingMessages.has(message.id)) {
            existingMessages.set(message.id, message);
          }
        });

        // Convert map back to array and sort by creation time
        state.chats[chatIndex].messages = Array.from(
          existingMessages.values()
        ).sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }
    },
    // Chat Window Handlers
    toggleChat: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeChat: (state) => {
      state.isOpen = false;
    },
    openChat: (state) => {
      state.isOpen = true;
    },
    // New Chat Window Handlers
    openNewChat: (state) => {
      state.newChatIsOpen = true;
    },
    closeNewChat: (state) => {
      state.newChatIsOpen = false;
    },
  },
});

export const {
  toggleChat,
  closeChat,
  openChat,
  setChats,
  setCurrentChatId,
  addMessage,
  mergeMessages,
  removeChat,
  addChat,
  openNewChat,
  closeNewChat,
} = chatSlice.actions;
export default chatSlice.reducer;
