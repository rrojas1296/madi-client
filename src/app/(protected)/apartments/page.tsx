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
import useDebounce from "@/features/shared/hooks/useDebounce";
import { useSidebar } from "@/features/shared/hooks/useSidebar";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const t = useTranslations("Apartments");
  const params = useSearchParams();
  const query = params.toString();
  const [searchText, setSearchText] = useState("");
  const debouncedText = useDebounce(searchText, 300);
  const { data, isLoading } = useGetApartments(debouncedText, query);

  const { setElement } = useSidebar();
  const { columns } = useApartmentsColumns();
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    columns,
    data: data?.apartments || [],
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
  });
  useEffect(() => () => setElement(null), []);

  if (isLoading) {
    return (
      <div className="h-full w-full grid place-items-center">
        <LoadingIcon className="w-5 h-5 animate-spin text-text-1" />
      </div>
    );
  }
  return (
    <>
      {(data?.apartments && data.apartments?.length > 0) ||
      (data?.total && data?.total > 0) ? (
        <div className="animate-fade-in flex flex-col h-full">
          <h1 className="text-xl lg:hidden font-medium">{t("title")}</h1>
          <p className="text-sm lg:hidden text-text-2 font-medium mt-1">
            {t("subtitle")}
          </p>
          <SearchAndFilters setText={setSearchText} searchText={searchText} />
          <div className="grid gap-3 mt-6 md:grid-cols-2 lg:hidden">
            {data.apartments.map((apartment) => (
              <ApartmentMobileCard key={apartment.id} apartment={apartment} />
            ))}
          </div>
          <TableApartments table={table} />
          <Link href="/apartments/create">
            <Button className="bg-primary lg:hidden hover:bg-primary/90 rounded-xl w-12 h-12 fixed bottom-[84px] right-5 ">
              <PlusIcon className="w-5 h-5 text-text-3" />
            </Button>
          </Link>
        </div>
      ) : (
        <EmptyApartmentsTable />
      )}
    </>
  );
};

export default Page;
