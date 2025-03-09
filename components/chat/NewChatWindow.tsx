"use client";
import {
  useCreateMessageMutation,
  useSearchForUserLazyQuery,
} from "@/generated/graphql";
import { getDefaultAvatar } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import AvatarWrapper from "../common/AvatarWrapper";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import ChatControls from "./ChatControls";
import { useCurrentUser } from "@/hooks/use-current-user";

type Props = {
  closeNewChatWindow: () => void;
};

const NewChatWindow = ({ closeNewChatWindow }: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const [searchForUsersQuery, { data, loading }] = useSearchForUserLazyQuery();
  const [createMessageMutation, { loading: startChatLoading }] =
    useCreateMessageMutation();

  const { user: currentUser } = useCurrentUser();

  const users = data?.searchForUser.userArray;

  let filteredUsers = users;
  if (users && users.length > 0) {
    filteredUsers = users.filter((user) => user.id !== currentUser?.id);
  }

  // Debounce the search query

  useEffect(() => {
    if (!searchValue) return;

    const delayDebounce = setTimeout(async () => {
      await searchForUsersQuery({
        variables: {
          options: {
            searchTerm: searchValue,
            page: 1,
            limit: 10,
          },
        },
      });
    }, 2000); // Wait for 2 seconds

    return () => clearTimeout(delayDebounce); // Cleanup function to reset timeout on input change
  }, [searchValue, searchForUsersQuery]);

  const handleStartChat = async () => {
    await createMessageMutation({
      variables: {
        options: {
          content: "Hi there!",
          receiverId: users ? users[0].id : 0,
        },
      },
      refetchQueries: ["GetUserChats"],
    });
    closeNewChatWindow();
  };

  return (
    <>
      {/* Header */}
      <div className="top-0 z-50 sticky flex flex-row justify-between items-center bg-background dark:bg-black px-4 py-2 border-muted border-b-2 w-ful">
        <div className="flex flex-row flex-1 items-center gap-4">
          <span className="font-semibold text-muted-foreground">New Chat</span>
        </div>
        {/* Controls */}
        <ChatControls />
      </div>
      {/*  Search Form */}
      <div className="flex flex-col flex-1 items-center gap-4 w-full">
        {/* Input and Results */}
        <div className="flex flex-col flex-1 items-center gap-4 bg-muted px-4 py-2 w-full">
          {/* Search input */}
          <div className="flex flex-col items-start gap-2 w-full">
            <Input
              placeholder="Type username"
              value={searchValue}
              onChange={handleChange}
              className="bg-background"
            />
            <span className="text-muted-foreground text-xs">
              Search for people by username to chat with them.
            </span>
          </div>
          {/* Search Results */}
          <div className="flex flex-col items-start gap-2 bg-background p-4 rounded-lg w-full min-h-[180px]">
            {loading ? (
              <Loader className="animate-spin" />
            ) : filteredUsers ? (
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex flex-row items-center gap-4 hover:bg-muted/40 p-2 rounded-lg w-full cursor-pointer"
                  onClick={() => {
                    setSearchValue(user.name);
                    setIsDisabled(false);
                  }}
                >
                  <AvatarWrapper
                    src={user.image ?? getDefaultAvatar({ name: user.name })}
                    alt={user.name}
                    className="size-8"
                  />
                  <div className="flex flex-col gap-1">
                    <span className="text-sm">{user.name}</span>
                  </div>
                </div>
              ))
            ) : searchValue.length === 0 ? (
              <div>Suggestions will appear here</div>
            ) : (
              <Loader className="animate-spin" />
            )}
          </div>
          {/* Buttons */}
          <div className="flex flex-row justify-end items-center gap-4 w-full">
            <Button
              variant={"grey"}
              className="bg-background w-auto"
              onClick={closeNewChatWindow}
            >
              Cancel
            </Button>
            <Button
              variant={"red"}
              className="w-auto"
              disabled={isDisabled}
              onClick={handleStartChat}
            >
              {startChatLoading ? (
                <Loader className="animate-spin" />
              ) : (
                "Start Chat"
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewChatWindow;
