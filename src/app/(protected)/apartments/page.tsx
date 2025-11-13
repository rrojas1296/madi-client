"use client";
import ApartmentMobileCard from "@/features/apartments/components/ApartmentMobileCard/ApartmentMobileCard";
import EmptyApartmentsTable from "@/features/apartments/components/emptyApartmentsTable/EmptyApartmentsTable";
import SearchAndFilters from "@/features/apartments/components/SearchAndFilters/SearchAndFilters";
import TableApartments from "@/features/apartments/components/TableApartments/TableApartments";
import useApartmentsColumns from "@/features/apartments/hooks/useApartmentsColumns";
import useGetApartments from "@/features/hooks/useGetApartments";
import Button from "@/features/shared/components/button/button";
import LoadingIcon from "@/features/shared/components/icons/LoadingIcon";
import PlusIcon from "@/features/shared/components/icons/PlusIcon";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";

const Page = () => {
  const t = useTranslations("Apartments");
  const { data, isLoading } = useGetApartments();
  const { columns } = useApartmentsColumns();
  const [rowSelection, setRowSelection] = useState({});
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
          <TableApartments table={table} />
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
