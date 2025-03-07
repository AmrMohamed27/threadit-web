"use client";

import { urqlClient } from "@/lib/urqlClient";
import { Provider } from "urql";

export default function UrqlProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider value={urqlClient}>{children}</Provider>;
}
