import { createMultipleQueryStringsFn, createQueryStringFn } from "@/lib/utils";
import { SortOptions } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useCurrentPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page") as string)
    : 1;
  const sortBy = searchParams.get("sortBy")
    ? (searchParams.get("sortBy") as SortOptions)
    : "Best";
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
  return {
    currentPage,
    createQueryString,
    createMultipleQueryStrings,
    searchParams,
    router,
    pathname,
    sortBy,
  };
};
