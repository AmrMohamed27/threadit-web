import { User } from "@/generated/graphql";
import React from "react";
import UserHeader from "./UserHeader";
import UserTabs from "./UserTabs";
import UserMobileDropdown from "./UserMobileDropdown";

type Props = {
  user: User;
  isMe: boolean;
};

const UserProfile = ({ user, isMe }: Props) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <UserHeader user={user} isMe={isMe} />
      <UserTabs user={user} />
      <UserMobileDropdown user={user} />
    </div>
  );
};

export default UserProfile;
