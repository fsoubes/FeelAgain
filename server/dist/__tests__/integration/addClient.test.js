"use strict";
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
const apollo_server_express_1 = require("apollo-server-express");
const testServer_1 = __importDefault(require("../utils/testServer"));
const mongoose_1 = __importDefault(require("mongoose"));
global.fetch = require("node-fetch");
const GET_ARTICLES = apollo_server_express_1.gql `
  query GetArticles($limit: Float!, $cursor: String) {
    getArticles(limit: $limit, cursor: $cursor) {
      edges {
        title
        description
        image_url
        tags
        source
        social
        article
        isPublished
        author {
          nickname
          email
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
const LOGIN = apollo_server_express_1.gql `
  mutation Login($email: String!, $password: String!) {
    login(user: { email: $email, password: $password }) {
      user {
        nickname
        email
      }
      errors {
        field
        message
      }
    }
  }
`;
describe("Testing login mutation and getArticles query with bad logins", () => {
    test("Get Auth with bad logins", () => __awaiter(void 0, void 0, void 0, function* () {
        const { query, mutate } = yield testServer_1.default("");
        const { data } = yield mutate({
            mutation: LOGIN,
            variables: {
                email: "boba@bob.fr",
                password: "bob@bob.fr",
            },
        });
        console.log("Testing Login with bad login");
        expect(data).toMatchSnapshot();
        const getArticles = yield query({
            query: GET_ARTICLES,
            variables: {
                limit: 5,
                cursor: null,
            },
        });
        console.log("Testing Fetching Articles");
        expect(getArticles).toMatchSnapshot();
    }));
});
describe("Testing login mutation and getArticles query with good logins", () => {
    test("Get FieldError with good logins", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { mutate } = yield testServer_1.default("");
            const { data } = yield mutate({
                mutation: LOGIN,
                variables: {
                    email: "bob@bob.fr",
                    password: "bob@bob.fr",
                },
            });
            const defaultUser = yield mongoose_1.default.connection.models.User.findOne({
                email: data.login.user.email,
            });
            console.log("Testing Login with good login");
            expect(data).toMatchSnapshot();
            const { query } = yield testServer_1.default(defaultUser._id.toString());
            const getArticles = yield query({
                query: GET_ARTICLES,
                variables: {
                    limit: 5,
                    cursor: null,
                },
            });
            console.log("Testing Fetching Articles");
            expect(getArticles).toMatchSnapshot();
        }
        catch (err) {
            console.log(err);
        }
    }));
});
//# sourceMappingURL=addClient.test.js.map