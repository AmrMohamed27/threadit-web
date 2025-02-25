import React from "react";
import { Button } from "../ui/button";
import { useUnhidePostMutation } from "@/generated/graphql";

interface Props {
  postId: number;
}

const HiddenPost = ({ postId }: Props) => {
  const [unhideMutation] = useUnhidePostMutation();

  const handleUnhide = async () => {
    try {
      const { data } = await unhideMutation({
        variables: {
          postId: postId,
        },
        refetchQueries: [
          "GetHiddenPosts",
          "GetAllPosts",
          "GetPostById",
          "GetUserCommunityPosts",
        ],
      });
      if (!data?.unhidePost?.success) {
        console.error(
          "Error Hiding post: ",
          data?.unhidePost?.errors?.[0]?.message
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-row justify-between items-center bg-muted/40 p-4 rounded-xl w-full">
      <span>Post hidden</span>
      <Button variant={"grey"} onClick={handleUnhide} className="max-w-[100px]">
        Undo
      </Button>
    </div>
  );
};

export default HiddenPost;
