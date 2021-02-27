import { COOKIE_NAME, __prod__ } from "../../constant/constant";
import express from "express";
import * as path from "path";
import { ApolloServer } from "apollo-server-express";
import {
  createTestClient,
  ApolloServerTestClient,
} from "apollo-server-testing";
import { buildSchema } from "type-graphql";
import { ObjectId } from "mongodb";
import { ObjectIdScalar } from "../../object-id.scalar";
import { TypegooseMiddleware } from "../../middlewares/typegoose-middleware";
import { Resolvers } from "../../resolvers/index";
import session from "express-session";
import cors from "cors";
import { createUserLoader } from "../../helpers/createUserLoader";
require("dotenv").config();

export default async function testServer(
  userId: any
): Promise<ApolloServerTestClient> {
  try {
    const app = express();

    app.use(
      cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
      })
    );

    app.use(
      session({
        name: COOKIE_NAME,
        cookie: {
          maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
          httpOnly: true,
          sameSite: "lax", // csrf
          //secure: __prod__, // cookie only works in https
          domain: __prod__ ? ".codeponder.com" : undefined,
        },
        saveUninitialized: false,
        secret: "zeaqfhsqghqskg", //process.env.SESSION_SECRET,
        resave: false,
      })
    );

    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [...Resolvers],
        emitSchemaFile: path.resolve(__dirname, "schema.gql"),
        globalMiddlewares: [TypegooseMiddleware],
        scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
        validate: false,
      }),
      context: ({ res }): any => ({
        req: {
          session: {
            userId: userId,
          },
        },
        res,
        userLoader: createUserLoader(),
      }),
    });

    const { query, mutate, ...others } = createTestClient(apolloServer as any);
    return { query, mutate, ...others };
  } catch (err) {
    throw err;
  }
}
