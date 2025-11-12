"use client";
import ApartmentMobileCard from "@/features/apartments/components/ApartmentMobileCard/ApartmentMobileCard";
import EmptyApartmentsTable from "@/features/apartments/components/emptyApartmentsTable/EmptyApartmentsTable";
import SearchAndFilters from "@/features/apartments/components/SearchAndFilters/SearchAndFilters";
import useApartmentsColumns from "@/features/apartments/hooks/useApartmentsColumns";
import useGetApartments from "@/features/hooks/useGetApartments";
import Button from "@/features/shared/components/button/button";
import LoadingIcon from "@/features/shared/components/icons/LoadingIcon";
import PlusIcon from "@/features/shared/components/icons/PlusIcon";
import { cn } from "@/features/shared/lib/shadcn";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";

const Page = () => {
  const t = useTranslations("Apartments");
  const { data, isLoading } = useGetApartments();
  const { columns } = useApartmentsColumns();
  const [rowSelection, setRowSelection] = useState({});
  console.log({ rowSelection });
  const table = useReactTable({
    columns,
    data: data || [],
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="grid place-items-center h-full w-full">
        <LoadingIcon className="animate-spin w-7 h-7 text-text-1" />
      </div>
    );
  }
  return (
    <div className="animate-fade-in flex flex-col h-full relative">
      {data && data.length > 0 ? (
        <>
          <h1 className="text-xl lg:hidden font-medium">{t("title")}</h1>
          <p className="text-sm lg:hidden text-text-2 font-medium mt-1">
            {t("subtitle")}
          </p>
          <SearchAndFilters />
          <div className="grid gap-3 mt-6 md:grid-cols-2 lg:hidden">
            {data.map((apartment) => (
              <ApartmentMobileCard key={apartment.id} apartment={apartment} />
            ))}
          </div>
          <div className="hidden lg:block mt-4 border border-border-2 rounded-md overflow-x-auto custom-scroll">
            <table className="w-[1800px]">
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
                          : flexRender(
                              h.column.columnDef.header,
                              h.getContext(),
                            )}
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
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link href="/apartments/create">
            <Button className="bg-primary lg:hidden hover:bg-primary/90 rounded-2xl w-12 h-12 fixed bottom-[84px] right-5 ">
              <PlusIcon className="w-5 h-5 text-text-3" />
            </Button>
          </Link>
        </>
      ) : (
        <EmptyApartmentsTable />
      )}
    </div>
  );
};

export default Page;
