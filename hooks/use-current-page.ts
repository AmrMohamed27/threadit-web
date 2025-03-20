import { createMultipleQueryStringsFn, createQueryStringFn } from "@/lib/utils";
import { SortOptions } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useCurrentPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentPage = searchParams.has("page")
    ? Number(searchParams.get("page") as string)
    : 1;
  const sortBy = searchParams.has("sortBy")
    ? (searchParams.get("sortBy") as SortOptions)
    : "Best";
  const searchTerm = searchParams.has("q")
    ? (searchParams.get("q") as string)
    : "";
  const communityId = searchParams.get("communityId");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      return createQueryStringFn(name, value, searchParams);
    },
    [searchParams]
  );
  const createMultipleQueryStrings = useCallback(
    (names: string[], values: string[]) => {
      return createMultipleQueryStringsFn({ names, values, searchParams });
    },
    [searchParams]
  );

  const resetSearchTerm = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    return params.toString();
  }, [searchParams]);
  return {
    currentPage,
    createQueryString,
    createMultipleQueryStrings,
    searchParams,
    router,
    pathname,
    sortBy,
    searchTerm,
    communityId,
    resetSearchTerm,
  };
};
