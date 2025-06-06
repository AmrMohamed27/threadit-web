"use client";
import PostFetcher from "@/components/posts/PostFetcher";
import { useCurrentPage } from "@/hooks/use-current-page";
import { useSort } from "@/hooks/use-sort";
import React, { useEffect } from "react";

const PopularPage = () => {
  const { handleSortByChange, sortBy } = useSort();
  const { sortBy: currentSortBy } = useCurrentPage();
  useEffect(() => {
    handleSortByChange("Hot");
  }, [handleSortByChange, sortBy, currentSortBy]);
  return <PostFetcher passedSortBy="Hot" />;
};

export default PopularPage;
