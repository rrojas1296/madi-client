import {
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import useApartmentsColumns from "./useApartmentsColumns";
import { useState } from "react";
import useGetApartments from "@/features/hooks/useGetApartments";

function useApartmentsTable(
  debouncedText: string,
  query: string,
  pagination: PaginationState,
) {
  const { columns } = useApartmentsColumns();
  const [rowSelection, setRowSelection] = useState({});
  const { data, isLoading, isFetching } = useGetApartments({
    search: debouncedText,
    query,
    pagination,
  });
  const table = useReactTable({
    columns,
    data: data?.apartments || [],
    state: {
      rowSelection,
    },
    getRowId: (row) => row.id,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
  });
  return {
    table,
    rowSelection,
    setRowSelection,
    isLoading,
    data,
    isFetching,
  };
}

export default useApartmentsTable;
