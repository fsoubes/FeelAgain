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
  getFilterShoes: PaginationShoes;
  getClosestShoes: Array<Shoes>;
  getShoesByName: SearchResults;
  me?: Maybe<User>;
  userRole: Scalars['Boolean'];
  getSingleArticle: Blog;
  getArticles: PaginationResponse;
  getBasket: Basket;
  getAllBasket: Array<Basket>;
};


export type QueryGetSingleShoeArgs = {
  shoesId: Scalars['ObjectId'];
};


export type QueryGetFilterShoesArgs = {
  filter?: Maybe<ShoesInputFilter>;
  sort?: Maybe<Scalars['String']>;
  is_published?: Maybe<Scalars['Boolean']>;
  search?: Maybe<Scalars['String']>;
  page: Scalars['Float'];
  limit: Scalars['Float'];
};


export type QueryGetClosestShoesArgs = {
  title: Scalars['String'];
  product: Scalars['String'];
};


export type QueryGetShoesByNameArgs = {
  search: Scalars['String'];
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
  is_published: Scalars['Boolean'];
  tags: Array<Scalars['String']>;
  body_html: Scalars['String'];
  product_type: Scalars['String'];
  price: Scalars['Float'];
  size: Array<Scalars['Float']>;
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
  featured_image?: Maybe<Scalars['String']>;
  available: Scalars['String'];
  grams: Scalars['Float'];
  quantity: Scalars['Float'];
  price: Scalars['Float'];
  compare_at_price: Scalars['Float'];
  shoes: Shoes;
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
  width?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
};

export type PaginationShoes = {
  __typename?: 'PaginationShoes';
  pageInfo: PaginationPage;
  edges: Array<Shoes>;
};

export type PaginationPage = {
  __typename?: 'PaginationPage';
  total?: Maybe<Scalars['Float']>;
  current?: Maybe<Scalars['Float']>;
  totalItem?: Maybe<Scalars['Float']>;
};

export type ShoesInputFilter = {
  product?: Maybe<Scalars['String']>;
  size?: Maybe<Array<Scalars['Float']>>;
  tags?: Maybe<Array<Scalars['String']>>;
  is_published?: Maybe<Scalars['Boolean']>;
};

export type SearchResults = {
  __typename?: 'SearchResults';
  totalCount: Scalars['Float'];
  edges: Array<Shoes>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ObjectId'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  nickname: Scalars['String'];
  email: Scalars['String'];
  basket: Basket;
};

export type Basket = {
  __typename?: 'Basket';
  _id: Scalars['ObjectId'];
  products: Array<CartItem>;
  user: User;
};

export type CartItem = {
  __typename?: 'CartItem';
  _id: Scalars['ObjectId'];
  quantity?: Maybe<Scalars['Float']>;
  variant: Variants;
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
  updateImage: Images;
  updateVariant: Variants;
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
  addGuestCart: Scalars['Boolean'];
  mergeGuestCart: Scalars['Boolean'];
  addCartItem: CartItem;
  updateCartItem: Scalars['String'];
  removeCartItem: Scalars['String'];
};


export type MutationAddShoeArgs = {
  shoes: ShoesInput;
};


export type MutationRemoveShoeArgs = {
  shoeId: Scalars['String'];
};


export type MutationUpdateShoeArgs = {
  shoeId: Scalars['String'];
  shoes: ShoesInput;
};


export type MutationAddImageArgs = {
  parentId: Scalars['String'];
  image: ImageInput;
};


export type MutationUpdateImageArgs = {
  imageId: Scalars['String'];
  image: ImageInput;
};


export type MutationUpdateVariantArgs = {
  variantId: Scalars['String'];
  variant: VariantInput;
};


export type MutationAddVariantArgs = {
  parentId: Scalars['String'];
  variant: VariantInput;
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


export type MutationAddGuestCartArgs = {
  isArg: Scalars['Boolean'];
};


export type MutationMergeGuestCartArgs = {
  isArg: Scalars['Boolean'];
};


export type MutationAddCartItemArgs = {
  variantId: Scalars['String'];
};


export type MutationUpdateCartItemArgs = {
  quantity: Scalars['Float'];
  itemId: Scalars['String'];
};


export type MutationRemoveCartItemArgs = {
  basketId: Scalars['String'];
  itemId: Scalars['String'];
};

export type ShoesInput = {
  title?: Maybe<Scalars['String']>;
  body_html?: Maybe<Scalars['String']>;
  vendor?: Maybe<Scalars['String']>;
  handle?: Maybe<Scalars['String']>;
  product_type?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  size?: Maybe<Array<Scalars['Float']>>;
  price?: Maybe<Scalars['Float']>;
  relatives?: Maybe<Array<Scalars['String']>>;
  is_published?: Maybe<Scalars['Boolean']>;
};

export type ImageInput = {
  position?: Maybe<Scalars['Float']>;
  src?: Maybe<Scalars['String']>;
  product_id?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
};

export type VariantInput = {
  title?: Maybe<Scalars['String']>;
  product_id?: Maybe<Scalars['String']>;
  sku?: Maybe<Scalars['String']>;
  featured_image?: Maybe<Scalars['String']>;
  available?: Maybe<Scalars['Boolean']>;
  grams?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  compare_at_price?: Maybe<Scalars['Float']>;
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
  & Pick<Shoes, '_id' | 'title' | 'handle' | 'score' | 'vendor' | 'scored_by' | 'product_type' | 'price' | 'size'>
);

export type ShoesArticleFragmentFragment = (
  { __typename?: 'Shoes' }
  & Pick<Shoes, 'body_html' | 'visited_by' | 'switchTitle' | 'createdAt'>
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

export type VariantsFragmentFragment = (
  { __typename?: 'Variants' }
  & Pick<Variants, '_id' | 'title' | 'product_id' | 'sku' | 'available' | 'grams' | 'quantity' | 'price' | 'compare_at_price'>
);

export type VariantFragmentFragment = (
  { __typename?: 'Variants' }
  & Pick<Variants, '_id' | 'title' | 'price' | 'quantity' | 'featured_image'>
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

export type AddCartItemMutationVariables = Exact<{
  variantId: Scalars['String'];
}>;


export type AddCartItemMutation = (
  { __typename?: 'Mutation' }
  & { addCartItem: (
    { __typename?: 'CartItem' }
    & Pick<CartItem, '_id' | 'quantity'>
    & { variant: (
      { __typename?: 'Variants' }
      & Pick<Variants, '_id' | 'title' | 'quantity' | 'available' | 'price'>
      & { shoes: (
        { __typename?: 'Shoes' }
        & Pick<Shoes, '_id' | 'title' | 'price' | 'vendor'>
        & { images: Array<(
          { __typename?: 'Images' }
          & Pick<Images, 'src'>
        )> }
      ) }
    ) }
  ) }
);

export type AddImageMutationVariables = Exact<{
  parentId: Scalars['String'];
  position?: Maybe<Scalars['Float']>;
  src?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  product_id?: Maybe<Scalars['String']>;
}>;


export type AddImageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addImage'>
);

export type AddShoeMutationVariables = Exact<{
  title: Scalars['String'];
  body_html?: Maybe<Scalars['String']>;
  vendor?: Maybe<Scalars['String']>;
  price: Scalars['Float'];
  handle?: Maybe<Scalars['String']>;
  product_type?: Maybe<Scalars['String']>;
  tags: Array<Scalars['String']> | Scalars['String'];
  size: Array<Scalars['Float']> | Scalars['Float'];
  is_published: Scalars['Boolean'];
  relatives: Array<Scalars['String']> | Scalars['String'];
}>;


export type AddShoeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addShoe'>
);

export type AddVariantMutationVariables = Exact<{
  title?: Maybe<Scalars['String']>;
  product_id?: Maybe<Scalars['String']>;
  sku?: Maybe<Scalars['String']>;
  featured_image?: Maybe<Scalars['String']>;
  available?: Maybe<Scalars['Boolean']>;
  grams?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  compare_at_price?: Maybe<Scalars['Float']>;
  parentId: Scalars['String'];
}>;


export type AddVariantMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addVariant'>
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

export type RemoveShoeMutationVariables = Exact<{
  shoeId: Scalars['String'];
}>;


export type RemoveShoeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeShoe'>
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

export type RemoveCartItemMutationVariables = Exact<{
  itemId: Scalars['String'];
  basketId: Scalars['String'];
}>;


export type RemoveCartItemMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeCartItem'>
);

export type UpdateCartItemMutationVariables = Exact<{
  itemId: Scalars['String'];
  quantity: Scalars['Float'];
}>;


export type UpdateCartItemMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateCartItem'>
);

export type UpdateImageMutationVariables = Exact<{
  imageId: Scalars['String'];
  position?: Maybe<Scalars['Float']>;
  src?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  product_id?: Maybe<Scalars['String']>;
}>;


export type UpdateImageMutation = (
  { __typename?: 'Mutation' }
  & { updateImage: (
    { __typename?: 'Images' }
    & ImageFragmentFragment
  ) }
);

export type UpdateShoeMutationVariables = Exact<{
  title?: Maybe<Scalars['String']>;
  body_html?: Maybe<Scalars['String']>;
  vendor?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  handle?: Maybe<Scalars['String']>;
  product_type?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']> | Scalars['String']>;
  size?: Maybe<Array<Scalars['Float']> | Scalars['Float']>;
  is_published?: Maybe<Scalars['Boolean']>;
  relatives?: Maybe<Array<Scalars['String']> | Scalars['String']>;
  shoeId: Scalars['String'];
}>;


export type UpdateShoeMutation = (
  { __typename?: 'Mutation' }
  & { updateShoe: (
    { __typename?: 'Shoes' }
    & ShoesBrowseFragmentFragment
  ) }
);

export type UpdateVariantMutationVariables = Exact<{
  title?: Maybe<Scalars['String']>;
  product_id?: Maybe<Scalars['String']>;
  sku?: Maybe<Scalars['String']>;
  featured_image?: Maybe<Scalars['String']>;
  available?: Maybe<Scalars['Boolean']>;
  grams?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  compare_at_price?: Maybe<Scalars['Float']>;
  variantId: Scalars['String'];
}>;


export type UpdateVariantMutation = (
  { __typename?: 'Mutation' }
  & { updateVariant: (
    { __typename?: 'Variants' }
    & VariantFragmentFragment
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

export type GetBasketQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBasketQuery = (
  { __typename?: 'Query' }
  & { getBasket: (
    { __typename?: 'Basket' }
    & Pick<Basket, '_id'>
    & { products: Array<(
      { __typename?: 'CartItem' }
      & Pick<CartItem, '_id' | 'quantity'>
      & { variant: (
        { __typename?: 'Variants' }
        & Pick<Variants, '_id' | 'title' | 'quantity' | 'available' | 'price'>
        & { shoes: (
          { __typename?: 'Shoes' }
          & Pick<Shoes, '_id' | 'title' | 'price' | 'vendor'>
          & { images: Array<(
            { __typename?: 'Images' }
            & Pick<Images, 'src'>
          )> }
        ) }
      ) }
    )>, user: (
      { __typename?: 'User' }
      & Pick<User, '_id' | 'email'>
    ) }
  ) }
);

export type GetClosestShoesQueryVariables = Exact<{
  product: Scalars['String'];
  title: Scalars['String'];
}>;


export type GetClosestShoesQuery = (
  { __typename?: 'Query' }
  & { getClosestShoes: Array<(
    { __typename?: 'Shoes' }
    & Pick<Shoes, '_id' | 'title' | 'price' | 'vendor'>
    & { images: Array<(
      { __typename?: 'Images' }
      & ImageFragmentFragment
    )> }
  )> }
);

export type GetShoesQueryVariables = Exact<{
  limit: Scalars['Float'];
  page: Scalars['Float'];
  sort?: Maybe<Scalars['String']>;
  search?: Maybe<Scalars['String']>;
  product?: Maybe<Scalars['String']>;
  size?: Maybe<Array<Scalars['Float']> | Scalars['Float']>;
  tags?: Maybe<Array<Scalars['String']> | Scalars['String']>;
  is_published?: Maybe<Scalars['Boolean']>;
}>;


export type GetShoesQuery = (
  { __typename?: 'Query' }
  & { getFilterShoes: (
    { __typename?: 'PaginationShoes' }
    & { pageInfo: (
      { __typename?: 'PaginationPage' }
      & Pick<PaginationPage, 'total' | 'current' | 'totalItem'>
    ), edges: Array<(
      { __typename?: 'Shoes' }
      & { images: Array<(
        { __typename?: 'Images' }
        & ImageFragmentFragment
      )> }
      & ShoesBrowseFragmentFragment
    )> }
  ) }
);

export type GetShoesByNameQueryVariables = Exact<{
  search: Scalars['String'];
}>;


export type GetShoesByNameQuery = (
  { __typename?: 'Query' }
  & { getShoesByName: (
    { __typename?: 'SearchResults' }
    & Pick<SearchResults, 'totalCount'>
    & { edges: Array<(
      { __typename?: 'Shoes' }
      & { images: Array<(
        { __typename?: 'Images' }
        & ImageFragmentFragment
      )> }
      & ShoesBrowseFragmentFragment
    )> }
  ) }
);

export type GetDashboardShoesQueryVariables = Exact<{
  shoesId: Scalars['ObjectId'];
}>;


export type GetDashboardShoesQuery = (
  { __typename?: 'Query' }
  & { getSingleShoe: (
    { __typename?: 'Shoes' }
    & Pick<Shoes, '_id' | 'title' | 'body_html' | 'handle' | 'vendor' | 'product_type' | 'price' | 'tags' | 'size' | 'is_published'>
    & { images: Array<(
      { __typename?: 'Images' }
      & Pick<Images, '_id' | 'src'>
    )>, variants: Array<(
      { __typename?: 'Variants' }
      & VariantFragmentFragment
    )>, relatives: Array<(
      { __typename?: 'Shoes' }
      & Pick<Shoes, '_id' | 'title' | 'price' | 'vendor'>
      & { images: Array<(
        { __typename?: 'Images' }
        & Pick<Images, '_id' | 'src'>
      )> }
    )> }
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

export type GetSingleShoesQueryVariables = Exact<{
  shoesId: Scalars['ObjectId'];
}>;


export type GetSingleShoesQuery = (
  { __typename?: 'Query' }
  & { getSingleShoe: (
    { __typename?: 'Shoes' }
    & { images: Array<(
      { __typename?: 'Images' }
      & ImageFragmentFragment
    )>, variants: Array<(
      { __typename?: 'Variants' }
      & VariantFragmentFragment
    )>, relatives: Array<(
      { __typename?: 'Shoes' }
      & Pick<Shoes, '_id' | 'title'>
    )> }
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

export type UserRoleQueryVariables = Exact<{ [key: string]: never; }>;


export type UserRoleQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'userRole'>
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
  vendor
  scored_by
  product_type
  price
  size
}
    `;
export const ShoesArticleFragmentFragmentDoc = gql`
    fragment ShoesArticleFragment on Shoes {
  body_html
  visited_by
  switchTitle
  createdAt
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
export const VariantsFragmentFragmentDoc = gql`
    fragment VariantsFragment on Variants {
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
export const VariantFragmentFragmentDoc = gql`
    fragment VariantFragment on Variants {
  _id
  title
  price
  quantity
  featured_image
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
export const AddCartItemDocument = gql`
    mutation AddCartItem($variantId: String!) {
  addCartItem(variantId: $variantId) {
    _id
    quantity
    variant {
      _id
      title
      quantity
      available
      price
      shoes {
        _id
        title
        price
        vendor
        images {
          src
        }
      }
    }
  }
}
    `;
export type AddCartItemMutationFn = Apollo.MutationFunction<AddCartItemMutation, AddCartItemMutationVariables>;

/**
 * __useAddCartItemMutation__
 *
 * To run a mutation, you first call `useAddCartItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCartItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCartItemMutation, { data, loading, error }] = useAddCartItemMutation({
 *   variables: {
 *      variantId: // value for 'variantId'
 *   },
 * });
 */
export function useAddCartItemMutation(baseOptions?: Apollo.MutationHookOptions<AddCartItemMutation, AddCartItemMutationVariables>) {
        return Apollo.useMutation<AddCartItemMutation, AddCartItemMutationVariables>(AddCartItemDocument, baseOptions);
      }
export type AddCartItemMutationHookResult = ReturnType<typeof useAddCartItemMutation>;
export type AddCartItemMutationResult = Apollo.MutationResult<AddCartItemMutation>;
export type AddCartItemMutationOptions = Apollo.BaseMutationOptions<AddCartItemMutation, AddCartItemMutationVariables>;
export const AddImageDocument = gql`
    mutation AddImage($parentId: String!, $position: Float, $src: String, $width: Float, $height: Float, $product_id: String) {
  addImage(
    parentId: $parentId
    image: {position: $position, src: $src, width: $width, height: $height, product_id: $product_id}
  )
}
    `;
export type AddImageMutationFn = Apollo.MutationFunction<AddImageMutation, AddImageMutationVariables>;

/**
 * __useAddImageMutation__
 *
 * To run a mutation, you first call `useAddImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addImageMutation, { data, loading, error }] = useAddImageMutation({
 *   variables: {
 *      parentId: // value for 'parentId'
 *      position: // value for 'position'
 *      src: // value for 'src'
 *      width: // value for 'width'
 *      height: // value for 'height'
 *      product_id: // value for 'product_id'
 *   },
 * });
 */
export function useAddImageMutation(baseOptions?: Apollo.MutationHookOptions<AddImageMutation, AddImageMutationVariables>) {
        return Apollo.useMutation<AddImageMutation, AddImageMutationVariables>(AddImageDocument, baseOptions);
      }
export type AddImageMutationHookResult = ReturnType<typeof useAddImageMutation>;
export type AddImageMutationResult = Apollo.MutationResult<AddImageMutation>;
export type AddImageMutationOptions = Apollo.BaseMutationOptions<AddImageMutation, AddImageMutationVariables>;
export const AddShoeDocument = gql`
    mutation AddShoe($title: String!, $body_html: String, $vendor: String, $price: Float!, $handle: String, $product_type: String, $tags: [String!]!, $size: [Float!]!, $is_published: Boolean!, $relatives: [String!]!) {
  addShoe(
    shoes: {title: $title, body_html: $body_html, vendor: $vendor, handle: $handle, product_type: $product_type, tags: $tags, size: $size, is_published: $is_published, relatives: $relatives, price: $price}
  )
}
    `;
export type AddShoeMutationFn = Apollo.MutationFunction<AddShoeMutation, AddShoeMutationVariables>;

/**
 * __useAddShoeMutation__
 *
 * To run a mutation, you first call `useAddShoeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddShoeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addShoeMutation, { data, loading, error }] = useAddShoeMutation({
 *   variables: {
 *      title: // value for 'title'
 *      body_html: // value for 'body_html'
 *      vendor: // value for 'vendor'
 *      price: // value for 'price'
 *      handle: // value for 'handle'
 *      product_type: // value for 'product_type'
 *      tags: // value for 'tags'
 *      size: // value for 'size'
 *      is_published: // value for 'is_published'
 *      relatives: // value for 'relatives'
 *   },
 * });
 */
export function useAddShoeMutation(baseOptions?: Apollo.MutationHookOptions<AddShoeMutation, AddShoeMutationVariables>) {
        return Apollo.useMutation<AddShoeMutation, AddShoeMutationVariables>(AddShoeDocument, baseOptions);
      }
export type AddShoeMutationHookResult = ReturnType<typeof useAddShoeMutation>;
export type AddShoeMutationResult = Apollo.MutationResult<AddShoeMutation>;
export type AddShoeMutationOptions = Apollo.BaseMutationOptions<AddShoeMutation, AddShoeMutationVariables>;
export const AddVariantDocument = gql`
    mutation AddVariant($title: String, $product_id: String, $sku: String, $featured_image: String, $available: Boolean, $grams: Float, $quantity: Float, $price: Float, $compare_at_price: Float, $parentId: String!) {
  addVariant(
    parentId: $parentId
    variant: {title: $title, product_id: $product_id, sku: $sku, featured_image: $featured_image, available: $available, grams: $grams, quantity: $quantity, price: $price, compare_at_price: $compare_at_price}
  )
}
    `;
export type AddVariantMutationFn = Apollo.MutationFunction<AddVariantMutation, AddVariantMutationVariables>;

/**
 * __useAddVariantMutation__
 *
 * To run a mutation, you first call `useAddVariantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddVariantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addVariantMutation, { data, loading, error }] = useAddVariantMutation({
 *   variables: {
 *      title: // value for 'title'
 *      product_id: // value for 'product_id'
 *      sku: // value for 'sku'
 *      featured_image: // value for 'featured_image'
 *      available: // value for 'available'
 *      grams: // value for 'grams'
 *      quantity: // value for 'quantity'
 *      price: // value for 'price'
 *      compare_at_price: // value for 'compare_at_price'
 *      parentId: // value for 'parentId'
 *   },
 * });
 */
export function useAddVariantMutation(baseOptions?: Apollo.MutationHookOptions<AddVariantMutation, AddVariantMutationVariables>) {
        return Apollo.useMutation<AddVariantMutation, AddVariantMutationVariables>(AddVariantDocument, baseOptions);
      }
export type AddVariantMutationHookResult = ReturnType<typeof useAddVariantMutation>;
export type AddVariantMutationResult = Apollo.MutationResult<AddVariantMutation>;
export type AddVariantMutationOptions = Apollo.BaseMutationOptions<AddVariantMutation, AddVariantMutationVariables>;
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
export const RemoveShoeDocument = gql`
    mutation RemoveShoe($shoeId: String!) {
  removeShoe(shoeId: $shoeId)
}
    `;
export type RemoveShoeMutationFn = Apollo.MutationFunction<RemoveShoeMutation, RemoveShoeMutationVariables>;

/**
 * __useRemoveShoeMutation__
 *
 * To run a mutation, you first call `useRemoveShoeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveShoeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeShoeMutation, { data, loading, error }] = useRemoveShoeMutation({
 *   variables: {
 *      shoeId: // value for 'shoeId'
 *   },
 * });
 */
export function useRemoveShoeMutation(baseOptions?: Apollo.MutationHookOptions<RemoveShoeMutation, RemoveShoeMutationVariables>) {
        return Apollo.useMutation<RemoveShoeMutation, RemoveShoeMutationVariables>(RemoveShoeDocument, baseOptions);
      }
export type RemoveShoeMutationHookResult = ReturnType<typeof useRemoveShoeMutation>;
export type RemoveShoeMutationResult = Apollo.MutationResult<RemoveShoeMutation>;
export type RemoveShoeMutationOptions = Apollo.BaseMutationOptions<RemoveShoeMutation, RemoveShoeMutationVariables>;
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
export const RemoveCartItemDocument = gql`
    mutation RemoveCartItem($itemId: String!, $basketId: String!) {
  removeCartItem(itemId: $itemId, basketId: $basketId)
}
    `;
export type RemoveCartItemMutationFn = Apollo.MutationFunction<RemoveCartItemMutation, RemoveCartItemMutationVariables>;

/**
 * __useRemoveCartItemMutation__
 *
 * To run a mutation, you first call `useRemoveCartItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCartItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCartItemMutation, { data, loading, error }] = useRemoveCartItemMutation({
 *   variables: {
 *      itemId: // value for 'itemId'
 *      basketId: // value for 'basketId'
 *   },
 * });
 */
export function useRemoveCartItemMutation(baseOptions?: Apollo.MutationHookOptions<RemoveCartItemMutation, RemoveCartItemMutationVariables>) {
        return Apollo.useMutation<RemoveCartItemMutation, RemoveCartItemMutationVariables>(RemoveCartItemDocument, baseOptions);
      }
export type RemoveCartItemMutationHookResult = ReturnType<typeof useRemoveCartItemMutation>;
export type RemoveCartItemMutationResult = Apollo.MutationResult<RemoveCartItemMutation>;
export type RemoveCartItemMutationOptions = Apollo.BaseMutationOptions<RemoveCartItemMutation, RemoveCartItemMutationVariables>;
export const UpdateCartItemDocument = gql`
    mutation UpdateCartItem($itemId: String!, $quantity: Float!) {
  updateCartItem(itemId: $itemId, quantity: $quantity)
}
    `;
export type UpdateCartItemMutationFn = Apollo.MutationFunction<UpdateCartItemMutation, UpdateCartItemMutationVariables>;

/**
 * __useUpdateCartItemMutation__
 *
 * To run a mutation, you first call `useUpdateCartItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCartItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCartItemMutation, { data, loading, error }] = useUpdateCartItemMutation({
 *   variables: {
 *      itemId: // value for 'itemId'
 *      quantity: // value for 'quantity'
 *   },
 * });
 */
export function useUpdateCartItemMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCartItemMutation, UpdateCartItemMutationVariables>) {
        return Apollo.useMutation<UpdateCartItemMutation, UpdateCartItemMutationVariables>(UpdateCartItemDocument, baseOptions);
      }
export type UpdateCartItemMutationHookResult = ReturnType<typeof useUpdateCartItemMutation>;
export type UpdateCartItemMutationResult = Apollo.MutationResult<UpdateCartItemMutation>;
export type UpdateCartItemMutationOptions = Apollo.BaseMutationOptions<UpdateCartItemMutation, UpdateCartItemMutationVariables>;
export const UpdateImageDocument = gql`
    mutation UpdateImage($imageId: String!, $position: Float, $src: String, $width: Float, $height: Float, $product_id: String) {
  updateImage(
    imageId: $imageId
    image: {position: $position, src: $src, width: $width, height: $height, product_id: $product_id}
  ) {
    ...ImageFragment
  }
}
    ${ImageFragmentFragmentDoc}`;
export type UpdateImageMutationFn = Apollo.MutationFunction<UpdateImageMutation, UpdateImageMutationVariables>;

/**
 * __useUpdateImageMutation__
 *
 * To run a mutation, you first call `useUpdateImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateImageMutation, { data, loading, error }] = useUpdateImageMutation({
 *   variables: {
 *      imageId: // value for 'imageId'
 *      position: // value for 'position'
 *      src: // value for 'src'
 *      width: // value for 'width'
 *      height: // value for 'height'
 *      product_id: // value for 'product_id'
 *   },
 * });
 */
export function useUpdateImageMutation(baseOptions?: Apollo.MutationHookOptions<UpdateImageMutation, UpdateImageMutationVariables>) {
        return Apollo.useMutation<UpdateImageMutation, UpdateImageMutationVariables>(UpdateImageDocument, baseOptions);
      }
export type UpdateImageMutationHookResult = ReturnType<typeof useUpdateImageMutation>;
export type UpdateImageMutationResult = Apollo.MutationResult<UpdateImageMutation>;
export type UpdateImageMutationOptions = Apollo.BaseMutationOptions<UpdateImageMutation, UpdateImageMutationVariables>;
export const UpdateShoeDocument = gql`
    mutation UpdateShoe($title: String, $body_html: String, $vendor: String, $price: Float, $handle: String, $product_type: String, $tags: [String!], $size: [Float!], $is_published: Boolean, $relatives: [String!], $shoeId: String!) {
  updateShoe(
    shoeId: $shoeId
    shoes: {title: $title, body_html: $body_html, vendor: $vendor, handle: $handle, product_type: $product_type, tags: $tags, size: $size, is_published: $is_published, price: $price, relatives: $relatives}
  ) {
    ...ShoesBrowseFragment
  }
}
    ${ShoesBrowseFragmentFragmentDoc}`;
export type UpdateShoeMutationFn = Apollo.MutationFunction<UpdateShoeMutation, UpdateShoeMutationVariables>;

/**
 * __useUpdateShoeMutation__
 *
 * To run a mutation, you first call `useUpdateShoeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateShoeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateShoeMutation, { data, loading, error }] = useUpdateShoeMutation({
 *   variables: {
 *      title: // value for 'title'
 *      body_html: // value for 'body_html'
 *      vendor: // value for 'vendor'
 *      price: // value for 'price'
 *      handle: // value for 'handle'
 *      product_type: // value for 'product_type'
 *      tags: // value for 'tags'
 *      size: // value for 'size'
 *      is_published: // value for 'is_published'
 *      relatives: // value for 'relatives'
 *      shoeId: // value for 'shoeId'
 *   },
 * });
 */
export function useUpdateShoeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateShoeMutation, UpdateShoeMutationVariables>) {
        return Apollo.useMutation<UpdateShoeMutation, UpdateShoeMutationVariables>(UpdateShoeDocument, baseOptions);
      }
export type UpdateShoeMutationHookResult = ReturnType<typeof useUpdateShoeMutation>;
export type UpdateShoeMutationResult = Apollo.MutationResult<UpdateShoeMutation>;
export type UpdateShoeMutationOptions = Apollo.BaseMutationOptions<UpdateShoeMutation, UpdateShoeMutationVariables>;
export const UpdateVariantDocument = gql`
    mutation UpdateVariant($title: String, $product_id: String, $sku: String, $featured_image: String, $available: Boolean, $grams: Float, $quantity: Float, $price: Float, $compare_at_price: Float, $variantId: String!) {
  updateVariant(
    variantId: $variantId
    variant: {title: $title, product_id: $product_id, sku: $sku, featured_image: $featured_image, available: $available, grams: $grams, quantity: $quantity, price: $price, compare_at_price: $compare_at_price}
  ) {
    ...VariantFragment
  }
}
    ${VariantFragmentFragmentDoc}`;
export type UpdateVariantMutationFn = Apollo.MutationFunction<UpdateVariantMutation, UpdateVariantMutationVariables>;

/**
 * __useUpdateVariantMutation__
 *
 * To run a mutation, you first call `useUpdateVariantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVariantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVariantMutation, { data, loading, error }] = useUpdateVariantMutation({
 *   variables: {
 *      title: // value for 'title'
 *      product_id: // value for 'product_id'
 *      sku: // value for 'sku'
 *      featured_image: // value for 'featured_image'
 *      available: // value for 'available'
 *      grams: // value for 'grams'
 *      quantity: // value for 'quantity'
 *      price: // value for 'price'
 *      compare_at_price: // value for 'compare_at_price'
 *      variantId: // value for 'variantId'
 *   },
 * });
 */
export function useUpdateVariantMutation(baseOptions?: Apollo.MutationHookOptions<UpdateVariantMutation, UpdateVariantMutationVariables>) {
        return Apollo.useMutation<UpdateVariantMutation, UpdateVariantMutationVariables>(UpdateVariantDocument, baseOptions);
      }
export type UpdateVariantMutationHookResult = ReturnType<typeof useUpdateVariantMutation>;
export type UpdateVariantMutationResult = Apollo.MutationResult<UpdateVariantMutation>;
export type UpdateVariantMutationOptions = Apollo.BaseMutationOptions<UpdateVariantMutation, UpdateVariantMutationVariables>;
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
export const GetBasketDocument = gql`
    query GetBasket {
  getBasket {
    _id
    products {
      _id
      quantity
      variant {
        _id
        title
        quantity
        available
        price
        shoes {
          _id
          title
          price
          vendor
          images {
            src
          }
        }
      }
    }
    user {
      _id
      email
    }
  }
}
    `;

/**
 * __useGetBasketQuery__
 *
 * To run a query within a React component, call `useGetBasketQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBasketQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBasketQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBasketQuery(baseOptions?: Apollo.QueryHookOptions<GetBasketQuery, GetBasketQueryVariables>) {
        return Apollo.useQuery<GetBasketQuery, GetBasketQueryVariables>(GetBasketDocument, baseOptions);
      }
export function useGetBasketLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBasketQuery, GetBasketQueryVariables>) {
          return Apollo.useLazyQuery<GetBasketQuery, GetBasketQueryVariables>(GetBasketDocument, baseOptions);
        }
export type GetBasketQueryHookResult = ReturnType<typeof useGetBasketQuery>;
export type GetBasketLazyQueryHookResult = ReturnType<typeof useGetBasketLazyQuery>;
export type GetBasketQueryResult = Apollo.QueryResult<GetBasketQuery, GetBasketQueryVariables>;
export const GetClosestShoesDocument = gql`
    query GetClosestShoes($product: String!, $title: String!) {
  getClosestShoes(product: $product, title: $title) {
    _id
    title
    price
    vendor
    images {
      ...ImageFragment
    }
  }
}
    ${ImageFragmentFragmentDoc}`;

/**
 * __useGetClosestShoesQuery__
 *
 * To run a query within a React component, call `useGetClosestShoesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClosestShoesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClosestShoesQuery({
 *   variables: {
 *      product: // value for 'product'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useGetClosestShoesQuery(baseOptions: Apollo.QueryHookOptions<GetClosestShoesQuery, GetClosestShoesQueryVariables>) {
        return Apollo.useQuery<GetClosestShoesQuery, GetClosestShoesQueryVariables>(GetClosestShoesDocument, baseOptions);
      }
export function useGetClosestShoesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetClosestShoesQuery, GetClosestShoesQueryVariables>) {
          return Apollo.useLazyQuery<GetClosestShoesQuery, GetClosestShoesQueryVariables>(GetClosestShoesDocument, baseOptions);
        }
export type GetClosestShoesQueryHookResult = ReturnType<typeof useGetClosestShoesQuery>;
export type GetClosestShoesLazyQueryHookResult = ReturnType<typeof useGetClosestShoesLazyQuery>;
export type GetClosestShoesQueryResult = Apollo.QueryResult<GetClosestShoesQuery, GetClosestShoesQueryVariables>;
export const GetShoesDocument = gql`
    query GetShoes($limit: Float!, $page: Float!, $sort: String, $search: String, $product: String, $size: [Float!], $tags: [String!], $is_published: Boolean) {
  getFilterShoes(
    limit: $limit
    page: $page
    search: $search
    sort: $sort
    is_published: $is_published
    filter: {product: $product, size: $size, tags: $tags}
  ) {
    pageInfo {
      total
      current
      totalItem
    }
    edges {
      ...ShoesBrowseFragment
      images {
        ...ImageFragment
      }
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
 *      page: // value for 'page'
 *      sort: // value for 'sort'
 *      search: // value for 'search'
 *      product: // value for 'product'
 *      size: // value for 'size'
 *      tags: // value for 'tags'
 *      is_published: // value for 'is_published'
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
export const GetShoesByNameDocument = gql`
    query GetShoesByName($search: String!) {
  getShoesByName(search: $search) {
    totalCount
    edges {
      ...ShoesBrowseFragment
      images {
        ...ImageFragment
      }
    }
  }
}
    ${ShoesBrowseFragmentFragmentDoc}
${ImageFragmentFragmentDoc}`;

/**
 * __useGetShoesByNameQuery__
 *
 * To run a query within a React component, call `useGetShoesByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetShoesByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetShoesByNameQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useGetShoesByNameQuery(baseOptions: Apollo.QueryHookOptions<GetShoesByNameQuery, GetShoesByNameQueryVariables>) {
        return Apollo.useQuery<GetShoesByNameQuery, GetShoesByNameQueryVariables>(GetShoesByNameDocument, baseOptions);
      }
export function useGetShoesByNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetShoesByNameQuery, GetShoesByNameQueryVariables>) {
          return Apollo.useLazyQuery<GetShoesByNameQuery, GetShoesByNameQueryVariables>(GetShoesByNameDocument, baseOptions);
        }
export type GetShoesByNameQueryHookResult = ReturnType<typeof useGetShoesByNameQuery>;
export type GetShoesByNameLazyQueryHookResult = ReturnType<typeof useGetShoesByNameLazyQuery>;
export type GetShoesByNameQueryResult = Apollo.QueryResult<GetShoesByNameQuery, GetShoesByNameQueryVariables>;
export const GetDashboardShoesDocument = gql`
    query GetDashboardShoes($shoesId: ObjectId!) {
  getSingleShoe(shoesId: $shoesId) {
    _id
    title
    body_html
    handle
    vendor
    product_type
    price
    tags
    size
    is_published
    images {
      _id
      src
    }
    variants {
      ...VariantFragment
    }
    relatives {
      _id
      title
      price
      vendor
      images {
        _id
        src
      }
    }
  }
}
    ${VariantFragmentFragmentDoc}`;

/**
 * __useGetDashboardShoesQuery__
 *
 * To run a query within a React component, call `useGetDashboardShoesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDashboardShoesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDashboardShoesQuery({
 *   variables: {
 *      shoesId: // value for 'shoesId'
 *   },
 * });
 */
export function useGetDashboardShoesQuery(baseOptions: Apollo.QueryHookOptions<GetDashboardShoesQuery, GetDashboardShoesQueryVariables>) {
        return Apollo.useQuery<GetDashboardShoesQuery, GetDashboardShoesQueryVariables>(GetDashboardShoesDocument, baseOptions);
      }
export function useGetDashboardShoesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDashboardShoesQuery, GetDashboardShoesQueryVariables>) {
          return Apollo.useLazyQuery<GetDashboardShoesQuery, GetDashboardShoesQueryVariables>(GetDashboardShoesDocument, baseOptions);
        }
export type GetDashboardShoesQueryHookResult = ReturnType<typeof useGetDashboardShoesQuery>;
export type GetDashboardShoesLazyQueryHookResult = ReturnType<typeof useGetDashboardShoesLazyQuery>;
export type GetDashboardShoesQueryResult = Apollo.QueryResult<GetDashboardShoesQuery, GetDashboardShoesQueryVariables>;
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
    images {
      ...ImageFragment
    }
    variants {
      ...VariantFragment
    }
    relatives {
      _id
      title
    }
  }
}
    ${ShoesBrowseFragmentFragmentDoc}
${ShoesArticleFragmentFragmentDoc}
${ImageFragmentFragmentDoc}
${VariantFragmentFragmentDoc}`;

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
export const UserRoleDocument = gql`
    query UserRole {
  userRole
}
    `;

/**
 * __useUserRoleQuery__
 *
 * To run a query within a React component, call `useUserRoleQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserRoleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserRoleQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserRoleQuery(baseOptions?: Apollo.QueryHookOptions<UserRoleQuery, UserRoleQueryVariables>) {
        return Apollo.useQuery<UserRoleQuery, UserRoleQueryVariables>(UserRoleDocument, baseOptions);
      }
export function useUserRoleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserRoleQuery, UserRoleQueryVariables>) {
          return Apollo.useLazyQuery<UserRoleQuery, UserRoleQueryVariables>(UserRoleDocument, baseOptions);
        }
export type UserRoleQueryHookResult = ReturnType<typeof useUserRoleQuery>;
export type UserRoleLazyQueryHookResult = ReturnType<typeof useUserRoleLazyQuery>;
export type UserRoleQueryResult = Apollo.QueryResult<UserRoleQuery, UserRoleQueryVariables>;