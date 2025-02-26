"use client";
import { useApolloClient } from "@apollo/client";
import React from "react";

const Sandbox = () => {
  const client = useApolloClient();
  client.resetStore();
  return <div>Sandbox</div>;
};

export default Sandbox;
