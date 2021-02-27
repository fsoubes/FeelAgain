import { PaginationResponse } from "./../generated/graphql";
import { createWithApollo } from "./createWithApollo.js";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";

const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
    headers: {
      cookie:
        (typeof window === "undefined"
          ? ctx?.req?.headers.cookie
          : undefined) || "",
    },
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getArticles: {
              keyArgs: [],
              merge(
                existing: PaginationResponse | undefined,
                incoming: PaginationResponse
              ): PaginationResponse {
                return {
                  ...incoming,
                  edges: [...(existing?.edges || []), ...incoming.edges],
                };
              },
            },
          },
        },
      },
    }),
  });

export const withApollo = createWithApollo(createClient);
