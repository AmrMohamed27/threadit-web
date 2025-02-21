import CreatePostForm from "@/components/forms/CreatePostForm";
import React from "react";

const CreatePostPage = () => {
  return (
    <div className="flex flex-col items-start gap-8 w-full">
      <h1 className="text-lg">Create post</h1>
      <CreatePostForm />
    </div>
  );
};

export default CreatePostPage;
