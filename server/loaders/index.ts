import { createVariantLoader } from "./createVariantLoader";
import { createImageLoader } from "./createImageLoader";
import { createUserLoader } from "./createUserLoader";

export const Loader = {
  userLoader: createUserLoader(),
  variantLoader: createVariantLoader(),
  imageLoader: createImageLoader(),
} as const;
