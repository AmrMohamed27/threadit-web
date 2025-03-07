import CreateCommunityForm from "@/components/forms/CreateCommunityForm";
import React from "react";

const CreateCommunityPage = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="font-bold text-lg">Create a Community</h1>
      <CreateCommunityForm />
    </div>
  );
};

export default CreateCommunityPage;
