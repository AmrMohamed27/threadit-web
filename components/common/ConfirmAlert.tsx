"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { X } from "lucide-react";
import ConfirmForm from "../forms/ConfirmForm";

const ConfirmAlert = () => {
  // Check if the user is logged in and confirmed
  const { user, loading: isUserLoading, error: userError } = useCurrentUser();
  //   Close state
  const [isClosed, setIsClosed] = useState<boolean>(false);
  if (isUserLoading) return null;
  if (userError) console.error(userError);
  if (!user) return null;
  console.log(user);
  if (user.confirmed) return null;

  //   Toggle close state
  const handleToggleClose = () => {
    setIsClosed((prev) => !prev);
  };
  return (
    !isClosed && (
      <div className="relative flex flex-col justify-center items-center space-y-4 bg-red-950 p-4">
        <p>Please Confirm your email to be able to post and comment.</p>
        <ConfirmForm />
        <Button
          variant={"ghost"}
          size={"icon"}
          className="-top-4 right-0 absolute hover:bg-transparent w-6 h-6"
          onClick={handleToggleClose}
        >
          <X size={16} />
        </Button>
      </div>
    )
  );
};

export default ConfirmAlert;
