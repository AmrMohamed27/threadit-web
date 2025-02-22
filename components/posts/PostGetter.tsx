"use client";
import { useGetPostByIdQuery } from "@/generated/graphql";
import React from "react";
import PostsFeed from "./PostsFeed";
import EditPostForm from "../forms/EditPostForm";

interface Props {
  postId: number;
  isEdit?: boolean;
}

const PostGetter = ({ postId, isEdit }: Props) => {
  const { data, loading, error } = useGetPostByIdQuery({
    variables: {
      id: postId,
    },
  });
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
  return isEdit ? (
    <EditPostForm post={post} />
  ) : (
    <PostsFeed posts={[post]} count={1} />
  );
};

export default PostGetter;
