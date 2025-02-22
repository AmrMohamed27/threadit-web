"use client";

import { useSyncHiddenPosts } from "@/hooks/use-sync-hidden-posts";
import { useSyncSavedPosts } from "@/hooks/use-sync-saved-posts";

export default function ReduxContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useSyncSavedPosts();
  useSyncHiddenPosts();
  return children;
}
