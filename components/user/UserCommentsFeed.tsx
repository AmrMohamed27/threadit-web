import { useGetUserCommentsQuery, User } from "@/generated/graphql";
import { useCurrentPage } from "@/hooks/use-current-page";
import React from "react";
import CommentsFeed from "../comments/CommentsFeed";
import { POSTS_PER_PAGE } from "@/constants";
import CommentFeedLoading from "../loading/CommentFeedLoading";

type Props = {
  user: User;
};

const UserCommentsFeed = ({ user }: Props) => {
  // Destructure user
  const { id: userId } = user;
  // Get current page
  const { currentPage, sortBy } = useCurrentPage();
  // Get comments from the user
  const { data, loading, error } = useGetUserCommentsQuery({
    variables: {
      options: {
        userId,
        limit: POSTS_PER_PAGE,
        page: currentPage,
        sortBy,
      },
    },
  });
  if (loading) return <CommentFeedLoading />;
  if (error) return <div> {error.message}</div>;
  if (data?.getUserComments.errors)
    return <div> {data?.getUserComments.errors[0].message}</div>;
  const comments = data?.getUserComments.commentsArray ?? [];
  const count = data?.getUserComments.count ?? 0;
  if (comments.length === 0) return <div>No comments found</div>;
  return (
    <CommentsFeed comments={comments} count={count} hasPagination={true} />
  );
};

export default UserCommentsFeed;
