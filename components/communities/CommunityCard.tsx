import { Community } from "@/generated/graphql";
import Link from "next/link";
import React from "react";
import AvatarWrapper from "../common/AvatarWrapper";
import { getDefaultAvatar } from "@/lib/utils";

type Props = {
  community: Community;
};

const CommunityCard = ({ community }: Props) => {
  // Destructure props
  const { name, image, description, membersCount, postsCount } = community;
  return (
    <Link
      className="flex flex-row items-start gap-4 hover:bg-muted/40 p-4 rounded-xl"
      href={`/c/${name}`}
    >
      {/* Image */}
      <AvatarWrapper
        src={image ?? getDefaultAvatar({ name })}
        alt={name}
        className="w-12 h-12"
      />
      {/* Info */}
      <div className="flex flex-col gap-4">
        {/* Name */}
        <span className="font-semibold">c/{name}</span>
        {/* Description */}
        <p className="text-muted-foreground">{description}</p>
        {/* Members and posts */}
        <div className="flex flex-row items-center gap-2 text-xs">
          <span className="text-muted-foreground">
            {membersCount} member
            {membersCount !== undefined &&
              membersCount !== null &&
              membersCount > 1 &&
              "s"}
          </span>
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground">
            {postsCount} post
            {postsCount !== undefined &&
              postsCount !== null &&
              postsCount > 1 &&
              "s"}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CommunityCard;
