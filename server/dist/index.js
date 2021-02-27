"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("./constant/constant");
const express_1 = __importDefault(require("express"));
const path = __importStar(require("path"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const mongodb_1 = require("mongodb");
const object_id_scalar_1 = require("./object-id.scalar");
const typegoose_middleware_1 = require("./middlewares/typegoose-middleware");
const index_1 = require("./resolvers/index");
const express_session_1 = __importDefault(require("express-session"));
const ioredis_1 = __importDefault(require("ioredis"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const createUserLoader_1 = require("./helpers/createUserLoader");
const seedDatabase_1 = require("./helpers/seedDatabase");
require("dotenv").config();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let defaultUser;
        yield mongoose_1.default.connect(constant_1.__prod__
            ? process.env.DATABASE_URL
            : `mongodb://localhost:27017/testpro`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        if (constant_1.__prod__) {
            defaultUser = yield mongoose_1.default.connection.models.User.findOne({
                email: "bob@bob.fr",
            });
        }
        else {
            yield mongoose_1.default.connection.db.dropDatabase();
            defaultUser = yield seedDatabase_1.seedDataBase();
        }
        const app = express_1.default();
        const RedisStore = connect_redis_1.default(express_session_1.default);
        const redis = new ioredis_1.default(process.env.REDIS_URL);
        app.set("trust proxy", 1);
        app.use(cors_1.default({
            origin: process.env.CORS_ORIGIN,
            credentials: true,
        }));
        app.use(express_session_1.default({
            store: new RedisStore({ client: redis, disableTouch: true }),
            name: constant_1.COOKIE_NAME,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
                httpOnly: true,
                sameSite: "lax",
                secure: constant_1.__prod__,
                domain: constant_1.__prod__ ? ".fsoweb.dev" : undefined,
            },
            saveUninitialized: false,
            secret: process.env.SESSION_SECRET,
            resave: false,
        }));
        const apolloServer = new apollo_server_express_1.ApolloServer({
            schema: yield type_graphql_1.buildSchema({
                resolvers: [...index_1.Resolvers],
                emitSchemaFile: path.resolve(__dirname, "schema.gql"),
                globalMiddlewares: [typegoose_middleware_1.TypegooseMiddleware],
                scalarsMap: [{ type: mongodb_1.ObjectId, scalar: object_id_scalar_1.ObjectIdScalar }],
                validate: false,
            }),
            context: ({ req, res }) => ({
                req,
                res,
                user: defaultUser,
                userLoader: createUserLoader_1.createUserLoader(),
                redis,
            }),
        });
        apolloServer.applyMiddleware({ app, cors: false });
        app.listen(parseInt(process.env.PORT), () => {
            console.log(`server started on ${process.env.PORT}`);
        });
    }
    catch (err) {
        console.log(err);
    }
});
main();
//# sourceMappingURL=index.js.map