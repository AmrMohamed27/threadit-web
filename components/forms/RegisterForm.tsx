"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import RegisterSchema from "@/schema/RegisterSchema";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputField from "./InputField";
import { useRegisterMutation } from "@/generated/graphql";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { ErrorField } from "../../types/index";

const RegisterForm = () => {
  // Define graphql mutation
  const [
    registerMutation,
    { data: registerResult, loading, error: registerError },
  ] = useRegisterMutation();
  // Router
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof RegisterSchema>) {
    const { email, name, password } = values;
    await registerMutation({
      variables: {
        userData: {
          email,
          name,
          password,
        },
      },
      refetchQueries: "all",
    });
    // Handle graphql errors
    if (registerError) {
      console.error(registerError);
    }
    // Handle errors returned from resolver
    if (registerResult?.registerUser.errors) {
      form.setError("root", { message: "Invalid credentials" });
    }
  }
  // Show password state
  const [showPassword, setShowPassword] = useState(false);

  const handleToggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    if (registerError) {
      console.error(registerError);
    }
    if (registerResult?.registerUser.errors) {
      for (const error of registerResult.registerUser.errors) {
        form.setError(
          error.field === "name" || "email" || "password"
            ? (error.field as ErrorField)
            : "root",
          { message: error.message }
        );
      }
    }
    if (registerResult?.registerUser.user) {
      // Redirect to home page
      router.push("/");
    }
  }, [registerError, registerResult, form, router]);
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
        {/* Name */}
        <InputField
          control={form.control}
          name="name"
          label="Name"
          placeholder="John Doe"
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
        {/* Confirm Password */}
        <InputField
          control={form.control}
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="●●●●●●"
          showPassword={showPassword}
          handleToggleShowPassword={handleToggleShowPassword}
        />
        <Button type="submit" className="w-full">
          {loading ? (
            <Loader className="animate-spin" />
          ) : (
            <span>Register</span>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
