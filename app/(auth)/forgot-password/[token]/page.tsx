import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import { redirect } from "next/navigation";
import React from "react";
import { checkToken } from "@/actions/apollo";

const ResetPassword = async ({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const token = (await params).token;
  const email = (await searchParams).email;
  console.log("Token: ", token);
  console.log("Email: ", email);
  if (!email || Array.isArray(email)) {
    redirect("/login");
  }

  const success = await checkToken({ token, email });
  console.log("Success: ", success);
  if (!success) {
    redirect("/login");
  }
  return (
    <div className="flex flex-col gap-8 mx-auto py-6 min-h-screen container">
      <ResetPasswordForm token={token} email={email}></ResetPasswordForm>
    </div>
  );
};

export default ResetPassword;
