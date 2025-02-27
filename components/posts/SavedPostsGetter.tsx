"use client";
import ProtectRoute from "@/components/auth/ProtectRoute";
import PostsFeedLoading from "@/components/loading/PostsFeedLoading";
import PostsFeed from "@/components/posts/PostsFeed";
import { POSTS_PER_PAGE } from "@/constants";
import { useGetSavedPostsQuery } from "@/generated/graphql";
import { useCurrentPage } from "@/hooks/use-current-page";
import React from "react";

const SavedPostsGetter = () => {
  const { currentPage, sortBy } = useCurrentPage();
  const { data, loading, error } = useGetSavedPostsQuery({
    variables: {
      options: {
        page: currentPage,
        limit: POSTS_PER_PAGE,
        sortBy,
      },
    },
  });

  if (loading) return <PostsFeedLoading hasPagination />;
  if (error) return <div>{error.message}</div>;
  if (data?.getSavedPosts.errors)
    return <div>{data?.getSavedPosts.errors[0].message}</div>;
  const posts = data?.getSavedPosts.postsArray ?? [];
  const count = data?.getSavedPosts.count ?? 0;
  return (
    <ProtectRoute>
      <PostsFeed posts={posts} count={count} hasPagination />
    </ProtectRoute>
  );
};

export default SavedPostsGetter;
