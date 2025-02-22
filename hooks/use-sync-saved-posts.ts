"use client";
import { useGetSavedPostsIdsQuery } from "@/generated/graphql";
import { setSavedPosts } from "@/lib/features/savedPostsSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export function useSyncSavedPosts() {
  const dispatch = useDispatch();
  const { data, loading, error } = useGetSavedPostsIdsQuery();

  useEffect(() => {
    if (data?.getSavedPostsIds) {
      dispatch(setSavedPosts(data.getSavedPostsIds));
    }
  }, [data, dispatch]);

  return { loading, error };
}
