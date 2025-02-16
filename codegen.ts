import type { CodegenConfig } from "@graphql-codegen/cli";
import "dotenv/config";
import { env } from "./env";

const config: CodegenConfig = {
  overwrite: true,
  schema: `${env.GRAPHQL_API}`,
  documents: "graphql/**/*.graphql",
  generates: {
    "generated/graphql.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
  },
};

export default config;
