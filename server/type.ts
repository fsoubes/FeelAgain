import { Redis } from "ioredis";
import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import { User } from "./entities/User";
import { createUserLoader } from "./helpers/createUserLoader";

export type MyContext = {
  user: User;
  req: Request & {
    session: Session & Partial<SessionData> & { userId?: string };
  };
  res: Response;
  redis: Redis;
  userLoader: ReturnType<typeof createUserLoader>;
};
