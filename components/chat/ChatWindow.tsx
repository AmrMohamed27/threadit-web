import { Chat } from "@/generated/graphql";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getDefaultAvatar, timeAgo } from "@/lib/utils";
import Image from "next/image";
import { useRef } from "react";
import AvatarWrapper from "../common/AvatarWrapper";
import CreateMessageForm from "../forms/CreateMessageForm";
import ChatControls from "./ChatControls";
import NewChatWindow from "./NewChatWindow";

interface Props {
  chat?: Chat | null;
  newChatIsOpen: boolean;
  closeNewChatWindow: () => void;
}

const ChatWindow = ({ chat, newChatIsOpen, closeNewChatWindow }: Props) => {
  const { user } = useCurrentUser();
  const isSender = user?.id === chat?.senderId;
  const chatee = isSender ? chat?.receiver : chat?.sender;

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  if (!chat || !chatee) return <div></div>;
  return (
    <div
      className="relative flex flex-col flex-1 gap-0 overflow-y-scroll"
      ref={chatContainerRef}
    >
      {newChatIsOpen ? (
        // New chat window
        <NewChatWindow closeNewChatWindow={closeNewChatWindow} />
      ) : (
        <>
          {/* Header */}
          <div className="top-0 z-50 sticky flex flex-row justify-between items-center bg-background dark:bg-black px-4 py-2 border-muted border-b-2 w-ful">
            <div className="flex flex-row flex-1 items-center gap-4">
              {/* Image */}
              <AvatarWrapper
                src={chatee.image ?? getDefaultAvatar({ name: chatee.name })}
                alt={chatee.name ?? "Receiver"}
                className="size-8"
              />
              {/* Chatter name */}
              <span className="font-semibold text-muted-foreground">
                {chatee.name === user?.name ? "You" : chatee.name}
              </span>
            </div>
            {/* Controls */}
            <ChatControls />
          </div>
          {/* Chat Body */}
          <div className="flex flex-col flex-1 items-center gap-4 w-full">
            {/* Messages */}
            <div className="flex flex-col items-start gap-4 px-4 py-2 w-full">
              {chat?.messages &&
                chat.messages.map((message) => (
                  <div
                    key={message.id}
                    className="flex flex-col items-start gap-1"
                  >
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
                      <div className="flex flex-row items-center gap-1">
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
                            <span className="text-muted-foreground text-xs">{`(Edited: ${timeAgo(
                              message.updatedAt
                            )})`}</span>
                          )}
                        </span>
                      </div>
                    </div>
                    {/* Message */}
                    <p className="pl-10 text-muted-foreground">
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
                ))}
            </div>
            {/* Input */}
          </div>
          <CreateMessageForm receiverId={chat?.receiverId ?? 0} />
        </>
      )}
    </div>
  );
};

export default ChatWindow;
