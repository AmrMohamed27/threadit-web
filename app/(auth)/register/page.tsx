"use client";
import AuthPage from "@/components/auth/AuthPage";
import RegisterForm from "@/components/forms/RegisterForm";
import Link from "next/link";

const Register = () => {
  return (
    <>
      <AuthPage header="Create an account" Form={RegisterForm}>
        <div className="flex flex-row gap-2">
          <span>{"Already have an account? "}</span>
          <Link className="text-theme-blue" href="/login">
            Log in here!
          </Link>
        </div>
      </AuthPage>
    </>
  );
};

export default Register;
