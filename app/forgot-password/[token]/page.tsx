import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import React from "react";

const ResetPassword = async ({
  params,
}: {
  params: Promise<{ token: string }>;
}) => {
  const token = (await params).token;
  return (
    <div>
      <ResetPasswordForm token={token}></ResetPasswordForm>
    </div>
  );
};

export default ResetPassword;
