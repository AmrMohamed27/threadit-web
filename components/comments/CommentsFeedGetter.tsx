"use client";

import { useGetPostCommentsQuery } from "@/generated/graphql";
import { useCurrentPage } from "@/hooks/use-current-page";
import CommentFeedLoading from "../loading/CommentFeedLoading";
import CommentsFeed from "./CommentsFeed";

type Props = {
  postId: number;
};

const CommentsFeedGetter = ({ postId }: Props) => {
  const { sortBy, searchTerm } = useCurrentPage();
  const { data, loading, error } = useGetPostCommentsQuery({
    variables: {
      options: {
        postId,
        sortBy,
        searchTerm,
      },
    },
  });

  if (loading) return <CommentFeedLoading />;
  if (error) return <div>{error.message}</div>;
  const comments = data?.getPostComments.commentsArray ?? [];
  const count = data?.getPostComments.count ?? 0;
  if (comments.length === 0) return <></>;
  if (data?.getPostComments.errors)
    return <div>{data?.getPostComments.errors[0].message}</div>;
  return (
    <CommentsFeed comments={comments} count={count} searchTerm={searchTerm} />
  );
};

export default CommentsFeedGetter;
