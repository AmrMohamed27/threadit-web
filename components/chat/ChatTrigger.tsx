import { toggleChat } from "@/lib/features/chatSlice";
import { cn } from "@/lib/utils";
import React from "react";
import { useDispatch } from "react-redux";

type Props = {
  className?: string;
  children?: React.ReactNode;
};

const ChatTrigger = ({ children, className }: Props) => {
  const dispatch = useDispatch();
  const handleToggleChat = () => {
    dispatch(toggleChat());
  };
  return (
    <button className={cn("", className)} onClick={handleToggleChat}>
      {children}
    </button>
  );
};

export default ChatTrigger;
