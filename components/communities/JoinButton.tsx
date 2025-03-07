"use client";

import { useJoinCommunityMutation } from "@/generated/graphql";
import { Loader } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
  communityId: number;
};

const JoinButton = (props: Props) => {
  // Destructure props
  const { communityId } = props;
  // Get mutation
  const [JoinCommunityMutation, { loading }] = useJoinCommunityMutation();

  const handleJoinCommunity = async () => {
    const { errors } = await JoinCommunityMutation({
      variables: {
        options: {
          communityId,
        },
      },
      refetchQueries: [
        "GetUserCommunities",
        "GetUserCommunityPosts",
        "GetCommunityByName",
        "GetExploreCommunities",
        "GetCommunityPosts",
      ],
    });
    if (errors) {
      console.error(errors);
    }
  };
  return (
    <Button variant={"outline"} onClick={handleJoinCommunity}>
      {loading ? <Loader className="animate-spin" /> : <span>Join</span>}
    </Button>
  );
};

export default JoinButton;
