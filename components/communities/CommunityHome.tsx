import { Community } from "@/generated/graphql";
import CommunityHeader from "./CommunityHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommunityFeed from "./CommunityFeed";
import CommunityAbout from "./CommunityAbout";

type Props = {
  community: Community;
};

const CommunityHome = (props: Props) => {
  // Destructure props
  const { community } = props;
  return (
    <div className="flex flex-col gap-8 px-4 md:px-8 lg:px-12 w-full min-h-screen">
      {/* Header */}
      <CommunityHeader community={community} />
      {/* Feed and about mobile tabs */}
      <Tabs defaultValue="feed" className="lg:hidden w-[400px]">
        <TabsList>
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>
        <TabsContent value="feed">
          <CommunityFeed community={community} />
        </TabsContent>
        <TabsContent value="about">
          <CommunityAbout community={community} />
        </TabsContent>
      </Tabs>
      {/* Feed and about desktop */}
      <div className="hidden relative lg:flex flex-row gap-8">
        <CommunityFeed community={community} />
        <CommunityAbout community={community} />
      </div>
    </div>
  );
};

export default CommunityHome;
