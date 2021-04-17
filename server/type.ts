import { createImageLoader } from "./loaders/createImageLoader";
import { createVariantLoaders } from "./loaders/createVariantLoaders";
import { createUserLoader } from "./loaders/createUserLoader";
import { createCartItemLoader } from "./loaders/createCartItemLoaders";
import { Redis } from "ioredis";
import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import { User } from "./entities/User";
import { createVariantLoader } from "loaders/createVariantLoader";
import { createShoesLoader } from "loaders/createShoesLoader";

export type MyContext = {
  user: User;
  req: Request & {
    session: Session &
      Partial<SessionData> & { userId?: string } & { isAdmin?: Boolean };
  };
  res: Response;
  redis: Redis;
  userLoader: ReturnType<typeof createUserLoader>;
  variantLoaders: ReturnType<typeof createVariantLoaders>;
  variantLoader: ReturnType<typeof createVariantLoader>;
  imageLoader: ReturnType<typeof createImageLoader>;
  itemLoader: ReturnType<typeof createCartItemLoader>;
  shoesLoader: ReturnType<typeof createShoesLoader>;
};
