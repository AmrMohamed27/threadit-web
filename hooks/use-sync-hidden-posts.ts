"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetHiddenPostsQuery } from "../generated/graphql";
import { setHiddenPosts } from "@/lib/features/hiddenPostsSlice";

export function useSyncHiddenPosts() {
  const dispatch = useDispatch();
  const { data, loading, error } = useGetHiddenPostsQuery();

  useEffect(() => {
    if (data?.getHiddenPosts) {
      dispatch(setHiddenPosts(data.getHiddenPosts));
    }
  }, [data, dispatch]);

  return { loading, error };
}
