  "use client";
  import { useChatManager } from "@/hooks/use-chat-manager";
  import { useTypedSelector } from "@/hooks/use-typed-selector";
  import ChatList from "./ChatList";
  import ChatWindow from "./ChatWindow";

  const ChatComponent = () => {
    // Get the chat's open state from the store
    const isOpen = useTypedSelector((state) => state.chat.isOpen);

    // Use our custom hook for chat management
    const {
      chats,
      currentChat,
      currentChatId,
      chatParticipants,
      isLoading,
      error,
      newChatIsOpen,
      handleChatClick,
      openNewChatWindow,
      closeNewChatWindow,
    } = useChatManager();

    // Don't render if chat is closed
    if (!isOpen) return null;

    return (
      <div className="right-0 md:right-4 bottom-0 z-50 fixed bg-background dark:bg-black shadow-lg border-[0.5px] border-muted-foreground/20 rounded-t-xl w-full md:w-[500px] lg:w-[800px] max-sm:min-h-screen">
        <div className="flex sm:flex-row flex-col gap-0 w-full sm:h-[500px]">
          <ChatList
            handleChatClick={handleChatClick}
            openNewChatWindow={openNewChatWindow}
            loading={isLoading}
            chats={chats}
            error={error}
            currentChatId={currentChatId}
            participants={chatParticipants}
          />
          <ChatWindow
            chat={currentChat}
            newChatIsOpen={newChatIsOpen}
            closeNewChatWindow={closeNewChatWindow}
            participants={chatParticipants[currentChatId ?? 0]}
          />
        </div>
      </div>
    );
  };

  export default ChatComponent;
