import React from "react";
import { Skeleton } from "../ui/skeleton";

const PostCardLoading = () => {
  return (
    <div className="flex flex-col gap-4 p-4 border-muted border-t w-full">
      {/* Header */}
      <div className="flex flex-row justify-between items-center w-full">
        {/* Info */}
        <div className="flex md:flex-row flex-col items-center gap-2">
          <div className="flex flex-row items-center gap-2">
            {/* Community Image */}
            <Skeleton className="rounded-full w-6 h-6" />
            {/* Names */}
            <div className="flex flex-col items-start gap-1">
              <div className="flex flex-row items-center gap-2">
                {/* Community Name */}
                <Skeleton className="w-8 h-2" />
                {/* Date created */}
                <Skeleton className="w-8 h-2" />
              </div>
              {/* Author Name */}
              <Skeleton className="w-8 h-2" />
            </div>
          </div>
        </div>
        {/* Options */}
        <Skeleton className="rounded-full w-8 h-8" />
      </div>
      {/* Title */}
      <Skeleton className="rounded-full w-full h-6" />
      {/* Content */}
      <Skeleton className="rounded-full w-full h-12" />
      {/* Interactions */}
      <div className="flex flex-row items-center gap-4">
        <Skeleton className="rounded-full w-16 h-10" />
        <Skeleton className="rounded-full w-16 h-10" />
        <Skeleton className="rounded-full w-16 h-10" />
      </div>
    </div>
  );
};

export default PostCardLoading;
