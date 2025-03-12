"use client";
import { Chat, UserResponse } from "@/generated/graphql";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  cn,
  formatDate,
  getDefaultAvatar,
  getMessageString,
} from "@/lib/utils";
import { ApolloError } from "@apollo/client";
import { MessageCirclePlus as AddChatIcon } from "lucide-react";
import AvatarWrapper from "../common/AvatarWrapper";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

interface Props {
  handleChatClick: (chatId: number) => void;
  openNewChatWindow: () => void;
  loading: boolean;
  error?: ApolloError;
  chats: Chat[];
  currentChatId?: number | null;
  participants: Record<number, UserResponse>;
}

const ChatList = ({
  handleChatClick,
  openNewChatWindow,
  loading,
  chats,
  error,
  currentChatId,
  participants,
}: Props) => {
  const { user } = useCurrentUser();

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
    <div className="flex flex-col gap-0 border-muted sm:border-r-2 max-sm:border-b-2 sm:w-[200px] sm:max-w-[30%] sm:min-h-full">
      {/* Header */}
      <div className="flex flex-row justify-between items-center p-4 w-full">
        <span className="font-bold text-lg">Chats</span>
        <Button
          size={"icon"}
          variant={"ghost"}
          className="hover:bg-transparent rounded-full"
          onClick={openNewChatWindow}
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
                  <div className="flex flex-col gap-1">
                    {/* Name and time */}
                    <div className="flex flex-row items-center gap-1">
                      <span className="text-xs truncate">
                        {isGroupChat
                          ? chat.name ?? "Group"
                          : conversee?.name ?? "Chat"}
                      </span>
                      <span className="max-lg:hidden text-muted-foreground text-xs">
                        {chat.messages && chat.messages.length > 0
                          ? formatDate(
                              chat.messages[chat.messages.length - 1].createdAt
                            )
                          : ""}
                      </span>
                    </div>
                    {/* Message content */}
                    <span className="max-w-[30%] sm:max-w-[40%] lg:max-w-[70%] text-muted-foreground text-xs truncate">
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
