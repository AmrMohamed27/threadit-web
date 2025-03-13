import { useDeleteChatMutation } from "@/generated/graphql";
import React from "react";
import { Button } from "../ui/button";
import { Loader, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Props = {
  chatId: number;
};

const DeleteChatButton = ({ chatId }: Props) => {
  const [deleteChatMutation, { loading }] = useDeleteChatMutation({
    variables: {
      chatId,
    },
    // refetchQueries: ["GetUserChats", "GetChatParticipants"],
  });
  const { toast } = useToast();
  const handleDeleteChat = async () => {
    await deleteChatMutation();
    toast({
      title: "Deleted Chat",
      description: `Deleted Chat with id ${chatId}`,
    });
  };
  return (
    <Button
      onClick={handleDeleteChat}
      className="text-theme-red hover:text-theme-red"
      size={"icon"}
      variant={"ghost"}
    >
      {loading ? <Loader className="animate-spin" /> : <Trash size={16} />}
    </Button>
  );
};

export default DeleteChatButton;
