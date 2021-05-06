import { CommentResolver } from "./comment";
import { OrderResolver } from "./order";
import { ShoesResolver } from "./shoes";
import { UserResolver } from "./user";
import { BlogResolver } from "./blog";
import { AddResolver } from "./add";
import { BasketResolver } from "./basket";
import { CartItemResolver } from "./cartitem";
import { VariantResolver } from "./variant";

export const Resolvers = [
  UserResolver,
  BlogResolver,
  AddResolver,
  ShoesResolver,
  BasketResolver,
  CartItemResolver,
  VariantResolver,
  OrderResolver,
  CommentResolver,
] as const;
