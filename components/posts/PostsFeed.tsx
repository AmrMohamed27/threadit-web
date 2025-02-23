import { POSTS_PER_PAGE } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import PostCard from "./PostCard";
import PaginationComponent from "./Pagination";
import { useCurrentPage } from "@/hooks/use-current-page";
import { Post } from "@/generated/graphql";
import { cn } from "@/lib/utils";
import SortBy from "./SortBy";

interface HomePostsProps {
  posts: Post[];
  count: number;
  hasPagination?: boolean;
}

const PostsFeed = ({ posts, count, hasPagination }: HomePostsProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const totalPages = Math.ceil(count / POSTS_PER_PAGE);
  const { currentPage, createQueryString } = useCurrentPage();
  // Edge Cases for current page
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      router.push(
        pathname + "?" + createQueryString("page", totalPages.toString())
      );
    } else if (currentPage < 1 || Number.isNaN(currentPage)) {
      router.push(pathname + "?" + createQueryString("page", "1"));
    }
  }, [createQueryString, currentPage, totalPages, router, pathname]);
  const handlePostClick = (
    e: React.MouseEvent<HTMLDivElement>,
    postId: number
  ) => {
    // Prevent navigation if a button or interactive element is clicked
    const isInteractive =
      e.target instanceof HTMLElement &&
      (e.target.closest("button") || e.target.closest("a"));

    if (!isInteractive) {
      router.push(`/posts/${postId}`);
    }
  };
  return (
    <div className="flex flex-col items-start gap-8 container">
      {hasPagination && <SortBy />}
      <div className="flex flex-col items-center gap-4 w-full">
        {posts.map((post) => (
          <div
            key={post.id}
            onClick={(e) => {
              if (hasPagination) {
                handlePostClick(e, post.id);
              }
            }}
            className={cn("w-full", hasPagination ? "cursor-pointer" : "")}
          >
            <PostCard post={post} />
          </div>
        ))}
      </div>
      {hasPagination && <PaginationComponent totalPages={totalPages} />}
    </div>
  );
};

export default PostsFeed;
