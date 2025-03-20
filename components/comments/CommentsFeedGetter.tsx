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
  const { data, loading, error, refetch } = useGetPostCommentsQuery({
    variables: {
      options: {
        postId,
        sortBy,
        searchTerm,
      },
    },
  });

  const refetchPostComments = async () => {
    await refetch({
      options: {
        postId,
        sortBy,
      },
    });
  };

  if (loading) return <CommentFeedLoading />;
  if (error) return <div>{error.message}</div>;
  const comments = data?.getPostComments.commentsArray ?? [];
  const count = data?.getPostComments.count ?? 0;
  if (comments.length === 0)
    return searchTerm ? (
      <CommentsFeed
        comments={comments}
        count={0}
        searchTerm={searchTerm}
        refetchPostComments={refetchPostComments}
      />
    ) : null;
  if (data?.getPostComments.errors)
    return <div>{data?.getPostComments.errors[0].message}</div>;
  return (
    <CommentsFeed
      comments={comments}
      count={count}
      searchTerm={searchTerm}
      refetchPostComments={refetchPostComments}
    />
  );
};

export default CommentsFeedGetter;
