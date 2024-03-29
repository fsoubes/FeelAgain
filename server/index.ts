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
import passport from "passport";
import connectRedis from "connect-redis";
import { MyContext } from "./type";
import mongoose from "mongoose";
import cors from "cors";
import { Loader } from "./loaders/index";
// import { seedDataBase } from "./helpers/seedDatabase";
import { User } from "entities/User";
require("dotenv").config();
import { authRoutes } from "./routes/authRoutes";

// Constant

const main = async () => {
  try {
    let defaultUser: User;
    // Create Mongoose connection

    await mongoose.connect(
      __prod__
        ? (process.env.DATABASE_URL as string)
        : `mongodb://localhost:27017/feelagain`,
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
      /* await mongoose.connection.db.dropDatabase();
      defaultUser = await seedDataBase(); */
      // await mongoose.get("autoIndex");
      console.log("started! ");
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
          domain: __prod__ ? ".feelagain.fr" : undefined,
        },
        saveUninitialized: false, // Try set cookie to session
        secret: process.env.SESSION_SECRET as string,
        resave: false,
      })
    );

    app.use(passport.initialize());

    authRoutes(app);

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
        redis,
        ...Loader,
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
