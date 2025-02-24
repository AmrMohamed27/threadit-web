import { Post } from "@/generated/graphql";
import React from "react";
import {
  AvatarFallback,
  AvatarImage,
  Avatar as AvatarContainer,
} from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { cn, getDefaultAvatar, isArabic, timeAgo } from "@/lib/utils";
import PostOptionsGetter from "./PostOptionsGetter";
import Votes from "./Votes";
import CommentsCount from "./CommentsCount";
import SharePost from "./SharePost";
import { usePathname } from "next/navigation";

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  const pathname = usePathname();

  const isPostPage = pathname.includes("/posts/");
  // Destructure post
  const {
    title,
    content,
    createdAt,
    updatedAt,
    author,
    id: postId,
    commentsCount,
    isUpvoted,
    upvotesCount,
  } = post;

  const isArabicContent = isArabic(content);

  return (
    <div className="flex flex-col gap-2 p-4 border-muted border-t w-full">
      {/* Header */}
      <div className="flex flex-row justify-between items-center w-full">
        {/* Info */}
        <div className="flex md:flex-row flex-col items-center gap-2">
          <div className="flex flex-row items-center gap-2">
            {/* Image */}
            <AvatarContainer className="w-6 h-6">
              <AvatarImage
                src={author?.image ?? getDefaultAvatar({ name: author?.name })}
                alt={`${author?.name ?? "Author"}'s profile picture`}
              />
              <AvatarFallback>
                <Skeleton />
              </AvatarFallback>
            </AvatarContainer>
            {/* Name */}
            <span className="text-xs">{author?.name ?? "Author"}</span>
            {/* Separator */}
            <span className="text-muted-foreground text-xs">•</span>
            {/* Date created */}
            <span className="text-muted-foreground text-xs">
              {timeAgo(createdAt)}
            </span>
          </div>
          {/* Date Updated if updatedAt is different from createdAt */}
          {updatedAt !== createdAt && (
            <span className="hidden md:block text-muted-foreground text-xs">
              (Last updated: {timeAgo(updatedAt)})
            </span>
          )}
        </div>
        {/* Options */}
        <PostOptionsGetter authorId={author?.id ?? 0} postId={postId} />
      </div>
      {/* Title */}
      <span className="font-bold text-lg" dir={isArabicContent ? "rtl" : "ltr"}>
        {title}
      </span>
      {/* Content */}
      {/* Clip content to a constant number of words when not on post page */}
      <div dir={isArabicContent ? "rtl" : "ltr"}>
        {
          <p
            className={cn(
              "text-muted-foreground text-sm",
              !isPostPage ? "line-clamp-3 lg:line-clamp-4" : ""
            )}
          >
            {content}
          </p>
        }
      </div>
      {/* Interactions */}
      <div className="flex flex-row items-center gap-4">
        <Votes
          upvotesCount={upvotesCount ?? 0}
          isUpvoted={isUpvoted}
          postId={postId}
        />
        <CommentsCount count={commentsCount ?? 0} postId={postId} />
        <SharePost postId={postId} />
      </div>
    </div>
  );
};

export default PostCard;
