import { Community, useGetUserByIdLazyQuery } from "@/generated/graphql";
import { cn, formatDate, getDefaultAvatar, timeAgo } from "@/lib/utils";
import {
  Calendar as CreatedAtIcon,
  Globe as PublicIcon,
  Lock as PrivateIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import AvatarWrapper from "../common/AvatarWrapper";
import Link from "next/link";

type Props = {
  community: Community;
  className?: string;
};

const CommunityAbout = ({ community, className = "" }: Props) => {
  // Destructure community
  const {
    name,
    description,
    createdAt,
    updatedAt,
    membersCount,
    postsCount,
    creator: passedCreator,
    creatorId,
    isPrivate,
  } = community;
  const [getUserByIdQuery] = useGetUserByIdLazyQuery({
    variables: {
      id: creatorId,
    },
  });
  const [creator, setCreator] = useState(passedCreator);
  useEffect(() => {
    const fetchCreator = async () => {
      if (!creator) {
        const { data } = await getUserByIdQuery();
        if (data?.getUserById.user) {
          setCreator(data?.getUserById.user);
        }
      }
    };
    fetchCreator();
  }, [creator, getUserByIdQuery]);
  return (
    <div
      className={cn(
        "md:top-20 md:right-4 md:sticky flex flex-col gap-4 bg-muted dark:bg-black px-4 pt-4 pb-8 rounded-lg min-w-[300px] h-full max-h-[700px]",
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-col gap-4">
        {/* Name */}
        <Link
          className="font-semibold hover:underline"
          href={`/c/${name ?? ""}`}
        >
          c/{name}
        </Link>
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
          <Link
            className="flex flex-row items-center gap-2"
            href={`/users/${creator?.name ?? ""}`}
          >
            <AvatarWrapper
              src={
                creator?.image ??
                getDefaultAvatar({ name: creator?.name ?? "Anonymous" })
              }
              alt={creator?.name ?? "Anonymous"}
            />
            <span>{creator?.name ?? "Anonymous"}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CommunityAbout;
