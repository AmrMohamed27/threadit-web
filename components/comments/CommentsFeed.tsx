import { Comment } from "@/generated/graphql";
import { useCurrentPage } from "@/hooks/use-current-page";
import React from "react";
import SortBy from "../common/SortBy";
import SearchBar from "../navbar/SearchBar";
import { MAX_REPLY_DEPTH } from "@/constants";
import CommentThread from "./CommentThread";
import GoBackButton from "../common/GoBackButton";
import PaginationComponent from "../common/Pagination";
import { cn } from "@/lib/utils";

interface Props {
  comments: Comment[];
  count: number;
  hasPagination?: boolean;
  searchTerm?: string;
}

const CommentsFeed = ({
  comments,
  count,
  hasPagination,
  searchTerm,
}: Props) => {
  const { pathname } = useCurrentPage();
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-row items-center gap-4">
        {!searchTerm && (
          <div className={cn("flex flex-row items-center gap-2 text-sm w-40")}>
            <span>Sort by:</span>
            <SortBy />
          </div>
        )}
        {!hasPagination && (
          <SearchBar origin={pathname} placeholder="Search comments" />
        )}
      </div>
      {searchTerm && <GoBackButton href={pathname} label="all comments" />}
      {searchTerm && <span>{count} results found</span>}
      <div className="flex flex-col gap-0">
        {comments.map((comment) => (
          <CommentThread
            key={comment.id}
            comment={comment}
            maxDepth={MAX_REPLY_DEPTH}
          />
        ))}
      </div>
      {hasPagination && (
        <PaginationComponent totalPages={Math.ceil(count / 5)} />
      )}
    </div>
  );
};

export default CommentsFeed;
