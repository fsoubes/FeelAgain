import { ShoesResolver } from "./shoes";
import { UserResolver } from "./user";
import { BlogResolver } from "./blog";
import { AddResolver } from "./add";

export const Resolvers = [
  UserResolver,
  BlogResolver,
  AddResolver,
  ShoesResolver,
] as const;
