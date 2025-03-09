"use client";

import { useTypedSelector } from "@/hooks/use-typed-selector";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import { useEffect, useState } from "react";
import {
  Chat,
  useGetUserChatsQuery,
  useNewMessageSubscription,
} from "@/generated/graphql";
import { useCurrentUser } from "@/hooks/use-current-user";

const ChatComponent = () => {
  const isOpen = useTypedSelector((state) => state.chat.isOpen);
  const [currentChatId, setCurrentChatId] = useState<number>(
    parseInt(localStorage.getItem("currentChatId") ?? "0")
  );
  const [newChatIsOpen, setNewChatIsOpen] = useState<boolean>(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const { data, loading, error } = useGetUserChatsQuery();
  const { user } = useCurrentUser();

  // Subscribe to new messages
  const { data: newMessageData } = useNewMessageSubscription({
    variables: { userId: user?.id },
    skip: user === undefined,
  });

  // Initialize chats from query data
  useEffect(() => {
    if (data?.getUserChats.chats) {
      setChats(data.getUserChats.chats);
    }
  }, [data]);

  // Handle new messages from subscription
  useEffect(() => {
    console.log("Received new message from subscription");
    if (newMessageData?.newMessage) {
      const newMessage = newMessageData.newMessage.message;

      if (newMessage) {
        // Update the chat list with the new message
        setChats((prevChats) => {
          // Create a new array to avoid mutation
          const updatedChats = [...prevChats];

          // Find the chat that should receive this message
          const chatIndex = updatedChats.findIndex(
            (chat) =>
              (chat.senderId === newMessage.senderId &&
                chat.receiverId === newMessage.receiverId) ||
              (chat.senderId === newMessage.receiverId &&
                chat.receiverId === newMessage.senderId)
          );

          if (chatIndex >= 0) {
            // Update existing chat
            const updatedChat = {
              ...updatedChats[chatIndex],
              messages: [...updatedChats[chatIndex].messages, newMessage],
              updatedAt: newMessage.createdAt, // Update the chat timestamp
            };
            updatedChats[chatIndex] = updatedChat;

            // // Move this chat to the top of the list (most recent)
            // updatedChats.splice(chatIndex, 1);
            // updatedChats.unshift(updatedChat);
          } else {
            // This is a message from a new chat - we might need to create a new chat entry
            // This would typically be handled by refetching the chats after receiving a new chat message
            // But could be expanded here if needed
          }

          return updatedChats;
        });
      }
    }
  }, [newMessageData]);

  const handleChatClick = (chatId: number) => {
    setCurrentChatId(chatId);
    localStorage.setItem("currentChatId", chatId.toString());
  };

  const openNewChatWindow = () => {
    setNewChatIsOpen(true);
  };

  const closeNewChatWindow = () => {
    setNewChatIsOpen(false);
  };

  const chat = chats ? chats[currentChatId ?? 0] : null;

  return isOpen ? (
    <div className="right-0 md:right-4 bottom-0 z-50 fixed bg-background dark:bg-black shadow-sm border-muted rounded-t-xl w-full md:w-[500px] lg:w-[800px]">
      <div className="flex flex-row gap-0 w-full h-[500px] max-h-[400px]">
        <ChatList
          handleChatClick={handleChatClick}
          openNewChatWindow={openNewChatWindow}
          loading={loading}
          chats={chats}
          error={error}
          currentChatId={currentChatId}
        />
        <ChatWindow
          chat={chat}
          newChatIsOpen={newChatIsOpen}
          closeNewChatWindow={closeNewChatWindow}
        />
      </div>
    </div>
  ) : null;
};

export default ChatComponent;
