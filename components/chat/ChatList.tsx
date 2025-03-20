"use client";
import { useChatManager } from "@/hooks/use-chat-manager";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  cn,
  formatNumericDate,
  getDefaultAvatar,
  getMessageString,
} from "@/lib/utils";
import { MessageCirclePlus as AddChatIcon } from "lucide-react";
import AvatarWrapper from "../common/AvatarWrapper";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

const ChatList = ({ openNewChatWindow }: { openNewChatWindow: () => void }) => {
  const { user } = useCurrentUser();
  const {
    handleChatClick,
    isLoading: loading,
    chats,
    error,
    currentChatId,
    chatParticipants: participants,
  } = useChatManager();

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-2 p-4">
        <Skeleton className="w-24 h-6" />
        <Skeleton className="w-full h-12" />
        <Skeleton className="w-full h-12" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-0 border-muted border-r-2 max-sm:w-[80px] sm:w-[300px] sm:max-w-[33%] sm:min-h-full">
      {/* Header */}
      <div className="flex flex-row justify-between items-center p-4 w-full">
        <span className="max-sm:hidden font-bold text-lg">Chats</span>
        <Button
          size={"icon"}
          variant={"ghost"}
          className="rounded-full"
          onClick={() => {
            openNewChatWindow();
          }}
          aria-label="New Chat Button"
        >
          <AddChatIcon size={20} />
        </Button>
      </div>
      {/* Chat List */}
      <div className="flex flex-col gap-2 w-full">
        {chats.map((chat) => {
          const isGroupChat = chat.isGroupChat;
          const chatParticipants = participants[chat.id]?.userArray || [];
          const conversee = isGroupChat
            ? null
            : chatParticipants.find((parti) => parti.id !== user?.id);
          return (
            <div
              key={chat.id}
              className={cn(
                "p-2 cursor-pointer",
                chat.id === currentChatId
                  ? "bg-muted dark:bg-muted/40"
                  : "hover:bg-muted dark:hover:bg-muted/40"
              )}
              onClick={() => handleChatClick(chat.id)}
            >
              <div className="flex flex-row items-center gap-2">
                <div className="flex flex-row items-center gap-2">
                  <AvatarWrapper
                    src={
                      chat.image
                        ? chat.image
                        : isGroupChat
                        ? getDefaultAvatar({
                            name: chat.name ?? "New Group",
                          })
                        : conversee?.image ??
                          getDefaultAvatar({
                            name: conversee?.name ?? "Anonymous",
                          })
                    }
                    alt={
                      isGroupChat
                        ? chat.name ?? "Group"
                        : conversee?.name ?? "Chat Image"
                    }
                    className="size-6"
                  />
                  <div className="max-sm:hidden flex flex-col items-start gap-1">
                    {/* Name and time */}
                    <div className="flex flex-col items-start gap-1">
                      {/* Name */}
                      <span className="text-xs truncate">
                        {isGroupChat
                          ? chat.name ?? "Group"
                          : conversee?.name ?? "Chat"}
                      </span>
                      {/* Time */}
                      <span className="max-lg:hidden text-[10px] text-muted-foreground">
                        {chat.messages && chat.messages.length > 0
                          ? formatNumericDate(
                              chat.messages[chat.messages.length - 1].createdAt
                            )
                          : ""}
                      </span>
                    </div>
                    {/* Message content */}
                    <span className="max-md:hidden max-w-[30%] sm:max-w-[40%] lg:max-w-full text-muted-foreground text-xs">
                      {chat.messages && chat.messages.length > 0
                        ? getMessageString({
                            content:
                              chat.messages[chat.messages.length - 1].content,
                            senderId:
                              chat.messages[chat.messages.length - 1].senderId,
                            userId: user?.id ?? 0,
                            chatterName:
                              chat.messages[chat.messages.length - 1].sender
                                ?.name ?? "Sender",
                          })
                        : "No messages yet"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatList;
