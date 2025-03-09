"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRequestConfirmationCodeMutation } from "@/generated/graphql";
import { Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RequestConfirmButton = () => {
  // State to track number of sent emails
  const [sentEmails, setSentEmails] = useState(0);
  const [requestMutation, { loading, error }] =
    useRequestConfirmationCodeMutation();
  // Toast
  const { toast } = useToast();
  const handleRequest = async () => {
    await requestMutation({
      onCompleted: () => {
        toast({
          title: "Confirmation Email Sent",
          description: "Please check your email for the confirmation code.",
        });
        setSentEmails((prev) => prev + 1);
      },
    });
  };
  if (error) console.error(error);
  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        handleRequest();
      }}
      className="min-w-[200px]"
    >
      {loading ? (
        <Loader className="animate-spin" />
      ) : (
        `${sentEmails === 0 ? "Request" : "Resend"} Confirmation Code`
      )}
    </Button>
  );
};

export default RequestConfirmButton;
