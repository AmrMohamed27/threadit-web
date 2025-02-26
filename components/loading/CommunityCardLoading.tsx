import React from "react";
import { Skeleton } from "../ui/skeleton";

const CommunityCardLoading = () => {
  return (
    <div className="flex flex-row items-start gap-4 p-4 rounded-xl w-full">
      {/* Image */}
      <Skeleton className="rounded-full w-12 h-12" />
      {/* Info */}
      <div className="flex flex-col gap-4 w-full">
        {/* Name */}
        <Skeleton className="w-12 h-4" />
        {/* Description */}
        <Skeleton className="w-full h-8" />
        {/* Members and posts */}
        <div className="flex flex-row items-center gap-2 text-xs">
          <Skeleton className="w-4 h-2" />
          <span className="text-muted-foreground">·</span>
          <Skeleton className="w-4 h-2" />
        </div>
      </div>
    </div>
  );
};

export default CommunityCardLoading;
