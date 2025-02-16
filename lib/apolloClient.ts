import { env } from "@/env";
import { ApolloClient, InMemoryCache } from "@apollo/client";
// change the schema's uri with our graphql server end point
export const apolloClient = new ApolloClient({
  uri: `${env.NEXT_PUBLIC_API_URL}/graphql`,
  cache: new InMemoryCache(),
  credentials: "include",
});
