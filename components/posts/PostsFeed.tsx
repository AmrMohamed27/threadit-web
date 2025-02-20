import { POSTS_PER_PAGE } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import PostCard from "./PostCard";
import PaginationComponent from "./Pagination";
import { useCurrentPage } from "@/hooks/use-current-page";
import { Post } from "@/generated/graphql";

interface HomePostsProps {
  posts: Post[];
  count: number;
}

const PostsFeed = ({ posts, count }: HomePostsProps) => {
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
  if (posts.length === 0) return <div>No posts found</div>;
  return (
    <div className="flex flex-col items-center gap-20 container">
      <div className="flex flex-col items-center gap-4 w-full">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <PaginationComponent totalPages={totalPages} />
    </div>
  );
};

export default PostsFeed;
