"use client";
import { User, useSearchForUserLazyQuery } from "@/generated/graphql";
import { useChatManager } from "@/hooks/use-chat-manager";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getDefaultAvatar } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import AvatarWrapper from "../common/AvatarWrapper";
import { MultiValueInput } from "../forms/MultiValueInput";
import { Button } from "../ui/button";
import ChatControls from "./ChatControls";

type Props = {
  closeNewChatWindow: () => void;
};

const NewChatWindow = ({ closeNewChatWindow }: Props) => {
  const [tags, setTags] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const [searchForUsersQuery, { data, loading }] = useSearchForUserLazyQuery();

  const { chatStarter } = useChatManager();

  const { user: currentUser } = useCurrentUser();

  const users = data?.searchForUser.userArray;

  let filteredUsers = users;
  if (users && users.length > 0) {
    filteredUsers = users.filter((user) => user.id !== currentUser?.id);
  }

  // Update the isDisabled state based on selectedUsers
  useEffect(() => {
    setIsDisabled(tags.length === 0);
  }, [tags]);

  // Debounce the search query for the last tag input value
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
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [searchValue, searchForUsersQuery]);

  const handleStartChat = async () => {
    if (filteredUsers && currentUser && tags.length > 0) {
      // Find the user IDs for selected usernames
      const participantIds = [currentUser.id];

      tags.forEach((username) => {
        const selectedUser = filteredUsers?.find(
          (user) => user.name === username
        );
        if (selectedUser) {
          participantIds.push(selectedUser.id);
        }
      });
      const chatName = tags.join(", ");
      await chatStarter(participantIds, chatName);
    }
    closeNewChatWindow();
  };

  const handleTagsChange = (tags: string[]) => {
    setTags(tags);
  };

  const handleUserSelect = (user: User) => {
    // Add user to selected users if not already there
    if (!tags.includes(user.name)) {
      setTags((prev) => [...prev, user.name]);
    }
  };

  return (
    <div className="flex flex-col flex-1 gap-0">
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
        <div className="flex flex-col flex-1 items-center gap-4 px-4 py-2 w-full">
          {/* Search input */}
          <div className="flex flex-col items-start gap-2 w-full">
            {/* MultiValueInput replaces normal Input */}
            <MultiValueInput
              label="Add participants"
              placeholder="Type username to search"
              maxTags={10}
              onTagsChange={handleTagsChange}
              onInputChange={(value) => setSearchValue(value)}
              tags={tags}
              setTags={setTags}
            />
          </div>
          {/* Search Results */}
          <div className="flex flex-col items-start gap-2 bg-background p-4 rounded-lg w-full min-h-[180px]">
            {loading ? (
              <Loader className="animate-spin" />
            ) : filteredUsers && searchValue ? (
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex flex-row items-center gap-4 hover:bg-muted/40 p-2 rounded-lg w-full cursor-pointer"
                  onClick={() => handleUserSelect(user)}
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
              Start Chat
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewChatWindow;
