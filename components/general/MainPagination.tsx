"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";

interface iAppProps {
  totalPages: number;
  currentPage: number;
}

export function MainPagination({ currentPage, totalPages }: iAppProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  function handlePageChange(page: number) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", page.toString());

    router.push(`?${params.toString()}`);
  }

  function generatePaginationItems() {
    const items = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 3; i++) {
          items.push(i);
        }
        items.push(null);
        items.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        items.push(1);
        items.push(null);
        for (let i = totalPages - 2; i <= totalPages; i++) {
          items.push(i);
        }
      } else {
        items.push(1);
        items.push(null);
        items.push(currentPage - 1);
        items.push(currentPage);
        items.push(currentPage + 1);
        items.push(null);
        items.push(totalPages);
      }
    }

    return items;
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) handlePageChange(currentPage - 1);
            }}
            className={
              currentPage === 1 ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>

        {generatePaginationItems().map((page, index) =>
          page === null ? (
            <PaginationItem key={index}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page);
                }}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) handlePageChange(currentPage + 1);
            }}
            className={
              currentPage === totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
