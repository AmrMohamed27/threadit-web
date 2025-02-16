"use client";
import RegisterForm from "@/components/forms/RegisterForm";
import Link from "next/link";

const Register = () => {
  return (
    <div className="flex flex-col gap-8 mx-auto py-6 min-h-screen container">
      <RegisterForm />
      <div>
        <span>{"Already have an account? "}</span>
        <Link className="text-blue-500" href="/login">
          Log in here!
        </Link>
      </div>
    </div>
  );
};

export default Register;
