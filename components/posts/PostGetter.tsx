"use client";
import {
  useGetHiddenPostsQuery,
  useGetPostByIdQuery,
} from "@/generated/graphql";
import React from "react";
import PostsFeed from "./PostsFeed";
import EditPostForm from "../forms/EditPostForm";
import HiddenPost from "./HiddenPost";
import CommentForm from "../forms/CommentForm";
import CommentsFeed from "../comments/CommentsFeed";
import CommentGetter from "../comments/CommentGetter";

interface Props {
  postId: number;
  isEdit?: boolean;
  commentId?: number;
}

const PostGetter = ({ postId, isEdit, commentId }: Props) => {
  const { data, loading, error } = useGetPostByIdQuery({
    variables: {
      id: postId,
    },
  });
  const { data: hiddenPosts } = useGetHiddenPostsQuery();

  const hiddenSet = new Set(hiddenPosts?.getHiddenPosts || []);
  if (loading) return <div>Loading...</div>;
  if (data?.getPost.errors)
    return (
      <div>
        {"Error at :" +
          data.getPost.errors[0].field +
          ": " +
          data.getPost.errors[0].message}
      </div>
    );

  if (error) return <div>Error: {error.message}</div>;
  const post = data?.getPost.post;
  if (!post) return <div>Error 404 - No post found</div>;
  if (hiddenSet.has(postId)) {
    return <HiddenPost postId={postId} />;
  }
  return isEdit ? (
    // Render Edit Post Form
    <EditPostForm post={post} />
  ) : commentId ? (
    // Render single comment page
    <div className="flex flex-col gap-4 w-full">
      <PostsFeed posts={[post]} count={1} />
      <CommentGetter commentId={commentId} postId={postId} />
    </div>
  ) : (
    // Render single post page
    <div className="flex flex-col gap-4 w-full">
      <PostsFeed posts={[post]} count={1} />
      <CommentForm postId={postId} />
      <CommentsFeed postId={postId} />
    </div>
  );
};

export default PostGetter;
