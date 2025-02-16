// TODO: Redirect if token is not valid.

import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import React from "react";

const ResetPassword = async ({
  params,
}: {
  params: Promise<{ token: string }>;
}) => {
  const token = (await params).token;
  return (
    <div className="flex flex-col gap-8 mx-auto py-6 min-h-screen container">
      <ResetPasswordForm token={token}></ResetPasswordForm>
    </div>
  );
};

export default ResetPassword;
