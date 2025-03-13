import {
  UserResponse,
  useChatUpdatesSubscription,
  useCreateChatMutation,
  useGetChatMessagesLazyQuery,
  useGetChatParticipantsLazyQuery,
  useGetUserChatsQuery,
  useNewChatSubscription,
  useNewMessageSubscription,
} from "@/generated/graphql";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  mergeMessages,
  removeChat,
  setChats,
  setCurrentChatId,
} from "@/lib/features/chatSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "./use-typed-selector";

export function useChatManager() {
  // State
  const chats = useTypedSelector((state) => state.chat.chats);
  const [chatParticipants, setChatParticipants] = useState<
    Record<number, UserResponse>
  >({});
  const currentChatId = useTypedSelector((state) => state.chat.currentChatId);
  // set current chat id from local storage
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [newChatIsOpen, setNewChatIsOpen] = useState(false);
  const [initialLoadCompleted, setInitialLoadCompleted] = useState(false);
  useEffect(() => {
    setInitialLoadCompleted(false);
  }, []);

  console.log(chatParticipants);

  // Get current user
  const { user } = useCurrentUser();

  // GraphQL queries and subscriptions
  const {
    data: userChatsData,
    loading: userChatsLoading,
    error: userChatsError,
  } = useGetUserChatsQuery();

  const [getChatMessagesQuery] = useGetChatMessagesLazyQuery();
  const [getChatParticipantsQuery] = useGetChatParticipantsLazyQuery();
  const [createChatMutation] = useCreateChatMutation();

  useNewMessageSubscription({
    variables: { chatId: currentChatId },
    skip: !user,
    onData: ({ data }) => {
      if (!data?.data?.newMessage?.message) return;
      const newMessage = data.data.newMessage.message;
      dispatch(
        mergeMessages({
          chatId: newMessage.chatId,
          messages: [newMessage],
        })
      );
    },
  });

  useNewChatSubscription({
    skip: !user,
    onData: async ({ data }) => {
      if (!data?.data?.newChat?.chat) return;

      const receivedChat = data.data.newChat.chat;

      // Check if we already have this chat
      if (chats.some((chat) => chat.id === receivedChat.id)) {
        console.log("Already here");
        return;
      }
      if (receivedChat) {
        // Add the new chat to our list
        dispatch(setChats([receivedChat, ...chats]));
        // Get participants for this chat
        const { data: participantsData } = await getChatParticipantsQuery({
          variables: { chatId: receivedChat.id },
        });
        if (participantsData?.getChatParticipants) {
          setChatParticipants((prev) => ({
            ...prev,
            [receivedChat.id]: participantsData.getChatParticipants,
          }));
        }
      }
    },
  });

  useChatUpdatesSubscription({
    skip: !user,
    onData: async ({ data, client }) => {
      if (!data?.data?.chatUpdates?.operation) return;
      const { operation, chatId } = data.data.chatUpdates;
      if (operation.delete) {
        client.cache.evict({
          id: client.cache.identify({
            __typename: "Chat",
            id: chatId,
          }),
        });
        client.cache.gc();
        dispatch(removeChat(chatId));
      }
    },
  });

  // Initialize chats
  useEffect(() => {
    async function loadInitialChats() {
      if (initialLoadCompleted || !userChatsData?.getUserChats.chatsArray) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const chatsWithMessages = await Promise.all(
          userChatsData.getUserChats.chatsArray.map(async (chat) => {
            // Get messages for this chat
            const { data: messagesData } = await getChatMessagesQuery({
              variables: { chatId: chat.id },
            });

            // Get participants for this chat
            const { data: participantsData } = await getChatParticipantsQuery({
              variables: { chatId: chat.id },
            });
            // Store participants in our map
            if (participantsData?.getChatParticipants) {
              setChatParticipants((prev) => ({
                ...prev,
                [chat.id]: participantsData.getChatParticipants,
              }));
            }

            return {
              ...chat,
              messages: messagesData?.getChatMessages.messagesArray ?? [],
            };
          })
        );

        dispatch(setChats(chatsWithMessages));

        // Set initial current chat
        const storedChatId = localStorage.getItem("currentChatId");
        if (
          storedChatId &&
          chatsWithMessages.some((c) => c.id === parseInt(storedChatId))
        ) {
          dispatch(setCurrentChatId(parseInt(storedChatId)));
        } else if (chatsWithMessages.length > 0) {
          dispatch(setCurrentChatId(chatsWithMessages[0].id));
          localStorage.setItem(
            "currentChatId",
            chatsWithMessages[0].id.toString()
          );
        }
      } catch (error) {
        console.error("Error loading chats:", error);
      } finally {
        setIsLoading(false);
        setInitialLoadCompleted(true);
      }
    }
    loadInitialChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userChatsData, initialLoadCompleted]);

  // Handler functions
  const handleChatClick = (chatId: number) => {
    dispatch(setCurrentChatId(chatId));
    localStorage.setItem("currentChatId", chatId.toString());
  };

  const chatStarter = async (participantIds: number[], name: string) => {
    console.log("Participant IDs: ", participantIds);
    const { data: createResult, errors } = await createChatMutation({
      variables: {
        options: {
          name: name,
          participantIds: participantIds,
          isGroupChat: participantIds.length > 2, // Make it a group chat if more than 2 people
        },
      },
      // refetchQueries: ["GetUserChats", "GetChatParticipants"],
    });
    console.log(createResult, errors);
    // If the chat exists, set the current chat id to it
    if (createResult?.createChat.errors) {
      const errorField = createResult.createChat.errors[0].field;
      if (errorField === "chat_exists") {
        const chatId = createResult.createChat.chat?.id;
        if (chatId) {
          dispatch(setCurrentChatId(chatId));
        }
      }
    }
    // Else, set the current chat id to the new chat
    else {
      const chatId = createResult?.createChat.chat?.id;
      if (chatId) {
        dispatch(setCurrentChatId(chatId));
      }
    }
  };

  const openNewChatWindow = () => setNewChatIsOpen(true);
  const closeNewChatWindow = () => setNewChatIsOpen(false);

  // Get current chat
  const currentChat = chats.find((chat) => chat.id === currentChatId) || null;

  useEffect(() => {
    setIsLoading((prev) => (userChatsLoading === true ? true : prev));
  }, [userChatsLoading]);

  return {
    chats,
    currentChat,
    currentChatId,
    chatParticipants,
    isLoading,
    error: userChatsError,
    newChatIsOpen,
    handleChatClick,
    openNewChatWindow,
    closeNewChatWindow,
    chatStarter,
  };
}
