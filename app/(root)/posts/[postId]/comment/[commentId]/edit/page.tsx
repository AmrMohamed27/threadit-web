import CommentGetter from "@/components/comments/CommentGetter";
import React from "react";

const CommentEditPage = async ({
  params,
}: {
  params: Promise<{ postId: string; commentId: string }>;
}) => {
  const postId = parseInt((await params).postId);
  const commentId = parseInt((await params).commentId);
  return <CommentGetter commentId={commentId} postId={postId} isEdit />;
};

export default CommentEditPage;
