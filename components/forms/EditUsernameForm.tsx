"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useUpdateUserNameMutation } from "@/generated/graphql";
import EditUsernameSchema from "@/schema/EditUsernameSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "./InputField";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";

const EditUsernameForm = () => {
  const { user } = useCurrentUser();
  const defaultName = user?.name ?? "";
  // Define graphql mutation
  const [updateMutation, { loading }] = useUpdateUserNameMutation();
  // Router
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof EditUsernameSchema>>({
    resolver: zodResolver(EditUsernameSchema),
    defaultValues: {
      name: defaultName,
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof EditUsernameSchema>) {
    const { name } = values;
    const { data, errors } = await updateMutation({
      variables: {
        options: {
          name,
        },
      },
      refetchQueries: "all",
    });
    // Handle graphql errors
    if (errors) {
      console.error(errors);
    }
    // Handle errors returned from resolver
    if (data?.updateUserName.errors) {
      const error = data?.updateUserName.errors[0];
      if (error.message.includes("duplicate")) {
        form.setError("name", { message: "Username already exists" });
      } else {
        form.setError("name", {
          message: data?.updateUserName.errors[0].message,
        });
      }
    } else if (data?.updateUserName.success) {
      router.push(`/users/${name}`);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        {/* Name */}
        <InputField
          control={form.control}
          name="name"
          label="Name"
          placeholder="John Doe"
        />
        <Button type="submit" className="w-full">
          {loading ? <Loader className="animate-spin" /> : <span>Save</span>}
        </Button>
      </form>
    </Form>
  );
};

export default EditUsernameForm;
