"use server";

import { env } from "@/env";
import { CheckTokenDocument, CheckTokenQuery } from "@/generated/graphql";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: `${env.GRAPHQL_API}`,
  cache: new InMemoryCache(),
  credentials: "include",
  ssrMode: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function checkToken({
  token,
  email,
}: {
  token: string;
  email: string;
}): Promise<boolean> {
  const { data } = await apolloClient.query<CheckTokenQuery>({
    query: CheckTokenDocument,
    variables: {
      options: {
        email,
        token,
      },
    },
  });
  return data.checkToken.success;
}
