import Image from "next/image";
import React from "react";
import AvatarWrapper from "../common/AvatarWrapper";
import { getDefaultAvatar } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { Bell as BellIcon, Plus as CreateIcon } from "lucide-react";
import { Community } from "@/generated/graphql";
import UnjoinButton from "./UnjoinButton";
import JoinButton from "./JoinButton";
import { useCurrentUser } from "@/hooks/use-current-user";

type Props = {
  community: Community;
};

const CommunityHeader = ({ community }: Props) => {
  // Destructure community
  const { id, name, cover, image, membersCount, isJoined, creatorId } =
    community;
  const { user } = useCurrentUser();
  return (
    <div className="relative flex flex-col gap-4 md:pb-12">
      {/* Cover Image */}
      <div className="rounded-md w-full h-16 md:h-24 lg:h-32">
        <Image
          src={
            cover ?? "https://flowbite.com/docs/images/examples/image-3@2x.jpg"
          }
          alt={`Cover image for ${name} Community`}
          width={1400}
          height={800}
          className="rounded-md w-full h-full object-cover"
        />
      </div>
      {/* Info and Actions */}
      <div className="md:bottom-1 md:left-0 md:absolute flex md:flex-row flex-col md:justify-between md:items-end gap-4 md:gap-0 md:px-4 w-full">
        {/* Image and Name */}
        <div className="flex flex-row items-end gap-2">
          {/* Image */}
          <AvatarWrapper
            src={image ?? getDefaultAvatar({ name })}
            alt={name}
            className="border-4 border-background rounded-full w-[40px] md:w-[80px] h-[40px] md:h-[80px]"
          />
          {/* Name and mobile info */}
          <div className="flex flex-col gap-1">
            {/* Name */}
            <span className="font-bold">c/{name}</span>
            {/* Mobile info */}
            <span className="md:hidden text-muted-foreground text-xs">
              {membersCount} members
            </span>
          </div>
        </div>
        {/* Actions */}
        <div className="flex flex-row items-center md:items-end gap-2 md:h-full">
          {/* Create Post Button */}
          {isJoined && (
            <Button asChild variant={"outline"}>
              <Link
                className="flex flex-row items-center gap-2"
                href={"/posts/create/?communityId=" + id}
              >
                <CreateIcon size={20} />
                <span className="">Create Post</span>
              </Link>
            </Button>
          )}
          {/* Notifications bell */}
          <Button variant={"outline"} className="w-9 h-9">
            <BellIcon size={20} />
          </Button>
          {/* Toggle Joined Button */}
          {user && user.id !== creatorId ? (
            isJoined ? (
              <UnjoinButton communityId={id} />
            ) : (
              <JoinButton communityId={id} />
            )
          ) : (
            <></>
          )}
          {/* TODO: Options */}
        </div>
      </div>
    </div>
  );
};

export default CommunityHeader;
