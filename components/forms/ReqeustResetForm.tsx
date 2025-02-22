"use client";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import RequestResetSchema from "@/schema/RequestResetSchema";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputField from "./InputField";
import { useRequestPasswordResetMutation } from "@/generated/graphql";
import { Loader } from "lucide-react";
import { RequestResetErrorType } from "../../types";
import { useToast } from "@/hooks/use-toast";

const RequestResetForm = () => {
  // Define graphql mutation
  const [
    requestMutation,
    { data: requestResult, loading: requestLoading, error: requestError },
  ] = useRequestPasswordResetMutation();
  //   Toast
  const { toast } = useToast();

  // 1. Define your form.
  const form = useForm<z.infer<typeof RequestResetSchema>>({
    resolver: zodResolver(RequestResetSchema),
    defaultValues: {
      email: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof RequestResetSchema>) {
    const { email } = values;
    const result = await requestMutation({
      variables: {
        email,
      },
    });
    if (result.data?.requestPasswordReset.success) {
      toast({
        title: "Password Reset email sent",
        description: `Check your inbox at ${email} for the reset link to reset your password`,
      });
    }
  }

  //   Error handling
  useEffect(() => {
    if (requestError) {
      console.error(requestError);
    }
    if (requestResult?.requestPasswordReset.errors) {
      for (const error of requestResult?.requestPasswordReset.errors) {
        form.setError(error.field as RequestResetErrorType, {
          message: error.message,
        });
      }
    }
  }, [requestError, requestResult, form]);
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
        <Button type="submit" variant={"red"}>
          {requestLoading ? (
            <Loader className="animate-spin" />
          ) : (
            <span>Request Password Reset</span>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default RequestResetForm;
