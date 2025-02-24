"use client";
import React from "react";
import {
  loggedOutUserCommentOptionsDropdown,
  userCommentOptionsDropdown,
} from "@/constants";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useDeleteCommentMutation } from "@/generated/graphql";
import { useToast } from "@/hooks/use-toast";
import OptionsUI from "./OptionsUI";
import { useRouter } from "next/navigation";
import { CommentOptions, PostOptions } from "@/types";

interface Props {
  authorId: number;
  commentId: number;
  postId: number;
}

const CommentOptionsGetter = ({ authorId, commentId, postId }: Props) => {
  // Get current user
  const { user } = useCurrentUser();
  // Toast
  const { toast } = useToast();
  // Get options  depending on if the user is logged in, and if they are the author of the post, and the state of the post if it is saved or hidden
  const options: CommentOptions[] = user
    ? user.id === authorId
      ? userCommentOptionsDropdown
      : loggedOutUserCommentOptionsDropdown
    : loggedOutUserCommentOptionsDropdown;

  const router = useRouter();
  const [deleteCommentMutation] = useDeleteCommentMutation();

  const handleDeleteComment = async () => {
    const { data } = await deleteCommentMutation({
      variables: {
        id: commentId,
      },
      refetchQueries: [
        "GetAllPosts",
        "GetPostById",
        "GetPostComments",
        "GetComment",
        "GetUserComments",
      ],
    });
    if (data?.deleteComment.success) {
      toast({
        title: "Comment deleted successfully!",
      });
      router.push(`/posts/${postId}`);
    } else if (data?.deleteComment.errors) {
      toast({
        title: "Error deleting post",
        description: data.deleteComment.errors[0].message,
        variant: "destructive",
      });
    }
  };
  return (
    <OptionsUI
      options={options as CommentOptions[] & PostOptions[]}
      commentId={commentId}
      postId={postId}
      handleDelete={handleDeleteComment}
    />
  );
};

export default CommentOptionsGetter;
