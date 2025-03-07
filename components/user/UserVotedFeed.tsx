import { POSTS_PER_PAGE } from "@/constants";
import { useGetUserVotedPostsQuery } from "@/generated/graphql";
import { useCurrentPage } from "@/hooks/use-current-page";
import React from "react";
import PostsFeed from "../posts/PostsFeed";
import PostsFeedLoading from "../loading/PostsFeedLoading";

interface Props {
  isUpvoted: boolean;
}

const UserVotedFeed = ({ isUpvoted }: Props) => {
  const { currentPage, sortBy } = useCurrentPage();
  const { data, loading, error } = useGetUserVotedPostsQuery({
    variables: {
      options: {
        limit: POSTS_PER_PAGE,
        page: currentPage,
        sortBy,
        isUpvoted,
      },
    },
  });
  if (loading) return <PostsFeedLoading hasPagination />;
  if (error) return <div> {error.message}</div>;
  if (data?.getUserVotedPosts.errors)
    return <div>{data?.getUserVotedPosts.errors[0].message}</div>;
  const posts = data?.getUserVotedPosts.postsArray ?? [];
  const count = data?.getUserVotedPosts.count ?? 0;
  if (posts.length === 0) return <div>No posts found</div>;
  return <PostsFeed posts={posts} count={count} hasPagination />;
};

export default UserVotedFeed;
