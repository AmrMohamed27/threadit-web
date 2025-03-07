import { POSTS_PER_PAGE } from "@/constants";
import { useGetUserPostsQuery, User } from "@/generated/graphql";
import { useCurrentPage } from "@/hooks/use-current-page";
import React from "react";
import PostsFeed from "../posts/PostsFeed";
import PostsFeedLoading from "../loading/PostsFeedLoading";

type Props = {
  user: User;
};

const UserPostsFeed = ({ user }: Props) => {
  // Destructure user
  const { id: userId } = user;
  const { currentPage, sortBy } = useCurrentPage();
  const { data, loading, error } = useGetUserPostsQuery({
    variables: {
      options: {
        limit: POSTS_PER_PAGE,
        page: currentPage,
        sortBy,
        userId,
      },
    },
  });
  if (loading) return <PostsFeedLoading hasPagination />;
  if (error) return <div> {error.message}</div>;
  if (data?.getUserPosts.errors)
    return <div> {data?.getUserPosts.errors[0].message}</div>;
  const posts = data?.getUserPosts.postsArray ?? [];
  const count = data?.getUserPosts.count ?? 0;
  if (posts.length === 0) return <div>No posts found</div>;
  return <PostsFeed posts={posts} count={count} hasPagination />;
};

export default UserPostsFeed;
