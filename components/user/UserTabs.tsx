import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "@/generated/graphql";
import { profileFeeds, userFeeds } from "@/constants";
import { useCurrentPage } from "../../hooks/use-current-page";
import { useCurrentUser } from "@/hooks/use-current-user";

type Props = {
  user: User;
};

const UserTabs = ({ user }: Props) => {
  const { createQueryString, pathname, router } = useCurrentPage();
  const { user: loggedInUser } = useCurrentUser();
  const isProfile = user.id === loggedInUser?.id;
  const handleTabChange = () => {
    router.push(`${pathname}?${createQueryString("page", "1")}`);
  };
  const feed = isProfile ? profileFeeds : userFeeds;
  return (
    <Tabs defaultValue="Posts" className="max-md:hidden w-full">
      <TabsList>
        {feed.map(({ id, value }) => (
          <TabsTrigger key={id} value={value} onClick={handleTabChange}>
            {value}
          </TabsTrigger>
        ))}
      </TabsList>
      {feed.map(({ id, value, component: Component }) => (
        <TabsContent key={id} value={value}>
          <Component user={user} isUpvoted={value === "Upvoted"} />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default UserTabs;
