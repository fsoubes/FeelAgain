import { gql } from "apollo-server-express";
import testServer from "../utils/testServer";
import mongoose from "mongoose";
global.fetch = require("node-fetch");

const ArticleFragment = gql`
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

const ADD_ARTICLE = gql`
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

const GET_ARTICLE = gql`
  query getSingleArticle($articleId: ObjectId!) {
    getSingleArticle(articleId: $articleId) {
      ...${ArticleFragment}
    }
  }
`;

const GET_ARTICLES = gql`
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
  test("Add and Get Article", async () => {
    // ACT
    // use the test server to create a query function

    await testServer("");

    const defaultUser = await mongoose.connection.models.User.findOne({
      email: "bob@bob.fr",
    });

    console.log("Add Mock User with cookie");
    const { query, mutate } = await testServer(defaultUser._id.toString());

    const { data } = await mutate({
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

    // ASSERT
    // a notification created from you for yourself is not needed. expect a blank array if you are liking your post
    console.log("Test for adding an article");
    expect(data).toMatchSnapshot();

    const lastArticle = await mongoose.connection.models.Blog.findOne({
      title: "NextJs",
    });

    // fetch series
    const getArticle = await query({
      query: GET_ARTICLE,
      variables: { articleId: lastArticle._id },
    });

    // ASSERT
    // a notification created from you for yourself is not needed. expect a blank array if you are liking your post
    console.log("Test for fetching the new article");
    expect(getArticle).toMatchSnapshot();
  });
});

describe("Test pagination for articles", () => {
  test("Pagination Article", async () => {
    // ACT
    // use the test server to create a query function
    const { query } = await testServer("");

    // fetch series
    const { data } = await query({
      query: GET_ARTICLES,
      variables: {
        limit: 46,
        cursor: null,
      },
    });

    // ASSERT
    // a notification created from you for yourself is not needed. expect a blank array if you are liking your post
    console.log("Test pagination");
    expect(data.getArticles).toMatchSnapshot();

    // fetch series
    const getArticleswCursor = await query({
      query: GET_ARTICLES,
      variables: {
        limit: 5,
        cursor: data.getArticles.pageInfo.endCursor,
      },
    });

    // ASSERT
    // a notification created from you for yourself is not needed. expect a blank array if you are liking your post
    console.log("Test pagination");
    expect(getArticleswCursor).toMatchSnapshot();
  });
});
