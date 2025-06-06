import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AddChatParticipantInput = {
  chatId: Scalars['Float']['input'];
  participantId: Scalars['Float']['input'];
};

export type Chat = {
  __typename?: 'Chat';
  createdAt: Scalars['String']['output'];
  creator?: Maybe<User>;
  creatorId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  image?: Maybe<Scalars['String']['output']>;
  isGroupChat: Scalars['Boolean']['output'];
  lastReadMessageId?: Maybe<Scalars['Int']['output']>;
  messages?: Maybe<Array<Message>>;
  name: Scalars['String']['output'];
  participants?: Maybe<Array<User>>;
  updatedAt: Scalars['String']['output'];
};

export type ChatConfirmResponse = {
  __typename?: 'ChatConfirmResponse';
  chatId: Scalars['Float']['output'];
  errors?: Maybe<Array<FieldError>>;
  operation: ChatOperation;
  participantIds?: Maybe<Array<Scalars['Int']['output']>>;
};

export type ChatOperation = {
  __typename?: 'ChatOperation';
  addParticipant?: Maybe<Scalars['Boolean']['output']>;
  delete?: Maybe<Scalars['Boolean']['output']>;
  removeParticipant?: Maybe<Scalars['Boolean']['output']>;
  update?: Maybe<Scalars['Boolean']['output']>;
};

export type ChatResponse = {
  __typename?: 'ChatResponse';
  chat?: Maybe<Chat>;
  chatsArray?: Maybe<Array<Chat>>;
  count?: Maybe<Scalars['Int']['output']>;
  errors?: Maybe<Array<FieldError>>;
};

export type CheckTokenInput = {
  email: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type Comment = {
  __typename?: 'Comment';
  author?: Maybe<User>;
  authorId: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isUpvoted?: Maybe<VoteOptions>;
  parentCommentId?: Maybe<Scalars['Int']['output']>;
  postId: Scalars['Int']['output'];
  replies?: Maybe<Array<Comment>>;
  updatedAt: Scalars['String']['output'];
  upvotesCount?: Maybe<Scalars['Int']['output']>;
};

export type CommentResponse = {
  __typename?: 'CommentResponse';
  comment?: Maybe<Comment>;
  commentsArray?: Maybe<Array<Comment>>;
  count?: Maybe<Scalars['Int']['output']>;
  errors?: Maybe<Array<FieldError>>;
};

export type Community = {
  __typename?: 'Community';
  cover?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  creator?: Maybe<User>;
  creatorId: Scalars['Int']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  image?: Maybe<Scalars['String']['output']>;
  isJoined?: Maybe<Scalars['Boolean']['output']>;
  isPrivate: Scalars['Boolean']['output'];
  membersCount?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  postsCount?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['String']['output'];
};

export type CommunityResponse = {
  __typename?: 'CommunityResponse';
  communitiesArray?: Maybe<Array<Community>>;
  community?: Maybe<Community>;
  count?: Maybe<Scalars['Int']['output']>;
  errors?: Maybe<Array<FieldError>>;
};

export type ConfirmResponse = {
  __typename?: 'ConfirmResponse';
  errors?: Maybe<Array<FieldError>>;
  success: Scalars['Boolean']['output'];
};

export type CreateChatInput = {
  image?: InputMaybe<Scalars['String']['input']>;
  isGroupChat?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  participantIds: Array<Scalars['Int']['input']>;
};

export type CreateCommentInput = {
  content: Scalars['String']['input'];
  parentCommentId?: InputMaybe<Scalars['Int']['input']>;
  postId: Scalars['Float']['input'];
};

export type CreateCommunityInput = {
  description: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  isPrivate?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
};

export type CreateMessageInput = {
  chatId: Scalars['Float']['input'];
  content: Scalars['String']['input'];
  media?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePostInput = {
  communityId: Scalars['Float']['input'];
  content: Scalars['String']['input'];
  media?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
  video?: InputMaybe<Scalars['String']['input']>;
};

export type CreateVoteInput = {
  commentId?: InputMaybe<Scalars['Float']['input']>;
  isUpvote: Scalars['Boolean']['input'];
  postId?: InputMaybe<Scalars['Float']['input']>;
};

export type DeleteVoteOptions = {
  commentId?: InputMaybe<Scalars['Int']['input']>;
  postId?: InputMaybe<Scalars['Int']['input']>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type GetAllPostsInput = {
  limit: Scalars['Float']['input'];
  page: Scalars['Float']['input'];
  sortBy?: InputMaybe<Scalars['String']['input']>;
};

export type GetCommentByIdInput = {
  commentId: Scalars['Int']['input'];
};

export type GetCommunityPostsInput = {
  communityId: Scalars['Float']['input'];
  limit: Scalars['Float']['input'];
  page: Scalars['Float']['input'];
  sortBy?: InputMaybe<Scalars['String']['input']>;
};

export type GetPostCommentsInput = {
  postId: Scalars['Int']['input'];
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
};

export type GetSearchResultInput = {
  limit: Scalars['Float']['input'];
  page: Scalars['Float']['input'];
  searchTerm: Scalars['String']['input'];
  sortBy?: InputMaybe<Scalars['String']['input']>;
};

export type GetUserCommentsInput = {
  limit: Scalars['Float']['input'];
  page: Scalars['Float']['input'];
  sortBy?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type GetUserCommunityPostsInput = {
  limit: Scalars['Float']['input'];
  page: Scalars['Float']['input'];
  sortBy?: InputMaybe<Scalars['String']['input']>;
};

export type GetUserHiddenPostsInput = {
  limit: Scalars['Float']['input'];
  page: Scalars['Float']['input'];
  sortBy?: InputMaybe<Scalars['String']['input']>;
};

export type GetUserPostsInput = {
  limit: Scalars['Float']['input'];
  page: Scalars['Float']['input'];
  sortBy?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['Float']['input']>;
};

export type GetUserVotedPostsOptions = {
  isUpvoted: Scalars['Boolean']['input'];
  limit: Scalars['Float']['input'];
  page: Scalars['Float']['input'];
  sortBy?: InputMaybe<Scalars['String']['input']>;
};

export type JoinCommunityInput = {
  communityId: Scalars['Float']['input'];
};

export type LeaveCommunityInput = {
  communityId: Scalars['Float']['input'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Message = {
  __typename?: 'Message';
  chat?: Maybe<Chat>;
  chatId: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  media?: Maybe<Scalars['String']['output']>;
  sender?: Maybe<User>;
  senderId: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};

export type MessageResponse = {
  __typename?: 'MessageResponse';
  count?: Maybe<Scalars['Int']['output']>;
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Message>;
  messagesArray?: Maybe<Array<Message>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addChatParticipant: ChatConfirmResponse;
  confirmUser: ConfirmResponse;
  createChat: ChatResponse;
  createComment: CommentResponse;
  createCommunity: CommunityResponse;
  createMessage: MessageResponse;
  createPost: PostResponse;
  createVote: VoteResponse;
  deleteChat: ChatConfirmResponse;
  deleteComment: ConfirmResponse;
  deleteCommunity: ConfirmResponse;
  deleteMessage: ConfirmResponse;
  deletePost: ConfirmResponse;
  deleteVote: ConfirmResponse;
  hidePost: ConfirmResponse;
  joinCommunity: ConfirmResponse;
  leaveCommunity: ConfirmResponse;
  loginUser: UserResponse;
  logoutUser: Scalars['Boolean']['output'];
  registerUser: UserResponse;
  removeChatParticipant: ChatConfirmResponse;
  requestConfirmationCode: ConfirmResponse;
  requestPasswordReset: ConfirmResponse;
  resetPassword: ConfirmResponse;
  savePost: ConfirmResponse;
  toggleConfirmed: Scalars['Boolean']['output'];
  unhidePost: ConfirmResponse;
  unsavePost: ConfirmResponse;
  updateChat: ChatResponse;
  updateComment?: Maybe<ConfirmResponse>;
  updateCommunity: ConfirmResponse;
  updateMessage: ConfirmResponse;
  updatePost: ConfirmResponse;
  updateUserImage: ConfirmResponse;
  updateUserName: ConfirmResponse;
  updateVote?: Maybe<ConfirmResponse>;
};


export type MutationAddChatParticipantArgs = {
  options: AddChatParticipantInput;
};


export type MutationConfirmUserArgs = {
  code: Scalars['String']['input'];
};


export type MutationCreateChatArgs = {
  options: CreateChatInput;
};


export type MutationCreateCommentArgs = {
  options: CreateCommentInput;
};


export type MutationCreateCommunityArgs = {
  options: CreateCommunityInput;
};


export type MutationCreateMessageArgs = {
  options: CreateMessageInput;
};


export type MutationCreatePostArgs = {
  options: CreatePostInput;
};


export type MutationCreateVoteArgs = {
  options: CreateVoteInput;
};


export type MutationDeleteChatArgs = {
  chatId: Scalars['Float']['input'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteCommunityArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteMessageArgs = {
  messageId: Scalars['Float']['input'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteVoteArgs = {
  options: DeleteVoteOptions;
};


export type MutationHidePostArgs = {
  postId: Scalars['Float']['input'];
};


export type MutationJoinCommunityArgs = {
  options: JoinCommunityInput;
};


export type MutationLeaveCommunityArgs = {
  options: LeaveCommunityInput;
};


export type MutationLoginUserArgs = {
  userData: LoginInput;
};


export type MutationRegisterUserArgs = {
  userData: RegisterInput;
};


export type MutationRemoveChatParticipantArgs = {
  options: AddChatParticipantInput;
};


export type MutationRequestPasswordResetArgs = {
  email: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  options: ResetPasswordInput;
};


export type MutationSavePostArgs = {
  postId: Scalars['Float']['input'];
};


export type MutationUnhidePostArgs = {
  postId: Scalars['Float']['input'];
};


export type MutationUnsavePostArgs = {
  postId: Scalars['Float']['input'];
};


export type MutationUpdateChatArgs = {
  options: UpdateChatInput;
};


export type MutationUpdateCommentArgs = {
  options: UpdateCommentInput;
};


export type MutationUpdateCommunityArgs = {
  options: UpdateCommunityInput;
};


export type MutationUpdateMessageArgs = {
  options: UpdateMessageInput;
};


export type MutationUpdatePostArgs = {
  options: UpdatePostInput;
};


export type MutationUpdateUserImageArgs = {
  options: UpdateUserImageInput;
};


export type MutationUpdateUserNameArgs = {
  options: UpdateUserNameInput;
};


export type MutationUpdateVoteArgs = {
  options: UpdateVoteInput;
};

export type Post = {
  __typename?: 'Post';
  author?: Maybe<User>;
  authorId: Scalars['Int']['output'];
  commentsCount?: Maybe<Scalars['Int']['output']>;
  community?: Maybe<Community>;
  communityId: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isUpvoted?: Maybe<VoteOptions>;
  media?: Maybe<Array<Scalars['String']['output']>>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  upvotesCount?: Maybe<Scalars['Int']['output']>;
  video?: Maybe<Scalars['String']['output']>;
};

export type PostResponse = {
  __typename?: 'PostResponse';
  count?: Maybe<Scalars['Int']['output']>;
  errors?: Maybe<Array<FieldError>>;
  post?: Maybe<Post>;
  postsArray?: Maybe<Array<Post>>;
};

export type Query = {
  __typename?: 'Query';
  checkChatParticipant: ConfirmResponse;
  checkToken: ConfirmResponse;
  getAllCommunities: CommunityResponse;
  getAllPosts: PostResponse;
  getChatById: ChatResponse;
  getChatMessages: MessageResponse;
  getChatParticipants: UserResponse;
  getComment: CommentResponse;
  getCommunityByName: CommunityResponse;
  getCommunityPosts: PostResponse;
  getExploreCommunities: CommunityResponse;
  getHiddenPosts: Array<Scalars['Float']['output']>;
  getPost: PostResponse;
  getPostComments: CommentResponse;
  getSavedPosts: PostResponse;
  getSavedPostsIds: Array<Scalars['Float']['output']>;
  getUserById: UserResponse;
  getUserByName: UserResponse;
  getUserChats: ChatResponse;
  getUserComments: CommentResponse;
  getUserCommunities: CommunityResponse;
  getUserCommunityPosts: PostResponse;
  getUserHiddenPosts: PostResponse;
  getUserPosts: PostResponse;
  getUserVotedPosts: PostResponse;
  me: UserResponse;
  searchCommunities: CommunityResponse;
  searchForUser: UserResponse;
  searchPosts: PostResponse;
};


export type QueryCheckChatParticipantArgs = {
  chatId: Scalars['Float']['input'];
};


export type QueryCheckTokenArgs = {
  options: CheckTokenInput;
};


export type QueryGetAllPostsArgs = {
  options: GetAllPostsInput;
};


export type QueryGetChatByIdArgs = {
  chatId: Scalars['Float']['input'];
};


export type QueryGetChatMessagesArgs = {
  chatId: Scalars['Float']['input'];
};


export type QueryGetChatParticipantsArgs = {
  chatId: Scalars['Float']['input'];
};


export type QueryGetCommentArgs = {
  options: GetCommentByIdInput;
};


export type QueryGetCommunityByNameArgs = {
  name: Scalars['String']['input'];
};


export type QueryGetCommunityPostsArgs = {
  options: GetCommunityPostsInput;
};


export type QueryGetExploreCommunitiesArgs = {
  limit: Scalars['Float']['input'];
};


export type QueryGetPostArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetPostCommentsArgs = {
  options: GetPostCommentsInput;
};


export type QueryGetSavedPostsArgs = {
  options: GetAllPostsInput;
};


export type QueryGetUserByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetUserByNameArgs = {
  name: Scalars['String']['input'];
};


export type QueryGetUserCommentsArgs = {
  options: GetUserCommentsInput;
};


export type QueryGetUserCommunityPostsArgs = {
  options: GetUserCommunityPostsInput;
};


export type QueryGetUserHiddenPostsArgs = {
  options: GetUserHiddenPostsInput;
};


export type QueryGetUserPostsArgs = {
  options: GetUserPostsInput;
};


export type QueryGetUserVotedPostsArgs = {
  options: GetUserVotedPostsOptions;
};


export type QuerySearchCommunitiesArgs = {
  options: GetSearchResultInput;
};


export type QuerySearchForUserArgs = {
  options: GetSearchResultInput;
};


export type QuerySearchPostsArgs = {
  options: GetSearchResultInput;
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type ResetPasswordInput = {
  email: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  chatUpdates: ChatConfirmResponse;
  newChat: ChatResponse;
  newMessage: MessageResponse;
};

export type UpdateChatInput = {
  chatId: Scalars['Float']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCommentInput = {
  content: Scalars['String']['input'];
  id: Scalars['Float']['input'];
};

export type UpdateCommunityInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMessageInput = {
  content: Scalars['String']['input'];
  messageId: Scalars['Int']['input'];
};

export type UpdatePostInput = {
  content: Scalars['String']['input'];
  id: Scalars['Float']['input'];
  title: Scalars['String']['input'];
};

export type UpdateUserImageInput = {
  image: Scalars['String']['input'];
};

export type UpdateUserNameInput = {
  name: Scalars['String']['input'];
};

export type UpdateVoteInput = {
  commentId?: InputMaybe<Scalars['Int']['input']>;
  isUpvote: Scalars['Boolean']['input'];
  postId?: InputMaybe<Scalars['Int']['input']>;
};

export type User = {
  __typename?: 'User';
  confirmed: Scalars['Boolean']['output'];
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  count?: Maybe<Scalars['Int']['output']>;
  errors?: Maybe<Array<FieldError>>;
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
  userArray?: Maybe<Array<User>>;
};

export type Vote = {
  __typename?: 'Vote';
  commentId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isUpvote: Scalars['Boolean']['output'];
  postId?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['String']['output'];
  userId: Scalars['Int']['output'];
};

/** Represents the user's vote status on a post */
export enum VoteOptions {
  Downvote = 'Downvote',
  None = 'None',
  Upvote = 'Upvote'
}

export type VoteResponse = {
  __typename?: 'VoteResponse';
  errors?: Maybe<Array<FieldError>>;
  vote?: Maybe<Vote>;
  votesArray?: Maybe<Array<Vote>>;
};

export type FullChatFragment = { __typename?: 'Chat', id: number, name: string, createdAt: string, updatedAt: string, creatorId: number, isGroupChat: boolean, lastReadMessageId?: number | null, creator?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null };

export type SingleChatResponseFragment = { __typename?: 'ChatResponse', chat?: { __typename?: 'Chat', id: number, name: string, createdAt: string, updatedAt: string, creatorId: number, isGroupChat: boolean, lastReadMessageId?: number | null, creator?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type ChatArrayResponseFragment = { __typename?: 'ChatResponse', count?: number | null, chatsArray?: Array<{ __typename?: 'Chat', id: number, name: string, createdAt: string, updatedAt: string, creatorId: number, isGroupChat: boolean, lastReadMessageId?: number | null, creator?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type FullChatConfirmResponseFragment = { __typename?: 'ChatConfirmResponse', chatId: number, participantIds?: Array<number> | null, operation: { __typename?: 'ChatOperation', delete?: boolean | null, addParticipant?: boolean | null, removeParticipant?: boolean | null, update?: boolean | null }, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type FullCommentFragment = { __typename?: 'Comment', id: number, content: string, createdAt: string, updatedAt: string, authorId: number, postId: number, upvotesCount?: number | null, isUpvoted?: VoteOptions | null, parentCommentId?: number | null, author?: { __typename?: 'User', id: number, confirmed: boolean, createdAt: string, email: string, image?: string | null, name: string, updatedAt: string } | null };

export type FullCommentResponseFragment = { __typename?: 'CommentResponse', comment?: { __typename?: 'Comment', id: number, content: string, createdAt: string, updatedAt: string, authorId: number, postId: number, upvotesCount?: number | null, isUpvoted?: VoteOptions | null, parentCommentId?: number | null, author?: { __typename?: 'User', id: number, confirmed: boolean, createdAt: string, email: string, image?: string | null, name: string, updatedAt: string } | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type FullCommentArrayResponseFragment = { __typename?: 'CommentResponse', count?: number | null, commentsArray?: Array<{ __typename?: 'Comment', id: number, content: string, createdAt: string, updatedAt: string, authorId: number, postId: number, upvotesCount?: number | null, isUpvoted?: VoteOptions | null, parentCommentId?: number | null, replies?: Array<{ __typename?: 'Comment', id: number, content: string, createdAt: string, updatedAt: string, authorId: number, postId: number, upvotesCount?: number | null, isUpvoted?: VoteOptions | null, parentCommentId?: number | null, replies?: Array<{ __typename?: 'Comment', id: number, content: string, createdAt: string, updatedAt: string, authorId: number, postId: number, upvotesCount?: number | null, isUpvoted?: VoteOptions | null, parentCommentId?: number | null, replies?: Array<{ __typename?: 'Comment', id: number, content: string, createdAt: string, updatedAt: string, authorId: number, postId: number, upvotesCount?: number | null, isUpvoted?: VoteOptions | null, parentCommentId?: number | null, author?: { __typename?: 'User', id: number, confirmed: boolean, createdAt: string, email: string, image?: string | null, name: string, updatedAt: string } | null }> | null, author?: { __typename?: 'User', id: number, confirmed: boolean, createdAt: string, email: string, image?: string | null, name: string, updatedAt: string } | null }> | null, author?: { __typename?: 'User', id: number, confirmed: boolean, createdAt: string, email: string, image?: string | null, name: string, updatedAt: string } | null }> | null, author?: { __typename?: 'User', id: number, confirmed: boolean, createdAt: string, email: string, image?: string | null, name: string, updatedAt: string } | null }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type FullCommunityFragment = { __typename?: 'Community', id: number, name: string, description: string, image?: string | null, createdAt: string, updatedAt: string, creatorId: number, postsCount?: number | null, membersCount?: number | null, isJoined?: boolean | null, isPrivate: boolean, creator?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null };

export type FullCommunityResponseFragment = { __typename?: 'CommunityResponse', count?: number | null, community?: { __typename?: 'Community', id: number, name: string, description: string, image?: string | null, createdAt: string, updatedAt: string, creatorId: number, postsCount?: number | null, membersCount?: number | null, isJoined?: boolean | null, isPrivate: boolean, creator?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type FullCommunityArrayResponseFragment = { __typename?: 'CommunityResponse', count?: number | null, communitiesArray?: Array<{ __typename?: 'Community', id: number, name: string, description: string, image?: string | null, createdAt: string, updatedAt: string, creatorId: number, postsCount?: number | null, membersCount?: number | null, isJoined?: boolean | null, isPrivate: boolean, creator?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type FullErrorFieldFragment = { __typename?: 'FieldError', field: string, message: string };

export type FullMessageFragment = { __typename?: 'Message', id: number, content: string, createdAt: string, updatedAt: string, senderId: number, chatId: number, media?: string | null, sender?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null };

export type MessageArrayResponseFragment = { __typename?: 'MessageResponse', count?: number | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, messagesArray?: Array<{ __typename?: 'Message', id: number, content: string, createdAt: string, updatedAt: string, senderId: number, chatId: number, media?: string | null, sender?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null }> | null };

export type SingleMessageResponseFragment = { __typename?: 'MessageResponse', message?: { __typename?: 'Message', id: number, content: string, createdAt: string, updatedAt: string, senderId: number, chatId: number, media?: string | null, sender?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type ConfirmResponseFragment = { __typename?: 'ConfirmResponse', success: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type FullPostFragment = { __typename?: 'Post', id: number, title: string, content: string, createdAt: string, updatedAt: string, authorId: number, communityId: number, media?: Array<string> | null, video?: string | null };

export type FullPostResponseFragment = { __typename?: 'PostResponse', count?: number | null, postsArray?: Array<{ __typename?: 'Post', upvotesCount?: number | null, isUpvoted?: VoteOptions | null, commentsCount?: number | null, id: number, title: string, content: string, createdAt: string, updatedAt: string, authorId: number, communityId: number, media?: Array<string> | null, video?: string | null, author?: { __typename?: 'User', id: number, confirmed: boolean, createdAt: string, email: string, image?: string | null, name: string, updatedAt: string } | null, community?: { __typename?: 'Community', id: number, name: string, description: string, image?: string | null, createdAt: string, updatedAt: string, creatorId: number, postsCount?: number | null, membersCount?: number | null, isJoined?: boolean | null, isPrivate: boolean, creator?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null } | null }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type FullSinglePostResponseFragment = { __typename?: 'PostResponse', post?: { __typename?: 'Post', upvotesCount?: number | null, isUpvoted?: VoteOptions | null, commentsCount?: number | null, id: number, title: string, content: string, createdAt: string, updatedAt: string, authorId: number, communityId: number, media?: Array<string> | null, video?: string | null, author?: { __typename?: 'User', id: number, confirmed: boolean, createdAt: string, email: string, image?: string | null, name: string, updatedAt: string } | null, community?: { __typename?: 'Community', id: number, name: string, description: string, image?: string | null, createdAt: string, updatedAt: string, creatorId: number, postsCount?: number | null, membersCount?: number | null, isJoined?: boolean | null, isPrivate: boolean, creator?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null } | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type FullUserFragment = { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean };

export type FullAuthorFragment = { __typename?: 'User', id: number, confirmed: boolean, createdAt: string, email: string, image?: string | null, name: string, updatedAt: string };

export type UserArrayResponseFragment = { __typename?: 'UserResponse', count?: number | null, token?: string | null, userArray?: Array<{ __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type SingleUserResponseFragment = { __typename?: 'UserResponse', count?: number | null, token?: string | null, user?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type FullVoteFragment = { __typename?: 'Vote', id: number, isUpvote: boolean, createdAt: string, updatedAt: string, userId: number, postId?: number | null, commentId?: number | null };

export type CreateChatMutationVariables = Exact<{
  options: CreateChatInput;
}>;


export type CreateChatMutation = { __typename?: 'Mutation', createChat: { __typename?: 'ChatResponse', chat?: { __typename?: 'Chat', id: number, name: string, createdAt: string, updatedAt: string, creatorId: number, isGroupChat: boolean, lastReadMessageId?: number | null, creator?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type DeleteChatMutationVariables = Exact<{
  chatId: Scalars['Float']['input'];
}>;


export type DeleteChatMutation = { __typename?: 'Mutation', deleteChat: { __typename?: 'ChatConfirmResponse', chatId: number, participantIds?: Array<number> | null, operation: { __typename?: 'ChatOperation', delete?: boolean | null, addParticipant?: boolean | null, removeParticipant?: boolean | null, update?: boolean | null }, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateChatMutationVariables = Exact<{
  options: UpdateChatInput;
}>;


export type UpdateChatMutation = { __typename?: 'Mutation', updateChat: { __typename?: 'ChatResponse', chat?: { __typename?: 'Chat', id: number, name: string, createdAt: string, updatedAt: string, creatorId: number, isGroupChat: boolean, lastReadMessageId?: number | null, creator?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type AddChatParticipantMutationVariables = Exact<{
  options: AddChatParticipantInput;
}>;


export type AddChatParticipantMutation = { __typename?: 'Mutation', addChatParticipant: { __typename?: 'ChatConfirmResponse', chatId: number, participantIds?: Array<number> | null, operation: { __typename?: 'ChatOperation', delete?: boolean | null, addParticipant?: boolean | null, removeParticipant?: boolean | null, update?: boolean | null }, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type RemoveChatParticipantMutationVariables = Exact<{
  options: AddChatParticipantInput;
}>;


export type RemoveChatParticipantMutation = { __typename?: 'Mutation', removeChatParticipant: { __typename?: 'ChatConfirmResponse', chatId: number, participantIds?: Array<number> | null, operation: { __typename?: 'ChatOperation', delete?: boolean | null, addParticipant?: boolean | null, removeParticipant?: boolean | null, update?: boolean | null }, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateCommentMutationVariables = Exact<{
  options: CreateCommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'CommentResponse', comment?: { __typename?: 'Comment', id: number, content: string, createdAt: string, updatedAt: string, authorId: number, postId: number, upvotesCount?: number | null, isUpvoted?: VoteOptions | null, parentCommentId?: number | null, author?: { __typename?: 'User', id: number, confirmed: boolean, createdAt: string, email: string, image?: string | null, name: string, updatedAt: string } | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: { __typename?: 'ConfirmResponse', success: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateCommentMutationVariables = Exact<{
  options: UpdateCommentInput;
}>;


export type UpdateCommentMutation = { __typename?: 'Mutation', updateComment?: { __typename?: 'ConfirmResponse', success: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } | null };

export type CreateCommunityMutationVariables = Exact<{
  options: CreateCommunityInput;
}>;


export type CreateCommunityMutation = { __typename?: 'Mutation', createCommunity: { __typename?: 'CommunityResponse', count?: number | null, community?: { __typename?: 'Community', id: number, name: string, description: string, image?: string | null, createdAt: string, updatedAt: string, creatorId: number, postsCount?: number | null, membersCount?: number | null, isJoined?: boolean | null, isPrivate: boolean, creator?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type JoinCommunityMutationVariables = Exact<{
  options: JoinCommunityInput;
}>;


export type JoinCommunityMutation = { __typename?: 'Mutation', joinCommunity: { __typename?: 'ConfirmResponse', success: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type LeaveCommunityMutationVariables = Exact<{
  options: LeaveCommunityInput;
}>;


export type LeaveCommunityMutation = { __typename?: 'Mutation', leaveCommunity: { __typename?: 'ConfirmResponse', success: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type DeleteCommunityMutationVariables = Exact<{
  deleteCommunityId: Scalars['Float']['input'];
}>;


export type DeleteCommunityMutation = { __typename?: 'Mutation', deleteCommunity: { __typename?: 'ConfirmResponse', success: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type HidePostMutationVariables = Exact<{
  postId: Scalars['Float']['input'];
}>;


export type HidePostMutation = { __typename?: 'Mutation', hidePost: { __typename?: 'ConfirmResponse', success: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UnhidePostMutationVariables = Exact<{
  postId: Scalars['Float']['input'];
}>;


export type UnhidePostMutation = { __typename?: 'Mutation', unhidePost: { __typename?: 'ConfirmResponse', success: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateMessageMutationVariables = Exact<{
  options: CreateMessageInput;
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage: { __typename?: 'MessageResponse', message?: { __typename?: 'Message', id: number, content: string, createdAt: string, updatedAt: string, senderId: number, chatId: number, media?: string | null, sender?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateMessageMutationVariables = Exact<{
  options: UpdateMessageInput;
}>;


export type UpdateMessageMutation = { __typename?: 'Mutation', updateMessage: { __typename?: 'ConfirmResponse', success: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type DeleteMessageMutationVariables = Exact<{
  messageId: Scalars['Float']['input'];
}>;


export type DeleteMessageMutation = { __typename?: 'Mutation', deleteMessage: { __typename?: 'ConfirmResponse', success: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreatePostMutationVariables = Exact<{
  options: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'PostResponse', post?: { __typename?: 'Post', id: number, title: string, content: string, createdAt: string, updatedAt: string, authorId: number, communityId: number, media?: Array<string> | null, video?: string | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: { __typename?: 'ConfirmResponse', success: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdatePostMutationVariables = Exact<{
  options: UpdatePostInput;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'ConfirmResponse', success: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type SavePostMutationVariables = Exact<{
  postId: Scalars['Float']['input'];
}>;


export type SavePostMutation = { __typename?: 'Mutation', savePost: { __typename?: 'ConfirmResponse', success: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UnsavePostMutationVariables = Exact<{
  postId: Scalars['Float']['input'];
}>;


export type UnsavePostMutation = { __typename?: 'Mutation', unsavePost: { __typename?: 'ConfirmResponse', success: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type RegisterMutationVariables = Exact<{
  userData: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'UserResponse', count?: number | null, token?: string | null, user?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type LoginMutationVariables = Exact<{
  userData: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'UserResponse', count?: number | null, token?: string | null, user?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logoutUser: boolean };

export type ConfirmUserMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type ConfirmUserMutation = { __typename?: 'Mutation', confirmUser: { __typename?: 'ConfirmResponse', success: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type RequestConfirmationCodeMutationVariables = Exact<{ [key: string]: never; }>;


export type RequestConfirmationCodeMutation = { __typename?: 'Mutation', requestConfirmationCode: { __typename?: 'ConfirmResponse', success: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type RequestPasswordResetMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type RequestPasswordResetMutation = { __typename?: 'Mutation', requestPasswordReset: { __typename?: 'ConfirmResponse', success: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type ResetPasswordMutationVariables = Exact<{
  options: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'ConfirmResponse', success: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateUserImageMutationVariables = Exact<{
  options: UpdateUserImageInput;
}>;


export type UpdateUserImageMutation = { __typename?: 'Mutation', updateUserImage: { __typename?: 'ConfirmResponse', success: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateUserNameMutationVariables = Exact<{
  options: UpdateUserNameInput;
}>;


export type UpdateUserNameMutation = { __typename?: 'Mutation', updateUserName: { __typename?: 'ConfirmResponse', success: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateVoteMutationVariables = Exact<{
  options: CreateVoteInput;
}>;


export type CreateVoteMutation = { __typename?: 'Mutation', createVote: { __typename?: 'VoteResponse', vote?: { __typename?: 'Vote', id: number, isUpvote: boolean, createdAt: string, updatedAt: string, userId: number, postId?: number | null, commentId?: number | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type DeleteVoteMutationVariables = Exact<{
  options: DeleteVoteOptions;
}>;


export type DeleteVoteMutation = { __typename?: 'Mutation', deleteVote: { __typename?: 'ConfirmResponse', success: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateVoteMutationVariables = Exact<{
  options: UpdateVoteInput;
}>;


export type UpdateVoteMutation = { __typename?: 'Mutation', updateVote?: { __typename?: 'ConfirmResponse', success: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } | null };

export type GetChatByIdQueryVariables = Exact<{
  chatId: Scalars['Float']['input'];
}>;


export type GetChatByIdQuery = { __typename?: 'Query', getChatById: { __typename?: 'ChatResponse', chat?: { __typename?: 'Chat', id: number, name: string, createdAt: string, updatedAt: string, creatorId: number, isGroupChat: boolean, lastReadMessageId?: number | null, creator?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetUserChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserChatsQuery = { __typename?: 'Query', getUserChats: { __typename?: 'ChatResponse', count?: number | null, chatsArray?: Array<{ __typename?: 'Chat', id: number, name: string, createdAt: string, updatedAt: string, creatorId: number, isGroupChat: boolean, lastReadMessageId?: number | null, creator?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetChatParticipantsQueryVariables = Exact<{
  chatId: Scalars['Float']['input'];
}>;


export type GetChatParticipantsQuery = { __typename?: 'Query', getChatParticipants: { __typename?: 'UserResponse', count?: number | null, token?: string | null, userArray?: Array<{ __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CheckChatParticipantQueryVariables = Exact<{
  chatId: Scalars['Float']['input'];
}>;


export type CheckChatParticipantQuery = { __typename?: 'Query', checkChatParticipant: { __typename?: 'ConfirmResponse', success: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetChatMessagesQueryVariables = Exact<{
  chatId: Scalars['Float']['input'];
}>;


export type GetChatMessagesQuery = { __typename?: 'Query', getChatMessages: { __typename?: 'MessageResponse', count?: number | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, messagesArray?: Array<{ __typename?: 'Message', id: number, content: string, createdAt: string, updatedAt: string, senderId: number, chatId: number, media?: string | null, sender?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null }> | null } };

export type NewChatSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewChatSubscription = { __typename?: 'Subscription', newChat: { __typename?: 'ChatResponse', chat?: { __typename?: 'Chat', id: number, name: string, createdAt: string, updatedAt: string, creatorId: number, isGroupChat: boolean, lastReadMessageId?: number | null, creator?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type ChatUpdatesSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ChatUpdatesSubscription = { __typename?: 'Subscription', chatUpdates: { __typename?: 'ChatConfirmResponse', chatId: number, participantIds?: Array<number> | null, operation: { __typename?: 'ChatOperation', delete?: boolean | null, addParticipant?: boolean | null, removeParticipant?: boolean | null, update?: boolean | null }, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetCommentQueryVariables = Exact<{
  options: GetCommentByIdInput;
}>;


export type GetCommentQuery = { __typename?: 'Query', getComment: { __typename?: 'CommentResponse', count?: number | null, commentsArray?: Array<{ __typename?: 'Comment', id: number, content: string, createdAt: string, updatedAt: string, authorId: number, postId: number, upvotesCount?: number | null, isUpvoted?: VoteOptions | null, parentCommentId?: number | null, replies?: Array<{ __typename?: 'Comment', id: number, content: string, createdAt: string, updatedAt: string, authorId: number, postId: number, upvotesCount?: number | null, isUpvoted?: VoteOptions | null, parentCommentId?: number | null, replies?: Array<{ __typename?: 'Comment', id: number, content: string, createdAt: string, updatedAt: string, authorId: number, postId: number, upvotesCount?: number | null, isUpvoted?: VoteOptions | null, parentCommentId?: number | null, replies?: Array<{ __typename?: 'Comment', id: number, content: string, createdAt: string, updatedAt: string, authorId: number, postId: number, upvotesCount?: number | null, isUpvoted?: VoteOptions | null, parentCommentId?: number | null, author?: { __typename?: 'User', id: number, confirmed: boolean, createdAt: string, email: string, image?: string | null, name: string, updatedAt: string } | null }> | null, author?: { __typename?: 'User', id: number, confirmed: boolean, createdAt: string, email: string, image?: string | null, name: string, updatedAt: string } | null }> | null, author?: { __typename?: 'User', id: number, confirmed: boolean, createdAt: string, email: string, image?: string | null, name: string, updatedAt: string } | null }> | null, author?: { __typename?: 'User', id: number, confirmed: boolean, createdAt: string, email: string, image?: string | null, name: string, updatedAt: string } | null }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetUserCommentsQueryVariables = Exact<{
  options: GetUserCommentsInput;
}>;


export type GetUserCommentsQuery = { __typename?: 'Query', getUserComments: { __typename?: 'CommentResponse', count?: number | null, commentsArray?: Array<{ __typename?: 'Comment', id: number, content: string, createdAt: string, updatedAt: string, authorId: number, postId: number, upvotesCount?: number | null, isUpvoted?: VoteOptions | null, parentCommentId?: number | null, replies?: Array<{ __typename?: 'Comment', id: number, content: string, createdAt: string, updatedAt: string, authorId: number, postId: number, upvotesCount?: number | null, isUpvoted?: VoteOptions | null, parentCommentId?: number | null, replies?: Array<{ __typename?: 'Comment', id: number, content: string, createdAt: string, updatedAt: string, authorId: number, postId: number, upvotesCount?: number | null, isUpvoted?: VoteOptions | null, parentCommentId?: number | null, replies?: Array<{ __typename?: 'Comment', id: number, content: string, createdAt: string, updatedAt: string, authorId: number, postId: number, upvotesCount?: number | null, isUpvoted?: VoteOptions | null, parentCommentId?: number | null, author?: { __typename?: 'User', id: number, confirmed: boolean, createdAt: string, email: string, image?: string | null, name: string, updatedAt: string } | null }> | null, author?: { __typename?: 'User', id: number, confirmed: boolean, createdAt: string, email: string, image?: string | null, name: string, updatedAt: string } | null }> | null, author?: { __typename?: 'User', id: number, confirmed: boolean, createdAt: string, email: string, image?: string | null, name: string, updatedAt: string } | null }> | null, author?: { __typename?: 'User', id: number, confirmed: boolean, createdAt: string, email: string, image?: string | null, name: string, updatedAt: string } | null }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetPostCommentsQueryVariables = Exact<{
  options: GetPostCommentsInput;
}>;


export type GetPostCommentsQuery = { __typename?: 'Query', getPostComments: { __typename?: 'CommentResponse', count?: number | null, commentsArray?: Array<{ __typename?: 'Comment', id: number, content: string, createdAt: string, updatedAt: string, authorId: number, postId: number, upvotesCount?: number | null, isUpvoted?: VoteOptions | null, parentCommentId?: number | null, replies?: Array<{ __typename?: 'Comment', id: number, content: string, createdAt: string, updatedAt: string, authorId: number, postId: number, upvotesCount?: number | null, isUpvoted?: VoteOptions | null, parentCommentId?: number | null, replies?: Array<{ __typename?: 'Comment', id: number, content: string, createdAt: string, updatedAt: string, authorId: number, postId: number, upvotesCount?: number | null, isUpvoted?: VoteOptions | null, parentCommentId?: number | null, replies?: Array<{ __typename?: 'Comment', id: number, content: string, createdAt: string, updatedAt: string, authorId: number, postId: number, upvotesCount?: number | null, isUpvoted?: VoteOptions | null, parentCommentId?: number | null, author?: { __typename?: 'User', id: number, confirmed: boolean, createdAt: string, email: string, image?: string | null, name: string, updatedAt: string } | null }> | null, author?: { __typename?: 'User', id: number, confirmed: boolean, createdAt: string, email: string, image?: string | null, name: string, updatedAt: string } | null }> | null, author?: { __typename?: 'User', id: number, confirmed: boolean, createdAt: string, email: string, image?: string | null, name: string, updatedAt: string } | null }> | null, author?: { __typename?: 'User', id: number, confirmed: boolean, createdAt: string, email: string, image?: string | null, name: string, updatedAt: string } | null }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetAllCommunitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCommunitiesQuery = { __typename?: 'Query', getAllCommunities: { __typename?: 'CommunityResponse', count?: number | null, communitiesArray?: Array<{ __typename?: 'Community', id: number, name: string, description: string, image?: string | null, createdAt: string, updatedAt: string, creatorId: number, postsCount?: number | null, membersCount?: number | null, isJoined?: boolean | null, isPrivate: boolean, creator?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetUserCommunitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserCommunitiesQuery = { __typename?: 'Query', getUserCommunities: { __typename?: 'CommunityResponse', count?: number | null, communitiesArray?: Array<{ __typename?: 'Community', id: number, name: string, description: string, image?: string | null, createdAt: string, updatedAt: string, creatorId: number, postsCount?: number | null, membersCount?: number | null, isJoined?: boolean | null, isPrivate: boolean, creator?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetCommunityByNameQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type GetCommunityByNameQuery = { __typename?: 'Query', getCommunityByName: { __typename?: 'CommunityResponse', count?: number | null, community?: { __typename?: 'Community', id: number, name: string, description: string, image?: string | null, createdAt: string, updatedAt: string, creatorId: number, postsCount?: number | null, membersCount?: number | null, isJoined?: boolean | null, isPrivate: boolean, creator?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetExploreCommunitiesQueryVariables = Exact<{
  limit: Scalars['Float']['input'];
}>;


export type GetExploreCommunitiesQuery = { __typename?: 'Query', getExploreCommunities: { __typename?: 'CommunityResponse', count?: number | null, communitiesArray?: Array<{ __typename?: 'Community', id: number, name: string, description: string, image?: string | null, createdAt: string, updatedAt: string, creatorId: number, postsCount?: number | null, membersCount?: number | null, isJoined?: boolean | null, isPrivate: boolean, creator?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type SearchCommunitiesQueryVariables = Exact<{
  options: GetSearchResultInput;
}>;


export type SearchCommunitiesQuery = { __typename?: 'Query', searchCommunities: { __typename?: 'CommunityResponse', count?: number | null, communitiesArray?: Array<{ __typename?: 'Community', id: number, name: string, description: string, image?: string | null, createdAt: string, updatedAt: string, creatorId: number, postsCount?: number | null, membersCount?: number | null, isJoined?: boolean | null, isPrivate: boolean, creator?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetUserHiddenPostsQueryVariables = Exact<{
  options: GetUserHiddenPostsInput;
}>;


export type GetUserHiddenPostsQuery = { __typename?: 'Query', getUserHiddenPosts: { __typename?: 'PostResponse', count?: number | null, postsArray?: Array<{ __typename?: 'Post', upvotesCount?: number | null, isUpvoted?: VoteOptions | null, commentsCount?: number | null, id: number, title: string, content: string, createdAt: string, updatedAt: string, authorId: number, communityId: number, media?: Array<string> | null, video?: string | null, author?: { __typename?: 'User', id: number, confirmed: boolean, createdAt: string, email: string, image?: string | null, name: string, updatedAt: string } | null, community?: { __typename?: 'Community', id: number, name: string, description: string, image?: string | null, createdAt: string, updatedAt: string, creatorId: number, postsCount?: number | null, membersCount?: number | null, isJoined?: boolean | null, isPrivate: boolean, creator?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null } | null }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type NewMessageSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewMessageSubscription = { __typename?: 'Subscription', newMessage: { __typename?: 'MessageResponse', message?: { __typename?: 'Message', id: number, content: string, createdAt: string, updatedAt: string, senderId: number, chatId: number, media?: string | null, sender?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetAllPostsQueryVariables = Exact<{
  options: GetAllPostsInput;
}>;


export type GetAllPostsQuery = { __typename?: 'Query', getAllPosts: { __typename?: 'PostResponse', count?: number | null, postsArray?: Array<{ __typename?: 'Post', upvotesCount?: number | null, isUpvoted?: VoteOptions | null, commentsCount?: number | null, id: number, title: string, content: string, createdAt: string, updatedAt: string, authorId: number, communityId: number, media?: Array<string> | null, video?: string | null, author?: { __typename?: 'User', id: number, confirmed: boolean, createdAt: string, email: string, image?: string | null, name: string, updatedAt: string } | null, community?: { __typename?: 'Community', id: number, name: string, description: string, image?: string | null, createdAt: string, updatedAt: string, creatorId: number, postsCount?: number | null, membersCount?: number | null, isJoined?: boolean | null, isPrivate: boolean, creator?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null } | null }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetUserCommunityPostsQueryVariables = Exact<{
  options: GetUserCommunityPostsInput;
}>;


export type GetUserCommunityPostsQuery = { __typename?: 'Query', getUserCommunityPosts: { __typename?: 'PostResponse', count?: number | null, postsArray?: Array<{ __typename?: 'Post', upvotesCount?: number | null, isUpvoted?: VoteOptions | null, commentsCount?: number | null, id: number, title: string, content: string, createdAt: string, updatedAt: string, authorId: number, communityId: number, media?: Array<string> | null, video?: string | null, author?: { __typename?: 'User', id: number, confirmed: boolean, createdAt: string, email: string, image?: string | null, name: string, updatedAt: string } | null, community?: { __typename?: 'Community', id: number, name: string, description: string, image?: string | null, createdAt: string, updatedAt: string, creatorId: number, postsCount?: number | null, membersCount?: number | null, isJoined?: boolean | null, isPrivate: boolean, creator?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null } | null }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetPostByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetPostByIdQuery = { __typename?: 'Query', getPost: { __typename?: 'PostResponse', post?: { __typename?: 'Post', upvotesCount?: number | null, isUpvoted?: VoteOptions | null, commentsCount?: number | null, id: number, title: string, content: string, createdAt: string, updatedAt: string, authorId: number, communityId: number, media?: Array<string> | null, video?: string | null, author?: { __typename?: 'User', id: number, confirmed: boolean, createdAt: string, email: string, image?: string | null, name: string, updatedAt: string } | null, community?: { __typename?: 'Community', id: number, name: string, description: string, image?: string | null, createdAt: string, updatedAt: string, creatorId: number, postsCount?: number | null, membersCount?: number | null, isJoined?: boolean | null, isPrivate: boolean, creator?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null } | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetUserPostsQueryVariables = Exact<{
  options: GetUserPostsInput;
}>;


export type GetUserPostsQuery = { __typename?: 'Query', getUserPosts: { __typename?: 'PostResponse', count?: number | null, postsArray?: Array<{ __typename?: 'Post', upvotesCount?: number | null, isUpvoted?: VoteOptions | null, commentsCount?: number | null, id: number, title: string, content: string, createdAt: string, updatedAt: string, authorId: number, communityId: number, media?: Array<string> | null, video?: string | null, author?: { __typename?: 'User', id: number, confirmed: boolean, createdAt: string, email: string, image?: string | null, name: string, updatedAt: string } | null, community?: { __typename?: 'Community', id: number, name: string, description: string, image?: string | null, createdAt: string, updatedAt: string, creatorId: number, postsCount?: number | null, membersCount?: number | null, isJoined?: boolean | null, isPrivate: boolean, creator?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null } | null }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type SearchPostsQueryVariables = Exact<{
  options: GetSearchResultInput;
}>;


export type SearchPostsQuery = { __typename?: 'Query', searchPosts: { __typename?: 'PostResponse', count?: number | null, postsArray?: Array<{ __typename?: 'Post', upvotesCount?: number | null, isUpvoted?: VoteOptions | null, commentsCount?: number | null, id: number, title: string, content: string, createdAt: string, updatedAt: string, authorId: number, communityId: number, media?: Array<string> | null, video?: string | null, author?: { __typename?: 'User', id: number, confirmed: boolean, createdAt: string, email: string, image?: string | null, name: string, updatedAt: string } | null, community?: { __typename?: 'Community', id: number, name: string, description: string, image?: string | null, createdAt: string, updatedAt: string, creatorId: number, postsCount?: number | null, membersCount?: number | null, isJoined?: boolean | null, isPrivate: boolean, creator?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null } | null }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetCommunityPostsQueryVariables = Exact<{
  options: GetCommunityPostsInput;
}>;


export type GetCommunityPostsQuery = { __typename?: 'Query', getCommunityPosts: { __typename?: 'PostResponse', count?: number | null, postsArray?: Array<{ __typename?: 'Post', upvotesCount?: number | null, isUpvoted?: VoteOptions | null, commentsCount?: number | null, id: number, title: string, content: string, createdAt: string, updatedAt: string, authorId: number, communityId: number, media?: Array<string> | null, video?: string | null, author?: { __typename?: 'User', id: number, confirmed: boolean, createdAt: string, email: string, image?: string | null, name: string, updatedAt: string } | null, community?: { __typename?: 'Community', id: number, name: string, description: string, image?: string | null, createdAt: string, updatedAt: string, creatorId: number, postsCount?: number | null, membersCount?: number | null, isJoined?: boolean | null, isPrivate: boolean, creator?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null } | null }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetUserVotedPostsQueryVariables = Exact<{
  options: GetUserVotedPostsOptions;
}>;


export type GetUserVotedPostsQuery = { __typename?: 'Query', getUserVotedPosts: { __typename?: 'PostResponse', count?: number | null, postsArray?: Array<{ __typename?: 'Post', upvotesCount?: number | null, isUpvoted?: VoteOptions | null, commentsCount?: number | null, id: number, title: string, content: string, createdAt: string, updatedAt: string, authorId: number, communityId: number, media?: Array<string> | null, video?: string | null, author?: { __typename?: 'User', id: number, confirmed: boolean, createdAt: string, email: string, image?: string | null, name: string, updatedAt: string } | null, community?: { __typename?: 'Community', id: number, name: string, description: string, image?: string | null, createdAt: string, updatedAt: string, creatorId: number, postsCount?: number | null, membersCount?: number | null, isJoined?: boolean | null, isPrivate: boolean, creator?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null } | null }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetSavedPostsIdsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSavedPostsIdsQuery = { __typename?: 'Query', getSavedPostsIds: Array<number> };

export type GetSavedPostsQueryVariables = Exact<{
  options: GetAllPostsInput;
}>;


export type GetSavedPostsQuery = { __typename?: 'Query', getSavedPosts: { __typename?: 'PostResponse', count?: number | null, postsArray?: Array<{ __typename?: 'Post', upvotesCount?: number | null, isUpvoted?: VoteOptions | null, commentsCount?: number | null, id: number, title: string, content: string, createdAt: string, updatedAt: string, authorId: number, communityId: number, media?: Array<string> | null, video?: string | null, author?: { __typename?: 'User', id: number, confirmed: boolean, createdAt: string, email: string, image?: string | null, name: string, updatedAt: string } | null, community?: { __typename?: 'Community', id: number, name: string, description: string, image?: string | null, createdAt: string, updatedAt: string, creatorId: number, postsCount?: number | null, membersCount?: number | null, isJoined?: boolean | null, isPrivate: boolean, creator?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null } | null }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'UserResponse', count?: number | null, token?: string | null, user?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CheckTokenQueryVariables = Exact<{
  options: CheckTokenInput;
}>;


export type CheckTokenQuery = { __typename?: 'Query', checkToken: { __typename?: 'ConfirmResponse', success: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', getUserById: { __typename?: 'UserResponse', count?: number | null, token?: string | null, user?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetUserByNameQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type GetUserByNameQuery = { __typename?: 'Query', getUserByName: { __typename?: 'UserResponse', count?: number | null, token?: string | null, user?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type SearchForUserQueryVariables = Exact<{
  options: GetSearchResultInput;
}>;


export type SearchForUserQuery = { __typename?: 'Query', searchForUser: { __typename?: 'UserResponse', count?: number | null, token?: string | null, userArray?: Array<{ __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export const FullUserFragmentDoc = gql`
    fragment FullUser on User {
  id
  name
  email
  image
  createdAt
  updatedAt
  confirmed
}
    `;
export const FullChatFragmentDoc = gql`
    fragment FullChat on Chat {
  id
  name
  createdAt
  updatedAt
  creatorId
  isGroupChat
  lastReadMessageId
  creator {
    ...FullUser
  }
}
    ${FullUserFragmentDoc}`;
export const FullErrorFieldFragmentDoc = gql`
    fragment FullErrorField on FieldError {
  field
  message
}
    `;
export const SingleChatResponseFragmentDoc = gql`
    fragment SingleChatResponse on ChatResponse {
  chat {
    ...FullChat
  }
  errors {
    ...FullErrorField
  }
}
    ${FullChatFragmentDoc}
${FullErrorFieldFragmentDoc}`;
export const ChatArrayResponseFragmentDoc = gql`
    fragment ChatArrayResponse on ChatResponse {
  chatsArray {
    ...FullChat
  }
  count
  errors {
    ...FullErrorField
  }
}
    ${FullChatFragmentDoc}
${FullErrorFieldFragmentDoc}`;
export const FullChatConfirmResponseFragmentDoc = gql`
    fragment FullChatConfirmResponse on ChatConfirmResponse {
  operation {
    delete
    addParticipant
    removeParticipant
    update
  }
  chatId
  participantIds
  errors {
    field
    message
  }
}
    `;
export const FullAuthorFragmentDoc = gql`
    fragment FullAuthor on User {
  id
  confirmed
  createdAt
  email
  id
  image
  name
  updatedAt
}
    `;
export const FullCommentFragmentDoc = gql`
    fragment FullComment on Comment {
  id
  content
  createdAt
  updatedAt
  authorId
  postId
  upvotesCount
  isUpvoted
  author {
    ...FullAuthor
  }
  parentCommentId
}
    ${FullAuthorFragmentDoc}`;
export const FullCommentResponseFragmentDoc = gql`
    fragment FullCommentResponse on CommentResponse {
  comment {
    ...FullComment
  }
  errors {
    ...FullErrorField
  }
}
    ${FullCommentFragmentDoc}
${FullErrorFieldFragmentDoc}`;
export const FullCommentArrayResponseFragmentDoc = gql`
    fragment FullCommentArrayResponse on CommentResponse {
  commentsArray {
    ...FullComment
    replies {
      ...FullComment
      replies {
        ...FullComment
        replies {
          ...FullComment
        }
      }
    }
  }
  errors {
    ...FullErrorField
  }
  count
}
    ${FullCommentFragmentDoc}
${FullErrorFieldFragmentDoc}`;
export const FullCommunityFragmentDoc = gql`
    fragment FullCommunity on Community {
  id
  name
  description
  image
  createdAt
  updatedAt
  creatorId
  postsCount
  membersCount
  isJoined
  isPrivate
  creator {
    ...FullUser
  }
}
    ${FullUserFragmentDoc}`;
export const FullCommunityResponseFragmentDoc = gql`
    fragment FullCommunityResponse on CommunityResponse {
  community {
    ...FullCommunity
  }
  errors {
    ...FullErrorField
  }
  count
}
    ${FullCommunityFragmentDoc}
${FullErrorFieldFragmentDoc}`;
export const FullCommunityArrayResponseFragmentDoc = gql`
    fragment FullCommunityArrayResponse on CommunityResponse {
  communitiesArray {
    ...FullCommunity
  }
  errors {
    ...FullErrorField
  }
  count
}
    ${FullCommunityFragmentDoc}
${FullErrorFieldFragmentDoc}`;
export const FullMessageFragmentDoc = gql`
    fragment FullMessage on Message {
  id
  content
  createdAt
  updatedAt
  senderId
  chatId
  media
  sender {
    ...FullUser
  }
}
    ${FullUserFragmentDoc}`;
export const MessageArrayResponseFragmentDoc = gql`
    fragment MessageArrayResponse on MessageResponse {
  count
  errors {
    ...FullErrorField
  }
  messagesArray {
    ...FullMessage
  }
}
    ${FullErrorFieldFragmentDoc}
${FullMessageFragmentDoc}`;
export const SingleMessageResponseFragmentDoc = gql`
    fragment SingleMessageResponse on MessageResponse {
  message {
    ...FullMessage
  }
  errors {
    ...FullErrorField
  }
}
    ${FullMessageFragmentDoc}
${FullErrorFieldFragmentDoc}`;
export const ConfirmResponseFragmentDoc = gql`
    fragment ConfirmResponse on ConfirmResponse {
  success
  errors {
    ...FullErrorField
  }
}
    ${FullErrorFieldFragmentDoc}`;
export const FullPostFragmentDoc = gql`
    fragment FullPost on Post {
  id
  title
  content
  createdAt
  updatedAt
  authorId
  communityId
  media
  video
}
    `;
export const FullPostResponseFragmentDoc = gql`
    fragment FullPostResponse on PostResponse {
  postsArray {
    ...FullPost
    upvotesCount
    isUpvoted
    commentsCount
    author {
      ...FullAuthor
    }
    community {
      ...FullCommunity
    }
  }
  errors {
    ...FullErrorField
  }
  count
}
    ${FullPostFragmentDoc}
${FullAuthorFragmentDoc}
${FullCommunityFragmentDoc}
${FullErrorFieldFragmentDoc}`;
export const FullSinglePostResponseFragmentDoc = gql`
    fragment FullSinglePostResponse on PostResponse {
  post {
    ...FullPost
    upvotesCount
    isUpvoted
    commentsCount
    author {
      ...FullAuthor
    }
    community {
      ...FullCommunity
    }
  }
  errors {
    ...FullErrorField
  }
}
    ${FullPostFragmentDoc}
${FullAuthorFragmentDoc}
${FullCommunityFragmentDoc}
${FullErrorFieldFragmentDoc}`;
export const UserArrayResponseFragmentDoc = gql`
    fragment UserArrayResponse on UserResponse {
  userArray {
    ...FullUser
  }
  errors {
    ...FullErrorField
  }
  count
  token
}
    ${FullUserFragmentDoc}
${FullErrorFieldFragmentDoc}`;
export const SingleUserResponseFragmentDoc = gql`
    fragment SingleUserResponse on UserResponse {
  user {
    ...FullUser
  }
  errors {
    ...FullErrorField
  }
  count
  token
}
    ${FullUserFragmentDoc}
${FullErrorFieldFragmentDoc}`;
export const FullVoteFragmentDoc = gql`
    fragment FullVote on Vote {
  id
  isUpvote
  createdAt
  updatedAt
  userId
  postId
  commentId
}
    `;
export const CreateChatDocument = gql`
    mutation CreateChat($options: CreateChatInput!) {
  createChat(options: $options) {
    ...SingleChatResponse
  }
}
    ${SingleChatResponseFragmentDoc}`;
export type CreateChatMutationFn = Apollo.MutationFunction<CreateChatMutation, CreateChatMutationVariables>;

/**
 * __useCreateChatMutation__
 *
 * To run a mutation, you first call `useCreateChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChatMutation, { data, loading, error }] = useCreateChatMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateChatMutation(baseOptions?: Apollo.MutationHookOptions<CreateChatMutation, CreateChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChatMutation, CreateChatMutationVariables>(CreateChatDocument, options);
      }
export type CreateChatMutationHookResult = ReturnType<typeof useCreateChatMutation>;
export type CreateChatMutationResult = Apollo.MutationResult<CreateChatMutation>;
export type CreateChatMutationOptions = Apollo.BaseMutationOptions<CreateChatMutation, CreateChatMutationVariables>;
export const DeleteChatDocument = gql`
    mutation DeleteChat($chatId: Float!) {
  deleteChat(chatId: $chatId) {
    ...FullChatConfirmResponse
  }
}
    ${FullChatConfirmResponseFragmentDoc}`;
export type DeleteChatMutationFn = Apollo.MutationFunction<DeleteChatMutation, DeleteChatMutationVariables>;

/**
 * __useDeleteChatMutation__
 *
 * To run a mutation, you first call `useDeleteChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteChatMutation, { data, loading, error }] = useDeleteChatMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useDeleteChatMutation(baseOptions?: Apollo.MutationHookOptions<DeleteChatMutation, DeleteChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteChatMutation, DeleteChatMutationVariables>(DeleteChatDocument, options);
      }
export type DeleteChatMutationHookResult = ReturnType<typeof useDeleteChatMutation>;
export type DeleteChatMutationResult = Apollo.MutationResult<DeleteChatMutation>;
export type DeleteChatMutationOptions = Apollo.BaseMutationOptions<DeleteChatMutation, DeleteChatMutationVariables>;
export const UpdateChatDocument = gql`
    mutation UpdateChat($options: UpdateChatInput!) {
  updateChat(options: $options) {
    ...SingleChatResponse
  }
}
    ${SingleChatResponseFragmentDoc}`;
export type UpdateChatMutationFn = Apollo.MutationFunction<UpdateChatMutation, UpdateChatMutationVariables>;

/**
 * __useUpdateChatMutation__
 *
 * To run a mutation, you first call `useUpdateChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChatMutation, { data, loading, error }] = useUpdateChatMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useUpdateChatMutation(baseOptions?: Apollo.MutationHookOptions<UpdateChatMutation, UpdateChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateChatMutation, UpdateChatMutationVariables>(UpdateChatDocument, options);
      }
export type UpdateChatMutationHookResult = ReturnType<typeof useUpdateChatMutation>;
export type UpdateChatMutationResult = Apollo.MutationResult<UpdateChatMutation>;
export type UpdateChatMutationOptions = Apollo.BaseMutationOptions<UpdateChatMutation, UpdateChatMutationVariables>;
export const AddChatParticipantDocument = gql`
    mutation AddChatParticipant($options: AddChatParticipantInput!) {
  addChatParticipant(options: $options) {
    ...FullChatConfirmResponse
  }
}
    ${FullChatConfirmResponseFragmentDoc}`;
export type AddChatParticipantMutationFn = Apollo.MutationFunction<AddChatParticipantMutation, AddChatParticipantMutationVariables>;

/**
 * __useAddChatParticipantMutation__
 *
 * To run a mutation, you first call `useAddChatParticipantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddChatParticipantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addChatParticipantMutation, { data, loading, error }] = useAddChatParticipantMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useAddChatParticipantMutation(baseOptions?: Apollo.MutationHookOptions<AddChatParticipantMutation, AddChatParticipantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddChatParticipantMutation, AddChatParticipantMutationVariables>(AddChatParticipantDocument, options);
      }
export type AddChatParticipantMutationHookResult = ReturnType<typeof useAddChatParticipantMutation>;
export type AddChatParticipantMutationResult = Apollo.MutationResult<AddChatParticipantMutation>;
export type AddChatParticipantMutationOptions = Apollo.BaseMutationOptions<AddChatParticipantMutation, AddChatParticipantMutationVariables>;
export const RemoveChatParticipantDocument = gql`
    mutation RemoveChatParticipant($options: AddChatParticipantInput!) {
  removeChatParticipant(options: $options) {
    ...FullChatConfirmResponse
  }
}
    ${FullChatConfirmResponseFragmentDoc}`;
export type RemoveChatParticipantMutationFn = Apollo.MutationFunction<RemoveChatParticipantMutation, RemoveChatParticipantMutationVariables>;

/**
 * __useRemoveChatParticipantMutation__
 *
 * To run a mutation, you first call `useRemoveChatParticipantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveChatParticipantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeChatParticipantMutation, { data, loading, error }] = useRemoveChatParticipantMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRemoveChatParticipantMutation(baseOptions?: Apollo.MutationHookOptions<RemoveChatParticipantMutation, RemoveChatParticipantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveChatParticipantMutation, RemoveChatParticipantMutationVariables>(RemoveChatParticipantDocument, options);
      }
export type RemoveChatParticipantMutationHookResult = ReturnType<typeof useRemoveChatParticipantMutation>;
export type RemoveChatParticipantMutationResult = Apollo.MutationResult<RemoveChatParticipantMutation>;
export type RemoveChatParticipantMutationOptions = Apollo.BaseMutationOptions<RemoveChatParticipantMutation, RemoveChatParticipantMutationVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($options: CreateCommentInput!) {
  createComment(options: $options) {
    comment {
      ...FullComment
    }
    errors {
      ...FullErrorField
    }
  }
}
    ${FullCommentFragmentDoc}
${FullErrorFieldFragmentDoc}`;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation DeleteComment($id: Float!) {
  deleteComment(id: $id) {
    success
    errors {
      ...FullErrorField
    }
  }
}
    ${FullErrorFieldFragmentDoc}`;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const UpdateCommentDocument = gql`
    mutation UpdateComment($options: UpdateCommentInput!) {
  updateComment(options: $options) {
    success
    errors {
      ...FullErrorField
    }
  }
}
    ${FullErrorFieldFragmentDoc}`;
export type UpdateCommentMutationFn = Apollo.MutationFunction<UpdateCommentMutation, UpdateCommentMutationVariables>;

/**
 * __useUpdateCommentMutation__
 *
 * To run a mutation, you first call `useUpdateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommentMutation, { data, loading, error }] = useUpdateCommentMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useUpdateCommentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCommentMutation, UpdateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCommentMutation, UpdateCommentMutationVariables>(UpdateCommentDocument, options);
      }
export type UpdateCommentMutationHookResult = ReturnType<typeof useUpdateCommentMutation>;
export type UpdateCommentMutationResult = Apollo.MutationResult<UpdateCommentMutation>;
export type UpdateCommentMutationOptions = Apollo.BaseMutationOptions<UpdateCommentMutation, UpdateCommentMutationVariables>;
export const CreateCommunityDocument = gql`
    mutation CreateCommunity($options: CreateCommunityInput!) {
  createCommunity(options: $options) {
    ...FullCommunityResponse
  }
}
    ${FullCommunityResponseFragmentDoc}`;
export type CreateCommunityMutationFn = Apollo.MutationFunction<CreateCommunityMutation, CreateCommunityMutationVariables>;

/**
 * __useCreateCommunityMutation__
 *
 * To run a mutation, you first call `useCreateCommunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommunityMutation, { data, loading, error }] = useCreateCommunityMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateCommunityMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommunityMutation, CreateCommunityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommunityMutation, CreateCommunityMutationVariables>(CreateCommunityDocument, options);
      }
export type CreateCommunityMutationHookResult = ReturnType<typeof useCreateCommunityMutation>;
export type CreateCommunityMutationResult = Apollo.MutationResult<CreateCommunityMutation>;
export type CreateCommunityMutationOptions = Apollo.BaseMutationOptions<CreateCommunityMutation, CreateCommunityMutationVariables>;
export const JoinCommunityDocument = gql`
    mutation JoinCommunity($options: JoinCommunityInput!) {
  joinCommunity(options: $options) {
    success
    errors {
      ...FullErrorField
    }
  }
}
    ${FullErrorFieldFragmentDoc}`;
export type JoinCommunityMutationFn = Apollo.MutationFunction<JoinCommunityMutation, JoinCommunityMutationVariables>;

/**
 * __useJoinCommunityMutation__
 *
 * To run a mutation, you first call `useJoinCommunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinCommunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinCommunityMutation, { data, loading, error }] = useJoinCommunityMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useJoinCommunityMutation(baseOptions?: Apollo.MutationHookOptions<JoinCommunityMutation, JoinCommunityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinCommunityMutation, JoinCommunityMutationVariables>(JoinCommunityDocument, options);
      }
export type JoinCommunityMutationHookResult = ReturnType<typeof useJoinCommunityMutation>;
export type JoinCommunityMutationResult = Apollo.MutationResult<JoinCommunityMutation>;
export type JoinCommunityMutationOptions = Apollo.BaseMutationOptions<JoinCommunityMutation, JoinCommunityMutationVariables>;
export const LeaveCommunityDocument = gql`
    mutation LeaveCommunity($options: LeaveCommunityInput!) {
  leaveCommunity(options: $options) {
    success
    errors {
      ...FullErrorField
    }
  }
}
    ${FullErrorFieldFragmentDoc}`;
export type LeaveCommunityMutationFn = Apollo.MutationFunction<LeaveCommunityMutation, LeaveCommunityMutationVariables>;

/**
 * __useLeaveCommunityMutation__
 *
 * To run a mutation, you first call `useLeaveCommunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveCommunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveCommunityMutation, { data, loading, error }] = useLeaveCommunityMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useLeaveCommunityMutation(baseOptions?: Apollo.MutationHookOptions<LeaveCommunityMutation, LeaveCommunityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LeaveCommunityMutation, LeaveCommunityMutationVariables>(LeaveCommunityDocument, options);
      }
export type LeaveCommunityMutationHookResult = ReturnType<typeof useLeaveCommunityMutation>;
export type LeaveCommunityMutationResult = Apollo.MutationResult<LeaveCommunityMutation>;
export type LeaveCommunityMutationOptions = Apollo.BaseMutationOptions<LeaveCommunityMutation, LeaveCommunityMutationVariables>;
export const DeleteCommunityDocument = gql`
    mutation DeleteCommunity($deleteCommunityId: Float!) {
  deleteCommunity(id: $deleteCommunityId) {
    success
    errors {
      ...FullErrorField
    }
  }
}
    ${FullErrorFieldFragmentDoc}`;
export type DeleteCommunityMutationFn = Apollo.MutationFunction<DeleteCommunityMutation, DeleteCommunityMutationVariables>;

/**
 * __useDeleteCommunityMutation__
 *
 * To run a mutation, you first call `useDeleteCommunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommunityMutation, { data, loading, error }] = useDeleteCommunityMutation({
 *   variables: {
 *      deleteCommunityId: // value for 'deleteCommunityId'
 *   },
 * });
 */
export function useDeleteCommunityMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommunityMutation, DeleteCommunityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommunityMutation, DeleteCommunityMutationVariables>(DeleteCommunityDocument, options);
      }
export type DeleteCommunityMutationHookResult = ReturnType<typeof useDeleteCommunityMutation>;
export type DeleteCommunityMutationResult = Apollo.MutationResult<DeleteCommunityMutation>;
export type DeleteCommunityMutationOptions = Apollo.BaseMutationOptions<DeleteCommunityMutation, DeleteCommunityMutationVariables>;
export const HidePostDocument = gql`
    mutation HidePost($postId: Float!) {
  hidePost(postId: $postId) {
    success
    errors {
      ...FullErrorField
    }
  }
}
    ${FullErrorFieldFragmentDoc}`;
export type HidePostMutationFn = Apollo.MutationFunction<HidePostMutation, HidePostMutationVariables>;

/**
 * __useHidePostMutation__
 *
 * To run a mutation, you first call `useHidePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHidePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [hidePostMutation, { data, loading, error }] = useHidePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useHidePostMutation(baseOptions?: Apollo.MutationHookOptions<HidePostMutation, HidePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<HidePostMutation, HidePostMutationVariables>(HidePostDocument, options);
      }
export type HidePostMutationHookResult = ReturnType<typeof useHidePostMutation>;
export type HidePostMutationResult = Apollo.MutationResult<HidePostMutation>;
export type HidePostMutationOptions = Apollo.BaseMutationOptions<HidePostMutation, HidePostMutationVariables>;
export const UnhidePostDocument = gql`
    mutation UnhidePost($postId: Float!) {
  unhidePost(postId: $postId) {
    success
    errors {
      field
      message
    }
  }
}
    `;
export type UnhidePostMutationFn = Apollo.MutationFunction<UnhidePostMutation, UnhidePostMutationVariables>;

/**
 * __useUnhidePostMutation__
 *
 * To run a mutation, you first call `useUnhidePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnhidePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unhidePostMutation, { data, loading, error }] = useUnhidePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useUnhidePostMutation(baseOptions?: Apollo.MutationHookOptions<UnhidePostMutation, UnhidePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnhidePostMutation, UnhidePostMutationVariables>(UnhidePostDocument, options);
      }
export type UnhidePostMutationHookResult = ReturnType<typeof useUnhidePostMutation>;
export type UnhidePostMutationResult = Apollo.MutationResult<UnhidePostMutation>;
export type UnhidePostMutationOptions = Apollo.BaseMutationOptions<UnhidePostMutation, UnhidePostMutationVariables>;
export const CreateMessageDocument = gql`
    mutation CreateMessage($options: CreateMessageInput!) {
  createMessage(options: $options) {
    ...SingleMessageResponse
  }
}
    ${SingleMessageResponseFragmentDoc}`;
export type CreateMessageMutationFn = Apollo.MutationFunction<CreateMessageMutation, CreateMessageMutationVariables>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument, options);
      }
export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = Apollo.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = Apollo.BaseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>;
export const UpdateMessageDocument = gql`
    mutation UpdateMessage($options: UpdateMessageInput!) {
  updateMessage(options: $options) {
    ...ConfirmResponse
  }
}
    ${ConfirmResponseFragmentDoc}`;
export type UpdateMessageMutationFn = Apollo.MutationFunction<UpdateMessageMutation, UpdateMessageMutationVariables>;

/**
 * __useUpdateMessageMutation__
 *
 * To run a mutation, you first call `useUpdateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMessageMutation, { data, loading, error }] = useUpdateMessageMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useUpdateMessageMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMessageMutation, UpdateMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMessageMutation, UpdateMessageMutationVariables>(UpdateMessageDocument, options);
      }
export type UpdateMessageMutationHookResult = ReturnType<typeof useUpdateMessageMutation>;
export type UpdateMessageMutationResult = Apollo.MutationResult<UpdateMessageMutation>;
export type UpdateMessageMutationOptions = Apollo.BaseMutationOptions<UpdateMessageMutation, UpdateMessageMutationVariables>;
export const DeleteMessageDocument = gql`
    mutation DeleteMessage($messageId: Float!) {
  deleteMessage(messageId: $messageId) {
    ...ConfirmResponse
  }
}
    ${ConfirmResponseFragmentDoc}`;
export type DeleteMessageMutationFn = Apollo.MutationFunction<DeleteMessageMutation, DeleteMessageMutationVariables>;

/**
 * __useDeleteMessageMutation__
 *
 * To run a mutation, you first call `useDeleteMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMessageMutation, { data, loading, error }] = useDeleteMessageMutation({
 *   variables: {
 *      messageId: // value for 'messageId'
 *   },
 * });
 */
export function useDeleteMessageMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMessageMutation, DeleteMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMessageMutation, DeleteMessageMutationVariables>(DeleteMessageDocument, options);
      }
export type DeleteMessageMutationHookResult = ReturnType<typeof useDeleteMessageMutation>;
export type DeleteMessageMutationResult = Apollo.MutationResult<DeleteMessageMutation>;
export type DeleteMessageMutationOptions = Apollo.BaseMutationOptions<DeleteMessageMutation, DeleteMessageMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($options: CreatePostInput!) {
  createPost(options: $options) {
    post {
      ...FullPost
    }
    errors {
      ...FullErrorField
    }
  }
}
    ${FullPostFragmentDoc}
${FullErrorFieldFragmentDoc}`;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($id: Float!) {
  deletePost(id: $id) {
    success
    errors {
      ...FullErrorField
    }
  }
}
    ${FullErrorFieldFragmentDoc}`;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($options: UpdatePostInput!) {
  updatePost(options: $options) {
    success
    errors {
      ...FullErrorField
    }
  }
}
    ${FullErrorFieldFragmentDoc}`;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const SavePostDocument = gql`
    mutation SavePost($postId: Float!) {
  savePost(postId: $postId) {
    success
    errors {
      field
      message
    }
  }
}
    `;
export type SavePostMutationFn = Apollo.MutationFunction<SavePostMutation, SavePostMutationVariables>;

/**
 * __useSavePostMutation__
 *
 * To run a mutation, you first call `useSavePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSavePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [savePostMutation, { data, loading, error }] = useSavePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useSavePostMutation(baseOptions?: Apollo.MutationHookOptions<SavePostMutation, SavePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SavePostMutation, SavePostMutationVariables>(SavePostDocument, options);
      }
export type SavePostMutationHookResult = ReturnType<typeof useSavePostMutation>;
export type SavePostMutationResult = Apollo.MutationResult<SavePostMutation>;
export type SavePostMutationOptions = Apollo.BaseMutationOptions<SavePostMutation, SavePostMutationVariables>;
export const UnsavePostDocument = gql`
    mutation UnsavePost($postId: Float!) {
  unsavePost(postId: $postId) {
    success
    errors {
      field
      message
    }
  }
}
    `;
export type UnsavePostMutationFn = Apollo.MutationFunction<UnsavePostMutation, UnsavePostMutationVariables>;

/**
 * __useUnsavePostMutation__
 *
 * To run a mutation, you first call `useUnsavePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnsavePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unsavePostMutation, { data, loading, error }] = useUnsavePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useUnsavePostMutation(baseOptions?: Apollo.MutationHookOptions<UnsavePostMutation, UnsavePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnsavePostMutation, UnsavePostMutationVariables>(UnsavePostDocument, options);
      }
export type UnsavePostMutationHookResult = ReturnType<typeof useUnsavePostMutation>;
export type UnsavePostMutationResult = Apollo.MutationResult<UnsavePostMutation>;
export type UnsavePostMutationOptions = Apollo.BaseMutationOptions<UnsavePostMutation, UnsavePostMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($userData: RegisterInput!) {
  registerUser(userData: $userData) {
    ...SingleUserResponse
  }
}
    ${SingleUserResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      userData: // value for 'userData'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = gql`
    mutation Login($userData: LoginInput!) {
  loginUser(userData: $userData) {
    ...SingleUserResponse
  }
}
    ${SingleUserResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      userData: // value for 'userData'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logoutUser
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const ConfirmUserDocument = gql`
    mutation ConfirmUser($code: String!) {
  confirmUser(code: $code) {
    ...ConfirmResponse
  }
}
    ${ConfirmResponseFragmentDoc}`;
export type ConfirmUserMutationFn = Apollo.MutationFunction<ConfirmUserMutation, ConfirmUserMutationVariables>;

/**
 * __useConfirmUserMutation__
 *
 * To run a mutation, you first call `useConfirmUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmUserMutation, { data, loading, error }] = useConfirmUserMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useConfirmUserMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmUserMutation, ConfirmUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmUserMutation, ConfirmUserMutationVariables>(ConfirmUserDocument, options);
      }
export type ConfirmUserMutationHookResult = ReturnType<typeof useConfirmUserMutation>;
export type ConfirmUserMutationResult = Apollo.MutationResult<ConfirmUserMutation>;
export type ConfirmUserMutationOptions = Apollo.BaseMutationOptions<ConfirmUserMutation, ConfirmUserMutationVariables>;
export const RequestConfirmationCodeDocument = gql`
    mutation RequestConfirmationCode {
  requestConfirmationCode {
    ...ConfirmResponse
  }
}
    ${ConfirmResponseFragmentDoc}`;
export type RequestConfirmationCodeMutationFn = Apollo.MutationFunction<RequestConfirmationCodeMutation, RequestConfirmationCodeMutationVariables>;

/**
 * __useRequestConfirmationCodeMutation__
 *
 * To run a mutation, you first call `useRequestConfirmationCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestConfirmationCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestConfirmationCodeMutation, { data, loading, error }] = useRequestConfirmationCodeMutation({
 *   variables: {
 *   },
 * });
 */
export function useRequestConfirmationCodeMutation(baseOptions?: Apollo.MutationHookOptions<RequestConfirmationCodeMutation, RequestConfirmationCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestConfirmationCodeMutation, RequestConfirmationCodeMutationVariables>(RequestConfirmationCodeDocument, options);
      }
export type RequestConfirmationCodeMutationHookResult = ReturnType<typeof useRequestConfirmationCodeMutation>;
export type RequestConfirmationCodeMutationResult = Apollo.MutationResult<RequestConfirmationCodeMutation>;
export type RequestConfirmationCodeMutationOptions = Apollo.BaseMutationOptions<RequestConfirmationCodeMutation, RequestConfirmationCodeMutationVariables>;
export const RequestPasswordResetDocument = gql`
    mutation RequestPasswordReset($email: String!) {
  requestPasswordReset(email: $email) {
    ...ConfirmResponse
  }
}
    ${ConfirmResponseFragmentDoc}`;
export type RequestPasswordResetMutationFn = Apollo.MutationFunction<RequestPasswordResetMutation, RequestPasswordResetMutationVariables>;

/**
 * __useRequestPasswordResetMutation__
 *
 * To run a mutation, you first call `useRequestPasswordResetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestPasswordResetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestPasswordResetMutation, { data, loading, error }] = useRequestPasswordResetMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useRequestPasswordResetMutation(baseOptions?: Apollo.MutationHookOptions<RequestPasswordResetMutation, RequestPasswordResetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestPasswordResetMutation, RequestPasswordResetMutationVariables>(RequestPasswordResetDocument, options);
      }
export type RequestPasswordResetMutationHookResult = ReturnType<typeof useRequestPasswordResetMutation>;
export type RequestPasswordResetMutationResult = Apollo.MutationResult<RequestPasswordResetMutation>;
export type RequestPasswordResetMutationOptions = Apollo.BaseMutationOptions<RequestPasswordResetMutation, RequestPasswordResetMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($options: ResetPasswordInput!) {
  resetPassword(options: $options) {
    ...ConfirmResponse
  }
}
    ${ConfirmResponseFragmentDoc}`;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const UpdateUserImageDocument = gql`
    mutation UpdateUserImage($options: UpdateUserImageInput!) {
  updateUserImage(options: $options) {
    ...ConfirmResponse
  }
}
    ${ConfirmResponseFragmentDoc}`;
export type UpdateUserImageMutationFn = Apollo.MutationFunction<UpdateUserImageMutation, UpdateUserImageMutationVariables>;

/**
 * __useUpdateUserImageMutation__
 *
 * To run a mutation, you first call `useUpdateUserImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserImageMutation, { data, loading, error }] = useUpdateUserImageMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useUpdateUserImageMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserImageMutation, UpdateUserImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserImageMutation, UpdateUserImageMutationVariables>(UpdateUserImageDocument, options);
      }
export type UpdateUserImageMutationHookResult = ReturnType<typeof useUpdateUserImageMutation>;
export type UpdateUserImageMutationResult = Apollo.MutationResult<UpdateUserImageMutation>;
export type UpdateUserImageMutationOptions = Apollo.BaseMutationOptions<UpdateUserImageMutation, UpdateUserImageMutationVariables>;
export const UpdateUserNameDocument = gql`
    mutation UpdateUserName($options: UpdateUserNameInput!) {
  updateUserName(options: $options) {
    ...ConfirmResponse
  }
}
    ${ConfirmResponseFragmentDoc}`;
export type UpdateUserNameMutationFn = Apollo.MutationFunction<UpdateUserNameMutation, UpdateUserNameMutationVariables>;

/**
 * __useUpdateUserNameMutation__
 *
 * To run a mutation, you first call `useUpdateUserNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserNameMutation, { data, loading, error }] = useUpdateUserNameMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useUpdateUserNameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserNameMutation, UpdateUserNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserNameMutation, UpdateUserNameMutationVariables>(UpdateUserNameDocument, options);
      }
export type UpdateUserNameMutationHookResult = ReturnType<typeof useUpdateUserNameMutation>;
export type UpdateUserNameMutationResult = Apollo.MutationResult<UpdateUserNameMutation>;
export type UpdateUserNameMutationOptions = Apollo.BaseMutationOptions<UpdateUserNameMutation, UpdateUserNameMutationVariables>;
export const CreateVoteDocument = gql`
    mutation CreateVote($options: CreateVoteInput!) {
  createVote(options: $options) {
    vote {
      ...FullVote
    }
    errors {
      ...FullErrorField
    }
  }
}
    ${FullVoteFragmentDoc}
${FullErrorFieldFragmentDoc}`;
export type CreateVoteMutationFn = Apollo.MutationFunction<CreateVoteMutation, CreateVoteMutationVariables>;

/**
 * __useCreateVoteMutation__
 *
 * To run a mutation, you first call `useCreateVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVoteMutation, { data, loading, error }] = useCreateVoteMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateVoteMutation(baseOptions?: Apollo.MutationHookOptions<CreateVoteMutation, CreateVoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateVoteMutation, CreateVoteMutationVariables>(CreateVoteDocument, options);
      }
export type CreateVoteMutationHookResult = ReturnType<typeof useCreateVoteMutation>;
export type CreateVoteMutationResult = Apollo.MutationResult<CreateVoteMutation>;
export type CreateVoteMutationOptions = Apollo.BaseMutationOptions<CreateVoteMutation, CreateVoteMutationVariables>;
export const DeleteVoteDocument = gql`
    mutation DeleteVote($options: DeleteVoteOptions!) {
  deleteVote(options: $options) {
    success
    errors {
      ...FullErrorField
    }
  }
}
    ${FullErrorFieldFragmentDoc}`;
export type DeleteVoteMutationFn = Apollo.MutationFunction<DeleteVoteMutation, DeleteVoteMutationVariables>;

/**
 * __useDeleteVoteMutation__
 *
 * To run a mutation, you first call `useDeleteVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteVoteMutation, { data, loading, error }] = useDeleteVoteMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useDeleteVoteMutation(baseOptions?: Apollo.MutationHookOptions<DeleteVoteMutation, DeleteVoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteVoteMutation, DeleteVoteMutationVariables>(DeleteVoteDocument, options);
      }
export type DeleteVoteMutationHookResult = ReturnType<typeof useDeleteVoteMutation>;
export type DeleteVoteMutationResult = Apollo.MutationResult<DeleteVoteMutation>;
export type DeleteVoteMutationOptions = Apollo.BaseMutationOptions<DeleteVoteMutation, DeleteVoteMutationVariables>;
export const UpdateVoteDocument = gql`
    mutation UpdateVote($options: UpdateVoteInput!) {
  updateVote(options: $options) {
    success
    errors {
      ...FullErrorField
    }
  }
}
    ${FullErrorFieldFragmentDoc}`;
export type UpdateVoteMutationFn = Apollo.MutationFunction<UpdateVoteMutation, UpdateVoteMutationVariables>;

/**
 * __useUpdateVoteMutation__
 *
 * To run a mutation, you first call `useUpdateVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVoteMutation, { data, loading, error }] = useUpdateVoteMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useUpdateVoteMutation(baseOptions?: Apollo.MutationHookOptions<UpdateVoteMutation, UpdateVoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateVoteMutation, UpdateVoteMutationVariables>(UpdateVoteDocument, options);
      }
export type UpdateVoteMutationHookResult = ReturnType<typeof useUpdateVoteMutation>;
export type UpdateVoteMutationResult = Apollo.MutationResult<UpdateVoteMutation>;
export type UpdateVoteMutationOptions = Apollo.BaseMutationOptions<UpdateVoteMutation, UpdateVoteMutationVariables>;
export const GetChatByIdDocument = gql`
    query GetChatById($chatId: Float!) {
  getChatById(chatId: $chatId) {
    ...SingleChatResponse
  }
}
    ${SingleChatResponseFragmentDoc}`;

/**
 * __useGetChatByIdQuery__
 *
 * To run a query within a React component, call `useGetChatByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatByIdQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useGetChatByIdQuery(baseOptions: Apollo.QueryHookOptions<GetChatByIdQuery, GetChatByIdQueryVariables> & ({ variables: GetChatByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChatByIdQuery, GetChatByIdQueryVariables>(GetChatByIdDocument, options);
      }
export function useGetChatByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChatByIdQuery, GetChatByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChatByIdQuery, GetChatByIdQueryVariables>(GetChatByIdDocument, options);
        }
export function useGetChatByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetChatByIdQuery, GetChatByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetChatByIdQuery, GetChatByIdQueryVariables>(GetChatByIdDocument, options);
        }
export type GetChatByIdQueryHookResult = ReturnType<typeof useGetChatByIdQuery>;
export type GetChatByIdLazyQueryHookResult = ReturnType<typeof useGetChatByIdLazyQuery>;
export type GetChatByIdSuspenseQueryHookResult = ReturnType<typeof useGetChatByIdSuspenseQuery>;
export type GetChatByIdQueryResult = Apollo.QueryResult<GetChatByIdQuery, GetChatByIdQueryVariables>;
export const GetUserChatsDocument = gql`
    query GetUserChats {
  getUserChats {
    ...ChatArrayResponse
  }
}
    ${ChatArrayResponseFragmentDoc}`;

/**
 * __useGetUserChatsQuery__
 *
 * To run a query within a React component, call `useGetUserChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserChatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserChatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserChatsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserChatsQuery, GetUserChatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserChatsQuery, GetUserChatsQueryVariables>(GetUserChatsDocument, options);
      }
export function useGetUserChatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserChatsQuery, GetUserChatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserChatsQuery, GetUserChatsQueryVariables>(GetUserChatsDocument, options);
        }
export function useGetUserChatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserChatsQuery, GetUserChatsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserChatsQuery, GetUserChatsQueryVariables>(GetUserChatsDocument, options);
        }
export type GetUserChatsQueryHookResult = ReturnType<typeof useGetUserChatsQuery>;
export type GetUserChatsLazyQueryHookResult = ReturnType<typeof useGetUserChatsLazyQuery>;
export type GetUserChatsSuspenseQueryHookResult = ReturnType<typeof useGetUserChatsSuspenseQuery>;
export type GetUserChatsQueryResult = Apollo.QueryResult<GetUserChatsQuery, GetUserChatsQueryVariables>;
export const GetChatParticipantsDocument = gql`
    query GetChatParticipants($chatId: Float!) {
  getChatParticipants(chatId: $chatId) {
    ...UserArrayResponse
  }
}
    ${UserArrayResponseFragmentDoc}`;

/**
 * __useGetChatParticipantsQuery__
 *
 * To run a query within a React component, call `useGetChatParticipantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatParticipantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatParticipantsQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useGetChatParticipantsQuery(baseOptions: Apollo.QueryHookOptions<GetChatParticipantsQuery, GetChatParticipantsQueryVariables> & ({ variables: GetChatParticipantsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChatParticipantsQuery, GetChatParticipantsQueryVariables>(GetChatParticipantsDocument, options);
      }
export function useGetChatParticipantsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChatParticipantsQuery, GetChatParticipantsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChatParticipantsQuery, GetChatParticipantsQueryVariables>(GetChatParticipantsDocument, options);
        }
export function useGetChatParticipantsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetChatParticipantsQuery, GetChatParticipantsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetChatParticipantsQuery, GetChatParticipantsQueryVariables>(GetChatParticipantsDocument, options);
        }
export type GetChatParticipantsQueryHookResult = ReturnType<typeof useGetChatParticipantsQuery>;
export type GetChatParticipantsLazyQueryHookResult = ReturnType<typeof useGetChatParticipantsLazyQuery>;
export type GetChatParticipantsSuspenseQueryHookResult = ReturnType<typeof useGetChatParticipantsSuspenseQuery>;
export type GetChatParticipantsQueryResult = Apollo.QueryResult<GetChatParticipantsQuery, GetChatParticipantsQueryVariables>;
export const CheckChatParticipantDocument = gql`
    query CheckChatParticipant($chatId: Float!) {
  checkChatParticipant(chatId: $chatId) {
    ...ConfirmResponse
  }
}
    ${ConfirmResponseFragmentDoc}`;

/**
 * __useCheckChatParticipantQuery__
 *
 * To run a query within a React component, call `useCheckChatParticipantQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckChatParticipantQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckChatParticipantQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useCheckChatParticipantQuery(baseOptions: Apollo.QueryHookOptions<CheckChatParticipantQuery, CheckChatParticipantQueryVariables> & ({ variables: CheckChatParticipantQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckChatParticipantQuery, CheckChatParticipantQueryVariables>(CheckChatParticipantDocument, options);
      }
export function useCheckChatParticipantLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckChatParticipantQuery, CheckChatParticipantQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckChatParticipantQuery, CheckChatParticipantQueryVariables>(CheckChatParticipantDocument, options);
        }
export function useCheckChatParticipantSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CheckChatParticipantQuery, CheckChatParticipantQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CheckChatParticipantQuery, CheckChatParticipantQueryVariables>(CheckChatParticipantDocument, options);
        }
export type CheckChatParticipantQueryHookResult = ReturnType<typeof useCheckChatParticipantQuery>;
export type CheckChatParticipantLazyQueryHookResult = ReturnType<typeof useCheckChatParticipantLazyQuery>;
export type CheckChatParticipantSuspenseQueryHookResult = ReturnType<typeof useCheckChatParticipantSuspenseQuery>;
export type CheckChatParticipantQueryResult = Apollo.QueryResult<CheckChatParticipantQuery, CheckChatParticipantQueryVariables>;
export const GetChatMessagesDocument = gql`
    query GetChatMessages($chatId: Float!) {
  getChatMessages(chatId: $chatId) {
    ...MessageArrayResponse
  }
}
    ${MessageArrayResponseFragmentDoc}`;

/**
 * __useGetChatMessagesQuery__
 *
 * To run a query within a React component, call `useGetChatMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatMessagesQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useGetChatMessagesQuery(baseOptions: Apollo.QueryHookOptions<GetChatMessagesQuery, GetChatMessagesQueryVariables> & ({ variables: GetChatMessagesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChatMessagesQuery, GetChatMessagesQueryVariables>(GetChatMessagesDocument, options);
      }
export function useGetChatMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChatMessagesQuery, GetChatMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChatMessagesQuery, GetChatMessagesQueryVariables>(GetChatMessagesDocument, options);
        }
export function useGetChatMessagesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetChatMessagesQuery, GetChatMessagesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetChatMessagesQuery, GetChatMessagesQueryVariables>(GetChatMessagesDocument, options);
        }
export type GetChatMessagesQueryHookResult = ReturnType<typeof useGetChatMessagesQuery>;
export type GetChatMessagesLazyQueryHookResult = ReturnType<typeof useGetChatMessagesLazyQuery>;
export type GetChatMessagesSuspenseQueryHookResult = ReturnType<typeof useGetChatMessagesSuspenseQuery>;
export type GetChatMessagesQueryResult = Apollo.QueryResult<GetChatMessagesQuery, GetChatMessagesQueryVariables>;
export const NewChatDocument = gql`
    subscription NewChat {
  newChat {
    ...SingleChatResponse
  }
}
    ${SingleChatResponseFragmentDoc}`;

/**
 * __useNewChatSubscription__
 *
 * To run a query within a React component, call `useNewChatSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewChatSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewChatSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewChatSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewChatSubscription, NewChatSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewChatSubscription, NewChatSubscriptionVariables>(NewChatDocument, options);
      }
export type NewChatSubscriptionHookResult = ReturnType<typeof useNewChatSubscription>;
export type NewChatSubscriptionResult = Apollo.SubscriptionResult<NewChatSubscription>;
export const ChatUpdatesDocument = gql`
    subscription ChatUpdates {
  chatUpdates {
    ...FullChatConfirmResponse
  }
}
    ${FullChatConfirmResponseFragmentDoc}`;

/**
 * __useChatUpdatesSubscription__
 *
 * To run a query within a React component, call `useChatUpdatesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useChatUpdatesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatUpdatesSubscription({
 *   variables: {
 *   },
 * });
 */
export function useChatUpdatesSubscription(baseOptions?: Apollo.SubscriptionHookOptions<ChatUpdatesSubscription, ChatUpdatesSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ChatUpdatesSubscription, ChatUpdatesSubscriptionVariables>(ChatUpdatesDocument, options);
      }
export type ChatUpdatesSubscriptionHookResult = ReturnType<typeof useChatUpdatesSubscription>;
export type ChatUpdatesSubscriptionResult = Apollo.SubscriptionResult<ChatUpdatesSubscription>;
export const GetCommentDocument = gql`
    query GetComment($options: GetCommentByIdInput!) {
  getComment(options: $options) {
    ...FullCommentArrayResponse
  }
}
    ${FullCommentArrayResponseFragmentDoc}`;

/**
 * __useGetCommentQuery__
 *
 * To run a query within a React component, call `useGetCommentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetCommentQuery(baseOptions: Apollo.QueryHookOptions<GetCommentQuery, GetCommentQueryVariables> & ({ variables: GetCommentQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCommentQuery, GetCommentQueryVariables>(GetCommentDocument, options);
      }
export function useGetCommentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommentQuery, GetCommentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCommentQuery, GetCommentQueryVariables>(GetCommentDocument, options);
        }
export function useGetCommentSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCommentQuery, GetCommentQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCommentQuery, GetCommentQueryVariables>(GetCommentDocument, options);
        }
export type GetCommentQueryHookResult = ReturnType<typeof useGetCommentQuery>;
export type GetCommentLazyQueryHookResult = ReturnType<typeof useGetCommentLazyQuery>;
export type GetCommentSuspenseQueryHookResult = ReturnType<typeof useGetCommentSuspenseQuery>;
export type GetCommentQueryResult = Apollo.QueryResult<GetCommentQuery, GetCommentQueryVariables>;
export const GetUserCommentsDocument = gql`
    query GetUserComments($options: GetUserCommentsInput!) {
  getUserComments(options: $options) {
    ...FullCommentArrayResponse
  }
}
    ${FullCommentArrayResponseFragmentDoc}`;

/**
 * __useGetUserCommentsQuery__
 *
 * To run a query within a React component, call `useGetUserCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserCommentsQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetUserCommentsQuery(baseOptions: Apollo.QueryHookOptions<GetUserCommentsQuery, GetUserCommentsQueryVariables> & ({ variables: GetUserCommentsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserCommentsQuery, GetUserCommentsQueryVariables>(GetUserCommentsDocument, options);
      }
export function useGetUserCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserCommentsQuery, GetUserCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserCommentsQuery, GetUserCommentsQueryVariables>(GetUserCommentsDocument, options);
        }
export function useGetUserCommentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserCommentsQuery, GetUserCommentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserCommentsQuery, GetUserCommentsQueryVariables>(GetUserCommentsDocument, options);
        }
export type GetUserCommentsQueryHookResult = ReturnType<typeof useGetUserCommentsQuery>;
export type GetUserCommentsLazyQueryHookResult = ReturnType<typeof useGetUserCommentsLazyQuery>;
export type GetUserCommentsSuspenseQueryHookResult = ReturnType<typeof useGetUserCommentsSuspenseQuery>;
export type GetUserCommentsQueryResult = Apollo.QueryResult<GetUserCommentsQuery, GetUserCommentsQueryVariables>;
export const GetPostCommentsDocument = gql`
    query GetPostComments($options: GetPostCommentsInput!) {
  getPostComments(options: $options) {
    ...FullCommentArrayResponse
  }
}
    ${FullCommentArrayResponseFragmentDoc}`;

/**
 * __useGetPostCommentsQuery__
 *
 * To run a query within a React component, call `useGetPostCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostCommentsQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetPostCommentsQuery(baseOptions: Apollo.QueryHookOptions<GetPostCommentsQuery, GetPostCommentsQueryVariables> & ({ variables: GetPostCommentsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostCommentsQuery, GetPostCommentsQueryVariables>(GetPostCommentsDocument, options);
      }
export function useGetPostCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostCommentsQuery, GetPostCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostCommentsQuery, GetPostCommentsQueryVariables>(GetPostCommentsDocument, options);
        }
export function useGetPostCommentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPostCommentsQuery, GetPostCommentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPostCommentsQuery, GetPostCommentsQueryVariables>(GetPostCommentsDocument, options);
        }
export type GetPostCommentsQueryHookResult = ReturnType<typeof useGetPostCommentsQuery>;
export type GetPostCommentsLazyQueryHookResult = ReturnType<typeof useGetPostCommentsLazyQuery>;
export type GetPostCommentsSuspenseQueryHookResult = ReturnType<typeof useGetPostCommentsSuspenseQuery>;
export type GetPostCommentsQueryResult = Apollo.QueryResult<GetPostCommentsQuery, GetPostCommentsQueryVariables>;
export const GetAllCommunitiesDocument = gql`
    query GetAllCommunities {
  getAllCommunities {
    ...FullCommunityArrayResponse
  }
}
    ${FullCommunityArrayResponseFragmentDoc}`;

/**
 * __useGetAllCommunitiesQuery__
 *
 * To run a query within a React component, call `useGetAllCommunitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCommunitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCommunitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCommunitiesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllCommunitiesQuery, GetAllCommunitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCommunitiesQuery, GetAllCommunitiesQueryVariables>(GetAllCommunitiesDocument, options);
      }
export function useGetAllCommunitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCommunitiesQuery, GetAllCommunitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCommunitiesQuery, GetAllCommunitiesQueryVariables>(GetAllCommunitiesDocument, options);
        }
export function useGetAllCommunitiesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllCommunitiesQuery, GetAllCommunitiesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllCommunitiesQuery, GetAllCommunitiesQueryVariables>(GetAllCommunitiesDocument, options);
        }
export type GetAllCommunitiesQueryHookResult = ReturnType<typeof useGetAllCommunitiesQuery>;
export type GetAllCommunitiesLazyQueryHookResult = ReturnType<typeof useGetAllCommunitiesLazyQuery>;
export type GetAllCommunitiesSuspenseQueryHookResult = ReturnType<typeof useGetAllCommunitiesSuspenseQuery>;
export type GetAllCommunitiesQueryResult = Apollo.QueryResult<GetAllCommunitiesQuery, GetAllCommunitiesQueryVariables>;
export const GetUserCommunitiesDocument = gql`
    query GetUserCommunities {
  getUserCommunities {
    ...FullCommunityArrayResponse
  }
}
    ${FullCommunityArrayResponseFragmentDoc}`;

/**
 * __useGetUserCommunitiesQuery__
 *
 * To run a query within a React component, call `useGetUserCommunitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserCommunitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserCommunitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserCommunitiesQuery(baseOptions?: Apollo.QueryHookOptions<GetUserCommunitiesQuery, GetUserCommunitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserCommunitiesQuery, GetUserCommunitiesQueryVariables>(GetUserCommunitiesDocument, options);
      }
export function useGetUserCommunitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserCommunitiesQuery, GetUserCommunitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserCommunitiesQuery, GetUserCommunitiesQueryVariables>(GetUserCommunitiesDocument, options);
        }
export function useGetUserCommunitiesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserCommunitiesQuery, GetUserCommunitiesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserCommunitiesQuery, GetUserCommunitiesQueryVariables>(GetUserCommunitiesDocument, options);
        }
export type GetUserCommunitiesQueryHookResult = ReturnType<typeof useGetUserCommunitiesQuery>;
export type GetUserCommunitiesLazyQueryHookResult = ReturnType<typeof useGetUserCommunitiesLazyQuery>;
export type GetUserCommunitiesSuspenseQueryHookResult = ReturnType<typeof useGetUserCommunitiesSuspenseQuery>;
export type GetUserCommunitiesQueryResult = Apollo.QueryResult<GetUserCommunitiesQuery, GetUserCommunitiesQueryVariables>;
export const GetCommunityByNameDocument = gql`
    query GetCommunityByName($name: String!) {
  getCommunityByName(name: $name) {
    ...FullCommunityResponse
  }
}
    ${FullCommunityResponseFragmentDoc}`;

/**
 * __useGetCommunityByNameQuery__
 *
 * To run a query within a React component, call `useGetCommunityByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommunityByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommunityByNameQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGetCommunityByNameQuery(baseOptions: Apollo.QueryHookOptions<GetCommunityByNameQuery, GetCommunityByNameQueryVariables> & ({ variables: GetCommunityByNameQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCommunityByNameQuery, GetCommunityByNameQueryVariables>(GetCommunityByNameDocument, options);
      }
export function useGetCommunityByNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommunityByNameQuery, GetCommunityByNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCommunityByNameQuery, GetCommunityByNameQueryVariables>(GetCommunityByNameDocument, options);
        }
export function useGetCommunityByNameSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCommunityByNameQuery, GetCommunityByNameQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCommunityByNameQuery, GetCommunityByNameQueryVariables>(GetCommunityByNameDocument, options);
        }
export type GetCommunityByNameQueryHookResult = ReturnType<typeof useGetCommunityByNameQuery>;
export type GetCommunityByNameLazyQueryHookResult = ReturnType<typeof useGetCommunityByNameLazyQuery>;
export type GetCommunityByNameSuspenseQueryHookResult = ReturnType<typeof useGetCommunityByNameSuspenseQuery>;
export type GetCommunityByNameQueryResult = Apollo.QueryResult<GetCommunityByNameQuery, GetCommunityByNameQueryVariables>;
export const GetExploreCommunitiesDocument = gql`
    query GetExploreCommunities($limit: Float!) {
  getExploreCommunities(limit: $limit) {
    ...FullCommunityArrayResponse
  }
}
    ${FullCommunityArrayResponseFragmentDoc}`;

/**
 * __useGetExploreCommunitiesQuery__
 *
 * To run a query within a React component, call `useGetExploreCommunitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExploreCommunitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExploreCommunitiesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetExploreCommunitiesQuery(baseOptions: Apollo.QueryHookOptions<GetExploreCommunitiesQuery, GetExploreCommunitiesQueryVariables> & ({ variables: GetExploreCommunitiesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExploreCommunitiesQuery, GetExploreCommunitiesQueryVariables>(GetExploreCommunitiesDocument, options);
      }
export function useGetExploreCommunitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExploreCommunitiesQuery, GetExploreCommunitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExploreCommunitiesQuery, GetExploreCommunitiesQueryVariables>(GetExploreCommunitiesDocument, options);
        }
export function useGetExploreCommunitiesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetExploreCommunitiesQuery, GetExploreCommunitiesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetExploreCommunitiesQuery, GetExploreCommunitiesQueryVariables>(GetExploreCommunitiesDocument, options);
        }
export type GetExploreCommunitiesQueryHookResult = ReturnType<typeof useGetExploreCommunitiesQuery>;
export type GetExploreCommunitiesLazyQueryHookResult = ReturnType<typeof useGetExploreCommunitiesLazyQuery>;
export type GetExploreCommunitiesSuspenseQueryHookResult = ReturnType<typeof useGetExploreCommunitiesSuspenseQuery>;
export type GetExploreCommunitiesQueryResult = Apollo.QueryResult<GetExploreCommunitiesQuery, GetExploreCommunitiesQueryVariables>;
export const SearchCommunitiesDocument = gql`
    query SearchCommunities($options: GetSearchResultInput!) {
  searchCommunities(options: $options) {
    ...FullCommunityArrayResponse
  }
}
    ${FullCommunityArrayResponseFragmentDoc}`;

/**
 * __useSearchCommunitiesQuery__
 *
 * To run a query within a React component, call `useSearchCommunitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchCommunitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchCommunitiesQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useSearchCommunitiesQuery(baseOptions: Apollo.QueryHookOptions<SearchCommunitiesQuery, SearchCommunitiesQueryVariables> & ({ variables: SearchCommunitiesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchCommunitiesQuery, SearchCommunitiesQueryVariables>(SearchCommunitiesDocument, options);
      }
export function useSearchCommunitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchCommunitiesQuery, SearchCommunitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchCommunitiesQuery, SearchCommunitiesQueryVariables>(SearchCommunitiesDocument, options);
        }
export function useSearchCommunitiesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchCommunitiesQuery, SearchCommunitiesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchCommunitiesQuery, SearchCommunitiesQueryVariables>(SearchCommunitiesDocument, options);
        }
export type SearchCommunitiesQueryHookResult = ReturnType<typeof useSearchCommunitiesQuery>;
export type SearchCommunitiesLazyQueryHookResult = ReturnType<typeof useSearchCommunitiesLazyQuery>;
export type SearchCommunitiesSuspenseQueryHookResult = ReturnType<typeof useSearchCommunitiesSuspenseQuery>;
export type SearchCommunitiesQueryResult = Apollo.QueryResult<SearchCommunitiesQuery, SearchCommunitiesQueryVariables>;
export const GetUserHiddenPostsDocument = gql`
    query GetUserHiddenPosts($options: GetUserHiddenPostsInput!) {
  getUserHiddenPosts(options: $options) {
    ...FullPostResponse
  }
}
    ${FullPostResponseFragmentDoc}`;

/**
 * __useGetUserHiddenPostsQuery__
 *
 * To run a query within a React component, call `useGetUserHiddenPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserHiddenPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserHiddenPostsQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetUserHiddenPostsQuery(baseOptions: Apollo.QueryHookOptions<GetUserHiddenPostsQuery, GetUserHiddenPostsQueryVariables> & ({ variables: GetUserHiddenPostsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserHiddenPostsQuery, GetUserHiddenPostsQueryVariables>(GetUserHiddenPostsDocument, options);
      }
export function useGetUserHiddenPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserHiddenPostsQuery, GetUserHiddenPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserHiddenPostsQuery, GetUserHiddenPostsQueryVariables>(GetUserHiddenPostsDocument, options);
        }
export function useGetUserHiddenPostsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserHiddenPostsQuery, GetUserHiddenPostsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserHiddenPostsQuery, GetUserHiddenPostsQueryVariables>(GetUserHiddenPostsDocument, options);
        }
export type GetUserHiddenPostsQueryHookResult = ReturnType<typeof useGetUserHiddenPostsQuery>;
export type GetUserHiddenPostsLazyQueryHookResult = ReturnType<typeof useGetUserHiddenPostsLazyQuery>;
export type GetUserHiddenPostsSuspenseQueryHookResult = ReturnType<typeof useGetUserHiddenPostsSuspenseQuery>;
export type GetUserHiddenPostsQueryResult = Apollo.QueryResult<GetUserHiddenPostsQuery, GetUserHiddenPostsQueryVariables>;
export const NewMessageDocument = gql`
    subscription NewMessage {
  newMessage {
    ...SingleMessageResponse
  }
}
    ${SingleMessageResponseFragmentDoc}`;

/**
 * __useNewMessageSubscription__
 *
 * To run a query within a React component, call `useNewMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMessageSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewMessageSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewMessageSubscription, NewMessageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewMessageSubscription, NewMessageSubscriptionVariables>(NewMessageDocument, options);
      }
export type NewMessageSubscriptionHookResult = ReturnType<typeof useNewMessageSubscription>;
export type NewMessageSubscriptionResult = Apollo.SubscriptionResult<NewMessageSubscription>;
export const GetAllPostsDocument = gql`
    query GetAllPosts($options: GetAllPostsInput!) {
  getAllPosts(options: $options) {
    ...FullPostResponse
  }
}
    ${FullPostResponseFragmentDoc}`;

/**
 * __useGetAllPostsQuery__
 *
 * To run a query within a React component, call `useGetAllPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPostsQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetAllPostsQuery(baseOptions: Apollo.QueryHookOptions<GetAllPostsQuery, GetAllPostsQueryVariables> & ({ variables: GetAllPostsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllPostsQuery, GetAllPostsQueryVariables>(GetAllPostsDocument, options);
      }
export function useGetAllPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPostsQuery, GetAllPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllPostsQuery, GetAllPostsQueryVariables>(GetAllPostsDocument, options);
        }
export function useGetAllPostsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllPostsQuery, GetAllPostsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllPostsQuery, GetAllPostsQueryVariables>(GetAllPostsDocument, options);
        }
export type GetAllPostsQueryHookResult = ReturnType<typeof useGetAllPostsQuery>;
export type GetAllPostsLazyQueryHookResult = ReturnType<typeof useGetAllPostsLazyQuery>;
export type GetAllPostsSuspenseQueryHookResult = ReturnType<typeof useGetAllPostsSuspenseQuery>;
export type GetAllPostsQueryResult = Apollo.QueryResult<GetAllPostsQuery, GetAllPostsQueryVariables>;
export const GetUserCommunityPostsDocument = gql`
    query GetUserCommunityPosts($options: GetUserCommunityPostsInput!) {
  getUserCommunityPosts(options: $options) {
    ...FullPostResponse
  }
}
    ${FullPostResponseFragmentDoc}`;

/**
 * __useGetUserCommunityPostsQuery__
 *
 * To run a query within a React component, call `useGetUserCommunityPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserCommunityPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserCommunityPostsQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetUserCommunityPostsQuery(baseOptions: Apollo.QueryHookOptions<GetUserCommunityPostsQuery, GetUserCommunityPostsQueryVariables> & ({ variables: GetUserCommunityPostsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserCommunityPostsQuery, GetUserCommunityPostsQueryVariables>(GetUserCommunityPostsDocument, options);
      }
export function useGetUserCommunityPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserCommunityPostsQuery, GetUserCommunityPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserCommunityPostsQuery, GetUserCommunityPostsQueryVariables>(GetUserCommunityPostsDocument, options);
        }
export function useGetUserCommunityPostsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserCommunityPostsQuery, GetUserCommunityPostsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserCommunityPostsQuery, GetUserCommunityPostsQueryVariables>(GetUserCommunityPostsDocument, options);
        }
export type GetUserCommunityPostsQueryHookResult = ReturnType<typeof useGetUserCommunityPostsQuery>;
export type GetUserCommunityPostsLazyQueryHookResult = ReturnType<typeof useGetUserCommunityPostsLazyQuery>;
export type GetUserCommunityPostsSuspenseQueryHookResult = ReturnType<typeof useGetUserCommunityPostsSuspenseQuery>;
export type GetUserCommunityPostsQueryResult = Apollo.QueryResult<GetUserCommunityPostsQuery, GetUserCommunityPostsQueryVariables>;
export const GetPostByIdDocument = gql`
    query GetPostById($id: Int!) {
  getPost(id: $id) {
    ...FullSinglePostResponse
  }
}
    ${FullSinglePostResponseFragmentDoc}`;

/**
 * __useGetPostByIdQuery__
 *
 * To run a query within a React component, call `useGetPostByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPostByIdQuery(baseOptions: Apollo.QueryHookOptions<GetPostByIdQuery, GetPostByIdQueryVariables> & ({ variables: GetPostByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostByIdQuery, GetPostByIdQueryVariables>(GetPostByIdDocument, options);
      }
export function useGetPostByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostByIdQuery, GetPostByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostByIdQuery, GetPostByIdQueryVariables>(GetPostByIdDocument, options);
        }
export function useGetPostByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPostByIdQuery, GetPostByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPostByIdQuery, GetPostByIdQueryVariables>(GetPostByIdDocument, options);
        }
export type GetPostByIdQueryHookResult = ReturnType<typeof useGetPostByIdQuery>;
export type GetPostByIdLazyQueryHookResult = ReturnType<typeof useGetPostByIdLazyQuery>;
export type GetPostByIdSuspenseQueryHookResult = ReturnType<typeof useGetPostByIdSuspenseQuery>;
export type GetPostByIdQueryResult = Apollo.QueryResult<GetPostByIdQuery, GetPostByIdQueryVariables>;
export const GetUserPostsDocument = gql`
    query GetUserPosts($options: GetUserPostsInput!) {
  getUserPosts(options: $options) {
    ...FullPostResponse
  }
}
    ${FullPostResponseFragmentDoc}`;

/**
 * __useGetUserPostsQuery__
 *
 * To run a query within a React component, call `useGetUserPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserPostsQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetUserPostsQuery(baseOptions: Apollo.QueryHookOptions<GetUserPostsQuery, GetUserPostsQueryVariables> & ({ variables: GetUserPostsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserPostsQuery, GetUserPostsQueryVariables>(GetUserPostsDocument, options);
      }
export function useGetUserPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserPostsQuery, GetUserPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserPostsQuery, GetUserPostsQueryVariables>(GetUserPostsDocument, options);
        }
export function useGetUserPostsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserPostsQuery, GetUserPostsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserPostsQuery, GetUserPostsQueryVariables>(GetUserPostsDocument, options);
        }
export type GetUserPostsQueryHookResult = ReturnType<typeof useGetUserPostsQuery>;
export type GetUserPostsLazyQueryHookResult = ReturnType<typeof useGetUserPostsLazyQuery>;
export type GetUserPostsSuspenseQueryHookResult = ReturnType<typeof useGetUserPostsSuspenseQuery>;
export type GetUserPostsQueryResult = Apollo.QueryResult<GetUserPostsQuery, GetUserPostsQueryVariables>;
export const SearchPostsDocument = gql`
    query SearchPosts($options: GetSearchResultInput!) {
  searchPosts(options: $options) {
    ...FullPostResponse
  }
}
    ${FullPostResponseFragmentDoc}`;

/**
 * __useSearchPostsQuery__
 *
 * To run a query within a React component, call `useSearchPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchPostsQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useSearchPostsQuery(baseOptions: Apollo.QueryHookOptions<SearchPostsQuery, SearchPostsQueryVariables> & ({ variables: SearchPostsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchPostsQuery, SearchPostsQueryVariables>(SearchPostsDocument, options);
      }
export function useSearchPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchPostsQuery, SearchPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchPostsQuery, SearchPostsQueryVariables>(SearchPostsDocument, options);
        }
export function useSearchPostsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchPostsQuery, SearchPostsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchPostsQuery, SearchPostsQueryVariables>(SearchPostsDocument, options);
        }
export type SearchPostsQueryHookResult = ReturnType<typeof useSearchPostsQuery>;
export type SearchPostsLazyQueryHookResult = ReturnType<typeof useSearchPostsLazyQuery>;
export type SearchPostsSuspenseQueryHookResult = ReturnType<typeof useSearchPostsSuspenseQuery>;
export type SearchPostsQueryResult = Apollo.QueryResult<SearchPostsQuery, SearchPostsQueryVariables>;
export const GetCommunityPostsDocument = gql`
    query GetCommunityPosts($options: GetCommunityPostsInput!) {
  getCommunityPosts(options: $options) {
    ...FullPostResponse
  }
}
    ${FullPostResponseFragmentDoc}`;

/**
 * __useGetCommunityPostsQuery__
 *
 * To run a query within a React component, call `useGetCommunityPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommunityPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommunityPostsQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetCommunityPostsQuery(baseOptions: Apollo.QueryHookOptions<GetCommunityPostsQuery, GetCommunityPostsQueryVariables> & ({ variables: GetCommunityPostsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCommunityPostsQuery, GetCommunityPostsQueryVariables>(GetCommunityPostsDocument, options);
      }
export function useGetCommunityPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommunityPostsQuery, GetCommunityPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCommunityPostsQuery, GetCommunityPostsQueryVariables>(GetCommunityPostsDocument, options);
        }
export function useGetCommunityPostsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCommunityPostsQuery, GetCommunityPostsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCommunityPostsQuery, GetCommunityPostsQueryVariables>(GetCommunityPostsDocument, options);
        }
export type GetCommunityPostsQueryHookResult = ReturnType<typeof useGetCommunityPostsQuery>;
export type GetCommunityPostsLazyQueryHookResult = ReturnType<typeof useGetCommunityPostsLazyQuery>;
export type GetCommunityPostsSuspenseQueryHookResult = ReturnType<typeof useGetCommunityPostsSuspenseQuery>;
export type GetCommunityPostsQueryResult = Apollo.QueryResult<GetCommunityPostsQuery, GetCommunityPostsQueryVariables>;
export const GetUserVotedPostsDocument = gql`
    query GetUserVotedPosts($options: GetUserVotedPostsOptions!) {
  getUserVotedPosts(options: $options) {
    ...FullPostResponse
  }
}
    ${FullPostResponseFragmentDoc}`;

/**
 * __useGetUserVotedPostsQuery__
 *
 * To run a query within a React component, call `useGetUserVotedPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserVotedPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserVotedPostsQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetUserVotedPostsQuery(baseOptions: Apollo.QueryHookOptions<GetUserVotedPostsQuery, GetUserVotedPostsQueryVariables> & ({ variables: GetUserVotedPostsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserVotedPostsQuery, GetUserVotedPostsQueryVariables>(GetUserVotedPostsDocument, options);
      }
export function useGetUserVotedPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserVotedPostsQuery, GetUserVotedPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserVotedPostsQuery, GetUserVotedPostsQueryVariables>(GetUserVotedPostsDocument, options);
        }
export function useGetUserVotedPostsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserVotedPostsQuery, GetUserVotedPostsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserVotedPostsQuery, GetUserVotedPostsQueryVariables>(GetUserVotedPostsDocument, options);
        }
export type GetUserVotedPostsQueryHookResult = ReturnType<typeof useGetUserVotedPostsQuery>;
export type GetUserVotedPostsLazyQueryHookResult = ReturnType<typeof useGetUserVotedPostsLazyQuery>;
export type GetUserVotedPostsSuspenseQueryHookResult = ReturnType<typeof useGetUserVotedPostsSuspenseQuery>;
export type GetUserVotedPostsQueryResult = Apollo.QueryResult<GetUserVotedPostsQuery, GetUserVotedPostsQueryVariables>;
export const GetSavedPostsIdsDocument = gql`
    query GetSavedPostsIds {
  getSavedPostsIds
}
    `;

/**
 * __useGetSavedPostsIdsQuery__
 *
 * To run a query within a React component, call `useGetSavedPostsIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSavedPostsIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSavedPostsIdsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSavedPostsIdsQuery(baseOptions?: Apollo.QueryHookOptions<GetSavedPostsIdsQuery, GetSavedPostsIdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSavedPostsIdsQuery, GetSavedPostsIdsQueryVariables>(GetSavedPostsIdsDocument, options);
      }
export function useGetSavedPostsIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSavedPostsIdsQuery, GetSavedPostsIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSavedPostsIdsQuery, GetSavedPostsIdsQueryVariables>(GetSavedPostsIdsDocument, options);
        }
export function useGetSavedPostsIdsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSavedPostsIdsQuery, GetSavedPostsIdsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSavedPostsIdsQuery, GetSavedPostsIdsQueryVariables>(GetSavedPostsIdsDocument, options);
        }
export type GetSavedPostsIdsQueryHookResult = ReturnType<typeof useGetSavedPostsIdsQuery>;
export type GetSavedPostsIdsLazyQueryHookResult = ReturnType<typeof useGetSavedPostsIdsLazyQuery>;
export type GetSavedPostsIdsSuspenseQueryHookResult = ReturnType<typeof useGetSavedPostsIdsSuspenseQuery>;
export type GetSavedPostsIdsQueryResult = Apollo.QueryResult<GetSavedPostsIdsQuery, GetSavedPostsIdsQueryVariables>;
export const GetSavedPostsDocument = gql`
    query GetSavedPosts($options: GetAllPostsInput!) {
  getSavedPosts(options: $options) {
    ...FullPostResponse
  }
}
    ${FullPostResponseFragmentDoc}`;

/**
 * __useGetSavedPostsQuery__
 *
 * To run a query within a React component, call `useGetSavedPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSavedPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSavedPostsQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetSavedPostsQuery(baseOptions: Apollo.QueryHookOptions<GetSavedPostsQuery, GetSavedPostsQueryVariables> & ({ variables: GetSavedPostsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSavedPostsQuery, GetSavedPostsQueryVariables>(GetSavedPostsDocument, options);
      }
export function useGetSavedPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSavedPostsQuery, GetSavedPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSavedPostsQuery, GetSavedPostsQueryVariables>(GetSavedPostsDocument, options);
        }
export function useGetSavedPostsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSavedPostsQuery, GetSavedPostsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSavedPostsQuery, GetSavedPostsQueryVariables>(GetSavedPostsDocument, options);
        }
export type GetSavedPostsQueryHookResult = ReturnType<typeof useGetSavedPostsQuery>;
export type GetSavedPostsLazyQueryHookResult = ReturnType<typeof useGetSavedPostsLazyQuery>;
export type GetSavedPostsSuspenseQueryHookResult = ReturnType<typeof useGetSavedPostsSuspenseQuery>;
export type GetSavedPostsQueryResult = Apollo.QueryResult<GetSavedPostsQuery, GetSavedPostsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...SingleUserResponse
  }
}
    ${SingleUserResponseFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const CheckTokenDocument = gql`
    query CheckToken($options: CheckTokenInput!) {
  checkToken(options: $options) {
    ...ConfirmResponse
  }
}
    ${ConfirmResponseFragmentDoc}`;

/**
 * __useCheckTokenQuery__
 *
 * To run a query within a React component, call `useCheckTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckTokenQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCheckTokenQuery(baseOptions: Apollo.QueryHookOptions<CheckTokenQuery, CheckTokenQueryVariables> & ({ variables: CheckTokenQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckTokenQuery, CheckTokenQueryVariables>(CheckTokenDocument, options);
      }
export function useCheckTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckTokenQuery, CheckTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckTokenQuery, CheckTokenQueryVariables>(CheckTokenDocument, options);
        }
export function useCheckTokenSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CheckTokenQuery, CheckTokenQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CheckTokenQuery, CheckTokenQueryVariables>(CheckTokenDocument, options);
        }
export type CheckTokenQueryHookResult = ReturnType<typeof useCheckTokenQuery>;
export type CheckTokenLazyQueryHookResult = ReturnType<typeof useCheckTokenLazyQuery>;
export type CheckTokenSuspenseQueryHookResult = ReturnType<typeof useCheckTokenSuspenseQuery>;
export type CheckTokenQueryResult = Apollo.QueryResult<CheckTokenQuery, CheckTokenQueryVariables>;
export const GetUserByIdDocument = gql`
    query GetUserById($id: Int!) {
  getUserById(id: $id) {
    ...SingleUserResponse
  }
}
    ${SingleUserResponseFragmentDoc}`;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables> & ({ variables: GetUserByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
      }
export function useGetUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export function useGetUserByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdSuspenseQueryHookResult = ReturnType<typeof useGetUserByIdSuspenseQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const GetUserByNameDocument = gql`
    query GetUserByName($name: String!) {
  getUserByName(name: $name) {
    ...SingleUserResponse
  }
}
    ${SingleUserResponseFragmentDoc}`;

/**
 * __useGetUserByNameQuery__
 *
 * To run a query within a React component, call `useGetUserByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByNameQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGetUserByNameQuery(baseOptions: Apollo.QueryHookOptions<GetUserByNameQuery, GetUserByNameQueryVariables> & ({ variables: GetUserByNameQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByNameQuery, GetUserByNameQueryVariables>(GetUserByNameDocument, options);
      }
export function useGetUserByNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByNameQuery, GetUserByNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByNameQuery, GetUserByNameQueryVariables>(GetUserByNameDocument, options);
        }
export function useGetUserByNameSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserByNameQuery, GetUserByNameQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserByNameQuery, GetUserByNameQueryVariables>(GetUserByNameDocument, options);
        }
export type GetUserByNameQueryHookResult = ReturnType<typeof useGetUserByNameQuery>;
export type GetUserByNameLazyQueryHookResult = ReturnType<typeof useGetUserByNameLazyQuery>;
export type GetUserByNameSuspenseQueryHookResult = ReturnType<typeof useGetUserByNameSuspenseQuery>;
export type GetUserByNameQueryResult = Apollo.QueryResult<GetUserByNameQuery, GetUserByNameQueryVariables>;
export const SearchForUserDocument = gql`
    query SearchForUser($options: GetSearchResultInput!) {
  searchForUser(options: $options) {
    ...UserArrayResponse
  }
}
    ${UserArrayResponseFragmentDoc}`;

/**
 * __useSearchForUserQuery__
 *
 * To run a query within a React component, call `useSearchForUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchForUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchForUserQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useSearchForUserQuery(baseOptions: Apollo.QueryHookOptions<SearchForUserQuery, SearchForUserQueryVariables> & ({ variables: SearchForUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchForUserQuery, SearchForUserQueryVariables>(SearchForUserDocument, options);
      }
export function useSearchForUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchForUserQuery, SearchForUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchForUserQuery, SearchForUserQueryVariables>(SearchForUserDocument, options);
        }
export function useSearchForUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchForUserQuery, SearchForUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchForUserQuery, SearchForUserQueryVariables>(SearchForUserDocument, options);
        }
export type SearchForUserQueryHookResult = ReturnType<typeof useSearchForUserQuery>;
export type SearchForUserLazyQueryHookResult = ReturnType<typeof useSearchForUserLazyQuery>;
export type SearchForUserSuspenseQueryHookResult = ReturnType<typeof useSearchForUserSuspenseQuery>;
export type SearchForUserQueryResult = Apollo.QueryResult<SearchForUserQuery, SearchForUserQueryVariables>;