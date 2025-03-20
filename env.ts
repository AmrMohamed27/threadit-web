import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  server: {
    GRAPHQL_API: z.string(),
    COOKIE_NAME: z.string(),
    UPLOADTHING_TOKEN: z.string(),
    UPLOADTHING_SECRET_KEY: z.string(),
  },
  client: {
    NEXT_PUBLIC_API_URL: z.string(),
    NEXT_PUBLIC_HOME_URL: z.string(),
    NEXT_PUBLIC_SESSION_COOKIE_NAME: z.string(),
    NEXT_PUBLIC_NODE_ENV: z.enum(["development", "production", "test"]),
  },
  runtimeEnv: {
    NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    GRAPHQL_API: process.env.GRAPHQL_API,
    COOKIE_NAME: process.env.COOKIE_NAME,
    NEXT_PUBLIC_HOME_URL: process.env.NEXT_PUBLIC_HOME_URL,
    UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,
    UPLOADTHING_SECRET_KEY: process.env.UPLOADTHING_SECRET_KEY,
    NEXT_PUBLIC_SESSION_COOKIE_NAME:
      process.env.NEXT_PUBLIC_SESSION_COOKIE_NAME,
  },
});
