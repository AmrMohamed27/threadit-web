"use client";
import RegisterForm from "@/components/forms/RegisterForm";
import { useMeQuery } from "@/generated/graphql";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Register = () => {
  const router = useRouter();
  const { data: user, loading } = useMeQuery();
  useEffect(() => {
    if (!loading && user?.me.user) {
      return router.push("/");
    }
  }, [router, loading, user]);
  return (
    <div className="flex flex-col mx-auto py-6 min-h-screen container">
      <RegisterForm />
    </div>
  );
};

export default Register;
