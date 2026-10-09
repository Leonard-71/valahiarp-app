import {
  Pagination as UIPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface PaginationProps {
  pageIndex: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (pageIndex: number) => void;
  className?: string;
}

export function Pagination({
  pageIndex,
  totalCount,
  pageSize,
  onPageChange,
  className,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const currentPage = pageIndex;
  const pageLinks = [];
  const maxPageLinks = 5;
  let startPage = Math.max(0, currentPage - Math.floor(maxPageLinks / 2));
  const endPage = Math.min(totalPages - 1, startPage + maxPageLinks - 1);
  if (endPage - startPage < maxPageLinks - 1) {
    startPage = Math.max(0, endPage - maxPageLinks + 1);
  }
  for (let i = startPage; i <= endPage; i++) {
    pageLinks.push(
      <PaginationItem key={i}>
        <PaginationLink
          isActive={i === currentPage}
          onClick={e => {
            e.preventDefault();
            if (i !== currentPage) onPageChange(i);
          }}
          href="#"
        >
          {i + 1}
        </PaginationLink>
      </PaginationItem>
    );
  }
  return (
    <UIPagination className={cn("mt-4", className)}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={e => {
              e.preventDefault();
              if (currentPage > 0) onPageChange(currentPage - 1);
            }}
            href="#"
          />
        </PaginationItem>
        {startPage > 0 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {pageLinks}
        {endPage < totalPages - 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            onClick={e => {
              e.preventDefault();
              if (currentPage < totalPages - 1) onPageChange(currentPage + 1);
            }}
            href="#"
          />
        </PaginationItem>
      </PaginationContent>
    </UIPagination>
  );
} 