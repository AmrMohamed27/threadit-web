import {
  Chat,
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
import { useEffect, useState, useCallback } from "react";
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
  const chatIsOpen = useTypedSelector((state) => state.chat.isOpen);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  // Get current user
  const { user } = useCurrentUser();

  // toast
  const { toast } = useToast();

  // GraphQL queries and mutations
  const { loading: userChatsLoading, error: userChatsError } =
    useGetUserChatsQuery({
      onCompleted: (data) => {
        if (data?.getUserChats?.chatsArray) {
          handleInitialChatsLoad(data.getUserChats.chatsArray);
        }
      },
      fetchPolicy: "network-only",
    });

  const [getChatMessagesQuery] = useGetChatMessagesLazyQuery({
    fetchPolicy: "network-only",
  });
  const [getChatParticipantsQuery] = useGetChatParticipantsLazyQuery();
  const [createChatMutation] = useCreateChatMutation();

  // Function to load messages and participants for a chat
  const loadChatData = useCallback(
    async (chat: Chat) => {
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
    },
    [getChatMessagesQuery, getChatParticipantsQuery]
  );

  // Handler to process initial chats from the query
  const handleInitialChatsLoad = useCallback(
    async (initialChats: Chat[]) => {
      setIsLoading(true);
      try {
        // Load messages and participants for each chat
        const chatsWithData = await Promise.all(initialChats.map(loadChatData));

        dispatch(setChats(chatsWithData));

        // Set initial current chat
        const storedChatId = localStorage.getItem("currentChatId");
        if (
          storedChatId &&
          chatsWithData.some((c) => c.id === parseInt(storedChatId))
        ) {
          dispatch(setCurrentChatId(parseInt(storedChatId)));
        } else if (chatsWithData.length > 0) {
          dispatch(setCurrentChatId(chatsWithData[0].id));
          localStorage.setItem("currentChatId", chatsWithData[0].id.toString());
        }
      } catch (error) {
        console.error("Error loading chats:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, loadChatData]
  );

  // Subscriptions
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
      if (newMessage.senderId !== user?.id && !chatIsOpen) {
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

      // Check for existing chat
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

        // Load chat data (messages and participants)
        const chatWithData = await loadChatData(receivedChat);

        // Update messages
        dispatch(
          mergeMessages({
            chatId: chatWithData.id,
            messages: chatWithData.messages,
          })
        );

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

  // Track loading state
  useEffect(() => {
    setIsLoading(userChatsLoading);
  }, [userChatsLoading]);

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
