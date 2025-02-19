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

export type CheckTokenInput = {
  email: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type Comment = {
  __typename?: 'Comment';
  authorId: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  postId: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};

export type CommentResponse = {
  __typename?: 'CommentResponse';
  comment?: Maybe<Comment>;
  commentsArray?: Maybe<Array<Comment>>;
  errors?: Maybe<Array<FieldError>>;
};

export type ConfirmResponse = {
  __typename?: 'ConfirmResponse';
  errors?: Maybe<Array<FieldError>>;
  success: Scalars['Boolean']['output'];
};

export type CreateCommentInput = {
  content: Scalars['String']['input'];
  postId: Scalars['Float']['input'];
};

export type CreatePostInput = {
  content: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateVoteInput = {
  commentId?: InputMaybe<Scalars['Float']['input']>;
  isUpvote: Scalars['Boolean']['input'];
  postId?: InputMaybe<Scalars['Float']['input']>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type GetAllPostsInput = {
  limit: Scalars['Float']['input'];
  page: Scalars['Float']['input'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  confirmUser: ConfirmResponse;
  createComment: CommentResponse;
  createPost: PostResponse;
  createVote: VoteResponse;
  deleteComment: ConfirmResponse;
  deletePost: ConfirmResponse;
  deleteVote: ConfirmResponse;
  loginUser: UserResponse;
  logoutUser: Scalars['Boolean']['output'];
  registerUser: UserResponse;
  requestConfirmationCode: ConfirmResponse;
  requestPasswordReset: ConfirmResponse;
  resetPassword: ConfirmResponse;
  toggleConfirmed: Scalars['Boolean']['output'];
  updateComment?: Maybe<ConfirmResponse>;
  updatePost: ConfirmResponse;
  updateVote?: Maybe<ConfirmResponse>;
};


export type MutationConfirmUserArgs = {
  code: Scalars['String']['input'];
};


export type MutationCreateCommentArgs = {
  options: CreateCommentInput;
};


export type MutationCreatePostArgs = {
  options: CreatePostInput;
};


export type MutationCreateVoteArgs = {
  options: CreateVoteInput;
};


export type MutationDeleteCommentArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteVoteArgs = {
  id: Scalars['Int']['input'];
};


export type MutationLoginUserArgs = {
  userData: LoginInput;
};


export type MutationRegisterUserArgs = {
  userData: RegisterInput;
};


export type MutationRequestPasswordResetArgs = {
  email: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  options: ResetPasswordInput;
};


export type MutationUpdateCommentArgs = {
  options: UpdateCommentInput;
};


export type MutationUpdatePostArgs = {
  options: UpdatePostInput;
};


export type MutationUpdateVoteArgs = {
  options: UpdateVoteInput;
};

export type Post = {
  __typename?: 'Post';
  authorId: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type PostResponse = {
  __typename?: 'PostResponse';
  errors?: Maybe<Array<FieldError>>;
  post?: Maybe<Post>;
  postsArray?: Maybe<Array<Post>>;
};

export type Query = {
  __typename?: 'Query';
  checkToken: ConfirmResponse;
  getAllPosts: PostResponse;
  getComment: CommentResponse;
  getCommentVotes: VoteResponse;
  getPost: PostResponse;
  getPostComments: CommentResponse;
  getPostVotes: VoteResponse;
  getPostsCount: Scalars['Int']['output'];
  getUserComments: CommentResponse;
  getUserPosts: PostResponse;
  getUserVotedPosts: VotedPostsResponse;
  me: UserResponse;
};


export type QueryCheckTokenArgs = {
  options: CheckTokenInput;
};


export type QueryGetAllPostsArgs = {
  options: GetAllPostsInput;
};


export type QueryGetCommentArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetCommentVotesArgs = {
  commentId: Scalars['Int']['input'];
};


export type QueryGetPostArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetPostCommentsArgs = {
  postId: Scalars['Int']['input'];
};


export type QueryGetPostVotesArgs = {
  postId: Scalars['Int']['input'];
};


export type QueryGetUserPostsArgs = {
  userId?: InputMaybe<Scalars['Float']['input']>;
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

export type UpdateCommentInput = {
  content: Scalars['String']['input'];
  id: Scalars['Float']['input'];
};

export type UpdatePostInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateVoteInput = {
  id: Scalars['Float']['input'];
  isUpvote: Scalars['Boolean']['input'];
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
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
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

export type VoteResponse = {
  __typename?: 'VoteResponse';
  errors?: Maybe<Array<FieldError>>;
  vote?: Maybe<Vote>;
  votesArray?: Maybe<Array<Vote>>;
};

export type VotedPostsResponse = {
  __typename?: 'VotedPostsResponse';
  errors?: Maybe<Array<FieldError>>;
  posts?: Maybe<Array<Post>>;
};

export type FullCommentFragment = { __typename?: 'Comment', id: number, content: string, createdAt: string, updatedAt: string, authorId: number, postId: number };

export type CreateCommentMutationVariables = Exact<{
  options: CreateCommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'CommentResponse', comment?: { __typename?: 'Comment', id: number, content: string, createdAt: string, updatedAt: string, authorId: number, postId: number } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: { __typename?: 'ConfirmResponse', success: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateCommentMutationVariables = Exact<{
  options: UpdateCommentInput;
}>;


export type UpdateCommentMutation = { __typename?: 'Mutation', updateComment?: { __typename?: 'ConfirmResponse', success: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } | null };

export type GetCommentByIdQueryVariables = Exact<{
  getCommentId: Scalars['Int']['input'];
}>;


export type GetCommentByIdQuery = { __typename?: 'Query', getComment: { __typename?: 'CommentResponse', comment?: { __typename?: 'Comment', id: number, content: string, createdAt: string, updatedAt: string, authorId: number, postId: number } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetCommentVotesQueryVariables = Exact<{
  commentId: Scalars['Int']['input'];
}>;


export type GetCommentVotesQuery = { __typename?: 'Query', getCommentVotes: { __typename?: 'VoteResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, votesArray?: Array<{ __typename?: 'Vote', id: number, isUpvote: boolean, createdAt: string, updatedAt: string, userId: number, postId?: number | null, commentId?: number | null }> | null } };

export type GetUserCommentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserCommentsQuery = { __typename?: 'Query', getUserComments: { __typename?: 'CommentResponse', commentsArray?: Array<{ __typename?: 'Comment', id: number, content: string, createdAt: string, updatedAt: string, authorId: number, postId: number }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type FullErrorFieldFragment = { __typename?: 'FieldError', field: string, message: string };

export type FullPostFragment = { __typename?: 'Post', id: number, title: string, content: string, createdAt: string, updatedAt: string, authorId: number };

export type CreatePostMutationVariables = Exact<{
  options: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'PostResponse', post?: { __typename?: 'Post', id: number, title: string, content: string, createdAt: string, updatedAt: string, authorId: number } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: { __typename?: 'ConfirmResponse', success: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdatePostMutationVariables = Exact<{
  options: UpdatePostInput;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'ConfirmResponse', success: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetPostsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsCountQuery = { __typename?: 'Query', getPostsCount: number };

export type GetAllPostsQueryVariables = Exact<{
  options: GetAllPostsInput;
}>;


export type GetAllPostsQuery = { __typename?: 'Query', getAllPosts: { __typename?: 'PostResponse', postsArray?: Array<{ __typename?: 'Post', id: number, title: string, content: string, createdAt: string, updatedAt: string, authorId: number }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetPostByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetPostByIdQuery = { __typename?: 'Query', getPost: { __typename?: 'PostResponse', post?: { __typename?: 'Post', id: number, title: string, content: string, createdAt: string, updatedAt: string, authorId: number } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetPostCommentsQueryVariables = Exact<{
  postId: Scalars['Int']['input'];
}>;


export type GetPostCommentsQuery = { __typename?: 'Query', getPostComments: { __typename?: 'CommentResponse', commentsArray?: Array<{ __typename?: 'Comment', id: number, content: string, createdAt: string, updatedAt: string, authorId: number, postId: number }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetPostVotesQueryVariables = Exact<{
  postId: Scalars['Int']['input'];
}>;


export type GetPostVotesQuery = { __typename?: 'Query', getPostVotes: { __typename?: 'VoteResponse', votesArray?: Array<{ __typename?: 'Vote', id: number, isUpvote: boolean, createdAt: string, updatedAt: string, userId: number, postId?: number | null, commentId?: number | null }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetUserPostsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetUserPostsQuery = { __typename?: 'Query', getUserPosts: { __typename?: 'PostResponse', postsArray?: Array<{ __typename?: 'Post', id: number, title: string, content: string, createdAt: string, updatedAt: string, authorId: number }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetUserVotedPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserVotedPostsQuery = { __typename?: 'Query', getUserVotedPosts: { __typename?: 'VotedPostsResponse', posts?: Array<{ __typename?: 'Post', id: number, title: string, content: string, createdAt: string, updatedAt: string, authorId: number }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type FullUserFragment = { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean };

export type RegisterMutationVariables = Exact<{
  userData: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null } };

export type LoginMutationVariables = Exact<{
  userData: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null } };

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

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, name: string, email: string, image?: string | null, createdAt: string, updatedAt: string, confirmed: boolean } | null } };

export type CheckTokenQueryVariables = Exact<{
  options: CheckTokenInput;
}>;


export type CheckTokenQuery = { __typename?: 'Query', checkToken: { __typename?: 'ConfirmResponse', success: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type FullVoteFragment = { __typename?: 'Vote', id: number, isUpvote: boolean, createdAt: string, updatedAt: string, userId: number, postId?: number | null, commentId?: number | null };

export type CreateVoteMutationVariables = Exact<{
  options: CreateVoteInput;
}>;


export type CreateVoteMutation = { __typename?: 'Mutation', createVote: { __typename?: 'VoteResponse', vote?: { __typename?: 'Vote', id: number, isUpvote: boolean, createdAt: string, updatedAt: string, userId: number, postId?: number | null, commentId?: number | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type DeleteVoteMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteVoteMutation = { __typename?: 'Mutation', deleteVote: { __typename?: 'ConfirmResponse', success: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateVoteMutationVariables = Exact<{
  options: UpdateVoteInput;
}>;


export type UpdateVoteMutation = { __typename?: 'Mutation', updateVote?: { __typename?: 'ConfirmResponse', success: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } | null };

export const FullCommentFragmentDoc = gql`
    fragment FullComment on Comment {
  id
  content
  createdAt
  updatedAt
  authorId
  postId
}
    `;
export const FullErrorFieldFragmentDoc = gql`
    fragment FullErrorField on FieldError {
  field
  message
}
    `;
export const FullPostFragmentDoc = gql`
    fragment FullPost on Post {
  id
  title
  content
  createdAt
  updatedAt
  authorId
}
    `;
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
export const GetCommentByIdDocument = gql`
    query GetCommentById($getCommentId: Int!) {
  getComment(id: $getCommentId) {
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

/**
 * __useGetCommentByIdQuery__
 *
 * To run a query within a React component, call `useGetCommentByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentByIdQuery({
 *   variables: {
 *      getCommentId: // value for 'getCommentId'
 *   },
 * });
 */
export function useGetCommentByIdQuery(baseOptions: Apollo.QueryHookOptions<GetCommentByIdQuery, GetCommentByIdQueryVariables> & ({ variables: GetCommentByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCommentByIdQuery, GetCommentByIdQueryVariables>(GetCommentByIdDocument, options);
      }
export function useGetCommentByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommentByIdQuery, GetCommentByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCommentByIdQuery, GetCommentByIdQueryVariables>(GetCommentByIdDocument, options);
        }
export function useGetCommentByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCommentByIdQuery, GetCommentByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCommentByIdQuery, GetCommentByIdQueryVariables>(GetCommentByIdDocument, options);
        }
export type GetCommentByIdQueryHookResult = ReturnType<typeof useGetCommentByIdQuery>;
export type GetCommentByIdLazyQueryHookResult = ReturnType<typeof useGetCommentByIdLazyQuery>;
export type GetCommentByIdSuspenseQueryHookResult = ReturnType<typeof useGetCommentByIdSuspenseQuery>;
export type GetCommentByIdQueryResult = Apollo.QueryResult<GetCommentByIdQuery, GetCommentByIdQueryVariables>;
export const GetCommentVotesDocument = gql`
    query GetCommentVotes($commentId: Int!) {
  getCommentVotes(commentId: $commentId) {
    errors {
      ...FullErrorField
    }
    votesArray {
      ...FullVote
    }
  }
}
    ${FullErrorFieldFragmentDoc}
${FullVoteFragmentDoc}`;

/**
 * __useGetCommentVotesQuery__
 *
 * To run a query within a React component, call `useGetCommentVotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentVotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentVotesQuery({
 *   variables: {
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useGetCommentVotesQuery(baseOptions: Apollo.QueryHookOptions<GetCommentVotesQuery, GetCommentVotesQueryVariables> & ({ variables: GetCommentVotesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCommentVotesQuery, GetCommentVotesQueryVariables>(GetCommentVotesDocument, options);
      }
export function useGetCommentVotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommentVotesQuery, GetCommentVotesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCommentVotesQuery, GetCommentVotesQueryVariables>(GetCommentVotesDocument, options);
        }
export function useGetCommentVotesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCommentVotesQuery, GetCommentVotesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCommentVotesQuery, GetCommentVotesQueryVariables>(GetCommentVotesDocument, options);
        }
export type GetCommentVotesQueryHookResult = ReturnType<typeof useGetCommentVotesQuery>;
export type GetCommentVotesLazyQueryHookResult = ReturnType<typeof useGetCommentVotesLazyQuery>;
export type GetCommentVotesSuspenseQueryHookResult = ReturnType<typeof useGetCommentVotesSuspenseQuery>;
export type GetCommentVotesQueryResult = Apollo.QueryResult<GetCommentVotesQuery, GetCommentVotesQueryVariables>;
export const GetUserCommentsDocument = gql`
    query GetUserComments {
  getUserComments {
    commentsArray {
      ...FullComment
    }
    errors {
      ...FullErrorField
    }
  }
}
    ${FullCommentFragmentDoc}
${FullErrorFieldFragmentDoc}`;

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
 *   },
 * });
 */
export function useGetUserCommentsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserCommentsQuery, GetUserCommentsQueryVariables>) {
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
export const GetPostsCountDocument = gql`
    query GetPostsCount {
  getPostsCount
}
    `;

/**
 * __useGetPostsCountQuery__
 *
 * To run a query within a React component, call `useGetPostsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPostsCountQuery(baseOptions?: Apollo.QueryHookOptions<GetPostsCountQuery, GetPostsCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsCountQuery, GetPostsCountQueryVariables>(GetPostsCountDocument, options);
      }
export function useGetPostsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsCountQuery, GetPostsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsCountQuery, GetPostsCountQueryVariables>(GetPostsCountDocument, options);
        }
export function useGetPostsCountSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPostsCountQuery, GetPostsCountQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPostsCountQuery, GetPostsCountQueryVariables>(GetPostsCountDocument, options);
        }
export type GetPostsCountQueryHookResult = ReturnType<typeof useGetPostsCountQuery>;
export type GetPostsCountLazyQueryHookResult = ReturnType<typeof useGetPostsCountLazyQuery>;
export type GetPostsCountSuspenseQueryHookResult = ReturnType<typeof useGetPostsCountSuspenseQuery>;
export type GetPostsCountQueryResult = Apollo.QueryResult<GetPostsCountQuery, GetPostsCountQueryVariables>;
export const GetAllPostsDocument = gql`
    query GetAllPosts($options: GetAllPostsInput!) {
  getAllPosts(options: $options) {
    postsArray {
      ...FullPost
    }
    errors {
      ...FullErrorField
    }
  }
}
    ${FullPostFragmentDoc}
${FullErrorFieldFragmentDoc}`;

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
export const GetPostByIdDocument = gql`
    query GetPostById($id: Int!) {
  getPost(id: $id) {
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
export const GetPostCommentsDocument = gql`
    query GetPostComments($postId: Int!) {
  getPostComments(postId: $postId) {
    commentsArray {
      ...FullComment
    }
    errors {
      ...FullErrorField
    }
  }
}
    ${FullCommentFragmentDoc}
${FullErrorFieldFragmentDoc}`;

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
 *      postId: // value for 'postId'
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
export const GetPostVotesDocument = gql`
    query GetPostVotes($postId: Int!) {
  getPostVotes(postId: $postId) {
    votesArray {
      ...FullVote
    }
    errors {
      ...FullErrorField
    }
  }
}
    ${FullVoteFragmentDoc}
${FullErrorFieldFragmentDoc}`;

/**
 * __useGetPostVotesQuery__
 *
 * To run a query within a React component, call `useGetPostVotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostVotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostVotesQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useGetPostVotesQuery(baseOptions: Apollo.QueryHookOptions<GetPostVotesQuery, GetPostVotesQueryVariables> & ({ variables: GetPostVotesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostVotesQuery, GetPostVotesQueryVariables>(GetPostVotesDocument, options);
      }
export function useGetPostVotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostVotesQuery, GetPostVotesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostVotesQuery, GetPostVotesQueryVariables>(GetPostVotesDocument, options);
        }
export function useGetPostVotesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPostVotesQuery, GetPostVotesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPostVotesQuery, GetPostVotesQueryVariables>(GetPostVotesDocument, options);
        }
export type GetPostVotesQueryHookResult = ReturnType<typeof useGetPostVotesQuery>;
export type GetPostVotesLazyQueryHookResult = ReturnType<typeof useGetPostVotesLazyQuery>;
export type GetPostVotesSuspenseQueryHookResult = ReturnType<typeof useGetPostVotesSuspenseQuery>;
export type GetPostVotesQueryResult = Apollo.QueryResult<GetPostVotesQuery, GetPostVotesQueryVariables>;
export const GetUserPostsDocument = gql`
    query GetUserPosts($userId: Float) {
  getUserPosts(userId: $userId) {
    postsArray {
      ...FullPost
    }
    errors {
      ...FullErrorField
    }
  }
}
    ${FullPostFragmentDoc}
${FullErrorFieldFragmentDoc}`;

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
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserPostsQuery, GetUserPostsQueryVariables>) {
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
export const GetUserVotedPostsDocument = gql`
    query GetUserVotedPosts {
  getUserVotedPosts {
    posts {
      ...FullPost
    }
    errors {
      ...FullErrorField
    }
  }
}
    ${FullPostFragmentDoc}
${FullErrorFieldFragmentDoc}`;

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
 *   },
 * });
 */
export function useGetUserVotedPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserVotedPostsQuery, GetUserVotedPostsQueryVariables>) {
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
export const RegisterDocument = gql`
    mutation Register($userData: RegisterInput!) {
  registerUser(userData: $userData) {
    errors {
      ...FullErrorField
    }
    user {
      ...FullUser
    }
  }
}
    ${FullErrorFieldFragmentDoc}
${FullUserFragmentDoc}`;
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
    errors {
      ...FullErrorField
    }
    user {
      ...FullUser
    }
  }
}
    ${FullErrorFieldFragmentDoc}
${FullUserFragmentDoc}`;
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
    success
    errors {
      ...FullErrorField
    }
  }
}
    ${FullErrorFieldFragmentDoc}`;
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
    success
    errors {
      ...FullErrorField
    }
  }
}
    ${FullErrorFieldFragmentDoc}`;
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
    success
    errors {
      ...FullErrorField
    }
  }
}
    ${FullErrorFieldFragmentDoc}`;
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
    success
    errors {
      ...FullErrorField
    }
  }
}
    ${FullErrorFieldFragmentDoc}`;
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
export const MeDocument = gql`
    query Me {
  me {
    errors {
      ...FullErrorField
    }
    user {
      ...FullUser
    }
  }
}
    ${FullErrorFieldFragmentDoc}
${FullUserFragmentDoc}`;

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
    errors {
      ...FullErrorField
    }
    success
  }
}
    ${FullErrorFieldFragmentDoc}`;

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
    mutation DeleteVote($id: Int!) {
  deleteVote(id: $id) {
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
 *      id: // value for 'id'
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