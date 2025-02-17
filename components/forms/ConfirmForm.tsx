"use client";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ConfirmSchema from "@/schema/ConfirmSchema";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputField from "./InputField";
import { useConfirmUserMutation } from "@/generated/graphql";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { ConfirmErrorType } from "../../types";
import RequestConfirmButton from "../common/RequestConfirmButton";

const ConfirmForm = () => {
  // Define graphql mutation
  const [
    confirmMutation,
    { data: confirmResult, loading, error: confirmError },
  ] = useConfirmUserMutation();
  // Router
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof ConfirmSchema>>({
    resolver: zodResolver(ConfirmSchema),
    defaultValues: {
      code: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof ConfirmSchema>) {
    const { code } = values;
    await confirmMutation({
      variables: {
        code,
      },
      refetchQueries: ["Me"],
    });
  }

  useEffect(() => {
    if (confirmError) {
      console.error(confirmError);
    }
    if (confirmResult?.confirmUser.errors) {
      for (const error of confirmResult.confirmUser.errors) {
        form.setError(error.field as ConfirmErrorType, {
          message: error.message,
        });
      }
    }
    if (confirmResult?.confirmUser.success) {
      // Redirect to home page
      router.push("/");
    }
  }, [confirmError, confirmResult, router, form]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Code */}
        <InputField
          control={form.control}
          name="code"
          label="Code"
          placeholder="123456"
        />
        {/* Buttons */}
        <div className="flex flex-row flex-wrap gap-4">
          <Button type="submit">
            {loading ? (
              <Loader className="animate-spin" />
            ) : (
              <span>Confirm your email</span>
            )}
          </Button>
          <RequestConfirmButton />
        </div>
      </form>
    </Form>
  );
};

export default ConfirmForm;
