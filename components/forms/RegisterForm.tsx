"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useRegisterMutation } from "@/generated/graphql";
import { useCurrentUser } from "@/hooks/use-current-user";
import RegisterSchema from "@/schema/RegisterSchema";
import { ErrorField } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "./InputField";

const RegisterForm = () => {
  // Define graphql mutation
  const [registerMutation, { loading }] = useRegisterMutation();
  // Router
  const router = useRouter();
  // Refetch query for current user
  const { refetch } = useCurrentUser();
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
      onCompleted: async (data) => {
        console.log(data);
        if (data.registerUser.user && data.registerUser.token) {
          localStorage.setItem("auth_token", data.registerUser.token);
          await refetch();
          // Redirect to home page
          router.push("/");
        } else if (data.registerUser.errors) {
          const error = data.registerUser.errors[0];
          // Handle errors returned from resolver
          form.setError(error.field as ErrorField, { message: error.message });
        }
      },
    });
  }
  // Show password state
  const [showPassword, setShowPassword] = useState(false);

  const handleToggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
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
