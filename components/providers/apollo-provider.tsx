/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect, createContext } from "react";
import {
  ApolloClient,
  ApolloProvider as RealApolloProvider,
} from "@apollo/client";
import { createApolloClient } from "@/lib/apolloClient";
import { Loader } from "lucide-react";

export const ApolloContext = createContext<ApolloClient<any> | null>(null);

const ApolloProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [client, setClient] = useState<ApolloClient<any> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initClient = async () => {
      try {
        const newClient = await createApolloClient();
        setClient(newClient);
      } catch (err) {
        console.error("Failed to initialize Apollo client:", err);
      } finally {
        setLoading(false);
      }
    };

    initClient();
  }, []);

  if (loading || !client) {
    // Show a loading state or return a fallback
    return (
      <div className="flex justify-center items-center w-full min-h-screen">
        <Loader className="animate-spin" size={64} />
      </div>
    );
  }

  return <RealApolloProvider client={client}>{children}</RealApolloProvider>;
};

export default ApolloProvider;
