import React from "react";
import SortBy from "../common/SortBy";
import PaginationComponent from "../common/Pagination";
import PostCardLoading from "./PostCardLoading";

interface Props {
  hasPagination?: boolean;
  count?: number;
}

const PostsFeedLoading = ({ hasPagination, count }: Props) => {
  return (
    <div className="flex flex-col items-start gap-8 container">
      {hasPagination && (
        <div className="flex flex-row items-center gap-2 w-full">
          <span className="text-sm">Sort by:</span>
          <SortBy />
        </div>
      )}
      <div className="flex flex-col items-center gap-4 w-full">
        {Array.from({ length: count ?? 3 }).map((post, index) => (
          <div key={index} className={"w-full"}>
            <PostCardLoading />
          </div>
        ))}
      </div>
      {hasPagination && <PaginationComponent totalPages={1} />}
    </div>
  );
};

export default PostsFeedLoading;
