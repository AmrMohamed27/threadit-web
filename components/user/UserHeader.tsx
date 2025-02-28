import { User } from "@/generated/graphql";
import { getDefaultAvatar } from "@/lib/utils";
import AvatarWrapper from "../common/AvatarWrapper";
import UploadProfileImage from "./UploadProfileImage";

import EditUsernameDialog from "./EditUsernameDialog";

type Props = {
  user: User;
  isMe: boolean;
};

const UserHeader = ({ user, isMe }: Props) => {
  // Destructure user
  const { name, image } = user;
  return (
    <div className="flex flex-row items-end gap-4">
      {/* Image */}
      <div className="relative flex flex-shrink-0 justify-center items-center rounded-full">
        <AvatarWrapper
          src={image ?? getDefaultAvatar({ name })}
          alt={name}
          className="w-24 h-24"
        />
        {isMe && <UploadProfileImage />}
      </div>
      {/* Name */}
      <div className="flex flex-col gap-0 w-full">
        <div className="flex flex-row items-center gap-4">
          <span className="font-bold text-xl md:text-2xl lg:text-3xl">
            {name}
          </span>
          <EditUsernameDialog />
        </div>
        <span className="text-muted-foreground">u/{name}</span>
      </div>
    </div>
  );
};

export default UserHeader;
