import React from "react";
import { Button } from "../ui/button";
import { MessageCircleMore as ChatIcon } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useDispatch } from "react-redux";
import { useChatManager } from "@/hooks/use-chat-manager";
import { openChat } from "@/lib/features/chatSlice";
import { User } from "@/generated/graphql";

interface Props {
  user?: User | null;
}

const StartChatButton = ({ user }: Props) => {
  const { user: currentUser } = useCurrentUser();
  const dispatch = useDispatch();
  const { chatStarter } = useChatManager();

  const handleStartChat = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const participantIds = currentUser && user ? [currentUser.id, user.id] : [];
    const chatName = user ? user.name : "Chat";
    await chatStarter(participantIds, chatName);
    dispatch(openChat());
  };
  if (!(currentUser && user && user.id !== currentUser.id)) {
    return null;
  }
  return (
    <Button
      className="flex flex-row items-center gap-2 w-auto max-sm:w-9 max-sm:h-9"
      variant={"grey"}
      onClick={handleStartChat}
    >
      <ChatIcon size={20} />
      <span className="max-sm:hidden">Start Chat</span>
    </Button>
  );
};

export default StartChatButton;
