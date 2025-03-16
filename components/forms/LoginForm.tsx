"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import LoginSchema from "@/schema/LoginSchema";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputField from "./InputField";
import { useLoginMutation } from "@/generated/graphql";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { LoginErrorType } from "../../types";
import { useCurrentUser } from "@/hooks/use-current-user";

const LoginForm = () => {
  // Define graphql mutation
  const [loginMutation, { loading, error: loginError }] = useLoginMutation({
    onCompleted: async (data) => {
      if (data?.loginUser.errors) {
        for (const error of data.loginUser.errors) {
          form.setError(error.field as LoginErrorType, {
            message: error.message,
          });
        }
      }
      if (data?.loginUser.user && data.loginUser.token) {
        localStorage.setItem("auth_token", data.loginUser.token);
        await refetch();
        // Redirect to home page
        router.push("/");
      }
    },
  });
  // Router
  const router = useRouter();
  // Refetch query for current user
  const { refetch } = useCurrentUser();
  // 1. Define your form.
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    const { email, password } = values;
    await loginMutation({
      variables: {
        userData: {
          email,
          password,
        },
      },
      refetchQueries: "all",
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
  }, [loginError]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        {/* Email */}
        <InputField
          control={form.control}
          name="email"
          label="Email"
          placeholder="example@email.com"
        />
        {/* Password */}
        <InputField
          control={form.control}
          name="password"
          label="Password"
          type="password"
          placeholder="●●●●●●"
          showPassword={showPassword}
          handleToggleShowPassword={handleToggleShowPassword}
        />
        <Button type="submit" variant={"red"}>
          {loading ? <Loader className="animate-spin" /> : <span>Log in</span>}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
