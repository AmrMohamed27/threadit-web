"use client";
import { useGetCommunityByNameQuery } from "@/generated/graphql";
import CommunityHome from "./CommunityHome";

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  const community = data?.getCommunityByName.community;
  if (!community) return <div>{"No community found"}</div>;
  return <CommunityHome community={community} />;
};

export default CommunityGetter;
