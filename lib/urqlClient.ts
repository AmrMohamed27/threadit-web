import { env } from "@/env";
import { createClient, cacheExchange, fetchExchange } from "@urql/core";

export const urqlClient = createClient({
  url: `${env.NEXT_PUBLIC_API_URL}/graphql`, // Update with your local GraphQL API URL
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: {
    credentials: "include", // Useful if your API requires authentication
  },
});
