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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("../../constant/constant");
const express_1 = __importDefault(require("express"));
const path = __importStar(require("path"));
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_testing_1 = require("apollo-server-testing");
const type_graphql_1 = require("type-graphql");
const mongodb_1 = require("mongodb");
const object_id_scalar_1 = require("../../object-id.scalar");
const typegoose_middleware_1 = require("../../middlewares/typegoose-middleware");
const index_1 = require("../../resolvers/index");
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const createUserLoader_1 = require("../../helpers/createUserLoader");
require("dotenv").config();
function testServer(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const app = express_1.default();
            app.use(cors_1.default({
                origin: process.env.CORS_ORIGIN,
                credentials: true,
            }));
            app.use(express_session_1.default({
                name: constant_1.COOKIE_NAME,
                cookie: {
                    maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
                    httpOnly: true,
                    sameSite: "lax",
                    domain: constant_1.__prod__ ? ".codeponder.com" : undefined,
                },
                saveUninitialized: false,
                secret: "zeaqfhsqghqskg",
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
                context: ({ res }) => ({
                    req: {
                        session: {
                            userId: userId,
                        },
                    },
                    res,
                    userLoader: createUserLoader_1.createUserLoader(),
                }),
            });
            const _a = apollo_server_testing_1.createTestClient(apolloServer), { query, mutate } = _a, others = __rest(_a, ["query", "mutate"]);
            return Object.assign({ query, mutate }, others);
        }
        catch (err) {
            throw err;
        }
    });
}
exports.default = testServer;
//# sourceMappingURL=testServer.js.map