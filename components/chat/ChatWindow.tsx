"use client";
import { useChatManager } from "@/hooks/use-chat-manager";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getDefaultAvatar, timeAgo } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef } from "react";
import AvatarWrapper from "../common/AvatarWrapper";
import CreateMessageForm from "../forms/CreateMessageForm";
import { Button } from "../ui/button";
import ChatControls from "./ChatControls";
import CloseChatButton from "./CloseChatButton";

const ChatWindow = () => {
  const { user } = useCurrentUser();
  const {
    currentChat: chat,
    currentChatId,
    chatParticipants,
    openNewChatWindow,
  } = useChatManager();
  const participants = chatParticipants[currentChatId ?? 0];
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (chatContainerRef.current && chat?.messages?.length) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chat?.messages]);

  // Handle no active chat
  if (!chat) {
    return (
      <div className="relative flex flex-col flex-1 gap-0 max-md:max-h-[500px] overflow-y-scroll">
        <div className="top-0 z-50 sticky flex flex-row justify-end items-center bg-background dark:bg-black px-4 py-2 border-muted border-b-2 w-full">
          <CloseChatButton />
        </div>
        <div className="flex flex-row flex-wrap justify-center items-center gap-1 mt-4 text-muted-foreground">
          <span>Select a chat to start messaging, or</span>
          <Button variant={"outline"} onClick={openNewChatWindow}>
            Start a New Chat
          </Button>
        </div>
      </div>
    );
  }

  // Find other participant (if direct chat)
  const isGroupChat = chat.isGroupChat;
  const participantList = participants?.userArray || [];
  const conversee = isGroupChat
    ? null
    : participantList.find((p) => p.id !== user?.id);

  return (
    <div
      className="relative flex flex-col flex-1 gap-0 max-md:max-h-[500px] overflow-y-scroll"
      ref={chatContainerRef}
    >
      {/* Header */}
      <div className="top-0 z-50 sticky flex flex-row justify-between items-center bg-background dark:bg-black px-4 py-2 border-muted border-b-2 w-full">
        <div className="flex flex-row flex-1 items-center gap-4">
          {/* Image */}
          <AvatarWrapper
            src={
              chat.isGroupChat
                ? chat.image ??
                  getDefaultAvatar({ name: chat.name ?? "New Group" })
                : conversee?.image ??
                  getDefaultAvatar({ name: conversee?.name ?? "Anonymous" })
            }
            alt={chat.isGroupChat ? chat.name : conversee?.name ?? "Chat Image"}
            className="size-8"
          />
          {/* Chatter name */}
          <span className="font-semibold text-muted-foreground">
            {chat.isGroupChat ? chat.name : conversee?.name ?? "Unknown User"}
          </span>
        </div>
        {/* Controls */}
        <ChatControls />
      </div>

      {/* Chat Body */}
      <div className="flex flex-col flex-1 items-center gap-4 w-full">
        {/* Messages */}
        <div className="flex flex-col items-start gap-4 px-4 py-2 w-full">
          {chat.messages && chat.messages.length > 0 ? (
            chat.messages.map((message) => (
              <div key={message.id} className="flex flex-col items-start gap-1">
                {/* Image and name and time */}
                <div className="flex flex-row items-center gap-2">
                  {/* Image */}
                  <AvatarWrapper
                    src={
                      message.sender?.image ??
                      getDefaultAvatar({
                        name: message.sender?.name ?? "Anonymous",
                      })
                    }
                    alt={message.sender?.name ?? "Sender"}
                    className="size-8"
                  />
                  {/* Name and Time */}
                  <div className="flex flex-row flex-wrap items-center gap-1">
                    {/* Name */}
                    <span>
                      {message.sender?.name === user?.name
                        ? "You"
                        : message?.sender?.name}
                    </span>
                    {/* Time */}
                    <span className="text-muted-foreground text-xs">
                      {timeAgo(message.createdAt)}
                      {message.updatedAt !== message.createdAt && (
                        <span className="text-muted-foreground text-xs">{` (Edited: ${timeAgo(
                          message.updatedAt
                        )})`}</span>
                      )}
                    </span>
                  </div>
                </div>
                {/* Message */}
                <p className="pl-10 sm:max-w-[300px] text-muted-foreground break-words">
                  {message.content}
                </p>
                {/* Media */}
                {message.media && (
                  <div className="pl-10 rounded-lg">
                    <Image
                      src={message.media}
                      alt={message.content}
                      width={200}
                      height={200}
                      className="rounded-lg w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="p-4 w-full text-muted-foreground text-center">
              No messages yet
            </div>
          )}
        </div>
      </div>
      <CreateMessageForm chatId={chat.id} />
    </div>
  );
};

export default ChatWindow;
