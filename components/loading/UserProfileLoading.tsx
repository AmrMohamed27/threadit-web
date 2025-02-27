import { Skeleton } from "../ui/skeleton";
import PostsFeedLoading from "./PostsFeedLoading";

const UserProfileLoading = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Header */}
      <div className="flex flex-row items-end gap-4">
        {/* Image */}
        <div className="relative flex flex-shrink-0 justify-center items-center rounded-full">
          <Skeleton className="rounded-full w-24 h-24" />
        </div>
        {/* Name */}
        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="w-24 h-8 font-bold"></Skeleton>
          <Skeleton className="w-12 h-4"></Skeleton>
        </div>
      </div>
      {/* Tabs */}
      <Skeleton className="w-full h-12"></Skeleton>
      <PostsFeedLoading hasPagination />
    </div>
  );
};

export default UserProfileLoading;
