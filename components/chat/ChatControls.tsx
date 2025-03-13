import React from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { closeChat } from "@/lib/features/chatSlice";
import DeleteChatButton from "./DeleteChatButton";
import { useTypedSelector } from "@/hooks/use-typed-selector";
import { useCurrentUser } from "@/hooks/use-current-user";

const ChatControls = () => {
  const dispatch = useDispatch();
  const handleCloseWindow = () => {
    dispatch(closeChat());
  };
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
      <Button variant={"ghost"} size={"icon"} onClick={handleCloseWindow}>
        <X size={20} />
      </Button>
    </div>
  );
};

export default ChatControls;
