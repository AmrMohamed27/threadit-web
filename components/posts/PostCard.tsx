import { Post } from "@/generated/graphql";
import React from "react";

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  return (
    <div className="flex flex-col gap-2 p-4 border border-gray-200 rounded-md w-full">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
};

export default PostCard;
