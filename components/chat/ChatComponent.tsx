"use client";
import { useTypedSelector } from "@/hooks/use-typed-selector";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import { useChatManager } from "@/hooks/use-chat-manager";
import NewChatWindow from "./NewChatWindow";

const ChatComponent = () => {
  // Get the chat's open state from the store
  const isOpen = useTypedSelector((state) => state.chat.isOpen);
  const { openNewChatWindow, newChatIsOpen, closeNewChatWindow } =
    useChatManager();
  // Don't render if chat is closed
  if (!isOpen) return null;

  return (
    <div className="right-0 md:right-4 bottom-0 z-50 fixed bg-background dark:bg-black shadow-lg border-[0.5px] border-muted-foreground/20 rounded-t-xl w-full md:w-[500px] lg:w-[800px]">
      <div className="flex sm:flex-row gap-0 w-full h-[500px]">
        <ChatList openNewChatWindow={openNewChatWindow} />
        {newChatIsOpen ? (
          <NewChatWindow closeNewChatWindow={closeNewChatWindow} />
        ) : (
          <ChatWindow />
        )}
      </div>
    </div>
  );
};

export default ChatComponent;
