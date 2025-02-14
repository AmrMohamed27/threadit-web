"use client";
import { useEffect, useState } from "react";
import { useMeQuery, User } from "@/generated/graphql"; // Auto-generated GraphQL query
import { toErrorMap } from "@/lib/utils";

export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null);
  // state
  const [errorMap, setErrorMap] = useState<Record<string, string>>({});
  const { data, error, loading } = useMeQuery({
    fetchPolicy: "network-only", // Ensure fresh data
    context: { credentials: "include" }, // Send cookies
  });


  useEffect(() => {
    if (data?.me?.user) {
      setUser(data.me.user);
    } else {
      setUser(null);
    }
    if (data?.me?.errors) {
      setErrorMap(toErrorMap(data.me.errors))
    }
  }, [data]);

  return { user, loading, error, errorMap };
};
