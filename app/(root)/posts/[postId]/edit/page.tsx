import PostGetter from "@/components/posts/PostGetter";
import React from "react";

const EditPage = async ({
  params,
}: {
  params: Promise<{ postId: string }>;
}) => {
  const postId = (await params).postId;
  const id = parseInt(postId, 10);
  return <PostGetter postId={id} isEdit />;
};

export default EditPage;
