"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectRoute = ({ children }: { children?: React.ReactNode }) => {
  const { user, loading, error } = useCurrentUser();
  const router = useRouter();
  const { toast } = useToast();

  //   If loading is over and user is not logged in, redirect to login page
  useEffect(() => {
    if (!loading && !error && !user) {
      toast({
        title: "Please login to access this page",
        variant: "destructive",
      });
      router.push("/login");
    }
  }, [error, loading, user, toast, router]);
  return <>{children}</>;
};

export default ProtectRoute;
