import { useDeleteChatMutation } from "@/generated/graphql";
import React from "react";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";

type Props = {
  chatId: number;
};

const DeleteChatButton = ({ chatId }: Props) => {
  const [deleteChatMutation, { loading }] = useDeleteChatMutation({
    variables: {
      chatId,
    },
    refetchQueries: ["GetUserChats"],
  });
  return (
    <Button
      variant={"red"}
      onClick={async () => await deleteChatMutation()}
      className="w-auto text-xs"
      size={"sm"}
    >
      {loading ? <Loader className="animate-spin" /> : "Delete"}
    </Button>
  );
};

export default DeleteChatButton;
