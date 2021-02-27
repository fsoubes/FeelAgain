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
const ArticleFragment = apollo_server_express_1.gql `
  {
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
`;
const ADD_ARTICLE = apollo_server_express_1.gql `
  mutation AddArticle(
    $title: String!
    $description: String
    $image_url: String
    $tags: [String!]
    $source: [String!]
    $social: [String!]
    $article: String
    $isPublished: Boolean
  ) {
    addArticle(
      blog: {
        title: $title
        description: $description
        image_url: $image_url
        tags: $tags
        source: $source
        social: $social
        article: $article
        isPublished: $isPublished
      }
    ) {
        ...${ArticleFragment}
    }
  }
`;
const GET_ARTICLE = apollo_server_express_1.gql `
  query getSingleArticle($articleId: ObjectId!) {
    getSingleArticle(articleId: $articleId) {
      ...${ArticleFragment}
    }
  }
`;
const GET_ARTICLES = apollo_server_express_1.gql `
  query GetArticles($limit: Float!, $cursor: String) {
    getArticles(limit: $limit, cursor: $cursor) {
      edges {
        ...${ArticleFragment}
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
describe("Add Article and request it", () => {
    test("Add and Get Article", () => __awaiter(void 0, void 0, void 0, function* () {
        yield testServer_1.default("");
        const defaultUser = yield mongoose_1.default.connection.models.User.findOne({
            email: "bob@bob.fr",
        });
        console.log("Add Mock User with cookie");
        const { query, mutate } = yield testServer_1.default(defaultUser._id.toString());
        const { data } = yield mutate({
            mutation: ADD_ARTICLE,
            variables: {
                title: "NextJs",
                description: "Nextjs is good",
                image_url: "http://dummyimage.com/189x221.bmp/dddddd/000000",
                article: "Mixed hearing loss, unilateral with Apollo and Graphql",
                isPublished: true,
                author: defaultUser._id,
                tags: ["Apollo", "NextJs", "GraphQL"],
                source: ["http://trustme.com", "http://someonetoldme.com"],
                social: ["http://facebook.com", "http://twitter.com"],
            },
        });
        console.log("Test for adding an article");
        expect(data).toMatchSnapshot();
        const lastArticle = yield mongoose_1.default.connection.models.Blog.findOne({
            title: "NextJs",
        });
        const getArticle = yield query({
            query: GET_ARTICLE,
            variables: { articleId: lastArticle._id },
        });
        console.log("Test for fetching the new article");
        expect(getArticle).toMatchSnapshot();
    }));
});
describe("Test pagination for articles", () => {
    test("Pagination Article", () => __awaiter(void 0, void 0, void 0, function* () {
        const { query } = yield testServer_1.default("");
        const { data } = yield query({
            query: GET_ARTICLES,
            variables: {
                limit: 46,
                cursor: null,
            },
        });
        console.log("Test pagination");
        expect(data.getArticles).toMatchSnapshot();
        const getArticleswCursor = yield query({
            query: GET_ARTICLES,
            variables: {
                limit: 5,
                cursor: data.getArticles.pageInfo.endCursor,
            },
        });
        console.log("Test pagination");
        expect(getArticleswCursor).toMatchSnapshot();
    }));
});
//# sourceMappingURL=articles.test.js.map