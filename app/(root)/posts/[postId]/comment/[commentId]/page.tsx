import PostGetter from "@/components/posts/PostGetter";
import React from "react";

const CommentPage = async ({
  params,
}: {
  params: Promise<{ postId: string; commentId: string }>;
}) => {
  const postId = (await params).postId;
  const commentId = (await params).commentId;
  return (
    <PostGetter postId={parseInt(postId)} commentId={parseInt(commentId)} />
  );
};

export default CommentPage;
