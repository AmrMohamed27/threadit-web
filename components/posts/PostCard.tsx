import { Post } from "@/generated/graphql";
import { cn, getDefaultAvatar, isArabic, timeAgo } from "@/lib/utils";
import { usePathname } from "next/navigation";
import CommentsCount from "../comments/CommentsCount";
import AvatarWrapper from "../common/AvatarWrapper";
import ShareButton from "../common/ShareButton";
import Votes from "../common/Votes";
import PostOptionsGetter from "./PostOptionsGetter";
import Link from "next/link";

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
    community,
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
            {/* Community Image */}
            <Link href={`/c/${community?.name ?? ""}`}>
              <AvatarWrapper
                src={
                  community?.image ??
                  getDefaultAvatar({ name: community?.name ?? "Community" })
                }
                alt={`${community?.name ?? "Community"}'s profile picture`}
                className="w-6 h-6"
              />
            </Link>
            {/* Names */}
            <div className="flex flex-col items-start gap-1">
              <div className="flex flex-row items-center gap-2">
                {/* Community Name */}
                <Link
                  className="font-semibold text-xs"
                  href={`/c/${community?.name ?? ""}`}
                >
                  c/{community?.name ?? "Community"}
                </Link>
                {/* Separator */}
                <span className="text-muted-foreground text-xs">•</span>
                {/* Date created */}
                <span className="text-muted-foreground text-xs">
                  {timeAgo(createdAt)}
                </span>
                {/* Date Updated if updatedAt is different from createdAt */}
                {updatedAt !== createdAt && (
                  <span className="hidden md:block text-muted-foreground text-xs">
                    (Last updated: {timeAgo(updatedAt)})
                  </span>
                )}
              </div>
              {/* Author Name */}
              <Link
                href={`/users/${author?.name ?? "#"}`}
                className="text-muted-foreground text-xs"
              >
                {author?.name ?? "Author"}
              </Link>
            </div>
          </div>
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
        <ShareButton postId={postId} />
      </div>
    </div>
  );
};

export default PostCard;
