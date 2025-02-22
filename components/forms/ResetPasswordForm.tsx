"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ResetPasswordSchema from "@/schema/ResetPasswordSchema";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputField from "./InputField";
import { useResetPasswordMutation } from "@/generated/graphql";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { ResetPasswordErrorType } from "../../types";
import { useToast } from "@/hooks/use-toast";

interface Props {
  token: string;
  email: string;
}

const ResetPasswordForm = ({ token, email }: Props) => {
  //   Reset Password Mutation
  const [
    resetPasswordMutation,
    {
      data: resetPasswordResult,
      loading: resetPasswordLoading,
      error: resetPasswordError,
    },
  ] = useResetPasswordMutation();
  // Router
  const router = useRouter();
  //   Toast
  const { toast } = useToast();
  // 1. Define your form.
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof ResetPasswordSchema>) {
    // Destructure values
    const { newPassword } = values;
    // Check if email is defined
    if (!email) {
      toast({
        title: "Email not found",
        description: "Please try again.",
        variant: "destructive",
      });
      router.push("/login");
      return;
    }
    // Perform the reset password mutation
    const result = await resetPasswordMutation({
      variables: {
        options: {
          email,
          newPassword,
          token,
        },
      },
    });
    // Redirect to log in page if reset password is successful
    if (result.data?.resetPassword.success) {
      toast({
        title: "Password Reset Successfully",
        description: "You can log in with your new password.",
      });
      router.push("/login");
    } else if (result.data?.resetPassword.errors) {
      const error = result.data.resetPassword.errors[0];
      toast({
        title: `An error occurred with ${error.field}`,
        description: error.message,
        variant: "destructive",
      });
    }
  }
  // Show password state and toggler
  const [showPassword, setShowPassword] = useState(false);

  const handleToggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  //  Handle mutation errors.
  useEffect(() => {
    if (resetPasswordError) {
      console.error(resetPasswordError);
    }
    if (resetPasswordResult?.resetPassword.errors) {
      for (const error of resetPasswordResult.resetPassword.errors) {
        form.setError(error.field as ResetPasswordErrorType, {
          message: error.message,
        });
      }
    }
  }, [form, resetPasswordError, resetPasswordResult]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        <Button type="submit" variant={"red"}>
          {resetPasswordLoading ? (
            <Loader className="animate-spin" />
          ) : (
            <span>Save</span>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
