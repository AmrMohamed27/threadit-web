"use client";
import LoginForm from "@/components/forms/LoginForm";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="flex flex-col gap-8 mx-auto py-6 min-h-screen container">
      <LoginForm />
      <div className="flex flex-col gap-2">
        {/* Forgot your password */}
        <div>
          <span>Forgot your password?</span>{" "}
          <Link href="/forgot-password" className="text-blue-500">
            Click here to reset it
          </Link>
        </div>
        {/* Create account link */}
        <div>
          <span>{"Don't have an account? "}</span>
          <Link href="/register" className="text-blue-500">
            Sign up here!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
