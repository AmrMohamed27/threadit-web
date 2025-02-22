import PostGetter from "@/components/posts/PostGetter";
import React from "react";

const EditPage = async ({
  params,
}: {
  params: Promise<{ postId: string }>;
}) => {
  const postId = (await params).postId;
  const id = parseInt(postId, 10);
  return (
    <div className="flex flex-col items-start gap-8 w-full">
      <h1 className="text-lg">Edit post</h1>
      <PostGetter postId={id} isEdit />
    </div>
  );
};

export default EditPage;
