import { createQueryStringFn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useCurrentPage = () => {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page") as string)
    : 1;
  const createQueryString = useCallback(
    (name: string, value: string) => {
      return createQueryStringFn(name, value, searchParams);
    },
    [searchParams]
  );
  return { currentPage, createQueryString, searchParams };
};
