import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { DEFAULT_COVER_PHOTO_URL } from "@/constants";
import { Community } from "@/generated/graphql";
import { getDefaultAvatar } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import AvatarWrapper from "../common/AvatarWrapper";
import { Separator } from "../ui/separator";
import Link from "next/link";
import JoinButton from "./JoinButton";
import UnjoinButton from "./UnjoinButton";

type Props = {
  community?: Community | null;
  children?: React.ReactNode;
};

const CommunityHoverCard = ({ community, children }: Props) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="p-0 w-96">
        <Link href={`/c/${community?.name ?? ""}`}>
          <div className="flex flex-col gap-4 w-full">
            {/* Cover */}
            <Image
              src={community?.cover ?? DEFAULT_COVER_PHOTO_URL}
              alt={`${community?.name ?? "Community"}'s profile picture`}
              width={128}
              height={128}
              className="rounded-t-sm w-full h-24 object-cover"
            />
            {/* Info */}
            <div className="flex flex-col gap-4 px-4 pb-4">
              {/* Name, Image and join button */}
              <div className="flex flex-row justify-between items-center w-full">
                {/* Name and Image */}
                <div className="flex flex-row items-center gap-4">
                  {/* Image */}
                  <AvatarWrapper
                    src={
                      community?.image ??
                      getDefaultAvatar({ name: community?.name ?? "Community" })
                    }
                    alt={`${community?.name ?? "Community"}'s profile picture`}
                    className="w-12 h-12"
                  />
                  {/* Name */}
                  <span className="font-bold text-lg">
                    c/{community?.name ?? "Community"}
                  </span>
                </div>
                {/* Join Button */}
                {community ? (
                  community?.isJoined ? (
                    <UnjoinButton communityId={community.id} />
                  ) : (
                    <JoinButton communityId={community.id} />
                  )
                ) : null}
              </div>
              {/* Description */}
              <p className="text-muted-foreground text-sm">
                {community?.description}
              </p>
              <Separator />
              {/* Members and posts */}
              <div className="flex flex-row items-center gap-2 text-xs">
                <span className="text-muted-foreground">
                  {community?.membersCount} member
                  {community?.membersCount && community.membersCount > 1
                    ? "s"
                    : ""}
                </span>
                <span className="text-muted-foreground">·</span>
                <span className="text-muted-foreground">
                  {community?.postsCount} post
                  {community?.postsCount && community.postsCount > 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </HoverCardContent>
    </HoverCard>
  );
};

export default CommunityHoverCard;
