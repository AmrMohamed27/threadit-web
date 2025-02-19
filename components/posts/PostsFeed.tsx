"use client";
import {
  useGetAllPostsQuery,
  useGetPostsCountQuery,
} from "@/generated/graphql";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import PostCard from "./PostCard";
import PaginationComponent from "./Pagination";
import { POSTS_PER_PAGE } from "@/constants";
import { createQueryStringFn } from "@/lib/utils";

const PostsFeed = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page") as string)
    : 1;
  const createQueryString = useCallback(
    (name: string, value: string) => {
      return createQueryStringFn(name, value, searchParams);
    },
    [searchParams]
  );
  const {
    data: countResult,
    loading: countLoading,
    error: countError,
  } = useGetPostsCountQuery();
  const count = countResult?.getPostsCount;
  const totalPages = Math.ceil((count ?? -1) / POSTS_PER_PAGE);
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      router.push(
        pathname + "?" + createQueryString("page", totalPages.toString())
      );
    } else if (currentPage < 1 || Number.isNaN(currentPage)) {
      router.push(pathname + "?" + createQueryString("page", "1"));
    }
  }, [createQueryString, currentPage, totalPages, router, pathname]);
  const { data, loading, error } = useGetAllPostsQuery({
    variables: {
      options: {
        limit: POSTS_PER_PAGE,
        page: currentPage,
      },
    },
  });
  const posts = data?.getAllPosts.postsArray;
  if (loading || countLoading) return <div>Loading...</div>;
  if (typeof count === "undefined" || countError) {
    return <div>Count Error</div>;
  }
  if (error) return <div>Error: {error.message}</div>;
  if (!posts) return <div>No posts found</div>;
  return (
    <div className="flex flex-col items-center gap-4 container">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      <PaginationComponent totalPages={totalPages} />
    </div>
  );
};

export default PostsFeed;
