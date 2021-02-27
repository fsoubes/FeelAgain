import { gql } from "apollo-server-express";
import testServer from "../utils/testServer";
import mongoose from "mongoose";
global.fetch = require("node-fetch");

const GET_ARTICLES = gql`
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

const LOGIN = gql`
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
  test("Get Auth with bad logins", async () => {
    // ACT
    // use the test server to create a query function
    const { query, mutate } = await testServer("");

    const { data } = await mutate({
      mutation: LOGIN,
      variables: {
        email: "boba@bob.fr",
        password: "bob@bob.fr",
      },
    });

    // ASSERT
    // a notification created from you for yourself is not needed. expect a blank array if you are liking your post
    console.log("Testing Login with bad login");
    expect(data).toMatchSnapshot();

    // fetch series
    const getArticles = await query({
      query: GET_ARTICLES,
      variables: {
        limit: 5,
        cursor: null,
      },
    });

    // ASSERT
    // a notification created from you for yourself is not needed. expect a blank array if you are liking your post
    console.log("Testing Fetching Articles");
    expect(getArticles).toMatchSnapshot();
  });
});

describe("Testing login mutation and getArticles query with good logins", () => {
  test("Get FieldError with good logins", async () => {
    try {
      // ACT
      // use the test server to create a query function
      const { mutate } = await testServer("");

      const { data } = await mutate({
        mutation: LOGIN,
        variables: {
          email: "bob@bob.fr",
          password: "bob@bob.fr",
        },
      });

      const defaultUser = await mongoose.connection.models.User.findOne({
        email: data.login.user.email,
      });

      // ASSERT
      // a notification created from you for yourself is not needed. expect a blank array if you are liking your post
      console.log("Testing Login with good login");
      expect(data).toMatchSnapshot();

      const { query } = await testServer(defaultUser._id.toString());

      // fetch series
      const getArticles = await query({
        query: GET_ARTICLES,
        variables: {
          limit: 5,
          cursor: null,
        },
      });

      // ASSERT
      // a notification created from you for yourself is not needed. expect a blank array if you are liking your post
      console.log("Testing Fetching Articles");
      expect(getArticles).toMatchSnapshot();
    } catch (err) {
      console.log(err);
    }
  });
});
