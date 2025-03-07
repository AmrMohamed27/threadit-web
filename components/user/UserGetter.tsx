"use client";
import { useGetUserByNameQuery } from "@/generated/graphql";
import { useCurrentUser } from "@/hooks/use-current-user";
import React from "react";
import UserProfile from "./UserProfile";
import UserProfileLoading from "../loading/UserProfileLoading";

type Props = {
  name: string;
};

const UserGetter = ({ name }: Props) => {
  const {
    data: userResult,
    loading,
    error,
  } = useGetUserByNameQuery({
    variables: {
      name,
    },
  });
  const { user: currentUser } = useCurrentUser();
  if (loading) return <UserProfileLoading />;
  if (error) return <div> {error.message}</div>;
  if (userResult?.getUserByName.errors)
    return (
      <div>
        {userResult?.getUserByName.errors[0].message ?? "Error fetching user"}
      </div>
    );
  const user = userResult?.getUserByName.user;
  if (!user) return <div>Error 404 - No user found</div>;
  return <UserProfile user={user} isMe={currentUser?.id === user.id} />;
};

export default UserGetter;
