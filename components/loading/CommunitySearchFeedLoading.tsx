import React from "react";
import CommunityCardLoading from "./CommunityCardLoading";
import { Separator } from "../ui/separator";
import PaginationComponent from "../common/Pagination";

type Props = {
  hasPagination?: boolean;
};

const CommunitySearchFeedLoading = (props: Props) => {
  // Destructure props
  const { hasPagination } = props;
  return (
    <div className="flex flex-col gap-2 w-full min-h-screen">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex flex-col gap-2 w-full">
          <CommunityCardLoading />
          <Separator />
        </div>
      ))}
      {hasPagination && <PaginationComponent totalPages={1} />}
    </div>
  );
};

export default CommunitySearchFeedLoading;
