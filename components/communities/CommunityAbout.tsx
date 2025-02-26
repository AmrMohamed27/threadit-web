import { Community } from "@/generated/graphql";
import { formatDate, getDefaultAvatar, timeAgo } from "@/lib/utils";
import {
  Calendar as CreatedAtIcon,
  Globe as PublicIcon,
  Lock as PrivateIcon,
} from "lucide-react";
import React from "react";
import { Separator } from "../ui/separator";
import AvatarWrapper from "../common/AvatarWrapper";

type Props = {
  community: Community;
};

const CommunityAbout = ({ community }: Props) => {
  // Destructure community
  const {
    name,
    description,
    createdAt,
    updatedAt,
    membersCount,
    postsCount,
    creator,
    isPrivate,
  } = community;
  return (
    <div className="flex flex-col gap-4 bg-muted dark:bg-black px-4 pt-4 pb-8 rounded-lg min-w-[300px]">
      {/* Header */}
      <div className="flex flex-col gap-4">
        {/* Name */}
        <span className="font-semibold">{name}</span>
        {/* Description */}
        <p className="text-muted-foreground text-sm">{description}</p>
        {/* Info */}
        <div className="flex flex-col gap-4">
          {/* Created at */}
          <div className="flex flex-row gap-2">
            <CreatedAtIcon size={20} />
            <span className="text-muted-foreground text-sm">
              Created at {formatDate(createdAt)}
            </span>
          </div>
          {/* Public or Private */}
          <div className="flex flex-row gap-2">
            {isPrivate ? <PrivateIcon size={20} /> : <PublicIcon size={20} />}
            <span className="text-muted-foreground text-sm">
              {isPrivate ? "Private" : "Public"}
            </span>
          </div>

          {/* Stats */}
          <div className="flex flex-row justify-between items-center w-full">
            {/* Members count */}
            <div className="flex flex-col items-center gap-2">
              <span className="font-semibold">{membersCount}</span>
              <span className="text-muted-foreground text-sm">Members</span>
            </div>
            {/* Posts count */}
            <div className="flex flex-col items-center gap-2">
              <span className="font-semibold">{postsCount}</span>
              <span className="text-muted-foreground text-sm">Posts</span>
            </div>
            {/* Last updated */}
            <div className="flex flex-col items-center gap-2">
              <span className="font-semibold">{timeAgo(updatedAt)}</span>
              <span className="text-muted-foreground text-sm">
                Last updated
              </span>
            </div>
          </div>
        </div>
        {/* Separator */}
        <Separator />
        {/* Creator */}
        <div className="flex flex-col gap-4">
          {/* Label */}
          <span className="text-muted-foreground uppercase">Creator</span>
          <div className="flex flex-row items-center gap-2">
            <AvatarWrapper
              src={
                creator?.image ??
                getDefaultAvatar({ name: creator?.name ?? "Anonymous" })
              }
              alt={creator?.name ?? "Anonymous"}
            />
            <span>{creator?.name ?? "Anonymous"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityAbout;
