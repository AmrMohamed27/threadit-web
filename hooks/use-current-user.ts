"use client";
import { useEffect, useState } from "react";
import { useMeQuery, User } from "@/generated/graphql"; // Auto-generated GraphQL query

export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null);
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
  }, [data]);

  return { user, loading, error };
};
