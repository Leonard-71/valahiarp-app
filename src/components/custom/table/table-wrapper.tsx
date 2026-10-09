"use client";

import type {
  FilterableField,
  FilterCondition,
} from "@/lib/filters/filter-types";
import type { RequestInput } from "@/types/utils/request.dto";
import type { ColumnDef } from "@tanstack/react-table";

import { useEffect, useState } from "react";
import { FilterIcon } from "lucide-react";

import { Loader } from "@/components/custom/loader";
import { Button } from "@/components/ui/button";
import { PaginatedResponseDto, ResponseDto } from "@/types";

import { ErrorComponent } from "../error";
import { Filter } from "../filter/filter";
import { Modal } from "../modal";
import { Pagination } from "../pagination/pagination";
import { SearchInput } from "../search-input";
import { Table } from "./custom-table";

interface TableWrapperProps<TData> {
  columns: ColumnDef<TData, any>[];
  initialTableState?: Partial<RequestInput>;
  filterSpec?: FilterableField[];
  refreshTrigger?: number;
  getData: (
    input: RequestInput,
  ) => Promise<ResponseDto<PaginatedResponseDto<TData>>>;
}

export function TableWrapper<TData>({
  columns,
  initialTableState,
  filterSpec = [],
  refreshTrigger,
  getData,
}: TableWrapperProps<TData>) {
  const [modalOpen, setModalOpen] = useState(false);

  const [data, setData] = useState<ResponseDto<
    PaginatedResponseDto<TData>
  > | null>(null);

  const [tableState, setTableState] = useState<RequestInput>({
    pagination: {
      pageIndex: 0,
      pageSize: 10,
      ...initialTableState?.pagination,
    },
    ...initialTableState,
  });

  const onChange = async (requestInput: RequestInput) => {
    setTableState(requestInput);

    const response = await getData(requestInput);
    setData(response);
  };

  useEffect(() => {
    onChange(tableState);
  }, [refreshTrigger]);

  const handlePageChange = (pageIndex: number) => {
    onChange({
      pagination: { ...tableState.pagination, pageIndex },
      search: tableState.search,
      filters: tableState.filters,
    });
  };

  const handleSearchChange = (value: string | undefined) => {
    onChange({
      pagination: { ...tableState.pagination, pageIndex: 0 },
      search: value,
      filters: tableState.filters,
    });
  };

  const handleFilterChange = (newFilters: FilterCondition[]) => {
    onChange({
      pagination: { ...tableState.pagination, pageIndex: 0 },
      search: tableState.search,
      filters: newFilters,
    });
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const filtersCount = tableState.filters?.length ?? 0;

  if (!data) {
    return <Loader className="h-96" />;
  }

  if (data.error) {
    return <ErrorComponent error={data.error} />;
  }

  return (
    <div className="bg-card text-card-foreground rounded-lg p-6 shadow-lg">
      <div className="mb-4 flex items-center justify-between gap-2">
        <SearchInput
          onChange={handleSearchChange}
          defaultValue={tableState.search}
          className="w-full md:w-64"
        />
        {filterSpec.length > 0 && (
          <Modal
            title="Filtrează rezultatele"
            open={modalOpen}
            onOpenChange={setModalOpen}
            trigger={
              <Button variant="outline" onClick={handleModalOpen}>
                <FilterIcon className="mr-2 h-4 w-4" />
                Filtrează {filtersCount > 0 && `(${filtersCount})`}
              </Button>
            }
          >
            <Filter
              spec={filterSpec}
              value={tableState.filters ?? []}
              onChange={handleFilterChange}
              onClose={() => setModalOpen(false)}
            />
          </Modal>
        )}
      </div>
      <Table data={data.data.content} columns={columns} enableHover={true} />
      {data.data.content.length > 0 && (
        <div className="mt-4">
          <Pagination
            pageIndex={tableState.pagination.pageIndex}
            totalCount={data.data.totalCount}
            pageSize={tableState.pagination.pageSize}
            onPageChange={handlePageChange}
            className="justify-end"
          />
        </div>
      )}
    </div>
  );
}
