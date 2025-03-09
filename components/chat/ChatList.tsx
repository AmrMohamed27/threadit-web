import {
  cn,
  formatDate,
  getDefaultAvatar,
  getMessageString,
} from "@/lib/utils";
import { MessageCirclePlus as AddChatIcon } from "lucide-react";
import AvatarWrapper from "../common/AvatarWrapper";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Chat } from "@/generated/graphql";
import { ApolloError } from "@apollo/client";
import { useCurrentUser } from "@/hooks/use-current-user";

interface Props {
  handleChatClick: (chatId: number) => void;
  openNewChatWindow: () => void;
  loading: boolean;
  error?: ApolloError;
  chats?: Chat[] | null;
  currentChatId?: number | null;
}

const ChatList = ({
  handleChatClick,
  openNewChatWindow,
  loading,
  chats,
  error,
  currentChatId,
}: Props) => {
  const { user } = useCurrentUser();
  return (
    <div className="flex flex-col gap-0 border-muted border-r-2 max-w-[30%] min-h-full">
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
      {/* List */}
      {error ? (
        <p>An error occurred during fetching chats, {error.message}</p>
      ) : loading ? (
        <Skeleton className="w-full h-full" />
      ) : (
        <div className="flex flex-col gap-2 w-full">
          {chats &&
            chats.map((chat, index) => {
              const isSender = user?.id === chat?.senderId;
              const chatee = isSender ? chat?.receiver : chat?.sender;
              return (
                <div
                  key={chatee?.id ?? index}
                  className={cn(
                    " p-2 cursor-pointer",
                    index === currentChatId
                      ? "bg-muted dark:bg-muted/40"
                      : "hover:bg-muted dark:hover:bg-muted/40"
                  )}
                  onClick={() => handleChatClick(index)}
                >
                  <div className="flex flex-row items-center gap-2">
                    <div className="flex flex-row items-center gap-2">
                      <AvatarWrapper
                        src={
                          chatee?.image ??
                          getDefaultAvatar({
                            name: chatee?.name ?? "Anonymous",
                          })
                        }
                        alt={chatee?.name ?? "Receiver"}
                        className="size-6"
                      />
                      <div className="flex flex-col gap-1">
                        {/* Name and time */}
                        <div className="flex flex-row items-center gap-1">
                          <span className="text-xs truncate">
                            {chat.receiverId === chat.senderId
                              ? "You"
                              : chatee?.name ?? "Receiver"}
                          </span>
                          <span className="max-lg:hidden text-muted-foreground text-xs">
                            {formatDate(
                              chat.messages[chat.messages.length - 1].createdAt
                            )}
                          </span>
                        </div>
                        {/* Message content */}
                        <span className="max-w-[30%] sm:max-w-[40%] lg:max-w-[70%] text-muted-foreground text-xs truncate">
                          {getMessageString({
                            content:
                              chat.messages[chat.messages.length - 1].content,
                            senderId:
                              chat.messages[chat.messages.length - 1].senderId,
                            userId: chat.senderId,
                            chatterName: chatee?.name ?? "Receiver",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default ChatList;
