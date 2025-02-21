"use client";
import React from "react";
import { Skeleton } from "../ui/skeleton";
import NavbarLoggedOut from "./NavbarLoggedOut";
import { useCurrentUser } from "@/hooks/use-current-user";
import NavbarLoggedIn from "./NavbarLoggedIn";

const NavbarActions = () => {
  // Get current logged in user
  const { user, loading: isUserLoading, error: userError } = useCurrentUser();

  // render skeleton for loading
  if (isUserLoading)
    return <Skeleton className="rounded-full w-[40px] h-[40px]"></Skeleton>;
  // log errors
  if (userError) {
    console.error(userError);
  }
  return user ? (
    // Render user avatar and actions
    <NavbarLoggedIn user={user} />
  ) : (
    <>
      {/* User not logged in so render auth buttons */}
      <NavbarLoggedOut />
    </>
  );
};

export default NavbarActions;
