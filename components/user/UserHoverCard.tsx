import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { User } from "@/generated/graphql";
import { formatDate, getDefaultAvatar } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import AvatarWrapper from "../common/AvatarWrapper";
import { Separator } from "../ui/separator";
import {
  CakeSlice as CreatedAtIcon,
  CirclePlus as FollowIcon,
  MessageCircleMore as ChatIcon,
} from "lucide-react";
import { Button } from "../ui/button";

type Props = {
  user?: User | null;
  children?: React.ReactNode;
};

const UserHoverCard = ({ user, children }: Props) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="p-0 w-96">
        <Link href={`/users/${user?.name ?? ""}`}>
          <div className="flex flex-col gap-4 p-4 w-full">
            {/* Info */}
            <div className="flex flex-col gap-4">
              {/* Name and Image */}
              <div className="flex flex-row items-center gap-4">
                {/* Image */}
                <AvatarWrapper
                  src={
                    user?.image ??
                    getDefaultAvatar({ name: user?.name ?? "User" })
                  }
                  alt={`${user?.name ?? "User"}'s profile picture`}
                  className="w-16 h-16"
                />
                {/* Name */}
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-lg">
                    {user?.name ?? "User"}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    u/{user?.name ?? "User"}
                  </span>
                  <div className="flex flex-row items-center gap-2">
                    <CreatedAtIcon size={14} />
                    <span className="text-muted-foreground text-xs">
                      {formatDate(
                        user?.createdAt ?? new Date().getTime().toString()
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <Separator />
              {/* Follow and Chat Buttons */}
              <div className="flex flex-row items-center gap-4">
                <Button
                  className="flex flex-row items-center gap-2 w-auto"
                  variant={"red"}
                >
                  <FollowIcon size={20} />
                  <span className="">Follow</span>
                </Button>
                <Button
                  className="flex flex-row items-center gap-2 w-auto"
                  variant={"grey"}
                >
                  <ChatIcon size={20} />
                  <span className="">Start Chat</span>
                </Button>
              </div>
            </div>
          </div>
        </Link>
      </HoverCardContent>
    </HoverCard>
  );
};

export default UserHoverCard;
