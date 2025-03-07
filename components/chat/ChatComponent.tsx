"use client";

import { useTypedSelector } from "@/hooks/use-typed-selector";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import { useState } from "react";
import { useGetUserChatsQuery } from "@/generated/graphql";

const ChatComponent = () => {
  const isOpen = useTypedSelector((state) => state.chat.isOpen);
  const [currentChatId, setCurrentChatId] = useState<number | null>(null);
  const { data, loading, error } = useGetUserChatsQuery();

  const handleChatClick = (chatId: number) => {
    setCurrentChatId(chatId);
  };

  const chats = data?.getUserChats.chats;
  const chat = chats ? chats[currentChatId ?? 0] : null;

  return isOpen ? (
    <div className="right-0 md:right-4 bottom-0 z-50 fixed bg-background dark:bg-black shadow-sm border-muted rounded-t-xl w-full md:w-[500px] lg:w-[800px]">
      <div className="flex flex-row gap-0 w-full h-full min-h-[200px] max-h-[400px]">
        <ChatList
          handleChatClick={handleChatClick}
          loading={loading}
          chats={chats}
          error={error}
          currentChatId={currentChatId}
        />
        <ChatWindow chat={chat} />
      </div>
    </div>
  ) : null;
};

export default ChatComponent;
