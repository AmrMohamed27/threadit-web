"use client";

import { useSyncSavedPosts } from "@/hooks/use-sync-saved-posts";

export default function ReduxContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useSyncSavedPosts();
  return children;
}
