"use client";
import PostsFeedLoading from "@/components/loading/PostsFeedLoading";
import PostsFeed from "@/components/posts/PostsFeed";
import { POSTS_PER_PAGE } from "@/constants";
import { useGetAllPostsQuery } from "@/generated/graphql";
import { useCurrentPage } from "@/hooks/use-current-page";

const Sandbox = () => {
  const { currentPage, sortBy } = useCurrentPage();
  const { data, error } = useGetAllPostsQuery({
    variables: {
      options: {
        limit: POSTS_PER_PAGE,
        page: currentPage,
        sortBy,
      },
    },
  });
  const {
    postsArray: posts,
    count,
    errors,
  } = data?.getAllPosts ?? {
    postsArray: [],
    count: 0,
  };
  const loading = true;
  return (
    <>
      {loading ? (
        <PostsFeedLoading hasPagination />
      ) : errors || !posts || !count ? (
        <div> {errors ? errors[0].message : "An error occurred"}</div>
      ) : error ? (
        <div>Error: {error?.message ?? "An error occurred"}</div>
      ) : (
        <>
          <PostsFeed posts={posts} count={count} hasPagination={true} />
        </>
      )}
    </>
  );
};

export default Sandbox;
