import { env } from "@/env";
import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

// HTTP link for queries and mutations
const httpLink = new HttpLink({
  uri: `${env.NEXT_PUBLIC_API_URL}/graphql`,
  credentials: "include",
});

// WebSocket link for subscriptions
const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url: `${env.NEXT_PUBLIC_API_URL.replace(/^https?/, "ws")}/graphql`,
          connectionParams: {},
        })
      )
    : null;

// Split links based on operation type
const splitLink =
  typeof window !== "undefined" && wsLink != null
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink,
        httpLink
      )
    : httpLink;

// Create Apollo Client
export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  credentials: "include",
});
