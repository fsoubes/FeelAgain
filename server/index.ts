import { COOKIE_NAME, __prod__ } from "./constant/constant";
import express from "express";
import * as path from "path";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { ObjectId } from "mongodb";
import { ObjectIdScalar } from "./object-id.scalar";
import { TypegooseMiddleware } from "./middlewares/typegoose-middleware";
import { Resolvers } from "./resolvers/index";
import session from "express-session";
import Redis from "ioredis";
import connectRedis from "connect-redis";
import { MyContext } from "./type";
import mongoose from "mongoose";
import cors from "cors";
import { createUserLoader } from "./helpers/createUserLoader";
import { seedDataBase } from "./helpers/seedDatabase";
import { User } from "entities/User";
require("dotenv").config();

// Constant

const main = async () => {
  try {
    let defaultUser: User;
    // Create Mongoose connection

    await mongoose.connect(
      __prod__
        ? (process.env.DATABASE_URL as string)
        : `mongodb://localhost:27017/testpro`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );

    // Clean and seed database w data

    if (__prod__) {
      defaultUser = await mongoose.connection.models.User.findOne({
        email: "bob@bob.fr",
      });
    } else {
      await mongoose.connection.db.dropDatabase();
      defaultUser = await seedDataBase();
    }

    // Configurate app w apollo & express

    const app = express();

    const RedisStore = connectRedis(session);
    const redis = new Redis(process.env.REDIS_URL);
    app.set("trust proxy", 1);
    app.use(
      cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
      })
    );

    app.use(
      session({
        store: new RedisStore({ client: redis, disableTouch: true }),
        name: COOKIE_NAME,
        cookie: {
          maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
          httpOnly: true,
          sameSite: "lax", // csrf
          secure: __prod__, // cookie only works in https
          domain: __prod__ ? ".fsoweb.dev" : undefined,
        },
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET as string,
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
      context: ({ req, res }): MyContext => ({
        req,
        res,
        user: defaultUser,
        userLoader: createUserLoader(),
        redis,
      }),
    });

    apolloServer.applyMiddleware({ app, cors: false });

    app.listen(parseInt(process.env.PORT as string), () => {
      console.log(`server started on ${process.env.PORT as string}`);
    });
  } catch (err) {
    console.log(err);
  }
};

main();
