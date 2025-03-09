import React from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { closeChat } from "@/lib/features/chatSlice";

const ChatControls = () => {
  const dispatch = useDispatch();
  const handleCloseWindow = () => {
    dispatch(closeChat());
  };
  return (
    <div className="flex flex-row items-center gap-2 py-2 pr-4">
      {/* Close Button */}
      <Button variant={"ghost"} size={"icon"} onClick={handleCloseWindow}>
        <X size={20} />
      </Button>
    </div>
  );
};

export default ChatControls;
