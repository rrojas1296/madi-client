import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import useApartmentsColumns from "./useApartmentsColumns";
import { useState } from "react";
import { IApartment } from "../types/apartments";

function useApartmentsTable(data: IApartment[]) {
  const { columns } = useApartmentsColumns();
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    columns,
    data,
    state: {
      rowSelection,
    },
    getRowId: (row) => row.id,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
  });
  return { table, rowSelection, setRowSelection };
}

export default useApartmentsTable;
