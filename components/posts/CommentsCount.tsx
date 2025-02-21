import { MessageCircle as CommentIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  count: number;
  postId: number;
}

const CommentsCount = ({ count, postId }: Props) => {
  return (
    <div className="bg-muted hover:bg-muted-foreground/30 rounded-full">
      {/* Comments Button "Links to post page" */}
      <Link
        className="flex flex-row items-center gap-2 px-4 py-2"
        href={`/post/${postId}`}
      >
        <CommentIcon size={20} aria-label="Comment Icon" />
        {/* Comments Count */}
        <span className="text-sm">{count}</span>
      </Link>
    </div>
  );
};

export default CommentsCount;
