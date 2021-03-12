import { createImageLoader } from "./loaders/createImageLoader";
import { createVariantLoader } from "./loaders/createVariantLoader";
import { createUserLoader } from "./loaders/createUserLoader";
import { Redis } from "ioredis";
import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import { User } from "./entities/User";

export type MyContext = {
  user: User;

  req: Request & {
    session: Session &
      Partial<SessionData> & { userId?: string } & { isAdmin?: Boolean };
  };
  res: Response;
  redis: Redis;
  userLoader: ReturnType<typeof createUserLoader>;
  variantLoader: ReturnType<typeof createVariantLoader>;
  imageLoader: ReturnType<typeof createImageLoader>;
};
