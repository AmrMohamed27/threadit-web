"use client";
import { useRequestConfirmationCodeMutation } from "@/generated/graphql";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";
import { Button } from "../ui/button";

const RequestConfirmButton = () => {
  // State to track number of sent emails
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
        `Resend Confirmation Code`
      )}
    </Button>
  );
};

export default RequestConfirmButton;
