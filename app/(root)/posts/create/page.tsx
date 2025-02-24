"use client";
import CreatePostForm from "@/components/forms/CreatePostForm";
import { useGetUserCommunitiesQuery } from "@/generated/graphql";

const CreatePostPage = () => {
  const { data, loading, error } = useGetUserCommunitiesQuery();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (data?.getUserCommunities.errors)
    return (
      <div>
        {data?.getUserCommunities.errors[0].message ??
          "Error fetching communities"}
      </div>
    );
  const communities = data?.getUserCommunities.communitiesArray;
  if (!communities || communities.length === 0)
    return <div>{"No communities"}</div>;
  return (
    <div className="flex flex-col items-start gap-8 w-full">
      <h1 className="text-lg">Create post</h1>
      <CreatePostForm communities={communities} />
    </div>
  );
};

export default CreatePostPage;
