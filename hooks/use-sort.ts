import { usePathname, useRouter } from "next/navigation";
import { useCurrentPage } from "./use-current-page";
import { useEffect, useState } from "react";
import { SortOptions } from "@/types";

export const useSort = () => {
  const { createQueryString, sortBy: sortByQueryString } = useCurrentPage();
  const pathname = usePathname();
  const router = useRouter();
  const [sortBy, setSortBy] = useState<SortOptions>(
    sortByQueryString ||
      (localStorage.getItem("sortBy") as SortOptions) ||
      "Hot"
  );

  function handleSortByChange(sortBy: SortOptions) {
    setSortBy(sortBy);
    localStorage.setItem("sortBy", sortBy);
  }
  useEffect(() => {
    handleSortByChange(sortByQueryString);
  }, [sortByQueryString]);

  useEffect(() => {
    const queryString = createQueryString("sortBy", sortBy);
    const newUrl = `${pathname}?${queryString}`;
    router.push(newUrl);
  }, [sortBy, createQueryString, router, pathname]);
  return {
    sortBy,
    handleSortByChange,
  };
};
