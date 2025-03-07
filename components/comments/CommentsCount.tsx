import { MessageCircle as CommentIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import GreyDiv from "../common/GreyDiv";

interface Props {
  count: number;
  postId: number;
}

const CommentsCount = ({ count, postId }: Props) => {
  return (
    <GreyDiv>
      {/* Comments Button "Links to post page" */}
      <Link
        className="flex flex-row items-center gap-2 px-4 py-2"
        href={`/posts/${postId}`}
      >
        <CommentIcon size={20} aria-label="Comment Icon" />
        {/* Comments Count */}
        <span className="text-sm">{count}</span>
      </Link>
    </GreyDiv>
  );
};

export default CommentsCount;
