import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Mongo object id scalar type */
  ObjectId: any;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  recipe?: Maybe<Recipe>;
  recipes: Array<Recipe>;
  getSingleArticle: Blog;
  getArticles: PaginationResponse;
};


export type QueryRecipeArgs = {
  recipeId: Scalars['ObjectId'];
};


export type QueryGetSingleArticleArgs = {
  articleId: Scalars['ObjectId'];
};


export type QueryGetArticlesArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ObjectId'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  nickname: Scalars['String'];
  email: Scalars['String'];
};



export type Recipe = {
  __typename?: 'Recipe';
  _id: Scalars['ObjectId'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  ratings: Array<Rate>;
  author: User;
};

export type Rate = {
  __typename?: 'Rate';
  value: Scalars['Int'];
  date: Scalars['DateTime'];
  user: User;
};

export type Blog = {
  __typename?: 'Blog';
  _id: Scalars['ObjectId'];
  title: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  image_url?: Maybe<Scalars['String']>;
  tags: Array<Scalars['String']>;
  source: Array<Scalars['String']>;
  social: Array<Scalars['String']>;
  article?: Maybe<Scalars['String']>;
  isPublished?: Maybe<Scalars['Boolean']>;
  positiveRating: Scalars['Float'];
  totalVoting: Scalars['Float'];
  authRating?: Maybe<Scalars['String']>;
  author: User;
  upRating: Array<User>;
  downRating: Array<User>;
  comments: Comment;
};

export type Comment = {
  __typename?: 'Comment';
  _id: Scalars['ObjectId'];
  message: Scalars['String'];
  author: User;
};

export type PaginationResponse = {
  __typename?: 'PaginationResponse';
  pageInfo: PaginationInfo;
  edges: Array<Blog>;
};

export type PaginationInfo = {
  __typename?: 'PaginationInfo';
  hasNextPage?: Maybe<Scalars['Boolean']>;
  endCursor?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserResponse;
  forgotPassword: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  addRecipe: Recipe;
  rate: Recipe;
  addArticle: Blog;
  ratingReview: Scalars['Boolean'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  user: UserRegister;
};


export type MutationLoginArgs = {
  user: UserLogin;
};


export type MutationAddRecipeArgs = {
  recipe: RecipeInput;
};


export type MutationRateArgs = {
  rate: RateInput;
};


export type MutationAddArticleArgs = {
  blog: BlogInput;
};


export type MutationRatingReviewArgs = {
  articleId: Scalars['String'];
  rating: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UserRegister = {
  email: Scalars['String'];
  nickname: Scalars['String'];
  password: Scalars['String'];
};

export type UserLogin = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RecipeInput = {
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type RateInput = {
  recipeId: Scalars['ObjectId'];
  value: Scalars['Int'];
};

export type BlogInput = {
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  image_url?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  source?: Maybe<Array<Scalars['String']>>;
  social?: Maybe<Array<Scalars['String']>>;
  article?: Maybe<Scalars['String']>;
  isPublished?: Maybe<Scalars['Boolean']>;
};

export type ArticleFragmentFragment = (
  { __typename?: 'Blog' }
  & Pick<Blog, '_id' | 'title' | 'description' | 'image_url' | 'tags' | 'source' | 'social' | 'article' | 'isPublished' | 'createdAt' | 'updatedAt' | 'totalVoting' | 'authRating'>
  & { author: (
    { __typename?: 'User' }
    & Pick<User, '_id' | 'nickname' | 'email'>
  ) }
);

export type UserFragmentFragment = (
  { __typename?: 'User' }
  & Pick<User, '_id' | 'nickname' | 'email' | 'createdAt'>
);

export type UserFragmentErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type UserFragmentResponseFragment = (
  { __typename?: 'UserResponse' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & UserFragmentFragment
  )>, errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & UserFragmentErrorFragment
  )>> }
);

export type AddArticleMutationVariables = Exact<{
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  image_url?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']> | Scalars['String']>;
  source?: Maybe<Array<Scalars['String']> | Scalars['String']>;
  social?: Maybe<Array<Scalars['String']> | Scalars['String']>;
  article?: Maybe<Scalars['String']>;
  isPublished?: Maybe<Scalars['Boolean']>;
}>;


export type AddArticleMutation = (
  { __typename?: 'Mutation' }
  & { addArticle: (
    { __typename?: 'Blog' }
    & ArticleFragmentFragment
  ) }
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & UserFragmentResponseFragment
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RatingReviewMutationVariables = Exact<{
  articleId: Scalars['String'];
  rating: Scalars['String'];
}>;


export type RatingReviewMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'ratingReview'>
);

export type RegisterMutationVariables = Exact<{
  nickname: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & UserFragmentResponseFragment
  ) }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & UserFragmentResponseFragment
  ) }
);

export type GetArticlesQueryVariables = Exact<{
  limit: Scalars['Float'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type GetArticlesQuery = (
  { __typename?: 'Query' }
  & { getArticles: (
    { __typename?: 'PaginationResponse' }
    & { edges: Array<(
      { __typename?: 'Blog' }
      & ArticleFragmentFragment
    )>, pageInfo: (
      { __typename?: 'PaginationInfo' }
      & Pick<PaginationInfo, 'hasNextPage' | 'endCursor'>
    ) }
  ) }
);

export type GetSingleArticleQueryVariables = Exact<{
  articleId: Scalars['ObjectId'];
}>;


export type GetSingleArticleQuery = (
  { __typename?: 'Query' }
  & { getSingleArticle: (
    { __typename?: 'Blog' }
    & ArticleFragmentFragment
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'nickname' | 'email'>
  )> }
);

export const ArticleFragmentFragmentDoc = gql`
    fragment ArticleFragment on Blog {
  _id
  title
  description
  image_url
  tags
  source
  social
  article
  isPublished
  createdAt
  updatedAt
  totalVoting
  authRating
  author {
    _id
    nickname
    email
  }
}
    `;
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  _id
  nickname
  email
  createdAt
}
    `;
export const UserFragmentErrorFragmentDoc = gql`
    fragment UserFragmentError on FieldError {
  field
  message
}
    `;
export const UserFragmentResponseFragmentDoc = gql`
    fragment UserFragmentResponse on UserResponse {
  user {
    ...UserFragment
  }
  errors {
    ...UserFragmentError
  }
}
    ${UserFragmentFragmentDoc}
${UserFragmentErrorFragmentDoc}`;
export const AddArticleDocument = gql`
    mutation AddArticle($title: String!, $description: String, $image_url: String, $tags: [String!], $source: [String!], $social: [String!], $article: String, $isPublished: Boolean) {
  addArticle(
    blog: {title: $title, description: $description, image_url: $image_url, tags: $tags, source: $source, social: $social, article: $article, isPublished: $isPublished}
  ) {
    ...ArticleFragment
  }
}
    ${ArticleFragmentFragmentDoc}`;
export type AddArticleMutationFn = Apollo.MutationFunction<AddArticleMutation, AddArticleMutationVariables>;

/**
 * __useAddArticleMutation__
 *
 * To run a mutation, you first call `useAddArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addArticleMutation, { data, loading, error }] = useAddArticleMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      image_url: // value for 'image_url'
 *      tags: // value for 'tags'
 *      source: // value for 'source'
 *      social: // value for 'social'
 *      article: // value for 'article'
 *      isPublished: // value for 'isPublished'
 *   },
 * });
 */
export function useAddArticleMutation(baseOptions?: Apollo.MutationHookOptions<AddArticleMutation, AddArticleMutationVariables>) {
        return Apollo.useMutation<AddArticleMutation, AddArticleMutationVariables>(AddArticleDocument, baseOptions);
      }
export type AddArticleMutationHookResult = ReturnType<typeof useAddArticleMutation>;
export type AddArticleMutationResult = Apollo.MutationResult<AddArticleMutation>;
export type AddArticleMutationOptions = Apollo.BaseMutationOptions<AddArticleMutation, AddArticleMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...UserFragmentResponse
  }
}
    ${UserFragmentResponseFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, baseOptions);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
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
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RatingReviewDocument = gql`
    mutation RatingReview($articleId: String!, $rating: String!) {
  ratingReview(articleId: $articleId, rating: $rating)
}
    `;
export type RatingReviewMutationFn = Apollo.MutationFunction<RatingReviewMutation, RatingReviewMutationVariables>;

/**
 * __useRatingReviewMutation__
 *
 * To run a mutation, you first call `useRatingReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRatingReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [ratingReviewMutation, { data, loading, error }] = useRatingReviewMutation({
 *   variables: {
 *      articleId: // value for 'articleId'
 *      rating: // value for 'rating'
 *   },
 * });
 */
export function useRatingReviewMutation(baseOptions?: Apollo.MutationHookOptions<RatingReviewMutation, RatingReviewMutationVariables>) {
        return Apollo.useMutation<RatingReviewMutation, RatingReviewMutationVariables>(RatingReviewDocument, baseOptions);
      }
export type RatingReviewMutationHookResult = ReturnType<typeof useRatingReviewMutation>;
export type RatingReviewMutationResult = Apollo.MutationResult<RatingReviewMutation>;
export type RatingReviewMutationOptions = Apollo.BaseMutationOptions<RatingReviewMutation, RatingReviewMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($nickname: String!, $email: String!, $password: String!) {
  register(user: {email: $email, nickname: $nickname, password: $password}) {
    ...UserFragmentResponse
  }
}
    ${UserFragmentResponseFragmentDoc}`;
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
 *      nickname: // value for 'nickname'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(user: {email: $email, password: $password}) {
    ...UserFragmentResponse
  }
}
    ${UserFragmentResponseFragmentDoc}`;
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
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const GetArticlesDocument = gql`
    query GetArticles($limit: Float!, $cursor: String) {
  getArticles(limit: $limit, cursor: $cursor) {
    edges {
      ...ArticleFragment
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    ${ArticleFragmentFragmentDoc}`;

/**
 * __useGetArticlesQuery__
 *
 * To run a query within a React component, call `useGetArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArticlesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetArticlesQuery(baseOptions: Apollo.QueryHookOptions<GetArticlesQuery, GetArticlesQueryVariables>) {
        return Apollo.useQuery<GetArticlesQuery, GetArticlesQueryVariables>(GetArticlesDocument, baseOptions);
      }
export function useGetArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetArticlesQuery, GetArticlesQueryVariables>) {
          return Apollo.useLazyQuery<GetArticlesQuery, GetArticlesQueryVariables>(GetArticlesDocument, baseOptions);
        }
export type GetArticlesQueryHookResult = ReturnType<typeof useGetArticlesQuery>;
export type GetArticlesLazyQueryHookResult = ReturnType<typeof useGetArticlesLazyQuery>;
export type GetArticlesQueryResult = Apollo.QueryResult<GetArticlesQuery, GetArticlesQueryVariables>;
export const GetSingleArticleDocument = gql`
    query getSingleArticle($articleId: ObjectId!) {
  getSingleArticle(articleId: $articleId) {
    ...ArticleFragment
  }
}
    ${ArticleFragmentFragmentDoc}`;

/**
 * __useGetSingleArticleQuery__
 *
 * To run a query within a React component, call `useGetSingleArticleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSingleArticleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSingleArticleQuery({
 *   variables: {
 *      articleId: // value for 'articleId'
 *   },
 * });
 */
export function useGetSingleArticleQuery(baseOptions: Apollo.QueryHookOptions<GetSingleArticleQuery, GetSingleArticleQueryVariables>) {
        return Apollo.useQuery<GetSingleArticleQuery, GetSingleArticleQueryVariables>(GetSingleArticleDocument, baseOptions);
      }
export function useGetSingleArticleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSingleArticleQuery, GetSingleArticleQueryVariables>) {
          return Apollo.useLazyQuery<GetSingleArticleQuery, GetSingleArticleQueryVariables>(GetSingleArticleDocument, baseOptions);
        }
export type GetSingleArticleQueryHookResult = ReturnType<typeof useGetSingleArticleQuery>;
export type GetSingleArticleLazyQueryHookResult = ReturnType<typeof useGetSingleArticleLazyQuery>;
export type GetSingleArticleQueryResult = Apollo.QueryResult<GetSingleArticleQuery, GetSingleArticleQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    _id
    nickname
    email
  }
}
    `;

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
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;