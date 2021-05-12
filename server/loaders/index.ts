import { createVariantLoaders } from "./createVariantLoaders";
import { createImageLoader } from "./createImageLoader";
import { createUserLoader } from "./createUserLoader";
import { createCartItemLoader } from "./createCartItemLoaders";
import { createVariantLoader } from "./createVariantLoader";
import { createShoesLoader } from "./createShoesLoader";
import { createCommentLoader } from "./createCommentLoader";
import { createCommentsLoader } from "./createCommentsLoader";

export const Loader = {
  userLoader: createUserLoader(),
  variantLoaders: createVariantLoaders(),
  variantLoader: createVariantLoader(),
  imageLoader: createImageLoader(),
  itemLoader: (isCart: boolean) => createCartItemLoader(isCart),
  shoesLoader: createShoesLoader(),
  commentLoader: (currentUser: string) => createCommentLoader(currentUser),
  commentsLoader: createCommentsLoader(),
} as const;
