import { MyContext } from "./../type";
import { MiddlewareFn } from "type-graphql";

export const isAdmin: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (!context.req.session.isAdmin) {
    throw new Error("not authorized");
  }
  return next();
};
