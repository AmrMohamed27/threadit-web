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
  addChat,
  closeNewChat,
  mergeMessages,
  openNewChat,
  removeChat,
  setChats,
  setCurrentChatId,
} from "@/lib/features/chatSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useToast } from "./use-toast";
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
  const [initialLoadCompleted, setInitialLoadCompleted] = useState(false);

  // Get current user
  const { user } = useCurrentUser();

  // toast
  const { toast } = useToast();

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
      if (newMessage.senderId !== user?.id) {
        toast({
          title: `New message from ${newMessage.sender?.name ?? "Sender"}`,
          description: newMessage.content ?? "Message",
        });
      }
    },
  });

  useNewChatSubscription({
    skip: !user,
    onData: async ({ data }) => {
      if (!data?.data?.newChat?.chat) return;

      const receivedChat = data.data.newChat.chat;

      // More robust check for existing chat
      const chatExists = chats.some((chat) => chat.id === receivedChat.id);

      if (chatExists) {
        console.log(
          "Chat already exists in state, skipping subscription update"
        );
        return;
      }

      console.log("Received new chat from subscription:", receivedChat);

      try {
        // Add the new chat to our list with empty messages
        dispatch(
          addChat({
            ...receivedChat,
            messages: [],
          })
        );

        // Get messages for this chat
        const { data: messagesData } = await getChatMessagesQuery({
          variables: { chatId: receivedChat.id },
        });

        if (messagesData?.getChatMessages?.messagesArray) {
          dispatch(
            mergeMessages({
              chatId: receivedChat.id,
              messages: messagesData.getChatMessages.messagesArray,
            })
          );
        }

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

        // Notify user of new chat if they didn't create it
        const creatorId = receivedChat.creatorId;
        if (creatorId !== user?.id) {
          toast({
            title: "New conversation",
            description: `${receivedChat.name || "New chat"} was created`,
          });
        }
      } catch (error) {
        console.error("Error processing new chat:", error);
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

        // Preserve any new chats that might have been added via subscription
        // while this initialization was running
        const existingChats = chats || [];
        const initializedChatIds = chatsWithMessages.map((chat) => chat.id);

        // Find chats that exist in state but not in the fetched data
        // (these would be new chats added via subscription)
        const chatsMissingFromInitialization = existingChats.filter(
          (chat) => !initializedChatIds.includes(chat.id)
        );

        // Add additional data to the missing chats
        const chatsMissingFromInitializationWithData = await Promise.all(
          chatsMissingFromInitialization.map(async (chat) => {
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

        // Merge the initialized chats with any chats that were added via subscription
        const mergedChats = [
          ...chatsWithMessages,
          ...chatsMissingFromInitializationWithData,
        ];

        dispatch(setChats(mergedChats));

        // Set initial current chat
        const storedChatId = localStorage.getItem("currentChatId");
        if (
          storedChatId &&
          mergedChats.some((c) => c.id === parseInt(storedChatId))
        ) {
          dispatch(setCurrentChatId(parseInt(storedChatId)));
        } else if (mergedChats.length > 0) {
          dispatch(setCurrentChatId(mergedChats[0].id));
          localStorage.setItem("currentChatId", mergedChats[0].id.toString());
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
    try {
      await createChatMutation({
        variables: {
          options: {
            name,
            participantIds,
            isGroupChat: participantIds.length > 2,
          },
        },
      });
    } catch (error) {
      console.error("Failed to create chat:", error);
      toast({
        title: "Error creating chat",
        description: "Failed to create new conversation. Please try again.",
        variant: "destructive",
      });
    }
  };

  const openNewChatWindow = () => dispatch(openNewChat());

  const closeNewChatWindow = () => dispatch(closeNewChat());

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
    handleChatClick,
    openNewChatWindow,
    closeNewChatWindow,
    chatStarter,
  };
}
