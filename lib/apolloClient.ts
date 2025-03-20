import { env } from "@/env";
import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

// Safe localStorage access that works with SSR
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("auth_token");
  }
  return null;
};

// HTTP link for queries and mutations
const httpLink = new HttpLink({
  uri: `${env.NEXT_PUBLIC_API_URL}/graphql`,
});

// Middleware to attach JWT token dynamically
const authLink = setContext((_, { headers }) => {
  const token = getToken();
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Error handling: Auto-remove invalid tokens
const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.extensions?.code === "UNAUTHENTICATED") {
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth_token");
          window.location.href = "/login"; // Redirect to login
        }
      }
    }
  }
});

// Create the Apollo client
export const createApolloClient = () => {
  // WebSocket link for subscriptions - created during client initialization
  const wsLink =
    typeof window !== "undefined"
      ? new GraphQLWsLink(
          createClient({
            url: `${env.NEXT_PUBLIC_API_URL.replace(
              /^https?/,
              env.NEXT_PUBLIC_NODE_ENV === "development" ? "ws" : "wss"
            )}/graphql`,
            connectionParams: () => {
              //   Get token directly from localStorage at connection time, it will be available because the connection params function
              //  only executes when the connection is established and we are already on the client
              const token = getToken();
              return token ? { Authorization: `Bearer ${token}` } : {};
            },
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
          authLink.concat(errorLink).concat(httpLink) // Apply auth & error handling
        )
      : authLink.concat(errorLink).concat(httpLink);

  // Create Apollo Client
  return new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });
};

// Export a basic client for SSR/initial rendering
export const apolloClient = new ApolloClient({
  link: authLink.concat(errorLink).concat(httpLink),
  cache: new InMemoryCache(),
  ssrMode: typeof window === "undefined",
});
