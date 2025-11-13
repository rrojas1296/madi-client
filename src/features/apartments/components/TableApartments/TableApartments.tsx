import { flexRender, Table } from "@tanstack/react-table";
import { IApartment } from "../../types/apartments";
import { cn } from "@/features/shared/lib/shadcn";

interface Props {
  table: Table<IApartment>;
}
const TableApartments = ({ table }: Props) => {
  return (
    <div className="hidden lg:block mt-4 border border-border-2 rounded-md overflow-x-auto custom-scroll">
      <table className="w-[1800px] 2xl:w-full">
        <thead className="bg-bg-2">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((h, i) => (
                <th
                  key={h.id}
                  className={cn(
                    "font-semibold text-sm py-3 text-left",
                    i === 0 && "pl-9",
                  )}
                >
                  {h.isPlaceholder
                    ? null
                    : flexRender(h.column.columnDef.header, h.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b border-b-border-2">
              {row.getVisibleCells().map((cell, i) => (
                <td
                  key={cell.id}
                  className={cn("text-sm py-3", i === 0 && "pl-9")}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableApartments;
