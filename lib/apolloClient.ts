import { ApolloClient, InMemoryCache } from "@apollo/client";
// change the schema's uri with our graphql server end point
export const apolloClient = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
