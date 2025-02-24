import CommentGetter from "@/components/comments/CommentGetter";
import React from "react";

const CommentEditPage = async ({
  params,
}: {
  params: Promise<{ postId: string; commentId: string }>;
}) => {
  const postId = parseInt((await params).postId);
  const commentId = parseInt((await params).commentId);
  return (
    <div className="flex flex-col items-start gap-8 w-full">
      <h1 className="text-lg">Edit comment</h1>
      <CommentGetter commentId={commentId} postId={postId} isEdit />
    </div>
  );
};

export default CommentEditPage;
