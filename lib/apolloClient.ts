import { env } from "@/env";
import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

// Function to get WebSocket auth token
const getWebSocketToken = async (): Promise<string | null> => {
  try {
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/ws-auth`, {
      credentials: "include",
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

// Create the Apollo client with token
export const createApolloClient = async () => {
  // Get WebSocket auth token
  const wsToken = await getWebSocketToken();

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
            connectionParams: {
              authToken: wsToken,
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
          httpLink
        )
      : httpLink;

  // Create Apollo Client
  return new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
    credentials: "include",
  });
};

// Export a basic client for SSR/initial rendering
export const apolloClient = new ApolloClient({
  uri: `${env.NEXT_PUBLIC_API_URL}/graphql`,
  cache: new InMemoryCache(),
});
