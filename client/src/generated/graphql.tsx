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
  getSingleShoe: Shoes;
  getFilterShoes: Array<Shoes>;
  me?: Maybe<User>;
  getSingleArticle: Blog;
  getArticles: PaginationResponse;
};


export type QueryGetSingleShoeArgs = {
  shoesId: Scalars['ObjectId'];
};


export type QueryGetFilterShoesArgs = {
  limit: Scalars['Float'];
};


export type QueryGetSingleArticleArgs = {
  articleId: Scalars['ObjectId'];
};


export type QueryGetArticlesArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Float'];
};

export type Shoes = {
  __typename?: 'Shoes';
  _id: Scalars['ObjectId'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  title: Scalars['String'];
  score: Scalars['Float'];
  scored_by: Scalars['Float'];
  visited_by: Scalars['Float'];
  bought_by: Scalars['Float'];
  handle: Scalars['String'];
  vendor: Scalars['String'];
  tags: Array<Scalars['String']>;
  body_html: Scalars['String'];
  product_type: Scalars['String'];
  variants: Array<Variants>;
  options: Array<OptionShoes>;
  images: Array<Images>;
  relatives: Array<Shoes>;
  switchTitle: Array<Scalars['String']>;
};



export type Variants = {
  __typename?: 'Variants';
  _id: Scalars['ObjectId'];
  title: Scalars['String'];
  product_id: Scalars['String'];
  option1: Scalars['String'];
  option2: Scalars['String'];
  option3: Scalars['String'];
  sku: Scalars['String'];
  featured_image: Scalars['String'];
  available: Scalars['String'];
  grams: Scalars['Float'];
  quantity: Scalars['String'];
  price: Scalars['String'];
  compare_at_price: Scalars['String'];
};

export type OptionShoes = {
  __typename?: 'OptionShoes';
  name: Scalars['String'];
  position: Scalars['String'];
  values: Array<Scalars['String']>;
};

export type Images = {
  __typename?: 'Images';
  _id: Scalars['ObjectId'];
  position: Scalars['Float'];
  src: Scalars['String'];
  product_id: Scalars['String'];
  width: Scalars['Float'];
  height: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ObjectId'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  nickname: Scalars['String'];
  email: Scalars['String'];
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
  addShoe: Scalars['ObjectId'];
  removeShoe: Scalars['String'];
  updateShoe: Shoes;
  addImage: Scalars['String'];
  addVariant: Scalars['String'];
  changePassword: UserResponse;
  forgotPassword: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  addArticle: Blog;
  ratingReview: Scalars['Boolean'];
  addShoes: Scalars['Boolean'];
  addRelation: Scalars['Boolean'];
};


export type MutationAddShoeArgs = {
  Shoe: ShoesInput;
};


export type MutationRemoveShoeArgs = {
  ShoeId: Scalars['String'];
};


export type MutationUpdateShoeArgs = {
  shoeId: Scalars['String'];
  Shoes: Scalars['String'];
};


export type MutationAddImageArgs = {
  ParentId: Scalars['String'];
  Image: ImageInput;
};


export type MutationAddVariantArgs = {
  parentId: Scalars['String'];
  Variant: VariantInput;
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


export type MutationAddArticleArgs = {
  blog: BlogInput;
};


export type MutationRatingReviewArgs = {
  articleId: Scalars['String'];
  rating: Scalars['String'];
};

export type ShoesInput = {
  title: Scalars['String'];
  body_html?: Maybe<Scalars['String']>;
  vendor?: Maybe<Scalars['String']>;
  switch?: Maybe<Scalars['String']>;
  handle?: Maybe<Scalars['String']>;
  product_type?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
};

export type ImageInput = {
  position: Scalars['Float'];
  src: Scalars['String'];
  product_id: Scalars['String'];
  width: Scalars['Float'];
  height: Scalars['Float'];
};

export type VariantInput = {
  title: Scalars['String'];
  product_id: Scalars['String'];
  option1: Scalars['String'];
  option2: Scalars['String'];
  option3: Scalars['String'];
  sku: Scalars['String'];
  featured_image: Scalars['String'];
  available: Scalars['String'];
  grams: Scalars['Float'];
  quantity: Scalars['String'];
  price: Scalars['String'];
  compare_at_price: Scalars['String'];
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

export type ImageFragmentFragment = (
  { __typename?: 'Images' }
  & Pick<Images, '_id' | 'position' | 'src' | 'product_id' | 'width' | 'height'>
);

export type ShoesBrowseFragmentFragment = (
  { __typename?: 'Shoes' }
  & Pick<Shoes, '_id' | 'title' | 'handle' | 'score' | 'scored_by' | 'product_type'>
  & { options: Array<(
    { __typename?: 'OptionShoes' }
    & Pick<OptionShoes, 'name' | 'position' | 'values'>
  )> }
);

export type ShoesArticleFragmentFragment = (
  { __typename?: 'Shoes' }
  & Pick<Shoes, 'body_html' | 'vendor' | 'visited_by' | 'switchTitle'>
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

export type VariantFragmentFragment = (
  { __typename?: 'Variants' }
  & Pick<Variants, '_id' | 'title' | 'product_id' | 'sku' | 'available' | 'grams' | 'quantity' | 'price' | 'compare_at_price'>
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

export type GetShoesQueryVariables = Exact<{
  limit: Scalars['Float'];
}>;


export type GetShoesQuery = (
  { __typename?: 'Query' }
  & { getFilterShoes: Array<(
    { __typename?: 'Shoes' }
    & { images: Array<(
      { __typename?: 'Images' }
      & ImageFragmentFragment
    )> }
    & ShoesBrowseFragmentFragment
  )> }
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

export type GetSingleShoesQueryVariables = Exact<{
  shoesId: Scalars['ObjectId'];
}>;


export type GetSingleShoesQuery = (
  { __typename?: 'Query' }
  & { getSingleShoe: (
    { __typename?: 'Shoes' }
    & ShoesBrowseFragmentFragment
    & ShoesArticleFragmentFragment
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
export const ImageFragmentFragmentDoc = gql`
    fragment ImageFragment on Images {
  _id
  position
  src
  product_id
  width
  height
}
    `;
export const ShoesBrowseFragmentFragmentDoc = gql`
    fragment ShoesBrowseFragment on Shoes {
  _id
  title
  handle
  score
  scored_by
  product_type
  options {
    name
    position
    values
  }
}
    `;
export const ShoesArticleFragmentFragmentDoc = gql`
    fragment ShoesArticleFragment on Shoes {
  body_html
  vendor
  visited_by
  switchTitle
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
export const VariantFragmentFragmentDoc = gql`
    fragment VariantFragment on Variants {
  _id
  title
  product_id
  sku
  available
  grams
  quantity
  price
  compare_at_price
}
    `;
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
export const GetShoesDocument = gql`
    query GetShoes($limit: Float!) {
  getFilterShoes(limit: $limit) {
    ...ShoesBrowseFragment
    images {
      ...ImageFragment
    }
  }
}
    ${ShoesBrowseFragmentFragmentDoc}
${ImageFragmentFragmentDoc}`;

/**
 * __useGetShoesQuery__
 *
 * To run a query within a React component, call `useGetShoesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetShoesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetShoesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetShoesQuery(baseOptions: Apollo.QueryHookOptions<GetShoesQuery, GetShoesQueryVariables>) {
        return Apollo.useQuery<GetShoesQuery, GetShoesQueryVariables>(GetShoesDocument, baseOptions);
      }
export function useGetShoesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetShoesQuery, GetShoesQueryVariables>) {
          return Apollo.useLazyQuery<GetShoesQuery, GetShoesQueryVariables>(GetShoesDocument, baseOptions);
        }
export type GetShoesQueryHookResult = ReturnType<typeof useGetShoesQuery>;
export type GetShoesLazyQueryHookResult = ReturnType<typeof useGetShoesLazyQuery>;
export type GetShoesQueryResult = Apollo.QueryResult<GetShoesQuery, GetShoesQueryVariables>;
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
export const GetSingleShoesDocument = gql`
    query GetSingleShoes($shoesId: ObjectId!) {
  getSingleShoe(shoesId: $shoesId) {
    ...ShoesBrowseFragment
    ...ShoesArticleFragment
  }
}
    ${ShoesBrowseFragmentFragmentDoc}
${ShoesArticleFragmentFragmentDoc}`;

/**
 * __useGetSingleShoesQuery__
 *
 * To run a query within a React component, call `useGetSingleShoesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSingleShoesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSingleShoesQuery({
 *   variables: {
 *      shoesId: // value for 'shoesId'
 *   },
 * });
 */
export function useGetSingleShoesQuery(baseOptions: Apollo.QueryHookOptions<GetSingleShoesQuery, GetSingleShoesQueryVariables>) {
        return Apollo.useQuery<GetSingleShoesQuery, GetSingleShoesQueryVariables>(GetSingleShoesDocument, baseOptions);
      }
export function useGetSingleShoesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSingleShoesQuery, GetSingleShoesQueryVariables>) {
          return Apollo.useLazyQuery<GetSingleShoesQuery, GetSingleShoesQueryVariables>(GetSingleShoesDocument, baseOptions);
        }
export type GetSingleShoesQueryHookResult = ReturnType<typeof useGetSingleShoesQuery>;
export type GetSingleShoesLazyQueryHookResult = ReturnType<typeof useGetSingleShoesLazyQuery>;
export type GetSingleShoesQueryResult = Apollo.QueryResult<GetSingleShoesQuery, GetSingleShoesQueryVariables>;
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