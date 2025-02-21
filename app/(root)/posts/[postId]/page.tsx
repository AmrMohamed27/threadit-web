import PostGetter from "@/components/posts/PostGetter";
import React from "react";

const PostPage = async ({
  params,
}: {
  params: Promise<{ postId: string }>;
}) => {
  const postId = (await params).postId;
  return <PostGetter postId={parseInt(postId)} />;
};

export default PostPage;
