import React from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { closeChat } from "@/lib/features/chatSlice";
import DeleteChatButton from "./DeleteChatButton";
import { useTypedSelector } from "@/hooks/use-typed-selector";

const ChatControls = () => {
  const dispatch = useDispatch();
  const handleCloseWindow = () => {
    dispatch(closeChat());
  };
  const currentChatId = useTypedSelector((state) => state.chat.currentChatId);
  return (
    <div className="flex flex-row items-center gap-2 py-2 pr-4">
      {/* Delete Chat Button */}
      <DeleteChatButton chatId={currentChatId ?? 0} />
      {/* Close Button */}
      <Button variant={"ghost"} size={"icon"} onClick={handleCloseWindow}>
        <X size={20} />
      </Button>
    </div>
  );
};

export default ChatControls;
