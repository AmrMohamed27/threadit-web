"use client";
import { useGetCommunityByNameQuery } from "@/generated/graphql";
import CommunityHome from "./CommunityHome";
import { Skeleton } from "../ui/skeleton";

type Props = {
  name: string;
};

const CommunityGetter = (props: Props) => {
  // Destructure props
  const { name } = props;
  const { data, loading, error } = useGetCommunityByNameQuery({
    variables: {
      name,
    },
    fetchPolicy: "no-cache",
  });

  if (loading)
    return (
      <div className="flex flex-col items-start gap-8 w-full">
        <Skeleton className="w-full h-96" />
      </div>
    );
  if (error) return <div>{error.message}</div>;
  const community = data?.getCommunityByName.community;
  if (!community) return <div>{"No community found"}</div>;
  return <CommunityHome community={community} />;
};

export default CommunityGetter;
