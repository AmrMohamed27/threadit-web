import { User } from "@/generated/graphql";
import Link from "next/link";
import React from "react";
import AvatarWrapper from "../common/AvatarWrapper";
import { formatDate, getDefaultAvatar } from "@/lib/utils";
import { Calendar } from "lucide-react";

type Props = {
  user: User;
};

const UserCard = ({ user }: Props) => {
  // Destructure props
  const { name, image, createdAt } = user;
  return (
    <Link
      className="flex flex-row items-start gap-4 hover:bg-muted/40 p-4 rounded-xl"
      href={`/users/${name}`}
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
        <span className="font-semibold">u/{name}</span>
        {/* Created At */}
        <div className="flex flex-row items-center gap-2 text-xs">
          <Calendar className="text-muted-foreground" size={16} />
          <span className="text-muted-foreground">
            Joined on: {formatDate(createdAt)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
