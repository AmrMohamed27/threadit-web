import React from "react";
import CommentThread from "./CommentThread";
import { MAX_REPLY_DEPTH } from "@/constants";
import { useGetCommentQuery } from "@/generated/graphql";
import GoBackButton from "./GoBackButton";

interface Props {
  commentId: number;
  postId: number;
}

const CommentGetter = ({ commentId, postId }: Props) => {
  const { data, loading, error } = useGetCommentQuery({
    variables: {
      options: {
        commentId,
        postId,
      },
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (data?.getComment.errors)
    return <div>{data?.getComment.errors[0].message}</div>;
  const comments = data?.getComment.commentsArray;
  if (!comments || comments.length === 0)
    return <div>Error 404 - No comment found</div>;
  const comment = comments[0];

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="max-w-[90px]">
        <GoBackButton href={`/posts/${postId}`} label="post" />
      </div>
      <CommentThread comment={comment} depth={0} maxDepth={MAX_REPLY_DEPTH} />
    </div>
  );
};

export default CommentGetter;
