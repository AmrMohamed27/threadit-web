"use client";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { createQueryStringFn } from "@/lib/utils";

interface Props {
  totalPages: number;
}

const PaginationComponent = ({ totalPages }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page")
    ? parseInt(searchParams.get("page") as string)
    : 1;
  const createQueryString = useCallback(
    (name: string, value: string) => {
      return createQueryStringFn(name, value, searchParams);
    },
    [searchParams]
  );
  // Get a new searchParams string by merging the current searchParams with a provided key/value pair

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href={
                pathname +
                "?" +
                createQueryString("page", (currentPage - 1).toString())
              }
            />
          </PaginationItem>
        )}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={currentPage === page}
              href={pathname + "?" + createQueryString("page", page.toString())}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext
              href={
                pathname +
                "?" +
                createQueryString("page", (currentPage + 1).toString())
              }
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
