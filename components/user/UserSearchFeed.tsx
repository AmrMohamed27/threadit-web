import React from "react";
import { Separator } from "../ui/separator";
import PaginationComponent from "../common/Pagination";
import { POSTS_PER_PAGE } from "@/constants";
import { User } from "@/generated/graphql";
import UserCard from "./UserCard";

type Props = {
  users: User[];
  count: number;
  hasPagination?: boolean;
};

const UserSearchFeed = (props: Props) => {
  // Destructure props
  const { users, count, hasPagination } = props;
  return (
    <div className="flex flex-col gap-2 w-full min-h-screen">
      {users.map((user) => (
        <div key={user.id} className="flex flex-col gap-2 w-full">
          <UserCard user={user} />
          <Separator />
        </div>
      ))}
      {hasPagination && (
        <PaginationComponent totalPages={Math.ceil(count / POSTS_PER_PAGE)} />
      )}
    </div>
  );
};

export default UserSearchFeed;
