// TODO: Finished login and register

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

const LoginForm = () => {
  // Define graphql mutation
  const [loginMutation, { data: loginResult, loading, error: loginError }] =
    useLoginMutation();
  // Router
  const router = useRouter();
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
    });
    router.push("/");
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
    if (loginResult?.loginUser.errors) {
      for (const error of loginResult.loginUser.errors) {
        console.error(`Error: ${error.message}\nField: ${error.field}`);
      }
    }
    console.log(loginResult?.loginUser.user);
  }, [loginError, loginResult]);
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
        <Button type="submit">
          {loading ? <Loader className="animate-spin" /> : <span>Log in</span>}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
