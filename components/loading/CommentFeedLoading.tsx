import React from "react";
import SortBy from "../common/SortBy";
import SearchBar from "../common/SearchBar";
import { usePathname } from "next/navigation";
import CommentCardLoading from "./CommentCardLoading";

const CommentFeedLoading = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-4 mt-4 w-full">
      <div className="flex flex-row items-center gap-4">
        <SortBy />
        <SearchBar origin={pathname} placeholder="Search comments" />
      </div>
      <div className="flex flex-col gap-0">
        <CommentCardLoading />
      </div>
    </div>
  );
};

export default CommentFeedLoading;
