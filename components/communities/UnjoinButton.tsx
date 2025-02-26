import { useLeaveCommunityMutation } from "@/generated/graphql";
import { useToast } from "@/hooks/use-toast";
import React from "react";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";

type Props = {
  communityId: number;
};

const UnjoinButton = (props: Props) => {
  // Destructure props
  const { communityId } = props;
  // Get mutation
  const [leaveCommunityMutation, { loading }] = useLeaveCommunityMutation({
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

  // toast
  const { toast } = useToast();

  const handleLeaveCommunity = async () => {
    const { data, errors } = await leaveCommunityMutation();
    if (errors) {
      console.error(errors);
    }
    if (data?.leaveCommunity.success) {
      toast({
        title: "You have left the community",
        description: "You can not post in this community anymore",
      });
    }
  };
  return (
    <Button variant={"outline"} onClick={handleLeaveCommunity}>
      {loading ? <Loader className="animate-spin" /> : <span>Leave</span>}
    </Button>
  );
};

export default UnjoinButton;
