"use client";
import AuthPage from "@/components/auth/AuthPage";
import LoginForm from "@/components/forms/LoginForm";
import Link from "next/link";

const LoginPage = () => {
  return (
    <>
      <AuthPage header="Log in" Form={LoginForm}>
        <>
          {/* Forgot your password */}
          <div>
            <Link href="/forgot-password" className="text-theme-blue">
              Forgot your password?
            </Link>
          </div>
          {/* Create account link */}
          <div>
            <span>{"New here? "}</span>
            <Link href="/register" className="text-theme-blue">
              Sign up!
            </Link>
          </div>
        </>
      </AuthPage>
    </>
  );
};

export default LoginPage;
