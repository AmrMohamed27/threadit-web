"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ResetPasswordSchema from "@/schema/ResetPasswordSchema";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputField from "./InputField";
import {
  useLoginMutation,
  useResetPasswordMutation,
} from "@/generated/graphql";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { ResetPasswordErrorType } from "../../types";

interface Props {
  token: string;
}

const ResetPasswordForm = ({ token }: Props) => {
  // Define graphql mutations

  //   Reset Password Mutation
  const [
    resetPasswordMutation,
    {
      data: resetPasswordResult,
      loading: resetPasswordLoading,
      error: resetPasswordError,
    },
  ] = useResetPasswordMutation();
  //   Login Mutation
  const [
    loginMutation,
    { data: loginResult, loading: loginLoading, error: loginError },
  ] = useLoginMutation();
  // Router
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof ResetPasswordSchema>) {
    const { email, newPassword } = values;
    await resetPasswordMutation({
      variables: {
        options: {
          email,
          newPassword,
          token,
        },
      },
    });
    await loginMutation({
      variables: {
        userData: {
          email,
          password: newPassword,
        },
      },
      refetchQueries: ["Me"],
    });
  }
  // Show password state
  const [showPassword, setShowPassword] = useState(false);

  const handleToggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    if (loginError) {
      console.error(loginError);
    }
    if (resetPasswordError) {
      console.error(resetPasswordError);
    }
    if (loginResult?.loginUser.errors) {
      for (const error of loginResult.loginUser.errors) {
        console.error(error);
      }
    }
    if (resetPasswordResult?.resetPassword.errors) {
      for (const error of resetPasswordResult.resetPassword.errors) {
        form.setError(error.field as ResetPasswordErrorType, {
          message: error.message,
        });
      }
    }
    if (
      resetPasswordResult?.resetPassword.success &&
      loginResult?.loginUser.user
    ) {
      // Redirect to home page
      router.push("/");
      console.log(loginResult?.loginUser.user);
    }
  }, [
    loginError,
    loginResult,
    router,
    form,
    resetPasswordError,
    resetPasswordResult,
  ]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Email */}
        <InputField
          control={form.control}
          name="email"
          label="Email"
          placeholder="example@email.com"
        />
        {/* New Password */}
        <InputField
          control={form.control}
          name="newPassword"
          label="New Password"
          type="password"
          placeholder="●●●●●●"
          showPassword={showPassword}
          handleToggleShowPassword={handleToggleShowPassword}
        />
        {/* Confirm New Password */}
        <InputField
          control={form.control}
          name="confirmNewPassword"
          label="Confirm New Password"
          type="password"
          placeholder="●●●●●●"
          showPassword={showPassword}
          handleToggleShowPassword={handleToggleShowPassword}
        />
        <Button type="submit">
          {loginLoading || resetPasswordLoading ? (
            <Loader className="animate-spin" />
          ) : (
            <span>Log in</span>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
