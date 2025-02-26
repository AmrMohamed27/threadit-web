"use client";

import { useJoinCommunityMutation } from "@/generated/graphql";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";

type Props = {
  communityId: number;
};

const JoinButton = (props: Props) => {
  // Destructure props
  const { communityId } = props;
  // Get mutation
  const [JoinCommunityMutation, { loading }] = useJoinCommunityMutation();

  // toast
  const { toast } = useToast();

  const handleJoinCommunity = async () => {
    const { data, errors } = await JoinCommunityMutation({
      variables: {
        options: {
          communityId,
        },
      },
      refetchQueries: [
        "GetUserCommunities",
        "GetUserCommunityPosts",
        "GetCommunityByName",
      ],
    });
    if (errors) {
      console.error(errors);
    }
    if (data?.joinCommunity.success) {
      toast({
        title: "You have joined the community",
        description: "You can now post in this community",
      });
    }
  };
  return (
    <Button variant={"outline"} onClick={handleJoinCommunity}>
      {loading ? <Loader className="animate-spin" /> : <span>Join</span>}
    </Button>
  );
};

export default JoinButton;
