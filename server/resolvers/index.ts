import { UserResolver } from "./user";
import { BlogResolver } from "./blog";

export const Resolvers = [UserResolver, BlogResolver] as const;
