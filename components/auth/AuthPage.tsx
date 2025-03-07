import Link from "next/link";
import React from "react";

interface Props {
  header: string;
  Form: () => React.JSX.Element;
  children: React.JSX.Element;
}

const AuthPage = ({ header, Form, children }: Props) => {
  return (
    <>
      <h1 className="font-bold text-lg">{header}</h1>
      {/* Terms and conditions */}
      <div className="max-w-xs text-muted-foreground text-xs text-center">
        By continuing, you agree to our{" "}
        <Link href="/terms" className="text-theme-blue">
          terms and conditions
        </Link>{" "}
        and acknowledge that you have read our{" "}
        <Link href="/privacy" className="text-theme-blue">
          privacy policy.
        </Link>
      </div>
      <Form />
      <div className="flex flex-col gap-2 w-full">{children}</div>
    </>
  );
};

export default AuthPage;
