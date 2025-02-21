// TODO: Add comments to post page
// TODO: Add comment threading
// TODO: Add comment sorting
// TODO: limit post content to 100 words on home page and not on post page
import { Post } from "@/generated/graphql";
import React from "react";
import {
  AvatarFallback,
  AvatarImage,
  Avatar as AvatarContainer,
} from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { timeAgo } from "@/lib/utils";
import PostOptions from "./PostOptions";
import Votes from "./Votes";
import CommentsCount from "./CommentsCount";
import SharePost from "./SharePost";

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
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
  return (
    <div className="flex flex-col gap-2 p-4 border-muted border-t w-full">
      {/* Header */}
      <div className="flex flex-row justify-between items-center w-full">
        {/* Info */}
        <div className="flex flex-row items-center gap-2">
          {/* Image */}
          <AvatarContainer className="w-6 h-6">
            <AvatarImage
              src={author?.image ?? "https://github.com/shadcn.png"}
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
          {/* Date Updated if updatedAt is different from createdAt */}
          {updatedAt !== createdAt && (
            <span className="text-muted-foreground text-xs">
              (Last updated: {timeAgo(updatedAt)})
            </span>
          )}
        </div>
        {/* Options */}
        <PostOptions />
      </div>
      {/* Title */}
      <span className="font-bold text-lg">{title}</span>
      {/* Content */}
      <p className="text-muted-foreground text-sm">{content}</p>
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
