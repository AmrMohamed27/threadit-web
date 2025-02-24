import { useGetPostCommentsQuery } from "@/generated/graphql";
import { useCurrentPage } from "@/hooks/use-current-page";
import React from "react";
import SortBy from "../common/SortBy";
import SearchBar from "../common/SearchBar";
import { MAX_REPLY_DEPTH } from "@/constants";
import CommentThread from "./CommentThread";
import GoBackButton from "../common/GoBackButton";

interface Props {
  postId: number;
}

const CommentsFeed = ({ postId }: Props) => {
  const { sortBy, pathname, searchTerm } = useCurrentPage();
  const { data, loading, error } = useGetPostCommentsQuery({
    variables: {
      options: {
        postId,
        sortBy,
        searchTerm,
      },
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (data?.getPostComments.errors)
    return <div>{data?.getPostComments.errors[0].message}</div>;
  const comments = data?.getPostComments.commentsArray ?? [];
  const count = data?.getPostComments.count ?? 0;

  return (
    <div className="flex flex-col gap-4 mt-4 w-full">
      <div className="flex flex-row items-center gap-4">
        {!searchTerm && <SortBy />}
        <SearchBar origin={pathname} placeholder="Search comments" />
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
    </div>
  );
};

export default CommentsFeed;
