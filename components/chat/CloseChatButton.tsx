import { closeChat } from "@/lib/features/chatSlice";
import { X } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";

const CloseChatButton = () => {
  const dispatch = useDispatch();
  const handleCloseWindow = () => {
    dispatch(closeChat());
  };

  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      onClick={handleCloseWindow}
      aria-label="Close Chat Button"
    >
      <X size={20} />
    </Button>
  );
};

export default CloseChatButton;
