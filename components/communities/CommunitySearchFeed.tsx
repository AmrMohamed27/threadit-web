import { Community } from "@/generated/graphql";
import React from "react";
import CommunityCard from "./CommunityCard";
import { Separator } from "../ui/separator";
import PaginationComponent from "../common/Pagination";
import { POSTS_PER_PAGE } from "@/constants";

type Props = {
  communities: Community[];
  count: number;
  hasPagination?: boolean;
};

const CommunitySearchFeed = (props: Props) => {
  // Destructure props
  const { communities, count, hasPagination } = props;
  return (
    <div className="flex flex-col gap-2 w-full min-h-screen">
      {communities.map((community) => (
        <div key={community.id} className="flex flex-col gap-2 w-full">
          <CommunityCard community={community} />
          <Separator />
        </div>
      ))}
      {hasPagination && (
        <PaginationComponent totalPages={Math.ceil(count / POSTS_PER_PAGE)} />
      )}
    </div>
  );
};

export default CommunitySearchFeed;
