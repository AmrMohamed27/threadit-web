import { useCurrentUser } from "@/hooks/use-current-user";
import { useTypedSelector } from "@/hooks/use-typed-selector";
import CloseChatButton from "./CloseChatButton";
import DeleteChatButton from "./DeleteChatButton";

const ChatControls = () => {
  const currentChatId = useTypedSelector((state) => state.chat.currentChatId);
  const currentChat = useTypedSelector((state) =>
    state.chat.chats.find((chat) => chat.id === currentChatId)
  );
  const { user } = useCurrentUser();
  return (
    <div className="flex flex-row items-center gap-0 py-2 pr-4">
      {/* Delete Chat Button */}
      {user && user.id === currentChat?.creatorId && (
        <DeleteChatButton chatId={currentChatId ?? 0} />
      )}
      {/* Close Button */}
      <CloseChatButton />
    </div>
  );
};

export default ChatControls;
