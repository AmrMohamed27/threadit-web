import { useLeaveCommunityMutation } from "@/generated/graphql";
import { Loader } from "lucide-react";
import { Button } from "../ui/button";

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
      "GetCommunityPosts",
      "GetExploreCommunities",
    ],
  });

  const handleLeaveCommunity = async () => {
    const { errors } = await leaveCommunityMutation();
    if (errors) {
      console.error(errors);
    }
  };
  return (
    <Button variant={"outline"} onClick={handleLeaveCommunity}>
      {loading ? <Loader className="animate-spin" /> : <span>Leave</span>}
    </Button>
  );
};

export default UnjoinButton;
