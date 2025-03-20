import { env } from "@/env";
import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

// Function to get JWT from localStorage
const getToken = () => localStorage.getItem("auth_token");

// Function to get WebSocket auth token dynamically
const getWebSocketToken = async (): Promise<string | null> => {
  try {
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/ws-auth`, {
      headers: {
        Authorization: `Bearer ${getToken()}`, // Use latest JWT
      },
      mode: "no-cors",
    });

    if (response.ok) {
      const data = await response.json();
      return data.token;
    }
  } catch (err) {
    console.error("Failed to get WebSocket auth token:", err);
  }
  return null;
};

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
        localStorage.removeItem("auth_token");
        window.location.href = "/login"; // Redirect to login
      }
    }
  }
});

// HTTP link for queries and mutations
const httpLink = new HttpLink({
  uri: `${env.NEXT_PUBLIC_API_URL}/graphql`,
});

// Create the Apollo client with token
export const createApolloClient = async () => {
  // WebSocket link for subscriptions
  const wsLink =
    typeof window !== "undefined"
      ? new GraphQLWsLink(
          createClient({
            url: `${env.NEXT_PUBLIC_API_URL.replace(
              /^https?/,
              env.NEXT_PUBLIC_NODE_ENV === "development" ? "ws" : "wss"
            )}/graphql`,
            connectionParams: async () => ({
              authToken: await getWebSocketToken(), // Ensure fresh token
            }),
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
});
