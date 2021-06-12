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
  getReview: Comments;
  getAllOrderProducts: Array<CartItem>;
  getAllOrders: Array<Orders>;
  getOrders: Array<Orders>;
  getOrder: Orders;
  getSingleShoe: Shoes;
  getFilterShoes: PaginationShoes;
  getClosestShoes: Array<Shoes>;
  getShoesByName: SearchResults;
  me?: Maybe<User>;
  userRole: Scalars['Boolean'];
  getSingleArticle: Blog;
  getClosestArticles: Array<Blog>;
  getArticles: PaginationResponse;
  getBasket: Basket;
  getAllBasket: Array<Basket>;
  getCartItems: Array<CartItem>;
  getNewsletter: Newsletter;
  getPurchases: Array<Purchases>;
};


export type QueryGetReviewArgs = {
  shoesId: Scalars['String'];
};


export type QueryGetOrderArgs = {
  orderId: Scalars['String'];
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


export type QueryGetClosestArticlesArgs = {
  title: Scalars['String'];
  tags: Scalars['String'];
};


export type QueryGetArticlesArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Float'];
};

export type Comments = {
  __typename?: 'Comments';
  _id: Scalars['ObjectId'];
  title?: Maybe<Scalars['String']>;
  comment?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Float']>;
  product?: Maybe<Shoes>;
  article?: Maybe<Blog>;
  createdAt: Scalars['DateTime'];
  recommanded_by?: Maybe<Scalars['Float']>;
  recommanded: Array<User>;
  is_recommanding?: Maybe<Scalars['Boolean']>;
  author: User;
};


export type Shoes = {
  __typename?: 'Shoes';
  _id: Scalars['ObjectId'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  title: Scalars['String'];
  score: Scalars['Float'];
  scored_by: Scalars['Float'];
  score_1: Scalars['Float'];
  score_2: Scalars['Float'];
  score_3: Scalars['Float'];
  score_4: Scalars['Float'];
  score_5: Scalars['Float'];
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
  comments: Array<Comments>;
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

export type Blog = {
  __typename?: 'Blog';
  _id: Scalars['ObjectId'];
  title: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  image_url?: Maybe<Scalars['String']>;
  image_back?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
  source: Array<Scalars['String']>;
  social: Array<Scalars['String']>;
  article?: Maybe<Scalars['String']>;
  is_published?: Maybe<Scalars['Boolean']>;
  positiveRating: Scalars['Float'];
  totalVoting: Scalars['Float'];
  authRating?: Maybe<Scalars['String']>;
  author: User;
  upRating: Array<User>;
  downRating: Array<User>;
  comments?: Maybe<Array<Comments>>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ObjectId'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  customer_id: Scalars['String'];
  nickname: Scalars['String'];
  items?: Maybe<Scalars['Float']>;
  email: Scalars['String'];
  basket: Basket;
};

export type Basket = {
  __typename?: 'Basket';
  _id: Scalars['ObjectId'];
  products: Array<CartItem>;
  total?: Maybe<Scalars['Float']>;
  user: User;
};

export type CartItem = {
  __typename?: 'CartItem';
  _id: Scalars['ObjectId'];
  quantity?: Maybe<Scalars['Float']>;
  order?: Maybe<Scalars['Boolean']>;
  comments?: Maybe<Comments>;
  variant: Variants;
  user: Scalars['String'];
};

export type Orders = {
  __typename?: 'Orders';
  _id: Scalars['ObjectId'];
  products: Array<CartItem>;
  payment_method: PaymentType;
  status: Scalars['String'];
  payment_intent: Scalars['String'];
  tracking?: Maybe<Scalars['String']>;
  last_four?: Maybe<Scalars['String']>;
  timeline: Scalars['Float'];
  total: Scalars['Float'];
  adress: Adress;
  createdAt: Scalars['DateTime'];
  user: User;
};

/** type of payment */
export enum PaymentType {
  PayPal = 'PayPal',
  Stripe = 'Stripe'
}

export type Adress = {
  __typename?: 'Adress';
  name?: Maybe<Scalars['String']>;
  line1?: Maybe<Scalars['String']>;
  line2?: Maybe<Scalars['String']>;
  postal_code?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  delivery: DeliveryType;
};

/** type of payment */
export enum DeliveryType {
  Pickup = 'Pickup',
  Home = 'Home'
}

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

export type Newsletter = {
  __typename?: 'Newsletter';
  _id: Scalars['ObjectId'];
  type: Scalars['String'];
  email: Array<Scalars['String']>;
  users: Array<User>;
};

export type Purchases = {
  __typename?: 'Purchases';
  _id: Scalars['ObjectId'];
  product: Variants;
  comment?: Maybe<Comments>;
  owner: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  addRecommendation: Scalars['String'];
  refundOrder: Scalars['String'];
  addReview: Scalars['String'];
  addShoe: Scalars['ObjectId'];
  removeShoe: Scalars['String'];
  incrementCountView: Scalars['Boolean'];
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
  addComment: Scalars['String'];
  updateArticle: Blog;
  ratingReview: Scalars['Boolean'];
  addShoes: Scalars['Boolean'];
  addRelation: Scalars['Boolean'];
  addGuestCart: Scalars['Boolean'];
  mergeGuestCart: Scalars['Boolean'];
  addCartItem: CartItem;
  updateCartItem: Scalars['String'];
  removeCartItem: Scalars['String'];
  addPayPalPayment: Scalars['String'];
  addPayment: Scalars['String'];
  sendNewsletter: Scalars['Boolean'];
  addToNewsletter: Scalars['Boolean'];
};


export type MutationAddRecommendationArgs = {
  commentId: Scalars['String'];
};


export type MutationRefundOrderArgs = {
  total: Scalars['Float'];
  updated: Array<Scalars['String']>;
  orderId: Scalars['String'];
};


export type MutationAddReviewArgs = {
  comments: CommentInput;
  reviewId?: Maybe<Scalars['String']>;
  itemId: Scalars['String'];
  shoesId: Scalars['String'];
};


export type MutationAddShoeArgs = {
  shoes: ShoesInput;
};


export type MutationRemoveShoeArgs = {
  shoeId: Scalars['String'];
};


export type MutationIncrementCountViewArgs = {
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


export type MutationAddCommentArgs = {
  articleId: Scalars['String'];
  comment: Scalars['String'];
};


export type MutationUpdateArticleArgs = {
  blogId: Scalars['String'];
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
  quantity: Scalars['Float'];
  basketId: Scalars['String'];
  itemId: Scalars['String'];
};


export type MutationAddPayPalPaymentArgs = {
  details: DetailsInput;
  paypalId: Scalars['String'];
};


export type MutationAddPaymentArgs = {
  details: DetailsInput;
  stripeId: Scalars['String'];
};


export type MutationAddToNewsletterArgs = {
  email: Scalars['String'];
};

export type CommentInput = {
  title?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Float']>;
  comment?: Maybe<Scalars['String']>;
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
  image_back?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
  source?: Maybe<Array<Scalars['String']>>;
  social?: Maybe<Array<Scalars['String']>>;
  article?: Maybe<Scalars['String']>;
  is_published?: Maybe<Scalars['Boolean']>;
};

export type DetailsInput = {
  line1?: Maybe<Scalars['String']>;
  line2?: Maybe<Scalars['String']>;
  postal_code?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  last_four?: Maybe<Scalars['String']>;
  delivery?: Maybe<DeliveryType>;
  payment_method?: Maybe<PaymentType>;
  amount?: Maybe<Scalars['String']>;
};

export type ArticleFragmentFragment = (
  { __typename?: 'Blog' }
  & Pick<Blog, '_id' | 'title' | 'description' | 'image_url' | 'image_back' | 'tags' | 'source' | 'social' | 'article' | 'is_published' | 'createdAt' | 'updatedAt' | 'totalVoting' | 'authRating'>
  & { author: (
    { __typename?: 'User' }
    & Pick<User, '_id' | 'nickname' | 'email'>
  ) }
);

export type CommentsFragmentFragment = (
  { __typename?: 'Comments' }
  & Pick<Comments, '_id' | 'title' | 'comment' | 'score' | 'is_recommanding' | 'recommanded_by' | 'createdAt'>
  & { author: (
    { __typename?: 'User' }
    & Pick<User, '_id' | 'nickname'>
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
  & Pick<Shoes, 'body_html' | 'visited_by' | 'switchTitle' | 'createdAt' | 'handle' | 'score' | 'scored_by' | 'score_1' | 'score_2' | 'score_3' | 'score_4' | 'score_5'>
);

export type UserFragmentFragment = (
  { __typename?: 'User' }
  & Pick<User, '_id' | 'nickname' | 'email' | 'createdAt' | 'items'>
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
  tags: Scalars['String'];
  source?: Maybe<Array<Scalars['String']> | Scalars['String']>;
  social?: Maybe<Array<Scalars['String']> | Scalars['String']>;
  article?: Maybe<Scalars['String']>;
  is_published?: Maybe<Scalars['Boolean']>;
  image_back?: Maybe<Scalars['String']>;
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

export type AddCommentMutationVariables = Exact<{
  articleId: Scalars['String'];
  comment: Scalars['String'];
}>;


export type AddCommentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addComment'>
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

export type AddPayPalPaymentMutationVariables = Exact<{
  paypalId: Scalars['String'];
  line1?: Maybe<Scalars['String']>;
  line2?: Maybe<Scalars['String']>;
  postal_code?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  delivery?: Maybe<DeliveryType>;
  payment_method?: Maybe<PaymentType>;
  amount?: Maybe<Scalars['String']>;
}>;


export type AddPayPalPaymentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addPayPalPayment'>
);

export type AddPaymentMutationVariables = Exact<{
  stripeId: Scalars['String'];
  line1?: Maybe<Scalars['String']>;
  line2?: Maybe<Scalars['String']>;
  postal_code?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  delivery?: Maybe<DeliveryType>;
  payment_method?: Maybe<PaymentType>;
  amount?: Maybe<Scalars['String']>;
  last_four?: Maybe<Scalars['String']>;
}>;


export type AddPaymentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addPayment'>
);

export type AddRecommendationMutationVariables = Exact<{
  commentId: Scalars['String'];
}>;


export type AddRecommendationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addRecommendation'>
);

export type AddReviewMutationVariables = Exact<{
  shoesId: Scalars['String'];
  itemId: Scalars['String'];
  reviewId?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Float']>;
  title?: Maybe<Scalars['String']>;
  comment?: Maybe<Scalars['String']>;
}>;


export type AddReviewMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addReview'>
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

export type AddToNewsletterMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type AddToNewsletterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addToNewsletter'>
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

export type IncrementCountViewMutationVariables = Exact<{
  shoeId: Scalars['String'];
}>;


export type IncrementCountViewMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'incrementCountView'>
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

export type RefundOrderMutationVariables = Exact<{
  orderId: Scalars['String'];
  updated: Array<Scalars['String']> | Scalars['String'];
  total: Scalars['Float'];
}>;


export type RefundOrderMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'refundOrder'>
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
  quantity: Scalars['Float'];
}>;


export type RemoveCartItemMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeCartItem'>
);

export type UpdateArticleMutationVariables = Exact<{
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  image_url?: Maybe<Scalars['String']>;
  tags: Scalars['String'];
  source?: Maybe<Array<Scalars['String']> | Scalars['String']>;
  social?: Maybe<Array<Scalars['String']> | Scalars['String']>;
  article?: Maybe<Scalars['String']>;
  is_published?: Maybe<Scalars['Boolean']>;
  image_back?: Maybe<Scalars['String']>;
  blogId: Scalars['String'];
}>;


export type UpdateArticleMutation = (
  { __typename?: 'Mutation' }
  & { updateArticle: (
    { __typename?: 'Blog' }
    & ArticleFragmentFragment
  ) }
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

export type GetCartItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCartItemsQuery = (
  { __typename?: 'Query' }
  & { getCartItems: Array<(
    { __typename?: 'CartItem' }
    & Pick<CartItem, '_id'>
    & { comments?: Maybe<(
      { __typename?: 'Comments' }
      & Pick<Comments, '_id' | 'score' | 'comment' | 'title'>
    )>, variant: (
      { __typename?: 'Variants' }
      & Pick<Variants, '_id' | 'title'>
      & { shoes: (
        { __typename?: 'Shoes' }
        & Pick<Shoes, '_id' | 'title' | 'vendor'>
        & { images: Array<(
          { __typename?: 'Images' }
          & Pick<Images, 'src'>
        )> }
      ) }
    ) }
  )> }
);

export type GetClosestArticlesQueryVariables = Exact<{
  tags: Scalars['String'];
  title: Scalars['String'];
}>;


export type GetClosestArticlesQuery = (
  { __typename?: 'Query' }
  & { getClosestArticles: Array<(
    { __typename?: 'Blog' }
    & Pick<Blog, '_id' | 'title' | 'image_url' | 'createdAt'>
  )> }
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

export type GetMinShoesQueryVariables = Exact<{
  shoesId: Scalars['ObjectId'];
}>;


export type GetMinShoesQuery = (
  { __typename?: 'Query' }
  & { getSingleShoe: (
    { __typename?: 'Shoes' }
    & { images: Array<(
      { __typename?: 'Images' }
      & ImageFragmentFragment
    )> }
    & ShoesBrowseFragmentFragment
  ) }
);

export type GetOrderQueryVariables = Exact<{
  orderId: Scalars['String'];
}>;


export type GetOrderQuery = (
  { __typename?: 'Query' }
  & { getOrder: (
    { __typename?: 'Orders' }
    & Pick<Orders, '_id' | 'total' | 'tracking' | 'createdAt' | 'timeline' | 'status' | 'last_four' | 'payment_method'>
    & { adress: (
      { __typename?: 'Adress' }
      & Pick<Adress, 'name' | 'line1' | 'line2' | 'phone' | 'email' | 'city' | 'postal_code' | 'country' | 'delivery'>
    ), user: (
      { __typename?: 'User' }
      & Pick<User, 'email'>
    ), products: Array<(
      { __typename?: 'CartItem' }
      & Pick<CartItem, '_id' | 'quantity'>
      & { variant: (
        { __typename?: 'Variants' }
        & Pick<Variants, '_id' | 'title' | 'price'>
        & { shoes: (
          { __typename?: 'Shoes' }
          & Pick<Shoes, '_id' | 'vendor' | 'title'>
          & { images: Array<(
            { __typename?: 'Images' }
            & Pick<Images, 'src'>
          )> }
        ) }
      ) }
    )> }
  ) }
);

export type GetOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrdersQuery = (
  { __typename?: 'Query' }
  & { getOrders: Array<(
    { __typename?: 'Orders' }
    & Pick<Orders, '_id' | 'total' | 'tracking' | 'createdAt' | 'status'>
    & { adress: (
      { __typename?: 'Adress' }
      & Pick<Adress, 'name' | 'line1' | 'line2' | 'phone' | 'email' | 'city' | 'postal_code' | 'country'>
    ), user: (
      { __typename?: 'User' }
      & Pick<User, 'email'>
    ), products: Array<(
      { __typename?: 'CartItem' }
      & Pick<CartItem, '_id' | 'quantity'>
      & { variant: (
        { __typename?: 'Variants' }
        & Pick<Variants, 'title'>
        & { shoes: (
          { __typename?: 'Shoes' }
          & Pick<Shoes, '_id' | 'title' | 'vendor'>
          & { images: Array<(
            { __typename?: 'Images' }
            & Pick<Images, 'src'>
          )> }
        ) }
      ) }
    )> }
  )> }
);

export type GetPurchasesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPurchasesQuery = (
  { __typename?: 'Query' }
  & { getPurchases: Array<(
    { __typename?: 'Purchases' }
    & Pick<Purchases, '_id'>
    & { comment?: Maybe<(
      { __typename?: 'Comments' }
      & Pick<Comments, '_id' | 'score' | 'comment' | 'title'>
    )>, product: (
      { __typename?: 'Variants' }
      & Pick<Variants, '_id' | 'title'>
      & { shoes: (
        { __typename?: 'Shoes' }
        & Pick<Shoes, '_id' | 'title' | 'vendor'>
        & { images: Array<(
          { __typename?: 'Images' }
          & Pick<Images, 'src'>
        )> }
      ) }
    ) }
  )> }
);

export type GetReviewQueryVariables = Exact<{
  shoesId: Scalars['String'];
}>;


export type GetReviewQuery = (
  { __typename?: 'Query' }
  & { getReview: (
    { __typename?: 'Comments' }
    & Pick<Comments, '_id' | 'title' | 'comment' | 'score'>
  ) }
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
    & { comments?: Maybe<Array<(
      { __typename?: 'Comments' }
      & CommentsFragmentFragment
    )>> }
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
    )>, comments: Array<(
      { __typename?: 'Comments' }
      & CommentsFragmentFragment
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
    & Pick<User, '_id' | 'nickname' | 'email' | 'items'>
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
  image_back
  tags
  source
  social
  article
  is_published
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
export const CommentsFragmentFragmentDoc = gql`
    fragment CommentsFragment on Comments {
  _id
  title
  comment
  score
  is_recommanding
  recommanded_by
  createdAt
  author {
    _id
    nickname
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
  handle
  score
  scored_by
  score_1
  score_2
  score_3
  score_4
  score_5
}
    `;
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  _id
  nickname
  email
  createdAt
  items
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
    mutation AddArticle($title: String!, $description: String, $image_url: String, $tags: String!, $source: [String!], $social: [String!], $article: String, $is_published: Boolean, $image_back: String) {
  addArticle(
    blog: {title: $title, description: $description, image_url: $image_url, tags: $tags, source: $source, social: $social, article: $article, is_published: $is_published, image_back: $image_back}
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
 *      is_published: // value for 'is_published'
 *      image_back: // value for 'image_back'
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
export const AddCommentDocument = gql`
    mutation AddComment($articleId: String!, $comment: String!) {
  addComment(articleId: $articleId, comment: $comment)
}
    `;
export type AddCommentMutationFn = Apollo.MutationFunction<AddCommentMutation, AddCommentMutationVariables>;

/**
 * __useAddCommentMutation__
 *
 * To run a mutation, you first call `useAddCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCommentMutation, { data, loading, error }] = useAddCommentMutation({
 *   variables: {
 *      articleId: // value for 'articleId'
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useAddCommentMutation(baseOptions?: Apollo.MutationHookOptions<AddCommentMutation, AddCommentMutationVariables>) {
        return Apollo.useMutation<AddCommentMutation, AddCommentMutationVariables>(AddCommentDocument, baseOptions);
      }
export type AddCommentMutationHookResult = ReturnType<typeof useAddCommentMutation>;
export type AddCommentMutationResult = Apollo.MutationResult<AddCommentMutation>;
export type AddCommentMutationOptions = Apollo.BaseMutationOptions<AddCommentMutation, AddCommentMutationVariables>;
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
export const AddPayPalPaymentDocument = gql`
    mutation AddPayPalPayment($paypalId: String!, $line1: String, $line2: String, $postal_code: String, $country: String, $city: String, $email: String, $name: String, $phone: String, $delivery: DeliveryType, $payment_method: PaymentType, $amount: String) {
  addPayPalPayment(
    paypalId: $paypalId
    details: {line1: $line1, line2: $line2, postal_code: $postal_code, country: $country, city: $city, email: $email, name: $name, phone: $phone, delivery: $delivery, amount: $amount, payment_method: $payment_method}
  )
}
    `;
export type AddPayPalPaymentMutationFn = Apollo.MutationFunction<AddPayPalPaymentMutation, AddPayPalPaymentMutationVariables>;

/**
 * __useAddPayPalPaymentMutation__
 *
 * To run a mutation, you first call `useAddPayPalPaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPayPalPaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPayPalPaymentMutation, { data, loading, error }] = useAddPayPalPaymentMutation({
 *   variables: {
 *      paypalId: // value for 'paypalId'
 *      line1: // value for 'line1'
 *      line2: // value for 'line2'
 *      postal_code: // value for 'postal_code'
 *      country: // value for 'country'
 *      city: // value for 'city'
 *      email: // value for 'email'
 *      name: // value for 'name'
 *      phone: // value for 'phone'
 *      delivery: // value for 'delivery'
 *      payment_method: // value for 'payment_method'
 *      amount: // value for 'amount'
 *   },
 * });
 */
export function useAddPayPalPaymentMutation(baseOptions?: Apollo.MutationHookOptions<AddPayPalPaymentMutation, AddPayPalPaymentMutationVariables>) {
        return Apollo.useMutation<AddPayPalPaymentMutation, AddPayPalPaymentMutationVariables>(AddPayPalPaymentDocument, baseOptions);
      }
export type AddPayPalPaymentMutationHookResult = ReturnType<typeof useAddPayPalPaymentMutation>;
export type AddPayPalPaymentMutationResult = Apollo.MutationResult<AddPayPalPaymentMutation>;
export type AddPayPalPaymentMutationOptions = Apollo.BaseMutationOptions<AddPayPalPaymentMutation, AddPayPalPaymentMutationVariables>;
export const AddPaymentDocument = gql`
    mutation AddPayment($stripeId: String!, $line1: String, $line2: String, $postal_code: String, $country: String, $city: String, $email: String, $name: String, $phone: String, $delivery: DeliveryType, $payment_method: PaymentType, $amount: String, $last_four: String) {
  addPayment(
    stripeId: $stripeId
    details: {line1: $line1, line2: $line2, postal_code: $postal_code, country: $country, city: $city, email: $email, name: $name, phone: $phone, delivery: $delivery, amount: $amount, last_four: $last_four, payment_method: $payment_method}
  )
}
    `;
export type AddPaymentMutationFn = Apollo.MutationFunction<AddPaymentMutation, AddPaymentMutationVariables>;

/**
 * __useAddPaymentMutation__
 *
 * To run a mutation, you first call `useAddPaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPaymentMutation, { data, loading, error }] = useAddPaymentMutation({
 *   variables: {
 *      stripeId: // value for 'stripeId'
 *      line1: // value for 'line1'
 *      line2: // value for 'line2'
 *      postal_code: // value for 'postal_code'
 *      country: // value for 'country'
 *      city: // value for 'city'
 *      email: // value for 'email'
 *      name: // value for 'name'
 *      phone: // value for 'phone'
 *      delivery: // value for 'delivery'
 *      payment_method: // value for 'payment_method'
 *      amount: // value for 'amount'
 *      last_four: // value for 'last_four'
 *   },
 * });
 */
export function useAddPaymentMutation(baseOptions?: Apollo.MutationHookOptions<AddPaymentMutation, AddPaymentMutationVariables>) {
        return Apollo.useMutation<AddPaymentMutation, AddPaymentMutationVariables>(AddPaymentDocument, baseOptions);
      }
export type AddPaymentMutationHookResult = ReturnType<typeof useAddPaymentMutation>;
export type AddPaymentMutationResult = Apollo.MutationResult<AddPaymentMutation>;
export type AddPaymentMutationOptions = Apollo.BaseMutationOptions<AddPaymentMutation, AddPaymentMutationVariables>;
export const AddRecommendationDocument = gql`
    mutation AddRecommendation($commentId: String!) {
  addRecommendation(commentId: $commentId)
}
    `;
export type AddRecommendationMutationFn = Apollo.MutationFunction<AddRecommendationMutation, AddRecommendationMutationVariables>;

/**
 * __useAddRecommendationMutation__
 *
 * To run a mutation, you first call `useAddRecommendationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddRecommendationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addRecommendationMutation, { data, loading, error }] = useAddRecommendationMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useAddRecommendationMutation(baseOptions?: Apollo.MutationHookOptions<AddRecommendationMutation, AddRecommendationMutationVariables>) {
        return Apollo.useMutation<AddRecommendationMutation, AddRecommendationMutationVariables>(AddRecommendationDocument, baseOptions);
      }
export type AddRecommendationMutationHookResult = ReturnType<typeof useAddRecommendationMutation>;
export type AddRecommendationMutationResult = Apollo.MutationResult<AddRecommendationMutation>;
export type AddRecommendationMutationOptions = Apollo.BaseMutationOptions<AddRecommendationMutation, AddRecommendationMutationVariables>;
export const AddReviewDocument = gql`
    mutation AddReview($shoesId: String!, $itemId: String!, $reviewId: String, $score: Float, $title: String, $comment: String) {
  addReview(
    shoesId: $shoesId
    itemId: $itemId
    reviewId: $reviewId
    comments: {score: $score, title: $title, comment: $comment}
  )
}
    `;
export type AddReviewMutationFn = Apollo.MutationFunction<AddReviewMutation, AddReviewMutationVariables>;

/**
 * __useAddReviewMutation__
 *
 * To run a mutation, you first call `useAddReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addReviewMutation, { data, loading, error }] = useAddReviewMutation({
 *   variables: {
 *      shoesId: // value for 'shoesId'
 *      itemId: // value for 'itemId'
 *      reviewId: // value for 'reviewId'
 *      score: // value for 'score'
 *      title: // value for 'title'
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useAddReviewMutation(baseOptions?: Apollo.MutationHookOptions<AddReviewMutation, AddReviewMutationVariables>) {
        return Apollo.useMutation<AddReviewMutation, AddReviewMutationVariables>(AddReviewDocument, baseOptions);
      }
export type AddReviewMutationHookResult = ReturnType<typeof useAddReviewMutation>;
export type AddReviewMutationResult = Apollo.MutationResult<AddReviewMutation>;
export type AddReviewMutationOptions = Apollo.BaseMutationOptions<AddReviewMutation, AddReviewMutationVariables>;
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
export const AddToNewsletterDocument = gql`
    mutation AddToNewsletter($email: String!) {
  addToNewsletter(email: $email)
}
    `;
export type AddToNewsletterMutationFn = Apollo.MutationFunction<AddToNewsletterMutation, AddToNewsletterMutationVariables>;

/**
 * __useAddToNewsletterMutation__
 *
 * To run a mutation, you first call `useAddToNewsletterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToNewsletterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToNewsletterMutation, { data, loading, error }] = useAddToNewsletterMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useAddToNewsletterMutation(baseOptions?: Apollo.MutationHookOptions<AddToNewsletterMutation, AddToNewsletterMutationVariables>) {
        return Apollo.useMutation<AddToNewsletterMutation, AddToNewsletterMutationVariables>(AddToNewsletterDocument, baseOptions);
      }
export type AddToNewsletterMutationHookResult = ReturnType<typeof useAddToNewsletterMutation>;
export type AddToNewsletterMutationResult = Apollo.MutationResult<AddToNewsletterMutation>;
export type AddToNewsletterMutationOptions = Apollo.BaseMutationOptions<AddToNewsletterMutation, AddToNewsletterMutationVariables>;
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
export const IncrementCountViewDocument = gql`
    mutation IncrementCountView($shoeId: String!) {
  incrementCountView(shoeId: $shoeId)
}
    `;
export type IncrementCountViewMutationFn = Apollo.MutationFunction<IncrementCountViewMutation, IncrementCountViewMutationVariables>;

/**
 * __useIncrementCountViewMutation__
 *
 * To run a mutation, you first call `useIncrementCountViewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIncrementCountViewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [incrementCountViewMutation, { data, loading, error }] = useIncrementCountViewMutation({
 *   variables: {
 *      shoeId: // value for 'shoeId'
 *   },
 * });
 */
export function useIncrementCountViewMutation(baseOptions?: Apollo.MutationHookOptions<IncrementCountViewMutation, IncrementCountViewMutationVariables>) {
        return Apollo.useMutation<IncrementCountViewMutation, IncrementCountViewMutationVariables>(IncrementCountViewDocument, baseOptions);
      }
export type IncrementCountViewMutationHookResult = ReturnType<typeof useIncrementCountViewMutation>;
export type IncrementCountViewMutationResult = Apollo.MutationResult<IncrementCountViewMutation>;
export type IncrementCountViewMutationOptions = Apollo.BaseMutationOptions<IncrementCountViewMutation, IncrementCountViewMutationVariables>;
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
export const RefundOrderDocument = gql`
    mutation RefundOrder($orderId: String!, $updated: [String!]!, $total: Float!) {
  refundOrder(orderId: $orderId, updated: $updated, total: $total)
}
    `;
export type RefundOrderMutationFn = Apollo.MutationFunction<RefundOrderMutation, RefundOrderMutationVariables>;

/**
 * __useRefundOrderMutation__
 *
 * To run a mutation, you first call `useRefundOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefundOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refundOrderMutation, { data, loading, error }] = useRefundOrderMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *      updated: // value for 'updated'
 *      total: // value for 'total'
 *   },
 * });
 */
export function useRefundOrderMutation(baseOptions?: Apollo.MutationHookOptions<RefundOrderMutation, RefundOrderMutationVariables>) {
        return Apollo.useMutation<RefundOrderMutation, RefundOrderMutationVariables>(RefundOrderDocument, baseOptions);
      }
export type RefundOrderMutationHookResult = ReturnType<typeof useRefundOrderMutation>;
export type RefundOrderMutationResult = Apollo.MutationResult<RefundOrderMutation>;
export type RefundOrderMutationOptions = Apollo.BaseMutationOptions<RefundOrderMutation, RefundOrderMutationVariables>;
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
    mutation RemoveCartItem($itemId: String!, $basketId: String!, $quantity: Float!) {
  removeCartItem(itemId: $itemId, basketId: $basketId, quantity: $quantity)
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
 *      quantity: // value for 'quantity'
 *   },
 * });
 */
export function useRemoveCartItemMutation(baseOptions?: Apollo.MutationHookOptions<RemoveCartItemMutation, RemoveCartItemMutationVariables>) {
        return Apollo.useMutation<RemoveCartItemMutation, RemoveCartItemMutationVariables>(RemoveCartItemDocument, baseOptions);
      }
export type RemoveCartItemMutationHookResult = ReturnType<typeof useRemoveCartItemMutation>;
export type RemoveCartItemMutationResult = Apollo.MutationResult<RemoveCartItemMutation>;
export type RemoveCartItemMutationOptions = Apollo.BaseMutationOptions<RemoveCartItemMutation, RemoveCartItemMutationVariables>;
export const UpdateArticleDocument = gql`
    mutation UpdateArticle($title: String!, $description: String, $image_url: String, $tags: String!, $source: [String!], $social: [String!], $article: String, $is_published: Boolean, $image_back: String, $blogId: String!) {
  updateArticle(
    blogId: $blogId
    blog: {title: $title, description: $description, image_url: $image_url, tags: $tags, source: $source, social: $social, article: $article, is_published: $is_published, image_back: $image_back}
  ) {
    ...ArticleFragment
  }
}
    ${ArticleFragmentFragmentDoc}`;
export type UpdateArticleMutationFn = Apollo.MutationFunction<UpdateArticleMutation, UpdateArticleMutationVariables>;

/**
 * __useUpdateArticleMutation__
 *
 * To run a mutation, you first call `useUpdateArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateArticleMutation, { data, loading, error }] = useUpdateArticleMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      image_url: // value for 'image_url'
 *      tags: // value for 'tags'
 *      source: // value for 'source'
 *      social: // value for 'social'
 *      article: // value for 'article'
 *      is_published: // value for 'is_published'
 *      image_back: // value for 'image_back'
 *      blogId: // value for 'blogId'
 *   },
 * });
 */
export function useUpdateArticleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateArticleMutation, UpdateArticleMutationVariables>) {
        return Apollo.useMutation<UpdateArticleMutation, UpdateArticleMutationVariables>(UpdateArticleDocument, baseOptions);
      }
export type UpdateArticleMutationHookResult = ReturnType<typeof useUpdateArticleMutation>;
export type UpdateArticleMutationResult = Apollo.MutationResult<UpdateArticleMutation>;
export type UpdateArticleMutationOptions = Apollo.BaseMutationOptions<UpdateArticleMutation, UpdateArticleMutationVariables>;
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
export const GetCartItemsDocument = gql`
    query GetCartItems {
  getCartItems {
    _id
    comments {
      _id
      score
      comment
      title
    }
    variant {
      _id
      title
      shoes {
        _id
        title
        vendor
        images {
          src
        }
      }
    }
  }
}
    `;

/**
 * __useGetCartItemsQuery__
 *
 * To run a query within a React component, call `useGetCartItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCartItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCartItemsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCartItemsQuery(baseOptions?: Apollo.QueryHookOptions<GetCartItemsQuery, GetCartItemsQueryVariables>) {
        return Apollo.useQuery<GetCartItemsQuery, GetCartItemsQueryVariables>(GetCartItemsDocument, baseOptions);
      }
export function useGetCartItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCartItemsQuery, GetCartItemsQueryVariables>) {
          return Apollo.useLazyQuery<GetCartItemsQuery, GetCartItemsQueryVariables>(GetCartItemsDocument, baseOptions);
        }
export type GetCartItemsQueryHookResult = ReturnType<typeof useGetCartItemsQuery>;
export type GetCartItemsLazyQueryHookResult = ReturnType<typeof useGetCartItemsLazyQuery>;
export type GetCartItemsQueryResult = Apollo.QueryResult<GetCartItemsQuery, GetCartItemsQueryVariables>;
export const GetClosestArticlesDocument = gql`
    query GetClosestArticles($tags: String!, $title: String!) {
  getClosestArticles(tags: $tags, title: $title) {
    _id
    title
    image_url
    createdAt
  }
}
    `;

/**
 * __useGetClosestArticlesQuery__
 *
 * To run a query within a React component, call `useGetClosestArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClosestArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClosestArticlesQuery({
 *   variables: {
 *      tags: // value for 'tags'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useGetClosestArticlesQuery(baseOptions: Apollo.QueryHookOptions<GetClosestArticlesQuery, GetClosestArticlesQueryVariables>) {
        return Apollo.useQuery<GetClosestArticlesQuery, GetClosestArticlesQueryVariables>(GetClosestArticlesDocument, baseOptions);
      }
export function useGetClosestArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetClosestArticlesQuery, GetClosestArticlesQueryVariables>) {
          return Apollo.useLazyQuery<GetClosestArticlesQuery, GetClosestArticlesQueryVariables>(GetClosestArticlesDocument, baseOptions);
        }
export type GetClosestArticlesQueryHookResult = ReturnType<typeof useGetClosestArticlesQuery>;
export type GetClosestArticlesLazyQueryHookResult = ReturnType<typeof useGetClosestArticlesLazyQuery>;
export type GetClosestArticlesQueryResult = Apollo.QueryResult<GetClosestArticlesQuery, GetClosestArticlesQueryVariables>;
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
export const GetMinShoesDocument = gql`
    query GetMinShoes($shoesId: ObjectId!) {
  getSingleShoe(shoesId: $shoesId) {
    ...ShoesBrowseFragment
    images {
      ...ImageFragment
    }
  }
}
    ${ShoesBrowseFragmentFragmentDoc}
${ImageFragmentFragmentDoc}`;

/**
 * __useGetMinShoesQuery__
 *
 * To run a query within a React component, call `useGetMinShoesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMinShoesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMinShoesQuery({
 *   variables: {
 *      shoesId: // value for 'shoesId'
 *   },
 * });
 */
export function useGetMinShoesQuery(baseOptions: Apollo.QueryHookOptions<GetMinShoesQuery, GetMinShoesQueryVariables>) {
        return Apollo.useQuery<GetMinShoesQuery, GetMinShoesQueryVariables>(GetMinShoesDocument, baseOptions);
      }
export function useGetMinShoesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMinShoesQuery, GetMinShoesQueryVariables>) {
          return Apollo.useLazyQuery<GetMinShoesQuery, GetMinShoesQueryVariables>(GetMinShoesDocument, baseOptions);
        }
export type GetMinShoesQueryHookResult = ReturnType<typeof useGetMinShoesQuery>;
export type GetMinShoesLazyQueryHookResult = ReturnType<typeof useGetMinShoesLazyQuery>;
export type GetMinShoesQueryResult = Apollo.QueryResult<GetMinShoesQuery, GetMinShoesQueryVariables>;
export const GetOrderDocument = gql`
    query GetOrder($orderId: String!) {
  getOrder(orderId: $orderId) {
    _id
    total
    tracking
    createdAt
    timeline
    status
    last_four
    payment_method
    adress {
      name
      line1
      line2
      phone
      email
      city
      postal_code
      country
      delivery
    }
    user {
      email
    }
    products {
      _id
      quantity
      variant {
        _id
        title
        price
        shoes {
          _id
          vendor
          title
          images {
            src
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetOrderQuery__
 *
 * To run a query within a React component, call `useGetOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderQuery({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useGetOrderQuery(baseOptions: Apollo.QueryHookOptions<GetOrderQuery, GetOrderQueryVariables>) {
        return Apollo.useQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, baseOptions);
      }
export function useGetOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrderQuery, GetOrderQueryVariables>) {
          return Apollo.useLazyQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, baseOptions);
        }
export type GetOrderQueryHookResult = ReturnType<typeof useGetOrderQuery>;
export type GetOrderLazyQueryHookResult = ReturnType<typeof useGetOrderLazyQuery>;
export type GetOrderQueryResult = Apollo.QueryResult<GetOrderQuery, GetOrderQueryVariables>;
export const GetOrdersDocument = gql`
    query GetOrders {
  getOrders {
    _id
    total
    tracking
    createdAt
    status
    adress {
      name
      line1
      line2
      phone
      email
      city
      postal_code
      country
    }
    user {
      email
    }
    products {
      _id
      quantity
      variant {
        title
        shoes {
          _id
          title
          vendor
          images {
            src
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetOrdersQuery__
 *
 * To run a query within a React component, call `useGetOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOrdersQuery(baseOptions?: Apollo.QueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
        return Apollo.useQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, baseOptions);
      }
export function useGetOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
          return Apollo.useLazyQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, baseOptions);
        }
export type GetOrdersQueryHookResult = ReturnType<typeof useGetOrdersQuery>;
export type GetOrdersLazyQueryHookResult = ReturnType<typeof useGetOrdersLazyQuery>;
export type GetOrdersQueryResult = Apollo.QueryResult<GetOrdersQuery, GetOrdersQueryVariables>;
export const GetPurchasesDocument = gql`
    query GetPurchases {
  getPurchases {
    _id
    comment {
      _id
      score
      comment
      title
    }
    product {
      _id
      title
      shoes {
        _id
        title
        vendor
        images {
          src
        }
      }
    }
  }
}
    `;

/**
 * __useGetPurchasesQuery__
 *
 * To run a query within a React component, call `useGetPurchasesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPurchasesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPurchasesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPurchasesQuery(baseOptions?: Apollo.QueryHookOptions<GetPurchasesQuery, GetPurchasesQueryVariables>) {
        return Apollo.useQuery<GetPurchasesQuery, GetPurchasesQueryVariables>(GetPurchasesDocument, baseOptions);
      }
export function useGetPurchasesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPurchasesQuery, GetPurchasesQueryVariables>) {
          return Apollo.useLazyQuery<GetPurchasesQuery, GetPurchasesQueryVariables>(GetPurchasesDocument, baseOptions);
        }
export type GetPurchasesQueryHookResult = ReturnType<typeof useGetPurchasesQuery>;
export type GetPurchasesLazyQueryHookResult = ReturnType<typeof useGetPurchasesLazyQuery>;
export type GetPurchasesQueryResult = Apollo.QueryResult<GetPurchasesQuery, GetPurchasesQueryVariables>;
export const GetReviewDocument = gql`
    query GetReview($shoesId: String!) {
  getReview(shoesId: $shoesId) {
    _id
    title
    comment
    score
  }
}
    `;

/**
 * __useGetReviewQuery__
 *
 * To run a query within a React component, call `useGetReviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReviewQuery({
 *   variables: {
 *      shoesId: // value for 'shoesId'
 *   },
 * });
 */
export function useGetReviewQuery(baseOptions: Apollo.QueryHookOptions<GetReviewQuery, GetReviewQueryVariables>) {
        return Apollo.useQuery<GetReviewQuery, GetReviewQueryVariables>(GetReviewDocument, baseOptions);
      }
export function useGetReviewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReviewQuery, GetReviewQueryVariables>) {
          return Apollo.useLazyQuery<GetReviewQuery, GetReviewQueryVariables>(GetReviewDocument, baseOptions);
        }
export type GetReviewQueryHookResult = ReturnType<typeof useGetReviewQuery>;
export type GetReviewLazyQueryHookResult = ReturnType<typeof useGetReviewLazyQuery>;
export type GetReviewQueryResult = Apollo.QueryResult<GetReviewQuery, GetReviewQueryVariables>;
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
    comments {
      ...CommentsFragment
    }
  }
}
    ${ArticleFragmentFragmentDoc}
${CommentsFragmentFragmentDoc}`;

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
    comments {
      ...CommentsFragment
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
${VariantFragmentFragmentDoc}
${CommentsFragmentFragmentDoc}`;

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
    items
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