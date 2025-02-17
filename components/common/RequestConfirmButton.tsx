"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRequestConfirmationCodeMutation } from "@/generated/graphql";
import { Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RequestConfirmButton = () => {
  const [requestMutation, { loading, error }] =
    useRequestConfirmationCodeMutation();
  // Toast
  const { toast } = useToast();
  const handleRequest = async () => {
    await requestMutation({
      onCompleted: (data) => {
        console.log(data);
        toast({
          title: "Confirmation Email Sent",
          description: "Please check your email for the confirmation code.",
        });
      },
    });
  };
  if (error) console.error(error);
  return (
    <Button onClick={handleRequest} className="min-w-[200px]">
      {loading ? (
        <Loader className="animate-spin" />
      ) : (
        "Resend Confirmation Email"
      )}
    </Button>
  );
};

export default RequestConfirmButton;
