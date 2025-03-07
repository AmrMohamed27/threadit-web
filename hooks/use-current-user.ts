"use client";
import { useEffect, useState } from "react";
import { useMeQuery, User } from "@/generated/graphql"; // Auto-generated GraphQL query
import { toErrorMap } from "@/lib/utils";

export const useCurrentUser = () => {
  // state
  const {
    data,
    error,
    loading: queryLoading,
  } = useMeQuery({
    fetchPolicy: "cache-first", // Ensure fresh data
    context: { credentials: "include" }, // Send opts
  });
  const [user, setUser] = useState<User | null>(data?.me.user ?? null);
  const [errorMap, setErrorMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(queryLoading);

  useEffect(() => {
    setLoading(queryLoading);
    if (data?.me?.user) {
      setUser(data.me.user);
    } else {
      setUser(null);
    }
    if (data?.me?.errors) {
      setErrorMap(toErrorMap(data.me.errors));
    }
  }, [data, queryLoading]);

  return { user, loading, error, errorMap };
};
