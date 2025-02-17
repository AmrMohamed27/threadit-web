// TODO: Redirect if token is not valid.
// TODO: Add Confirm User workflow.

import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import { redirect } from "next/navigation";
import React from "react";
import { env } from "@/env";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { CheckTokenDocument, CheckTokenQuery } from "@/generated/graphql";

const ResetPassword = async ({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const token = (await params).token;
  const email = (await searchParams).email;
  if (!email || Array.isArray(email)) {
    console.log("Email is not valid");
    redirect("/login");
  }
  const apolloClient = new ApolloClient({
    uri: `${env.GRAPHQL_API}`,
    cache: new InMemoryCache(),
    credentials: "include",
    ssrMode: true,
  });
  const { data } = await apolloClient.query<CheckTokenQuery>({
    query: CheckTokenDocument,
    variables: {
      options: {
        email,
        token,
      },
    },
  });
  if (!data.checkToken.success) {
    redirect("/login");
  }
  return (
    <div className="flex flex-col gap-8 mx-auto py-6 min-h-screen container">
      <ResetPasswordForm token={token} email={email}></ResetPasswordForm>
    </div>
  );
};

export default ResetPassword;
