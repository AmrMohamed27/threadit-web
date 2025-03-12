import {
  UserResponse,
  useGetChatByIdLazyQuery,
  useGetChatMessagesLazyQuery,
  useGetChatParticipantsLazyQuery,
  useGetUserChatsQuery,
  useNewChatSubscription,
  useNewMessageSubscription,
} from "@/generated/graphql";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  addMessage,
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

  // Get current user
  const { user } = useCurrentUser();

  // GraphQL queries and subscriptions
  const {
    data: userChatsData,
    loading: userChatsLoading,
    error: userChatsError,
  } = useGetUserChatsQuery();

  // const [getChatByIdQuery] = useGetChatByIdLazyQuery();
  const [getChatMessagesQuery] = useGetChatMessagesLazyQuery();
  const [getChatParticipantsQuery] = useGetChatParticipantsLazyQuery();
  const [getChatByIdQuery] = useGetChatByIdLazyQuery();

  useNewMessageSubscription({
    variables: { chatId: currentChatId },
    skip: !user,
    onData: ({ data }) => {
      if (!data?.data?.newMessage?.message) return;
      const newMessage = data.data.newMessage.message;
      console.log("NEW MESSAGE: ", newMessage);
      dispatch(
        addMessage({
          chatId: newMessage.chatId,
          message: newMessage,
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
        return;
      }
      // Fetch the new chat details
      const { data: chatData } = await getChatByIdQuery({
        variables: { chatId: receivedChat.id },
      });
      const chat = chatData?.getChatById.chat;
      if (chat) {
        // Add the new chat to our list
        dispatch(setChats([chat, ...chats]));
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

  // Initialize chats
  useEffect(() => {
    async function loadInitialChats() {
      if (initialLoadCompleted || !userChatsData?.getUserChats.chatsArray)
        return;

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
        setInitialLoadCompleted(true);
      } catch (error) {
        console.error("Error loading chats:", error);
      } finally {
        setIsLoading(false);
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
  };
}
